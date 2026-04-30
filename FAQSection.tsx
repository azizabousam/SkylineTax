/*
 * FAQSection — Skyline Taxes
 * Design: Clean accordion layout on white background, primary blue accents.
 */
import { useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What services do you offer?",
    a: "At Skyline Taxes, we provide a comprehensive range of tax services including tax preparation, financial planning, and accounting solutions tailored to meet the needs of individuals and small businesses. Our team of experienced tax professionals is dedicated to ensuring you receive the maximum benefits while complying with all regulations.",
  },
  {
    q: "How can I schedule a consultation?",
    a: "You can easily schedule a consultation by visiting our website and using the online booking system. Simply select your preferred dates, times, and appointment type (in-person or phone call), and we'll confirm your appointment within 24 hours.",
  },
  {
    q: "What are your fees for tax services?",
    a: "Our fees for tax services vary based on the complexity of your tax situation and the specific services required. We offer transparent pricing and will provide you with a detailed estimate after our initial consultation to ensure there are no surprises.",
  },
  {
    q: "Do you offer services for small businesses?",
    a: "Yes, we specialize in providing tax and accounting services specifically designed for small businesses. Our team understands the unique challenges faced by small business owners and is here to help you navigate your financial landscape effectively.",
  },
  {
    q: "What should I bring to my appointment?",
    a: "For your appointment, please bring all relevant financial documents, including your previous tax returns, W-2s, 1099s, and any other income or expense records. This will help us provide you with the most accurate and efficient service possible.",
  },
  {
    q: "How do you ensure my information is secure?",
    a: "We take your privacy seriously and implement strict security measures to protect your personal and financial information. Our systems are designed to comply with industry standards for data protection and confidentiality.",
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

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section id="faq" ref={sectionRef} className="py-24 lg:py-32"
      style={{ backgroundColor: "rgb(250, 250, 248)" }}>
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left: Header */}
          <div className="lg:col-span-2">
            <div className="reveal flex items-center gap-2 mb-4">
              <span className="section-label">FAQ</span>
              <span className="w-8 h-px" style={{ backgroundColor: "rgb(48, 101, 152)" }} />
            </div>
            <h2 className="reveal text-4xl lg:text-5xl font-semibold leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)", color: "rgb(28, 28, 30)" }}>
              Common questions, answered.
            </h2>
            <p className="reveal text-sm leading-relaxed text-muted-foreground"
              style={{ fontFamily: "var(--font-body)" }}>
              Have a question not listed here? Feel free to reach out directly — we're happy to help.
            </p>
          </div>

          {/* Right: Accordion */}
          <div className="reveal lg:col-span-3">
            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-white border border-border rounded-xl px-5 shadow-sm"
                >
                  <AccordionTrigger
                    className="text-sm font-semibold text-left py-4 hover:no-underline"
                    style={{ fontFamily: "var(--font-body)", color: "rgb(28, 28, 30)" }}
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="text-sm leading-relaxed text-muted-foreground pb-4"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
