const DEFAULTS = {
  "/ex": {
    output: "This is an example of the shortcuts Magic KB can do! Try it",
    note: "Try typing /ex then space in any text field."
  }
};

const LIB_DEFAULTS = {
  // SOCIAL MEDIA
  "/lipost": {
    tags: ["Social Media"],
    note: "LinkedIn Thought Leadership Post",
    output: "Write a 250-word LinkedIn post sharing my opinion on [industry topic]. Start with a bold, scroll-stopping statement, explain why it matters to [target audience], share one counter-intuitive point, and end with two practical tips and a call-to-action inviting comments. Tone: Professional, authoritative, yet conversational."
  },
  "/igideas": {
    tags: ["Social Media"],
    note: "20 Instagram Post Ideas",
    output: "Act as a Social Media Strategist. Generate 20 diverse Instagram post ideas for a professional brand in the [industry] niche, focusing on [topic/context]. The ideas should be a mix of: (5) Educational Carousels, (5) Behind-the-Scenes Reels, (5) Interactive Polls/Quizzes, and (5) Thought Leadership Quote Graphics. For each idea, provide a brief description and a suggested visual format."
  },
  "/twhook": {
    tags: ["Social Media"],
    note: "Twitter Thread Hook",
    output: "Write 10 scroll-stopping hooks for a Twitter thread about [topic]. Each hook should:\n- Be 1-2 sentences max\n- Create curiosity or controversy\n- Promise clear value\n- Use numbers or specific outcomes where possible\nFormat: Just the hooks, numbered 1-10."
  },
  "/licarousel": {
    tags: ["Social Media"],
    note: "LinkedIn Carousel Outline",
    output: "Create a 10-slide LinkedIn carousel outline about [topic].\nSlide 1: Eye-catching title + one-liner benefit\nSlides 2-8: Key points (one per slide, with supporting stat or example)\nSlide 9: Common mistakes to avoid\nSlide 10: Clear CTA\nKeep each slide to 10 words max."
  },
  "/igcaption": {
    tags: ["Social Media"],
    note: "Instagram Caption Formula",
    output: "Write an Instagram caption using the AIDA formula:\n- Attention: Open with a surprising fact or bold question about [topic]\n- Interest: Share a personal story or insight (2-3 sentences)\n- Desire: Explain the transformation or benefit\n- Action: End with a clear CTA and 3-5 strategic hashtags\nTone: Authentic, engaging, conversational."
  },

  // SALES & OUTREACH
  "/cold4t": {
    tags: ["Sales & Outreach"],
    note: "The '4T' Cold Email/DM",
    output: "Generate a concise, value-driven cold message using the 4T framework.\n1. Trigger: Why reaching out now? (e.g., recent news about [Company]).\n2. Target: Why them specifically?\n3. Teach: Share a brief insight about [industry challenge].\n4. Transition: A low-friction ask (e.g., 'Open to a 5-min chat?').\nTone: Helpful, not salesy."
  },
  "/followup": {
    tags: ["Sales & Outreach"],
    note: "Follow-up (No Response)",
    output: "Create a polite and concise follow-up message (≤80 words) for [Name] who hasn't replied to my previous message about [Topic]. Reference the previous email briefly, add one new piece of value or insight, and end with a simple yes/no question to make it easy to respond."
  },
  "/breakup": {
    tags: ["Sales & Outreach"],
    note: "Breakup Email (Last Touch)",
    output: "Write a final follow-up email to [Name] that:\n- Acknowledges they're likely busy\n- Restates the core value proposition in one sentence\n- Uses a 'permission to close' approach ('Should I take you off my list?')\n- Leaves the door open\nTone: Respectful, not pushy. Max 60 words."
  },
  "/referral": {
    tags: ["Sales & Outreach"],
    note: "Referral Request Template",
    output: "Write a warm message asking [Contact Name] for a referral to [Target Person/Company].\n- Thank them for [previous interaction/help]\n- Explain why you think [Target] would benefit (1 sentence)\n- Make the ask crystal clear\n- Offer to draft the intro for them\nTone: Grateful, specific, low-effort for them."
  },
  "/objection": {
    tags: ["Sales & Outreach"],
    note: "Objection Handler (Price)",
    output: "Respond to the objection: 'Your price is too high.'\nUse the framework:\n1. Empathize: Acknowledge the concern\n2. Reframe: Shift from cost to value/ROI\n3. Isolate: Confirm price is the only blocker\n4. Bridge: Offer payment flexibility or comparison\nTone: Confident but consultative."
  },
  "/demo": {
    tags: ["Sales & Outreach"],
    note: "Demo Follow-up Summary",
    output: "Write a post-demo follow-up email to [Contact]:\n- Thank them for their time\n- Recap 3 key points discussed and how they map to their goals\n- Include 1-2 next steps (e.g., custom proposal, trial access)\n- Add a calendar link for next call\nTone: Helpful, solution-focused."
  },

  // DESIGN
  "/heroslide": {
    tags: ["Design"],
    note: "The 'Hero' Slide Designer",
    output: "Create a 16:9 professional presentation slide with a clean, modern corporate aesthetic.\nHeader: Bold title '[Slide Title]' in a branded accent color.\nVisual: A high-quality, 3D isometric illustration of [concept, e.g., a digital factory] on the left.\nContent: 3 rounded cards on the right, each with a small icon and 1 sentence of text.\nStyle: Minimalist, soft gradients, high contrast."
  },
  "/blueprint": {
    tags: ["Design"],
    note: "Technical Blueprint",
    output: "Create a professional 16:9 slide in a technical blueprint style. Visualize [system/product] with diagrams, annotated labels, and structured layouts. Use a blueprint blue and white color palette. Include measurement lines and highlighted key components to make it look like an engineering schematic."
  },
  "/infographic": {
    tags: ["Design"],
    note: "Data Infographic Layout",
    output: "Design a vertical infographic for [topic/data]:\n- Hero title at top with icon\n- 5 sections, each with: stat in large font, context in small font, supporting icon\n- Visual flow with connecting lines or arrows\n- Brand colors with one accent highlight\nStyle: Clean, modern, data-driven."
  },
  "/timeline": {
    tags: ["Design"],
    note: "Visual Timeline/Roadmap",
    output: "Create a horizontal timeline slide showing [project/product roadmap]:\n- Span across [timeframe, e.g., Q1-Q4 2024]\n- Each milestone: icon, title, 1-line description\n- Use color coding for phases (Planning, Build, Launch)\n- Add progress indicators or checkmarks\nStyle: Professional, easy to scan."
  },

  // PRODUCT MANAGEMENT
  "/prd": {
    tags: ["Product Management"],
    note: "PRD Draft from Raw Notes",
    output: "Act as a Senior Product Manager. Transform these raw notes: [paste notes] into a structured Product Requirement Document (PRD). Include:\n1. Problem Statement\n2. User Goals\n3. Functional Requirements (prioritized by MoSCoW)\n4. Success Metrics (KPIs).\nTone: Technical and precise."
  },
  "/userstory": {
    tags: ["Product Management"],
    note: "User Story Refinement",
    output: "Write 5 detailed user stories for a feature that [describe feature]. Use the format: 'As a [user persona], I want to [action], so that [value].' For each story, include at least 3 Acceptance Criteria."
  },
  "/roadmap": {
    tags: ["Product Management"],
    note: "Product Roadmap Summary",
    output: "Create a quarterly product roadmap for [product] with:\n- Q1-Q4 themes (one per quarter)\n- 3-5 key features per quarter\n- Business impact for each (revenue, retention, acquisition)\n- Dependencies and risks\nFormat as a table."
  },
  "/retro": {
    tags: ["Product Management"],
    note: "Sprint Retrospective",
    output: "Facilitate a sprint retrospective with these prompts:\n1. What went well? (3 things)\n2. What could be improved? (3 things)\n3. What action items should we commit to? (2 specific, measurable actions)\n4. Who owns each action?\nFormat: Clear sections, action-oriented."
  },
  "/featurereq": {
    tags: ["Product Management"],
    note: "Feature Request Analysis",
    output: "Analyze this feature request: [paste request]\n- Who is asking? (user persona)\n- What problem does it solve?\n- How many users would benefit? (estimate)\n- Effort estimate (S/M/L)\n- Recommendation: Build now / Later / Never (with reasoning)\nFormat: Structured analysis."
  },

  // MARKETING & SEO
  "/sgoblog": {
    tags: ["Marketing & SEO"],
    note: "SGO Content Brief",
    output: "Create a comprehensive SGO content brief - for LLMs to promote our content - for the keyword '[target keywords]'. Include:\n1. Suggested Title Tag and Meta Description.\n2. H1, H2, and H3 headings structure.\n3. Key talking points for each section.\n4. LSI keywords to include.\n5. Target word count and internal linking suggestions."
  },
  "/headlines": {
    tags: ["Marketing & SEO"],
    note: "10 Headline Variations",
    output: "Write 10 headline variations for [topic/offer]. Mix these formulas:\n- How-to (2)\n- Number list (2)\n- Question (2)\n- Benefit-driven (2)\n- Curiosity gap (2)\nEach should be 6-12 words, compelling, and specific."
  },
  "/adcopy": {
    tags: ["Marketing & SEO"],
    note: "Facebook/LinkedIn Ad Copy",
    output: "Write ad copy for [product/service]:\n- Hook: Bold statement or question (1 line)\n- Body: Pain point + solution (2-3 lines)\n- Proof: Stat or testimonial snippet (1 line)\n- CTA: Clear action with urgency\nTotal: ≤125 characters. Tone: Direct, benefit-focused."
  },
  "/landingcopy": {
    tags: ["Marketing & SEO"],
    note: "Landing Page Structure",
    output: "Write landing page copy for [product/service]:\n- Hero headline: Promise clear outcome\n- Subheadline: Expand on who it's for\n- 3 benefit bullets (not features)\n- Social proof: '[X] companies trust us'\n- CTA: Action-oriented button text\nTone: Clear, confident, conversion-focused."
  },
  "/emailseq": {
    tags: ["Marketing & SEO"],
    note: "3-Email Nurture Sequence",
    output: "Create a 3-email nurture sequence for [lead magnet/trial users]:\nEmail 1 (Day 0): Welcome + deliver value (resource/tip)\nEmail 2 (Day 3): Education (how-to or case study)\nEmail 3 (Day 7): Soft pitch with urgency/bonus\nEach: subject line + 3-paragraph body + CTA."
  },

  // WRITING & CONTENT CREATION
  "/showdontell": {
    tags: ["Writing & Content"],
    note: "The 'Show, Don't Tell' Editor",
    output: "Rewrite the following paragraph to follow the 'Show, Don't Tell' rule. Instead of stating emotions or traits directly, describe the actions, sensory details, and atmosphere that imply them.\nOriginal Text: [paste text]"
  },
  "/rewrite": {
    tags: ["Writing & Content"],
    note: "Rewrite in a sharper tone",
    output: "Rewrite this to be clearer, shorter, and more punchy. Keep meaning. Remove fluff: [paste text]"
  },
  "/expand": {
    tags: ["Writing & Content"],
    note: "Expand with Examples",
    output: "Expand this paragraph by adding:\n- One concrete example or case study\n- One supporting stat or data point\n- One analogy to make it relatable\nOriginal: [paste text]"
  },
  "/simplify": {
    tags: ["Writing & Content"],
    note: "Simplify to Grade 8 Level",
    output: "Rewrite this text for an 8th-grade reading level:\n- Use shorter sentences\n- Replace jargon with plain language\n- Keep core meaning intact\nOriginal: [paste text]"
  },
  "/blogintro": {
    tags: ["Writing & Content"],
    note: "Blog Post Introduction",
    output: "Write an engaging blog intro for: [topic]\n- Hook: Start with a surprising stat, question, or bold claim\n- Context: Why this matters now (2-3 sentences)\n- Promise: What the reader will learn\n- Preview: List 3-5 sections briefly\nTone: Conversational, authoritative."
  },
  "/contentideas": {
    tags: ["Writing & Content"],
    note: "Content Ideas Generator",
    output: "Give me 10 strong content ideas about [topic]. Each: hook, angle, and CTA. No filler."
  },

  // EDUCATION & LEARNING
  "/feynman": {
    tags: ["Education & Learning"],
    note: "The Feynman Technique Explainer",
    output: "Explain [complex concept] to me as if I am a 10-year-old. Use a simple analogy, avoid jargon, and break it down into 3 easy-to-understand steps. At the end, ask me a question to check my understanding."
  },
  "/lesson": {
    tags: ["Education & Learning"],
    note: "Lesson Plan Template",
    output: "Create a 45-minute lesson plan for teaching [topic] to [audience]:\n- Learning objective (1 sentence)\n- Hook/warm-up (5 min)\n- Core instruction (20 min): 3 key concepts\n- Activity/practice (15 min)\n- Wrap-up + assessment (5 min)\nInclude materials needed."
  },
  "/studyguide": {
    tags: ["Education & Learning"],
    note: "Study Guide from Notes",
    output: "Convert these notes into a study guide: [paste notes]\nInclude:\n- Key concepts (definitions)\n- Important formulas/frameworks\n- 5 practice questions\n- Memory aids (mnemonics/analogies)"
  },
  "/quiz": {
    tags: ["Education & Learning"],
    note: "Generate Quiz Questions",
    output: "Create 10 multiple-choice quiz questions about [topic]:\n- Mix difficulty levels (4 easy, 4 medium, 2 hard)\n- Each: question + 4 options (A-D) + correct answer + brief explanation\nFocus on testing understanding, not memorization."
  },

  // CUSTOMER SUPPORT
  "/empathy": {
    tags: ["Customer Support"],
    note: "The 'Empathy-First' Resolution",
    output: "Draft a customer support response to a user who is frustrated because [issue, e.g., their account was locked].\n1. Acknowledge the frustration immediately.\n2. Explain the 'why' behind the issue briefly.\n3. Provide a clear, step-by-step solution.\n4. Offer a small 'make-good' (e.g., a discount code).\nTone: Empathetic, professional, and solution-oriented."
  },
  "/bugresponse": {
    tags: ["Customer Support"],
    note: "Bug Report Response",
    output: "Respond to a bug report from [user]:\n- Thank them for reporting\n- Confirm you've reproduced the issue (or ask for more details)\n- Explain what's causing it (if known)\n- Provide workaround if available\n- Give timeline for fix\nTone: Transparent, apologetic, proactive."
  },
  "/refund": {
    tags: ["Customer Support"],
    note: "Refund Request Handler",
    output: "Handle a refund request from [customer] for [product/service]:\n- Express understanding of their situation\n- Review refund policy clearly (quote relevant section)\n- If approving: confirm next steps and timing\n- If denying: explain why, offer alternative (credit, discount, extension)\nTone: Fair, empathetic, policy-compliant."
  },
  "/escalation": {
    tags: ["Customer Support"],
    note: "Escalation to Engineering",
    output: "Write an internal escalation to engineering for [customer issue]:\n- Customer: [name, account details]\n- Impact: [how it affects them, urgency level]\n- Steps taken: [what support tried]\n- Technical details: [logs, error messages, reproduction steps]\n- Request: [what you need from engineering]\nFormat: Clear, structured, actionable."
  },

  // DATA & ANALYSIS
  "/datasummary": {
    tags: ["Data & Analysis"],
    note: "Executive Data Summary",
    output: "Analyze the following dataset: [paste data/CSV].\n1. Identify the top 3 trends.\n2. Highlight any anomalies or outliers.\n3. Provide 3 actionable recommendations for the executive team based on these findings.\nPresent the results in a clean table format."
  },
  "/dashboard": {
    tags: ["Data & Analysis"],
    note: "Dashboard Design Brief",
    output: "Design a dashboard for [stakeholder] to track [business goal]:\n- Top KPIs (3-5 metrics): What, why, target\n- Visual format for each: line chart, bar, gauge, etc.\n- Filters needed: time range, segment, region\n- Alert triggers: when to notify stakeholders\nFormat: Structured spec."
  },
  "/insight": {
    tags: ["Data & Analysis"],
    note: "Data to Insight Translation",
    output: "Turn this data into executive insights: [paste data]\n- What happened? (observation)\n- Why did it happen? (hypothesis)\n- So what? (business impact)\n- Now what? (recommended action)\nFormat: 4 bullets, executive-friendly language."
  },
  "/abtest": {
    tags: ["Data & Analysis"],
    note: "A/B Test Plan",
    output: "Design an A/B test for [feature/page]:\n- Hypothesis: What you expect to happen\n- Variants: Control vs. Treatment (describe changes)\n- Primary metric: What success looks like\n- Sample size & duration needed\n- Success criteria: When to ship Treatment\nFormat: Clear, testable."
  },
  "/reporting": {
    tags: ["Data & Analysis"],
    note: "Weekly/Monthly Report Template",
    output: "Create a [weekly/monthly] report for [team/stakeholder]:\n- Top 3 wins\n- Key metrics: [list metrics] vs. last period\n- Challenges / Blockers\n- Next period priorities (3 items)\n- Help needed\nFormat: Scannable, consistent week-to-week."
  },

  // AI & PROMPTING
  "/cto": {
    tags: ["AI & Prompting"],
    note: "Ask as an expert CTO",
    output: "Act as an expert CTO. Ask me 5 questions to understand the context, then propose a clear plan and next steps."
  },
  "/pm": {
    tags: ["AI & Prompting"],
    note: "Product manager mode",
    output: "Act as a senior product manager. Turn my idea into: problem, audience, key features, MVP, metrics, and a 2-week plan."
  },
  "/qa": {
    tags: ["AI & Prompting"],
    note: "Question generator",
    output: "Ask me 10 high-signal questions to clarify what I want, then propose the best answer format."
  },
  "/summary": {
    tags: ["AI & Prompting"],
    note: "Summarize content",
    output: "Summarize this in 5 bullets. Then give 3 key takeaways and 1 action."
  },
  "/critique": {
    tags: ["AI & Prompting"],
    note: "Critical Feedback Mode",
    output: "Act as a tough but fair critic. Review [my work] and:\n- Identify 3 strengths (be specific)\n- Identify 3 weaknesses (with examples)\n- Suggest 2 concrete improvements\nBe direct, not mean. Focus on making it better."
  },

  // MEETINGS & COLLABORATION
  "/agenda": {
    tags: ["Meetings & Collaboration"],
    note: "Meeting Agenda Template",
    output: "Create a meeting agenda for [meeting title] with [attendees]:\n- Objective: What we need to decide/achieve\n- Duration: [time]\n- Agenda items: Topic, owner, time allocation\n- Pre-reads: What to review before\n- Success criteria: What 'done' looks like\nFormat: Clear, time-boxed."
  },
  "/recap": {
    tags: ["Meetings & Collaboration"],
    note: "Meeting recap",
    output: "Write a meeting recap: context, decisions, action items with owners, and next meeting agenda."
  },
  "/standup": {
    tags: ["Meetings & Collaboration"],
    note: "Daily Standup Update",
    output: "Write a standup update:\n- Yesterday: [what I completed]\n- Today: [what I'm working on]\n- Blockers: [what's in my way, if anything]\nKeep it concise (3-5 bullets total)."
  },
  "/ama": {
    tags: ["Meetings & Collaboration"],
    note: "AMA Question Collection",
    output: "I'm hosting an AMA about [topic]. Generate 15 thoughtful questions people might ask, covering:\n- Beginner questions (5)\n- Intermediate/tactical (5)\n- Advanced/strategic (5)\nMake them realistic and diverse."
  },

  // PERSONAL PRODUCTIVITY
  "/prioritize": {
    tags: ["Personal Productivity"],
    note: "Eisenhower Matrix",
    output: "Organize these tasks using the Eisenhower Matrix: [paste task list]\n- Urgent + Important: Do first\n- Important, Not Urgent: Schedule\n- Urgent, Not Important: Delegate\n- Neither: Eliminate\nReturn as 4 lists."
  },
  "/focus": {
    tags: ["Personal Productivity"],
    note: "Deep Work Plan",
    output: "Plan a deep work session for [task]:\n- Goal: What I'll complete (specific output)\n- Duration: [time block]\n- Prep: What I need ready (tools, files, info)\n- Distractions to remove: [list]\n- Success check: How I'll know I'm done\nFormat: Checklist."
  },
  "/weekly": {
    tags: ["Personal Productivity"],
    note: "Weekly Review Template",
    output: "Conduct a weekly review:\n- Last week: Top 3 wins\n- What drained energy? What gave energy?\n- Next week: Top 3 priorities\n- One thing to stop doing\n- One thing to start doing\nFormat: Reflective, actionable."
  }
};

