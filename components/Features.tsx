
import React from 'react';

const Features: React.FC = () => {
  const benefits = [
    {
      icon: "fa-hard-hat",
      title: "Entièrement automatisé",
      desc: "Il est presque impossible de vérifier si les travailleurs portent des casques de protection et d'autres EPI à tout moment en utilisant uniquement la main-d'œuvre humaine. La détection automatisée des EPI via des caméras IA et l'analyse vidéo est une solution parfaite dans une multitude de contextes."
    },
    {
      icon: "fa-bell",
      title: "Notifications en temps réel",
      desc: "Dès qu'un casque ou tout autre EPI est retiré par un travailleur, une alerte personnalisable retentira immédiatement et le personnel de sécurité recevra une notification instantanée. Cela minimise le temps pendant lequel un travailleur pourrait être en danger."
    },
    {
      icon: "fa-shield-alt",
      title: "Facile à mettre en œuvre",
      desc: "En profitant d'algorithmes d'IA de pointe, la technologie apporte une détection précise des EPI à une sélection de matériel — des caméras vidéo aux équipements de contrôle d'accès — afin de garantir la sécurité des travailleurs dans des environnements dangereux."
    }
  ];

  const applications = [
    {
      title: "Sites de Construction",
      desc: "La détection automatisée des EPI aide les entreprises de construction à réduire les coûts de sécurité et à bénéficier d'une sécurité globale plus intelligente et plus efficace.",
      image: "./images/app-construction.jpg"
    },
    {
      title: "Usines et Entrepôts",
      desc: "Des notifications en temps réel alertent les travailleurs d'usine des violations d'EPI dès l'entrée sur le lieu de travail - et à tout moment de la journée pendant qu'ils travaillent.",
      image: "./images/app-factory.jpg"
    },
    {
      title: "Mines",
      desc: "Les vérifications à distance des EPI par vidéo aident les gestionnaires à s'assurer que les mineurs portent des casques et d'autres EPI dans les environnements miniers dangereux.",
      image: "./images/app-mining.jpg"
    }
  ];

  return (
    <div className="py-24 bg-slate-900 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Benefits Section */}
        <div className="text-center mb-32">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-20 tracking-tight">
            Quels sont les avantages de la détection des EPI ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-orange-500/10 border-2 border-orange-500/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-orange-500/50 transition-all duration-300 shadow-[0_0_30px_rgba(249,115,22,0.1)]">
                  <i className={`fas ${benefit.icon} text-3xl text-orange-500`}></i>
                </div>
                <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">
                  {benefit.title}
                </h3>
                <p className="text-slate-400 leading-relaxed font-medium max-w-sm">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main highlight section - Centered Layout */}
        <div className="flex flex-col items-center text-center mb-32 pt-24 border-t border-slate-800/30">
          <div className="max-w-4xl space-y-8 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
              Technologie V32
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter uppercase">
              Détection des EPI
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed">
              Améliorez la sécurité sur le lieu de travail et réduisez votre responsabilité grâce au logiciel de détection des EPI <span className="text-blue-500">SafeVision DZ</span>.
            </p>
            
            <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto pt-6">
              {[
                "Complétez vos caméras existantes",
                "Détecte les casques de sécurité et les vêtements de travail à haute visibilité",
                "Mise en place de lignes de détection et d'alertes personnalisées"
              ].map((item, i) => (
                <div key={i} className="w-full flex items-center justify-center gap-4 p-4 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/30 transition-all">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-check text-blue-500 text-sm"></i>
                  </div>
                  <p className="text-slate-200 font-bold">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full max-w-2xl">
             <div className="bg-gradient-to-br from-blue-600 to-orange-600 p-1 rounded-[3rem] shadow-2xl">
                <div className="bg-slate-900 rounded-[2.8rem] overflow-hidden p-12 text-center space-y-8">
                   <div className="w-40 h-40 rounded-full border-4 border-orange-500/20 border-t-orange-500 flex items-center justify-center mx-auto mb-4 bg-orange-500/5">
                      <div className="text-5xl font-black text-white">91%</div>
                   </div>
                   <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Précision de Détection</h3>
                   <p className="text-slate-400 text-lg leading-relaxed max-w-md mx-auto">
                     Entraîné sur de vraies images de télévision en circuit fermé. Notre dernier modèle de détection des EPI (V32) identifie les casques de sécurité et les vestes hi-vis avec une précision de 91%.
                   </p>
                   <div className="pt-4 flex justify-center flex-wrap gap-4">
                      <span className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-400 border border-slate-700 uppercase tracking-widest">Casques</span>
                      <span className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-400 border border-slate-700 uppercase tracking-widest">Gilets</span>
                      <span className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-400 border border-slate-700 uppercase tracking-widest">Gants</span>
                      <span className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-400 border border-slate-700 uppercase tracking-widest">Lunettes</span>
                      <span className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-400 border border-slate-700 uppercase tracking-widest">Chaussures</span>
                   </div>
                </div>
             </div>
             <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full"></div>
             <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-orange-500/10 blur-3xl rounded-full"></div>
          </div>
        </div>

        {/* Application Areas Section - NEW */}
        <div className="py-24 border-t border-slate-800/30 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Où la technologie de détection des EPI peut-elle être appliquée ?
          </h2>
          <p className="text-slate-400 mb-20 max-w-3xl mx-auto font-medium">
            La technologie de détection des EPI de <span className="text-blue-400">SafeVision DZ</span> est appliquée dans plusieurs environnements de travail à haut risque. Voici quelques exemples ci-dessous.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {applications.map((app, i) => (
              <div key={i} className="bg-slate-800 rounded-[2.5rem] overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group flex flex-col h-full text-left">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={app.image} alt={app.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                </div>
                <div className="p-10 flex flex-col flex-grow text-center">
                  <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">
                    {app.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {app.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary detailed section - Centered */}
        <div className="flex flex-col items-center gap-12 text-center pt-24 border-t border-slate-800/30">
           <div className="max-w-4xl space-y-8">
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight">
                Détecter les casques de protection et les vestes à haute visibilité
              </h3>
              <p className="text-slate-400 leading-relaxed text-xl italic border-y-2 border-orange-500/30 py-8 px-6">
                Le respect des réglementations en matière de santé et de sécurité - comme l'utilisation correcte des équipements de protection individuelle (EPI) - est plus important que jamais. Non seulement pour la sécurité de vos employés, mais aussi pour la responsabilité de votre organisation.
              </p>
           </div>
           
           <div className="bg-slate-800/50 p-10 rounded-[3rem] border border-slate-700 max-w-3xl shadow-xl">
              <p className="text-slate-300 text-lg leading-relaxed">
                Le logiciel de détection des EPI de <span className="text-blue-400 font-bold">SafeVision DZ</span> transforme vos caméras de vidéosurveillance existantes en une puissante solution de sécurité. Alimenté par l'IA, il surveille les lignes définies par l'utilisateur et vérifie en temps réel la conformité des EPI, en particulier les casques de sécurité et les vestes à haute visibilité.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
