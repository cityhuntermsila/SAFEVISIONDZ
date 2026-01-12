
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import DetectionTool from './components/DetectionTool';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import Footer from './components/Footer';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero
              onStart={() => setCurrentView('detection')}
              onSolutions={() => setCurrentView('pricing')}
            />
            <Features />
          </>
        );
      case 'about':
        return <About />;
      case 'pricing':
        return <Pricing />;
      case 'contact':
        return <Contact />;
      case 'faq':
        return <FAQ onNavigate={setCurrentView} />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsAndConditions />;
      case 'detection':
        return (
          <div className="pt-4 bg-slate-900 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <button
                onClick={() => setCurrentView('home')}
                className="mb-4 text-slate-400 hover:text-white flex items-center gap-2 transition-colors group text-sm font-medium"
              >
                <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                Retour à l'accueil
              </button>
              <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 uppercase tracking-tight">Espace Démo AI</h1>
                <p className="text-slate-400 text-sm">Analyse de conformité PPE en temps réel par vision artificielle.</p>
              </div>
              <DetectionTool isFullPage={true} onNavigateToPricing={() => setCurrentView('pricing')} />
            </div>
          </div>
        );
      default:
        return <Hero onStart={() => setCurrentView('detection')} onSolutions={() => setCurrentView('pricing')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 font-inter">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-grow pt-16">
        {renderView()}
      </main>
      <Footer onNavigate={setCurrentView} />
    </div>
  );
};

export default App;
