import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { Calendar, ArrowRight, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePublishedBlogArticles } from "@/data/contentStore";

const Blog = () => {
  const blogPosts = usePublishedBlogArticles();
  const [activeCategory, setActiveCategory] = useState("All");

  const blogCategories = useMemo(
    () => ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))],
    [blogPosts],
  );

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

export default Blog;
