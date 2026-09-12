export const CATEGORIES = [
  { id: 'work', label: 'Work', key: 'w', css: 'work', cardClass: 'work-card' },
  { id: 'projects', label: 'Projects', key: 'p', css: 'projects', cardClass: 'project-card' },
  { id: 'competitions', label: 'Competitions', key: 'c', css: 'competitions', cardClass: 'competitions-card' },
  { id: 'more', label: 'More', key: 'm', css: 'more', cardClass: 'linkedin-card' },
];

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id);

export function getCategoryByKey(key) {
  const k = key?.toLowerCase();
  return CATEGORIES.find((c) => c.key === k);
}

export const ITEMS = [
  {
    id: 'ericsson',
    category: 'work',
    title: '5G/6G Software Developer @ Ericsson',
    description:
      'Layer 2 development for 5G/6G radio access networks (Stockholm, Sep 2023 – present). Owned downlink-only cell support across 6 frequency bands, redesigned the CSI reporting bit-packing algorithm to double the number of aggregated carriers, and optimized E5 interface sleep behaviour for 35% lower RTT. Added 25+ complex RAN interaction test scenarios across 3 frameworks, and prototyped a domain-aware research agent using skills and MCP integration.',
    tech: ['C++', 'C', 'Shell'],
    image: 'img/logo-ericsson.png',
    url: null,
    linkLabel: null,
  },
  {
    id: 'riedia',
    category: 'work',
    title: 'NLP Intern @ Riedia',
    description:
      'Built a Python-based NLP pipeline with article clustering, sentiment analysis, and fact-checking components (Stockholm, May – Jul 2023). Designed to process 1000+ articles and serve news to 200+ readers in their preferred language.',
    tech: ['Python'],
    image: 'img/logo-riedia.png',
    url: null,
    linkLabel: null,
  },
  {
    id: 'occlusion-reasoning',
    category: 'projects',
    title: 'Occlusion Reasoning for Autonomous Driving',
    description:
      'Computer vision and probabilistic modeling framework that reasons about occluded areas and predicts potentially hidden vehicles in realistic traffic scenarios, reducing false-positive occluded regions by up to 76%. Developed during my exchange at KTH.',
    tech: ['Python', 'Computer Vision', 'Probabilistic Modeling'],
    image: 'img/white.jpg',
    url: null,
    linkLabel: null,
  },
  {
    id: 'twinbooks',
    category: 'projects',
    title: 'TwinBooks',
    description:
      'Language-learning app that combines interactive reading with audio storytelling, pairing text with narration to help learners absorb a new language in context.',
    tech: ['TypeScript', 'Expo'],
    image: 'img/white.jpg',
    url: null,
    linkLabel: null,
  },
  {
    id: 'jsbach',
    category: 'projects',
    title: "JSBach's double interpreter",
    description:
      'Double interpreter for a custom musical programming language called JSBach. The output of this interpreter is a sheet music and some sound files that will reproduce the melody described by the composer/the code written by the programmer.',
    tech: ['Python3', 'ANTLR4', 'Lilipond', 'Timidity++', 'ffmpeg'],
    image: 'img/bac.png',
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
    title: 'Item Recommendator',
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
    id: 'projects-soon',
    category: 'projects',
    title: 'Soon...',
    description: 'Soon...',
    tech: [],
    image: 'img/white.jpg',
    url: null,
    linkLabel: null,
    placeholder: true,
  },
  {
    id: 'isc22',
    category: 'competitions',
    title: 'ISC22 Student Cluster Competition',
    description:
      'Member of the NotOnlyFLOPs team, representing Spain as Universitat Politècnica de Catalunya with a RISC-V based cluster and winner of the Fan Favorite Award.',
    tech: ['Shell', 'Fortran'],
    image: 'img/trophy-isc.jpg',
    url: 'https://www.hpcadvisorycouncil.com/events/2022/student-cluster-competition/',
    linkLabel: 'View webpage',
  },
  {
    id: 'ai-purge',
    category: 'competitions',
    title: 'AI Purge game player',
    description:
      "Won 2nd place out of 316 Computer Science and Mathematics students in a C++ competition by coding an AI that plays in the competition's game.",
    tech: ['C++', 'HTML'],
    image: 'img/logo-purge.png',
    url: 'https://github.com/henrycoas/University/tree/main/The%20Purge%20(Joc%20EDA)',
    linkLabel: 'View project',
  },
  {
    id: 'mckinsey',
    category: 'competitions',
    title: 'McKinsey Forecasting',
    description:
      "With the aim of helping to solve a problem a McKinsey & Company's client has proposed them, we developed during a hackathon a model for sales forecasting using Machine Learning and Neural Networks techniques.",
    tech: ['Python', 'TensorFlow', 'Jupyter Notebook'],
    image: 'img/mckinsey.jpg',
    url: 'https://github.com/PereCP/HackUPC-2022',
    linkLabel: 'View project',
  },
  {
    id: 'first-person-donor',
    category: 'competitions',
    title: 'First Person Donor',
    description:
      "Presented, directed and edited the shortfilm 'First Person Donor', a tale of life and death to promote organ donation. Done with my friends for the II Shortfilm Contest organized by the Jaume Arnó Foundation.",
    tech: ['Adobe Premiere Pro'],
    image: 'img/donor.jpg',
    url: 'https://www.youtube.com/watch?v=KUddHmhdhlA',
    linkLabel: 'View shortfilm',
  },
  {
    id: 'competitions-soon',
    category: 'competitions',
    title: 'Soon...',
    description: 'Soon...',
    tech: [],
    image: 'img/white.jpg',
    url: null,
    linkLabel: null,
    placeholder: true,
  },
  {
    id: 'linkedin',
    category: 'more',
    title: 'LinkedIn',
    description: 'All of this and much more in LinkedIn.',
    tech: [],
    image: 'img/logo-linkedin.png',
    url: 'https://www.linkedin.com/in/enric-condal/',
    linkLabel: 'View LinkedIn',
  },
];

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id);
}

export function getItemsByCategory(categoryId) {
  return ITEMS.filter((item) => item.category === categoryId);
}

export function getItem(id) {
  return ITEMS.find((item) => item.id === id);
}
