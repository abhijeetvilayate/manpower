import React, { useState, useEffect } from 'react';
import {
  Download, Plus, Trash2, Edit3, Shield, Users, Briefcase,
  Phone, Mail, MapPin, CheckCircle2, AlertCircle, FileText, Calendar, LogOut, Home, Upload, Factory, KeyRound, UserCog, X, Clock, MessageSquare, PhoneCall, Share2
} from 'lucide-react';
import JSZip from 'jszip';
import { enquiryApi, jobApi, serviceApi, industryApi, contactInfoApi, adminApi } from '../services/apiClient';
import { downloadXlsxFile } from '../utils/excelExport';

export default function AdminPage({ onNavigateHome, onUpdateContactInfo, onUpdateLogo, onLogout }) {
  const [activeTab, setActiveTab] = useState('all-messages');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [exportedEnquiryIds, setExportedEnquiryIds] = useState([]);
  const [exportedCandidateIds, setExportedCandidateIds] = useState([]);
  const [isZippingResumes, setIsZippingResumes] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [clearModalData, setClearModalData] = useState(null);
  const [sessionTimeoutMinutes, setSessionTimeoutMinutes] = useState(
    parseInt(localStorage.getItem('adminSessionTimeoutMinutes') || '15', 10)
  );

  // Data States
  const [enquiries, setEnquiries] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [services, setServices] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [contactData, setContactData] = useState({
    phone: '+971 50 123 4567',
    whatsapp: '+971 50 123 4567',
    email: 'info@alaqshamanpower.com',
    address: 'Office 302, Al-Aqsha Building, Deira, Dubai, UAE',
    workingHours: 'Mon - Sat: 8:00 AM - 6:00 PM',
    linkedinUrl: 'https://linkedin.com',
    facebookUrl: 'https://facebook.com',
    instagramUrl: 'https://instagram.com',
    twitterUrl: 'https://twitter.com',
    whatsappUrl: 'https://wa.me/971501234567',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3782.9724890902626!2d73.94085339090402!3d18.530145308039067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1788104636985!5m2!1sen!2sin'
  });

  // Forms
  const [newJob, setNewJob] = useState({ title: '', location: '', type: 'Full-time', salary: '', deadline: '', requirements: '' });
  const [newService, setNewService] = useState({ title: '', category: 'Skilled Manpower Supply', pngIcon: '', description: '' });
  const [newIndustry, setNewIndustry] = useState({ name: '', description: '', icon: 'Building2', imageUrl: '' });

  // Security Credentials Form
  const [securityForm, setSecurityForm] = useState({ oldPassword: '', newUsername: '', newPassword: '' });
  const [securityError, setSecurityError] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Load enquiries submitted by real users (deduplicated)
    const storedEnquiries = JSON.parse(localStorage.getItem('userEnquiries') || '[]');
    const uniqueEnquiries = [];
    const seenSignatures = new Set();

    storedEnquiries.forEach(eq => {
      const sig = `${eq.fullName}_${eq.email}_${eq.phone}_${eq.message}_${eq.createdAt}`;
      if (!seenSignatures.has(sig)) {
        seenSignatures.add(sig);
        uniqueEnquiries.push(eq);
      }
    });

    setEnquiries(uniqueEnquiries);
    localStorage.setItem('userEnquiries', JSON.stringify(uniqueEnquiries));

    // Load jobs & applications
    const storedJobs = JSON.parse(localStorage.getItem('adminJobs') || '[]');
    setJobs(storedJobs);

    const storedApps = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    const uniqueApps = [];
    const seenAppSigs = new Set();
    storedApps.forEach(app => {
      const sig = `${app.fullName}_${app.email}_${app.jobTitle}_${app.createdAt}`;
      if (!seenAppSigs.has(sig)) {
        seenAppSigs.add(sig);
        uniqueApps.push(app);
      }
    });

    setApplications(uniqueApps);
    localStorage.setItem('jobApplications', JSON.stringify(uniqueApps));

    // Load services & industries
    const storedServices = JSON.parse(localStorage.getItem('adminServices') || '[]');
    const defaultServices = [
      { id: 1, title: 'Skilled Manpower Supply', category: 'Technical & Trade', pngIcon: '/images/service_png_icons/skilled.png', description: 'Certified MEP technicians, electricians, pipe fitters, 6G welders, HVAC specialists, and site engineers.' },
      { id: 2, title: 'Unskilled Manpower Supply', category: 'Civil & General', pngIcon: '/images/service_png_icons/unskilled.png', description: 'Reliable civil site helpers, material loaders, warehouse assistants, and general labor workforce.' },
      { id: 3, title: 'Technical Manpower Supply', category: 'Engineering & QA/QC', pngIcon: '/images/service_png_icons/technical.png', description: 'Instrument engineers, NDT inspectors, QA/QC supervisors, and PLC automation programmers.' },
      { id: 4, title: 'Project-based Manpower Supply', category: 'Turn-key Contracts', pngIcon: '/images/service_png_icons/project.png', description: 'Tailored turn-key manpower deployment for short-term and long-term EPC contracts.' },
      { id: 5, title: 'Recruitment Process Outsourcing', category: 'HR & Sourcing', pngIcon: '/images/service_png_icons/rpo.png', description: 'End-to-end recruitment drives, candidate pre-screening, trade testing, and medical clearances.' },
      { id: 6, title: 'Other Industries', category: 'Logistics & Solar', pngIcon: '/images/service_png_icons/other.png', description: 'Custom workforce solutions across logistics, solar, healthcare, aviation, and emerging sectors.' }
    ];
    // Merge stored custom services with default services avoiding duplicates by title
    const mergedServices = [...storedServices];
    defaultServices.forEach(ds => {
      if (!mergedServices.some(s => s.title.toLowerCase() === ds.title.toLowerCase())) {
        mergedServices.push(ds);
      }
    });
    setServices(mergedServices);

    const storedIndustries = JSON.parse(localStorage.getItem('adminIndustries') || '[]');
    const defaultIndustries = [
      { id: 1, name: 'Oil & Gas Sector', description: 'Upstream, downstream, refinery, and offshore rig manpower supply.' },
      { id: 2, name: 'Civil Construction & Infrastructure', description: 'High-rise commercial towers, highways, bridges, airports, and metro projects.' },
      { id: 3, name: 'Logistics & Warehousing', description: 'Forklift operators, inventory handlers, dock workers, and fleet drivers.' },
      { id: 4, name: 'Manufacturing & Heavy Industrial Plants', description: 'Assembly line operators, CNC machinists, maintenance technicians, and plant supervisors.' },
      { id: 5, name: 'Healthcare & Hospital Facilities', description: 'Cleanroom maintenance staff, medical assistant labor, facility sanitation, and hospital helpers.' },
      { id: 6, name: 'Hospitality & Commercial Estates', description: 'Hotel facility stewards, HVAC technicians, commercial maintenance, and security personnel.' }
    ];
    // Merge stored custom industries with default industries avoiding duplicates by name
    const mergedIndustries = [...storedIndustries];
    defaultIndustries.forEach(di => {
      if (!mergedIndustries.some(i => i.name.toLowerCase() === di.name.toLowerCase())) {
        mergedIndustries.push(di);
      }
    });
    setIndustries(mergedIndustries);

    // Load contact info
    const savedContact = localStorage.getItem('siteContactInfo');
    if (savedContact) {
      setContactData(JSON.parse(savedContact));
    }
  };

  // Helper to format industry or service name into standard underscore filename for RED CAPITAL notices
  const getFormattedFileName = (name, defaultPlaceholder) => {
    if (!name || !name.trim()) return defaultPlaceholder;
    return name
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
  };

  // Export All Messages & Enquiries Master Database as Genuine .XLSX Excel File
  const handleExportAllMessagesXlsx = () => {
    if (enquiries.length === 0) return;
    const currentExportIds = enquiries.map(eq => eq.id);

    const headers = ['ID', 'Submission Source Type', 'Customer Name', 'Email Address', 'Phone Number', 'Target Service / Subject', 'Message / Requirements', 'Submission Date & Time'];
    const rows = enquiries.map(eq => [
      eq.id,
      eq.sourceType === 'GET_IN_TOUCH' ? 'Get in Touch' : eq.sourceType === 'SERVICE_REQUEST' ? 'Service Request' : 'Enquiry Form',
      eq.fullName || '',
      eq.email || '',
      eq.phone || '',
      eq.serviceRequired || 'General',
      eq.message || '',
      eq.createdAt || 'Recent'
    ]);
    downloadXlsxFile(`AlAqsha_All_Messages_Master_Report_${Date.now()}`, 'All Messages', headers, rows);

    setExportedEnquiryIds(currentExportIds);
    setClearModalData({
      type: 'ALL_MESSAGES',
      count: currentExportIds.length,
      ids: currentExportIds
    });
    setShowClearModal(true);
  };

  // Export Consumer Enquiries & Get In Touch Messages as Genuine .XLSX Excel File
  const handleExportEnquiriesXlsx = async () => {
    const consumerList = enquiries.filter(eq => eq.sourceType === 'GET_IN_TOUCH' || eq.sourceType === 'ENQUIRY_FORM' || !eq.sourceType);
    if (consumerList.length === 0) return;
    const currentExportIds = consumerList.map(eq => eq.id);

    try {
      await enquiryApi.exportEnquiriesXlsx();
    } catch (err) {
      console.warn('Using client XLSX export...');
    }

    const headers = ['ID', 'Submission Source Type', 'Customer Name', 'Email Address', 'Phone Number', 'Target Service', 'Message / Enquiry Details', 'Submission Date & Time'];
    const rows = consumerList.map(eq => [
      eq.id,
      eq.sourceType === 'GET_IN_TOUCH' ? 'Get in Touch' : 'Enquiry Form',
      eq.fullName || '',
      eq.email || '',
      eq.phone || '',
      eq.serviceRequired || 'General',
      eq.message || '',
      eq.createdAt || 'Recent'
    ]);
    downloadXlsxFile(`AlAqsha_Consumer_Enquiries_${Date.now()}`, 'Enquiries', headers, rows);

    // Save exported IDs to enable post-export deletion
    setExportedEnquiryIds(currentExportIds);
    setClearModalData({
      type: 'ENQUIRIES',
      count: currentExportIds.length,
      ids: currentExportIds
    });
    setShowClearModal(true);
  };

  // Export Service Requests Report as Genuine .XLSX Excel File
  const handleExportServiceRequestsXlsx = () => {
    const serviceList = enquiries.filter(eq => eq.sourceType === 'SERVICE_REQUEST');
    if (serviceList.length === 0) return;
    const currentExportIds = serviceList.map(eq => eq.id);

    const headers = [
      'ID',
      'Target Service Category Requested',
      'Customer Name',
      'Customer Email',
      'Phone Number',
      'Source Type',
      'Project Details / Message',
      'Submission Date & Time'
    ];

    const rows = serviceList.map(eq => [
      eq.id,
      eq.serviceRequired || 'General Service Enquiry',
      eq.fullName || '',
      eq.email || '',
      eq.phone || '',
      'Service Request',
      eq.message || '',
      eq.createdAt || 'Recent'
    ]);

    downloadXlsxFile(`AlAqsha_Requested_Services_Report_${Date.now()}`, 'Requested Services', headers, rows);

    setExportedEnquiryIds(currentExportIds);
    setClearModalData({
      type: 'SERVICES',
      count: currentExportIds.length,
      ids: currentExportIds
    });
    setShowClearModal(true);
  };

  // Confirm Delete Exported Data Handler (Preserves any NEW entries added after download)
  const handleConfirmClearExportedData = () => {
    if (!clearModalData || !clearModalData.ids) return;
    const idsToClear = clearModalData.ids;

    if (clearModalData.type === 'CANDIDATES') {
      const updatedApps = applications.filter(app => !idsToClear.includes(app.id));
      setApplications(updatedApps);
      localStorage.setItem('jobApplications', JSON.stringify(updatedApps));
      setExportedCandidateIds([]);
    } else {
      const updatedEnquiries = enquiries.filter(eq => !idsToClear.includes(eq.id));
      setEnquiries(updatedEnquiries);
      localStorage.setItem('userEnquiries', JSON.stringify(updatedEnquiries));
      setExportedEnquiryIds([]);
    }

    setShowClearModal(false);
    setSaveStatus(`Deleted ${clearModalData.count} exported record(s) from database & dashboard. Any new un-exported entries are safely preserved.`);
    setTimeout(() => setSaveStatus(''), 5000);
  };

  // Export Applied Candidates as Genuine .XLSX Excel File
  const handleExportCandidatesXlsx = async () => {
    if (applications.length === 0) return;
    const currentExportIds = applications.map(app => app.id);

    try {
      await jobApi.exportApplicationsXlsx();
    } catch (err) {
      console.warn('Using client candidate XLSX export...');
    }

    const headers = ['Application ID', 'Candidate Name', 'Email Address', 'Phone Number', 'Applied Position', 'Experience', 'Resume File Name', 'Application Date'];
    const rows = applications.map(app => [
      app.id,
      app.fullName || '',
      app.email || '',
      app.phone || '',
      app.jobTitle || '',
      app.experience || '',
      app.resumeFileName || 'CV.pdf',
      app.createdAt || 'Recent'
    ]);
    downloadXlsxFile(`AlAqsha_Applied_Candidates_${Date.now()}`, 'Candidates', headers, rows);

    setExportedCandidateIds(currentExportIds);
    setClearModalData({
      type: 'CANDIDATES',
      count: currentExportIds.length,
      ids: currentExportIds
    });
    setShowClearModal(true);
  };

  // Change Admin Username & Password verifying Old Password
  const handleChangeSecurity = async (e) => {
    e.preventDefault();
    setSecurityError('');

    // Username validation: No space and no special characters
    if (securityForm.newUsername && securityForm.newUsername.trim()) {
      const usernameRegex = /^[a-zA-Z0-9]+$/;
      if (!usernameRegex.test(securityForm.newUsername)) {
        setSecurityError('Username must contain only letters and numbers without spaces or special characters.');
        return;
      }
    }

    // Password validation: At least 1 uppercase, 1 lowercase, 1 number, and 1 special character
    if (securityForm.newPassword) {
      const p = securityForm.newPassword;
      const hasUpper = /[A-Z]/.test(p);
      const hasLower = /[a-z]/.test(p);
      const hasNumber = /[0-9]/.test(p);
      const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(p);

      if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
        setSecurityError('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.');
        return;
      }
    }

    try {
      const res = await adminApi.changePassword(securityForm.oldPassword, securityForm.newUsername, securityForm.newPassword);
      setSecurityForm({ oldPassword: '', newUsername: '', newPassword: '' });
      setIsProfileModalOpen(false);
      localStorage.removeItem('adminToken');
      alert(res.message || 'Owner credentials updated successfully. For security reasons, your session has ended. Please log in again.');
      if (onLogout) onLogout();
    } catch (err) {
      setSecurityError(err.message || 'Current (Old) Password is incorrect.');
    }
  };

  // Upload Logo Handler
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const logoUrl = URL.createObjectURL(file);
    localStorage.setItem('customCompanyLogo', logoUrl);
    if (onUpdateLogo) onUpdateLogo(logoUrl);
    setIsProfileModalOpen(false);
    localStorage.removeItem('adminToken');
    alert('Company branding updated successfully. For security reasons, your owner session has ended. Please log in again.');
    if (onLogout) onLogout();
  };

  // Add / Delete Handlers
  const handleAddJob = (e) => {
    e.preventDefault();
    const updatedJobs = [{ ...newJob, id: Date.now() }, ...jobs];
    setJobs(updatedJobs);
    localStorage.setItem('adminJobs', JSON.stringify(updatedJobs));
    setNewJob({ title: '', location: '', type: 'Full-time', salary: '', deadline: '', requirements: '' });
    setSaveStatus('Job position published successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleDeleteJob = (id) => {
    const updatedJobs = jobs.filter(j => j.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem('adminJobs', JSON.stringify(updatedJobs));
  };

  const handleAddService = (e) => {
    e.preventDefault();
    const updated = [{ ...newService, id: Date.now() }, ...services];
    setServices(updated);
    localStorage.setItem('adminServices', JSON.stringify(updated));
    setNewService({ title: '', category: 'Skilled Manpower Supply', imageUrl: '/images/services/skilled-manpower-hd.jpg', description: '' });
    setSaveStatus('Service category added successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleDeleteService = (id) => {
    const updated = services.filter(s => s.id !== id);
    setServices(updated);
    localStorage.setItem('adminServices', JSON.stringify(updated));
  };

  const handleAddIndustry = (e) => {
    e.preventDefault();
    const updated = [{ ...newIndustry, id: Date.now() }, ...industries];
    setIndustries(updated);
    localStorage.setItem('adminIndustries', JSON.stringify(updated));
    setNewIndustry({ name: '', description: '', icon: 'Building2', imageUrl: '' });
    setSaveStatus('Industry category added successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleDeleteIndustry = (id) => {
    const updated = industries.filter(i => i.id !== id);
    setIndustries(updated);
    localStorage.setItem('adminIndustries', JSON.stringify(updated));
  };

  const handleDownloadResume = (app) => {
    const filename = app.resumeFileName || `${(app.fullName || 'Candidate').replace(/\s+/g, '_')}_CV.pdf`;

    // 1. Candidate uploaded base64 data URL
    if (app.resumeDataUrl && app.resumeDataUrl.startsWith('data:')) {
      const link = document.createElement('a');
      link.href = app.resumeDataUrl;
      link.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // 2. Download from backend API endpoint
    if (app.resumeFileName && !app.resumeFileName.startsWith('Candidate_CV')) {
      window.open(`/api/admin/resumes/download/${app.resumeFileName}`, '_blank');
      return;
    }

    // 3. Fallback: Generate a clean, valid PDF Candidate Summary Document on the fly
    const pdfSource = `%PDF-1.4
1 0 obj <</Type /Catalog /Pages 2 0 R>> endobj
2 0 obj <</Type /Pages /Kids [3 0 R] /Count 1>> endobj
3 0 obj <</Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources <</Font <</F1 5 0 R>>>> >> endobj
4 0 obj <</Length 280>> stream
BT
/F1 16 Tf
50 730 Td
(AL-AQSHA MANPOWER SUPPLY - CANDIDATE RESUME) Tj
/F1 11 Tf
0 -30 Td
(Candidate Name: ${app.fullName || 'N/A'}) Tj
0 -20 Td
(Applied Position: ${app.jobTitle || 'N/A'}) Tj
0 -20 Td
(Phone / WhatsApp: ${app.phone || 'N/A'}) Tj
0 -20 Td
(Email: ${app.email || 'N/A'}) Tj
0 -20 Td
(Experience: ${app.experience || 'N/A'}) Tj
0 -20 Td
(Application Date: ${app.createdAt || 'N/A'}) Tj
0 -20 Td
(Remarks: ${app.message || 'N/A'}) Tj
ET
endstream
endobj
5 0 obj <</Type /Font /Subtype /Type1 /BaseFont /Helvetica>> endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000575 00000 n 
trailer <</Size 6 /Root 1 0 R>>
startxref
650
%%EOF`;

    const blob = new Blob([pdfSource], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
  };

  const handleDownloadAllResumesZip = async () => {
    if (applications.length === 0 || isZippingResumes) return;
    setIsZippingResumes(true);
    try {
      const zip = new JSZip();
      const resumeFolder = zip.folder("Candidate_Resumes");

      applications.forEach((app, idx) => {
        const rawName = app.resumeFileName || `${(app.fullName || `Candidate_${idx + 1}`).replace(/\s+/g, '_')}_Resume.pdf`;
        const filename = rawName.endsWith('.pdf') ? rawName : `${rawName}.pdf`;

        if (app.resumeDataUrl && app.resumeDataUrl.includes('base64,')) {
          const base64Data = app.resumeDataUrl.split('base64,')[1];
          resumeFolder.file(filename, base64Data, { base64: true });
        } else {
          const pdfSource = `%PDF-1.4
1 0 obj <</Type /Catalog /Pages 2 0 R>> endobj
2 0 obj <</Type /Pages /Kids [3 0 R] /Count 1>> endobj
3 0 obj <</Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources <</Font <</F1 5 0 R>>>> >> endobj
4 0 obj <</Length 280>> stream
BT
/F1 16 Tf
50 730 Td
(AL-AQSHA MANPOWER SUPPLY - CANDIDATE RESUME) Tj
/F1 11 Tf
0 -30 Td
(Candidate Name: ${app.fullName || 'N/A'}) Tj
0 -20 Td
(Applied Position: ${app.jobTitle || 'N/A'}) Tj
0 -20 Td
(Phone / WhatsApp: ${app.phone || 'N/A'}) Tj
0 -20 Td
(Email: ${app.email || 'N/A'}) Tj
0 -20 Td
(Experience: ${app.experience || 'N/A'}) Tj
0 -20 Td
(Application Date: ${app.createdAt || 'N/A'}) Tj
0 -20 Td
(Remarks: ${app.message || 'N/A'}) Tj
ET
endstream
endobj
5 0 obj <</Type /Font /Subtype /Type1 /BaseFont /Helvetica>> endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000575 00000 n 
trailer <</Size 6 /Root 1 0 R>>
startxref
650
%%EOF`;
          resumeFolder.file(filename, pdfSource);
        }
      });

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const blobUrl = URL.createObjectURL(zipBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      const todayStr = new Date().toISOString().split('T')[0];
      downloadLink.download = `AlAqsha_Candidate_Resumes_${todayStr}.zip`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);

      setSaveStatus(`Successfully packaged and downloaded all ${applications.length} candidate resumes in a single ZIP file!`);
      setTimeout(() => setSaveStatus(''), 4000);
    } catch (err) {
      console.error('Error generating resumes ZIP archive:', err);
      alert('Failed to package candidate resumes. Please try again.');
    } finally {
      setIsZippingResumes(false);
    }
  };

  const handleSaveContactInfo = (e) => {
    e.preventDefault();
    localStorage.setItem('siteContactInfo', JSON.stringify(contactData));
    if (onUpdateContactInfo) onUpdateContactInfo(contactData);
    setSaveStatus('Contact details updated dynamically across site!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col animate-fade-in">

      {/* Top Header Navbar */}
      <header className="bg-[#0B1B3D] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={localStorage.getItem('customCompanyLogo') || '/AV.png'} alt="Company Logo" className="h-10 w-auto object-contain" />
            <div className="border-l border-slate-700 pl-4">
              <h1 className="font-extrabold text-sm sm:text-base text-amber-400 uppercase tracking-wider">Owner Portal Control Center</h1>
              <p className="text-[11px] text-slate-300">AL-AQSHA Manpower Supply Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <UserCog className="w-4 h-4 text-amber-400" />
              Profile &amp; Security Settings
            </button>
            <button
              onClick={() => setShowLogoutAlert(true)}
              className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('all-messages')}
            className={`px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'all-messages'
                ? 'bg-[#0B1B3D] text-amber-400 shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
          >
            <MessageSquare className="w-4 h-4" />
            All Messages ({enquiries.length})
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'enquiries'
                ? 'bg-[#0B1B3D] text-amber-400 shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
          >
            <FileText className="w-4 h-4" />
            Consumer Enquiries ({enquiries.filter(eq => eq.sourceType === 'ENQUIRY_FORM' || eq.sourceType === 'GET_IN_TOUCH' || !eq.sourceType).length})
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'jobs'
                ? 'bg-[#0B1B3D] text-amber-400 shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
          >
            <Briefcase className="w-4 h-4" />
            Jobs &amp; Candidates ({applications.length})
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'services'
                ? 'bg-[#0B1B3D] text-amber-400 shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
          >
            <Users className="w-4 h-4" />
            Manage Services ({services.length})
          </button>

          <button
            onClick={() => setActiveTab('industries')}
            className={`px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'industries'
                ? 'bg-[#0B1B3D] text-amber-400 shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
          >
            <Factory className="w-4 h-4" />
            Manage Industries ({industries.length})
          </button>
        </div>

        {/* Success Banner */}
        {saveStatus && (
          <div className="mb-6 bg-emerald-50 border border-emerald-300 p-4 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            {saveStatus}
          </div>
        )}

        {/* TAB 0: ALL MESSAGES (MASTER DATABASE VIEW) */}
        {activeTab === 'all-messages' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <h3 className="text-xl font-black text-slate-900">All Customer Submissions &amp; Messages</h3>
                <p className="text-xs text-slate-500 mt-1">Master log of all enquiries, get-in-touch submissions, and service quotation requests.</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportAllMessagesXlsx}
                  disabled={enquiries.length === 0}
                  className={`font-bold text-xs uppercase px-5 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer ${enquiries.length === 0
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white transform active:scale-95'
                    }`}
                >
                  <Download className="w-4 h-4" />
                  Download All Messages (.XLSX)
                </button>

                <button
                  onClick={() => {
                    if (exportedEnquiryIds.length > 0) {
                      setClearModalData({
                        type: 'ALL_MESSAGES',
                        count: exportedEnquiryIds.length,
                        ids: exportedEnquiryIds
                      });
                      setShowClearModal(true);
                    }
                  }}
                  disabled={exportedEnquiryIds.length === 0}
                  title={exportedEnquiryIds.length === 0 ? "You must download the Excel file first before you can delete data." : "Delete downloaded messages from dashboard & database"}
                  className={`font-bold text-xs uppercase px-4 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all ${exportedEnquiryIds.length === 0
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                      : 'bg-rose-600 hover:bg-rose-500 text-white cursor-pointer transform active:scale-95'
                    }`}
                >
                  <Trash2 className="w-4 h-4" />
                  {exportedEnquiryIds.length > 0 ? `Delete (${exportedEnquiryIds.length}) Downloaded Records` : 'Delete (Export Required First)'}
                </button>
              </div>
            </div>

            {enquiries.length === 0 ? (
              <p className="text-xs text-slate-400 font-medium py-8 text-center">No customer messages or enquiries in database yet.</p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-[#0B1B3D] text-amber-400 font-extrabold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Source Type</th>
                      <th className="py-3.5 px-4">Customer Name</th>
                      <th className="py-3.5 px-4">Contact Details</th>
                      <th className="py-3.5 px-4">Target Service</th>
                      <th className="py-3.5 px-4">Message / Requirements</th>
                      <th className="py-3.5 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {enquiries.map((eq) => (
                      <tr key={eq.id} className="hover:bg-slate-50">
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full font-extrabold text-[10px] uppercase border ${eq.sourceType === 'GET_IN_TOUCH'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : eq.sourceType === 'SERVICE_REQUEST'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}>
                            {eq.sourceType === 'GET_IN_TOUCH'
                              ? 'Get in Touch'
                              : eq.sourceType === 'SERVICE_REQUEST'
                                ? 'Service Request'
                                : 'Enquiry Form'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-extrabold text-slate-900">{eq.fullName}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-800">{eq.email}</div>
                          <div className="text-slate-400 font-mono text-[11px]">{eq.phone}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-md font-bold text-[10px] uppercase border ${eq.serviceRequired === 'Others' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}>
                            {eq.serviceRequired || 'General'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs text-slate-600 font-medium">{eq.message}</td>
                        <td className="py-3.5 px-4 text-slate-400 text-[10px] font-medium">{eq.createdAt || 'Recent'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 1: CONSUMER ENQUIRIES & MESSAGES */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <h3 className="text-xl font-black text-slate-900">Consumer Enquiries &amp; Messages</h3>
                <p className="text-xs text-slate-500 mt-1">Live customer submissions via navbar quotation modal and Contact Us page.</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportEnquiriesXlsx}
                  disabled={enquiries.filter(eq => eq.sourceType === 'GET_IN_TOUCH' || eq.sourceType === 'ENQUIRY_FORM' || !eq.sourceType).length === 0}
                  className={`font-bold text-xs uppercase px-5 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer ${enquiries.filter(eq => eq.sourceType === 'GET_IN_TOUCH' || eq.sourceType === 'ENQUIRY_FORM' || !eq.sourceType).length === 0
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white transform active:scale-95'
                    }`}
                >
                  <Download className="w-4 h-4" />
                  Download Consumer Enquiries (.XLSX)
                </button>

                <button
                  onClick={() => {
                    if (exportedEnquiryIds.length > 0) {
                      setClearModalData({
                        type: 'ENQUIRIES',
                        count: exportedEnquiryIds.length,
                        ids: exportedEnquiryIds
                      });
                      setShowClearModal(true);
                    }
                  }}
                  disabled={exportedEnquiryIds.length === 0}
                  title={exportedEnquiryIds.length === 0 ? "You must download the Excel file first before you can delete data." : "Delete downloaded enquiries from dashboard & database"}
                  className={`font-bold text-xs uppercase px-4 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all ${exportedEnquiryIds.length === 0
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                      : 'bg-rose-600 hover:bg-rose-500 text-white cursor-pointer transform active:scale-95'
                    }`}
                >
                  <Trash2 className="w-4 h-4" />
                  {exportedEnquiryIds.length > 0 ? `Delete (${exportedEnquiryIds.length}) Downloaded Records` : 'Delete (Export Required First)'}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-[#0B1B3D] text-amber-400 font-extrabold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Source Type</th>
                    <th className="py-3.5 px-4">Customer Name</th>
                    <th className="py-3.5 px-4">Contact Details</th>
                    <th className="py-3.5 px-4">Target Service</th>
                    <th className="py-3.5 px-4">Message / Requirements</th>
                    <th className="py-3.5 px-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {enquiries
                    .filter(eq => eq.sourceType === 'GET_IN_TOUCH' || eq.sourceType === 'ENQUIRY_FORM' || !eq.sourceType)
                    .map((eq) => (
                      <tr key={eq.id} className="hover:bg-slate-50">
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full font-extrabold text-[10px] uppercase border ${eq.sourceType === 'GET_IN_TOUCH'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}>
                            {eq.sourceType === 'GET_IN_TOUCH' ? 'Get in Touch' : 'Enquiry Form'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-extrabold text-slate-900">{eq.fullName}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-800">{eq.email}</div>
                          <div className="text-slate-400 font-mono text-[11px]">{eq.phone}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-md font-bold text-[10px] uppercase border ${eq.serviceRequired === 'Others' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                            }`}>
                            {eq.serviceRequired || 'General'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs text-slate-600 font-medium">{eq.message}</td>
                        <td className="py-3.5 px-4 text-slate-400 text-[10px] font-medium">{eq.createdAt || 'Recent'}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: JOBS & APPLIED CANDIDATES WITH .XLSX EXPORT */}
        {activeTab === 'jobs' && (
          <div className="space-y-8">

            {/* Create Job Opening */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-500" />
                Post New Job Position with Expiry Deadline
              </h3>
              <form onSubmit={handleAddJob} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Job Title (e.g. Certified Electrician)"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  className="text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  required
                  placeholder="Location (e.g. Dubai, UAE)"
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                  className="text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  placeholder="Salary Package"
                  value={newJob.salary}
                  onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                  className="text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                />
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Application Deadline *</label>
                  <input
                    type="date"
                    required
                    value={newJob.deadline}
                    onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="sm:col-span-2 flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase py-3 rounded-lg shadow-sm cursor-pointer transition-all transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Publish Opening Position
                  </button>
                </div>
              </form>
            </div>

            {/* Candidate Applications & Download Candidate Excel */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-extrabold text-base text-slate-900">Applied Candidates Master List</h4>
                  <p className="text-xs text-slate-500">View and export all candidate applications with resume links.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleDownloadAllResumesZip}
                    disabled={applications.length === 0 || isZippingResumes}
                    className={`font-extrabold text-xs uppercase px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-all ${applications.length === 0 || isZippingResumes
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 transform active:scale-95'
                      }`}
                  >
                    <Download className="w-4 h-4" />
                    {isZippingResumes ? 'Packaging ZIP Archive...' : 'Download All Resumes (.ZIP)'}
                  </button>

                  <button
                    onClick={handleExportCandidatesXlsx}
                    disabled={applications.length === 0}
                    className={`font-bold text-xs uppercase px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-all ${applications.length === 0
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white transform active:scale-95'
                      }`}
                  >
                    <Download className="w-4 h-4" />
                    Download All Candidates (.XLSX)
                  </button>

                  <button
                    onClick={() => {
                      if (exportedCandidateIds.length > 0) {
                        setClearModalData({
                          type: 'CANDIDATES',
                          count: exportedCandidateIds.length,
                          ids: exportedCandidateIds
                        });
                        setShowClearModal(true);
                      }
                    }}
                    disabled={exportedCandidateIds.length === 0}
                    title={exportedCandidateIds.length === 0 ? "You must download the Excel file first before you can delete candidate applications." : "Delete downloaded candidate applications from dashboard & database"}
                    className={`font-bold text-xs uppercase px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all ${exportedCandidateIds.length === 0
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                        : 'bg-rose-600 hover:bg-rose-500 text-white cursor-pointer transform active:scale-95'
                      }`}
                  >
                    <Trash2 className="w-4 h-4" />
                    {exportedCandidateIds.length > 0 ? `Delete (${exportedCandidateIds.length}) Downloaded Candidates` : 'Delete (Export Required First)'}
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-[#0B1B3D] text-amber-400 font-extrabold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Candidate Name</th>
                      <th className="py-3 px-4">Applied Position</th>
                      <th className="py-3 px-4">Experience</th>
                      <th className="py-3 px-4">Resume File</th>
                      <th className="py-3 px-4">Applied Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {applications.map((app) => (
                      <tr key={app.id}>
                        <td className="py-3 px-4 font-bold text-slate-900">{app.fullName}<br /><span className="text-[10px] text-slate-400 font-normal">{app.phone}</span></td>
                        <td className="py-3 px-4 text-amber-700 font-bold">{app.jobTitle}</td>
                        <td className="py-3 px-4 font-medium">{app.experience}</td>
                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => handleDownloadResume(app)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-300 rounded-lg font-bold text-xs hover:bg-amber-100 transition-colors shadow-xs cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 text-amber-600" />
                            {app.resumeFileName || 'Download PDF'}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-slate-400 text-[10px]">{app.createdAt || 'Recent'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: MANAGE SERVICES SUPPLIED */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-500" />
                Add New Service Category Supplied
              </h3>
              <form onSubmit={handleAddService} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Service Title (e.g. Technical Manpower)"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  className="text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  placeholder="Category Tag"
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                  className="text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                />
                <div className="sm:col-span-2">
                  <textarea
                    rows={2}
                    placeholder="Description of service capabilities..."
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>

                {/* Upload PNG Icon Section */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Upload Service PNG Icon / Image
                  </label>
                  <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 flex items-center justify-between gap-4">
                    {newService.pngIcon ? (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white border border-slate-200 p-1.5 shadow-sm flex items-center justify-center overflow-hidden">
                          <img src={newService.pngIcon} alt="Icon Preview" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-xs font-bold text-emerald-600">PNG Icon Ready</span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">No PNG icon selected yet</span>
                    )}
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs uppercase rounded-lg cursor-pointer shadow-sm">
                      <Upload className="w-4 h-4" />
                      Select PNG Icon File
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setNewService({ ...newService, pngIcon: url });
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {/* RED CAPITAL NOTICE BELOW UPLOAD SECTION */}
                  <div className="mt-1.5 space-y-1">
                    <p className="text-rose-600 font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      FILENAME MUST MATCH SERVICE NAME: {getFormattedFileName(newService.title, 'SERVICE_NAME')}.PNG (USE '_' FOR SPACES).
                    </p>
                    <p className="text-rose-600 font-black text-xs uppercase tracking-wider pl-5">
                      WHITE BACKGROUND RECOMMENDED.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase py-3 rounded-lg shadow-sm sm:col-span-2 cursor-pointer"
                >
                  Save Service Category
                </button>
              </form>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 border-b border-slate-100 pb-4">
                <div>
                  <h4 className="font-extrabold text-base text-slate-900">Active Services Supplied</h4>
                  <p className="text-xs text-slate-500 mt-0.5">List of services offered across website quotation forms.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((s) => (
                  <div key={s.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {s.pngIcon && (
                        <div className="w-10 h-10 rounded-full bg-white border border-slate-200 p-1 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <img src={s.pngIcon} alt={s.title} className="w-full h-full object-contain" />
                        </div>
                      )}
                      <div>
                        <h5 className="font-extrabold text-sm text-slate-900">{s.title}</h5>
                        <p className="text-xs text-slate-500 mt-1">{s.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteService(s.id)}
                      className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors ml-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Requests & Quotations Received Table */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h4 className="font-extrabold text-base text-slate-900">Service Requests &amp; Quotations Received</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Quotations submitted for specific service categories.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleExportServiceRequestsXlsx}
                    disabled={enquiries.filter(eq => eq.sourceType === 'SERVICE_REQUEST').length === 0}
                    className={`font-bold text-xs uppercase px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer ${enquiries.filter(eq => eq.sourceType === 'SERVICE_REQUEST').length === 0
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white transform active:scale-95'
                      }`}
                  >
                    <Download className="w-4 h-4" />
                    Download Requested Services (.XLSX)
                  </button>

                  <button
                    onClick={() => {
                      if (exportedEnquiryIds.length > 0) {
                        setClearModalData({
                          type: 'SERVICES',
                          count: exportedEnquiryIds.length,
                          ids: exportedEnquiryIds
                        });
                        setShowClearModal(true);
                      }
                    }}
                    disabled={exportedEnquiryIds.length === 0}
                    title={exportedEnquiryIds.length === 0 ? "You must download the Excel file first before you can delete data." : "Delete downloaded requested services from dashboard & database"}
                    className={`font-bold text-xs uppercase px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all ${exportedEnquiryIds.length === 0
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                        : 'bg-rose-600 hover:bg-rose-500 text-white cursor-pointer transform active:scale-95'
                      }`}
                  >
                    <Trash2 className="w-4 h-4" />
                    {exportedEnquiryIds.length > 0 ? `Delete (${exportedEnquiryIds.length}) Downloaded Requests` : 'Delete (Export Required First)'}
                  </button>
                </div>
              </div>

              {enquiries.filter(eq => eq.sourceType === 'SERVICE_REQUEST').length === 0 ? (
                <p className="text-xs text-slate-400 font-medium py-4 text-center">No service quotation requests submitted yet.</p>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-[#0B1B3D] text-amber-400 font-extrabold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Target Service Requested</th>
                        <th className="py-3 px-4">Customer Name</th>
                        <th className="py-3 px-4">Contact Info</th>
                        <th className="py-3 px-4">Project Requirements</th>
                        <th className="py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {enquiries.filter(eq => eq.sourceType === 'SERVICE_REQUEST').map((sr) => (
                        <tr key={sr.id} className="hover:bg-slate-50">
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-md font-extrabold text-[10px] uppercase bg-amber-50 text-amber-800 border border-amber-200">
                              {sr.serviceRequired || 'General Service'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900">{sr.fullName}</td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-800">{sr.email}</div>
                            <div className="text-slate-400 font-mono text-[11px]">{sr.phone}</div>
                          </td>
                          <td className="py-3.5 px-4 max-w-xs text-slate-600 font-medium">{sr.message}</td>
                          <td className="py-3.5 px-4 text-slate-400 text-[10px] font-medium">{sr.createdAt || 'Recent'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: MANAGE INDUSTRIES SUPPLIED */}
        {activeTab === 'industries' && (
          <div className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-500" />
                Add New Industry Sector Served
              </h3>
              <form onSubmit={handleAddIndustry} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Industry Name (e.g. Healthcare & Medical)"
                  value={newIndustry.name}
                  onChange={(e) => setNewIndustry({ ...newIndustry, name: e.target.value })}
                  className="text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500 sm:col-span-2"
                />
                <div className="sm:col-span-2">
                  <textarea
                    rows={2}
                    placeholder="Description of workforce supplied to this industry..."
                    value={newIndustry.description}
                    onChange={(e) => setNewIndustry({ ...newIndustry, description: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>

                {/* Upload Industry Poster Image Section */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Upload Industry Poster Image (.JPG, .JPEG, .PNG)
                  </label>
                  <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 flex items-center justify-between gap-4">
                    {newIndustry.imageUrl ? (
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-12 rounded-lg bg-slate-900 border border-slate-200 shadow-sm overflow-hidden flex-shrink-0">
                          <img src={newIndustry.imageUrl} alt="Poster Preview" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs font-bold text-emerald-600">Poster Image Attached</span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">No poster image uploaded yet</span>
                    )}
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs uppercase rounded-lg cursor-pointer shadow-sm">
                      <Upload className="w-4 h-4" />
                      Choose Poster File (.JPG, .PNG, .JPEG)
                      <input
                        type="file"
                        accept="image/jpeg, image/jpg, image/png, image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setNewIndustry({ ...newIndustry, imageUrl: url });
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {/* RED CAPITAL NOTICE BELOW UPLOAD SECTION */}
                  <p className="text-rose-600 font-black text-xs uppercase tracking-wider mt-1.5 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    IMAGE FILENAME MUST MATCH INDUSTRY NAME: {getFormattedFileName(newIndustry.name, 'INDUSTRY_NAME')}.JPG / .PNG (USE '_' FOR SPACES).
                  </p>
                </div>

                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase py-3 rounded-lg shadow-sm sm:col-span-2 cursor-pointer"
                >
                  Save Industry Sector
                </button>
              </form>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="font-extrabold text-base text-slate-900 mb-4">Active Industries Served</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {industries.map((ind) => (
                  <div key={ind.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {ind.imageUrl && (
                        <div className="w-14 h-11 rounded-lg bg-slate-900 border border-slate-200 shadow-sm overflow-hidden flex-shrink-0">
                          <img src={ind.imageUrl} alt={ind.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <h5 className="font-extrabold text-sm text-slate-900">{ind.name}</h5>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{ind.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteIndustry(ind.id)}
                      className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors ml-2 flex-shrink-0"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Profile & Security Settings Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-scale-up">

            {/* Modal Header */}
            <div className="bg-[#0B1B3D] text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <UserCog className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Owner Profile &amp; Security Settings</h3>
                </div>
              </div>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">

              {/* Security Policy Badge */}
              <div className="bg-[#0B1B3D] text-white p-4 rounded-xl border border-amber-500/40 flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-extrabold text-amber-300 block">Security Policy Active</span>
                  <span className="text-slate-300">Automatic 20-minute inactivity session timeout is enforced for owner security.</span>
                </div>
              </div>

              {/* Section 2: Edit Owner Login Profile Credentials */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-amber-500" />
                  Change Owner Username &amp; Password
                </h4>
                <p className="text-xs text-slate-500">Requires verification of your Current (Old) Password.</p>

                {securityError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    {securityError}
                  </div>
                )}

                <form onSubmit={handleChangeSecurity} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Current (Old) Password *</label>
                    <input
                      type="password"
                      required
                      placeholder="Verify old password"
                      value={securityForm.oldPassword}
                      onChange={(e) => setSecurityForm({ ...securityForm, oldPassword: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">New Username (Optional)</label>
                      <input
                        type="text"
                        placeholder="Enter new username"
                        value={securityForm.newUsername}
                        onChange={(e) => setSecurityForm({ ...securityForm, newUsername: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                      />
                      <p className="text-[10px] text-slate-500 mt-1">Rules: No spaces &amp; no special characters.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">New Password (Optional)</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        value={securityForm.newPassword}
                        onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                      />
                      <p className="text-[10px] text-slate-500 mt-1">Rules: At least 1 uppercase, 1 lowercase, 1 number &amp; 1 special char.</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0B1B3D] hover:bg-slate-800 text-amber-400 font-bold text-xs uppercase py-3 rounded-lg shadow-sm cursor-pointer"
                  >
                    Update Owner Credentials
                  </button>
                </form>
              </div>

              {/* Section 3: Company Logo Settings */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-amber-500" />
                  Company Branding Logo
                </h4>
                <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl text-center bg-slate-50 flex items-center justify-between gap-4">
                  <img
                    src={localStorage.getItem('customCompanyLogo') || '/AV.png'}
                    alt="Company Logo Preview"
                    className="h-12 w-auto object-contain"
                  />
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase rounded-lg cursor-pointer shadow-sm">
                    <Upload className="w-4 h-4" />
                    Upload New Logo
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Section 4: Site Contact Details & Social Media Links */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-amber-500" />
                    Contact Section &amp; Social Media Settings
                  </h4>
                  {saveStatus && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 animate-fade-in">
                      {saveStatus}
                    </span>
                  )}
                </div>

                <form onSubmit={handleSaveContactInfo} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Direct Phone Number</label>
                      <input
                        type="text"
                        value={contactData.phone || ''}
                        onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                        placeholder="+971 50 123 4567"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">WhatsApp Phone Number</label>
                      <input
                        type="text"
                        value={contactData.whatsapp || ''}
                        onChange={(e) => setContactData({ ...contactData, whatsapp: e.target.value })}
                        placeholder="+971 50 123 4567"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Official Email Address</label>
                      <input
                        type="email"
                        value={contactData.email || ''}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        placeholder="info@alaqshamanpower.com"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Working Hours</label>
                      <input
                        type="text"
                        value={contactData.workingHours || ''}
                        onChange={(e) => setContactData({ ...contactData, workingHours: e.target.value })}
                        placeholder="Mon - Sat: 8:00 AM - 6:00 PM"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Headquarters Office Address</label>
                    <textarea
                      rows={2}
                      value={contactData.address || ''}
                      onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                      placeholder="Office 302, Al-Aqsha Building, Deira, Dubai, UAE"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                    ></textarea>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <h5 className="font-bold text-xs text-slate-800 uppercase mb-3 flex items-center gap-1.5">
                      <Share2 className="w-3.5 h-3.5 text-amber-500" />
                      Social Media Links
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">LinkedIn URL</label>
                        <input
                          type="url"
                          value={contactData.linkedinUrl || ''}
                          onChange={(e) => setContactData({ ...contactData, linkedinUrl: e.target.value })}
                          placeholder="https://linkedin.com/company/alaqsha"
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Facebook URL</label>
                        <input
                          type="url"
                          value={contactData.facebookUrl || ''}
                          onChange={(e) => setContactData({ ...contactData, facebookUrl: e.target.value })}
                          placeholder="https://facebook.com/alaqshamanpower"
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Instagram URL</label>
                        <input
                          type="url"
                          value={contactData.instagramUrl || ''}
                          onChange={(e) => setContactData({ ...contactData, instagramUrl: e.target.value })}
                          placeholder="https://instagram.com/alaqshamanpower"
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Twitter / X URL</label>
                        <input
                          type="url"
                          value={contactData.twitterUrl || ''}
                          onChange={(e) => setContactData({ ...contactData, twitterUrl: e.target.value })}
                          placeholder="https://twitter.com/alaqshamanpower"
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">WhatsApp Direct Chat Link</label>
                        <input
                          type="url"
                          value={contactData.whatsappUrl || ''}
                          onChange={(e) => setContactData({ ...contactData, whatsappUrl: e.target.value })}
                          placeholder="https://wa.me/971501234567"
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <h5 className="font-bold text-xs text-slate-800 uppercase mb-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      Google Maps Embed iframe Link
                    </h5>
                    <input
                      type="text"
                      value={contactData.mapEmbedUrl || ''}
                      onChange={(e) => setContactData({ ...contactData, mapEmbedUrl: e.target.value })}
                      placeholder="https://www.google.com/maps/embed?pb=..."
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Paste your Google Maps embed iframe URL (`https://www.google.com/maps/embed?...`).</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase py-3 rounded-lg shadow-sm cursor-pointer transition-colors"
                  >
                    Save Site Contact &amp; Social Links
                  </button>
                </form>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 p-4 border-t border-slate-200 text-right">
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="bg-[#0B1B3D] hover:bg-slate-800 text-amber-400 font-bold text-xs uppercase px-6 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Close Settings
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Logout Confirmation Alert Modal */}
      {showLogoutAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-scale-up text-center">
            <div className="w-16 h-16 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 mx-auto shadow-inner">
              <LogOut className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900">Confirm Owner Logout</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to end your owner session and log out of AL-AQSHA Control Center?
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowLogoutAlert(false)}
                className="w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs uppercase rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutAlert(false);
                  onLogout();
                }}
                className="w-1/2 py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs uppercase rounded-xl shadow-md transition-all cursor-pointer transform active:scale-95"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Exported Data Confirmation Modal */}
      {showClearModal && clearModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-scale-up text-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto shadow-inner">
              <Trash2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900">Clear Downloaded Records?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You have downloaded the Excel report for <span className="font-bold text-slate-900">{clearModalData.count} record(s)</span>. Would you like to delete these downloaded entries from the database and Control Center dashboard?
              </p>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-left text-[11px] text-amber-900 mt-2">
                <span className="font-bold">🔒 Data Safety Guarantee:</span> Even if a new entry arrives after downloading, <span className="font-bold">new un-exported entries are never deleted</span> and will remain safely preserved.
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowClearModal(false)}
                className="w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs uppercase rounded-xl transition-colors cursor-pointer"
              >
                Keep Records
              </button>
              <button
                onClick={handleConfirmClearExportedData}
                className="w-1/2 py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs uppercase rounded-xl shadow-md transition-all cursor-pointer transform active:scale-95"
              >
                Yes, Clear ({clearModalData.count})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
