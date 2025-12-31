
import React from 'react';

const About: React.FC = () => {
  const team = [
    {
      name: "Djeha Rami",
      role: "CEO",
      desc: "15 ans d'expérience en HSE industriel.",
      image: "/images/team-rami.png"
    },
    {
      name: "Khalfat Zakarya",
      role: "Lead AI",
      desc: "Expert Deep Learning & Computer Vision.",
      image: "/images/team-zakarya.png"
    },
    {
      name: "Tabbakh Mostefa",
      role: "CTO",
      desc: "Architecte systèmes temps réel.",
      image: "/images/team-mostefa.png"
    },
    {
      name: "Lebouazda Naoui",
      role: "Expert HSE",
      desc: "Consultant certifié en gestion des risques.",
      image: "/images/team-naoui.png"
    },
    {
      name: "Salamani Hanane",
      role: "Support",
      desc: "Dédiée à la satisfaction client.",
      image: "/images/team-hanane.png"
    }
  ];

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

        {/* Team Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Notre Équipe</h2>
          <div className="w-20 h-2 bg-blue-500 mx-auto mt-6 rounded-full"></div>
          <p className="text-slate-500 mt-8 max-w-2xl mx-auto font-medium text-lg italic">"Les experts qui propulsent l'innovation HSE en Algérie."</p>
        </div>

        {/* Team Layout */}
        <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto pb-12">
          {team.map((m, i) => (
            <div key={i} className="bg-slate-800 p-10 rounded-[3rem] border border-slate-700 text-center hover:border-orange-500/50 transition-all shadow-xl hover:shadow-orange-500/10 group flex flex-col h-full w-full sm:w-[calc(50%-20px)] lg:w-[calc(33.333%-27px)] items-center">
              <div className="w-48 h-48 rounded-[3rem] mb-8 overflow-hidden bg-slate-700 shadow-xl group-hover:scale-105 group-hover:rotate-1 transition-transform duration-500 border-2 border-slate-700 group-hover:border-blue-500">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=2563eb&color=fff&size=200`;
                  }}
                />
              </div>
              <h4 className="text-2xl font-black text-white mb-3 tracking-tighter uppercase">{m.name}</h4>
              <p className="text-orange-500 text-xs font-black uppercase tracking-[0.3em] mb-6 px-4 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">{m.role}</p>
              <p className="text-slate-400 text-base leading-relaxed flex-grow">{m.desc}</p>
              <div className="mt-10 pt-8 border-t border-slate-700/50 flex justify-center gap-6 w-full opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                <i className="fab fa-linkedin text-slate-400 hover:text-blue-500 cursor-pointer text-2xl"></i>
                <i className="fas fa-envelope text-slate-400 hover:text-white cursor-pointer text-2xl"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
