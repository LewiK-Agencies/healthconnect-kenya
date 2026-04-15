import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import BookingForm from "@/components/booking/BookingForm";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, CalendarDays } from "lucide-react";

const SERVICE_VALUE_MAP: Record<string, string> = {
  "General Consultation": "dermatology",
  "Dermatology Consultation": "dermatology",
  "Reproductive Health": "reproductive",
  "Dental Health": "dental",
  "Mental Health Session": "stress",
  "Nutrition Follow-up": "meal-plans",
};

const Pricing = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const plans = [
    { name: "General Consultation", price: 299, description: "Basic health consultation for common ailments and general medical advice", features: ["WhatsApp consultation", "Health assessment", "Treatment recommendations", "Follow-up advice"], provider: "Dr. Lewis or Dr. Faith", popular: false },
    { name: "Dermatology Consultation", price: 299, description: "Specialized skin assessment, diagnosis, and personalized treatment plan", features: ["Photo-based diagnosis", "Personalized treatment plan", "Medication recommendations", "Skin care routine advice", "Follow-up included"], provider: "Dr. Lewis", popular: true },
    { name: "Reproductive Health", price: 299, description: "Confidential sexual and reproductive health consultation with complete privacy", features: ["Private consultation", "STI guidance", "Family planning advice", "Treatment recommendations", "Complete confidentiality"], provider: "Dr. Lewis", popular: false },
    { name: "Dental Health", price: 299, description: "Expert dental consultation for bad breath, oral hygiene, and gum health", features: ["Bad breath assessment", "Oral hygiene guidance", "Gum care recommendations", "Treatment plan", "Follow-up advice"], provider: "Dr. Lewis", popular: false },
    { name: "Mental Health Session", price: 399, description: "Professional counseling for stress, anxiety, depression, and emotional wellness", features: ["45-min session", "Stress & anxiety support", "Depression counseling", "Relationship guidance", "Coping strategies", "Follow-up scheduling"], provider: "Dr. Faith", popular: true },
    { name: "Nutrition Follow-up", price: 299, description: "Progress review and plan adjustments for existing nutrition clients", features: ["Progress review", "Plan adjustments", "Q&A session", "Ongoing support"], provider: "Dr. Faith", popular: false },
  ];

  const openBooking = (planName: string) => {
    setSelectedService(SERVICE_VALUE_MAP[planName] || "");
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-sky py-20 md:py-28">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block text-primary font-semibold text-xs uppercase tracking-widest mb-3">Pricing</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Transparent, Affordable Pricing</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quality healthcare shouldn't break the bank. Our consultation fees are designed to be accessible to all Kenyans.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-card rounded-2xl p-7 md:p-8 border ${
                    plan.popular ? "border-primary shadow-lg" : "border-border"
                  } hover:shadow-xl transition-all duration-300`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-foreground">Ksh {plan.price}</span>
                      <span className="text-muted-foreground">/session</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-center mb-4">
                    <span className="text-xs text-muted-foreground">
                      Provider: <span className="font-medium text-foreground">{plan.provider}</span>
                    </span>
                  </div>
                  <Button
                    variant={plan.popular ? "hero" : "outline"}
                    className="w-full gap-2"
                    onClick={() => openBooking(plan.name)}
                  >
                    <CalendarDays className="w-4 h-4" />
                    Book Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Info */}
        <section className="py-20 md:py-28 bg-muted/40">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Payment via I&M Bank</h2>
              <p className="text-muted-foreground mb-8">
                Make your payment easily and securely via M-Pesa. After payment, send your confirmation to WhatsApp to proceed with your consultation.
              </p>
              <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
                <p className="text-lg text-foreground mb-2">M-Pesa PayBill Number</p>
                <p className="text-5xl font-bold text-primary mb-2">542542</p>
                <p className="text-lg text-muted-foreground mb-1">Account Number</p>
                <p className="text-3xl font-bold text-foreground mb-4">38549</p>
                <p className="text-sm text-muted-foreground">
                  After payment, screenshot your M-Pesa confirmation and send it via WhatsApp to start your consultation.
                </p>
              </div>
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

export default Pricing;
