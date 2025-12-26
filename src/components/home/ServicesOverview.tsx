import { Link } from "react-router-dom";
import { Stethoscope, Heart, Apple, Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicesOverview = () => {
  const services = [
    {
      icon: Stethoscope,
      title: "Dermatology",
      description: "Expert skin consultations for acne, infections, eczema, and more. Get personalized treatment plans.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Heart,
      title: "Reproductive Health",
      description: "Confidential consultations for sexual health, STIs, and family planning with complete privacy.",
      color: "bg-[hsl(0,70%,95%)] text-[hsl(0,70%,45%)]",
    },
    {
      icon: Apple,
      title: "Nutrition",
      description: "Personalized diet plans for babies, pregnant mothers, elderly, and chronic conditions.",
      color: "bg-green-light text-green",
    },
    {
      icon: Brain,
      title: "Mental Health",
      description: "Supportive counseling for stress, anxiety, depression, and emotional wellness.",
      color: "bg-amber-light text-amber",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Healthcare Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            Access quality healthcare from licensed professionals via WhatsApp. Confidential, convenient, and affordable.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 md:p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
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
        <div className="text-center mt-12">
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
