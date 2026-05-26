export interface Profile {
  name: string;
  shortName: string;
  role: string;
  location: string;
  tagline: string;
  intro: string;
  email: string;
  phone: string;
  phoneHref: string;
  linkedin: string;
  linkedinLabel: string;
  linkedinRecommendations: string;
  github: string;
  githubLabel: string;
  resume: string;
  domain: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface About {
  heading: string;
  paragraphs: string[];
  highlights: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  note?: string;
  logo?: string;
  website?: string;
  points: string[];
}

export interface SkillGroup {
  title: string;
  icon: string;
  items: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  desc: string;
  image?: string;
  url?: string;
}

export interface Testimonial {
  featured?: boolean;
  name: string;
  initials: string;
  image: string | null;
  title: string;
  relation: string;
  quote: string;
}

export interface AIHighlight {
  icon: string;
  title: string;
  desc: string;
}

export interface AI {
  heading: string;
  intro: string;
  highlights: AIHighlight[];
  tools: string[];
}

export interface NavLink {
  id: string;
  label: string;
}

export const profile: Profile = {
  name: 'Muhammad Anas',
  shortName: 'Muhammad Anas',
  role: 'Engineering Manager',
  location: 'Karachi, Pakistan',
  tagline:
    'Engineering Manager with 10+ years leading multi-team organizations and shipping scalable, cloud-native platforms.',
  intro:
    'I lead engineering teams that turn ambitious product bets into reliable, production-grade systems — owning delivery, architecture, and the people who make it happen.',
  email: 'anas_abdani@hotmail.com',
  phone: '+92 312-8411494',
  phoneHref: '+923128411494',
  linkedin: 'https://www.linkedin.com/in/anas-abdani',
  linkedinLabel: 'linkedin.com/in/anas-abdani',
  linkedinRecommendations:
    'https://www.linkedin.com/in/anas-abdani/details/recommendations/',
  github: 'https://github.com/Anas786',
  githubLabel: 'github.com/Anas786',
  resume: '/Anas-Abdani-Resume.pdf',
  domain: 'anasabdani.dev',
};

export const stats: Stat[] = [
  { value: 10, suffix: '+', label: 'Years in engineering' },
  { value: 30, suffix: '+', label: 'Engineers mentored' },
  { value: 99, suffix: '%', label: 'Platform uptime' },
  { value: 50, suffix: '%', label: 'Faster delivery' },
];

export const about: About = {
  heading: 'Leading with delivery, architecture & people in balance',
  paragraphs: [
    'Over the last decade I’ve grown from a hands-on engineer into an Engineering Manager who owns the full delivery lifecycle — from sprint planning and backlog prioritization to architectural direction and production reliability.',
    'I currently lead three Agile teams at Flipdish, reporting directly to C-level leadership and aligning engineering execution with business priorities. I care deeply about observability, incident response, and building systems that stay reliable as they scale.',
    'My toolkit spans Node.js, TypeScript, React & React Native, serverless and microservices on AWS, and modern CI/CD — but my real focus is creating the conditions where teams ship confidently and grow.',
  ],
  highlights: [
    'End-to-end delivery ownership',
    'Cloud-native & serverless architecture',
    'Incident management & reliability',
    'Stakeholder & C-level alignment',
    'Mentoring & team growth',
    'AI-assisted engineering workflows',
  ],
};

export const experience: ExperienceItem[] = [
  {
    company: 'Flipdish',
    role: 'Engineering Manager',
    period: 'Apr 2025 — Present',
    current: true,
    logo: '/logos/flipdish.png',
    website: 'https://www.flipdish.com',
    points: [
      'Improved customer onboarding efficiency by ~40% with AI-assisted onboarding and menu-creation workflows, reducing manual effort and early-stage client churn.',
      'Lead 3 Agile teams delivering multiple concurrent product initiatives.',
      'Own end-to-end delivery: sprint planning, backlog prioritization, and release execution.',
      'Report directly to C-level leadership, aligning engineering with business priorities.',
      'Drive architectural decisions for scalability, reliability, security, and performance.',
      'Act as Incident Manager, leading production incidents and post-incident reviews.',
    ],
  },
  {
    company: 'Gridware',
    role: 'Engineering Manager',
    period: 'Feb 2023 — Mar 2025',
    note: 'via Remotebase',
    logo: '/logos/gridware.png',
    website: 'https://www.gridware.io',
    points: [
      'Reduced production incidents by ~50% by introducing observability practices across core platforms.',
      'Managed and delivered cloud-native and mobile-first platforms.',
      'Designed serverless solutions on AWS using microservices and SOA (NestJS).',
      'Streamlined delivery with GraphQL, AWS Amplify, and CI/CD pipelines.',
      'Worked directly with C-level stakeholders and external customers on roadmap alignment.',
      'Owned incident management and production stability across critical systems.',
    ],
  },
  {
    company: 'Northwestern Mutual',
    role: 'Technical Project Manager',
    period: 'Jan 2022 — Feb 2023',
    note: 'via Remotebase',
    logo: '/logos/northwestern.svg',
    website: 'https://www.northwesternmutual.com',
    points: [
      'Increased delivery throughput by up to 50% by implementing Agile and Scrum best practices.',
      'Led cross-functional teams across frontend, backend, and DevOps workstreams.',
      'Delivered scalable applications using React Native and FastAPI.',
      'Designed and managed AWS-based CI/CD and deployment pipelines.',
      'Reported delivery status, risks, and milestones directly to senior leadership.',
    ],
  },
  {
    company: 'Capbase',
    role: 'Technical Team Lead',
    period: 'Aug 2021 — Dec 2022',
    note: 'via Remotebase',
    logo: '/logos/capbase.png',
    website: 'https://capbase.com',
    points: [
      'Architected serverless systems using AWS Lambda and a microservices-based design.',
      'Built and maintained backend services using GraphQL and AWS Amplify.',
      'Ensured code quality through unit testing, reviews, and delivery standards.',
      'Supported onboarding, mentoring, and technical growth of team members.',
    ],
  },
  {
    company: 'Techlogix',
    role: 'Senior Software Engineer',
    period: 'Oct 2017 — Jul 2021',
    logo: '/logos/techlogix.png',
    website: 'https://www.techlogix.com',
    points: [
      'Developed serverless applications using Azure Functions and microservices-based APIs.',
      'Built frontend applications using Angular and AngularJS with cross-browser support.',
      'Delivered cloud-based backend systems for Nokia Pakistan & Middle East.',
      'Resolved security issues identified through penetration testing and audits.',
      'Conducted unit and field testing, fixing performance issues and memory leaks.',
    ],
  },
  {
    company: 'KNYSYS',
    role: 'Software Engineer',
    period: 'Apr 2016 — Sep 2017',
    logo: '/logos/knysys.png',
    website: 'https://www.knysys.com',
    points: [
      'Worked in a dual role across Android and backend development.',
      'Delivered end-to-end features across the full software lifecycle.',
      'Collaborated with cross-functional teams on multiple client projects.',
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Leadership & Delivery',
    icon: 'leadership',
    items: [
      'Engineering Management',
      'Agile / Scrum',
      'Roadmapping',
      'Stakeholder Alignment',
      'Mentoring & Coaching',
      'Hiring & Interviewing',
      'Incident Command',
    ],
  },
  {
    title: 'Architecture',
    icon: 'architecture',
    items: [
      'Microservices',
      'Event-Driven',
      'Serverless',
      'Domain-Driven Design',
      'SOLID',
      'Design Patterns',
      'Monorepos',
    ],
  },
  {
    title: 'Languages',
    icon: 'languages',
    items: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'SQL', 'Bash'],
  },
  {
    title: 'Frontend',
    icon: 'frontend',
    items: ['React.js', 'Next.js', 'React Native', 'Redux Toolkit', 'Tailwind CSS', 'Vite'],
  },
  {
    title: 'Backend & APIs',
    icon: 'backend',
    items: ['Node.js', 'NestJS', 'Express.js', 'GraphQL', 'REST', 'WebSockets', 'gRPC'],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'cloud',
    items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'GitHub Actions', 'Nginx'],
  },
  {
    title: 'Data & Storage',
    icon: 'database',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'DynamoDB', 'MySQL', 'Prisma'],
  },
  {
    title: 'Observability & Reliability',
    icon: 'observability',
    items: ['Datadog', 'Grafana', 'Prometheus', 'Sentry', 'CloudWatch', 'SLOs / SLAs', 'On-call'],
  },
  {
    title: 'AI & Productivity',
    icon: 'ai',
    items: ['GitHub Copilot', 'Claude', 'ChatGPT', 'LLM Integration', 'Prompt Engineering'],
  },
];

