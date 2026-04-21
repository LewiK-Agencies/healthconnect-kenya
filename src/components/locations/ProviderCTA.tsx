// Reusable provider CTA panel. Shows the Clinician card, Nutritionist card,
// or both, depending on the city's most-booked services.
//
// Usage:
//   <ProviderCTA cityName="Karen" focus="mixed" />

import { Stethoscope, Apple, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProviderFocus } from "@/data/locationContent";

interface ProviderCTAProps {
  cityName: string;
  focus: ProviderFocus;
}

const PROVIDERS = {
  clinician: {
    role: "Clinician",
    Icon: Stethoscope,
    summary:
      "Licensed clinician handling skin, reproductive & sexual health, dental concerns and chronic illness follow-ups.",
    specialties: [
      "Dermatology & Acne",
      "Reproductive & Sexual Health",
      "Dental & Bad Breath",
      "Chronic Illness Management",
    ],
    phone: "254790425578",
    cta: "WhatsApp the Clinician",
  },
  nutritionist: {
    role: "Nutritionist & Mental Wellness Counselor",
    Icon: Apple,
    summary:
      "Personalised meal plans, weight & diabetes nutrition, plus confidential mental wellness sessions.",
    specialties: [
      "Meal Plans & Diet Coaching",
      "Diabetes & Hypertension Nutrition",
      "Stress & Anxiety Support",
      "Pre/Postnatal Nutrition",
    ],
    phone: "254769284070",
    cta: "WhatsApp the Nutritionist",
  },
} as const;

type ProviderKey = keyof typeof PROVIDERS;

const ProviderCard = ({
  provider,
  cityName,
}: {
  provider: (typeof PROVIDERS)[ProviderKey];
  cityName: string;
}) => {
  const { Icon } = provider;
  const waLink = `https://wa.me/${provider.phone}?text=${encodeURIComponent(
    `Hello, I'm in ${cityName} and would like to book a consultation.`,
  )}`;
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">{provider.role}</h3>
          <p className="text-sm text-muted-foreground">
            Serving {cityName} & nearby
          </p>
        </div>
      </div>
      <p className="text-muted-foreground mb-4">{provider.summary}</p>
      <ul className="space-y-2 mb-6">
        {provider.specialties.map((s) => (
          <li
            key={s}
            className="flex items-center gap-2 text-sm text-foreground"
          >
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            {s}
          </li>
        ))}
      </ul>
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto"
      >
        <Button variant="whatsapp" className="w-full gap-2">
          <Phone className="w-4 h-4" />
          {provider.cta}
        </Button>
      </a>
    </div>
  );
};

const ProviderCTA = ({ cityName, focus }: ProviderCTAProps) => {
  const showClinician = focus !== "nutrition";
  const showNutritionist = focus !== "clinical";
  const cardCount = (showClinician ? 1 : 0) + (showNutritionist ? 1 : 0);

  return (
    <div
      className={`grid gap-6 ${
        cardCount === 2 ? "md:grid-cols-2" : "max-w-xl mx-auto"
      }`}
    >
      {showClinician && (
        <ProviderCard provider={PROVIDERS.clinician} cityName={cityName} />
      )}
      {showNutritionist && (
        <ProviderCard provider={PROVIDERS.nutritionist} cityName={cityName} />
      )}
    </div>
  );
};

export default ProviderCTA;
