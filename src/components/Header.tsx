import React from 'react';
import type { ScreenId } from '../types';
import { 
  Bot, 
  RotateCcw, 
  Info, 
  CheckCircle2, 
  Search, 
  HelpCircle,
  ShieldAlert,
  ChevronRight,
  FileText,
  GitBranch,
  Plug
} from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onReset: () => void;
  onToggleReviewerPanel: () => void;
  isReviewerPanelOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onReset,
  onToggleReviewerPanel,
  isReviewerPanelOpen,
}) => {
  const primarySteps: { id: ScreenId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: '1. Home', icon: <Search className="w-3.5 h-3.5" /> },
    { id: 'identify', label: '2. Diagnostic', icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { id: 'troubleshoot', label: '3. Guided Fix', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { id: 'ai_assistant', label: '4. AI Copilot', icon: <Bot className="w-3.5 h-3.5" /> },
    { id: 'resolution', label: '5. Resolution', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { id: 'escalation', label: '6. Escalation', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
  ];

  const toolModules: { id: ScreenId; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'template_linter', label: 'Template Linter', icon: <FileText className="w-3 h-3" />, color: 'hover:text-emerald-700 hover:bg-emerald-50' },
    { id: 'flow_debugger', label: 'Flow Debugger', icon: <GitBranch className="w-3 h-3" />, color: 'hover:text-amber-700 hover:bg-amber-50' },
    { id: 'integration_health', label: 'Integrations', icon: <Plug className="w-3 h-3" />, color: 'hover:text-purple-700 hover:bg-purple-50' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Banner indicating Prototype & Simulated Status */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-indigo-100 text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
            SIMULATION MODE
          </span>
          <span className="hidden sm:inline">
            Cheerio Assist • Setup & Support Copilot (Interactive Intern Prototype)
          </span>
          <span className="sm:hidden">Interactive Intern Prototype</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleReviewerPanel}
            className="flex items-center gap-1.5 text-xs text-indigo-200 hover:text-white bg-indigo-700/50 hover:bg-indigo-700 px-2.5 py-0.5 rounded transition font-medium cursor-pointer"
          >
            <Info className="w-3 h-3 text-indigo-300" />
            <span>{isReviewerPanelOpen ? 'Hide Rationale' : 'View Intern Design Rationale'}</span>
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-indigo-300 hover:text-white transition cursor-pointer"
            title="Reset prototype state to beginning"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition">
              <Bot className="w-5 h-5 text-indigo-100" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 tracking-tight text-base group-hover:text-indigo-600 transition">Cheerio</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded border border-indigo-200/60">
                  Assist
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-none">Setup & Support Copilot</p>
            </div>
          </div>
        </div>

        {/* Step Flow Breadcrumb (Interactive for reviewer convenience) */}
        <nav aria-label="Prototype Journey Steps" className="hidden xl:flex items-center space-x-1">
          {primarySteps.map((step, idx) => {
            const isActive = currentScreen === step.id;
            return (
              <React.Fragment key={step.id}>
                {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-300" />}
                <button
                  onClick={() => onNavigate(step.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200/80 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className={isActive ? 'text-indigo-600' : 'text-slate-400'}>{step.icon}</span>
                  <span>{step.label}</span>
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Module Switcher Tabs for Category Tools */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
            Tools:
          </span>
          {toolModules.map((mod) => {
            const isModActive = currentScreen === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => onNavigate(mod.id)}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                  isModActive
                    ? 'bg-white text-indigo-700 shadow-2xs font-semibold border border-slate-200/80'
                    : `text-slate-600 ${mod.color}`
                }`}
              >
                {mod.icon}
                <span>{mod.label}</span>
              </button>
            );
          })}
        </div>

        {/* User Persona Profile */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-4 shrink-0">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-600 font-medium text-xs">
            ER
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-medium text-slate-800 flex items-center gap-1">
              <span>Elena Rostova</span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-1 py-0.2 rounded font-normal">FreshBake</span>
            </div>
            <div className="text-[10px] text-slate-500">Non-technical Owner</div>
          </div>
        </div>
      </div>

      {/* Mobile Breadcrumb Bar */}
      <div className="xl:hidden border-t border-slate-100 px-4 py-2 bg-slate-50/80 overflow-x-auto flex items-center gap-1 text-xs">
        {primarySteps.map((step) => (
          <button
            key={step.id}
            onClick={() => onNavigate(step.id)}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md text-xs font-medium ${
              currentScreen === step.id
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 bg-white border border-slate-200'
            }`}
          >
            {step.label}
          </button>
        ))}
        <span className="text-slate-300 px-1">|</span>
        {toolModules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => onNavigate(mod.id)}
            className={`whitespace-nowrap px-2 py-1 rounded-md text-xs font-medium ${
              currentScreen === mod.id
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 bg-white border border-slate-200'
            }`}
          >
            {mod.label}
          </button>
        ))}
      </div>
    </header>
  );
};
