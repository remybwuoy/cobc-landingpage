// Page copy and lists, kept apart from markup so content edits don't touch components.

export const BRAND = 'CareOnboardConnect';
/** Short name for the footer wordmark, which has to fit the full width in one line. */
export const BRAND_SHORT = { lead: 'COB', accent: 'Connect' };
/** Company credited in the footer. */
export const MAKER = 'CareonBoard';
/** Logo in public/ (transparent PNG). */
export const LOGO_SRC = `${import.meta.env.BASE_URL}logo.png`;

export const storySteps = [
  {
    title: 'Choose how you join.',
    text: 'Join as an individual, a professional or an organisation. Sign up with a consent step and a quick email or phone check, and each account type gets its own onboarding.',
    points: ['Individuals, professionals and organisations', 'A welcome screen and a feature tour to start'],
    screen: 'choose',
  },
  {
    title: 'Prove what you know.',
    text: 'Professionals add their profession, certifications, documents and availability. Certifications go on in a tap: CPR and BLS, ACLS, PALS, NRP, TNCC and specialty nursing.',
    points: ['Upload documents with your certifications', 'Set your availability and invite colleagues'],
    screen: 'certs',
  },
  {
    title: 'Find your people.',
    text: 'Your dashboard feed brings posts from people in your field. Build your network with connections, invitations and people you may know, and message anyone one to one.',
    points: ['Post photos, video and text, with emoji', 'Search everyone, follow and see who viewed you'],
    screen: 'feed',
  },
];

/** Pills around the story phone; `step` is the step they belong to. */
export const storyCallouts = [
  { step: 0, text: 'Pick your account type', style: { left: '6%', top: '36%' } },
  { step: 0, text: 'Onboarding made for each type', light: true, style: { right: '6%', top: '58%' } },
  { step: 1, text: 'Progress: 2 of 3', style: { right: '5%', top: '20%' } },
  { step: 1, text: 'Grouped by specialty', light: true, style: { left: '5%', top: '44%' } },
  { step: 1, text: 'Add with one tap', style: { right: '7%', top: '66%' } },
  { step: 2, text: 'Posts from your field', light: true, style: { left: '5%', top: '30%' } },
  { step: 2, text: 'Like, repost, comment', style: { right: '5%', top: '52%' } },
  { step: 2, text: 'Profile strength at a glance', light: true, style: { left: '9%', top: '80%' } },
];

export const statement = {
  lead: 'Healthcare runs on people.',
  rest: 'CareOnboardConnect brings jobs, telehealth, health records, a marketplace and a community that rewards you into one place, built for individuals, professionals and the organisations they work with.',
};

export const certifications = ['CPR', 'BLS', 'ACLS', 'PALS', 'NRP', 'TNCC'];

/** Health tips tile: a wellness question and the AI answer that types itself out. */
export const healthTip = {
  question: 'How much water should I drink on a hot day?',
  answer: 'Drink more than usual and sip through the day rather than all at once. Thirst, dark urine or dizziness are signs to drink more.',
  disclaimer: 'AI-generated wellness information, not medical advice.',
};

export const marketCategories = ['Medical equipment', 'Mobility aids', 'Home care supplies', 'Uniforms', 'Wellness products'];

/** Applications tracker tile: stages from screening to offer; `at` is the current one. */
export const applicationStages = { stages: ['Screening', 'Interview', 'Offer'], at: 1 };

/** Cowry tile: a week's streak of daily activity. */
export const cowryWeek = [
  { day: 'M', done: true }, { day: 'T', done: true }, { day: 'W', done: true }, { day: 'T', done: true },
  { day: 'F', done: true }, { day: 'S', done: false }, { day: 'S', done: false },
];

/** The three account types, each with its own onboarding. */
export const audiences = [
  {
    title: 'Individuals',
    roles: 'Patients, families, caregivers and anyone looking after their health',
    preview: 'Get health tips, book telehealth visits, keep your health records and shop for care products.',
  },
  {
    title: 'Professionals',
    roles: 'Nurses, therapists, caregivers, behaviour technicians, social workers and students',
    preview: 'Show your certifications and portfolio, find jobs, set your availability and earn Cowries.',
  },
  {
    title: 'Organisations',
    roles: 'Home care and nursing agencies, clinics, hospitals and healthcare businesses',
    preview: 'Post jobs, follow applicants from screening to offer and manage telehealth bookings.',
  },
];

export const stats = [
  { value: '8', text: 'parts of one app: post messages, images, videos & share, send Treasures(Gifts) to other people,  network, jobs, marketplace, health tips, Cowry rewards, telehealth(Coming Soon)' },
  { value: '3', text: 'account types, each with its own onboarding' },
  { value: '2', text: 'ways to withdraw earnings: a verified bank account or mobile money' },
];

