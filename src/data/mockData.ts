import type { UserPersona, DiagnosticResult } from '../types';

export const DEFAULT_USER: UserPersona = {
  name: "Elena Rostova",
  role: "Founder & Operations Owner",
  businessName: "FreshBake Artisan Pantry",
  businessType: "Bakery & Gourmet Food Delivery",
  plan: "Cheerio Growth Tier",
  technicalComfort: "Beginner"
};

export interface DiagnosticQuestion {
  id: string;
  question: string;
  subtext: string;
  jargonHelper?: {
    term: string;
    explanation: string;
  };
  options: {
    id: string;
    label: string;
    description: string;
    isMostCommon?: boolean;
    triggersUncertainty?: boolean;
  }[];
}

export const WHATSAPP_DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'stage',
    question: 'Where did you get stuck in the WhatsApp setup?',
    subtext: 'Pick the option that best describes what you see right now.',
    options: [
      {
        id: 'phone_registered',
        label: 'I entered my business phone number, but got an error',
        description: 'Cheerio says the number cannot be registered or is already in use.',
        isMostCommon: true
      },
      {
        id: 'verification_code',
        label: 'I did not receive the 6-digit SMS verification code',
        description: 'Waiting for the text message or phone call to verify ownership.',
      },
      {
        id: 'meta_business_manager',
        label: 'Meta / Facebook says Business Verification is required',
        description: 'Prompted to upload business registration documents to Meta.',
      },
      {
        id: 'stuck_webhook',
        label: 'Setup shows "Connected", but test messages fail to send',
        description: 'Cheerio indicates active status, but WhatsApp messages do not arrive.',
      },
      {
        id: 'unknown_stage',
        label: "I'm not sure — I just see a generic connection failure",
        description: 'You see an error banner without clear explanation.',
        triggersUncertainty: true
      }
    ]
  },
  {
    id: 'phone_status',
    question: 'Is this phone number currently active on a smartphone?',
    subtext: 'Meta has strict rules about where a single phone number can live.',
    jargonHelper: {
      term: 'Cloud API vs. Mobile App',
      explanation: 'Meta only lets a number exist in ONE place: either on your regular phone WhatsApp app, OR through the automated Cloud API (Cheerio). It cannot do both simultaneously.'
    },
    options: [
      {
        id: 'active_personal',
        label: 'Yes, it is currently running on regular personal WhatsApp',
        description: 'The number is signed in on a physical iPhone or Android device.',
        isMostCommon: true
      },
      {
        id: 'active_business_app',
        label: 'Yes, it is on the free WhatsApp Business app on my phone',
        description: 'You have catalogs or quick replies configured on your phone.',
      },
      {
        id: 'clean_number',
        label: 'No, it is a brand new SIM or unused phone number',
        description: 'The number has never been registered on WhatsApp or was deleted.',
      },
      {
        id: 'landline',
        label: 'It is an office landline or virtual VoIP number',
        description: 'You receive voice calls on this number, not SMS.',
      }
    ]
  },
  {
    id: 'error_type',
    question: 'What specific notification or symptom appeared?',
    subtext: 'This helps our diagnostic engine pinpoint the exact Meta Cloud API conflict.',
    jargonHelper: {
      term: 'Meta Error Codes',
      explanation: 'Meta uses numbers like (133010) to categorize permission, phone, or billing checks. You don\'t need to memorize them — we translate them into plain English.'
    },
    options: [
      {
        id: 'err_number_in_use',
        label: '"Phone number already registered" or Error 133010',
        description: 'Meta blocked registration because the mobile session is still active.',
        isMostCommon: true
      },
      {
        id: 'err_payment_missing',
        label: '"Missing Payment Method" or Error 131031',
        description: 'Meta requires a credit card on file in Meta Business Manager for conversation fees.',
      },
      {
        id: 'err_otp_timeout',
        label: '"Too many attempts" or SMS countdown timer expired',
        description: 'Requesting verification codes too quickly locked the number for 1-4 hours.',
      },
      {
        id: 'err_no_code',
        label: 'No error code — just a red banner saying "Connection Failed"',
        description: 'Generic network or token handoff issue.',
        triggersUncertainty: true
      }
    ]
  }
];

