import { connectDB } from "./db";
import { Framework, Prompt } from "./models";

// ─────────────────────────────────────────
// FRAMEWORKS SEED DATA
// ─────────────────────────────────────────

const frameworks = [
  // ── COPYWRITING ──────────────────────────

  {
    slug: "aida",
    category: "copywriting",
    name: "AIDA",
    description:
      "The classic advertising framework. Moves the reader from awareness to action through four sequential stages.",
    author: "Elias St. Elmo Lewis",
    contentTypes: [
      "sales-page",
      "email",
      "social-media",
      "product-launch",
      "newsletter",
    ],
    books: [
      { title: "Breakthrough Advertising", author: "Eugene Schwartz" },
      { title: "The Adweek Copywriting Handbook", author: "Joseph Sugarman" },
    ],
    claudeSkill:
      "Persona Prompting (as Sugarman); Framework Injection (paste AIDA structure + your product); Iterative Refinement on each stage",
    steps: [
      {
        order: 1,
        title: "Attention",
        description:
          "Grab the reader with a bold headline or opening statement. Stop the scroll.",
        placeholder: "The one thing that will stop my reader scrolling...",
      },
      {
        order: 2,
        title: "Interest",
        description:
          "Build curiosity. Give them a reason to keep reading. Make it relevant to their life.",
        placeholder:
          "What makes this immediately relevant to their situation...",
      },
      {
        order: 3,
        title: "Desire",
        description:
          "Make them want the outcome. Paint the after picture. Shift from features to feelings.",
        placeholder: "After reading this, my reader will want...",
      },
      {
        order: 4,
        title: "Action",
        description:
          "Tell them exactly what to do next. One action only. Make it easy and obvious.",
        placeholder: "The single action I want them to take...",
      },
    ],
    languages: {
      en: {
        name: "Attention-Interest-Desire-Action",
        description:
          "The classic advertising framework for moving readers from awareness to action.",
      },
      it: {
        name: "Attenzione-Interesse-Desiderio-Azione",
        description:
          "Il framework pubblicitario classico per portare il lettore dalla consapevolezza all'azione.",
      },
    },
  },

  {
    slug: "pas",
    category: "copywriting",
    name: "PAS",
    description:
      "Hooks the reader by naming their pain, amplifying it until it feels urgent, then presenting your solution as the only logical relief.",
    author: "Dan Kennedy",
    contentTypes: ["sales-page", "email", "newsletter", "blog-post"],
    books: [
      { title: "Great Leads", author: "Michael Masterson & John Forde" },
      { title: "The Ultimate Sales Letter", author: "Dan Kennedy" },
    ],
    claudeSkill:
      "Framework Injection + Chain-of-Thought: first identify the #1 pain, then agitate with consequences, then position the offer as relief",
    steps: [
      {
        order: 1,
        title: "Problem",
        description:
          "Identify the core problem your reader is facing. Be specific — name the exact pain.",
        placeholder: "My reader struggles with...",
      },
      {
        order: 2,
        title: "Agitation",
        description:
          "Twist the knife. Make the problem feel urgent, costly, and painful. What happens if they ignore it?",
        placeholder: "If they ignore this problem, they will...",
      },
      {
        order: 3,
        title: "Solution",
        description:
          "Present your solution as the logical, inevitable answer. Relief after the agitation.",
        placeholder: "The solution that changes everything is...",
      },
    ],
    languages: {
      en: {
        name: "Problem-Agitation-Solution",
        description:
          "Hooks the reader by amplifying a pain point before offering relief.",
      },
      it: {
        name: "Problema-Agitazione-Soluzione",
        description:
          "Aggancia il lettore amplificando un problema prima di offrire la soluzione.",
      },
    },
  },

  {
    slug: "pastor",
    category: "copywriting",
    name: "PASTOR",
    description:
      "An expanded version of PAS that adds story, transformation, offer and response for longer, more complete sales copy.",
    author: "Ray Edwards",
    contentTypes: ["sales-page", "email", "product-launch"],
    books: [{ title: "How to Write Copy That Sells", author: "Ray Edwards" }],
    claudeSkill:
      "Multi-Pass Writing: P→A→S→T→O→R as separate prompts, then combine; Audience Simulation to test emotional resonance",
    steps: [
      {
        order: 1,
        title: "Problem",
        description: "Identify the problem your reader faces.",
        placeholder: "The core problem my reader faces is...",
      },
      {
        order: 2,
        title: "Amplify",
        description: "Amplify the consequences of not solving the problem.",
        placeholder: "If this problem goes unsolved...",
      },
      {
        order: 3,
        title: "Story & Solution",
        description:
          "Tell a story of someone who solved this problem. Bridge to your solution.",
        placeholder: "Someone just like my reader solved this by...",
      },
      {
        order: 4,
        title: "Transformation",
        description:
          "Describe the transformation. Before and after. What life looks like on the other side.",
        placeholder: "After the solution, their life looks like...",
      },
      {
        order: 5,
        title: "Offer",
        description:
          "Present your offer clearly. What they get, why it works, what it costs.",
        placeholder: "Here is exactly what I am offering...",
      },
      {
        order: 6,
        title: "Response",
        description:
          "Call to action. Tell them exactly what to do and why to do it now.",
        placeholder: "Here is what to do right now...",
      },
    ],
    languages: {
      en: {
        name: "Problem-Amplify-Story-Transformation-Offer-Response",
        description:
          "A complete sales copy framework that takes the reader from pain to purchase.",
      },
      it: {
        name: "Problema-Amplifica-Storia-Trasformazione-Offerta-Risposta",
        description:
          "Un framework completo per il copy di vendita che porta il lettore dal problema all'acquisto.",
      },
    },
  },

  {
    slug: "bab",
    category: "copywriting",
    name: "BAB",
    description:
      "Paints a vivid before picture, then an irresistible after picture, then bridges the gap with your offer.",
    author: "Jim Edwards",
    contentTypes: ["email", "social-media", "newsletter", "blog-post"],
    books: [
      { title: "Copywriting Secrets", author: "Jim Edwards" },
      { title: "The Boron Letters", author: "Gary Halbert" },
    ],
    claudeSkill:
      "Framework Injection + Style Mirroring (feed Gary Halbert's tone); great for email drafts",
    steps: [
      {
        order: 1,
        title: "Before",
        description:
          "Describe the reader's current situation. The pain, the frustration, the struggle.",
        placeholder: "Right now, my reader is experiencing...",
      },
      {
        order: 2,
        title: "After",
        description:
          "Paint the dream outcome. What does their life look like when the problem is solved?",
        placeholder: "Imagine a world where...",
      },
      {
        order: 3,
        title: "Bridge",
        description:
          "Show how to get from Before to After. Your product, method or idea is the bridge.",
        placeholder: "Here is how to get there...",
      },
    ],
    languages: {
      en: {
        name: "Before-After-Bridge",
        description:
          "Contrasts the painful present with the desirable future, then bridges the gap.",
      },
      it: {
        name: "Prima-Dopo-Ponte",
        description:
          "Contrasta il presente doloroso con il futuro desiderabile, poi costruisce il ponte.",
      },
    },
  },

  {
    slug: "star-story-solution",
    category: "copywriting",
    name: "Star-Story-Solution",
    description:
      "Introduces a relatable character facing a problem, tells their journey, and reveals the solution that saved them.",
    author: "Russell Brunson",
    contentTypes: ["sales-page", "email", "video-script", "newsletter"],
    books: [{ title: "Dotcom Secrets", author: "Russell Brunson" }],
    claudeSkill:
      'Persona Prompting ("You are a testimonial copywriter"); Audience Simulation to test if the story resonates',
    steps: [
      {
        order: 1,
        title: "Star",
        description:
          "Introduce the main character — your customer, yourself, or a relatable persona.",
        placeholder: "Meet [name], who was struggling with...",
      },
      {
        order: 2,
        title: "Story",
        description:
          "Tell their story. The struggle, the journey, the turning point.",
        placeholder: "Their story begins when...",
      },
      {
        order: 3,
        title: "Solution",
        description: "Reveal the solution that changed everything for them.",
        placeholder: "Everything changed when they discovered...",
      },
    ],
    languages: {
      en: {
        name: "Star-Story-Solution",
        description:
          "A narrative framework that builds empathy through character before revealing the solution.",
      },
      it: {
        name: "Protagonista-Storia-Soluzione",
        description:
          "Un framework narrativo che costruisce empatia attraverso il personaggio prima di rivelare la soluzione.",
      },
    },
  },

  // ── STORYTELLING ──────────────────────────

  {
    slug: "heros-journey",
    category: "storytelling",
    name: "Hero's Journey",
    description:
      "The universal story structure. Maps your brand or founder story to the archetypal journey every reader recognizes.",
    author: "Joseph Campbell",
    contentTypes: ["blog-post", "newsletter", "video-script", "sales-page"],
    books: [
      { title: "The Hero with a Thousand Faces", author: "Joseph Campbell" },
      { title: "The Writer's Journey", author: "Christopher Vogler" },
    ],
    claudeSkill:
      "Framework Injection: map your brand/founder story to each stage; Multi-Pass (one stage per prompt)",
    steps: [
      {
        order: 1,
        title: "The Ordinary World",
        description: "Show the hero's normal life before the adventure begins.",
        placeholder: "Before everything changed, my world looked like...",
      },
      {
        order: 2,
        title: "The Call to Adventure",
        description:
          "The event or realization that disrupts the ordinary world.",
        placeholder: "Then something happened that changed everything...",
      },
      {
        order: 3,
        title: "Refusal of the Call",
        description: "The hesitation, the doubt, the reason not to change.",
        placeholder: "At first I hesitated because...",
      },
      {
        order: 4,
        title: "Meeting the Mentor",
        description:
          "The guide, tool, or insight that gives the hero confidence to proceed.",
        placeholder: "What gave me the courage to move forward was...",
      },
      {
        order: 5,
        title: "Crossing the Threshold",
        description: "The commitment. The point of no return.",
        placeholder: "The moment I fully committed was...",
      },
      {
        order: 6,
        title: "The Ordeal",
        description: "The central challenge. The darkest moment.",
        placeholder: "The hardest moment in the journey was...",
      },
      {
        order: 7,
        title: "The Reward",
        description: "What was gained from surviving the ordeal.",
        placeholder: "What I gained from that experience was...",
      },
      {
        order: 8,
        title: "The Return",
        description: "Coming back transformed. Sharing the gift with others.",
        placeholder: "I returned changed, and now I can offer...",
      },
    ],
    languages: {
      en: {
        name: "Hero's Journey",
        description:
          "The universal story structure for brand and founder narratives.",
      },
      it: {
        name: "Il Viaggio dell'Eroe",
        description:
          "La struttura narrativa universale per storie di brand e founder.",
      },
    },
  },

  {
    slug: "storybrand-sb7",
    category: "storytelling",
    name: "StoryBrand SB7",
    description:
      "Positions the customer as the hero and your brand as the guide. Clarifies your message so customers listen.",
    author: "Donald Miller",
    contentTypes: ["homepage", "sales-page", "email", "newsletter"],
    books: [
      { title: "Building a StoryBrand", author: "Donald Miller" },
      { title: "Marketing Made Simple", author: "Donald Miller" },
    ],
    claudeSkill:
      "Framework Injection (paste SB7 template + your brand); Structured Output for BrandScript; Translation + Localization for IT version",
    steps: [
      {
        order: 1,
        title: "The Character",
        description: "Who is your customer and what do they want?",
        placeholder: "My customer wants...",
      },
      {
        order: 2,
        title: "The Problem",
        description:
          "What external, internal, and philosophical problem do they face?",
        placeholder:
          "Their external problem is... Their internal feeling is... The deeper injustice is...",
      },
      {
        order: 3,
        title: "The Guide",
        description: "How does your brand show empathy and authority?",
        placeholder:
          "We understand this struggle because... We have helped others by...",
      },
      {
        order: 4,
        title: "The Plan",
        description: "What simple steps do you offer?",
        placeholder:
          "Here is how to work with us: Step 1... Step 2... Step 3...",
      },
      {
        order: 5,
        title: "The Call to Action",
        description:
          "What direct and transitional action do you want them to take?",
        placeholder: "The direct action is... The transitional action is...",
      },
      {
        order: 6,
        title: "The Success",
        description: "What does success look like for your customer?",
        placeholder: "After working with us, my customer will...",
      },
      {
        order: 7,
        title: "The Failure",
        description: "What is at stake if they do nothing?",
        placeholder: "If they do nothing, they risk...",
      },
    ],
    languages: {
      en: {
        name: "StoryBrand SB7",
        description:
          "Positions the customer as hero and your brand as the guide.",
      },
      it: {
        name: "StoryBrand SB7",
        description:
          "Posiziona il cliente come eroe e il tuo brand come guida.",
      },
    },
  },

  {
    slug: "pixar-story-spine",
    category: "storytelling",
    name: "Pixar Story Spine",
    description:
      "A simple but powerful story structure used by Pixar. Forces clarity and narrative momentum.",
    author: "Ed Catmull",
    contentTypes: ["blog-post", "newsletter", "social-media", "video-script"],
    books: [
      { title: "Creativity, Inc.", author: "Ed Catmull" },
      { title: "Into the Woods", author: "John Yorke" },
    ],
    claudeSkill:
      'Framework Injection: "Using the Pixar Story Spine, tell the story of [customer/product]"',
    steps: [
      {
        order: 1,
        title: "Once Upon a Time",
        description: "Establish the world and the character.",
        placeholder: "Once upon a time...",
      },
      {
        order: 2,
        title: "Every Day",
        description: "Describe the routine, the normal state of things.",
        placeholder: "Every day...",
      },
      {
        order: 3,
        title: "Until One Day",
        description: "The inciting incident. The disruption.",
        placeholder: "Until one day...",
      },
      {
        order: 4,
        title: "Because of That",
        description: "Cause and effect. What happened as a result?",
        placeholder: "Because of that...",
      },
      {
        order: 5,
        title: "Until Finally",
        description: "The climax. The resolution.",
        placeholder: "Until finally...",
      },
      {
        order: 6,
        title: "Ever Since Then",
        description: "The new normal. The transformation.",
        placeholder: "Ever since then...",
      },
    ],
    languages: {
      en: {
        name: "Pixar Story Spine",
        description:
          "Pixar's deceptively simple story structure that forces narrative clarity.",
      },
      it: {
        name: "La Struttura Pixar",
        description:
          "La struttura narrativa di Pixar che forza la chiarezza della storia.",
      },
    },
  },

  {
    slug: "abt",
    category: "storytelling",
    name: "ABT (And-But-Therefore)",
    description:
      "The shortest complete story structure. Perfect for elevator pitches, social posts, and opening hooks.",
    author: "Randy Olson",
    contentTypes: ["social-media", "newsletter", "blog-post", "email"],
    books: [
      { title: "Houston, We Have a Narrative", author: "Randy Olson" },
      { title: "Connection", author: "Randy Olson" },
    ],
    claudeSkill:
      'Quick Framework Injection: "Rewrite this description using the ABT structure" — perfect for elevator pitches',
    steps: [
      {
        order: 1,
        title: "And (Setup)",
        description: "State the context and what is true. The normal world.",
        placeholder: "We have [situation] and [context]...",
      },
      {
        order: 2,
        title: "But (Conflict)",
        description: "Introduce the tension, the problem, the disruption.",
        placeholder: "But [problem or conflict]...",
      },
      {
        order: 3,
        title: "Therefore (Resolution)",
        description: "The consequence, the solution, the call to action.",
        placeholder: "Therefore [solution or action]...",
      },
    ],
    languages: {
      en: {
        name: "And-But-Therefore",
        description:
          "The shortest complete story structure for pitches and hooks.",
      },
      it: {
        name: "E-Ma-Quindi",
        description:
          "La struttura narrativa più breve e completa per pitch e hook.",
      },
    },
  },

  // ── PRODUCT MARKETING ──────────────────────────

  {
    slug: "golden-circle",
    category: "product-marketing",
    name: "Golden Circle",
    description:
      "Start with Why. The framework that explains why some organizations and people are more innovative and inspiring than others.",
    author: "Simon Sinek",
    contentTypes: ["homepage", "blog-post", "newsletter", "video-script"],
    books: [
      { title: "Start with Why", author: "Simon Sinek" },
      { title: "Find Your Why", author: "Simon Sinek" },
    ],
    claudeSkill:
      'Persona Prompting + Chain-of-Thought: "Help me articulate my Why before my How and What"',
    steps: [
      {
        order: 1,
        title: "Why",
        description:
          "Why does your organization exist? What is your belief? Your purpose beyond profit.",
        placeholder: "We believe that...",
      },
      {
        order: 2,
        title: "How",
        description:
          "How do you do what you do? Your process, your differentiator.",
        placeholder: "We achieve this by...",
      },
      {
        order: 3,
        title: "What",
        description: "What do you actually do? Your product or service.",
        placeholder: "Which means we offer...",
      },
    ],
    languages: {
      en: {
        name: "Golden Circle",
        description:
          "Start with Why — the framework for inspiring leadership and communication.",
      },
      it: {
        name: "Il Cerchio d'Oro",
        description:
          "Inizia dal Perché — il framework per la leadership e la comunicazione ispirante.",
      },
    },
  },

  {
    slug: "jobs-to-be-done",
    category: "product-marketing",
    name: "Jobs To Be Done",
    description:
      "Frames your product around the job the customer is hiring it to do. Reveals the real motivation behind a purchase.",
    author: "Clayton Christensen",
    contentTypes: ["blog-post", "newsletter", "sales-page", "homepage"],
    books: [
      { title: "Competing Against Luck", author: "Clayton Christensen" },
      { title: "The Jobs To Be Done Playbook", author: "Jim Kalbach" },
    ],
    claudeSkill:
      'Audience Simulation: "Role-play as someone hiring [product] to do a job"; generate 10 JTBD statements, rank by frequency',
    steps: [
      {
        order: 1,
        title: "The Situation",
        description:
          "What situation is the customer in when they hire your product?",
        placeholder: "When I am...",
      },
      {
        order: 2,
        title: "The Motivation",
        description: "What functional job do they need done?",
        placeholder: "I want to...",
      },
      {
        order: 3,
        title: "The Outcome",
        description:
          "What is the desired outcome? What does success feel like?",
        placeholder: "So I can...",
      },
      {
        order: 4,
        title: "The Anxiety",
        description: "What are they anxious about? What could go wrong?",
        placeholder: "But I am worried that...",
      },
      {
        order: 5,
        title: "The Solution Framing",
        description:
          "How does your product address the job, outcome, and anxiety?",
        placeholder: "Our product helps by...",
      },
    ],
    languages: {
      en: {
        name: "Jobs To Be Done",
        description:
          "Frame your product around the job the customer is hiring it to do.",
      },
      it: {
        name: "Il Lavoro da Fare",
        description:
          "Inquadra il tuo prodotto attorno al lavoro per cui il cliente lo assume.",
      },
    },
  },

  // ── CASE DOCUMENTATION ──────────────────────────

  {
    slug: "star",
    category: "case-documentation",
    name: "STAR",
    description:
      "A structured framework for telling case study and achievement stories with clarity and impact.",
    author: "Robert Yin",
    contentTypes: ["case-study", "blog-post", "email"],
    books: [
      { title: "Case Study Research", author: "Robert Yin" },
      { title: "Resonate", author: "Nancy Duarte" },
    ],
    claudeSkill:
      "Framework Injection: paste customer data, ask Claude to structure as STAR; Multi-Pass for draft → metrics → polish",
    steps: [
      {
        order: 1,
        title: "Situation",
        description: "What was the context and background?",
        placeholder: "The situation was...",
      },
      {
        order: 2,
        title: "Task",
        description: "What was the challenge or goal?",
        placeholder: "The task or challenge was...",
      },
      {
        order: 3,
        title: "Action",
        description: "What specific actions were taken?",
        placeholder: "The actions taken were...",
      },
      {
        order: 4,
        title: "Result",
        description: "What were the measurable outcomes?",
        placeholder: "The results were...",
      },
    ],
    languages: {
      en: {
        name: "STAR",
        description:
          "Situation-Task-Action-Result for case studies and achievement stories.",
      },
      it: {
        name: "STAR",
        description:
          "Situazione-Compito-Azione-Risultato per casi studio e storie di successo.",
      },
    },
  },

  {
    slug: "problem-process-payoff",
    category: "case-documentation",
    name: "Problem-Process-Payoff",
    description:
      "A results-focused case study framework that emphasizes measurable ROI and transformation.",
    author: "Donald Miller",
    contentTypes: ["case-study", "sales-page", "email"],
    books: [
      { title: "Building a StoryBrand", author: "Donald Miller" },
      { title: "Influence", author: "Robert Cialdini" },
    ],
    claudeSkill:
      "Framework Injection + emphasis on measurable ROI; ask Claude to quantify every outcome",
    steps: [
      {
        order: 1,
        title: "Problem",
        description: "What specific problem was the client facing before?",
        placeholder: "Before working with us, the client faced...",
      },
      {
        order: 2,
        title: "Process",
        description: "What did you do together? How did you solve it?",
        placeholder: "Here is what we did together...",
      },
      {
        order: 3,
        title: "Payoff",
        description: "What were the concrete, measurable results?",
        placeholder: "The results were concrete: ...",
      },
    ],
    languages: {
      en: {
        name: "Problem-Process-Payoff",
        description:
          "Results-focused case study framework that emphasizes measurable ROI.",
      },
      it: {
        name: "Problema-Processo-Risultato",
        description:
          "Framework per casi studio focalizzato sui risultati misurabili.",
      },
    },
  },

  // ── EMAIL ──────────────────────────

  {
    slug: "welcome-sequence",
    category: "email",
    name: "Welcome Sequence",
    description:
      "The most important email sequence you will ever write. Sets expectations, builds trust, and converts new subscribers.",
    author: "Chad White",
    contentTypes: ["email"],
    books: [
      { title: "Email Marketing Rules", author: "Chad White" },
      { title: "Permission Marketing", author: "Seth Godin" },
    ],
    claudeSkill:
      "Multi-Pass Writing: draft each email in the 5-7 email series; Structured Output for the full sequence timeline",
    steps: [
      {
        order: 1,
        title: "Email 1 — The Welcome",
        description:
          "Deliver on the promise that got them to subscribe. Thank them. Set expectations.",
        placeholder: "What I promised and what they can expect...",
      },
      {
        order: 2,
        title: "Email 2 — Your Story",
        description:
          "Who are you and why should they trust you? Your origin story briefly.",
        placeholder: "My story and why I do this work...",
      },
      {
        order: 3,
        title: "Email 3 — Your Best Content",
        description:
          "Share your single most valuable piece of content or insight.",
        placeholder: "The most valuable thing I can share right now...",
      },
      {
        order: 4,
        title: "Email 4 — Social Proof",
        description: "Results, testimonials, or proof that what you do works.",
        placeholder: "Here is proof this works...",
      },
      {
        order: 5,
        title: "Email 5 — The Soft Offer",
        description:
          "Introduce your product or service naturally, without hard selling.",
        placeholder: "When you are ready, here is how I can help further...",
      },
    ],
    languages: {
      en: {
        name: "Welcome Sequence",
        description:
          "The email sequence that converts new subscribers into engaged readers and buyers.",
      },
      it: {
        name: "Sequenza di Benvenuto",
        description:
          "La sequenza email che converte i nuovi iscritti in lettori coinvolti e acquirenti.",
      },
    },
  },

  // ── PRODUCT LAUNCH ──────────────────────────

  {
    slug: "perfect-webinar",
    category: "product-launch",
    name: "Perfect Webinar",
    description:
      "Russell Brunson's proven webinar framework. Takes the audience from skeptic to buyer through story and teaching.",
    author: "Russell Brunson",
    contentTypes: ["video-script", "sales-page", "product-launch"],
    books: [{ title: "Expert Secrets", author: "Russell Brunson" }],
    claudeSkill:
      "Multi-Pass: origin story → secret 1 → secret 2 → secret 3 → stack → close; Persona Prompting as a webinar coach",
    steps: [
      {
        order: 1,
        title: "The Origin Story",
        description:
          "Your personal story that establishes credibility and builds rapport.",
        placeholder: "My story and how I discovered this...",
      },
      {
        order: 2,
        title: "Secret 1 — The Vehicle",
        description:
          "Teach the new opportunity. Why this is the right vehicle for their desired result.",
        placeholder: "The new opportunity I am introducing is...",
      },
      {
        order: 3,
        title: "Secret 2 — Internal Beliefs",
        description: "Break the false beliefs they have about themselves.",
        placeholder:
          "The story they tell themselves that holds them back is...",
      },
      {
        order: 4,
        title: "Secret 3 — External Beliefs",
        description: "Break the false beliefs about external obstacles.",
        placeholder: "The external obstacles they blame are...",
      },
      {
        order: 5,
        title: "The Stack & Offer",
        description:
          "Stack the value. Present the offer with everything included.",
        placeholder: "Here is everything they get...",
      },
      {
        order: 6,
        title: "The Close",
        description: "Handle objections. Create urgency. Call to action.",
        placeholder: "The reason to act now is...",
      },
    ],
    languages: {
      en: {
        name: "Perfect Webinar",
        description:
          "The proven webinar framework that takes audiences from skeptic to buyer.",
      },
      it: {
        name: "Webinar Perfetto",
        description:
          "Il framework collaudato che porta il pubblico dallo scetticismo all'acquisto.",
      },
    },
  },
];

