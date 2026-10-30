// `key` jumps to the section from the keyboard; avoid `h` (back to top).
// `heading` overrides `label` for the section title when the nav needs something shorter.
export const CATEGORIES = [
  { id: 'experience', label: 'Experience', key: 'x', blurb: 'Where I’ve worked.' },
  { id: 'projects', label: 'Projects', key: 'p', blurb: 'Things I’ve built at university, on exchange and on my own.' },
  {
    id: 'achievements',
    label: 'Achievements',
    heading: 'Leadership & Achievements',
    key: 'a',
    blurb: 'Communities I help run and competitions I’ve taken part in.',
  },
  { id: 'education', label: 'Education', key: 'd', blurb: 'Where I learned the fundamentals.' },
  { id: 'skills', label: 'Skills', key: 's', blurb: 'What I code in, what I build with and what I speak.' },
  { id: 'contact', label: 'Contact', key: 'c', blurb: 'The fastest way to reach me is email or LinkedIn.' },
];

export function getCategoryByKey(key) {
  const k = key?.toLowerCase();
  return CATEGORIES.find((c) => c.key === k);
}

// Text fields support **double asterisks** to emphasise a metric.
export const ITEMS = [
  {
    id: 'ericsson',
    category: 'experience',
    title: '5G/6G Software Developer @ Ericsson',
    period: 'Sep 2023 – Present',
    place: 'Stockholm, Sweden',
    description:
      'Developed and optimized 5G RAN Layer 2 features and verification flows for Carrier Aggregation, both in Purpose-built and Cloud RAN solutions.',
    highlights: [
      'Owned the Layer 2 implementation of downlink-only cell support, letting operators use additional downlink-only spectrum across **6 frequency bands** as carrier aggregation capacity and data rate boosters.',
      'Removed a scalability limit in CSI reporting by redesigning the bit-packing algorithm, **doubling** the maximum number of aggregated carriers.',
      'Optimized sleep behaviour in the E5 interface for **35% lower RTT**, preventing downlink throughput degradation.',
      'Added **25+** complex RAN interaction scenarios (scheduler timing, multi-cell, multi-UE and inter-platform coordination) across **3** test frameworks.',
    ],
    tech: ['C++', 'C', 'Bash'],
    image: 'img/logo-ericsson.png',
    url: null,
    linkLabel: null,
  },
  {
    id: 'riedia',
    category: 'experience',
    title: 'NLP Intern @ Riedia',
    period: 'May 2023 – Jul 2023',
    place: 'Stockholm, Sweden',
    description:
      'Built a Python-based NLP pipeline with article clustering, sentiment analysis and fact-checking components, aimed at processing **1000+** articles and serving news to **200+** readers in their preferred language.',
    tech: ['Python'],
    image: 'img/logo-riedia.png',
    url: null,
    linkLabel: null,
  },
  {
    id: 'occlusion-reasoning',
    category: 'projects',
    title: 'Occlusion Reasoning for Autonomous Driving',
    highlight: 'Bachelor’s thesis',
    description:
      'Reachability analysis for occlusion reasoning in realistic driving scenarios: a computer vision and probabilistic modeling framework that predicts potentially hidden vehicles, reducing false-positive occluded regions by up to **76%**. Developed during my exchange at KTH.',
    tech: ['Python', 'Computer Vision', 'Probabilistic Modeling'],
    image: 'img/occlusion.jpg',
    url: 'https://www.diva-portal.org/smash/record.jsf?pid=diva2%3A1779805&dswid=7217',
    linkLabel: 'Read thesis',
  },
  {
    id: 'twinbooks',
    category: 'projects',
    title: 'TwinBooks',
    description:
      'Language-learning app combining interactive reading with audio storytelling, so learners absorb a new language in context.',
    tech: ['TypeScript', 'Expo'],
    image: 'img/twinbooks.jpg',
    url: null,
    linkLabel: null,
  },
  {
    id: 'jsbach',
    category: 'projects',
    title: 'JSBach: a Musical Programming Language',
    highlight: 'Top course score',
    description:
      'Compiler for a custom music-oriented programming language, with lexical analysis, parsing and code generation that turn programs into sheet music and audio. Achieved the **maximum attainable course score**.',
    tech: ['Python', 'ANTLR', 'LilyPond', 'Timidity++', 'ffmpeg'],
    image: 'img/bac.png',
    imageBg: 'light',
    url: 'https://github.com/henrycoas/JSBach-PracticaLP',
    linkLabel: 'View project',
  },
  {
    id: 'pic-catcher',
    category: 'projects',
    title: 'PIC Catcher',
    description:
      'Game programmed using Proteus for a PIC18F45K22 and a GLCD.',
    tech: ['C', 'Assembler'],
    image: 'img/pic-catcher.jpg',
    url: 'https://github.com/henrycoas/University/tree/main/PIC%20Catcher%20(Joc%20CI)',
    linkLabel: 'View project',
  },
  {
    id: 'item-recommendator',
    category: 'projects',
    title: 'Item Recommender',
    description:
      "Recommendation system that uses k-NN and k-means algorithms to suggest you items based on yours and other's reviews.",
    tech: ['C++', 'Visual Paradigm', 'HTML', 'CSS'],
    image: 'img/prop.png',
    url: null,
    linkLabel: null,
  },
  {
    id: 'dark-zone',
    category: 'projects',
    title: 'Dark Zone',
    description:
      'The games that got me into programming: Dark Zone, Pong, Quantum Cat and Essence.',
    tech: ['Scratch'],
    image: 'img/darkzone.jpg',
    url: 'https://scratch.mit.edu/users/enricondal/',
    linkLabel: 'View projects',
  },
  {
    id: 'gennext',
    category: 'achievements',
    title: 'GenNext Community Coordinator',
    highlight: 'Leadership',
    place: 'Ericsson',
    period: 'Sep 2025 – Present',
    description:
      'Coordinated monthly networking events for **1200+** early-career employees, building community and supporting onboarding across the organization.',
    tech: [],
    image: 'img/gennext.jpg',
    url: null,
    linkLabel: null,
  },
  {
    id: 'isc22',
    category: 'achievements',
    title: 'Spain Representative — ISC22 Student Cluster Competition',
    highlight: 'Fan Favorite Award',
    place: 'Barcelona Supercomputing Center & ISC High Performance',
    period: 'Nov 2021 – Jun 2022',
    description:
      'Built, configured and benchmarked a RISC-V compute cluster, **representing Spain** in an international HPC competition. Optimized computational chemistry, weather and climate modeling, and fluid dynamics workloads under strict power constraints, and won the **Fan Favorite Award** through community voting.',
    tech: ['Bash', 'Fortran'],
    image: 'img/trophy-isc.jpg',
    url: 'https://www.hpcadvisorycouncil.com/events/2022/student-cluster-competition/',
    linkLabel: 'View webpage',
  },
  {
    id: 'ai-purge',
    category: 'achievements',
    title: 'Silver Medal — Data Structures and Algorithms Competition',
    highlight: '2nd of 316',
    place: 'Polytechnic University of Catalonia',
    period: 'Dec 2020',
    description:
      'Placed **2nd out of 316** Computer Science and Mathematics students by developing a C++ AI agent for a turn-based adversarial game, using real-time board-state evaluation and strategic decision-making to compete against other student-developed agents.',
    tech: ['C++', 'HTML'],
    image: 'img/logo-purge.png',
    url: 'https://github.com/henrycoas/University/tree/main/The%20Purge%20(Joc%20EDA)',
    linkLabel: 'View project',
  },
  {
    id: 'mckinsey',
    category: 'achievements',
    title: 'McKinsey Forecasting',
    highlight: 'HackUPC 2022',
    description:
      "With the aim of helping to solve a problem a McKinsey & Company's client has proposed them, we developed during a hackathon a model for sales forecasting using Machine Learning and Neural Networks techniques.",
    tech: ['Python', 'TensorFlow', 'Jupyter Notebook'],
    image: 'img/mckinsey.jpg',
    url: 'https://github.com/PereCP/HackUPC-2022',
    linkLabel: 'View project',
  },
  {
    id: 'first-person-donor',
    category: 'achievements',
    title: 'First Person Donor',
    highlight: 'Short film',
    description:
      "Presented, directed and edited the shortfilm 'First Person Donor', a tale of life and death to promote organ donation. Done with my friends for the II Shortfilm Contest organized by the Jaume Arnó Foundation.",
    tech: ['Adobe Premiere Pro'],
    image: 'img/donor.jpg',
    url: 'https://www.youtube.com/watch?v=KUddHmhdhlA',
    linkLabel: 'View shortfilm',
  },
  {
    id: 'kth',
    category: 'education',
    title: 'Computer Science — Exchange @ KTH',
    place: 'Kungliga Tekniska Högskolan, Stockholm',
    period: 'Aug 2022 – Jun 2023',
    description:
      'Relevant coursework: Machine Learning, Computer Vision, Artificial Neural Networks and Game Theory.',
    tech: [],
    image: 'img/kth.jpg',
    url: null,
    linkLabel: null,
  },
  {
    id: 'upc',
    category: 'education',
    title: 'Informatics Engineering (BSc) @ UPC',
    place: 'Polytechnic University of Catalonia, Barcelona',
    period: 'Sep 2019 – Jan 2024',
    description: 'Specialization in Computing and Algorithms.',
    tech: [],
    image: 'img/upc.jpg',
    url: null,
    linkLabel: null,
  },
  {
    id: 'linkedin',
    category: 'contact',
    title: 'LinkedIn',
    description: 'Connect with me and see more of my experience on LinkedIn.',
    tech: [],
    image: 'img/logo-linkedin.png',
    url: 'https://www.linkedin.com/in/enric-condal/',
    linkLabel: 'View LinkedIn',
  },
  {
    id: 'github',
    category: 'contact',
    title: 'GitHub',
    description: 'Browse my code and open-source projects on GitHub.',
    tech: [],
    image: 'img/github.jpg',
    url: 'https://github.com/henrycoas',
    linkLabel: 'View GitHub',
  },
  {
    id: 'email',
    category: 'contact',
    title: 'Email',
    description: 'Reach me directly by email.',
    tech: [],
    image: 'img/email.jpg',
    url: 'mailto:enricondal@gmail.com',
    linkLabel: 'Send email',
  },
];

// `core` groups are the primary stack and get the accent treatment.
export const SKILLS = {
  groups: [
    { label: 'Core', items: ['C++', 'Python', 'C', 'Bash'], core: true },
    { label: 'Experienced', items: ['TypeScript', 'Java', 'R', 'Kotlin'] },
    { label: 'Systems & development', items: ['Linux', 'Git', 'Gerrit', 'Docker', 'Jenkins', 'Bazel', 'ANTLR', 'Expo'] },
    { label: 'AI / ML', items: ['PyTorch', 'TensorFlow', 'Agentic orchestration'] },
  ],
  languages: [
    { name: 'Catalan', level: 'Native' },
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'C1' },
    { name: 'Swedish', level: 'B2' },
    { name: 'French', level: 'B1' },
    { name: 'German', level: 'A1' },
  ],
  interests: ['Creative writing', 'Running', 'Swimming', 'Table tennis'],
};

export function getItemsByCategory(categoryId) {
  return ITEMS.filter((item) => item.category === categoryId);
}
