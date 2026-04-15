import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Loader2, Phone, FileText, Shield } from "lucide-react";

declare global {
  interface Window {
    PayHero: {
      init: (config: Record<string, unknown>) => void;
    };
  }
}

const PAYHERO_PAYMENT_URL = "https://app.payhero.co.ke/lipwa/4193";
const PAYHERO_CHANNEL_ID = 5256;

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

const BookingPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [initializing, setInitializing] = useState(true);

  const state = location.state as BookingState | null;

  useEffect(() => {
    if (!state) {
      navigate("/services");
      return;
    }

    // Load PayHero SDK
    const existingScript = document.querySelector('script[src*="payhero"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://js.payhero.co.ke/lipwa.js";
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => initPayHero();
    } else {
      initPayHero();
    }

    function initPayHero() {
      const timer = setTimeout(() => {
        if (window.PayHero && containerRef.current) {
          const baseUrl = window.location.origin;
          window.PayHero.init({
            paymentUrl: PAYHERO_PAYMENT_URL,
            width: "100%",
            height: "100%",
            containerId: "payHeroContainer",
            channelID: PAYHERO_CHANNEL_ID,
            amount: state!.fee,
            phone: state!.phone,
            name: state!.patientName,
            reference: state!.opdNumber,
            buttonName: `Pay KES ${state!.fee} Now`,
            buttonColor: "hsl(195, 85%, 32%)",
            successUrl: `${baseUrl}/booking-success`,
            failedUrl: `${baseUrl}/services`,
            callbackUrl: null,
          });
          setInitializing(false);
        }
      }, 800);
      return () => clearTimeout(timer);
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.paymentSuccess) {
        navigate("/booking-success", { state });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [state, navigate]);

  if (!state) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-lg">
          <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            Complete Payment
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            OPD: <span className="font-bold text-foreground font-mono">{state.opdNumber}</span> — {state.service}
          </p>

          {/* Booking Summary */}
          <div className="bg-card rounded-xl border border-border p-5 mb-6 space-y-2 text-sm">
            {[
              ["Patient", state.patientName],
              ["Service", state.service],
              ["Provider", state.provider],
              ["Date & Time", `${state.date} at ${state.timeSlot}`],
            ].map(([l, v]) => (
              <div key={l} className="flex justify-between">
                <span className="text-muted-foreground">{l}</span>
                <span className="font-medium text-foreground">{v}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2 border-t border-border">
              <span className="font-semibold text-foreground">Total</span>
              <span className="text-xl font-bold text-primary">Ksh {state.fee}</span>
            </div>
          </div>

          {/* Payment Container */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" />
              <span>
                M-Pesa prompt will be sent to{" "}
                <span className="text-foreground font-medium">{state.phone}</span>
              </span>
            </div>

            {initializing && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2 text-sm text-muted-foreground">Loading payment…</span>
              </div>
            )}

            <div id="payHeroContainer" ref={containerRef} className="min-h-[60px]" />

            <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
              <Shield className="w-3 h-3" />
              <span>Transaction appears as "MW Services" on your statement. Powered by PayHero.</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPayment;
