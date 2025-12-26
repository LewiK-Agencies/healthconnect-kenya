import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Phone, Check, CreditCard } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "General Consultation",
      price: 399,
      description: "Basic health consultation for common ailments",
      features: [
        "WhatsApp consultation",
        "Health assessment",
        "Treatment recommendations",
        "Follow-up advice",
      ],
      provider: "Lewis or Faith",
      popular: false,
    },
    {
      name: "Dermatology Consultation",
      price: 499,
      description: "Specialized skin care assessment and treatment",
      features: [
        "Photo-based diagnosis",
        "Personalized treatment plan",
        "Medication recommendations",
        "Skin care routine advice",
        "Follow-up included",
      ],
      provider: "Lewis",
      popular: true,
    },
    {
      name: "Reproductive Health",
      price: 499,
      description: "Confidential sexual and reproductive health care",
      features: [
        "Private consultation",
        "STI guidance",
        "Family planning advice",
        "Treatment recommendations",
        "Complete confidentiality",
      ],
      provider: "Lewis",
      popular: false,
    },
    {
      name: "Mental Health Session",
      price: 699,
      description: "Professional counseling and emotional support",
      features: [
        "45-min session",
        "Stress & anxiety support",
        "Depression counseling",
        "Relationship guidance",
        "Coping strategies",
        "Follow-up scheduling",
      ],
      provider: "Faith",
      popular: true,
    },
    {
      name: "Nutrition Follow-up",
      price: 299,
      description: "Follow-up session for existing nutrition clients",
      features: [
        "Progress review",
        "Plan adjustments",
        "Q&A session",
        "Ongoing support",
      ],
      provider: "Faith",
      popular: false,
    },
  ];

  const getWhatsAppNumber = (provider: string) => {
    if (provider === "Faith") return "25476928470";
    if (provider === "Lewis") return "254790425578";
    return "254790425578";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-sky py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Pricing
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Transparent, Affordable Pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quality healthcare shouldn't break the bank. Our consultation fees are designed to be accessible to all Kenyans.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-card rounded-2xl p-6 md:p-8 border ${
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

                  <a
                    href={`https://wa.me/${getWhatsAppNumber(plan.provider)}?text=${encodeURIComponent(`Hi, I'd like to book a ${plan.name} (Ksh ${plan.price})`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant={plan.popular ? "whatsapp" : "outline"}
                      className="w-full gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Book Now
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Info */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-[hsl(142,70%,45%)]/10 flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-8 h-8 text-[hsl(142,70%,45%)]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Payment via M-Pesa
              </h2>
              <p className="text-muted-foreground mb-8">
                Make your payment easily and securely using M-Pesa. After payment, send your confirmation to WhatsApp to proceed.
              </p>

              <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
                <p className="text-lg text-foreground mb-2">M-Pesa Till Number</p>
                <p className="text-5xl font-bold text-primary mb-4">4342368</p>
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
    </div>
  );
};

export default Pricing;
