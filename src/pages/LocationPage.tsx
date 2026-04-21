import { useEffect, useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  MapPin,
  Stethoscope,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Heart,
  Apple,
  Brain,
  Smile,
  Star,
  Lightbulb,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { findLocationBySlug } from "@/data/locations";

const consultationServices = [
  {
    icon: Stethoscope,
    title: "Virtual Doctor Consultation",
    description:
      "General practitioner online consultation for everyday health concerns, prescriptions, and clinical advice.",
  },
  {
    icon: Heart,
    title: "Reproductive & Sexual Health",
    description:
      "Discrete health consultation covering family planning, STI guidance, and reproductive wellness.",
  },
  {
    icon: Apple,
    title: "Nutrition & Diet Plans",
    description:
      "Nutritionist meal plan tailored for diabetics, expectant mothers, weight management, and family wellness.",
  },
  {
    icon: Brain,
    title: "Mental Health Counseling",
    description:
      "Online stress management therapy, anxiety support, and confidential mental wellness sessions.",
  },
  {
    icon: Smile,
    title: "Dental & Oral Health",
    description:
      "Telemedicine consultations for bad breath (halitosis), gum care, and dental hygiene guidance.",
  },
  {
    icon: ShieldCheck,
    title: "Chronic Illness Management",
    description:
      "Diabetes management advice, hypertension control tips, and ongoing medical advice for chronic illness.",
  },
];

const featuredProducts = [
  {
    name: "Acne & Skin Care Essentials Kit",
    category: "Skin Care",
    price: 2499,
    image: "/images/products/skincare-kit.jpg",
    badge: "Best Seller",
  },
  {
    name: "Immunity Booster Multivitamins",
    category: "Wellness",
    price: 1899,
    image: "/images/products/prenatal-nutrition.jpg",
    badge: "Doctor Recommended",
  },
  {
    name: "Stress Relief & Relaxation Bundle",
    category: "Mental Wellness",
    price: 1599,
    image: "/images/products/stress-relief.jpg",
    badge: "Popular",
  },
  {
    name: "Dental & Oral Hygiene Kit",
    category: "Dental Care",
    price: 1299,
    image: "/images/products/dental-care.jpg",
    badge: "New",
  },
];

const LocationPage = () => {
  const { city } = useParams<{ city: string }>();
  const location = useMemo(
    () => (city ? findLocationBySlug(city) : undefined),
    [city],
  );

  // SEO: dynamic title, meta description, canonical
  useEffect(() => {
    if (!location) return;
    const title = `Online Clinic in ${location.name} | Telemedicine — HealthConnect Kenya`;
    document.title = title.slice(0, 60);

    const desc = `Book a virtual doctor consultation in ${location.name}. Affordable clinical care, online prescriptions & wellness shop delivery.`.slice(
      0,
      160,
    );
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", desc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute(
      "href",
      `${window.location.origin}/locations/${location.slug}`,
    );
  }, [location]);

  if (!location) {
    return <Navigate to="/locations" replace />;
  }

  const cityName = location.name;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/30 py-16 md:py-24 border-b border-border">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Link
              to="/locations"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mb-5"
            >
              <MapPin className="w-4 h-4" /> All Locations
            </Link>
            <span className="inline-block text-primary font-semibold text-xs uppercase tracking-widest mb-3">
              Telemedicine Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-tight">
              Best Online Clinic in {cityName}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              Affordable clinical care for residents of {cityName}. Book a
              virtual doctor consultation, get online prescriptions, and order
              wellness products with M-Pesa pharmacy delivery — all from home.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/services">
                <Button size="lg" className="gap-2">
                  <Stethoscope className="w-5 h-5" />
                  Book Consultation
                </Button>
              </Link>
              <Link to="/shop">
                <Button size="lg" variant="outline" className="gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Visit Wellness Shop
                </Button>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Licensed Clinicians
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                Same-day Slots
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Confidential & Discrete
              </span>
            </div>
          </div>
        </section>

        {/* Local Health Insights */}
        <section className="py-16 md:py-20 bg-secondary/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Local Health Insights — {cityName}
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Providing accessible healthcare to residents of{" "}
                <strong className="text-foreground">{cityName}</strong> and
                surrounding areas. Skip the traffic to the hospital and consult
                a clinician online today.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you live in {cityName} or work nearby, our online clinic
                offers convenient telemedicine appointments, family health
                support, and wellness shop delivery to your doorstep. Get the
                same standard of care as a private clinician home visit —
                without the wait.
              </p>
            </div>
          </div>
        </section>

        {/* Clinical Consultation Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block text-primary font-semibold text-xs uppercase tracking-widest mb-3">
                Clinical Consultation
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Book a Virtual Doctor in {cityName}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Book clinical appointment online with licensed Kenyan
                clinicians. Get medical advice, online prescription services,
                and follow-up care from the comfort of your home.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultationServices.map((service, idx) => (
                <div
                  key={idx}
                  className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/services">
                <Button size="lg" className="gap-2">
                  Book Your Consultation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Wellness Shop Preview */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div className="max-w-2xl">
                <span className="inline-block text-primary font-semibold text-xs uppercase tracking-widest mb-3">
                  Wellness Shop · {cityName}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Wellness Shop Delivery to {cityName}
                </h2>
                <p className="text-muted-foreground text-lg">
                  Buy organic supplements Kenya, immunity boosters, herbal
                  remedies, and dermatologist-recommended skincare. M-Pesa
                  pharmacy delivery available.
                </p>
              </div>
              <Link to="/shop">
                <Button variant="outline" className="gap-2 shrink-0">
                  Shop All Products
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, idx) => (
                <Link
                  key={idx}
                  to="/shop"
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/20 hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-square bg-muted/30 overflow-hidden">
                    <img
                      src={product.image}
                      alt={`${product.name} — delivered to ${cityName}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="font-semibold text-foreground mt-1 mb-3 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-foreground">
                        Ksh {product.price.toLocaleString()}
                      </span>
                      <Star className="w-4 h-4 fill-amber text-amber" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary to-primary/80">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to consult a clinician in {cityName}?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8">
              Book your online appointment now — secure M-Pesa payment, instant
              confirmation, and follow-up via WhatsApp.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/services">
                <Button variant="secondary" size="lg" className="gap-2">
                  <Stethoscope className="w-5 h-5" />
                  Book Consultation
                </Button>
              </Link>
              <Link to="/locations">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Browse Other Locations
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default LocationPage;
