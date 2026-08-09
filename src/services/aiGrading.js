import { GoogleGenerativeAI } from '@google/generative-ai';

// Standard official Gemini models for AI Studio
const GEMINI_MODELS = [
  'gemini-1.5-flash',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
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
 * Execute Gemini API request using @google/generative-ai SDK with high-version models
 */
async function callGeminiApi(apiKey, contents, generationConfig = {}) {
  const cleanKey = cleanApiKey(apiKey);
  if (!cleanKey) {
    throw new Error('No Gemini API key configured. Please add your API key in Settings → AI Grading.');
  }

  const genAI = new GoogleGenerativeAI(cleanKey);
  let lastError = null;

  for (const modelName of GEMINI_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig,
      });

      const result = await model.generateContent(contents);
      const response = await result.response;
      const text = response.text();
      if (text) return text;
    } catch (err) {
      const msg = err.message || '';
      const lower = msg.toLowerCase();

      // If the API key itself is invalid or unauthenticated, throw immediately instead of looping
      if (
        lower.includes('api_key_invalid') ||
        lower.includes('api key not valid') ||
        lower.includes('invalid authentication') ||
        lower.includes('unauthenticated') ||
        lower.includes('401')
      ) {
        throw new Error('Invalid Gemini API key. Please verify your API key in Settings (get a free key at https://aistudio.google.com/app/apikey).');
      }

      if (lower.includes('403') || lower.includes('permission_denied')) {
        throw new Error('API Key access denied. Please ensure the Generative Language API is enabled for your key in Google Cloud/AI Studio.');
      }

      if (lower.includes('429') || lower.includes('quota') || lower.includes('rate limit')) {
        throw new Error('Gemini API rate limit reached. Please wait a moment and try submitting again.');
      }

      // If specific model is not found in region/tier, log and try next high-version model
      if (lower.includes('not found') || lower.includes('not supported') || lower.includes('404')) {
        lastError = err;
        continue;
      }

      throw err;
    }
  }

  if (lastError && lastError.message.toLowerCase().includes('not found')) {
    throw new Error('Your API key is valid, but none of the standard Gemini models (like gemini-1.5-flash) are available for your key or region. Please ensure you are using a standard Google AI Studio key (https://aistudio.google.com/app/apikey).');
  }

  throw lastError || new Error('Unable to connect to Gemini API. Please check your API key in Settings.');
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

  const contents = [
    systemPrompt,
    ...(imageBase64 ? [{
      inlineData: {
        mimeType: imageMimeType || 'image/jpeg',
        data: imageBase64,
      },
    }] : []),
  ];

  const text = await callGeminiApi(apiKey, contents, {
    temperature: 0.7,
    maxOutputTokens: 2048,
  });

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

  const contents = [
    prompt,
    ...(imageBase64 ? [{ inlineData: { mimeType: imageMimeType || 'image/jpeg', data: imageBase64 } }] : []),
  ];

  return await callGeminiApi(apiKey, contents, { temperature: 0.8, maxOutputTokens: 512 });
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
