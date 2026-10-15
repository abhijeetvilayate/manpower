import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({
  activePage = 'home',
  variant = 'white', // 'white' or 'dark'
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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', action: onNavigateHome },
    { id: 'services', label: 'Services', action: onNavigateServices },
    { id: 'industries', label: 'Industries', action: onNavigateIndustries },
    { id: 'about', label: 'About Us', action: onNavigateAbout },
    { id: 'contact', label: 'Contact', action: onNavigateContact },
  ];

  const isDark = variant === 'dark';

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isDark
          ? 'bg-[#121417] border-b border-[#C5A059]/30 text-white'
          : 'bg-[#FAF8F3]/95 backdrop-blur-md border-b border-stone-200 text-[#121417]'
      } ${scrolled ? 'py-3 shadow-md' : 'py-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo Badge: Dark/gold rounded badge featuring a house/building silhouette with a flying airplane arc overlay */}
        <div
          onClick={onNavigateHome}
          className="flex items-center gap-3.5 cursor-pointer group select-none"
        >
          <div className="relative w-11 h-11 flex items-center justify-center flex-shrink-0">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center relative overflow-hidden transition-colors shadow-md ${
                isDark ? 'bg-[#141518]' : 'bg-[#121417]'
              }`}
              style={{ border: '2px solid #C5A059' }}
            >
              {/* Building Silhouette */}
              <svg className="w-6 h-6 text-[#C5A059]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 9v13h20V9L12 2zm0 3.2L18.5 10H5.5L12 5.2zM4 11h16v9H4v-9zm6 2h4v7h-4v-7z" />
              </svg>
              {/* Flying Airplane Arc Overlay */}
              <svg className="w-4 h-4 text-[#E6C575] absolute -top-0.5 -right-0.5 transform rotate-45 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
          </div>
          <div>
            <span
              className={`text-xl font-bold tracking-wider block leading-none transition-colors ${
                isDark ? 'text-[#C5A059]' : 'text-[#121417]'
              }`}
              style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
            >
              AL-AQSHA
            </span>
            <span
              className="text-[9.5px] font-extrabold tracking-widest text-[#C5A059] uppercase block mt-0.5"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
            >
              MANPOWER CONSULTANCY
            </span>
          </div>
        </div>

        {/* Navigation Links - Right Aligned with gold hover states and active indicator line */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
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
                    isActive
                      ? 'text-[#C5A059] font-bold'
                      : isDark
                      ? 'text-stone-300 hover:text-[#C5A059]'
                      : 'text-[#121417] hover:text-[#C5A059]'
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C5A059] rounded-full animate-fade-in"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* CTA Button: Metallic gold gradient button with uppercase dark typography */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenEnquiry}
            className="hidden sm:inline-flex text-xs uppercase px-5 py-2.5 rounded-lg cursor-pointer shadow-md font-bold transition-all transform hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #E6C575 0%, #C5A059 50%, #9E7D3B 100%)',
              boxShadow: '0 4px 15px rgba(197, 160, 89, 0.35)',
              color: '#121417',
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
            }}
          >
            <span>SEND ENQUIRY</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'text-stone-300 hover:text-[#C5A059]' : 'text-[#121417] hover:text-[#C5A059] hover:bg-stone-100'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-5 pt-3 pb-6 space-y-2 font-sans-modern border-b shadow-xl animate-slide-up ${
            isDark
              ? 'bg-[#141518] border-[#C5A059]/30 text-white'
              : 'bg-[#FAF8F3] border-stone-200 text-[#121417]'
          }`}
        >
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (item.action) item.action();
                }}
                className={`block w-full text-left font-semibold text-sm py-3 border-b border-stone-200/40 transition-colors ${
                  isActive
                    ? 'text-[#C5A059] font-bold pl-2 border-l-4 border-l-[#C5A059]'
                    : isDark
                    ? 'text-stone-300 hover:text-[#C5A059]'
                    : 'text-[#121417] hover:text-[#C5A059]'
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
            className="w-full mt-4 btn-gold-metallic text-xs uppercase py-3 rounded-lg font-sans-modern"
          >
            <span>SEND ENQUIRY</span>
          </button>
        </div>
      )}
    </header>
  );
}


