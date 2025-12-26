import { useState } from "react";
import { MessageCircle, X, User } from "lucide-react";

const WhatsAppFloat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      name: "Lewis Muli Keli",
      role: "Clinical Officer",
      phone: "254790425578",
      services: "Dermatology & Reproductive Health",
    },
    {
      name: "Faith Mukai Masila",
      role: "Nutritionist & Mental Health",
      phone: "25476928470",
      services: "Nutrition & Mental Wellness",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Options */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-card rounded-2xl shadow-xl border border-border p-4 w-72 animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-foreground">Chat with us</h4>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <div className="space-y-3">
            {contacts.map((contact) => (
              <a
                key={contact.phone}
                href={`https://wa.me/${contact.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl bg-muted hover:bg-accent transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[hsl(142,70%,45%)] flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm group-hover:text-accent-foreground">
                    {contact.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{contact.role}</p>
                  <p className="text-xs text-primary mt-1">{contact.services}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Tap to start a WhatsApp chat
          </p>
        </div>
      )}

      {/* Float Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
          isOpen ? "rotate-90" : "hover:scale-110"
        }`}
        aria-label="Open WhatsApp chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default WhatsAppFloat;
