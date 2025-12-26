import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Skin Care Essentials Kit",
      category: "Skin Care",
      price: 2499,
      originalPrice: 3200,
      rating: 4.8,
      image: "🧴",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Prenatal Nutrition Pack",
      category: "Nutrition",
      price: 1899,
      originalPrice: null,
      rating: 4.9,
      image: "🥗",
      badge: "Doctor Recommended",
    },
    {
      id: 3,
      name: "Stress Relief Bundle",
      category: "Mental Wellness",
      price: 1599,
      originalPrice: 1999,
      rating: 4.7,
      image: "🧘",
      badge: "Popular",
    },
    {
      id: 4,
      name: "Baby Nutrition Guide (PDF)",
      category: "Digital Products",
      price: 499,
      originalPrice: null,
      rating: 4.9,
      image: "📘",
      badge: "Digital",
    },
  ];

  const getWhatsAppLink = (productName: string) => {
    return `https://wa.me/25476928470?text=${encodeURIComponent(`Hi Faith, I'm interested in ordering the ${productName}`)}`;
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Wellness Shop
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured Products
            </h2>
          </div>
          <Link to="/shop">
            <Button variant="outline" className="gap-2">
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Area */}
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

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-amber text-amber" />
                  <span className="text-sm font-medium text-foreground">{product.rating}</span>
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
                  className="block"
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
      </div>
    </section>
  );
};

export default FeaturedProducts;
