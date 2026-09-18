export type JewelleryProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  purity: string;
  material: string;
  gemstone: string;
  weight: string;
  images: string[];
  description: string;
  featured: boolean;
  collectionName?: string;
  diamondCarat?: string;
  hallmark?: string;
  dimensions?: string;
};

// High-resolution photography backups that match the luxury fine jewellery aesthetic
export const FALLBACK_IMAGES: Record<string, string[]> = {
  "aurora-diamond-ring": [
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=90"
  ],
  "celeste-necklace": [
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=90"
  ],
  "elan-earrings": [
    "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=90"
  ],
  "heritage-bangle": [
    "https://images.unsplash.com/photo-1611591475152-4775d7139162?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&q=90"
  ],
  "noir-mens-chain": [
    "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1611591475152-4775d7139162?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=90"
  ],
  "maharani-bridal-set": [
    "https://images.unsplash.com/photo-1543290954-bc649dcab642?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&q=90"
  ]
};

export const products: JewelleryProduct[] = [
  {
    id: "aurora-diamond-ring",
    name: "Aurora Diamond Ring",
    category: "Rings",
    price: 84999,
    purity: "18K",
    material: "Yellow Gold",
    gemstone: "Natural Diamond",
    weight: "4.2 g",
    collectionName: "Aurora Edit",
    diamondCarat: "0.75 ct VVS-VS / E-F",
    hallmark: "BIS 750 Hallmark & IGI Certified",
    dimensions: "Band width: 2.1mm | Centre setting: 6.4mm",
    images: [
      "/jewellery-diamond-ring.jpg",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=90"
    ],
    description:
      "A timeless diamond ring designed around a brilliant centre stone and refined gold craftsmanship.",
    featured: true,
  },
  {
    id: "celeste-necklace",
    name: "Celeste Necklace",
    category: "Necklaces",
    price: 124999,
    purity: "18K",
    material: "Yellow Gold",
    gemstone: "Natural Diamond",
    weight: "8.6 g",
    collectionName: "Celeste Fine Line",
    diamondCarat: "1.10 ct Round Brilliant",
    hallmark: "BIS 750 Hallmark & SGL Certified",
    dimensions: "Adjustable chain length: 16 - 18 inches",
    images: [
      "/jewellery-necklace.jpg",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=90"
    ],
    description:
      "An elegant necklace combining delicate proportions with contemporary fine-jewellery design.",
    featured: true,
  },
  {
    id: "elan-earrings",
    name: "Élan Earrings",
    category: "Earrings",
    price: 64999,
    purity: "18K",
    material: "Yellow Gold",
    gemstone: "Natural Diamond",
    weight: "3.8 g",
    collectionName: "Élan Sculptural",
    diamondCarat: "0.52 ct Marquise & Round",
    hallmark: "BIS 750 Hallmarked Gold",
    dimensions: "Drop length: 26mm | Secure screw back",
    images: [
      "/jewellery-earrings.jpg",
      "/jewellery-earrings-2.jpg",
      "/jewellery-earrings-3.jpg",
    ],
    description:
      "Sculptural earrings designed to bring subtle brilliance to everyday and occasion wear.",
    featured: true,
  },
  {
    id: "heritage-bangle",
    name: "Heritage Bangle",
    category: "Bangles",
    price: 149999,
    purity: "22K",
    material: "Yellow Gold",
    gemstone: "Ruby",
    weight: "12.4 g",
    collectionName: "Heritage Royale",
    diamondCarat: "Burmese Pigeon Blood Ruby accents",
    hallmark: "BIS 916 Hallmark Standard",
    dimensions: "Inner diameter: 2.4 - 2.6 inches standard",
    images: [
      "/jewellery-bangle.jpg",
      "/jewellery-bangle-2.jpg",
      "/jewellery-bangle-3.jpg",
    ],
    description:
      "A modern interpretation of traditional Indian gold jewellery with rich detailing.",
    featured: false,
  },
  {
    id: "noir-mens-chain",
    name: "Noir Men's Chain",
    category: "Chains",
    price: 99999,
    purity: "22K",
    material: "Yellow Gold",
    gemstone: "None",
    weight: "15.2 g",
    collectionName: "Noir Men's Line",
    diamondCarat: "Solid 22K link craftsmanship",
    hallmark: "BIS 916 Hallmark Standard",
    dimensions: "Length: 22 inches | Thickness: 3.2mm",
    images: [
      "/jewellery-bracelet.jpg",
      "/jewellery-mens-chain-2.jpg",
      "/jewellery-mens-chain-3.jpg",
    ],
    description:
      "A bold gold chain with a clean silhouette designed for modern everyday wear.",
    featured: false,
  },
  {
    id: "maharani-bridal-set",
    name: "Maharani Bridal Set",
    category: "Bridal",
    price: 399999,
    purity: "22K",
    material: "Yellow Gold",
    gemstone: "Ruby & Emerald",
    weight: "48.5 g",
    collectionName: "Imperial Bridal Suite",
    diamondCarat: "Uncut Polki & Zambian Emeralds",
    hallmark: "BIS 916 Hallmark Certified",
    dimensions: "Choker, matching Jhumkas & Maang Tikka ensemble",
    images: [
      "/jewellery-maharani bridal.jpg",
      "https://images.unsplash.com/photo-1543290954-bc649dcab642?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=90"
    ],
    description:
      "A statement bridal ensemble inspired by the grandeur of Indian ceremonial jewellery.",
    featured: true,
  },
];

export const categories = [
  "All",
  "Rings",
  "Necklaces",
  "Earrings",
  "Bangles",
  "Chains",
  "Bridal",
  "Men",
];

// Helper to resolve an image URL with graceful online luxury fallback
export function getProductImage(product: JewelleryProduct, index: number = 0): string {
  const primary = product.images[index] || product.images[0];
  return primary;
}

export function getProductFallbackImage(productId: string, index: number = 0): string {
  const fallbacks = FALLBACK_IMAGES[productId] || [
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=90"
  ];
  return fallbacks[index % fallbacks.length];
}
