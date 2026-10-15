import React, { useState } from 'react';
import axios from 'axios';
import { Phone, Mail, MapPin, CheckCircle2, Lock, MessageSquare } from 'lucide-react';
import Navbar from '../components/sections/Navbar';
import PageHeader from '../components/common/PageHeader';
import Footer from '../components/common/Footer';
import StaffLoginModal from '../components/common/StaffLoginModal';
import CaptchaWidget from '../components/common/CaptchaWidget';

import { getServicesData } from '../data/servicesData';
import { getCleanMapEmbedUrl } from '../utils/mapUtils';

export default function ContactPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateServices,
  onNavigateIndustries,
  onNavigateCareers,
  onOpenEnquiry,
  onOpenStaffLogin,
  customContactInfo
}) {
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

  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceRequired: 'Skilled Manpower Supply',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [captchaState, setCaptchaState] = useState({ code: '', input: '' });
  const [captchaErr, setCaptchaErr] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setCaptchaErr('');
    if (captchaState.input !== captchaState.code) {
      setCaptchaErr('Incorrect Captcha code. Please check and re-enter.');
      return;
    }
    setSubmitting(true);
    const newSubmission = { ...formState, sourceType: 'GET_IN_TOUCH', id: Date.now(), createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16) };
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
        } catch (ignored) { }
      }
    }

    try {
      await axios.post('/api/enquiries', newSubmission, { timeout: 2000 });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] font-sans text-[#121417] flex flex-col font-sans">
      {/* 1. Header Navigation Bar */}
      <Navbar
        activePage="contact"
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateServices={onNavigateServices}
        onNavigateIndustries={onNavigateIndustries}
        onNavigateCareers={onNavigateCareers}
        onNavigateContact={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* 2. Page Header / Breadcrumb */}
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our staffing experts for all your workforce requirements."
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'Contact Us' }
        ]}
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateServices={onNavigateServices}
        onNavigateIndustries={onNavigateIndustries}
        onNavigateCareers={onNavigateCareers}
        onNavigateContact={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* 3. Main Target Contact Layout with Live Google Map */}
      <section className="pt-10 pb-12 bg-white border-b border-[#E8E3D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Tag */}
          <div className="mb-10 animate-slide-left">
            <span className="text-[#D4AF37] font-heading font-extrabold uppercase tracking-widest text-xs inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/30 mb-2 shadow-sm">
              CONTACT US
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-[#0B0C10] tracking-tight">
              We're Here to Assist Your <span className="text-gold-shimmer">Workforce Needs</span>
            </h2>
          </div>

          {/* 3-Column Balanced Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Column 1: Contact Information (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-4 flex flex-col justify-between animate-slide-left">
              <div className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[#FAF9F5] border border-[#E8E3D5] shadow-sm hover:border-[#D4AF37]/50 hover:shadow-md transition-all group">
                <div className="w-11 h-11 rounded-xl bg-[#0B0C10] text-[#D4AF37] flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform border border-[#D4AF37]/30">
                  <Phone className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-[#0B0C10] text-sm sm:text-base">Phone &amp; WhatsApp Enquiries</h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">{contactInfo.phone || '+971 50 123 4567'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[#FAF9F5] border border-[#E8E3D5] shadow-sm hover:border-[#D4AF37]/50 hover:shadow-md transition-all group">
                <div className="w-11 h-11 rounded-xl bg-[#0B0C10] text-[#D4AF37] flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform border border-[#D4AF37]/30">
                  <Mail className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-[#0B0C10] text-sm sm:text-base">Email Contact</h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">{contactInfo.email || 'info@alaqshamanpower.com'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-[#FAF9F5] border border-[#E8E3D5] shadow-sm hover:border-[#D4AF37]/50 hover:shadow-md transition-all group">
                <div className="w-11 h-11 rounded-xl bg-[#0B0C10] text-[#D4AF37] flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5 group-hover:scale-110 transition-transform border border-[#D4AF37]/30">
                  <MapPin className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-[#0B0C10] text-sm sm:text-base">Head Office Address</h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5 leading-relaxed">
                    {contactInfo.address || 'Office 302, Al-Aqsha Building, Deira, Dubai, UAE'}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B0C10] text-white shadow-lg border border-[#D4AF37]/30">
                <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-[#D4AF37] mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                  Working Hours
                </h5>
                <p className="text-xs sm:text-sm font-semibold text-slate-200">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                <p className="text-xs text-slate-400 mt-1">Sunday: Closed / Emergency Support Only</p>
              </div>
            </div>

            {/* Column 2: Send Us a Message Form (lg:col-span-5) */}
            <div className="lg:col-span-5 bg-[#FAF9F5] p-6 sm:p-8 rounded-2xl border border-[#E8E3D5] shadow-sm flex flex-col justify-between animate-slide-up">
              <div>
                <h3 className="font-heading font-black text-xl text-[#0B0C10] mb-1">Send Us a Message</h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                  Fill in your manpower requirements below and our consulting team will respond promptly.
                </p>

                {submitted ? (
                  <div className="text-center py-10">
                    <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto mb-3 animate-bounce" />
                    <h4 className="font-heading text-lg font-black text-[#0B0C10] mb-1">Message Received!</h4>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting AL-AQSHA MANPOWER CONSULTANCY. A recruitment consultant will reach out within 2 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formState.fullName}
                        onChange={handleInputChange}
                        placeholder="Your Full Name *"
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-[#E8E3D5] bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-[#0B0C10] font-medium transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="Your Email *"
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-[#E8E3D5] bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-[#0B0C10] font-medium transition-all"
                      />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formState.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number *"
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-[#E8E3D5] bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-[#0B0C10] font-medium transition-all"
                      />
                    </div>

                    <div>
                      <select
                        name="serviceRequired"
                        required
                        value={formState.serviceRequired}
                        onChange={handleInputChange}
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-[#E8E3D5] bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-[#0B0C10] font-medium transition-all"
                      >
                        <option value="">-- Target Service Category (Required) --</option>
                        {servicesDataList.map((srv) => (
                          <option key={srv.id} value={srv.title}>
                            {srv.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <textarea
                        name="message"
                        required
                        rows={3}
                        value={formState.message}
                        onChange={handleInputChange}
                        placeholder="Describe your project details or manpower requirements *"
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-[#E8E3D5] bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-[#0B0C10] font-medium transition-all"
                      ></textarea>
                    </div>

                    <CaptchaWidget
                      onVerify={(code, input) => setCaptchaState({ code, input })}
                      error={captchaErr}
                    />

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full btn-gold-metallic text-[#121417] font-sans text-xs sm:text-sm uppercase py-4 rounded-xl shadow-lg tracking-wider cursor-pointer disabled:opacity-50"
                    >
                      <span>{submitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE NOW'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Column 3: Live Embedded Google Map & Stay Connected (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-4 flex flex-col justify-between animate-slide-right">
              <div className="rounded-2xl overflow-hidden shadow-sm border border-[#E8E3D5] h-64 sm:h-72 w-full flex-1">
                <iframe
                  src={getCleanMapEmbedUrl(contactInfo.mapEmbedUrl)}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="AL-AQSHA Manpower Office Location"
                ></iframe>
              </div>

              {/* Stay Connected Dark Card */}
              <div className="bg-[#0B0C10] p-5 rounded-2xl border border-[#D4AF37]/30 text-white shadow-lg">
                <h4 className="font-heading font-extrabold text-sm text-white mb-1">Stay Connected</h4>
                <p className="text-slate-400 text-xs mb-4 leading-relaxed font-body">
                  Follow AL-AQSHA MANPOWER CONSULTANCY for news and global hiring drives.
                </p>

                <div className="flex items-center space-x-3">
                  <a href={contactInfo.facebookUrl || 'https://facebook.com'} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-[#12131A] hover:bg-gold-metallic hover:text-[#0B0C10] text-white flex items-center justify-center transition-all border border-[#D4AF37]/20">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                  <a href={contactInfo.linkedinUrl || 'https://linkedin.com'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-[#12131A] hover:bg-gold-metallic hover:text-[#0B0C10] text-white flex items-center justify-center transition-all border border-[#D4AF37]/20">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  </a>
                  <a href={contactInfo.instagramUrl || 'https://instagram.com'} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-[#12131A] hover:bg-gold-metallic hover:text-[#0B0C10] text-white flex items-center justify-center transition-all border border-[#D4AF37]/20">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                  </a>
                  <a href={contactInfo.whatsappUrl || `https://wa.me/${(contactInfo.whatsapp || contactInfo.phone || '').replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full bg-[#12131A] hover:bg-gold-metallic hover:text-[#0B0C10] text-white flex items-center justify-center transition-all border border-[#D4AF37]/20">
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Staff Login Button */}
          <div className="mt-6 pt-4 border-t border-[#E8E3D5] flex justify-end">
            <button
              onClick={onOpenStaffLogin}
              className="text-[11px] font-medium text-slate-500 hover:text-[#0B0C10] flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity cursor-pointer py-1 px-2 rounded hover:bg-[#E8E3D5]/50"
            >
              <Lock className="w-3 h-3 text-[#D4AF37]" /> Staff / Owner Login
            </button>
          </div>
        </div>
      </section>

      {/* 4. Footer */}
      <Footer
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateServices={onNavigateServices}
        onNavigateIndustries={onNavigateIndustries}
        onNavigateCareers={onNavigateCareers}
        onNavigateContact={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </div>
  );
}
