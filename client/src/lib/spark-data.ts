import terraGlideImg from '@assets/generated_images/terraglide_rolling_garden_seat.png';
import cloudCoreImg from '@assets/generated_images/cloudcore_modular_pillow.png';
import pawPodImg from '@assets/generated_images/pawpod_smart_pet_camera.png';
import wallGymImg from '@assets/generated_images/wallgym_pro_smart_mirror.png';
import jetNapImg from '@assets/generated_images/jetnap_travel_pillow.png';
import cleanCutImg from '@assets/generated_images/cleancut_self_cleaning_slicer.png';
import gripShiftImg from '@assets/generated_images/gripshift_ergonomic_handles.png';
import weedWalkImg from '@assets/generated_images/weedwalk_standing_weeder.png';
import stackSmartImg from '@assets/generated_images/stacksmart_modular_kitchen_tool.png';
import driftBandImg from '@assets/generated_images/driftband_sleep_wristband.png';
import cableCanvasImg from '@assets/generated_images/cablecanvas_desk_organizer.png';
import posturePingImg from '@assets/generated_images/postureping_posture_sensor.png';
import shedShieldImg from '@assets/generated_images/shedshield_pet_vest.png';
import bandMateImg from '@assets/generated_images/bandmate_smart_resistance_bands.png';
import powerPortImg from '@assets/generated_images/powerport_travel_adapter.png';
import zenPodImg from '@assets/generated_images/zenpod_meditation_pod.png';
import brewGeniusImg from '@assets/generated_images/brewgenius_smart_coffee_maker.png';
import aquaRemindImg from '@assets/generated_images/aquaremind_smart_water_bottle.png';
import foldFitImg from '@assets/generated_images/foldfit_compact_home_gym.png';
import lullaLightImg from '@assets/generated_images/lullalight_baby_monitor.png';
import grillMasterImg from '@assets/generated_images/grillmaster_smart_thermometer.png';
import plantPalImg from '@assets/generated_images/plantpal_smart_planter.png';
import focusDenImg from '@assets/generated_images/focusden_privacy_booth.png';

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
  image?: string;
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
  "baby products": [
    { pain: "Strollers are bulky and hard to fold one-handed", source: "Parent forums", intensity: "high" },
    { pain: "Baby monitors have terrible connection", source: "Amazon reviews", intensity: "high" },
    { pain: "Bottles cause gas and colic", source: "Parent communities", intensity: "high" },
    { pain: "Diaper changes at night disturb everyone's sleep", source: "Reddit parenting", intensity: "medium" },
    { pain: "Too many products with too few uses", source: "Minimalist parents", intensity: "medium" },
  ],
  "coffee accessories": [
    { pain: "Coffee goes cold too fast", source: "Reddit coffee", intensity: "high" },
    { pain: "Grinding beans is noisy and messy", source: "Home barista forums", intensity: "medium" },
    { pain: "Hard to replicate cafe-quality at home", source: "Coffee enthusiasts", intensity: "high" },
    { pain: "Pour-over is too time-consuming for mornings", source: "Productivity blogs", intensity: "medium" },
    { pain: "Cleaning espresso machines is a chore", source: "Amazon reviews", intensity: "high" },
  ],
  "water bottles": [
    { pain: "Forget to drink water throughout the day", source: "Health forums", intensity: "high" },
    { pain: "Bottles leak in bags", source: "Amazon reviews", intensity: "high" },
    { pain: "Hard to clean narrow openings", source: "Product reviews", intensity: "medium" },
    { pain: "Plastic bottles retain odors", source: "Reddit", intensity: "medium" },
    { pain: "Ice melts too fast in summer", source: "Outdoor communities", intensity: "medium" },
  ],
  "plant care": [
    { pain: "Forget to water plants and they die", source: "Plant parent forums", intensity: "high" },
    { pain: "Don't know how much light plants need", source: "Reddit plants", intensity: "medium" },
    { pain: "Overwatering is just as bad as underwatering", source: "Gardening blogs", intensity: "high" },
    { pain: "Pests appear and spread before you notice", source: "Plant communities", intensity: "medium" },
    { pain: "Repotting is messy and stressful for plants", source: "YouTube comments", intensity: "medium" },
  ],
  "grilling tools": [
    { pain: "Can't tell when meat is perfectly done", source: "BBQ forums", intensity: "high" },
    { pain: "Grill grates are hard to clean", source: "Amazon reviews", intensity: "high" },
    { pain: "Tools rust after one season outside", source: "Product reviews", intensity: "medium" },
    { pain: "Flare-ups burn food unexpectedly", source: "Cooking communities", intensity: "medium" },
    { pain: "Charcoal takes forever to heat up", source: "Reddit grilling", intensity: "high" },
  ],
  "meditation aids": [
    { pain: "Mind wanders and can't focus", source: "Meditation forums", intensity: "high" },
    { pain: "Uncomfortable sitting positions", source: "Yoga communities", intensity: "high" },
    { pain: "Apps feel impersonal and robotic", source: "Reddit meditation", intensity: "medium" },
    { pain: "Hard to find quiet space at home", source: "WFH forums", intensity: "high" },
    { pain: "Don't know if you're doing it right", source: "Beginner forums", intensity: "medium" },
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
      vibe: "Gardening meets mobility scooter elegance",
      image: terraGlideImg
    },
    {
      name: "GripShift",
      tagline: "Handles that adapt to your hands",
      pain_solved: "Tool handles are slippery and cause wrist strain",
      description: "Universal ergonomic handle sleeves that retrofit onto any garden tool. Memory foam core with textured silicone grip. Self-heating option for cold mornings. Reduces grip force needed by 40%.",
      features: ["Fits any handle 0.75-1.5\"", "Arthritis-friendly", "Machine washable", "High-vis colors"],
      price_point: "$24 for 3-pack",
      vibe: "OXO Good Grips meets garden aesthetic",
      image: gripShiftImg
    },
    {
      name: "WeedWalk",
      tagline: "Pull weeds standing tall",
      pain_solved: "Weeding is endless and back-breaking",
      description: "A walking-stick style weeder with a foot pedal mechanism. Step, twist, and the serrated jaws grip and extract weeds root-and-all. Eject button drops weeds into attached collection bag.",
      features: ["No bending required", "Extracts 2\" taproots", "Compostable collection bags", "Adjustable height"],
      price_point: "$65",
      vibe: "Cane meets precision tool",
      image: weedWalkImg
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
      vibe: "Japanese precision meets spa cleanliness",
      image: cleanCutImg
    },
    {
      name: "StackSmart",
      tagline: "One tool. Infinite configurations.",
      pain_solved: "Drawer clutter - too many single-use tools",
      description: "Modular kitchen tool system with magnetic snap-together components. Spatula head + whisk attachment + scraper = 12 tools in one drawer slot. Premium silicone and stainless steel.",
      features: ["12 configurations", "Dishwasher safe", "Hangs or stores flat", "Lifetime warranty"],
      price_point: "$55",
      vibe: "LEGO for grown-up kitchens",
      image: stackSmartImg
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
      vibe: "Spa meets sleep science",
      image: driftBandImg
    },
    {
      name: "CloudCore",
      tagline: "The pillow that never goes flat",
      pain_solved: "Pillows go flat or lose shape quickly",
      description: "Modular pillow with replaceable air-cell inserts. When loft decreases, swap in fresh cells (subscription). Outer cover is cooling bamboo. Side-sleeper and back-sleeper configurations.",
      features: ["Adjustable loft", "Subscription refills", "Cooling cover", "10-year core warranty"],
      price_point: "$149 + $12/quarter refills",
      vibe: "Subscription economy meets sleep luxury",
      image: cloudCoreImg
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
      vibe: "Scandinavian minimalism meets tech utility",
      image: cableCanvasImg
    },
    {
      name: "PosturePing",
      tagline: "Correct your spine, invisibly",
      pain_solved: "Poor posture from bad desk setup",
      description: "A tiny, adhesive-free sensor that magnetically clips to your collar. Detects slouching using AI motion analysis. Gently vibrates when you need to correct. App tracks long-term spinal health.",
      features: ["Discreet design", "Haptic feedback", "30-day battery", "Health app integration"],
      price_point: "$49",
      vibe: "Apple AirTag meets medical device",
      image: posturePingImg
    },
    {
      name: "FocusDen",
      tagline: "Your private office, anywhere",
      pain_solved: "Distractions from household noise",
      description: "A freestanding privacy booth with sound-dampening panels that sets up in minutes. Blocks 85% of ambient noise. Built-in LED lighting and ventilation. Folds flat for storage.",
      features: ["85% noise reduction", "Built-in ventilation", "LED task lighting", "Folds to 4\" thick"],
      price_point: "$399",
      vibe: "Phone booth meets WeWork",
      image: focusDenImg
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
      vibe: "Nest Cam meets dog whisperer",
      image: pawPodImg
    },
    {
      name: "ShedShield",
      tagline: "Stop the shed before it spreads",
      pain_solved: "Pet hair gets everywhere and is hard to clean",
      description: "A wearable pet vest for indoor use made from breathable, hair-trapping mesh. Pets stay cool and comfortable while loose hair is captured in the fabric weave. Shake out outside once a day.",
      features: ["Breathable mesh", "Machine washable", "Calming compression effect", "Size adjustable"],
      price_point: "$35",
      vibe: "Athleisure for dogs",
      image: shedShieldImg
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
      vibe: "Mirror meets Tesla",
      image: wallGymImg
    },
    {
      name: "BandMate",
      tagline: "Elasticity that lasts forever",
      pain_solved: "Resistance bands snap or lose elasticity",
      description: "Smart resistance bands made from carbon-infused polymer that never snaps or stretches out. Bluetooth sensors in handles track reps, force, and velocity to your phone.",
      features: ["Unbreakable material", "Force tracking", "Smart handles", "Lifetime warranty"],
      price_point: "$79",
      vibe: "Carbon fiber meets CrossFit",
      image: bandMateImg
    },
    {
      name: "FoldFit",
      tagline: "The gym that lives in your wall",
      pain_solved: "Home gym equipment takes too much space",
      description: "A wall-mounted folding workout station with pull-up bar, resistance anchors, and TRX-style straps. Folds completely flat when not in use. Includes app with 500+ bodyweight exercises.",
      features: ["Wall-mounted", "20+ exercise options", "Folds to 3\" depth", "500+ guided workouts"],
      price_point: "$299",
      vibe: "Murphy bed meets CrossFit box",
      image: foldFitImg
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
      vibe: "Massage chair meets camping gear",
      image: jetNapImg
    },
    {
      name: "PowerPort",
      tagline: "The last adapter you'll ever buy",
      pain_solved: "Phone/device charging in airports is unreliable",
      description: "Universal travel adapter with built-in 10,000mAh power bank. Plug it into the wall to charge devices + internal battery. Unplug and keep charging on the go. Fits 150+ countries.",
      features: ["Integrated power bank", "65W PD Fast Charge", "Global compatibility", "Compact cube design"],
      price_point: "$89",
      vibe: "Anker meets Swiss Army Knife",
      image: powerPortImg
    }
  ],
  "baby products": [
    {
      name: "LullaLight",
      tagline: "Monitor, nightlight, and peace of mind",
      pain_solved: "Baby monitors have terrible connection",
      description: "An all-in-one baby monitor and smart nightlight. Mesh network technology means zero dead zones. Adaptive glow dims automatically when baby sleeps. Cry analysis tells you if it's hunger, discomfort, or just fussing.",
      features: ["Mesh network technology", "Cry analysis AI", "Adaptive smart glow", "Sleep tracking"],
      price_point: "$179",
      vibe: "Nanit meets Hue",
      image: lullaLightImg
    }
  ],
  "coffee accessories": [
    {
      name: "BrewGenius",
      tagline: "Barista-quality, one touch",
      pain_solved: "Hard to replicate cafe-quality at home",
      description: "Smart pour-over coffee maker that uses precision temperature control and automated water flow to perfectly extract any bean. Learns your taste preferences over time. Connects to your alarm to have coffee ready when you wake.",
      features: ["Precision temperature", "AI taste learning", "Alarm integration", "Bean recognition"],
      price_point: "$249",
      vibe: "Chemex meets Tesla",
      image: brewGeniusImg
    }
  ],
  "water bottles": [
    {
      name: "AquaRemind",
      tagline: "Hydration that keeps up with you",
      pain_solved: "Forget to drink water throughout the day",
      description: "Smart water bottle with LED hydration ring that glows when it's time to drink. Tracks your intake automatically via weight sensors. Syncs with fitness apps and adjusts goals based on activity and weather.",
      features: ["LED reminder ring", "Auto-tracking", "Fitness app sync", "Weather-adaptive goals"],
      price_point: "$45",
      vibe: "HydroFlask meets Fitbit",
      image: aquaRemindImg
    }
  ],
  "plant care": [
    {
      name: "PlantPal",
      tagline: "The plant parent you've always needed",
      pain_solved: "Forget to water plants and they die",
      description: "Self-watering smart planter with soil moisture, light, and nutrient sensors. Mobile app tells you exactly what each plant needs. Reservoir holds 2 weeks of water. Species-specific care profiles.",
      features: ["2-week water reservoir", "Soil sensors", "Light monitoring", "300+ plant profiles"],
      price_point: "$65",
      vibe: "Nest meets botanical garden",
      image: plantPalImg
    }
  ],
  "grilling tools": [
    {
      name: "GrillMaster",
      tagline: "Perfect doneness, every time",
      pain_solved: "Can't tell when meat is perfectly done",
      description: "Wireless smart meat thermometer with 4 probes and predictive cooking algorithms. Tells you exactly when to flip and when it's done. Learns your preferred doneness over time. Works with any grill or oven.",
      features: ["4 wireless probes", "Predictive algorithms", "Doneness learning", "300ft range"],
      price_point: "$99",
      vibe: "Weber meets NASA",
      image: grillMasterImg
    }
  ],
  "meditation aids": [
    {
      name: "ZenPod",
      tagline: "Your sanctuary, anywhere",
      pain_solved: "Hard to find quiet space at home",
      description: "A semi-enclosed meditation chair with built-in binaural audio, aromatherapy diffuser, and subtle vibration for guided breathing. Creates a sensory cocoon that blocks out the world. Folds for storage.",
      features: ["Binaural audio system", "Aromatherapy built-in", "Haptic breathing guide", "Folds flat"],
      price_point: "$599",
      vibe: "Egg chair meets float tank",
      image: zenPodImg
    }
  ],
};

