import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { ClipboardList, CreditCard, MessageCircle, Package, Phone, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const consultationSteps = [
    {
      icon: ClipboardList,
      step: "01",
      title: "Choose Your Service",
      description: "Browse our services and select the consultation type you need - dermatology, reproductive health, nutrition, or mental wellness.",
    },
    {
      icon: CreditCard,
      step: "02",
      title: "Make Payment via M-Pesa",
      description: "Pay securely using M-Pesa to our Till Number 4342368. Keep your confirmation message.",
    },
    {
      icon: MessageCircle,
      step: "03",
      title: "Send Payment Confirmation",
      description: "Screenshot your M-Pesa confirmation and send it to your healthcare provider on WhatsApp.",
    },
    {
      icon: CheckCircle,
      step: "04",
      title: "Receive Your Consultation",
      description: "Get your confidential consultation via WhatsApp chat. Ask questions and receive professional advice.",
    },
  ];

  const shopSteps = [
    {
      icon: ClipboardList,
      step: "01",
      title: "Browse Products",
      description: "Explore our wellness shop for skin care, nutrition, and mental health products.",
    },
    {
      icon: MessageCircle,
      step: "02",
      title: "Order via WhatsApp",
      description: "Click the WhatsApp button on any product to send your order to Faith.",
    },
    {
      icon: CreditCard,
      step: "03",
      title: "Pay via M-Pesa",
      description: "Make payment to Till Number 4342368 and send confirmation.",
    },
    {
      icon: Package,
      step: "04",
      title: "Receive Your Order",
      description: "Get delivery to your location or instant access for digital products.",
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
              How It Works
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Simple, Secure Healthcare
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting quality healthcare has never been easier. Follow these simple steps to start your consultation or order products.
            </p>
          </div>
        </section>

        {/* Consultation Steps */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                For Consultations
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Book a confidential consultation with our licensed healthcare professionals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {consultationSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative bg-card rounded-2xl p-6 md:p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 relative">
                    <step.icon className="w-8 h-8 text-primary" />
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <a href="https://wa.me/254790425578" target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" className="gap-2">
                  <Phone className="w-5 h-5" />
                  Consult Dr. Lewis (Clinician)
                </Button>
              </a>
              <a href="https://wa.me/25476928470" target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" className="gap-2">
                  <Phone className="w-5 h-5" />
                  Consult Dr. Faith (Nutritionist)
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Shop Steps */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                For Product Orders
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Order wellness products easily through WhatsApp.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {shopSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative bg-card rounded-2xl p-6 md:p-8 border border-border hover:border-green/30 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-light flex items-center justify-center mx-auto mb-5 relative">
                    <step.icon className="w-8 h-8 text-green" />
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green text-white text-sm font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Box */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-card rounded-2xl p-8 md:p-12 border border-primary/20 shadow-lg text-center">
              <div className="w-16 h-16 rounded-2xl bg-[hsl(142,70%,45%)]/10 flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-8 h-8 text-[hsl(142,70%,45%)]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                M-Pesa Payment
              </h2>
              <p className="text-muted-foreground mb-6">
                All payments are made securely via M-Pesa Buy Goods.
              </p>
              <div className="bg-muted rounded-2xl p-6 mb-6">
                <p className="text-sm text-muted-foreground mb-2">Till Number</p>
                <p className="text-5xl font-bold text-primary">4342368</p>
              </div>
              <p className="text-sm text-muted-foreground">
                After payment, screenshot your M-Pesa confirmation and send it to the relevant WhatsApp number to proceed.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default HowItWorks;
