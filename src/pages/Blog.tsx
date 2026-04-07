import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { Calendar, ArrowRight, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  content: string;
}

const blogPosts: BlogPost[] = [
   {
    slug: "acne-treatment-kenya-causes-solutions",
    title: "Acne Treatment in Kenya: The Clinician’s Guide to Clear Skin",
    excerpt: "Struggling with breakouts? From Nairobi's dust to hormonal shifts, discover why acne is common in Kenya and the clinically proven treatments to fix it.",
    coverImage: "/images/products/skincare-kit.jpg",
    author: "Lewis Muli Keli",
    category: "Dermatology",
    tags: ["Acne Kenya", "Skincare Routine", "Clinical Dermatology", "Nairobi Health"],
    publishedAt: "2026-04-08",
    content: `
Acne is the most treated skin condition in Kenya, affecting everyone from teenagers to adults in their 40s. While global advice is everywhere, Kenyan skin faces unique challenges—including high UV exposure, urban pollution in cities like Nairobi, and the prevalence of post-acne dark spots.

As a clinician, I see many patients who have damaged their skin barrier with harsh "bleaching" soaps or DIY remedies. This guide breaks down what actually works for our climate and skin types.

## Why is Acne So Common in Kenya?

Beyond genetics, several local factors trigger breakouts:
* **Environmental Pollution:** Dust and exhaust fumes in urban areas clog pores.
* **The Equatorial Sun:** High UV levels can darken acne scars, leading to persistent "dark spots" or Hyperpigmentation.
* **Hard Water:** In many parts of Kenya, high mineral content in water can irritate the skin barrier.
* **Dietary Triggers:** High-glycemic diets (excessive sugar and refined starches) can fuel inflammation.

## Types of Acne and How to Identify Them


[Image of the different types of acne: blackheads, whiteheads, papules, pustules, nodules, and cysts]


Understanding your type is the first step to the right treatment:
1.  **Comedonal (Blackheads/Whiteheads):** Non-inflammatory, caused by clogged pores.
2.  **Inflammatory (Papules/Pustules):** Red, painful bumps often containing pus.
3.  **Cystic Acne:** Deep, painful "lumps" under the skin that carry a high risk of scarring.

## Clinically Proven Treatment Options in Kenya
Treatment depends on severity. Here is what I typically recommend:

### Mild Acne
Focus on over-the-counter (OTC) actives available in local pharmacies:
* **Salicylic Acid:** Great for oily skin and blackheads (e.g., CeraVe or Neutrogena washes).
* **Benzoyl Peroxide:** Kills acne-causing bacteria (e.g., Brevoxyl or Panoxyl).

### Moderate to Severe Acne
This requires clinical intervention. Options include:
* **Topical Retinoids:** (e.g., Adapalene/Differin) to speed up cell turnover.
* **Azelaic Acid:** Excellent for Kenyan skin as it treats both acne and the dark spots (PIH) left behind.
* **Oral Antibiotics:** To reduce deep-seated inflammation.

## The "BeHealth" Daily Routine for Kenyan Skin
1.  **Cleanse:** Use a gentle, pH-balanced cleanser twice daily to remove Nairobi dust.
2.  **Treat:** Apply your prescribed active (Retinoid or Salicylic acid) at night.
3.  **Moisturize:** Never skip this! Use a "non-comedogenic" moisturizer to keep the skin barrier strong.
4.  **Protect:** **Essential.** Apply SPF 30+ every morning. Without sunscreen, your acne marks will turn into permanent dark spots.

## Frequently Asked Questions (FAQ)

**Q: Does eating chocolate or "chips" cause acne?**
A: Not directly, but high-sugar diets spike insulin, which can increase oil production. A balanced diet helps manage flare-ups.

**Q: How long does it take to see results?**
A: Skin cells take about 28 days to renew. You must stick to a routine for at least 6–8 weeks before seeing significant change.

**Q: Can I use "Mekako" or other lightening soaps for acne?**
A: **No.** Many of these contain harsh chemicals or steroids that thin the skin and lead to "rebound acne" and permanent damage.

## When to See a Professional
If your acne is painful, causing scars, or affecting your confidence, it's time for a clinical assessment. 

**Ready for clear skin?**
At **BeHealth Kenya**, I provide personalized skin consultations via WhatsApp. We analyze your skin type and recommend a routine using products available right here in Kenya.

[Book Your Skin Consultation via WhatsApp]
    `
},
  {
    slug: "bad-breath-halitosis-causes-solutions",
    title: "Bad Breath (Halitosis): Common Causes & Solutions That Actually Work",
    excerpt: "Struggling with bad breath? Discover the medical causes of halitosis and proven solutions to freshen your breath permanently – not just temporarily.",
    coverImage: "/images/products/dental-care.jpg",
    author: "Lewis Muli Keli",
    category: "Dental Health",
    tags: ["bad breath", "halitosis", "dental care", "oral hygiene"],
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
    publishedAt: "2026-03-10",
    content: `Proper nutrition during pregnancy is critical for both the mother's health and the baby's development. Many Kenyan women don't get adequate nutrients during this crucial period.\n\n## Key Nutrients\n\nFolic acid prevents neural tube defects and should be taken from conception through the first trimester. Iron supports increased blood volume and prevents anemia. Calcium builds the baby's bones and teeth.\n\n## Foods to Include\n\nLeafy greens (sukuma wiki, spinach), lean proteins, whole grains, fruits, dairy products, and legumes should form the foundation of a pregnancy diet.\n\n## Foods to Avoid\n\nRaw or undercooked meats, unpasteurized dairy, excessive caffeine, alcohol, and high-mercury fish should be avoided during pregnancy.\n\n## Meal Plan Tips\n\nEat small, frequent meals to manage nausea. Include a protein source at every meal. Stay hydrated with at least 8 glasses of water daily.\n\n## Our Prenatal Pack\n\nOur Prenatal Nutrition Pack contains all the essential vitamins and minerals recommended by nutritionists for a healthy pregnancy.`,
  },
  {
    slug: "managing-stress-anxiety-kenya",
    title: "Managing Stress & Anxiety: Practical Mental Health Tips for Kenyans",
    excerpt: "Mental health matters. Learn practical, culturally relevant strategies to manage stress and anxiety in your daily life as a Kenyan.",
    coverImage: "/images/products/stress-relief.jpg",
    author: "Faith Mukai Masila",
    category: "Mental Health",
    tags: ["mental health", "stress", "anxiety", "wellness"],
    publishedAt: "2026-03-02",
    content: `Mental health challenges are increasingly common in Kenya, yet remain heavily stigmatized. Stress and anxiety affect work performance, relationships, and physical health.\n\n## Recognizing the Signs\n\nPersistent worry, difficulty sleeping, irritability, difficulty concentrating, physical tension, and changes in appetite are all signs of excessive stress or anxiety.\n\n## Practical Strategies\n\n1. Deep breathing exercises – 5 minutes daily can significantly reduce cortisol levels\n2. Regular physical activity – even a 30-minute walk helps\n3. Journaling – writing down worries helps process them\n4. Social connection – talk to trusted friends or family\n5. Limiting news and social media consumption\n\n## When to Seek Professional Help\n\nIf stress or anxiety is interfering with your daily life, relationships, or work for more than two weeks, consider speaking with a mental health professional.\n\n## Confidential Support\n\nAt BeHealth Kenya, Faith provides confidential mental health counseling via WhatsApp. No judgment, no stigma – just professional support when you need it.`,
  },
  {
    slug: "diabetes-diet-management-tips",
    title: "Diabetes Diet Management: What Every Kenyan Diabetic Should Know",
    excerpt: "Living with diabetes? Learn how to manage blood sugar levels through proper diet, meal timing, and smart food choices tailored for the Kenyan lifestyle.",
    coverImage: "/images/products/diabetic-guide.jpg",
    author: "Faith Mukai Masila",
    category: "Nutrition",
    tags: ["diabetes", "diet", "nutrition", "chronic illness"],
    publishedAt: "2026-02-20",
    content: `Diabetes is one of the fastest-growing chronic conditions in Kenya. Proper diet management is the cornerstone of controlling blood sugar levels and preventing complications.\n\n## Understanding Glycemic Index\n\nFoods with a low glycemic index (GI) release sugar slowly into the bloodstream, preventing spikes. Choose brown rice over white, sweet potatoes over regular potatoes, and whole grain ugali.\n\n## Portion Control\n\nUse the plate method: half your plate with non-starchy vegetables, a quarter with lean protein, and a quarter with whole grains or starchy foods.\n\n## Meal Timing\n\nEat at regular intervals – every 3-4 hours. Skipping meals can cause dangerous blood sugar drops, while overeating causes spikes.\n\n## Kenyan-Friendly Meals\n\nGitheri with vegetables, grilled fish with steamed greens, bean stew with brown chapati, and fruit salads (avoiding very sweet fruits) are excellent diabetic-friendly meals.\n\n## Get Our Guide\n\nOur Diabetic-Friendly Meal Plan Guide contains 90+ recipes specifically designed for Kenyan diabetics with grocery lists and carb-counting tips.`,
  },
  {
    slug: "baby-weaning-guide-first-foods",
    title: "Baby Weaning Guide: Introducing First Foods Safely to Your Baby",
    excerpt: "When and how to start weaning your baby? This evidence-based guide covers the right age, best first foods, allergen introduction, and common mistakes to avoid.",
    coverImage: "/images/products/baby-weaning.jpg",
    author: "Faith Mukai Masila",
    category: "Nutrition",
    tags: ["baby", "weaning", "infant nutrition", "parenting"],
    publishedAt: "2026-02-10",
    content: `The World Health Organization recommends exclusive breastfeeding for the first 6 months, followed by the gradual introduction of solid foods alongside continued breastfeeding.\n\n## Signs of Readiness\n\nYour baby is ready for solids when they can sit upright with support, have good head control, show interest in food, and have lost the tongue-thrust reflex.\n\n## Best First Foods\n\nStart with single-ingredient purees: sweet potato, avocado, banana, pumpkin, or well-cooked and mashed beans. Introduce one new food every 3 days to monitor for allergies.\n\n## Allergen Introduction\n\nResearch shows early introduction of common allergens (eggs, peanuts, dairy) between 6-12 months may actually reduce allergy risk. Always introduce in small amounts.\n\n## Common Mistakes\n\nAdding salt or sugar to baby food, starting too early (before 4 months), force-feeding, and not offering enough variety are common weaning mistakes.\n\n## Our Weaning Kit\n\nOur Baby Weaning Starter Kit includes age-appropriate feeding guides, nutrient-dense recipe cards, portion guides, and BPA-free feeding accessories.`,
  },
];

const blogCategories = ["All", "Dermatology", "Dental Health", "Nutrition", "Mental Health"];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-sky py-14 md:py-20">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Health Blog</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Health & Wellness Blog</h1>
            <p className="text-muted-foreground max-w-2xl">
              Expert health tips, nutrition advice, and wellness insights from our licensed healthcare professionals.
            </p>
          </div>
        </section>

        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Blog Posts */}
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="group block">
                  <article className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-48 md:h-56 object-cover"
                      loading="lazy"
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        <span className="text-primary font-semibold">{post.category}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.publishedAt).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1.5">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                          Read more <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export { blogPosts };
export default Blog;
