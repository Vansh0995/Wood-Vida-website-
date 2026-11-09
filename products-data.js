
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
    "Assets/products/sidelamp1img1.png",
    "Assets/products/sidelamp1img2.png",
    "Assets/products/sidelamp1img3.png",
    "Assets/products/sidelamp1img4.png",
    "Assets/products/coming-soon.png"
  ],

  2: [
    "Assets/products/sidelamp2img1.png",
    "Assets/products/sidelamp2img2.png",
    "Assets/products/sidelamp2img3.png",
    "Assets/products/sidelamp2img4.png",
    "Assets/products/coming-soon.png"
  ],

  3: [
    "Assets/products/sidelamp3img1.png",
    "Assets/products/sidelamp3img2.png",
    "Assets/products/sidelamp3img3.png",
    "Assets/products/sidelamp3img4.png",
    "Assets/products/coming-soon.png"
  ],

  4: [
    "Assets/products/sidelamp4img1.png",
    "Assets/products/sidelamp4img2.png",
    "Assets/products/sidelamp4img3.png",
    "Assets/products/sidelamp4img4.png",
    "Assets/products/coming-soon.png"
  ],

  5: [
    "Assets/products/sidelamp5img1.png",
    "Assets/products/sidelamp5img2.png",
    "Assets/products/sidelamp5img3.png",
    "Assets/products/sidelamp5img4.png",
    "Assets/products/sidelamp5img5.png"
  ],

  /* ---------------- SIDE LAMPS 6-10 ---------------- */

  16: [
    "Assets/products/sidelamp6img1.png",
    "Assets/products/sidelamp6img2.png",
    "Assets/products/sidelamp6img3.png",
    "Assets/products/sidelamp6img4.png",
    "Assets/products/coming-soon.png"
  ],

  17: [
    "Assets/products/sidelamp7img1.png",
    "Assets/products/sidelamp7img2.png",
    "Assets/products/sidelamp7img3.png",
    "Assets/products/sidelamp7img4.png",
    "Assets/products/sidelamp7img5.png"
  ],

  18: [
    "Assets/products/sidelamp8img1.png",
    "Assets/products/sidelamp8img2.png",
    "Assets/products/sidelamp8img3.png",
    "Assets/products/sidelamp8img4.png",
    "Assets/products/sidelamp8img5.png"
  ],

  19: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  20: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  /* ---------------- WALL ART 1-5 ---------------- */

  6: [
    "Assets/products/wallart1img1.png",
    "Assets/products/wallart1img2.png",
    "Assets/products/wallart1img3.png",
    "Assets/products/wallart1img4.png",
    "Assets/products/coming-soon.png"
  ],

  7: [
    "Assets/products/wallart2img1.png",
    "Assets/products/wallart2img2.png",
    "Assets/products/wallart2img3.png",
    "Assets/products/wallart2img4.png",
    "Assets/products/coming-soon.png"
  ],

  8: [
    "Assets/products/wallart3img1.png",
    "Assets/products/wallart3img2.png",
    "Assets/products/wallart3img3.png",
    "Assets/products/wallart3img4.png",
    "Assets/products/coming-soon.png"
  ],

  9: [
    "Assets/products/wallart4img1.png",
    "Assets/products/wallart4img2.png",
    "Assets/products/wallart4img3.png",
    "Assets/products/wallart4img4.png",
    "Assets/products/coming-soon.png"
  ],

  10: [
    "Assets/products/wallart5img1.png",
    "Assets/products/wallart5img2.png",
    "Assets/products/wallart5img3.png",
    "Assets/products/wallart5img4.png",
    "Assets/products/coming-soon.png"
  ],

  /* ---------------- WALL ART 6-10 ---------------- */

  21: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  22: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  23: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  24: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  25: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  /* ---------------- TABLES 1-5 ---------------- */

  11: [
    "Assets/products/table1img1.png",
    "Assets/products/table1img2.png",
    "Assets/products/table1img3.png",
    "Assets/products/table1img4.png",
    "Assets/products/table1img5.png"
  ],

  12: [
    "Assets/products/table2img1.png",
    "Assets/products/table2img2.png",
    "Assets/products/table2img3.png",
    "Assets/products/table2img4.png",
    "Assets/products/table2img5.png"
  ],

  13: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  14: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  15: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  /* ---------------- TABLES 6-10 ---------------- */

  26: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  27: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  28: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  28: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  29: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  30: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  /* ---------------- MIDO CREATIVITY 1-5 ---------------- */

  31: [
    "Assets/products/medo1img1.png",
    "Assets/products/medo1img2.png",
    "Assets/products/medo1img3.png",
    "Assets/products/medo1img4.png",
    "Assets/products/medo1img5.png"
  ],

  32: [
    "Assets/products/medo2img1.png",
    "Assets/products/medo2img2.png",
    "Assets/products/medo2img3.png",
    "Assets/products/medo2img4.png",
    "Assets/products/medo2img5.png"
  ],

  33: [
    "Assets/products/medo3img1.png",
    "Assets/products/medo3img2.png",
    "Assets/products/medo3img3.png",
    "Assets/products/medo3img4.png",
    "Assets/products/medo3img5.png"
  ],

  34: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  35: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  /* ---------------- MIDO CREATIVITY 6-10 ---------------- */

  36: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  37: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  38: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  39: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
  ],

  40: [
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png",
    "Assets/products/coming-soon.png"
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
