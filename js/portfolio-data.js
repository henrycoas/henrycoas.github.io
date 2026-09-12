// `css` is the visual color slot (work=red, projects=yellow, achievements=green,
// education=orange, contact=blue). `cardClass` styles the overview cards.
export const CATEGORIES = [
  { id: 'experience', label: 'Experience', key: 'x', css: 'work', cardClass: 'work-card' },
  { id: 'projects', label: 'Projects', key: 'p', css: 'projects', cardClass: 'project-card' },
  { id: 'achievements', label: 'Achievements', key: 'a', css: 'competitions', cardClass: 'competitions-card' },
  { id: 'education', label: 'Education', key: 'd', css: 'education', cardClass: 'education-card' },
  { id: 'contact', label: 'Contact', key: 'c', css: 'more', cardClass: 'linkedin-card' },
];

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id);

export function getCategoryByKey(key) {
  const k = key?.toLowerCase();
  return CATEGORIES.find((c) => c.key === k);
}

export const ITEMS = [
  {
    id: 'ericsson',
    category: 'experience',
    title: '5G/6G Software Developer @ Ericsson',
    description:
      'Developed and optimized 5G RAN Layer 2 features and verification flows for Carrier Aggregation, both in Purpose-built and Cloud RAN solutions.',
    tech: ['C++', 'C', 'Shell'],
    image: 'img/logo-ericsson.png',
    url: null,
    linkLabel: null,
  },
  {
    id: 'gennext',
    category: 'experience',
    title: 'GenNext Community Coordinator @ Ericsson',
    description:
      'Coordinated monthly networking events for 1200+ early-career employees, building community and supporting onboarding across the organization.',
    tech: [],
    image: 'img/gennext.jpg',
    url: null,
    linkLabel: null,
  },
  {
    id: 'riedia',
    category: 'experience',
    title: 'NLP Intern @ Riedia',
    description:
      'Built a Python-based NLP pipeline with article clustering, sentiment analysis, and fact-checking components. Designed to process 1000+ articles and serve news to 200+ readers in their preferred language.',
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
      'Computer vision and probabilistic modeling framework that reasons about occluded areas and predicts potentially hidden vehicles in realistic traffic scenarios. Developed during my exchange at KTH.',
    tech: ['Python', 'Computer Vision', 'Probabilistic Modeling'],
    image: 'img/occlusion.jpg',
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
    image: 'img/twinbooks.jpg',
    url: null,
    linkLabel: null,
  },
  {
    id: 'jsbach',
    category: 'projects',
    title: "JSBach's double interpreter",
    description:
      'Double interpreter for a custom musical programming language called JSBach. The output of this interpreter is a sheet music and some sound files that will reproduce the melody described by the composer/the code written by the programmer.',
    tech: ['Python3', 'ANTLR4', 'LilyPond', 'Timidity++', 'ffmpeg'],
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
    id: 'isc22',
    category: 'achievements',
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
    category: 'achievements',
    title: 'Silver Medal — DSA Competition',
    description:
      "Placed 2nd out of 316 Computer Science and Mathematics students by developing a C++ AI agent for a turn-based adversarial game, using real-time board-state evaluation and strategic decision-making to compete against other student-developed agents.",
    tech: ['C++', 'HTML'],
    image: 'img/logo-purge.png',
    url: 'https://github.com/henrycoas/University/tree/main/The%20Purge%20(Joc%20EDA)',
    linkLabel: 'View project',
  },
  {
    id: 'mckinsey',
    category: 'achievements',
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
    category: 'achievements',
    title: 'First Person Donor',
    description:
      "Presented, directed and edited the shortfilm 'First Person Donor', a tale of life and death to promote organ donation. Done with my friends for the II Shortfilm Contest organized by the Jaume Arnó Foundation.",
    tech: ['Adobe Premiere Pro'],
    image: 'img/donor.jpg',
    url: 'https://www.youtube.com/watch?v=KUddHmhdhlA',
    linkLabel: 'View shortfilm',
  },
  {
    id: 'upc',
    category: 'education',
    title: 'BSc Informatics Engineering @ UPC',
    description:
      'Bachelor’s degree in Informatics Engineering at the Polytechnic University of Catalonia, Barcelona (Sep 2019 – Jan 2024). Specialization in Computing and Algorithms.',
    tech: [],
    image: 'img/upc.jpg',
    url: null,
    linkLabel: null,
  },
  {
    id: 'kth',
    category: 'education',
    title: 'Computer Science Exchange @ KTH',
    description:
      'Exchange year at KTH Royal Institute of Technology, Stockholm (Aug 2022 – Jun 2023). Coursework in Machine Learning, Computer Vision, Artificial Neural Networks, and Game Theory.',
    tech: [],
    image: 'img/kth.jpg',
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

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id);
}

export function getItemsByCategory(categoryId) {
  return ITEMS.filter((item) => item.category === categoryId);
}

export function getItem(id) {
  return ITEMS.find((item) => item.id === id);
}
