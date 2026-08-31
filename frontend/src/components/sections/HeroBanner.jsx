import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function HeroBanner({ onNavigateServices }) {
  return (
    <section id="home" className="bg-[#0B1B3D] text-white relative pt-16 pb-28 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        <div className="md:col-span-7 pr-0 md:pr-6 animate-slide-up">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
            ✨ Registered Manpower Agency
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6 uppercase">
            BUILDING THE FUTURE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-300">
              WITH RIGHT PEOPLE
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl mb-8 leading-relaxed">
            We provide skilled, semi-skilled and unskilled manpower to leading companies across the Gulf Countries.
          </p>
          <button
            onClick={onNavigateServices}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase px-8 py-4 rounded-md shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-1 tracking-wider cursor-pointer"
          >
            OUR SERVICES <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="md:col-span-5 relative flex justify-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-700/50 max-w-md w-full animate-float relative group">
            <img
              src="/hero_workers.jpg"
              alt="Manpower Workers"
              className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/70 via-transparent to-transparent opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
}