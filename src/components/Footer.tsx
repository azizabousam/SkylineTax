import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";

const footerLinks = {
  Services: [
    "Tax Preparation",
    "Tax Filing Assistance",
    "Financial Planning",
    "Small Business Accounting",
    "Refund Optimization",
    "Compliance & Audit Support",
  ],
  Company: ["About Us", "Our Team", "Careers", "Blog", "Press"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer id="contact" style={{ backgroundColor: "rgb(28, 28, 30)" }}>
      <div className="container py-16 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <p className="text-sm leading-relaxed"
              style={{ color: "rgb(180, 190, 210)", fontFamily: "var(--font-body)" }}>
              Skyline Taxes Services is a full-service tax firm dedicated to delivering clarity, precision, and strategic financial guidance to individuals and small businesses of all sizes.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-3">
              {[
                { icon: Phone, text: "+1 (555) 234-5678" },
                { icon: Mail, text: "hello@skylinetaxes.com" },
                { icon: MapPin, text: "123 Tax Ave, Suite 400, New York, NY 10001" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-2.5">
                  <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "rgb(48, 101, 152)" }} />
                  <span className="text-sm" style={{ color: "rgb(180, 190, 210)", fontFamily: "var(--font-body)" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
                  style={{ backgroundColor: "rgb(50, 60, 80)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgb(48, 101, 152)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgb(50, 60, 80)")}
                  onClick={() => {}}
                >
                  <Icon className="w-3.5 h-3.5 text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "rgb(48, 101, 152)", fontFamily: "var(--font-body)" }}>
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      className="text-sm text-left transition-colors duration-200 hover:text-white"
                      style={{ color: "rgb(140, 160, 190)", fontFamily: "var(--font-body)" }}
                      onClick={() => {}}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgb(50, 60, 80)" }}>
          <p className="text-xs" style={{ color: "rgb(100, 120, 150)", fontFamily: "var(--font-body)" }}>
            © {new Date().getFullYear()} Skyline Taxes Services. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs transition-colors duration-200 hover:text-white"
            style={{ color: "rgb(100, 120, 150)", fontFamily: "var(--font-body)" }}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