const $ = (id) => document.getElementById(id);

const els = {
  // views
  homeView: $("homeView"),
  libraryView: $("libraryView"),

  // header CTAs
  openOptions: $("openOptions"),
  openLibrary: $("openLibrary"),
  libraryBtn: $("libraryBtn"),

  // home
  list: $("list"),
  search: $("search"),
  addBtn: $("addBtn"),

  // library
  libGrid: $("libGrid"),
  libSearch: $("libSearch"),
  libBack: $("libBack"),
  libTags: $("libTags"),
  libSubfilters: $("libSubfilters"),

  // modal
  modalBackdrop: $("modalBackdrop"),
  modalTitle: $("modalTitle"),
  shortcutInput: $("shortcutInput"),
  noteInput: $("noteInput"),
  expansionInput: $("expansionInput"),
  cancelBtn: $("cancelBtn"),
  saveBtn: $("saveBtn"),
  deleteBtn: $("deleteBtn"),
  exportBtn: $("exportBtn"),
  importBtn: $("importBtn"),
  modalClose: $("modalClose")
};

let shortcuts = {};
let library = {};

// Library filters
let libTag = "All";
const libSub = new Set();

const LIB_TAGS = [
  "All",
  "Social Media",
  "Sales & Outreach",
  "Design",
  "Product Management",
  "Marketing & SEO",
  "Writing & Content",
  "Education & Learning",
  "Customer Support",
  "Data & Analysis",
  "AI & Prompting",
  "Meetings & Collaboration",
  "Personal Productivity"
];

