import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, Filter, Phone } from "lucide-react";

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Skin Care",
    "Nutrition",
    "Mental Wellness",
    "Dental Care",
    "Doctor Kits",
    "Digital Products",
  ];

  const products = [
    {
      id: 1,
      name: "Acne Treatment Complete Kit",
      category: "Skin Care",
      price: 2499,
      originalPrice: 3200,
      rating: 4.8,
      reviews: 45,
      image: "/images/products/skincare-kit.jpg",
      badge: "Best Seller",
      description: "Professional-grade acne treatment kit including a gentle foaming cleanser, salicylic acid toner, and benzoyl peroxide spot treatment. Formulated for all skin types to reduce breakouts and prevent scarring.",
    },
    {
      id: 2,
      name: "Anti-Fungal Care Package",
      category: "Skin Care",
      price: 1899,
      originalPrice: 2400,
      rating: 4.7,
      reviews: 32,
      image: "/images/products/antifungal.jpg",
      badge: null,
      description: "Clinician-recommended antifungal treatment package for ringworm, athlete's foot, jock itch, and candida skin infections. Contains topical cream, medicated wash, and prevention guide.",
    },
    {
      id: 3,
      name: "Eczema Relief Bundle",
      category: "Skin Care",
      price: 2199,
      originalPrice: null,
      rating: 4.9,
      reviews: 28,
      image: "/images/products/eczema-relief.jpg",
      badge: "New",
      description: "Soothing eczema care bundle with fragrance-free moisturizer, colloidal oatmeal cream, and barrier-repair lotion. Designed for sensitive, irritated, and eczema-prone skin.",
    },
    {
      id: 4,
      name: "Prenatal Nutrition Pack",
      category: "Nutrition",
      price: 1899,
      originalPrice: null,
      rating: 4.9,
      reviews: 56,
      image: "/images/products/prenatal-nutrition.jpg",
      badge: "Doctor Recommended",
      description: "Essential prenatal multivitamins with folic acid, iron, calcium, and DHA omega-3. Nutritionist-formulated to support healthy fetal development and maternal wellness throughout pregnancy.",
    },
    {
      id: 5,
      name: "Baby Weaning Starter Kit",
      category: "Nutrition",
      price: 1499,
      originalPrice: 1800,
      rating: 4.8,
      reviews: 41,
      image: "/images/products/baby-weaning.jpg",
      badge: null,
      description: "Complete baby weaning kit with age-appropriate feeding guides, nutrient-dense recipe cards, portion guides, and BPA-free feeding accessories for safe introduction to solid foods.",
    },
    {
      id: 6,
      name: "Elderly Nutrition Support",
      category: "Nutrition",
      price: 1699,
      originalPrice: null,
      rating: 4.7,
      reviews: 23,
      image: "/images/products/elderly-nutrition.jpg",
      badge: null,
      description: "Specialized senior nutrition supplements with easy-to-digest calcium, vitamin D, B12, and fiber. Designed for age-related nutritional needs and chronic condition management.",
    },
    {
      id: 7,
      name: "Diabetic-Friendly Meal Plan Guide",
      category: "Digital Products",
      price: 599,
      originalPrice: 999,
      rating: 4.9,
      reviews: 78,
      image: "/images/products/diabetic-guide.jpg",
      badge: "Digital",
      description: "Comprehensive 30-day meal plan PDF with 90+ blood-sugar-friendly recipes, grocery lists, glycemic index guide, and carb-counting tips. Created by a licensed nutritionist for type 1 & type 2 diabetics.",
    },
    {
      id: 8,
      name: "Stress Relief Bundle",
      category: "Mental Wellness",
      price: 1599,
      originalPrice: 1999,
      rating: 4.7,
      reviews: 34,
      image: "/images/products/stress-relief.jpg",
      badge: "Popular",
      description: "Holistic stress relief bundle with premium calming herbal teas, aromatherapy essential oils, guided meditation booklet, and journaling prompts for daily mindfulness and anxiety management.",
    },
    {
      id: 9,
      name: "Sleep & Relaxation Kit",
      category: "Mental Wellness",
      price: 1299,
      originalPrice: null,
      rating: 4.8,
      reviews: 29,
      image: "/images/products/sleep-kit.jpg",
      badge: null,
      description: "Natural sleep support kit with melatonin-free herbal supplements, lavender pillow spray, sleep hygiene guide, and relaxation techniques for insomnia and restless nights.",
    },
    {
      id: 10,
      name: "Family Health Essentials Kit",
      category: "Doctor Kits",
      price: 3499,
      originalPrice: 4200,
      rating: 4.9,
      reviews: 67,
      image: "/images/products/family-health.jpg",
      badge: "Bundle & Save",
      description: "Complete family health essentials kit with digital thermometer, pulse oximeter, first aid supplies, basic wound care materials, and a home health reference guide.",
    },
    {
      id: 11,
      name: "Weight Management Guide (PDF)",
      category: "Digital Products",
      price: 499,
      originalPrice: null,
      rating: 4.8,
      reviews: 92,
      image: "/images/products/weight-guide.jpg",
      badge: "Digital",
      description: "Science-backed weight management PDF with personalized calorie calculator, 60+ healthy recipes, workout plans, portion control strategies, and progress tracking templates.",
    },
    {
      id: 12,
      name: "Postpartum Recovery Kit",
      category: "Nutrition",
      price: 2299,
      originalPrice: 2800,
      rating: 4.9,
      reviews: 45,
      image: "/images/products/postpartum.jpg",
      badge: "Recommended",
      description: "Nutritionist-curated postpartum recovery kit with iron-rich supplements, lactation support teas, postnatal vitamins, and a recovery nutrition guide for new mothers.",
    },
    {
      id: 13,
      name: "Dental & Oral Hygiene Kit",
      category: "Dental Care",
      price: 1299,
      originalPrice: 1699,
      rating: 4.8,
      reviews: 38,
      image: "/images/products/dental-care.jpg",
      badge: "New",
      description: "Complete oral care kit for combating bad breath (halitosis), gum disease, and cavity prevention. Includes antibacterial mouthwash, tongue scraper, therapeutic toothpaste, and an oral health guide.",
    },
  ];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const getWhatsAppLink = (productName: string) => {
    return `https://wa.me/254769284070?text=${encodeURIComponent(`Hi Faith, I'm interested in ordering the ${productName}`)}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-sky py-20 md:py-28">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block text-primary font-semibold text-xs uppercase tracking-widest mb-3">
              Wellness Shop
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Quality Health & Wellness Products
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Doctor-recommended skin care, nutrition supplements, dental care, and mental wellness products delivered across Kenya. All orders managed by Dr. Faith.
            </p>
            <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border">
              <Phone className="w-4 h-4 text-green" />
              <span className="text-sm text-foreground">Order via WhatsApp: +254 769 284 070</span>
            </div>
          </div>
        </section>

        {/* Shop Section */}
        <section className="py-14 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            {/* Categories */}
            <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
              <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-muted/30 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="font-semibold text-foreground mt-1 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-xs mb-3 line-clamp-3">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber text-amber" />
                        <span className="text-sm font-medium text-foreground">{product.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-bold text-foreground">
                        Ksh {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          Ksh {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <a
                      href={getWhatsAppLink(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="whatsappOutline" size="sm" className="w-full gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        Order on WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Info */}
            <div className="mt-14 bg-card rounded-2xl p-7 md:p-8 border border-border">
              <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">How to Order</h3>
                  <p className="text-muted-foreground text-sm">
                    1. Click "Order on WhatsApp" on any product<br />
                    2. Confirm your order with Faith<br />
                    3. Pay via M-Pesa PayBill: <span className="font-bold text-foreground">542542</span> Account: <span className="font-bold text-foreground">38549</span><br />
                    4. Receive your delivery or digital product
                  </p>
                </div>
                <a href="https://wa.me/254769284070" target="_blank" rel="noopener noreferrer">
                  <Button variant="whatsapp" size="lg" className="gap-2">
                    <Phone className="w-5 h-5" />
                    Contact Faith
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Shop;