export const trust = {
  security: [
    'Consent step at sign-up', 'Email or phone verification', 'Two-step verification (MFA)', 'Consent panel for shared records',
    'Verified payout accounts', 'SMS-confirmed mobile money', 'Cookie and privacy choices', 'Privacy and security settings',
  ],
  everyday: [
    'Light and dark themes', 'Sound on or off', 'Notification settings', 'Bottom tab bar on mobile',
    'Pull to refresh', 'Swipe actions on lists', 'Amounts in local currencies', 'Address search and directions',
  ],
  textSizes: [
    { value: 100, label: 'A' },
    { value: 112.5, label: 'A+' },
    { value: 125, label: 'A++' },
  ],
};

/**
 * Where "Login / Sign up" goes. Placeholder: replace with the real app or auth URL.
 * Can also be set at build time with VITE_AUTH_URL in a .env file.
 */
export const AUTH_URL = import.meta.env.VITE_AUTH_URL || 'https://connect.joincareonboard.com/';
export const AUTH_LABEL = 'Login / Sign up';

/** Main menu: shown in the top bar over the hero, then docked at the bottom of the screen. */
export const menuLinks = [
  { sec: 'top', href: '#top', label: 'Home', icon: 'home' },
  { sec: 'app', href: '#app', label: 'The app', icon: 'phone' },
  { sec: 'platform', href: '#platform', label: 'Platform', icon: 'grid' },
  { sec: 'who', href: '#who', label: "Who it's for", short: 'Who', icon: 'people' },
  { sec: 'faq', href: '#faq', label: 'FAQs', icon: 'question' },
];

/** Section element id → menu item it lights up. */
export const menuSections = [
  ['hero', 'top'], ['app', 'app'], ['platform', 'platform'], ['who', 'who'],
  ['stats', 'who'], ['trust', 'who'], ['faq', 'faq'],
];

/** FAQ accordion, written from the current feature list. */
export const faqs = [
  {
    q: 'What is CareOnboardConnect?',
    a: 'One app for care. Build your network and share posts, find and apply for jobs, shop healthcare products, look up everyday wellness tips, see a professional by video, keep your health records, and earn and gift rewards called Cowries.',
  },
  {
    q: 'What kinds of accounts are there?',
    a: 'Three, each with its own onboarding. Individuals set up a personal account. Professionals add their profession, certifications, documents and availability, and can invite colleagues. Organisations and agencies add their name, type and interests. Everyone gets a welcome screen and a short feature tour.',
  },
  {
    q: 'How do I sign up and keep my account secure?',
    a: 'Sign-up starts with a consent step, then you verify your email or phone. Logging in uses two-step verification, and you can reset a forgotten password at any time. Notification, privacy and security settings stay in your control.',
  },
  {
    q: 'How do jobs and applications work?',
    a: 'Members browse the job board with filters, read the role details, answer any screening questions and apply. Agencies post jobs, see everyone who applied and follow each candidate from screening to offer, with their credential status at every stage.',
  },
  {
    q: 'What are Cowries?',
    a: 'Cowries are CareOnboardConnect’s rewards. You earn them for daily activities and a weekly streak, and they become spendable a day after you earn them. Your wallet shows your balance and history, and you can redeem Cowries for mobile data packages.',
  },
  {
    q: 'What are treasures?',
    a: 'Treasures are gifts you send with Cowries. Pick one from the gift tray or the catalogue, which is arranged in price tiers, and it arrives with an animation, sometimes as a full-screen moment. When people send you treasures, you earn Cowries as a creator.',
  },
  {
    q: 'How do I withdraw my earnings?',
    a: 'Withdraw to a verified payout account. For a Nigerian bank account, the account name is checked with your bank, and you can search the bank list. For mobile money, you confirm with a code sent by SMS. Some earnings may be on hold for a short time before you can withdraw them.',
  },
  {
    q: 'Can I see a professional by video?',
    a: 'Yes. Choose a time slot, pick how to pay and meet by video call; calls can be recorded. Professionals set their own availability and schedules, and agencies can manage their telehealth bookings and see how their services are used.',
  },
  {
    q: 'How are my health records handled?',
    a: 'Keep your health profile and medical documents in one place, with your records and episodes on a timeline. You decide what a professional sees: records are shared through a consent panel, and follow-ups can be planned together.',
  },
  {
    q: 'Are health tips medical advice?',
    a: 'No. Health tips give AI-generated answers to everyday wellness questions, and every answer carries a disclaimer. For anything about your own care, talk to a professional. You can pick topics, see your recent searches, and save, rate and set reminders for tips.',
  },
  {
    q: 'Does it work well on my phone?',
    a: 'Yes. On mobile there’s a bottom tab bar, pull to refresh and swipe actions on lists. You also get light and dark themes, a sound toggle, maps with address search and directions, and amounts shown in your local currency.',
  },
];

export const footerLinks = {
  explore: [
    { href: '#app', label: 'The app' },
    { href: '#platform', label: 'Platform' },
    { href: '#who', label: "Who it's for" },
    { href: '#trust', label: 'Trust' },
  ],
  start: [
    { href: '#faq', label: 'FAQs' },
    { href: AUTH_URL, label: AUTH_LABEL },
  ],
  legal: [
    { href: 'privacy', label: 'Privacy Policy' },
    { href: 'terms', label: 'Terms & Conditions' },
  ],
};
