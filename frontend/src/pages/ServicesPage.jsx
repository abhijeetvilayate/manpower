import React from 'react';
import {
  Users,
  HardHat,
  Wrench,
  Briefcase,
  UserSearch,
  Plane,
  ChevronRight,
  CheckCircle2,
  Check
} from 'lucide-react';
import Navbar from '../components/sections/Navbar';
import PageHeader from '../components/common/PageHeader';
import Footer from '../components/common/Footer';

export default function ServicesPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateServices,
  onNavigateIndustries,
  onNavigateCareers,
  onNavigateContact,
  onOpenEnquiry
}) {
  const DEFAULT_SERVICES = [
    {
      id: 1,
      title: 'Skilled Manpower Supply',
      description: 'Providing qualified and experienced professionals for diverse roles.',
      pngIcon: '/images/service_png_icons/skilled.png',
      details: ['Electricians & Plumbers', 'Welders & Fabricators', 'Masons & Carpenters', 'HVAC Technicians'],
    },
    {
      id: 2,
      title: 'Unskilled Manpower Supply',
      description: 'Reliable and efficient workforce for supporting your daily operations.',
      pngIcon: '/images/service_png_icons/unskilled.png',
      details: ['General Laborers', 'Construction Helpers', 'Loading & Unloading Staff', 'Site Cleaning Crew'],
    },
    {
      id: 3,
      title: 'Technical Manpower Supply',
      description: 'Specialized technical experts to drive your projects to success.',
      pngIcon: '/images/service_png_icons/technical.png',
      details: ['Site Engineers', 'QA/QC Inspectors', 'Safety Officers (NEBOSH)', 'PLC & Automation Techs'],
    },
    {
      id: 4,
      title: 'Project-based Manpower Supply',
      description: 'Customized staffing solutions designed for short and long-term projects.',
      pngIcon: '/images/service_png_icons/project.png',
      details: ['Turnkey Shutdown Staffing', 'Seasonal Project Crews', 'Contract Staff Augmentation', 'Emergency Rapid Deployment'],
    },
    {
      id: 5,
      title: 'Recruitment Process Outsourcing',
      description: 'End-to-end recruitment management tailored to your organizational needs.',
      pngIcon: '/images/service_png_icons/rpo.png',
      details: ['International Talent Sourcing', 'Trade Skill Testing Centers', 'Background & Medical Screening', 'Onboarding & Induction'],
    },
    {
      id: 6,
      title: 'Other Industries',
      description: 'Comprehensive workforce solutions tailored for logistics, solar, healthcare, aviation, and emerging sectors.',
      pngIcon: '/images/service_png_icons/other.png',
      details: ['Logistics & Warehouse Workers', 'Solar & Renewable Techs', 'Healthcare Assistants & Stewards', 'Aviation Maintenance Crews'],
    },
  ];

  const [servicesList, setServicesList] = React.useState(DEFAULT_SERVICES);

  React.useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('adminServices') || '[]');
    if (stored && stored.length > 0) {
      const merged = [...DEFAULT_SERVICES];
      stored.forEach((s) => {
        const existingIdx = merged.findIndex((m) => m.title.toLowerCase() === s.title.toLowerCase());
        if (existingIdx !== -1) {
          merged[existingIdx] = {
            ...merged[existingIdx],
            ...s,
            pngIcon: s.pngIcon || merged[existingIdx].pngIcon
          };
        } else {
          merged.push({
            id: s.id || Date.now(),
            title: s.title,
            description: s.description || 'Custom manpower supply solutions tailored by AL-AQSHA.',
            pngIcon: s.pngIcon || '/images/service_png_icons/other.png',
            details: s.details || ['Specialized Site Workforce', 'Vetted & Trade-Tested Staff', 'Full Compliance & Deployment']
          });
        }
      });
      setServicesList(merged);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col animate-fade-in">
      {/* 1. Header Navigation Bar */}
      <Navbar
        activePage="services"
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateServices={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateIndustries={onNavigateIndustries}
        onNavigateCareers={onNavigateCareers}
        onNavigateContact={onNavigateContact}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* 2. Page Header / Breadcrumb */}
      <PageHeader
        title="Services"
        subtitle="Explore our comprehensive manpower supply solutions tailored for enterprises."
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'Services' }
        ]}
      />

      {/* 3. Main Target Services Grid */}
      <section className="py-16 sm:py-20 bg-[#0B1B3D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Tag */}
          <div className="mb-12 text-center">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-xs block mb-1">
              OUR SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Comprehensive Manpower Supply Solutions
            </h2>
          </div>

          {/* 6 Vertical White Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
            {servicesList.map((srv) => (
              <div
                key={srv.id}
                onClick={onOpenEnquiry}
                className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center group"
              >
                {/* PNG Icon with Pure White Background Container */}
                <div className="w-20 h-20 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center p-2.5 mb-5 group-hover:scale-110 transition-transform overflow-hidden">
                  <img
                    src={srv.pngIcon || srv.imageUrl || '/images/service_png_icons/other.png'}
                    alt={srv.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-3 leading-snug group-hover:text-amber-600 transition-colors">
                  {srv.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-xs leading-relaxed font-normal">
                  {srv.description}
                </p>
              </div>
            ))}
          </div>

          {/* Solid Gold View All Services Button */}
          <div className="text-center">
            <button
              onClick={onOpenEnquiry}
              className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black text-xs uppercase px-10 py-4 rounded-md shadow-lg transition-all transform hover:-translate-y-0.5 tracking-wider cursor-pointer"
            >
              VIEW ALL SERVICES
            </button>
          </div>
        </div>
      </section>

      {/* 4. Detailed Breakdown of Each Service */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-slate-900">Why Partner With Us For Manpower?</h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              We manage recruitment, visa sponsorship, medical testing, transport, and site accommodation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((srv) => (
              <div key={srv.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm p-1.5 flex items-center justify-center flex-shrink-0">
                      <img src={srv.pngIcon || srv.imageUrl || '/images/service_png_icons/other.png'} alt={srv.title} className="w-full h-full object-contain" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-base leading-tight">
                      {srv.title}
                    </h4>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {srv.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={onOpenEnquiry}
                  className="w-full py-2.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs uppercase rounded transition-colors cursor-pointer"
                >
                  Request Proposal
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <Footer
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateServices={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateIndustries={onNavigateIndustries}
        onNavigateCareers={onNavigateCareers}
        onNavigateContact={onNavigateContact}
      />
    </div>
  );
}