// Remix building blocks for generating novel combinations
export const REMIX_ADJECTIVES = [
  "Smart", "Modular", "Foldable", "Self-cleaning", "AI-powered", "Portable",
  "Ergonomic", "Wireless", "Sustainable", "Minimalist", "Premium", "Adaptive"
];

export const REMIX_FEATURES = [
  "App connectivity", "Voice control", "Subscription refills", "Lifetime warranty",
  "Auto-adjusting", "Solar-powered", "Noise-canceling", "Temperature-regulating",
  "Biodegradable materials", "Haptic feedback", "Sleep tracking", "Form correction AI"
];

export const REMIX_VIBES = [
  "Apple meets IKEA", "Tesla meets artisan", "Dyson meets spa",
  "Nintendo meets wellness", "Patagonia meets tech", "Muji meets smart home",
  "Lego meets luxury", "NASA meets cozy", "Japanese precision meets Nordic simplicity"
];

// Solution mechanisms for richer descriptions
export const SOLUTION_MECHANISMS: Record<string, string[]> = {
  "default": [
    "magnetic attachment system",
    "modular snap-together design",
    "built-in sensor technology",
    "subscription refill model",
    "foldable space-saving form factor",
    "one-handed operation",
    "self-cleaning mechanism",
    "silent motor technology",
    "memory foam adaptation",
    "quick-release mounting system",
  ],
  "kitchen gadgets": [
    "non-stick ceramic coating that never scratches",
    "dishwasher-safe snap-apart design",
    "built-in blade sharpening mechanism",
    "modular attachment system with magnetic dock",
    "heat-resistant silicone construction",
  ],
  "sleep products": [
    "temperature-regulating phase-change fabric",
    "gradual haptic awakening technology",
    "memory foam with cooling gel layer",
    "adjustable firmness air chambers",
    "white noise and vibration therapy",
  ],
  "gardening tools": [
    "telescoping handles with quick-lock adjustment",
    "ergonomic grip zones that reduce fatigue",
    "rust-proof composite construction",
    "standing-height operation design",
    "integrated collection bags",
  ],
  "pet products": [
    "AI-powered behavior detection",
    "treat-dispensing reward system",
    "calming pheromone diffuser",
    "360-degree camera with night vision",
    "washable, fur-resistant fabric",
  ],
  "fitness equipment": [
    "real-time form correction via sensors",
    "wall-mounted space-saving design",
    "progressive digital resistance system",
    "foldable compact storage mode",
    "guided workout app integration",
  ],
  "home office": [
    "magnetic cable management channels",
    "integrated wireless charging zone",
    "acoustic dampening panels",
    "posture-sensing haptic alerts",
    "modular desk mounting system",
  ],
  "travel accessories": [
    "vacuum-seal compression technology",
    "universal adapter compatibility",
    "TSA-friendly quick-access pockets",
    "inflatable support with memory foam hybrid",
    "built-in power bank integration",
  ],
  "coffee accessories": [
    "precision temperature PID control",
    "automated pour-over water distribution",
    "grind-size calibration sensors",
    "thermal carafe insulation technology",
    "app-controlled brew scheduling",
  ],
  "water bottles": [
    "double-wall vacuum insulation",
    "smart hydration tracking sensors",
    "one-touch flip-lid mechanism",
    "wide-mouth easy-clean design",
    "LED reminder ring technology",
  ],
  "plant care": [
    "soil moisture sensing probes",
    "self-watering reservoir system",
    "automated light exposure tracking",
    "species-specific care algorithms",
    "root-zone aeration technology",
  ],
  "baby products": [
    "mesh network for zero dead zones",
    "cry analysis AI recognition",
    "adaptive glow nightlight system",
    "one-hand fold mechanism",
    "anti-colic air-vent technology",
  ],
  "meditation aids": [
    "binaural audio soundscape generation",
    "haptic breathing guidance pulses",
    "ambient light synchronization",
    "aromatherapy diffusion integration",
    "posture-support ergonomic design",
  ],
  "grilling tools": [
    "multi-probe wireless thermometry",
    "predictive done-time algorithms",
    "rust-proof titanium coating",
    "smart grate temperature mapping",
    "connected app with flip alerts",
  ],
};

