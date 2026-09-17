import type { TrainingScenario } from '../types';

export const scenariosData: TrainingScenario[] = [
  {
    id: 'sc1',
    title: 'Suspicious Account Verification',
    type: 'Credential Harvesting',
    difficulty: 'Beginner',
    description: 'A common attack faking a security alert from a social network.',
    introduction: 'In this scenario, you receive an urgent email claiming your account will be suspended if you do not verify your information immediately. Review the email carefully and answer the questions below.',
    simulatedMessage: {
      sender: '"Security Team" <alerts@sec-verify-portal.com>',
      subject: 'URGENT: Verify your account within 24 hours',
      body: 'Dear User,\n\nWe have detected suspicious login attempts on your account. To prevent unauthorized access and permanent suspension, you must verify your identity immediately.\n\nPlease click the link below to verify your account:\n\nThank you,\nThe Security Team',
      url: 'http://login.secure-verify-portal-update.com/auth'
    },
    questions: [
      {
        id: 'q1',
        text: 'What is the most significant warning sign in the sender\'s address?',
        options: [
          { id: 'a', text: 'It uses the word "Security"', isCorrect: false, explanation: 'Using "Security" is common for both real and fake emails. Look at the actual domain.', skill: 'Sender Analysis' },
          { id: 'b', text: 'The domain (sec-verify-portal.com) is not an official company domain', isCorrect: true, explanation: 'Attackers register domains that look official but are slightly different from the real ones.', skill: 'Domain Verification' },
          { id: 'c', text: 'It does not include my name', isCorrect: false, explanation: 'While generic greetings are a flag, the suspicious domain is a stronger indicator.', skill: 'Sender Analysis' },
          { id: 'd', text: 'It was sent to my inbox', isCorrect: false, explanation: 'Spam filters are not perfect; malicious emails often reach the inbox.', skill: 'Email Filtering' }
        ]
      },
      {
        id: 'q2',
        text: 'Identify the social engineering tactic used in the subject line and body.',
        options: [
          { id: 'a', text: 'Offering a financial reward', isCorrect: false, explanation: 'There is no reward offered here.', skill: 'Threat Detection' },
          { id: 'b', text: 'Building trust through personalization', isCorrect: false, explanation: 'The email uses a generic "Dear User" greeting.', skill: 'Personalization Analysis' },
          { id: 'c', text: 'Creating artificial urgency and fear', isCorrect: true, explanation: 'Phrases like "URGENT", "within 24 hours", and "permanent suspension" are designed to panic you into acting without thinking.', skill: 'Urgency Detection' },
          { id: 'd', text: 'Appealing to authority', isCorrect: false, explanation: 'While it claims to be from "Security", the primary tactic here is urgency and fear.', skill: 'Threat Detection' }
        ]
      },
      {
        id: 'q3',
        text: 'Examine the URL provided in the message. What makes it highly suspicious?',
        options: [
          { id: 'a', text: 'It uses HTTP instead of HTTPS', isCorrect: true, explanation: 'Legitimate login portals almost always use secure HTTPS connections. Additionally, the domain itself is overly complex and unofficial.', skill: 'Suspicious URL Recognition' },
          { id: 'b', text: 'It is too short', isCorrect: false, explanation: 'The URL is actually quite long and complex.', skill: 'Suspicious URL Recognition' },
          { id: 'c', text: 'It contains the word "login"', isCorrect: false, explanation: 'Many legitimate URLs contain "login". The lack of HTTPS and the fake domain are the real issues.', skill: 'Suspicious URL Recognition' },
          { id: 'd', text: 'It does not end in .org', isCorrect: false, explanation: 'Companies use many TLDs (.com, .net, etc.). The specific structure and protocol are what make this suspicious.', skill: 'Domain Verification' }
        ]
      }
    ]
  },
  {
    id: 'sc2',
    title: 'Password Reset Scam',
    type: 'Account Takeover',
    difficulty: 'Intermediate',
    description: 'An urgent request to reset a password due to an alleged breach.',
    introduction: 'You receive a notification that your password has been compromised in a data breach. The email instructs you to change it immediately using the provided link.',
    simulatedMessage: {
      sender: '"IT Support" <admin@it-support-desk.net>',
      subject: 'Security Alert: Password Compromised',
      body: 'Hello,\n\nOur monitoring systems indicate that your password was exposed in a recent third-party data breach. Your account is currently at risk.\n\nYou must reset your password immediately to secure your account and maintain access to company resources.\n\nReset Password: https://password-reset.company-portal.net/token=8f9a2b\n\nIT Support Desk',
      url: 'https://password-reset.company-portal.net/token=8f9a2b'
    },
    questions: [
      {
        id: 'q1',
        text: 'What should you do first upon receiving this email?',
        options: [
          { id: 'a', text: 'Click the link to secure the account immediately', isCorrect: false, explanation: 'Never click links in unsolicited security alerts.', skill: 'Incident Response' },
          { id: 'b', text: 'Reply to the sender for confirmation', isCorrect: false, explanation: 'Replying confirms your email is active and may alert the attacker.', skill: 'Incident Response' },
          { id: 'c', text: 'Manually navigate to the official portal to check your security settings', isCorrect: true, explanation: 'Always independently verify security alerts by going directly to the known, trusted service rather than using provided links.', skill: 'Independent Verification' },
          { id: 'd', text: 'Forward the email to your colleagues to warn them', isCorrect: false, explanation: 'Forwarding might spread the phishing link. Report it to IT instead.', skill: 'Incident Response' }
        ]
      },
      {
        id: 'q2',
        text: 'Why might the sender use the name "IT Support" with the domain "it-support-desk.net"?',
        options: [
          { id: 'a', text: 'To bypass spam filters', isCorrect: false, explanation: 'Spam filters look at domain reputation, not just the name.', skill: 'Sender Authentication' },
          { id: 'b', text: 'To exploit your trust in internal departments', isCorrect: true, explanation: 'Attackers use authoritative-sounding names to bypass your critical thinking.', skill: 'Authority Exploitation' },
          { id: 'c', text: 'Because it is an actual IT department', isCorrect: false, explanation: 'It is a fake domain mimicking an internal department.', skill: 'Sender Authentication' },
          { id: 'd', text: 'To ensure the email is encrypted', isCorrect: false, explanation: 'Display names have nothing to do with encryption.', skill: 'Sender Authentication' }
        ]
      },
      {
        id: 'q3',
        text: 'What makes the provided URL dangerous even though it uses HTTPS?',
        options: [
          { id: 'a', text: 'It contains a token', isCorrect: false, explanation: 'Legitimate reset links use tokens.', skill: 'URL Analysis' },
          { id: 'b', text: 'It uses a generic, unregistered-looking domain (company-portal.net)', isCorrect: true, explanation: 'HTTPS only means the connection is encrypted; it does not mean the site is legitimate. The domain is generic and likely spoofed.', skill: 'Domain Spoofing Recognition' },
          { id: 'c', text: 'It does not use the .com extension', isCorrect: false, explanation: 'Many valid sites use .net.', skill: 'URL Analysis' },
          { id: 'd', text: 'It is too long', isCorrect: false, explanation: 'Length alone does not make a URL malicious.', skill: 'URL Analysis' }
        ]
      }
    ]
  },
  {
    id: 'sc3',
    title: 'Fake Delivery Notification',
    type: 'Smishing/Phishing',
    difficulty: 'Beginner',
    description: 'A fake courier alert regarding a missed package delivery.',
    introduction: 'You are expecting a package. You receive an email claiming a delivery attempt failed and you need to pay a small rescheduling fee.',
    simulatedMessage: {
      sender: '"Express Courier" <tracking@express-courier-alerts.com>',
      subject: 'Missed Delivery Attempt - Action Required',
      body: 'Dear Customer,\n\nWe attempted to deliver your package today at 10:30 AM, but no one was available. \n\nTo schedule a redelivery, a $1.99 processing fee is required. If not paid within 48 hours, the package will be returned to the sender.\n\nClick here to schedule redelivery and pay the fee.\n\nTracking Number: 1Z9999999999999999',
      url: 'http://tracking.express-courier-alerts.com/payment'
    },
    questions: [
      {
        id: 'q1',
        text: 'What is the primary psychological trigger used in this scam?',
        options: [
          { id: 'a', text: 'Curiosity about the package contents', isCorrect: false, explanation: 'While curiosity plays a role, the primary trigger is the threat of losing the package if action isn\'t taken.', skill: 'Social Engineering Tactics' },
          { id: 'b', text: 'Fear of missing out (FOMO) and the urgency of a 48-hour deadline', isCorrect: true, explanation: 'Attackers create a scenario where you must act quickly (pay a small fee) or suffer a consequence (package returned).', skill: 'Urgency Detection' },
          { id: 'c', text: 'Greed for a valuable item', isCorrect: false, explanation: 'The email does not specify what the item is.', skill: 'Social Engineering Tactics' },
          { id: 'd', text: 'Trust in the courier brand', isCorrect: false, explanation: 'While they impersonate a brand, the urgency is the main driver.', skill: 'Social Engineering Tactics' }
        ]
      },
      {
        id: 'q2',
        text: 'Why is the $1.99 fee significant?',
        options: [
          { id: 'a', text: 'It\'s a standard redelivery fee', isCorrect: false, explanation: 'Most major couriers do not charge for standard redelivery attempts.', skill: 'Financial Request Recognition' },
          { id: 'b', text: 'It covers administrative costs', isCorrect: false, explanation: 'This is a scam; the fee is a pretext.', skill: 'Financial Request Recognition' },
          { id: 'c', text: 'It is a small, believable amount used to harvest credit card details', isCorrect: true, explanation: 'Attackers ask for a small amount so victims are less likely to question it. The real goal is to capture the credit card information entered on the fake payment page.', skill: 'Credential-Request Recognition' },
          { id: 'd', text: 'It ensures the package is prioritized', isCorrect: false, explanation: 'This is a fraudulent claim.', skill: 'Financial Request Recognition' }
        ]
      },
      {
        id: 'q3',
        text: 'If you are actually expecting a package, what is the safest way to check its status?',
        options: [
          { id: 'a', text: 'Click the link in the email', isCorrect: false, explanation: 'Never click links in unexpected or suspicious emails.', skill: 'Safe Navigation' },
          { id: 'b', text: 'Reply with your address', isCorrect: false, explanation: 'Never send personal information in reply to suspicious emails.', skill: 'Data Privacy' },
          { id: 'c', text: 'Go to the official courier website and type in your tracking number', isCorrect: true, explanation: 'Always bypass the email and use the official website directly.', skill: 'Independent Verification' },
          { id: 'd', text: 'Pay the fee just in case', isCorrect: false, explanation: 'This guarantees your credit card details will be stolen.', skill: 'Financial Security' }
        ]
      }
    ]
  },
  {
    id: 'sc4',
    title: 'Prize / Reward Scam',
    type: 'Advance-fee Scam',
    difficulty: 'Beginner',
    description: 'An email claiming you have won a prize or gift card.',
    introduction: 'You receive an email claiming you have been selected as a winner for a brand new smartphone or gift card.',
    simulatedMessage: {
      sender: '"Customer Rewards" <winner@giveaway-promo-2026.net>',
      subject: 'Congratulations! You have been selected!',
      body: 'Dear Shopper,\n\nYou have been chosen as the 1st place winner in our Monthly Customer Appreciation Draw! You have won a brand new iPhone 16 Pro.\n\nTo claim your prize, simply click the link below and pay a minor $5.00 shipping and handling fee.\n\nClaim Your Prize Now: http://giveaway-promo-2026.net/claim-iphone\n\nHurry, this offer expires in 12 hours!',
      url: 'http://giveaway-promo-2026.net/claim-iphone'
    },
    questions: [
      {
        id: 'q1',
        text: 'What is the main indicator that this is a scam?',
        options: [
          { id: 'a', text: 'It was sent to your email', isCorrect: false, explanation: 'Emails are common for marketing, but not the main indicator of fraud here.', skill: 'Scam Detection' },
          { id: 'b', text: 'You are asked to pay a fee to claim a "free" prize', isCorrect: true, explanation: 'This is an advance-fee scam. Legitimate prizes do not require you to pay money to receive them.', skill: 'Financial Request Recognition' },
          { id: 'c', text: 'It is for an iPhone 16 Pro', isCorrect: false, explanation: 'While high-value items are common bait, the fee is the definitive proof.', skill: 'Scam Detection' },
          { id: 'd', text: 'The email uses exclamation marks', isCorrect: false, explanation: 'Marketing emails often use exclamation marks.', skill: 'Scam Detection' }
        ]
      },
      {
        id: 'q2',
        text: 'How does this email attempt to bypass your critical thinking?',
        options: [
          { id: 'a', text: 'By combining greed (the prize) with extreme urgency (expires in 12 hours)', isCorrect: true, explanation: 'Attackers use highly emotional states (excitement about a prize, fear of missing it) to stop you from stopping to think.', skill: 'Social Engineering Tactics' },
          { id: 'b', text: 'By using technical jargon', isCorrect: false, explanation: 'There is no technical jargon in this email.', skill: 'Social Engineering Tactics' },
          { id: 'c', text: 'By threatening legal action', isCorrect: false, explanation: 'There are no threats, only promises of a reward.', skill: 'Social Engineering Tactics' },
          { id: 'd', text: 'By pretending to be your boss', isCorrect: false, explanation: 'It pretends to be "Customer Rewards", not your boss.', skill: 'Social Engineering Tactics' }
        ]
      },
      {
        id: 'q3',
        text: 'What should you do with this email?',
        options: [
          { id: 'a', text: 'Forward it to a friend', isCorrect: false, explanation: 'Forwarding it might cause a friend to fall for the scam.', skill: 'Incident Response' },
          { id: 'b', text: 'Reply and ask for proof', isCorrect: false, explanation: 'Replying validates your email address to the spammer.', skill: 'Incident Response' },
          { id: 'c', text: 'Mark it as phishing/spam and delete it', isCorrect: true, explanation: 'Reporting helps train your email provider\'s filters, and deleting removes the threat.', skill: 'Incident Response' },
          { id: 'd', text: 'Use a prepaid card to pay the $5', isCorrect: false, explanation: 'Even with a prepaid card, you are funding a scammer and will never receive the prize.', skill: 'Financial Security' }
        ]
      }
    ]
  },
  {
    id: 'sc5',
    title: 'Job Recruitment Scam',
    type: 'Personal Information Harvesting',
    difficulty: 'Intermediate',
    description: 'A fake job offer attempting to steal PII or money.',
    introduction: 'You receive an unsolicited email offering a high-paying remote job with flexible hours. They want you to start immediately.',
    simulatedMessage: {
      sender: '"Global HR Dept" <careers@recruitment-global-network.com>',
      subject: 'Remote Data Entry Position - $45/hr - Start Immediately',
      body: 'Hello,\n\nWe found your resume online and were very impressed! We are offering you a Remote Data Entry position starting at $45/hr. You can work your own hours.\n\nTo process your hiring paperwork, please download and complete the attached PDF application. We will also need your banking details to set up direct deposit for your home office equipment stipend.\n\nAttachment: Employment_Application_Form.pdf.exe\n\nWelcome to the team!\nGlobal HR',
      url: 'Attachment: Employment_Application_Form.pdf.exe'
    },
    questions: [
      {
        id: 'q1',
        text: 'What is extremely dangerous about the attached file?',
        options: [
          { id: 'a', text: 'It has a double extension (.pdf.exe), indicating it is an executable program, not a document', isCorrect: true, explanation: 'Attackers use double extensions to trick users into thinking a malicious executable is a harmless PDF.', skill: 'Suspicious Attachment Recognition' },
          { id: 'b', text: 'It is a PDF file', isCorrect: false, explanation: 'While PDFs can be dangerous, the .exe makes this explicitly an executable.', skill: 'Suspicious Attachment Recognition' },
          { id: 'c', text: 'It is too large', isCorrect: false, explanation: 'File size is not indicated.', skill: 'Suspicious Attachment Recognition' },
          { id: 'd', text: 'It contains typos', isCorrect: false, explanation: 'The danger is the file type, not typos.', skill: 'Suspicious Attachment Recognition' }
        ]
      },
      {
        id: 'q2',
        text: 'What is a major red flag in the job offer itself?',
        options: [
          { id: 'a', text: 'It is remote', isCorrect: false, explanation: 'Many legitimate jobs are remote.', skill: 'Scam Detection' },
          { id: 'b', text: 'The pay is excessively high ($45/hr) for an entry-level "data entry" position, and it offers immediate hiring without an interview', isCorrect: true, explanation: 'Scammers offer "too good to be true" compensation to blind victims to the obvious red flags.', skill: 'Social Engineering Tactics' },
          { id: 'c', text: 'It mentions HR', isCorrect: false, explanation: 'Legitimate offers also mention HR.', skill: 'Scam Detection' },
          { id: 'd', text: 'It uses standard capitalization', isCorrect: false, explanation: 'This is not a red flag.', skill: 'Scam Detection' }
        ]
      },
      {
        id: 'q3',
        text: 'Why does the scammer ask for banking details early?',
        options: [
          { id: 'a', text: 'To perform a background check', isCorrect: false, explanation: 'Background checks do not require banking details.', skill: 'Financial Security' },
          { id: 'b', text: 'To pay the promised stipend', isCorrect: false, explanation: 'The stipend is a lie.', skill: 'Financial Security' },
          { id: 'c', text: 'To commit bank fraud, steal your money, or use your account for money laundering', isCorrect: true, explanation: 'Providing bank details to unknown entities often leads to direct financial theft or implication in a fake check scam.', skill: 'Credential-Request Recognition' },
          { id: 'd', text: 'For tax purposes', isCorrect: false, explanation: 'This is the excuse they use, not the real reason.', skill: 'Financial Security' }
        ]
      }
    ]
  },
  {
    id: 'sc6',
    title: 'Suspicious Login Alert',
    type: 'Spear Phishing',
    difficulty: 'Advanced',
    description: 'A highly targeted phishing attempt mimicking a legitimate security alert.',
    introduction: 'You receive an alert about a new login to your corporate email account from a foreign country. The email looks exactly like a standard Microsoft or Google alert.',
    simulatedMessage: {
      sender: '"Security Alerts" <no-reply@sec-alerts-microsoft.com>',
      subject: 'New sign-in from a Mac in Russia',
      body: 'Security Alert\n\nWe noticed a new sign-in to your account (user@company.com) from an unrecognized device.\n\nDetails:\nLocation: Moscow, Russia\nIP: 195.12.33.1\n\nIf this was you, you can ignore this message.\nIf this wasn\'t you, your account has been compromised. Please secure your account immediately.\n\nReport the user and secure account: https://myaccount.security-alerts.com/secure?user=company',
      url: 'https://myaccount.security-alerts.com/secure?user=company'
    },
    questions: [
      {
        id: 'q1',
        text: 'What makes this attack particularly effective?',
        options: [
          { id: 'a', text: 'It uses bad grammar to filter out smart users', isCorrect: false, explanation: 'This email actually uses good grammar and mimics a real alert.', skill: 'Social Engineering Tactics' },
          { id: 'b', text: 'It uses a realistic scenario (a foreign login) that causes immediate panic and seems highly credible', isCorrect: true, explanation: 'By simulating a real security event, the attacker leverages your natural instinct to protect your account.', skill: 'Spear Phishing Recognition' },
          { id: 'c', text: 'It includes an attachment', isCorrect: false, explanation: 'There is no attachment in this email.', skill: 'Spear Phishing Recognition' },
          { id: 'd', text: 'It asks for your password directly in the email', isCorrect: false, explanation: 'It asks you to click a link, not reply with your password.', skill: 'Spear Phishing Recognition' }
        ]
      },
      {
        id: 'q2',
        text: 'Examine the sender address: no-reply@sec-alerts-microsoft.com. What is wrong with it?',
        options: [
          { id: 'a', text: 'It contains the word "no-reply"', isCorrect: false, explanation: 'Many legitimate alerts use no-reply addresses.', skill: 'Domain Verification' },
          { id: 'b', text: 'Legitimate Microsoft alerts come from microsoft.com, not a hyphenated third-party domain', isCorrect: true, explanation: 'Attackers register domains containing brand names (like "microsoft") to trick users. Always look for the actual root domain.', skill: 'Domain Spoofing Recognition' },
          { id: 'c', text: 'It should end in .org', isCorrect: false, explanation: 'Microsoft uses .com.', skill: 'Domain Verification' },
          { id: 'd', text: 'It does not use your name', isCorrect: false, explanation: 'While true, the spoofed domain is the definitive indicator of fraud.', skill: 'Domain Verification' }
        ]
      },
      {
        id: 'q3',
        text: 'You want to check your recent login activity. What is the correct action?',
        options: [
          { id: 'a', text: 'Click the link but don\'t enter your password', isCorrect: false, explanation: 'Clicking the link could expose you to malware or track that your email is active.', skill: 'Safe Navigation' },
          { id: 'b', text: 'Reply to the email asking for more details', isCorrect: false, explanation: 'The address is fake; replying does nothing good.', skill: 'Incident Response' },
          { id: 'c', text: 'Open a new browser tab, go to your official email provider (e.g., outlook.com or gmail.com), log in, and check your security settings', isCorrect: true, explanation: 'Always independently navigate to the service to check security alerts.', skill: 'Independent Verification' },
          { id: 'd', text: 'Forward the email to the police', isCorrect: false, explanation: 'Forward it to your IT department or report it as phishing, not the police.', skill: 'Incident Response' }
        ]
      }
    ]
  }
];
