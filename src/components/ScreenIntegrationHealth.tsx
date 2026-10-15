import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plug, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Headphones, 
  RefreshCw
} from 'lucide-react';

interface ScreenIntegrationHealthProps {
  onBackToHome: () => void;
  onResolved: () => void;
  onEscalate: (reason: string) => void;
}

export const ScreenIntegrationHealth: React.FC<ScreenIntegrationHealthProps> = ({
  onBackToHome,
  onResolved,
  onEscalate
}) => {
  const [isFixed, setIsFixed] = useState(false);
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testPayloadResult, setTestPayloadResult] = useState<string | null>(null);

  const handleFixWebhook = () => {
    setIsFixed(true);
  };

  const handleRunTestOrder = () => {
    setIsRunningTest(true);
    setTestPayloadResult(null);

    setTimeout(() => {
      setIsRunningTest(false);
      setTestPayloadResult(
        'Simulated Webhook Handshake Successful: Order #992014 from Shopify received. Parsed customer phone "+1 (555) 234-5678" -> Formatted to E.164 "+15552345678" -> Dispatched WhatsApp Order Confirmation in 118ms.'
      );
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
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
            onClick={() => onEscalate("User needs assistance with custom CRM / Zapier webhook integration")}
            className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition cursor-pointer"
          >
            <Headphones className="w-3.5 h-3.5 text-slate-500" />
            <span>Escalate to Human</span>
          </button>
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
            Support Category 4: Integration Health Check
          </span>
          <span className="text-[11px] text-slate-400">Shopify & Third-Party Sync Diagnostic</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Shopify & Webhook Automated Health Diagnostic
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Verify that customer orders in Shopify trigger automated WhatsApp broadcasts without missing phone numbers or webhook timeouts.
        </p>
      </div>

      {/* 3-Point Health Diagnostic Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Plug className="w-4 h-4 text-purple-600" />
          <span>3-Point Integration Status for: freshbake-pantry.myshopify.com</span>
        </h2>

        <div className="space-y-3">
          {/* Check 1: OAuth */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold text-xs text-slate-800">1. Shopify OAuth App Authorization</span>
              </div>
              <p className="text-xs text-slate-500 pl-6">
                Cheerio app has valid read permissions for Orders and Customer profiles.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
              Authorized
            </span>
          </div>

          {/* Check 2: Webhook Endpoint */}
          <div className={`p-4 rounded-xl border transition ${
            isFixed ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-300 bg-rose-50/60 ring-1 ring-rose-400'
          }`}>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {isFixed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span className={`font-bold text-xs ${isFixed ? 'text-slate-800' : 'text-rose-950'}`}>
                    2. Webhook Event Handshake (`orders/create`)
                  </span>
                </div>
                <p className={`text-xs pl-6 leading-relaxed ${isFixed ? 'text-slate-600' : 'text-rose-900'}`}>
                  {isFixed
                    ? 'Webhook secret regenerated and synchronized. Shopify ping verified (200 OK).'
                    : 'Shopify returned a 401 Unauthorized status when sending order notifications because the webhook secret key expired in your Shopify App settings.'}
                </p>
              </div>

              <span className={`text-[11px] font-bold px-2 py-0.5 rounded shrink-0 ${
                isFixed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {isFixed ? 'Synced & Listening' : 'Signature Mismatch (401)'}
              </span>
            </div>

            {!isFixed && (
              <div className="mt-3 pl-6 pt-2 border-t border-rose-200/80 flex items-center justify-between">
                <span className="text-[11px] text-rose-800">
                  Cheerio Assist can automatically re-bind the secure webhook secret with Shopify.
                </span>
                <button
                  onClick={handleFixWebhook}
                  className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Auto-Resync Webhook</span>
                </button>
              </div>
            )}
          </div>

          {/* Check 3: Phone E.164 auto-formatting */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold text-xs text-slate-800">3. Phone Number Field Mapping & E.164 Cleaning</span>
              </div>
              <p className="text-xs text-slate-500 pl-6">
                Cheerio automatically sanitizes customer phone entries (e.g. converting `(555) 234-5678` into `+15552345678`) so Meta Cloud API accepts them without failure.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
              Active Formatter
            </span>
          </div>
        </div>
      </div>

      {/* Live Test Trigger Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Simulate Test Order from Shopify</h3>
            <p className="text-xs text-slate-500">Fire a simulated webhook payload to confirm end-to-end delivery.</p>
          </div>

          <button
            onClick={handleRunTestOrder}
            disabled={isRunningTest}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            {isRunningTest ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Simulating Order...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Fire Test Order Webhook</span>
              </>
            )}
          </button>
        </div>

        {/* Live Payload Response Output */}
        {testPayloadResult && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 font-bold text-emerald-950">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Diagnostic Result: Complete End-to-End Delivery Verified</span>
            </div>
            <p className="leading-relaxed font-mono text-[11px] bg-white/70 p-2.5 rounded-lg border border-emerald-200/80">
              {testPayloadResult}
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={onResolved}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs transition cursor-pointer"
              >
                Mark Integration Resolved
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
