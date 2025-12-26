import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Terms = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Terms & Conditions</h1>
        <div className="prose prose-lg text-muted-foreground space-y-6">
          <p>By using BeHealth Kenya services, you agree to these terms and conditions.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">Services</h2>
          <p>We provide online health consultations via WhatsApp and wellness products through our shop. All consultations are provided by licensed healthcare professionals.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">Payments</h2>
          <p>All payments are made via M-Pesa to Till Number 4342368. Payments are non-refundable once a consultation has been provided.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">User Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate health information</li>
            <li>Use the service for non-emergency health concerns only</li>
            <li>Follow professional advice given during consultations</li>
          </ul>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Terms;
