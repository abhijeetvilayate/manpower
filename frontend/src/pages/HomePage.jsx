import React from 'react';
import Navbar from '../components/sections/Navbar';
import HeroBanner from '../components/sections/HeroBanner';
import FeatureHighlights from '../components/sections/FeatureHighlights';
import ServicesSection from '../components/sections/ServicesSection';
import IndustriesSection from '../components/sections/IndustriesSection';
import AboutSection from '../components/sections/AboutSection';
import CareersSection from '../components/sections/CareersSection';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/common/Footer';

export default function HomePage({
  onNavigateAbout,
  onNavigateServices,
  onNavigateIndustries,
  onNavigateCareers,
  onNavigateContact,
  onOpenEnquiry
}) {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col animate-fade-in">
      {/* 1. Header Navigation */}
      <Navbar
        activePage="home"
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateAbout={onNavigateAbout}
        onNavigateServices={onNavigateServices}
        onNavigateIndustries={onNavigateIndustries}
        onNavigateCareers={onNavigateCareers}
        onNavigateContact={onNavigateContact}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* 2. Hero Section */}
      <HeroBanner onNavigateServices={onNavigateServices} />

      {/* 3. Floating Highlights */}
      <FeatureHighlights />

      {/* 4. Services Section */}
      <ServicesSection onSelectService={onNavigateServices} />

      {/* 5. Industries Section */}
      <IndustriesSection onNavigateIndustries={onNavigateIndustries} />

      {/* 6. About Section */}
      <AboutSection onNavigateAbout={onNavigateAbout} />

      {/* 7. Careers Section */}
      <CareersSection onNavigateCareers={onNavigateCareers} />

      {/* 8. Contact Section */}
      <ContactSection />

      {/* 9. Footer */}
      <Footer
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateAbout={onNavigateAbout}
        onNavigateServices={onNavigateServices}
        onNavigateIndustries={onNavigateIndustries}
        onNavigateCareers={onNavigateCareers}
        onNavigateContact={onNavigateContact}
      />
    </div>
  );
}
