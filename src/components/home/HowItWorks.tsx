import { ClipboardList, CreditCard, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const steps = [
    {
      icon: ClipboardList,
      step: "01",
      title: "Choose Service",
      description: "Select the consultation type you need – dermatology, reproductive health, nutrition, or mental health.",
    },
    {
      icon: CreditCard,
      step: "02",
      title: "Pay via M-Pesa",
      description: "Make a secure payment to our M-Pesa Till Number 4342368. Quick and convenient.",
    },
    {
      icon: MessageCircle,
      step: "03",
      title: "Chat on WhatsApp",
      description: "Connect with your healthcare provider on WhatsApp for your confidential consultation.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get Care in 3 Simple Steps
          </h2>
          <p className="text-muted-foreground text-lg">
            Our process is designed to be quick, secure, and completely confidential.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-border -z-10" />
              )}

              <div className="bg-card rounded-2xl p-6 md:p-8 text-center border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                {/* Step Number */}
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 relative">
                  <step.icon className="w-8 h-8 text-primary" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* M-Pesa Info */}
        <div className="mt-12 md:mt-16 max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl p-6 md:p-8 border border-primary/20 shadow-md">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-full bg-[hsl(142,70%,45%)]/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-7 h-7 text-[hsl(142,70%,45%)]" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">M-Pesa Payment</h4>
                <p className="text-muted-foreground text-sm">
                  Till Number: <span className="font-bold text-foreground">4342368</span> – Send your payment confirmation on WhatsApp to proceed.
                </p>
              </div>
              <a href="https://wa.me/254790425578" target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="default">
                  Start Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
