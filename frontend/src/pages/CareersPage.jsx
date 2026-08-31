import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TrendingUp,
  GraduationCap,
  HeartHandshake,
  Scale,
  Award,
  Globe2,
  ShieldCheck,
  ChevronRight,
  Send,
  CheckCircle2,
  Briefcase,
  MapPin,
  Clock,
  Filter,
  Search,
  X
} from 'lucide-react';
import Navbar from '../components/sections/Navbar';
import PageHeader from '../components/common/PageHeader';
import Footer from '../components/common/Footer';
import CaptchaWidget from '../components/common/CaptchaWidget';

export default function CareersPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateServices,
  onNavigateIndustries,
  onNavigateCareers,
  onNavigateContact,
  onOpenEnquiry,
  initialIndustryFilter = ''
}) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicantData, setApplicantData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '1-2 Years',
    message: '',
    resumeFile: null,
    resumeDataUrl: ''
  });
  const [applySuccess, setApplySuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaState, setCaptchaState] = useState({ code: '', input: '' });
  const [captchaErr, setCaptchaErr] = useState('');
  const [pdfErr, setPdfErr] = useState('');

  const generateResumeFileName = (fullName, storedApps) => {
    const nameParts = (fullName || 'Candidate Application').trim().split(/\s+/).filter(Boolean);
    const rawFirst = nameParts[0] || 'Candidate';
    const rawLast = nameParts.length > 1 ? nameParts.slice(1).join('_') : 'Resume';

    const cleanFirst = rawFirst.replace(/[^a-zA-Z0-9]/g, '');
    const cleanLast = rawLast.replace(/[^a-zA-Z0-9]/g, '');

    const capFirst = cleanFirst ? cleanFirst.charAt(0).toUpperCase() + cleanFirst.slice(1) : 'Candidate';
    const capLast = cleanLast ? cleanLast.charAt(0).toUpperCase() + cleanLast.slice(1) : 'Applicant';

    const baseName = `${capFirst}_${capLast}_Resume`;
    const existingNames = new Set(
      (storedApps || []).map(a => (a.resumeFileName || '').toLowerCase())
    );

    let targetName = `${baseName}.pdf`;
    if (!existingNames.has(targetName.toLowerCase())) {
      return targetName;
    }

    let index = 1;
    while (true) {
      const paddedCounter = String(index).padStart(2, '0');
      targetName = `${baseName}_${paddedCounter}.pdf`;
      if (!existingNames.has(targetName.toLowerCase())) {
        return targetName;
      }
      index++;
    }
  };

  const handleResumeFileChange = (e) => {
    const file = e.target.files[0];
    setPdfErr('');
    if (!file) {
      setApplicantData(prev => ({ ...prev, resumeFile: null, resumeDataUrl: '' }));
      return;
    }
    const fileName = file.name.toLowerCase();
    const fileType = file.type;
    if (fileType !== 'application/pdf' && !fileName.endsWith('.pdf')) {
      setPdfErr('Only PDF files (.pdf) are allowed for resume upload. Please select a valid PDF file.');
      e.target.value = '';
      setApplicantData(prev => ({ ...prev, resumeFile: null, resumeDataUrl: '' }));
      return;
    }
    const maxSizeBytes = 500 * 1024; // 500 KB
    if (file.size > maxSizeBytes) {
      const fileSizeKb = Math.round(file.size / 1024);
      setPdfErr(`Resume file size must not exceed 500 KB (Selected file size: ${fileSizeKb} KB). Please compress or select a smaller PDF file.`);
      e.target.value = '';
      setApplicantData(prev => ({ ...prev, resumeFile: null, resumeDataUrl: '' }));
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setApplicantData(prev => ({
        ...prev,
        resumeFile: file,
        resumeDataUrl: event.target.result
      }));
    };
    reader.readAsDataURL(file);
  };

  // Filter States
  const [industryFilter, setIndustryFilter] = useState(initialIndustryFilter || '');
  const [serviceFilter, setServiceFilter] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const [deadlineFilter, setDeadlineFilter] = useState('ALL');

  // Update industryFilter whenever initialIndustryFilter prop changes
  useEffect(() => {
    if (initialIndustryFilter) {
      setIndustryFilter(initialIndustryFilter);
      // Scroll to openings section smoothly
      const openingsEl = document.getElementById('openings');
      if (openingsEl) {
        openingsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [initialIndustryFilter]);

  // Default sample vacancies across all industries & services if none added by admin
  const DEFAULT_VACANCIES = [
    {
      id: 'def-1',
      title: 'Certified Construction Electrician & MEP Tech',
      location: 'Dubai & Abu Dhabi, UAE',
      type: 'Full-time / Contract',
      salary: 'AED 3,200 - 4,500 + Housing',
      deadline: '2026-12-31',
      serviceCategory: 'Skilled Manpower Supply',
      industryTag: 'Construction',
      reqs: ['Minimum 3 years GCC site experience', 'MOHRE clear license', 'Free flight ticket & medical insurance']
    },
    {
      id: 'def-2',
      title: 'Heavy Equipment Operator (Oil & Gas Rig)',
      location: 'Riyadh & Jubail, KSA',
      type: 'Full-time / Long-term',
      salary: 'SAR 3,800 - 5,200 + Food Allowance',
      deadline: '2026-12-31',
      serviceCategory: 'Technical Manpower Supply',
      industryTag: 'Oil & Gas',
      reqs: ['Valid KSA / GCC Heavy Operator License', 'Rig safety certification', 'Immediate deployment']
    },
    {
      id: 'def-3',
      title: 'Manufacturing & Heavy Assembly Line Operator',
      location: 'Muscat, Oman',
      type: 'Project Contract',
      salary: 'OMR 280 - 350 + Accommodation',
      deadline: '2026-12-31',
      serviceCategory: 'Unskilled Manpower Supply',
      industryTag: 'Manufacturing',
      reqs: ['Physically fit for industrial plant work', 'Basic English/Hindi communication', 'Compliant visa & insurance']
    },
    {
      id: 'def-4',
      title: 'Hotel Facility & HVAC Steward',
      location: 'Doha, Qatar',
      type: 'Full-time Placement',
      salary: 'QAR 2,800 - 3,800 + Benefits',
      deadline: '2026-12-31',
      serviceCategory: 'Project-based Manpower Supply',
      industryTag: 'Hospitality',
      reqs: ['2+ years hotel or facility experience', 'HVAC maintenance certified', 'Immediate joining']
    },
    {
      id: 'def-5',
      title: 'Civil Construction Site Safety Inspector (NEBOSH)',
      location: 'Abu Dhabi, UAE',
      type: 'Full-time Corporate Placement',
      salary: 'AED 6,000 - 8,000 + Transport',
      deadline: '2026-12-31',
      serviceCategory: 'Technical Manpower Supply',
      industryTag: 'Construction',
      reqs: ['NEBOSH IGC Certified', '3+ years civil safety auditing', 'Fluent English report writing']
    },
    {
      id: 'def-6',
      title: 'Facility Maintenance & Cleanroom Assistant',
      location: 'Dubai & Sharjah, UAE',
      type: 'Full-time',
      salary: 'AED 2,200 - 2,800 + Transport',
      deadline: '2026-12-31',
      serviceCategory: 'Unskilled Manpower Supply',
      industryTag: 'Facility Management',
      reqs: ['Reliable general labor background', 'Clean medical history', 'Compliant labor card']
    }
  ];

  // Load dynamic jobs created by owner or merge with defaults
  const storedJobs = JSON.parse(localStorage.getItem('adminJobs') || '[]');
  const OPEN_POSITIONS = storedJobs.length > 0 ? storedJobs : DEFAULT_VACANCIES;

  // Filter job openings based on Industry, Service, Title, and Deadline
  const filteredJobs = OPEN_POSITIONS.filter(j => {
    const today = new Date().toISOString().split('T')[0];

    // Deadline check
    if (deadlineFilter === 'ACTIVE' && j.deadline && j.deadline < today) {
      return false;
    }
    if (deadlineFilter === 'NEXT30' && j.deadline) {
      const d30 = new Date();
      d30.setDate(d30.getDate() + 30);
      const d30Str = d30.toISOString().split('T')[0];
      if (j.deadline < today || j.deadline > d30Str) return false;
    }

    // Industry check
    if (industryFilter) {
      const indLower = industryFilter.toLowerCase();
      const matchInd = (j.industryTag && j.industryTag.toLowerCase().includes(indLower)) ||
                       (j.title && j.title.toLowerCase().includes(indLower)) ||
                       (j.serviceCategory && j.serviceCategory.toLowerCase().includes(indLower)) ||
                       (j.reqs && j.reqs.some(r => r.toLowerCase().includes(indLower)));
      if (!matchInd) return false;
    }

    // Service check
    if (serviceFilter) {
      const srvLower = serviceFilter.toLowerCase();
      const matchSrv = (j.serviceCategory && j.serviceCategory.toLowerCase().includes(srvLower)) ||
                       (j.title && j.title.toLowerCase().includes(srvLower));
      if (!matchSrv) return false;
    }

    // Title search check
    if (titleFilter) {
      const titleLower = titleFilter.toLowerCase();
      const matchTitle = (j.title && j.title.toLowerCase().includes(titleLower)) ||
                         (j.location && j.location.toLowerCase().includes(titleLower));
      if (!matchTitle) return false;
    }

    return true;
  });

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setCaptchaErr('');
    setPdfErr('');

    if (!applicantData.resumeFile && !applicantData.resumeDataUrl) {
      setPdfErr('Please upload a compulsory PDF resume file (.pdf).');
      return;
    }
    if (captchaState.input !== captchaState.code) {
      setCaptchaErr('Incorrect Captcha code. Please check and re-enter.');
      return;
    }

    setIsSubmitting(true);

    const storedApps = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    const formattedResumeFileName = generateResumeFileName(applicantData.fullName, storedApps);

    const newApplication = {
      id: Date.now(),
      jobTitle: selectedJob?.title || 'General Application',
      fullName: applicantData.fullName.trim(),
      email: applicantData.email.trim(),
      phone: applicantData.phone.trim(),
      experience: applicantData.experience || '1-2 Years',
      resumeFileName: formattedResumeFileName,
      resumeDataUrl: applicantData.resumeDataUrl || '',
      message: applicantData.message ? applicantData.message.trim() : '',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    // 1. Save application locally for owner portal with QuotaExceededError protection
    const isDuplicate = storedApps.some(app =>
      app.email === newApplication.email &&
      app.jobTitle === newApplication.jobTitle &&
      Math.abs(app.id - newApplication.id) < 5000
    );

    if (!isDuplicate) {
      const updatedApps = [newApplication, ...storedApps];
      try {
        localStorage.setItem('jobApplications', JSON.stringify(updatedApps));
      } catch (quotaErr) {
        console.warn('LocalStorage quota exceeded while storing base64 PDF. Saving candidate record safely without heavy base64 payload:', quotaErr);
        try {
          const lightweightApps = updatedApps.map(a => ({ ...a, resumeDataUrl: '' }));
          localStorage.setItem('jobApplications', JSON.stringify(lightweightApps));
        } catch (retryErr) {
          try {
            const prunedApps = updatedApps.slice(0, 20).map(a => ({ ...a, resumeDataUrl: '' }));
            localStorage.setItem('jobApplications', JSON.stringify(prunedApps));
          } catch (finalErr) {
            console.error('Unable to save to localStorage due to browser storage quota:', finalErr);
          }
        }
      }
    }

    // 2. Dispatch to backend API with 2-second timeout failsafe
    try {
      const apiPayload = { ...newApplication };
      delete apiPayload.resumeDataUrl; // Strip heavy base64 before HTTP request
      await axios.post('/api/jobs/apply', apiPayload, { timeout: 2000 });
    } catch (err) {
      console.warn('Backend API notification skipped or timed out, saved application locally for owner:', err.message);
    }

    // 3. Complete submission UI immediately
    setIsSubmitting(false);
    setApplySuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col animate-fade-in">
      {/* 1. Header Navigation Bar */}
      <Navbar
        activePage="careers"
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateServices={onNavigateServices}
        onNavigateIndustries={onNavigateIndustries}
        onNavigateCareers={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateContact={onNavigateContact}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* 2. Page Header / Breadcrumb */}
      <PageHeader
        title="Careers & Opportunities"
        subtitle="Join AL-AQSHA Manpower Supply and build a rewarding career across GCC countries."
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'Careers' }
        ]}
      />

      {/* 3. Main Target Careers Layout */}
      <section className="py-16 sm:py-20 bg-[#0B1B3D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-amber-400 font-bold uppercase tracking-widest text-xs block mb-1">
                  CAREERS
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Build Your Career With Us
                </h2>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                Join AL-AQSHA Manpower Supply and be part of a team that values people, growth and excellence. We recruit and deploy candidate talent across Gulf Countries with legal visa clearance, comprehensive medical insurance, and safe work environments.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-xs sm:text-sm">Career Growth</h4>
                    <p className="text-slate-400 text-[11px]">Clear advancement pathways</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-xs sm:text-sm">Training & Development</h4>
                    <p className="text-slate-400 text-[11px]">Trade testing & skill centers</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-xs sm:text-sm">Supportive Environment</h4>
                    <p className="text-slate-400 text-[11px]">Accommodation & welfare care</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-xs sm:text-sm">Equal Opportunities</h4>
                    <p className="text-slate-400 text-[11px]">Fair wages & legal contracts</p>
                  </div>
                </div>
              </div>

              {/* Solid Gold View Openings Button */}
              <div className="pt-4">
                <a
                  href="#openings"
                  className="inline-block bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black text-xs uppercase px-9 py-3.5 rounded-md shadow-md transition-all transform hover:-translate-y-0.5 tracking-wider cursor-pointer"
                >
                  VIEW OPENINGS
                </a>
              </div>
            </div>

            {/* Team Photo Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-700/60 relative group">
                <img
                  src="/images/career.png"
                  alt="AL-AQSHA Career Workers Team"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/career_team.jpg';
                  }}
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/80 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Open Positions Listings */}
      <section id="openings" className="py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-500 font-bold uppercase tracking-widest text-xs block mb-1">
              CURRENT VACANCIES
            </span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Active Job Openings</h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Apply directly for GCC deployment opportunities. Free visa processing &amp; medical support.
            </p>
          </div>

          {/* Interactive Job Openings Filter Bar */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md mb-10 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-amber-500" />
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900">Filter Vacancies</h4>
              </div>

              {(industryFilter || serviceFilter || titleFilter || deadlineFilter !== 'ALL') && (
                <button
                  onClick={() => {
                    setIndustryFilter('');
                    setServiceFilter('');
                    setTitleFilter('');
                    setDeadlineFilter('ALL');
                  }}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                >
                  Clear All Filters ✕
                </button>
              )}
            </div>

            {/* Filter Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Filter 1: Industry */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Filter by Industry
                </label>
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 font-medium focus:outline-none focus:border-amber-500"
                >
                  <option value="">All Industries</option>
                  <option value="Construction">Construction</option>
                  <option value="Oil & Gas">Oil &amp; Gas</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Facility Management">Facility Management</option>
                  <option value="Other Industries">Other Industries</option>
                </select>
              </div>

              {/* Filter 2: Service Category */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Filter by Service
                </label>
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 font-medium focus:outline-none focus:border-amber-500"
                >
                  <option value="">All Services</option>
                  <option value="Skilled Manpower Supply">Skilled Manpower Supply</option>
                  <option value="Unskilled Manpower Supply">Unskilled Manpower Supply</option>
                  <option value="Technical Manpower Supply">Technical Manpower Supply</option>
                  <option value="Project-based Manpower Supply">Project-based Manpower Supply</option>
                  <option value="Recruitment Process Outsourcing">Recruitment Process Outsourcing</option>
                  <option value="Visa & Travel Assistance">Visa &amp; Travel Assistance</option>
                </select>
              </div>

              {/* Filter 3: Title Keyword */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Job Opening Title / Keyword
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Electrician, Dubai..."
                    value={titleFilter}
                    onChange={(e) => setTitleFilter(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 pr-8 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 font-medium focus:outline-none focus:border-amber-500"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Filter 4: Deadline Date */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Application Deadline
                </label>
                <select
                  value={deadlineFilter}
                  onChange={(e) => setDeadlineFilter(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 font-medium focus:outline-none focus:border-amber-500"
                >
                  <option value="ALL">All Deadlines</option>
                  <option value="ACTIVE">Active Openings Only</option>
                  <option value="NEXT30">Expiring in Next 30 Days</option>
                </select>
              </div>
            </div>

            {/* Filter Active Badge */}
            {industryFilter && (
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center justify-between text-xs text-amber-900 font-semibold">
                <span>Filtering openings matching Industry: <strong>"{industryFilter}"</strong></span>
                <span className="text-[11px] text-amber-700 font-extrabold">{filteredJobs.length} Vacancies Found</span>
              </div>
            )}
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center max-w-xl mx-auto shadow-sm my-4">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="font-extrabold text-slate-900 text-base mb-1">No Matching Job Openings Found</h4>
              <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                No vacancies match your selected filters. Try clearing filters or submit a general resume for upcoming recruitment drives.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setIndustryFilter('');
                    setServiceFilter('');
                    setTitleFilter('');
                    setDeadlineFilter('ALL');
                  }}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs uppercase px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
                <button
                  onClick={onOpenEnquiry}
                  className="bg-[#0B1B3D] hover:bg-slate-800 text-amber-400 font-bold text-xs uppercase px-5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Submit General Resume / Enquiry
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h4 className="font-extrabold text-slate-900 text-base">{job.title}</h4>
                    <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 font-bold text-[10px] uppercase border border-amber-200 flex-shrink-0">
                      {job.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-medium mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" /> {job.salary}
                    </span>
                  </div>

                  <ul className="space-y-1.5 mb-6">
                    {job.reqs.map((req, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setApplySuccess(false);
                    setSelectedJob(job);
                  }}
                  className="w-full py-2.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs uppercase rounded transition-colors cursor-pointer"
                >
                  Apply For Position
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>

      {/* 5. Footer */}
      <Footer
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateServices={onNavigateServices}
        onNavigateIndustries={onNavigateIndustries}
        onNavigateCareers={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateContact={onNavigateContact}
      />

      {/* 6. Apply Job Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 relative animate-scale-modal">
            <div className="bg-[#0B1B3D] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-base uppercase tracking-wider">Apply: {selectedJob.title}</h3>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {applySuccess ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Application Submitted!</h4>
                  <p className="text-xs text-slate-600 mb-6">
                    Our HR team will review your application and contact you for trade testing and interview details.
                  </p>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-md text-xs uppercase"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mohammed Salem"
                      value={applicantData.fullName}
                      onChange={(e) => setApplicantData({ ...applicantData, fullName: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="mohammed@email.com"
                        value={applicantData.email}
                        onChange={(e) => setApplicantData({ ...applicantData, email: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 987 6543"
                        value={applicantData.phone}
                        onChange={(e) => setApplicantData({ ...applicantData, phone: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Years of Experience *</label>
                    <select
                      required
                      value={applicantData.experience}
                      onChange={(e) => setApplicantData({ ...applicantData, experience: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-md border border-slate-300 bg-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="">-- Select Experience Level (Required) --</option>
                      <option value="1-2 Years">1-2 Years</option>
                      <option value="3-5 Years">3-5 Years</option>
                      <option value="5-10 Years">5-10 Years</option>
                      <option value="10+ Years">10+ Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Upload Resume (PDF ONLY, Max 500 KB) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="file"
                      required
                      accept=".pdf,application/pdf"
                      onChange={handleResumeFileChange}
                      className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 bg-white focus:outline-none focus:border-amber-500 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400 cursor-pointer"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      Format: <span className="font-mono text-amber-700 font-bold">Firstname_Lastname_Resume.pdf</span> (Max Size: <span className="font-bold text-slate-700">500 KB</span>)
                    </p>
                    {pdfErr && (
                      <p className="text-[11px] text-rose-600 font-bold mt-1">{pdfErr}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Cover Note / Remarks *</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Briefly state your key certifications, current location, or passport status *"
                      value={applicantData.message}
                      onChange={(e) => setApplicantData({ ...applicantData, message: e.target.value })}
                      className="w-full text-xs px-3.5 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-amber-500"
                    ></textarea>
                  </div>

                  <CaptchaWidget
                    onVerify={(code, input) => setCaptchaState({ code, input })}
                    error={captchaErr}
                  />

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedJob(null)}
                      className="px-4 py-2 rounded-md text-slate-600 font-bold text-xs uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase px-6 py-2.5 rounded-lg shadow-md transition-all cursor-pointer transform active:scale-95 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
