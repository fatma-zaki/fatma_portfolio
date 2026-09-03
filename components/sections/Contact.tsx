"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Send,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { CircuitCorner } from "@/components/brand/Circuit";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brand, socialLinks } from "@/lib/brand";
import { cn } from "@/lib/utils";

const MESSAGE_LIMIT = 500;

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

const socialIcons: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

const contactDetails = [
  { icon: MapPin, label: "Location", value: brand.location },
  { icon: Clock, label: "Response time", value: "Within 24 hours" },
  { icon: Mail, label: "Email", value: brand.email },
];

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const showError = (field: keyof FormErrors) =>
    Boolean(errors[field] && touched[field]);

  return (
    <section
      id="contact"
      className="section-padding bg-deep relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-circuit-grid opacity-60 mask-fade-b pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-max relative" ref={ref}>
        <SectionHeading
          eyebrow="Let's build together"
          title="Get In Touch"
          description="Have a project in mind, or just want to say hi? I'd love to hear from you. I'm always open to new opportunities and collaborations."
          className="mb-16"
        />

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-9"
          >
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-[0.03em] text-primary mb-3">
                Let&apos;s build something{" "}
                <span className="text-gradient-gold">remarkable</span>
              </h3>
              <p className="text-sm text-secondary leading-relaxed">
                Whether you need a new web app, a UI redesign, or just a coffee chat
                about tech — reach out and I&apos;ll get back to you within 24 hours.
              </p>
            </div>

            <ul className="space-y-4">
              {contactDetails.map((item) => (
                <li key={item.label} className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-brand bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0">
                    <item.icon size={15} className="text-gold" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] text-muted tracking-[0.18em] uppercase">
                      {item.label}
                    </span>
                    <span className="block text-sm text-primary font-medium truncate">
                      {item.value}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted mb-4">
                Find me on
              </p>
              <ul className="flex flex-col gap-3">
                {socialLinks.map((social) => {
                  const Icon = socialIcons[social.key];
                  return (
                    <li key={social.key}>
                      <a
                        href={social.href}
                        target={social.key === "email" ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group w-fit"
                      >
                        <span className="w-9 h-9 rounded-brand bg-surface border border-line flex items-center justify-center group-hover:border-gold/45 transition-colors duration-200">
                          <Icon
                            size={14}
                            className="text-muted group-hover:text-gold transition-colors duration-200"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[10px] text-muted tracking-[0.18em] uppercase">
                            {social.label}
                          </span>
                          <span className="block text-xs text-secondary font-medium group-hover:text-gold-ink transition-colors duration-200 truncate">
                            {social.handle}
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="surface-card relative overflow-hidden p-6 sm:p-8">
              <CircuitCorner position="tr" />

              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    role="status"
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-surface rounded-card px-6"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                      className="inline-flex p-4 rounded-full bg-gold/10 border border-gold/30"
                    >
                      <CheckCircle2 size={32} className="text-gold" />
                    </motion.span>
                    <div className="text-center">
                      <h4 className="font-display text-lg font-bold tracking-[0.04em] text-primary mb-2">
                        Message Sent
                      </h4>
                      <p className="text-sm text-secondary">
                        Thanks for reaching out. I&apos;ll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="field-label">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your full name"
                    aria-invalid={showError("name")}
                    aria-describedby={showError("name") ? "contact-name-error" : undefined}
                    className={cn("field", showError("name") && "field-invalid")}
                  />
                  {showError("name") && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="text-danger text-xs mt-2 flex items-center gap-1.5"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="field-label">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="hello@example.com"
                    aria-invalid={showError("email")}
                    aria-describedby={showError("email") ? "contact-email-error" : undefined}
                    className={cn("field", showError("email") && "field-invalid")}
                  />
                  {showError("email") && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="text-danger text-xs mt-2"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="field-label">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    maxLength={MESSAGE_LIMIT}
                    placeholder="Tell me about your project or just say hello..."
                    aria-invalid={showError("message")}
                    aria-describedby={
                      showError("message") ? "contact-message-error" : undefined
                    }
                    className={cn(
                      "field resize-none",
                      showError("message") && "field-invalid"
                    )}
                  />
                  <div className="flex justify-between items-center gap-4 mt-2">
                    {showError("message") ? (
                      <p
                        id="contact-message-error"
                        role="alert"
                        className="text-danger text-xs"
                      >
                        {errors.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span className="text-[10px] font-mono text-muted flex-shrink-0">
                      {form.message.length}/{MESSAGE_LIMIT}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full"
                >
                  {status === "loading" ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-transparent border-t-current rounded-full"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
