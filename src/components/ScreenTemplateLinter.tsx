import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  Send, 
  Headphones,
  Zap,
  Info
} from 'lucide-react';

interface ScreenTemplateLinterProps {
  onBackToHome: () => void;
  onResolved: () => void;
  onEscalate: (reason: string) => void;
}

export const ScreenTemplateLinter: React.FC<ScreenTemplateLinterProps> = ({
  onBackToHome,
  onResolved,
  onEscalate
}) => {
  const PRESET_TEMPLATES = [
    {
      id: 'rejected_order_update',
      name: 'Order Confirmation (Rejected by Meta)',
      category: 'UTILITY',
      body: 'Hi {{1}}, your order {{2}} has been confirmed! Enjoy 20% OFF your next purchase using code SWEET20. THANK YOU FOR SHOPPING WITH US!!!!',
      variables: ['Elena', ''],
      reasons: [
        'Contains promotional discount wording ("20% OFF", "SWEET20") inside a UTILITY category template.',
        'Variable {{2}} is missing a sample preview value.',
        'Excessive exclamation marks and all-caps text flag Meta spam filters.'
      ]
    },
    {
      id: 'rejected_cart',
      name: 'Abandoned Cart Reminder (Format Error)',
      category: 'MARKETING',
      body: 'Hello {{ 1 }}, you left items in your cart. Return today to claim your discount at {{2}}!',
      variables: ['', ''],
      reasons: [
        'Variable syntax has spaces: "{{ 1 }}" instead of standard "{{1}}".',
        'Both variables {{1}} and {{2}} are missing required sample values.'
      ]
    },
    {
      id: 'clean_template',
      name: 'Shipping Status (Compliant)',
      category: 'UTILITY',
      body: 'Hi {{1}}, your FreshBake order {{2}} has shipped! Track your package here: {{3}}. Thank you for choosing FreshBake.',
      variables: ['Elena', 'FB-8841', 'freshbake.com/track/8841'],
      reasons: []
    }
  ];

  const [selectedPresetId, setSelectedPresetId] = useState('rejected_order_update');
  const [templateCategory, setTemplateCategory] = useState<'UTILITY' | 'MARKETING'>('UTILITY');
  const [templateBody, setTemplateBody] = useState(PRESET_TEMPLATES[0].body);
  const [varSamples, setVarSamples] = useState<string[]>(['Elena', '']);
  const [isAutoFixed, setIsAutoFixed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMetaRuleExplainer, setShowMetaRuleExplainer] = useState(false);

  // Compliance Analysis
  const analyzeCompliance = () => {
    const issues: { type: 'error' | 'warning'; message: string }[] = [];
    let score = 100;

    const lower = templateBody.toLowerCase();
    const promotionalWords = ['20% off', 'discount', 'coupon', 'sale', 'promo', 'free gift', 'buy now', 'off your next'];
    const hasPromo = promotionalWords.some(w => lower.includes(w));

    if (templateCategory === 'UTILITY' && hasPromo) {
      issues.push({
        type: 'error',
        message: 'Meta Policy Violation: Promotional language ("20% OFF", "discount") is forbidden in the UTILITY category. Meta will reject this template.'
      });
      score -= 55;
    }

    if (/\{\{\s+\d+\s+\}\}/.test(templateBody)) {
      issues.push({
        type: 'error',
        message: 'Invalid Variable Syntax: Spaces inside variable brackets like {{ 1 }} are rejected by Meta Cloud API. Use {{1}}.'
      });
      score -= 30;
    }

    // Check samples for placeholders
    const matches = templateBody.match(/\{\{\d+\}\}/g) || [];
    if (matches.length > 0 && varSamples.some((s, idx) => idx < matches.length && !s.trim())) {
      issues.push({
        type: 'warning',
        message: 'Missing Sample Value: Meta requires sample preview text for every placeholder before submission.'
      });
      score -= 20;
    }

    if (/!{3,}/.test(templateBody)) {
      issues.push({
        type: 'warning',
        message: 'Formatting Warning: Excessive exclamation marks (e.g. "!!!!") trigger Meta automated spam rejection.'
      });
      score -= 15;
    }

    const finalScore = Math.max(score, 18);
    return { issues, finalScore };
  };

  const { issues, finalScore } = analyzeCompliance();

  const handleApplyPreset = (presetId: string) => {
    const p = PRESET_TEMPLATES.find(x => x.id === presetId);
    if (!p) return;
    setSelectedPresetId(presetId);
    setTemplateCategory(p.category as 'UTILITY' | 'MARKETING');
    setTemplateBody(p.body);
    setVarSamples([...p.variables]);
    setIsAutoFixed(false);
  };

  const handleAutoFix = () => {
    // Intelligently sanitize the copy based on category
    if (templateCategory === 'UTILITY') {
      setTemplateBody(
        'Hi {{1}}, your order {{2}} has been confirmed and is being prepared! We will notify you when it ships. Thank you for ordering from FreshBake.'
      );
      setVarSamples(['Elena', 'FB-90214']);
    } else {
      setTemplateBody(
        'Hi {{1}}, you left items in your FreshBake shopping cart. Complete your order today: {{2}}! Reply STOP to opt out.'
      );
      setVarSamples(['Elena', 'freshbake.com/cart/90214']);
    }
    setIsAutoFixed(true);
  };

  const handleSubmitToMeta = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onResolved();
    }, 900);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Support Home</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMetaRuleExplainer(!showMetaRuleExplainer)}
            className="flex items-center gap-1 text-xs text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Why Does Meta Reject Templates?</span>
          </button>
          <button
            onClick={() => onEscalate("User requested help with complex template rejection")}
            className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition cursor-pointer"
          >
            <Headphones className="w-3.5 h-3.5 text-slate-500" />
            <span>Escalate to Human</span>
          </button>
        </div>
      </div>

      {/* Meta Rule Explainer Drawer / Box */}
      {showMetaRuleExplainer && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between font-bold text-amber-950">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Plain-English Guide: Meta Template Approval Rules
            </span>
            <button onClick={() => setShowMetaRuleExplainer(false)} className="text-amber-700 hover:text-amber-900 underline cursor-pointer">
              Dismiss
            </button>
          </div>
          <p className="leading-relaxed">
            Meta enforces strict boundaries: <strong>UTILITY</strong> templates (order confirmations, delivery alerts) cost less per message (~$0.005), so Meta strictly forbids any marketing or promotional text inside them. If you mention discounts, coupons, or sales, you must classify the template as <strong>MARKETING</strong> (~$0.035). Cheerio Assist automatically detects and fixes these mismatches.
          </p>
        </div>
      )}

      {/* Main Title Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
            Support Category 2: Pre-Flight Linter
          </span>
          <span className="text-[11px] text-slate-400">Zero Hallucination Compliance Engine</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          WhatsApp Template Approval & Compliance Checker
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Test, sanitize, and auto-fix WhatsApp message templates before submitting them to Meta. Avoid 24-hour review rejections and account quality penalties.
        </p>
      </div>

      {/* Presets Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-500 font-medium whitespace-nowrap">Load Preset Scenario:</span>
        {PRESET_TEMPLATES.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleApplyPreset(preset.id)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
              selectedPresetId === preset.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Grid: Editor (Left) & Live Compliance Report (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Message Template Editor</h2>
            {isAutoFixed && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                AI Sanitized for Meta
              </span>
            )}
          </div>

          {/* Category Toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Meta Template Category:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTemplateCategory('UTILITY')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition cursor-pointer flex flex-col items-center text-center ${
                  templateCategory === 'UTILITY'
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-900 ring-1 ring-indigo-600'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="font-bold">Utility Category</span>
                <span className="text-[10px] text-slate-400">Order updates, delivery, receipts (~$0.005)</span>
              </button>
              <button
                type="button"
                onClick={() => setTemplateCategory('MARKETING')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition cursor-pointer flex flex-col items-center text-center ${
                  templateCategory === 'MARKETING'
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-900 ring-1 ring-indigo-600'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="font-bold">Marketing Category</span>
                <span className="text-[10px] text-slate-400">Offers, re-engagement, promotions (~$0.035)</span>
              </button>
            </div>
          </div>

          {/* Body Textarea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Template Message Body:</label>
              <span className="text-[11px] text-slate-400">Variables like {`{{1}}`} allowed</span>
            </div>
            <textarea
              rows={4}
              value={templateBody}
              onChange={(e) => {
                setTemplateBody(e.target.value);
                setIsAutoFixed(false);
              }}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              placeholder="Type your WhatsApp message template..."
            />
          </div>

          {/* Sample Variables */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-semibold text-slate-700 block">
              Required Sample Values for Variables:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">{`Sample for {{1}}:`}</span>
                <input
                  type="text"
                  value={varSamples[0] || ''}
                  onChange={(e) => {
                    const updated = [...varSamples];
                    updated[0] = e.target.value;
                    setVarSamples(updated);
                  }}
                  placeholder="e.g. Elena"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">{`Sample for {{2}}:`}</span>
                <input
                  type="text"
                  value={varSamples[1] || ''}
                  onChange={(e) => {
                    const updated = [...varSamples];
                    updated[1] = e.target.value;
                    setVarSamples(updated);
                  }}
                  placeholder="e.g. #FB-8841"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
            <button
              onClick={handleAutoFix}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Auto-Fix with Compliance Engine</span>
            </button>

            <button
              onClick={handleSubmitToMeta}
              disabled={finalScore < 70 || isSubmitting}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                finalScore >= 70 && !isSubmitting
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting to Meta...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Simulate Meta Submission</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Compliance Diagnostic Card (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Live Meta Approval Likelihood
            </h3>

            {/* Probability Gauge */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 text-center space-y-2">
              <div className="text-3xl font-extrabold tracking-tight">
                <span className={finalScore >= 80 ? 'text-emerald-600' : finalScore >= 50 ? 'text-amber-600' : 'text-rose-600'}>
                  {finalScore}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    finalScore >= 80 ? 'bg-emerald-500' : finalScore >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${finalScore}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {finalScore >= 80
                  ? 'High Approval Probability — Safe to Submit'
                  : finalScore >= 50
                  ? 'Moderate Risk — May Be Manually Reviewed'
                  : 'High Rejection Risk — Violates Meta Policies'}
              </p>
            </div>

            {/* Diagnostic Issues List */}
            <div className="space-y-2 text-xs">
              <span className="font-semibold text-slate-700 block">Detected Rule Checks:</span>
              {issues.length === 0 ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>All Meta automated policy checks passed. No promotional words or syntax errors found.</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {issues.map((iss, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                        iss.type === 'error'
                          ? 'bg-rose-50 border-rose-200 text-rose-900'
                          : 'bg-amber-50 border-amber-200 text-amber-900'
                      }`}
                    >
                      {iss.type === 'error' ? (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <p className="leading-relaxed">{iss.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer note */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              Pre-flight checking eliminates up to 80% of template rejections before human support is needed.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
