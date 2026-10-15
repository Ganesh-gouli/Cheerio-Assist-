import { useState } from 'react';
import type { ScreenId, IssueCategory } from './types';
import { Header } from './components/Header';
import { ReviewerPanel } from './components/ReviewerPanel';
import { Screen1Home } from './components/Screen1Home';
import { Screen2IssueIdent } from './components/Screen2IssueIdent';
import { Screen3GuidedTroubleshooting } from './components/Screen3GuidedTroubleshooting';
import { Screen4AiAssistant } from './components/Screen4AiAssistant';
import { Screen5Resolution } from './components/Screen5Resolution';
import { Screen6Escalation } from './components/Screen6Escalation';
import { ScreenTemplateLinter } from './components/ScreenTemplateLinter';
import { ScreenFlowDebugger } from './components/ScreenFlowDebugger';
import { ScreenIntegrationHealth } from './components/ScreenIntegrationHealth';

export function App() {
  const queryParam = typeof window !== 'undefined' ? (new URLSearchParams(window.location.search).get('screen') as ScreenId) : null;
  const validScreens: ScreenId[] = ['home', 'identify', 'troubleshoot', 'ai_assistant', 'resolution', 'escalation', 'template_linter', 'flow_debugger', 'integration_health'];
  const initialScreen: ScreenId = queryParam && validScreens.includes(queryParam) ? queryParam : 'home';
  
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(initialScreen);
  const [isReviewerPanelOpen, setIsReviewerPanelOpen] = useState(false);
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<string, string>>({
    stage: 'phone_registered',
    phone_status: 'active_personal',
    error_type: 'err_number_in_use'
  });
  
  // Edge Case Flags
  const [preselectedJargon, setPreselectedJargon] = useState(false);
  const [forceStepFailure, setForceStepFailure] = useState(false);

  // Escalation state
  const [escalationContext, setEscalationContext] = useState({
    reason: 'Initial setup roadblock encountered',
    attemptedSteps: [
      'Started WhatsApp Cloud API Onboarding',
      'Tested mobile phone registration status'
    ],
    errorCode: 'Meta 133010 (Phone Number in Use)',
    userNotes: ''
  });

  const handleReset = () => {
    setCurrentScreen('home');
    setPreselectedJargon(false);
    setForceStepFailure(false);
    setDiagnosticAnswers({
      stage: 'phone_registered',
      phone_status: 'active_personal',
      error_type: 'err_number_in_use'
    });
    setEscalationContext({
      reason: 'Initial setup roadblock encountered',
      attemptedSteps: [
        'Started WhatsApp Cloud API Onboarding',
        'Tested mobile phone registration status'
      ],
      errorCode: 'Meta 133010 (Phone Number in Use)',
      userNotes: ''
    });
  };

  const handleSelectCategory = (category: IssueCategory) => {
    if (category === 'whatsapp_api') {
      setCurrentScreen('identify');
    } else if (category === 'templates') {
      setCurrentScreen('template_linter');
    } else if (category === 'chatbot') {
      setCurrentScreen('flow_debugger');
    } else if (category === 'integrations') {
      setCurrentScreen('integration_health');
    } else {
      setCurrentScreen('identify');
    }
  };

  const handleCompleteDiagnostics = (answers: Record<string, string>) => {
    setDiagnosticAnswers(answers);
    setCurrentScreen('troubleshoot');
  };

  const handleEscalate = (reason: string, failedStep?: string) => {
    const updatedSteps = [...escalationContext.attemptedSteps];
    if (failedStep) {
      updatedSteps.push(`Attempted and failed on: ${failedStep}`);
    }
    setEscalationContext(prev => ({
      ...prev,
      reason: reason || 'Self-service diagnostic recommended human specialist intervention',
      attemptedSteps: updatedSteps
    }));
    setCurrentScreen('escalation');
  };

  const handleDirectEscalate = (reason?: string) => {
    setEscalationContext(prev => ({
      ...prev,
      reason: reason || 'User requested immediate human onboarding assistance from support home'
    }));
    setCurrentScreen('escalation');
  };

  // Reviewer Edge Case Shortcuts
  const handleTriggerEdgeCase = (edgeCaseId: string) => {
    switch (edgeCaseId) {
      case 'edge_jargon':
        setPreselectedJargon(true);
        setCurrentScreen('identify');
        break;

      case 'edge_step_failed':
        setForceStepFailure(true);
        setCurrentScreen('troubleshoot');
        break;

      case 'edge_incomplete_info':
        setDiagnosticAnswers({
          stage: 'unknown_stage',
          phone_status: 'clean_number',
          error_type: 'err_no_code'
        });
        setCurrentScreen('troubleshoot');
        break;

      case 'edge_immediate_human':
        handleDirectEscalate('User selected instant human escalation bypass');
        break;

      case 'edge_security_billing':
        setCurrentScreen('ai_assistant');
        break;

      case 'edge_unresolved_after_completion':
        handleEscalate(
          'User completed all 3 recommended steps, but WhatsApp API connection is still rejected by Meta servers.',
          'Post-Resolution Verification Check'
        );
        break;

      default:
        break;
    }
    setIsReviewerPanelOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Universal Sticky Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        onReset={handleReset}
        onToggleReviewerPanel={() => setIsReviewerPanelOpen(!isReviewerPanelOpen)}
        isReviewerPanelOpen={isReviewerPanelOpen}
      />

      {/* Slide-out Reviewer / Evaluator Drawer */}
      <ReviewerPanel
        isOpen={isReviewerPanelOpen}
        onClose={() => setIsReviewerPanelOpen(false)}
        onNavigate={(screen) => setCurrentScreen(screen)}
        onTriggerEdgeCase={handleTriggerEdgeCase}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 pb-16">
        {currentScreen === 'home' && (
          <Screen1Home
            onSelectCategory={handleSelectCategory}
            onDirectEscalate={() => handleDirectEscalate()}
            onOpenAiAssistant={() => setCurrentScreen('ai_assistant')}
          />
        )}

        {currentScreen === 'identify' && (
          <Screen2IssueIdent
            onBack={() => setCurrentScreen('home')}
            onCompleteDiagnostics={handleCompleteDiagnostics}
            onDirectEscalate={(reason) => handleDirectEscalate(reason)}
            initialAnswers={diagnosticAnswers}
            preselectedJargon={preselectedJargon}
          />
        )}

        {currentScreen === 'troubleshoot' && (
          <Screen3GuidedTroubleshooting
            answers={diagnosticAnswers}
            onBackToAnswers={() => setCurrentScreen('identify')}
            onResolved={() => setCurrentScreen('resolution')}
            onEscalate={handleEscalate}
            onOpenAiAssistant={() => setCurrentScreen('ai_assistant')}
            forceStepFailure={forceStepFailure}
          />
        )}

        {currentScreen === 'template_linter' && (
          <ScreenTemplateLinter
            onBackToHome={() => setCurrentScreen('home')}
            onResolved={() => setCurrentScreen('resolution')}
            onEscalate={(reason) => handleEscalate(reason, 'Template Compliance Linter')}
          />
        )}

        {currentScreen === 'flow_debugger' && (
          <ScreenFlowDebugger
            onBackToHome={() => setCurrentScreen('home')}
            onResolved={() => setCurrentScreen('resolution')}
            onEscalate={(reason) => handleEscalate(reason, 'Chatbot Flow Loop Debugger')}
          />
        )}

        {currentScreen === 'integration_health' && (
          <ScreenIntegrationHealth
            onBackToHome={() => setCurrentScreen('home')}
            onResolved={() => setCurrentScreen('resolution')}
            onEscalate={(reason) => handleEscalate(reason, 'Shopify Integration Diagnostic')}
          />
        )}

        {currentScreen === 'ai_assistant' && (
          <Screen4AiAssistant
            onBackToTroubleshooting={() => setCurrentScreen('troubleshoot')}
            onProceedToResolution={() => setCurrentScreen('resolution')}
            onEscalate={handleEscalate}
          />
        )}

        {currentScreen === 'resolution' && (
          <Screen5Resolution
            onRestart={handleReset}
            onGoHome={() => setCurrentScreen('home')}
            onReopenTroubleshooting={() => setCurrentScreen('troubleshoot')}
            onEscalatePersistent={() => handleEscalate(
              'User indicated issue is still unresolved after completing all guided steps',
              'Post-resolution verification check'
            )}
          />
        )}

        {currentScreen === 'escalation' && (
          <Screen6Escalation
            reason={escalationContext.reason}
            attemptedSteps={escalationContext.attemptedSteps}
            errorCode={escalationContext.errorCode}
            userNotes={escalationContext.userNotes}
            onGoHome={() => setCurrentScreen('home')}
            onRestart={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Cheerio Assist Copilot</span>
            <span>•</span>
            <span>Product Intern Take-Home Prototype</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>Clean Architecture</span>
            <span>Zero Hallucination Guardrails</span>
            <span>Warm Human State Transfer</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
