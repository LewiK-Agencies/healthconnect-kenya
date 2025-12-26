import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Phone, Stethoscope, Heart, Shield, Sparkles, AlertCircle, Apple, Brain, Baby, Users, Calendar, Scale, HeartPulse, Smile } from "lucide-react";

const Services = () => {
  const lewisServices = [
    {
      icon: Stethoscope,
      title: "Dermatology Consultations",
      description: "Expert diagnosis and treatment plans for all skin conditions including acne, rashes, and infections.",
    },
    {
      icon: Sparkles,
      title: "Acne & Skin Infections",
      description: "Personalized treatment protocols for acne, pimples, boils, and bacterial/fungal skin infections.",
    },
    {
      icon: AlertCircle,
      title: "Fungal & Eczema Management",
      description: "Comprehensive care for ringworm, athlete's foot, eczema, and chronic skin conditions.",
    },
    {
      icon: Heart,
      title: "Reproductive Health",
      description: "Confidential consultations for sexual health concerns with complete privacy guaranteed.",
    },
    {
      icon: Shield,
      title: "Sexual Health & STIs",
      description: "Discreet testing guidance, treatment, and counseling for sexually transmitted infections.",
    },
    {
      icon: Users,
      title: "Family Planning Guidance",
      description: "Professional advice on contraception options and family planning methods.",
    },
  ];

  const faithServices = [
    {
      icon: Baby,
      title: "Babies & Children Nutrition",
      description: "Expert guidance on infant feeding, weaning, and childhood nutrition for optimal growth.",
    },
    {
      icon: HeartPulse,
      title: "Pregnant & Breastfeeding Mothers",
      description: "Specialized nutrition plans for healthy pregnancy and postpartum recovery.",
    },
    {
      icon: Users,
      title: "Elderly Nutrition",
      description: "Tailored dietary plans addressing age-related nutritional needs and chronic conditions.",
    },
    {
      icon: Calendar,
      title: "Meal Plans & Diet Coaching",
      description: "Personalized meal planning and ongoing coaching for your health goals.",
    },
    {
      icon: Apple,
      title: "Diabetes & Hypertension Nutrition",
      description: "Evidence-based dietary management for chronic conditions.",
    },
    {
      icon: Scale,
      title: "Weight Management",
      description: "Sustainable weight loss or gain programs with nutritional counseling.",
    },
    {
      icon: Brain,
      title: "Stress & Anxiety Support",
      description: "Professional counseling and coping strategies for managing stress and anxiety.",
    },
    {
      icon: Heart,
      title: "Relationship Counseling",
      description: "Supportive guidance for relationship challenges and communication improvement.",
    },
    {
      icon: Smile,
      title: "Depression Support",
      description: "Compassionate mental health support and referral guidance for depression.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-sky py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Professional Healthcare Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access confidential consultations from licensed healthcare professionals via WhatsApp. Choose your provider below.
            </p>
          </div>
        </section>

        {/* Lewis Services */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Lewis Muli Keli</h2>
                    <p className="text-primary font-medium">Clinical Officer</p>
                  </div>
                </div>
                <p className="text-muted-foreground max-w-xl">
                  Specializing in dermatology and reproductive health consultations with years of clinical experience.
                </p>
              </div>
              <a href="https://wa.me/254790425578" target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" className="gap-2">
                  <Phone className="w-5 h-5" />
                  Consult Lewis on WhatsApp
                </Button>
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lewisServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
                  <a
                    href={`https://wa.me/254790425578?text=${encodeURIComponent(`Hi Lewis, I need a consultation for ${service.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="gap-2 w-full">
                      <Phone className="w-4 h-4" />
                      Book Consultation
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Faith Services */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-green-light flex items-center justify-center">
                    <Apple className="w-8 h-8 text-green" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Faith Mukai Masila</h2>
                    <p className="text-green font-medium">Nutritionist & Mental Health Counselor</p>
                  </div>
                </div>
                <p className="text-muted-foreground max-w-xl">
                  Expert in nutrition counseling and mental health support for all life stages.
                </p>
              </div>
              <a href="https://wa.me/25476928470" target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" className="gap-2">
                  <Phone className="w-5 h-5" />
                  Consult Faith on WhatsApp
                </Button>
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {faithServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 border border-border hover:border-green/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-light flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-green" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
                  <a
                    href={`https://wa.me/25476928470?text=${encodeURIComponent(`Hi Faith, I need a consultation for ${service.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="gap-2 w-full">
                      <Phone className="w-4 h-4" />
                      Book Consultation
                    </Button>
                  </a>
                </div>
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

export default Services;
