// ============================================================
// THE ATELIER — Complete 24-Month Curriculum Data
// ============================================================

export const TEACHERS = [
  { id: 'eleanor', name: 'Prof. Eleanor Voss', initials: 'EV', specialty: 'Classical Drawing & Observation', bio: 'Trained at the École des Beaux-Arts in Paris, Prof. Voss spent fifteen years as a portrait artist before returning to teaching. Her rigorous observation-based method has shaped hundreds of professional illustrators.', quote: '"The pencil is merely the translation of your seeing. Train the eye first, and the hand will follow."' },
  { id: 'marcus', name: 'Prof. Marcus Okafor', initials: 'MO', specialty: 'Perspective & Spatial Reasoning', bio: 'Formerly a lead background artist for Pixar Animation Studios, Prof. Okafor brings real-world production experience to his courses. He holds an MFA from CalArts and has designed environments for three Academy Award-winning films.', quote: '"Every room you\'ve ever sat in started as a box. Master the box and you master the world."' },
  { id: 'ingrid', name: 'Prof. Ingrid Halvorsen', initials: 'IH', specialty: 'Human Anatomy & Figure Drawing', bio: 'A former medical illustrator for Oxford University Press, Prof. Halvorsen\'s understanding of the body goes to the cellular level. She teaches anatomy the way surgeons learn it — by understanding why structures exist, not just what they look like.', quote: '"You cannot draw what you do not understand. Understand the skeleton, and the figure will never intimidate you again."' },
  { id: 'chen', name: 'Prof. Chen Wei', initials: 'CW', specialty: 'Color Theory & Light Physics', bio: 'Prof. Chen earned his doctorate in visual perception from MIT before pivoting to painting. His research on how the human eye interprets color under different lighting conditions is foundational to his masterclass-level color curriculum.', quote: '"Color is not a property of objects — it is a relationship between light, surface, and the observer. Once you understand this, everything changes."' },
  { id: 'amara', name: 'Prof. Amara Diallo', initials: 'AD', specialty: 'Traditional Mediums & Painting', bio: 'Prof. Diallo trained under four masters across three continents — charcoal in Florence, oil in Madrid, and watercolor in Kyoto. She brings a rare cross-cultural perspective to Western painting traditions.', quote: '"A medium is not a tool — it is a partner. Learn its language and it will say things you never could alone."' },
  { id: 'santiago', name: 'Prof. Santiago Reyes', initials: 'SR', specialty: 'Composition & Visual Design', bio: 'A veteran concept artist from the video game industry (credits include three AAA franchises), Prof. Reyes is obsessed with the science of directing attention. His composition course is legendary among students for the speed at which it sharpens visual instincts.', quote: '"Every image is an argument. Make sure yours wins."' },
  { id: 'yuki', name: 'Prof. Yuki Tanaka', initials: 'YT', specialty: 'Digital Art & Anime Aesthetics', bio: 'Prof. Tanaka began her career as an animation director in Tokyo before moving to game development. She has contributed key art to multiple beloved JRPGs and brings firsthand industry knowledge of Japanese animation pipelines to her digital courses.', quote: '"Digital and traditional are not opposites. They are conversations. Learn both languages and speak fluently."' },
  { id: 'oliver', name: 'Prof. Oliver Mercer', initials: 'OM', specialty: 'Sequential Art & Storytelling', bio: 'A published graphic novelist with three critically acclaimed works, Prof. Mercer knows what it means to hold a reader\'s eye across hundreds of pages. His course on sequential art is the most story-focused in the curriculum.', quote: '"A panel is a promise. A page is a contract. Never break it."' },
  { id: 'nadia', name: 'Prof. Nadia Sokolova', initials: 'NS', specialty: 'Character Design & Concept Art', bio: 'Prof. Sokolova has designed characters for Disney Television, DreamWorks, and three independent animation studios. Her philosophy — that character design is really emotional design — underpins every lecture she gives.', quote: '"Your character\'s silhouette must whisper their personality before a single line of dialogue is spoken."' },
  { id: 'james', name: 'Prof. James Whitfield', initials: 'JW', specialty: 'Sculpting & 3D Form', bio: 'A sculptor by training and a digital artist by necessity, Prof. Whitfield bridges the gap between clay and pixels better than anyone in the industry. His work has been exhibited in galleries across North America and Europe.', quote: '"If you can build it in three dimensions, you can draw it from any angle. Sculpting is the ultimate perspective exercise."' },
];

const getTeacher = (id) => TEACHERS.find(t => t.id === id);

// ============================================================
// HELPER: Generate daily lessons (typically 5 lessons per week,
// each lesson structured with rich educational content)
// ============================================================

