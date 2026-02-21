import { Link } from "react-router-dom";
import { Stethoscope, Heart, Apple, Brain, ArrowRight, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicesOverview = () => {
  const services = [
    {
      icon: Stethoscope,
      title: "Dermatology",
      description: "Expert skin consultations for acne, eczema, fungal infections, rashes, and other dermatological conditions. Get a professional diagnosis and personalized treatment plan via WhatsApp.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Heart,
      title: "Reproductive Health",
      description: "Confidential consultations for sexual health, STI testing guidance, family planning, and reproductive wellness. Complete privacy guaranteed with licensed clinicians.",
      color: "bg-destructive/10 text-destructive",
    },
    {
      icon: Apple,
      title: "Nutrition",
      description: "Personalized diet and nutrition plans for babies, pregnant mothers, elderly patients, diabetics, and weight management. Evidence-based nutritional counseling.",
      color: "bg-green/10 text-green",
    },
    {
      icon: Brain,
      title: "Mental Health",
      description: "Professional counseling for stress, anxiety, depression, relationship challenges, and emotional wellness. Supportive, judgment-free mental health care.",
      color: "bg-amber/10 text-amber",
    },
    {
      icon: Smile,
      title: "Dental Health",
      description: "Expert consultations for bad breath (halitosis), oral hygiene, gum disease, and dental care guidance. Get effective treatment recommendations for lasting freshness.",
      color: "bg-secondary text-secondary-foreground",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <span className="inline-block text-primary font-semibold text-xs uppercase tracking-widest mb-3">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Healthcare Solutions
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Access quality, confidential healthcare from licensed professionals via WhatsApp. Affordable consultations for dermatology, reproductive health, nutrition, mental wellness, and dental care across Kenya.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-7 md:p-8 border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {service.description}
              </p>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all"
              >
                Learn more
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link to="/services">
            <Button variant="default" size="lg">
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
