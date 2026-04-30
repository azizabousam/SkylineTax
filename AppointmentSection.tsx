/*
 * AppointmentSection — Skyline Taxes
 * Design: Primary blue CTA background on left, clean white form card on right.
 * Enhanced form with date range, time range, and appointment modality selection.
 */
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Calendar, Clock, CheckCircle2, Phone, Mail, MapPin, Radio } from "lucide-react";

const CTA_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663605504559/6FWukh5HsU3A9vwvdw9MwV/cta-bg-accounting-REv4ietSua4ZCS8iUW4J4g.webp";

const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  modality: z.enum(["in-person", "phone"]),
  startDate: z.string().min(1, "Please select a start date"),
  endDate: z.string().min(1, "Please select an end date"),
  startTime: z.string().min(1, "Please select a start time"),
  endTime: z.string().min(1, "Please select an end time"),
  message: z.string().optional(),
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
  message: "End date must be after or equal to start date",
  path: ["endDate"],
}).refine((data) => {
  if (data.startDate === data.endDate) {
    const [startHour] = data.startTime.split(":").map(Number);
    const [endHour] = data.endTime.split(":").map(Number);
    return endHour >= startHour;
  }
  return true;
}, {
  message: "End time must be after or equal to start time",
  path: ["endTime"],
});

type FormData = z.infer<typeof schema>;

const services = [
  "Tax Preparation",
  "Tax Filing Assistance",
  "Financial Planning",
  "Small Business Accounting",
  "Refund Optimization",
  "Compliance & Audit Support",
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM",
];

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+1 (555) 234-5678" },
  { icon: Mail, label: "Email", value: "hello@skylinetaxes.com" },
  { icon: MapPin, label: "Office", value: "123 Tax Ave, Suite 400, New York, NY 10001" },
];

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08 }
    );
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll(".reveal").forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [ref]);
}

