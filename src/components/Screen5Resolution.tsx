import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  RotateCcw, 
  MessageSquare, 
  Sparkles, 
  FileText, 
  ShieldCheck,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { DEFAULT_USER } from '../data/mockData';

interface Screen5ResolutionProps {
  onRestart: () => void;
  onGoHome: () => void;
  onReopenTroubleshooting: () => void;
  onEscalatePersistent: () => void;
}

export const Screen5Resolution: React.FC<Screen5ResolutionProps> = ({
  onRestart,
  onGoHome,
  onReopenTroubleshooting,
  onEscalatePersistent
}) => {
  const [feedbackRating, setFeedbackRating] = useState<'yes' | 'partial' | 'no' | null>(null);
  const [starRating, setStarRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedFeedback(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Success Celebration Card */}
      <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm p-6 sm:p-8 text-center space-y-4 relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Simulated Setup Complete
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            WhatsApp Business API Ready to Send
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Congratulations {DEFAULT_USER.name}! Your business number has been successfully decoupled from the mobile app and authorized on Cheerio’s Cloud API infrastructure.
          </p>
        </div>

        {/* Concise Summary of Actions Completed */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 text-left max-w-lg mx-auto space-y-2.5 text-xs text-slate-700">
          <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            Summary of Configured Settings:
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Historical customer chat backup verified in personal cloud.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Mobile WhatsApp account deregistered to release Meta lock.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>6-Digit SMS PIN authenticated and WABA token synced to workspace.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Next Actions for Business */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Recommended Next Steps to Start Selling</span>
          </h2>
          <span className="text-xs text-slate-400">Step 2 of 3 in Onboarding</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 transition cursor-pointer space-y-2 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-xs text-slate-900">
              Create Message Template
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Design order updates with our pre-approval compliance checker.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20 transition cursor-pointer space-y-2 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-xs text-slate-900">
              Send Test Broadcast
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Send a test WhatsApp message to your own personal smartphone.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/20 transition cursor-pointer space-y-2 group">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-xs text-slate-900">
              Connect Shopify Store
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Automate order confirmations and abandoned cart recovery.
            </p>
          </div>
        </div>
      </div>

      {/* User Feedback Loop (Self-Service Effectiveness Measurement) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          Did this guided troubleshooting resolve your problem?
        </h3>

        {!submittedFeedback ? (
          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setFeedbackRating('yes')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  feedbackRating === 'yes'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-emerald-500'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Yes, completely resolved!</span>
              </button>

              <button
                type="button"
                onClick={() => setFeedbackRating('partial')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  feedbackRating === 'partial'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-amber-500'
                }`}
              >
                <span>Partially, but I have doubts</span>
              </button>

              {/* Edge Case 6: User finished troubleshooting but issue persists */}
              <button
                type="button"
                onClick={() => {
                  setFeedbackRating('no');
                  onEscalatePersistent();
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  feedbackRating === 'no'
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white text-rose-700 border-rose-200 hover:border-rose-400'
                }`}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>No, it's still not working (Escalate)</span>
              </button>
            </div>

            {feedbackRating && (
              <div className="space-y-3 pt-2 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Rate your experience:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setStarRating(star)}
                        className="text-amber-400 hover:scale-110 transition cursor-pointer"
                      >
                        <Star className={`w-4 h-4 ${star <= starRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Optional feedback: Was anything confusing?"
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition cursor-pointer"
                  >
                    Submit Feedback
                  </button>
                </div>
              </div>
            )}
          </form>
        ) : (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Thank you for your feedback! Your ratings directly train our self-service diagnostic models.</span>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={onGoHome}
          className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Return to Cheerio Support Home</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onReopenTroubleshooting}
            className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Review Troubleshooting Steps</span>
          </button>
          <button
            onClick={onRestart}
            className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Restart Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