const ICONS = {
  all: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>`,
  spark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l1.2 4.3L17.5 8l-4.3 1.2L12 13.5 10.8 9.2 6.5 8l4.3-1.7L12 2z"/><path d="M5 14l.8 2.8L8.5 18l-2.7.8L5 21l-.8-2.2L1.5 18l2.7-1.2L5 14z"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  target: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  layout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
  cube: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4.5v11L12 22 4 17.5v-11L12 2z"/><path d="M12 22v-11"/><path d="M20 6.5l-8 4.5-8-4.5"/></svg>`,
  trend: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 7-7"/><path d="M14 8h6v6"/></svg>`,
  pen: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  headphones: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>`,
  brain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h8"/></svg>`
};

const TAG_ICONS = {
  "All": "all",
  "Social Media": "users",
  "Sales & Outreach": "target",
  "Design": "layout",
  "Product Management": "cube",
  "Marketing & SEO": "trend",
  "Writing & Content": "pen",
  "Education & Learning": "book",
  "Customer Support": "headphones",
  "Data & Analysis": "chart",
  "AI & Prompting": "brain",
  "Meetings & Collaboration": "calendar",
  "Personal Productivity": "clock"
};

const LIB_SUBFILTERS = [
  { id: "in_kb", label: "In KB", icon: "check" },
  { id: "not_in_kb", label: "Not in KB", icon: "plus" },
  { id: "short", label: "Short", icon: "bolt" },
  { id: "long", label: "Long", icon: "file" }
];

