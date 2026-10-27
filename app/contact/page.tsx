"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiClock,
  FiMessageSquare,
} from "react-icons/fi";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Thank you! Your message has been sent successfully.");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 800);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400">
          Get in Touch
        </span>
        <h1 className="mt-4 text-3xl font-black text-white sm:text-5xl">
          Contact Our Team
        </h1>
        <p className="mt-4 text-base text-zinc-400">
          Have a question about an order, product, or partnership? Send us a
          message and our support team will reply within 24 hours.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Info Cards */}
        <div className="space-y-4">
          <div className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-[#202020] p-6 shadow-xl">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <FiMail size={22} />
            </div>
            <div>
              <h3 className="font-semibold text-white">Email Us</h3>
              <p className="mt-1 text-sm text-zinc-400">
                support@shopbog.example.com
              </p>
              <p className="text-xs text-zinc-500">Fast response within 24h</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-[#202020] p-6 shadow-xl">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <FiPhone size={22} />
            </div>
            <div>
              <h3 className="font-semibold text-white">Call Support</h3>
              <p className="mt-1 text-sm text-zinc-400">+1 (800) 555-0199</p>
              <p className="text-xs text-zinc-500">Mon &ndash; Fri from 9am to 6pm</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-[#202020] p-6 shadow-xl">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
              <FiMapPin size={22} />
            </div>
            <div>
              <h3 className="font-semibold text-white">Headquarters</h3>
              <p className="mt-1 text-sm text-zinc-400">
                100 Innovation Way, Suite 400
              </p>
              <p className="text-xs text-zinc-500">Silicon Valley, CA, USA</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-[#202020] p-6 shadow-xl">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <FiClock size={22} />
            </div>
            <div>
              <h3 className="font-semibold text-white">Working Hours</h3>
              <p className="mt-1 text-sm text-zinc-400">
                24/7 Online Order Fulfillment
              </p>
              <p className="text-xs text-zinc-500">Customer chat available 24/7</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-3xl border border-zinc-800 bg-[#202020] p-6 shadow-2xl sm:p-8 lg:col-span-2">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <FiMessageSquare size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Send a Message</h2>
              <p className="text-xs text-zinc-400">
                Fill out the form below and we will get back to you shortly.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-zinc-400">
                Subject
              </label>
              <input
                type="text"
                placeholder="How can we help you?"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-zinc-400">
                Message *
              </label>
              <textarea
                required
                rows={5}
                placeholder="Write your message here..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 disabled:opacity-50 sm:w-auto"
            >
              <FiSend size={16} />
              {loading ? "Sending Message..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
