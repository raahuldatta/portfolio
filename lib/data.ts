export const profile = {
  name: "Raahul Datta Nidumoru",
  shortName: "Raahul Datta",
  role: "Backend, Cloud & GenAI Engineer",
  headline: "I build systems that don't just answer — they justify.",
  summary:
    "Final-year Computer Science Engineering student building production software across backend engineering, cloud infrastructure, and applied AI. FastAPI services, RAG pipelines, and agentic systems get tested, guarded, and monitored like any other infrastructure — not trusted as black boxes.",
  location: "Hyderabad, India",
  school: "KL University",
  gpa: "8.21/10",
  gradYear: "2027",
  email: "raahuldatta@gmail.com",
  resumeUrl: "/resume.pdf",
  github: "https://github.com/raahuldatta",
  linkedin: "https://linkedin.com/in/raahuldatta",
  leetcode: "https://leetcode.com/raahuldatta",
  codechef: "https://www.codechef.com/users/raahuldatta",
} as const;

export type Project = {
  name: string;
  tagline: string;
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
  domain: "AI Systems" | "Applied ML" | "Full-Stack";
  repo: string;
};

export const projects: Project[] = [
  {
    name: "Ember",
    tagline: "AI investigation workspace for on-call engineers",
    problem:
      "Production incidents start with an engineer manually piecing together alerts, logs, traces, and recent deploys before they can even begin diagnosing root cause.",
    approach:
      "A multi-agent LangGraph pipeline aggregates incidents, analyzes logs and traces via OpenTelemetry, checks recent deployments, and searches historical incidents to draft an evidence-backed root-cause hypothesis.",
    outcome:
      "Every hypothesis ships with its supporting evidence, and the system never executes a remediation step without human approval.",
    stack: ["Python", "FastAPI", "LangGraph", "PostgreSQL", "OpenTelemetry"],
    domain: "AI Systems",
    repo: "https://github.com/raahuldatta/Ember",
  },
  {
    name: "SynapseLab",
    tagline: "Startup validation platform",
    problem:
      "Early-stage founders validate ideas on instinct, without market intelligence or a structured view of the competitive landscape.",
    approach:
      "A full-stack RAG pipeline turns a raw idea into market intelligence, competitor benchmarking, and strategic recommendations.",
    outcome:
      "Produces an actionable execution roadmap grounded in retrieved evidence rather than a generic pitch deck.",
    stack: ["Next.js", "Node.js", "RAG pipelines"],
    domain: "AI Systems",
    repo: "https://github.com/raahuldatta/SynapseLab-updated",
  },
  {
    name: "Lumora",
    tagline: "Autonomous AI trading platform",
    problem:
      "Retail traders act on news and sentiment shifts faster than they can research them.",
    approach:
      "Lumora.ai monitors real-time market sentiment through Google Gemini, interpreting news and trend signals into actionable insight.",
    outcome:
      "Autonomously manages a mock portfolio — simulating buy, sell, and hold decisions — so users can observe an AI-driven strategy without risking real capital.",
    stack: ["Google Gemini API", "Next.js", "Real-time APIs"],
    domain: "AI Systems",
    repo: "https://github.com/raahuldatta/Lumora",
  },
  {
    name: "PulseAPI",
    tagline: "Sentiment classification API",
    problem:
      "Teams need sentiment scoring they can drop into a pipeline without standing up their own model-serving infrastructure.",
    approach:
      "A Hugging Face RoBERTa model served through FastAPI, with API-key auth and LRU caching in front of it.",
    outcome:
      "Classifies text as positive, negative, or neutral with a confidence score, and logs every request for traceability.",
    stack: ["FastAPI", "Hugging Face", "RoBERTa"],
    domain: "AI Systems",
    repo: "https://github.com/raahuldatta/PulseAPI",
  },
  {
    name: "DNA Sequencing",
    tagline: "Computational biology & deep learning",
    problem:
      "Classifying DNA sequences by species usually means picking one modeling approach and living with its limits.",
    approach:
      "Compares classical ML and deep learning approaches — scikit-learn classifiers, a 1D CNN, and a transformer — on human, chimpanzee, and dog genomes.",
    outcome:
      "A side-by-side view of how each approach performs on the same multi-species classification task.",
    stack: ["Python", "scikit-learn", "PyTorch"],
    domain: "Applied ML",
    repo: "https://github.com/raahuldatta/DNA-Sequencing-using-Machine-Learning-and-Deep-Learning-Algorithms",
  },
  {
    name: "Watchify",
    tagline: "AI-powered movie discovery",
    problem:
      "Browsing a catalog of thousands of titles by genre alone rarely surfaces what someone actually wants to watch.",
    approach:
      "A Next.js app pulling live data from TMDb and IMDb, combining genre, language, and metadata filtering with similarity-based recommendation logic.",
    outcome:
      "Personalized, content-based discovery instead of a static trending list.",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "shadcn/ui",
    ],
    domain: "Full-Stack",
    repo: "https://github.com/raahuldatta/Watchify",
  },
  {
    name: "MedVault AI",
    tagline: "Family health records, mobile",
    problem:
      "Family health records live scattered across paper, PDFs, and memory, especially across generations.",
    approach:
      "A React Native (Expo) app for tracking vitals, vaccination history, and family member records in one place, with Clerk auth and Google SSO.",
    outcome:
      "Centralizes family health data on-device, with ntfy notifications for anything that needs attention.",
    stack: ["React Native", "Expo", "Clerk Auth", "TypeScript"],
    domain: "Full-Stack",
    repo: "https://github.com/raahuldatta/medvault-mobile",
  },
  {
    name: "WotNot",
    tagline: "WhatsApp Business API platform",
    problem:
      "Running WhatsApp Business messaging at scale needs contact management, broadcast campaigns, and CRM sync working together, not as separate tools.",
    approach:
      "FastAPI microservices behind OAuth 2.0, paired with a Vue.js frontend, handling messaging, contacts, broadcast campaigns, and WooCommerce sync.",
    outcome:
      "A decoupled service architecture where each piece scales independently.",
    stack: ["FastAPI", "Vue.js", "OAuth 2.0", "PostgreSQL", "Clerk"],
    domain: "Full-Stack",
    repo: "https://github.com/raahuldatta/WotNot_whatsApp",
  },
];

