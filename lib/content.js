// Single source of truth for all site copy. Swap this for a CMS fetch later —
// every section reads from here, so nothing else has to change.

export const brand = {
  name: 'NOEMA',
  category: 'Neural Fitness System',
  tagline: 'Train the quiet mind.',
  description:
    'A six-channel dry EEG band and a training OS that adapts to your live signal. Focus, calm and recovery stop being feelings you report and start being numbers you move.',
  url: 'https://noema.systems',
  email: 'hello@noema.systems',
  address: 'Zollstrasse 4, 8005 Zürich',
};

export const nav = [
  { label: 'System',   href: '#system' },
  { label: 'Story',    href: '#story' },
  { label: 'Pricing',  href: '#pricing' },
  { label: 'Voices',   href: '#voices' },
  { label: 'Insights', href: '#insights' },
];

export const partners = [
  'Neurolab Zürich', 'Atlas Performance', 'Meridian Sleep Clinic', 'Optic Studios',
  'The Quiet Company', 'ETH Cognition Group', 'Halden Athletic', 'Sable Health',
];

export const stats = [
  { value: 128, suffix: 'K',  label: 'Training sessions logged each week' },
  { value: 42,  suffix: '%',  label: 'Median focus-index gain over 8 weeks' },
  { value: 4.9, suffix: '/5', label: 'Average rating across 6,400 owners', decimals: 1 },
  { value: 31,  suffix: '+',  label: 'Countries with a NOEMA cohort' },
];

export const readouts = [
  { label: 'Focus index',  value: 87,  unit: '',      delta: '▲ 12',  dir: 'up',   stroke: '#E9B872',
    path: 'M0 18 L20 15 L40 19 L60 11 L80 14 L100 7 L120 10 L140 5 L160 8 L180 3 L200 6' },
  { label: 'Theta / alpha', value: 1.42, unit: 'ratio', delta: '▲ 24%', dir: 'up',  stroke: '#3FA890', decimals: 2,
    path: 'M0 12 L20 6 L40 17 L60 9 L80 20 L100 12 L120 4 L140 16 L160 8 L180 14 L200 9' },
  { label: 'Recovery',     value: 92,  unit: '/100',  delta: '▼ 3',   dir: 'down', stroke: '#FF6F4E',
    path: 'M0 8 L20 10 L40 6 L60 12 L80 9 L100 14 L120 11 L140 16 L160 13 L180 17 L200 14' },
];

export const founders = [
  { initials: 'MH', name: 'Dr. Mira Halberg', role: 'Sleep & cognition, ETH Zürich', gradient: 'linear-gradient(135deg,#E9B872,#C9964F)' },
  { initials: 'JO', name: 'Jonas Oyelaran',   role: 'Signal processing',             gradient: 'linear-gradient(135deg,#3FA890,#1E6A5C)' },
];

export const timeline = [
  { year: '2021 · Q2', title: 'A gel-free electrode that actually works',
    body: "Prototype 01 was a headband stitched in Mira's kitchen with electrodes cut from a conductive polymer sheet. It held a signal for nine minutes." },
  { year: '2022 · Q4', title: 'Motion artefacts, solved on-device',
    body: "Jonas ported the lab's denoising stack to a 90mW chip. Blinking, chewing and walking stopped destroying the read. Prototype 06 survived a commute." },
  { year: '2023 · Q3', title: 'The first adaptive protocol',
    body: 'Instead of playing a fixed 20-minute track, the OS began branching mid-session on live theta. Completion rates went from 34% to 81% overnight.' },
  { year: '2024 · Q2', title: 'Eight-week cohort study, n=612',
    body: 'Run with ETH Zürich. Median focus-index gain of 42%, sustained at a 12-week follow-up. Published, with the null results included.' },
  { year: '2025 · Q1', title: '31 grams',
    body: 'Prototype 11 became Gen 2. Titanium spine, silicone contacts, 14-hour battery. Shipped to 6,400 people across 31 countries.' },
  { year: '2026 · Now', title: 'Gen 3 and the clinician export',
    body: 'Six channels instead of four, a recovery model that spans weeks, and a signed export your neurologist or coach can actually open.' },
];

