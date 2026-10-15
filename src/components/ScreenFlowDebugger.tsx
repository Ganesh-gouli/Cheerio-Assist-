import React, { useState } from 'react';
import { 
  ArrowLeft, 
  GitBranch, 
  CheckCircle2, 
  Bot, 
  Headphones, 
  Send,
  Zap,
  AlertOctagon
} from 'lucide-react';

interface ScreenFlowDebuggerProps {
  onBackToHome: () => void;
  onResolved: () => void;
  onEscalate: (reason: string) => void;
}

export const ScreenFlowDebugger: React.FC<ScreenFlowDebuggerProps> = ({
  onBackToHome,
  onResolved,
  onEscalate
}) => {
  const [isRepaired, setIsRepaired] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string>('fallback');
  const [simTestInput, setSimTestInput] = useState('');
  const [simChatMessages, setSimChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Hi! Welcome to FreshBake Pantry. Choose an option: [1. View Menu] [2. Track Order] [3. Support]' }
  ]);

  const handleRepairFlow = () => {
    setIsRepaired(true);
    setSelectedNode('repaired');
  };

  const handleSendSimMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simTestInput.trim()) return;

    const userText = simTestInput.trim();
    const newMsgs = [...simChatMessages, { sender: 'user' as const, text: userText }];
    setSimTestInput('');
    setSimChatMessages(newMsgs);

    setTimeout(() => {
      if (!isRepaired) {
        // Demonstrate loop trap bug
        setSimChatMessages(prev => [
          ...prev, 
          { sender: 'bot', text: "I didn't understand that. Please reply with 1, 2, or 3." }
        ]);
      } else {
        // Demonstrate repaired intelligent fallback
        setSimChatMessages(prev => [
          ...prev, 
          { sender: 'bot', text: "I noticed your question about '" + userText + "'. I am connecting you with a FreshBake team member right away!" }
        ]);
      }
    }, 600);
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
            onClick={() => onEscalate("User needs help designing custom multi-level chatbot flow")}
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
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Support Category 3: Flow Validator
          </span>
          <span className="text-[11px] text-slate-400">Static Graph Dead-End & Loop Analyzer</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Chatbot Builder & Logic Loop Health Checker
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Detect and repair common logic traps where customers get stuck in infinite loops, or unlinked buttons fail to trigger actions.
        </p>
      </div>

      {/* 2-Column Grid: Visual Flow Graph (Left) & Node Inspector / Live Simulator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Graph Area (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-indigo-600" />
              <span>Interactive Visual Flow Map</span>
            </h2>
            <span className="text-[11px] text-slate-400">Click any node to inspect</span>
          </div>

          {/* Node 1: Welcome Node */}
          <div 
            onClick={() => setSelectedNode('welcome')}
            className={`p-4 rounded-xl border text-xs cursor-pointer transition ${
              selectedNode === 'welcome' ? 'ring-2 ring-indigo-500 border-indigo-500 bg-indigo-50/30' : 'border-slate-200 bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between font-bold text-slate-800 mb-1">
              <span>Node 1: Welcome Greeting</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Healthy</span>
            </div>
            <p className="text-slate-500">Sends greeting message + 3 interactive reply buttons.</p>
          </div>

          {/* Connectors */}
          <div className="grid grid-cols-3 gap-2 pl-4 text-center">
            <div className="h-6 border-l-2 border-slate-300 mx-auto" />
            <div className="h-6 border-l-2 border-slate-300 mx-auto" />
            <div className="h-6 border-l-2 border-slate-300 mx-auto" />
          </div>

          {/* Node 2: 3 Decision Branches */}
          <div className="grid grid-cols-3 gap-2">
            <div 
              onClick={() => setSelectedNode('menu')}
              className={`p-2.5 rounded-lg border text-center text-xs cursor-pointer transition ${
                selectedNode === 'menu' ? 'ring-2 ring-indigo-500 border-indigo-500 bg-indigo-50/30' : 'border-emerald-200 bg-emerald-50/30'
              }`}
            >
              <span className="font-semibold text-[11px] block text-emerald-900">Button 1: Menu</span>
              <span className="text-[10px] text-slate-400">Linked to PDF</span>
            </div>

            <div 
              onClick={() => setSelectedNode('orphan')}
              className={`p-2.5 rounded-lg border text-center text-xs cursor-pointer transition ${
                isRepaired
                  ? 'border-emerald-200 bg-emerald-50/30'
                  : 'border-rose-300 bg-rose-50/60 ring-1 ring-rose-400'
              }`}
            >
              <span className={`font-semibold text-[11px] block ${isRepaired ? 'text-emerald-900' : 'text-rose-900'}`}>
                Button 2: Track Order
              </span>
              <span className="text-[10px] text-slate-500">
                {isRepaired ? 'Linked to Shopify' : 'Dead End (Unlinked)'}
              </span>
            </div>

            <div 
              onClick={() => setSelectedNode('human')}
              className={`p-2.5 rounded-lg border text-center text-xs cursor-pointer transition ${
                selectedNode === 'human' ? 'ring-2 ring-indigo-500 border-indigo-500 bg-indigo-50/30' : 'border-emerald-200 bg-emerald-50/30'
              }`}
            >
              <span className="font-semibold text-[11px] block text-emerald-900">Button 3: Human</span>
              <span className="text-[10px] text-slate-400">Linked to Agent</span>
            </div>
          </div>

          {/* Node 3: Default Fallback Node (The Loop Trap Bug!) */}
          <div 
            onClick={() => setSelectedNode('fallback')}
            className={`p-4 rounded-xl border text-xs cursor-pointer transition relative overflow-hidden ${
              isRepaired
                ? 'border-emerald-200 bg-emerald-50/20'
                : 'border-rose-400 bg-rose-50/50 ring-2 ring-rose-400'
            }`}
          >
            <div className="flex items-center justify-between font-bold mb-1">
              <span className={isRepaired ? 'text-emerald-900' : 'text-rose-950 flex items-center gap-1.5'}>
                {!isRepaired && <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />}
                Default Fallback Message Handler
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                isRepaired ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {isRepaired ? 'Repaired (Safe Exit Guard)' : 'Critical Logic Trap (Loop)'}
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {isRepaired
                ? 'If customer input is unrecognized twice, bot auto-routes to human support queue.'
                : 'Bot replies: "I didn\'t understand that. Try again." and loops endlessly back to itself without escape.'}
            </p>
          </div>

          {/* Auto Repair Trigger */}
          {!isRepaired ? (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-3">
              <div className="text-xs text-amber-900">
                <span className="font-bold block">2 Logic Errors Found:</span>
                <span>1 Dead End + 1 Infinite Loop Trap detected in active flow.</span>
              </div>
              <button
                onClick={handleRepairFlow}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Auto-Repair Flow Logic</span>
              </button>
            </div>
          ) : (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Flow logic successfully sanitized and verified for live production!</span>
              </div>
              <button
                onClick={onResolved}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                Confirm & Activate Bot
              </button>
            </div>
          )}
        </div>

        {/* Live Simulator & Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-indigo-600" />
                <span>Live Interactive Bot Test</span>
              </h3>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                isRepaired ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {isRepaired ? 'Safe Logic' : 'Buggy Flow'}
              </span>
            </div>

            {/* Simulated WhatsApp Phone Frame */}
            <div className="bg-white rounded-xl border border-slate-200 p-3 h-64 overflow-y-auto space-y-2 text-xs">
              {simChatMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg max-w-[85%] leading-relaxed ${
                    m.sender === 'bot'
                      ? 'bg-slate-100 text-slate-800 rounded-tl-none'
                      : 'bg-indigo-600 text-white ml-auto rounded-tr-none'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {/* Simulator Chat Input */}
            <form onSubmit={handleSendSimMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={simTestInput}
                onChange={(e) => setSimTestInput(e.target.value)}
                placeholder="Type 'Do you have gluten free bread?'..."
                className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-xs"
              />
              <button
                type="submit"
                className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
            <span className="font-semibold text-slate-700 block">How Cheerio Protects Non-Tech Users:</span>
            <p>
              Users don't need to write JavaScript or understand boolean logic. The validator auto-inserts exit conditions so customer conversations never hit dead ends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
