
export interface PPEDetection {
  item: string;
  status: 'detected' | 'missing' | 'incorrect';
  confidence: number;
  recommendation: string;
  box2d?: number[]; // [ymin, xmin, ymax, xmax] normalized 0-1000
}

export interface DetectionResult {
  timestamp: string;
  detections: PPEDetection[];
  overallSafetyScore: number;
  isAlert: boolean;
}

export enum SubscriptionTier {
  FREE = 'Gratuit',
  ADVANCED = 'Premium',
  BUSINESS = 'Entreprise'
}

export type View = 'home' | 'about' | 'pricing' | 'contact' | 'detection' | 'faq' | 'privacy' | 'terms';

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  tier: SubscriptionTier;
  price: string;
  description: string;
  features: PlanFeature[];
  cta: string;
  popular?: boolean;
}
