"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, Github, Linkedin, Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim() || form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }
  return errors;
}

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/fatmazaki",
    handle: "@fatmazaki",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/fatmazaki",
    handle: "Fatma Zaki",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:fatmazaki712@gmail.com",
    handle: "fatmazaki712@gmail.com",
  },
];

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus("loading");
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1500));
    setStatus("success");
    setForm({ name: "", email: "", message: "" });
    setTouched({});
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section
      id="contact"
      className="section-padding dark:bg-dark-bg bg-light-bg relative overflow-hidden"
    >
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gold/3 dark:bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-60 h-60 rounded-full bg-gold/2 dark:bg-gold/3 blur-3xl pointer-events-none" />

      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-gold mb-3">
            Let&apos;s talk
          </p>
          <h2 className="section-title dark:text-gray-100 text-gray-900 mb-4">
            Get In Touch
          </h2>
          <div className="divider-gold" />
          <p className="mt-6 dark:text-gray-400 text-gray-600 max-w-lg mx-auto text-sm leading-relaxed">
            Have a project in mind, or just want to say hi? I&apos;d love to hear from you. I&apos;m always open to new opportunities and collaborations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-heading text-xl font-bold dark:text-gray-100 text-gray-900 mb-2">
                Let&apos;s build something{" "}
                <span className="text-gradient-gold">remarkable</span>
              </h3>
              <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">
                Whether you need a new web app, a UI redesign, or just a coffee chat about tech — reach out and I&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {/* Quick Info */}
            <div className="space-y-4">
              {[
                { icon: MapPin, label: "Location", value: "Cairo, Egypt" },
                { icon: Phone, label: "Response time", value: "Within 24 hours" },
                { icon: Mail, label: "Email", value: "fatmazaki712@gmail.com" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 dark:bg-gold/15 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <item.icon size={15} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs dark:text-gray-500 text-gray-400">{item.label}</p>
                    <p className="text-sm dark:text-gray-200 text-gray-700 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] dark:text-gray-500 text-gray-400 mb-4">
                Find me on
              </p>
              <div className="flex flex-col gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className="w-9 h-9 rounded-lg dark:bg-dark-card bg-white border dark:border-dark-border border-light-border
                                 flex items-center justify-center group-hover:border-gold/40 group-hover:bg-gold/5 transition-all"
                    >
                      <social.icon size={14} className="dark:text-gray-400 text-gray-500 group-hover:text-gold transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs dark:text-gray-500 text-gray-400">{social.label}</p>
                      <p className="text-xs dark:text-gray-300 text-gray-600 group-hover:text-gold dark:group-hover:text-gold transition-colors font-medium">
                        {social.handle}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div
              className="dark:bg-dark-card bg-white border dark:border-dark-border border-light-border
                         rounded-2xl p-7 sm:p-8 relative overflow-hidden"
            >
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 flex flex-col items-center justify-center dark:bg-dark-card bg-white rounded-2xl z-20 gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                    >
                      <CheckCircle2 size={48} className="text-gold" />
                    </motion.div>
                    <div className="text-center">
                      <h4 className="font-heading text-xl font-bold dark:text-gray-100 text-gray-900 mb-2">
                        Message Sent!
                      </h4>
                      <p className="text-sm dark:text-gray-400 text-gray-600">
                        Thanks for reaching out. I&apos;ll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label className="block text-xs font-medium dark:text-gray-300 text-gray-700 mb-2 tracking-wide">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Fatma Zaki"
                    className={cn(
                      "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200",
                      "dark:bg-dark-bg bg-light-card border",
                      "dark:text-gray-200 text-gray-800",
                      "dark:placeholder:text-gray-600 placeholder:text-gray-400",
                      "focus:border-gold/60 focus:shadow-[0_0_0_3px_rgba(201,162,39,0.1)]",
                      errors.name && touched.name
                        ? "border-red-500/60"
                        : "dark:border-dark-border border-light-border"
                    )}
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium dark:text-gray-300 text-gray-700 mb-2 tracking-wide">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="hello@example.com"
                    className={cn(
                      "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200",
                      "dark:bg-dark-bg bg-light-card border",
                      "dark:text-gray-200 text-gray-800",
                      "dark:placeholder:text-gray-600 placeholder:text-gray-400",
                      "focus:border-gold/60 focus:shadow-[0_0_0_3px_rgba(201,162,39,0.1)]",
                      errors.email && touched.email
                        ? "border-red-500/60"
                        : "dark:border-dark-border border-light-border"
                    )}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium dark:text-gray-300 text-gray-700 mb-2 tracking-wide">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    placeholder="Tell me about your project or just say hello..."
                    className={cn(
                      "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none",
                      "dark:bg-dark-bg bg-light-card border",
                      "dark:text-gray-200 text-gray-800",
                      "dark:placeholder:text-gray-600 placeholder:text-gray-400",
                      "focus:border-gold/60 focus:shadow-[0_0_0_3px_rgba(201,162,39,0.1)]",
                      errors.message && touched.message
                        ? "border-red-500/60"
                        : "dark:border-dark-border border-light-border"
                    )}
                  />
                  <div className="flex justify-between items-center mt-1.5">
                    {errors.message && touched.message ? (
                      <p className="text-red-400 text-xs">{errors.message}</p>
                    ) : (
                      <span />
                    )}
                    <span className="text-[10px] dark:text-gray-600 text-gray-400">
                      {form.message.length}/500
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: status === "loading" ? 1 : 1.01 }}
                  whileTap={{ scale: status === "loading" ? 1 : 0.99 }}
                  className={cn(
                    "w-full btn-primary flex items-center justify-center gap-2 text-sm",
                    status === "loading" && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {status === "loading" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-dark-bg/30 border-t-dark-bg rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
