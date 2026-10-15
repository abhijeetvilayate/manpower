import React from 'react';
import { ChevronRight, Sparkles, Award } from 'lucide-react';

export default function AboutSection({ onNavigateAbout }) {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FAF8F3] border-t border-b border-[#C5A059]/30 relative overflow-hidden font-sans-modern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        <div className="md:col-span-6 animate-slide-left">
          <span className="text-[#C5A059] font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2 px-4 py-1.5 bg-[#E6C575]/20 rounded-full border border-[#C5A059] mb-4 font-sans-modern shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>ABOUT OUR AGENCY</span>
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121417] tracking-tight mb-6 leading-tight"
            style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif", color: '#121417' }}
          >
            Your Growth Is Our Strategic Mission
          </h2>
          <p className="text-[#121417] text-sm sm:text-base leading-relaxed mb-8 opacity-90">
            AL-AQSHA MANPOWER CONSULTANCY is a premier licensed recruitment agency bridging global talent with top-tier GCC enterprises. Our mission is to deliver the right manpower, with verified trade skills, at the right time to empower your business success.
          </p>
          <button
            onClick={onNavigateAbout}
            className="inline-flex items-center gap-2.5 text-xs uppercase px-8 py-4 rounded-xl shadow-xl font-bold tracking-wider cursor-pointer transition-all transform hover:-translate-y-0.5 group"
            style={{
              background: 'linear-gradient(135deg, #E6C575 0%, #C5A059 50%, #9E7D3B 100%)',
              boxShadow: '0 4px 15px rgba(197, 160, 89, 0.35)',
              color: '#121417',
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
            }}
          >
            <span>DISCOVER OUR STORY</span>
            <ChevronRight className="w-4 h-4 text-[#121417] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="md:col-span-6 animate-slide-right">
          <div
            onClick={onNavigateAbout}
            className="rounded-3xl overflow-hidden shadow-2xl bg-[#FAF8F3] group relative cursor-pointer transition-all duration-500 hover:-translate-y-2"
            style={{ border: '2px solid #C5A059' }}
          >
            <img
              src="/gulf_skyline.jpg"
              alt="Gulf City Skyline"
              className="w-full h-72 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121417]/85 via-transparent to-transparent"></div>

            <div
              className="absolute top-5 right-5 text-[#121417] font-extrabold text-xs uppercase px-4 py-2 rounded-full shadow-xl flex items-center gap-1.5 font-sans-modern"
              style={{ background: 'linear-gradient(135deg, #E6C575 0%, #C5A059 100%)' }}
            >
              <Award className="w-4 h-4 text-[#121417]" />
              <span>10+ Years Excellence</span>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <h4
                className="font-bold text-white text-lg sm:text-xl"
                style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
              >
                Trusted Across UAE, KSA &amp; Qatar
              </h4>
              <p className="text-stone-300 text-xs mt-1 font-sans-modern">Full-service recruitment &amp; visa mobilization.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