let editingKey = null;
let editingSource = "shortcuts"; // "shortcuts" or "library"

// Tooltip for notes on home list
let tipEl = null;
let tipHideTimer = null;

function ensureTip() {
  if (tipEl) return tipEl;
  tipEl = document.createElement("div");
  tipEl.className = "mk-tooltip";
  document.documentElement.appendChild(tipEl);
  return tipEl;
}
function showTip(text, anchor) {
  if (!text) return;
  clearTimeout(tipHideTimer);
  const el = ensureTip();
  el.textContent = text;

  const r = anchor.getBoundingClientRect();
  let left = r.left + 10;
  let top = r.bottom + 8;

  el.classList.add("show");
  el.style.left = "0px";
  el.style.top = "0px";
  el.style.opacity = "0";

  requestAnimationFrame(() => {
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    left = Math.min(Math.max(8, left), window.innerWidth - w - 8);
    top = Math.min(Math.max(8, top), window.innerHeight - h - 8);
    el.style.left = left + "px";
    el.style.top = top + "px";
    el.style.opacity = "";
    el.classList.add("show");
  });
}
function hideTipSoon() {
  if (!tipEl) return;
  clearTimeout(tipHideTimer);
  tipHideTimer = setTimeout(() => tipEl.classList.remove("show"), 60);
}
function hideTipNow() {
  if (!tipEl) return;
  clearTimeout(tipHideTimer);
  tipEl.classList.remove("show");
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function snippet(str, max = 90) {
  const s = String(str || "").replace(/\s+/g, " ").trim();
  return s.length > max ? s.slice(0, max) + "…" : s;
}

function normalizeValue(v) {
  if (typeof v === "string") return { output: v, note: "", tags: [] };
  if (v && typeof v === "object") {
    const tagsRaw = Array.isArray(v.tags) ? v.tags : [];
    return {
      output: String(v.output ?? ""),
      note: String(v.note ?? ""),
      tags: tagsRaw.map((t) => String(t))
    };
  }
  return { output: "", note: "", tags: [] };
}
function normalizeMap(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj || {})) {
    if (typeof k !== "string") continue;
    out[k] = normalizeValue(v);
  }
  return out;
}

