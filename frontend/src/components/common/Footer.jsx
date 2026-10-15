import React from 'react';
import { Phone, Globe, Mail, MapPin } from 'lucide-react';

export default function Footer({
  onNavigateHome,
  onNavigateAbout,
  onNavigateServices,
  onNavigateIndustries,
  onNavigateCareers,
  onNavigateContact,
  onOpenEnquiry,
  onOpenStaffLogin,
  customContactInfo
}) {
  const currentYear = new Date().getFullYear();
  const contactInfo = (() => {
    if (customContactInfo) return customContactInfo;
    const saved = localStorage.getItem('siteContactInfo');
    return saved ? JSON.parse(saved) : {
      phone: '+91 123 456 789',
      altPhone: '+91 123 455 789',
      website: 'www.al-aqshansite.com',
      email: 'info@al-aqshansite.com',
      address: 'Business Bay, Dubai, UAE / Corporate HQ',
      facebookUrl: 'https://facebook.com',
      twitterUrl: 'https://twitter.com',
      instagramUrl: 'https://instagram.com',
      linkedinUrl: 'https://linkedin.com'
    };
  })();

  return (
    <footer className="bg-[#141518] text-stone-300 font-sans-modern pt-14 pb-10 border-t border-[#C5A059]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Obsidian Footer Layout (#141518) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 border-b border-stone-800/80 items-start">
          
          {/* Left Column: Contact Us */}
          <div className="space-y-5">
            {/* Gold Serif Title */}
            <h3 className="font-serif-luxury font-bold text-2xl text-[#C5A059] tracking-tight">
              Contact Us
            </h3>
            
            <ul className="space-y-3.5 text-sm font-sans-modern">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <div className="flex flex-col sm:flex-row sm:gap-3 text-stone-200">
                  <a href={`tel:${(contactInfo.phone || '+91123456789').replace(/[^0-9+]/g, '')}`} className="hover:text-[#E6C575] transition-colors">
                    {contactInfo.phone || '+91 123 456 789'}
                  </a>
                  <span className="hidden sm:inline text-stone-600">|</span>
                  <a href={`tel:${(contactInfo.altPhone || '+91123455789').replace(/[^0-9+]/g, '')}`} className="hover:text-[#E6C575] transition-colors">
                    {contactInfo.altPhone || '+91 123 455 789'}
                  </a>
                </div>
              </li>
              
              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <a
                  href={`https://${contactInfo.website || 'www.al-aqshansite.com'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E6C575] transition-colors text-stone-200"
                >
                  {contactInfo.website || 'www.al-aqshansite.com'}
                </a>
              </li>

              <li className="flex items-center gap-3 text-stone-400 text-xs pt-1">
                <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span>{contactInfo.address || 'Business Bay, Dubai, United Arab Emirates'}</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Social With Links */}
          <div className="space-y-5 md:pl-8 md:border-l md:border-stone-800/80">
            {/* Gold Serif Title */}
            <h3 className="font-serif-luxury font-bold text-2xl text-[#C5A059] tracking-tight">
              Social With Links
            </h3>

            <p className="text-xs text-stone-400 max-w-md leading-relaxed">
              Connect with our global recruitment team across our official corporate social channels.
            </p>

            {/* Horizontal Row of Dark Circular Icon Buttons (FB, X, IG, IN) */}
            <div className="flex items-center gap-4 pt-1">
              {/* Facebook */}
              <a
                href={contactInfo.facebookUrl || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-icon-btn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href={contactInfo.twitterUrl || 'https://twitter.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="social-icon-btn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={contactInfo.instagramUrl || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-icon-btn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={contactInfo.linkedinUrl || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-icon-btn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-sans-modern">
          <p>&copy; {currentYear} AL-AQSHA MANPOWER CONSULTANCY. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <button onClick={onOpenStaffLogin} className="hover:text-[#C5A059] transition-colors text-stone-500">
              Staff Portal Login
            </button>
            <span>&bull;</span>
            <span className="text-stone-500">www.al-aqshansite.com</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

