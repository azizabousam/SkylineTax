import { useEffect, useRef } from "react";
import { Award, CheckCircle2 } from "lucide-react";

const TEAM_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663605504559/6FWukh5HsU3A9vwvdw9MwV/team-accounting-2GDZWc4HhgkSEDM8nEmfyL.webp";

const timeline = [
  { year: "May 2003", title: "Our Journey", description: "Skyline Taxes Services was founded with a mission to provide exceptional tax preparation and financial planning services to individuals and small businesses." },
  { year: "January 2020", title: "Our Growth", description: "In 2021, we expanded our services to include comprehensive accounting solutions, helping our clients manage their finances more effectively." },
  { year: "March 2021", title: "Our Commitment", description: "By 2022, Skyline Taxes Services established a reputation for reliability and excellence in the tax services industry." },
  { year: "June 2022", title: "Our Future", description: "Looking ahead, we aim to innovate our services further and embrace technology to enhance client experiences." },
];

const values = [
  "Expert guidance from certified tax professionals",
  "Personalized services designed for your unique needs",
  "Transparent pricing with no hidden fees",
  "Dedicated support throughout the tax season",
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

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section id="about" ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="container">

        {/* Section label */}
        <div className="reveal flex items-center gap-2 mb-12">
          <span className="section-label">About Skyline Taxes</span>
          <span className="w-8 h-px" style={{ backgroundColor: "rgb(48, 101, 152)" }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Image */}
          <div className="reveal relative">
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[3/4] max-w-sm mx-auto lg:mx-0">
              <img
                src={TEAM_IMG}
                alt="Skyline Taxes team member"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating credential badge */}
            <div className="absolute -right-4 lg:-right-8 bottom-12 bg-white rounded-xl shadow-xl border border-border p-4 max-w-[180px]">
              <div className="text-3xl font-bold mb-0.5"
                style={{ fontFamily: "var(--font-display)", color: "rgb(48, 101, 152)" }}>
                20+
              </div>
              <p className="text-xs text-muted-foreground leading-snug">
                Years of professional tax expertise
              </p>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="reveal text-4xl lg:text-5xl font-semibold leading-tight mb-4"
                style={{ fontFamily: "var(--font-display)", color: "rgb(28, 28, 30)" }}>
                Your trusted partner in financial success.
              </h2>
              <p className="reveal text-base leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-body)" }}>
                Skyline Taxes Services was founded with a mission to provide exceptional tax preparation and financial planning services to individuals and small businesses. Our team of experienced tax professionals is dedicated to ensuring compliance and maximizing returns for our clients.
              </p>
            </div>

            {/* Timeline */}
            <div className="reveal">
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 text-muted-foreground"
                style={{ fontFamily: "var(--font-body)" }}>
                Our Story
              </h3>
              <div className="flex flex-col gap-4">
                {timeline.map(({ year, title, description }) => (
                  <div key={year} className="flex gap-3">
                    <div className="w-20 flex-shrink-0">
                      <span className="text-xs font-semibold" style={{ color: "rgb(48, 101, 152)", fontFamily: "var(--font-body)" }}>
                        {year}
                      </span>
                    </div>
                    <div className="flex-1 border-l border-border pl-4 pb-4">
                      <p className="text-sm font-semibold text-foreground mb-1"
                        style={{ fontFamily: "var(--font-body)" }}>
                        {title}
                      </p>
                      <p className="text-xs text-muted-foreground leading-snug"
                        style={{ fontFamily: "var(--font-body)" }}>
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Values */}
            <div className="reveal">
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 text-muted-foreground"
                style={{ fontFamily: "var(--font-body)" }}>
                Our Commitments
              </h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {values.map((val) => (
                  <div key={val} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "rgb(48, 101, 152)" }} />
                    <span className="text-sm text-muted-foreground leading-snug"
                      style={{ fontFamily: "var(--font-body)" }}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
