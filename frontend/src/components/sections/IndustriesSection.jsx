import React from 'react';
import { Building, Flame, Factory, Hotel, Building2, Globe } from 'lucide-react';

export default function IndustriesSection({ onNavigateIndustries, onNavigateCareersWithFilter }) {
  const DEFAULT_INDUSTRIES = [
    { id: 1, name: 'Construction', icon: Building },
    { id: 2, name: 'Oil & Gas', icon: Flame },
    { id: 3, name: 'Manufacturing', icon: Factory },
    { id: 4, name: 'Hospitality', icon: Hotel },
    { id: 5, name: 'Facility Management', icon: Building2 },
    { id: 6, name: 'Other Industries', icon: Globe },
  ];

  const handleCardClick = (industryName) => {
    if (onNavigateCareersWithFilter) {
      onNavigateCareersWithFilter(industryName);
    } else if (onNavigateIndustries) {
      onNavigateIndustries();
    }
  };

  return (
    <section id="industries" className="py-16 bg-[#0B1B3D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 text-amber-400 font-bold uppercase tracking-widest text-xs sm:text-sm">
            <span className="w-8 h-[1px] bg-amber-400/50"></span>
            INDUSTRIES WE SERVE
            <span className="w-8 h-[1px] bg-amber-400/50"></span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
            Empowering Industries Across the Gulf
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 text-center">
          {DEFAULT_INDUSTRIES.map((ind) => {
            const IconComp = ind.icon;
            return (
              <div
                key={ind.id}
                onClick={() => handleCardClick(ind.name)}
                className="flex flex-col items-center justify-center p-6 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-amber-400/80 hover:bg-slate-800/80 hover:scale-105 transition-all duration-300 group cursor-pointer shadow-sm"
              >
                <div className="w-14 h-14 rounded-lg flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  <IconComp className="w-10 h-10 stroke-[1.5]" />
                </div>
                <span className="font-bold text-white text-xs tracking-wider uppercase group-hover:text-amber-300 transition-colors">
                  {ind.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}