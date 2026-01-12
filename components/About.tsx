
import React from 'react';

const About: React.FC = () => {

  const features = [
    {
      title: "Détecte et vérifie les EPI",
      desc: "Obtenez des résultats instantanés sur la conformité des EPI sur l'ensemble de vos sites.",
      color: "bg-purple-500/10 border-purple-500/30",
      textColor: "text-purple-400"
    },
    {
      title: "Tableau de bord centralisé",
      desc: "Visualisez tous vos sites et caméras à partir d'un tableau de bord centralisé.",
      color: "bg-blue-500/10 border-blue-500/30",
      textColor: "text-blue-400"
    },
    {
      title: "Fonctionne avec vos caméras existantes",
      desc: "Compatible avec des centaines de marques de caméras et d'enregistreurs.",
      color: "bg-emerald-500/10 border-emerald-500/30",
      textColor: "text-emerald-400"
    },
    {
      title: "Lignes de détection personnalisées",
      desc: "Personnalisez les lignes sur le site dont vous souhaitez contrôler la conformité.",
      color: "bg-slate-500/10 border-slate-500/30",
      textColor: "text-slate-400"
    }
  ];

  return (
    <div className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Title */}
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">Souveraineté Technologique</h1>
          <div className="w-24 h-2 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Mission Section */}
        <div className="flex flex-col items-center text-center mb-40 max-w-4xl mx-auto">
          <div className="relative group mb-16 w-full max-w-2xl">
            <div className="aspect-video rounded-[3rem] overflow-hidden border border-slate-700 shadow-2xl">
              <img src="./images/about-algeria-industry.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="DZ Industry" />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 px-10 py-6 rounded-3xl shadow-2xl border border-white/10">
              <p className="text-4xl font-black text-white leading-none">100%</p>
              <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest mt-1">Made in Algeria</p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Notre Mission</h2>
            <p className="text-slate-400 text-xl leading-relaxed">
              Démocratiser l'IA pour sauver des vies sur les chantiers algériens. <br />
              Nous adaptons la technologie de pointe aux défis locaux du terrain pour garantir un environnement de travail sans risque.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <div className="flex flex-col items-center gap-4 p-8 rounded-[2.5rem] bg-slate-800/50 border border-slate-700 w-full sm:w-80">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-2">
                  <i className="fas fa-microchip text-blue-500 text-3xl"></i>
                </div>
                <p className="text-white font-bold text-sm">Modèles IA optimisés pour les flux vidéo locaux.</p>
              </div>
              <div className="flex flex-col items-center gap-4 p-8 rounded-[2.5rem] bg-slate-800/50 border border-slate-700 w-full sm:w-80">
                <div className="w-16 h-16 rounded-2xl bg-orange-600/20 flex items-center justify-center mb-2">
                  <i className="fas fa-user-shield text-orange-500 text-3xl"></i>
                </div>
                <p className="text-white font-bold text-sm">Support technique basé à Alger et M'sila.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="mb-40">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 max-w-4xl mx-auto leading-tight uppercase tracking-tighter">
              Caractéristiques du Système
            </h2>
            <p className="text-slate-500 font-medium">L'excellence opérationnelle au service du HSE.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className={`${f.color} border p-12 rounded-[3rem] flex flex-col items-center text-center min-h-[320px] hover:scale-[1.05] transition-all duration-500 shadow-xl hover:shadow-2xl`}>
                <div className="w-12 h-1 bg-white/20 rounded-full mb-8"></div>
                <h3 className="text-2xl font-black text-white mb-6 leading-tight uppercase tracking-tighter">
                  {f.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mt-auto">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
