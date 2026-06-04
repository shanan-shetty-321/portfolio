// All personal content in one place — edit here to update the site.

export const profile = {
  name: 'Shanan Shetty',
  roles: [
    'AI/ML Engineer',
    'Computer Vision Engineer',
    'Data Scientist',
    'Deep Learning Engineer',
    'ML Engineer',
  ],
  tagline: 'MTech AI/ML @ VIT Vellore',
  taglineSub: 'building impactful, technically challenging AI systems.',
  email: 'shananshetty@gmail.com',
  phone: '+91 89285 16633',
  github: 'https://github.com/shanan-shetty-321',
  linkedin: 'https://linkedin.com/in/shanan-shetty-b2755523b',
  cv: 'https://drive.google.com/file/d/1nae7C7W1_kDskp9tAYVPOT2xRgttVXPc/view',
  avatar: 'assets/shanan.jpeg',
}

// Web3Forms access key — lets the contact form email Shanan with no backend.
// Get a free key (just enter your email) at https://web3forms.com and paste it here.
export const WEB3FORMS_KEY = '4b3756a3-72a5-45f9-bb1d-597d064ca569'

export const about = {
  lede:
    "I'm an MTech AI/ML student with hands-on experience in computer vision, LLM pipelines, video analytics and scalable AI systems — working across PyTorch, OpenCV, OCR and multimodal / vision-language models.",
  passion:
    "I love taking a messy real-world problem and turning it into a deployed, reliable model. Right now I'm focused on building impactful, technically challenging AI systems end-to-end.",
  hobbies: 'Outside of work: I recently picked up chess and badminton.',
  education: [
    { degree: 'MTech CSE — AI & ML', where: 'VIT Vellore · 2024–2026 · CGPA 8.6' },
    { degree: 'BE Computer Engineering', where: 'Thadomal Shahani · 2020–2024 · CGPA 8.68' },
  ],
  achievements: 'GATE — Data Science & AI: 510 · CS/IT: 404',
}

export const experience = [
  {
    role: 'AI Engineering Intern',
    company: 'Evam Labs',
    when: 'Jun 2025 – Present · Bangalore',
    intro: 'My primary, most in-depth role — building production AI systems end-to-end across three major projects:',
    projects: [
      {
        name: 'Geospatial POI Verification Platform',
        desc: 'Engineered an LLM-powered system to verify 100K+ business records by combining Google Maps scraping, Street View image analysis and multi-source address validation. Fine-tuned a BERT model specifically for messy Indonesian addresses, substantially improving match accuracy on a noisy, real-world dataset.',
        tags: ['LLMs', 'BERT (fine-tuned)', 'Street View', 'Geospatial'],
      },
      {
        name: 'Dashcam Violation Detection System',
        desc: 'Built a deep-learning pipeline using YOLOv8 with a 4-level hierarchical model structure to detect 14 distinct driver and road-safety violations from 120+ dashcam videos. Applied temporal augmentation to expand the dataset and improve robustness across varied driving conditions.',
        tags: ['YOLOv8', 'Hierarchical models', 'Temporal aug.', 'Video'],
      },
      {
        name: 'Indoor Mall Navigation & POI Mapping',
        desc: 'Designed a 360° video-based indoor navigation system using ORB-SLAM3, OCR and Vision-Language Models to generate navigable indoor maps across 17+ mall traversal videos spanning multiple floors, and to extract nearby points of interest automatically.',
        tags: ['ORB-SLAM3', 'VLMs', 'OCR', '360° video'],
      },
    ],
  },
  {
    role: 'Machine Learning Intern',
    company: 'ACMEGRADE',
    when: 'Jun 2022 – Aug 2022',
    bullets: [
      'Built supervised classification models in Scikit-learn (preprocessing, feature engineering, evaluation) reaching 90%+ accuracy.',
      'Performed EDA & visualization with Pandas, NumPy and Matplotlib to extract actionable insights.',
    ],
    tags: ['Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
  },
]

export const projects = [
  {
    no: '01',
    title: 'Text-to-Image Synthesis — GAN-CLS + BERT',
    video: 'assets/flower-demo.mp4',
    poster: 'assets/flower-poster.webp',
    desc: 'A GAN-CLS architecture with DistilBERT embeddings that generates photorealistic flower images from natural-language descriptions. Trained multimodal models with custom BCE/L1/L2 losses for better text–image alignment and training stability.',
    tags: ['PyTorch', 'GAN-CLS', 'DistilBERT', 'Transformers'],
    live: 'https://flower-gan-cls-ly29pxv4cappotnbqflhulp.streamlit.app/',
    repo: 'https://github.com/shanan-shetty-321/flower-gan-cls',
  },
  {
    no: '02',
    title: 'Chicken Disease Prediction — MLOps & Cloud',
    video: 'assets/chicken-demo.mp4',
    poster: 'assets/chicken-poster.webp',
    desc: 'End-to-end deep-learning pipeline for chicken-disease detection using TensorFlow, DVC, Docker and MLOps workflows for automated training and model versioning, with cloud-ready deployment and experiment tracking.',
    tags: ['TensorFlow', 'DVC', 'Docker', 'MLOps'],
    live: '',
    repo: 'https://github.com/shanan-shetty-321/chicken_disease_classificcation',
  },
]

export const skills = [
  { cat: 'Languages', items: ['Python', 'C', 'C++', 'Java', 'SQL'] },
  { cat: 'AI / ML', items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'CNNs', 'RNNs', 'ANNs', 'NLP', 'Computer Vision', 'OpenCV'] },
  { cat: 'Generative & Multimodal AI', items: ['LLMs', 'VLMs', 'OCR', 'Transformers', 'RAG', 'LangChain', 'FAISS'] },
  { cat: 'Data & Viz', items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn'] },
  { cat: 'Frameworks & Tools', items: ['FastAPI', 'Flask', 'React', 'Docker', 'Git', 'GitHub', 'Azure VM'] },
]

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]
