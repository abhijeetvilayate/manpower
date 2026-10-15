import React from 'react';
import { Search, Briefcase, FileCheck, Wrench, Users, Plane, Sparkles } from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 1,
    title: 'Executive Search',
    description: 'Specialized executive placement & senior management headhunting.',
    icon: Search,
    image: '/images/services/recruitment-rpo-hd.jpg',
    fallbackImage: '/career_team.jpg'
  },
  {
    id: 2,
    title: 'Project Manpower',
    description: 'Comprehensive turn-key workforce mobilization for large industrial projects.',
    icon: Briefcase,
    image: '/images/services/project-manpower-hd.jpg',
    fallbackImage: '/images/industry/facility-management.jpg'
  },
  {
    id: 3,
    title: 'Contract Staffing',
    description: 'Flexible certified labor contracts for short & long term operational needs.',
    icon: FileCheck,
    image: '/images/services/skilled-manpower-hd.jpg',
    fallbackImage: '/skilled_manpower.jpg'
  },
  {
    id: 4,
    title: 'Technical Manpower Supply',
    description: 'Certified engineers, technicians, and specialized mechanical operators.',
    icon: Wrench,
    image: '/images/services/technical-manpower-hd.jpg',
    fallbackImage: '/images/industry/construction.jpg'
  },
  {
    id: 5,
    title: 'Unskilled Manpower Supply',
    description: 'General labor, helpers, site support, and logistics workers.',
    icon: Users,
    image: '/images/services/unskilled-manpower-hd.jpg',
    fallbackImage: '/hero_workers.jpg'
  },
  {
    id: 6,
    title: 'Visa & Travel Assistance',
    description: 'Full GAMCA medical, visa processing, and international flight logistics.',
    icon: Plane,
    image: '/images/industry/other-industries.jpg',
    fallbackImage: '/images/industry/other-industries.jpg'
  }
];

export default function ServicesSection({ onSelectServiceCategory, onOpenEnquiry }) {
  return (
    <section id="services" className="py-20 sm:py-28 bg-[#FAF8F3] border-t border-b border-[#C5A059]/30 font-sans-modern relative overflow-hidden">
      {/* Background Accent Shimmer */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#E6C575]/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Title Component with Gold Border */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E6C575]/20 border border-[#C5A059] text-[#C5A059] font-extrabold uppercase tracking-widest text-xs mb-4 font-sans-modern shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>SECTOR EXPERTISE</span>
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
              Manpower Supply Sectors
            </h2>
          </div>

          <p className="text-[#121417]/80 text-sm sm:text-base max-w-xl mx-auto mt-2 leading-relaxed font-sans">
            Delivering workforce solutions across primary Gulf industrial sectors with verified trade competencies.
          </p>

          {/* Gold Decorative Divider with Center Animated Dot */}
          <div className="flex items-center justify-center gap-2.5 mt-5">
            <span className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-[#C5A059]"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#E6C575] to-[#C5A059] border border-[#C5A059] shadow-sm animate-ping"></span>
            <span className="w-12 h-[2px] bg-gradient-to-r from-[#C5A059] via-[#C5A059] to-transparent"></span>
          </div>
        </div>

        {/* 3 Columns x 2 Rows Responsive Gold-Bordered Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((srv, idx) => {
            const IconComp = srv.icon;
            return (
              <div
                key={srv.id}
                onClick={() => {
                  if (onSelectServiceCategory) onSelectServiceCategory(srv);
                  else if (onOpenEnquiry) onOpenEnquiry(srv);
                }}
                className="overflow-hidden group cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  background: 'linear-gradient(145deg, #FFFFFF 0%, #FAF8F3 60%, #F3ECDC 100%)',
                  border: '1.5px solid #C5A059',
                  borderRadius: '14px',
                  boxShadow: '0 10px 25px -5px rgba(18, 20, 23, 0.1), 0 4px 10px rgba(197, 160, 89, 0.12)'
                }}
              >
                <div>
                  {/* Image Section with Smooth Hover Zoom & Gradient Overlay */}
                  <div className="h-52 w-full overflow-hidden relative bg-[#121417]">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = srv.fallbackImage;
                      }}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-transparent to-transparent opacity-80"></div>
                    
                    {/* Floating Corner Gradient Badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-[#121417]/90 to-[#1F232B]/90 backdrop-blur border border-[#C5A059]/50 text-[#E6C575] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      GCC Verified
                    </div>
                  </div>

                  {/* Card Content & Icon Badge Header */}
                  <div className="p-6">
                    <div className="flex items-center gap-3.5 mb-3">
                      {/* Circular gold gradient badge */}
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-[#C5A059] group-hover:bg-gradient-to-r group-hover:from-[#E6C575] group-hover:to-[#C5A059] group-hover:text-[#121417] group-hover:rotate-12 transition-all duration-300 shadow-sm"
                        style={{
                          background: 'linear-gradient(135deg, rgba(230, 197, 117, 0.35) 0%, rgba(197, 160, 89, 0.2) 100%)',
                          border: '1px solid rgba(197, 160, 89, 0.5)'
                        }}
                      >
                        <IconComp className="w-5 h-5 stroke-[1.75]" />
                      </div>
                      <h3
                        className="font-bold text-[#121417] text-lg tracking-tight group-hover:text-[#C5A059] transition-colors leading-snug"
                        style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
                      >
                        {srv.title}
                      </h3>
                    </div>

                    <p className="text-[#121417] text-xs sm:text-sm leading-relaxed opacity-95 font-sans">
                      {srv.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer Action with Metallic Hover Fill */}
                <div className="px-6 pb-6 pt-3 flex items-center justify-between text-xs font-bold text-[#C5A059] group-hover:text-[#121417] border-t border-[#C5A059]/20 transition-all group-hover:bg-gradient-to-r group-hover:from-[#E6C575]/20 group-hover:to-[#C5A059]/20">
                  <span>Explore Sector Details</span>
                  <div className="w-7 h-7 rounded-full bg-[#E6C575]/20 group-hover:bg-[#C5A059] group-hover:text-[#121417] flex items-center justify-center transition-all">
                    <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