export const BENEFIT_PHRASES = [
  "works in seconds, not minutes",
  "lasts 10x longer than competitors",
  "requires zero maintenance",
  "fits any space or lifestyle",
  "pays for itself in 3 months",
  "eliminates the learning curve entirely",
  "feels premium at half the price",
  "makes the old way feel primitive",
  "delivers results you can see immediately",
  "sets up in under 60 seconds",
];

// Category-specific naming components
export const CATEGORY_NAME_PARTS: Record<string, { prefixes: string[], suffixes: string[] }> = {
  "kitchen gadgets": {
    prefixes: ["Slice", "Prep", "Dash", "Sear", "Mix", "Chop", "Stir", "Quick", "Clean", "Fresh"],
    suffixes: ["Pro", "Plus", "One", "Max", "Smart", "Chef", "Ease", "Swift", "Core", "X"],
  },
  "sleep products": {
    prefixes: ["Dream", "Rest", "Drift", "Lull", "Slumber", "Doze", "Calm", "Night", "Serene", "Quiet"],
    suffixes: ["Pod", "Cloud", "Wave", "Zone", "Nest", "Haven", "Cocoon", "Base", "Soft", "Lux"],
  },
  "gardening tools": {
    prefixes: ["Terra", "Bloom", "Root", "Green", "Leaf", "Grow", "Soil", "Garden", "Plant", "Earth"],
    suffixes: ["Glide", "Grip", "Pro", "Walk", "Ease", "Hand", "Tool", "Aid", "Master", "Care"],
  },
  "pet products": {
    prefixes: ["Paw", "Fur", "Pet", "Buddy", "Wag", "Tail", "Snout", "Whisker", "Critter", "Companion"],
    suffixes: ["Pod", "Watch", "Care", "Shield", "Guard", "Pal", "Zone", "Smart", "Track", "Sense"],
  },
  "fitness equipment": {
    prefixes: ["Flex", "Power", "Core", "Fit", "Strong", "Lift", "Move", "Active", "Peak", "Pulse"],
    suffixes: ["Band", "Bar", "Gym", "Pro", "Max", "Force", "Zone", "Track", "Form", "Rig"],
  },
  "home office": {
    prefixes: ["Desk", "Focus", "Work", "Clarity", "Flow", "Space", "Office", "Posture", "Zoom", "Task"],
    suffixes: ["Den", "Hub", "Zone", "Ping", "Canvas", "Dock", "Mount", "Rise", "Base", "Pod"],
  },
  "travel accessories": {
    prefixes: ["Jet", "Travel", "Pack", "Globe", "Trip", "Port", "Flight", "Roam", "Voyage", "Trek"],
    suffixes: ["Nap", "Port", "Pack", "Gear", "Kit", "Cube", "Fold", "Go", "Light", "Ease"],
  },
  "coffee accessories": {
    prefixes: ["Brew", "Bean", "Roast", "Java", "Drip", "Pour", "Grind", "Espresso", "Cafe", "Morning"],
    suffixes: ["Genius", "Master", "Pro", "One", "Perfect", "Lab", "Craft", "Station", "Hub", "Bar"],
  },
  "water bottles": {
    prefixes: ["Aqua", "Hydro", "Water", "Flow", "Pure", "Sip", "Drink", "Stream", "Wave", "Fresh"],
    suffixes: ["Remind", "Flask", "Track", "Glow", "Smart", "Keep", "Flow", "Pure", "Core", "Go"],
  },
  "plant care": {
    prefixes: ["Plant", "Leaf", "Green", "Root", "Bloom", "Grow", "Flora", "Herb", "Garden", "Sprout"],
    suffixes: ["Pal", "Care", "Sense", "Watch", "Tend", "Pod", "Grow", "Track", "Life", "Smart"],
  },
  "baby products": {
    prefixes: ["Lulla", "Baby", "Little", "Tiny", "Gentle", "Cuddle", "Sweet", "Soft", "Care", "Tender"],
    suffixes: ["Light", "Watch", "Pod", "Glow", "Rest", "Safe", "Calm", "Nest", "Guard", "Care"],
  },
  "meditation aids": {
    prefixes: ["Zen", "Calm", "Mind", "Peace", "Still", "Breath", "Soul", "Inner", "Quiet", "Focus"],
    suffixes: ["Pod", "Zone", "Space", "Flow", "Rest", "Ease", "Wave", "Cushion", "Den", "Base"],
  },
  "grilling tools": {
    prefixes: ["Grill", "Sear", "Flame", "Smoke", "Char", "BBQ", "Fire", "Heat", "Cook", "Chef"],
    suffixes: ["Master", "Pro", "Sense", "Track", "Probe", "Guard", "Smart", "Perfect", "Zone", "King"],
  },
  "default": {
    prefixes: ["Nova", "Flux", "Pulse", "Zen", "Arc", "Core", "Wave", "Loop", "Sync", "Glide"],
    suffixes: ["Pro", "One", "Max", "Air", "Flow", "Hub", "Mate", "Pad", "Ring", "Box"],
  },
};

