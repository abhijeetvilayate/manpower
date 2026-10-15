import React from 'react';
import { Award, Users, CheckCircle2, Building2, Target, Eye, Globe } from 'lucide-react';
import Navbar from '../components/sections/Navbar';
import PageHeader from '../components/common/PageHeader';
import Footer from '../components/common/Footer';

export default function AboutPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateServices,
  onNavigateIndustries,
  onNavigateCareers,
  onNavigateContact,
  onOpenEnquiry
}) {
  return (
    <div className="min-h-screen bg-[#F9F9F7] font-sans text-[#121417] flex flex-col font-sans">
      {/* 1. Header Navigation */}
      <Navbar
        activePage="about"
        onNavigateHome={onNavigateHome}
        onNavigateAbout={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateServices={onNavigateServices}
        onNavigateIndustries={onNavigateIndustries}
        onNavigateCareers={onNavigateCareers}
        onNavigateContact={onNavigateContact}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* 2. Page Header / Breadcrumb */}
      <PageHeader
        title="About Us"
        subtitle="Learn about our journey, vision, and commitment to providing top-tier manpower across the GCC."
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'About Us' }
        ]}
        onNavigateHome={onNavigateHome}
        onNavigateAbout={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateServices={onNavigateServices}
        onNavigateIndustries={onNavigateIndustries}
        onNavigateCareers={onNavigateCareers}
        onNavigateContact={onNavigateContact}
      />

      {/* 3. Main Content Section */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#E8E3D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 animate-slide-left">
            <span className="text-[#D4AF37] font-extrabold uppercase tracking-widest text-xs inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/30 font-heading shadow-sm">
              WHO WE ARE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B0C10] tracking-tight leading-tight font-heading">
              Building the Future With <span className="text-gold-shimmer">Right People</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-body">
              AL-AQSHA MANPOWER CONSULTANCY is a premier recruitment and staffing agency operating across the Gulf Cooperation Council (GCC). We specialize in sourcing, vetting, and mobilizing high-caliber personnel across Construction, Oil & Gas, Manufacturing, Engineering, and Facility Management sectors.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E3D5] hover:border-[#D4AF37]/50 transition-all shadow-sm group">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0B0C10] text-sm font-heading">100% Vetted Personnel</h4>
                  <p className="text-slate-600 text-xs font-medium">Trade Tested & Medical Cleared</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E3D5] hover:border-[#D4AF37]/50 transition-all shadow-sm group">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0B0C10] text-sm font-heading">Presence In</h4>
                  <p className="text-slate-600 text-xs font-medium">All GCC Countries</p>
                </div>
              </div>
            </div>

            {/* Solid Gold Learn More Button */}
            <div className="pt-4">
              <button
                onClick={onOpenEnquiry}
                className="btn-gold-metallic text-[#121417] text-xs uppercase px-9 py-4 rounded-lg shadow-lg font-sans tracking-wider cursor-pointer"
              >
                <span>LEARN MORE</span>
              </button>
            </div>
          </div>

          {/* Right Column (Team Photo Card) */}
          <div className="lg:col-span-5 animate-slide-right">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-[#D4AF37]/30 relative group">
              <img
                src="/gulf_skyline.jpg"
                alt="AL-AQSHA Team & Skyline"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0B0C10]/90 backdrop-blur-md border border-[#D4AF37]/40 text-white shadow-xl">
                <p className="font-black text-sm uppercase tracking-wide font-heading text-[#D4AF37]">Licensed Manpower Provider</p>
                <p className="text-xs text-slate-300 font-body">Compliant with UAE MOHRE & International Labor Standards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Mission & Vision */}
      <section className="py-16 bg-[#FAF9F5] border-t border-[#E8E3D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E8E3D5] hover:border-[#D4AF37]/50 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B0C10] mb-3 font-heading">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-body">
                To connect enterprise clients across the Gulf region with pre-vetted, highly trained, and reliable workforce talent, ensuring peak project performance and strict labor compliance.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E8E3D5] hover:border-[#D4AF37]/50 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-[#0B0C10] text-[#D4AF37] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-[#D4AF37]/30">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B0C10] mb-3 font-heading">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-body">
                To become the premier manpower recruitment and staffing agency in the GCC, recognized for operational integrity, rapid mobilization, and candidate welfare excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <Footer
        onNavigateHome={onNavigateHome}
        onNavigateAbout={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateServices={onNavigateServices}
        onNavigateIndustries={onNavigateIndustries}
        onNavigateCareers={onNavigateCareers}
        onNavigateContact={onNavigateContact}
      />
    </div>
  );
}
