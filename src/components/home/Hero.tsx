import { ArrowRight, Shield, Users, Wallet, Phone, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const trustIndicators = [
    { icon: Shield, text: "100% Confidential" },
    { icon: Users, text: "Licensed Professionals" },
    { icon: Wallet, text: "Affordable Pricing" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-sky">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full text-sm font-medium text-accent-foreground mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
              Trusted Online Healthcare in Kenya
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up">
              Confidential,{" "}
              <span className="text-primary">Affordable</span>,{" "}
              <br className="hidden sm:block" />
              Professional{" "}
              <span className="text-primary">Online Care</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in-up delay-100">
              Get expert medical consultations via WhatsApp from licensed healthcare professionals. Dermatology, reproductive health, nutrition, and mental wellness – all from the comfort of your home.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-fade-in-up delay-200">
              <a href="https://wa.me/254790425578" target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="xl" className="w-full sm:w-auto">
                  <Phone className="w-5 h-5" />
                  Consult a Doctor
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
              <Link to="/shop">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  <ShoppingBag className="w-5 h-5" />
                  Shop Wellness Products
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 animate-fade-in-up delay-300">
              {trustIndicators.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="relative animate-fade-in-up delay-200">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main Card */}
              <div className="absolute inset-4 md:inset-8 bg-card rounded-3xl shadow-xl border border-border overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <div className="p-6 md:p-8 h-full flex flex-col justify-between relative">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                      Your Health, Our Priority
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base">
                      Private consultations with qualified healthcare providers. No waiting rooms, no judgment.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-muted rounded-xl p-4">
                      <p className="text-2xl md:text-3xl font-bold text-primary">1000+</p>
                      <p className="text-xs text-muted-foreground">Consultations</p>
                    </div>
                    <div className="bg-muted rounded-xl p-4">
                      <p className="text-2xl md:text-3xl font-bold text-primary">98%</p>
                      <p className="text-xs text-muted-foreground">Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-0 right-0 bg-card rounded-2xl shadow-lg p-4 animate-fade-in delay-400">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[hsl(142,70%,45%)] flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Response time</p>
                    <p className="font-semibold text-foreground">Under 30 mins</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 bg-card rounded-2xl shadow-lg p-4 animate-fade-in delay-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Starting from</p>
                    <p className="font-semibold text-foreground">Ksh 299</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
