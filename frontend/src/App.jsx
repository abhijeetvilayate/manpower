import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import IndustriesPage from './pages/IndustriesPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import EnquiryModal from './components/common/EnquiryModal';
import StaffLoginModal from './components/common/StaffLoginModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStaffLoginOpen, setIsStaffLoginOpen] = useState(false);
  const [siteContactInfo, setSiteContactInfo] = useState(null);
  const [companyLogoUrl, setCompanyLogoUrl] = useState(localStorage.getItem('customCompanyLogo') || '/AV.png');
  const [selectedIndustryFilter, setSelectedIndustryFilter] = useState('');
  const [sessionExpiredNotice, setSessionExpiredNotice] = useState(false);

  // Fixed 20-minute inactivity session timeout tracker for Owner Portal
  useEffect(() => {
    if (currentPage !== 'admin') return;

    let timeoutId;

    const resetInactivityTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);

      const TIMEOUT_MINUTES = 20; // Hardcoded 20-minute session timeout

      timeoutId = setTimeout(() => {
        localStorage.removeItem('adminToken');
        setSessionExpiredNotice(true);
        setCurrentPage('home');
      }, TIMEOUT_MINUTES * 60 * 1000);
    };

    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    activityEvents.forEach(evt => window.addEventListener(evt, resetInactivityTimer));

    resetInactivityTimer();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      activityEvents.forEach(evt => window.removeEventListener(evt, resetInactivityTimer));
    };
  }, [currentPage]);

  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCareersWithFilter = (industryName) => {
    setSelectedIndustryFilter(industryName || '');
    navigateTo('careers');
  };

  const openEnquiryModal = () => {
    setIsModalOpen(true);
  };

  const openStaffLogin = () => {
    setIsStaffLoginOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsStaffLoginOpen(false);
    setSessionExpiredNotice(false);
    navigateTo('admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigateTo('home');
  };

  const handleUpdateContactInfo = (newContactInfo) => {
    setSiteContactInfo(newContactInfo);
  };

  const handleUpdateLogo = (newLogoUrl) => {
    setCompanyLogoUrl(newLogoUrl);
  };

  // Shared navigation props object passed to every page
  const navProps = {
    onNavigateHome: () => navigateTo('home'),
    onNavigateAbout: () => navigateTo('about'),
    onNavigateServices: () => navigateTo('services'),
    onNavigateIndustries: () => navigateTo('industries'),
    onNavigateCareers: () => {
      setSelectedIndustryFilter('');
      navigateTo('careers');
    },
    onNavigateCareersWithFilter: navigateToCareersWithFilter,
    onNavigateContact: () => navigateTo('contact'),
    onOpenEnquiry: openEnquiryModal,
    onOpenStaffLogin: openStaffLogin,
    customContactInfo: siteContactInfo,
    companyLogoUrl: companyLogoUrl
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'admin':
        return (
          <AdminPage
            onNavigateHome={() => navigateTo('home')}
            onUpdateContactInfo={handleUpdateContactInfo}
            onUpdateLogo={handleUpdateLogo}
            onLogout={handleLogout}
          />
        );
      case 'about':
        return <AboutPage {...navProps} />;
      case 'services':
        return <ServicesPage {...navProps} />;
      case 'industries':
        return <IndustriesPage {...navProps} />;
      case 'careers':
        return <CareersPage {...navProps} initialIndustryFilter={selectedIndustryFilter} />;
      case 'contact':
        return <ContactPage {...navProps} />;
      case 'home':
      default:
        return <HomePage {...navProps} />;
    }
  };

  return (
    <>
      {renderActivePage()}

      {/* Standalone Reusable Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Staff & Owner Login Modal - Triggered exclusively from Contact Us Page */}
      <StaffLoginModal
        isOpen={isStaffLoginOpen}
        onClose={() => setIsStaffLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating Session Timeout Alert Banner */}
      {sessionExpiredNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B1B3D] text-white p-4 rounded-xl shadow-2xl border-2 border-amber-400 flex items-center gap-3 animate-bounce">
          <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0" />
          <div>
            <h4 className="font-extrabold text-sm text-amber-300">Session Expired</h4>
            <p className="text-xs text-slate-300">You were automatically logged out due to inactivity timeout.</p>
          </div>
          <button
            onClick={() => setSessionExpiredNotice(false)}
            className="ml-3 text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-md cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}
    </>
  );
}