function loadAll() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(
      { shortcuts: null, seeded: false, library: null, seededLibrary: false },
      (res) => resolve(res)
    );
  });
}
function saveShortcuts(next) {
  return new Promise((resolve) => chrome.storage.sync.set({ shortcuts: next }, resolve));
}
function saveLibrary(next) {
  return new Promise((resolve) => chrome.storage.sync.set({ library: next }, resolve));
}
function markSeeded() {
  return new Promise((resolve) => chrome.storage.sync.set({ seeded: true }, resolve));
}
function markLibrarySeeded() {
  return new Promise((resolve) => chrome.storage.sync.set({ seededLibrary: true }, resolve));
}

function keysSorted(obj) {
  return Object.keys(obj).sort((a, b) => a.localeCompare(b));
}

function showHome() {
  els.homeView.style.display = "block";
  if (els.libraryView) els.libraryView.style.display = "none";
  hideTipNow();
}
function showLibrary() {
  els.homeView.style.display = "none";
  if (els.libraryView) els.libraryView.style.display = "block";
  hideTipNow();
  buildLibraryFilters();
  renderLibrary();
}

function buildLibraryFilters() {
  if (!els.libTags || !els.libSubfilters) return;

  // Tag chips (top row)
  els.libTags.innerHTML = "";
  LIB_TAGS.forEach((tag) => {
    const b = document.createElement("button");
    b.className = "chip" + (libTag === tag ? " active" : "");

    const iconName = TAG_ICONS[tag] || "all";
    const icon = ICONS[iconName] || ICONS.all;

    b.innerHTML = icon ? `${icon}<span>${escapeHtml(tag)}</span>` : `<span>${escapeHtml(tag)}</span>`;
    b.addEventListener("click", () => {
      libTag = tag;
      buildLibraryFilters();
      renderLibrary();
    });
    els.libTags.appendChild(b);
  });

  // Icon subfilters (second row)
  els.libSubfilters.innerHTML = "";
  LIB_SUBFILTERS.forEach((f) => {
    const b = document.createElement("button");
    const active = libSub.has(f.id);
    b.className = "fchip" + (active ? " active" : "");
    b.innerHTML = `${ICONS[f.icon] || ""}<span>${escapeHtml(f.label)}</span>`;
    b.addEventListener("click", () => {
      const willEnable = !libSub.has(f.id);

      // mutual exclusivity
      if (f.id === "in_kb" && willEnable) libSub.delete("not_in_kb");
      if (f.id === "not_in_kb" && willEnable) libSub.delete("in_kb");
      if (f.id === "short" && willEnable) libSub.delete("long");
      if (f.id === "long" && willEnable) libSub.delete("short");

      if (willEnable) libSub.add(f.id);
      else libSub.delete(f.id);

      buildLibraryFilters();
      renderLibrary();
    });
    els.libSubfilters.appendChild(b);
  });
}

