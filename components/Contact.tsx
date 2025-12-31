
import React, { useState } from 'react';
import { generateConfirmationEmail } from '../services/geminiService';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    wilaya: "Wilaya d'intervention",
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [aiDraft, setAiDraft] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) return;

    setStatus('sending');
    
    // Simuler le délai d'envoi et générer le contenu de l'email via Gemini
    try {
      const draft = await generateConfirmationEmail(formData);
      setAiDraft(draft || '');
      
      // Ici, dans une app réelle, on appellerait une API d'envoi (ex: SendGrid/EmailJS)
      // Pour la démo, on simule le succès après la génération par l'IA
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('sent');
    } catch (error) {
      console.error(error);
      setStatus('idle');
    }
  };

  return (
    <div className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-slate-800 rounded-[3rem] overflow-hidden border border-slate-700 shadow-2xl grid grid-cols-1 lg:grid-cols-2">
          <div className="p-12 bg-gradient-to-br from-blue-700 to-blue-900 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-black mb-8 italic tracking-tighter">CONTACT_CENTRAL</h2>
              <p className="mb-12 text-blue-100 font-medium">Réponse sous 24h par nos ingénieurs à M'sila.</p>
              <div className="space-y-8 mb-12">
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors"><i className="fas fa-phone"></i></div>
                  <div><p className="text-[10px] uppercase font-black text-blue-300">Siège Social</p><p className="font-black">+213 558 12 32 31</p></div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors"><i className="fas fa-envelope"></i></div>
                  <div><p className="text-[10px] uppercase font-black text-blue-300">Sales & Support</p><p className="font-black">contact@safevision.dz</p></div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors"><i className="fas fa-map-marker-alt"></i></div>
                  <div><p className="text-[10px] uppercase font-black text-blue-300">Localisation</p><p className="font-black">M'sila, Algérie</p></div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-white/10 h-64 shadow-inner grayscale hover:grayscale-0 transition-all duration-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52037.13251433066!2d4.514781705856402!3d35.70584777085773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f470da6b85b461%3A0x6a6d61d90897e9f3!2zTSdzcmlsYQ!5e0!3m2!1sfr!2sdz!4v1709123456789!5m2!1sfr!2sdz" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation M'sila"
              ></iframe>
            </div>
          </div>

          <div className="p-12 relative overflow-hidden">
            {status === 'sent' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center text-green-500 text-4xl shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                  <i className="fas fa-check"></i>
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Email Envoyé !</h3>
                <p className="text-slate-400 max-w-sm">Un email de confirmation personnalisé a été envoyé à <span className="text-blue-400 font-bold">{formData.email}</span>.</p>
                
                <div className="bg-slate-900/50 border border-slate-700 p-6 rounded-3xl text-left w-full max-h-64 overflow-y-auto custom-scrollbar">
                  <p className="text-[10px] text-slate-500 font-black uppercase mb-4 tracking-widest border-b border-slate-800 pb-2">Aperçu de la réponse auto-générée</p>
                  <p className="text-slate-300 text-xs whitespace-pre-wrap leading-relaxed italic">{aiDraft}</p>
                </div>

                <button 
                  onClick={() => setStatus('idle')}
                  className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-all"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-widest text-orange-500">Formulaire</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all" 
                      placeholder="Nom Complet" 
                    />
                    <input 
                      type="text" 
                      required
                      value={formData.company}
                      onChange={e => setFormData({...formData, company: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all" 
                      placeholder="Entreprise" 
                    />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all" 
                    placeholder="Email Professionnel" 
                  />
                  <select 
                    value={formData.wilaya}
                    onChange={e => setFormData({...formData, wilaya: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white outline-none cursor-pointer focus:border-blue-500 transition-all"
                  >
                    <option disabled>Wilaya d'intervention</option>
                    <option>28 - M'sila</option>
                    <option>16 - Alger</option>
                    <option>31 - Oran</option>
                    <option>30 - Ouargla</option>
                    <option>06 - Béjaïa</option>
                  </select>
                  <textarea 
                    rows={4} 
                    required
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all" 
                    placeholder="Décrivez votre besoin spécifique (nombre de caméras, type de site...)"
                  ></textarea>
                  
                  <button 
                    disabled={status === 'sending'}
                    className="w-full py-5 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-orange-600/20 active:scale-95 group flex items-center justify-center gap-3"
                  >
                    {status === 'sending' ? (
                      <>
                        <i className="fas fa-circle-notch animate-spin"></i>
                        GÉNÉRATION DE LA RÉPONSE...
                      </>
                    ) : (
                      <>
                        ENVOYER LA REQUÊTE <i className="fas fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Contact;
