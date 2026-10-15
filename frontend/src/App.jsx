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
import SubServicesModal from './components/common/SubServicesModal';
import IndustrySubModal from './components/common/IndustrySubModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStaffLoginOpen, setIsStaffLoginOpen] = useState(false);

  // Service Modal States
  const [isSubServicesModalOpen, setIsSubServicesModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState(null);
  const [selectedSubServiceForModal, setSelectedSubServiceForModal] = useState('');

  // Industry Modal States
  const [isIndustrySubModalOpen, setIsIndustrySubModalOpen] = useState(false);
  const [selectedIndustryForModal, setSelectedIndustryForModal] = useState(null);

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

  const handleOpenSubServicesModal = (serviceCategory) => {
    setSelectedServiceForModal(serviceCategory);
    setIsSubServicesModalOpen(true);
  };

  const handleSelectServiceWithSub = (serviceCategory, subServiceTitle) => {
    setSelectedServiceForModal(serviceCategory);
    setSelectedSubServiceForModal(subServiceTitle || '');
    setIsSubServicesModalOpen(false);
    setIsModalOpen(true);
  };

  const handleOpenIndustrySubModal = (industryObj) => {
    setSelectedIndustryForModal(industryObj);
    setIsIndustrySubModalOpen(true);
  };

  const handleSelectIndustryWithJob = (industryObj, jobTitle) => {
    const serviceEquivalent = {
      id: industryObj.id || industryObj.name,
      title: industryObj.name || industryObj.title
    };
    setSelectedServiceForModal(serviceEquivalent);
    setSelectedSubServiceForModal(jobTitle || '');
    setIsIndustrySubModalOpen(false);
    setIsModalOpen(true);
  };

  const openEnquiryModal = (serviceCategory = null, subServiceTitle = '') => {
    if (serviceCategory) {
      if (serviceCategory.name && !serviceCategory.title) {
        setSelectedServiceForModal({
          id: serviceCategory.id || serviceCategory.name,
          title: serviceCategory.name
        });
      } else {
        setSelectedServiceForModal(serviceCategory);
      }
    }
    if (subServiceTitle !== undefined) {
      setSelectedSubServiceForModal(subServiceTitle);
    }
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
    onSelectServiceCategory: handleOpenSubServicesModal,
    onSelectServiceWithSub: handleSelectServiceWithSub,
    onSelectIndustryCategory: handleOpenIndustrySubModal,
    onSelectIndustryWithJob: handleSelectIndustryWithJob,
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

      {/* Sub-Services List Popup Modal */}
      <SubServicesModal
        isOpen={isSubServicesModalOpen}
        onClose={() => setIsSubServicesModalOpen(false)}
        service={selectedServiceForModal}
        onSelectSubService={handleSelectServiceWithSub}
      />

      {/* Industry Job Roles Popup Modal */}
      <IndustrySubModal
        isOpen={isIndustrySubModalOpen}
        onClose={() => setIsIndustrySubModalOpen(false)}
        industry={selectedIndustryForModal}
        onSelectIndustryJob={handleSelectIndustryWithJob}
      />

      {/* Standalone Reusable Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedServiceForModal}
        selectedSubService={selectedSubServiceForModal}
      />

      {/* Staff & Owner Login Modal */}
      <StaffLoginModal
        isOpen={isStaffLoginOpen}
        onClose={() => setIsStaffLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating Session Timeout Alert Banner */}
      {sessionExpiredNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#171717] text-white p-4 rounded-xl shadow-2xl border-2 border-[#C9A227] flex items-center gap-3 animate-bounce font-body">
          <AlertCircle className="w-6 h-6 text-[#C9A227] flex-shrink-0" />
          <div>
            <h4 className="font-heading font-extrabold text-sm text-[#C9A227]">Session Expired</h4>
            <p className="text-xs text-stone-300">You were automatically logged out due to inactivity timeout.</p>
          </div>
          <button
            onClick={() => setSessionExpiredNotice(false)}
            className="ml-3 text-xs font-heading font-black bg-[#C9A227] hover:bg-[#B38F1F] text-[#171717] px-3 py-1.5 rounded-md cursor-pointer transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}
    </>
  );
}
