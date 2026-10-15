import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Bot, 
  Headphones, 
  ShieldCheck, 
  AlertOctagon,
  Check,
  Sparkles,
  Info,
  Volume2,
  VolumeX
} from 'lucide-react';
import type { DiagnosticResult, TroubleshootingStep } from '../types';
import { DIAGNOSTIC_OUTCOMES } from '../data/mockData';

interface Screen3GuidedTroubleshootingProps {
  answers: Record<string, string>;
  onBackToAnswers: () => void;
  onResolved: () => void;
  onEscalate: (reason: string, failedStep?: string) => void;
  onOpenAiAssistant: () => void;
  forceStepFailure?: boolean;
}

export const Screen3GuidedTroubleshooting: React.FC<Screen3GuidedTroubleshootingProps> = ({
  answers,
  onBackToAnswers,
  onResolved,
  onEscalate,
  onOpenAiAssistant,
  forceStepFailure = false
}) => {
  // Determine diagnosis based on answers
  const getDiagnosticResult = (): DiagnosticResult => {
    if (answers.error_type === 'err_payment_missing' || answers.stage === 'meta_business_manager') {
      return DIAGNOSTIC_OUTCOMES.payment_missing;
    }
    if (answers.error_type === 'err_otp_timeout' || answers.stage === 'verification_code') {
      return DIAGNOSTIC_OUTCOMES.otp_locked;
    }
    if (answers.stage === 'unknown_stage' || answers.error_type === 'err_no_code') {
      return DIAGNOSTIC_OUTCOMES.generic_uncertainty;
    }
    // Default: phone conflict (most common non-technical obstacle)
    return DIAGNOSTIC_OUTCOMES.phone_conflict;
  };

  const diagnosis = getDiagnosticResult();

  const [steps, setSteps] = useState<TroubleshootingStep[]>(diagnosis.steps);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [stepFailureState, setStepFailureState] = useState<Record<number, boolean>>(
    forceStepFailure ? { 1: true } : {}
  );
  const [isSimulatingCheck, setIsSimulatingCheck] = useState(false);

  const handleCompleteStep = (stepId: number) => {
    setIsSimulatingCheck(true);
    setTimeout(() => {
      setIsSimulatingCheck(false);
      setSteps(prev => prev.map(s => s.id === stepId ? { ...s, isCompleted: true } : s));
      
      // If last step completed, go to resolution confirmation
      if (currentStepIdx === steps.length - 1) {
        onResolved();
      } else {
        setCurrentStepIdx(prev => prev + 1);
      }
    }, 600);
  };

  const [isSpeaking, setIsSpeaking] = useState(false);

  const toggleVoiceNarration = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const currentStep = steps[currentStepIdx] || steps[0];
      const textToRead = `${diagnosis.title}. ${diagnosis.plainExplanation}. Currently on Step ${currentStepIdx + 1}: ${currentStep.title}. ${currentStep.instruction}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleStepFailed = (stepId: number) => {
    setStepFailureState(prev => ({ ...prev, [stepId]: true }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToAnswers}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change Diagnostic Answers</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Voice Narration Feature */}
          <button
            onClick={toggleVoiceNarration}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition cursor-pointer ${
              isSpeaking 
                ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                : 'text-slate-700 bg-white hover:bg-slate-50 border-slate-200'
            }`}
            title="Listen to plain-English spoken summary of this diagnosis"
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-600" /> : <Volume2 className="w-3.5 h-3.5 text-indigo-600" />}
            <span>{isSpeaking ? 'Stop Voice' : 'Listen to Voice'}</span>
          </button>

          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Ask AI Copilot for Help</span>
          </button>
          <button
            onClick={() => onEscalate(`Troubleshooting stepped back from diagnosis: ${diagnosis.title}`)}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
          >
            <Headphones className="w-3.5 h-3.5 text-slate-500" />
            <span>Escalate to Human</span>
          </button>
        </div>
      </div>

      {/* Diagnosis Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                Simulated Diagnosis Identified
              </span>
              {diagnosis.metaErrorCode && (
                <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {diagnosis.metaErrorCode}
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {diagnosis.title}
            </h1>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs text-slate-400 block">Overall Progress</span>
            <span className="text-sm font-bold text-indigo-600">
              {steps.filter(s => s.isCompleted).length} / {steps.length} Steps
            </span>
          </div>
        </div>

        {/* Plain-Language Explanation */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
          <p className="font-medium text-slate-900">
            What is causing this:
          </p>
          <p>{diagnosis.plainExplanation}</p>
          <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-1 border-t border-slate-200/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              Safe self-service resolution: Following these steps will not delete your customer contacts or harm your Meta account.
            </span>
          </div>
        </div>
      </div>

      {/* Step by Step Troubleshooting Engine */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 px-1">
          Follow These Recommended Actions
        </h2>

        {steps.map((step, idx) => {
          const isCurrent = idx === currentStepIdx;
          const isDone = step.isCompleted;
          const isFailed = stepFailureState[step.id];

          return (
            <div
              key={step.id}
              className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                isCurrent
                  ? 'border-indigo-600 shadow-md ring-1 ring-indigo-500/30'
                  : isDone
                  ? 'border-emerald-200 bg-emerald-50/20 shadow-2xs'
                  : 'border-slate-200 opacity-80'
              }`}
            >
              {/* Step Header */}
              <div className="p-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  {/* Step Status Badge */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                  </div>

                  {/* Title & Instructions */}
                  <div className="space-y-1.5">
                    <h3 className={`text-base font-bold ${isCurrent ? 'text-indigo-950' : 'text-slate-900'}`}>
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.instruction}
                    </p>

                    {/* Non-Technical Tip Box */}
                    <div className="mt-2 inline-flex items-start gap-2 p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Plain-English Tip:</strong> {step.nonTechnicalTip}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="shrink-0">
                  {isDone && (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                      Completed
                    </span>
                  )}
                  {isCurrent && !isDone && (
                    <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-1 rounded border border-indigo-200">
                      In Progress
                    </span>
                  )}
                </div>
              </div>

              {/* Step Actions (Visible when current) */}
              {isCurrent && !isDone && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleCompleteStep(step.id)}
                      disabled={isSimulatingCheck}
                      className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-2xs hover:shadow transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSimulatingCheck ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Simulating Check...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{step.actionLabel || 'I Have Done This Step'}</span>
                        </>
                      )}
                    </button>

                    {/* Edge Case 2: This step didn't work button */}
                    <button
                      onClick={() => handleStepFailed(step.id)}
                      className="w-full sm:w-auto px-3.5 py-2.5 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 hover:border-rose-300 text-xs font-medium rounded-lg transition cursor-pointer"
                    >
                      This Didn't Work For Me
                    </button>
                  </div>

                  <span className="text-[11px] text-slate-400 text-center sm:text-right">
                    Step {step.id} of {steps.length}
                  </span>
                </div>
              )}

              {/* Edge Case 2: Failure Fallback Banner */}
              {isFailed && (
                <div className="p-4 bg-rose-50 border-t border-rose-200 text-xs text-rose-900 space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-rose-950">
                    <AlertOctagon className="w-4 h-4 text-rose-600" />
                    <span>Troubleshooting Fallback: Step {step.id} Did Not Resolve the Blocker</span>
                  </div>
                  <p className="leading-relaxed">
                    If this step failed, your account may have a security 2FA pin lock configured in Meta, or your telecom carrier is blocking international SMS gateway verification.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      onClick={() => onEscalate(`Self-service troubleshooting stalled on Step ${step.id}: ${step.title}`, step.title)}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-md shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      <span>Warm Handover to Human Engineer</span>
                    </button>
                    <button
                      onClick={onOpenAiAssistant}
                      className="px-3 py-1.5 bg-white text-rose-800 border border-rose-300 hover:bg-rose-100/50 font-medium rounded-md transition cursor-pointer"
                    >
                      Ask AI Copilot for Alternative Workaround
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Disclaimer on Simulation */}
      <div className="p-4 rounded-xl bg-slate-100 text-slate-500 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            Prototype Simulation: Clicking "Mark Step Complete" advances the interactive scenario without calling Meta's production API.
          </span>
        </div>
      </div>
    </div>
  );
};
