import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Phone,
  Stethoscope,
  CalendarDays,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  Clock,
  FileText,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookingServices, trackBooking } from "@/data/contentStore";

interface BookingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedService?: string;
}

const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

function generateOPD(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `OPD${num}/2026`;
}

const BookingForm = ({ open, onOpenChange, preselectedService }: BookingFormProps) => {
  const navigate = useNavigate();
  const ALL_SERVICES = useBookingServices();
  const [step, setStep] = useState(1);
  const [service, setService] = useState(preselectedService || "");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState("");
  const [opdNumber] = useState(generateOPD());

  const selectedService = ALL_SERVICES.find((s) => s.value === service);

  // Simulate some booked slots
  const bookedSlots = useMemo(() => {
    if (!selectedDate) return [];
    const seed = selectedDate.getDate();
    return TIME_SLOTS.filter((_, i) => (i + seed) % 5 === 0);
  }, [selectedDate]);

  const availableSlots = TIME_SLOTS.filter((s) => !bookedSlots.includes(s));

  const isStep1Valid = !!service;
  const isStep2Valid = name.trim().length >= 2 && age && gender && phone.length >= 10;
  const isStep3Valid = !!selectedDate && !!selectedSlot;

  const slotEnd = useMemo(() => {
    if (!selectedSlot) return "";
    const [h, m] = selectedSlot.split(":").map(Number);
    const total = h * 60 + m + 30;
    return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
  }, [selectedSlot]);

  const buildBookingData = () => {
    if (!selectedService || !selectedDate) return null;
    return {
      opdNumber,
      patientName: name,
      age,
      gender,
      phone,
      service: selectedService.label,
      provider: selectedService.provider,
      whatsapp: selectedService.whatsapp,
      fee: selectedService.fee,
      date: selectedDate.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" }),
      timeSlot: `${selectedSlot} - ${slotEnd}`,
    };
  };

  // Prefilled WhatsApp message — opens chat with the right provider, ready to send.
  const whatsappPrefillUrl = useMemo(() => {
    const data = buildBookingData();
    if (!data) return "";
    const message = encodeURIComponent(
      `Hello, I'd like to book a consultation.\n\n` +
      `🩺 *Service:* ${data.service}\n` +
      `👤 *Patient:* ${data.patientName} (${data.age}, ${data.gender})\n` +
      `📋 *OPD #:* ${data.opdNumber}\n` +
      `📅 *Preferred Date:* ${data.date}\n` +
      `⏰ *Time Slot:* ${data.timeSlot}\n` +
      `🧑‍⚕️ *Provider:* ${data.provider}\n` +
      `💰 *Fee:* Ksh ${data.fee}\n\n` +
      `Please confirm availability. Thank you!`
    );
    return `https://wa.me/${data.whatsapp}?text=${message}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedService, selectedDate, selectedSlot, name, age, gender, phone, opdNumber, slotEnd]);

  const handleProceedToPayment = () => {
    const bookingData = buildBookingData();
    if (!bookingData) return;
    // Record the booking client-side so the admin Analytics tab can show it.
    trackBooking({
      opdNumber: bookingData.opdNumber,
      patientName: bookingData.patientName,
      phone: bookingData.phone,
      service: bookingData.service,
      provider: bookingData.provider,
      fee: bookingData.fee,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
    });
    onOpenChange(false);
    navigate("/booking-payment", { state: bookingData });
  };

  const handleWhatsAppContinue = () => {
    const data = buildBookingData();
    if (!data) return;
    trackBooking({
      opdNumber: data.opdNumber,
      patientName: data.patientName,
      phone: data.phone,
      service: data.service,
      provider: data.provider,
      fee: data.fee,
      date: data.date,
      timeSlot: data.timeSlot,
    });
    window.open(whatsappPrefillUrl, "_blank", "noopener,noreferrer");
  };

  const resetForm = () => {
    setStep(1);
    setService(preselectedService || "");
    setName("");
    setAge("");
    setGender("");
    setPhone("");
    setSelectedDate(undefined);
    setSelectedSlot("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) resetForm();
        onOpenChange(v);
      }}
    >
      <DialogContent className="sm:max-w-[540px] max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border">
          <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-primary" />
            Book a Consultation
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Complete the steps below to schedule your appointment
          </p>
        </DialogHeader>

        {/* Step Indicators */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            {[
              { num: 1, label: "Service", icon: Stethoscope },
              { num: 2, label: "Details", icon: User },
              { num: 3, label: "Schedule", icon: CalendarDays },
              { num: 4, label: "Confirm", icon: CreditCard },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                      step >= s.num
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <s.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] mt-1 text-muted-foreground font-medium">
                    {s.label}
                  </span>
                </div>
                {i < 3 && (
                  <div
                    className={cn(
                      "w-10 sm:w-16 h-0.5 mx-1 rounded transition-all",
                      step > s.num ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <Label className="text-sm font-semibold text-foreground">
                Select a Service
              </Label>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choose your consultation type..." />
                </SelectTrigger>
                <SelectContent>
                  <div className="px-2 py-1.5 text-xs font-semibold text-primary">Clinician</div>
                  {ALL_SERVICES.filter((s) => s.provider === "Clinician").map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label} — Ksh {s.fee}
                    </SelectItem>
                  ))}
                  <div className="px-2 py-1.5 text-xs font-semibold text-green-600 mt-1">Nutritionist</div>
                  {ALL_SERVICES.filter((s) => s.provider === "Nutritionist").map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label} — Ksh {s.fee}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedService && (
                <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Provider</span>
                    <span className="font-medium text-foreground">{selectedService.provider}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Consultation Fee</span>
                    <span className="font-bold text-primary text-lg">Ksh {selectedService.fee}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Patient Details */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-muted/50 rounded-xl p-3 flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Your Outpatient Number:</span>
                <Badge variant="secondary" className="font-mono font-bold">{opdNumber}</Badge>
              </div>

              <div className="grid gap-3">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="age" className="text-sm font-medium">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Age"
                      min={1}
                      max={120}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="h-11 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Gender</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger className="h-11 mt-1">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">WhatsApp Phone Number</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="e.g. 0712345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ""))}
                      className="h-11 pl-10"
                      maxLength={15}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Date & Time Slot */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-primary" />
                Pick a Date & Time Slot
              </Label>
              <div className="flex flex-col items-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(d) => {
                    setSelectedDate(d);
                    setSelectedSlot("");
                  }}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today || date.getDay() === 0;
                  }}
                  className="rounded-xl border border-border pointer-events-auto"
                />
              </div>

              {selectedDate && (
                <div>
                  <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Available 30-min Slots for{" "}
                    {selectedDate.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const isBooked = bookedSlots.includes(slot);
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          disabled={isBooked}
                          onClick={() => setSelectedSlot(slot)}
                          className={cn(
                            "py-2 px-3 rounded-lg text-sm font-medium border transition-all",
                            isBooked
                              ? "bg-muted text-muted-foreground/40 border-border cursor-not-allowed line-through"
                              : isSelected
                              ? "bg-primary text-primary-foreground border-primary shadow-md"
                              : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-primary/5"
                          )}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="inline-block w-3 h-3 rounded bg-muted border border-border mr-1 align-middle line-through" /> Booked
                    <span className="inline-block w-3 h-3 rounded bg-primary border border-primary ml-3 mr-1 align-middle" /> Selected
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && selectedService && selectedDate && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-card rounded-xl border border-border divide-y divide-border">
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Booking Summary
                  </h3>
                  <dl className="space-y-2 text-sm">
                    {[
                      ["OPD Number", opdNumber],
                      ["Patient Name", name],
                      ["Age", age],
                      ["Gender", gender.charAt(0).toUpperCase() + gender.slice(1)],
                      ["WhatsApp", phone],
                      ["Service", selectedService.label],
                      ["Provider", selectedService.provider],
                      [
                        "Date & Time",
                        `${selectedDate.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })} at ${selectedSlot}`,
                      ],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between">
                        <dt className="text-muted-foreground">{label}</dt>
                        <dd className="font-medium text-foreground text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="p-4 bg-primary/5">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Consultation Fee</span>
                    <span className="text-2xl font-bold text-primary">Ksh {selectedService.fee}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleProceedToPayment}
                className="w-full gap-2"
                size="lg"
                variant="hero"
              >
                <CreditCard className="w-5 h-5" />
                Pay Ksh {selectedService.fee} via M-Pesa
              </Button>
              <p className="text-[10px] text-muted-foreground text-center">
                Payment processed securely via PayHero. Appears as "MW Services" on your statement.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6 pt-4 border-t border-border">
            {step > 1 ? (
              <Button variant="outline" size="sm" onClick={() => setStep(step - 1)}>
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < 4 && (
              <Button
                size="sm"
                disabled={
                  (step === 1 && !isStep1Valid) ||
                  (step === 2 && !isStep2Valid) ||
                  (step === 3 && !isStep3Valid)
                }
                onClick={() => setStep(step + 1)}
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
