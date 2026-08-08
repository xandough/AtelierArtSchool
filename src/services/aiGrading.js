// ============================================================
// AI Grading Service — Powered by Google Gemini API
// ============================================================

const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
  'gemini-2.5-pro',
  'gemini-1.5-pro',
];

/**
 * Clean and sanitize API key string (strips quotes, whitespace, Bearer prefix)
 */
export function cleanApiKey(key) {
  if (!key) return '';
  let cleaned = String(key).trim().replace(/^["']|["']$/g, '');
  if (/^bearer\s+/i.test(cleaned)) {
    cleaned = cleaned.replace(/^bearer\s+/i, '').trim();
  }
  return cleaned;
}

/**
 * Execute Gemini API request with sanitized key, model fallback, and clear error handling
 */
async function callGeminiApi(apiKey, payload) {
  const cleanKey = cleanApiKey(apiKey);
  if (!cleanKey) {
    throw new Error('No Gemini API key configured. Please add your API key in Settings → AI Grading.');
  }

  const isOAuthToken = cleanKey.startsWith('ya29.') || cleanKey.startsWith('y29.');
  let lastError = null;

  for (const model of GEMINI_MODELS) {
    const headers = { 'Content-Type': 'application/json' };
    let url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    if (isOAuthToken) {
      headers['Authorization'] = `Bearer ${cleanKey}`;
    } else {
      headers['x-goog-api-key'] = cleanKey;
      url += `?key=${encodeURIComponent(cleanKey)}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return response.json();
    }

    const errorJson = await response.json().catch(() => ({}));
    const rawMsg = errorJson?.error?.message || '';
    const status = response.status;

    if (status === 404 || rawMsg.toLowerCase().includes('not found') || rawMsg.toLowerCase().includes('not supported')) {
      lastError = new Error(rawMsg || `Model ${model} not available`);
      continue; // Try next model candidate
    }

    if (status === 401 || rawMsg.toLowerCase().includes('authentication credentials') || rawMsg.toLowerCase().includes('oauth')) {
      throw new Error('Invalid authentication credentials. Please check your Gemini API key in Settings (get a free key at https://aistudio.google.com/app/apikey).');
    }
    if (status === 400 && rawMsg.toLowerCase().includes('api key')) {
      throw new Error('Your Gemini API key is not valid. Please verify your API key in Settings.');
    }
    if (status === 403) {
      throw new Error('API Key access denied. Please ensure the Generative Language API is enabled for your API key.');
    }
    if (status === 429) {
      throw new Error('Gemini API rate limit reached. Please wait a moment and try submitting again.');
    }
    throw new Error(rawMsg || `Gemini API error: ${status}`);
  }

  throw lastError || new Error('No compatible Gemini model found for your API key.');
}

/**
 * Grade an artwork submission using Gemini AI
 * @param {Object} params
 * @param {string} params.apiKey - Gemini API key
 * @param {string} params.imageBase64 - Base64 encoded image (without data URI prefix)
 * @param {string} params.imageMimeType - e.g., 'image/jpeg', 'image/png'
 * @param {Object} params.assignment - Assignment object with title, brief, rubric
 * @param {Object} params.teacher - Teacher object with name, specialty
 * @param {string} params.studentName - Student's name
 * @param {boolean} params.isFinalProject - Whether this is a final project submission
 * @returns {Promise<{score: number, letterGrade: string, feedback: Object}>}
 */
export async function gradeArtwork({ apiKey, imageBase64, imageMimeType, assignment, teacher, studentName, isFinalProject = false }) {
  const rubricText = assignment.rubric
    .map(r => `- ${r.criterion} (${r.weight}% of grade)`)
    .join('\n');

  const systemPrompt = `You are ${teacher.name}, a professional art instructor specializing in ${teacher.specialty}. You are grading a student's artwork submission with genuine expertise, warmth, and precision. Your feedback should feel like it comes from a real, caring mentor who wants this student to succeed.

Your teaching philosophy: ${teacher.quote}

You are grading ${studentName}'s submission for: "${assignment.title}"

Assignment Brief: ${assignment.brief}

Rubric (these are the criteria and their weights):
${rubricText}

CRITICAL GRADING INSTRUCTIONS:
1. Study the submitted artwork carefully and objectively
2. Grade each rubric criterion from 0–100
3. Calculate the weighted final score based on criterion weights
4. Provide specific, actionable feedback that references what you actually see in the artwork
5. Be encouraging but honest — this student needs to improve and vague praise doesn't help
6. If the image quality is too poor to assess, note this but still provide what feedback you can
7. For the overall score: ${isFinalProject ? 'A score of 80 or above is required to advance to the next month' : 'Provide an honest score that reflects the work\'s quality'}

Respond ONLY with a valid JSON object in this exact structure:
{
  "overallScore": <number 0-100>,
  "letterGrade": "<A+/A/A-/B+/B/B-/C+/C/C-/D/F>",
  "criterionScores": [
    { "criterion": "<name>", "score": <0-100>, "weight": <number>, "comment": "<specific observation about this criterion in this artwork>" }
  ],
  "strengths": ["<specific strength 1>", "<specific strength 2>", "<specific strength 3>"],
  "areasToImprove": ["<specific area 1 with actionable advice>", "<specific area 2>"],
  "teacherComment": "<2–3 paragraph personal note from you as ${teacher.name} — be specific about what you see, encouraging but honest, reference the masterwork style if relevant>",
  "recommendedExercises": ["<specific exercise to address a weakness>", "<another exercise>"],
  "nextStepAdvice": "<one clear, concrete thing they should focus on in their next practice session>"
}`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: systemPrompt,
          },
          ...(imageBase64 ? [{
            inline_data: {
              mime_type: imageMimeType || 'image/jpeg',
              data: imageBase64,
            },
          }] : []),
        ],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  };

  const data = await callGeminiApi(apiKey, requestBody);
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('No response received from Gemini API');
  }

  // Parse JSON from response (handle potential markdown code blocks)
  let parsed;
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');
    parsed = JSON.parse(jsonMatch[0]);
  } catch (e) {
    throw new Error('Failed to parse grading response. Please try again.');
  }

  return parsed;
}

/**
 * Get general feedback on a work-in-progress without formal grading
 */
export async function getProgressFeedback({ apiKey, imageBase64, imageMimeType, teacher, context }) {
  const prompt = `You are ${teacher.name}, an art instructor. A student has shared a work-in-progress and is asking for quick, informal feedback. Context: ${context}

Look at the image and provide brief, encouraging feedback in 2–3 short paragraphs. Be specific about what you see. End with one concrete suggestion for what to work on next.

Keep your response conversational and warm — this is an informal check-in, not a formal grade.`;

  const requestBody = {
    contents: [{
      parts: [
        { text: prompt },
        ...(imageBase64 ? [{ inline_data: { mime_type: imageMimeType || 'image/jpeg', data: imageBase64 } }] : []),
      ],
    }],
    generationConfig: { temperature: 0.8, maxOutputTokens: 512 },
  };

  const data = await callGeminiApi(apiKey, requestBody);
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to get feedback at this time.';
}

/**
 * Convert a File or Blob to base64
 */
export async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      // Remove the data URI prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function getLetterGradeColor(grade) {
  if (!grade) return 'var(--color-text-muted)';
  const score = typeof grade === 'number' ? grade : 0;
  if (score >= 90) return '#4a9c6d';  // Green — A
  if (score >= 80) return '#7ab84a';  // Light green — B
  if (score >= 70) return '#d4912a';  // Gold — C
  if (score >= 60) return '#d47a2a';  // Orange — D
  return '#c44a3a';                    // Red — F
}
