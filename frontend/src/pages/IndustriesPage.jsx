import React from 'react';
import { Building, Flame, Factory, Hotel, Building2, Globe, Check } from 'lucide-react';
import Navbar from '../components/sections/Navbar';
import PageHeader from '../components/common/PageHeader';
import Footer from '../components/common/Footer';

export default function IndustriesPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateServices,
  onNavigateIndustries,
  onNavigateCareers,
  onNavigateCareersWithFilter,
  onNavigateContact,
  onOpenEnquiry
}) {
  const INDUSTRIES_LIST = [
    {
      id: 1,
      name: 'Construction',
      icon: Building,
      imageUrl: '/images/industry/construction.jpg',
      description: 'High-rise towers, infrastructure, civil works, roads and bridges staffing.',
    },
    {
      id: 2,
      name: 'Oil & Gas',
      icon: Flame,
      imageUrl: '/images/industry/oil-gas.jpg',
      description: 'Upstream, downstream, refinery, shutdown, and offshore rig manpower.',
    },
    {
      id: 3,
      name: 'Manufacturing',
      icon: Factory,
      imageUrl: '/images/industry/manufacturing.jpg',
      description: 'Plant operations, assembly line labor, machinery operators and CNC techs.',
    },
    {
      id: 4,
      name: 'Hospitality',
      icon: Hotel,
      imageUrl: '/images/industry/hospitality.jpg',
      description: 'Hotel facility staff, catering crews, stewards and maintenance personnel.',
    },
    {
      id: 5,
      name: 'Facility Management',
      icon: Building2,
      imageUrl: '/images/industry/facility-management.jpg',
      description: 'Commercial estate maintenance, MEP technicians, and cleaning crews.',
    },
    {
      id: 6,
      name: 'Other Industries',
      icon: Globe,
      imageUrl: '/images/industry/other-industries.jpg',
      description: 'Custom manpower solutions across logistics, healthcare, solar & aviation.',
    },
  ];

  const handleCardClick = (industryName) => {
    if (onNavigateCareersWithFilter) {
      onNavigateCareersWithFilter(industryName);
    } else if (onNavigateCareers) {
      onNavigateCareers();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col animate-fade-in">
      {/* 1. Header Navigation Bar */}
      <Navbar
        activePage="industries"
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateServices={onNavigateServices}
        onNavigateIndustries={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateCareers={onNavigateCareers}
        onNavigateContact={onNavigateContact}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* 2. Page Header / Breadcrumb */}
      <PageHeader
        title="Industries We Serve"
        subtitle="Empowering leading GCC sectors with specialized, pre-vetted manpower pools."
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'Industries' }
        ]}
      />

      {/* 3. Main Target Industries Grid */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Tag */}
          <div className="mb-12 text-center">
            <span className="text-amber-500 font-bold uppercase tracking-widest text-xs block mb-1">
              INDUSTRIES WE SERVE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Empowering Industries Across the Gulf
            </h2>
          </div>

          {/* 6 Photo Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
            {INDUSTRIES_LIST.map((ind) => {
              const IconComp = ind.icon;
              return (
                <div
                  key={ind.id}
                  onClick={() => handleCardClick(ind.name)}
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center group pb-6"
                >
                  <div className="w-full h-44 relative mb-7">
                    <img
                      src={ind.imageUrl}
                      alt={ind.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        if (ind.name.toLowerCase().includes('oil')) {
                          e.target.src = '/images/industry/oil-&-gass.jpg';
                        } else if (ind.name.toLowerCase().includes('hospitality')) {
                          e.target.src = '/images/industry/Hospitality.jpg';
                        }
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-13 h-13 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center shadow-lg border-2 border-white group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300">
                      <IconComp className="w-6 h-6 stroke-[1.75]" />
                    </div>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-sm tracking-tight text-center px-3 group-hover:text-amber-600 transition-colors">
                    {ind.name}
                  </h3>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={onOpenEnquiry}
              className="bg-[#0B1B3D] hover:bg-slate-800 active:bg-slate-950 text-white font-black text-xs uppercase px-10 py-4 rounded-md shadow-md transition-all transform hover:-translate-y-0.5 tracking-wider cursor-pointer"
            >
              VIEW ALL INDUSTRIES
            </button>
          </div>
        </div>
      </section>

      {/* 4. Footer */}

      {/* 5. Footer */}
      <Footer
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateServices={onNavigateServices}
        onNavigateIndustries={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateCareers={onNavigateCareers}
        onNavigateContact={onNavigateContact}
      />
    </div>
  );
}
