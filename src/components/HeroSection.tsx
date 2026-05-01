import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, TrendingUp, Users } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663605504559/6FWukh5HsU3A9vwvdw9MwV/hero-accounting-JV29sSDcqdT7mRQWwUzZnS.webp";

const stats = [
  { icon: Users, value: "500+", label: "Satisfied Clients" },
  { icon: TrendingUp, value: "98%", label: "Refund Success Rate" },
  { icon: ShieldCheck, value: "20+", label: "Years Experience" },
];

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const children = el.querySelectorAll(".hero-animate");
    children.forEach((child, i) => {
      (child as HTMLElement).style.opacity = "0";
      (child as HTMLElement).style.transform = "translateY(30px)";
      setTimeout(() => {
        (child as HTMLElement).style.transition = "opacity 0.7s ease, transform 0.7s ease";
        (child as HTMLElement).style.opacity = "1";
        (child as HTMLElement).style.transform = "translateY(0)";
      }, 100 + i * 150);
    });
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      style={{ backgroundColor: "rgb(250, 250, 248)" }}>

      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(28, 28, 30) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 lg:py-24">

          {/* Left: Text content */}
          <div ref={textRef} className="flex flex-col gap-6 lg:gap-8 max-w-xl">
            <div className="hero-animate flex items-center gap-2">
              <span className="section-label">Expert Tax Solutions</span>
              <span className="w-8 h-px" style={{ backgroundColor: "rgb(48, 101, 152)" }} />
            </div>

            <h1 className="hero-animate text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.08] tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "rgb(28, 28, 30)" }}>
              Unlock your{" "}
              <em className="not-italic" style={{ color: "rgb(48, 101, 152)" }}>
                financial potential.
              </em>
            </h1>

            <p className="hero-animate text-base lg:text-lg leading-relaxed"
              style={{ color: "rgb(80, 90, 110)", fontFamily: "var(--font-body)" }}>
              At Skyline Taxes, we provide comprehensive tax services tailored to meet your unique needs. Our team of experienced tax professionals is dedicated to ensuring your financial success through expert tax preparation, personalized financial planning, and tax filing assistance to maximize your refunds.
            </p>

            <div className="hero-animate flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={() => scrollTo("#appointment")}
                className="group text-sm font-semibold px-7 h-12 shadow-md hover:shadow-lg transition-all duration-300"
                style={{
                  backgroundColor: "rgb(48, 101, 152)",
                  color: "rgb(255, 255, 255)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Get Started Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("#services")}
                className="text-sm font-semibold px-7 h-12 border-border hover:border-primary transition-colors duration-300"
                style={{ fontFamily: "var(--font-body)", color: "rgb(28, 28, 30)" }}
              >
                Learn More
              </Button>
            </div>

            {/* Stats row */}
            <div className="hero-animate grid grid-cols-3 gap-4 pt-4 border-t border-border">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" style={{ color: "rgb(48, 101, 152)" }} />
                    <span className="text-xl font-bold"
                      style={{ fontFamily: "var(--font-display)", color: "rgb(28, 28, 30)" }}>
                      {value}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground"
                    style={{ fontFamily: "var(--font-body)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image with floating cards */}
          <div className="relative hidden lg:flex justify-end">
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full max-w-lg"
              style={{ aspectRatio: "4/3" }}>
              <img
                src={HERO_IMG}
                alt="Professional tax preparation office"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating card — availability */}
            <div className="absolute -left-8 bottom-10 bg-white rounded-xl shadow-xl p-4 w-48 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "rgb(6, 186, 99)" }} />
                <span className="text-xs font-semibold text-foreground">Available Now</span>
              </div>
              <p className="text-xs text-muted-foreground leading-snug">
                Schedule your free tax consultation this week — limited slots available.
              </p>
            </div>

            {/* Floating card — rating */}
            <div className="absolute -right-4 top-8 bg-white rounded-xl shadow-xl p-4 w-44 border border-border">
              <div className="text-2xl font-bold mb-0.5"
                style={{ fontFamily: "var(--font-display)", color: "rgb(48, 101, 152)" }}>
                4.9 ★
              </div>
              <p className="text-xs text-muted-foreground">Average client rating from 200+ reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