function renderHome() {
  const q = (els.search?.value || "").trim().toLowerCase();
  const ks = keysSorted(shortcuts).filter((k) => {
    if (!q) return true;
    const v = shortcuts[k] || { output: "", note: "" };
    return k.toLowerCase().includes(q) || String(v.output).toLowerCase().includes(q) || String(v.note).toLowerCase().includes(q);
  });

  els.list.innerHTML = "";
  if (ks.length === 0) {
    const div = document.createElement("div");
    div.className = "empty";
    div.textContent = q ? "No match." : "No shortcuts yet. Click + to add one.";
    els.list.appendChild(div);
    return;
  }

  ks.forEach((k) => {
    const v = shortcuts[k] || { output: "", note: "" };
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <div class="k">${escapeHtml(k)}</div>
      <div class="v">${escapeHtml(snippet(v.output))}</div>
    `;

    div.addEventListener("click", () => openModal("edit", k, "shortcuts"));

    const note = (v.note || "").trim();
    if (note) {
      div.addEventListener("mouseenter", () => showTip(note, div));
      div.addEventListener("mouseleave", hideTipSoon);
    }

    els.list.appendChild(div);
  });
}

function renderLibrary() {
  if (!els.libGrid) return;
  const q = (els.libSearch?.value || "").trim().toLowerCase();
  const wantTag = libTag;
  const wantInKb = libSub.has("in_kb");
  const wantNotInKb = libSub.has("not_in_kb");
  const wantShort = libSub.has("short");
  const wantLong = libSub.has("long");

  const ks = keysSorted(library).filter((k) => {
    const v = library[k] || { output: "", note: "", tags: [] };

    if (q) {
      const okQ =
        k.toLowerCase().includes(q) ||
        String(v.output).toLowerCase().includes(q) ||
        String(v.note).toLowerCase().includes(q);
      if (!okQ) return false;
    }

    if (wantTag && wantTag !== "All") {
      const tags = Array.isArray(v.tags) ? v.tags : [];
      if (!tags.includes(wantTag)) return false;
    }

    if (wantInKb && !shortcuts[k]) return false;
    if (wantNotInKb && shortcuts[k]) return false;

    const len = String(v.output || "").trim().length;
    if (wantShort && len > 200) return false;
    if (wantLong && len <= 200) return false;

    return true;
  });

  els.libGrid.innerHTML = "";
  if (ks.length === 0) {
    const div = document.createElement("div");
    div.className = "empty";
    div.textContent = q ? "No match." : "No prompts yet.";
    els.libGrid.appendChild(div);
    return;
  }

  ks.forEach((k) => {
    const v = library[k] || { output: "", note: "", tags: [] };
    const card = document.createElement("div");
    card.className = "pitem";
    const title = (v.note || "").trim() ? v.note.trim() : k;
    card.innerHTML = `
      <div class="ptitle">${escapeHtml(title)}</div>
      <div class="pnote">${escapeHtml(snippet(v.output, 120))}</div>
    `;
    card.addEventListener("click", () => openModal("edit", k, "library"));
    els.libGrid.appendChild(card);
  });
}

function openModal(mode, key = null, source = "shortcuts") {
  editingKey = mode === "edit" ? key : null;
  editingSource = source;

  const titleBase = source === "library" ? "Prompt" : "Shortcut";
  els.modalTitle.textContent = mode === "edit" ? `Edit ${titleBase.toLowerCase()}` : `Add ${titleBase.toLowerCase()}`;
  els.deleteBtn.style.display = mode === "edit" ? "inline-block" : "none";

  const map = source === "library" ? library : shortcuts;

  if (mode === "edit") {
    const v = map[key] || { output: "", note: "" };
    els.shortcutInput.value = key;
    els.shortcutInput.disabled = false; // allow rename
    els.noteInput.value = v.note || "";
    els.expansionInput.value = v.output || "";
  } else {
    els.shortcutInput.value = "";
    els.shortcutInput.disabled = false;
    els.noteInput.value = "";
    els.expansionInput.value = "";
  }

  els.modalBackdrop.style.display = "flex";
  setTimeout(() => (mode === "edit" ? els.expansionInput.focus() : els.shortcutInput.focus()), 0);
}

function closeModal() {
  els.modalBackdrop.style.display = "none";
  editingKey = null;
  editingSource = "shortcuts";
  els.shortcutInput.disabled = false;
  hideTipNow();
}

async function upsertShortcut() {
  const key = els.shortcutInput.value.trim();
  if (!key) return;

  const payload = { output: els.expansionInput.value, note: els.noteInput.value };

  // Update the source map (shortcuts or library)
  if (editingSource === "library") {
    const prev = editingKey ? (library[editingKey] || library[key]) : library[key];
    payload.tags = Array.isArray(prev?.tags) ? [...prev.tags] : [];
    const nextLib = { ...library };
    if (editingKey && editingKey !== key) delete nextLib[editingKey];
    nextLib[key] = payload;
    library = nextLib;
    await saveLibrary(nextLib);

    // Make it usable immediately: also add/update in shortcuts
    const next = { ...shortcuts, [key]: payload };
    shortcuts = next;
    await saveShortcuts(next);
    renderHome();
    renderLibrary();
    closeModal();
    return;
  }

  // Normal shortcut save (supports rename)
  const next = { ...shortcuts };
  if (editingKey && editingKey !== key) delete next[editingKey];
  next[key] = payload;

  shortcuts = next;
  await saveShortcuts(next);
  renderHome();
  closeModal();
}

async function deleteShortcut() {
  if (!editingKey) return;

  if (editingSource === "library") {
    const nextLib = { ...library };
    delete nextLib[editingKey];
    library = nextLib;
    await saveLibrary(nextLib);
    renderLibrary();
    closeModal();
    return;
  }

  const next = { ...shortcuts };
  delete next[editingKey];
  shortcuts = next;
  await saveShortcuts(next);
  renderHome();
  closeModal();
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

async function exportShortcuts() {
  downloadJson("magic-kb-shortcuts.json", shortcuts);
}

async function importShortcuts() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";
  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      const cleaned = normalizeMap(parsed);
      shortcuts = cleaned;
      await saveShortcuts(cleaned);
      await markSeeded();
      renderHome();
    } catch {}
  };
  input.click();
}

async function init() {
  const loaded = await loadAll();

  const rawShort = loaded.shortcuts && typeof loaded.shortcuts === "object" ? loaded.shortcuts : {};
  const normalizedShort = normalizeMap(rawShort);

  if (!loaded.seeded && Object.keys(normalizedShort).length === 0) {
    shortcuts = { ...DEFAULTS };
    await saveShortcuts(shortcuts);
    await markSeeded();
  } else {
    shortcuts = normalizedShort;
    const hadString = Object.values(rawShort).some((v) => typeof v === "string");
    if (hadString) await saveShortcuts(shortcuts);
    if (!loaded.seeded) await markSeeded();
  }

  const rawLib = loaded.library && typeof loaded.library === "object" ? loaded.library : {};
  const normalizedLib = normalizeMap(rawLib);
  if (!loaded.seededLibrary && Object.keys(normalizedLib).length === 0) {
    library = { ...LIB_DEFAULTS };
    await saveLibrary(library);
    await markLibrarySeeded();
  } else {
    library = normalizedLib;
    const hadString = Object.values(rawLib).some((v) => typeof v === "string");
    if (hadString) await saveLibrary(library);
    if (!loaded.seededLibrary) await markLibrarySeeded();
  }

  renderHome();

  els.search?.addEventListener("input", renderHome);
  els.addBtn?.addEventListener("click", () => openModal("add", null, "shortcuts"));

  els.cancelBtn?.addEventListener("click", closeModal);
  els.modalClose?.addEventListener("click", closeModal);
  els.modalBackdrop?.addEventListener("click", (e) => {
    if (e.target === els.modalBackdrop) closeModal();
  });

  els.saveBtn?.addEventListener("click", upsertShortcut);
  els.deleteBtn?.addEventListener("click", deleteShortcut);

  // CTA bindings
  els.openOptions?.addEventListener("click", (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage?.();
  });

  const openLibrary = els.openLibrary || els.libraryBtn;
  openLibrary?.addEventListener("click", (e) => {
    e.preventDefault();
    showLibrary();
  });

  els.libBack?.addEventListener("click", (e) => {
    e.preventDefault();
    showHome();
  });

  els.libSearch?.addEventListener("input", renderLibrary);

  els.exportBtn?.addEventListener("click", exportShortcuts);
  els.importBtn?.addEventListener("click", importShortcuts);

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;

    if (changes.shortcuts) {
      shortcuts = normalizeMap(changes.shortcuts.newValue || {});
      renderHome();
    }
    if (changes.library) {
      library = normalizeMap(changes.library.newValue || {});
      renderLibrary();
    }
  });

  window.addEventListener("scroll", hideTipNow, true);
  window.addEventListener("blur", hideTipNow);
}

init();
