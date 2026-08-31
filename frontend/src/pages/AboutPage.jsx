import React from 'react';
import { Award, Users, CheckCircle2, Building2, Target, Eye } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col animate-fade-in">
      {/* 1. Navigation Bar */}
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
        title="About Our Company"
        subtitle="Building the future with the right people across the Gulf Countries."
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'About Us' }
        ]}
      />

      {/* 3. Main Target About Us Layout */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (Content + 4 Stat Pills) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs block mb-1">
                ABOUT US
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Your Growth Is Our Mission
              </h2>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              AL-AQSHA Manpower Supply is a premier recruitment and staffing agency operating across the United Arab Emirates, Saudi Arabia, Qatar, Oman, Kuwait, and Bahrain. We specialize in matching vetted, high-performing personnel with leading enterprises across industrial, civil, technical, and commercial sectors.
            </p>

            {/* 4 Stat Pills in 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3.5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black flex-shrink-0">
                  <Award className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">10+ Years</h4>
                  <p className="text-slate-600 text-xs font-medium">Of Industry Experience</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black flex-shrink-0">
                  <Building2 className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Trusted By</h4>
                  <p className="text-slate-600 text-xs font-medium">200+ Corporate Clients</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black flex-shrink-0">
                  <Users className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">50,000+</h4>
                  <p className="text-slate-600 text-xs font-medium">Happy Deployed Workers</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Presence In</h4>
                  <p className="text-slate-600 text-xs font-medium">All GCC Countries</p>
                </div>
              </div>
            </div>

            {/* Solid Gold Learn More Button */}
            <div className="pt-4">
              <button
                onClick={onOpenEnquiry}
                className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black text-xs uppercase px-9 py-3.5 rounded-md shadow-md transition-all transform hover:-translate-y-0.5 tracking-wider cursor-pointer"
              >
                LEARN MORE
              </button>
            </div>
          </div>

          {/* Right Column (Team Photo Card) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 relative group">
              <img
                src="/gulf_skyline.jpg"
                alt="AL-AQSHA Team & Skyline"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/50 text-slate-900 shadow-lg">
                <p className="font-black text-sm uppercase tracking-wide">Licensed Manpower Provider</p>
                <p className="text-xs text-slate-600">Compliant with UAE MOHRE & International Labor Standards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Mission & Vision */}
      <section className="py-16 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To connect enterprise clients across the Gulf region with pre-vetted, highly trained, and reliable workforce talent, ensuring peak project performance and strict labor compliance.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 rounded-lg bg-[#0B1B3D] text-amber-400 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
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
