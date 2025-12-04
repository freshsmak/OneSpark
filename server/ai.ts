import Anthropic from "@anthropic-ai/sdk";

// Support both Replit integration keys and standard API keys
const apiKey = process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;
console.log("Anthropic API Key status:", apiKey ? `Found (${apiKey.slice(0, 10)}...)` : "MISSING");

const anthropic = new Anthropic({
  apiKey,
  baseURL: process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL || undefined,
});

interface PainPoint {
  pain: string;
  source: string;
  intensity: string;
}

export interface AIGeneratedConcept {
  name: string;
  tagline: string;
  pain_solved: string;
  description: string;
  features: string[];
  price_point: string;
  vibe: string;
}

export async function generateProductConcept(
  category: string,
  painPoints: PainPoint[]
): Promise<AIGeneratedConcept> {
  const painPointsText = painPoints
    .map((p) => `- ${p.pain} (Source: ${p.source})`)
    .join("\n");

  const prompt = `You are a brilliant consumer product designer. Generate ONE novel product concept for the "${category}" category.

REAL PAIN POINTS from consumers (from Reddit, Amazon reviews, forums):
${painPointsText}

Create a product that solves one or more of these pain points in an innovative way.

RESPOND WITH ONLY VALID JSON in this exact format:
{
  "name": "ProductName",
  "tagline": "A compelling 5-8 word tagline",
  "pain_solved": "The specific pain point this addresses",
  "description": "2-3 sentence description of the product and how it works",
  "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  "price_point": "$XX or $XX-$XX range",
  "vibe": "X meets Y aesthetic comparison"
}

REQUIREMENTS:
- Name should be memorable, 1-2 words, brandable (examples: TerraGlide, CloudCore, PawPod)
- Tagline should be punchy and benefit-focused
- Description should be specific about HOW it solves the problem
- Features should be concrete and differentiating
- Price should be realistic for the category
- Vibe should reference known brands/aesthetics for instant understanding (e.g., "Apple meets IKEA")
- Avoid generating concepts that sound too similar to existing products (e.g., no basic smart feeders for pet cams).

BE CREATIVE. Don't just describe existing products. Invent something NEW that would make someone say "why doesn't this exist?!"

Respond with ONLY the JSON, no other text or markdown.`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const responseText = (message.content[0] as { type: "text"; text: string }).text.trim();

  // Clean up response if wrapped in markdown
  let cleanedResponse = responseText;
  if (cleanedResponse.startsWith("```")) {
    cleanedResponse = cleanedResponse.split("```")[1];
    if (cleanedResponse.startsWith("json")) {
      cleanedResponse = cleanedResponse.slice(4);
    }
  }
  cleanedResponse = cleanedResponse.trim();

  try {
    return JSON.parse(cleanedResponse) as AIGeneratedConcept;
  } catch (error) {
    console.error("Failed to parse AI response:", cleanedResponse);
    throw new Error("Invalid AI response format");
  }
}
