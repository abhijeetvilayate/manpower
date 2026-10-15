import React, { useState } from 'react';
import axios from 'axios';
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send, MessageSquare, Share2, Sparkles } from 'lucide-react';
import CaptchaWidget from '../common/CaptchaWidget';
import { SERVICES_DATA, getServicesData } from '../../data/servicesData';
import { getCleanMapEmbedUrl } from '../../utils/mapUtils';

export default function ContactSection({ customContactInfo }) {
  const servicesDataList = getServicesData();
  const contactInfo = (() => {
    if (customContactInfo) return customContactInfo;
    const saved = localStorage.getItem('siteContactInfo');
    return saved ? JSON.parse(saved) : {
      phone: '+971 50 123 4567',
      whatsapp: '+971 50 123 4567',
      email: 'info@alaqshamanpower.com',
      address: 'Office 302, Al-Aqsha Building, Deira, Dubai, UAE',
      workingHours: 'Mon - Sat: 8:00 AM - 6:00 PM',
      linkedinUrl: 'https://linkedin.com',
      facebookUrl: 'https://facebook.com',
      instagramUrl: 'https://instagram.com',
      twitterUrl: 'https://twitter.com',
      whatsappUrl: 'https://wa.me/971501234567'
    };
  })();

  const [quickContact, setQuickContact] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceRequired: 'Skilled Manpower Supply',
    message: ''
  });
  const [submittingContact, setSubmittingContact] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [captchaState, setCaptchaState] = useState({ code: '', input: '' });
  const [captchaErr, setCaptchaErr] = useState('');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (submittingContact) return;
    setCaptchaErr('');
    if (captchaState.input !== captchaState.code) {
      setCaptchaErr('Incorrect Captcha code. Please check and re-enter.');
      return;
    }
    setSubmittingContact(true);
    const newSubmission = {
      ...quickContact,
      sourceType: 'GET_IN_TOUCH',
      id: Date.now(),
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    const stored = JSON.parse(localStorage.getItem('userEnquiries') || '[]');
    const isDuplicate = stored.some(item =>
      item.email === newSubmission.email &&
      item.message === newSubmission.message &&
      Math.abs(item.id - newSubmission.id) < 5000
    );

    if (!isDuplicate) {
      try {
        localStorage.setItem('userEnquiries', JSON.stringify([newSubmission, ...stored]));
      } catch (quotaErr) {
        try {
          localStorage.setItem('userEnquiries', JSON.stringify([newSubmission, ...stored.slice(0, 20)]));
        } catch (ignored) {}
      }
    }

    try {
      await axios.post('/api/enquiries', newSubmission, { timeout: 2000 });
      setContactSubmitted(true);
    } catch (err) {
      setContactSubmitted(true);
    } finally {
      setSubmittingContact(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FAF9F5] border-t border-[#D4AF37]/20 font-body relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto animate-slide-up">
          <span className="text-[#D4AF37] font-black uppercase tracking-widest text-xs inline-flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37]/15 rounded-full border border-[#D4AF37]/40 mb-3 font-heading shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>CONTACT US &amp; GET IN TOUCH</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B0C10] tracking-tight font-heading">
            We're Here to Assist Your Workforce Needs
          </h2>
          <p className="text-sm text-stone-600 font-medium mt-3">
            Have questions about manpower deployment, recruitment, or project staffing? Reach out to us via phone, email, or social media.
          </p>
        </div>

        {/* 3-Column Balanced Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Column 1: Contact Details & Social Media (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-between animate-slide-left">
            
            <div className="bg-white p-5 rounded-2xl border-2 border-[#D4AF37]/20 shadow-md flex items-start gap-4 hover:border-[#D4AF37] transition-all interactive-card">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#F5D061] to-[#D4AF37] text-[#0B0C10] flex items-center justify-center flex-shrink-0 shadow-md">
                <Phone className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h5 className="font-extrabold text-[#0B0C10] text-sm font-heading">Direct Phone &amp; WhatsApp</h5>
                <p className="text-xs text-stone-700 font-bold mt-0.5">{contactInfo.phone || '+971 50 123 4567'}</p>
                <p className="text-[11px] text-[#D4AF37] font-semibold mt-0.5">24/7 Recruitment Desk Support</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border-2 border-[#D4AF37]/20 shadow-md flex items-start gap-4 hover:border-[#D4AF37] transition-all interactive-card">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#F5D061] to-[#D4AF37] text-[#0B0C10] flex items-center justify-center flex-shrink-0 shadow-md">
                <Mail className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h5 className="font-extrabold text-[#0B0C10] text-sm font-heading">Official Email Address</h5>
                <p className="text-xs text-stone-700 font-bold mt-0.5">{contactInfo.email || 'info@alaqshamanpower.com'}</p>
                <p className="text-[11px] text-[#D4AF37] font-semibold mt-0.5">Quotations &amp; General Enquiries</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border-2 border-[#D4AF37]/20 shadow-md flex items-start gap-4 hover:border-[#D4AF37] transition-all interactive-card">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#F5D061] to-[#D4AF37] text-[#0B0C10] flex items-center justify-center flex-shrink-0 shadow-md">
                <MapPin className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h5 className="font-extrabold text-[#0B0C10] text-sm font-heading">Headquarters Address</h5>
                <p className="text-xs text-stone-700 font-medium mt-0.5 leading-relaxed">
                  {contactInfo.address || 'Office 302, Al-Aqsha Building, Deira, Dubai, UAE'}
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border-2 border-[#D4AF37]/20 shadow-md flex items-start gap-4 hover:border-[#D4AF37] transition-all interactive-card">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#F5D061] to-[#D4AF37] text-[#0B0C10] flex items-center justify-center flex-shrink-0 shadow-md">
                <Clock className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h5 className="font-extrabold text-[#0B0C10] text-sm font-heading">Working Hours</h5>
                <p className="text-xs text-stone-700 font-bold mt-0.5">{contactInfo.workingHours || 'Mon - Sat: 8:00 AM - 6:00 PM'}</p>
                <p className="text-[11px] text-stone-400 font-medium mt-0.5">Sunday: Closed</p>
              </div>
            </div>

            {/* Social Media Links Section */}
            <div className="bg-white p-5 rounded-2xl border-2 border-[#D4AF37]/20 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#D4AF37]" />
                <h5 className="font-extrabold text-[#0B0C10] text-xs uppercase tracking-wider font-heading">Follow &amp; Connect With Us</h5>
              </div>
              <div className="flex items-center gap-2 pt-1">
                {/* LinkedIn */}
                <a
                  href={contactInfo.linkedinUrl || 'https://linkedin.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-[#0A66C2] text-stone-700 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href={contactInfo.facebookUrl || 'https://facebook.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-[#1877F2] text-stone-700 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href={contactInfo.instagramUrl || 'https://instagram.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-[#E4405F] text-stone-700 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* Twitter / X */}
                <a
                  href={contactInfo.twitterUrl || 'https://twitter.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-[#0B0C10] text-stone-700 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* WhatsApp */}
                <a
                  href={contactInfo.whatsappUrl || `https://wa.me/${(contactInfo.whatsapp || contactInfo.phone || '').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-[#25D366] text-stone-700 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Column 2: Send Us a Message Form (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#D4AF37]/30 shadow-xl flex flex-col justify-between animate-slide-up">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-black text-[#0B0C10] text-lg font-heading">Send Us a Message</h3>
              </div>
              <p className="text-xs text-stone-500 mb-6">Fill out your contact info and project requirements below.</p>
            </div>

            {contactSubmitted ? (
              <div className="text-center py-10 my-auto bg-[#FAF9F5] rounded-xl border-2 border-[#D4AF37]/40 p-6 animate-scale-modal">
                <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mx-auto mb-3 animate-bounce" />
                <h4 className="text-base font-extrabold text-[#0B0C10] mb-1 font-heading">Message Sent Successfully!</h4>
                <p className="text-xs text-stone-600 font-medium">Thank you for reaching out to AL-AQSHA MANPOWER CONSULTANCY. Our representative will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0B0C10] uppercase mb-1 font-heading">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Abhijit Vilayate"
                    value={quickContact.fullName}
                    onChange={(e) => setQuickContact({ ...quickContact, fullName: e.target.value })}
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#0B0C10] uppercase mb-1 font-heading">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={quickContact.email}
                      onChange={(e) => setQuickContact({ ...quickContact, email: e.target.value })}
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0B0C10] uppercase mb-1 font-heading">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+971 50 123 4567"
                      value={quickContact.phone}
                      onChange={(e) => setQuickContact({ ...quickContact, phone: e.target.value })}
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B0C10] uppercase mb-1 font-heading">Target Service Required *</label>
                  <select
                    required
                    value={quickContact.serviceRequired}
                    onChange={(e) => setQuickContact({ ...quickContact, serviceRequired: e.target.value })}
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 font-medium text-stone-800 transition-all"
                  >
                    <option value="">-- Select Target Service (Required) --</option>
                    {servicesDataList.map((srv) => (
                      <option key={srv.id} value={srv.title}>
                        {srv.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B0C10] uppercase mb-1 font-heading">Message / Project Requirements *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe your workforce requirement or project details *"
                    value={quickContact.message}
                    onChange={(e) => setQuickContact({ ...quickContact, message: e.target.value })}
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                  ></textarea>
                </div>

                <CaptchaWidget
                  onVerify={(code, input) => setCaptchaState({ code, input })}
                  error={captchaErr}
                />

                <button
                  type="submit"
                  disabled={submittingContact}
                  className="w-full bg-gradient-to-r from-[#F5D061] via-[#D4AF37] to-[#AA7C11] hover:brightness-110 text-[#0B0C10] font-black text-xs sm:text-sm uppercase py-3.5 rounded-xl shadow-xl shadow-[#D4AF37]/25 transition-all cursor-pointer transform active:scale-95 flex items-center justify-center gap-2 font-heading"
                >
                  <Send className="w-4 h-4 text-[#0B0C10]" />
                  <span>{submittingContact ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Column 3: Google Map Location Card (lg:col-span-3) */}
          <div className="lg:col-span-3 bg-white p-4 rounded-2xl border-2 border-[#D4AF37]/30 shadow-xl flex flex-col justify-between animate-slide-right">
            <div className="rounded-xl overflow-hidden border border-stone-200 flex-1 min-h-[300px]">
              <iframe
                src={getCleanMapEmbedUrl(contactInfo.mapEmbedUrl)}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                allowFullScreen=""
                loading="lazy"
                title="Location Map"
              ></iframe>
            </div>

            <div className="mt-4 p-3.5 bg-[#FAF9F5] rounded-xl border border-[#D4AF37]/30">
              <p className="text-[11px] font-black text-[#0B0C10] uppercase font-heading">AL-AQSHA MANPOWER CONSULTANCY</p>
              <p className="text-[10px] text-stone-500 font-medium font-body">Deira, Dubai, United Arab Emirates</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

