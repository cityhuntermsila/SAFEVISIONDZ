import { ObjectDetector, FilesetResolver, Detection } from "@mediapipe/tasks-vision";
import { DetectionResult } from "../types";

let objectDetector: ObjectDetector | null = null;
let isLoading = false;

export const initLocalDetector = async () => {
  if (objectDetector || isLoading) return;
  isLoading = true;
  try {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    objectDetector = await ObjectDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite`,
        delegate: "GPU",
      },
      scoreThreshold: 0.3,
      runningMode: "IMAGE",
    });
    console.log("MediaPipe Model Loaded!");
  } catch (error) {
    console.error("MediaPipe Init Error:", error);
    throw error;
  } finally {
    isLoading = false;
  }
};

export const detectPPElocal = async (imageElement: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement): Promise<DetectionResult> => {
  if (!objectDetector) await initLocalDetector();
  if (!objectDetector) throw new Error("Modèle de détection non prêt.");

  const detections = objectDetector.detect(imageElement).detections;
  
  // Mapping MediaPipe (EfficientDet) indices to PPE
  // Note: Standard EfficientDet detects generic objects like 'person', 'bottle', etc.
  // For specialized PPE detection locally, we map common industrial objects
  const ppeDetections = detections.map(d => {
    const label = d.categories[0].categoryName;
    const score = d.categories[0].score;
    const box = d.boundingBox;

    // Normalizing box to 0-1000 for our UI
    // MediaPipe returns pixels if it's an element, but let's assume normalized for consistency if possible
    // Actually mediaPipe .detect returns pixels. We need relative values.
    const width = (imageElement instanceof HTMLVideoElement) ? imageElement.videoWidth : (imageElement as any).width || imageElement.clientWidth;
    const height = (imageElement instanceof HTMLVideoElement) ? imageElement.videoHeight : (imageElement as any).height || imageElement.clientHeight;

    const ymin = (box?.originY || 0) / height * 1000;
    const xmin = (box?.originX || 0) / width * 1000;
    const ymax = ((box?.originY || 0) + (box?.height || 0)) / height * 1000;
    const xmax = ((box?.originX || 0) + (box?.width || 0)) / width * 1000;

    return {
      item: mapLabelToPPE(label),
      status: 'detected' as const,
      confidence: score,
      recommendation: "Équipement détecté.",
      box2d: [ymin, xmin, ymax, xmax] as [number, number, number, number]
    };
  });

  return {
    overallSafetyScore: ppeDetections.length > 0 ? 95 : 0,
    isAlert: ppeDetections.length === 0,
    detections: ppeDetections,
    timestamp: new Date().toLocaleString('fr-FR'),
  };
};

const mapLabelToPPE = (label: string): string => {
  const mapping: Record<string, string> = {
    'person': 'Ouvrier',
    'helmet': 'Casque',
    'head': 'Casque (Manquant)',
    'clothing': 'Gilet',
    // Fallback labels for generic EfficientDet
    'cell phone': 'Téléphone (Danger)',
    'backpack': 'Equipement'
  };
  return mapping[label.toLowerCase()] || label;
};