export const values = [
  { n: 'Value 01', title: 'Measure, then claim',
    body: "Every number on this site comes from a study we ran and published — including the arms that failed. If we can't measure it, we don't sell it." },
  { n: 'Value 02', title: 'Calm is trainable',
    body: "Composure isn't a personality trait you were issued at birth. It's a skill with a signal, a baseline and a progression — like a deadlift." },
  { n: 'Value 03', title: 'Privacy is physical',
    body: "Raw neural data never touches a network. Processing happens on the band; the session file is deleted when it ends. There's no cloud to breach." },
];

export const features = [
  { icon: 'wave',   title: 'Signal Engine',      tag: 'On-device · 90mW',
    body: 'Six dry channels sampling at 256Hz. Motion, blink and jaw artefacts are stripped on the band itself, before anything is written to memory.' },
  { icon: 'adapt',  title: 'Adaptive Sessions',  tag: 'Branches every 15s',
    body: 'Twelve-minute protocols that branch on your live signal. Drift and it shortens the interval; lock in and it raises the difficulty. No fixed tracks.' },
  { icon: 'bars',   title: 'Recovery Map',       tag: '12-week horizon',
    body: 'See how sleep debt, travel and training load compound across weeks — and which of them is actually costing you tomorrow\u2019s focus.' },
  { icon: 'audio',  title: 'Generative Score',   tag: 'Real-time synthesis',
    body: 'A binaural score composed in real time against your own rhythm, not a library of pre-rendered tracks. Two hours of audio, never repeated.' },
  { icon: 'brain',  title: 'Baseline Coach',     tag: 'Personal model',
    body: "Trained on four million anonymised sessions, then tuned to you alone. It compares this week to your February — not to a stranger's average." },
  { icon: 'people', title: 'Cohort Mode',        tag: 'Lab plan',
    body: 'For labs, clinics and performance staff: seat management, cross-athlete dashboards and a signed PDF export that opens in any clinical viewer.' },
];

export const comparison = {
  columns: ['NOEMA Gen 3', 'Meditation apps', 'Fitness wearables'],
  rows: [
    { label: 'Direct neural signal',        cells: [[1,'6-channel EEG'],   [0,'None'],          [0,'Heart-rate proxy']] },
    { label: 'Protocol adapts mid-session', cells: [[1,'Every 15 seconds'],[0,'Fixed audio'],   [0,'Not applicable']] },
    { label: 'Raw data stays on the device',cells: [[1,'Always'],          [0,'Cloud account'], [0,'Cloud account']] },
    { label: 'Multi-week recovery modelling',cells:[[1,'12 weeks'],        [0,'Streak counter'],[1,'Body only']] },
    { label: 'Clinician-readable export',   cells: [[1,'Signed PDF + EDF'],[0,'No'],            [0,'CSV dump']] },
    { label: 'Hardware included in plan',   cells: [[1,'Core & Lab'],      [0,'No'],            [0,'Bought separately']] },
  ],
};

export const plans = [
  { name: 'Signal', who: 'App only. Bring your own band, or start without one.',
    mo: 19, yr: 15, unit: '/ month', cta: 'Start free for 14 days', featured: false,
    perks: ['Full protocol library', 'Generative binaural scores', 'Weekly focus report', 'Works with Gen 2 bands'] },
  { name: 'Core', who: 'The Gen 3 band, the adaptive OS, and the full recovery model.',
    mo: 49, yr: 39, unit: '/ month', cta: 'Reserve a band', featured: true, badge: 'Most chosen',
    perks: ['NOEMA Gen 3 band included', 'Adaptive sessions with live branching', '12-week recovery map', 'Baseline coach tuned to you', 'Replacement contacts, shipped free'] },
  { name: 'Lab', who: 'Clinics, sports science teams and studios running cohorts.',
    mo: 129, yr: 103, unit: '/ seat / month', cta: 'Talk to the team', featured: false,
    perks: ['Everything in Core', 'Cohort dashboard & seat management', 'Signed PDF and EDF export', 'Protocol authoring tools', 'Named onboarding scientist'] },
];

