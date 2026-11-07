// All content below comes from github.com/asadsehto (profile README + repositories).

export const profile = {
  name: 'Asad Saleem',
  roles: ['AI Engineer', 'Independent Researcher', 'LLM Agents & Computer Vision'],
  logline:
    'I build AI applications and do research across AI, agents and computer science.',
  education: 'BS Computer Science (AI) · Sukkur IBA University · expected August 2027',
  email: 'asadsaleemsahto@gmail.com',
  links: {
    github: 'https://github.com/asadsehto',
    linkedin: 'https://www.linkedin.com/in/asadsaleemsahto/',
    kaggle: 'https://www.kaggle.com/asadsahto',
  },
};

export const feature = {
  title: 'Self-Improving Harnesses Below the Capability Floor',
  year: '2026',
  question:
    'Can a small model running on a laptop rewrite its own prompt, memory and tools — and get better?',
  synopsis:
    'A re-implementation of Continual Harness (Karten et al., 2026) for local Ollama models, tested on qwen3.5:0.8b and gemma4:e2b across 20 automatically checked computer tasks.',
  stats: [
    { value: '32→15%', label: 'qwen with self-editing as-is — worse than a fixed harness' },
    { value: '27→60%', label: 'held-out tasks with all five safeguards (suggestive)' },
    { value: '1,256', label: 'task runs released; one command rebuilds every table' },
  ],
  safeguards: ['Larger refiner', 'Regression gate', 'Retrieval memory', 'Verified skills', 'Structured errors'],
  link: 'https://github.com/asadsehto/continual-harness-small-models',
};

// "Now Showing" — selected work as posters. Genre is a playful label for the project type.
export const posters = [
  {
    title: 'ProfDesk',
    tagline: 'One chat. Every AI. Your whole computer.',
    genre: 'Assistant · Self-hosted',
    blurb:
      'Claude, ChatGPT and a private local model in one chat, running on your own computer and reachable from your phone. Built for teachers.',
    tech: ['Python', 'FastAPI', 'Ollama'],
    link: 'https://github.com/asadsehto/profdesk',
    palette: ['#0e7c86', '#0a2540'],
  },
  {
    title: 'LecAssist',
    tagline: 'One lecture in. The busywork out.',
    genre: 'Thesis · Agents',
    blurb:
      'Final-year project: record, transcribe mixed Urdu/English, summarise, then let an agent create assignments on Moodle — always after the teacher approves.',
    tech: ['Ollama', 'faster-whisper', 'Playwright', 'Electron'],
    link: 'https://github.com/asadsehto/fyp',
    palette: ['#c2410c', '#1c1917'],
  },
  {
    title: 'Tribunal',
    tagline: 'Let the agents argue it out.',
    genre: 'Multi-agent · Reasoning',
    blurb:
      'Multi-agent reasoning platform exploring structured debate, counterarguments and synthesis.',
    tech: ['Python', 'TypeScript', 'Node.js', 'LLM APIs'],
    link: 'https://tribunal.app',
    palette: ['#7f1d1d', '#111827'],
  },
  {
    title: 'Quantum-RAG',
    tagline: 'Find the passage that matters.',
    genre: 'Retrieval · Experimental',
    blurb:
      'Semantic retrieval prototype — chunking, embeddings, vector search — with separate quantum-inspired experiments.',
    tech: ['Python', 'Embeddings', 'Vector search'],
    link: 'https://github.com/asadsehto/Quantum-RAG',
    palette: ['#4338ca', '#0b0f1a'],
  },
  {
    title: 'Rizzume',
    tagline: 'Your résumé, typeset.',
    genre: 'Full-stack · Tools',
    blurb: 'Resume builder connecting a React interface to a Flask API and LaTeX PDF export.',
    tech: ['React', 'Flask', 'LaTeX', 'Docker'],
    link: 'https://github.com/asadsehto/rizzume',
    live: 'https://rizzeume.netlify.app/',
    palette: ['#a16207', '#1a1206'],
  },
  {
    title: 'CareToShare',
    tagline: 'Notes, shared by the whole class.',
    genre: 'Full-stack · Education',
    blurb:
      'Student study-material sharing with Google OAuth, files stored in each user’s own Google Drive.',
    tech: ['React', 'Express', 'MongoDB', 'Drive API'],
    link: 'https://github.com/asadsehto/CareToShare',
    live: 'https://caretshare.netlify.app/',
    palette: ['#15803d', '#07140c'],
  },
];

