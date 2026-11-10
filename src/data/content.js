// Page copy and lists, kept apart from markup so content edits don't touch components.

export const storySteps = [
  {
    title: 'Choose how you join.',
    text: 'Individuals build a professional profile and grow a healthcare career. Companies recruit, post openings and promote their services.',
    points: ['Professionals, students and caregivers', 'Agencies, clinics and sellers'],
    screen: 'choose',
  },
  {
    title: 'Prove what you know.',
    text: 'Add certifications in a tap: required ones like CPR and BLS, acute and critical care like ACLS, PALS, NRP and TNCC, and specialty nursing.',
    points: ['Grouped by specialty', 'Search or tap to add'],
    screen: 'certs',
  },
  {
    title: 'Find your people.',
    text: 'A home feed from people in your field: honest posts, reposts and conversations, with connections a tap away.',
    points: ['Follow and message professionals', 'Search and notifications up top'],
    screen: 'feed',
  },
];

/** Pills around the story phone; `step` is the step they belong to. */
export const storyCallouts = [
  { step: 0, text: 'Individual or Company', style: { left: '6%', top: '36%' } },
  { step: 0, text: 'One clear choice per screen', light: true, style: { right: '6%', top: '58%' } },
  { step: 1, text: 'Progress: 2 of 3', style: { right: '5%', top: '20%' } },
  { step: 1, text: 'Grouped by specialty', light: true, style: { left: '5%', top: '44%' } },
  { step: 1, text: 'Add with one tap', style: { right: '7%', top: '66%' } },
  { step: 2, text: 'Posts from your field', light: true, style: { left: '5%', top: '30%' } },
  { step: 2, text: 'Like, repost, comment', style: { right: '5%', top: '52%' } },
  { step: 2, text: 'Floating dock navigation', light: true, style: { left: '9%', top: '80%' } },
];

export const statement = {
  lead: 'Healthcare runs on people.',
  rest: 'CareConnect brings the jobs, the care, the learning and the community into one place, built for nurses, therapists, caregivers, agencies and the families they serve.',
};

export const certifications = ['CPR', 'BLS', 'ACLS', 'PALS', 'NRP', 'TNCC'];

export const copilot = {
  question: 'What do I need to move from RBT to BCBA?',
  answer: "A master's degree, supervised fieldwork hours and the BCBA exam. I found 2 programs and a mentor near you.",
};

export const marketCategories = ['Medical equipment', 'Courses', 'Uniforms', 'Adaptive devices', 'Consulting'];

export const youthStages = [
  { label: 'Discover', done: true },
  { label: 'Learn', done: true },
  { label: 'Volunteer', done: false },
  { label: 'Intern', done: false },
];

export const audiences = [
  {
    title: 'Professionals',
    roles: 'RN, LPN, DSP, RBT, BCBA, therapists, social workers, caregivers, case managers and students',
    preview: 'Get matched to roles, practise AI interviews and grow a verified professional network.',
  },
  {
    title: 'Agencies',
    roles: 'Home care, behavior and nursing agencies, clinics, hospitals, telehealth providers and recruiters',
    preview: 'Recruit staff, track credentials and compliance, schedule care and see workforce insights.',
  },
  {
    title: 'Families',
    roles: 'Parents, guardians, patients, caregivers and Medicaid recipients',
    preview: 'Find providers, book telehealth visits and get help navigating Medicaid.',
  },
  {
    title: 'Youth, 13–17',
    roles: 'Supervised accounts with parental permissions and a career pathway mode',
    preview: 'Explore healthcare careers safely, with mentors, scholarships and a parent in the loop.',
  },
  {
    title: 'Sellers',
    roles: 'Healthcare businesses, consultants, trainers, course creators and equipment vendors',
    preview: 'Sell services, courses and equipment to the people who need them, with seller analytics.',
  },
];

/** Counts from the CareConnect product requirements, v1.0. */
export const stats = [
  { value: '11', text: 'services in one app, from recruitment and telehealth to Medicaid navigation' },
  { value: '9', text: 'ways to join, from healthcare professional to marketplace seller' },
  { value: '5', text: 'account types, each with its own experience' },
];

export const trust = {
  security: [
    'Identity verification', 'Two-factor authentication', 'Encrypted messaging', 'Consent management',
    'Parental consent workflows', 'Role-based permissions', 'Secure document storage', 'Audit trails',
  ],
  accessibility: [
    'WCAG-guided design', 'High contrast mode', 'Screen reader support', 'Keyboard navigation',
    'Captioning', 'Multilingual support', 'Voice navigation', 'Adjustable font sizes',
  ],
  textSizes: [
    { value: 100, label: 'A' },
    { value: 112.5, label: 'A+' },
    { value: 125, label: 'A++' },
  ],
};

export const footerLinks = {
  explore: [
    { href: '#app', label: 'The app' },
    { href: '#platform', label: 'Platform' },
    { href: '#who', label: "Who it's for" },
    { href: '#trust', label: 'Trust' },
  ],
  start: [
    { href: '#join', label: 'Early access' },
    { href: '#top', label: 'Back to top ↑' },
  ],
};