export const certifications: Certification[] = [
  {
    title: 'Project Management Professional (PMP)®',
    issuer: 'PMI',
    desc: 'Advanced capability in leading complex projects — scope, timelines, risk, stakeholders, and delivery execution.',
    image: '/badges/pmp.png',
    url: 'https://www.credly.com/badges/966ad4b3-bc0b-458d-a980-8bc7c3f08a87',
  },
  {
    title: 'PMI Agile Certified Practitioner (PMI-ACP)®',
    issuer: 'PMI',
    desc: 'Hands-on expertise in Agile methodologies including Scrum, Kanban, Lean, and adaptive delivery.',
    image: '/badges/pmi-acp.png',
    url: 'https://www.credly.com/badges/8bcddfeb-1c13-4ce0-9b55-d9c894d68264',
  },
  {
    title: 'Value Stream Management',
    issuer: 'PMI',
    desc: 'Optimizing the end-to-end flow of value — reducing waste and improving delivery efficiency.',
    image: '/badges/value-stream.png',
    url: 'https://www.credly.com/badges/c7661d42-96a1-4e8a-a626-7b52bb417ec0',
  },
  {
    title: 'Generative AI Overview for Project Managers',
    issuer: 'PMI',
    desc: 'Practical application of Generative AI in planning, delivery optimization, and risk management.',
    image: '/badges/genai-overview.png',
    url: 'https://www.credly.com/badges/3b2868f8-30dd-42f2-8c23-72d69a2a68bd',
  },
  {
    title: 'Data Landscape of GenAI for Project Managers',
    issuer: 'PMI',
    desc: 'Data requirements, governance, and lifecycle considerations when applying GenAI.',
    image: '/badges/genai-data.png',
    url: 'https://www.credly.com/badges/7a9c604f-7de2-4254-9711-3511d9f57748',
  },
  {
    title: 'PMI Citizen Developer™ Practitioner',
    issuer: 'PMI',
    desc: 'Building solutions on low-code / no-code platforms following citizen-developer best practices.',
    image: '/badges/pmi-citizen-practitioner.png',
    url: 'https://www.credly.com/badges/1ab76cd6-f57c-4636-a3bb-2b3199a732b4',
  },
  {
    title: 'PMI Citizen Developer™ Business Architect',
    issuer: 'PMI',
    desc: 'Architecting low-code / no-code solutions and aligning them to business needs.',
    image: '/badges/pmi-citizen-architect.png',
    url: 'https://www.credly.com/badges/9bd1babc-2c6a-4cff-91b8-e503726d19f9',
  },
  {
    title: 'IBM Blockchain Essentials',
    issuer: 'IBM',
    desc: 'Foundational understanding of blockchain concepts, architectures, and enterprise use cases.',
    image: '/badges/ibm-blockchain.png',
    url: 'https://www.credly.com/badges/56602a83-3c04-44dd-83f0-dd98d097016a',
  },
];

