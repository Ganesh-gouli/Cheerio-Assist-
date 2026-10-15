import React, { useState } from 'react';
import { 
  MessageSquare, 
  FileText, 
  GitBranch, 
  Plug, 
  Search, 
  Headphones, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Zap, 
  ChevronRight
} from 'lucide-react';
import type { IssueCategory } from '../types';
import { DEFAULT_USER, RECENT_SUPPORT_HISTORY } from '../data/mockData';

interface Screen1HomeProps {
  onSelectCategory: (category: IssueCategory) => void;
  onDirectEscalate: () => void;
  onOpenAiAssistant: () => void;
}

export const Screen1Home: React.FC<Screen1HomeProps> = ({
  onSelectCategory,
  onDirectEscalate,
  onOpenAiAssistant
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 'whatsapp_api' as IssueCategory,
      title: 'WhatsApp API Connection & Setup',
      badge: 'Most Common • 4m Guided Fix',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      description: 'Troubleshoot phone number registration, Meta Cloud API errors, SMS verification, or connection drops.',
      icon: <MessageSquare className="w-6 h-6 text-indigo-600" />,
      highlight: true,
      popularSearches: ['Phone already registered', 'SMS code not arriving', 'Meta payment method missing']
    },
    {
      id: 'templates' as IssueCategory,
      title: 'Message Templates & Approvals',
      badge: 'Self-Service Linting',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'Fix rejected WhatsApp templates, Meta category mismatch rules (Utility vs Marketing), or missing variable samples.',
      icon: <FileText className="w-6 h-6 text-emerald-600" />,
      highlight: false,
      popularSearches: ['Template rejected by Meta', 'Variable {{1}} sample error', 'Promotional content flag']
    },
    {
      id: 'chatbot' as IssueCategory,
      title: 'Chatbot Builder & Logic Loops',
      badge: 'Flow Debugger',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      description: 'Resolve infinite reply loops, unlinked response buttons, fallback routing, and conditional branch errors.',
      icon: <GitBranch className="w-6 h-6 text-amber-600" />,
      highlight: false,
      popularSearches: ['Bot looping on fallback', 'Button click does not reply', 'Missing branch condition']
    },
    {
      id: 'integrations' as IssueCategory,
      title: 'Third-Party Integrations',
      badge: 'Sync Health Check',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      description: 'Verify Shopify order notifications, Google Sheets contact sync, and Webhook payload delivery.',
      icon: <Plug className="w-6 h-6 text-purple-600" />,
      highlight: false,
      popularSearches: ['Shopify cart sync stopped', 'Google Sheet 403 error', 'Webhook signature invalid']
    }
  ];

  const filteredCategories = categories.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.popularSearches.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Background glow decoration */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Cheerio System Status: All Systems Operational
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Hello {DEFAULT_USER.name}, how can we help your business today?
          </h1>
          
          <p className="text-sm sm:text-base text-indigo-100/90 leading-relaxed">
            Resolve setup roadblocks in minutes. Our intelligent diagnostic copilot detects common Meta API, template, and flow issues without requiring technical jargon.
          </p>

          {/* Search Bar / Intent Input */}
          <div className="pt-2">
            <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-indigo-200/50 p-1.5 focus-within:ring-2 focus-within:ring-indigo-400 transition">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What are you trying to do? (e.g. 'Cannot connect phone number' or 'Template rejected')"
                className="w-full px-3 py-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 mr-1 cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onOpenAiAssistant}
                className="hidden sm:flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition shadow-xs shrink-0 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Ask AI Copilot</span>
              </button>
            </div>
            
            {/* Quick search tags */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-indigo-200">
              <span className="text-indigo-300 font-medium">Common issues:</span>
              <button 
                onClick={() => { setSearchQuery('Phone already registered'); onSelectCategory('whatsapp_api'); }}
                className="bg-indigo-800/60 hover:bg-indigo-700/80 px-2.5 py-1 rounded-md text-[11px] transition cursor-pointer"
              >
                Phone number already in use
              </button>
              <button 
                onClick={() => { setSearchQuery('SMS verification'); onSelectCategory('whatsapp_api'); }}
                className="bg-indigo-800/60 hover:bg-indigo-700/80 px-2.5 py-1 rounded-md text-[11px] transition cursor-pointer"
              >
                SMS OTP not arriving
              </button>
              <button 
                onClick={() => { setSearchQuery('Template rejected'); onSelectCategory('templates'); }}
                className="bg-indigo-800/60 hover:bg-indigo-700/80 px-2.5 py-1 rounded-md text-[11px] transition cursor-pointer"
              >
                Template rejection fix
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Support Categories Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Setup & Troubleshooting Categories</h2>
            <p className="text-xs text-slate-500">Select the area where your workflow is currently blocked.</p>
          </div>
          <span className="text-xs text-slate-500">
            Showing {filteredCategories.length} categories
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`group bg-white rounded-xl border p-5 transition-all duration-200 cursor-pointer relative flex flex-col justify-between ${
                category.highlight
                  ? 'border-indigo-300 shadow-xs hover:shadow-md hover:border-indigo-500 ring-1 ring-indigo-200/50'
                  : 'border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 group-hover:scale-105 transition">
                    {category.icon}
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${category.badgeColor}`}>
                    {category.badge}
                  </span>
                </div>

                <h3 className="font-semibold text-slate-900 text-base group-hover:text-indigo-600 transition flex items-center gap-1.5">
                  <span>{category.title}</span>
                  {category.highlight && (
                    <span className="text-[10px] bg-indigo-600 text-white font-bold px-1.5 py-0.2 rounded">
                      PRIMARY FLOW
                    </span>
                  )}
                </h3>

                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
                <span className="text-indigo-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Start Interactive Diagnosis
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-slate-400 text-[11px]">Average resolution: 3–5 min</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Section: Recent Activity & Direct Human Escalation Option */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Support Activity (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <h3 className="font-bold text-sm text-slate-900">Recent Support & Setup Activity</h3>
            </div>
            <span className="text-[11px] text-slate-500">Auto-saved session history</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {RECENT_SUPPORT_HISTORY.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">{item.topic}</span>
                    <span className="text-[10px] font-mono text-slate-400">({item.id})</span>
                  </div>
                  <div className="text-slate-500 text-[11px] flex items-center gap-2">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center">
            <button 
              onClick={onOpenAiAssistant}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              Ask AI about a previous solution
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Direct Human Support Escalation Card (1 Col) */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Need Immediate Human Assistance?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If your issue is complex, account-specific, or you simply prefer an onboarding engineer to look into your workspace, we are here to help.
            </p>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div className="flex items-center justify-between text-slate-700 font-medium">
                <span>Support Tier:</span>
                <span className="text-indigo-600 font-semibold">Priority Growth</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Avg. Human SLA:</span>
                <span>~18 minutes</span>
              </div>
            </div>

            <button
              onClick={onDirectEscalate}
              className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-lg text-xs font-semibold shadow-2xs hover:shadow transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Headphones className="w-4 h-4 text-indigo-600" />
              <span>Talk to Human Support</span>
            </button>
            <p className="text-[10px] text-slate-400 text-center">
              Transfers diagnostic state without re-asking questions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
