import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Privacy = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
        <div className="prose prose-lg text-muted-foreground space-y-6">
          <p>At HealthConnect Kenya, your privacy is our top priority. We are committed to protecting your personal and health information.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Contact information (phone number, name)</li>
            <li>Health information shared during consultations</li>
            <li>Payment information (M-Pesa transaction details)</li>
          </ul>
          <h2 className="text-xl font-semibold text-foreground mt-8">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide healthcare consultations</li>
            <li>To process orders and payments</li>
            <li>To communicate with you about your care</li>
          </ul>
          <h2 className="text-xl font-semibold text-foreground mt-8">Confidentiality</h2>
          <p>All health information shared during consultations is kept strictly confidential. We do not share your personal or health information with third parties without your consent.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Privacy;