export const voices = [
  { quote: 'I stopped guessing whether the morning block was working. Week three the number moved, and I reorganised my whole calendar around what the band said my good hours actually were.',
    name: 'Elif Karadag', role: 'Litigation partner · Istanbul', initials: 'EK', delta: '+38%', gradient: 'linear-gradient(135deg,#E9B872,#C9964F)' },
  { quote: "We put twelve rowers on it for a season. The thing that surprised us wasn't the focus gain — it was catching two athletes drifting into overtraining a week before their HRV said anything.",
    name: 'Tomás Rivas', role: 'Head of performance · Halden Athletic', initials: 'TR', delta: '+27%', gradient: 'linear-gradient(135deg,#3FA890,#1E6A5C)' },
  { quote: "Eight weeks, essentially flat. I'm including it because they asked me to. What did change is that I now know my afternoons are unsalvageable and I've stopped scheduling anything hard in them.",
    name: 'Priya Raghunathan', role: 'Staff engineer · Bengaluru', initials: 'PR', delta: '+3%', gradient: 'linear-gradient(135deg,#8C939E,#5A6069)' },
  { quote: "I've prescribed neurofeedback for eleven years and mostly apologised for the hardware. This is the first device I've handed a patient without a twenty-minute caveat about electrode gel.",
    name: 'Dr. Anneke Vos', role: 'Clinical neuropsychologist · Rotterdam', initials: 'AV', delta: '+44%', gradient: 'linear-gradient(135deg,#E9B872,#FF6F4E)' },
  { quote: 'The privacy position is why we bought seats. Nothing leaves the band, so there was no data-processing agreement to negotiate and no committee to convince. That took eight months off our timeline.',
    name: 'Marcus Bell', role: 'Research director · Meridian', initials: 'MB', delta: '+31%', gradient: 'linear-gradient(135deg,#3FA890,#E9B872)' },
];

export const trustChips = [
  'Raw data never leaves the band',
  'GDPR & HIPAA aligned',
  'ETH Zürich cohort study, n=612',
  '60-night return window',
  '4.9 average from 6,400 owners',
];

export const categories = ['all', 'neuroscience', 'performance', 'sleep', 'engineering'];

export const articles = [
  { slug: 'theta-alpha-ratio', category: 'neuroscience', hue: 34,
    title: 'What the theta/alpha ratio actually predicts',
    excerpt: "We ran the number against eight weeks of self-reported focus across 612 subjects. It's a better predictor than sleep duration — and a worse one than we'd like.",
    date: '18 Aug 2026', read: '9 min' },
  { slug: 'motion-artefacts', category: 'engineering', hue: 168,
    title: 'Killing motion artefacts on 90 milliwatts',
    excerpt: 'A walkthrough of the on-band denoising stack: why we abandoned ICA, what replaced it, and the chewing problem that took four months.',
    date: '04 Aug 2026', read: '14 min' },
  { slug: 'afternoon-crash', category: 'sleep', hue: 206,
    title: 'The 3pm crash is not about lunch',
    excerpt: 'Circadian dip, sleep pressure and the surprisingly small contribution of what you ate. With data from 41,000 afternoon sessions.',
    date: '21 Jul 2026', read: '7 min' },
  { slug: 'twelve-minutes', category: 'performance', hue: 14,
    title: 'Why we shortened every protocol to twelve minutes',
    excerpt: 'Completion rate beats session length at almost every dosage we tested. The honest version of how we found that out.',
    date: '09 Jul 2026', read: '6 min' },
  { slug: 'failed-arms', category: 'neuroscience', hue: 150,
    title: 'Publishing the arms that failed',
    excerpt: 'Three interventions that showed nothing in our cohort study, and why we put them in the paper anyway.',
    date: '25 Jun 2026', read: '11 min' },
  { slug: 'reading-recovery', category: 'performance', hue: 44,
    title: 'Reading a recovery map without lying to yourself',
    excerpt: 'Four common misreadings of the 12-week view, including the one where you convince yourself a bad week was travel.',
    date: '12 Jun 2026', read: '8 min' },
];

export const footerColumns = [
  { title: 'System',   links: [['Signal Engine','#system'],['Adaptive Sessions','#system'],['Recovery Map','#system'],['Pricing','#pricing']] },
  { title: 'Company',  links: [['Story','#story'],['Insights','#insights'],['Voices','#voices'],['Contact','#contact']] },
  { title: 'Elsewhere',links: [['Research index','#'],['Instagram','#'],['LinkedIn','#'],['Careers · 4 open','#']] },
];
