import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Target, Eye, Shield, Heart, Phone, Stethoscope, Apple } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Lewis Muli Keli",
      role: "Clinical Officer",
      specialization: "Dermatology & Reproductive Health",
      description: "Licensed clinical officer with extensive experience in dermatology consultations and reproductive health care. Committed to providing confidential, professional healthcare via WhatsApp.",
      phone: "254790425578",
      icon: Stethoscope,
      color: "bg-primary/10 text-primary",
    },
    {
      name: "Faith Mukai Masila",
      role: "Nutritionist & Mental Health Counselor",
      specialization: "Nutrition & Mental Wellness",
      description: "Certified nutritionist and mental health counselor passionate about helping clients achieve optimal health through personalized nutrition plans and emotional support.",
      phone: "25476928470",
      icon: Apple,
      color: "bg-green-light text-green",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Confidentiality",
      description: "Your privacy is sacred. All consultations are completely confidential and secure.",
    },
    {
      icon: Heart,
      title: "Compassion",
      description: "We treat every client with empathy, understanding, and non-judgmental care.",
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We maintain the highest standards of professional healthcare delivery.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-sky py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Your Trusted Healthcare Partner
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              HealthConnect Kenya was founded to make quality healthcare accessible to all Kenyans through confidential online consultations.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="bg-card rounded-2xl p-8 md:p-10 border border-border">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To provide affordable, confidential, and professional healthcare services to all Kenyans through accessible online consultations. We believe that quality healthcare should not be limited by location, stigma, or cost.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 md:p-10 border border-border">
                <div className="w-14 h-14 rounded-2xl bg-amber-light flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-amber" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To become Kenya's most trusted online healthcare platform, expanding access to quality medical consultations, wellness products, and health education for every Kenyan, regardless of their circumstances.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                The principles that guide everything we do at HealthConnect Kenya.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-8 border border-border text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Licensed healthcare professionals dedicated to your wellbeing.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl ${member.color} flex items-center justify-center flex-shrink-0`}>
                      <member.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                      <p className="text-muted-foreground text-sm">{member.specialization}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {member.description}
                  </p>
                  <a
                    href={`https://wa.me/${member.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="whatsapp" className="w-full gap-2">
                      <Phone className="w-4 h-4" />
                      Chat with {member.name.split(" ")[0]}
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default About;
