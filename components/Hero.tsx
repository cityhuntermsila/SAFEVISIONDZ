
import React from 'react';

interface HeroProps {
  onStart: () => void;
  onSolutions: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart, onSolutions }) => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="./images/hero-industrial-monitoring.jpg"
          alt="Monitoring Background"
          className="w-full h-full object-cover opacity-20"
        />
        {/* Dark Overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/40 to-slate-900"></div>
        <div className="absolute inset-0 bg-slate-900/60"></div>

      </div>

      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-30 z-0">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-orange-600/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 backdrop-blur-md border border-slate-700 text-blue-400 text-xs font-black uppercase tracking-widest mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
            Vision Industrielle
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-none tracking-tighter">
            SÉCURITÉ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-orange-400 to-red-500">
              AUGMENTÉE
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
            Détection automatique des équipements de protection individuelle en temps réel. <br className="hidden md:block" />
            <span className="text-white/80">Réduisez les risques sur vos sites industriels avec l'IA.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={onStart}
              className="group relative w-full sm:w-auto px-12 py-6 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl font-black text-xl transition-all shadow-2xl shadow-orange-600/40 overflow-hidden active:scale-95"
            >
              DÉMARRER LA DÉMO
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
            <button
              onClick={onSolutions}
              className="w-full sm:w-auto px-12 py-6 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white rounded-2xl font-bold text-xl border border-white/20 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              NOS SOLUTIONS <i className="fas fa-chevron-right text-sm"></i>
            </button>
          </div>

          {/* Bottom Floating Stats */}
          <div className="mt-20 flex justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-blue-500 font-black text-2xl md:text-3xl">91%</p>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-1">Précision</p>
            </div>
            <div className="w-px h-12 bg-slate-800"></div>
            <div className="text-center">
              <p className="text-orange-500 font-black text-2xl md:text-3xl">1.2s</p>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-1">Réponse</p>
            </div>
            <div className="w-px h-12 bg-slate-800"></div>
            <div className="text-center">
              <p className="text-white font-black text-2xl md:text-3xl">24/7</p>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-1">Analyse</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;
