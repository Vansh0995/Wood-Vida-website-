
window.WV_WHATSAPP = "917309990055";

window.WV_CATEGORIES = {
  "lamps": {
    label: "Side Lamps",
    single: "Side lamp",
    line: "Warm light shaped by nature."
  },
  "wall-art": {
    label: "Wall Art",
    single: "Wall art",
    line: "Organic forms made for your walls."
  },
  "tables": {
    label: "Tables",
    single: "Table",
    line: "Functional furniture with a natural soul."
  }
};

// Exactly 5 products per category.
// 15 products total, displayed in 5 columns.
window.WV_GRID_SLOTS = {
  "all": 15,
  "lamps": 5,
  "wall-art": 5,
  "tables": 5
};

// Creates a temporary, visible image placeholder.
// Replace these with actual image URLs later.
function wvPlaceholderImage(label) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
      <rect width="800" height="1000" fill="#e6e0d5"/>
      <rect x="34" y="34" width="732" height="932" fill="none" stroke="#a49a88" stroke-width="2"/>
      <path d="M100 500 H700" stroke="#c5baaa" stroke-width="2"/>
      <text x="400" y="455" text-anchor="middle" font-family="Georgia,serif" font-size="34" fill="#514638">WOOD VIDA</text>
      <text x="400" y="550" text-anchor="middle" font-family="Arial,sans-serif" font-size="25" fill="#514638">${label}</text>
      <text x="400" y="600" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" fill="#756957">Temporary image placeholder</text>
    </svg>`;
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}


function wvMakeProduct(id, category, name, imageLabel, description, dimensions, wood) {
  const productImages = window.WV_PRODUCT_IMAGES?.[id] || [
    wvPlaceholderImage(imageLabel)
  ];

  const image = productImages[0];

  return {
    id,
    category,
    name,
    description,
    image,
    
images: productImages,

    price: null,
    availability: "Ready To Shipping",
    wood,
    finish: "Hand-finished natural finish",
    dimensions,
    weight: null,
    features: [
      "Natural wood character",
      "Hand-finished craftsmanship",
      "Unique natural grain",
      "Made with attention to detail",
      "Each piece has its own character"
    ],
    story: "This WOOD VIDA design celebrates the natural character of wood. Grain, texture and individual details make every finished piece distinctive.",
    care: "Keep away from prolonged moisture and harsh sunlight. Clean gently with a soft, dry cloth.",
    shipping: "Shipping and delivery details will be confirmed after your enquiry.",
    warranty: "Warranty details will be confirmed with the final product specification.",
    model: ""
  };
}


window.WV_PRODUCT_IMAGES = {
  // =====================================
  // SIDE LAMPS — PRODUCT IDs 1 TO 5
  // =====================================

  1: [
    "Assets/sidelamp1img1.png",
    "Assets/sidelamp1img2.png",
    "Assets/sidelamp1img3.png",
    "Assets/sidelamp1img4.png",
    "Assets/products/forest-glow-5.png"
  ],

  2: [
    "Assets/sidelamp2img1.png",
    "Assets/sidelamp2img2.png",
    "Assets/sidelamp2img3.png",
    "Assets/sidelamp2img4.png",
    "Assets/sidelamp2img5.png"
  ],

  3: [
    "Assets/sidelamp3img1.png",
    "Assets/sidelamp3img2.png",
    "Assets/sidelamp3img3.png",
    "Assets/sidelamp3img4.png",
    "Assets/sidelamp3img5.png"
  ],

  4: [
    "Assets/sidelamp4img1.png",
    "Assets/sidelamp4img2.png",
    "Assets/sidelamp4img3.png",
    "Assets/sidelamp4img4.png",
    "Assets/sidelamp4img5.png"
  ],

  5: [
    "Assets/sidelamp5img1.png",
    "Assets/sidelamp5img2.png",
    "Assets/sidelamp5img3.png",
    "Assets/sidelamp5img4.png",
    "Assets/sidelamp5img5.png"
  ],

  // =====================================
  // WALL ART — PRODUCT IDs 6 TO 10
  // =====================================

  6: [
    "Assets/wallart1img1.png",
    "Assets/wallart1img2.png",
    "Assets/wallart1img3.png",
    "Assets/wallart1img4.png",
    "Assets/wallart1img5.png"
  ],

  7: [
    "Assets/wallart2img1.png",
    "Assets/wallart2img2.png",
    "Assets/wallart2img3.png",
    "Assets/wallart2img4.png",
    "Assets/wallart2img5.png"
  ],

  8: [
    "Assets/wallart3img1.png",
    "Assets/wallart3img2.png",
    "Assets/wallart3img3.png",
    "Assets/wallart3img4.png",
    "Assets/wallart3img5.png"
  ],

  9: [
    "Assets/wallart4img1.png",
    "Assets/wallart4img2.png",
    "Assets/wallart4img3.png",
    "Assets/wallart4img4.png",
    "Assets/wallart4img5.png"
  ],

  10: [
    "Assets/wallart5img1.png",
    "Assets/wallart5img2.png",
    "Assets/wallart5img3.png",
    "Assets/wallart5img4.png",
    "Assets/wallart5img5.png"
  ],

  // =====================================
  // TABLES — PRODUCT IDs 11 TO 15
  // =====================================

  11: [
    "Assets/table1img1.png",
    "Assets/table1img2.png",
    "Assets/table1img3.png",
    "Assets/table1img4.png",
    "Assets/table1img5.png"
  ],

  12: [
    "Assets/table2img1.png",
    "Assets/table2img2.png",
    "Assets/table2img3.png",
    "Assets/table2img4.png",
    "Assets/table2img5.png"
  ],

  13: [
    "Assets/coming-soon-img.png",
    "Assets/coming-soon-img.png",
    "Assets/coming-soon-img.png",
    "Assets/coming-soon-img.png",
    "Assets/coming-soon-img.png"
  ],

  14: [
    "Assets/coming-soon-img.png",
    "Assets/coming-soon-img.png",
    "Assets/coming-soon-img.png",
    "Assets/coming-soon-img.png",
    "Assets/coming-soon-img.png"
  ],

  15: [
    "Assets/coming-soon-img.png",
    "Assets/coming-soon-img.png",
    "Assets/coming-soon-img.png",
    "Assets/coming-soon-img.png",
    "Assets/coming-soon-img.png"
  ]
};


window.WV_PRODUCTS = [
  // SIDE LAMPS — 5 PRODUCTS
  wvMakeProduct(
    1, "lamps", "Forest Glow",
    "side lamps1 img 1",
    "A handcrafted wooden side lamp designed to bring warm ambience to your space.",
    { width: 28, height: 45, depth: 28 },
    "Natural wood"
  ),
  wvMakeProduct(
    2, "lamps", "Amber Root",
    "side lamps2 img 1",
    "A nature-inspired side lamp celebrating the textures and tones of wood.",
    { width: 25, height: 40, depth: 25 },
    "Natural wood"
  ),
  wvMakeProduct(
    3, "lamps", "Timber Aura",
    "side lamps3 img 1",
    "A distinctive wooden lamp for bedside tables and cosy reading corners.",
    { width: 26, height: 42, depth: 26 },
    "Natural wood"
  ),
  wvMakeProduct(
    4, "lamps", "Earthlight",
    "side lamps4 img 1",
    "A sculptural side lamp inspired by organic forms and natural materials.",
    { width: 30, height: 46, depth: 30 },
    "Natural wood"
  ),
  wvMakeProduct(
    5, "lamps", "Woodland Glow",
    "side lamps5 img 1",
    "A warm, nature-inspired lamp created for a calm and inviting interior.",
    { width: 27, height: 43, depth: 27 },
    "Natural wood"
  ),

  // WALL ART — 5 PRODUCTS
  wvMakeProduct(
    6, "wall-art", "Earth Form",
    "wall art1 img 1",
    "Organic wooden wall art that highlights natural shapes and textures.",
    { width: 60, height: 80, depth: 6 },
    "Natural wood"
  ),
  wvMakeProduct(
    7, "wall-art", "Root Canvas",
    "wall art2 img 1",
    "A distinctive wood wall piece designed to add character to your walls.",
    { width: 50, height: 70, depth: 5 },
    "Natural wood"
  ),
  wvMakeProduct(
    8, "wall-art", "Wild Grain",
    "wall art3 img 1",
    "A decorative wall piece inspired by the unique grain of natural wood.",
    { width: 55, height: 75, depth: 5 },
    "Natural wood"
  ),
  wvMakeProduct(
    9, "wall-art", "Nature Trace",
    "wall art4 img 1",
    "Nature-inspired wooden wall decor for thoughtful, personal spaces.",
    { width: 45, height: 65, depth: 5 },
    "Natural wood"
  ),
  wvMakeProduct(
    10, "wall-art", "Forest Imprint",
    "wall art5 img 1",
    "An organic decorative accent celebrating the character of wood.",
    { width: 60, height: 60, depth: 6 },
    "Natural wood"
  ),

  // TABLES — 5 PRODUCTS
  wvMakeProduct(
    11, "tables", "Root Table",
    "tables1 img 1",
    "A sculptural wooden table that brings natural character into your living space.",
    { width: 110, height: 45, depth: 60 },
    "Natural wood"
  ),
  wvMakeProduct(
    12, "tables", "Terra Table",
    "tables2 img 1",
    "A nature-inspired table designed to complement warm, considered interiors.",
    { width: 100, height: 45, depth: 55 },
    "Natural wood"
  ),
  wvMakeProduct(
    13, "tables", "Timber Nest",
    "tables3 img 1",
    "A functional wooden table with an organic, handcrafted design direction.",
    { width: 90, height: 42, depth: 50 },
    "Natural wood"
  ),
  wvMakeProduct(
    14, "tables", "Forest Edge",
    "tables4 img 1",
    "A distinctive table concept inspired by the raw beauty of natural timber.",
    { width: 120, height: 46, depth: 65 },
    "Natural wood"
  ),
  wvMakeProduct(
    15, "tables", "Earthline Table",
    "tables5 img 1",
    "A natural wood table concept for interiors that value material and character.",
    { width: 105, height: 44, depth: 58 },
    "Natural wood"
  )
];
