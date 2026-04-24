import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  Save,
  Download,
  Upload,
  RotateCcw,
  Stethoscope,
  ShoppingBag,
  MapPin,
  Newspaper,
  Eye,
  EyeOff,
  Heart,
  History,
  BarChart3,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  useAdminAuth,
  useServicePlans,
  useBookingServices,
  useProducts,
  useProductCategories,
  useBlogArticles,
  useCustomLocations,
  useAuditLog,
  useAnalytics,
  setServicePlans,
  setBookingServices,
  setProducts,
  setProductCategories,
  setBlogArticles,
  setCustomLocations,
  exportAll,
  importAll,
  resetAll,
  clearAuditLog,
  clearAnalytics,
} from "@/data/contentStore";
import {
  slugifyName,
  type ServicePlan,
  type ServiceItem,
  type ShopProduct,
  type BlogArticle,
  type BlogStatus,
  type CustomLocation,
} from "@/data/defaults";

// ============= LOGIN GATE =============
const LoginGate = ({ onLogin }: { onLogin: (pw: string) => boolean }) => {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(pw)) {
      setError("Incorrect password.");
    } else {
      setError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-sky p-4">
      <div className="w-full max-w-md bg-card rounded-2xl border border-border shadow-xl p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-md mb-4">
            <Lock className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground mt-1">
            BeHealth Kenya — Content Management
          </p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="pw" className="text-sm font-medium">
              Admin Password
            </Label>
            <div className="relative mt-1.5">
              <Input
                id="pw"
                type={show ? "text" : "password"}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Enter password"
                className="h-11 pr-10"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-sm text-destructive mt-2">{error}</p>
            )}
          </div>
          <Button type="submit" className="w-full" size="lg">
            Sign In
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Default password: <code className="bg-muted px-1.5 py-0.5 rounded">behealth2026</code>
          </p>
          <Link to="/" className="block text-center text-sm text-primary hover:underline">
            ← Back to website
          </Link>
        </form>
      </div>
    </div>
  );
};

