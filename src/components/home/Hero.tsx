import { ArrowRight, Shield, Users, Wallet, CalendarDays, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useBooking } from "@/components/booking/BookingProvider";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const { open } = useBooking();
  const trustIndicators = [
    { icon: Shield, text: "100% Confidential" },
    { icon: Users, text: "Licensed Professionals" },
    { icon: Wallet, text: "Affordable Pricing" },
  ];

  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--navy))]/95 via-[hsl(var(--navy))]/80 to-[hsl(var(--navy))]/40" />

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white/90 border border-white/10">
            <span className="w-2 h-2 bg-[hsl(var(--green))] rounded-full animate-pulse-soft" />
            Trusted Online Healthcare in Kenya
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Confidential,{" "}
            <span className="text-[hsl(var(--sky))]">Affordable</span>,{" "}
            <br className="hidden sm:block" />
            Professional{" "}
            <span className="text-[hsl(var(--sky))]">Online Care</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-xl">
            Get expert medical consultations via WhatsApp from licensed healthcare professionals. Dermatology, reproductive health, nutrition, dental care, and mental wellness – all from the comfort of your home.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button variant="hero" size="xl" className="w-full sm:w-auto" onClick={() => open()}>
              <CalendarDays className="w-5 h-5" />
              Book Consultation
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Link to="/shop">
              <Button size="xl" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20">
                <ShoppingBag className="w-5 h-5" />
                Shop Wellness Products
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 pt-4">
            {trustIndicators.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[hsl(var(--sky))]" />
                </div>
                <span className="text-sm font-medium text-white/80">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
