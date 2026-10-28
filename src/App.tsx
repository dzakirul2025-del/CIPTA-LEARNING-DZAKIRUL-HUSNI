import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { StudentManager } from './components/StudentManager';
import { CiptaModuleViewer } from './components/CiptaModuleViewer';
import { AiModuleGenerator } from './components/AiModuleGenerator';
import { AssessmentStudio } from './components/AssessmentStudio';
import { GameStudio } from './components/GameStudio';
import { SchoolCulture } from './components/SchoolCulture';
import { PortfolioTracker } from './components/PortfolioTracker';
import { DifferentiationPortal } from './components/DifferentiationPortal';
import { OfficialSourcesRepo } from './components/OfficialSourcesRepo';
import { AdminPanel } from './components/AdminPanel';
import { AutoQuestionGenerator } from './components/AutoQuestionGenerator';

const AppContent: React.FC = () => {
  const { currentScreen, config } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentManager />;
      case 'modules':
        return <CiptaModuleViewer />;
      case 'ai-generator':
        return <AiModuleGenerator />;
      case 'auto-questions':
        return <AutoQuestionGenerator />;
      case 'assessments':
        return <AssessmentStudio />;
      case 'games':
        return <GameStudio />;
      case 'culture':
        return <SchoolCulture />;
      case 'portfolio':
        return <PortfolioTracker />;
      case 'differentiation':
        return <DifferentiationPortal />;
      case 'sources':
        return <OfficialSourcesRepo />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      <Header />
      
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
        <Sidebar />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {renderScreen()}
        </main>
      </div>

      {/* Official Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>CIPTA Learning — MIN 1 Paser</strong> (Kelas VI-C • Fase C)
          </div>
          <div>
            Kepala Madrasah: <strong>{config.kepalaMadrasah}</strong> | Pengembang: <strong>{config.pengembangAplikasi}</strong>
          </div>
          <div className="text-slate-400 font-mono text-[11px]">
            Waktu Standar: Asia/Makassar (WITA)
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