const CURRICULUM = [
  // ============================================================
  // MONTH 1
  // ============================================================
  {
    month: 1,
    year: 1,
    title: 'Line, Space & The First Mark',
    subtitle: 'Where every artist begins — learning to truly see.',
    theme: 'foundation',
    courses: [
      {
        id: 'M01-A',
        title: 'Line & Spatial Awareness',
        subtitle: 'Contour Drawing, Proportion & The Educated Eye',
        teacher: getTeacher('eleanor'),
        description: 'Before you can draw anything, you must learn to see. This course rewires your brain — breaking the symbol system your mind has built since childhood and replacing it with direct visual observation. We begin with line, the most fundamental element of drawing, and train it through contour work, proportion measurement, and sustained focus.',
        references: [
          { title: 'Drawing on the Right Side of the Brain', author: 'Betty Edwards', note: 'The foundational text for learning to see. Chapters 1–5.' },
          { title: 'Keys to Drawing', author: 'Bert Dodson', note: 'Exercises 1–8 on contour and gesture.' },
          { title: 'The Natural Way to Draw', author: 'Kimon Nicolaïdes', note: 'Chapter on contour drawing — do every exercise.' },
        ],
        lessons: [
          {
            day: 1,
            title: 'Why You Can\'t Draw Yet — And How to Fix It',
            duration: '45 min',
            content: `Welcome to The Atelier. Before we pick up a pencil, we need to have an honest conversation about why most people believe they "can't draw."

The truth is, you already know how to draw — you just don't know how to see. Since childhood, your brain has been building a library of symbols: "this is what an eye looks like," "this is what a hand looks like." When you draw from memory, you're drawing those symbols, not reality. The result looks childlike because symbols are simplifications.

**The Betty Edwards Discovery**
In her landmark book *Drawing on the Right Side of the Brain*, Betty Edwards identified that skilled drawing involves shifting dominance from the left hemisphere (the verbal, symbolic side) to the right hemisphere (the spatial, holistic side). Every technique in this course is designed to help you make that shift.

**Your First Exercise: The Upside-Down Drawing**
Find any line drawing — a Picasso sketch works beautifully — turn it upside down, and copy it exactly as you see it. Don't think about what it is. Focus only on the lines and angles in front of you. When you flip it right-side up, you'll be amazed at the quality. That's your right hemisphere at work.

**What to Take Away:**
- Drawing is a skill, not a talent. Talent is simply practice that happened earlier.
- Your goal is to move from drawing symbols to drawing *observations*.
- Every exercise in this course is a tool for training your eye, not your hand.`,
            keyTerms: ['Contour line', 'Negative space', 'Modified contour drawing', 'Pure contour drawing'],
            exercise: 'Spend 20 minutes doing a pure contour drawing of your non-dominant hand. Do NOT look at your paper. Move your pencil only as fast as your eye moves along the contours of your hand. Do not lift the pencil. The result will look wrong — that\'s correct.',
          },
          {
            day: 2,
            title: 'Pure Contour Drawing: Training the Eye-Hand Connection',
            duration: '50 min',
            content: `Yesterday you experienced pure contour drawing — the counterintuitive practice of drawing without looking at your paper. Today we deepen that work and understand *why* it's the single most powerful tool for rewiring how you see.

**The Eye-Hand Feedback Loop**
Your eye and hand must become partners operating in real time. Most beginners draw from their imagination — glancing at the subject briefly, then looking at the paper. This breaks the connection. In pure contour, the paper becomes almost irrelevant. The *seeing* is the drawing.

**Modified Contour Drawing**
Today we introduce the more practical version: modified contour. Here, you're allowed to glance at your paper occasionally — but only to check proportion and placement. The rule is: spend 80% of your time looking at the subject, 20% at the paper. This is the professional ratio.

**Edges: The Foundation of Form**
An edge is where one thing ends and another begins. There are four types of edges in drawing:
1. **Hard edges** — sharp, definite (a knife blade catching light)
2. **Soft edges** — gradual transitions (a cheek turning away from light)
3. **Lost edges** — where two similar values merge and the boundary disappears
4. **Found edges** — a sharp accent that draws the eye back

Mastering edges is mastering the visual language of three-dimensional form on a two-dimensional surface.

**Gesture Lines**
Before committing to a contour, great artists often begin with a light gesture — a single sweeping line that captures the *movement* or *thrust* of the whole object. It keeps drawings from feeling stiff.`,
            keyTerms: ['Hard edge', 'Soft edge', 'Lost edge', 'Gesture line', 'Eye-hand connection'],
            exercise: 'Spend 30 minutes doing modified contour drawings of 5 household objects (a mug, shoe, pair of scissors, plant, chair). For each object, spend 2 minutes drawing. Remember: 80% looking at the object, 20% at the paper.',
          },
          {
            day: 3,
            title: 'Measuring Proportions: The Sight-Size Method',
            duration: '50 min',
            content: `Even the most observational drawing falls apart if proportions are wrong. Today we learn professional measuring techniques that artists have used for centuries.

**The Pencil Method**
Hold your pencil vertically at arm's length, fully extended (never bend your elbow — consistency is everything). Close one eye. Align the top of the pencil with the top of your subject. Slide your thumb down until it aligns with the bottom. This is your base unit of measurement.

Now compare: How many heads tall is the figure? How wide is the head compared to the shoulders? Every measurement is expressed as a ratio to your base unit.

**Sight-Size Drawing**
Sight-size is the classical atelier method. You position your reference (or still life) so that it appears the same size as your canvas when viewed from your drawing position. You then walk back and forth, comparing your drawing to the subject at the same size. Many of the world's finest portrait painters still use this method.

**The Unit System (Loomis Method)**
Andrew Loomis standardized the human figure as 7.5 to 8 heads tall. This doesn't mean all figures are exactly this proportion — it means you have a reliable starting grid. Once you know the ideal, you can see how your subject deviates from it.

**Plumb Lines and Horizontals**
A plumb line is an imaginary vertical dropped from any point in your composition. It helps you find the true vertical alignment of points that seem unrelated. Similarly, sweeping a horizontal across your reference reveals which points share the same height — often surprising results.`,
            keyTerms: ['Sight-size method', 'Pencil measuring', 'Plumb line', 'Unit of measurement', 'Loomis proportions'],
            exercise: 'Set up a simple still life of 3–4 objects. Using the pencil method, measure and compare the proportions of each object before drawing a single mark. Make a proportion sketch (no detail — just blocks and ovals showing size relationships) before doing your final drawing. Allocate 45 minutes total.',
          },
          {
            day: 4,
            title: 'Negative Space: Drawing What Isn\'t There',
            duration: '45 min',
            content: `This lesson introduces one of the most powerful perceptual shifts in all of drawing: the ability to see and draw negative space.

**What Is Negative Space?**
Positive space is the object itself. Negative space is the space around, between, and behind the object. Most beginners ignore negative space entirely. This is a costly mistake — negative space is just as much a *shape* as the object itself, and drawing it forces you to observe the actual contours of the positive form.

**The Chair Exercise (Betty Edwards)**
Draw a wooden chair by drawing only the shapes of air between the legs, rungs, and seat — never touching the chair itself. Force yourself to ask: "What shape is that hole between the back legs?" When you do this, the chair that emerges will be far more accurate than if you had drawn the chair directly.

**Why Negative Space Works**
When you focus on the object, your left brain jumps in with its symbols: "a leg is a rectangle, an arm is a cylinder." When you focus on the weird, irregular shapes of the *space between things*, your left brain has no stored symbol — it gives up and lets the right brain look. You begin to see accurately.

**Application in All Subjects**
- **Portraiture**: The negative shapes of the background around a face are as important as the face itself.
- **Figure drawing**: The negative space between an arm and the torso is a precise shape that must be observed.
- **Still life**: The spaces between overlapping objects create complex interlocking shapes.`,
            keyTerms: ['Negative space', 'Positive space', 'Figure-ground relationship', 'Right brain seeing'],
            exercise: 'Do a 30-minute chair drawing using ONLY negative space — do not draw any part of the chair itself, only the shapes of air around and between it. Then do a quick 10-minute copy of one of your favorite artworks (manga panel or illustration) focusing entirely on the negative spaces. Compare both drawings to your references.',
          },
          {
            day: 5,
            title: 'Training the Shoulder: Long Lines & Mark Control',
            duration: '50 min',
            content: `The biggest mistake beginners make is drawing from the wrist. Professional artists — especially illustrators — draw from the shoulder. This lesson corrects that habit before it becomes permanent.

**Drawing from the Shoulder**
Your wrist has a very small range of motion. Curves drawn from the wrist tend to be tight, scratchy, and inconsistent. Your shoulder joint has a far greater arc, allowing for the long, confident strokes that distinguish professional line work from amateur.

Place your paper at arm's length. Make marks by pivoting from the shoulder, keeping your wrist locked. It will feel strange at first — like learning to write with your non-dominant hand. That strangeness is growth.

**The Ghosting Method**
1. Hover your pencil over the starting and ending points of the line you want to draw
2. "Ghost" the motion several times — make the stroke in the air without touching the paper
3. When the motion feels natural, execute the stroke on the paper in one confident movement
4. Never second-guess mid-stroke. Commit.

This is how professional comic artists draw thousands of perfect curves per week.

**Straight Lines: The Hardest Thing in Drawing**
Paradoxically, straight lines are harder to draw than curves because your brain has more to compare against. Use the shoulder, not the wrist. Focus on the *endpoint*, not the line itself — let your peripheral vision guide the path.

**Ellipses**
An ellipse (a circle in perspective) is one of the most common forms in drawing — cups, wheels, barrels, eyes. The shoulder method is essential here. Ghost the ellipse 5–10 times before committing. The goal is smooth, consistent pressure throughout.`,
            keyTerms: ['Shoulder drawing', 'Ghosting method', 'Confident mark-making', 'Ellipse construction', 'Long-line technique'],
            exercise: 'Fill an entire A4 page (both sides) with the following: (1) 50 straight lines from point to point using the ghosting method, (2) 30 smooth curves using shoulder rotation, (3) 20 ellipses of varying proportions, (4) 10 connected boxes drawn freehand. Focus on confidence and fluidity, not perfection.',
          },
        ],
        weeklyAssignments: [
          {
            week: 1,
            title: 'The Observer\'s Hand',
            brief: 'Complete a full-page contour drawing of your non-dominant hand in 5 different positions. For each position, spend at least 10 minutes on a pure contour (no looking at paper) and then 15 minutes on a modified contour. Label each drawing with the technique used. This assignment tests your ability to see edges and commit marks with confidence.',
            rubric: [
              { criterion: 'Edge observation accuracy', weight: 25 },
              { criterion: 'Line confidence and continuity', weight: 25 },
              { criterion: 'Proportion accuracy', weight: 25 },
              { criterion: 'Evidence of the modified contour process', weight: 25 },
            ],
            dueDay: 7,
            estimatedTime: '3 hours',
          },
          {
            week: 2,
            title: 'Negative Space Study',
            brief: 'Choose an interesting chair or piece of furniture. Create one drawing using only negative spaces (minimum 40 minutes), then create a second drawing of the same subject using conventional observation. Write a 100-word reflection comparing what you learned from each method. Submit both drawings and the reflection.',
            rubric: [
              { criterion: 'Quality of negative space observation', weight: 30 },
              { criterion: 'Accuracy in both drawings', weight: 30 },
              { criterion: 'Quality of reflection (insight shown)', weight: 20 },
              { criterion: 'Proportion accuracy', weight: 20 },
            ],
            dueDay: 14,
            estimatedTime: '2.5 hours',
          },
          {
            week: 3,
            title: 'Sight-Size Still Life',
            brief: 'Arrange 4–6 everyday objects (different heights and shapes) into a still life. Use the pencil measuring method before drawing a single mark — document your measurements in a proportion sketch. Then create the final drawing (minimum 60 minutes). Both the proportion sketch and the final drawing must be submitted.',
            rubric: [
              { criterion: 'Proportion accuracy (measured vs. drawn)', weight: 35 },
              { criterion: 'Quality of proportion sketch', weight: 20 },
              { criterion: 'Edge variety (hard/soft/lost)', weight: 25 },
              { criterion: 'Overall drawing quality', weight: 20 },
            ],
            dueDay: 21,
            estimatedTime: '3 hours',
          },
          {
            week: 4,
            title: 'Mark Control Mastery Page',
            brief: 'Fill both sides of an A4 page with mark-control exercises: long straight lines, curves, ellipses, spirals, hatching patterns, and cross-hatching patterns. The goal is shoulder-driven, confident marks. Then do a 45-minute still life drawing using ONLY the ghosting method for every mark.',
            rubric: [
              { criterion: 'Shoulder technique evidence (smooth, controlled marks)', weight: 40 },
              { criterion: 'Variety and completion of exercise types', weight: 25 },
              { criterion: 'Application of ghosting in still life', weight: 35 },
            ],
            dueDay: 28,
            estimatedTime: '2.5 hours',
          },
        ],
        finalProject: {
          title: 'Portrait of Patience: A Sustained Observational Drawing',
          brief: `For your Month 1 final project, you will complete a sustained observational drawing of a face (your own, a friend's, or a reference photo) using all the skills from this course.

**Requirements:**
- Minimum 2 hours of continuous drawing time (no stopping and coming back the next day)
- Begin with a proportion sketch (show this sketch)
- Use pure contour for at least one section of the drawing
- Demonstrate edge variation: at least one clearly hard edge, one soft edge, and one lost edge
- Final drawing must be on A4 or larger
- Submit: proportion sketch, in-progress photo (30 minutes in), and final drawing

**What We're Evaluating:**
- Have you moved away from drawing symbols (the "eye symbol," the "nose symbol") toward observing actual forms?
- Is the overall proportion believable?
- Do the edges tell the story of light and form?
- Is there evidence of a sustained, focused process?

**Inspiration:** Study portrait drawings by Holbein the Younger, Ingres, and John Singer Sargent before you begin. Notice how economically they use line, and how much the edges vary.`,
          rubric: [
            { criterion: 'Proportion accuracy', weight: 25 },
            { criterion: 'Edge quality and variety', weight: 25 },
            { criterion: 'Evidence of observational process (not symbol-drawing)', weight: 30 },
            { criterion: 'Technical execution and line confidence', weight: 20 },
          ],
          dueDay: 30,
          passingScore: 80,
          estimatedTime: '4–5 hours',
          masterArtistReference: 'Hans Holbein the Younger — Study for the Portrait of Thomas More (1526)',
        },
      },
      {
        id: 'M01-B',
        title: 'Values & Volume',
        subtitle: 'The Language of Light and Shadow',
        teacher: getTeacher('eleanor'),
        description: 'A drawing can have perfect proportions and still look flat. Value — the relative lightness or darkness of a surface — is what creates the illusion of three-dimensional form. This course teaches you to see and render the light-shadow relationship that turns flat shapes into believable volumes.',
        references: [
          { title: 'Color and Light', author: 'James Gurney', note: 'Chapters 1–3 on value and the light family.' },
          { title: 'Light for Visual Artists', author: 'Richard Yot', note: 'Foundational concepts on light behavior.' },
          { title: 'Drawing from Observation', author: 'Brian Curtis', note: 'The value scale exercises are essential.' },
        ],
        lessons: [
          {
            day: 1,
            title: 'The Value Scale: From White to Black',
            duration: '45 min',
            content: `Value is the most important concept in all of visual art. More important than color. More important than line quality. More important than technique. If you can master value, you can make anything look three-dimensional.

**What Is Value?**
Value is simply how light or dark something is. A 10-step value scale runs from pure white (1) to absolute black (10). Every tone in a drawing or painting lives somewhere on this scale.

**Why Value Creates Form**
A flat circle is just a circle. Add a graded value — light on one side, dark on the other — and it becomes a sphere. Your brain interprets the value gradient as information about a curved surface turning away from a light source. This is not learned — it's hardwired into human visual perception.

**The Squint Test**
Squinting at your subject blurs the detail and reduces the visual information to its essential value structure. If the value structure of your drawing looks right when squinted, the drawing will look convincing. If it looks wrong squinted, no amount of detail will fix it. This is perhaps the most important practical technique in this course.

**The Six Zones of Light and Shadow**
Every lit form can be divided into:
1. **Highlight** — the brightest point where light hits most directly
2. **Light** — the general lit area (not the brightest)
3. **Halftone** — the transitional zone between light and shadow
4. **Core shadow** — the darkest part of the shadow, often found at the shadow's edge (not deepest in the mass)
5. **Reflected light** — light that bounces from surrounding surfaces into the shadow (always darker than halftone)
6. **Cast shadow** — the shadow the form throws onto surrounding surfaces (often the darkest value overall)`,
            keyTerms: ['Value scale', 'Highlight', 'Core shadow', 'Reflected light', 'Cast shadow', 'Halftone', 'Squint test'],
            exercise: 'Create a 10-step value scale using graphite. Then draw a sphere, cylinder, and cube under a single light source (use a lamp or flashlight). Identify and label all six zones of light and shadow on each form. 45 minutes total.',
          },
          {
            day: 2,
            title: 'The Light Family and Shadow Family',
            duration: '50 min',
            content: `One of the most powerful simplifications in all of painting and drawing is the concept of the Light Family and the Shadow Family. Master this, and muddy, confusing values become instantly clarified.

**The Two Families**
Every value in a drawing belongs to one of two families:
- **The Light Family**: Highlights, direct light, halftones — all the areas receiving light, directly or partially. These values are lighter than the dividing line.
- **The Shadow Family**: Core shadows, cast shadows, the shadow mass — all the areas blocked from light. These values are darker than the dividing line.

**The Golden Rule: Light vs. Shadow is Binary**
The most common value mistake beginners make is blending the two families together — making reflected light as light as a halftone, or making a dark halftone as dark as a shadow. This destroys the three-dimensional reading of the form.

**The Rule:** Every part of the light family must be lighter than every part of the shadow family. No exceptions. The darkest light value is always lighter than the lightest shadow value. This is what John Singer Sargent called "keeping the masses."

**Applying This to Your Drawings**
Before adding any detail or refined rendering, establish your two families first. Block in the light side with one value, the shadow side with another. This two-tone blocking is the foundation of every academic painting and drawing tradition.

**Cast Shadows and Form Shadows**
- **Form shadow** (self-shadow): The shadow on the object itself where light doesn't reach
- **Cast shadow**: The shadow thrown by the object onto other surfaces

Cast shadows are generally sharper at their origin (where the shadow begins) and softer at their edge farther from the object. They also tend to be slightly darker than form shadows because they receive less reflected light.`,
            keyTerms: ['Light family', 'Shadow family', 'Two-value blocking', 'Form shadow', 'Cast shadow edge behavior'],
            exercise: 'Set up a lamp pointed at a simple fruit (apple, orange, or pear). Photograph it, then draw it twice: (1) Block in ONLY the two families — light side one grey, shadow side another grey. No blending. (2) Now refine with all six zones. 50 minutes total.',
          },
          {
            day: 3,
            title: 'Rendering Volume: The Sphere as Master Teacher',
            duration: '55 min',
            content: `The sphere is the most important form in all of drawing. It contains every value transition that exists in the natural world, and it has no hard edges to hide behind. Mastering the sphere means mastering form.

**Why the Sphere?**
Boxes have corners — abrupt edges that make value transitions easy to see. Cylinders have two defined edges. The sphere has nothing. Its surface turns continuously in every direction, creating a gradient that must be understood, not copied.

**The Gradient Strategy**
When rendering a sphere:
1. Start by establishing the light source direction
2. Block in your light family (all one value)
3. Block in your shadow family (all one value) — the terminator line between them curves
4. Identify the core shadow location (it's inside the shadow mass, slightly away from the terminator)
5. Darken the core shadow
6. Add reflected light — brighter than core, darker than halftone
7. Add the highlight last — a small, bright accent in the direct light zone
8. Blend the halftone transition between light family and terminator

**The Terminator**
The terminator is the line dividing the light family from the shadow family on a curved form. On a sphere, it's a curved line. On a cylinder, it's a straight vertical line. Understanding the terminator's behavior is key to understanding how any 3D form turns in space.

**Blending Techniques (Graphite)**
- **Tortillon/stump**: For smooth, broad blending
- **Finger blending**: Warm, loose blending for large areas
- **Kneaded eraser**: For lifting highlights — always the last step, never the first
- **Hatching**: Directional marks that describe form — the marks flow with the surface's direction`,
            keyTerms: ['Terminator line', 'Core shadow placement', 'Reflected light rules', 'Kneaded eraser highlight', 'Hatching direction'],
            exercise: 'Render five spheres under different lighting conditions: (1) top light, (2) side light, (3) back-lit (rim light), (4) two light sources, (5) colored light environment (draw this one in colored pencil or light markers). 55 minutes.',
          },
          {
            day: 4,
            title: 'Value Mapping: Seeing the Big Picture Before the Detail',
            duration: '50 min',
            content: `The difference between a beginner and an intermediate artist often comes down to one habit: beginners render details first, masters block in values first. Today we practice the master's approach.

**Thumbnail Value Studies**
Before any serious drawing or painting, professional illustrators create thumbnail value studies — tiny (2"×2") rough sketches that capture only the major value masses, with no detail at all. These thumbnails answer the fundamental question: does the composition read clearly as a pattern of light and dark?

**The Three-Value System**
For most compositions, you can organize all values into three groups:
1. **Light** (white to light grey)
2. **Midtone** (middle grey)
3. **Dark** (dark grey to black)

If your composition doesn't read clearly in three values, it won't read clearly in ten. This is why professional concept artists spend enormous time on value thumbnails before committing to a final piece.

**Reading a Master's Value Structure**
Take any painting or illustration you admire. Squint your eyes until you can only see five or six value masses. Sketch those masses as simple shapes. This is the skeleton of the composition — and understanding it reveals why the image works.

**Value and Mood**
- **High key** (mostly lights with a few darks): Airy, peaceful, optimistic
- **Low key** (mostly darks with a few lights): Dramatic, mysterious, moody
- **Full range** (all values present): Naturalistic, detailed, informative
- **High contrast** (few values, sharp transitions): Graphic, bold, immediate

Every deliberate artist chooses their key before beginning, not after.`,
            keyTerms: ['Thumbnail value study', 'Three-value system', 'High key', 'Low key', 'Value mapping'],
            exercise: 'Find three of your favorite artworks (any style — manga, realism, impressionism). For each, create a 2"×2" thumbnail that captures ONLY the major value masses (3–4 values max). Then do the same for a still life you set up yourself. 50 minutes.',
          },
          {
            day: 5,
            title: 'Edge Control as Value Control: Putting It All Together',
            duration: '55 min',
            content: `We end the week by unifying everything: line from Course A, value from Course B, and the professional habit of edge control that ties them together.

**Edges as Value Information**
An edge is a place where values change. A hard edge is where the value change is abrupt. A soft edge is where the value change is gradual. This means edges and values are inseparable — you cannot make a truly soft edge without value knowledge.

**The Four-Edge System in Value Drawing:**
- **Hard edge**: Abrupt value change — brings that area forward and draws attention
- **Soft edge**: Gradual value change — recedes, feels natural, aids the 3D reading
- **Lost edge**: Two adjacent areas share the same value — the boundary disappears
- **Found edge**: A thin, dark accent (like a cast shadow edge near its origin)

**Strategic Edge Use**
Professional artists are intentional about where they put each edge type:
- The focal point gets the hardest edges and highest contrast
- Peripheral areas get softer edges
- The area of most detail is surrounded by areas of rest (soft edges, no detail)

**The 80/20 Rule of Value Drawing**
Spend 80% of your time on the largest value masses and 20% on the details. Most beginners invert this — they obsess over detail while the overall value structure remains unconvincing.

**Closing Thought: The Squint Test Revisited**
At every stage of your drawing, squint. If it reads correctly squinted, you're on the right path. If something looks wrong squinted — a shape is too light or too dark, a value mass seems disconnected — fix that before adding more detail. The squint test is your most reliable compass.`,
            keyTerms: ['Edge and value relationship', 'Focal point hierarchy', 'The 80/20 rule', 'Strategic edge placement'],
            exercise: 'Create a finished drawing of a crumpled piece of white paper under a single light source. This is the ultimate value challenge — white paper has subtle value transitions everywhere, and no color to distract you. 55 minutes. Use the squint test at least 5 times during the drawing process.',
          },
        ],
        weeklyAssignments: [
          {
            week: 1,
            title: 'The Six Zones Study',
            brief: 'Set up a lamp and a white egg (or any simple light-colored spherical or ovoid object). Create a drawing that clearly identifies and labels all six zones of light and shadow. Submit two versions: one with labeled zones, one without. The unlabeled version should show all six zones through value alone.',
            rubric: [
              { criterion: 'Accurate placement of all six zones', weight: 35 },
              { criterion: 'Value range (true white to near-black)', weight: 25 },
              { criterion: 'Smooth transitions in halftone area', weight: 20 },
              { criterion: 'Cast shadow quality', weight: 20 },
            ],
            dueDay: 7,
            estimatedTime: '2.5 hours',
          },
          {
            week: 2,
            title: 'Two-Value Block-In Portrait',
            brief: 'Using a reference photo (your own face or a photo of someone you know), create a portrait drawing using ONLY two values first — establish the complete light and shadow families before rendering anything. Then submit both: the two-value version and the fully rendered version.',
            rubric: [
              { criterion: 'Clarity of light/shadow family separation', weight: 35 },
              { criterion: 'Proportion accuracy', weight: 25 },
              { criterion: 'Rendering quality in final version', weight: 25 },
              { criterion: 'Preserved family structure in final version', weight: 15 },
            ],
            dueDay: 14,
            estimatedTime: '3 hours',
          },
          {
            week: 3,
            title: 'Value Thumbnail Series',
            brief: 'Create a series of 12 value thumbnails (2"×2" each) for a scene of your choice (interior room, landscape, figure with props). For each thumbnail, try a different key: high key, low key, full range, high contrast. Identify which composition and key reads most powerfully and explain why (100 words).',
            rubric: [
              { criterion: 'Variation across all four keys', weight: 25 },
              { criterion: 'Readability of value masses in each thumbnail', weight: 35 },
              { criterion: 'Quality of written analysis', weight: 20 },
              { criterion: 'Evidence of deliberate composition thinking', weight: 20 },
            ],
            dueDay: 21,
            estimatedTime: '2 hours',
          },
          {
            week: 4,
            title: 'The Crumpled Paper Challenge',
            brief: 'The classic atelier exercise: render a crumpled piece of white paper under a single point source of light. The goal is to capture every subtle value transition — no guessing, pure observation. Spend minimum 90 minutes on this drawing.',
            rubric: [
              { criterion: 'Subtlety and accuracy of value transitions', weight: 40 },
              { criterion: 'Edge variety (hard/soft/lost used appropriately)', weight: 30 },
              { criterion: 'Overall three-dimensional reading', weight: 30 },
            ],
            dueDay: 28,
            estimatedTime: '2 hours',
          },
        ],
        finalProject: {
          title: 'Chiaroscuro: A Dramatic Value Study',
          brief: `Chiaroscuro — the bold Italian technique of extreme light and dark contrast — is one of the most powerful tools in visual art. For your Month 1 Course B final project, you will create a dramatic chiaroscuro drawing in the tradition of Caravaggio and Rembrandt.

**Requirements:**
- Subject: A figure (full or partial) under a single, strong, direct light source in a dark environment
- Medium: Graphite, charcoal, or pen and ink on dark paper with white pencil allowed
- Size: A4 or larger
- The image should be predominantly dark (low key) with carefully placed lights
- Demonstrate all six zones of light and shadow
- Show clear light and shadow family separation

**Your Process:**
1. Photograph your subject under the dramatic light
2. Create three value thumbnails exploring different cropping/compositions
3. Do a two-value block-in first
4. Develop the full rendering from there
5. Submit: thumbnails, block-in, and final work

**Artistic Inspiration:** Study Caravaggio's *The Calling of Saint Matthew*, Rembrandt's self-portraits, and Georges de La Tour's candlelit scenes. Notice how the darkest darks and brightest lights exist right next to each other at the focal point.`,
          rubric: [
            { criterion: 'Dramatic value range and low-key atmosphere', weight: 30 },
            { criterion: 'Accuracy of all six light/shadow zones', weight: 30 },
            { criterion: 'Compositional strength (clear focal point)', weight: 20 },
            { criterion: 'Technical execution and edge quality', weight: 20 },
          ],
          dueDay: 30,
          passingScore: 80,
          estimatedTime: '5–6 hours',
          masterArtistReference: 'Caravaggio — The Calling of Saint Matthew (1600)',
        },
      },
    ],
    studioChallenge: {
      title: 'Daily Gesture Warm-Up Practice',
      description: 'Every day of Month 1, begin your session with 10 minutes of gesture drawing. Use Quickposes.com or Line of Action (line-of-action.com) set to 30-second or 1-minute poses. The goal is NOT finished drawings — it\'s training your eye-hand speed and developing your internal library of the human figure. Keep a sketchbook dedicated only to gestures. Date every session.',
      frequency: 'Daily (10 minutes)',
    },
  },

  // ============================================================
  // MONTH 2
  // ============================================================
  {
    month: 2,
    year: 1,
    title: 'The Architecture of Space',
    subtitle: 'Perspective is the grammar of the visual language.',
    theme: 'perspective',
    courses: [
      {
        id: 'M02-A',
        title: '1- & 2-Point Perspective',
        subtitle: 'Constructing Space That Obeys the Laws of Physics',
        teacher: getTeacher('marcus'),
        description: 'Perspective is not a trick or a shortcut. It is a mathematical model of how the eye perceives three-dimensional space projected onto a two-dimensional surface. Understanding it doesn\'t constrain creativity — it gives you a foundation solid enough to break intentionally. We begin with the horizon line and build a world from there.',
        references: [
          { title: 'Perspective Made Easy', author: 'Ernest Norling', note: 'The clearest introduction to perspective ever written. Read Chapters 1–7.' },
          { title: 'How to Draw', author: 'Scott Robertson', note: 'The industry standard for technical perspective. Chapters 1–4.' },
          { title: 'Framed Ink', author: 'Marcos Mateu-Mestre', note: 'Chapter 2 on using perspective for dynamic storytelling.' },
        ],
        lessons: [
          {
            day: 1,
            title: 'The Station Point, Eye Level, and Horizon Line',
            duration: '50 min',
            content: `Before we draw a single perspective line, we need to understand the geometry that makes perspective work. Perspective is not a drawing system — it's a projection system. Once you understand what's being projected and how, the rules become self-evident.

**The Station Point**
The station point is where the viewer's eye is located in three-dimensional space. Everything in perspective is calculated relative to this fixed position. In a drawing, we can only ever show the world from one station point at a time (unless you're doing complex multi-point perspective, which we'll cover in Month 14).

**Eye Level and the Horizon Line**
Your eye level is the height of your eyes above the ground. In a drawing, this is represented by the horizon line — a horizontal line across your picture plane at exactly the height of the viewer's eyes.

The horizon line is perhaps the most important line in any drawing or painting. Every critical spatial relationship radiates from it:
- Objects above the horizon line: we see their bottom surfaces
- Objects below the horizon line: we see their top surfaces
- Objects crossing the horizon line: at eye level

**Real-World Observation**
Go outside (or look out a window). Find the horizon. Notice that telephone poles near you appear to rise well above the horizon, while poles far away barely reach it. Railings of a straight fence converge to the horizon. This is perspective operating in real life.

**The Picture Plane**
The picture plane is the imaginary flat surface between the viewer and the scene — like a pane of glass held at arm's length. Everything you draw is a projection of the 3D scene onto this flat plane. This is precisely what a camera does. Understanding this demystifies perspective completely.`,
            keyTerms: ['Station point', 'Eye level', 'Horizon line', 'Picture plane', 'Vanishing point'],
            exercise: 'Photograph a street scene or look at one through a window. Draw the horizon line and identify all lines that converge to it. Trace the perspective lines on a copy of the photo. Then re-draw the scene from scratch using only the horizon line as your guide. 50 minutes.',
          },
          {
            day: 2,
            title: 'One-Point Perspective: Interior Spaces',
            duration: '55 min',
            content: `One-point perspective gets its name from having a single vanishing point. It's the perspective you see when looking straight down a hallway, a road, or into a room from a frontal angle. All receding lines converge to this single point on the horizon.

**When to Use One-Point Perspective**
One-point perspective is most appropriate when:
- The subject is primarily facing the viewer (frontal planes are parallel to the picture plane)
- You want a direct, frontal, sometimes formal composition
- You're drawing tunnels, hallways, roads, or rooms seen from the front

**Constructing a Room in One-Point Perspective**
1. Draw the horizon line
2. Place the vanishing point (VP) on the horizon line
3. Draw the back wall as a simple rectangle
4. Draw lines from the four corners of the back wall to the VP — these are your receding walls, floor, and ceiling
5. Decide how far the room extends (draw a vertical line to cut off the depth)
6. Add doors, windows, furniture — all receding edges point to the VP

**The Railroad Track Phenomenon**
Horizontal lines parallel to the picture plane remain horizontal. Vertical lines remain vertical. Only lines that recede into depth (perpendicular to the picture plane) converge to the VP. This is a key rule that beginners often violate.

**Atmospheric Perspective (Value)**
Combine what you learned in Month 1: objects farther away are lighter in value, have less contrast, and have softer edges. This enhances the sense of depth.`,
            keyTerms: ['One-point perspective', 'Vanishing point', 'Receding lines', 'Frontal planes', 'Atmospheric perspective'],
            exercise: 'Draw three rooms in one-point perspective from scratch: (1) a library with bookshelves, (2) a long hallway with doorways, (3) a train car interior. No reference photos — construct everything from the perspective system. 55 minutes.',
          },
          {
            day: 3,
            title: 'Two-Point Perspective: Corner Views',
            duration: '55 min',
            content: `Two-point perspective introduces a second vanishing point and gives us the ability to draw objects from a corner angle — arguably the most common and dynamic compositional viewpoint in illustration, architecture, and sequential art.

**When to Use Two-Point Perspective**
Two-point perspective applies when:
- The viewer is looking at a corner of an object (both front faces are angled to the viewer)
- Neither face of the object is parallel to the picture plane
- Drawing architecture, vehicles, furniture, or environments from a three-quarter view

**The Two Vanishing Points**
In two-point perspective, both VP1 and VP2 sit on the horizon line. All horizontal edges of an object converge to one of the two VPs. Vertical edges remain perfectly vertical.

**Constructing a Building in Two-Point Perspective**
1. Establish the horizon line
2. Place VP1 (left) and VP2 (right) — far apart for a natural look
3. Draw the vertical corner line (the nearest vertical edge of the building)
4. From the top and bottom of the corner line, draw receding lines to VP1 and VP2
5. Establish the width of each face with additional vertical lines
6. Add windows, doors, floors — all horizontal edges converge to the respective VP

**The Eye Level Rule**
Objects below the horizon line: we look down at them (tops visible).
Objects above the horizon line: we look up at them (bottoms visible).
Objects straddling the horizon: complex cases where some planes face up, some down.

**Multiple Objects at Different Angles**
Each object at a different angle to the viewer has its own pair of vanishing points. But all VPs sit on the SAME horizon line — because there's only one eye level.`,
            keyTerms: ['Two-point perspective', 'Corner view', 'Multiple VP pairs', 'Vertical edge rule', 'VP placement distance'],
            exercise: 'Create a street scene showing at least 4 buildings from different angles (each with its own VP pair). All VPs must sit on the same horizon line. Add one interior space visible through a window using one-point perspective within the two-point framework. 55 minutes.',
          },
          {
            day: 4,
            title: 'Constructing Boxes and Grids',
            duration: '50 min',
            content: `The ability to draw a convincing box in any orientation is the single most powerful perspective skill you can have. Boxes are not just boxes — they're the scaffolding for every complex form: buildings, vehicles, furniture, and even the human figure.

**The Box as Universal Armature**
In his book *How to Draw*, Scott Robertson argues that almost everything can be understood as modified boxes. An arm is a tapered box. A head is a rounded box. A car is several interlocking boxes. The ellipses for wheels are circles on the planes of boxes. If you can draw a convincing box from any angle, you can draw anything.

**Constructing Boxes from Any View**
1. Always start with the horizon line and appropriate VPs
2. Draw the corner vertical first
3. Recede to both VPs
4. Decide the width of each face (new verticals)
5. Close the box by connecting across

**Grid Construction**
A perspective grid is a series of boxes (or tiles) laid flat on a ground plane, receding into depth. It's the most powerful tool for placing multiple objects correctly in a scene.

To construct a one-point grid:
1. Draw the horizon line
2. Place the VP
3. Draw equally spaced lines radiating from the VP to the bottom of the picture
4. To find equal spacing in depth, use the diagonal method: draw a diagonal from one corner to the opposite, then intersect with your receding lines — each intersection marks an equal depth interval

**Measuring Units in Perspective**
You can maintain correct proportions by using a measuring point (MP) on the horizon line. This advanced technique allows you to transfer real measurements into perspective space precisely.`,
            keyTerms: ['Box construction', 'Perspective grid', 'Diagonal method for equal spacing', 'Measuring point', 'Armature'],
            exercise: 'Create a city street scene using only perspective boxes — no organic forms. The buildings, sidewalk tiles, cars (as boxes), windows, and street furniture should all be box-derived forms. Use two-point perspective throughout. Add value to give depth. 50 minutes.',
          },
          {
            day: 5,
            title: 'Perspective Drawing From Life',
            duration: '55 min',
            content: `Everything we've done this week has been constructed — starting with vanishing points. Today we go the other direction: starting with observation. We look at a real environment and find the perspective structure hiding inside it.

**The Analytical Approach**
Take a sketchbook to a room or go outside. Before drawing anything, analyze the space:
- Where is your horizon line? (Stand up: it's at eye level. Sit down: lower.)
- Where do the major receding lines converge?
- Are there multiple object orientations? (Multiple VP pairs)

**Finding VPs by Extension**
In a real scene, receding lines don't usually extend to a visible VP — it's often far off the page. To find it: extend two parallel receding lines (like the top and bottom of a table edge) and see where they'd meet. Even if that point is off your paper, you know the direction.

**The Perspective Grid Sketch**
Before committing to a finished drawing, spend 5 minutes sketching the perspective grid structure of your scene: horizon line, VP locations, major receding lines. This is called "perspective notation" and professional background artists do it habitually.

**When Reality Breaks the Rules**
Real-world perspective is messier than theoretical perspective. Lenses distort. Eyes move. This is why good perspective drawing is a skill — you're translating messy reality into a consistent, convincing mathematical system that the brain accepts as "true."

**Speed and Intuition**
Ultimately, you want perspective sense to become intuitive — where you can quickly judge whether a receding line looks right without measuring. This comes from thousands of hours of practice. Laying the intellectual foundation now makes the intuition develop faster.`,
            keyTerms: ['Analytical perspective', 'Perspective notation', 'Finding VPs from observation', 'Perspective intuition'],
            exercise: 'Go to an interesting interior space (café, library, bedroom) and create three drawings from different positions: (1) sitting on the floor (low horizon), (2) standing at eye level (middle horizon), (3) elevated view if possible (high horizon). Notice how the same space looks radically different depending on your station point. 55 minutes.',
          },
        ],
        weeklyAssignments: [
          { week: 1, title: 'Interior Room', brief: 'Design and draw a fully furnished room in one-point perspective. Include at least 8 distinct furniture/architectural elements. The room should tell a story — whose room is it?', rubric: [{ criterion: 'Perspective accuracy', weight: 40 }, { criterion: 'Consistency of all elements to VP', weight: 30 }, { criterion: 'Atmospheric depth (value)', weight: 15 }, { criterion: 'Storytelling detail', weight: 15 }], dueDay: 7, estimatedTime: '3 hours' },
          { week: 2, title: 'Urban Corner', brief: 'Draw an urban street corner with at least 4 buildings, 2 different VP pairs, signage, vehicles (boxes), and street furniture. Use two-point perspective.', rubric: [{ criterion: 'Two-point perspective accuracy', weight: 40 }, { criterion: 'Multiple VP pairs on same horizon', weight: 25 }, { criterion: 'Scale consistency', weight: 20 }, { criterion: 'Visual interest and composition', weight: 15 }], dueDay: 14, estimatedTime: '3 hours' },
          { week: 3, title: 'Box Studies', brief: '20 boxes from 20 different orientations and eye levels. Each box must be fully constructed from VPs, not drawn freehand. No two boxes may share the same VP pair.', rubric: [{ criterion: 'Construction accuracy', weight: 50 }, { criterion: 'Variety of orientations', weight: 30 }, { criterion: 'Value shading applied', weight: 20 }], dueDay: 21, estimatedTime: '2 hours' },
          { week: 4, title: 'Perspective From Life', brief: 'Three life perspective drawings from three different locations, each done on-site. Show your perspective notation sketch for each.', rubric: [{ criterion: 'Accuracy of observed perspective', weight: 40 }, { criterion: 'Quality of notation sketches', weight: 25 }, { criterion: 'Atmospheric depth', weight: 20 }, { criterion: 'On-site observational quality', weight: 15 }], dueDay: 28, estimatedTime: '4 hours' },
        ],
        finalProject: {
          title: 'The Imagined World: A Full Environment in Two-Point Perspective',
          brief: `Design and draw a fully realized environment from imagination using two-point perspective. This is your first world-building exercise — make it interesting, atmospheric, and personal.\n\n**Requirements:**\n- Minimum A4 size, landscape orientation\n- Two-point perspective with at least two different VP pairs (objects at different angles)\n- At least 15 architectural or object elements\n- Human figure for scale (even a rough one)\n- Full value rendering (atmospheric perspective — objects fade into the distance)\n- Design the space to feel like a real place: what time of day is it? What's the weather? Who lives here?\n\n**Process:**\n1. Five thumbnail explorations of different environments (warehouse, temple, rooftop, underground station, ancient ruins)\n2. Select one and create a tight perspective grid sketch\n3. Add linework detail\n4. Render values with atmospheric depth\n\n**Inspiration:** Study background art from Studio Ghibli films, Moebius environments, and the background paintings of Mary Blair.`,
          rubric: [{ criterion: 'Perspective technical accuracy', weight: 35 }, { criterion: 'Atmospheric depth and value', weight: 25 }, { criterion: 'Design quality and visual interest', weight: 25 }, { criterion: 'Scale and proportion consistency', weight: 15 }],
          dueDay: 30, passingScore: 80, estimatedTime: '6–8 hours',
          masterArtistReference: 'Moebius (Jean Giraud) — Environment work from The Incal (1981)',
        },
      },
      {
        id: 'M02-B',
        title: '3-Point Perspective & Complex Geometry',
        subtitle: 'Mastering Extreme Angles and Spatial Complexity',
        teacher: getTeacher('marcus'),
        description: 'Two-point perspective describes most of what we see at eye level. But the world is also seen from rooftops, from the floor looking up, and from dramatic cinematic angles. Three-point perspective adds a third vanishing point to handle these extremes — and opens the door to the dynamic, camera-like compositions that define professional illustration and comics.',
        references: [
          { title: 'How to Draw', author: 'Scott Robertson', note: 'Chapters 5–7 on 3-point and complex geometry.' },
          { title: 'Dynamic Manga: Perspective and Layout', author: 'Shigeki Uchida', note: 'Japanese perspective techniques for dramatic compositions.' },
          { title: 'Perspective! for Comic Book Artists', author: 'David Chelsea', note: 'Highly readable guide with clear comic-art applications.' },
        ],
        lessons: [
          { day: 1, title: 'The Third Vanishing Point: Worm\'s Eye and Bird\'s Eye Views', duration: '50 min', content: `When we look straight at a building from ground level, vertical lines appear truly vertical — parallel to the sides of our picture frame. But when we look up at a skyscraper or peer down from a cliff edge, those vertical lines begin to converge. That convergence is the third vanishing point.\n\n**When Does 3-Point Activate?**\nThree-point perspective activates whenever the viewer tilts their gaze significantly up or down. It's most extreme in:\n- **Worm's eye view**: Looking up from ground level. Verticals converge to VP3 above the scene.\n- **Bird's eye view**: Looking down from above. Verticals converge to VP3 below the scene.\n\n**VP3 Placement**\n- Worm's eye: VP3 is placed HIGH above the horizon line — sometimes far off the page\n- Bird's eye: VP3 is placed LOW below the horizon line — again, often far off the page\n\nThe farther VP3 is from the horizon line, the more subtle the vertical convergence. Moving VP3 closer creates a more extreme, dramatic distortion.\n\n**The Three-VP Construction**\nIn 3-point perspective:\n- All horizontal edges recede to VP1 or VP2 (on the horizon)\n- ALL vertical edges converge to VP3\n- No lines in the drawing are truly horizontal or vertical — every line converges to one of the three VPs\n\nThis makes 3-point perspective the most geometrically rigorous system and the most powerful for dramatic effect.`, keyTerms: ['Three-point perspective', 'Worm\'s eye view', 'Bird\'s eye view', 'VP3 placement', 'Vertical convergence'], exercise: 'Draw the same building in three conditions: (1) at eye level — 2-point perspective, (2) from below — 3-point worm\'s eye, (3) from above — 3-point bird\'s eye. Emphasize how dramatically the same structure changes personality with each view. 50 minutes.' },
          { day: 2, title: 'Constructing Complex Geometric Forms', duration: '55 min', content: `With three vanishing points established, we can now construct complex architectural forms with confidence. This lesson focuses on the technique of breaking complex geometry into perspective boxes and then modifying those boxes.\n\n**The Box-Subtract Method**\nEvery complex form can be built by starting with a box and subtracting from it:\n1. Construct a perspective box that contains the entire object\n2. Subdivide the box to find specific proportions\n3. Cut away the unwanted portions\n4. Add any protruding details (overhangs, pillars, towers)\n\n**Subdividing Planes in Perspective**\nTo find the center of any perspective plane: draw the diagonals (X pattern). The center is where they cross. This works in any perspective system.\n\nTo subdivide into thirds or quarters: use the diagonal intersection method repeatedly, or use measuring points for precision.\n\n**Circles in Perspective: Ellipses**\nA circle in perspective is an ellipse. The width-to-height ratio of the ellipse depends on the tilt of the circular plane relative to the viewer:\n- A circle on a horizontal plane viewed from near-eye-level: very flat ellipse\n- A circle on a horizontal plane viewed from 45° above: medium ellipse\n- A circle on a plane facing the viewer directly: a perfect circle\n\nThe major axis of an ellipse (its widest dimension) is always perpendicular to the axis of the cylinder that contains it. This is a key rule that many intermediate artists violate.`, keyTerms: ['Box-subtract method', 'Plane subdivision', 'Diagonal center-finding', 'Ellipse major axis rule', 'Complex geometry construction'], exercise: 'In 3-point perspective (worm\'s eye view), construct: a cathedral with towers and spires, a rocket ship, and a massive ancient tree (tree trunk = cylinder, branches = modified cylinders). All must be pure perspective constructions. 55 minutes.' },
          { day: 3, title: 'Designing Dynamic Compositions with Extreme Angles', duration: '50 min', content: `Technical perspective is worthless without compositional purpose. The angle you choose — your "camera" position — communicates psychological information to the viewer before they consciously process the image. This lesson is about using perspective as an emotional tool.\n\n**Camera Angles as Emotional Language**\n\n- **Low angle (worm's eye)**: The subject appears powerful, dominant, threatening or awe-inspiring. The viewer feels small. Classic hero shots. Classic villain reveals.\n\n- **High angle (bird's eye)**: The viewer is in a position of power or overview. The subject can feel diminished, vulnerable, or observed. Often used for establishing shots and to show spatial relationships.\n\n- **Eye level**: Neutral, journalistic, relatable. The viewer is a peer to the subject. Documentary, intimate.\n\n- **Dutch angle** (tilted horizon): Psychological unease, tension, wrongness. Horror, thrillers, moments of confusion.\n\n**The Comic Book Economy**\nIn comics and sequential art, the camera angle must serve the story beat:\n- Action scene: Low angles, worm's eye for impact\n- Character dialogue: Eye level or slight low angle for intimacy\n- Establishing shot: High angle to show the full environment\n- Reveal: Dutch angle or extreme perspective to signal significance\n\n**The 180-Degree Rule**\nIn sequential art, the camera should not cross an imaginary line between two characters (the action axis) — this causes the viewer to lose spatial orientation. Perspective helps maintain this.`, keyTerms: ['Low angle', 'High angle', 'Dutch angle', 'Camera angle psychology', '180-degree rule', 'Sequential perspective'], exercise: 'Draw the same scene (a figure entering a doorway) 5 times from 5 radically different camera angles. Write one sentence on the emotional effect of each angle. 50 minutes.' },
          { day: 4, title: 'Interior Architecture in 3-Point Perspective', duration: '55 min', content: `Interior perspective is one of the most technically demanding and visually rewarding exercises in this course. When combined with 3-point perspective, it creates the soaring, immersive interior spaces found in the best graphic novels and game concept art.\n\n**Cathedral and Industrial Interior Construction**\n\nHigh interior spaces (cathedrals, warehouses, subway stations) are perfect 3-point environments because looking up at the ceiling while standing on the floor naturally creates vertical convergence.\n\n**The Key Steps:**\n1. Establish eye level low (near the floor) — this gives us a dramatic upward view\n2. VP1 and VP2 on the horizon\n3. VP3 far above (the ceiling will converge dramatically upward)\n4. Construct the floor as a 2-point grid\n5. Rise the walls using converging verticals to VP3\n6. Add structural elements: columns, arches, windows — all following the same system\n\n**Lighting in Perspective Interiors**\nA single point of light in a perspective interior (a candle, a lamp) creates shadows that converge to a shadow vanishing point (SVP) directly below the light source. This is the perspective system that governs cast shadows — and it's the same VP-based mathematics.\n\n**Atmospheric Layers**\nIn a deep interior, atmospheric perspective (value fade) makes distant elements lighter and less defined. Foreground elements are darkest and most detailed. This creates the convincing sense of a space that truly extends into depth.`, keyTerms: ['Interior 3-point perspective', 'Shadow vanishing point', 'Atmospheric depth in interiors', 'Vertical convergence in architecture'], exercise: 'Draw a dramatic interior space in 3-point perspective: choose from a cathedral, an underground train station, or a villain\'s tower. Include at least one light source and add value using atmospheric perspective. Minimum 55 minutes.' },
          { day: 5, title: 'Speed Perspective and Intuitive Spatial Drawing', duration: '50 min', content: `Every lesson this week has been methodical — establishing VPs, constructing boxes, working systematically. Today we address what happens when you need to draw fast: when you're thumbnailing, storyboarding, or sketching on location and can't measure anything.\n\n**The Shorthand Perspective System**\n\nProfessional illustrators rarely plot full perspective grids for quick sketches. Instead, they develop a feel for perspective based on deep structural understanding. Here's how they do it:\n\n1. **Horizon sense**: Always know where your horizon line is before any other mark. It's an unconscious habit in experienced artists.\n\n2. **Angle judgment**: You develop a calibrated sense of how steep a receding line should look at different distances from the VP. This comes from drawing thousands of perspective constructions.\n\n3. **The ellipse check**: Circles on horizontal planes should be flat; circles on planes facing the viewer should be round. A quick check prevents embarrassing perspective errors in wheels, cups, and eyes.\n\n**Speed Box Studies**\nProfessional concept artists do "box studies" — drawing hundreds of boxes in perspective as fast as possible, no VPs, just intuition. They then check their intuitive boxes against properly constructed ones and correct their mental model. This is the fastest way to develop perspective intuition.\n\n**Closing: Perspective as Liberation**\nThe goal of all this technical work is freedom, not constraint. When perspective is second nature, you can design environments, characters, and compositions that feel spatially convincing even when stylized — because the underlying spatial logic is correct. Manga masters like Naoki Urasawa and Katsuhiro Otomo have impeccable intuitive perspective, which is why their worlds feel utterly real.`, keyTerms: ['Intuitive perspective', 'Speed box studies', 'Horizon sense', 'Perspective shorthand'], exercise: 'Timed exercise: 20 speed box studies in 20 minutes (1 minute each). Then draw three quick (5-minute) environment thumbnails using only intuitive perspective — no plotting VPs. Afterward, construct the correct version of one of your thumbnails using proper VPs and compare. 50 minutes total.' },
        ],
        weeklyAssignments: [
          { week: 1, title: 'Worm\'s Eye Hero', brief: 'Draw a superhero (or any powerful character) from a worm\'s eye view in 3-point perspective. The character should feel dominant and imposing. Show your VP3 location even if it\'s off the page (extend with tape). Minimum 2 hours.', rubric: [{ criterion: '3-point perspective accuracy', weight: 35 }, { criterion: 'Emotional impact of chosen angle', weight: 25 }, { criterion: 'Figure believability', weight: 25 }, { criterion: 'Value and atmosphere', weight: 15 }], dueDay: 7, estimatedTime: '2.5 hours' },
          { week: 2, title: 'City from the Sky', brief: 'Bird\'s-eye view of a city block in 3-point perspective. Show at least 8 buildings of different heights and shapes, streets, vehicles (boxes), and one tiny figure for scale. Use atmospheric perspective.', rubric: [{ criterion: 'Perspective accuracy', weight: 35 }, { criterion: 'Spatial complexity', weight: 25 }, { criterion: 'Atmospheric depth', weight: 25 }, { criterion: 'Design and visual interest', weight: 15 }], dueDay: 14, estimatedTime: '3 hours' },
          { week: 3, title: 'Dramatic Interior', brief: 'Draw a dramatic interior in 3-point perspective: a cathedral, ancient library, underground cavern, or futuristic server room. Include a light source and cast shadows. Render fully in values.', rubric: [{ criterion: 'Perspective construction quality', weight: 35 }, { criterion: 'Atmospheric depth', weight: 25 }, { criterion: 'Light source consistency', weight: 25 }, { criterion: 'Design atmosphere', weight: 15 }], dueDay: 21, estimatedTime: '3 hours' },
          { week: 4, title: 'Speed Perspective Portfolio', brief: '30 speed box studies (no VPs — intuition only), plus 5 environment thumbnails using intuitive perspective. Submit all 35 sketches on one page each.', rubric: [{ criterion: 'Perspective quality across all boxes', weight: 40 }, { criterion: 'Improvement visible across the series', weight: 30 }, { criterion: 'Environment thumbnail quality', weight: 30 }], dueDay: 28, estimatedTime: '2.5 hours' },
        ],
        finalProject: {
          title: 'The Cinematic Environment: A Multi-Panel Space in Perspective',
          brief: `Create three panels of a graphic novel page, all showing the same environment from three dramatically different camera angles (one worm\'s eye, one eye level, one bird\'s eye). Each panel must be fully perspective-constructed and atmospherically rendered.\n\n**This project tests everything from Month 2:**\n- 1-point and 2-point perspective (the eye-level and interior panels)\n- 3-point perspective (worm\'s eye and bird\'s eye)\n- Value and atmospheric depth from Month 1\n- Composition sense\n- Storytelling through camera choice\n\n**Requirements:**\n- One page (A4 minimum), three-panel layout\n- Each panel shows the same environment (your choice: factory, ruins, spaceport, castle)\n- All three perspective systems represented\n- Full value rendering\n- Gutter between panels\n\n**Process:** 5 thumbnails → Select best → Full perspective grids → Linework → Values.`,
          rubric: [{ criterion: 'Perspective accuracy across all three systems', weight: 40 }, { criterion: 'Atmospheric depth and value quality', weight: 25 }, { criterion: 'Camera angle variety and emotional purpose', weight: 20 }, { criterion: 'Page design and panel composition', weight: 15 }],
          dueDay: 30, passingScore: 80, estimatedTime: '7–10 hours',
          masterArtistReference: 'Katsuhiro Otomo — Akira Volume 1 (1982) — environment backgrounds',
        },
      },
    ],
    studioChallenge: {
      title: 'Urban Sketching',
      description: 'Three times this month, take your sketchbook outside or to a window and do 30-minute on-site perspective sketches of real urban or architectural environments. Date and location-stamp each sketch. These are informal — speed and observation matter more than finish.',
      frequency: '3× this month (30 min each)',
    },
  },

  // ============================================================
  // MONTHS 3–24: Abbreviated but with full structure
  // ============================================================
  {
    month: 3, year: 1, title: 'Constructing Reality', subtitle: 'Breaking complexity into simple forms — the sculptor\'s secret.',
    theme: 'construction',
    courses: [
      { id: 'M03-A', title: 'Constructive Drawing', subtitle: 'Primitives, Planes & the Sculpture Mindset', teacher: getTeacher('eleanor'), description: 'The constructive approach treats every object as a 3D sculpture made of simple primitives — spheres, cylinders, and boxes. This method, championed by Andrew Loomis and the entire Imaginative Realism tradition, liberates you from copying and allows you to draw anything from imagination.', references: [{ title: 'Fun with a Pencil', author: 'Andrew Loomis', note: 'Full book — the original constructive method for the human head.' }, { title: 'The Creative Habit', author: 'Twyla Tharp', note: 'Chapter on building an artistic process.' }], lessons: [{ day: 1, title: 'The Three Primitives', duration: '50 min', content: 'Every object in the known universe can be described by three fundamental geometric forms: the sphere, the cylinder, and the box (rectangular prism). This is not an oversimplification — it is the most powerful analytical tool in drawing.\n\n**The Sphere** contains all curved, organic, rounded forms: heads, shoulders, fruit, boulders, planets.\n\n**The Cylinder** contains all forms with consistent cross-sections: arms, legs, tree trunks, columns, cans, fingers.\n\n**The Box** contains all forms with flat planes: buildings, books, vehicles, chests, hands (simplified).\n\n**Why This Matters:**\nWhen you can see the world in primitives, you can draw anything from imagination — because you know the 3D structure that underlies the surface appearance. A realistic nose is a sphere sitting on a wedge box. An ear is a series of interlocking curved planes. A muscular forearm is a cylinder twisted and tapered with another cylinder (the ulna/radius grouping) riding on it.\n\n**The Loomis Method**\nAndrew Loomis, whose drawing books have been industry standards for decades, built his entire system on this principle. His portrait method begins with a sphere for the cranium, then cuts planes away to define the face. His figure method begins with blocked-in volumes for the torso, pelvis, and limbs — all derived from box and cylinder primitives.', keyTerms: ['Sphere', 'Cylinder', 'Box', 'Loomis method', 'Primitive analysis'], exercise: 'Go around your living space and draw 15 everyday objects. For each, draw the object itself AND the primitive(s) that describe its basic structure. Label each primitive. 50 minutes.' }], weeklyAssignments: [{ week: 1, title: 'Object Deconstruction', brief: 'Choose 5 complex objects and deconstruct each into its component primitives, then reconstruct the full form from those primitives.', rubric: [{ criterion: 'Accuracy of primitive analysis', weight: 40 }, { criterion: 'Clean reconstruction from primitives', weight: 35 }, { criterion: 'Perspective consistency', weight: 25 }], dueDay: 7, estimatedTime: '3 hours' }], finalProject: { title: 'The Constructed Figure', brief: 'Draw a full human figure from imagination using only the constructive approach: primitives first, detail second. The figure must be in a dynamic pose. Submit: primitive sketch, refined construction, final rendering.', rubric: [{ criterion: 'Primitive accuracy', weight: 30 }, { criterion: 'Figure construction believability', weight: 30 }, { criterion: 'Dynamic pose quality', weight: 25 }, { criterion: 'Final rendering quality', weight: 15 }], dueDay: 30, passingScore: 80, estimatedTime: '6 hours', masterArtistReference: 'Andrew Loomis — Figure Drawing for All It\'s Worth (1943)' } },
      { id: 'M03-B', title: 'Still Life Mastery', subtitle: 'Translating 3D Reality to the 2D Plane', teacher: getTeacher('amara'), description: 'Still life is the boot camp of observational drawing. Every great artist has spent hundreds of hours staring at pots, fruit, and cloth — because still life never lies, never moves, and never flatters. What you see is exactly what is there.', references: [{ title: 'The Painter\'s Handbook', author: 'Mark David Gottsegen', note: 'Material and technique for setting up still lifes.' }, { title: 'The Art Spirit', author: 'Robert Henri', note: 'Philosophical foundation for observation-based practice.' }], lessons: [{ day: 1, title: 'Setting Up a Still Life That Teaches You Something', duration: '45 min', content: 'A still life is not just a collection of random objects — it is a curated lesson. The objects you choose, how you light them, and how you arrange them should create a specific visual problem for you to solve.\n\n**Choosing Your Objects:**\nChoose objects that contrast: smooth vs. rough, reflective vs. matte, round vs. angular, light vs. dark. This forces you to render different materials and edges within one study.\n\n**The Lighting Setup:**\nUse a single, directional light source (a desk lamp works perfectly). This creates clear, readable shadows. Avoid overhead room lighting — it flattens everything. Position your light at a 45° angle from the side for the most instructive shadow pattern.\n\n**The Compositional Setup:**\nApply everything from Month 1 Course B: thumbnail your composition before setting up. Where is the focal point? Are the value masses interesting? Is there a foreground, middle ground, and background in your arrangement?', keyTerms: ['Compositional setup', 'Single-light-source study', 'Material contrast selection', 'Foreground-middle-background'], exercise: 'Set up three different still life arrangements with the same objects, each with different compositional strategies (Rule of Thirds, centered focal point, asymmetric). Photograph all three and do quick value thumbnails of each. Choose the strongest and explain why in writing. 45 minutes.' }], weeklyAssignments: [{ week: 1, title: 'Material Study', brief: 'Draw a still life featuring at least 3 different materials: glass, fabric, metal, wood, stone, or fruit. Focus on how the material affects edge quality, value transitions, and highlight behavior.', rubric: [{ criterion: 'Material differentiation', weight: 40 }, { criterion: 'Edge quality appropriate to material', weight: 30 }, { criterion: 'Overall value structure', weight: 30 }], dueDay: 7, estimatedTime: '3 hours' }], finalProject: { title: 'The Vanitas: A Symbolic Still Life', brief: 'In the Dutch Golden Age tradition, the Vanitas still life arranged objects symbolically — a skull, an hourglass, a wilting flower — to meditate on mortality. Your final project is a fully rendered still life with a theme. Choose your objects deliberately to tell a story or express an emotion.', rubric: [{ criterion: 'Technical rendering quality', weight: 30 }, { criterion: 'Material differentiation', weight: 25 }, { criterion: 'Compositional strength', weight: 25 }, { criterion: 'Thematic coherence', weight: 20 }], dueDay: 30, passingScore: 80, estimatedTime: '6–8 hours', masterArtistReference: 'Pieter Claesz — Vanitas Still Life (1630)' } },
    ],
    studioChallenge: { title: 'Daily Sketchbook Thumbnails', description: 'Fill one page of your sketchbook per day with thumbnail sketches — any subject, any style. These are 2-minute each, no detail. The goal is volume and variety.', frequency: 'Daily (15 min)' },
  },

  // Months 4-24 abbreviated for data structure
  ...generateRemainingMonths()
];

