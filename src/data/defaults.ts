// Default content used by the site. The admin panel can override any of these
// via localStorage (see contentStore.ts). All consultation prices are now Ksh 195.

export interface ServicePlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  provider: "Clinician" | "Nutritionist" | "Clinician or Nutritionist";
  popular: boolean;
  serviceKey: string; // value used by BookingForm
}

export interface ServiceItem {
  /** Service key matches BookingForm value */
  value: string;
  label: string;
  fee: number;
  provider: "Clinician" | "Nutritionist";
  whatsapp: string;
}

export interface ShopProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  badge: string | null;
  description: string;
}

export type BlogStatus = "draft" | "scheduled" | "published";

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  metaKeywords?: string;
  /** ISO date (YYYY-MM-DD). For "scheduled" articles, this is the publish date. */
  publishedAt: string;
  content: string;
  /** Defaults to "published" when missing (back-compat). */
  status?: BlogStatus;
}

export interface CustomLocation {
  name: string;
  slug: string;
  region: string;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const slugifyName = slugify;

// ============= SERVICES =============

export const defaultServicePlans: ServicePlan[] = [
  {
    name: "General Consultation",
    price: 195,
    description: "Basic health consultation for common ailments and general medical advice",
    features: ["WhatsApp consultation", "Health assessment", "Treatment recommendations", "Follow-up advice"],
    provider: "Clinician or Nutritionist",
    popular: false,
    serviceKey: "dermatology",
  },
  {
    name: "Dermatology Consultation",
    price: 195,
    description: "Specialized skin assessment, diagnosis, and personalized treatment plan",
    features: ["Photo-based diagnosis", "Personalized treatment plan", "Medication recommendations", "Skin care routine advice", "Follow-up included"],
    provider: "Clinician",
    popular: true,
    serviceKey: "dermatology",
  },
  {
    name: "Reproductive Health",
    price: 195,
    description: "Confidential sexual and reproductive health consultation with complete privacy",
    features: ["Private consultation", "STI guidance", "Family planning advice", "Treatment recommendations", "Complete confidentiality"],
    provider: "Clinician",
    popular: false,
    serviceKey: "reproductive",
  },
  {
    name: "Dental Health",
    price: 195,
    description: "Expert dental consultation for bad breath, oral hygiene, and gum health",
    features: ["Bad breath assessment", "Oral hygiene guidance", "Gum care recommendations", "Treatment plan", "Follow-up advice"],
    provider: "Clinician",
    popular: false,
    serviceKey: "dental",
  },
  {
    name: "Mental Health Session",
    price: 195,
    description: "Professional counseling for stress, anxiety, depression, and emotional wellness",
    features: ["45-min session", "Stress & anxiety support", "Depression counseling", "Relationship guidance", "Coping strategies", "Follow-up scheduling"],
    provider: "Nutritionist",
    popular: true,
    serviceKey: "stress",
  },
  {
    name: "Nutrition Follow-up",
    price: 195,
    description: "Progress review and plan adjustments for existing nutrition clients",
    features: ["Progress review", "Plan adjustments", "Q&A session", "Ongoing support"],
    provider: "Nutritionist",
    popular: false,
    serviceKey: "meal-plans",
  },
];

export const defaultBookingServices: ServiceItem[] = [
  { value: "dermatology", label: "Dermatology Consultation", fee: 195, provider: "Clinician", whatsapp: "254790425578" },
  { value: "acne", label: "Acne & Skin Infections", fee: 195, provider: "Clinician", whatsapp: "254790425578" },
  { value: "fungal", label: "Fungal & Eczema Management", fee: 195, provider: "Clinician", whatsapp: "254790425578" },
  { value: "reproductive", label: "Reproductive Health", fee: 195, provider: "Clinician", whatsapp: "254790425578" },
  { value: "sexual-health", label: "Sexual Health & STIs", fee: 195, provider: "Clinician", whatsapp: "254790425578" },
  { value: "family-planning", label: "Family Planning Guidance", fee: 195, provider: "Clinician", whatsapp: "254790425578" },
  { value: "dental", label: "Dental Health & Bad Breath", fee: 195, provider: "Clinician", whatsapp: "254790425578" },
  { value: "baby-nutrition", label: "Babies & Children Nutrition", fee: 195, provider: "Nutritionist", whatsapp: "254769284070" },
  { value: "prenatal", label: "Pregnant & Breastfeeding Mothers", fee: 195, provider: "Nutritionist", whatsapp: "254769284070" },
  { value: "elderly-nutrition", label: "Elderly Nutrition", fee: 195, provider: "Nutritionist", whatsapp: "254769284070" },
  { value: "meal-plans", label: "Meal Plans & Diet Coaching", fee: 195, provider: "Nutritionist", whatsapp: "254769284070" },
  { value: "diabetes-nutrition", label: "Diabetes & Hypertension Nutrition", fee: 195, provider: "Nutritionist", whatsapp: "254769284070" },
  { value: "weight", label: "Weight Management", fee: 195, provider: "Nutritionist", whatsapp: "254769284070" },
  { value: "stress", label: "Stress & Anxiety Support", fee: 195, provider: "Nutritionist", whatsapp: "254769284070" },
  { value: "relationship", label: "Relationship Counseling", fee: 195, provider: "Nutritionist", whatsapp: "254769284070" },
  { value: "depression", label: "Depression Support", fee: 195, provider: "Nutritionist", whatsapp: "254769284070" },
];

// ============= SHOP PRODUCTS =============

export const defaultProducts: ShopProduct[] = [
  { id: 1, name: "Acne Treatment Complete Kit", category: "Skin Care", price: 2499, originalPrice: 3200, rating: 4.8, reviews: 45, image: "/images/products/skincare-kit.jpg", badge: "Best Seller", description: "Professional-grade acne treatment kit including a gentle foaming cleanser, salicylic acid toner, and benzoyl peroxide spot treatment. Formulated for all skin types to reduce breakouts and prevent scarring." },
  { id: 2, name: "Anti-Fungal Care Package", category: "Skin Care", price: 1899, originalPrice: 2400, rating: 4.7, reviews: 32, image: "/images/products/antifungal.jpg", badge: null, description: "Clinician-recommended antifungal treatment package for ringworm, athlete's foot, jock itch, and candida skin infections. Contains topical cream, medicated wash, and prevention guide." },
  { id: 3, name: "Eczema Relief Bundle", category: "Skin Care", price: 2199, originalPrice: null, rating: 4.9, reviews: 28, image: "/images/products/eczema-relief.jpg", badge: "New", description: "Soothing eczema care bundle with fragrance-free moisturizer, colloidal oatmeal cream, and barrier-repair lotion. Designed for sensitive, irritated, and eczema-prone skin." },
  { id: 4, name: "Prenatal Nutrition Pack", category: "Nutrition", price: 1899, originalPrice: null, rating: 4.9, reviews: 56, image: "/images/products/prenatal-nutrition.jpg", badge: "Doctor Recommended", description: "Essential prenatal multivitamins with folic acid, iron, calcium, and DHA omega-3. Nutritionist-formulated to support healthy fetal development and maternal wellness throughout pregnancy." },
  { id: 5, name: "Baby Weaning Starter Kit", category: "Nutrition", price: 1499, originalPrice: 1800, rating: 4.8, reviews: 41, image: "/images/products/baby-weaning.jpg", badge: null, description: "Complete baby weaning kit with age-appropriate feeding guides, nutrient-dense recipe cards, portion guides, and BPA-free feeding accessories for safe introduction to solid foods." },
  { id: 6, name: "Elderly Nutrition Support", category: "Nutrition", price: 1699, originalPrice: null, rating: 4.7, reviews: 23, image: "/images/products/elderly-nutrition.jpg", badge: null, description: "Specialized senior nutrition supplements with easy-to-digest calcium, vitamin D, B12, and fiber. Designed for age-related nutritional needs and chronic condition management." },
  { id: 7, name: "Diabetic-Friendly Meal Plan Guide", category: "Digital Products", price: 599, originalPrice: 999, rating: 4.9, reviews: 78, image: "/images/products/diabetic-guide.jpg", badge: "Digital", description: "Comprehensive 30-day meal plan PDF with 90+ blood-sugar-friendly recipes, grocery lists, glycemic index guide, and carb-counting tips. Created by a licensed nutritionist for type 1 & type 2 diabetics." },
  { id: 8, name: "Stress Relief Bundle", category: "Mental Wellness", price: 1599, originalPrice: 1999, rating: 4.7, reviews: 34, image: "/images/products/stress-relief.jpg", badge: "Popular", description: "Holistic stress relief bundle with premium calming herbal teas, aromatherapy essential oils, guided meditation booklet, and journaling prompts for daily mindfulness and anxiety management." },
  { id: 9, name: "Sleep & Relaxation Kit", category: "Mental Wellness", price: 1299, originalPrice: null, rating: 4.8, reviews: 29, image: "/images/products/sleep-kit.jpg", badge: null, description: "Natural sleep support kit with melatonin-free herbal supplements, lavender pillow spray, sleep hygiene guide, and relaxation techniques for insomnia and restless nights." },
  { id: 10, name: "Family Health Essentials Kit", category: "Doctor Kits", price: 3499, originalPrice: 4200, rating: 4.9, reviews: 67, image: "/images/products/family-health.jpg", badge: "Bundle & Save", description: "Complete family health essentials kit with digital thermometer, pulse oximeter, first aid supplies, basic wound care materials, and a home health reference guide." },
  { id: 11, name: "Weight Management Guide (PDF)", category: "Digital Products", price: 499, originalPrice: null, rating: 4.8, reviews: 92, image: "/images/products/weight-guide.jpg", badge: "Digital", description: "Science-backed weight management PDF with personalized calorie calculator, 60+ healthy recipes, workout plans, portion control strategies, and progress tracking templates." },
  { id: 12, name: "Postpartum Recovery Kit", category: "Nutrition", price: 2299, originalPrice: 2800, rating: 4.9, reviews: 45, image: "/images/products/postpartum.jpg", badge: "Recommended", description: "Nutritionist-curated postpartum recovery kit with iron-rich supplements, lactation support teas, postnatal vitamins, and a recovery nutrition guide for new mothers." },
  { id: 13, name: "Dental & Oral Hygiene Kit", category: "Dental Care", price: 1299, originalPrice: 1699, rating: 4.8, reviews: 38, image: "/images/products/dental-care.jpg", badge: "New", description: "Complete oral care kit for combating bad breath (halitosis), gum disease, and cavity prevention. Includes antibacterial mouthwash, tongue scraper, therapeutic toothpaste, and an oral health guide." },
];

export const defaultProductCategories = [
  "Skin Care",
  "Nutrition",
  "Mental Wellness",
  "Dental Care",
  "Doctor Kits",
  "Digital Products",
];

// ============= BLOG =============

export const defaultBlogArticles: BlogArticle[] = [
  {
    slug: "understanding-acne-causes-treatment",
    title: "Understanding Acne: Causes, Types & Effective Treatment in Kenya",
    excerpt: "Acne is the most common skin condition in Kenya. Learn what causes it, the different types, and clinically proven treatments to get clear skin fast.",
    coverImage: "/images/products/skincare-kit.jpg",
    author: "Lewis Muli Keli",
    category: "Dermatology",
    tags: ["acne", "skin care", "dermatology"],
    metaKeywords: "acne treatment Kenya, skin care, dermatology consultation",
    publishedAt: "2026-03-25",
    content: `Acne affects millions of Kenyans, from teenagers to adults in their 40s. It's caused by clogged pores, excess oil production, bacteria, and hormonal changes.\n\n## Types of Acne\n\nThere are several types: whiteheads, blackheads, papules, pustules, nodules, and cystic acne. Each requires a different treatment approach.\n\n## Treatment Options\n\nMild acne responds well to over-the-counter products containing salicylic acid or benzoyl peroxide. Moderate to severe acne may require prescription medications like retinoids or antibiotics.\n\n## When to See a Clinician\n\nIf over-the-counter treatments haven't worked after 8 weeks, or if you have painful cystic acne, consult a healthcare professional. At BeHealth Kenya, our Clinician can assess your skin condition via WhatsApp and recommend the right treatment plan.\n\n## Prevention Tips\n\nWash your face twice daily, avoid touching your face, change pillowcases weekly, stay hydrated, and maintain a balanced diet low in processed sugars.`,
  },
  {
    slug: "bad-breath-halitosis-causes-solutions",
    title: "Bad Breath (Halitosis): Common Causes & Solutions That Actually Work",
    excerpt: "Struggling with bad breath? Discover the medical causes of halitosis and proven solutions to freshen your breath permanently – not just temporarily.",
    coverImage: "/images/products/dental-care.jpg",
    author: "Lewis Muli Keli",
    category: "Dental Health",
    tags: ["bad breath", "halitosis", "dental care", "oral hygiene"],
    metaKeywords: "bad breath, halitosis, dental health Kenya, oral hygiene",
    publishedAt: "2026-03-18",
    content: `Bad breath, medically known as halitosis, affects an estimated 25-30% of people worldwide. In Kenya, it's one of the most common but least discussed health concerns.\n\n## Common Causes\n\nPoor oral hygiene is the leading cause. Bacteria on the tongue, between teeth, and along the gum line break down food particles and release foul-smelling sulfur compounds.\n\n## Medical Causes\n\nGastric reflux (GERD), tonsil stones, dry mouth, sinus infections, diabetes, and liver or kidney problems can all cause persistent bad breath.\n\n## Effective Solutions\n\n1. Brush twice daily and floss once daily\n2. Clean your tongue with a tongue scraper\n3. Use antibacterial mouthwash\n4. Stay hydrated throughout the day\n5. Visit a dental professional for deep cleaning\n\n## Our Dental Kit\n\nOur Dental & Oral Hygiene Kit includes everything you need: antibacterial mouthwash, tongue scraper, therapeutic toothpaste, and a comprehensive oral health guide.`,
  },
  {
    slug: "pregnancy-nutrition-guide-kenya",
    title: "Essential Pregnancy Nutrition: A Complete Guide for Kenyan Mothers",
    excerpt: "What to eat during pregnancy matters. This comprehensive guide covers the essential nutrients, meal plans, and supplements every expectant Kenyan mother needs.",
    coverImage: "/images/products/prenatal-nutrition.jpg",
    author: "Faith Mukai Masila",
    category: "Nutrition",
    tags: ["pregnancy", "nutrition", "prenatal", "maternal health"],
    metaKeywords: "pregnancy nutrition Kenya, prenatal vitamins, maternal health",
    publishedAt: "2026-03-10",
    content: `Proper nutrition during pregnancy is critical for both the mother's health and the baby's development.\n\n## Key Nutrients\n\nFolic acid prevents neural tube defects. Iron supports increased blood volume. Calcium builds the baby's bones and teeth.\n\n## Foods to Include\n\nLeafy greens, lean proteins, whole grains, fruits, dairy products, and legumes.\n\n## Our Prenatal Pack\n\nOur Prenatal Nutrition Pack contains all the essential vitamins and minerals recommended by nutritionists.`,
  },
  {
    slug: "managing-stress-anxiety-kenya",
    title: "Managing Stress & Anxiety: Practical Mental Health Tips for Kenyans",
    excerpt: "Mental health matters. Learn practical, culturally relevant strategies to manage stress and anxiety in your daily life as a Kenyan.",
    coverImage: "/images/products/stress-relief.jpg",
    author: "Faith Mukai Masila",
    category: "Mental Health",
    tags: ["mental health", "stress", "anxiety", "wellness"],
    metaKeywords: "mental health Kenya, stress management, anxiety support",
    publishedAt: "2026-03-02",
    content: `Mental health challenges are increasingly common in Kenya.\n\n## Practical Strategies\n\nDeep breathing, regular physical activity, journaling, social connection, and limiting news consumption.\n\n## Confidential Support\n\nAt BeHealth Kenya, our Nutritionist provides confidential mental health counseling via WhatsApp.`,
  },
  {
    slug: "diabetes-diet-management-tips",
    title: "Diabetes Diet Management: What Every Kenyan Diabetic Should Know",
    excerpt: "Living with diabetes? Learn how to manage blood sugar levels through proper diet, meal timing, and smart food choices tailored for the Kenyan lifestyle.",
    coverImage: "/images/products/diabetic-guide.jpg",
    author: "Faith Mukai Masila",
    category: "Nutrition",
    tags: ["diabetes", "diet", "nutrition", "chronic illness"],
    metaKeywords: "diabetes Kenya, diabetic meal plan, blood sugar management",
    publishedAt: "2026-02-20",
    content: `Diabetes is one of the fastest-growing chronic conditions in Kenya. Proper diet management is the cornerstone of controlling blood sugar levels.\n\n## Get Our Guide\n\nOur Diabetic-Friendly Meal Plan Guide contains 90+ recipes specifically designed for Kenyan diabetics.`,
  },
  {
    slug: "baby-weaning-guide-first-foods",
    title: "Baby Weaning Guide: Introducing First Foods Safely to Your Baby",
    excerpt: "When and how to start weaning your baby? This evidence-based guide covers the right age, best first foods, and common mistakes to avoid.",
    coverImage: "/images/products/baby-weaning.jpg",
    author: "Faith Mukai Masila",
    category: "Nutrition",
    tags: ["baby", "weaning", "infant nutrition", "parenting"],
    metaKeywords: "baby weaning Kenya, infant nutrition, first foods",
    publishedAt: "2026-02-10",
    content: `The World Health Organization recommends exclusive breastfeeding for the first 6 months.\n\n## Best First Foods\n\nStart with single-ingredient purees: sweet potato, avocado, banana, pumpkin, or well-cooked and mashed beans.\n\n## Our Weaning Kit\n\nOur Baby Weaning Starter Kit includes age-appropriate feeding guides and recipe cards.`,
  },
];