// Category-specific features
export const CATEGORY_FEATURES: Record<string, string[]> = {
  "kitchen gadgets": [
    "Dishwasher-safe construction",
    "Heat-resistant up to 500°F",
    "Non-slip silicone base",
    "Space-saving nesting design",
    "BPA-free materials",
    "One-touch quick release",
    "Integrated blade guard",
    "Magnetic storage mount",
  ],
  "sleep products": [
    "Hypoallergenic materials",
    "Machine-washable cover",
    "Temperature-regulating fabric",
    "Silent operation",
    "Sleep tracking integration",
    "Gradual wake technology",
    "Memory foam core",
    "Adjustable firmness settings",
  ],
  "gardening tools": [
    "Rust-proof construction",
    "Telescoping handle adjusts 24-48\"",
    "Ergonomic cushioned grip",
    "Lightweight composite body",
    "No-bend standing design",
    "Integrated tool holsters",
    "Weather-resistant finish",
    "Replaceable wear parts",
  ],
  "pet products": [
    "Two-way audio communication",
    "Night vision camera",
    "Treat dispensing mechanism",
    "Mobile app notifications",
    "Motion-activated recording",
    "Chew-resistant materials",
    "Easy-clean design",
    "Size-adjustable fit",
  ],
  "fitness equipment": [
    "Real-time rep counting",
    "Form correction feedback",
    "Compact storage design",
    "Progressive resistance levels",
    "Sweat-resistant materials",
    "Bluetooth connectivity",
    "Guided workout library",
    "Heart rate zone tracking",
  ],
  "home office": [
    "Tool-free installation",
    "Universal desk compatibility",
    "Integrated USB charging",
    "Noise-dampening design",
    "Adjustable positioning",
    "Minimalist aesthetic",
    "Cable management system",
    "Eco-friendly materials",
  ],
  "travel accessories": [
    "TSA-approved design",
    "Ultralight construction",
    "Compresses to pocket size",
    "Universal compatibility",
    "Built-in power bank",
    "Quick-access pockets",
    "Water-resistant exterior",
    "Multi-country adapters included",
  ],
  "coffee accessories": [
    "Precision temperature control",
    "Programmable brew timer",
    "Auto-clean function",
    "Compatible with any beans",
    "Carafe keeps hot 12+ hours",
    "Grind size calibration",
    "Barista-grade extraction",
    "Quiet grinder motor",
  ],
  "water bottles": [
    "Keeps cold 24hrs / hot 12hrs",
    "One-touch flip lid",
    "Wide mouth for easy cleaning",
    "Leak-proof guarantee",
    "BPA-free construction",
    "Fits standard cup holders",
    "Dishwasher-safe lid",
    "Durable powder coat finish",
  ],
  "plant care": [
    "2-week water reservoir",
    "Soil moisture sensor",
    "Light level monitoring",
    "Over-water protection",
    "Species-specific profiles",
    "Root aeration system",
    "Fertilizer indicator",
    "Indoor/outdoor compatible",
  ],
  "baby products": [
    "Pediatrician recommended",
    "One-hand operation",
    "Soft-glow night mode",
    "Cry analysis alerts",
    "Mesh network connectivity",
    "Room temperature display",
    "Lullaby library built-in",
    "Parent unit included",
  ],
  "meditation aids": [
    "Guided session library",
    "Binaural beat audio",
    "Haptic breathing guide",
    "Progress tracking",
    "Ambient soundscapes",
    "Posture-support design",
    "Folds for storage",
    "Rechargeable battery",
  ],
  "grilling tools": [
    "Wireless to 300ft range",
    "4+ probe capacity",
    "Predictive done-time",
    "Weatherproof construction",
    "Magnetic mounting",
    "Extended battery life",
    "Works with any grill/oven",
    "Custom alert temperatures",
  ],
  "default": [
    "Premium build quality",
    "Intuitive one-touch operation",
    "Compact, portable design",
    "Smart app connectivity",
    "Long-lasting battery",
    "Easy maintenance",
    "1-year warranty included",
    "Eco-conscious materials",
  ],
};
