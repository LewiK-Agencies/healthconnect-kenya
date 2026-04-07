import { Link } from "react-router-dom";
import { Calendar, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const blogPosts = [
  {
    slug: "understanding-acne-causes-treatment",
    title: "Understanding Acne: Causes, Types & Effective Treatment in Kenya",
    excerpt: "Acne is the most common skin condition in Kenya. Learn what causes it, the different types, and clinically proven treatments.",
    coverImage: "/images/products/skincare-kit.jpg",
    author: "Lewis Muli Keli",
    category: "Dermatology",
    publishedAt: "2026-03-25",
  },
  {
    slug: "bad-breath-halitosis-causes-solutions",
    title: "Bad Breath (Halitosis): Common Causes & Solutions That Actually Work",
    excerpt: "Struggling with bad breath? Discover the medical causes of halitosis and proven solutions to freshen your breath permanently.",
    coverImage: "/images/products/dental-care.jpg",
    author: "Lewis Muli Keli",
    category: "Dental Health",
    publishedAt: "2026-03-18",
  },
  {
    slug: "pregnancy-nutrition-guide-kenya",
    title: "Essential Pregnancy Nutrition: A Complete Guide for Kenyan Mothers",
    excerpt: "What to eat during pregnancy matters. This comprehensive guide covers the essential nutrients every expectant mother needs.",
    coverImage: "/images/products/prenatal-nutrition.jpg",
    author: "Faith Mukai Masila",
    category: "Nutrition",
    publishedAt: "2026-03-10",
  },
];

const BlogPreview = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-[hsl(var(--teal))] border-[hsl(var(--teal))]/30 bg-[hsl(var(--teal))]/5">
            Health Education
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Latest from Our Health Blog
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expert health articles from our licensed professionals to help you make informed decisions about your wellbeing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-3">
                <Badge className="bg-[hsl(var(--teal))]/10 text-[hsl(var(--teal))] hover:bg-[hsl(var(--teal))]/20 border-0 text-xs">
                  {post.category}
                </Badge>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-[hsl(var(--teal))] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.publishedAt).toLocaleDateString("en-KE", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/blog">
            <Button variant="outline" size="lg" className="group">
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
