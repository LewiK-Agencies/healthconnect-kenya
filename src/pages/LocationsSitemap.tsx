// HTML sitemap of every /locations/:city page — improves crawlability
// and gives users a single page link list of all served areas.

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, ListTree } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { locationRegions, allLocations } from "@/data/locations";

const LocationsSitemap = () => {
  useEffect(() => {
    document.title =
      "Locations Sitemap | HealthConnect Kenya Online Clinic";
    const ensure = (name: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      return el;
    };
    ensure("description").setAttribute(
      "content",
      `Complete sitemap of ${allLocations.length}+ Kenyan towns and neighborhoods served by HealthConnect Kenya online clinic and wellness shop.`,
    );
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute(
      "href",
      `${window.location.origin}/locations-sitemap`,
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/30 py-12 md:py-16 border-b border-border">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-widest mb-3">
              <ListTree className="w-4 h-4" /> Locations Sitemap
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              All {allLocations.length}+ Areas We Serve
            </h1>
            <p className="text-muted-foreground text-lg">
              A full directory of every Kenyan town and Nairobi neighborhood
              with a dedicated online clinic landing page.
            </p>
            <p className="mt-4">
              <Link
                to="/locations"
                className="inline-flex items-center gap-1.5 text-primary hover:underline text-sm"
              >
                <MapPin className="w-4 h-4" /> Back to interactive directory
              </Link>
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl space-y-10">
            {locationRegions.map((region) => (
              <div key={region.region}>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                  {region.region}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {region.description}
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {region.locations.map((loc) => (
                    <li key={loc.slug}>
                      <Link
                        to={`/locations/${loc.slug}`}
                        className="inline-flex items-center gap-1 text-foreground hover:text-primary hover:underline text-sm"
                      >
                        <ArrowRight className="w-3 h-3 text-primary" />
                        Online Clinic in {loc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default LocationsSitemap;
