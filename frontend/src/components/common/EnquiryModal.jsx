import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Send, CheckCircle2, Sparkles, Building2 } from 'lucide-react';
import CustomButton from './CustomButton';
import CaptchaWidget from './CaptchaWidget';
import { SERVICES_DATA } from '../../data/servicesData';

export default function EnquiryModal({
  isOpen,
  onClose,
  selectedService = null,
  selectedSubService = '',
  initialServiceId = '',
}) {
  const servicesList = SERVICES_DATA || [];
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    serviceId: '',
    subService: '',
    message: '',
  });

  const [availableSubServices, setAvailableSubServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaState, setCaptchaState] = useState({ code: '', input: '' });
  const [captchaErr, setCaptchaErr] = useState('');

  // Update form data whenever modal is opened or selected props change
  useEffect(() => {
    if (isOpen) {
      let activeServiceId = '';
      let activeSubService = selectedSubService || '';

      if (selectedService) {
        if (typeof selectedService === 'object') {
          activeServiceId = selectedService.id || selectedService.title;
        } else {
          activeServiceId = selectedService;
        }
      } else if (initialServiceId) {
        activeServiceId = initialServiceId;
      }

      // Find matching service from dataset to populate sub-services list
      const matched = servicesList.find(
        (s) => String(s.id) === String(activeServiceId) || s.title === activeServiceId
      );

      const subList = matched ? (matched.subServices || []) : [];
      setAvailableSubServices(subList);

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        serviceId: matched ? matched.id : activeServiceId || '',
        subService: activeSubService,
        message: activeSubService
          ? `Requirement for ${activeSubService} under ${matched ? matched.title : 'Selected Category'}.`
          : '',
      });

      setIsSuccess(false);
      setErrorMessage('');
      setCaptchaErr('');
    }
  }, [isOpen, selectedService, selectedSubService, initialServiceId]);

  // Handle main service change in select dropdown
  const handleServiceChange = (e) => {
    const val = e.target.value;
    const matched = servicesList.find((s) => String(s.id) === String(val) || s.title === val);
    const subList = matched ? (matched.subServices || []) : [];

    setAvailableSubServices(subList);
    setFormData((prev) => ({
      ...prev,
      serviceId: val,
      subService: '', // Reset sub-service on category change
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setCaptchaErr('');

    if (captchaState.input !== captchaState.code) {
      setCaptchaErr('Incorrect Captcha code. Please check and re-enter.');
      return;
    }
    setIsSubmitting(true);
    setErrorMessage('');

    const matchedService = servicesList.find(
      (s) => String(s.id) === String(formData.serviceId) || s.title === formData.serviceId
    );

    const selectedServiceTitle = matchedService ? matchedService.title : formData.serviceId || 'General Manpower Supply';
    const finalSubService = formData.subService || 'General Inquiry';

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      companyName: formData.companyName.trim() || null,
      serviceRequired: selectedServiceTitle,
      subServiceRequired: finalSubService,
      sourceType: 'SERVICE_REQUEST',
      message: formData.message.trim() || null,
      id: Date.now(),
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    const stored = JSON.parse(localStorage.getItem('userEnquiries') || '[]');
    const isDuplicate = stored.some(
      (item) =>
        item.email === payload.email &&
        item.message === payload.message &&
        Math.abs(item.id - payload.id) < 5000
    );

    if (!isDuplicate) {
      try {
        localStorage.setItem('userEnquiries', JSON.stringify([payload, ...stored]));
      } catch (quotaErr) {
        console.warn('LocalStorage quota exceeded in EnquiryModal:', quotaErr);
        try {
          localStorage.setItem(
            'userEnquiries',
            JSON.stringify([payload, ...stored.slice(0, 20)])
          );
        } catch (ignored) {}
      }
    }

    try {
      await axios.post('/api/enquiries', payload, { timeout: 2000 });
    } catch (err) {
      console.warn('Backend API unreachable, enquiry saved locally to owner control center:', err.message);
    } finally {
      setIsSuccess(true);
      setIsSubmitting(false);
    }
  };

  const selectedCategoryObj = servicesList.find(
    (s) => String(s.id) === String(formData.serviceId) || s.title === formData.serviceId
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-[#D4AF37]/30 relative max-h-[92vh] flex flex-col animate-scaleUp">
        {/* Header */}
        <div className="bg-[#0B0C10] text-white px-6 py-4 flex items-center justify-between flex-shrink-0 border-b border-[#D4AF37]/30">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37] animate-spin-slow" />
              <h3 className="font-extrabold text-base sm:text-lg font-heading">Request Manpower Proposal</h3>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 font-body">
              Submit requirements and our recruitment specialists will get back within 24 hours.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 font-body">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 animate-bounce" />
              </div>
              <h4 className="text-xl font-black text-[#171717] mb-2 font-heading">Proposal Request Submitted!</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6 font-medium">
                Thank you, <span className="font-bold text-[#171717]">{formData.fullName}</span>. Our recruitment Account Manager will review your requirements for <span className="font-bold text-[#C9A227]">{formData.subService || 'your requested manpower'}</span> and send an official quotation within 24 hours.
              </p>

              <div className="p-4 bg-[#C9A227]/10 rounded-2xl border border-[#C9A227]/30 text-left max-w-md mx-auto mb-6 text-xs text-[#171717] font-medium">
                <div className="font-extrabold text-[#171717] mb-1 flex items-center gap-1.5 uppercase text-[11px] font-heading">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" /> Executive Priority Dispatch
                </div>
                Need emergency manpower deployment? Speak directly with our GCC Operations Director at <a href="tel:+971501234567" className="font-bold underline text-[#171717]">+971 50 123 4567</a>.
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-[#171717] text-[#C9A227] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#262626] transition-all cursor-pointer shadow-md font-heading"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              {/* Service & Sub-Service Banner if Pre-filled */}
              {formData.subService && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs text-amber-950 font-bold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Selected Trade: <span className="text-amber-700">{formData.subService}</span></span>
                  </div>
                  <span className="text-[10px] uppercase font-extrabold bg-amber-200/80 px-2 py-0.5 rounded-full text-amber-900">Pre-Filled</span>
                </div>
              )}

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Ahmed Al-Maktoum"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Company Name / Project <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Apex Constructions LLC"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Phone / WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971 50 000 0000"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              {/* Main Service Category Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Target Service Category <span className="text-rose-500">*</span>
                </label>
                <select
                  name="serviceId"
                  required
                  value={formData.serviceId}
                  onChange={handleServiceChange}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
                >
                  <option value="">-- Select Service Category --</option>
                  {servicesList.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.title}
                    </option>
                  ))}
                  <option value="other-services">Other Services / Custom Request</option>
                </select>
              </div>

              {/* Specific Sub-Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Specific Trade / Sub-Service
                </label>
                <select
                  name="subService"
                  value={formData.subService}
                  onChange={handleChange}
                  disabled={availableSubServices.length === 0}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium disabled:bg-slate-100 disabled:text-slate-400"
                >
                  <option value="">-- Select Sub-Service (Optional) --</option>
                  {availableSubServices.map((sub, idx) => (
                    <option key={idx} value={sub}>
                      {sub}
                    </option>
                  ))}
                  <option value="General Category Requirement">General / Multiple Trades</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Project Details &amp; Required Headcounts <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mention estimated headcounts, site location, timeline, and candidate requirements *"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <CaptchaWidget
                onVerify={(code, input) => setCaptchaState({ code, input })}
                error={captchaErr}
              />

              <div className="pt-2 flex justify-end gap-3">
                <CustomButton variant="ghost" size="md" onClick={onClose} disabled={isSubmitting}>
                  Cancel
                </CustomButton>
                <CustomButton
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={isSubmitting}
                  icon={Send}
                  iconPosition="left"
                >
                  Send Request
                </CustomButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