// ─────────────────────────────────────────
// DEFAULT PROMPTS SEED DATA
// ─────────────────────────────────────────

function buildDefaultPrompts(frameworks: any[]) {
  const prompts: any[] = [];

  for (const framework of frameworks) {
    for (const step of framework.steps) {
      prompts.push({
        userId: null,
        frameworkSlug: framework.slug,
        stepOrder: step.order,
        instructionText: `You are an expert copywriter and content strategist helping write the "${step.title}" section of a ${framework.name} piece.

The audience is: {audience}
The tone is: {tone}
The language is: {language}

Here is what the writer has provided as raw input:
{userInput}

Your task:
1. Write a compelling "${step.title}" section based on their input
2. Follow the ${framework.name} framework principles
3. Match the requested tone exactly
4. Write for the specified audience
5. Be specific — avoid generic statements
6. Output only the finished section, no explanations

Framework guidance: ${step.description}`,
        tone: null,
        audience: null,
        language: "en",
        referenceFiles: [],
        specialInstructions: framework.claudeSkill,
        isDefault: true,
      });
    }
  }

  return prompts;
}

// ─────────────────────────────────────────
// SEED FUNCTION
// ─────────────────────────────────────────

async function seed() {
  await connectDB();

  console.log("🌱 Starting seed...\n");

  // Seed frameworks
  for (const framework of frameworks) {
    await Framework.findOneAndUpdate({ slug: framework.slug }, framework, {
      upsert: true,
      new: true,
    });
    console.log(`✓ Framework seeded: ${framework.slug}`);
  }

  // Seed default prompts
  const prompts = buildDefaultPrompts(frameworks);
  for (const prompt of prompts) {
    await Prompt.findOneAndUpdate(
      {
        frameworkSlug: prompt.frameworkSlug,
        stepOrder: prompt.stepOrder,
        isDefault: true,
        userId: null,
      },
      prompt,
      { upsert: true, new: true },
    );
    console.log(
      `✓ Default prompt seeded: ${prompt.frameworkSlug} — step ${prompt.stepOrder}`,
    );
  }

  console.log("\n✅ Seeding complete.");
  console.log(`   ${frameworks.length} frameworks`);
  console.log(`   ${prompts.length} default prompts`);

  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
