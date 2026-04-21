// Kenyan locations served by HealthConnect Kenya — used for SEO landing pages.
// Slugs are URL-friendly versions of the city/neighborhood names.

export interface Location {
  name: string;
  slug: string;
}

export interface LocationRegion {
  region: string;
  description: string;
  locations: Location[];
}

const toSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const make = (names: string[]): Location[] =>
  names.map((name) => ({ name, slug: toSlug(name) }));

export const locationRegions: LocationRegion[] = [
  {
    region: "Major Cities & Towns",
    description: "Kenya's largest urban centres served by our online clinic.",
    locations: make([
      "Nairobi",
      "Mombasa",
      "Kisumu",
      "Nakuru",
      "Eldoret",
      "Thika",
      "Malindi",
      "Kitale",
      "Garissa",
      "Kakamega",
      "Naivasha",
      "Nanyuki",
      "Machakos",
    ]),
  },
  {
    region: "Nairobi — Westlands & Upper Suburbs",
    description: "Premium residential neighborhoods in western Nairobi.",
    locations: make([
      "Westlands",
      "Kilimani",
      "Lavington",
      "Loresho",
      "Parklands",
      "Riverside",
      "Hurlingham",
      "Kileleshwa",
      "Spring Valley",
      "Kyuna",
      "Nyari",
    ]),
  },
  {
    region: "Nairobi — Karen, Langata & Southern Suburbs",
    description: "Family-focused estates in southern Nairobi.",
    locations: make([
      "Karen",
      "Langata",
      "South C",
      "South B",
      "Adams Arcade",
      "Riara",
      "Ngong",
      "Kiserian",
      "Ongata Rongai",
    ]),
  },
  {
    region: "Nairobi — Diplomatic & Northern Suburbs",
    description: "Diplomatic enclaves and upmarket northern estates.",
    locations: make([
      "Runda",
      "Muthaiga",
      "Gigiri",
      "Rosslyn",
      "Ridgeways",
      "Garden Estate",
      "Windsor",
      "Thome",
      "Mountain View",
    ]),
  },
  {
    region: "Nairobi — Eastlands & Embakasi",
    description: "Vibrant residential neighborhoods in eastern Nairobi.",
    locations: make([
      "Donholm",
      "Buruburu",
      "Embakasi",
      "Pipeline",
      "Utawala",
      "Imara Daima",
      "Nyayo Estate",
      "Tassia",
      "Fedha",
      "Tel Aviv",
      "Savannah",
      "Greenspan",
      "Komarock",
      "Kayole",
      "Umoja",
      "Innercore",
      "Tena",
      "Pangani",
    ]),
  },
  {
    region: "Nairobi — Kasarani & Northern Estates",
    description: "Fast-growing residential zones along Thika Road.",
    locations: make([
      "Kasarani",
      "Roysambu",
      "Zimmerman",
      "Githurai",
      "Kahawa Sukari",
      "Kahawa Wendani",
      "Mirema",
      "Safaricom",
      "Miraa",
    ]),
  },
  {
    region: "Nairobi — Dagoretti & Western Estates",
    description: "Communities along Naivasha and Waiyaki Way corridors.",
    locations: make([
      "Kangemi",
      "Kawangware",
      "Dagoretti",
      "Satellite",
      "Riruta",
      "Uthiru",
      "Kinoo",
      "Gitaru",
      "Lower Kabete",
      "Kabete",
    ]),
  },
  {
    region: "Kiambu County",
    description: "Booming towns surrounding the capital.",
    locations: make([
      "Ruiru",
      "Juja",
      "Kikuyu",
      "Limuru",
      "Tigoni",
      "Kiambu Town",
      "Karuri",
      "Ruaka",
      "Banana",
      "Ndenderu",
      "Wangige",
    ]),
  },
  {
    region: "Machakos & Kajiado (Greater Nairobi Metro)",
    description: "Metropolitan satellite towns south of the capital.",
    locations: make([
      "Syokimau",
      "Mlolongo",
      "Athi River",
      "Kitengela",
    ]),
  },
  {
    region: "Coast Region",
    description: "Coastal cities and beach towns.",
    locations: make([
      "Nyali",
      "Bamburi",
      "Shanzu",
      "Mtwapa",
      "Diani",
    ]),
  },
];

export const allLocations: Location[] = locationRegions.flatMap(
  (region) => region.locations,
);

export const findLocationBySlug = (slug: string): Location | undefined =>
  allLocations.find((location) => location.slug === slug.toLowerCase());
