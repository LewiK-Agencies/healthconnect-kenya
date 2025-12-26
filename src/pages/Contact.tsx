import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Phone, Clock, MapPin, AlertTriangle, MessageCircle } from "lucide-react";

const Contact = () => {
  const contacts = [
    {
      name: "Dr. Lewis",
      role: "Clinician",
      specialization: "Dermatology & Reproductive Health",
      phone: "254790425578",
      displayPhone: "+254 790 425 578",
    },
    {
      name: "Dr. Faith",
      role: "Nutritionist & Mental Health Counselor",
      specialization: "Nutrition & Mental Wellness",
      phone: "254769284070",
      displayPhone: "+254 769 284 070",
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
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or ready to start your consultation? Reach out to us on WhatsApp.
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[hsl(142,70%,45%)]/10 flex items-center justify-center mb-6">
                    <MessageCircle className="w-8 h-8 text-[hsl(142,70%,45%)]" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{contact.name}</h3>
                  <p className="text-primary font-medium mb-1">{contact.role}</p>
                  <p className="text-muted-foreground text-sm mb-4">{contact.specialization}</p>

                  <div className="flex items-center gap-2 text-foreground mb-6">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{contact.displayPhone}</span>
                  </div>

                  <a
                    href={`https://wa.me/${contact.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="whatsapp" className="w-full gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Chat on WhatsApp
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl p-6 border border-border text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
                <p className="text-muted-foreground text-sm">
                  Monday - Saturday<br />
                  8:00 AM - 8:00 PM EAT
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Location</h3>
                <p className="text-muted-foreground text-sm">
                  Online Consultations<br />
                  Serving All of Kenya
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">M-Pesa Till</h3>
                <p className="text-muted-foreground text-sm">
                  <span className="text-foreground font-bold text-lg">4342368</span><br />
                  Buy Goods
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Disclaimer */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-destructive/10 border border-destructive/30 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Emergency Disclaimer</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    <strong>This service is NOT for medical emergencies.</strong> If you are experiencing a medical emergency, please call the nearest hospital, emergency services, or go to your nearest emergency room immediately.
                  </p>
                  <p className="text-muted-foreground text-sm mt-3">
                    Our online consultations are for non-emergency health concerns and wellness guidance only.
                  </p>
                </div>
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

export default Contact;
