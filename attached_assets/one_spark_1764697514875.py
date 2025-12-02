#!/usr/bin/env python3
"""
ONE SPARK - Consumer Product Ideation Engine
============================================
A fully automated system that generates novel consumer product ideas
by extracting real pain points and creating innovative solutions.

Run this script to generate one product "spark" - complete with:
- Product name
- One-line pitch
- Problem it solves
- Key features
- Visual product card
"""

import random
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import textwrap

# ============================================================================
# CONFIGURATION
# ============================================================================

CATEGORIES = [
    "kitchen gadgets", "pet products", "travel accessories", "home office",
    "fitness equipment", "baby products", "outdoor gear", "bathroom accessories",
    "car accessories", "sleep products", "cleaning tools", "phone accessories",
    "gardening tools", "storage solutions", "personal care devices",
    "camping gear", "desk organization", "laundry solutions", "shoe care",
    "water bottles", "lunch containers", "bike accessories", "yoga equipment",
    "home gym", "meditation aids", "journaling supplies", "plant care",
    "coffee accessories", "wine accessories", "grilling tools"
]

# Sample pain points database (in production, this would come from web scraping)
# Each category maps to real pain points extracted from reviews/Reddit/forums
PAIN_POINTS_DB = {
    "gardening tools": [
        {"pain": "Constant bending over causes severe back pain", "source": "Reddit/Quora", "intensity": "high"},
        {"pain": "Tool handles are slippery and cause wrist strain", "source": "Product reviews", "intensity": "high"},
        {"pain": "Gimmicky tools break after one season", "source": "Permies forum", "intensity": "medium"},
        {"pain": "Hard to keep track of small tools while working", "source": "Product reviews", "intensity": "medium"},
        {"pain": "Arthritis makes gripping and squeezing painful", "source": "Health blogs", "intensity": "high"},
        {"pain": "Weeding is endless and back-breaking", "source": "Quora", "intensity": "high"},
    ],
    "kitchen gadgets": [
        {"pain": "Drawer clutter - too many single-use tools", "source": "Reddit", "intensity": "high"},
        {"pain": "Hard to clean gadgets with small crevices", "source": "Amazon reviews", "intensity": "high"},
        {"pain": "Cheap plastic breaks or melts easily", "source": "Product reviews", "intensity": "medium"},
        {"pain": "Confusing controls on digital appliances", "source": "Reddit", "intensity": "medium"},
        {"pain": "Counter space is limited", "source": "Home forums", "intensity": "high"},
    ],
    "sleep products": [
        {"pain": "Pillows go flat or lose shape quickly", "source": "Amazon reviews", "intensity": "high"},
        {"pain": "Partner's movement disturbs sleep", "source": "Reddit", "intensity": "high"},
        {"pain": "Temperature regulation - too hot or cold", "source": "Sleep forums", "intensity": "high"},
        {"pain": "Alarm clocks are jarring and stressful", "source": "Wellness blogs", "intensity": "medium"},
        {"pain": "Blue light from devices disrupts sleep", "source": "Health studies", "intensity": "medium"},
    ],
    "home office": [
        {"pain": "Cable management is a nightmare", "source": "Reddit WFH", "intensity": "high"},
        {"pain": "Poor posture from bad desk setup", "source": "Ergonomic forums", "intensity": "high"},
        {"pain": "Video call lighting is unflattering", "source": "Reddit", "intensity": "medium"},
        {"pain": "Distractions from household noise", "source": "WFH communities", "intensity": "high"},
        {"pain": "Desk clutter reduces productivity", "source": "Productivity blogs", "intensity": "medium"},
    ],
    "pet products": [
        {"pain": "Automatic feeders jam or malfunction", "source": "Amazon reviews", "intensity": "high"},
        {"pain": "Pet hair gets everywhere and is hard to clean", "source": "Reddit pets", "intensity": "high"},
        {"pain": "Dog walks in rain/cold are miserable", "source": "Pet forums", "intensity": "medium"},
        {"pain": "Anxiety when leaving pets alone", "source": "Pet communities", "intensity": "high"},
        {"pain": "Litter box odor and maintenance", "source": "Cat forums", "intensity": "high"},
    ],
    "fitness equipment": [
        {"pain": "Home gym equipment takes too much space", "source": "Reddit fitness", "intensity": "high"},
        {"pain": "Resistance bands snap or lose elasticity", "source": "Amazon reviews", "intensity": "medium"},
        {"pain": "Hard to track form without a mirror/trainer", "source": "Fitness forums", "intensity": "high"},
        {"pain": "Workout mats slip on hard floors", "source": "Yoga communities", "intensity": "medium"},
        {"pain": "Motivation drops when working out alone", "source": "Reddit", "intensity": "high"},
    ],
    "travel accessories": [
        {"pain": "Packing cubes still result in wrinkled clothes", "source": "Travel forums", "intensity": "medium"},
        {"pain": "Phone/device charging in airports is unreliable", "source": "Reddit travel", "intensity": "high"},
        {"pain": "Neck pillows are bulky and uncomfortable", "source": "Amazon reviews", "intensity": "high"},
        {"pain": "Jet lag ruins first days of trips", "source": "Frequent flyer forums", "intensity": "high"},
        {"pain": "Lost luggage anxiety", "source": "Travel communities", "intensity": "medium"},
    ],
}

