// Per-location SEO content & dynamic copy generators.
// Uses keyword pools to ensure unique meta tags, H2s, FAQs, and testimonials
// across every /locations/:city page.

import type { Location } from "./locations";

// Featured cities surfaced on /locations and used for internal linking.
export const featuredCitySlugs = [
  "nairobi",
  "mombasa",
  "kisumu",
  "nakuru",
  "eldoret",
  "thika",
  "westlands",
  "karen",
  "kilimani",
  "lavington",
  "runda",
  "kasarani",
  "ruiru",
  "kitengela",
  "diani",
];

// Deterministic hash so each city gets stable pseudo-random content.
const hash = (str: string) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
};

const pick = <T,>(arr: T[], seed: number, offset = 0) =>
  arr[(seed + offset) % arr.length];

// SEO keyword pools sourced from the BeHealth keyword list.
const titleTemplates = [
  (c: string) => `Online Clinic ${c} | Telemedicine Kenya — HealthConnect`,
  (c: string) => `Virtual Doctor ${c} | Online Consultation & Prescriptions`,
  (c: string) => `Telemedicine ${c} | Book a Clinician Online Today`,
  (c: string) => `${c} Online Doctor | Affordable Clinical Care from Home`,
  (c: string) => `${c} Telehealth | Online Prescriptions & Wellness Delivery`,
  (c: string) => `Online GP ${c} | Same-day Virtual Consultations Kenya`,
];

const descTemplates = [
  (c: string) =>
    `Book a virtual doctor consultation in ${c}. Online prescriptions, dental & nutrition advice, M-Pesa pharmacy delivery — licensed Kenyan clinicians.`,
  (c: string) =>
    `Affordable online clinic in ${c}. Telemedicine for skin, reproductive, mental & dental health. Consult a clinician via WhatsApp today.`,
  (c: string) =>
    `${c} residents — skip hospital traffic. Same-day virtual consultations, online prescriptions, wellness shop delivery across Kenya.`,
  (c: string) =>
    `Need a doctor in ${c}? HealthConnect Kenya offers confidential telemedicine, nutritionist meal plans, and home delivery of supplements.`,
  (c: string) =>
    `Online clinical care for ${c}. Book a licensed clinician, get a digital prescription, and receive wellness products via M-Pesa.`,
];

const insightHooks = [
  (c: string) =>
    `Living or working in ${c} often means juggling busy schedules, traffic, and crowded clinics. Our online doctor in ${c} brings affordable, same-day care directly to you.`,
  (c: string) =>
    `Healthcare access in ${c} can mean long queues at private hospitals. With telemedicine ${c}, you skip the wait and connect with a licensed clinician in minutes.`,
  (c: string) =>
    `Whether you stay in a quiet estate or a busy stretch of ${c}, HealthConnect Kenya makes a virtual doctor consultation simple, private, and budget-friendly.`,
  (c: string) =>
    `From young families to working professionals in ${c}, our telehealth services Kenya help you manage everyday health concerns without leaving home.`,
];

const consultH2s = [
  (c: string) => `Book a Virtual Doctor in ${c}`,
  (c: string) => `Trusted Online Clinicians Serving ${c}`,
  (c: string) => `Same-day Telemedicine Appointments in ${c}`,
  (c: string) => `${c} Online Consultations — Skin, Dental, Mental & More`,
  (c: string) => `Affordable Virtual Healthcare for ${c} Residents`,
];

const shopH2s = [
  (c: string) => `Wellness Shop Delivery to ${c}`,
  (c: string) => `Order Supplements & Skincare in ${c}`,
  (c: string) => `M-Pesa Pharmacy Delivery — ${c} Residents`,
  (c: string) => `${c} Home Delivery: Vitamins, Skincare & Herbal Remedies`,
  (c: string) => `Doctor-recommended Wellness Products for ${c}`,
];

const insightsH2s = [
  (c: string) => `Local Health Insights — ${c}`,
  (c: string) => `Why ${c} Residents Choose Online Healthcare`,
  (c: string) => `Healthcare Made Easy for ${c} Families`,
  (c: string) => `Telehealth Tips for People in ${c}`,
];

// Top services per neighborhood — drives the clinician CTA tailoring.
const cityServiceMap: Record<string, "clinical" | "nutrition" | "mixed"> = {
  karen: "mixed",
  runda: "nutrition",
  muthaiga: "nutrition",
  gigiri: "nutrition",
  lavington: "nutrition",
  kilimani: "mixed",
  westlands: "mixed",
  kasarani: "clinical",
  embakasi: "clinical",
  pipeline: "clinical",
  donholm: "clinical",
  ruiru: "clinical",
  juja: "clinical",
  kitengela: "clinical",
  syokimau: "clinical",
  nairobi: "mixed",
  mombasa: "mixed",
  nyali: "nutrition",
  diani: "nutrition",
  kisumu: "mixed",
  nakuru: "mixed",
  eldoret: "mixed",
};

export type ProviderFocus = "clinical" | "nutrition" | "mixed";

export const getCityServiceFocus = (slug: string): ProviderFocus =>
  cityServiceMap[slug] ?? "mixed";

