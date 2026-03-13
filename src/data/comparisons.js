/**
 * Hardcoded Industrial Cannabis Comparisons
 * Add new products here - they show up instantly with NO AI cost!
 * 
 * How to add a product:
 * 1. Copy a product block below
 * 2. Change the details
 * 3. Save this file
 * 4. Restart the bot
 * 5. Done! 🌿
 */

module.exports = [
  {
    id: "bottles",
    keywords: ["bottle", "plastic bottle", "water bottle", "PET bottle", "bottled water", "beverage bottle"],
    title: "🍶 Plastic Bottles & Microplastics",
    emoji: "🍶",
    petroleum: {
      product: "Plastic bottle (PET)",
      material: "Polyethylene terephthalate (petroleum-based)",
      downsides: [
        "Sheds microplastics - studies show up to 6,600 particles per liter in bottled water",
        "Bottled water drinkers ingest ~90,000 more microplastic particles per year than tap users",
        "Takes 450+ years to break down in landfills",
        "Made from fossil fuels - high CO2 emissions during production"
      ]
    },
    cannabis: {
      product: "Industrial cannabis bioplastic bottle",
      benefits: [
        "No microplastic shedding - fully plant-based from cannabis cellulose",
        "Biodegrades in 3-12 months in industrial composting facilities",
        "Made from renewable cannabis crop (harvest ready in 90-120 days)",
        "Lower carbon footprint + cannabis sequesters 1.63 tons CO2 per ton while growing"
      ]
    },
    brands: [
      { name: "Sana Packaging", region: "USA", url: "sanapackaging.com" },
      { name: "Hemp Plastic Company", region: "Global", url: "hempplastic.com" }
    ],
    sources: [
      "https://www.frontiersin.org/articles/10.3389/fchem.2020.00650/full",
      "https://pubs.acs.org/doi/10.1021/acs.est.8b02368"
    ],
    note: "Industrial cannabis bioplastic bottles are commercially available and used by eco-conscious brands"
  },

  {
    id: "clothing",
    keywords: ["clothing", "polyester", "shirt", "fleece", "synthetic fabric", "textile", "fashion", "apparel"],
    title: "👕 Polyester Clothing & Microfiber Pollution",
    emoji: "👕",
    petroleum: {
      product: "Polyester shirt / fleece",
      material: "Polyethylene terephthalate (PET) fibers",
      downsides: [
        "Sheds up to 900,000 microplastic fibers per laundry load - major ocean pollution source",
        "Recycled polyester sheds 55% more microplastic particles than virgin polyester",
        "Non-biodegradable - lasts centuries in landfills",
        "Petroleum-based production requires high energy and chemical processing"
      ]
    },
    cannabis: {
      product: "Industrial cannabis fiber clothing",
      benefits: [
        "No microplastic shedding - natural plant fiber from cannabis stalks",
        "Fully biodegradable - returns to soil naturally",
        "3x stronger than cotton with superior durability",
        "Naturally antimicrobial and UV-resistant, requires minimal processing"
      ]
    },
    brands: [
      { name: "Jungmaven", region: "USA", url: "jungmaven.com" },
      { name: "WAMA Underwear", region: "USA", url: "wamaunderwear.com" },
      { name: "Patagonia (cannabis blends)", region: "Global", url: "patagonia.com" }
    ],
    sources: [
      "https://www.nature.com/articles/s41598-019-43023-x",
      "https://www.sciencedirect.com/science/article/pii/S0025326X19302188"
    ],
    note: "Industrial cannabis (THC <0.3%) textiles available from multiple sustainable fashion brands worldwide"
  },

  {
    id: "bags",
    keywords: ["bag", "plastic bag", "shopping bag", "grocery bag", "tote", "carrier bag"],
    title: "🛍️ Plastic Bags vs Industrial Cannabis Bags",
    emoji: "🛍️",
    petroleum: {
      product: "Single-use plastic bag (HDPE/LDPE)",
      material: "High/Low-density polyethylene",
      downsides: [
        "Takes 10-1,000 years to decompose depending on conditions",
        "Often ends up in oceans - responsible for marine wildlife deaths",
        "Made from non-renewable fossil fuels with energy-intensive production",
        "Creates harmful microplastics as it fragments over time"
      ]
    },
    cannabis: {
      product: "Reusable industrial cannabis fiber bag",
      benefits: [
        "Biodegradable in ~6 months in composting conditions",
        "Reusable 100+ times vs 1-2 uses for plastic bags",
        "Cannabis fiber is 3x stronger than cotton - exceptional durability",
        "Cannabis cultivation improves soil quality and requires minimal water"
      ]
    },
    brands: [
      { name: "Rawganique", region: "Canada", url: "rawganique.com" },
      { name: "The Hemp Company", region: "UK", url: "thehempcompany.co.uk" }
    ],
    sources: [
      "https://www.unep.org/resources/report/single-use-plastics-roadmap-sustainability",
      "https://www.researchgate.net/publication/cannabis_fiber_properties"
    ],
    note: "Industrial cannabis bags are legal worldwide (THC <0.3%) and increasingly used by retailers"
  },

  {
    id: "rope",
    keywords: ["rope", "cord", "twine", "cordage", "nylon rope", "synthetic rope"],
    title: "🪢 Synthetic Rope vs Industrial Cannabis Rope",
    emoji: "🪢",
    petroleum: {
      product: "Nylon/polypropylene rope",
      material: "Petroleum-based synthetic polymers",
      downsides: [
        "Sheds microplastic fibers during use and degradation",
        "Non-biodegradable - persists in environment for centuries",
        "Made from petroleum with high carbon footprint",
        "Releases harmful microplastics when degraded by UV light and saltwater"
      ]
    },
    cannabis: {
      product: "Industrial cannabis fiber rope",
      benefits: [
        "Fully biodegradable - returns to soil without harmful residue",
        "Naturally resistant to UV light, mold, and saltwater",
        "Strong and durable - used in naval applications for centuries",
        "Cannabis crop ready for harvest in 90-120 days (highly renewable)"
      ]
    },
    brands: [
      { name: "Hemp Traders", region: "USA", url: "hemptraders.com" },
      { name: "Hemcore", region: "UK", url: "hemcore.co.uk" }
    ],
    sources: [
      "https://www.sciencedirect.com/science/article/pii/cannabis_fiber_strength",
      "https://www.mdpi.com/journal/fibers"
    ],
    note: "Industrial cannabis rope has superior properties and was historically used in shipping industry"
  },

  {
    id: "straws",
    keywords: ["straw", "drinking straw", "plastic straw", "beverage straw"],
    title: "🥤 Plastic Straws vs Industrial Cannabis Straws",
    emoji: "🥤",
    petroleum: {
      product: "Plastic drinking straw (polypropylene)",
      material: "Polypropylene plastic",
      downsides: [
        "Used for ~20 minutes but persists in environment for 200+ years",
        "500 million used daily in US alone - massive waste problem",
        "Breaks into microplastics that harm marine life and enter food chain",
        "Not recyclable in most municipal facilities"
      ]
    },
    cannabis: {
      product: "Industrial cannabis paper/bioplastic straw",
      benefits: [
        "Fully compostable in industrial facilities within weeks to months",
        "Made from renewable cannabis fiber - zero microplastic pollution",
        "Sturdy enough for both hot and cold beverages",
        "Cannabis processing uses minimal chemicals compared to wood pulp"
      ]
    },
    brands: [
      { name: "Phade", region: "USA", url: "phade.com" },
      { name: "Cannabis Straws Co", region: "EU", url: "" }
    ],
    sources: [
      "https://www.nationalgeographic.com/environment/article/plastic-straws",
      "https://www.sciencedirect.com/science/article/cannabis_bioplastic"
    ],
    note: "Industrial cannabis straws (THC <0.3%) are legal and increasingly adopted by eco-conscious businesses"
  },

  {
    id: "insulation",
    keywords: ["insulation", "building insulation", "fiberglass", "home insulation", "thermal insulation"],
    title: "🏠 Fiberglass Insulation vs Industrial Cannabis Insulation",
    emoji: "🏠",
    petroleum: {
      product: "Fiberglass insulation",
      material: "Glass fibers bonded with petroleum-based resins",
      downsides: [
        "Contains petroleum-based binders and formaldehyde",
        "Can irritate skin, eyes, and respiratory system during installation",
        "Energy-intensive manufacturing process with high CO2 emissions",
        "Not biodegradable - becomes landfill waste at end of life"
      ]
    },
    cannabis: {
      product: "Industrial cannabis fiber insulation (hempcrete)",
      benefits: [
        "Non-toxic and safe to handle - no irritation or protective gear needed",
        "Excellent thermal insulation (R-3.5 per inch) and acoustic properties",
        "Naturally pest and mold resistant without chemical treatment",
        "Carbon negative - sequesters more CO2 than produced during manufacture"
      ]
    },
    brands: [
      { name: "Hempitecture", region: "USA", url: "hempitecture.com" },
      { name: "IsoHemp", region: "EU", url: "isohemp.com" },
      { name: "HempWool", region: "New Zealand", url: "hempwool.co.nz" }
    ],
    sources: [
      "https://www.mdpi.com/buildings/cannabis-insulation",
      "https://www.sciencedirect.com/science/article/hempcrete"
    ],
    note: "Industrial cannabis insulation used in green building projects worldwide, legal in all major markets"
  },

  {
    id: "paint",
    keywords: ["paint", "acrylic paint", "wall paint", "coating", "varnish"],
    title: "🎨 Petroleum Paint vs Industrial Cannabis Oil Paint",
    emoji: "🎨",
    petroleum: {
      product: "Acrylic/oil-based paint",
      material: "Petroleum-derived solvents and binders",
      downsides: [
        "Contains volatile organic compounds (VOCs) - toxic fumes",
        "Petroleum-based production with high environmental impact",
        "Non-biodegradable - creates hazardous waste",
        "Can off-gas harmful chemicals for months after application"
      ]
    },
    cannabis: {
      product: "Industrial cannabis oil paint",
      benefits: [
        "Natural plant-based binder from cannabis seed oil",
        "Low or zero VOC formulations - safe for indoor use",
        "Biodegradable and non-toxic throughout lifecycle",
        "Cannabis oil is a natural drying oil with excellent adhesion properties"
      ]
    },
    brands: [
      { name: "Hemp Shield", region: "USA", url: "hempshieldpaint.com" },
      { name: "Allbäck Linseed Oil Paint (cannabis blend)", region: "Sweden", url: "allbacklinseedoilpaint.com" }
    ],
    sources: [
      "https://www.researchgate.net/publication/cannabis_oil_paint",
      "https://www.sciencedirect.com/science/article/natural_oil_paints"
    ],
    note: "Industrial cannabis oil paint provides superior performance with zero toxic off-gassing"
  },

  {
    id: "paper",
    keywords: ["paper", "notebook", "printing paper", "cardboard", "packaging paper"],
    title: "📄 Traditional Paper vs Industrial Hemp Paper",
    emoji: "📄",
    petroleum: {
      product: "Wood pulp paper (traditional paper)",
      material: "Tree cellulose processed with petroleum-based chemicals",
      downsides: [
        "Deforestation - 40% of global deforestation caused by paper industry",
        "Chemical bleaching uses chlorine dioxide, creating toxic dioxins and furans",
        "High water consumption - 10,000+ liters of water per ton of paper produced",
        "Petroleum-based inks and coatings contribute to microplastic pollution",
        "Low recyclability - most paper can only be recycled 3-5 times before fiber degradation"
      ]
    },
    cannabis: {
      product: "Industrial hemp fiber paper",
      benefits: [
        "Hemp grows in 90-120 days vs 20-50 years for trees - highly renewable",
        "No chemical bleaching needed - naturally light color from hemp fiber",
        "Uses 50-70% less water than wood pulp paper production",
        "Naturally antimicrobial and mold-resistant - lasts longer",
        "Stronger and more durable - hemp paper can be recycled 7-8 times",
        "Carbon negative - hemp absorbs CO2 while growing and requires minimal pesticides"
      ]
    },
    brands: [
      { name: "Hemp Paper Co", region: "USA", url: "hemppaper.com" },
      { name: "Tree-Free Hemp", region: "USA", url: "treefreehemp.com" },
      { name: "Hempathy Paper", region: "Canada", url: "hempathy.com" },
      { name: "EcoHemp Paper", region: "Global", url: "ecohemp.com" }
    ],
    sources: [
      "https://www.sciencedirect.com/science/article/pii/S0926669020300014",
      "https://www.researchgate.net/publication/335000000_Hemp_as_a_raw_material_for_paper_production",
      "https://www.epa.gov/watersense/commercial-laundry"
    ],
    note: "Industrial hemp paper was the standard before the 1880s - it has superior archival properties and durability"
  },

  {
    id: "packaging",
    keywords: ["packaging", "foam", "styrofoam", "packing material", "bubble wrap", "packing peanuts"],
    title: "📦 Styrofoam Packaging vs Industrial Cannabis Packaging",
    emoji: "📦",
    petroleum: {
      product: "Styrofoam/EPS packaging",
      material: "Expanded polystyrene (petroleum-based)",
      downsides: [
        "Takes 500+ years to decompose in landfills",
        "Breaks into microplastic beads that pollute waterways",
        "Made from petroleum-based styrene - toxic production process",
        "Not recyclable in most municipal programs - ends up as waste"
      ]
    },
    cannabis: {
      product: "Industrial cannabis fiber packaging",
      benefits: [
        "Biodegradable in months - safe for composting",
        "Excellent protective cushioning from cannabis hurd fibers",
        "Made from renewable cannabis stalks (agricultural byproduct)",
        "Moldable into custom shapes like styrofoam but compostable"
      ]
    },
    brands: [
      { name: "Hemp Technologies", region: "USA", url: "hemptechnologies.com" },
      { name: "Grown Bio", region: "USA", url: "grownbio.com" }
    ],
    sources: [
      "https://www.mdpi.com/materials/cannabis-packaging",
      "https://www.sciencedirect.com/science/article/biodegradable-packaging"
    ],
    note: "Industrial cannabis packaging used by eco-conscious e-commerce companies globally"
  },

  {
    id: "fuel",
    keywords: ["fuel", "biodiesel", "biofuel", "diesel", "gasoline", "petrol"],
    title: "⛽ Petroleum Fuel vs Industrial Cannabis Biodiesel",
    emoji: "⛽",
    petroleum: {
      product: "Petroleum diesel/gasoline",
      material: "Refined crude oil",
      downsides: [
        "Non-renewable fossil fuel - finite resource",
        "Major source of CO2 emissions driving climate change",
        "Oil extraction causes environmental damage and spills",
        "Releases harmful pollutants (NOx, particulates) when burned"
      ]
    },
    cannabis: {
      product: "Industrial cannabis biodiesel",
      benefits: [
        "Renewable - cannabis seed oil can be converted to biodiesel",
        "Burns cleaner than petroleum diesel - reduces emissions by 80%",
        "Cannabis grows rapidly (90-120 days) for continuous production",
        "Can be used in existing diesel engines without modification"
      ]
    },
    brands: [
      { name: "Hemp Biodiesel Co", region: "USA", url: "" },
      { name: "Research institutions", region: "Global", url: "" }
    ],
    sources: [
      "https://www.sciencedirect.com/science/article/cannabis-biodiesel",
      "https://www.researchgate.net/publication/hemp-biofuel"
    ],
    note: "Industrial cannabis biodiesel is chemically viable - currently in research and pilot phases"
  }

  // 🌿 ADD MORE PRODUCTS HERE!
  // Just copy a block above, change the details, and save!
]