function generateRemainingMonths() {
  const months = [];

  const monthData = [
    { month: 4, title: 'The Architecture of the Human Body', subtitle: 'Bone landmarks, structure, and the skeleton beneath the skin.', theme: 'anatomy', teacherA: 'ingrid', teacherB: 'ingrid', courseA: 'Human Anatomy I: The Skeleton', courseB: 'Human Anatomy II: Muscles', descA: 'Great figure drawing begins with understanding what lies beneath the surface. The skeleton is the invisible armature that determines every proportion, every pose, and every surface landmark of the body. Before a single muscle can be drawn convincingly, its underlying bone structure must be understood.', descB: 'Now that the skeleton is understood, we layer the muscles — the engine of the figure. We study the major muscle groups not as isolated shapes, but as functional structures: what they do, how they attach, and how they change shape when the body moves. This biological understanding is what separates a convincing figure from a symbol.', refsA: [{ title: 'Figure Drawing for All It\'s Worth', author: 'Andrew Loomis', note: 'Chapters 1–3 on skeletal proportions.' }, { title: 'Bridgman\'s Complete Guide to Drawing from Life', author: 'George Bridgman', note: 'The bone-first approach — essential.' }], refsB: [{ title: 'Bridgman\'s Complete Guide to Drawing from Life', author: 'George Bridgman', note: 'Muscle chapters — study every diagram.' }, { title: 'Atlas of Human Anatomy for the Artist', author: 'Stephen Rogers Peck', note: 'The definitive anatomical reference for artists.' }], finalTitleA: 'The Skeleton from Memory', finalBriefA: 'Draw the full human skeleton (front, side, and three-quarter views) entirely from memory. Then compare to reference and mark every error. Study the errors and redraw.', finalTitleB: 'The Écorché Figure', finalBriefB: 'An écorché (from French: "flayed") is a figure drawing that shows the muscles beneath the skin. Create an écorché of a full standing figure showing all major muscle groups.', artRefA: 'Michelangelo — Studies for the Libyan Sibyl (1510-11)', artRefB: 'Leonardo da Vinci — Vitruvian Man (1490)' },
    { month: 5, title: 'Extremities, Expression & the Moving Figure', subtitle: 'Hands, heads, feet, and the flow of gesture.', theme: 'anatomy-extremities', teacherA: 'ingrid', teacherB: 'ingrid', courseA: 'Anatomy III: Extremities & Head Planes', courseB: 'Gesture & Figure Drawing', descA: 'Hands and faces are what viewers look at first. They are also the most complex structures in figure drawing, precisely because we are so familiar with them that every error registers immediately. This course breaks the head, hands, and feet into understandable planar structures.', descB: 'Gesture drawing is the antidote to stiff, overworked figures. It captures the life-force of movement — the thrust, the weight, the intention — in the fewest possible lines. Master gesture, and your figures will always feel alive, no matter how much detail you add afterward.', refsA: [{ title: 'Drawing the Head and Hands', author: 'Andrew Loomis', note: 'The essential guide. Work through every exercise.' }, { title: 'The Laws of Form', author: 'George Bridgman', note: 'Bridgman\'s approach to the head and its planes.' }], refsB: [{ title: 'The Natural Way to Draw', author: 'Kimon Nicolaïdes', note: 'The original gesture book. Do every exercise.' }, { title: 'Force: Dynamic Life Drawing for Animators', author: 'Michael Mattesi', note: 'Force lines and the physics of movement.' }], finalTitleA: 'The Expression Sheet', finalBriefA: 'Draw 20 different facial expressions of the same character (based on the same head construction), showing the full range of human emotion.', finalTitleB: 'Gesture Sequence', finalBriefB: 'A series of 30 gesture drawings at varying lengths (30 seconds, 1 minute, 2 minutes) showing figures in dynamic, sports-related poses.', artRefA: 'John Singer Sargent — Lady Agnew of Lochnaw (1892)', artRefB: 'Egon Schiele — Seated Male Nude (1910)' },
    { month: 6, title: 'The Physics of Color', subtitle: 'How light, pigment, and perception create the world\'s palette.', theme: 'color', teacherA: 'chen', teacherB: 'chen', courseA: 'Color Theory Fundamentals', courseB: 'The Physics of Light & Color', descA: 'Color is the most emotionally powerful element of visual art. It is also the most misunderstood. This course begins with the mechanics — the color wheel, hue, saturation, value — and then shows you how those mechanics combine into harmonious, expressive color relationships.', descB: 'Color doesn\'t just sit on surfaces — it shifts and breathes with changing light. A white wall in morning sun, afternoon light, and overcast sky is three completely different colors. Understanding the physics of light temperature, bounce light, and ambient color transforms your palette from decorative to narrative.', refsA: [{ title: 'Color and Light: A Guide for the Realist Painter', author: 'James Gurney', note: 'The most practical color book for visual artists. Full read.' }, { title: 'Interaction of Color', author: 'Josef Albers', note: 'The psychological and perceptual dimension of color.' }], refsB: [{ title: 'Color and Light', author: 'James Gurney', note: 'Chapters on light temperature and color shift — essential.' }, { title: 'The Impressionists\' Technique', author: 'Bernard Dunstan', note: 'How the Impressionists solved the problem of outdoor light.' }], finalTitleA: 'The Color Wheel Study', finalBriefA: 'Create a fully painted color wheel showing all 12 hues, then a series of color harmony swatches demonstrating complementary, analogous, triadic, and split-complementary schemes.', finalTitleB: 'Time of Day Series', finalBriefB: 'Paint the same simple scene (a room interior or a building exterior) at four different times of day — dawn, noon, golden hour, dusk. Show how color temperature and palette shift dramatically.', artRefA: 'Johannes Vermeer — Girl with a Pearl Earring (1665)', artRefB: 'Claude Monet — Haystacks series (1890–1891)' },
    { month: 7, title: 'The Mark-Makers: Dry Media & Ink', subtitle: 'Mastering graphite, charcoal, and the decisive ink line.', theme: 'dry-media', teacherA: 'amara', teacherB: 'amara', courseA: 'Dry Medium Mastery: Graphite & Charcoal', courseB: 'Ink Foundations: Pen, Brush & Line Weight', descA: 'Graphite and charcoal are not backup mediums for when you\'re learning — they are complete and powerful in themselves. Master artists have produced legendary works in nothing but pencil and charcoal. This course pushes your dry medium skills to a professional level.', descB: 'Ink is absolute. You cannot erase it, blend it, or apologize for it. Working in ink trains the confident, decisive quality that elevates all drawing. The constraint becomes the teacher.', refsA: [{ title: 'The Art of Pencil Drawing', author: 'Gene Franks', note: 'Advanced graphite techniques.' }, { title: 'Charcoal Drawing', author: 'Margaret Krug', note: 'A full guide to charcoal as a fine medium.' }], refsB: [{ title: 'Pen and Ink Drawing', author: 'Alphonso Dunn', note: 'The definitive modern guide to ink techniques.' }, { title: 'Making Comics', author: 'Scott McCloud', note: 'Ink specifically for sequential and illustrative contexts.' }], finalTitleA: 'The Master Study in Graphite', finalBriefA: 'Reproduce a master artwork (drawing or painting) in graphite. The goal is to match the value structure, texture, and mood as closely as possible. Minimum A4 size, minimum 4 hours.', finalTitleB: 'The Ink Portrait', finalBriefB: 'Create a portrait in ink using only linework — no digital tools, no correction fluid. The portrait must show complex lighting through hatching and line weight variation alone.', artRefA: 'Albrecht Dürer — Young Hare (1502)', artRefB: 'Gustave Doré — Illustrations for Dante\'s Inferno (1861)' },
    { month: 8, title: 'The Oil Painter\'s Foundation', subtitle: 'From monochrome underpainting to full-color alla prima.', theme: 'oil-painting', teacherA: 'amara', teacherB: 'amara', courseA: 'Oil Painting I: Grisaille & Underpainting', courseB: 'Oil Painting II: Alla Prima & the Zorn Palette', descA: 'Oil paint is the medium of Rembrandt, Velázquez, and Sargent — and for good reason. Its slow drying time allows endless blending and correction. We begin with grisaille: painting in monochrome greys to build a solid value structure before color is introduced.', descB: 'Alla prima means "at once" — painting completed in a single session while the paint is still wet. It requires decisiveness, confidence, and a limited palette. We work with the Zorn palette: yellow ochre, vermilion, ivory black, and titanium white — four pigments capable of capturing the full range of skin tones and natural light.', refsA: [{ title: 'The Painter\'s Handbook', author: 'Mark David Gottsegen', note: 'Materials, mediums, and the grisaille technique.' }, { title: 'Old Master Painting Techniques', author: 'Suzanne Brooker', note: 'Historical underpainting approaches.' }], refsB: [{ title: 'John Singer Sargent: His Life and Work', author: 'Elaine Kilmurray', note: 'Study the alla prima wet-on-wet approach.' }, { title: 'The Zorn Palette', author: 'James Gurney (blog)', note: 'Gurney\'s extensive writing on the limited palette.' }], finalTitleA: 'Grisaille Portrait', finalBriefA: 'Complete a full grisaille portrait (monochrome oil painting) from a reference photo. Focus entirely on value — no color. Minimum 30cm × 40cm.', finalTitleB: 'Alla Prima Figure Study', finalBriefB: 'Complete an alla prima figure study using only the Zorn palette in a single 3-hour session. The painting must feel fresh and confident — no overworking.', artRefA: 'Rembrandt van Rijn — Self-Portrait (1659)', artRefB: 'Anders Zorn — Daybreak (1888)' },
    { month: 9, title: 'Water-Based Mastery', subtitle: 'The ethereal transparency of watercolor and the bold opacity of gouache.', theme: 'water-media', teacherA: 'amara', teacherB: 'amara', courseA: 'Transparent Water Media: Watercolor', courseB: 'Opaque Water Media: Gouache & Acrylic', descA: 'Watercolor is controlled accident. Its blooms, bleeds, and washes cannot be fully predicted — they must be understood well enough to be guided. This course teaches you to plan carefully while remaining open to the medium\'s beautiful unpredictability.', descB: 'Where watercolor is transparent and ethereal, gouache and acrylic are opaque and decisive. They paint light over dark. They allow corrections. They are the workhorses of illustration, animation concept art, and graphic design.', refsA: [{ title: 'Watercolor Painting: A Comprehensive Approach to Mastering the Medium', author: 'Tom Hoffmann', note: 'The clearest guide to transparent watercolor technique.' }, { title: 'The Watercolorist\'s Complete Guide to Color', author: 'Tom Hill', note: 'Color management in a transparent medium.' }], refsB: [{ title: 'Gouache in Practice', author: 'Annie Rossi', note: 'A practical guide to gouache technique.' }, { title: 'Acrylic Painting Techniques', author: 'Steve Quiller', note: 'Acrylic for fine art application.' }], finalTitleA: 'The Plein Air Watercolor', finalBriefA: 'Go outside and paint a scene en plein air in watercolor. You have 90 minutes maximum (set a timer). The time constraint forces bold, decisive decisions.', finalTitleB: 'The Gouache Illustration', finalBriefB: 'Create a finished illustration in gouache suitable for a children\'s book cover. Show your full range of value and edge control.', artRefA: 'Winslow Homer — Sloop, Nassau (1899)', artRefB: 'Mary Blair — Concept Art for Cinderella (1950)' },
    { month: 10, title: 'The Architecture of Attention', subtitle: 'Composing images that command and guide the eye.', theme: 'composition', teacherA: 'santiago', teacherB: 'santiago', courseA: 'Composition Foundations', courseB: 'Visual Hierarchy & Focal Points', descA: 'Composition is the arrangement of visual elements to create a coherent, compelling image. It is the most invisible of skills — when done right, the viewer doesn\'t notice it. When done wrong, something feels "off" even if the viewer can\'t say why.', descB: 'Every image needs a clear hierarchy: a most-important thing, a second-most-important thing, and supporting elements. Without hierarchy, the eye wanders aimlessly. Visual hierarchy is created through contrast, detail, scale, edge quality, and color — all the tools you\'ve been building.', refsA: [{ title: 'The Photographer\'s Eye', author: 'Michael Freeman', note: 'Visual design principles applicable to all 2D art.' }, { title: 'Framed Ink', author: 'Marcos Mateu-Mestre', note: 'Composition for storytelling and sequential art.' }], refsB: [{ title: 'Design Basics', author: 'David Lauer', note: 'Principles of visual hierarchy and emphasis.' }, { title: 'Understanding Comics', author: 'Scott McCloud', note: 'How composition guides the reader.' }], finalTitleA: 'The Composition Study', finalBriefA: 'Create 5 fully rendered thumbnails (each 4"×6") of the same scene arranged according to 5 different compositional strategies: Rule of Thirds, Centered, S-curve, L-shape, and Diagonal.', finalTitleB: 'The Strong Image', finalBriefB: 'Create one fully rendered image (any medium) with an undeniable, deliberate focal point hierarchy. Every element should serve to draw the eye to the focal point. Write 150 words explaining your hierarchy decisions.', artRefA: 'N.C. Wyeth — Treasure Island illustrations (1911)', artRefB: 'Alphonse Mucha — Gismonda poster (1894)' },
    { month: 11, title: 'Beyond the Human: Animal & Creature Design', subtitle: 'Understanding comparative anatomy and the art of the plausible impossible.', theme: 'creature-design', teacherA: 'ingrid', teacherB: 'santiago', courseA: 'Animal Anatomy & Comparative Study', courseB: 'Creature Design: Building Believable Hybrids', descA: 'Human anatomy knowledge doesn\'t stop at humans. Every vertebrate animal shares the same skeletal blueprint — modified for its specific needs. Once you see this, drawing any animal becomes a variation on a theme you already know.', descB: 'Creature design is the art of creating animals that don\'t exist but feel like they should. The secret: every element must be borrowed from something that does exist, combined in a way that suggests functional, evolutionary logic.', refsA: [{ title: 'Zoology: An Introduction to the Natural History', author: 'Various', note: 'Reference for animal anatomy across species.' }, { title: 'Animals in Motion', author: 'Eadweard Muybridge', note: 'Photographic study of animal movement — essential reference.' }], refsB: [{ title: 'The DC Comics Guide to Creating Comics', author: 'Carl Potts', note: 'Includes creature and character design principles.' }, { title: 'Terryl Whitlatch\'s Science of Creature Design', author: 'Terryl Whitlatch', note: 'The industry standard for creature believability.' }], finalTitleA: 'The Animal Anatomy Library', finalBriefA: 'Create anatomy studies of 5 different animals: a cat, a horse, a bird, a fish, and one of your choice. Show skeletal structure, then the surface form. Label key anatomical equivalents to human anatomy.', finalTitleB: 'Original Creature Design', finalBriefB: 'Design an original creature: a full-body design sheet showing front, side, and three-quarter views, plus behavioral sketches showing how it moves. Identify its real-world anatomical inspirations.', artRefA: 'Rosa Bonheur — The Horse Fair (1855)', artRefB: 'H.R. Giger — Xenomorph design for Alien (1979)' },
    { month: 12, title: 'Cloth, Texture & the Surface of Reality', subtitle: 'Mastering the folds of fabric and the language of materials.', theme: 'drapery-texture', teacherA: 'ingrid', teacherB: 'amara', courseA: 'Drapery & Clothing', courseB: 'Materials & Textures: The Rendering Language', descA: 'Drapery is not decoration — it is storytelling. The way fabric falls reveals the body beneath it, the weight of the material, and the history of the moment. Understanding drapery\'s physics makes clothing dynamic and believable.', descB: 'Every material surface interacts with light differently. Polished metal reflects sharply; matte wood absorbs broadly; skin transmits light through its layers (subsurface scattering); glass bends light. Learning to render these differences is what makes a drawing feel like a window into reality.', refsA: [{ title: 'Drapery Patterns', author: 'Richard Box', note: 'A complete guide to all types of fabric folds.' }, { title: 'The Human Figure in Motion', author: 'Eadweard Muybridge', note: 'Reference for how clothing behaves in movement.' }], refsB: [{ title: 'Color and Light', author: 'James Gurney', note: 'Chapters on surface properties and material rendering.' }, { title: 'The Complete Guide to Drawing Animals', author: 'Giovanni Civardi', note: 'Surface texture across fur, skin, and scales.' }], finalTitleA: 'The Clothed Figure', finalBriefA: 'Draw a full figure in clothing that tells a story. The fabric choices should communicate character. Show at least 4 different fold types in one drawing.', finalTitleB: 'The Material Study Grid', finalBriefB: 'Create a 3×3 grid of material studies: polished metal, matte stone, glass, velvet, leather, wood, skin, water, and rusted iron. Each study 4"×4", rendered in the medium of your choice.', artRefA: 'Michelangelo — Pietà (1498-1499) — study the drapery', artRefB: 'Jan van Eyck — The Arnolfini Portrait (1434) — material rendering' },
    // Year 2
    { month: 13, title: 'Digital Art: Entering the New Medium', subtitle: 'Hardware, software, and the translation of traditional skills.', theme: 'digital', teacherA: 'yuki', teacherB: 'yuki', courseA: 'Digital Art I: Hardware & Software Fluency', courseB: 'Digital Painting: Traditional Textures in a New Medium', descA: 'Digital art is not easier than traditional — it is different. It requires all the same visual skills plus a new set of tool-specific techniques. This course onboards you into the digital workflow with the same rigor we\'ve applied to traditional media.', descB: 'The greatest trap in digital art is the "digital look" — clean, sterile, devoid of the texture and life that makes traditional work compelling. This course teaches you to replicate traditional media textures digitally and to build a workflow that combines the best of both worlds.', refsA: [{ title: 'The Digital Photography Book', author: 'Scott Kelby', note: 'Color management and display calibration — important for digital artists too.' }, { title: 'Clip Studio Paint: The Official Guide', author: 'CELSYS', note: 'The most versatile digital art software for illustration and manga.' }], refsB: [{ title: 'Digital Painting Techniques', author: '3DTotal Publishing', note: 'Industry artists share their digital workflows.' }, { title: 'The Art of Video Games', author: 'Chris Melissinos', note: 'Digital painting in a production context.' }], finalTitleA: 'Digital Reproduction Study', finalBriefA: 'Choose a traditional painting by a master and reproduce it digitally as accurately as possible. The goal is tool fluency — using digital brushes to achieve the same marks the original artist made with physical tools.', finalTitleB: 'Mixed Media Hybrid', finalBriefB: 'Create a digital painting that looks convincingly like a specific traditional medium (your choice: oil paint, watercolor, charcoal). Fool a fellow student.', artRefA: 'Sparth (Nicolas Bouvier) — Halo concept art', artRefB: 'Craig Mullins — digital painting portfolio' },
    { month: 14, title: 'Extreme Perspective & The Cinematic Eye', subtitle: 'Curvilinear space, fisheye lenses, and the camera as storytelling tool.', theme: 'advanced-perspective', teacherA: 'marcus', teacherB: 'marcus', courseA: 'Advanced Perspective: Curvilinear & Multi-Point', courseB: 'Dynamic Cinematography: Camera as Character', descA: 'Beyond 3-point perspective lies a world of curvilinear space: the 5-point fisheye, the panoramic view, the distorted interior that feels like the memory of a place rather than a photograph of it. These are the tools of the most visually sophisticated illustrators and filmmakers.', descB: 'The camera is not a neutral observer. Where you place it, what it sees, and what it excludes are as expressive as any mark on the page. Dynamic cinematography is the art of making the camera itself tell the story.', refsA: [{ title: 'How to Draw', author: 'Scott Robertson', note: 'Chapters on 4-point and 5-point perspective.' }, { title: 'Perspective Drawing Handbook', author: 'Joseph D\'Amelio', note: 'Historical and technical overview.' }], refsB: [{ title: 'Framed Ink', author: 'Marcos Mateu-Mestre', note: 'The complete guide to cinematic composition for artists.' }, { title: 'The Visual Story', author: 'Bruce Block', note: 'Film-school visual design principles for illustrators.' }], finalTitleA: 'The Fisheye Environment', finalBriefA: 'Create a 5-point fisheye perspective environment — an interior space that wraps around the viewer 360°. Use the spherical grid method.', finalTitleB: 'The Storyboard Sequence', finalBriefB: 'Design a 6-panel storyboard sequence for a single dramatic scene showing a variety of camera positions, angles, and distances. No dialogue — the visuals must tell the complete story.', artRefA: 'Osamu Tezuka — Astro Boy — environment backgrounds', artRefB: 'Akira Kurosawa — Seven Samurai (1954) — storyboard sketches' },
    { month: 15, title: 'Extremes: Foreshortening & Expression', subtitle: 'Pushing form toward the camera and emotion into the face.', theme: 'extreme-anatomy', teacherA: 'ingrid', teacherB: 'ingrid', courseA: 'Extreme Foreshortening: Form Toward the Camera', courseB: 'Micro-Expressions: The Nuanced Face', descA: 'Foreshortening is perspective applied to the human body. When a fist punches toward the viewer, it appears enormous compared to the rest of the arm — and that\'s exactly correct. Foreshortening creates the most dynamic, three-dimensional figure drawings possible.', descB: 'Paul Ekman\'s research on micro-expressions revealed that human faces can produce thousands of distinct expressions using only 43 muscles. For artists, understanding these nuanced facial movements is what separates a character who feels emotionally real from one who simply looks drawn.', refsA: [{ title: 'Figure Drawing: Design and Invention', author: 'Michael Hampton', note: 'Foreshortening and form in action poses.' }, { title: 'The Art of Drawing People', author: 'William F. Powell', note: 'Foreshortening techniques.' }], refsB: [{ title: 'Emotions Revealed', author: 'Paul Ekman', note: 'The psychology of facial expression — foundational for character artists.' }, { title: 'The Comic Artist\'s Photo Reference: People and Poses', author: 'Buddy Scalera', note: 'Expression reference library.' }], finalTitleA: 'The Action Pose', finalBriefA: 'Create a dynamic action drawing where the focal point is an extreme foreshortened element (a fist, a foot, a head). The foreshortening must be anatomically correct and dramatically effective.', finalTitleB: 'The Emotion Grid', finalBriefB: 'Draw the same character\'s face in 16 different emotional states arranged in a 4×4 grid. Each emotion must be produced by accurately observed muscle positions — not caricature.', artRefA: 'Jack Kirby — Captain America punching scenes (1940s)', artRefB: 'Kentaro Miura — Berserk facial expressions' },
    { month: 16, title: 'The World Beyond the Studio', subtitle: 'Landscape, atmosphere, and the designed interior.', theme: 'environment', teacherA: 'marcus', teacherB: 'santiago', courseA: 'Landscape Painting: Sky, Land & Water', courseB: 'Architectural Design: Interiors, Facades & Culture', descA: 'Landscape painting is the art of capturing the uncontrollable. Light changes. Weather shifts. Clouds move. The discipline required to paint landscape trains a decisive quality that improves all your work.', descB: 'Architecture is humanity\'s most visible art form. Designing believable buildings and interiors requires understanding construction logic, cultural context, and atmospheric storytelling simultaneously.', refsA: [{ title: 'Landscape Painting', author: 'Mitchell Albala', note: 'Comprehensive guide to outdoor painting.' }, { title: 'Carlson\'s Guide to Landscape Painting', author: 'John F. Carlson', note: 'The classic text — planes of nature and how light hits them.' }], refsB: [{ title: 'Architecture: Form, Space, and Order', author: 'Francis Ching', note: 'The definitive architectural design textbook.' }, { title: 'The Architecture of Happiness', author: 'Alain de Botton', note: 'How space affects emotion and meaning.' }], finalTitleA: 'The Plein Air Landscape', finalBriefA: 'Complete three plein air landscape paintings en plein air (or from photo reference if outdoors is impossible). One must be sky-dominant, one land-dominant, one water-dominant.', finalTitleB: 'The World-Building Interior', finalBriefB: 'Design and draw a detailed interior of a building from an imaginary world. The architecture should communicate the culture and values of its inhabitants without text.', artRefA: 'John Constable — The Hay Wain (1821)', artRefB: 'Studio Ghibli — interior architecture from Spirited Away (2001)' },
    { month: 17, title: 'The Image That Tells a Story', subtitle: 'Narrative illustration, character design, and the art of the single image.', theme: 'illustration', teacherA: 'oliver', teacherB: 'nadia', courseA: 'Narrative Illustration: The Complete Story in One Frame', courseB: 'Character Design Principles: Silhouette & Shape Language', descA: 'A great illustration contains an entire story. The viewer should feel they walked in on a moment and can imagine everything that came before and after. Achieving this requires mastery of every skill you\'ve built so far — composition, anatomy, value, color, perspective — deployed in service of a single narrative moment.', descB: 'A character\'s silhouette must be instantly readable. Their shape language must communicate their personality before the viewer reads a single line of dialogue. These are not aesthetic preferences — they are communication principles, as rigorously developed as the rules of language.', refsA: [{ title: 'Imaginative Realism', author: 'James Gurney', note: 'How to paint worlds that don\'t exist but look real.' }, { title: 'The Illustrator\'s Bible', author: 'Various', note: 'Historical and contemporary approaches.' }], refsB: [{ title: 'The Animator\'s Survival Kit', author: 'Richard Williams', note: 'Character design principles from animation.' }, { title: 'Character Design Quarterly', author: 'Various', note: 'Contemporary character design inspiration.' }], finalTitleA: 'The Silent Story', finalBriefA: 'Create a single fully rendered illustration that tells a complete story with no text. The viewer must be able to infer: who, what, where, and what happened just before this moment.', finalTitleB: 'The Character Sheet', finalBriefB: 'Design three original characters that are clearly related (same world/story) but visually distinct from each other. Show each in front, side, and three-quarter view plus two expressions and one action pose.', artRefA: 'Norman Rockwell — The Problem We All Live With (1964)', artRefB: 'Akira Toriyama — Dragon Ball character designs (1984)' },
    { month: 18, title: 'The Sequential Art Language', subtitle: 'Panel flow, pacing, and the grammar of comics and manga.', theme: 'sequential', teacherA: 'oliver', teacherB: 'oliver', courseA: 'Sequential Art Mechanics: Panels, Flow & Time', courseB: 'Storyboarding: The Blueprint of Motion', descA: 'Comics and manga are not illustrated prose — they are a distinct visual language with their own grammar. Panel transitions, gutter spaces, and the "channel" between panels create an experience of time that no other medium can replicate. Understanding this language makes you a storyteller, not just a drawer.', descB: 'Storyboarding is the bridge between script and screen. It is also the fastest way to develop compositional instincts — because in storyboarding, you make dozens of camera decisions per hour, and immediate feedback comes from how well the sequence reads.', refsA: [{ title: 'Understanding Comics', author: 'Scott McCloud', note: 'The definitive theoretical work on sequential art. Full read — mandatory.' }, { title: 'Making Comics', author: 'Scott McCloud', note: 'The practical companion.' }], refsB: [{ title: 'The DC Comics Guide to Storyboarding', author: 'Various', note: 'Industry approach to visual planning.' }, { title: 'Master Shots', author: 'Christopher Kenworthy', note: '100 advanced camera techniques for storytelling.' }], finalTitleA: 'The Six-Page Short', finalBriefA: 'Write and draw a complete 6-page short comic (or manga-style) story. Completely self-contained. No dialogue is required — this can be a wordless story. Every panel must serve the narrative.', finalTitleB: 'The Cinematic Storyboard', finalBriefB: 'Storyboard a 1-minute scene from a movie or your own story: 20–24 panels showing a complete dramatic arc with varied shots, angles, and pacing.', artRefA: 'Will Eisner — A Contract with God (1978)', artRefB: 'Hayao Miyazaki — Nausicaä of the Valley of the Wind storyboards' },
    { month: 19, title: 'The Third Dimension', subtitle: 'Sculpting, 3D form, and translating volume back to the page.', theme: 'sculpting', teacherA: 'james', teacherB: 'james', courseA: 'Sculpting: Understanding Form in Actual 3D Space', courseB: 'Translating 3D to 2D: Sculpt-Based Reference Drawing', descA: 'Nothing teaches three-dimensional form like actually working in three dimensions. Whether you sculpt with clay, ZBrush, or any 3D tool, the act of modeling forces you to understand the form from all angles simultaneously — a skill that immediately improves your 2D work.', descB: 'Once you have a 3D model or sculpture, it becomes the perfect reference — you can light it however you wish, rotate it to any angle, and place it in any perspective. This course teaches you to leverage 3D reference effectively in your 2D practice.', refsA: [{ title: 'ZBrush Character Sculpting', author: 'Scott Spencer', note: 'Introduction to digital sculpting for artists.' }, { title: 'The Modeling Manual', author: 'Richard Williams', note: 'Traditional clay modeling for character artists.' }], refsB: [{ title: 'Digital Sculpting with ZBrush', author: 'Foreword by Pixar', note: '3D to 2D workflow.' }, { title: 'Gnomon Workshop — Figure Sculpting', author: 'Various', note: 'Professional 3D artist workflows for illustration reference.' }], finalTitleA: 'The Character Maquette', finalBriefA: 'Sculpt a character maquette in clay, Super Sculpty, or digitally in ZBrush / Blender. Photograph it from 8 angles. The turnaround photos are your submission alongside the physical/digital piece.', finalTitleB: 'The Sculpt-Referenced Drawing', finalBriefB: 'Using your sculpt (or a freely available 3D model) as reference, create 3 drawings of the same subject lit differently: (1) dramatic sidelight, (2) top light, (3) rim/backlight. Show how different lighting tells different stories.', artRefA: 'Auguste Rodin — The Thinker (1880)', artRefB: 'Naughty Dog — The Last of Us concept art (sculpt-reference pipeline)' },
    { month: 20, title: 'Breaking Boundaries: Mixed Media', subtitle: 'When one medium isn\'t enough — combining tools for new expression.', theme: 'mixed-media', teacherA: 'amara', teacherB: 'amara', courseA: 'Mixed Media Application: Combining Traditional Tools', courseB: 'Unconventional Tools: Beyond the Brush', descA: 'Some of the most visually compelling contemporary illustration combines multiple media in a single work: ink linework with watercolor washes, graphite with digital color, gouache with collage. Mixed media gives you access to the strengths of multiple mediums simultaneously.', descB: 'The greatest limits on creativity are often assumed, not real. Artists throughout history have painted with house paint, printed with potatoes, and drawn with coffee. This course invites you to break the tool hierarchy and find new visual languages through unconventional approaches.', refsA: [{ title: 'Mixed Media & Found Materials', author: 'Judi Riesch', note: 'Comprehensive guide to mixed media techniques.' }, { title: 'The Art of Assemblage', author: 'William Seitz', note: 'Historical overview of mixed media and collage.' }], refsB: [{ title: 'Breaking the Rules of Watercolor', author: 'Bud Biggs', note: 'Unconventional approaches to a traditional medium.' }, { title: 'Art & Fear', author: 'David Bayles & Ted Orland', note: 'The psychology of creative risk-taking.' }], finalTitleA: 'The Mixed Media Illustration', finalBriefA: 'Create a finished illustration using at least three distinct media. The combination should feel intentional and serve the image — not random. Describe your media choices in 100 words.', finalTitleB: 'The Experimental Page', finalBriefB: 'Fill a full A4 page using unconventional tools ONLY — no traditional brushes, pencils, or pens. Coffee, sponges, palette knives, stamps, found objects, your fingers. The page should still be a coherent artwork, not a random experiment.', artRefA: 'Robert Rauschenberg — Canyon (1959)', artRefB: 'Jean-Michel Basquiat — mixed media canvases (1981–1988)' },
    { month: 21, title: 'Breaking the Rules You\'ve Learned', subtitle: 'Deconstruction, distortion, and the deliberate violation of the academic.', theme: 'deconstruction', teacherA: 'yuki', teacherB: 'yuki', courseA: 'Deconstruction: Breaking Anatomy for Visual Impact', courseB: 'Stylization: Bridging Realism to Your Artistic Voice', descA: 'You now know the rules thoroughly enough to break them intentionally. Deconstruction is not ignorance — it\'s the deliberate application of distortion to create visual impact that photographic accuracy cannot achieve. Eisenstein distorted figures. Klimt flattened space. Picasso broke the face apart and put it back together differently.', descB: 'Style is not a shortcut you take before learning the fundamentals — it is the synthesis that emerges after you\'ve mastered them. Stylization is the process of deciding which rules to keep, which to simplify, and which to break systematically. Your style is your answer to those questions.', refsA: [{ title: 'Anatomy for Sculptors', author: 'Uldis Zarins', note: 'Understanding anatomy deeply enough to distort it knowingly.' }, { title: 'The Graphic Art of Egon Schiele', author: 'Egon Schiele', note: 'Deliberate anatomical distortion for emotional effect.' }], refsB: [{ title: 'The Elements of Style (Applied to Visual Art)', author: 'adapted concept', note: 'Finding your consistent visual voice.' }, { title: 'Graphic Design: The New Basics', author: 'Ellen Lupton', note: 'Design principles that underpin stylization.' }], finalTitleA: 'The Deconstruction Series', finalBriefA: 'Create 3 drawings of the same figure: (1) anatomically accurate, (2) deliberately distorted for emotional effect, (3) a version that combines accuracy and distortion in a way that\'s more powerful than either alone. Write 150 words explaining your distortion choices.', finalTitleB: 'The Style Exploration Page', finalBriefB: 'Draw the same character in 6 different styles: hyperrealism, classic manga, American comics, chibi/SD, impressionistic, and your own emerging style. Then write 200 words describing what your style currently is and where you want it to go.', artRefA: 'Egon Schiele — Self-Portrait with Physalis (1912)', artRefB: 'Naoko Takeuchi — Sailor Moon design evolution (1991–1997)' },
    { month: 22, title: 'The Manga & Anime Language', subtitle: 'Advanced inking, tones, cel shading, and the visual FX vocabulary.', theme: 'manga-anime', teacherA: 'yuki', teacherB: 'yuki', courseA: 'Manga Techniques: Inking, Tones & Composition', courseB: 'Anime Aesthetics: Cel Shading, FX & Line Efficiency', descA: 'Manga has its own complete visual language: the conventions of panel layout, the use of speed lines, the precise economy of screentone, and the specific inking style that distinguishes each mangaka. This course learns those conventions thoroughly — so you can use or break them with intention.', descB: 'Anime aesthetics — cel shading, stylized FX, the specific "anime face" proportions — are not shortcuts to learning how to draw. They are a deliberate stylistic system evolved over decades to be maximally expressive within specific production constraints. Understanding those constraints makes you a better animator and illustrator.', refsA: [{ title: 'How to Draw Manga', author: 'Hikaru Hayashi', note: 'A comprehensive guide to professional manga technique.' }, { title: 'Manga! Manga! The World of Japanese Comics', author: 'Frederik Schodt', note: 'Cultural and historical context for manga aesthetics.' }], refsB: [{ title: 'The Anime Machine', author: 'Thomas Lamarre', note: 'Theory and technique of anime production aesthetics.' }, { title: 'Digital Anime and Manga Art', author: 'Various', note: 'Cel shading and FX techniques digitally.' }], finalTitleA: 'The Manga Page', finalBriefA: 'Create a complete manga-style page (B4 size if possible): establish a scene, develop an action beat, and resolve it. Professional-quality inking. Use at least 2 screentone patterns (physical or digital). No dialogue required.', finalTitleB: 'The Anime Art Card', finalBriefB: 'Create a single finished anime-style illustration in the style of a collectable card game card: a character in the foreground with a dramatic environment background. Full cel shading with at least one FX element (magic, fire, water, electricity). Professional quality.', artRefA: 'Kentaro Miura — Berserk (1989) — inking technique', artRefB: 'Yoshinori Kanada — Galaxy Express 999 FX animation (1979)' },
    { month: 23, title: 'Standing on the Shoulders of Giants', subtitle: 'Master studies, style analysis, and the art of learning from the best.', theme: 'master-studies', teacherA: 'oliver', teacherB: 'nadia', courseA: 'Master Studies: Replication as Deep Learning', courseB: 'Deconstructing Style: Why Does This Look the Way It Does?', descA: 'The greatest artists throughout history have studied the greatest artists who came before them. Raphael copied Michelangelo. Picasso copied Velázquez. Modigliani copied Cézanne. Master studies are not plagiarism — they\'re the most direct method of absorbing visual knowledge that exists.', descB: 'Every distinctive visual style has a deliberate logic behind it. The proportions of specific character types, the color palette decisions, the line weight variations — none of these are random. This course teaches you to reverse-engineer the visual decisions that make your favorite art look the way it does.', refsA: [{ title: 'Old Masters: New Techniques', author: 'Philip Mould', note: 'How to study and replicate classical techniques.' }, { title: 'The Manga Guide to Analyzing Manga', author: 'Various', note: 'Systematic analysis of manga visual techniques.' }], refsB: [{ title: 'The Visual Language of Comics', author: 'Neil Cohn', note: 'Scientific analysis of visual storytelling conventions.' }, { title: 'Anime\'s Media Mix', author: 'Marc Steinberg', note: 'How anime aesthetics are designed as systems.' }], finalTitleA: 'The Master Study Triptych', finalBriefA: 'Complete three master studies: one Western classical artwork (pre-1900), one mangaka of your choice, and one contemporary digital artist you admire. For each, write 100 words on what specific technique you learned.', finalTitleB: 'The Style Analysis', finalBriefB: 'Choose one visual media property you love (game, anime, film, comic) and write a 500-word analysis of its visual style. Then create one original artwork in that analyzed style. Your analysis should cover: color palette logic, line quality, proportions, lighting approach, and compositional tendencies.', artRefA: 'Pablo Picasso — Las Meninas variations after Velázquez (1957)', artRefB: 'Hirohiko Araki — JoJo\'s Bizarre Adventure style evolution (1987–present)' },
    { month: 24, title: 'The Exhibition', subtitle: 'Portfolio, capstone, and the beginning of everything that comes next.', theme: 'capstone', teacherA: 'santiago', teacherB: 'nadia', courseA: 'Portfolio Curation: Selecting & Polishing Your Best Work', courseB: 'The Capstone Project: Your Masterwork', descA: 'A portfolio is not a collection of everything you\'ve made — it\'s a curated argument for your abilities. Selection is half the art. This course teaches you to see your own work with a critical, professional eye and present it in a way that communicates maximum capability with minimum pieces.', descB: 'The capstone project is the culmination of two years of work. It should be ambitious, personal, and technically excellent. It should demonstrate multiple skills from across the curriculum. It should be something you are genuinely proud of — and that you would show to any professional in your target field.', refsA: [{ title: 'The Portfolio and the Diagram', author: 'Various', note: 'Portfolio design for visual artists.' }, { title: 'Making It in the Art World', author: 'Brainard Carey', note: 'Career strategy for professional artists.' }], refsB: [{ title: 'The Complete Guide to Creating Comics', author: 'Various', note: 'Professional production workflow for comics.' }, { title: 'Imaginative Realism', author: 'James Gurney', note: 'Creating complete, convincing imagined worlds.' }], finalTitleA: 'The Portfolio', finalBriefA: 'Curate and present your 10 best pieces from across the two-year curriculum. Each piece must be properly presented (clean scan, correct color profile, appropriate resolution). Write a 50-word artist statement for each piece explaining what it demonstrates and what you learned from it.', finalTitleB: 'THE CAPSTONE', finalBriefB: 'This is it. Your capstone project must be one of the following:\n\nOption A: The Short Comic — A complete, polished 12-20 page short story in comics/manga format. Professional quality inking, tones or color, and lettering. This is a publishable-quality work.\n\nOption B: The Illustration Set — A series of 5 fully realized illustrations that form a cohesive body of work — same world, same style, same narrative universe. Suitable for a gallery show or professional portfolio submission.\n\nWhatever you choose, this project should take a minimum of 3 weeks of focused work (40+ hours). It should be the piece you show when someone asks "what can you do?"', artRefA: 'Hayao Miyazaki — Nausicaä of the Valley of the Wind complete manga (1982–1994)', artRefB: 'Moebius (Jean Giraud) — The Airtight Garage (1980)' },
  ];

  monthData.forEach(m => {
    months.push({
      month: m.month,
      year: m.year,
      title: m.title,
      subtitle: m.subtitle,
      theme: m.theme,
      courses: [
        {
          id: `M${String(m.month).padStart(2,'0')}-A`,
          title: m.courseA,
          subtitle: m.descA?.substring(0,60) + '...',
          teacher: getTeacher(m.teacherA),
          description: m.descA,
          references: m.refsA,
          lessons: generateLessonsForCourse(`M${String(m.month).padStart(2,'0')}-A`, m.courseA, m.month),
          weeklyAssignments: generateWeeklyAssignments(m.month, 'A'),
          finalProject: {
            title: m.finalTitleA,
            brief: m.finalBriefA,
            rubric: [
              { criterion: 'Technical execution', weight: 35 },
              { criterion: 'Conceptual strength', weight: 25 },
              { criterion: 'Evidence of course skills', weight: 25 },
              { criterion: 'Presentation quality', weight: 15 },
            ],
            dueDay: 30,
            passingScore: 80,
            estimatedTime: '6–8 hours',
            masterArtistReference: m.artRefA,
          },
        },
        {
          id: `M${String(m.month).padStart(2,'0')}-B`,
          title: m.courseB,
          subtitle: m.descB?.substring(0,60) + '...',
          teacher: getTeacher(m.teacherB),
          description: m.descB,
          references: m.refsB,
          lessons: generateLessonsForCourse(`M${String(m.month).padStart(2,'0')}-B`, m.courseB, m.month),
          weeklyAssignments: generateWeeklyAssignments(m.month, 'B'),
          finalProject: {
            title: m.finalTitleB,
            brief: m.finalTitleB === 'THE CAPSTONE'
              ? m.finalBriefB
              : `Complete a professional-level ${m.finalTitleB.toLowerCase()} demonstrating the skills of this month's course. Focus on technical precision and expressive intent working together.`,
            rubric: [
              { criterion: 'Technical execution', weight: 35 },
              { criterion: 'Conceptual strength', weight: 25 },
              { criterion: 'Evidence of course skills', weight: 25 },
              { criterion: 'Presentation quality', weight: 15 },
            ],
            dueDay: 30,
            passingScore: m.month === 24 ? 80 : 80,
            estimatedTime: m.month === 24 ? '40+ hours' : '6–8 hours',
            masterArtistReference: m.artRefB,
          },
        },
      ],
      studioChallenge: generateStudioChallenge(m.month),
    });
  });

  return months;
}

