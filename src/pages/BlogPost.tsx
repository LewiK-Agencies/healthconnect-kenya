import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "./Blog";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center flex-col gap-4">
          <p className="text-muted-foreground">Post not found.</p>
          <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const publishDate = new Date(post.publishedAt).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("## "))
        return <h2 key={i} className="text-xl font-bold text-foreground mt-8 mb-3">{block.slice(3)}</h2>;
      if (block.startsWith("### "))
        return <h3 key={i} className="text-lg font-bold text-foreground mt-6 mb-2">{block.slice(4)}</h3>;

      // Handle numbered lists
      if (/^\d+\./.test(block)) {
        const items = block.split("\n").filter(Boolean);
        return (
          <ol key={i} className="list-decimal list-inside space-y-1 text-foreground/90 leading-relaxed mb-4">
            {items.map((item, j) => (
              <li key={j}>{item.replace(/^\d+\.\s*/, "")}</li>
            ))}
          </ol>
        );
      }

      return <p key={i} className="text-foreground/90 leading-relaxed mb-4">{block}</p>;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <article className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <Link to="/blog" className="inline-flex items-center gap-1 text-primary text-sm mb-6 hover:underline">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>

            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-56 md:h-72 object-cover rounded-2xl mb-6"
            />

            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="text-primary font-semibold">{post.category}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{publishDate}</span>
              <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{post.title}</h1>
            <p className="text-lg text-muted-foreground mb-8 border-l-4 border-primary pl-4">{post.excerpt}</p>

            <div>{renderContent(post.content)}</div>

            {post.tags.length > 0 && (
              <div className="flex items-center gap-2 mt-8 pt-6 border-t border-border">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
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
