import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle, FileText, Home } from "lucide-react";
import { markBookingPaid } from "@/data/contentStore";

interface BookingState {
  opdNumber: string;
  patientName: string;
  age: string;
  gender: string;
  phone: string;
  service: string;
  provider: string;
  whatsapp: string;
  fee: number;
  date: string;
  timeSlot: string;
}

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as BookingState | null;

  useEffect(() => {
    if (!state) {
      navigate("/services");
      return;
    }
    // Mark this booking as paid in the analytics store.
    markBookingPaid(state.opdNumber);
  }, [state, navigate]);

  if (!state) return null;

  const whatsappMessage = encodeURIComponent(
    `🏥 *BOOKING CONFIRMATION*\n\n` +
    `📋 OPD Number: ${state.opdNumber}\n` +
    `👤 Patient: ${state.patientName}\n` +
    `🎂 Age: ${state.age}\n` +
    `⚧ Gender: ${state.gender}\n` +
    `🩺 Service: ${state.service}\n` +
    `📅 Date & Time: ${state.date} at ${state.timeSlot}\n` +
    `💰 Fee Paid: Ksh ${state.fee}\n\n` +
    `I have completed my payment. Kindly confirm my booking. Thank you!`
  );

  const whatsappUrl = `https://wa.me/${state.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-lg text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-[hsl(var(--green))]/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[hsl(var(--green))]" />
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-8">
            Your consultation has been booked successfully. Share your details with your provider on WhatsApp to finalize.
          </p>

          {/* Booking Details Card */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden mb-8 text-left">
            <div className="bg-primary/5 px-6 py-4 border-b border-border flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-foreground">Booking Details</h2>
            </div>
            <div className="p-6 space-y-3 text-sm">
              {[
                ["OPD Number", state.opdNumber],
                ["Patient Name", state.patientName],
                ["Age", state.age],
                ["Gender", state.gender.charAt(0).toUpperCase() + state.gender.slice(1)],
                ["Service", state.service],
                ["Provider", state.provider],
                ["Date & Time", `${state.date} at ${state.timeSlot}`],
                ["Fee Paid", `Ksh ${state.fee}`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp Button */}
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp" size="xl" className="w-full gap-3 mb-4">
              <MessageCircle className="w-6 h-6" />
              Share Booking on WhatsApp
            </Button>
          </a>

          <Button
            variant="outline"
            size="lg"
            className="w-full gap-2"
            onClick={() => navigate("/")}
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingSuccess;
