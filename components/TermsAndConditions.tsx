
import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="py-24 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">CONDITIONS GÉNÉRALES D'UTILISATION</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-[3rem] p-8 md:p-12 shadow-2xl space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-blue-400 uppercase tracking-wide">1. Objet du Service</h2>
            <p className="text-slate-400 leading-relaxed">
              SafeVision DZ fournit une plateforme de détection d'EPI par vision artificielle. Ce service est un outil d'assistance à la sécurité et ne remplace en aucun cas la responsabilité humaine ou les protocoles HSE obligatoires sur site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-orange-500 uppercase tracking-wide">2. Utilisation de la Démo</h2>
            <p className="text-slate-400 leading-relaxed">
              L'outil de démonstration est fourni "en l'état". Bien que nos modèles atteignent une précision élevée, des faux positifs ou négatifs peuvent survenir en raison des conditions d'éclairage, de l'angle de la caméra ou de la qualité du flux vidéo.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-blue-400 uppercase tracking-wide">3. Propriété Intellectuelle</h2>
            <p className="text-slate-400 leading-relaxed">
              Tous les algorithmes, interfaces et marques présents sur ce site sont la propriété exclusive de SafeVision DZ. Toute reproduction ou rétro-ingénierie des modèles d'IA est strictement interdite.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-orange-500 uppercase tracking-wide">4. Limitation de Responsabilité</h2>
            <p className="text-slate-400 leading-relaxed">
              SafeVision DZ ne peut être tenu responsable des accidents survenant sur les sites utilisant nos solutions. L'IA est un complément de vigilance et non un dispositif de sécurité infaillible.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-blue-400 uppercase tracking-wide">5. Droit Applicable</h2>
            <p className="text-slate-400 leading-relaxed">
              Les présentes conditions sont régies par la législation algérienne. Tout litige relatif à l'utilisation du service sera soumis à la juridiction compétente du tribunal d'Alger.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 text-orange-500 font-bold">
              <i className="fas fa-gavel text-2xl"></i>
              <span>CADRE LÉGAL DZ-IA</span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono italic">VERSION 1.0.2 - RÉVISÉE LE 15 OCTOBRE 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
