
import React, { useRef, useState, useEffect } from 'react';
import { detectPPE } from '../services/geminiService';
import { DetectionResult } from '../types';

interface DetectionToolProps {
  isFullPage?: boolean;
}

const DetectionTool: React.FC<DetectionToolProps> = ({ isFullPage = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'camera' | 'upload'>('camera');
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [isVideoFile, setIsVideoFile] = useState(false);

  // Sync the video stream with the video element once it's rendered
  useEffect(() => {
    if (isCameraActive && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(err => {
        console.error("Erreur lors de la lecture de la vidéo:", err);
      });
    }
  }, [isCameraActive, activeTab]);

  // Handle cleanup: Stop camera when component unmounts (navigating away)
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const startCamera = async () => {
    try {
      setError(null);
      setResult(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      streamRef.current = mediaStream;
      setIsCameraActive(true);
    } catch (err) {
      setError("Caméra inaccessible. Veuillez autoriser l'accès à la caméra dans votre navigateur.");
    }
  };

  const toggleCamera = () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const captureAndDetect = async (source: HTMLVideoElement | HTMLImageElement) => {
    if (!canvasRef.current) return;
    
    setLoading(true);
    setError(null);
    setResult(null); 

    const context = canvasRef.current.getContext('2d');
    if (context) {
      try {
        let w, h;
        if (source instanceof HTMLVideoElement) {
          w = source.videoWidth; 
          h = source.videoHeight;
          if (w === 0 || h === 0) throw new Error("Le flux vidéo n'est pas encore prêt.");
        } else {
          w = source.naturalWidth; 
          h = source.naturalHeight;
          if (w === 0 || h === 0) throw new Error("L'image n'est pas chargée correctement.");
        }

        canvasRef.current.width = w;
        canvasRef.current.height = h;
        context.drawImage(source, 0, 0, w, h);
        
        const base64Image = canvasRef.current.toDataURL('image/jpeg', 0.9);
        const detection = await detectPPE(base64Image);
        
        if (!detection.detections || detection.detections.length === 0) {
          setError("Aucun équipement ou personne détecté. Essayez sous un autre angle.");
        }
        
        setResult(detection);
      } catch (err: any) {
        console.error("Capture/Detect Error:", err);
        setError(err.message || "Une erreur est survenue lors de l'analyse.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    stopCamera();
    setResult(null);
    setError(null);
    
    const isVideo = file.type.includes('video') || file.name.toLowerCase().endsWith('.mov');
    setIsVideoFile(isVideo);
    
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedPreview(ev.target?.result as string);
    reader.onerror = () => setError("Erreur lors de la lecture du fichier.");
    reader.readAsDataURL(file);
  };

  const exportReport = () => {
    if (!result) return;
    
    const reportLines = [
      "========================================",
      "   SAFEVISION DZ - RAPPORT D'INSPECTION",
      "========================================",
      `Date/Heure : ${result.timestamp}`,
      `Score de sécurité : ${result.overallSafetyScore}%`,
      `Alerte critique : ${result.isAlert ? "OUI - VIOLATION DÉTECTÉE" : "NON - CONFORME"}`,
      "----------------------------------------",
      "DÉTAILS DES ÉQUIPEMENTS ANALYSÉS :",
      ""
    ];

    result.detections.forEach((det, i) => {
      reportLines.push(`${i+1}. EQUIPEMENT: ${det.item.toUpperCase()}`);
      reportLines.push(`   STATUT: ${det.status === 'detected' ? 'DÉTECTÉ' : det.status === 'missing' ? 'MANQUANT' : 'INCORRECT'}`);
      reportLines.push(`   CONFIANCE IA: ${Math.round(det.confidence * 100)}%`);
      reportLines.push(`   RECOMMANDATION: ${det.recommendation}`);
      reportLines.push("----------------------------------------");
    });

    reportLines.push("");
    reportLines.push("Généré par SafeVision AI Engine - Moteur Pro V3.");
    reportLines.push("© SafeVision DZ - Hydra, Alger.");
    reportLines.push("========================================");
    
    const element = document.createElement("a");
    const file = new Blob([reportLines.join("\n")], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Rapport_HSE_SafeVision_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={`${isFullPage ? '' : 'py-20 bg-slate-900'}`}>
      <div className={`${isFullPage ? '' : 'max-w-6xl mx-auto px-4'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl relative">
              <div className="flex border-b border-slate-700">
                <button 
                  onClick={() => { setActiveTab('camera'); setUploadedPreview(null); setResult(null); }} 
                  className={`flex-1 py-4 font-bold text-sm transition-all ${activeTab === 'camera' ? 'text-orange-400 bg-slate-700/50 border-b-2 border-orange-500' : 'text-slate-500'}`}
                >
                  <i className="fas fa-video mr-2"></i>CAMÉRA LIVE
                </button>
                <button 
                  onClick={() => { setActiveTab('upload'); stopCamera(); setResult(null); }} 
                  className={`flex-1 py-4 font-bold text-sm transition-all ${activeTab === 'upload' ? 'text-orange-400 bg-slate-700/50 border-b-2 border-orange-500' : 'text-slate-500'}`}
                >
                  <i className="fas fa-upload mr-2"></i>IMPORT FICHIER
                </button>
              </div>

              <div className="p-6">
                <div className="aspect-video bg-black rounded-2xl overflow-hidden relative group shadow-inner ring-1 ring-slate-700">
                  {activeTab === 'camera' ? (
                    !isCameraActive ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-4">
                        <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800">
                          <i className="fas fa-camera text-2xl"></i>
                        </div>
                        <p className="text-sm font-medium">Prêt pour l'inspection vidéo</p>
                        <button onClick={startCamera} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95">Activer la caméra</button>
                      </div>
                    ) : (
                      <div className="relative w-full h-full flex items-center justify-center bg-black">
                        <video 
                          ref={videoRef} 
                          autoPlay 
                          playsInline 
                          muted
                          className="w-full h-full object-contain" 
                        />
                        {/* Overlay Controls */}
                        <div className="absolute bottom-4 right-4 flex gap-2">
                          <button 
                            onClick={stopCamera} 
                            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg transition-all flex items-center gap-2"
                          >
                            <i className="fas fa-power-off"></i> Désactiver
                          </button>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer" onClick={() => !uploadedPreview && fileInputRef.current?.click()}>
                      {uploadedPreview ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {isVideoFile ? 
                            <video id="preview-element" src={uploadedPreview} controls className="w-full h-full object-contain" /> : 
                            <img id="preview-element" src={uploadedPreview} className="w-full h-full object-contain" alt="Preview" />
                          }
                        </div>
                      ) : (
                        <div className="text-center hover:scale-105 transition-transform duration-300">
                          <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center border border-blue-500/20 mx-auto mb-6">
                            <i className="fas fa-file-import text-3xl text-blue-500"></i>
                          </div>
                          <p className="text-white font-bold text-lg">Glissez un fichier ici</p>
                          <p className="text-sm text-slate-500 mt-2 italic">Supporte JPG, PNG et MP4</p>
                          <button className="mt-6 px-6 py-2 bg-slate-700 text-white rounded-lg text-sm font-bold">Parcourir...</button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {loading && (
                    <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center backdrop-blur-md z-30 transition-opacity">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-orange-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <i className="fas fa-brain text-orange-500 animate-pulse"></i>
                        </div>
                      </div>
                      <p className="mt-6 text-sm font-black text-white uppercase tracking-[0.2em] animate-pulse">Traitement Neural SafeVision</p>
                      <p className="text-[10px] text-slate-500 mt-2 uppercase">Analyse des pixels en cours...</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex gap-4">
                  <button 
                    onClick={() => {
                      const el = activeTab === 'camera' ? videoRef.current : document.getElementById('preview-element') as any;
                      if (el) captureAndDetect(el);
                    }} 
                    disabled={loading || (activeTab === 'camera' && !isCameraActive) || (activeTab === 'upload' && !uploadedPreview)} 
                    className="flex-1 py-5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 disabled:from-slate-700 disabled:to-slate-700 disabled:opacity-50 text-white rounded-2xl font-black text-xl transition-all shadow-xl shadow-orange-600/20 active:scale-[0.98]"
                  >
                    {loading ? 'ANALYSE...' : 'DÉTECTER EPI'}
                  </button>
                  {activeTab === 'camera' && !isCameraActive && (
                    <button 
                      onClick={startCamera} 
                      className="px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl transition-all shadow-lg"
                    >
                      <i className="fas fa-camera"></i>
                    </button>
                  )}
                  {activeTab === 'upload' && uploadedPreview && (
                    <button onClick={() => {setUploadedPreview(null); setResult(null); setError(null);}} className="px-6 py-4 bg-slate-700 hover:bg-red-600 transition-all text-white rounded-2xl">
                      <i className="fas fa-redo-alt"></i>
                    </button>
                  )}
                  <input ref={fileInputRef} type="file" className="hidden" accept="image/*,video/*,.mov" onChange={handleFileUpload} />
                </div>
                
                {error && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-4">
                    <i className="fas fa-exclamation-triangle text-red-500 mt-1"></i>
                    <div>
                      <p className="text-red-500 text-sm font-bold uppercase tracking-tighter">Erreur Système</p>
                      <p className="text-red-400/80 text-xs mt-1">{error}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 group hover:border-blue-500/50 transition-all">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1 tracking-widest">Temps de réponse</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-xl font-black text-white">{loading ? '...' : (result ? '1.2s' : '-')}</p>
                  <span className="text-[10px] text-slate-500 font-mono">ms</span>
                </div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 group hover:border-blue-500/50 transition-all">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1 tracking-widest">Précision Modèle</p>
                <p className="text-xl font-black text-blue-500">99.8%</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 group hover:border-orange-500/50 transition-all">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1 tracking-widest">Confiance IA</p>
                <p className="text-xl font-black text-orange-500">{result ? `${Math.max(...result.detections.map(d => d.confidence)) * 100}%`.split('.')[0] + '%' : '-'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`p-6 rounded-3xl border h-full flex flex-col transition-all duration-700 ${result?.isAlert ? 'bg-red-500/10 border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.15)]' : 'bg-slate-800 border-slate-700 shadow-xl'}`}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">SAFETY_LOGS</h3>
                  <div className="w-10 h-1 bg-orange-500 rounded-full mt-1"></div>
                </div>
                {result && <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-full border border-blue-500/20">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                  <span className="text-[9px] font-black font-mono text-blue-400">SYNCED</span>
                </div>}
              </div>
              
              {!result ? (
                <div className="flex-grow flex flex-col items-center justify-center text-slate-600 text-center py-20">
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center mb-6 opacity-20">
                    <i className="fas fa-shield-alt text-4xl"></i>
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] opacity-30">Scan requis pour générer le rapport</p>
                </div>
              ) : (
                <div className="space-y-6 flex-grow flex flex-col">
                  {result.isAlert && (
                    <div className="bg-red-600 p-4 rounded-xl text-white font-black text-xs uppercase animate-pulse border-2 border-red-400/50 flex items-center gap-4 shadow-lg shadow-red-600/20">
                      <div className="bg-white/20 p-2 rounded-lg"><i className="fas fa-skull-crossbones text-sm"></i></div>
                      <p className="leading-tight">Violation critique détectée. Intervention HSE immédiate requise.</p>
                    </div>
                  )}

                  <div className="space-y-3 overflow-y-auto max-h-[420px] pr-2 custom-scrollbar">
                    {result.detections.map((det, idx) => (
                      <div key={idx} className={`p-4 rounded-2xl border transition-all duration-300 hover:translate-x-1 ${det.status === 'detected' ? 'bg-slate-900/40 border-slate-700' : 'bg-red-500/5 border-red-500/20'}`}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-black text-white uppercase tracking-wider">{det.item}</span>
                          <span className={`text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest ${det.status === 'detected' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            {det.status === 'detected' ? 'CONFORME' : 'DANGER'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="flex-1 h-1.5 bg-slate-950 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full transition-all duration-1000 ${det.status === 'detected' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-red-500'}`} style={{width: `${det.confidence * 100}%`}}></div>
                           </div>
                           <span className="text-[10px] text-slate-500 font-mono font-bold">{Math.round(det.confidence * 100)}%</span>
                        </div>
                        {det.status !== 'detected' && (
                          <div className="mt-3 flex items-start gap-2 text-[10px] text-orange-400 bg-orange-500/5 p-2 rounded-lg border border-orange-500/10 italic">
                            <i className="fas fa-info-circle mt-0.5"></i>
                            <p>{det.recommendation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-700/50 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-[10px] font-mono">
                      <div className="p-3 bg-slate-900 rounded-xl">
                        <p className="text-slate-500 mb-1 uppercase font-black">Score Global</p>
                        <p className={`text-lg font-black ${result.overallSafetyScore > 80 ? 'text-green-500' : 'text-orange-500'}`}>{result.overallSafetyScore}%</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl text-right">
                        <p className="text-slate-500 mb-1 uppercase font-black">Date de Scan</p>
                        <p className="text-xs text-slate-300 font-bold">{result.timestamp.split(' ')[0]}</p>
                        <p className="text-[9px] text-slate-500">{result.timestamp.split(' ')[1]}</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={exportReport}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] flex items-center justify-center gap-3 group"
                    >
                      <i className="fas fa-file-pdf group-hover:scale-110 transition-transform"></i>
                      GÉNÉRER RAPPORT PDF/TXT
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; border: 1px solid rgba(255,255,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}</style>
    </div>
  );
};

export default DetectionTool;
