import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { Calendar, User, ArrowLeft, Tag, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "./Blog"; // Ensure this path matches your file structure

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  // 1. Handle "Post Not Found" State
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center flex-col gap-4">
          <p className="text-muted-foreground text-xl font-medium">Post not found.</p>
          <Link to="/blog" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // 2. Format Date for Kenyan Users
  const publishDate = new Date(post.publishedAt).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // 3. THE MAGIC SEO & ROI ENGINE
  // This function converts your plain text content into professional HTML
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      
      // Handle H2 Headers (SEO)
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-5 border-b border-primary/20 pb-2">
            {block.slice(3)}
          </h2>
        );
      }

      // Handle Bullet Points (Readability)
      if (block.trim().startsWith("* ") || block.trim().startsWith("- ")) {
        const items = block.split("\n").filter(Boolean);
        return (
          <ul key={i} className="list-disc list-outside ml-6 space-y-3 text-foreground/90 text-lg mb-8">
            {items.map((item, j) => (
              <li key={j} className="pl-2">{item.replace(/^[*|-]\s*/, "")}</li>
            ))}
          </ul>
        );
      }

      // Handle the WhatsApp "Book Now" Button (ROI)
      if (block.includes("[Book Your Skin Consultation via WhatsApp]")) {
        return (
          <div key={i} className="my-10">
            <a 
              href="https://wa.me/254790425578" // <-- REPLACE WITH YOUR ACTUAL NUMBER
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-xl"
            >
              <MessageCircle className="h-6 w-6" />
              Speak to a Clinician Now (WhatsApp)
            </a>
            <p className="text-center text-sm text-muted-foreground mt-3 italic">
              Private & Confidential Medical Advice
            </p>
          </div>
        );
      }

      // Default Paragraph styling
      return (
        <p key={i} className="text-foreground/90 leading-[1.8] text-lg mb-6">
          {block}
        </p>
      );
    });
  };

  // 4. Final Page Layout
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/10">
      <Navbar />
      
      <main className="flex-1">
        <article className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            
            {/* Navigation Back */}
            <Link to="/blog" className="inline-flex items-center gap-1 text-primary text-sm mb-8 hover:underline font-medium">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>

            {/* Post Hero Section */}
            <header className="mb-10">
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                <Badge variant="secondary" className="px-3 py-1 text-primary font-bold">
                  {post.category}
                </Badge>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{publishDate}</span>
                <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{post.author}</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary/50 pl-6 py-2 italic">
                {post.excerpt}
              </p>
            </header>

            {/* Featured Image */}
            <div className="relative aspect-video mb-12 overflow-hidden rounded-3xl shadow-xl border border-border">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Main Article Content */}
            <div className="article-body">
              {renderContent(post.content)}
            </div>

            {/* Tags Section */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 mt-12 pt-8 border-t border-border">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs uppercase tracking-wider px-3">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
          </div>
        </article>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default BlogPost;
