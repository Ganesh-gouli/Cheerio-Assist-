export type ScreenId = 
  | 'home' 
  | 'identify' 
  | 'troubleshoot' 
  | 'ai_assistant' 
  | 'resolution' 
  | 'escalation'
  | 'template_linter'
  | 'flow_debugger'
  | 'integration_health';

export type IssueCategory = 'whatsapp_api' | 'templates' | 'chatbot' | 'integrations' | 'billing';

export interface DiagnosticAnswer {
  questionId: string;
  selectedOptionId: string;
  label: string;
}

export interface TroubleshootingStep {
  id: number;
  title: string;
  instruction: string;
  nonTechnicalTip: string;
  actionLabel?: string;
  actionType?: 'copy' | 'check' | 'external_link' | 'guide';
  actionPayload?: string;
  isCompleted: boolean;
}

export interface DiagnosticResult {
  id: string;
  title: string;
  severity: 'blocker' | 'warning' | 'info';
  plainExplanation: string;
  likelyRootCause: string;
  metaErrorCode?: string;
  steps: TroubleshootingStep[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  isSimulated?: boolean;
  confidenceScore?: number;
  suggestedActions?: {
    label: string;
    action: () => void;
  }[];
}

export interface EscalationTicket {
  ticketId: string;
  createdAt: string;
  issueCategory: string;
  escalationReason: string;
  businessName: string;
  contactEmail: string;
  attemptedSteps: string[];
  errorCode?: string;
  userNotes?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  estimatedResponseTime: string;
  isSimulated: boolean;
}

export interface UserPersona {
  name: string;
  role: string;
  businessName: string;
  businessType: string;
  plan: string;
  technicalComfort: 'Beginner' | 'Intermediate';
}