// ---------------- Testimonials ----------------
const testimonialPool = [
  (c: string) => ({
    quote: `Booked a same-day skin consultation from ${c} — the clinician was thorough and my prescription was sent within an hour. So much easier than driving across town.`,
    name: "Wanjiru M.",
    service: "Dermatology Consultation",
  }),
  (c: string) => ({
    quote: `As a working mum in ${c}, the nutritionist meal plan saved me. My toddler's eating routine is now sorted and the WhatsApp follow-ups are gold.`,
    name: "Achieng O.",
    service: "Babies & Children Nutrition",
  }),
  (c: string) => ({
    quote: `Discreet reproductive health advice from a licensed Kenyan clinician — exactly what I needed living in ${c}. Paid via M-Pesa, done in 20 minutes.`,
    name: "Brian K.",
    service: "Reproductive Health",
  }),
  (c: string) => ({
    quote: `Stress and sleep had me struggling. The mental wellness session was warm, professional and gave me practical tools — all from my flat in ${c}.`,
    name: "Sharon N.",
    service: "Stress & Anxiety Support",
  }),
  (c: string) => ({
    quote: `My bad breath issue had embarrassed me for years. The dental consultation in ${c} was honest, affordable and actually worked.`,
    name: "Peter G.",
    service: "Dental Health & Bad Breath",
  }),
  (c: string) => ({
    quote: `Diabetic meal plan delivered to ${c} alongside my supplements. Sugar levels are stable and my family is on board with the lifestyle changes.`,
    name: "Mary W.",
    service: "Diabetes & Hypertension Nutrition",
  }),
  (c: string) => ({
    quote: `I was skeptical about online doctors in ${c}, but the prescription was emailed instantly and the pharmacy delivery arrived the same evening.`,
    name: "James M.",
    service: "Virtual Doctor Consultation",
  }),
];

export const getCityTestimonials = (city: Location) => {
  const seed = hash(city.slug);
  // 4 unique testimonials per city
  const used = new Set<number>();
  const result: ReturnType<(typeof testimonialPool)[number]>[] = [];
  for (let i = 0; result.length < 4; i++) {
    const idx = (seed + i) % testimonialPool.length;
    if (used.has(idx)) continue;
    used.add(idx);
    result.push(testimonialPool[idx](city.name));
  }
  return result;
};

// ---------------- FAQs ----------------
const faqPool = [
  (c: string) => ({
    q: `How do I book an online doctor consultation in ${c}?`,
    a: `Click "Book Consultation", choose a service, pick a 30-minute slot and pay via M-Pesa. Your licensed clinician will meet you on WhatsApp at the scheduled time — no commute from ${c} required.`,
  }),
  (c: string) => ({
    q: `Are online prescriptions from HealthConnect Kenya valid in ${c}?`,
    a: `Yes. All prescriptions are issued by clinicians licensed by the Kenya Medical Practitioners and Dentists Council, and accepted by registered pharmacies serving ${c} and the wider Nairobi metro.`,
  }),
  (c: string) => ({
    q: `Can wellness shop products be delivered to ${c}?`,
    a: `Absolutely. We offer M-Pesa pharmacy delivery for supplements, skincare, herbal remedies and dental kits to ${c}, usually within 24 hours of confirmed payment.`,
  }),
  (c: string) => ({
    q: `What does an online consultation cost in ${c}?`,
    a: `Clinical consultations start at Ksh 299 and mental wellness sessions at Ksh 399. There are no hidden charges and you only pay after selecting your slot.`,
  }),
  (c: string) => ({
    q: `Is the consultation confidential?`,
    a: `Completely. Sessions happen one-on-one over WhatsApp, your records stay private, and no third party in ${c} or elsewhere can access them.`,
  }),
  (c: string) => ({
    q: `What conditions can a virtual doctor in ${c} help with?`,
    a: `Skin and acne, reproductive and sexual health, dental concerns including bad breath, mental wellness, nutrition, diabetes management and chronic illness follow-ups — all handled remotely.`,
  }),
  (c: string) => ({
    q: `Do you offer same-day appointments in ${c}?`,
    a: `Yes, depending on slot availability. Most ${c} patients booking before 4 pm are seen the same day; otherwise the next morning.`,
  }),
  (c: string) => ({
    q: `Can I get a nutritionist meal plan in ${c}?`,
    a: `Yes. Our nutritionist creates personalised meal plans for diabetics, expectant mothers, weight management and family wellness — delivered as a PDF after your session.`,
  }),
];

export const getCityFaqs = (city: Location) => {
  const seed = hash(city.slug + "faq");
  const result: ReturnType<(typeof faqPool)[number]>[] = [];
  const used = new Set<number>();
  for (let i = 0; result.length < 6; i++) {
    const idx = (seed + i) % faqPool.length;
    if (used.has(idx)) continue;
    used.add(idx);
    result.push(faqPool[idx](city.name));
  }
  return result;
};

// ---------------- Public API ----------------
export const getCitySEO = (city: Location) => {
  const seed = hash(city.slug);
  return {
    title: pick(titleTemplates, seed)(city.name).slice(0, 60),
    description: pick(descTemplates, seed)(city.name).slice(0, 160),
    consultH2: pick(consultH2s, seed)(city.name),
    shopH2: pick(shopH2s, seed)(city.name),
    insightsH2: pick(insightsH2s, seed)(city.name),
    insightHook: pick(insightHooks, seed)(city.name),
  };
};