export const domainOrder: Project["domain"][] = [
  "AI Systems",
  "Applied ML",
  "Full-Stack",
];

export type BuildingProject = {
  name: string;
  description: string;
  note?: string;
};

export const buildingNow: BuildingProject[] = [
  {
    name: "Vaultmind",
    description:
      "An on-device RAG assistant that indexes a developer's own codebase and answers questions through an NPU-accelerated small language model — no data ever leaves the machine.",
    note: "Built for the Snapdragon AI Lab Build & Present Challenge (Qualcomm, via Unstop).",
  },
  {
    name: "Verdikt",
    description:
      "Routes a query to multiple LLMs in parallel and arbitrates between their outputs to reduce single-model failure risk.",
  },
  {
    name: "Quardian",
    description:
      "A secure text-to-SQL desktop app with hallucination detection, schema validation, and role-based access control.",
  },
];

export type StackGroup = {
  label: string;
  items: string[];
};

export const stack: StackGroup[] = [
  { label: "Languages", items: ["Python", "JavaScript", "TypeScript", "Java", "C"] },
  { label: "Frontend", items: ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS"] },
  {
    label: "Backend & data",
    items: ["FastAPI", "Node.js", "Express", "PostgreSQL", "MongoDB"],
  },
  {
    label: "Cloud & tooling",
    items: ["AWS", "Azure", "Docker", "GitHub Actions", "Git", "Linux", "Postman"],
  },
];

export const focusAreas: string[] = [
  "Retrieval-augmented generation",
  "LLM integration & orchestration",
  "Agentic, tool-calling systems",
  "Multi-model arbitration",
  "AI guardrails & safety",
  "On-device / edge inference",
  "Observability for AI systems",
];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  location?: string;
  points: string[];
  tags: string[];
  upcoming?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    role: "DevOps Intern",
    org: "Origins India",
    period: "Starting soon",
    points: [
      "Incoming internship focused on CI/CD pipelines, infrastructure automation, and deployment tooling.",
    ],
    tags: ["DevOps", "CI/CD", "Infrastructure"],
    upcoming: true,
  },
  {
    role: "Full Stack Developer Intern",
    org: "Redgates IT Solution",
    period: "Jun 2026 – Aug 2026",
    points: [
      "Built and iterated on a full-stack salon service application over a three-month internship.",
      "Worked directly with the Managing Director on feature scope and product decisions.",
      "Owned work across the stack, from data model to UI.",
    ],
    tags: ["FastAPI", "Full-Stack Development", "Product Iteration"],
  },
  {
    role: "Full Stack Developer Intern",
    org: "AD-X LIVE Private Limited",
    period: "Jan 2026 – Apr 2026",
    location: "Gachibowli, Hyderabad (hybrid)",
    points: [
      "Delivered full-stack features in a hybrid work environment.",
      "Worked within an established engineering codebase and review workflow.",
    ],
    tags: ["Full-Stack Development", "Hybrid Engineering"],
  },
];

export const achievements: { label: string; detail: string }[] = [
  {
    label: "Snapdragon AI Lab Build & Present Challenge",
    detail: "Building Vaultmind, an on-device RAG assistant (Qualcomm, via Unstop).",
  },
  {
    label: "AWS Certified Cloud Practitioner",
    detail: "Certified in core AWS cloud concepts and services.",
  },
  {
    label: "CGPA 8.21/10",
    detail: "Final-year CSE, KL University, Hyderabad — graduating 2027.",
  },
];

export type Stat = { value: number; label: string };

export const heroStats: Stat[] = [
  { value: projects.length, label: "Shipped projects, public" },
  { value: domainOrder.length, label: "Engineering domains" },
  {
    value: experience.filter((item) => !item.upcoming).length,
    label: "Internships completed",
  },
];
