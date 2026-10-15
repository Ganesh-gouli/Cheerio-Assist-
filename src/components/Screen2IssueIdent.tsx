import React, { useState } from 'react';
import { 
  ArrowLeft, 
  HelpCircle, 
  Sparkles, 
  ShieldAlert, 
  Headphones, 
  ChevronRight,
  Info
} from 'lucide-react';
import { WHATSAPP_DIAGNOSTIC_QUESTIONS } from '../data/mockData';

interface Screen2IssueIdentProps {
  onBack: () => void;
  onCompleteDiagnostics: (answers: Record<string, string>) => void;
  onDirectEscalate: (reason?: string) => void;
  initialAnswers?: Record<string, string>;
  preselectedJargon?: boolean;
}

export const Screen2IssueIdent: React.FC<Screen2IssueIdentProps> = ({
  onBack,
  onCompleteDiagnostics,
  onDirectEscalate,
  initialAnswers = {},
  preselectedJargon = false
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({
    stage: 'phone_registered',
    phone_status: 'active_personal',
    error_type: 'err_number_in_use',
    ...initialAnswers
  });
  const [showJargonExplainer, setShowJargonExplainer] = useState(preselectedJargon);

  const questions = WHATSAPP_DIAGNOSTIC_QUESTIONS;
  const currentQuestion = questions[currentStepIndex];

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleNext = () => {
    if (currentStepIndex < questions.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Completed all questions
      onCompleteDiagnostics(selectedAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const isCurrentAnswered = !!selectedAnswers[currentQuestion.id];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentStepIndex === 0 ? 'Back to Support Home' : 'Previous Question'}</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
            Diagnostic Step {currentStepIndex + 1} of {questions.length}
          </span>
          <button
            onClick={() => onDirectEscalate('User requested direct escalation during diagnostic questionnaire')}
            className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
            title="Skip questionnaire and talk to a human specialist"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Skip to Human Agent</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-indigo-600 h-full transition-all duration-300 ease-out"
          style={{ width: `${((currentStepIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Diagnostic Card Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="p-6 sm:p-7 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                WhatsApp Connection Diagnostic
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {currentQuestion.question}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {currentQuestion.subtext}
              </p>
            </div>
            
            {/* Jargon Helper Trigger (Edge Case 1) */}
            {currentQuestion.jargonHelper && (
              <button
                onClick={() => setShowJargonExplainer(!showJargonExplainer)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition shrink-0 cursor-pointer ${
                  showJargonExplainer
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span className="font-semibold">Explain in Simple Terms</span>
              </button>
            )}
          </div>

          {/* Jargon Explainer Box (Edge Case 1) */}
          {showJargonExplainer && currentQuestion.jargonHelper && (
            <div className="mt-4 p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs animate-fadeIn space-y-1">
              <div className="flex items-center justify-between font-bold text-amber-950">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Plain-English Concept: {currentQuestion.jargonHelper.term}
                </span>
                <button
                  onClick={() => setShowJargonExplainer(false)}
                  className="text-amber-700 hover:text-amber-900 text-[11px] font-normal cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
              <p className="leading-relaxed">
                {currentQuestion.jargonHelper.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Options List */}
        <div className="p-6 sm:p-7 space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswers[currentQuestion.id] === option.id;
            return (
              <div
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={`p-4 rounded-xl border text-left transition cursor-pointer flex items-start gap-4 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600/40'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                {/* Radio Circle */}
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                  isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 bg-white'
                }`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>

                {/* Option Content */}
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-sm font-semibold ${isSelected ? 'text-indigo-950' : 'text-slate-800'}`}>
                      {option.label}
                    </span>
                    {option.isMostCommon && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                        Typical Non-Technical Setup
                      </span>
                    )}
                    {option.triggersUncertainty && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">
                        Uncertainty Fallback
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {option.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Card Footer Actions */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Click any choice to proceed. You can change answers anytime.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleNext}
              disabled={!isCurrentAnswered}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                isCurrentAnswered
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{currentStepIndex === questions.length - 1 ? 'Analyze & View Diagnosis' : 'Next Question'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Non-Technical Reassurance Notice */}
      <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0" />
          <span>
            Don't worry if you don't know technical terms — Cheerio Assist automatically handles API keys and server handshakes.
          </span>
        </div>
      </div>
    </div>
  );
};