export const DIAGNOSTIC_OUTCOMES: Record<string, DiagnosticResult> = {
  phone_conflict: {
    id: 'diag_phone_conflict',
    title: 'Phone Number Active on Mobile WhatsApp App',
    severity: 'blocker',
    metaErrorCode: 'Meta Error 133010 (Phone Number In Use)',
    plainExplanation:
      'Meta does not permit a single phone number to be logged into a physical smartphone app and the Cheerio Cloud API at the same time. Because this number is still active on your phone, Meta’s servers rejected Cheerio’s connection request.',
    likelyRootCause: 'Active mobile session locks the number from being claimed by Meta Cloud API.',
    steps: [
      {
        id: 1,
        title: 'Step 1: Backup your chat history (Crucial Safeguard)',
        instruction: 'Open WhatsApp on your phone → Settings → Chats → Chat Backup → Tap "Back Up Now". This ensures you don\'t lose existing customer conversations.',
        nonTechnicalTip: 'Do not skip this! Once we detach the number, your messages remain safe in Google Drive or iCloud.',
        actionLabel: 'Mark Backup Complete',
        actionType: 'check',
        isCompleted: false
      },
      {
        id: 2,
        title: 'Step 2: Delete the WhatsApp account from the mobile app',
        instruction: 'In your mobile WhatsApp app, go to Settings → Account → "Delete My Account" (or "Deregister"). This releases the number from Meta\'s mobile server so Cheerio can register it.',
        nonTechnicalTip: 'Note: Simply uninstalling the app is NOT enough. You must tap "Delete Account" inside the app settings to release Meta’s registration lock.',
        actionLabel: 'Confirm Account Deleted on Phone',
        actionType: 'check',
        isCompleted: false
      },
      {
        id: 3,
        title: 'Step 3: Trigger 6-Digit SMS Verification in Cheerio',
        instruction: 'Click the button below to re-send the 6-digit verification SMS from Cheerio. Enter the code once it arrives on your SIM.',
        nonTechnicalTip: 'Ensure your phone has cellular network signal to receive standard SMS text messages.',
        actionLabel: 'Simulate Code Request & Verify',
        actionType: 'check',
        isCompleted: false
      }
    ]
  },

  payment_missing: {
    id: 'diag_payment_missing',
    title: 'Missing Payment Method in Meta Business Manager',
    severity: 'blocker',
    metaErrorCode: 'Meta Error 131031 (Account Payment Pending)',
    plainExplanation:
      'While Cheerio provides its platform, Meta charges small per-conversation fees for WhatsApp Business Cloud API. Meta requires a valid credit/debit card on file in your Meta Business Suite before activating outgoing messages.',
    likelyRootCause: 'Meta Business Account has no payment card attached to WhatsApp Account (WABA).',
    steps: [
      {
        id: 1,
        title: 'Step 1: Access Meta Business Suite Billing Settings',
        instruction: 'Go to business.facebook.com/billing and ensure you are in your verified Business Portfolio.',
        nonTechnicalTip: 'Make sure you log in with the Facebook account that has "Admin" rights to your business page.',
        actionLabel: 'Open Meta Billing Portal (Simulated)',
        actionType: 'external_link',
        actionPayload: 'https://business.facebook.com/billing',
        isCompleted: false
      },
      {
        id: 2,
        title: 'Step 2: Add payment method to WhatsApp Business Account',
        instruction: 'Under Billing & Payments → Payment Methods → Add Payment Method. Attach a commercial credit or debit card enabled for international transactions.',
        nonTechnicalTip: 'Meta puts a temporary $1 hold to verify card validity, which is refunded immediately.',
        actionLabel: 'Card Added in Meta',
        actionType: 'check',
        isCompleted: false
      },
      {
        id: 3,
        title: 'Step 3: Sync Payment Status in Cheerio',
        instruction: 'Return to Cheerio and press "Check Payment Status" to refresh the Meta WABA permission token.',
        nonTechnicalTip: 'This automatically confirms your account tier with Meta Cloud servers.',
        actionLabel: 'Refresh Cheerio Connection',
        actionType: 'check',
        isCompleted: false
      }
    ]
  },

  otp_locked: {
    id: 'diag_otp_locked',
    title: 'Temporary SMS Verification Rate Limit Lock',
    severity: 'warning',
    metaErrorCode: 'Meta Security Threshold (Cooldown Active)',
    plainExplanation:
      'Meta\'s automated security system locks SMS verification if more than 3 codes are requested within 10 minutes. This prevents brute-force attacks on your phone number.',
    likelyRootCause: 'Multiple rapid OTP attempts triggered Meta telecom rate limits.',
    steps: [
      {
        id: 1,
        title: 'Step 1: Observe the 60-Minute Cooldown Window',
        instruction: 'Do not click "Resend Code" repeatedly. Meta resets the security lock automatically after 60 minutes.',
        nonTechnicalTip: 'Trying again immediately resets the cooldown timer back to zero. Please leave it untouched for 1 hour.',
        actionLabel: 'Acknowledge Cooldown Window',
        actionType: 'check',
        isCompleted: false
      },
      {
        id: 2,
        title: 'Step 2: Choose "Voice Call Verification" as Fallback',
        instruction: 'When the timer expires, select "Call Me with Code" instead of "Send SMS". Telecom carriers rarely block voice calls compared to automated SMS gateways.',
        nonTechnicalTip: 'Keep your phone off silent mode so you don\'t miss the automated automated audio reading the 6 digits.',
        actionLabel: 'Select Voice Call Fallback',
        actionType: 'check',
        isCompleted: false
      }
    ]
  },

  generic_uncertainty: {
    id: 'diag_generic_uncertainty',
    title: 'Unverified Meta Configuration State',
    severity: 'warning',
    metaErrorCode: 'Ambiguous Diagnostic State',
    plainExplanation:
      'Our automated diagnostics cannot safely pinpoint the exact block without risking an incorrect change to your live business settings. This typically happens when Meta permissions are partially granted or your Facebook login session timed out.',
    likelyRootCause: 'OAuth token handshake interrupted or partial Business Suite access permissions.',
    steps: [
      {
        id: 1,
        title: 'Step 1: Refresh Meta OAuth Authorization',
        instruction: 'Log out of Cheerio, clear browser cache, and reconnect via "Log in with Facebook" ensuring all permissions (Manage WhatsApp Accounts, Read Business Profile) are checked.',
        nonTechnicalTip: 'Unchecking even one permission box during Facebook login will cause this silent failure.',
        actionLabel: 'Re-authenticate Facebook Login',
        actionType: 'check',
        isCompleted: false
      },
      {
        id: 2,
        title: 'Step 2: Request Cheerio Onboarding Specialist Review',
        instruction: 'Because this issue is account-specific, our human engineering team can inspect the raw Meta Cloud API handshake logs safely without risking your number.',
        nonTechnicalTip: 'We pre-fill your exact attempted steps and system logs so you don\'t have to repeat yourself.',
        actionLabel: 'Escalate to Cheerio Support Engineer',
        actionType: 'check',
        isCompleted: false
      }
    ]
  }
};

