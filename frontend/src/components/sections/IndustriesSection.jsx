import React, { useState } from 'react';
import {
  Building2,
  Flame,
  Factory,
  Wrench,
  Cog,
  Hotel,
  Stethoscope,
  Truck,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Sprout,
  Anchor,
  Briefcase,
  Laptop,
  Zap,
  Globe,
  Layers,
  GraduationCap,
  Landmark,
  Radio,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { getIndustriesData } from '../../data/industriesData';

const ICON_MAP = {
  Building2,
  Flame,
  Factory,
  Wrench,
  Cog,
  Hotel,
  Stethoscope,
  Truck,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Sprout,
  Anchor,
  Briefcase,
  Laptop,
  Zap,
  Globe,
  Layers,
  GraduationCap,
  Landmark,
  Radio
};

export default function IndustriesSection({
  onNavigateIndustries,
  onSelectIndustryCategory,
  onOpenEnquiry
}) {
  const industriesDataList = getIndustriesData();
  const [showAllIndustries, setShowAllIndustries] = useState(false);

  const displayedIndustries = showAllIndustries ? industriesDataList : industriesDataList.slice(0, 4);

  return (
    <section id="industries" className="py-20 sm:py-28 bg-[#FAF8F3] text-[#121417] relative overflow-hidden border-t border-b border-[#C5A059]/30 font-sans-modern">
      {/* Subtle Background Shimmer Accent */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#E6C575]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Bordered Title Component */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E6C575]/20 border border-[#C5A059] text-[#C5A059] font-extrabold uppercase tracking-widest text-xs mb-4 font-sans-modern shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>GCC COVERAGE</span>
          </span>

          {/* Bordered Title Component Block */}
          <div
            className="p-6 sm:p-8 rounded-2xl border-[1.5px] border-[#C5A059] shadow-lg mb-4 inline-block w-full max-w-2xl transition-all hover:border-[#E6C575] hover:shadow-xl"
            style={{
              background: 'linear-gradient(145deg, #FFFFFF 0%, #FAF8F3 60%, #F5ECE0 100%)',
              border: '1.5px solid #C5A059',
              borderRadius: '16px',
              boxShadow: '0 12px 30px -5px rgba(18, 20, 23, 0.08), 0 4px 12px rgba(197, 160, 89, 0.15)'
            }}
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121417] tracking-tight leading-tight"
              style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif", color: '#121417' }}
            >
              Empowering Industries Across the Gulf
            </h2>
          </div>

          <p className="text-[#121417]/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-sans">
            Specialized trade staffing, certified technician teams, and workforce deployment tailored to GCC industrial sectors.
          </p>

          {/* Gold Decorative Divider with Animated Center Dot */}
          <div className="flex items-center justify-center gap-2.5 mt-5">
            <span className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-[#C5A059]"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#E6C575] to-[#C5A059] border border-[#C5A059] shadow-sm animate-ping"></span>
            <span className="w-12 h-[2px] bg-gradient-to-r from-[#C5A059] via-[#C5A059] to-transparent"></span>
          </div>
        </div>

        {/* 4 Industries Default / Expanded Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7 transition-all duration-500">
          {displayedIndustries.map((ind, idx) => {
            const IconComp = ICON_MAP[ind.iconName] || Building2;

            return (
              <div
                key={ind.id}
                onClick={() => onSelectIndustryCategory ? onSelectIndustryCategory(ind) : (onNavigateIndustries && onNavigateIndustries())}
                className="p-6 cursor-pointer flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2.5 hover:shadow-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #FFFFFF 0%, #FAF8F3 60%, #F3ECDC 100%)',
                  border: '1.5px solid #C5A059',
                  borderRadius: '14px',
                  boxShadow: '0 10px 25px -5px rgba(18, 20, 23, 0.1), 0 4px 10px rgba(197, 160, 89, 0.12)',
                  animationDelay: `${idx * 80}ms`
                }}
              >
                {/* Top Gold Metallic Accent Line on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E6C575] via-[#C5A059] to-[#9E7D3B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    {/* Icon Badge */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-[#C5A059] group-hover:bg-gradient-to-r group-hover:from-[#E6C575] group-hover:to-[#C5A059] group-hover:text-[#121417] group-hover:rotate-12 transition-all duration-300 shadow-sm"
                      style={{
                        background: 'linear-gradient(135deg, rgba(230, 197, 117, 0.35) 0%, rgba(197, 160, 89, 0.2) 100%)',
                        border: '1px solid rgba(197, 160, 89, 0.5)'
                      }}
                    >
                      <IconComp className="w-7 h-7 stroke-[1.75]" />
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#C5A059] bg-gradient-to-r from-[#E6C575]/25 to-[#C5A059]/15 px-3 py-1 rounded-full border border-[#C5A059]/40 shadow-xs">
                      Vetted Trade
                    </span>
                  </div>

                  <h3
                    className="font-bold text-[#121417] text-base sm:text-lg mb-2 group-hover:text-[#C5A059] transition-colors leading-snug"
                    style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
                  >
                    {ind.name}
                  </h3>

                  <p className="text-[#121417] text-xs leading-relaxed line-clamp-3 mb-5 opacity-90 font-sans">
                    {ind.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#C5A059]/20 flex items-center justify-between text-xs font-extrabold text-[#C5A059] group-hover:text-[#121417] transition-all group-hover:bg-gradient-to-r group-hover:from-[#E6C575]/20 group-hover:to-[#C5A059]/20 rounded-b-lg">
                  <span>Explore Openings</span>
                  <div className="w-7 h-7 rounded-full bg-[#E6C575]/20 group-hover:bg-[#C5A059] group-hover:text-[#121417] flex items-center justify-center transition-all shadow-sm">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More / Show Less Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAllIndustries(!showAllIndustries)}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-xs uppercase font-extrabold tracking-wider shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #E6C575 0%, #C5A059 50%, #9E7D3B 100%)',
              boxShadow: '0 4px 15px rgba(197, 160, 89, 0.35)',
              color: '#121417',
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
            }}
          >
            {showAllIndustries ? (
              <>
                <span>Show Less Sectors</span> <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Show More Sectors</span> <ChevronDown className="w-4 h-4 animate-bounce" />
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
}