// To show a real photo for any recommender, save it under public/recommenders/
// and set `image` to its path. Falls back to the initials avatar otherwise.
export const testimonials: Testimonial[] = [
  {
    featured: true,
    name: 'Qasim Salam',
    initials: 'QS',
    image: null,
    title: 'Co-Founder, Ember AI · CEO, Remotebase',
    relation: 'Managed Anas directly · 2026',
    quote:
      'Anas is one of the most incredible engineers I’ve worked with, and someone I deeply trust on both technical and organizational matters. His engineering skills are exceptional, he has strong judgment, writes clean and scalable code, and consistently thinks a few steps ahead when it comes to architecture and long-term impact.\n\nWhat truly sets Anas apart, though, is that he goes far beyond his individual responsibilities. He genuinely cares about the people around him and actively works to build a strong, healthy culture within the organization. He mentors others, raises the bar for quality, and creates an environment where teams feel motivated, aligned, and proud of what they’re building.\n\nAnas combines technical excellence with leadership, ownership, and integrity — a rare combination that makes him invaluable to any team. Any organization would be lucky to have him.',
  },
  {
    name: 'A Bin Omar',
    initials: 'AO',
    image: null,
    title: 'Co-founder & CPO at Gridware',
    relation: 'Managed Anas directly · 2026',
    quote:
      'Anas is the definition of going above and beyond as a software leader. His strong product intuition and leadership skills set him apart. He is the perfect engineering partner to have to build a complicated and reliable product.',
  },
  {
    name: 'Hall Chen',
    initials: 'HC',
    image: null,
    title: 'Building the grid of the future',
    relation: 'Managed Anas directly · 2025',
    quote:
      'I had the pleasure of working with Anas over the better part of a year on the development of an in-house mobile application for our vertically integrated operations. Anas’ leadership and commitment to getting the job done was a force that always moved the needle for us.',
  },
  {
    name: 'Muhammad Bilal',
    initials: 'MB',
    image: null,
    title: 'Fractional CTO for AI & SaaS Startups · CISSP, PMP®',
    relation: 'Worked with Anas at KNYSYS · 2018',
    quote:
      'Had the opportunity to work with Anas at KNYSYS and found him a perfect candidate for any fast-paced organization, as he always finds the fastest way to deliver under pressure. He is a quick learner, a fast programmer and a coding enthusiast. Apart from his professional excellence, he is a very kind-hearted person, who is always willing to help others even if he has to go an extra mile for that. I strongly recommend him for any agile-based environment.',
  },
  {
    name: 'Shayan Saghir',
    initials: 'SS',
    image: null,
    title: 'Principal Software Engineer @ 10Pearls',
    relation: 'Worked with Anas · 2017',
    quote:
      'One of the best software development all-rounders I’ve ever worked with. Ask him to work on any tech on earth and he wouldn’t say no. Apart from technical expertise — especially mobile development — he is also very good at time management, and knows how to balance his full-time studies despite being a regular at the workplace.',
  },
  {
    name: 'Muhammad Aamir',
    initials: 'MA',
    image: null,
    title: 'Engineering Manager · PMP®',
    relation: 'Worked with Anas · 2017',
    quote:
      'I found Muhammad Anas an efficient team player. He possessed good skills in web development and mobile application development. I wish Muhammad Anas a great professional career ahead.',
  },
  {
    name: 'Sharjeel Ali Shaukat',
    initials: 'SA',
    image: null,
    title: 'Engineering Manager · AI Engineer',
    relation: 'Worked with Anas · 2017',
    quote:
      'Always ready to learn. Worked with him on Python technology — he gives 100% on every task assigned to him and has delivered many research-based Python projects.',
  },
];

