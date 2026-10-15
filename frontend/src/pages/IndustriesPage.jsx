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
  ChevronUp,
  Check,
  Send,
  PhoneCall,
  Clock,
  Award,
  Users
} from 'lucide-react';
import Navbar from '../components/sections/Navbar';
import PageHeader from '../components/common/PageHeader';
import Footer from '../components/common/Footer';
import IndustrySubModal from '../components/common/IndustrySubModal';
import { getIndustriesData } from '../data/industriesData';

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

export default function IndustriesPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateServices,
  onNavigateIndustries,
  onNavigateCareers,
  onNavigateContact,
  onOpenEnquiry,
  onSelectIndustryWithJob
}) {
  const industriesDataList = getIndustriesData();
  const [selectedIndustryModal, setSelectedIndustryModal] = useState(null);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  // Toggle states for Show More / Show Less
  const [showAllSectors, setShowAllSectors] = useState(false);
  const [showAllTrades, setShowAllTrades] = useState(false);

  const displayedSectors = showAllSectors ? industriesDataList : industriesDataList.slice(0, 4);
  const displayedTrades = showAllTrades ? industriesDataList : industriesDataList.slice(0, 6);

  const handleOpenSubModal = (industry) => {
    setSelectedIndustryModal(industry);
    setIsSubModalOpen(true);
  };

  const handleSelectJob = (industry, jobTitle) => {
    setIsSubModalOpen(false);
    if (onSelectIndustryWithJob) {
      onSelectIndustryWithJob(industry, jobTitle);
    } else if (onOpenEnquiry) {
      onOpenEnquiry(industry, jobTitle);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] text-[#121417] flex flex-col font-sans">
      {/* 1. Header Navigation Bar */}
      <Navbar
        activePage="industries"
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateServices={onNavigateServices}
        onNavigateIndustries={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateCareers={onNavigateCareers}
        onNavigateContact={onNavigateContact}
        onOpenEnquiry={() => onOpenEnquiry && onOpenEnquiry()}
      />

      {/* 2. Page Header / Breadcrumb */}
      <PageHeader
        title="Industries We Serve"
        subtitle="Empowering leading GCC sectors with specialized, pre-vetted manpower pools across 20+ key industries."
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'Industries' }
        ]}
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateServices={onNavigateServices}
        onNavigateIndustries={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateCareers={onNavigateCareers}
        onNavigateContact={onNavigateContact}
      />

      {/* SECTION 1: Main Industries Grid */}
      <section className="py-16 sm:py-24 bg-[#F9F9F7] text-[#121417] border-b border-[#C5A059]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Tag Block */}
          <div className="mb-14 text-center">
            <div className="inline-block px-8 py-3.5 bg-[#FAF8F3] border-[1.5px] border-[#C5A059] rounded-lg shadow-sm" style={{ backgroundColor: '#FAF8F3', border: '1.5px solid #C5A059' }}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#121417] tracking-wider uppercase font-serif-luxury" style={{ color: '#121417', fontFamily: "'Cinzel', 'Playfair Display', serif" }}>
                Empowering Industries Across the Gulf
              </h2>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm mt-3 max-w-2xl mx-auto leading-relaxed font-sans font-light">
              Click on any sector below to explore job categories, trade roles, and request tailored workforce proposals.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10 transition-all duration-500">
            {displayedSectors.map((ind, idx) => {
              const IconComp = ICON_MAP[ind.iconName] || Building2;

              return (
                <div
                  key={ind.id}
                  onClick={() => handleOpenSubModal(ind)}
                  className="card-gold-bordered p-6 cursor-pointer flex flex-col justify-between group"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div>
                    {/* Icon Container */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#E6C575]/40 border border-[#C5A059] flex items-center justify-center text-[#121417] group-hover:bg-[#C5A059] transition-colors">
                        <IconComp className="w-6 h-6 stroke-[1.75]" />
                      </div>
                      <span className="text-[10px] font-bold text-[#C5A059] bg-[#C5A059]/10 px-2.5 py-1 rounded-full border border-[#C5A059]/30">
                        Explore Sector
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-[#121417] text-lg mb-2 leading-snug group-hover:text-[#C5A059] transition-colors font-sans">
                      {ind.name || ind.title}
                    </h3>

                    {/* Description */}
                    <p className="text-stone-600 text-xs leading-relaxed line-clamp-3 mb-4 font-sans font-normal">
                      {ind.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#C5A059]/20 flex items-center justify-between text-xs font-bold text-[#121417] group-hover:text-[#C5A059] transition-colors">
                    <span>View Roles</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show More / Show Less Button for Section 1 */}
          <div className="text-center">
            <button
              onClick={() => setShowAllSectors(!showAllSectors)}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#0B0C10] hover:bg-[#161722] text-white font-heading font-black text-xs uppercase tracking-wider shadow-xl border border-[#D4AF37]/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              {showAllSectors ? (
                <>
                  <span>Show Less Industries</span> <ChevronUp className="w-4 h-4 text-[#D4AF37]" />
                </>
              ) : (
                <>
                  <span>Show More Industries</span> <ChevronDown className="w-4 h-4 text-[#D4AF37] animate-bounce" />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: Detailed Job Breakdown by Industry */}
      <section className="py-16 sm:py-24 bg-[#0B0C10] text-white border-b border-[#D4AF37]/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14 animate-slide-up">
            <span className="text-[#D4AF37] font-heading font-black uppercase tracking-widest text-xs inline-flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37]/15 rounded-full border border-[#D4AF37]/40 mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>DETAILED INDUSTRY BREAKDOWN</span>
            </span>
            <h3 className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tight">
              Trade &amp; Job Categories Supplied
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm mt-2 font-body">
              Select any specific job role below to request rate cards, candidate profiles, and mobilization schedules.
            </p>
          </div>

          {/* Flex Wrap Layout */}
          <div className="flex flex-wrap -mx-3.5 mb-10 items-stretch">
            {displayedTrades.map((ind, idx) => {
              const IconComp = ICON_MAP[ind.iconName] || Building2;
              const displayJobs = ind.jobCategories.slice(0, 6);

              return (
                <div
                  key={ind.id}
                  className="p-3.5 w-full md:w-1/2 lg:w-1/3 flex-grow max-w-full flex animate-slide-up"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="bg-[#12131A] p-6 rounded-2xl border-2 border-[#D4AF37]/20 border-l-4 border-l-[#D4AF37] shadow-xl hover:border-[#D4AF37] transition-all flex flex-col justify-between w-full">
                    <div>
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#0B0C10] text-[#D4AF37] p-2.5 flex items-center justify-center flex-shrink-0 shadow-md border border-[#D4AF37]/30">
                          <IconComp className="w-6 h-6 stroke-[1.75]" />
                        </div>
                        <div>
                          <h4 className="font-heading font-extrabold text-white text-base leading-tight">
                            {ind.name}
                          </h4>
                          <span className="text-[11px] text-[#D4AF37] font-semibold">
                            Job Roles Available
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-2 mb-6 font-body">
                        {displayJobs.map((jobTitle, jIdx) => (
                          <li
                            key={jIdx}
                            onClick={() => handleSelectJob(ind, jobTitle)}
                            className="flex items-center justify-between text-xs text-stone-300 font-medium hover:text-[#D4AF37] cursor-pointer group/item py-1.5 px-2.5 rounded-lg hover:bg-[#0B0C10] transition-colors border border-transparent hover:border-[#D4AF37]/30"
                          >
                            <span className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                              {jobTitle}
                            </span>
                            <span className="text-[10px] font-heading font-extrabold text-[#D4AF37] opacity-0 group-hover/item:opacity-100 transition-opacity">
                              Select →
                            </span>
                          </li>
                        ))}
                        <li
                          onClick={() => handleOpenSubModal(ind)}
                          className="text-xs font-heading font-black text-[#D4AF37] hover:text-[#F5D061] cursor-pointer pt-1 pl-6 flex items-center gap-1"
                        >
                          View All Job Roles
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => handleOpenSubModal(ind)}
                      className="w-full py-3 bg-gradient-to-r from-[#F5D061] via-[#D4AF37] to-[#AA7C11] hover:brightness-110 text-[#0B0C10] font-heading font-black text-xs uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
                    >
                      <Layers className="w-4 h-4 text-[#0B0C10]" />
                      <span>Explore All Job Roles &amp; Request</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show More / Show Less Button for Section 2 */}
          <div className="text-center">
            <button
              onClick={() => setShowAllTrades(!showAllTrades)}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#F5D061] via-[#D4AF37] to-[#AA7C11] hover:brightness-110 text-[#0B0C10] font-heading font-black text-xs uppercase tracking-wider shadow-xl shadow-[#D4AF37]/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              {showAllTrades ? (
                <>
                  <span>Show Less Categories</span> <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Show More Categories</span> <ChevronDown className="w-4 h-4 animate-bounce" />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: Call To Action Banner */}
      <section className="py-16 bg-[#0B0C10] text-white border-t border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 animate-slide-up">
          <h3 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">
            Need Specialized Industry Manpower Solutions?
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-body font-medium">
            Partner with AL-AQSHA MANPOWER CONSULTANCY for rapid deployment of pre-vetted workforce across GCC construction, oil &amp; gas, industrial, and facility management projects.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry()}
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#F5D061] via-[#D4AF37] to-[#AA7C11] hover:brightness-110 text-[#0B0C10] font-heading font-black text-xs uppercase px-8 py-4 rounded-xl shadow-xl shadow-[#D4AF37]/25 transition-all cursor-pointer transform hover:-translate-y-0.5 animate-pulse-glow-gold"
            >
              <Send className="w-4 h-4 text-[#0B0C10]" />
              <span>REQUEST INDUSTRY PROPOSAL</span>
            </button>
            <button
              onClick={onNavigateContact}
              className="inline-flex items-center gap-2 bg-[#12131A] hover:bg-[#161722] text-white font-heading font-extrabold text-xs uppercase px-8 py-4 rounded-xl border border-[#D4AF37]/30 transition-all cursor-pointer shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
              <span>TALK TO SLA EXPERT</span>
            </button>
          </div>
        </div>
      </section>

      {/* Sub-Services Popup Modal */}
      <IndustrySubModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        industry={selectedIndustryModal}
        onSelectIndustryJob={handleSelectJob}
      />

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


