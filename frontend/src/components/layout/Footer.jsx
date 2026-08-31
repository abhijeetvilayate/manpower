import React from 'react';
import {
    Building2,
    Mail,
    PhoneCall,
    MapPin,
    Clock,
    ArrowRight,
    ShieldCheck,
} from 'lucide-react';

export default function Footer({ onOpenEnquiry }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
            {/* Top CTA Banner */}
            <div className="border-b border-slate-800/80 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-1">
                            Start Your Project
                        </span>
                        <h3 className="text-2xl font-bold text-white">
                            Need certified manpower for your upcoming project?
                        </h3>
                        <p className="text-slate-400 text-sm mt-1">
                            Connect with our recruitment operations team for swift mobilization across the GCC.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => onOpenEnquiry && onOpenEnquiry()}
                        className="flex-shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 inline-flex items-center gap-2"
                    >
                        Request a Quote <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                {/* Company Info */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-lg font-black tracking-tight text-white block leading-none">
                                AL-AQSHA
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-500 mt-0.5 block">
                                Manpower Supply &amp; Staffing
                            </span>
                        </div>
                    </div>
                    <p className="text-slate-400 leading-relaxed max-w-sm text-sm">
                        Delivering verified, safety-compliant, and technically proficient workforce solutions for leading industrial, infrastructure, and energy megaprojects worldwide.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                        <ShieldCheck className="w-4 h-4" />
                        <span>ISO 9001:2015 Certified &bull; GAMCA Approved Medicals</span>
                    </div>
                </div>

                {/* Quick Navigation */}
                <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                        Navigation
                    </h4>
                    <ul className="space-y-2.5 text-sm">
                        <li>
                            <a href="#services" className="hover:text-amber-400 transition-colors">
                                Services Offered
                            </a>
                        </li>
                        <li>
                            <a href="#industries" className="hover:text-amber-400 transition-colors">
                                Industries Served
                            </a>
                        </li>
                        <li>
                            <a href="#why-us" className="hover:text-amber-400 transition-colors">
                                Why AL-AQSHA
                            </a>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => onOpenEnquiry && onOpenEnquiry()}
                                className="hover:text-amber-400 transition-colors text-left"
                            >
                                Hire Personnel
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Key Sectors */}
                <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                        Key Sectors
                    </h4>
                    <ul className="space-y-2.5 text-sm">
                        <li className="hover:text-slate-200 transition-colors">Civil Construction</li>
                        <li className="hover:text-slate-200 transition-colors">Oil, Gas &amp; Petrochemical</li>
                        <li className="hover:text-slate-200 transition-colors">Mechanical &amp; MEP</li>
                        <li className="hover:text-slate-200 transition-colors">Power &amp; Energy Plants</li>
                        <li className="hover:text-slate-200 transition-colors">Logistics &amp; Supply Chain</li>
                    </ul>
                </div>

                {/* Contact & Support */}
                <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                        Contact Support
                    </h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2.5">
                            <Mail className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                            <a href="mailto:info@alaqsha.com" className="hover:text-amber-400 transition-colors">
                                info@alaqsha.com
                            </a>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <PhoneCall className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                            <a href="tel:+97140000000" className="hover:text-amber-400 transition-colors">
                                +971 4 000 0000
                            </a>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                            <span>Business Bay, Dubai, United Arab Emirates</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                            <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                            <span>Mon – Sat: 8:00 AM – 6:00 PM</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-900 bg-slate-950 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>&copy; {currentYear} AL-AQSHA Manpower Supply. All rights reserved.</p>
                    <div className="flex items-center space-x-6">
                        <a href="#" className="hover:text-slate-400 transition-colors">
                            Privacy Policy
                        </a>
                        <span>&bull;</span>
                        <a href="#" className="hover:text-slate-400 transition-colors">
                            Terms &amp; Conditions
                        </a>
                        <span>&bull;</span>
                        <a href="#" className="hover:text-slate-400 transition-colors">
                            Labor Compliance
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}