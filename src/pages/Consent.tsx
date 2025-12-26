import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Consent = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Consent for Online Consultation</h1>
        <div className="prose prose-lg text-muted-foreground space-y-6">
          <p>By engaging in an online consultation with BeHealth Kenya, you consent to the following:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>I understand that this is an online consultation via WhatsApp, not an in-person medical examination.</li>
            <li>I agree to provide accurate and complete health information.</li>
            <li>I understand the limitations of online consultations and that some conditions may require in-person examination.</li>
            <li>I consent to receive health advice and treatment recommendations from the healthcare provider.</li>
            <li>I understand that my information will be kept confidential as per the Privacy Policy.</li>
            <li>I confirm that this consultation is for non-emergency health concerns.</li>
          </ul>
          <p className="mt-8">By proceeding with a consultation, you confirm that you have read and agree to this consent.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Consent;
