import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const InquiryPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you. Your message has been sent successfully!',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        let errorMessage = 'Failed to send message. Please try again later.';
        try {
          const text = await response.text();
          try {
            const data = JSON.parse(text);
            errorMessage = data.error || errorMessage;
          } catch {
            if (response.status === 404 || response.status === 405) {
              errorMessage = `The API endpoint could not be reached (Status ${response.status}). If you just modified code, please try again in a few seconds.`;
            } else {
              errorMessage = `${errorMessage} (${text.slice(0, 120)})`;
            }
          }
        } catch {
          errorMessage = `${errorMessage} (Status ${response.status})`;
        }
        setSubmitStatus({
          type: 'error',
          message: `${errorMessage}\nPlease contact us directly at hermen@hermen.co.kr`,
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred while connecting to the server. Please check your connection or contact us directly. (hermen@hermen.co.kr)',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-2xl mx-auto">
      <h1 className="text-5xl font-light tracking-tighter mb-4 text-center">Inquiry</h1>
      <p className="text-center text-gray-500 text-sm mb-12">
        If you have any questions or wholesale requests, please send us a message.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded text-sm whitespace-pre-line ${
                submitStatus.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {submitStatus.message}
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Name</label>
          <input
            type="text"
            required
            disabled={isSubmitting}
            className="w-full p-3 bg-white border border-gray-200 focus:border-brand-primary outline-none transition-colors duration-300"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
          <input
            type="email"
            required
            disabled={isSubmitting}
            className="w-full p-3 bg-white border border-gray-200 focus:border-brand-primary outline-none transition-colors duration-300"
            placeholder="example@yourdomain.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Message</label>
          <textarea
            required
            disabled={isSubmitting}
            className="w-full p-3 bg-white border border-gray-200 focus:border-brand-primary outline-none transition-colors duration-300 h-40 resize-none"
            placeholder="Write details about your partnership or wholesale request here..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-12 py-5 bg-brand-primary text-white text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-brand-accent active:bg-brand-accent transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed font-sans"
        >
          {isSubmitting ? 'SENDING...' : 'SEND'}
        </button>
      </form>
    </div>
  );
};
