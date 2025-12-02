import { 
  PAIN_POINTS_DB, 
  PRE_GENERATED_CONCEPTS, 
  CATEGORIES, 
  REMIX_ADJECTIVES,
  REMIX_VIBES,
  SOLUTION_MECHANISMS,
  BENEFIT_PHRASES,
  CATEGORY_NAME_PARTS,
  CATEGORY_FEATURES,
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

// Track generated names to prevent duplicates in session
const generatedNames = new Set<string>();

// Helper to get random items from array
function randomPick<T>(arr: T[], count: number = 1): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Helper to capitalize first letter
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Extract key pain keyword from pain point text
function extractPainKeyword(pain: string): string {
  const keywords = [
    "back pain", "bending", "slippery", "clutter", "clean", "breaks", 
    "confusing", "space", "flat", "disturbs", "temperature", "jarring",
    "cable", "posture", "lighting", "noise", "malfunction", "hair",
    "anxiety", "odor", "bulky", "snap", "form", "slip", "motivation",
    "wrinkled", "charging", "uncomfortable", "jet lag", "cold", "messy",
    "time-consuming", "forget", "leak", "narrow", "odors", "melts",
    "water", "light", "overwatering", "pests", "repotting", "done",
    "rust", "flare-ups", "heat up", "wanders", "uncomfortable", "impersonal",
    "quiet", "wrong"
  ];
  
  const lowerPain = pain.toLowerCase();
  for (const keyword of keywords) {
    if (lowerPain.includes(keyword)) {
      return keyword;
    }
  }
  
  // Extract first noun-ish phrase
  const words = pain.split(' ').slice(0, 3);
  return words.join(' ').toLowerCase();
}

// Generate category-aware product name
function generateCategoryName(category: string): string {
  const nameParts = CATEGORY_NAME_PARTS[category] || CATEGORY_NAME_PARTS["default"];
  const prefix = randomPick(nameParts.prefixes, 1)[0];
  const suffix = randomPick(nameParts.suffixes, 1)[0];
  return prefix + suffix;
}

// Generate unique name (prevents duplicates in session)
function generateUniqueName(category: string): string {
  let attempts = 0;
  let name: string;
  do {
    name = generateCategoryName(category);
    attempts++;
  } while (generatedNames.has(name) && attempts < 15);
  generatedNames.add(name);
  return name;
}

// Generate pain-point-driven tagline
function generateTagline(pain: string, category: string): string {
  const painKeyword = extractPainKeyword(pain);
  
  const templates = [
    `No more ${painKeyword}`,
    `${capitalize(category.split(' ')[0])} without the ${painKeyword}`,
    `Finally. ${capitalize(category)} that work.`,
    `The end of ${painKeyword}`,
    `${capitalize(category.split(' ')[0])} reimagined for real life`,
    `Say goodbye to ${painKeyword}`,
    `Because ${painKeyword} shouldn't be normal`,
  ];
  
  return randomPick(templates, 1)[0];
}

// Generate rich, pain-point-specific description
function generateDescription(category: string, pain: string): string {
  const mechanisms = SOLUTION_MECHANISMS[category] || SOLUTION_MECHANISMS["default"];
  const mechanism = randomPick(mechanisms, 1)[0];
  const benefit = randomPick(BENEFIT_PHRASES, 1)[0];
  const adjective = randomPick(REMIX_ADJECTIVES, 1)[0].toLowerCase();
  
  const templates = [
    `Designed specifically for people frustrated by ${pain.toLowerCase()}. Uses ${mechanism} to deliver a solution that ${benefit}. No compromises, no workarounds.`,
    `We asked: what if ${category} actually solved ${pain.toLowerCase()}? The answer is a ${adjective} system built around ${mechanism}. It just works.`,
    `Born from the #1 complaint about ${category}: "${pain}" Finally, a solution with ${mechanism} that ${benefit}.`,
    `A ${adjective} approach to ${category} that tackles ${pain.toLowerCase()} head-on. Built with ${mechanism}, it ${benefit}. Premium materials, thoughtful design, zero learning curve.`,
    `The ${pain.toLowerCase()} stops here. We've engineered ${mechanism} into a ${adjective} package that ${benefit}. This is ${category} done right.`,
  ];
  
  return randomPick(templates, 1)[0];
}

// Get category-matched image for fallback
function getCategoryImage(category: string): string | undefined {
  const categoryConcepts = PRE_GENERATED_CONCEPTS[category];
  if (categoryConcepts && categoryConcepts.length > 0) {
    return randomPick(categoryConcepts, 1)[0].image;
  }
  
  // Fallback to any pre-generated image
  const allConcepts = Object.values(PRE_GENERATED_CONCEPTS).flat();
  if (allConcepts.length > 0) {
    return randomPick(allConcepts, 1)[0].image;
  }
  
  return undefined;
}

// Generate a high-quality remixed concept
function generateRemixedConcept(category: string, painPoints: PainPoint[]): ProductConcept {
  // Pick random pain point to solve (prefer high intensity)
  const highIntensityPains = painPoints.filter(p => p.intensity === "high");
  const painSource = highIntensityPains.length > 0 ? highIntensityPains : painPoints;
  const selectedPain = randomPick(painSource, 1)[0];
  const painToSolve = selectedPain?.pain || `Common frustrations with ${category}`;
  
  // Generate category-aware unique name
  const name = generateUniqueName(category);
  
  // Generate pain-connected tagline
  const tagline = generateTagline(painToSolve, category);
  
  // Generate rich, specific description
  const description = generateDescription(category, painToSolve);
  
  // Get category-specific features
  const categoryFeatures = CATEGORY_FEATURES[category] || CATEGORY_FEATURES["default"];
  const features = randomPick(categoryFeatures, 4);
  
  // Generate realistic price point based on category
  const priceBrackets: Record<string, [number, number]> = {
    "kitchen gadgets": [39, 99],
    "sleep products": [79, 199],
    "gardening tools": [29, 89],
    "pet products": [35, 199],
    "fitness equipment": [49, 399],
    "home office": [49, 299],
    "travel accessories": [35, 129],
    "coffee accessories": [49, 249],
    "water bottles": [29, 59],
    "plant care": [39, 89],
    "baby products": [79, 249],
    "meditation aids": [49, 399],
    "grilling tools": [49, 149],
    "default": [39, 129],
  };
  
  const [minPrice, maxPrice] = priceBrackets[category] || priceBrackets["default"];
  const basePrice = Math.floor(Math.random() * (maxPrice - minPrice)) + minPrice;
  const pricePoint = `$${basePrice}`;
  
  // Pick coherent vibe
  const vibe = randomPick(REMIX_VIBES, 1)[0];
  
  // Get category-matched image
  const image = getCategoryImage(category);
  
  return {
    name,
    tagline,
    pain_solved: painToSolve,
    description,
    features,
    price_point: pricePoint,
    vibe,
    image,
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
