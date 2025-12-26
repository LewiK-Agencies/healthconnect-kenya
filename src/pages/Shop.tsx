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
      image: "🧴",
      badge: "Best Seller",
      description: "Complete acne treatment including cleanser, toner, and spot treatment.",
    },
    {
      id: 2,
      name: "Anti-Fungal Care Package",
      category: "Skin Care",
      price: 1899,
      originalPrice: 2400,
      rating: 4.7,
      reviews: 32,
      image: "🧴",
      badge: null,
      description: "Effective treatment for ringworm, athlete's foot, and fungal infections.",
    },
    {
      id: 3,
      name: "Eczema Relief Bundle",
      category: "Skin Care",
      price: 2199,
      originalPrice: null,
      rating: 4.9,
      reviews: 28,
      image: "🧴",
      badge: "New",
      description: "Soothing products for eczema and sensitive skin management.",
    },
    {
      id: 4,
      name: "Prenatal Nutrition Pack",
      category: "Nutrition",
      price: 1899,
      originalPrice: null,
      rating: 4.9,
      reviews: 56,
      image: "🥗",
      badge: "Doctor Recommended",
      description: "Essential vitamins and supplements for healthy pregnancy.",
    },
    {
      id: 5,
      name: "Baby Weaning Starter Kit",
      category: "Nutrition",
      price: 1499,
      originalPrice: 1800,
      rating: 4.8,
      reviews: 41,
      image: "👶",
      badge: null,
      description: "Everything you need to start your baby on solid foods safely.",
    },
    {
      id: 6,
      name: "Elderly Nutrition Support",
      category: "Nutrition",
      price: 1699,
      originalPrice: null,
      rating: 4.7,
      reviews: 23,
      image: "🥗",
      badge: null,
      description: "Specialized nutrition for seniors with easy-to-digest formulas.",
    },
    {
      id: 7,
      name: "Diabetic-Friendly Meal Plan Guide",
      category: "Digital Products",
      price: 599,
      originalPrice: 999,
      rating: 4.9,
      reviews: 78,
      image: "📘",
      badge: "Digital",
      description: "30-day meal plan with recipes and grocery lists for diabetics.",
    },
    {
      id: 8,
      name: "Stress Relief Bundle",
      category: "Mental Wellness",
      price: 1599,
      originalPrice: 1999,
      rating: 4.7,
      reviews: 34,
      image: "🧘",
      badge: "Popular",
      description: "Calming teas, aromatherapy, and stress relief techniques guide.",
    },
    {
      id: 9,
      name: "Sleep & Relaxation Kit",
      category: "Mental Wellness",
      price: 1299,
      originalPrice: null,
      rating: 4.8,
      reviews: 29,
      image: "😴",
      badge: null,
      description: "Natural sleep aids and relaxation products for better rest.",
    },
    {
      id: 10,
      name: "Family Health Essentials Kit",
      category: "Doctor Kits",
      price: 3499,
      originalPrice: 4200,
      rating: 4.9,
      reviews: 67,
      image: "🩺",
      badge: "Bundle & Save",
      description: "Complete family health kit with first aid and wellness essentials.",
    },
    {
      id: 11,
      name: "Weight Management Guide (PDF)",
      category: "Digital Products",
      price: 499,
      originalPrice: null,
      rating: 4.8,
      reviews: 92,
      image: "📘",
      badge: "Digital",
      description: "Comprehensive weight loss/gain guide with meal plans and exercises.",
    },
    {
      id: 12,
      name: "Postpartum Recovery Kit",
      category: "Nutrition",
      price: 2299,
      originalPrice: 2800,
      rating: 4.9,
      reviews: 45,
      image: "👩‍🍼",
      badge: "Recommended",
      description: "Nutrition and wellness support for new mothers.",
    },
  ];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const getWhatsAppLink = (productName: string) => {
    return `https://wa.me/25476928470?text=${encodeURIComponent(`Hi Faith, I'm interested in ordering the ${productName}`)}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-sky py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Wellness Shop
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Quality Health Products
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Doctor-recommended wellness products delivered to your door. All orders managed by Faith Mukai Masila.
            </p>
            <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border">
              <Phone className="w-4 h-4 text-[hsl(142,70%,45%)]" />
              <span className="text-sm text-foreground">Order via WhatsApp: +254 769 284 70</span>
            </div>
          </div>
        </section>

        {/* Shop Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            {/* Categories */}
            <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
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
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-muted/50 flex items-center justify-center text-6xl">
                    {product.image}
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
                    <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
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
            <div className="mt-12 bg-card rounded-2xl p-6 md:p-8 border border-border">
              <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">How to Order</h3>
                  <p className="text-muted-foreground text-sm">
                    1. Click "Order on WhatsApp" on any product<br />
                    2. Confirm your order with Faith<br />
                    3. Pay via M-Pesa Till: <span className="font-bold text-foreground">4342368</span><br />
                    4. Receive your delivery or digital product
                  </p>
                </div>
                <a href="https://wa.me/25476928470" target="_blank" rel="noopener noreferrer">
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
