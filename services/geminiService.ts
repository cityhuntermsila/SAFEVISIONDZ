import { GoogleGenAI, Type } from "@google/genai";
import { DetectionResult } from "../types";

// Vite uses import.meta.env for environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_API_KEY || "";
const ai = new GoogleGenAI({ apiKey: API_KEY });

const PPE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    overallSafetyScore: {
      type: Type.NUMBER,
      description: "Score global de sécurité de 0 à 100.",
    },
    isAlert: {
      type: Type.BOOLEAN,
      description: "Vrai si une violation grave est détectée.",
    },
    detections: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          item: {
            type: Type.STRING,
            description: "Nom de l'équipement (ex: Casque, Gilet, Gants, Lunettes)."
          },
          status: {
            type: Type.STRING,
            description: "Statut: 'detected', 'missing', ou 'incorrect'."
          },
          confidence: {
            type: Type.NUMBER,
            description: "Indice de confiance entre 0 et 1."
          },
          recommendation: {
            type: Type.STRING,
            description: "Action corrective recommandée."
          },
          box2d: {
            type: Type.ARRAY,
            items: { type: Type.NUMBER },
            description: "Coordonnées de la boîte englobante [ymin, xmin, ymax, xmax] normalisées de 0 à 1000. Obligatoire si le statut est 'detected'."
          }
        },
        required: ["item", "status", "confidence", "recommendation"]
      }
    }
  },
  required: ["overallSafetyScore", "isAlert", "detections"]
};

export const detectPPE = async (base64Image: string): Promise<DetectionResult> => {
  try {
    if (!API_KEY) {
      throw new Error("Clé API manquante. Veuillez configurer VITE_GEMINI_API_KEY dans votre fichier .env.local");
    }

    const base64Data = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;

    // Use a valid model name like 'gemini-1.5-flash'
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: base64Data } },
            {
              text: `Analyse cette image pour la sécurité industrielle (HSE).
              Identifie les équipements de protection individuelle (EPI) suivants : Casque de chantier, Gilet de haute visibilité, Gants de protection, Lunettes de sécurité, Chaussures de sécurité.

              Pour CHAQUE EQUIPEMENT DÉTECTÉ, fournis impérativement sa boîte englobante au format [ymin, xmin, ymax, xmax] avec des valeurs entre 0 et 1000. C'est crucial pour l'affichage visuel.
              Si un équipement obligatoire est absent, marque-le comme 'missing'.
              Réponds strictement au format JSON selon le schéma défini.`
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: PPE_SCHEMA,
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("Le moteur d'IA n'a retourné aucun résultat.");

    const cleanJson = resultText.replace(/```json/g, "").replace(/```/g, "").trim();
    const result = JSON.parse(cleanJson);

    return {
      ...result,
      timestamp: new Date().toLocaleString('fr-FR'),
    };
  } catch (error: any) {
    console.error("PPE Detection Error:", error);
    throw new Error(error.message || "Échec de l'analyse IA. Veuillez vérifier votre connexion ou l'image fournie.");
  }
};

export const generateConfirmationEmail = async (userData: { name: string, company: string, email: string, wilaya: string, message: string }) => {
  try {
    if (!API_KEY) return "Merci de nous avoir contactés. Nous reviendrons vers vous très prochainement.";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          parts: [
            {
              text: `Génère un email de confirmation professionnel et chaleureux en français pour un client qui vient de nous contacter sur le site SafeVision DZ.
              Le client s'appelle ${userData.name}, travaille chez ${userData.company} à ${userData.wilaya}.
              Son message était : "${userData.message}".
              L'email doit confirmer la réception, mentionner que nos ingénieurs à M'sila vont étudier sa demande, et proposer un rendez-vous pour une démo personnalisée.
              Signe : L'équipe SafeVision DZ.`
            }
          ]
        }
      ]
    });
    return response.text;
  } catch (error) {
    console.error("Email Generation Error:", error);
    return "Merci de nous avoir contactés. Nous reviendrons vers vous très prochainement.";
  }
};
