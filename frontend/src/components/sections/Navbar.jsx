import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({
  activePage = 'home',
  onNavigateHome,
  onNavigateAbout,
  onNavigateServices,
  onNavigateIndustries,
  onNavigateCareers,
  onNavigateContact,
  onOpenEnquiry
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME', action: onNavigateHome },
    { id: 'about', label: 'ABOUT US', action: onNavigateAbout },
    { id: 'services', label: 'SERVICES', action: onNavigateServices },
    { id: 'industries', label: 'INDUSTRIES', action: onNavigateIndustries },
    { id: 'careers', label: 'CAREERS', action: onNavigateCareers },
    { id: 'contact', label: 'CONTACT US', action: onNavigateContact },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white border-b border-slate-200 py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div onClick={onNavigateHome} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
            <img src="/AV.png" alt="AL-AQSHA Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-lg font-black text-[#0B1B3D] tracking-tight block leading-tight group-hover:text-amber-600 transition-colors">
              AL-AQSHA
            </span>
            <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase block">
              MANPOWER SUPPLY
            </span>
          </div>
        </div>

        {/* Desktop Nav Links with Left-to-Right Animated Underline */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-bold text-slate-700 tracking-wider uppercase">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className="relative py-1 group cursor-pointer transition-colors"
              >
                <span
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-amber-600 font-extrabold' : 'text-slate-700 group-hover:text-amber-600'
                  }`}
                >
                  {item.label}
                </span>
                {/* Left-to-Right Animated Underline */}
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] bg-amber-500 rounded-full transition-all duration-300 ease-out ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenEnquiry}
            className="hidden sm:inline-block bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black text-xs uppercase px-6 py-3 rounded-md shadow-sm transition-all transform hover:-translate-y-0.5 tracking-wider animate-pulse-glow"
          >
            SEND ENQUIRY
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-slide-up shadow-lg">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (item.action) item.action();
                }}
                className={`block w-full text-left font-bold text-xs uppercase tracking-wider py-2 border-b border-slate-100 ${
                  isActive ? 'text-amber-600 font-extrabold' : 'text-slate-800 hover:text-amber-600'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenEnquiry();
            }}
            className="w-full mt-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase py-3 rounded-md shadow-sm tracking-wider"
          >
            SEND ENQUIRY
          </button>
        </div>
      )}
    </header>
  );
}
