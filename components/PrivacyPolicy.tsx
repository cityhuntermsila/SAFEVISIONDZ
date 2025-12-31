
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="py-24 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">POLITIQUE DE CONFIDENTIALITÉ</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-[3rem] p-8 md:p-12 shadow-2xl space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-blue-400 uppercase tracking-wide">1. Collecte des Données</h2>
            <p className="text-slate-400 leading-relaxed">
              SafeVision AI traite les flux vidéo en temps réel uniquement dans le but de détecter les équipements de protection individuelle (EPI). Nous ne collectons pas de données biométriques identifiables sans consentement préalable explicite.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-orange-500 uppercase tracking-wide">2. Traitement par l'IA</h2>
            <p className="text-slate-400 leading-relaxed">
              Les images envoyées à notre moteur d'IA via l'API sont chiffrées de bout en bout. Dans le cadre de nos solutions "Entreprise", le traitement peut être configuré pour s'exécuter localement sur vos serveurs (On-Premise) afin de garantir une isolation totale de vos données.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-blue-400 uppercase tracking-wide">3. Utilisation de la Caméra</h2>
            <p className="text-slate-400 leading-relaxed">
              L'accès à la caméra sur cette plateforme est temporaire et local. Aucune image n'est stockée de manière permanente sur nos serveurs de démonstration. Les logs de détection (score de conformité, type d'EPI) sont les seules données conservées à des fins statistiques.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-orange-500 uppercase tracking-wide">4. Vos Droits</h2>
            <p className="text-slate-400 leading-relaxed">
              Conformément aux lois sur la protection des données, vous disposez d'un droit d'accès, de rectification et de suppression de vos informations. Pour toute demande liée à la confidentialité, contactez notre délégué à la protection des données (DPO) via la page contact.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 text-blue-500 font-bold">
              <i className="fas fa-shield-alt text-2xl"></i>
              <span>CERTIFIÉ SECURE-IA</span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono italic">DERNIÈRE MISE À JOUR : OCTOBRE 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