export default function AppointmentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef as React.RefObject<HTMLElement>);
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedModality, setSelectedModality] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1200));
    console.log("Appointment data:", data);
    setSubmitted(true);
    toast.success("Appointment request sent! We'll confirm within 24 hours.");
    reset();
    setSelectedService("");
    setSelectedModality("");
    setSelectedStartTime("");
    setSelectedEndTime("");
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="appointment" ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="container">

        {/* Section label */}
        <div className="reveal flex items-center gap-2 mb-12">
          <span className="section-label">Book an Appointment</span>
          <span className="w-8 h-px" style={{ backgroundColor: "rgb(48, 101, 152)" }} />
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Left: CTA panel */}
          <div className="reveal lg:col-span-2 rounded-2xl overflow-hidden relative min-h-[480px] flex flex-col justify-between p-8"
            style={{ backgroundImage: `url(${CTA_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute inset-0 bg-black/50 rounded-2xl" />
            <div className="relative z-10 flex flex-col h-full gap-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-semibold leading-tight text-white mb-4"
                  style={{ fontFamily: "var(--font-display)" }}>
                  Ready to maximize your refund?
                </h2>
                <p className="text-sm leading-relaxed text-white/80"
                  style={{ fontFamily: "var(--font-body)" }}>
                  Schedule a consultation at your convenience. Tell us your available dates and times, and we'll confirm an appointment that works for you.
                </p>
              </div>

              {/* Contact info */}
              <div className="flex flex-col gap-4">
                {contactInfo.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/20">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wider mb-0.5"
                        style={{ fontFamily: "var(--font-body)" }}>
                        {label}
                      </p>
                      <p className="text-sm text-white font-medium"
                        style={{ fontFamily: "var(--font-body)" }}>
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Office hours */}
              <div className="border-t border-white/20 pt-5">
                <p className="text-xs text-white/60 uppercase tracking-wider mb-2"
                  style={{ fontFamily: "var(--font-body)" }}>
                  Office Hours
                </p>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-white" style={{ fontFamily: "var(--font-body)" }}>
                    Mon – Fri: 9:00 AM – 5:00 PM
                  </p>
                  <p className="text-sm text-white/70" style={{ fontFamily: "var(--font-body)" }}>
                    Sat: 10:00 AM – 2:00 PM (by appointment)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking form */}
          <div className="reveal lg:col-span-3 bg-white rounded-2xl border border-border shadow-sm p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgb(240, 245, 250)" }}>
                  <CheckCircle2 className="w-8 h-8" style={{ color: "rgb(48, 101, 152)" }} />
                </div>
                <h3 className="text-2xl font-semibold"
                  style={{ fontFamily: "var(--font-display)", color: "rgb(28, 28, 30)" }}>
                  Request Received!
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}>
                  Thank you for reaching out. We'll review your availability and send a confirmation within 24 hours.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Book Another Appointment
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-1"
                    style={{ fontFamily: "var(--font-display)", color: "rgb(28, 28, 30)" }}>
                    Request an Appointment
                  </h3>
                  <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
                    Fill in the form below and we'll confirm your booking within 24 hours.
                  </p>
                </div>

                {/* Name row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="firstName" className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                      style={{ fontFamily: "var(--font-body)" }}>
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      {...register("firstName")}
                      className={`h-10 text-sm ${errors.firstName ? "border-destructive" : ""}`}
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-destructive">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="lastName" className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                      style={{ fontFamily: "var(--font-body)" }}>
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      {...register("lastName")}
                      className={`h-10 text-sm ${errors.lastName ? "border-destructive" : ""}`}
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-destructive">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Contact row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                      style={{ fontFamily: "var(--font-body)" }}>
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register("email")}
                      className={`h-10 text-sm ${errors.email ? "border-destructive" : ""}`}
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="phone" className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                      style={{ fontFamily: "var(--font-body)" }}>
                      Phone *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      {...register("phone")}
                      className={`h-10 text-sm ${errors.phone ? "border-destructive" : ""}`}
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Service */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    style={{ fontFamily: "var(--font-body)" }}>
                    Service Required *
                  </Label>
                  <Select
                    value={selectedService}
                    onValueChange={(val) => {
                      setSelectedService(val);
                      setValue("service", val, { shouldValidate: true });
                    }}
                  >
                    <SelectTrigger className={`h-10 text-sm ${errors.service ? "border-destructive" : ""}`}
                      style={{ fontFamily: "var(--font-body)" }}>
                      <SelectValue placeholder="Select a service..." />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s} value={s} style={{ fontFamily: "var(--font-body)" }}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.service && (
                    <p className="text-xs text-destructive">{errors.service.message}</p>
                  )}
                </div>

                {/* Appointment Modality */}
                <div className="flex flex-col gap-2.5">
                  <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    style={{ fontFamily: "var(--font-body)" }}>
                    Appointment Type *
                  </Label>
                  <div className="flex gap-4">
                    {[
                      { value: "in-person", label: "In-Person", icon: MapPin },
                      { value: "phone", label: "Phone Call", icon: Phone },
                    ].map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setSelectedModality(value);
                          setValue("modality", value as "in-person" | "phone", { shouldValidate: true });
                        }}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-200 ${
                          selectedModality === value
                            ? "border-primary bg-blue-50"
                            : "border-border hover:border-primary"
                        }`}
                        style={{
                          borderColor: selectedModality === value ? "rgb(48, 101, 152)" : undefined,
                          backgroundColor: selectedModality === value ? "rgb(240, 245, 250)" : undefined,
                        }}
                      >
                        <Icon className="w-4 h-4" style={{ color: selectedModality === value ? "rgb(48, 101, 152)" : "rgb(100, 110, 130)" }} />
                        <span className="text-sm font-medium"
                          style={{ color: selectedModality === value ? "rgb(48, 101, 152)" : "rgb(100, 110, 130)", fontFamily: "var(--font-body)" }}>
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>
                  {errors.modality && (
                    <p className="text-xs text-destructive">{errors.modality.message}</p>
                  )}
                </div>

                {/* Date Range */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="startDate" className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                      style={{ fontFamily: "var(--font-body)" }}>
                      <Calendar className="inline w-3 h-3 mr-1" />
                      Available From *
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      min={today}
                      {...register("startDate")}
                      className={`h-10 text-sm ${errors.startDate ? "border-destructive" : ""}`}
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                    {errors.startDate && (
                      <p className="text-xs text-destructive">{errors.startDate.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="endDate" className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                      style={{ fontFamily: "var(--font-body)" }}>
                      Available Until *
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      min={today}
                      {...register("endDate")}
                      className={`h-10 text-sm ${errors.endDate ? "border-destructive" : ""}`}
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                    {errors.endDate && (
                      <p className="text-xs text-destructive">{errors.endDate.message}</p>
                    )}
                  </div>
                </div>

                {/* Time Range */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                      style={{ fontFamily: "var(--font-body)" }}>
                      <Clock className="inline w-3 h-3 mr-1" />
                      Earliest Time *
                    </Label>
                    <Select
                      value={selectedStartTime}
                      onValueChange={(val) => {
                        setSelectedStartTime(val);
                        setValue("startTime", val, { shouldValidate: true });
                      }}
                    >
                      <SelectTrigger className={`h-10 text-sm ${errors.startTime ? "border-destructive" : ""}`}
                        style={{ fontFamily: "var(--font-body)" }}>
                        <SelectValue placeholder="Select time..." />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((t) => (
                          <SelectItem key={t} value={t} style={{ fontFamily: "var(--font-body)" }}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.startTime && (
                      <p className="text-xs text-destructive">{errors.startTime.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                      style={{ fontFamily: "var(--font-body)" }}>
                      Latest Time *
                    </Label>
                    <Select
                      value={selectedEndTime}
                      onValueChange={(val) => {
                        setSelectedEndTime(val);
                        setValue("endTime", val, { shouldValidate: true });
                      }}
                    >
                      <SelectTrigger className={`h-10 text-sm ${errors.endTime ? "border-destructive" : ""}`}
                        style={{ fontFamily: "var(--font-body)" }}>
                        <SelectValue placeholder="Select time..." />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((t) => (
                          <SelectItem key={t} value={t} style={{ fontFamily: "var(--font-body)" }}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.endTime && (
                      <p className="text-xs text-destructive">{errors.endTime.message}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="message" className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    style={{ fontFamily: "var(--font-body)" }}>
                    Additional Notes (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your tax situation or any specific questions..."
                    rows={3}
                    {...register("message")}
                    className="text-sm resize-none"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-12 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  style={{
                    backgroundColor: "rgb(48, 101, 152)",
                    color: "rgb(255, 255, 255)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending Request...
                    </span>
                  ) : (
                    "Request Appointment"
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
                  By submitting, you agree to our privacy policy. We'll never share your information.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
