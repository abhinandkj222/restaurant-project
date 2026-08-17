import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'failed to send message');
      }

      setSuccessMessage(
        'Your message has been sent successfully. We will get back to you soon.',
      );

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('contact form error:', error);

      setErrorMessage(
        error.message || 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#FFF8F1] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 h-64 w-64 rounded-full bg-orange-300/15 blur-3xl sm:h-80 sm:w-80" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative mx-auto w-full max-w-7xl">
        {/* ================= HEADER ================= */}

        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 lg:mb-16">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-orange-200 bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-orange-500 shadow-sm sm:px-4 sm:text-xs sm:tracking-[0.18em]">
            <Sparkles size={13} className="shrink-0 sm:h-[14px] sm:w-[14px]" />

            <span>Get in touch</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-950 sm:mt-5 sm:text-4xl lg:text-5xl">
            Let's start a conversation.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl px-2 text-sm leading-6 text-gray-500 sm:mt-4 sm:px-0 sm:text-base sm:leading-7">
            Have a question, feedback, or simply want to say hello? Our team
            would love to hear from you.
          </p>
        </div>

        {/* ================= MAIN CARD ================= */}

        <div className="grid w-full overflow-hidden rounded-[1.5rem] border border-orange-100/70 bg-white shadow-[0_20px_60px_rgba(71,45,25,0.08)] sm:rounded-[2rem] lg:grid-cols-[0.85fr_1.15fr] lg:rounded-[2.5rem]">
          {/* ================= LEFT ================= */}

          <div className="relative overflow-hidden bg-gray-950 p-5 text-white sm:p-8 lg:p-10">
            {/* Glow */}

            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl sm:h-72 sm:w-72" />

            <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-orange-600/10 blur-3xl sm:h-72 sm:w-72" />

            {/* Decorative Circle */}

            <div className="pointer-events-none absolute right-[-90px] top-[-90px] hidden h-64 w-64 rounded-full border border-white/5 sm:block" />

            <div className="relative">
              {/* Icon */}

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400 sm:h-11 sm:w-11">
                <Mail size={19} />
              </div>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-400 sm:mt-7 sm:text-xs sm:tracking-[0.2em]">
                Contact details
              </p>

              <h3 className="mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                We'd love to hear from you.
              </h3>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
                Reach out to us anytime. Whether it's a question, suggestion, or
                feedback, we're always happy to help.
              </p>

              {/* Contact Items */}

              <div className="mt-6 space-y-3 sm:mt-8">
                {/* Location */}

                <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 transition-all duration-300 hover:border-orange-400/20 hover:bg-white/[0.07] sm:p-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 transition group-hover:bg-orange-500 group-hover:text-white sm:h-10 sm:w-10">
                      <MapPin size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500 sm:text-xs">
                        Visit us
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-200">
                        Kochi, Kerala
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}

                <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 transition-all duration-300 hover:border-orange-400/20 hover:bg-white/[0.07] sm:p-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 transition group-hover:bg-orange-500 group-hover:text-white sm:h-10 sm:w-10">
                      <Phone size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500 sm:text-xs">
                        Call us
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-200">
                        +91 9876543210
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}

                <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 transition-all duration-300 hover:border-orange-400/20 hover:bg-white/[0.07] sm:p-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 transition group-hover:bg-orange-500 group-hover:text-white sm:h-10 sm:w-10">
                      <Mail size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500 sm:text-xs">
                        Email us
                      </p>

                      <p className="mt-1 break-all text-sm font-semibold text-gray-200 sm:break-normal">
                        info@savory.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hours */}

                <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 transition-all duration-300 hover:border-orange-400/20 hover:bg-white/[0.07] sm:p-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 transition group-hover:bg-orange-500 group-hover:text-white sm:h-10 sm:w-10">
                      <Clock size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500 sm:text-xs">
                        Opening hours
                      </p>

                      <div className="mt-1 space-y-0.5 text-xs leading-5 text-gray-300 sm:text-sm">
                        <p>Mon - Fri: 9 AM - 10 PM</p>
                        <p>Saturday: 10 AM - 11 PM</p>
                        <p>Sunday: 10 AM - 9 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Note */}

              <div className="mt-6 flex items-start gap-3 border-t border-white/10 pt-5 sm:mt-8 sm:pt-6">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-300">
                    We're here to help
                  </p>

                  <p className="mt-0.5 text-[10px] leading-4 text-gray-500 sm:text-[11px]">
                    Usually respond within one business day.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT / FORM ================= */}

          <div className="min-w-0 p-5 sm:p-8 lg:p-10">
            {/* Form Header */}

            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange-500 sm:text-xs sm:tracking-[0.18em]">
                  Send a message
                </p>

                <h3 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-gray-950 sm:text-3xl">
                  How can we help?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Fill in the details below and we'll get back to you.
                </p>
              </div>

              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 sm:flex sm:h-11 sm:w-11">
                <ArrowUpRight size={19} />
              </div>
            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4 sm:mt-7 sm:space-y-5"
            >
              {/* Name + Email */}

              <div className="grid min-w-0 gap-4 sm:grid-cols-2 sm:gap-5">
                {/* Name */}

                <div className="min-w-0">
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Your Name
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="h-12 w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                {/* Email */}

                <div className="min-w-0">
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Email Address
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="h-12 w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Subject */}

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Subject
                </label>

                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What would you like to talk about?"
                  required
                  className="h-12 w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </div>

              {/* Message */}

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  required
                  className="min-h-[130px] w-full min-w-0 resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 sm:min-h-[140px]"
                />
              </div>

              {/* Success */}

              {successMessage && (
                <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3.5 text-sm font-medium leading-5 text-green-700">
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-green-500"
                  />

                  <span>{successMessage}</span>
                </div>
              )}

              {/* Error */}

              {errorMessage && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm font-medium leading-5 text-red-600">
                  {errorMessage}
                </div>
              )}

              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-gray-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-500 hover:shadow-orange-500/20 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    <span>Send Message</span>

                    <Send
                      size={17}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </>
                )}
              </button>

              <p className="px-2 text-center text-[10px] leading-4 text-gray-400 sm:text-[11px] sm:leading-5">
                We respect your privacy and will only use your information to
                respond to your message.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
