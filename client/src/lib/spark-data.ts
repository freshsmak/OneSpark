export interface PainPoint {
  pain: string;
  source: string;
  intensity: "high" | "medium" | "low";
}

export interface ProductConcept {
  name: string;
  tagline: string;
  pain_solved: string;
  description: string;
  features: string[];
  price_point: string;
  vibe: string;
}

export const CATEGORIES = [
  "kitchen gadgets", "pet products", "travel accessories", "home office",
  "fitness equipment", "baby products", "outdoor gear", "bathroom accessories",
  "car accessories", "sleep products", "cleaning tools", "phone accessories",
  "gardening tools", "storage solutions", "personal care devices",
  "camping gear", "desk organization", "laundry solutions", "shoe care",
  "water bottles", "lunch containers", "bike accessories", "yoga equipment",
  "home gym", "meditation aids", "journaling supplies", "plant care",
  "coffee accessories", "wine accessories", "grilling tools"
];

export const PAIN_POINTS_DB: Record<string, PainPoint[]> = {
  "gardening tools": [
    { pain: "Constant bending over causes severe back pain", source: "Reddit/Quora", intensity: "high" },
    { pain: "Tool handles are slippery and cause wrist strain", source: "Product reviews", intensity: "high" },
    { pain: "Gimmicky tools break after one season", source: "Permies forum", intensity: "medium" },
    { pain: "Hard to keep track of small tools while working", source: "Product reviews", intensity: "medium" },
    { pain: "Arthritis makes gripping and squeezing painful", source: "Health blogs", intensity: "high" },
    { pain: "Weeding is endless and back-breaking", source: "Quora", intensity: "high" },
  ],
  "kitchen gadgets": [
    { pain: "Drawer clutter - too many single-use tools", source: "Reddit", intensity: "high" },
    { pain: "Hard to clean gadgets with small crevices", source: "Amazon reviews", intensity: "high" },
    { pain: "Cheap plastic breaks or melts easily", source: "Product reviews", intensity: "medium" },
    { pain: "Confusing controls on digital appliances", source: "Reddit", intensity: "medium" },
    { pain: "Counter space is limited", source: "Home forums", intensity: "high" },
  ],
  "sleep products": [
    { pain: "Pillows go flat or lose shape quickly", source: "Amazon reviews", intensity: "high" },
    { pain: "Partner's movement disturbs sleep", source: "Reddit", intensity: "high" },
    { pain: "Temperature regulation - too hot or cold", source: "Sleep forums", intensity: "high" },
    { pain: "Alarm clocks are jarring and stressful", source: "Wellness blogs", intensity: "medium" },
    { pain: "Blue light from devices disrupts sleep", source: "Health studies", intensity: "medium" },
  ],
  "home office": [
    { pain: "Cable management is a nightmare", source: "Reddit WFH", intensity: "high" },
    { pain: "Poor posture from bad desk setup", source: "Ergonomic forums", intensity: "high" },
    { pain: "Video call lighting is unflattering", source: "Reddit", intensity: "medium" },
    { pain: "Distractions from household noise", source: "WFH communities", intensity: "high" },
    { pain: "Desk clutter reduces productivity", source: "Productivity blogs", intensity: "medium" },
  ],
  "pet products": [
    { pain: "Automatic feeders jam or malfunction", source: "Amazon reviews", intensity: "high" },
    { pain: "Pet hair gets everywhere and is hard to clean", source: "Reddit pets", intensity: "high" },
    { pain: "Dog walks in rain/cold are miserable", source: "Pet forums", intensity: "medium" },
    { pain: "Anxiety when leaving pets alone", source: "Pet communities", intensity: "high" },
    { pain: "Litter box odor and maintenance", source: "Cat forums", intensity: "high" },
  ],
  "fitness equipment": [
    { pain: "Home gym equipment takes too much space", source: "Reddit fitness", intensity: "high" },
    { pain: "Resistance bands snap or lose elasticity", source: "Amazon reviews", intensity: "medium" },
    { pain: "Hard to track form without a mirror/trainer", source: "Fitness forums", intensity: "high" },
    { pain: "Workout mats slip on hard floors", source: "Yoga communities", intensity: "medium" },
    { pain: "Motivation drops when working out alone", source: "Reddit", intensity: "high" },
  ],
  "travel accessories": [
    { pain: "Packing cubes still result in wrinkled clothes", source: "Travel forums", intensity: "medium" },
    { pain: "Phone/device charging in airports is unreliable", source: "Reddit travel", intensity: "high" },
    { pain: "Neck pillows are bulky and uncomfortable", source: "Amazon reviews", intensity: "high" },
    { pain: "Jet lag ruins first days of trips", source: "Frequent flyer forums", intensity: "high" },
    { pain: "Lost luggage anxiety", source: "Travel communities", intensity: "medium" },
  ],
};

