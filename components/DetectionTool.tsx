
import React, { useRef, useState, useEffect } from 'react';
import { detectPPE } from '../services/geminiService';
import { DetectionResult } from '../types';

interface DetectionToolProps {
  isFullPage?: boolean;
  onNavigateToPricing?: () => void;
}

const DetectionTool: React.FC<DetectionToolProps> = ({ isFullPage = false, onNavigateToPricing }) => {
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
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    if (isCameraActive && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(err => {
        console.error("Erreur vidéo:", err);
      });
    }
  }, [isCameraActive, activeTab]);

  useEffect(() => {
    return () => stopCamera();
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

  const handleStartCameraClick = () => {
    // Simulation de restriction SaaS : On affiche le message d'abonnement
    setShowPaywall(true);
    setResult(null);
    setError(null);
  };

  const captureAndDetect = async (source: HTMLVideoElement | HTMLImageElement) => {
    if (!canvasRef.current) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const context = canvasRef.current.getContext('2d');
    if (context) {
      try {
        let w = source instanceof HTMLVideoElement ? source.videoWidth : source.naturalWidth;
        let h = source instanceof HTMLVideoElement ? source.videoHeight : source.naturalHeight;

        if (w === 0 || h === 0) throw new Error("Source non prête.");

        canvasRef.current.width = w;
        canvasRef.current.height = h;
        context.drawImage(source, 0, 0, w, h);

        const base64Image = canvasRef.current.toDataURL('image/jpeg', 0.9);
        const detection = await detectPPE(base64Image);

        if (!detection.detections || detection.detections.length === 0) {
          setError("Aucun élément détecté.");
        }

        setResult(detection);
      } catch (err: any) {
        setError(err.message || "Erreur d'analyse.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    stopCamera();
    setShowPaywall(false);
    setResult(null);
    setError(null);

    const reader = new FileReader();
    reader.onload = (ev) => setUploadedPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const exportReport = () => {
    if (!result) return;
    const reportLines = [
      "SAFEVISION DZ - RAPPORT",
      `Score: ${result.overallSafetyScore}%`,
      `Alerte: ${result.isAlert ? "OUI" : "NON"}`,
      "",
      ...result.detections.map(d => `${d.item}: ${d.status} (${Math.round(d.confidence * 100)}%)`)
    ];
    const file = new Blob([reportLines.join("\n")], { type: 'text/plain' });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = `Rapport_SafeVision_${Date.now()}.txt`;
    element.click();
  };

  const renderDetections = () => {
    if (!result) return null;
    return result.detections.map((det, i) => {
      if (!det.box2d) return null;
      const [ymin, xmin, ymax, xmax] = det.box2d;
      const isOk = det.status === 'detected';
      return (
        <div
          key={i}
          className={`absolute border ${isOk ? 'border-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]' : 'border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]'} pointer-events-none z-20`}
          style={{
            top: `${ymin / 10}%`,
            left: `${xmin / 10}%`,
            width: `${(xmax - xmin) / 10}%`,
            height: `${(ymax - ymin) / 10}%`,
          }}
        >
          <div className={`absolute top-0 left-0 -translate-y-full px-1.5 py-0.5 text-[9px] font-bold text-white uppercase whitespace-nowrap ${isOk ? 'bg-blue-500' : 'bg-red-500'}`}>
            {det.item} {Math.round(det.confidence * 100)}%
          </div>
        </div>
      );
    });
  };

  return (
    <div className={`${isFullPage ? '' : 'py-20 bg-slate-900'}`}>
      <div className={`${isFullPage ? '' : 'max-w-6xl mx-auto px-4'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl relative">
              <div className="flex border-b border-slate-700">
                <button onClick={() => { setActiveTab('camera'); setUploadedPreview(null); setResult(null); setShowPaywall(false); }} className={`flex-1 py-4 font-bold text-sm ${activeTab === 'camera' ? 'text-orange-400 bg-slate-700/50 border-b-2 border-orange-500' : 'text-slate-500'}`}>CAMÉRA LIVE</button>
                <button onClick={() => { setActiveTab('upload'); stopCamera(); setResult(null); setShowPaywall(false); }} className={`flex-1 py-4 font-bold text-sm ${activeTab === 'upload' ? 'text-orange-400 bg-slate-700/50 border-b-2 border-orange-500' : 'text-slate-500'}`}>IMPORT PHOTO</button>
              </div>

              <div className="p-6">
                <div className="aspect-video bg-black rounded-2xl overflow-hidden relative shadow-inner ring-1 ring-slate-700 flex items-center justify-center">
                  {activeTab === 'camera' ? (
                    <div className="w-full h-full flex items-center justify-center relative">
                      {!showPaywall ? (
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700 mb-2">
                            <i className="fas fa-video text-2xl text-slate-500"></i>
                          </div>
                          <button onClick={handleStartCameraClick} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20">
                            Activer la Caméra Live
                          </button>
                          <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Analyse temps réel V3.2</p>
                        </div>
                      ) : (
                        <div className="absolute inset-0 z-40 bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                          <div className="w-20 h-20 bg-orange-500/10 border border-orange-500/30 rounded-full flex items-center justify-center mb-6">
                            <i className="fas fa-lock text-3xl text-orange-500"></i>
                          </div>
                          <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tighter italic">Fonctionnalité Premium</h4>
                          <p className="text-slate-400 text-sm max-w-sm mb-8">
                            L'analyse vidéo en continu par caméra live est réservée aux abonnements <span className="text-blue-400 font-bold">Premium</span> et <span className="text-blue-400 font-bold">Entreprise</span>.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
                            <button
                              onClick={() => window.location.reload()} // Simulation de navigation vers pricing
                              className="flex-1 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-orange-600/20 transition-all"
                            >
                              S'abonner maintenant
                            </button>
                            <button
                              onClick={() => setShowPaywall(false)}
                              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-sm transition-all"
                            >
                              Plus tard
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center cursor-pointer" onClick={() => !uploadedPreview && fileInputRef.current?.click()}>
                      {uploadedPreview ? (
                        <div className="relative inline-block h-full w-full">
                          <img id="preview-element" src={uploadedPreview} className="h-full w-full object-contain block" alt="Preview" />
                          <div className="absolute inset-0 pointer-events-none">
                            {renderDetections()}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center group">
                          <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center border border-blue-500/20 mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <i className="fas fa-image text-3xl text-blue-500"></i>
                          </div>
                          <p className="text-white font-bold text-lg mb-2">Importer une photo</p>
                          <p className="text-slate-500 text-xs uppercase tracking-widest">Testez l'IA avec vos images</p>
                        </div>
                      )}
                    </div>
                  )}

                  {loading && (
                    <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center backdrop-blur-sm z-50">
                      <div className="w-10 h-10 border-2 border-blue-500/20 border-t-orange-500 rounded-full animate-spin"></div>
                      <p className="mt-4 text-[10px] font-black text-white uppercase tracking-widest animate-pulse">Analyse SafeVision DZ...</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => {
                      const el = activeTab === 'camera' ? videoRef.current : document.getElementById('preview-element') as any;
                      if (el) captureAndDetect(el);
                    }}
                    disabled={loading || activeTab === 'camera' || (activeTab === 'upload' && !uploadedPreview)}
                    className="flex-1 py-4 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 disabled:opacity-50 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-orange-600/20"
                  >
                    {loading ? 'TRAITEMENT...' : activeTab === 'camera' ? 'S\'ABONNER POUR ACTIVER' : 'LANCER L\'ANALYSE'}
                  </button>
                  {activeTab === 'upload' && uploadedPreview && (
                    <button onClick={() => { setUploadedPreview(null); setResult(null); }} className="px-6 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-2xl transition-colors">
                      <i className="fas fa-redo-alt"></i>
                    </button>
                  )}
                  <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`p-6 rounded-3xl border h-full flex flex-col transition-all duration-500 ${result?.isAlert ? 'bg-red-500/10 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.1)]' : 'bg-slate-800 border-slate-700'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-white uppercase tracking-tighter italic">HSE_MONITOR</h3>
                {result && <span className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-lg border border-blue-500/20 animate-pulse">LIVE</span>}
              </div>

              {!result ? (
                <div className="flex-grow flex flex-col items-center justify-center opacity-20 py-20">
                  <i className="fas fa-shield-alt text-4xl mb-4 text-slate-400"></i>
                  <p className="text-[10px] font-black uppercase tracking-widest">En attente de scan</p>
                </div>
              ) : (
                <div className="space-y-4 flex-grow overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                  {result.detections.map((det, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border transition-all ${det.status === 'detected' ? 'bg-slate-900/40 border-slate-700' : 'bg-red-500/5 border-red-500/20'}`}>
                      <div className="flex justify-between text-[11px] font-black mb-3">
                        <span className="text-white uppercase tracking-wider">{det.item}</span>
                        <span className={`px-2 py-0.5 rounded-md ${det.status === 'detected' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                          {det.status === 'detected' ? 'CONFORME' : 'DANGER'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-slate-950 rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-1000 ${det.status === 'detected' ? 'bg-blue-500' : 'bg-red-500'}`} style={{ width: `${det.confidence * 100}%` }}></div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">{Math.round(det.confidence * 100)}%</span>
                      </div>
                    </div>
                  ))}

                  <div className="pt-6 mt-4 border-t border-slate-700">
                    <button onClick={exportReport} className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-3">
                      <i className="fas fa-file-download"></i>
                      Exporter Rapport
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
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default DetectionTool;
