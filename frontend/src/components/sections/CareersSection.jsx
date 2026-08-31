import React from 'react';

export default function CareersSection({ onNavigateCareers }) {
  return (
    <section className="py-16 sm:py-20 bg-[#0B1B3D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6">
          <span className="text-amber-400 font-bold uppercase tracking-widest text-xs block mb-2">
            CAREERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Build Your Career With Us
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Join AL-AQSHA Manpower Supply and be part of a team that values people, growth and excellence.
          </p>
          <button
            onClick={onNavigateCareers}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase px-8 py-3 rounded-md shadow-md tracking-wider cursor-pointer"
          >
            VIEW OPENINGS
          </button>
        </div>

        <div className="md:col-span-6">
          <div
            onClick={onNavigateCareers}
            className="rounded-2xl overflow-hidden shadow-xl border-4 border-slate-700/60 cursor-pointer group"
          >
            <img
              src="/images/career.png"
              alt="Careers at AL-AQSHA"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/career_team.jpg';
              }}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