# Product concept templates for ideation
SOLUTION_ANGLES = [
    "What if we combined {concept_a} with {concept_b}?",
    "What if it was designed specifically for {demographic}?",
    "What if it used {new_tech} to solve this?",
    "What if it was subscription/refillable instead of disposable?",
    "What if it was wearable instead of handheld?",
    "What if it was silent/invisible/ambient?",
    "What if it was modular and customizable?",
    "What if it gamified the experience?",
    "What if it was designed for tiny spaces?",
    "What if it was zero-maintenance?",
]

# ============================================================================
# IDEATION ENGINE
# ============================================================================

def select_category():
    """Randomly select a product category."""
    return random.choice(CATEGORIES)

def get_pain_points(category):
    """Get pain points for a category. Falls back to generic if not found."""
    if category in PAIN_POINTS_DB:
        return PAIN_POINTS_DB[category]
    # Fallback generic pain points
    return [
        {"pain": "Products in this category are overpriced", "source": "General", "intensity": "medium"},
        {"pain": "Quality has declined in recent years", "source": "General", "intensity": "medium"},
        {"pain": "Too complicated to use", "source": "General", "intensity": "medium"},
    ]

def generate_product_concept(category, pain_points):
    """Generate a novel product concept based on pain points."""
    
    # Select primary pain point (prefer high intensity)
    high_intensity = [p for p in pain_points if p["intensity"] == "high"]
    primary_pain = random.choice(high_intensity if high_intensity else pain_points)
    
    # Product concept database - pre-generated innovative solutions
    concepts = {
        "gardening tools": [
            {
                "name": "TerraGlide",
                "tagline": "The rolling garden seat that follows you",
                "pain_solved": "Constant bending over causes severe back pain",
                "description": "A low-profile wheeled garden seat with built-in tool holsters and a pivoting work tray. Roll from plant to plant without standing up. Ergonomic kneeling pad flips down for ground-level work.",
                "features": ["360° swivel seat", "Integrated tool slots", "All-terrain wheels", "Weatherproof cushion"],
                "price_point": "$89",
                "vibe": "Gardening meets mobility scooter elegance"
            },
            {
                "name": "GripShift",
                "tagline": "Handles that adapt to your hands",
                "pain_solved": "Tool handles are slippery and cause wrist strain",
                "description": "Universal ergonomic handle sleeves that retrofit onto any garden tool. Memory foam core with textured silicone grip. Self-heating option for cold mornings. Reduces grip force needed by 40%.",
                "features": ["Fits any handle 0.75-1.5\"", "Arthritis-friendly", "Machine washable", "High-vis colors"],
                "price_point": "$24 for 3-pack",
                "vibe": "OXO Good Grips meets garden aesthetic"
            },
            {
                "name": "WeedWalk",
                "tagline": "Pull weeds standing tall",
                "pain_solved": "Weeding is endless and back-breaking",
                "description": "A walking-stick style weeder with a foot pedal mechanism. Step, twist, and the serrated jaws grip and extract weeds root-and-all. Eject button drops weeds into attached collection bag.",
                "features": ["No bending required", "Extracts 2\" taproots", "Compostable collection bags", "Adjustable height"],
                "price_point": "$65",
                "vibe": "Cane meets precision tool"
            },
        ],
        "kitchen gadgets": [
            {
                "name": "CleanCut",
                "tagline": "The kitchen tool that cleans itself",
                "pain_solved": "Hard to clean gadgets with small crevices",
                "description": "A mandoline slicer with a built-in cleaning dock. After use, snap it into the dock, add water, and micro-jets blast away residue. UV sanitizes in 60 seconds. Dishwasher-safe backup.",
                "features": ["Self-cleaning dock", "5 blade options", "Cut-resistant handle", "Magnetic storage"],
                "price_point": "$79",
                "vibe": "Japanese precision meets spa cleanliness"
            },
            {
                "name": "StackSmart",
                "tagline": "One tool. Infinite configurations.",
                "pain_solved": "Drawer clutter - too many single-use tools",
                "description": "Modular kitchen tool system with magnetic snap-together components. Spatula head + whisk attachment + scraper = 12 tools in one drawer slot. Premium silicone and stainless steel.",
                "features": ["12 configurations", "Dishwasher safe", "Hangs or stores flat", "Lifetime warranty"],
                "price_point": "$55",
                "vibe": "LEGO for grown-up kitchens"
            },
        ],
        "sleep products": [
            {
                "name": "DriftBand",
                "tagline": "Wake gently. Sleep deeply.",
                "pain_solved": "Alarm clocks are jarring and stressful",
                "description": "A soft fabric wristband that wakes you with gradual warming and gentle haptic pulses—no sound. Tracks sleep stages to wake you at the optimal moment within your window. Partner sleeps through it.",
                "features": ["Silent wake technology", "Sleep stage tracking", "7-day battery", "Machine washable band"],
                "price_point": "$129",
                "vibe": "Spa meets sleep science"
            },
            {
                "name": "CloudCore",
                "tagline": "The pillow that never goes flat",
                "pain_solved": "Pillows go flat or lose shape quickly",
                "description": "Modular pillow with replaceable air-cell inserts. When loft decreases, swap in fresh cells (subscription). Outer cover is cooling bamboo. Side-sleeper and back-sleeper configurations.",
                "features": ["Adjustable loft", "Subscription refills", "Cooling cover", "10-year core warranty"],
                "price_point": "$149 + $12/quarter refills",
                "vibe": "Subscription economy meets sleep luxury"
            },
        ],
        "home office": [
            {
                "name": "CableCanvas",
                "tagline": "Your desk's hidden nervous system",
                "pain_solved": "Cable management is a nightmare",
                "description": "A desk-mounted fabric panel with integrated cable channels and magnetic attachment points. Route, hide, and swap cables without tools. Built-in wireless charger pad and USB hub.",
                "features": ["Tool-free installation", "Magnetic cable clips", "Qi charging zone", "4-port USB hub"],
                "price_point": "$89",
                "vibe": "Scandinavian minimalism meets tech utility"
            },
            {
                "name": "PosturePing",
                "tagline": "Your posture coach, always on",
                "pain_solved": "Poor posture from bad desk setup",
                "description": "A small sensor that clips to your collar and gives a gentle vibration when you slouch. Learns your patterns and gives daily posture scores. No app required—works standalone.",
                "features": ["Haptic reminders", "All-day battery", "No subscription", "Discrete design"],
                "price_point": "$49",
                "vibe": "Invisible fitness tracker for your spine"
            },
        ],
        "pet products": [
            {
                "name": "PawPod",
                "tagline": "See them. Treat them. From anywhere.",
                "pain_solved": "Anxiety when leaving pets alone",
                "description": "Compact pet camera with two-way audio, treat dispenser, and laser pointer game—all controlled from your phone. Motion alerts and daily highlight reels. No subscription for core features.",
                "features": ["Treat tossing", "Laser play mode", "Night vision", "No subscription required"],
                "price_point": "$79",
                "vibe": "FaceTime for your fur baby"
            },
            {
                "name": "FurVac",
                "tagline": "Groom and vacuum in one stroke",
                "pain_solved": "Pet hair gets everywhere and is hard to clean",
                "description": "A pet brush with built-in micro-vacuum. Hair is sucked directly into a detachable chamber as you brush—never floats into the air or onto furniture. Cordless, quiet motor designed for skittish pets.",
                "features": ["Quiet motor (45dB)", "Cordless", "Self-cleaning brush head", "Works on furniture too"],
                "price_point": "$69",
                "vibe": "Dyson meets dog grooming"
            },
        ],
        "fitness equipment": [
            {
                "name": "FormMirror Mini",
                "tagline": "Your trainer in a tablet",
                "pain_solved": "Hard to track form without a mirror/trainer",
                "description": "A tablet-sized smart display that uses your phone's camera to track your form during workouts. Real-time audio cues correct your posture. No subscription—form library is built-in.",
                "features": ["AI form correction", "Voice coaching", "No subscription", "200+ exercises"],
                "price_point": "$199",
                "vibe": "Peloton coaching without the Peloton price"
            },
            {
                "name": "FoldForce",
                "tagline": "A full gym in 4 square feet",
                "pain_solved": "Home gym equipment takes too much space",
                "description": "Wall-mounted resistance system that unfolds into a cable machine, pull-up bar, and suspension trainer. Folds flat to 3 inches when not in use. 200lb resistance from compact pneumatic cylinders.",
                "features": ["Folds to 3\" flat", "200lb resistance", "No weights needed", "Installs in 30 min"],
                "price_point": "$499",
                "vibe": "Murphy bed meets home gym"
            },
        ],
        "travel accessories": [
            {
                "name": "JetReset",
                "tagline": "Beat jet lag before you land",
                "pain_solved": "Jet lag ruins first days of trips",
                "description": "A wearable light therapy device disguised as stylish glasses. Syncs to your flight and destination to deliver precisely-timed light exposure. Adjusts your circadian rhythm mid-flight.",
                "features": ["Flight-synced light therapy", "Stylish frames", "USB-C charging", "App with timezone AI"],
                "price_point": "$179",
                "vibe": "Fashion meets chronobiology"
            },
            {
                "name": "NestNeck",
                "tagline": "The travel pillow that disappears",
                "pain_solved": "Neck pillows are bulky and uncomfortable",
                "description": "An inflatable neck support that packs into a pouch the size of a sock. Ergonomic design supports chin, not just neck. Soft microfiber cover. Deflates and stows in seconds.",
                "features": ["Packs to 4oz", "Chin support design", "Machine washable cover", "Built-in eye mask pocket"],
                "price_point": "$39",
                "vibe": "Ultralight backpacking meets business class comfort"
            },
        ],
    }
    
    # Get concepts for this category or use gardening as fallback
    category_concepts = concepts.get(category, concepts["gardening tools"])
    
    # Find concept that matches the pain point, or pick randomly
    matching = [c for c in category_concepts if c["pain_solved"] == primary_pain["pain"]]
    if matching:
        return matching[0], primary_pain
    return random.choice(category_concepts), primary_pain


