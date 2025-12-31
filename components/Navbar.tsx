
import React, { useState } from 'react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { label: string; id: View }[] = [
    { label: 'Accueil', id: 'home' },
    { label: 'Abonnements', id: 'pricing' },
    { label: 'Démo', id: 'detection' },
    { label: 'À Propos', id: 'about' },
    { label: 'Contacter nous', id: 'contact' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-slate-900/90 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
                <i className="fas fa-eye text-white text-xl"></i>
              </div>
              <span className="text-xl font-black tracking-tighter text-white">
                SAFE<span className="text-orange-500">VISION</span><span className="text-blue-500 ml-1">DZ</span>
              </span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    currentView === item.id 
                    ? 'text-orange-400 bg-orange-500/10' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  } ${item.id === 'detection' ? 'text-blue-400 border border-blue-500/30' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-400 p-2">
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setIsOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-xl font-bold ${
                currentView === item.id ? 'text-orange-400 bg-slate-800' : 'text-slate-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
