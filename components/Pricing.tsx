
import React, { useState } from 'react';
import { SubscriptionTier } from '../types';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      tier: SubscriptionTier.FREE,
      price: "0 DA",
      description: "Pour tester l'IA sur un petit projet.",
      cta: "Essai Gratuit",
      features: [
        { text: "1 Caméra live", included: true },
        { text: "Détection 2 types d'EPI", included: true },
        { text: "Historique 12h", included: true },
        { text: "Alertes Mobile", included: false },
        { text: "Rapports PDF", included: false },
      ]
    },
    {
      tier: SubscriptionTier.ADVANCED,
      price: isAnnual ? "3 500 DA" : "5 000 DA",
      description: "Parfait pour les PME du bâtiment.",
      cta: "Choisir Premium",
      popular: true,
      features: [
        { text: "10 Caméras", included: true },
        { text: "Alertes SMS", included: true },
        { text: "Support local 24/7", included: true },
        { text: "Historique 30 jours", included: true },
        { text: "Dashboard HSE", included: true },
      ]
    },
    {
      tier: SubscriptionTier.BUSINESS,
      price: "Sur Devis",
      description: "Grands comptes et sites industriels.",
      cta: "Nous contacter",
      features: [
        { text: "Caméras illimitées", included: true },
        { text: "Installation sur site", included: true },
        { text: "API personnalisée", included: true },
        { text: "Formation HSE", included: true },
        { text: "SLA Garanti", included: true },
      ]
    }
  ];

  return (
    <div className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white mb-4">Investissez dans la Sécurité</h2>
          <p className="text-slate-400">Des tarifs adaptés au marché algérien pour sauver des vies.</p>
        </div>

        <div className="flex justify-center items-center gap-4 mb-16">
          <span className={`text-sm font-bold ${!isAnnual ? 'text-blue-400' : 'text-slate-500'}`}>Mensuel</span>
          <button onClick={() => setIsAnnual(!isAnnual)} className="w-14 h-7 bg-slate-800 rounded-full relative p-1">
            <div className={`w-5 h-5 bg-orange-500 rounded-full transition-transform ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`}></div>
          </button>
          <span className={`text-sm font-bold ${isAnnual ? 'text-blue-400' : 'text-slate-500'}`}>Annuel</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.tier} className={`p-8 rounded-[2.5rem] border transition-all ${plan.popular ? 'bg-slate-800 border-blue-500 shadow-2xl shadow-blue-500/10 scale-105' : 'bg-slate-800/50 border-slate-700 hover:border-blue-500/30'}`}>
              <h3 className="text-xl font-black text-white mb-4 uppercase tracking-wider">{plan.tier}</h3>
              <div className="mb-6">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                {plan.price !== "Sur Devis" && <span className="text-slate-500 text-sm">/mois</span>}
              </div>
              <p className="text-slate-400 text-sm mb-8">{plan.description}</p>
              <ul className="space-y-4 mb-10 border-t border-slate-700 pt-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm">
                    <i className={`fas ${feature.included ? 'fa-check text-blue-500' : 'fa-times text-slate-700'}`}></i>
                    <span className={feature.included ? 'text-slate-200' : 'text-slate-600'}>{feature.text}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-2xl font-black transition-all ${plan.popular ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-xl' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
