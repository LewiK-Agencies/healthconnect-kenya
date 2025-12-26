import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-lg">HealthConnect</span>
                <span className="text-primary font-semibold text-sm block -mt-1">Kenya</span>
              </div>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-4">
              Your trusted online clinic for confidential, affordable, and professional healthcare. Consultations via WhatsApp.
            </p>
            <div className="flex items-center gap-2 text-sm text-background/70">
              <Clock className="w-4 h-4" />
              <span>Mon - Sat: 8:00 AM - 8:00 PM</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/services", label: "Our Services" },
                { href: "/pricing", label: "Pricing" },
                { href: "/shop", label: "Wellness Shop" },
                { href: "/how-it-works", label: "How It Works" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                "Dermatology Consultations",
                "Reproductive Health",
                "Nutrition Counseling",
                "Mental Health Support",
                "Wellness Products",
                "Health Coaching",
              ].map((service) => (
                <li key={service}>
                  <span className="text-background/70 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/254790425578"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-background/70 hover:text-primary transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Lewis: +254 790 425 578</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/25476928470"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-background/70 hover:text-primary transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Faith: +254 769 284 70</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-background/70 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-background/10 rounded-lg">
              <p className="text-xs text-background/70">
                <strong className="text-primary">M-Pesa Till:</strong> 4342368
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Links */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/60 text-sm">
              © {currentYear} HealthConnect Kenya. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {[
                { href: "/disclaimer", label: "Medical Disclaimer" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms & Conditions" },
                { href: "/consent", label: "Consent Form" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-background/60 hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