export const AI_KNOWLEDGE_BASE: {
  keywords: string[];
  response: string;
  category: string;
  confidence: number;
  triggerEscalation?: boolean;
}[] = [
  {
    keywords: ['lose', 'chat', 'history', 'delete', 'backup', 'messages', 'customer chats'],
    category: 'Data Safety',
    confidence: 0.98,
    response:
      "Great question! If you perform a chat backup (Settings → Chats → Chat Backup) before deleting your mobile WhatsApp account, your historical conversations remain securely saved in your personal iCloud or Google Drive. However, your past chats will NOT automatically appear inside Cheerio — Cheerio will manage all new incoming and outgoing customer messages starting from the moment the Cloud API is connected."
  },
  {
    keywords: ['waba', 'business manager', 'id', 'what is waba', 'find id'],
    category: 'Meta Definitions',
    confidence: 0.95,
    response:
      "A 'WABA' stands for WhatsApp Business Account. Think of it like your digital storefront license with Meta. You don't need to manually hunt for the ID number — when you click 'Connect WhatsApp' inside Cheerio, Meta opens an official popup window that automatically links your WABA to Cheerio with your permission."
  },
  {
    keywords: ['landline', 'toll free', 'office number', 'voip', 'virtual'],
    category: 'Hardware & Number Support',
    confidence: 0.94,
    response:
      "Yes, you can absolutely use an office landline or virtual number for Cheerio WhatsApp API! During verification, simply select 'Verify via Phone Call' instead of SMS. Meta's automated system will call your landline and speak the 6-digit confirmation code aloud."
  },
  {
    keywords: ['credit card', 'price', 'pricing', 'cost', 'fee', 'free', 'bill', 'meta charge'],
    category: 'Billing Policy',
    confidence: 0.92,
    response:
      "Meta provides 1,000 free Service (customer-initiated) conversations each month. For Marketing or Utility broadcast messages, Meta charges standard small per-conversation fees (typically fractions of a cent, depending on your recipient's country). Adding a credit card in Meta Business Suite ensures your campaigns don't pause when you exceed free thresholds."
  },
  {
    keywords: ['template', 'rejected', 'approval', 'meta reject', 'policy'],
    category: 'Template Guidelines',
    confidence: 0.91,
    response:
      "Meta automatically rejects templates for 3 main reasons: 1) Using promotional words (like '50% off!') inside a template categorized as 'Utility', 2) Having empty variable placeholders like {{1}} without providing sample preview text, or 3) Grammar and excessive punctuation (like 'BUY NOW!!!!!'). In Cheerio's Template Builder, our pre-check tool warns you about these before you submit to Meta."
  },
  {
    keywords: ['human', 'agent', 'person', 'representative', 'talk to human', 'escalate', 'support person', 'help me please'],
    category: 'Escalation Intent',
    confidence: 1.0,
    triggerEscalation: true,
    response:
      "I understand you'd prefer to speak directly with our support team. I can transfer you immediately to a human specialist. All the details and diagnostics from this session will be attached to your ticket so you won't have to repeat yourself."
  },
  {
    keywords: ['refund', 'charged', 'chargeback', 'unauthorized', 'credit card leak', 'hacked', 'security'],
    category: 'Security & Finance Guardrail',
    confidence: 1.0,
    triggerEscalation: true,
    response:
      "For your protection, billing disputes and account security issues are handled exclusively by Cheerio Senior Account Specialists. I am preparing a priority human escalation for your account right now."
  }
];

export const RECENT_SUPPORT_HISTORY = [
  {
    id: "CH-8821",
    date: "2 days ago",
    topic: "Shopify Abandoned Cart Trigger Setup",
    status: "Resolved",
    duration: "Self-service guide (6 min)",
    rating: "5/5"
  },
  {
    id: "CH-8419",
    date: "1 week ago",
    topic: "Order Confirmation Template Submission",
    status: "Resolved",
    duration: "AI Copilot suggested edit",
    rating: "4/5"
  }
];
