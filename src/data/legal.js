// Privacy Policy and Terms & Conditions.
//
// DRAFT: written from the product's feature list as a starting point, not legal advice.
// Have it reviewed by a qualified lawyer for the countries you operate in before launch, and
// replace every [bracketed] placeholder in `company` below.

import { BRAND, MAKER } from './content';

export const company = {
  operator: MAKER,                                   // who runs the service ("we")
  legalName: '[Registered company name]',
  address: '[Registered address]',
  email: '[contact email]',
  privacyEmail: '[privacy contact email]',
  governingLaw: '[the laws of the country you operate in]',
  minAge: 18,
  effective: '10 November 2026',
};

const C = company;
const a = (href, t) => ({ a: href, t });

/**
 * Body blocks: a string is a paragraph; { list: [...] } is a bulleted list;
 * { p: [...] } is a paragraph mixing text and links made with a(href, text).
 */
export const legalPages = {
  privacy: {
    key: 'privacy',
    href: 'privacy',
    label: 'Privacy Policy',
    title: 'Privacy Policy',
    intro: `How ${BRAND} collects, uses, shares and protects your information, and the choices you have.`,
    sections: [
      {
        id: 'who-we-are',
        title: 'Who we are',
        body: [
          `${BRAND} is operated by ${C.operator} (${C.legalName}, ${C.address}), referred to here as "we", "us" or "our". We are responsible for the personal information described in this policy.`,
          `This policy covers the ${BRAND} app and website. It applies to individuals, professionals and organisations using the service, and to anyone who visits our website.`,
        ],
      },
      {
        id: 'information-we-collect',
        title: 'Information we collect',
        body: [
          'We collect information you give us, information created as you use the service, and limited information from partners.',
          {
            list: [
              'Account details: your name, email address, phone number, password (stored in protected form), account type and the consent you give at sign-up.',
              'Profile and professional details: your profession, certifications, uploaded documents, availability, portfolio posts (images, text and video) and profile completion.',
              'Organisation details: the organisation’s name, type and interests, and the team members invited to it.',
              'Content and activity: posts, comments, reactions, messages, connections, invitations, follows, searches and who viewed your profile.',
              'Jobs and applications: the jobs you post or apply for, your answers to screening questions, and application and credential status at each stage.',
              'Health information: your health profile, medical documents, records, episode timelines, follow-ups, telehealth bookings and, where a call is recorded, the recording.',
              'Rewards and payments: your Cowry balance and transactions, treasures you send and receive, payment methods, and payout details such as a bank account or mobile money number.',
              'Health tips: the wellness questions you ask, topics you pick, recent searches, and tips you save, rate or set reminders for.',
              'Device and usage: your IP address, device and browser type, settings such as theme and sound, cookies, and location when you use maps or directions.',
            ],
          },
        ],
      },
      {
        id: 'how-we-use-it',
        title: 'How we use your information',
        body: [
          {
            list: [
              'To create and run your account, including email or phone verification, two-step verification and password resets.',
              'To provide the features you use: your feed and network, messages, jobs and applications, the marketplace, health tips, telehealth, health records and Cowry rewards.',
              'To verify payout accounts and process withdrawals, including checking a bank account name with the bank and confirming mobile money with an SMS code.',
              'To keep the service safe: preventing fraud, abuse and misuse of rewards, and enforcing our Terms.',
              'To understand how the service is used and improve it.',
              'To send you service messages and, where you have agreed, notifications you have chosen in your settings.',
              'To meet our legal obligations and respond to lawful requests.',
            ],
          },
          'We rely on your consent, on what we need to provide the service you asked for, on our legitimate interests in running a safe and useful service, and on legal obligations, as applicable to each use.',
        ],
      },
      {
        id: 'health-information',
        title: 'Health information',
        body: [
          'Health information is sensitive, so we treat it with extra care. We process it only to provide the health features you choose to use, and with your consent where the law requires it.',
          'Your health records are shared with a professional only when you allow it through the consent panel. You can change or withdraw that consent at any time; it does not affect sharing that already happened.',
          'If a telehealth call is recorded, you will be told before or at the start of the call. Recordings are kept with your records and access to them is restricted.',
          'Health tips give AI-generated answers to everyday wellness questions. The questions you ask are processed to generate those answers. Do not include details in a question that you do not want processed this way.',
        ],
      },
      {
        id: 'sharing',
        title: 'How we share information',
        body: [
          'We do not sell your personal information. We share it only as described here:',
          {
            list: [
              'With other members, as you choose: your profile, posts and portfolio are visible according to your settings, and messages go to the people you send them to.',
              'With organisations you apply to: your application, screening answers and credential status.',
              'With professionals you allow: health records you share through the consent panel, and the details needed for a telehealth booking.',
              'With service providers who work for us under contract, such as hosting, messaging and SMS verification, maps, analytics, AI services for health tips, and payment and payout partners including banks and mobile money providers.',
              'With authorities or others when the law requires it, or to protect the rights, safety and property of our members, the public or us.',
              'As part of a merger, acquisition or sale of assets, with the same protections in place.',
            ],
          },
        ],
      },
      {
        id: 'cookies',
        title: 'Cookies and similar technologies',
        body: [
          'We use cookies and similar technologies (such as local storage) to keep you signed in, remember settings like your theme, keep the service secure and, with your consent, understand how it is used.',
          'Our cookie banner lets you choose which non-essential cookies to allow, and you can change your choices at any time from the privacy settings. Essential cookies cannot be switched off because the service needs them to work.',
        ],
      },
      {
        id: 'retention',
        title: 'How long we keep information',
        body: [
          'We keep personal information for as long as your account is active and as long as we need it for the purposes above. When you delete your account, we delete or anonymise your information within a reasonable period, except where we must keep it longer, for example payment records for tax and accounting, or records needed to resolve disputes or prevent fraud.',
        ],
      },
      {
        id: 'security',
        title: 'Security',
        body: [
          'We protect information with measures such as encryption in transit, two-step verification, access controls and verified payout accounts. No system is completely secure, so please use a strong password, keep two-step verification on, and tell us straight away if you think your account has been misused.',
        ],
      },
      {
        id: 'your-rights',
        title: 'Your rights and choices',
        body: [
          'Depending on where you live, you may have the right to:',
          {
            list: [
              'Access the personal information we hold about you and get a copy of it.',
              'Correct information that is wrong or incomplete.',
              'Delete your information or your account.',
              'Withdraw consent you have given, including consent to share health records.',
              'Object to or restrict some uses of your information.',
              'Move your information to another service where that is technically possible.',
            ],
          },
          `Many choices are in your settings: notifications, privacy and security, and cookies. For anything else, contact us at ${C.privacyEmail}. You can also complain to the data protection authority where you live.`,
        ],
      },
      {
        id: 'children',
        title: 'Children',
        body: [
          `${BRAND} is for people aged ${C.minAge} and over. We do not knowingly collect information from anyone younger. If you believe a child has given us information, contact us and we will delete it.`,
        ],
      },
      {
        id: 'transfers',
        title: 'International transfers',
        body: [
          'Our service providers may process information in other countries. When we transfer information across borders, we use safeguards required by applicable law to keep it protected.',
        ],
      },
      {
        id: 'changes',
        title: 'Changes to this policy',
        body: [
          'We may update this policy as the service changes. We will post the new version here with a new date and, if the changes are significant, tell you in the app or by email before they take effect.',
        ],
      },
      {
        id: 'contact',
        title: 'Contact us',
        body: [
          `Questions about this policy or your information: ${C.privacyEmail}, or write to ${C.legalName}, ${C.address}.`,
        ],
      },
    ],
  },

  terms: {
    key: 'terms',
    href: 'terms',
    label: 'Terms & Conditions',
    title: 'Terms & Conditions',
    intro: `The rules for using ${BRAND}: your account, your content, Cowries and treasures, and our responsibilities to each other.`,
    sections: [
      {
        id: 'agreement',
        title: 'Agreeing to these terms',
        body: [
          `These terms are an agreement between you and ${C.operator} (${C.legalName}) for your use of ${BRAND}. By creating an account or using the service, you agree to them. If you use ${BRAND} for an organisation, you confirm you can accept these terms on its behalf.`,
          { p: ['Our ', a('privacy', 'Privacy Policy'), ' explains how we handle your information and forms part of these terms.'] },
        ],
      },
      {
        id: 'accounts',
        title: 'Your account',
        body: [
          {
            list: [
              `You must be at least ${C.minAge} years old to create an account.`,
              'Give accurate information and keep it up to date. Each account is for one person or one organisation.',
              'Keep your login details safe and keep two-step verification on. You are responsible for what happens under your account.',
              'Choose the account type that fits you: individual, professional, or organisation or agency.',
            ],
          },
        ],
      },
      {
        id: 'professionals-organisations',
        title: 'Professionals and organisations',
        body: [
          'Professionals must only list qualifications and certifications they hold, and only upload genuine documents. Organisations must describe their organisation and jobs truthfully.',
          'We may review profiles and documents, but we do not guarantee any member’s identity, qualifications or conduct. Organisations are responsible for their own hiring decisions, background checks and legal compliance.',
        ],
      },
      {
        id: 'health',
        title: 'Health information is not medical advice',
        body: [
          'Health tips are AI-generated, general wellness information. They are not medical advice, diagnosis or treatment, and they may be incomplete or wrong. Always talk to a qualified professional about your own health.',
          `Telehealth sessions are provided by independent professionals, who are responsible for the care they give. ${BRAND} does not provide medical care.`,
          `Never use ${BRAND} for emergencies. If you or someone else is in danger, call your local emergency number.`,
        ],
      },
      {
        id: 'telehealth',
        title: 'Telehealth bookings',
        body: [
          'When you book a telehealth slot, you agree to pay the price shown with the payment method you choose. Cancellations, rescheduling and refunds follow the terms shown at booking.',
          'Calls may be recorded where this is shown in the booking or call. Do not record calls yourself without the other person’s consent.',
        ],
      },
      {
        id: 'jobs-marketplace',
        title: 'Jobs and the marketplace',
        body: [
          'We provide the job board and applications tracker, but we are not the employer and do not guarantee that a job, candidate or offer is suitable or available.',
          'Marketplace listings are provided by sellers, who are responsible for their products, descriptions, prices and delivery. Unless we say otherwise, any sale is between you and the seller.',
        ],
      },
      {
        id: 'cowries',
        title: 'Cowries and treasures',
        body: [
          `Cowries are a reward and gifting feature inside ${BRAND}. They are not money, a bank deposit or electronic money, and they only have value as described in the app.`,
          {
            list: [
              'You earn Cowries for eligible daily activities and streaks. Earned Cowries become spendable a day after you earn them, and daily limits may apply.',
              'Where buying Cowries is offered, the price and any fees are shown before you confirm. Buying may not be available in every country.',
              'Treasures are gifts sent with Cowries. Once sent, a treasure cannot be cancelled or refunded.',
              'Cowries you earn from treasures may be on hold for a period before you can withdraw them.',
              'Withdrawals go only to a payout account in your name that we have verified, such as a Nigerian bank account or mobile money. Fees and minimum amounts are shown before you confirm.',
              'Amounts shown in local currencies are estimates for convenience; the amount you receive is set when the withdrawal is processed.',
            ],
          },
          'We may change how many Cowries activities pay, their limits and prices. If we find fraud, abuse or rewards earned against these terms, we may cancel those Cowries, reverse treasures, or hold or refuse a withdrawal.',
        ],
      },
      {
        id: 'your-content',
        title: 'Your content',
        body: [
          'You keep ownership of the posts, portfolio items, messages and other content you share. You give us a non-exclusive, worldwide, royalty-free licence to host, store, display and share that content as needed to run and promote the service, according to your settings. This licence ends when you delete the content, except for copies already shared with others or kept for legal reasons.',
          'You are responsible for your content and must have the rights to share it.',
        ],
      },
      {
        id: 'acceptable-use',
        title: 'Acceptable use',
        body: [
          `Do not use ${BRAND} to:`,
          {
            list: [
              'Pretend to be someone else, or misstate your qualifications or affiliation.',
              'Harass, threaten or discriminate against anyone, or post hateful, violent or sexual content.',
              'Share another person’s health or personal information without their permission.',
              'Post false job listings, scams or misleading products.',
              'Earn, trade or withdraw Cowries through fake accounts, automation or other abuse.',
              'Break the law, infringe others’ rights, or try to hack, overload or reverse-engineer the service.',
            ],
          },
        ],
      },
      {
        id: 'suspension',
        title: 'Suspension and closing your account',
        body: [
          'You can close your account at any time from your settings. We may suspend or close an account, or remove content, if we reasonably believe it breaks these terms or the law, or puts members or the service at risk. Where appropriate, we will tell you why and how to appeal.',
        ],
      },
      {
        id: 'disclaimers',
        title: 'Disclaimers',
        body: [
          `We work to keep ${BRAND} available and accurate, but the service is provided "as is" and "as available". Some features may change, pause or be unavailable in some places. To the extent the law allows, we make no other promises about the service.`,
        ],
      },
      {
        id: 'liability',
        title: 'Limitation of liability',
        body: [
          'To the extent the law allows, we are not liable for indirect or consequential losses, for the conduct of other members, professionals, organisations or sellers, or for losses caused by events outside our reasonable control. Nothing in these terms limits liability that cannot be limited by law.',
        ],
      },
      {
        id: 'changes',
        title: 'Changes to these terms',
        body: [
          'We may update these terms as the service changes. We will post the new version here with a new date and, if the changes are significant, tell you before they take effect. If you keep using the service after that, you accept the new terms.',
        ],
      },
      {
        id: 'law',
        title: 'Governing law',
        body: [
          `These terms are governed by ${C.governingLaw}. Before starting formal proceedings, please contact us so we can try to resolve the issue.`,
        ],
      },
      {
        id: 'contact',
        title: 'Contact us',
        body: [
          `Questions about these terms: ${C.email}, or write to ${C.legalName}, ${C.address}.`,
        ],
      },
    ],
  },
};
