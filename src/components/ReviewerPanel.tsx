import React from 'react';
import { 
  X, 
  Lightbulb, 
  ShieldCheck, 
  Target, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import type { ScreenId } from '../types';

interface ReviewerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenId) => void;
  onTriggerEdgeCase: (edgeCaseId: string) => void;
}

export const ReviewerPanel: React.FC<ReviewerPanelProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onTriggerEdgeCase
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col transform transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Product Intern Rationale</h3>
            <p className="text-xs text-slate-400">Design Decisions & Edge Case Tester</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-md transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700">
        {/* Core Product Strategy Note */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center gap-2 text-indigo-900 font-semibold text-xs uppercase tracking-wider">
            <Target className="w-4 h-4 text-indigo-600" />
            <span>Why Hybrid Over Pure Chatbot?</span>
          </div>
          <p className="text-xs text-indigo-900/90 leading-relaxed">
            Non-technical business owners often don’t know <em>what</em> to ask in an open chat prompt (the “blank canvas problem”). Pure chatbots hallucinate technical steps or demand developer jargon. 
            <strong> Cheerio Assist</strong> uses a <em>3-tier hybrid strategy</em>:
          </p>
          <ul className="text-xs text-indigo-950 space-y-1 list-disc list-inside">
            <li><strong>Tier 1: Structured Diagnostic Tree</strong> (Fastest, zero hallucination)</li>
            <li><strong>Tier 2: Plain-Language AI Copilot</strong> (Explains concepts & edge cases)</li>
            <li><strong>Tier 3: Warm Human Escalation</strong> (Transfers state; no repeat answers)</li>
          </ul>
        </div>

        {/* 6 Mandatory Edge Cases Tester */}
        <div className="space-y-3">
          <h4 className="font-semibold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Test Edge Cases (Click to Test)</span>
          </h4>

          <div className="space-y-2">
            <button
              onClick={() => onTriggerEdgeCase('edge_jargon')}
              className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition flex items-start justify-between gap-2 group cursor-pointer"
            >
              <div>
                <span className="font-medium text-xs text-slate-900 block group-hover:text-indigo-600">
                  1. User confused by technical jargon
                </span>
                <span className="text-[11px] text-slate-500">
                  Opens plain-English explainer tooltips for terms like "Cloud API" vs "Mobile App".
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 shrink-0 mt-0.5" />
            </button>

            <button
              onClick={() => onTriggerEdgeCase('edge_step_failed')}
              className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition flex items-start justify-between gap-2 group cursor-pointer"
            >
              <div>
                <span className="font-medium text-xs text-slate-900 block group-hover:text-indigo-600">
                  2. Recommended step does not work
                </span>
                <span className="text-[11px] text-slate-500">
                  User clicks "This step didn't fix it" → reveals alternative fallback checks.
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 shrink-0 mt-0.5" />
            </button>

            <button
              onClick={() => onTriggerEdgeCase('edge_incomplete_info')}
              className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition flex items-start justify-between gap-2 group cursor-pointer"
            >
              <div>
                <span className="font-medium text-xs text-slate-900 block group-hover:text-indigo-600">
                  3. Incomplete / Ambiguous information
                </span>
                <span className="text-[11px] text-slate-500">
                  User selects "I don't know" → triggers Safe Uncertainty Mode instead of guessing.
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 shrink-0 mt-0.5" />
            </button>

            <button
              onClick={() => onTriggerEdgeCase('edge_immediate_human')}
              className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition flex items-start justify-between gap-2 group cursor-pointer"
            >
              <div>
                <span className="font-medium text-xs text-slate-900 block group-hover:text-indigo-600">
                  4. User wants human immediately
                </span>
                <span className="text-[11px] text-slate-500">
                  Instant escalation bypass without forcing user through multi-step questions.
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 shrink-0 mt-0.5" />
            </button>

            <button
              onClick={() => onTriggerEdgeCase('edge_security_billing')}
              className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition flex items-start justify-between gap-2 group cursor-pointer"
            >
              <div>
                <span className="font-medium text-xs text-slate-900 block group-hover:text-indigo-600">
                  5. Account-specific / Billing guardrail
                </span>
                <span className="text-[11px] text-slate-500">
                  AI detects sensitive billing/auth keywords and triggers priority specialist review.
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 shrink-0 mt-0.5" />
            </button>

            <button
              onClick={() => onTriggerEdgeCase('edge_unresolved_after_completion')}
              className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition flex items-start justify-between gap-2 group cursor-pointer"
            >
              <div>
                <span className="font-medium text-xs text-slate-900 block group-hover:text-indigo-600">
                  6. Flow completed but issue persists
                </span>
                <span className="text-[11px] text-slate-500">
                  User rates "Didn't work" on confirmation screen → smooth transition to warm ticket.
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 shrink-0 mt-0.5" />
            </button>
          </div>
        </div>

        {/* Quick Screen Jump Links */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <span className="text-xs font-semibold text-slate-600 block">Quick Navigation & Tool Modules:</span>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <button onClick={() => { onNavigate('home'); onClose(); }} className="p-1.5 text-left bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 cursor-pointer">1. Support Home</button>
            <button onClick={() => { onNavigate('identify'); onClose(); }} className="p-1.5 text-left bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 cursor-pointer">2. Diagnostic</button>
            <button onClick={() => { onNavigate('troubleshoot'); onClose(); }} className="p-1.5 text-left bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 cursor-pointer">3. Guided Fix</button>
            <button onClick={() => { onNavigate('ai_assistant'); onClose(); }} className="p-1.5 text-left bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 cursor-pointer">4. AI Copilot</button>
            <button onClick={() => { onNavigate('template_linter'); onClose(); }} className="p-1.5 text-left bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded border border-emerald-200 cursor-pointer font-medium">✨ Template Linter</button>
            <button onClick={() => { onNavigate('flow_debugger'); onClose(); }} className="p-1.5 text-left bg-amber-50 hover:bg-amber-100 text-amber-900 rounded border border-amber-200 cursor-pointer font-medium">✨ Flow Debugger</button>
            <button onClick={() => { onNavigate('integration_health'); onClose(); }} className="p-1.5 text-left bg-purple-50 hover:bg-purple-100 text-purple-900 rounded border border-purple-200 cursor-pointer font-medium">✨ Integrations</button>
            <button onClick={() => { onNavigate('escalation'); onClose(); }} className="p-1.5 text-left bg-rose-50 hover:bg-rose-100 text-rose-900 rounded border border-rose-200 cursor-pointer font-medium">6. Escalation</button>
          </div>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 space-y-1">
          <div className="font-semibold flex items-center gap-1">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Academic & Evaluation Transparency</span>
          </div>
          <p>
            This prototype simulates diagnostic API checks and uses client-side natural language processing. No actual customer WhatsApp account is touched or modified.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-medium rounded-lg transition cursor-pointer"
        >
          Close Drawer
        </button>
      </div>
    </div>
  );
};
