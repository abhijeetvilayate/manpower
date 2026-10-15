import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function HeroBanner({ onNavigateServices }) {
  return (
    <section id="home" className="bg-[#121417] text-white relative pt-16 pb-28 md:py-28 font-sans-modern overflow-hidden" style={{ backgroundColor: '#121417' }}>
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:40px_40px] opacity-10 pointer-events-none"></div>

      {/* Radial Gold Ambient Glow Behind Artwork */}
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-gradient-radial from-[#C5A059]/15 via-[#E6C575]/5 to-transparent blur-3xl pointer-events-none rounded-full" style={{ background: 'radial-gradient(circle, rgba(197, 160, 89, 0.18) 0%, rgba(230, 197, 117, 0.05) 50%, transparent 70%)' }}></div>

      {/* Vector Watermark Artwork: Right-aligned line vector outline matching reference artwork */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-7/12 h-full pointer-events-none flex items-center justify-end pr-2 md:pr-10 opacity-35 md:opacity-55 z-0 overflow-hidden">
        <svg className="w-[620px] h-[620px]" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Islamic Geometric 8-Pointed Star Frame (Rub el Hizb) */}
          <rect x="180" y="90" width="280" height="280" rx="4" stroke="#C5A059" strokeWidth="2.5" fill="none" strokeOpacity="0.45" />
          <rect x="180" y="90" width="280" height="280" rx="4" stroke="#C5A059" strokeWidth="2.5" fill="none" transform="rotate(45 320 230)" strokeOpacity="0.45" />
          
          {/* Kaaba / Building 3D Structure */}
          {/* Golden Top Roof */}
          <polygon points="320,125 440,195 320,240 200,195" fill="url(#goldRoofGrad)" stroke="#E6C575" strokeWidth="2" />
          
          {/* Left Front 3D Wall */}
          <polygon points="200,195 320,240 320,410 200,355" fill="#20232B" stroke="#C5A059" strokeWidth="1.5" strokeOpacity="0.7" />
          
          {/* Right Side 3D Wall */}
          <polygon points="320,240 440,195 440,355 320,410" fill="#161820" stroke="#C5A059" strokeWidth="1.5" strokeOpacity="0.7" />
          
          {/* Mountain Peaks Line Art on Right Wall */}
          <path d="M 335 340 L 360 295 L 380 320 L 405 270 L 425 330" stroke="#E6C575" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

          {/* Sweeping Fluid Golden Wave Line matching reference image */}
          <path d="M 120 465 C 170 340, 205 530, 275 325 C 315 520, 385 475, 495 295" stroke="url(#goldWaveGrad)" strokeWidth="5.5" fill="none" strokeLinecap="round" />
          
          {/* Flying Airplane Silhouette traveling on arc */}
          <g transform="translate(490, 275) rotate(-35)">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#E6C575" />
          </g>

          {/* Diamond Sparkle Icon at bottom right */}
          <path d="M 525 425 Q 525 440 540 440 Q 525 440 525 455 Q 525 440 510 440 Q 525 440 525 425 Z" fill="#E6C575" opacity="0.9" />

          <defs>
            <linearGradient id="goldRoofGrad" x1="200" y1="125" x2="440" y2="240" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F0D58C" />
              <stop offset="0.5" stopColor="#C5A059" />
              <stop offset="1" stopColor="#8A6B29" />
            </linearGradient>
            <linearGradient id="goldWaveGrad" x1="120" y1="465" x2="495" y2="295" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9E7D3B" stopOpacity="0.4" />
              <stop offset="0.4" stopColor="#E6C575" stopOpacity="0.9" />
              <stop offset="1" stopColor="#F0D58C" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 items-center relative z-10">
        <div className="md:col-span-8 pr-0 md:pr-6 animate-slide-up">
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[#E6C575] text-xs font-bold uppercase tracking-widest mb-6 font-sans-modern"
            style={{ backgroundColor: 'rgba(230, 197, 117, 0.1)', border: '1px solid rgba(197, 160, 89, 0.4)' }}
          >
            ✨ Global Talent &amp; Manpower Solutions
          </span>

          {/* Primary Serif Headline: Luxury High-Contrast Cinzel */}
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-[#C5A059]"
            style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
          >
            Your Premier Partner for <br />
            <span className="text-gold-shimmer block mt-1">
              Global Workforce Solutions
            </span>
          </h1>

          {/* Subtext in Soft Warm Silver (#D1D5DB) */}
          <p
            className="text-[#D1D5DB] text-base sm:text-lg max-w-2xl mb-10 leading-relaxed"
            style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
          >
            We provide verified skilled, semi-skilled, and specialized executive manpower to leading mega-projects and industries across the Gulf and global markets.
          </p>

          {/* CTA: Beveled metallic gold button (EXPLORE GLOBAL TALENT) */}
          <button
            onClick={onNavigateServices}
            className="text-xs sm:text-sm uppercase px-8 py-4 rounded-xl shadow-xl transition-all cursor-pointer font-bold flex items-center gap-3 group"
            style={{
              background: 'linear-gradient(135deg, #E6C575 0%, #C5A059 50%, #9E7D3B 100%)',
              boxShadow: '0 4px 15px rgba(197, 160, 89, 0.35)',
              color: '#121417',
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
            }}
          >
            <span>EXPLORE GLOBAL TALENT</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Feature Image Frame Accent */}
        <div className="md:col-span-4 relative flex justify-center">
          <div
            className="rounded-2xl overflow-hidden shadow-2xl max-w-md w-full animate-float relative group bg-[#141518]"
            style={{ border: '2px solid rgba(197, 160, 89, 0.5)' }}
          >
            <img
              src="/hero_workers.jpg"
              alt="Manpower Global Workforce"
              className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-transparent to-transparent opacity-80"></div>
            
            {/* Overlay Badge */}
            <div
              className="absolute bottom-4 left-4 right-4 p-4 rounded-xl text-white"
              style={{
                backgroundColor: 'rgba(18, 20, 23, 0.92)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(197, 160, 89, 0.4)'
              }}
            >
              <p
                className="text-xs font-bold text-[#E6C575] uppercase tracking-wider"
                style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
              >
                Certified &amp; Verified Talent
              </p>
              <p
                className="text-[11px] text-stone-300 mt-0.5"
                style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
              >
                Rapid mobilization across UAE, KSA, Qatar, Oman &amp; GCC
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
