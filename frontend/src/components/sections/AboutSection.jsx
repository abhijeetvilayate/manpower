import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function AboutSection({ onNavigateAbout }) {
  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-6">
          <span className="text-slate-500 font-bold uppercase tracking-widest text-xs block mb-2">
            ABOUT US
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
            Your Growth Is Our Mission
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
            AL-AQSHA Manpower Supply is a trusted recruitment partner in Gulf countries. Our mission is to deliver the right people, with the right skills, at the right time to drive your business forward.
          </p>
          <button
            onClick={onNavigateAbout}
            className="inline-flex items-center gap-2 bg-[#0B1B3D] hover:bg-slate-800 text-white font-bold text-xs uppercase px-8 py-3.5 rounded-md shadow-md transition-all transform hover:-translate-y-0.5 tracking-wider cursor-pointer"
          >
            READ MORE <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="md:col-span-6">
          <div
            onClick={onNavigateAbout}
            className="rounded-2xl overflow-hidden shadow-xl border-4 border-white group relative cursor-pointer"
          >
            <img
              src="/gulf_skyline.jpg"
              alt="Gulf City Skyline"
              className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-3 py-1.5 rounded-full shadow-md">
              10+ Years Experience
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}