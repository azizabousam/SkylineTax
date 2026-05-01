import { useEffect, useRef } from "react";
import {
  Calculator, FileText, TrendingUp, Building2,
  DollarSign, ShieldCheck, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SERVICES_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663605504559/6FWukh5HsU3A9vwvdw9MwV/services-accounting-efqWArY4QA4xjCVCMvS5Em.webp";

const services = [
  {
    icon: Calculator,
    title: "Tax Preparation",
    description:
      "Expert tax preparation for individuals and small businesses. We handle all filing requirements and ensure maximum compliance while identifying every deduction you're entitled to.",
    highlight: true,
  },
  {
    icon: FileText,
    title: "Tax Filing Assistance",
    description:
      "Comprehensive tax filing support to maximize your refunds. Our professionals review your entire financial situation to ensure you receive the maximum tax benefits.",
    highlight: false,
  },
  {
    icon: TrendingUp,
    title: "Financial Planning",
    description:
      "Personalized financial planning services designed to meet your unique goals. We help you build a roadmap for long-term financial success and wealth accumulation.",
    highlight: false,
  },
  {
    icon: Building2,
    title: "Small Business Accounting",
    description:
      "Comprehensive accounting solutions specifically designed for small businesses. We help you manage finances effectively and make informed business decisions.",
    highlight: false,
  },
  {
    icon: DollarSign,
    title: "Refund Optimization",
    description:
      "Strategic tax planning to maximize your refunds. We identify all available credits and deductions to ensure you keep more of your hard-earned money.",
    highlight: false,
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Audit Support",
    description:
      "Full compliance support and audit assistance. We ensure your tax filings meet all regulatory requirements and represent you professionally with tax authorities.",
    highlight: false,
  },
];

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll(".reveal").forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [ref]);
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef as React.RefObject<HTMLElement>);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" ref={sectionRef} className="py-24 lg:py-32"
      style={{ backgroundColor: "rgb(250, 250, 248)" }}>
      <div className="container">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="reveal flex items-center gap-2 mb-4">
              <span className="section-label">Our Services</span>
              <span className="w-8 h-px" style={{ backgroundColor: "rgb(48, 101, 152)" }} />
            </div>
            <h2 className="reveal text-4xl lg:text-5xl font-semibold leading-tight"
              style={{ fontFamily: "var(--font-display)", color: "rgb(28, 28, 30)" }}>
              Comprehensive tax services for every financial situation.
            </h2>
          </div>
          <div className="reveal">
            <Button
              variant="outline"
              onClick={() => scrollTo("#appointment")}
              className="group text-sm font-medium border-border hover:border-primary transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Schedule a Consultation
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Two-column layout: services grid + feature image */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Services grid — 3 cols spanning 3/5 */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className={`reveal group rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    service.highlight
                      ? "border-blue-200 bg-blue-50"
                      : "border-border bg-white"
                  }`}
                  style={{
                    transitionDelay: `${i * 60}ms`,
                    borderColor: service.highlight ? "rgb(200, 210, 230)" : undefined,
                    backgroundColor: service.highlight ? "rgb(240, 245, 250)" : undefined,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: service.highlight
                        ? "rgb(48, 101, 152)"
                        : "rgb(240, 245, 250)",
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{
                        color: service.highlight
                          ? "rgb(255, 255, 255)"
                          : "rgb(48, 101, 152)",
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 leading-snug"
                    style={{ fontFamily: "var(--font-display)", color: "rgb(28, 28, 30)" }}>
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground"
                    style={{ fontFamily: "var(--font-body)" }}>
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Feature image — 2/5 */}
          <div className="reveal lg:col-span-2 sticky top-24">
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
              <img
                src={SERVICES_IMG}
                alt="Tax preparation and financial planning"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Caption card */}
            <div className="mt-4 bg-white rounded-xl border border-border p-5 shadow-sm">
              <p className="text-sm font-medium mb-1" style={{ color: "rgb(48, 101, 152)", fontFamily: "var(--font-body)" }}>
                Free Initial Consultation
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Not sure if we're the right fit? Book a complimentary consultation to discuss your tax needs with no obligation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