export const PRE_GENERATED_CONCEPTS: Record<string, ProductConcept[]> = {
  "gardening tools": [
    {
      name: "TerraGlide",
      tagline: "The rolling garden seat that follows you",
      pain_solved: "Constant bending over causes severe back pain",
      description: "A low-profile wheeled garden seat with built-in tool holsters and a pivoting work tray. Roll from plant to plant without standing up. Ergonomic kneeling pad flips down for ground-level work.",
      features: ["360° swivel seat", "Integrated tool slots", "All-terrain wheels", "Weatherproof cushion"],
      price_point: "$89",
      vibe: "Gardening meets mobility scooter elegance"
    },
    {
      name: "GripShift",
      tagline: "Handles that adapt to your hands",
      pain_solved: "Tool handles are slippery and cause wrist strain",
      description: "Universal ergonomic handle sleeves that retrofit onto any garden tool. Memory foam core with textured silicone grip. Self-heating option for cold mornings. Reduces grip force needed by 40%.",
      features: ["Fits any handle 0.75-1.5\"", "Arthritis-friendly", "Machine washable", "High-vis colors"],
      price_point: "$24 for 3-pack",
      vibe: "OXO Good Grips meets garden aesthetic"
    },
    {
      name: "WeedWalk",
      tagline: "Pull weeds standing tall",
      pain_solved: "Weeding is endless and back-breaking",
      description: "A walking-stick style weeder with a foot pedal mechanism. Step, twist, and the serrated jaws grip and extract weeds root-and-all. Eject button drops weeds into attached collection bag.",
      features: ["No bending required", "Extracts 2\" taproots", "Compostable collection bags", "Adjustable height"],
      price_point: "$65",
      vibe: "Cane meets precision tool"
    },
  ],
  "kitchen gadgets": [
    {
      name: "CleanCut",
      tagline: "The kitchen tool that cleans itself",
      pain_solved: "Hard to clean gadgets with small crevices",
      description: "A mandoline slicer with a built-in cleaning dock. After use, snap it into the dock, add water, and micro-jets blast away residue. UV sanitizes in 60 seconds. Dishwasher-safe backup.",
      features: ["Self-cleaning dock", "5 blade options", "Cut-resistant handle", "Magnetic storage"],
      price_point: "$79",
      vibe: "Japanese precision meets spa cleanliness"
    },
    {
      name: "StackSmart",
      tagline: "One tool. Infinite configurations.",
      pain_solved: "Drawer clutter - too many single-use tools",
      description: "Modular kitchen tool system with magnetic snap-together components. Spatula head + whisk attachment + scraper = 12 tools in one drawer slot. Premium silicone and stainless steel.",
      features: ["12 configurations", "Dishwasher safe", "Hangs or stores flat", "Lifetime warranty"],
      price_point: "$55",
      vibe: "LEGO for grown-up kitchens"
    },
  ],
  "sleep products": [
    {
      name: "DriftBand",
      tagline: "Wake gently. Sleep deeply.",
      pain_solved: "Alarm clocks are jarring and stressful",
      description: "A soft fabric wristband that wakes you with gradual warming and gentle haptic pulses—no sound. Tracks sleep stages to wake you at the optimal moment within your window. Partner sleeps through it.",
      features: ["Silent wake technology", "Sleep stage tracking", "7-day battery", "Machine washable band"],
      price_point: "$129",
      vibe: "Spa meets sleep science"
    },
    {
      name: "CloudCore",
      tagline: "The pillow that never goes flat",
      pain_solved: "Pillows go flat or lose shape quickly",
      description: "Modular pillow with replaceable air-cell inserts. When loft decreases, swap in fresh cells (subscription). Outer cover is cooling bamboo. Side-sleeper and back-sleeper configurations.",
      features: ["Adjustable loft", "Subscription refills", "Cooling cover", "10-year core warranty"],
      price_point: "$149 + $12/quarter refills",
      vibe: "Subscription economy meets sleep luxury"
    },
  ],
  "home office": [
    {
      name: "CableCanvas",
      tagline: "Your desk's hidden nervous system",
      pain_solved: "Cable management is a nightmare",
      description: "A desk-mounted fabric panel with integrated cable channels and magnetic attachment points. Route, hide, and swap cables without tools. Built-in wireless charger pad and USB hub.",
      features: ["Tool-free installation", "Magnetic cable clips", "Qi charging zone", "4-port USB hub"],
      price_point: "$89",
      vibe: "Scandinavian minimalism meets tech utility"
    },
    {
      name: "PosturePing",
      tagline: "Correct your spine, invisibly",
      pain_solved: "Poor posture from bad desk setup",
      description: "A tiny, adhesive-free sensor that magnetically clips to your collar. Detects slouching using AI motion analysis. Gently vibrates when you need to correct. App tracks long-term spinal health.",
      features: ["Discreet design", "Haptic feedback", "30-day battery", "Health app integration"],
      price_point: "$49",
      vibe: "Apple AirTag meets medical device"
    },
  ],
  "pet products": [
    {
      name: "PawPod",
      tagline: "See them. Treat them. From anywhere.",
      pain_solved: "Anxiety when leaving pets alone",
      description: "360-degree pet camera with treat tossing and calming pheromone diffuser. Two-way audio lets you talk to them. Detects barking/meowing and auto-plays your recorded soothing voice.",
      features: ["360° 4K camera", "Pheromone diffuser", "Treat tosser", "Cry detection"],
      price_point: "$199",
      vibe: "Nest Cam meets dog whisperer"
    },
    {
      name: "ShedShield",
      tagline: "Stop the shed before it spreads",
      pain_solved: "Pet hair gets everywhere and is hard to clean",
      description: "A wearable pet vest for indoor use made from breathable, hair-trapping mesh. Pets stay cool and comfortable while loose hair is captured in the fabric weave. Shake out outside once a day.",
      features: ["Breathable mesh", "Machine washable", "Calming compression effect", "Size adjustable"],
      price_point: "$35",
      vibe: "Athleisure for dogs"
    }
  ],
  "fitness equipment": [
    {
      name: "WallGym Pro",
      tagline: "A full gym that disappears",
      pain_solved: "Home gym equipment takes too much space",
      description: "A sleek, full-length mirror that conceals a high-torque digital cable resistance system. When off, it's just a beautiful mirror. When on, it's a personal trainer with 200lbs of resistance.",
      features: ["Zero footprint", "200lb digital weight", "Form correction AI", "Live classes"],
      price_point: "$1,495",
      vibe: "Mirror meets Tesla"
    },
    {
      name: "BandMate",
      tagline: "Elasticity that lasts forever",
      pain_solved: "Resistance bands snap or lose elasticity",
      description: "Smart resistance bands made from carbon-infused polymer that never snaps or stretches out. Bluetooth sensors in handles track reps, force, and velocity to your phone.",
      features: ["Unbreakable material", "Force tracking", "Smart handles", "Lifetime warranty"],
      price_point: "$79",
      vibe: "Carbon fiber meets CrossFit"
    }
  ],
  "travel accessories": [
    {
      name: "JetNap",
      tagline: "First class sleep in economy",
      pain_solved: "Neck pillows are bulky and uncomfortable",
      description: "An inflatable, ergonomic sleep system that braces against the tray table (or seat back) to support your head forward, not sideways. Deflates to size of a phone. Face-cushion avoids makeup smudging.",
      features: ["Forward-lean support", "Phone-sized packability", "Washable face pad", "Air-flow channels"],
      price_point: "$45",
      vibe: "Massage chair meets camping gear"
    },
    {
      name: "PowerPort",
      tagline: "The last adapter you'll ever buy",
      pain_solved: "Phone/device charging in airports is unreliable",
      description: "Universal travel adapter with built-in 10,000mAh power bank. Plug it into the wall to charge devices + internal battery. Unplug and keep charging on the go. Fits 150+ countries.",
      features: ["Integrated power bank", "65W PD Fast Charge", "Global compatibility", "Compact cube design"],
      price_point: "$89",
      vibe: "Anker meets Swiss Army Knife"
    }
  ]
};
