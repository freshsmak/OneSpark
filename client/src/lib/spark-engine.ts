import { 
  PAIN_POINTS_DB, 
  PRE_GENERATED_CONCEPTS, 
  CATEGORIES, 
  REMIX_ADJECTIVES,
  REMIX_FEATURES,
  REMIX_VIBES,
  type ProductConcept, 
  type PainPoint 
} from "./spark-data";

export interface SparkResult {
  category: string;
  painPoints: PainPoint[];
  concept: ProductConcept;
  isAIGenerated?: boolean;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get random items from array
function randomPick<T>(arr: T[], count: number = 1): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Helper to capitalize first letter
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Generate a remixed/novel concept by combining elements
function generateRemixedConcept(category: string, painPoints: PainPoint[]): ProductConcept {
  // Get all concepts to remix from
  const allConcepts = Object.values(PRE_GENERATED_CONCEPTS).flat();
  
  // Pick random base concept for inspiration
  const baseConcept = randomPick(allConcepts, 1)[0];
  
  // Pick random pain point to solve
  const painToSolve = randomPick(painPoints, 1)[0]?.pain || `Common frustrations with ${category}`;
  
  // Generate novel name
  const prefixes = ["Nova", "Flux", "Pulse", "Zen", "Arc", "Core", "Wave", "Loop", "Sync", "Glide"];
  const suffixes = ["Pro", "One", "Max", "Air", "Flow", "Hub", "Mate", "Pad", "Ring", "Box"];
  const categoryWord = capitalize(category.split(' ')[0]);
  const nameStyle = Math.random();
  
  let name: string;
  if (nameStyle < 0.33) {
    name = randomPick(prefixes, 1)[0] + categoryWord;
  } else if (nameStyle < 0.66) {
    name = categoryWord + randomPick(suffixes, 1)[0];
  } else {
    name = randomPick(prefixes, 1)[0] + randomPick(suffixes, 1)[0];
  }
  
  // Generate tagline
  const taglineTemplates = [
    `${randomPick(REMIX_ADJECTIVES, 1)[0]} ${category} for modern life`,
    `The ${category.split(' ')[0]} that thinks ahead`,
    `Finally, ${category} done right`,
    `${randomPick(REMIX_ADJECTIVES, 1)[0]}. Intuitive. Essential.`,
    `Reimagining how you ${category.includes('tool') ? 'work' : 'live'}`,
  ];
  const tagline = randomPick(taglineTemplates, 1)[0];
  
  // Generate description
  const adjective = randomPick(REMIX_ADJECTIVES, 1)[0].toLowerCase();
  const description = `A ${adjective} approach to ${category} that solves real problems. We've combined cutting-edge technology with thoughtful design to create something that just works. No learning curve, no compromises.`;
  
  // Mix features from different concepts + add new ones
  const existingFeatures = randomPick(baseConcept.features, 2);
  const newFeatures = randomPick(REMIX_FEATURES, 2);
  const allFeatures = [...existingFeatures, ...newFeatures];
  const features = allFeatures.filter((f, i) => allFeatures.indexOf(f) === i).slice(0, 4);
  
  // Generate price
  const basePrice = Math.floor(Math.random() * 150) + 29;
  const pricePoint = `$${basePrice}`;
  
  // Pick random vibe
  const vibe = randomPick(REMIX_VIBES, 1)[0];
  
  return {
    name,
    tagline,
    pain_solved: painToSolve,
    description,
    features,
    price_point: pricePoint,
    vibe,
    image: baseConcept.image, // Reuse an existing image for visual
  };
}

// Main generation function (client-side)
export async function generateSpark(requestedCategory?: string): Promise<SparkResult> {
  const category = requestedCategory || CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  
  await delay(800);
  
  let painPoints = PAIN_POINTS_DB[category];
  if (!painPoints) {
    painPoints = [
      { pain: `Current ${category} are overpriced for what they offer`, source: "Market research", intensity: "medium" as const },
      { pain: `Quality of ${category} is inconsistent`, source: "Consumer reports", intensity: "high" as const },
      { pain: "Lack of innovation in this space", source: "Tech blogs", intensity: "medium" as const },
    ];
  }
  
  await delay(1500);
  
  // Decision: Use pre-generated concept OR generate a remix
  const concepts = PRE_GENERATED_CONCEPTS[category];
  let concept: ProductConcept;
  
  // 40% chance to use existing concept, 60% chance to remix for more novelty
  const useExisting = Math.random() < 0.4 && concepts && concepts.length > 0;
  
  if (useExisting) {
    concept = concepts[Math.floor(Math.random() * concepts.length)];
  } else {
    concept = generateRemixedConcept(category, painPoints);
  }
  
  return {
    category,
    painPoints,
    concept,
    isAIGenerated: false,
  };
}

// AI-powered generation (calls backend)
export async function generateSparkWithAI(requestedCategory?: string): Promise<SparkResult> {
  const category = requestedCategory || CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  
  let painPoints = PAIN_POINTS_DB[category];
  if (!painPoints) {
    painPoints = [
      { pain: `Current ${category} are overpriced`, source: "Market research", intensity: "medium" as const },
      { pain: `Quality of ${category} is inconsistent`, source: "Consumer reports", intensity: "high" as const },
    ];
  }
  
  try {
    const response = await fetch("/api/generate-spark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, painPoints: painPoints.slice(0, 5) }),
    });
    
    if (!response.ok) {
      throw new Error("AI generation failed");
    }
    
    const aiConcept = await response.json();
    
    // Use the AI-generated image if available, otherwise fall back to category image
    let image = aiConcept.image;
    if (!image) {
      // Fallback to category-matched image from pre-generated concepts
      const categoryConcepts = PRE_GENERATED_CONCEPTS[category];
      if (categoryConcepts && categoryConcepts.length > 0) {
        image = categoryConcepts[0].image;
      } else {
        // Last resort: random pre-generated image
        const allConcepts = Object.values(PRE_GENERATED_CONCEPTS).flat();
        image = allConcepts[Math.floor(Math.random() * allConcepts.length)]?.image;
      }
    }
    
    return {
      category,
      painPoints,
      concept: {
        ...aiConcept,
        image,
      },
      isAIGenerated: true,
    };
  } catch (error) {
    console.error("AI generation failed, falling back to remix:", error);
    return generateSpark(category);
  }
}
