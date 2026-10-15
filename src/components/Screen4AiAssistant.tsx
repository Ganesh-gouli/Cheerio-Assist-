import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  ArrowLeft, 
  Headphones, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert
} from 'lucide-react';
import type { ChatMessage } from '../types';
import { AI_KNOWLEDGE_BASE } from '../data/mockData';

interface Screen4AiAssistantProps {
  onBackToTroubleshooting: () => void;
  onProceedToResolution: () => void;
  onEscalate: (reason: string, notes?: string) => void;
}

export const Screen4AiAssistant: React.FC<Screen4AiAssistantProps> = ({
  onBackToTroubleshooting,
  onProceedToResolution,
  onEscalate
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: "Hi Elena! I'm your Cheerio Support Copilot. I can answer any questions about connecting WhatsApp, Meta Cloud API rules, chat backups, or template guidelines in plain, non-technical English. What's on your mind?",
      timestamp: 'Just now',
      isSimulated: true
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    "Will I lose customer chats if I delete the WhatsApp app?",
    "What is a WABA ID in simple terms?",
    "Can I connect an office landline number?",
    "Why does Meta ask for a credit card?",
    "I want to speak with a human support agent"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false);

      const lower = query.toLowerCase();

      // Check knowledge base
      const matched = AI_KNOWLEDGE_BASE.find(item => 
        item.keywords.some(k => lower.includes(k))
      );

      if (matched) {
        if (matched.triggerEscalation) {
          const assistMsg: ChatMessage = {
            id: `a_${Date.now()}`,
            sender: 'assistant',
            text: matched.response,
            timestamp: 'Just now',
            isSimulated: true,
            confidenceScore: matched.confidence
          };
          setMessages(prev => [...prev, assistMsg]);
          
          // Trigger warm escalation after brief pause
          setTimeout(() => {
            onEscalate(`AI detected escalation trigger in prompt: "${query}"`, query);
          }, 1200);
          return;
        }

        const assistMsg: ChatMessage = {
          id: `a_${Date.now()}`,
          sender: 'assistant',
          text: matched.response,
          timestamp: 'Just now',
          isSimulated: true,
          confidenceScore: matched.confidence
        };
        setMessages(prev => [...prev, assistMsg]);
      } else {
        // Fallback with explicit uncertainty acknowledgment (Edge Case 3 & 5)
        const uncertainMsg: ChatMessage = {
          id: `a_${Date.now()}`,
          sender: 'assistant',
          text: "I want to be completely honest: I don't have enough specific information about your Meta Cloud API configuration to answer that accurately without risking an incorrect setting. Would you like me to connect you directly with a Cheerio onboarding specialist?",
          timestamp: 'Just now',
          isSimulated: true,
          confidenceScore: 0.42
        };
        setMessages(prev => [...prev, uncertainMsg]);
      }
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToTroubleshooting}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Guided Troubleshooting</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onProceedToResolution}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>My Issue Is Resolved</span>
          </button>
          <button
            onClick={() => onEscalate("User escalated from AI Copilot chat")}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
          >
            <Headphones className="w-3.5 h-3.5 text-slate-500" />
            <span>Escalate to Human</span>
          </button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[540px] overflow-hidden">
        {/* Chat Top Banner */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">Cheerio AI Copilot</h3>
                <span className="text-[10px] bg-indigo-100 text-indigo-700 font-semibold px-1.5 py-0.2 rounded border border-indigo-200">
                  Simulated Local Assistant
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Non-technical setup guidance & Meta policy assistance</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Zero Hallucination Guardrails</span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  isUser 
                    ? 'bg-slate-800 text-white font-medium' 
                    : 'bg-indigo-600 text-white shadow-xs'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/70'
                }`}>
                  <p>{msg.text}</p>
                  
                  <div className={`mt-2 flex items-center justify-between text-[10px] ${isUser ? 'text-indigo-200' : 'text-slate-400'}`}>
                    <span>{msg.timestamp}</span>
                    {msg.confidenceScore !== undefined && (
                      <span className="font-mono">
                        Rule Match: {Math.round(msg.confidenceScore * 100)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-100 border border-slate-200/80 rounded-2xl rounded-tl-none p-3.5 text-xs text-slate-500 flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
                <span>Formulating plain-English response...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompt Chips */}
        <div className="px-4 py-2 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-500" />
            Suggested:
          </span>
          {samplePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-indigo-50 border border-slate-200 text-slate-600 hover:text-indigo-700 text-[11px] transition cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask any setup or Meta policy question (e.g. 'Will I lose my chats?')..."
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className={`p-2.5 rounded-xl transition cursor-pointer ${
                inputQuery.trim() && !isTyping
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Credibility Notice */}
      <div className="p-3.5 bg-slate-100 rounded-xl text-xs text-slate-500 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            <strong>Safe Assistant Architecture:</strong> Responses are generated using verified Cheerio knowledge base rules without risking unauthorized changes to your WhatsApp account.
          </span>
        </div>
      </div>
    </div>
  );
};