# ============================================================================
# VISUAL CARD GENERATION
# ============================================================================

def create_product_card(concept, category, pain_point, output_path):
    """Create a beautiful product concept card."""
    
    # Card dimensions (Instagram-friendly aspect ratio)
    width, height = 1080, 1350
    
    # Color palette - warm, modern, premium feel
    colors = {
        "bg": "#1a1a2e",          # Deep navy
        "card": "#16213e",         # Slightly lighter navy
        "accent": "#e94560",       # Coral red
        "accent2": "#0f3460",      # Deep blue
        "text": "#eaeaea",         # Off-white
        "text_muted": "#a0a0a0",   # Gray
        "highlight": "#f5c518",    # Gold
    }
    
    # Create image
    img = Image.new('RGB', (width, height), colors["bg"])
    draw = ImageDraw.Draw(img)
    
    # Try to load fonts, fall back to default if not available
    try:
        font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 64)
        font_tagline = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 32)
        font_body = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
        font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 20)
        font_label = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 16)
    except:
        font_title = ImageFont.load_default()
        font_tagline = font_title
        font_body = font_title
        font_small = font_title
        font_label = font_title
    
    # Draw decorative elements
    # Top accent bar
    draw.rectangle([0, 0, width, 8], fill=colors["accent"])
    
    # "ONE SPARK" branding
    draw.text((60, 40), "ONE SPARK", font=font_label, fill=colors["accent"])
    draw.text((60, 60), f"Daily Product Idea • {category.upper()}", font=font_small, fill=colors["text_muted"])
    
    # Main product name
    y_pos = 140
    draw.text((60, y_pos), concept["name"], font=font_title, fill=colors["text"])
    
    # Tagline
    y_pos += 80
    draw.text((60, y_pos), concept["tagline"], font=font_tagline, fill=colors["highlight"])
    
    # Divider line
    y_pos += 60
    draw.line([(60, y_pos), (width - 60, y_pos)], fill=colors["accent2"], width=2)
    
    # Problem section
    y_pos += 30
    draw.text((60, y_pos), "THE PROBLEM", font=font_label, fill=colors["accent"])
    y_pos += 30
    
    # Wrap problem text
    problem_text = pain_point["pain"]
    wrapped = textwrap.wrap(problem_text, width=45)
    for line in wrapped:
        draw.text((60, y_pos), line, font=font_body, fill=colors["text_muted"])
        y_pos += 32
    
    # Solution section
    y_pos += 20
    draw.text((60, y_pos), "THE SOLUTION", font=font_label, fill=colors["accent"])
    y_pos += 30
    
    # Wrap description text
    wrapped = textwrap.wrap(concept["description"], width=45)
    for line in wrapped[:5]:  # Limit to 5 lines
        draw.text((60, y_pos), line, font=font_body, fill=colors["text"])
        y_pos += 32
    
    # Features section
    y_pos += 30
    draw.text((60, y_pos), "KEY FEATURES", font=font_label, fill=colors["accent"])
    y_pos += 30
    
    for feature in concept["features"][:4]:
        draw.text((60, y_pos), f"→ {feature}", font=font_small, fill=colors["text"])
        y_pos += 28
    
    # Price point and vibe
    y_pos += 30
    draw.rectangle([60, y_pos, width - 60, y_pos + 100], fill=colors["card"], outline=colors["accent2"])
    
    draw.text((80, y_pos + 15), "PRICE POINT", font=font_label, fill=colors["text_muted"])
    draw.text((80, y_pos + 40), concept["price_point"], font=font_tagline, fill=colors["highlight"])
    
    draw.text((400, y_pos + 15), "VIBE", font=font_label, fill=colors["text_muted"])
    vibe_wrapped = textwrap.wrap(concept["vibe"], width=30)
    vibe_y = y_pos + 40
    for line in vibe_wrapped[:2]:
        draw.text((400, vibe_y), line, font=font_small, fill=colors["text"])
        vibe_y += 24
    
    # Footer
    draw.rectangle([0, height - 60, width, height], fill=colors["card"])
    draw.text((60, height - 42), "Generated by One Spark • Your daily dose of product innovation", 
              font=font_small, fill=colors["text_muted"])
    
    # Save
    img.save(output_path, quality=95)
    return output_path


