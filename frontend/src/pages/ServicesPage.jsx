import React, { useState } from 'react';
import {
  Users,
  HardHat,
  Wrench,
  Briefcase,
  UserSearch,
  Plane,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Check,
  ShieldCheck,
  Clock,
  Award,
  PhoneCall,
  Send,
  Sparkles,
  Layers,
  Building2,
  Flame,
  Factory,
  Cog,
  Hotel,
  Stethoscope,
  Truck,
  ShoppingBag,
  Sprout,
  Anchor,
  Laptop,
  Zap
} from 'lucide-react';
import Navbar from '../components/sections/Navbar';
import PageHeader from '../components/common/PageHeader';
import Footer from '../components/common/Footer';
import SubServicesModal from '../components/common/SubServicesModal';
import { getServicesData } from '../data/servicesData';

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
  Zap
};

export default function ServicesPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateServices,
  onNavigateIndustries,
  onNavigateCareers,
  onNavigateContact,
  onOpenEnquiry,
  onSelectServiceWithSub
}) {
  const servicesDataList = getServicesData();
  const [selectedCategoryModal, setSelectedCategoryModal] = useState(null);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  // Toggle states for Show More / Show Less
  const [showAllSectors, setShowAllSectors] = useState(false);
  const [showAllTrades, setShowAllTrades] = useState(false);

  const displayedSectors = showAllSectors ? servicesDataList : servicesDataList.slice(0, 4);
  const displayedTrades = showAllTrades ? servicesDataList : servicesDataList.slice(0, 6);

  const handleOpenSubModal = (category) => {
    setSelectedCategoryModal(category);
    setIsSubModalOpen(true);
  };

  const handleSelectSubService = (category, subServiceTitle) => {
    setIsSubModalOpen(false);
    if (onSelectServiceWithSub) {
      onSelectServiceWithSub(category, subServiceTitle);
    } else if (onOpenEnquiry) {
      onOpenEnquiry(category, subServiceTitle);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] font-sans text-[#121417] flex flex-col">
      {/* 1. Header Navigation Bar */}
      <Navbar
        activePage="services"
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateServices={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateIndustries={onNavigateIndustries}
        onNavigateCareers={onNavigateCareers}
        onNavigateContact={onNavigateContact}
        onOpenEnquiry={() => onOpenEnquiry && onOpenEnquiry()}
      />

      {/* 2. Page Header / Breadcrumb */}
      <PageHeader
        title="Services"
        subtitle="Explore our comprehensive manpower supply categories and trade staffing solutions across GCC."
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'Services' }
        ]}
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateServices={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateIndustries={onNavigateIndustries}
        onNavigateCareers={onNavigateCareers}
        onNavigateContact={onNavigateContact}
      />

      {/* SECTION 1: Main Services Grid */}
      <section className="py-16 sm:py-24 bg-[#F9F9F7] text-[#121417] border-b border-[#C5A059]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Tag Block */}
          <div className="mb-14 text-center">
            <div className="inline-block px-8 py-3.5 bg-[#FAF8F3] border-[1.5px] border-[#C5A059] rounded-lg shadow-sm" style={{ backgroundColor: '#FAF8F3', border: '1.5px solid #C5A059' }}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#121417] tracking-wider uppercase font-serif-luxury" style={{ color: '#121417', fontFamily: "'Cinzel', 'Playfair Display', serif" }}>
                Manpower Supply Sectors
              </h2>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm mt-3 max-w-2xl mx-auto leading-relaxed font-sans font-light">
              Click on any sector below to view all trade sub-services and request pre-filled recruitment proposals.
            </p>
          </div>

          {/* Grid matching reference design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10 transition-all duration-500">
            {displayedSectors.map((srv, idx) => {
              const IconComp = ICON_MAP[srv.iconName] || Building2;

              return (
                <div
                  key={srv.id}
                  onClick={() => handleOpenSubModal(srv)}
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
                        View Trades
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-[#121417] text-lg mb-2 leading-snug group-hover:text-[#C5A059] transition-colors font-sans">
                      {srv.title}
                    </h3>

                    {/* Description */}
                    <p className="text-stone-600 text-xs leading-relaxed line-clamp-3 mb-4 font-sans font-normal">
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#C5A059]/20 flex items-center justify-between text-xs font-bold text-[#121417] group-hover:text-[#C5A059] transition-colors">
                    <span>View Trades</span>
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
                  <span>Show Less Services</span> <ChevronUp className="w-4 h-4 text-[#D4AF37]" />
                </>
              ) : (
                <>
                  <span>Show More Services</span> <ChevronDown className="w-4 h-4 text-[#D4AF37] animate-bounce" />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: Detailed Breakdown of Each Service Category */}
      <section className="py-16 sm:py-24 bg-[#0B0C10] text-white border-b border-[#D4AF37]/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14 animate-slide-up">
            <span className="text-[#D4AF37] font-heading font-black uppercase tracking-widest text-xs inline-flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37]/15 rounded-full border border-[#D4AF37]/40 mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>DETAILED TRADE BREAKDOWN</span>
            </span>
            <h3 className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tight">
              Trade &amp; Skill Categories Supplied
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm mt-2 font-body">
              Select any sub-service trade to immediately request rate cards, manpower availability, and mobilization schedules.
            </p>
          </div>

          {/* Flex Wrap Layout */}
          <div className="flex flex-wrap -mx-3.5 mb-10 items-stretch">
            {displayedTrades.map((srv, idx) => {
              const IconComp = ICON_MAP[srv.iconName] || Building2;
              const displaySubServices = srv.subServices.slice(0, 6);
              const remainingCount = srv.subServices.length - displaySubServices.length;

              return (
                <div
                  key={srv.id}
                  className="p-3.5 w-full md:w-1/2 lg:w-1/3 flex-grow max-w-full flex animate-slide-up"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="bg-[#12131A] p-6 rounded-2xl border-2 border-[#D4AF37]/20 border-l-4 border-l-[#D4AF37] shadow-xl hover:border-[#D4AF37] transition-all flex flex-col justify-between w-full">
                    <div>
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#0B0C10] text-[#D4AF37] p-2.5 flex items-center justify-center flex-shrink-0 shadow-md border border-[#D4AF37]/30">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-heading font-extrabold text-white text-base leading-tight">
                            {srv.title}
                          </h4>
                          <span className="text-[11px] text-[#D4AF37] font-semibold">
                            Trade Specializations
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-2 mb-6 font-body">
                        {displaySubServices.map((sub, sIdx) => (
                          <li
                            key={sIdx}
                            onClick={() => handleSelectSubService(srv, sub)}
                            className="flex items-center justify-between text-xs text-stone-300 font-medium hover:text-[#D4AF37] cursor-pointer group/item py-1.5 px-2.5 rounded-lg hover:bg-[#0B0C10] transition-colors border border-transparent hover:border-[#D4AF37]/30"
                          >
                            <span className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                              {sub}
                            </span>
                            <span className="text-[10px] font-heading font-extrabold text-[#D4AF37] opacity-0 group-hover/item:opacity-100 transition-opacity">
                              Select →
                            </span>
                          </li>
                        ))}
                        {remainingCount > 0 && (
                          <li
                            onClick={() => handleOpenSubModal(srv)}
                            className="text-xs font-heading font-black text-[#D4AF37] hover:text-[#F5D061] cursor-pointer pt-1 pl-6 flex items-center gap-1"
                          >
                            View All Trades
                          </li>
                        )}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleOpenSubModal(srv)}
                      className="w-full py-3 bg-gradient-to-r from-[#F5D061] via-[#D4AF37] to-[#AA7C11] hover:brightness-110 text-[#0B0C10] font-heading font-black text-xs uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
                    >
                      <Layers className="w-4 h-4 text-[#0B0C10]" />
                      <span>Explore All Trades &amp; Request</span>
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

      {/* SECTION 3: Service Guarantees */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 animate-slide-up">
            <span className="text-[#D4AF37] font-heading font-extrabold uppercase tracking-widest text-xs block mb-1">
              QUALITY COMMITMENT
            </span>
            <h3 className="text-3xl font-heading font-black text-[#0B0C10] tracking-tight">
              Our Service Level Commitments
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm mt-2 font-body">
              Every client engagement is backed by transparent SLAs and complete compliance guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF9F5] border-2 border-[#D4AF37]/20 text-center interactive-card">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#F5D061] to-[#D4AF37] text-[#0B0C10] flex items-center justify-center mx-auto mb-4 font-bold shadow-md">
                <Clock className="w-7 h-7" />
              </div>
              <h4 className="font-heading font-extrabold text-[#0B0C10] text-base mb-2">Rapid Mobilization</h4>
              <p className="text-stone-600 text-xs leading-relaxed font-body">
                Emergency staffing &amp; rapid site deployment within 48-72 hours.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F5] border-2 border-[#D4AF37]/20 text-center interactive-card">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#F5D061] to-[#D4AF37] text-[#0B0C10] flex items-center justify-center mx-auto mb-4 font-bold shadow-md">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="font-heading font-extrabold text-[#0B0C10] text-base mb-2">100% Legal Visas</h4>
              <p className="text-stone-600 text-xs leading-relaxed font-body">
                Full MOHRE, GAMCA, and ministry legal compliance in all GCC countries.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F5] border-2 border-[#D4AF37]/20 text-center interactive-card">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#F5D061] to-[#D4AF37] text-[#0B0C10] flex items-center justify-center mx-auto mb-4 font-bold shadow-md">
                <Award className="w-7 h-7" />
              </div>
              <h4 className="font-heading font-extrabold text-[#0B0C10] text-base mb-2">Trade Vetted Staff</h4>
              <p className="text-stone-600 text-xs leading-relaxed font-body">
                Skill testing &amp; background verification before arrival at client site.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F5] border-2 border-[#D4AF37]/20 text-center interactive-card">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#F5D061] to-[#D4AF37] text-[#0B0C10] flex items-center justify-center mx-auto mb-4 font-bold shadow-md">
                <Users className="w-7 h-7" />
              </div>
              <h4 className="font-heading font-extrabold text-[#0B0C10] text-base mb-2">Dedicated Site Manager</h4>
              <p className="text-stone-600 text-xs leading-relaxed font-body">
                Single point of contact for shift rosters, welfare, and logistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Call To Action Banner */}
      <section className="py-16 bg-[#0B0C10] text-white border-t border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 animate-slide-up">
          <h3 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">
            Need Custom Manpower Solutions For Your Enterprise?
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-body">
            Contact our corporate team today for customized manpower proposals, rate cards, and rapid contract deployment across the Gulf region.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry()}
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#F5D061] via-[#D4AF37] to-[#AA7C11] hover:brightness-110 text-[#0B0C10] font-heading font-black text-xs uppercase px-8 py-4 rounded-xl shadow-xl shadow-[#D4AF37]/25 transition-all cursor-pointer transform hover:-translate-y-0.5 animate-pulse-glow-gold"
            >
              <Send className="w-4 h-4 text-[#0B0C10]" />
              <span>REQUEST MANPOWER PROPOSAL</span>
            </button>
            <button
              onClick={onNavigateContact}
              className="inline-flex items-center gap-2 bg-[#12131A] hover:bg-[#161722] text-white font-heading font-extrabold text-xs uppercase px-8 py-4 rounded-xl border border-[#D4AF37]/30 transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
              <span>TALK TO SLA EXPERT</span>
            </button>
          </div>
        </div>
      </section>

      {/* Sub-Services Popup Modal */}
      <SubServicesModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        service={selectedCategoryModal}
        onSelectSubService={handleSelectSubService}
      />

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