// ============= SERVICES TAB =============
const ServicesTab = () => {
  const plans = useServicePlans();
  const bookingSvc = useBookingServices();

  const updatePlan = (idx: number, patch: Partial<ServicePlan>) => {
    const next = plans.map((p, i) => (i === idx ? { ...p, ...patch } : p));
    setServicePlans(next);
  };
  const removePlan = (idx: number) => {
    setServicePlans(plans.filter((_, i) => i !== idx));
    toast({ title: "Service removed" });
  };
  const addPlan = () => {
    const next: ServicePlan = {
      name: "New Service",
      price: 195,
      description: "Service description",
      features: ["Feature 1", "Feature 2"],
      provider: "Clinician",
      popular: false,
      serviceKey: "dermatology",
    };
    setServicePlans([...plans, next]);
    toast({ title: "Service added" });
  };

  const updateBooking = (idx: number, patch: Partial<ServiceItem>) => {
    const next = bookingSvc.map((p, i) => (i === idx ? { ...p, ...patch } : p));
    setBookingServices(next);
  };

  const setAllBookingPrice = (price: number) => {
    setBookingServices(bookingSvc.map((s) => ({ ...s, fee: price })));
    toast({ title: `All booking fees set to Ksh ${price}` });
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Pricing Plans (shown on /pricing)</h2>
            <p className="text-sm text-muted-foreground">Edit displayed plans, prices & features.</p>
          </div>
          <Button onClick={addPlan} size="sm" className="gap-1">
            <Plus className="w-4 h-4" /> Add Plan
          </Button>
        </div>
        <div className="grid gap-4">
          {plans.map((plan, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl p-4 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Name</Label>
                  <Input value={plan.name} onChange={(e) => updatePlan(idx, { name: e.target.value })} />
                </div>
                <div>
                  <Label className="text-xs">Price (Ksh)</Label>
                  <Input type="number" value={plan.price} onChange={(e) => updatePlan(idx, { price: Number(e.target.value) })} />
                </div>
              </div>
              <div>
                <Label className="text-xs">Description</Label>
                <Textarea rows={2} value={plan.description} onChange={(e) => updatePlan(idx, { description: e.target.value })} />
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs">Provider</Label>
                  <Select value={plan.provider} onValueChange={(v) => updatePlan(idx, { provider: v as ServicePlan["provider"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Clinician">Clinician</SelectItem>
                      <SelectItem value="Nutritionist">Nutritionist</SelectItem>
                      <SelectItem value="Clinician or Nutritionist">Either</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Booking key</Label>
                  <Select value={plan.serviceKey} onValueChange={(v) => updatePlan(idx, { serviceKey: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {bookingSvc.map((s) => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Switch checked={plan.popular} onCheckedChange={(v) => updatePlan(idx, { popular: v })} />
                  <Label className="text-sm">Mark as popular</Label>
                </div>
              </div>
              <div>
                <Label className="text-xs">Features (one per line)</Label>
                <Textarea rows={3} value={plan.features.join("\n")} onChange={(e) => updatePlan(idx, { features: e.target.value.split("\n").filter(Boolean) })} />
              </div>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={() => removePlan(idx)} className="text-destructive gap-1">
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold">Booking Services & Fees</h2>
            <p className="text-sm text-muted-foreground">Used by the booking dialog.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setAllBookingPrice(195)}>
            Set all to Ksh 195
          </Button>
        </div>
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {bookingSvc.map((s, idx) => (
            <div key={s.value} className="p-3 grid sm:grid-cols-12 gap-2 items-center">
              <div className="sm:col-span-5">
                <Input value={s.label} onChange={(e) => updateBooking(idx, { label: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <Input type="number" value={s.fee} onChange={(e) => updateBooking(idx, { fee: Number(e.target.value) })} />
              </div>
              <div className="sm:col-span-3">
                <Select value={s.provider} onValueChange={(v) => updateBooking(idx, { provider: v as ServiceItem["provider"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Clinician">Clinician</SelectItem>
                    <SelectItem value="Nutritionist">Nutritionist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2 text-xs text-muted-foreground font-mono truncate">
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ============= SHOP TAB =============
const ShopTab = () => {
  const products = useProducts();
  const categories = useProductCategories();
  const [newCat, setNewCat] = useState("");

  const update = (id: number, patch: Partial<ShopProduct>) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };
  const remove = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    toast({ title: "Product removed" });
  };
  const add = () => {
    const nextId = products.reduce((m, p) => Math.max(m, p.id), 0) + 1;
    setProducts([
      ...products,
      {
        id: nextId,
        name: "New Product",
        category: categories[0] ?? "Skin Care",
        price: 999,
        originalPrice: null,
        rating: 4.5,
        reviews: 0,
        image: "/placeholder.svg",
        badge: "New",
        description: "Product description",
      },
    ]);
    toast({ title: "Product added" });
  };

  const addCategory = () => {
    const c = newCat.trim();
    if (!c) return;
    if (categories.includes(c)) {
      toast({ title: "Category already exists" });
      return;
    }
    setProductCategories([...categories, c]);
    setNewCat("");
  };
  const removeCategory = (c: string) => {
    setProductCategories(categories.filter((x) => x !== c));
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-3">Categories</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((c) => (
            <Badge key={c} variant="secondary" className="gap-1.5 py-1.5 px-3">
              {c}
              <button onClick={() => removeCategory(c)} className="hover:text-destructive">
                <Trash2 className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 max-w-md">
          <Input placeholder="New category" value={newCat} onChange={(e) => setNewCat(e.target.value)} />
          <Button onClick={addCategory} size="sm"><Plus className="w-4 h-4" /></Button>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Products</h2>
          <Button onClick={add} size="sm" className="gap-1"><Plus className="w-4 h-4" /> Add Product</Button>
        </div>
        <div className="grid gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-card border border-border rounded-xl p-4 space-y-3">
              <div className="flex gap-4">
                <img src={p.image} alt={p.name} className="w-20 h-20 rounded-lg object-cover bg-muted shrink-0" />
                <div className="flex-1 grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Name</Label>
                    <Input value={p.name} onChange={(e) => update(p.id, { name: e.target.value })} />
                  </div>
                  <div>
                    <Label className="text-xs">Category</Label>
                    <Select value={p.category} onValueChange={(v) => update(p.id, { category: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-4 gap-3">
                <div>
                  <Label className="text-xs">Price (Ksh)</Label>
                  <Input type="number" value={p.price} onChange={(e) => update(p.id, { price: Number(e.target.value) })} />
                </div>
                <div>
                  <Label className="text-xs">Original Price (discount)</Label>
                  <Input type="number" value={p.originalPrice ?? ""} placeholder="None" onChange={(e) => update(p.id, { originalPrice: e.target.value ? Number(e.target.value) : null })} />
                </div>
                <div>
                  <Label className="text-xs">Rating</Label>
                  <Input type="number" step="0.1" min="0" max="5" value={p.rating} onChange={(e) => update(p.id, { rating: Number(e.target.value) })} />
                </div>
                <div>
                  <Label className="text-xs">Reviews</Label>
                  <Input type="number" value={p.reviews} onChange={(e) => update(p.id, { reviews: Number(e.target.value) })} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Image URL</Label>
                  <Input value={p.image} onChange={(e) => update(p.id, { image: e.target.value })} placeholder="/images/products/..." />
                </div>
                <div>
                  <Label className="text-xs">Badge (optional)</Label>
                  <Input value={p.badge ?? ""} onChange={(e) => update(p.id, { badge: e.target.value || null })} />
                </div>
              </div>
              <div>
                <Label className="text-xs">Description</Label>
                <Textarea rows={2} value={p.description} onChange={(e) => update(p.id, { description: e.target.value })} />
              </div>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={() => remove(p.id)} className="text-destructive gap-1">
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ============= LOCATIONS TAB =============
const LocationsTab = () => {
  const customLocations = useCustomLocations();
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");

  const add = () => {
    if (!name.trim()) return;
    const slug = slugifyName(name);
    if (customLocations.find((l) => l.slug === slug)) {
      toast({ title: "Location already exists" });
      return;
    }
    setCustomLocations([
      ...customLocations,
      { name: name.trim(), slug, region: region.trim() || "Custom Locations" },
    ]);
    setName("");
    toast({ title: "Location added" });
  };

  const remove = (slug: string) => {
    setCustomLocations(customLocations.filter((l) => l.slug !== slug));
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/40 border border-border rounded-xl p-4">
        <p className="text-sm text-muted-foreground">
          Built-in Kenya locations are always available at <code className="bg-card px-1.5 py-0.5 rounded">/locations/:city</code>.
          Use this section to add extra custom locations.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 space-y-3">
        <h3 className="font-semibold">Add a Location</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="sm:col-span-1">
            <Label className="text-xs">City / Area Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Diani Beach" />
          </div>
          <div className="sm:col-span-1">
            <Label className="text-xs">Region (optional)</Label>
            <Input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="e.g. Coast" />
          </div>
          <div className="flex items-end">
            <Button onClick={add} className="w-full gap-1"><Plus className="w-4 h-4" /> Add</Button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Custom Locations ({customLocations.length})</h3>
        {customLocations.length === 0 ? (
          <p className="text-sm text-muted-foreground">None yet.</p>
        ) : (
          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            {customLocations.map((l) => (
              <div key={l.slug} className="p-3 flex justify-between items-center gap-3">
                <div>
                  <p className="font-medium">{l.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {l.region} · /locations/{l.slug}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => remove(l.slug)} className="text-destructive gap-1">
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ============= BLOG TAB =============
const BlogTab = () => {
  const articles = useBlogArticles();
  const [editing, setEditing] = useState<BlogArticle | null>(null);

  const save = (a: BlogArticle) => {
    const idx = articles.findIndex((x) => x.slug === a.slug);
    if (idx === -1) setBlogArticles([a, ...articles]);
    else setBlogArticles(articles.map((x, i) => (i === idx ? a : x)));
    setEditing(null);
    toast({ title: "Article saved" });
  };

  const remove = (slug: string) => {
    setBlogArticles(articles.filter((a) => a.slug !== slug));
    toast({ title: "Article removed" });
  };

  const newArticle = (): BlogArticle => ({
    slug: `new-article-${Date.now()}`,
    title: "New Article",
    excerpt: "",
    coverImage: "/placeholder.svg",
    author: "Clinician",
    category: "Dermatology",
    tags: [],
    metaKeywords: "",
    publishedAt: new Date().toISOString().slice(0, 10),
    content: "## Heading\n\nWrite your article here.",
  });

  if (editing) {
    return <ArticleEditor initial={editing} onCancel={() => setEditing(null)} onSave={save} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Blog Articles</h2>
          <p className="text-sm text-muted-foreground">{articles.length} articles</p>
        </div>
        <Button size="sm" onClick={() => setEditing(newArticle())} className="gap-1">
          <Plus className="w-4 h-4" /> New Article
        </Button>
      </div>
      <div className="grid gap-3">
        {articles.map((a) => (
          <div key={a.slug} className="bg-card border border-border rounded-xl p-4 flex gap-4">
            <img src={a.coverImage} alt="" className="w-20 h-20 rounded-lg object-cover bg-muted shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs">{a.category}</Badge>
                <span className="text-xs text-muted-foreground">{a.publishedAt}</span>
              </div>
              <h3 className="font-semibold truncate">{a.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{a.excerpt}</p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <Button size="sm" variant="outline" onClick={() => setEditing(a)}>Edit</Button>
              <Button size="sm" variant="outline" onClick={() => remove(a.slug)} className="text-destructive">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ArticleEditor = ({
  initial,
  onCancel,
  onSave,
}: {
  initial: BlogArticle;
  onCancel: () => void;
  onSave: (a: BlogArticle) => void;
}) => {
  const [a, setA] = useState<BlogArticle>(initial);
  const update = (patch: Partial<BlogArticle>) => setA({ ...a, ...patch });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Edit Article</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onCancel}>Cancel</Button>
          <Button size="sm" onClick={() => onSave({ ...a, slug: a.slug || slugifyName(a.title) })} className="gap-1">
            <Save className="w-4 h-4" /> Save
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Title</Label>
            <Input value={a.title} onChange={(e) => update({ title: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs">Slug (URL)</Label>
            <Input value={a.slug} onChange={(e) => update({ slug: slugifyName(e.target.value) })} />
          </div>
        </div>
        <div>
          <Label className="text-xs">Excerpt</Label>
          <Textarea rows={2} value={a.excerpt} onChange={(e) => update({ excerpt: e.target.value })} />
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <Label className="text-xs">Category</Label>
            <Input value={a.category} onChange={(e) => update({ category: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs">Author</Label>
            <Input value={a.author} onChange={(e) => update({ author: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs">Published Date</Label>
            <Input type="date" value={a.publishedAt} onChange={(e) => update({ publishedAt: e.target.value })} />
          </div>
        </div>
        <div>
          <Label className="text-xs">Cover Image URL</Label>
          <Input value={a.coverImage} onChange={(e) => update({ coverImage: e.target.value })} />
        </div>
        <div>
          <Label className="text-xs">Tags (comma-separated)</Label>
          <Input value={a.tags.join(", ")} onChange={(e) => update({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} />
        </div>
        <div>
          <Label className="text-xs">Meta Keywords (SEO)</Label>
          <Input value={a.metaKeywords ?? ""} onChange={(e) => update({ metaKeywords: e.target.value })} placeholder="keyword 1, keyword 2" />
        </div>
        <div>
          <Label className="text-xs">Content (Markdown)</Label>
          <Textarea rows={14} value={a.content} onChange={(e) => update({ content: e.target.value })} className="font-mono text-sm" />
        </div>
      </div>
    </div>
  );
};

// ============= MAIN ADMIN PAGE =============
const Admin = () => {
  const { authed, login, logout } = useAdminAuth();
  const [tab, setTab] = useState("services");

  useEffect(() => {
    document.title = "Admin Panel — BeHealth Kenya";
  }, []);

  if (!authed) {
    return <LoginGate onLogin={login} />;
  }

  const handleExport = () => {
    const data = exportAll();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `behealth-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Content exported" });
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        importAll(JSON.parse(text));
        toast({ title: "Content imported" });
      } catch {
        toast({ title: "Import failed — invalid JSON", variant: "destructive" });
      }
    };
    input.click();
  };

  const handleReset = () => {
    if (confirm("Reset ALL admin changes back to defaults? This cannot be undone.")) {
      resetAll();
      toast({ title: "Reset to defaults" });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="font-bold text-sm">BeHealth Admin</p>
              <p className="text-xs text-muted-foreground -mt-0.5">Content Manager</p>
            </div>
          </Link>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={handleImport} className="gap-1">
              <Upload className="w-3.5 h-3.5" /> Import
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport} className="gap-1">
              <Download className="w-3.5 h-3.5" /> Export
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset} className="gap-1 text-destructive">
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </Button>
            <Button variant="outline" size="sm" onClick={logout} className="gap-1">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-6 h-auto">
            <TabsTrigger value="services" className="gap-1.5 py-2.5">
              <Stethoscope className="w-4 h-4" /> Services
            </TabsTrigger>
            <TabsTrigger value="shop" className="gap-1.5 py-2.5">
              <ShoppingBag className="w-4 h-4" /> Shop
            </TabsTrigger>
            <TabsTrigger value="locations" className="gap-1.5 py-2.5">
              <MapPin className="w-4 h-4" /> Locations
            </TabsTrigger>
            <TabsTrigger value="blog" className="gap-1.5 py-2.5">
              <Newspaper className="w-4 h-4" /> Blog
            </TabsTrigger>
          </TabsList>
          <TabsContent value="services"><ServicesTab /></TabsContent>
          <TabsContent value="shop"><ShopTab /></TabsContent>
          <TabsContent value="locations"><LocationsTab /></TabsContent>
          <TabsContent value="blog"><BlogTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
