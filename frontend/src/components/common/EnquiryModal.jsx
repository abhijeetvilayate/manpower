import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Send, CheckCircle2 } from 'lucide-react';
import CustomButton from './CustomButton';
import CaptchaWidget from './CaptchaWidget';

const DEFAULT_SERVICES = [
    { id: 1, title: 'Skilled Manpower Supply' },
    { id: 2, title: 'Unskilled Manpower Supply' },
    { id: 3, title: 'Technical Manpower Supply' },
    { id: 4, title: 'Project-based Manpower Supply' },
    { id: 5, title: 'Recruitment Process Outsourcing' },
    { id: 6, title: 'Visa & Travel Assistance' },
];

export default function EnquiryModal({
    isOpen,
    onClose,
    services = [],
    initialServiceId = '',
}) {
    const availableServices = services.length > 0 ? services : DEFAULT_SERVICES;

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        serviceId: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [captchaState, setCaptchaState] = useState({ code: '', input: '' });
    const [captchaErr, setCaptchaErr] = useState('');

    useEffect(() => {
        if (isOpen) {
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                companyName: '',
                serviceId: initialServiceId ? String(initialServiceId) : '',
                message: '',
            });
            setIsSuccess(false);
            setErrorMessage('');
            setCaptchaErr('');
        }
    }, [isOpen, initialServiceId]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

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

        const selectedServiceTitle = availableServices.find(s => String(s.id) === String(formData.serviceId))?.title || formData.serviceId || 'General Manpower Supply';
        const isServiceSpecific = Boolean(formData.serviceId || initialServiceId);
        
        const payload = {
            fullName: formData.fullName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            companyName: formData.companyName.trim() || null,
            serviceRequired: selectedServiceTitle,
            sourceType: isServiceSpecific ? 'SERVICE_REQUEST' : 'ENQUIRY_FORM',
            message: formData.message.trim() || null,
            id: Date.now(),
            createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };

        const stored = JSON.parse(localStorage.getItem('userEnquiries') || '[]');
        const isDuplicate = stored.some(item => 
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
                    localStorage.setItem('userEnquiries', JSON.stringify([payload, ...stored.slice(0, 20)]));
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-100 relative">
                {/* Header */}
                <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-lg">Request Manpower Quotation</h3>
                        <p className="text-xs text-slate-400">
                            Submit your project requirements and our team will get back to you within 24 hours.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {isSuccess ? (
                        <div className="text-center py-8">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2">Enquiry Submitted!</h4>
                            <p className="text-sm text-slate-600 mb-6">
                                Thank you for contacting AL-AQSHA Manpower Supply. A recruitment specialist will review your request shortly.
                            </p>
                            <CustomButton variant="primary" size="md" onClick={onClose}>
                                Done
                            </CustomButton>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {errorMessage && (
                                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                                    {errorMessage}
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                        Full Name <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                        Work Email <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@company.com"
                                        className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                        Phone Number <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+971 50 123 4567"
                                        className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                        Company Name <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        required
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        placeholder="Apex Contracting LLC *"
                                        className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                    Target Service Category <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    name="serviceId"
                                    required
                                    value={formData.serviceId}
                                    onChange={handleChange}
                                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                                >
                                    <option value="">-- Select Service (Required) --</option>
                                    {availableServices.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.title}
                                        </option>
                                    ))}
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                    Project Details &amp; Quantity <span className="text-rose-500">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    rows={3}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Mention trade categories, estimated headcounts, site location, and timeline *"
                                    className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
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