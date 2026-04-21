import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Search, Stethoscope, Star, ListTree } from "lucide-react";
import { useMemo, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { locationRegions, allLocations, findLocationBySlug } from "@/data/locations";
import { featuredCitySlugs } from "@/data/locationContent";

const Locations = () => {
  const [query, setQuery] = useState("");

  const filteredRegions = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return locationRegions;
    return locationRegions
      .map((region) => ({
        ...region,
        locations: region.locations.filter((loc) =>
          loc.name.toLowerCase().includes(term),
        ),
      }))
      .filter((region) => region.locations.length > 0);
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/30 py-16 md:py-24 border-b border-border">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-widest mb-4">
              <MapPin className="w-4 h-4" /> Service Locations
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5 leading-tight">
              Online Clinic Across Kenya
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Telemedicine services Nairobi and beyond — book a virtual doctor
              consultation in your neighborhood. Skip hospital traffic and
              consult a licensed clinician online today.
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search your town or estate..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 h-12 bg-background"
                aria-label="Search locations"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {allLocations.length}+ locations served countrywide ·{" "}
              <Link
                to="/locations-sitemap"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                <ListTree className="w-3 h-3" /> Full sitemap
              </Link>
            </p>
          </div>
        </section>

        {/* Featured cities — high-priority internal linking for SEO */}
        <section className="py-12 md:py-16 bg-background border-b border-border">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-amber fill-amber" />
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Most Booked Locations
              </h2>
            </div>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Explore our most-visited online clinic landing pages — covering
              Nairobi suburbs, major Kenyan towns and coastal cities.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {featuredCitySlugs
                .map((slug) => findLocationBySlug(slug))
                .filter((l): l is NonNullable<typeof l> => Boolean(l))
                .map((loc) => (
                  <Link
                    key={loc.slug}
                    to={`/locations/${loc.slug}`}
                    className="group flex items-center justify-between gap-3 px-5 py-4 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/30 border border-primary/20 hover:border-primary hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    <span className="flex items-center gap-2 text-foreground font-semibold">
                      <MapPin className="w-4 h-4 text-primary" />
                      Online Clinic in {loc.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Regions */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            {filteredRegions.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  No locations matched "{query}". Try another search.
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredRegions.map((region) => (
                  <div key={region.region}>
                    <div className="mb-6 pb-4 border-b border-border">
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        {region.region}
                      </h2>
                      <p className="text-muted-foreground">
                        {region.description}
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {region.locations.map((location) => (
                        <Link
                          key={location.slug}
                          to={`/locations/${location.slug}`}
                          className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-card border border-border hover:border-primary hover:shadow-md hover:-translate-y-0.5 transition-all"
                        >
                          <span className="flex items-center gap-2 text-foreground font-medium">
                            <MapPin className="w-4 h-4 text-primary" />
                            {location.name}
                          </span>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary/80">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <Stethoscope className="w-12 h-12 mx-auto mb-4 text-primary-foreground" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Don't see your area?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8">
              We provide affordable clinical care across all of Kenya. Book
              online today, wherever you are.
            </p>
            <Link to="/services">
              <Button variant="secondary" size="lg" className="gap-2">
                Book Consultation
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Locations;
