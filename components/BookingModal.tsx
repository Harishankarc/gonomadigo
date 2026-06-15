"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiSend } from "react-icons/fi";
import { Input, Select } from "antd";

const { TextArea } = Input;

const WHATSAPP_NUMBER = "919567130348";

const TRIP_TYPES = [
  "Honeymoon",
  "Family",
  "Adventure",
  "Friends & Group",
  "Solo",
  "Corporate",
];

export default function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [tripType, setTripType] = useState(TRIP_TYPES[0]);
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      "Hi Gonomadigo! I'd like to book an adventure.",
      "",
      `Name: ${name}`,
      `Trip Type: ${tripType}`,
      `Contact Number: ${contact}`,
    ];
    if (note.trim()) lines.push(`Note: ${note.trim()}`);

    const message = lines.join("\n");
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );

    setName("");
    setTripType(TRIP_TYPES[0]);
    setContact("");
    setNote("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1001] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[460px] max-h-[90vh] overflow-y-auto rounded-2xl border border-[#74B026]/15 bg-[#04140a] p-6 sm:p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/40 hover:text-[#74B026] hover:border-[#74B026]/30 transition-colors duration-300"
            >
              <FiX className="w-4 h-4" />
            </button>

            <h2 className="font-display text-2xl sm:text-3xl italic mb-1 text-[#F3FFE7]">
              Book Your <span className="text-[#74B026]">Adventure</span>
            </h2>
            <p className="text-sm text-white/45 font-light mb-6">
              Share a few details and we&apos;ll continue the conversation on WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="gn-booking-form flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/35">
                  Name
                </label>
                <Input
                  size="large"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs  text-white/35">
                  Trip Type
                </label>
                <Select
                  size="large"
                  value={tripType}
                  onChange={(value) => setTripType(value)}
                  options={TRIP_TYPES.map((type) => ({ value: type, label: type }))}
                  className="w-full"
                  popupClassName="gn-booking-dropdown"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs  text-white/35">
                  Contact Number
                </label>
                <Input
                  size="large"
                  type="tel"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Your phone number"
                  
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs  text-white/35">
                  Note
                </label>
                <TextArea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Dates, destination, group size, anything else..."
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="mt-2 flex items-center justify-center gap-2 w-full rounded-full bg-[#74B026] text-white font-medium py-3.5 hover:scale-[1.02] transition-transform duration-300"
              >
                Continue on WhatsApp
                <FiSend className="w-4 h-4" />
              </button>
            </form>

            <style jsx global>{`
              .gn-booking-form .ant-input,
              .gn-booking-form .ant-input-affix-wrapper,
              .gn-booking-form .ant-select {
                background-color: #0a2415 !important;
                border-color: rgba(116, 176, 38, 0.18) !important;
                color: #f3ffe7 !important;
              }

              .gn-booking-form .ant-input,
              .gn-booking-form .ant-select-content,
              .gn-booking-form .ant-select-input {
                font-size: 13px !important;
              }

              .gn-booking-form .ant-input::placeholder,
              .gn-booking-form .ant-select-placeholder {
                color: rgba(243, 255, 231, 0.35) !important;
              }

              .gn-booking-form .ant-select-suffix {
                color: rgba(243, 255, 231, 0.4);
              }

              .gn-booking-form .ant-input:hover,
              .gn-booking-form .ant-input:focus,
              .gn-booking-form .ant-input-affix-wrapper:hover,
              .gn-booking-form .ant-select:hover,
              .gn-booking-form .ant-select-focused {
                background-color: #0d2e1a !important;
                border-color: rgba(116, 176, 38, 0.4) !important;
              }

              .gn-booking-form .ant-input:focus,
              .gn-booking-form .ant-input-focused,
              .gn-booking-form .ant-select-focused {
                box-shadow: 0 0 0 2px rgba(116, 176, 38, 0.15) !important;
              }

              .gn-booking-dropdown,
              .gn-booking-dropdown .rc-virtual-list-holder-inner {
                background-color: #0a2415 !important;
              }

              .gn-booking-dropdown .ant-select-item {
                font-size: 13px;
                color: #f3ffe7;
              }

              .gn-booking-dropdown .ant-select-item-option-active,
              .gn-booking-dropdown .ant-select-item-option-selected {
                background-color: rgba(116, 176, 38, 0.18) !important;
                color: #f3ffe7;
              }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