export const ai: AI = {
  heading: 'Engineering leadership in the age of AI',
  intro:
    'I weave AI into how teams build and ship — from AI-assisted onboarding that cut manual effort by ~40%, to embedding LLM tools across the everyday engineering workflow.',
  highlights: [
    {
      icon: 'sparkles',
      title: 'AI-assisted delivery',
      desc: 'Led AI-assisted onboarding and menu-creation workflows at Flipdish — ~40% more efficient onboarding and lower early-stage client churn.',
    },
    {
      icon: 'food',
      title: 'Lugmety — Food Recommendation AI',
      desc: 'Shipped Lugmety’s food recommendation engine — surfacing personalized dish and menu suggestions from order history and taste signals to grow basket size and repeat orders.',
    },
    {
      icon: 'delivery',
      title: 'Salasa — Delivery Estimation AI',
      desc: 'Built Salasa’s delivery-time estimation model — predicting accurate ETAs from routes, load, and historical patterns to sharpen fulfillment planning and customer trust.',
    },
    {
      icon: 'code',
      title: 'AI-augmented engineering',
      desc: 'Embed GitHub Copilot, Claude, and ChatGPT across the SDLC for faster prototyping, sharper code reviews, and quicker bug resolution.',
    },
    {
      icon: 'award',
      title: 'GenAI, formally certified',
      desc: 'Certified in Generative AI for Project Managers — applying GenAI to planning, decision-making, risk, and data governance.',
    },
    {
      icon: 'layers',
      title: 'LLM-enabled products',
      desc: 'Guide teams to integrate LLMs into products with sound prompt design, evaluation, and reliability practices.',
    },
  ],
  tools: [
    'Claude',
    'ChatGPT',
    'Gemini',
    'GitHub Copilot',
    'Cursor',
    'Claude Code',
    'LangChain',
    'RAG',
    'AI Agents',
    'MCP',
    'LLM Integration',
    'Prompt Engineering',
  ],
};

export const navLinks: NavLink[] = [
  { id: 'about', label: 'About' },
  { id: 'ai', label: 'AI' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];
