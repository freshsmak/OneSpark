import { PAIN_POINTS_DB, PRE_GENERATED_CONCEPTS, CATEGORIES, type ProductConcept, type PainPoint } from "./spark-data";

export interface SparkResult {
  category: string;
  painPoints: PainPoint[];
  concept: ProductConcept;
}

// Helper to delay execution (simulate AI thinking)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generic fallback concept if category has no pre-built ones
const GENERIC_CONCEPT: ProductConcept = {
  name: "NovaSpark",
  tagline: "The future of this category",
  pain_solved: "Existing products are outdated",
  description: "A revolutionary AI-integrated device that learns your habits and adapts automatically. Crafted from sustainable materials and designed to last a lifetime.",
  features: ["AI adaptation", "Sustainable materials", "App integration", "Lifetime warranty"],
  price_point: "$99",
  vibe: "Futuristic utility"
};

export async function generateSpark(requestedCategory?: string): Promise<SparkResult> {
  // 1. Select Category
  const category = requestedCategory || CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  
  // Simulate "Searching web for pain points..."
  await delay(800);
  
  // 2. Get Pain Points
  let painPoints = PAIN_POINTS_DB[category];
  if (!painPoints) {
    // If no specific pain points, use generic ones
    painPoints = [
      { pain: `Current ${category} are too expensive`, source: "Market research", intensity: "medium" },
      { pain: `Quality of ${category} is inconsistent`, source: "Consumer reports", intensity: "high" },
      { pain: "Lack of innovation in this space", source: "Tech blogs", intensity: "medium" },
    ];
  }
  
  // Simulate "Analyzing trends..." and "Consulting Claude..."
  await delay(1500);
  
  // 3. Get Concept
  const concepts = PRE_GENERATED_CONCEPTS[category];
  let concept: ProductConcept;
  
  if (concepts && concepts.length > 0) {
    concept = concepts[Math.floor(Math.random() * concepts.length)];
  } else {
    // Create a semi-custom generic concept based on category name
    concept = {
      ...GENERIC_CONCEPT,
      name: `Smart${category.split(' ')[0].charAt(0).toUpperCase() + category.split(' ')[0].slice(1)}`,
      description: `A revolutionary approach to ${category}. We've solved the core issues by integrating smart sensors and premium materials.`
    };
  }
  
  return {
    category,
    painPoints,
    concept
  };
}
