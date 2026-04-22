// App-wide booking dialog provider. Any component can call useBooking().open()
// to launch the multi-step booking form, optionally pre-selecting a service.
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import BookingForm from "./BookingForm";

interface OpenOptions {
  service?: string;
  /** Provider hint — picks the first matching service if no specific service given */
  provider?: "Clinician" | "Nutritionist";
}

interface BookingContextValue {
  open: (opts?: OpenOptions) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

const PROVIDER_DEFAULTS: Record<string, string> = {
  Clinician: "dermatology",
  Nutritionist: "meal-plans",
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [openState, setOpenState] = useState(false);
  const [preselected, setPreselected] = useState<string>("");
  const [key, setKey] = useState(0); // remount to reset internal state

  const open = useCallback((opts?: OpenOptions) => {
    let svc = opts?.service ?? "";
    if (!svc && opts?.provider) {
      svc = PROVIDER_DEFAULTS[opts.provider] ?? "";
    }
    setPreselected(svc);
    setKey((k) => k + 1);
    setOpenState(true);
  }, []);

  return (
    <BookingContext.Provider value={{ open }}>
      {children}
      <BookingForm
        key={key}
        open={openState}
        onOpenChange={setOpenState}
        preselectedService={preselected}
      />
    </BookingContext.Provider>
  );
};

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    // Fallback no-op so components don't crash if rendered outside provider.
    return { open: () => console.warn("BookingProvider not mounted") };
  }
  return ctx;
}
