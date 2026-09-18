import React, { useState } from "react";
import { X, Calendar, MapPin, Video, CheckCircle2 } from "lucide-react";

type AppointmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const [salonType, setSalonType] = useState<"in-person" | "virtual">("virtual");
  const [location, setLocation] = useState("Mumbai Flagship - Colaba");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("2026-09-22");
  const [categoryInterest, setCategoryInterest] = useState("Bridal & Solitaires");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-[#f8f5ef] border border-black/15 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-black/15 pb-4">
          <div>
            <p className="text-[9px] tracking-[0.3em] text-black/40 uppercase">Private Client Services</p>
            <h3 className="font-serif text-3xl mt-1 text-[#161513]">Book an Appointment</h3>
          </div>
          <button onClick={onClose} className="p-1 text-black/40 hover:text-black">
            <X size={20} strokeWidth={1.2} />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center">
            <CheckCircle2 size={42} strokeWidth={1.2} className="mx-auto text-[#161513]" />
            <h4 className="mt-4 font-serif text-2xl">Appointment Reserved</h4>
            <p className="mt-3 text-xs leading-6 text-black/60 max-w-sm mx-auto">
              Thank you, {name}. Our Master Jewellery Specialist will connect with you shortly at <strong>{phone || email}</strong> to confirm your private {salonType === "virtual" ? "virtual consultation" : `visit to our ${location}`}.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-6 bg-[#161513] text-white px-8 py-3 text-[9px] tracking-[0.25em] uppercase hover:bg-[#292724]"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-2">
                Consultation Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSalonType("virtual")}
                  className={`flex items-center justify-center gap-2 py-3 px-3 border text-xs transition ${
                    salonType === "virtual"
                      ? "border-[#161513] bg-[#161513] text-white"
                      : "border-black/15 bg-white/40 hover:border-black/40"
                  }`}
                >
                  <Video size={14} /> Virtual Video Salon
                </button>
                <button
                  type="button"
                  onClick={() => setSalonType("in-person")}
                  className={`flex items-center justify-center gap-2 py-3 px-3 border text-xs transition ${
                    salonType === "in-person"
                      ? "border-[#161513] bg-[#161513] text-white"
                      : "border-black/15 bg-white/40 hover:border-black/40"
                  }`}
                >
                  <MapPin size={14} /> Private Salon
                </button>
              </div>
            </div>

            {salonType === "in-person" && (
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-2">
                  Select Atelier Salon
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-white/60 border border-black/15 p-3 text-xs outline-none"
                >
                  <option>Mumbai Flagship - Colaba Atelier</option>
                  <option>Delhi - Chanakyapuri Gallery</option>
                  <option>Bengaluru - UB City Suite</option>
                  <option>London - Mayfair Salon</option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-2">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alisha Kapoor"
                  className="w-full bg-white/60 border border-black/15 p-3 text-xs outline-none placeholder:text-black/30"
                />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-white/60 border border-black/15 p-3 text-xs outline-none placeholder:text-black/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@domain.com"
                  className="w-full bg-white/60 border border-black/15 p-3 text-xs outline-none placeholder:text-black/30"
                />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-2">
                  Preferred Date
                </label>
                <div className="flex items-center border border-black/15 bg-white/60 px-3 py-2.5">
                  <Calendar size={15} className="mr-2 text-black/40" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent text-xs outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[9px] tracking-[0.2em] uppercase text-black/50 mb-2">
                Pieces of Interest
              </label>
              <select
                value={categoryInterest}
                onChange={(e) => setCategoryInterest(e.target.value)}
                className="w-full bg-white/60 border border-black/15 p-3 text-xs outline-none"
              >
                <option>Bridal Trousseau & High Jewellery</option>
                <option>Natural Diamond Solitaires & Engagement</option>
                <option>Custom Heirlooms & Redesigning</option>
                <option>Everyday Fine Gold & Chains</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-[#161513] text-white py-4 text-[9px] tracking-[0.25em] hover:bg-[#292724] transition uppercase"
            >
              CONFIRM APPOINTMENT REQUEST
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
