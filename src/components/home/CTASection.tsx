import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
            Start your confidential consultation today. Our licensed healthcare professionals are ready to help you on WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/254790425578" target="_blank" rel="noopener noreferrer">
              <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                <Phone className="w-5 h-5" />
                Consult Lewis (Clinical)
              </Button>
            </a>
            <a href="https://wa.me/25476928470" target="_blank" rel="noopener noreferrer">
              <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                <Phone className="w-5 h-5" />
                Consult Faith (Nutrition)
              </Button>
            </a>
          </div>

          <p className="mt-8 text-sm text-primary-foreground/60">
            M-Pesa Till: <span className="font-bold text-primary-foreground">4342368</span> • Response within 30 minutes
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