function generateLessonsForCourse(courseId, courseTitle, month) {
  const lessonTitles = {
    'M04-A': ['The Skeletal Blueprint', 'The Skull: Architecture of the Head', 'The Spine and Ribcage', 'The Pelvis and Limb Bones', 'Skeletal Landmarks in the Living Figure'],
    'M04-B': ['The Major Muscle Groups: An Overview', 'Muscles of the Torso and Back', 'Muscles of the Arm and Shoulder', 'Muscles of the Leg', 'The Figure in Motion: Muscles Stretching and Compressing'],
    'M05-A': ['The Head: The Loomis Construction', 'The Planes of the Head', 'The Eye: Construction and Expression', 'The Hand: Architecture and Gesture', 'The Foot: Structure and Weight-Bearing'],
    'M05-B': ['What is Gesture?', 'The Line of Action', 'Weight and Balance in the Figure', 'Speed Gesture: 30-Second Studies', 'Integrating Gesture into Finished Work'],
    'M06-A': ['The Color Wheel: Hue, Saturation, Value', 'Color Temperature and Warm-Cool Contrast', 'Color Harmony Systems', 'Mixing Neutral Grays: Avoiding Mud', 'Color Psychology and Emotional Response'],
    'M06-B': ['How Light Behaves: Physics for Artists', 'Warm Light, Cool Shadows (and vice versa)', 'Colored Light Environments', 'Indoor vs. Outdoor Light', 'The Color of Shadows'],
    'M07-A': ['Graphite Grades and Paper Types', 'Hatching, Crosshatching, and Stippling', 'Blending Techniques and Edge Control', 'Charcoal: Additive and Subtractive', 'Drawing for Reproduction: Understanding Tones'],
    'M07-B': ['The Expressive Ink Line', 'Crosshatching for Value', 'Pen vs. Brush Ink Techniques', 'Texture Through Marks', 'The Single-Line Drawing'],
    'M08-A': ['Oil Paint Properties and Setup', 'The Grisaille Underpainting', 'Glazing Over the Underpainting', 'Building Values in Monochrome', 'From Grisaille to Color (Introduction)'],
    'M08-B': ['The Zorn Palette: Four Colors, Infinite Range', 'Wet-on-Wet Fundamentals', 'Blocking In the Alla Prima Portrait', 'Brushwork and Paint Quality', 'Finishing Touches: When to Stop'],
    'M09-A': ['Watercolor Materials: Paper, Pigment, Brushes', 'Flat Wash, Graded Wash, Wet-into-Wet', 'Blooms and Granulation: Controlling Accident', 'Masking Fluid and Dry Brush', 'Layering and Glazing in Watercolor'],
    'M09-B': ['Gouache vs. Acrylic: Properties and Differences', 'Opaque Layering: Light Over Dark', 'Color Correction and Overpainting', 'Gouache for Illustration', 'Acrylic Techniques and Mediums'],
    'M10-A': ['What Is Composition?', 'The Rule of Thirds and the Golden Ratio', 'S-curves, L-shapes, and Triangular Compositions', 'Negative Space as Compositional Element', 'Cropping and Framing'],
    'M10-B': ['What Is Visual Hierarchy?', 'Contrast as Focal Point Tool', 'Detail and Rest Areas', 'Color and Value to Guide the Eye', 'Multi-Figure Compositional Hierarchy'],
    'M11-A': ['The Vertebrate Blueprint: Shared Skeleton', 'Drawing the Domestic Cat', 'Drawing the Horse', 'Drawing Birds: The Avian Skeleton', 'Animal Movement and Weight'],
    'M11-B': ['The Principles of Creature Design', 'Functional Anatomy: Does It Make Biological Sense?', 'Shape Language in Creature Design', 'Designing Predators vs. Prey', 'Presenting the Creature: Turnaround and Behavioral Sketches'],
    'M12-A': ['The Physics of Fabric: Tension Points', 'The Six Types of Folds', 'Different Fabric Weights and How They Fall', 'Drawing the Clothed Figure', 'Historical Clothing and Period Drapery'],
    'M12-B': ['How Surfaces Interact with Light', 'Rendering Polished Metal', 'Rendering Matte and Rough Surfaces', 'Rendering Transparent Materials: Glass and Water', 'Subsurface Scattering: Skin, Wax, and Marble'],
    'M13-A': ['Choosing Your Hardware: Tablets and Displays', 'Software Overview: Procreate, Photoshop, Clip Studio', 'The Digital Brush Engine: Pressure, Tilt, Speed', 'Layer Management and Non-Destructive Workflow', 'File Management and Output Settings'],
    'M13-B': ['The Danger of the "Digital Look"', 'Simulating Oil Paint Digitally', 'Simulating Watercolor Digitally', 'Simulating Ink and Graphite Digitally', 'Building a Personal Brush Library'],
    'M14-A': ['Beyond Three Points: Introduction to 5-Point Perspective', 'The Fisheye Grid Construction', 'Curvilinear Perspective and Panoramics', 'Perspective Errors and How to Spot Them', 'Intuitive vs. Constructed: Finding the Balance'],
    'M14-B': ['The Language of Shot Types', 'Movement Within the Frame', 'Leading Lines and the Camera\'s Gaze', 'Montage Theory: How Cuts Create Meaning', 'Designing a Scene\'s Camera Sequence'],
    'M15-A': ['Understanding Foreshortening Geometrically', 'The Foreshortened Limb', 'The Punching Fist: Classic Foreshortening', 'Full Figure Foreshortening', 'Foreshortening in the Flying Figure'],
    'M15-B': ['The 43 Muscles of the Face', 'The Seven Universal Emotions', 'Reading Micro-Expressions', 'Drawing Complex Mixed Emotions', 'The Face in Extreme Duress and Joy'],
    'M16-A': ['Reading the Landscape: Sky, Ground, Water', 'Atmospheric Perspective and Aerial Haze', 'Painting Clouds and Skies', 'Painting Foliage and Trees', 'Water: Reflection, Refraction, and Flow'],
    'M16-B': ['The Elements of Architectural Design', 'Designing an Interior: Space, Light, Function', 'Facade Design: Rhythm, Scale, Proportion', 'Cultural Architecture: How Buildings Tell Stories', 'World-Building Through Architecture'],
    'M17-A': ['The Narrative Moment: Choosing the Right Second', 'Setting and Context in a Single Frame', 'Character in a Single Image', 'Visual Metaphor and Symbolism', 'Lighting for Drama and Narrative'],
    'M17-B': ['Silhouette Reading: Can You Tell Who They Are?', 'Basic Shapes: Circles, Triangles, Squares as Personality', 'Visual Motifs and Costume Design', 'The Character\'s Color Palette', 'Designing Character Relationships Visually'],
    'M18-A': ['Panel Types and What They Do', 'The Gutter: The Space Between', 'Time and Motion in Sequential Art', 'Panel Flow and Page Turn as Storytelling', 'Dialogue, Caption, and Sound Effect Placement'],
    'M18-B': ['Storyboard Notation and Shorthand', 'The Establishing Shot', 'Action Sequences: Clarity vs. Chaos', 'The Emotional Close-Up', 'Storyboarding Dialogue Scenes'],
    'M19-A': ['Introduction to 3D Thinking', 'Traditional Clay Sculpting Basics', 'Introduction to ZBrush / Blender', 'Sculpting the Head from a Sphere', 'Sculpting the Full Figure Maquette'],
    'M19-B': ['Using Your Sculpt as a Lighting Reference', 'Rendering from Multiple Angles', 'Translating 3D Textures to 2D Marks', 'The Digital-to-Print Pipeline', 'Integrating 3D into a 2D Workflow'],
    'M20-A': ['The History of Mixed Media', 'Combining Ink and Watercolor', 'Graphite Under Paint', 'Digital Over Traditional (Photo Overlays)', 'Collage as Art and Reference'],
    'M20-B': ['The Palette Knife as Drawing Tool', 'Printing and Stamping Techniques', 'Found Object Mark-Making', 'Coffee, Tea, and Natural Pigments', 'Embracing Accident and Uncontrol'],
    'M21-A': ['Rules You Can Now Break', 'Proportion Distortion: The History of Elongation', 'Picasso and Analytical Deconstruction', 'Distortion for Emotional Impact', 'Systematic Distortion: Building a Visual Language from Deviation'],
    'M21-B': ['What Is Style?', 'Simplification vs. Elimination', 'Consistent Distortion: The Style System', 'Color as a Style Element', 'Developing Your Style Through Series'],
    'M22-A': ['The Visual Grammar of Manga', 'Speed Lines and Kinetic Energy', 'Screentone: Types, Application, and Balance', 'Panel Layout as Storytelling', 'The Economics of the Manga Line'],
    'M22-B': ['Cel Shading: The Logic of Flat Light', 'Hair Rendering in Anime Style', 'FX Drawing: Fire, Water, Lightning, Smoke', 'Line Weight Variation for Depth', 'Painting Anime Key Art'],
    'M23-A': ['Choosing a Master to Study', 'The Copying Process: What to Look For', 'Master Studies in Different Media', 'Classical Western Masters', 'Contemporary and Manga Masters'],
    'M23-B': ['Visual Style as a Designed System', 'Analyzing Color Palette Logic', 'Analyzing Line Quality and Weight', 'Analyzing Proportional Systems', 'Writing a Style Analysis'],
    'M24-A': ['What Makes a Strong Portfolio?', 'Curation: Selection as Editorial Decision-Making', 'Presentation Standards: Scanning, Color, Resolution', 'The Artist Statement', 'Targeting Your Portfolio to Your Goals'],
    'M24-B': ['Planning the Capstone', 'The Production Phase', 'Quality Review: Editing Your Own Work', 'Polish and Finish', 'The Final Exhibition'],
  };

  const titles = lessonTitles[courseId] || Array.from({length: 5}, (_, i) => `${courseTitle}: Lesson ${i + 1}`);

  return titles.map((title, i) => ({
    day: (i + 1) * (month <= 12 ? 5 : 4),
    title,
    duration: '45–55 min',
    content: `This lesson covers ${title} as part of the ${courseTitle} curriculum. Apply the principles from previous lessons while focusing on the specific technique presented here. Use your sketchbook to take notes and do the warm-up exercise before attempting the main exercise.`,
    keyTerms: [],
    exercise: `Practice exercise for ${title}: Apply the day's concept in a 30–45 minute focused practice session. Reference the reading materials and your notes. Submit your practice work with your weekly assignment.`,
  }));
}

