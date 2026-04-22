import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/components/booking/BookingProvider";

const CTASection = () => {
  const { open } = useBooking();
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
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
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10">
            Start your confidential consultation today. Book a slot with a licensed Clinician or Nutritionist in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="heroOutline"
              size="xl"
              className="w-full sm:w-auto"
              onClick={() => open({ provider: "Clinician" })}
            >
              <CalendarDays className="w-5 h-5" />
              Consult the Clinician
            </Button>
            <Button
              variant="heroOutline"
              size="xl"
              className="w-full sm:w-auto"
              onClick={() => open({ provider: "Nutritionist" })}
            >
              <CalendarDays className="w-5 h-5" />
              Consult the Nutritionist
            </Button>
          </div>

          <p className="mt-10 text-sm text-primary-foreground/60">
            Consultation fee from <span className="font-bold text-primary-foreground">Ksh 195</span> · Pay securely via M-Pesa · Response within 30 minutes
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