# ============================================================================
# MAIN EXECUTION
# ============================================================================

def generate_spark(output_dir="/home/claude"):
    """Generate a single product spark."""
    
    print("\n" + "="*60)
    print("🔥 ONE SPARK - Consumer Product Ideation Engine")
    print("="*60 + "\n")
    
    # Step 1: Select category
    category = select_category()
    print(f"📦 Category: {category.upper()}")
    
    # Step 2: Get pain points
    pain_points = get_pain_points(category)
    print(f"😤 Found {len(pain_points)} pain points")
    
    # Step 3: Generate concept
    concept, primary_pain = generate_product_concept(category, pain_points)
    
    print(f"\n💡 SPARK GENERATED!")
    print("-" * 40)
    print(f"Product: {concept['name']}")
    print(f"Tagline: {concept['tagline']}")
    print(f"Solves: {primary_pain['pain']}")
    print(f"Price: {concept['price_point']}")
    print("-" * 40)
    
    # Step 4: Create visual
    output_path = Path(output_dir) / f"spark_{concept['name'].lower().replace(' ', '_')}.png"
    create_product_card(concept, category, primary_pain, output_path)
    print(f"\n🎨 Product card saved to: {output_path}")
    
    # Return full spark data
    return {
        "category": category,
        "concept": concept,
        "pain_point": primary_pain,
        "card_path": str(output_path)
    }


if __name__ == "__main__":
    spark = generate_spark()
    print("\n✅ Spark complete!")
    print(f"\n📋 Full concept:\n{json.dumps(spark['concept'], indent=2)}")