function generateWeeklyAssignments(month, courseVariant) {
  return Array.from({length: 4}, (_, i) => ({
    week: i + 1,
    title: `Week ${i + 1} Assignment`,
    brief: `Complete the week ${i + 1} practice exercises and submit a finished artwork demonstrating this week's skills. Focus on applying all the lessons from the week in a single cohesive piece.`,
    rubric: [
      { criterion: 'Technical execution of week\'s skills', weight: 40 },
      { criterion: 'Compositional quality', weight: 25 },
      { criterion: 'Evidence of process and revision', weight: 20 },
      { criterion: 'Presentation quality', weight: 15 },
    ],
    dueDay: (i + 1) * 7,
    estimatedTime: '2–3 hours',
  }));
}

function generateStudioChallenge(month) {
  const challenges = [
    { title: 'Daily Gesture Warm-Ups', description: 'Begin every session with 10 minutes of gesture drawing. Use Quickposes.com set to 30-second or 1-minute poses.', frequency: 'Daily (10 min)' },
    { title: 'Urban Sketching', description: 'Three times this month, sketch real architectural environments on-site or from a window. 30 minutes each.', frequency: '3× this month' },
    { title: 'Sketchbook Thumbnails', description: 'Fill one sketchbook page per day with thumbnails — any subject, any style. 2 minutes per thumbnail.', frequency: 'Daily (15 min)' },
    { title: 'Mannequin Study', description: 'Pose an art mannequin (or use a reference app) and draw it from 3 different angles every day. Focus on proportion.', frequency: 'Daily (15 min)' },
    { title: 'Figure Drawing Practice', description: 'Use Line of Action (line-of-action.com) for daily figure drawing practice. 30-second to 5-minute poses.', frequency: 'Daily (20 min)' },
    { title: 'Color Mixing Experiments', description: 'Mix 5 new color combinations each week. Document them in a color journal with the pigment names used.', frequency: '3× per week (15 min)' },
    { title: 'Ink Portrait Challenge', description: 'Do one ink portrait per week from a photo reference. Time yourself — maximum 45 minutes per portrait.', frequency: 'Weekly (45 min)' },
    { title: 'Plein Air Session', description: 'Paint or draw outdoors for minimum 1 hour. Any medium. Any subject. The goal is direct observation of light.', frequency: '2× this month' },
    { title: 'Composition Thumbnails', description: 'Do 10 compositional thumbnails every day before your main session. These are 1-minute each — pure layout exploration.', frequency: 'Daily (10 min)' },
    { title: 'Creature Sketchbook', description: 'Fill one page per day with creature and animal sketches. Mix reference and imagination freely.', frequency: 'Daily (15 min)' },
    { title: 'Material Studies', description: 'One material study per day — a 15-minute observation study of a specific material (metal, glass, skin, wood, etc.).', frequency: 'Daily (15 min)' },
    { title: 'Digital Speed Paintings', description: 'One 30-minute digital speed painting per day from photo reference. Focus on value first, then color.', frequency: 'Daily (30 min)' },
    { title: 'Environment Thumbnails', description: 'Design 5 environments per week in thumbnail form. Consider mood, lighting, and architectural style.', frequency: '5× per week' },
    { title: 'Expression Studies', description: 'Draw 5 different facial expressions from photo reference every day. Focus on specific muscle positions, not generalized emotion.', frequency: 'Daily (15 min)' },
    { title: 'Landscape Plein Air', description: 'Three plein air sessions this month (outdoor or window). Paint the same view at different times of day if possible.', frequency: '3× this month' },
    { title: 'Character Design Sketches', description: 'Design one new character concept per day. These are exploratory — aim for variety, not perfection.', frequency: 'Daily (20 min)' },
    { title: 'Panel Thumbnails', description: 'Thumbnail 5 comic pages per week. No full drawing — just quick compositional layouts exploring panel flow.', frequency: '5× per week' },
    { title: 'Sculpting Sessions', description: 'Spend 30 minutes per day with clay or digital sculpting. Even small hand studies count — focus on 3D form understanding.', frequency: 'Daily (30 min)' },
    { title: 'Experimental Pages', description: 'Fill one page per day with experiments using unconventional tools. No pressure — these are free explorations.', frequency: 'Daily (15 min)' },
    { title: 'Style Exploration Studies', description: 'Each day, copy 5 panels from a different artist in their exact style. Study how they make every choice they make.', frequency: 'Daily (20 min)' },
    { title: 'Manga Page Studies', description: 'Analyze one manga page per day: identify every visual technique used. Write 3 things you learned from each page.', frequency: 'Daily (15 min)' },
    { title: 'Master Copies', description: 'Complete one master copy per week — any medium, any master. The goal is deep absorption, not quick imitation.', frequency: 'Weekly (90 min)' },
    { title: 'Portfolio Review Sessions', description: 'Review all your work from the past 23 months. Identify your 20 strongest pieces. Write notes on each.', frequency: '3× this month' },
    { title: 'Free Drawing (50/50 Rule)', description: 'Today, the studio practice IS the 50/50 rule. Draw whatever you want, completely freely. This is how you remember why you started.', frequency: 'Daily (30 min)' },
  ];

  return challenges[month - 1] || challenges[0];
}

export default CURRICULUM;

// ============================================================
// UTILITY EXPORTS
// ============================================================

export const getCurriculumMonth = (month) => CURRICULUM.find(m => m.month === month);

export const getTotalMonths = () => CURRICULUM.length;

export const getYearOneMonths = () => CURRICULUM.filter(m => m.year === 1);

export const getYearTwoMonths = () => CURRICULUM.filter(m => m.year === 2);

export const getCourseById = (courseId) => {
  for (const month of CURRICULUM) {
    for (const course of month.courses) {
      if (course.id === courseId) return { course, month };
    }
  }
  return null;
};
