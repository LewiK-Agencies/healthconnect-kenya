import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import BookingForm from "@/components/booking/BookingForm";
import { Button } from "@/components/ui/button";
import { Phone, Stethoscope, Heart, Shield, Sparkles, AlertCircle, Apple, Brain, Baby, Users, Calendar, Scale, HeartPulse, Smile, CalendarDays } from "lucide-react";

const SERVICE_MAP: Record<string, string> = {
  "Dermatology Consultations": "dermatology",
  "Acne & Skin Infections": "acne",
  "Fungal & Eczema Management": "fungal",
  "Reproductive Health": "reproductive",
  "Sexual Health & STIs": "sexual-health",
  "Family Planning Guidance": "family-planning",
  "Dental Health & Bad Breath": "dental",
  "Babies & Children Nutrition": "baby-nutrition",
  "Pregnant & Breastfeeding Mothers": "prenatal",
  "Elderly Nutrition": "elderly-nutrition",
  "Meal Plans & Diet Coaching": "meal-plans",
  "Diabetes & Hypertension Nutrition": "diabetes-nutrition",
  "Weight Management": "weight",
  "Stress & Anxiety Support": "stress",
  "Relationship Counseling": "relationship",
  "Depression Support": "depression",
};

const Services = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const openBooking = (serviceTitle: string) => {
    setSelectedService(SERVICE_MAP[serviceTitle] || "");
    setBookingOpen(true);
  };

  const lewisServices = [
    { icon: Stethoscope, title: "Dermatology Consultations", description: "Expert diagnosis and personalized treatment plans for all skin conditions including acne, psoriasis, rashes, pigmentation disorders, and chronic skin infections. Photo-based remote assessment via WhatsApp." },
    { icon: Sparkles, title: "Acne & Skin Infections", description: "Targeted treatment protocols for acne vulgaris, cystic acne, pimples, boils, abscesses, and bacterial or fungal skin infections. Includes skincare routine recommendations and medication guidance." },
    { icon: AlertCircle, title: "Fungal & Eczema Management", description: "Comprehensive management for ringworm, athlete's foot, jock itch, eczema, dermatitis, and chronic inflammatory skin conditions. Long-term care strategies and flare-up prevention." },
    { icon: Heart, title: "Reproductive Health", description: "Confidential consultations for reproductive health concerns including menstrual irregularities, fertility awareness, and hormonal health. Complete privacy guaranteed with professional discretion." },
    { icon: Shield, title: "Sexual Health & STIs", description: "Discreet STI testing guidance, treatment protocols, and post-exposure counseling for sexually transmitted infections. Non-judgmental, confidential, and evidence-based care." },
    { icon: Users, title: "Family Planning Guidance", description: "Professional advice on modern contraception options, natural family planning methods, and reproductive counseling for couples planning their families." },
    { icon: Smile, title: "Dental Health & Bad Breath", description: "Expert consultations for halitosis (bad breath), oral hygiene improvement, gum disease management, and dental care guidance. Get effective treatment recommendations for lasting oral freshness." },
  ];

  const faithServices = [
    { icon: Baby, title: "Babies & Children Nutrition", description: "Expert guidance on exclusive breastfeeding, complementary feeding, infant weaning schedules, and childhood nutrition for optimal growth, development, and immunity building." },
    { icon: HeartPulse, title: "Pregnant & Breastfeeding Mothers", description: "Specialized nutrition plans tailored for each trimester of pregnancy, postnatal recovery, and breastfeeding. Includes micronutrient supplementation and dietary guidelines." },
    { icon: Users, title: "Elderly Nutrition", description: "Tailored dietary plans addressing age-related nutritional deficiencies, bone health, digestive wellness, and chronic condition management for senior patients." },
    { icon: Calendar, title: "Meal Plans & Diet Coaching", description: "Personalized weekly and monthly meal planning, grocery guides, and ongoing dietary coaching aligned with your health goals, lifestyle, and budget." },
    { icon: Apple, title: "Diabetes & Hypertension Nutrition", description: "Evidence-based dietary management for type 1 and type 2 diabetes, hypertension, and metabolic syndrome. Blood sugar stabilization through strategic nutrition." },
    { icon: Scale, title: "Weight Management", description: "Sustainable weight loss or healthy weight gain programs combining nutritional counseling, portion control, and lifestyle modification for lasting results." },
    { icon: Brain, title: "Stress & Anxiety Support", description: "Professional counseling and evidence-based coping strategies for managing stress, anxiety disorders, panic attacks, and work-life balance challenges." },
    { icon: Heart, title: "Relationship Counseling", description: "Supportive guidance for relationship challenges, communication improvement, conflict resolution, and building healthier interpersonal connections." },
    { icon: Smile, title: "Depression Support", description: "Compassionate mental health support for depression symptoms, mood disorders, grief counseling, and professional referral guidance for clinical intervention." },
  ];

  const ServiceCard = ({ service, accentColor = "primary" }: { service: typeof lewisServices[0]; accentColor?: string }) => (
    <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300">
      <div className={`w-12 h-12 rounded-xl bg-${accentColor}/10 flex items-center justify-center mb-4`}>
        <service.icon className={`w-6 h-6 text-${accentColor}`} />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 w-full"
        onClick={() => openBooking(service.title)}
      >
        <CalendarDays className="w-4 h-4" />
        Book Consultation
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-sky py-20 md:py-28">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block text-primary font-semibold text-xs uppercase tracking-widest mb-3">Our Services</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Professional Healthcare Services</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access confidential consultations from licensed healthcare professionals via WhatsApp. Dermatology, reproductive health, dental care, nutrition, and mental wellness – all from the comfort of your home.
            </p>
          </div>
        </section>

        {/* Lewis Services */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-14">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Clinician</h2>
                    <p className="text-primary font-medium">Clinician</p>
                  </div>
                </div>
                <p className="text-muted-foreground max-w-xl">
                  Specializing in dermatology, reproductive health, dental care, and clinical consultations with years of professional experience.
                </p>
              </div>
              <Button variant="whatsapp" size="lg" className="gap-2" onClick={() => { setSelectedService(""); setBookingOpen(true); }}>
                <CalendarDays className="w-5 h-5" />
                Book a Consultation
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lewisServices.map((service, index) => (
                <ServiceCard key={index} service={service} accentColor="primary" />
              ))}
            </div>
          </div>
        </section>

        {/* Faith Services */}
        <section className="py-20 md:py-28 bg-muted/40">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-14">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Apple className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Nutritionist</h2>
                    <p className="text-primary font-medium">Nutritionist & Mental Health Counselor</p>
                  </div>
                </div>
                <p className="text-muted-foreground max-w-xl">
                  Expert in nutrition counseling and mental health support for all life stages, from infancy to elderly care.
                </p>
              </div>
              <Button variant="whatsapp" size="lg" className="gap-2" onClick={() => { setSelectedService(""); setBookingOpen(true); }}>
                <CalendarDays className="w-5 h-5" />
                Book a Consultation
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {faithServices.map((service, index) => (
                <ServiceCard key={index} service={service} accentColor="primary" />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
      <BookingForm open={bookingOpen} onOpenChange={setBookingOpen} preselectedService={selectedService} />
    </div>
  );
};

export default Services;
