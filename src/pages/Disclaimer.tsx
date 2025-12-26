import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Disclaimer = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Medical Disclaimer</h1>
        <div className="prose prose-lg text-muted-foreground space-y-6">
          <p>The information provided by BeHealth Kenya is for general informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">Important Points</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>This service is NOT for medical emergencies. Call emergency services or visit the nearest hospital for emergencies.</li>
            <li>Supplements and wellness products do not replace medical treatment prescribed by your doctor.</li>
            <li>Always seek the advice of your physician for any medical condition.</li>
            <li>Consultations are provided online only via WhatsApp.</li>
            <li>Our healthcare providers are licensed professionals in Kenya.</li>
          </ul>
          <p className="mt-8">By using our services, you acknowledge and agree to this disclaimer.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Disclaimer;
