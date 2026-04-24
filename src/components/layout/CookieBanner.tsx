import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Persisted cookie-consent state. Valid for 30 days, then we ask again.
const STORAGE_KEY = "behealth.cookieConsent.v1";
const VALID_DAYS = 30;

interface ConsentRecord {
  status: "accepted" | "rejected";
  at: number; // ms since epoch
}

function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    const ageDays = (Date.now() - parsed.at) / (1000 * 60 * 60 * 24);
    if (ageDays > VALID_DAYS) return null; // expired — ask again
    return parsed;
  } catch {
    return null;
  }
}

function saveConsent(status: ConsentRecord["status"]) {
  const record: ConsentRecord = { status, at: Date.now() };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Defer slightly so the page paints first.
    const t = setTimeout(() => {
      if (!readConsent()) setVisible(true);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const accept = () => {
    saveConsent("accepted");
    setVisible(false);
  };
  const reject = () => {
    saveConsent("rejected");
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4 pointer-events-none"
    >
      <div className="container mx-auto max-w-4xl pointer-events-auto">
        <div className="bg-card border border-border shadow-2xl rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5 text-primary" />
            </div>
            <div className="text-sm text-foreground">
              <p className="font-semibold mb-1">We use cookies</p>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                BeHealth Kenya uses essential and analytics cookies to make booking smooth and improve our
                services. Your choice is remembered for 30 days. Read our{" "}
                <Link to="/cookies" className="text-primary underline hover:no-underline">
                  Cookie Policy
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto shrink-0">
            <Button variant="outline" size="sm" onClick={reject} className="flex-1 sm:flex-none">
              Reject
            </Button>
            <Button size="sm" onClick={accept} className="flex-1 sm:flex-none">
              Accept all
            </Button>
            <button
              onClick={reject}
              aria-label="Dismiss"
              className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
