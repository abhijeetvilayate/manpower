import React from 'react';
import { Briefcase, ChevronRight, Sparkles } from 'lucide-react';

export default function CareersSection({ onNavigateCareers }) {
  return (
    <section className="py-16 sm:py-24 bg-[#0B0C10] text-white border-t border-b border-[#D4AF37]/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 items-center relative z-10">
        <div className="md:col-span-6 animate-slide-left">
          <span className="text-[#D4AF37] font-black uppercase tracking-widest text-xs inline-flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37]/15 rounded-full border border-[#D4AF37]/40 mb-4 font-heading shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>GLOBAL CAREER OPPORTUNITIES</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-5 font-heading leading-tight">
            Build Your Global Career With Us
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8 font-body">
            Join thousands of skilled candidates placed in top multinational firms across Saudi Arabia, UAE, Qatar, and Kuwait. Explore current trade vacancies and submit your CV today.
          </p>
          <button
            onClick={onNavigateCareers}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F5D061] via-[#D4AF37] to-[#AA7C11] hover:brightness-110 text-[#0B0C10] font-black text-xs uppercase px-8 py-4 rounded-xl shadow-xl shadow-[#D4AF37]/25 tracking-wider cursor-pointer font-heading transition-all transform hover:-translate-y-0.5 animate-pulse-glow-gold"
          >
            <Briefcase className="w-4 h-4 text-[#0B0C10]" />
            <span>VIEW OPEN VACANCIES</span>
            <ChevronRight className="w-4 h-4 text-[#0B0C10]" />
          </button>
        </div>

        <div className="md:col-span-6 animate-slide-right">
          <div
            onClick={onNavigateCareers}
            className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/30 bg-[#12131A] cursor-pointer group relative interactive-card"
          >
            <img
              src="/images/career.png"
              alt="Careers at AL-AQSHA"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/career_team.jpg';
              }}
              className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/80 via-transparent to-transparent opacity-70"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

