/*
 * TestimonialsSection — Skyline Taxes
 * Design: Warm off-white background, quote-accent border, staggered card grid.
 */
import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Jennifer Martinez",
    role: "Small Business Owner",
    quote:
      "Skyline Taxes helped me save over $8,000 on my business taxes this year. Their attention to detail and personalized approach made all the difference.",
    rating: 5,
    initials: "JM",
  },
  {
    name: "David Thompson",
    role: "Freelance Consultant",
    quote:
      "I was overwhelmed with my tax situation until I found Skyline Taxes. They made the entire process simple and stress-free. Highly recommend!",
    rating: 5,
    initials: "DT",
  },
  {
    name: "Sarah Johnson",
    role: "Accountant",
    quote:
      "As a fellow professional, I appreciate Skyline Taxes' thoroughness and expertise. They're trustworthy partners for any tax situation.",
    rating: 5,
    initials: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Real Estate Professional",
    quote:
      "Skyline Taxes maximized my refund and provided valuable tax planning advice for next year. Excellent service and support throughout.",
    rating: 5,
    initials: "MC",
  },
  {
    name: "Lisa Anderson",
    role: "Corporate Employee",
    quote:
      "I've been using Skyline Taxes for three years now. Their consistent quality and friendly service keep me coming back.",
    rating: 5,
    initials: "LA",
  },
  {
    name: "Robert Williams",
    role: "Retired Professional",
    quote:
      "Skyline Taxes helped me navigate complex tax issues in retirement. Their expertise gave me peace of mind.",
    rating: 5,
    initials: "RW",
  },
];

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll(".reveal").forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [ref]);
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 lg:py-32"
      style={{ backgroundColor: "rgb(245, 248, 252)" }}>
      <div className="container">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-lg">
            <div className="reveal flex items-center gap-2 mb-4">
              <span className="section-label">Client Stories</span>
              <span className="w-8 h-px" style={{ backgroundColor: "rgb(48, 101, 152)" }} />
            </div>
            <h2 className="reveal text-4xl lg:text-5xl font-semibold leading-tight"
              style={{ fontFamily: "var(--font-display)", color: "rgb(28, 28, 30)" }}>
              Trusted by hundreds of satisfied clients.
            </h2>
          </div>
          <div className="reveal flex items-center gap-3 bg-white rounded-xl border border-border px-5 py-4 shadow-sm self-start lg:self-auto">
            <div>
              <div className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)", color: "rgb(48, 101, 152)" }}>
                4.9
              </div>
              <div className="flex gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: "rgb(6, 186, 99)" }} />
                ))}
              </div>
            </div>
            <div className="border-l border-border pl-3">
              <p className="text-xs text-muted-foreground">Average rating</p>
              <p className="text-xs font-medium text-foreground">200+ reviews</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="reveal bg-white rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-current" style={{ color: "rgb(6, 186, 99)" }} />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="quote-accent mb-5">
                <p className="text-sm leading-relaxed text-muted-foreground italic"
                  style={{ fontFamily: "var(--font-body)" }}>
                  "{t.quote}"
                </p>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: "rgb(48, 101, 152)", fontFamily: "var(--font-body)" }}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground"
                    style={{ fontFamily: "var(--font-body)" }}>
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
