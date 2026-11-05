
window.WV_WHATSAPP = "917309990055";

/* ==========================================================
   CATEGORIES
========================================================== */

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
    label: "Side Tables",
    single: "Side table",
    line: "Functional furniture with a natural soul."
  },
  "mido-creativity": {
    label: "Mido Creativity",
    single: "Mido Creativity",
    line: "Creative designs inspired by medical art."
  }
};

window.WV_GRID_SLOTS = {
  all: 40,
  lamps: 10,
  "wall-art": 10,
  tables: 10,
  "mido-creativity": 10
};

/* ==========================================================
   PLACEHOLDER GENERATOR
========================================================== */

function wvPlaceholderImage(label) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000">
      <rect width="800" height="1000" fill="#e6e0d5"/>
      <rect x="34" y="34" width="732" height="932"
        fill="none" stroke="#a49a88" stroke-width="2"/>
      <text x="400" y="455" text-anchor="middle"
        font-family="Georgia" font-size="34" fill="#514638">
        WOOD VIDA
      </text>
      <text x="400" y="550" text-anchor="middle"
        font-family="Arial" font-size="25" fill="#514638">
        ${label}
      </text>
      <text x="400" y="600" text-anchor="middle"
        font-family="Arial" font-size="17" fill="#756957">
        Product image placeholder
      </text>
    </svg>`;

  return "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(svg);
}

/* ==========================================================
   SAMPLE PRODUCT PRICES
========================================================== */

const samplePrices = {
  1: 4500, 2: 5200, 3: 4800, 4: 6500, 5: 5500,
  6: 3200, 7: 3800, 8: 2900, 9: 3500, 10: 4200,
  11: 12500, 12: 11000, 13: 9500, 14: 14500, 15: 13500,
  16: 4900, 17: 5600, 18: 6200, 19: 5100, 20: 5900,
  21: 3600, 22: 4100, 23: 3300, 24: 3900, 25: 4500,
  26: 10500, 27: 12000, 28: 9800, 29: 15500, 30: 14000,
  31: 2500, 32: 3200, 33: 3800, 34: 4200, 35: 2900,
  36: 3500, 37: 4500, 38: 5200, 39: 3900, 40: 4800
};

/* ==========================================================
   PRODUCT CREATOR
========================================================== */

function wvMakeProduct(
  id, category, name, imageLabel,
  description, dimensions, wood
) {
  const productImages =
    window.WV_PRODUCT_IMAGES?.[id] ||
    [wvPlaceholderImage(imageLabel)];

  return {
    id,
    category,
    name,
    description,
    image: productImages[0],
    images: productImages,

    price: samplePrices[id] || null,
    availability: "Ready To Ship",
    wood,
    finish: "Hand-finished natural finish",
    dimensions,
    weight: null,

    features: [
      "Natural material character",
      "Hand-finished craftsmanship",
      "Unique design details",
      "Made with attention to detail",
      "Each piece has its own character"
    ],

    story:
      "This WOOD VIDA design celebrates creativity, material and craftsmanship.",

    care:
      "Clean gently with a soft, dry cloth. Avoid prolonged moisture.",

    shipping:
      "Shipping and delivery details will be confirmed after your enquiry.",

    warranty:
      "Warranty details will be confirmed with the final product specification.",

    model: ""
  };
}

/* ==========================================================
   PRODUCT IMAGES
   Every product has its own 5 image paths.

   Replace the image files in Assets/products/
   with your actual product photos.

   Keep the filenames and extensions the same,
   or update the paths here if you rename them.
========================================================== */

window.WV_PRODUCT_IMAGES = {

  /* ---------------- SIDE LAMPS 1-5 ---------------- */

  1: [
    "Assets/sidelamp1img1.png",
    "Assets/sidelamp1img2.png",
    "Assets/sidelamp1img3.png",
    "Assets/sidelamp1img4.png",
    "Assets/products/forest-glow-detail.jpg"
  ],

  2: [
    "Assets/sidelamp2img1.png",
    "Assets/sidelamp2img2.png",
    "Assets/sidelamp2img3.png",
    "Assets/sidelamp2img4.png",
    "Assets/products/amber-root-detail.jpg"
  ],

  3: [
    "Assets/sidelamp3img1.png",
    "Assets/sidelamp3img2.png",
    "Assets/sidelamp3img3.png",
    "Assets/sidelamp3img4.png",
    "Assets/products/timber-aura-detail.jpg"
  ],

  4: [
    "Assets/sidelamp4img1.png",
    "Assets/sidelamp4img2.png",
    "Assets/sidelamp4img3.png",
    "Assets/sidelamp4img4.png",
    "Assets/products/earthlight-detail.jpg"
  ],

  5: [
    "Assets/sidelamp5img1.png",
    "Assets/sidelamp5img2.png",
    "Assets/sidelamp5img3.png",
    "Assets/sidelamp5img4.png",
    "Assets/products/woodland-glow-detail.jpg"
  ],

  /* ---------------- SIDE LAMPS 6-10 ---------------- */

  16: [
    "Assets/products/golden-branch-main.jpg",
    "Assets/products/golden-branch-lifestyle.jpg",
    "Assets/products/golden-branch-side.jpg",
    "Assets/products/golden-branch-detail.jpg",
    "Assets/products/golden-branch-closeup.jpg"
  ],

  17: [
    "Assets/products/root-light-main.jpg",
    "Assets/products/root-light-lifestyle.jpg",
    "Assets/products/root-light-side.jpg",
    "Assets/products/root-light-detail.jpg",
    "Assets/products/root-light-closeup.jpg"
  ],

  18: [
    "Assets/products/nature-beam-main.jpg",
    "Assets/products/nature-beam-lifestyle.jpg",
    "Assets/products/nature-beam-side.jpg",
    "Assets/products/nature-beam-detail.jpg",
    "Assets/products/nature-beam-closeup.jpg"
  ],

  19: [
    "Assets/products/amber-forest-main.jpg",
    "Assets/products/amber-forest-lifestyle.jpg",
    "Assets/products/amber-forest-side.jpg",
    "Assets/products/amber-forest-detail.jpg",
    "Assets/products/amber-forest-closeup.jpg"
  ],

  20: [
    "Assets/products/wood-glow-main.jpg",
    "Assets/products/wood-glow-lifestyle.jpg",
    "Assets/products/wood-glow-side.jpg",
    "Assets/products/wood-glow-detail.jpg",
    "Assets/products/wood-glow-closeup.jpg"
  ],

  /* ---------------- WALL ART 1-5 ---------------- */

  6: [
    "Assets/wallart1img1.png",
    "Assets/wallart1img2.png",
    "Assets/wallart1img3.png",
    "Assets/wallart1img4.png",
    "Assets/products/earth-form-detail.jpg"
  ],

  7: [
    "Assets/wallart2img1.png",
    "Assets/wallart2img2.png",
    "Assets/wallart2img3.png",
    "Assets/wallart2img4.png",
    "Assets/products/root-canvas-detail.jpg"
  ],

  8: [
    "Assets/wallart3img1.png",
    "Assets/wallart3img2.png",
    "Assets/wallart3img3.png",
    "Assets/wallart3img4.png",
    "Assets/products/wild-grain-detail.jpg"
  ],

  9: [
    "Assets/wallart4img1.png",
    "Assets/wallart4img2.png",
    "Assets/wallart4img3.png",
    "Assets/wallart4img4.png",
    "Assets/products/nature-trace-detail.jpg"
  ],

  10: [
    "Assets/wallart5img1.png",
    "Assets/wallart5img2.png",
    "Assets/wallart5img3.png",
    "Assets/wallart5img4.png",
    "Assets/products/forest-imprint-detail.jpg"
  ],

  /* ---------------- WALL ART 6-10 ---------------- */

  21: [
    "Assets/products/wooden-rhythm-main.jpg",
    "Assets/products/wooden-rhythm-lifestyle.jpg",
    "Assets/products/wooden-rhythm-side.jpg",
    "Assets/products/wooden-rhythm-detail.jpg",
    "Assets/products/wooden-rhythm-closeup.jpg"
  ],

  22: [
    "Assets/products/nature-lines-main.jpg",
    "Assets/products/nature-lines-lifestyle.jpg",
    "Assets/products/nature-lines-side.jpg",
    "Assets/products/nature-lines-detail.jpg",
    "Assets/products/nature-lines-closeup.jpg"
  ],

  23: [
    "Assets/products/forest-pattern-main.jpg",
    "Assets/products/forest-pattern-lifestyle.jpg",
    "Assets/products/forest-pattern-side.jpg",
    "Assets/products/forest-pattern-detail.jpg",
    "Assets/products/forest-pattern-closeup.jpg"
  ],

  24: [
    "Assets/products/earth-sculpture-main.jpg",
    "Assets/products/earth-sculpture-lifestyle.jpg",
    "Assets/products/earth-sculpture-side.jpg",
    "Assets/products/earth-sculpture-detail.jpg",
    "Assets/products/earth-sculpture-closeup.jpg"
  ],

  25: [
    "Assets/products/timber-story-main.jpg",
    "Assets/products/timber-story-lifestyle.jpg",
    "Assets/products/timber-story-side.jpg",
    "Assets/products/timber-story-detail.jpg",
    "Assets/products/timber-story-closeup.jpg"
  ],

  /* ---------------- TABLES 1-5 ---------------- */

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
    "Assets/products/terra-table-detail.jpg"
  ],

  13: [
    "Assets/products/timber-nest-main.jpg",
    "Assets/products/timber-nest-lifestyle.jpg",
    "Assets/products/timber-nest-side.jpg",
    "Assets/products/timber-nest-detail.jpg",
    "Assets/products/timber-nest-closeup.jpg"
  ],

  14: [
    "Assets/products/forest-edge-main.jpg",
    "Assets/products/forest-edge-lifestyle.jpg",
    "Assets/products/forest-edge-side.jpg",
    "Assets/products/forest-edge-detail.jpg",
    "Assets/products/forest-edge-closeup.jpg"
  ],

  15: [
    "Assets/products/earthline-table-main.jpg",
    "Assets/products/earthline-table-lifestyle.jpg",
    "Assets/products/earthline-table-side.jpg",
    "Assets/products/earthline-table-detail.jpg",
    "Assets/products/earthline-table-closeup.jpg"
  ],

  /* ---------------- TABLES 6-10 ---------------- */

  26: [
    "Assets/products/branch-table-main.jpg",
    "Assets/products/branch-table-lifestyle.jpg",
    "Assets/products/branch-table-side.jpg",
    "Assets/products/branch-table-detail.jpg",
    "Assets/products/branch-table-closeup.jpg"
  ],

  27: [
    "Assets/products/golden-timber-main.jpg",
    "Assets/products/golden-timber-lifestyle.jpg",
    "Assets/products/golden-timber-side.jpg",
    "Assets/products/golden-timber-detail.jpg",
    "Assets/products/golden-timber-closeup.jpg"
  ],

  28: [
    "Assets/products/organic-nest-main.jpg",
    "Assets/products/organic-nest-lifestyle.jpg",
    "Assets/products/organic-nest-side.jpg",
    "Assets/products/organic-nest-detail.jpg",
    "Assets/products/organic-nest-closeup.jpg"
  ],

  29: [
    "Assets/products/root-harmony-main.jpg",
    "Assets/products/root-harmony-lifestyle.jpg",
    "Assets/products/root-harmony-side.jpg",
    "Assets/products/root-harmony-detail.jpg",
    "Assets/products/root-harmony-closeup.jpg"
  ],

  30: [
    "Assets/products/terra-roots-main.jpg",
    "Assets/products/terra-roots-lifestyle.jpg",
    "Assets/products/terra-roots-side.jpg",
    "Assets/products/terra-roots-detail.jpg",
    "Assets/products/terra-roots-closeup.jpg"
  ],

  /* ---------------- MIDO CREATIVITY 1-5 ---------------- */

  31: [
    "Assets/products/anatomy-art-main.jpg",
    "Assets/products/anatomy-art-lifestyle.jpg",
    "Assets/products/anatomy-art-side.jpg",
    "Assets/products/anatomy-art-detail.jpg",
    "Assets/products/anatomy-art-closeup.jpg"
  ],

  32: [
    "Assets/products/medical-forms-main.jpg",
    "Assets/products/medical-forms-lifestyle.jpg",
    "Assets/products/medical-forms-side.jpg",
    "Assets/products/medical-forms-detail.jpg",
    "Assets/products/medical-forms-closeup.jpg"
  ],

  33: [
    "Assets/products/life-structure-main.jpg",
    "Assets/products/life-structure-lifestyle.jpg",
    "Assets/products/life-structure-side.jpg",
    "Assets/products/life-structure-detail.jpg",
    "Assets/products/life-structure-closeup.jpg"
  ],

  34: [
    "Assets/products/human-canvas-main.jpg",
    "Assets/products/human-canvas-lifestyle.jpg",
    "Assets/products/human-canvas-side.jpg",
    "Assets/products/human-canvas-detail.jpg",
    "Assets/products/human-canvas-closeup.jpg"
  ],

  35: [
    "Assets/products/anatomy-study-main.jpg",
    "Assets/products/anatomy-study-lifestyle.jpg",
    "Assets/products/anatomy-study-side.jpg",
    "Assets/products/anatomy-study-detail.jpg",
    "Assets/products/anatomy-study-closeup.jpg"
  ],

  /* ---------------- MIDO CREATIVITY 6-10 ---------------- */

  36: [
    "Assets/products/creative-cells-main.jpg",
    "Assets/products/creative-cells-lifestyle.jpg",
    "Assets/products/creative-cells-side.jpg",
    "Assets/products/creative-cells-detail.jpg",
    "Assets/products/creative-cells-closeup.jpg"
  ],

  37: [
    "Assets/products/vital-forms-main.jpg",
    "Assets/products/vital-forms-lifestyle.jpg",
    "Assets/products/vital-forms-side.jpg",
    "Assets/products/vital-forms-detail.jpg",
    "Assets/products/vital-forms-closeup.jpg"
  ],

  38: [
    "Assets/products/anatomical-vision-main.jpg",
    "Assets/products/anatomical-vision-lifestyle.jpg",
    "Assets/products/anatomical-vision-side.jpg",
    "Assets/products/anatomical-vision-detail.jpg",
    "Assets/products/anatomical-vision-closeup.jpg"
  ],

  39: [
    "Assets/products/bio-art-main.jpg",
    "Assets/products/bio-art-lifestyle.jpg",
    "Assets/products/bio-art-side.jpg",
    "Assets/products/bio-art-detail.jpg",
    "Assets/products/bio-art-closeup.jpg"
  ],

  40: [
    "Assets/products/mido-signature-main.jpg",
    "Assets/products/mido-signature-lifestyle.jpg",
    "Assets/products/mido-signature-side.jpg",
    "Assets/products/mido-signature-detail.jpg",
    "Assets/products/mido-signature-closeup.jpg"
  ]

};

/* ==========================================================
   ALL 40 PRODUCT DETAILS
========================================================== */

const productData = [

  // SIDE LAMPS 1-5

  [1, "lamps", "Forest Glow", "side lamp 1",
    "A handcrafted wooden side lamp designed to bring warm ambience to your space.",
    {width:28,height:45,depth:28}, "Natural wood"],

  [2, "lamps", "Amber Root", "side lamp 2",
    "A nature-inspired side lamp celebrating the textures and tones of wood.",
    {width:25,height:40,depth:25}, "Natural wood"],

  [3, "lamps", "Timber Aura", "side lamp 3",
    "A distinctive wooden lamp for bedside tables and cosy reading corners.",
    {width:26,height:42,depth:26}, "Natural wood"],

  [4, "lamps", "Earthlight", "side lamp 4",
    "A sculptural side lamp inspired by organic forms and natural materials.",
    {width:30,height:46,depth:30}, "Natural wood"],

  [5, "lamps", "Woodland Glow", "side lamp 5",
    "A warm, nature-inspired lamp created for a calm interior.",
    {width:27,height:43,depth:27}, "Natural wood"],

  // SIDE LAMPS 6-10

  [16, "lamps", "Golden Branch", "side lamp 6",
    "A decorative wooden lamp with a warm natural character.",
    {width:28,height:44,depth:28}, "Natural wood"],

  [17, "lamps", "Root Light", "side lamp 7",
    "A sculptural lighting design inspired by tree roots.",
    {width:26,height:42,depth:26}, "Natural wood"],

  [18, "lamps", "Nature Beam", "side lamp 8",
    "A handcrafted accent lamp for thoughtful interiors.",
    {width:30,height:48,depth:30}, "Natural wood"],

  [19, "lamps", "Amber Forest", "side lamp 9",
    "A warm lighting piece with an organic design.",
    {width:25,height:40,depth:25}, "Natural wood"],

  [20, "lamps", "The Wood Glow", "side lamp 10",
    "A natural wooden lamp made for cosy spaces.",
    {width:29,height:45,depth:29}, "Natural wood"],

  // WALL ART 1-5

  [6, "wall-art", "Earth Form", "wall art 1",
    "Organic wooden wall art highlighting natural shapes.",
    {width:60,height:80,depth:6}, "Natural wood"],

  [7, "wall-art", "Root Canvas", "wall art 2",
    "A distinctive wood wall piece designed to add character.",
    {width:50,height:70,depth:5}, "Natural wood"],

  [8, "wall-art", "Wild Grain", "wall art 3",
    "A decorative wall piece inspired by natural wood grain.",
    {width:55,height:75,depth:5}, "Natural wood"],

  [9, "wall-art", "Nature Trace", "wall art 4",
    "Nature-inspired wooden wall decor.",
    {width:45,height:65,depth:5}, "Natural wood"],

  [10, "wall-art", "Forest Imprint", "wall art 5",
    "An organic decorative accent celebrating wood.",
    {width:60,height:60,depth:6}, "Natural wood"],

  // WALL ART 6-10

  [21, "wall-art", "Wooden Rhythm", "wall art 6",
    "An artistic wooden wall accent.",
    {width:55,height:70,depth:5}, "Natural wood"],

  [22, "wall-art", "Nature Lines", "wall art 7",
    "A nature-inspired decorative wall creation.",
    {width:50,height:65,depth:5}, "Natural wood"],

  [23, "wall-art", "Forest Pattern", "wall art 8",
    "A handcrafted wall piece with organic character.",
    {width:60,height:75,depth:6}, "Natural wood"],

  [24, "wall-art", "Earth Sculpture", "wall art 9",
    "A sculptural wooden decoration for modern interiors.",
    {width:45,height:60,depth:5}, "Natural wood"],

  [25, "wall-art", "Timber Story", "wall art 10",
    "A distinctive decorative creation made with natural materials.",
    {width:55,height:80,depth:6}, "Natural wood"],

  // TABLES 1-5

  [11, "tables", "Root Table", "table 1",
    "A sculptural wooden table bringing natural character into your living space.",
    {width:110,height:45,depth:60}, "Natural wood"],

  [12, "tables", "Terra Table", "table 2",
    "A nature-inspired table for warm interiors.",
    {width:100,height:45,depth:55}, "Natural wood"],

  [13, "tables", "Timber Nest", "table 3",
    "A functional wooden table with an organic design.",
    {width:90,height:42,depth:50}, "Natural wood"],

  [14, "tables", "Forest Edge", "table 4",
    "A distinctive table inspired by natural timber.",
    {width:120,height:46,depth:65}, "Natural wood"],

  [15, "tables", "Earthline Table", "table 5",
    "A natural wood table for thoughtful interiors.",
    {width:105,height:44,depth:58}, "Natural wood"],

  // TABLES 6-10

  [26, "tables", "Branch Table", "table 6",
    "A handcrafted table with natural branch-inspired details.",
    {width:95,height:43,depth:55}, "Natural wood"],

  [27, "tables", "Golden Timber", "table 7",
    "A warm wooden table for contemporary living spaces.",
    {width:105,height:45,depth:60}, "Natural wood"],

  [28, "tables", "Organic Nest", "table 8",
    "A sculptural accent table with an organic character.",
    {width:90,height:42,depth:50}, "Natural wood"],

  [29, "tables", "Root Harmony", "table 9",
    "A distinctive natural wood furniture piece.",
    {width:115,height:46,depth:65}, "Natural wood"],

  [30, "tables", "Terra Roots", "table 10",
    "A handcrafted table inspired by natural forms.",
    {width:100,height:44,depth:58}, "Natural wood"],

  // MIDO CREATIVITY 1-10

  [31, "mido-creativity", "Anatomy Art", "mido 1",
    "A creative decorative piece inspired by anatomical art.",
    {width:35,height:45,depth:8}, "Mixed materials"],

  [32, "mido-creativity", "Medical Forms", "mido 2",
    "A contemporary art concept inspired by medical creativity.",
    {width:40,height:50,depth:8}, "Mixed materials"],

  [33, "mido-creativity", "Life Structure", "mido 3",
    "An artistic interpretation of biological forms.",
    {width:35,height:45,depth:7}, "Mixed materials"],

  [34, "mido-creativity", "Human Canvas", "mido 4",
    "A creative art piece inspired by human anatomy.",
    {width:45,height:55,depth:8}, "Mixed materials"],

  [35, "mido-creativity", "The Anatomy Study", "mido 5",
    "A decorative concept combining art and anatomy.",
    {width:30,height:40,depth:7}, "Mixed materials"],

  [36, "mido-creativity", "Creative Cells", "mido 6",
    "An abstract decorative piece inspired by cellular forms.",
    {width:35,height:45,depth:6}, "Mixed materials"],

  [37, "mido-creativity", "Vital Forms", "mido 7",
    "A modern creative piece with a medical-inspired theme.",
    {width:40,height:50,depth:8}, "Mixed materials"],

  [38, "mido-creativity", "Anatomical Vision", "mido 8",
    "An artistic display piece inspired by anatomical structures.",
    {width:45,height:55,depth:7}, "Mixed materials"],

  [39, "mido-creativity", "Bio Art", "mido 9",
    "A contemporary decorative concept inspired by biology.",
    {width:30,height:40,depth:6}, "Mixed materials"],

  [40, "mido-creativity", "Mido Signature", "mido 10",
    "A signature creative design from Mido Creativity.",
    {width:40,height:50,depth:8}, "Mixed materials"]

];

/* ==========================================================
   LOAD PRODUCTS
========================================================== */

window.WV_PRODUCTS = productData.map(data =>
  wvMakeProduct(...data)
);

console.log(
  "WOOD VIDA products loaded:",
  window.WV_PRODUCTS.length
);
