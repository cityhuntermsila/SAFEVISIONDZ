
import React from 'react';
import { View } from '../types';

interface FooterProps {
  onNavigate: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
                <i className="fas fa-eye text-white text-lg"></i>
              </div>
              <span className="text-xl font-black text-white">SafeVision DZ</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">Intelligence Artificielle au service de la sécurité industrielle.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase">Navigation</h4>
            <ul className="space-y-4 text-xs text-slate-500">
              <li><button onClick={() => onNavigate('home')} className="hover:text-orange-400">Accueil</button></li>
              <li><button onClick={() => onNavigate('pricing')} className="hover:text-orange-400">Abonnements</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-orange-400">À Propos</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase">Support</h4>
            <ul className="space-y-4 text-xs text-slate-500">
              <li><button onClick={() => onNavigate('contact')} className="hover:text-orange-400">Contacter nous</button></li>
              <li><button onClick={() => onNavigate('faq')} className="hover:text-orange-400">FAQ</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase">Légal</h4>
            <ul className="space-y-4 text-xs text-slate-500">
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-orange-400">Confidentialité</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-orange-400 text-orange-500 font-bold">Conditions</button></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-700">
          <p>© 2026 SafeVision DZ - M'sila, Algérie.</p>
          <div className="flex items-center gap-4">
             <span className="text-blue-500 font-bold tracking-widest uppercase">label projet innovant</span>
             <i className="fab fa-linkedin text-lg hover:text-white cursor-pointer"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
