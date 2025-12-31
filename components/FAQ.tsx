
import React, { useState } from 'react';
import { View } from '../types';

interface FAQItemProps {
  question: string;
  answer: string | React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-800 last:border-0" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <div className="w-full py-6 flex items-center justify-between text-left cursor-help group">
        <span className={`text-lg font-bold transition-all duration-300 ${isOpen ? 'text-blue-400' : 'text-slate-300'}`}>{question}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${isOpen ? 'bg-orange-500 border-orange-500 rotate-180' : 'bg-transparent border-slate-700'}`}>
          <i className={`fas fa-chevron-down text-xs ${isOpen ? 'text-white' : 'text-slate-500'}`}></i>
        </div>
      </div>
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-400 leading-relaxed pl-4 border-l-2 border-orange-500/50 italic">{answer}</p>
      </div>
    </div>
  );
};

interface FAQProps {
  onNavigate: (view: View) => void;
}

const FAQ: React.FC<FAQProps> = ({ onNavigate }) => {
  const faqs = [
    { 
      question: "Pourquoi le HSE est-il devenu une priorité absolue dans l'industrie moderne ?", 
      answer: "Le HSE (Hygiène, Sécurité, Environnement) n'est plus seulement une obligation légale, c'est un pilier de la performance globale. Il garantit la continuité des opérations en évitant les arrêts coûteux liés aux accidents, réduit les primes d'assurance et renforce l'image de marque de l'entreprise auprès de ses partenaires et employés." 
    },
    { 
      question: "Quelles sont les statistiques marquantes sur les accidents de travail liés aux EPI ?", 
      answer: "Selon les études industrielles mondiales, près de 45% des accidents graves pourraient être évités par le port correct des EPI (casques, gilets, gants). De plus, l'erreur humaine ou l'oubli est responsable de 60% des non-conformités constatées lors des inspections HSE inopinées." 
    },
    { 
      question: "Pourquoi privilégier la vision artificielle pour la détection des EPI ?", 
      answer: "Contrairement à l'humain, l'IA ne connaît pas la fatigue. Elle peut surveiller simultanément des dizaines de flux vidéo avec une attention constante, 24h/24. Cela permet une détection instantanée (moins d'une seconde) et une alerte immédiate avant qu'un travailleur n'entre dans une zone de danger sans protection." 
    },
    { 
      question: "Comment SafeVision s'intègre-t-il aux systèmes de surveillance existants ?", 
      answer: "Notre solution est conçue pour être agnostique. Elle se connecte via les protocoles standards (RTSP/ONVIF) à vos caméras IP déjà en place. Aucune nouvelle installation de câblage complexe n'est nécessaire, ce qui réduit drastiquement les coûts de déploiement." 
    },
    { 
      question: "Quelle est la précision réelle des algorithmes de détection SafeVision ?", 
      answer: "Nos modèles de Deep Learning atteignent une précision supérieure à 98.5% dans des conditions d'éclairage industriel standard. Le système est spécifiquement entraîné pour distinguer les équipements même dans des environnements complexes (poussière, reflets, angles difficiles)." 
    },
    { 
      question: "Qu'en est-il de la confidentialité lors du traitement des images ?", 
      answer: "Nous appliquons des principes stricts de protection des données. Les visages peuvent être floutés automatiquement par l'IA, et nous proposons des options 'On-Premise' où le traitement s'effectue localement sur vos serveurs sans qu'aucune image ne quitte jamais votre réseau interne." 
    },
    { 
      question: "Quel est le retour sur investissement (ROI) attendu ?", 
      answer: "Le ROI est généralement atteint en moins de 12 mois grâce à la réduction drastique des accidents, à la baisse des coûts administratifs liés à la gestion des incidents et à l'optimisation des flux de travail des inspecteurs HSE." 
    },
    { 
      question: "Le système peut-il fonctionner sans connexion Internet ?", 
      answer: "Absolument. Pour nos clients industriels stratégiques, nous fournissons des boîtiers 'Edge AI' autonomes. Toute l'intelligence est embarquée sur site, garantissant une souveraineté totale sur vos données et une réactivité maximale même en zone blanche." 
    }
  ];

  return (
    <div className="py-24 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">FAQ_CENTRAL_SYSTEM</h2>
          <p className="text-slate-500 font-medium">Tout ce que vous devez savoir sur la sécurité intelligente et notre technologie.</p>
        </div>
        <div className="bg-slate-800/50 p-8 md:p-12 rounded-[3rem] border border-slate-700 shadow-2xl backdrop-blur-sm">
          {faqs.map((f, i) => <FAQItem key={i} question={f.question} answer={f.answer} />)}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-6">Vous avez une question spécifique à votre secteur ?</p>
          <button 
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-2xl font-bold border border-blue-500/30 transition-all"
          >
            PARLER À UN EXPERT HSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
