import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Clients Served" },
  { value: 20, suffix: "+", label: "Years in Business" },
  { value: 98, suffix: "%", label: "Refund Success Rate" },
  { value: 50, suffix: "M+", label: "Tax Savings Generated" },
  { value: 200, suffix: "+", label: "Five-Star Reviews" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const duration = 1500;
    const fps = 60;
    const totalFrames = (duration / 1000) * fps;
    const step = () => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.min(Math.round(eased * target), target));
      if (frame < totalFrames) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function TrustBar() {
  return (
    <section className="py-14" style={{ backgroundColor: "rgb(48, 101, 152)" }}>
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-1">
              <div className="text-3xl lg:text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}>
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "rgb(156, 175, 201)", fontFamily: "var(--font-body)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
