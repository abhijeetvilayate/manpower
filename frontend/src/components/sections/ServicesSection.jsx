import React from 'react';

const SERVICES_DATA = [
  {
    id: 1,
    title: 'Skilled Manpower Supply',
    image: '/images/services/skilled-manpower-hd.jpg',
    fallbackImage: '/skilled_manpower.jpg'
  },
  {
    id: 2,
    title: 'Unskilled Manpower Supply',
    image: '/images/services/unskilled-manpower-hd.jpg',
    fallbackImage: '/hero_workers.jpg'
  },
  {
    id: 3,
    title: 'Technical Manpower Supply',
    image: '/images/services/technical-manpower-hd.jpg',
    fallbackImage: '/images/industry/construction.jpg'
  },
  {
    id: 4,
    title: 'Project-based Manpower Supply',
    image: '/images/services/project-manpower-hd.jpg',
    fallbackImage: '/images/industry/facility-management.jpg'
  },
  {
    id: 5,
    title: 'Recruitment Process Outsourcing',
    image: '/images/services/recruitment-rpo-hd.jpg',
    fallbackImage: '/career_team.jpg'
  },
  {
    id: 6,
    title: 'Other Industries',
    image: '/images/industry/other-industries.jpg',
    fallbackImage: '/images/industry/other-industries.jpg'
  }
];

export default function ServicesSection({ onSelectService }) {
  return (
    <section id="services" className="py-16 sm:py-20 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header matching reference image */}
        <div className="text-center mb-12">
          <span className="text-slate-500 font-bold uppercase tracking-widest text-xs block mb-1">
            OUR SERVICES
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
            Comprehensive Manpower <br className="hidden sm:inline" />
            Supply Solutions
          </h2>
          
          {/* Decorative line with center dot matching reference image */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="w-8 h-[2px] bg-amber-500"></span>
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="w-8 h-[2px] bg-amber-500"></span>
          </div>
        </div>

        {/* 3 Columns x 2 Rows Cards Grid matching reference image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((srv) => (
            <div
              key={srv.id}
              onClick={() => onSelectService && onSelectService(srv)}
              className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col"
            >
              {/* Image Section - Crystal Clear Sharp Photography */}
              <div className="h-52 sm:h-56 w-full overflow-hidden relative bg-slate-100">
                <img
                  src={srv.image}
                  alt={srv.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = srv.fallbackImage;
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Title Section */}
              <div className="p-5 text-center bg-white flex items-center justify-center min-h-[76px] border-t border-slate-100">
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight leading-snug group-hover:text-amber-600 transition-colors">
                  {srv.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}