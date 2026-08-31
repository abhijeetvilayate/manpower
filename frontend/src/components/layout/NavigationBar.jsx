import React, { useState } from 'react';
import {
    Building2,
    MapPin,
    Clock,
    Mail,
    PhoneCall,
    Menu,
    X,
    ArrowRight,
} from 'lucide-react';
import CustomButton from './CustomButton';

export default function NavigationBar({ onOpenEnquiry }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const handleNavClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Top Contact & Announcement Bar */}
            <div className="bg-slate-900 text-slate-300 text-xs sm:text-sm py-2 px-4 border-b border-slate-800">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-400" />
                            Serving UAE, Saudi Arabia, Qatar, Oman &amp; Bahrain
                        </span>
                        <span className="hidden md:inline-block text-slate-600">|</span>
                        <span className="hidden md:flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-amber-400" />
                            24/7 Rapid Mobilization
                        </span>
                    </div>
                    <div className="flex items-center space-x-4 ml-auto">
                        <a
                            href="mailto:info@alaqsha.com"
                            className="hover:text-amber-400 transition-colors flex items-center gap-1"
                        >
                            <Mail className="w-3.5 h-3.5" />
                            <span>info@alaqsha.com</span>
                        </a>
                        <span className="text-slate-600 hidden sm:inline-block">|</span>
                        <a
                            href="tel:+97140000000"
                            className="hover:text-amber-400 transition-colors hidden sm:flex items-center gap-1"
                        >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>+971 4 000 0000</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Sticky Navbar */}
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    {/* Logo / Brand */}
                    <a href="#" className="flex items-center gap-3 group">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xl font-black tracking-tight text-slate-900 block leading-none font-display">
                                AL-AQSHA
                            </span>
                            <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-600 mt-1 block">
                                Manpower Supply &amp; Staffing
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
                        <a href="#services" className="hover:text-amber-600 transition-colors">
                            Services
                        </a>
                        <a href="#industries" className="hover:text-amber-600 transition-colors">
                            Industries
                        </a>
                        <a href="#why-us" className="hover:text-amber-600 transition-colors">
                            Why Al-Aqsha
                        </a>
                        <a href="#contact" className="hover:text-amber-600 transition-colors">
                            Contact
                        </a>
                    </nav>

                    {/* Desktop Action CTA */}
                    <div className="hidden md:block">
                        <CustomButton
                            variant="primary"
                            size="md"
                            onClick={() => onOpenEnquiry && onOpenEnquiry()}
                            icon={ArrowRight}
                            iconPosition="right"
                        >
                            Request Manpower
                        </CustomButton>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button
                            type="button"
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                            aria-label="Toggle Navigation Menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-xl">
                        <a
                            href="#services"
                            onClick={handleNavClick}
                            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                        >
                            Services
                        </a>
                        <a
                            href="#industries"
                            onClick={handleNavClick}
                            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                        >
                            Industries
                        </a>
                        <a
                            href="#why-us"
                            onClick={handleNavClick}
                            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                        >
                            Why Al-Aqsha
                        </a>
                        <a
                            href="#contact"
                            onClick={handleNavClick}
                            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                        >
                            Contact
                        </a>
                        <div className="pt-2">
                            <CustomButton
                                variant="primary"
                                size="md"
                                className="w-full"
                                onClick={() => {
                                    handleNavClick();
                                    if (onOpenEnquiry) onOpenEnquiry();
                                }}
                                icon={ArrowRight}
                                iconPosition="right"
                            >
                                Request Manpower
                            </CustomButton>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}