export const shorts = [
  { title: 'ALIF-AI', note: 'Experimental assistant for Quran & Hadith explanations', lang: 'Python', link: 'https://github.com/asadsehto/ALIF-AI' },
  { title: 'Semantic Book Recommender', note: 'Book recommendations through semantic search', lang: 'Jupyter', link: 'https://github.com/asadsehto/semantic-book-recommender' },
  { title: 'Droplist', note: 'Make movie & YouTube playlists and share them', lang: 'HTML', link: 'https://github.com/asadsehto/droplist' },
  { title: 'Savetube', note: 'Save videos to watch later, while eating', lang: 'JavaScript', link: 'https://github.com/asadsehto/savetube' },
  { title: 'logtool', note: 'Analyse streaming-server logs for 4xx/5xx errors', lang: 'Python', link: 'https://github.com/asadsehto/logtool' },
  { title: 'TwitterXBot', note: 'Tweepy scripts for posting text, images and video', lang: 'Python', link: 'https://github.com/asadsehto/TwitterXBot' },
  { title: 'Grades Tracker', note: 'Keep track of semester grades', lang: 'Java', link: 'https://github.com/asadsehto/Grades-Tracking-Application-' },
  { title: 'Hide Tray Icons', note: 'PowerShell to hide Windows 11 system-tray icons', lang: 'PowerShell', link: 'https://github.com/asadsehto/Hide-system-tray-icons-windows-11' },
];

export const filmography = [
  {
    role: 'AI Engineer',
    org: 'Miami TV',
    dates: 'Dec 2025 — present',
    now: true,
    note: 'Agent workflows for research and content generation, a retrieval-based assistant, and streaming analytics.',
  },
  {
    role: 'Junior AI Engineer',
    org: 'Memo Apps',
    dates: 'Sep — Nov 2025',
    note: 'Educational software and workflow automation.',
  },
  {
    role: 'Python Developer',
    org: 'Easy.co',
    dates: 'Jun — Aug 2025',
    note: 'Data-extraction pipelines.',
  },
  {
    role: 'BS Computer Science (AI)',
    org: 'Sukkur IBA University',
    dates: 'Expected Aug 2027',
    note: 'Thesis: LecAssist, an agentic academic assistant (2026–2027).',
  },
];

export const crew = [
  { dept: 'ML & AI', names: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Transformers', 'Ollama', 'NumPy', 'Pandas'] },
  { dept: 'Research', names: ['Experiment design', 'Paired significance testing', 'Ablations', 'LaTeX'] },
  { dept: 'Software & Deployment', names: ['Python', 'FastAPI', 'Flask', 'React', 'Node.js', 'Docker', 'Linux', 'GCP', 'MongoDB', 'Redis'] },
];

// "Director's Picks" — favourite films, grouped by genre. Years/directors checked against public film records.
export const picks = [
  {
    genre: 'Westerns',
    line: 'Dust, duels and Morricone.',
    films: [
      { title: 'The Dollars Trilogy', year: '1964–66', by: 'Sergio Leone' },
      { title: 'Duck, You Sucker!', year: '1971', by: 'Sergio Leone' },
      { title: 'The Sisters Brothers', year: '2018', by: 'Jacques Audiard' },
    ],
  },
  {
    genre: 'Sci-Fi',
    line: 'Where most of my ideas start.',
    films: [
      { title: 'Interstellar', year: '2014', by: 'Christopher Nolan' },
      { title: 'Inception', year: '2010', by: 'Christopher Nolan' },
      { title: 'The Matrix', year: '1999', by: 'The Wachowskis' },
      { title: 'Source Code', year: '2011', by: 'Duncan Jones' },
      { title: 'Gravity', year: '2013', by: 'Alfonso Cuarón' },
      { title: 'The Martian', year: '2015', by: 'Ridley Scott' },
    ],
  },
  {
    genre: 'Mind Games',
    line: 'Twists, obsessions and long nights.',
    films: [
      { title: 'The Prestige', year: '2006', by: 'Christopher Nolan' },
      { title: 'Shutter Island', year: '2010', by: 'Martin Scorsese' },
      { title: 'Prisoners', year: '2013', by: 'Denis Villeneuve' },
      { title: 'Nightcrawler', year: '2014', by: 'Dan Gilroy' },
      { title: 'The Bourne Trilogy', year: '2002–07', by: 'Doug Liman · Paul Greengrass' },
    ],
  },
  {
    genre: 'War & Epic',
    line: 'History, told loud.',
    films: [
      { title: '1917', year: '2019', by: 'Sam Mendes' },
      { title: 'Fury', year: '2014', by: 'David Ayer' },
      { title: 'Pearl Harbor', year: '2001', by: 'Michael Bay' },
      { title: 'Troy', year: '2004', by: 'Wolfgang Petersen' },
      { title: 'The Ministry of Ungentlemanly Warfare', year: '2024', by: 'Guy Ritchie' },
    ],
  },
  {
    genre: 'Crime & Encore',
    line: 'Sharp suits, and a song at the end.',
    films: [
      { title: 'The Gentlemen', year: '2019', by: 'Guy Ritchie' },
      { title: 'The Irishman', year: '2019', by: 'Martin Scorsese' },
      { title: 'Captain America: Civil War', year: '2016', by: 'Anthony & Joe Russo' },
      { title: 'La La Land', year: '2016', by: 'Damien Chazelle' },
      { title: "Don't Look Up", year: '2021', by: 'Adam McKay' },
    ],
  },
];
