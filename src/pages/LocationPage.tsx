import { useEffect, useMemo, useState } from "react";
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
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProviderCTA from "@/components/locations/ProviderCTA";
import { findLocationBySlug, allLocations } from "@/data/locations";
import {
  getCitySEO,
  getCityTestimonials,
  getCityFaqs,
  getCityServiceFocus,
  featuredCitySlugs,
} from "@/data/locationContent";


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

// Provider profiles used for the tailored CTA panel.
const PROVIDERS = {
  clinician: {
    role: "Clinician",
    summary:
      "Licensed clinician handling skin, reproductive & sexual health, dental concerns and chronic illness follow-ups.",
    specialties: [
      "Dermatology & Acne",
      "Reproductive & Sexual Health",
      "Dental & Bad Breath",
      "Chronic Illness Management",
    ],
    phone: "254790425578",
  },
  nutritionist: {
    role: "Nutritionist & Mental Wellness Counselor",
    summary:
      "Personalised meal plans, weight & diabetes nutrition, plus confidential mental wellness sessions.",
    specialties: [
      "Meal Plans & Diet Coaching",
      "Diabetes & Hypertension Nutrition",
      "Stress & Anxiety Support",
      "Pre/Postnatal Nutrition",
    ],
    phone: "254769284070",
  },
};

const LocationPage = () => {
  const { city } = useParams<{ city: string }>();
  const location = useMemo(
    () => (city ? findLocationBySlug(city) : undefined),
    [city],
  );

  const seo = useMemo(() => (location ? getCitySEO(location) : null), [location]);
  const testimonials = useMemo(
    () => (location ? getCityTestimonials(location) : []),
    [location],
  );
  const faqs = useMemo(
    () => (location ? getCityFaqs(location) : []),
    [location],
  );
  const focus = location ? getCityServiceFocus(location.slug) : "mixed";

  // Nearby cities for internal linking — pull other featured cities + 3 from
  // the full list as fallback.
  const nearbyCities = useMemo(() => {
    if (!location) return [];
    const others = allLocations.filter((l) => l.slug !== location.slug);
    const featured = others.filter((l) => featuredCitySlugs.includes(l.slug));
    const pool = (featured.length >= 6 ? featured : others).slice(0, 8);
    return pool;
  }, [location]);

  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Auto-rotate testimonials every 6s.
  useEffect(() => {
    if (testimonials.length === 0) return;
    const id = setInterval(
      () => setTestimonialIdx((i) => (i + 1) % testimonials.length),
      6000,
    );
    return () => clearInterval(id);
  }, [testimonials.length]);

  // SEO: dynamic title, meta description, canonical
  useEffect(() => {
    if (!location || !seo) return;
    document.title = seo.title;

    const ensureMeta = (name: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      return el;
    };
    ensureMeta("description").setAttribute("content", seo.description);
    ensureMeta("keywords").setAttribute(
      "content",
      `online clinic ${location.name}, telemedicine ${location.name}, virtual doctor ${location.name}, online prescriptions Kenya, M-Pesa pharmacy delivery, nutritionist meal plan, dental consultation Kenya`,
    );

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
  }, [location, seo]);

  if (!location || !seo) {
    return <Navigate to="/locations" replace />;
  }

  const cityName = location.name;
  const showClinician = focus !== "nutrition";
  const showNutritionist = focus !== "clinical";
  const activeTestimonial = testimonials[testimonialIdx];

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
                  {seo.insightsH2}
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Providing accessible healthcare to residents of{" "}
                <strong className="text-foreground">{cityName}</strong> and
                surrounding areas. Skip the traffic to the hospital and consult
                a clinician online today.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {seo.insightHook}
              </p>
            </div>
          </div>
        </section>

        {/* Meet the team — tailored providers */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-block text-primary font-semibold text-xs uppercase tracking-widest mb-3">
                Your {cityName} Care Team
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Speak to a Licensed Clinician for {cityName}
              </h2>
              <p className="text-muted-foreground">
                Our most-booked providers for {cityName} patients — tap WhatsApp
                to start a consultation now.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {showClinician && (
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Stethoscope className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {PROVIDERS.clinician.role}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Serving {cityName} & nearby
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {PROVIDERS.clinician.summary}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {PROVIDERS.clinician.specialties.map((s) => (
                      <li
                        key={s}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/${PROVIDERS.clinician.phone}?text=${encodeURIComponent(
                      `Hello, I'm in ${cityName} and would like to book a consultation.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto"
                  >
                    <Button variant="whatsapp" className="w-full gap-2">
                      <Phone className="w-4 h-4" />
                      WhatsApp the Clinician
                    </Button>
                  </a>
                </div>
              )}

              {showNutritionist && (
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Apple className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {PROVIDERS.nutritionist.role}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Serving {cityName} & nearby
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {PROVIDERS.nutritionist.summary}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {PROVIDERS.nutritionist.specialties.map((s) => (
                      <li
                        key={s}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/${PROVIDERS.nutritionist.phone}?text=${encodeURIComponent(
                      `Hello, I'm in ${cityName} and would like to book a session.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto"
                  >
                    <Button variant="whatsapp" className="w-full gap-2">
                      <Phone className="w-4 h-4" />
                      WhatsApp the Nutritionist
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Clinical Consultation */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block text-primary font-semibold text-xs uppercase tracking-widest mb-3">
                Clinical Consultation
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {seo.consultH2}
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

        {/* Local Testimonials Carousel */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <span className="inline-block text-primary font-semibold text-xs uppercase tracking-widest mb-3">
                {cityName} Patient Stories
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                What {cityName} Patients Say
              </h2>
            </div>

            <div className="relative bg-card border border-border rounded-2xl p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber text-amber"
                  />
                ))}
              </div>
              <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-5 min-h-[6rem]">
                "{activeTestimonial?.quote}"
              </blockquote>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="font-semibold text-foreground">
                    {activeTestimonial?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activeTestimonial?.service} · {cityName}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Previous testimonial"
                    onClick={() =>
                      setTestimonialIdx(
                        (i) =>
                          (i - 1 + testimonials.length) % testimonials.length,
                      )
                    }
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="flex gap-1.5">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        aria-label={`Show testimonial ${i + 1}`}
                        onClick={() => setTestimonialIdx(i)}
                        className={`h-2 rounded-full transition-all ${
                          i === testimonialIdx
                            ? "w-6 bg-primary"
                            : "w-2 bg-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Next testimonial"
                    onClick={() =>
                      setTestimonialIdx((i) => (i + 1) % testimonials.length)
                    }
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
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
                  {seo.shopH2}
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

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-widest mb-3">
                <HelpCircle className="w-4 h-4" /> {cityName} FAQs
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Online Consultations & Delivery in {cityName}
              </h2>
              <p className="text-muted-foreground">
                Common questions from {cityName} patients about telemedicine,
                online prescriptions and wellness shop delivery.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left text-base font-semibold text-foreground">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Nearby cities — internal linking */}
        {nearbyCities.length > 0 && (
          <section className="py-12 bg-secondary/20 border-t border-border">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5 text-center">
                Also serving near {cityName}
              </h2>
              <div className="flex flex-wrap justify-center gap-2">
                {nearbyCities.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/locations/${c.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-card border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-all"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

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
