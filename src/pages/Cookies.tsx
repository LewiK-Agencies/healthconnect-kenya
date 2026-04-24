import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Cookie, Shield, Settings2, Mail } from "lucide-react";

const Cookies = () => {
  useEffect(() => {
    document.title = "Cookie Policy — BeHealth Kenya";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Cookie className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">Legal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Cookie Policy</h1>
          <p className="text-sm text-muted-foreground mb-10">
            Last updated: {new Date().toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <div className="prose prose-lg text-muted-foreground space-y-6 max-w-none">
            <p>
              This Cookie Policy explains how <strong>BeHealth Kenya</strong> ("we", "us") uses cookies and similar
              technologies on our website. By using our site, you agree to the use of cookies as described below.
              Your consent choice is remembered for <strong>30 days</strong>, after which we will ask again.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-10 flex items-center gap-2">
              <Cookie className="w-5 h-5 text-primary" /> What are cookies?
            </h2>
            <p>
              Cookies are small text files placed on your device when you visit a website. We also use related
              technologies such as browser local storage to remember your preferences and improve your experience.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-10 flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-primary" /> How we use cookies
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Essential:</strong> remember your booking selections, your cookie consent choice, and keep
                the admin panel signed in for the session. The site cannot function without these.
              </li>
              <li>
                <strong>Functional:</strong> save site preferences (e.g. last selected category, location filters) so
                the site feels personal on repeat visits.
              </li>
              <li>
                <strong>Analytics:</strong> count anonymous page views and track booking completions so we can
                understand which services are most useful to Kenyan visitors. We do not sell or share this data.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground mt-10 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> Your control
            </h2>
            <p>
              You may delete cookies and local storage at any time from your browser settings. Doing so will reset
              your saved preferences and re-show the consent banner on your next visit.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-10">Third-party services</h2>
            <p>
              When you make a payment via our M-Pesa partner (PayHero), the embedded payment widget may set its
              own cookies. These are governed by PayHero's cookie policy.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-10 flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" /> Contact
            </h2>
            <p>
              Questions about this Cookie Policy? Reach us through the{" "}
              <a href="/contact" className="text-primary hover:underline">contact page</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;
