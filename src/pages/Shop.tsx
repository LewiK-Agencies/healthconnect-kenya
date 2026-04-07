import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingBag, Star, Phone, Search, SlidersHorizontal, X } from "lucide-react";

const categories = [
  "All",
  "Skin Care",
  "Nutrition",
  "Mental Wellness",
  "Dental Care",
  "Doctor Kits",
  "Digital Products",
];

type SortOption = "newest" | "price-low" | "price-high" | "name-az";

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

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);

  const maxPrice = 5000;

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, searchQuery, priceRange, sortBy]);

  const hasActiveFilters = searchQuery || activeCategory !== "All" || priceRange[0] > 0 || priceRange[1] < maxPrice;

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setPriceRange([0, maxPrice]);
    setSortBy("newest");
  };

  const getWhatsAppLink = (productName: string) => {
    return `https://wa.me/254769284070?text=${encodeURIComponent(`Hi Faith, I'm interested in ordering the ${productName}`)}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-sky py-14 md:py-20">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-muted-foreground mb-4">
              <a href="/" className="hover:text-primary">Home</a>
              <span className="mx-2">/</span>
              <span className="text-foreground">Shop</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Quality Health & Wellness Products
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-4">
              Doctor-recommended skin care, nutrition supplements, dental care, and mental wellness products delivered across Kenya.
            </p>
            <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border">
              <Phone className="w-4 h-4 text-[hsl(var(--green))]" />
              <span className="text-sm text-foreground">Order via WhatsApp: +254 769 284 070</span>
            </div>
          </div>
        </section>

        {/* Shop Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            {/* Search + Sort row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-card border-border"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="flex-1 sm:w-44 bg-card border-border">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low → High</SelectItem>
                    <SelectItem value="price-high">Price: High → Low</SelectItem>
                    <SelectItem value="name-az">Name: A → Z</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden border-border shrink-0"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Sidebar Filters */}
              <aside className={`${showFilters ? "block" : "hidden"} md:block md:w-56 shrink-0 space-y-6`}>
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Categories</h3>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                          activeCategory === cat
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Price Range</h3>
                  <Slider
                    min={0}
                    max={maxPrice}
                    step={100}
                    value={priceRange}
                    onValueChange={(v) => setPriceRange(v as [number, number])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Ksh {priceRange[0].toLocaleString()}</span>
                    <span>Ksh {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-destructive w-full">
                    <X className="h-3 w-3 mr-1" /> Clear Filters
                  </Button>
                )}
              </aside>

              {/* Products Grid */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground mb-4">
                  {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {filtered.map((product) => (
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
                          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-primary text-primary-foreground text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                            {product.badge}
                          </span>
                        )}
                        {product.originalPrice && (
                          <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-destructive text-destructive-foreground text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-3 sm:p-5">
                        <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
                          {product.category}
                        </span>
                        <h3 className="font-semibold text-foreground mt-1 mb-1 sm:mb-2 text-xs sm:text-sm md:text-base line-clamp-2 leading-tight">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground text-[10px] sm:text-xs mb-2 sm:mb-3 line-clamp-2 hidden sm:block">
                          {product.description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                          <div className="flex items-center gap-0.5 sm:gap-1">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[hsl(var(--amber))] text-[hsl(var(--amber))]" />
                            <span className="text-xs sm:text-sm font-medium text-foreground">{product.rating}</span>
                          </div>
                          <span className="text-[10px] sm:text-xs text-muted-foreground">({product.reviews})</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 flex-wrap">
                          <span className="text-sm sm:text-lg font-bold text-foreground">
                            Ksh {product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[10px] sm:text-sm text-muted-foreground line-through">
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
                          <Button variant="whatsappOutline" size="sm" className="w-full gap-1 sm:gap-2 text-xs sm:text-sm h-8 sm:h-9">
                            <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
                            Order on WhatsApp
                          </Button>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {filtered.length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground mb-3">No products match your filters.</p>
                    <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
                  </div>
                )}
              </div>
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
