import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getServicesData } from '../data/servicesData';
import { getIndustriesData } from '../data/industriesData';
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
  X,
  FileCheck,
  ArrowRight,
  Sparkles,
  PhoneCall
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

  useEffect(() => {
    if (initialIndustryFilter) {
      setIndustryFilter(initialIndustryFilter);
      const openingsEl = document.getElementById('openings');
      if (openingsEl) {
        openingsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [initialIndustryFilter]);

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

  const storedJobs = JSON.parse(localStorage.getItem('adminJobs') || '[]');
  const OPEN_POSITIONS = storedJobs.length > 0 ? storedJobs : DEFAULT_VACANCIES;

  const filteredJobs = OPEN_POSITIONS.filter(j => {
    const today = new Date().toISOString().split('T')[0];

    if (deadlineFilter === 'ACTIVE' && j.deadline && j.deadline < today) {
      return false;
    }
    if (deadlineFilter === 'NEXT30' && j.deadline) {
      const d30 = new Date();
      d30.setDate(d30.getDate() + 30);
      const d30Str = d30.toISOString().split('T')[0];
      if (j.deadline < today || j.deadline > d30Str) return false;
    }

    if (industryFilter) {
      const indLower = industryFilter.toLowerCase();
      const matchInd = (j.industryTag && j.industryTag.toLowerCase().includes(indLower)) ||
        (j.title && j.title.toLowerCase().includes(indLower)) ||
        (j.serviceCategory && j.serviceCategory.toLowerCase().includes(indLower)) ||
        (j.reqs && j.reqs.some(r => r.toLowerCase().includes(indLower)));
      if (!matchInd) return false;
    }

    if (serviceFilter) {
      const srvLower = serviceFilter.toLowerCase();
      const matchSrv = (j.serviceCategory && j.serviceCategory.toLowerCase().includes(srvLower)) ||
        (j.title && j.title.toLowerCase().includes(srvLower));
      if (!matchSrv) return false;
    }

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
        try {
          const lightweightApps = updatedApps.map(a => ({ ...a, resumeDataUrl: '' }));
          localStorage.setItem('jobApplications', JSON.stringify(lightweightApps));
        } catch (retryErr) {
          try {
            const prunedApps = updatedApps.slice(0, 20).map(a => ({ ...a, resumeDataUrl: '' }));
            localStorage.setItem('jobApplications', JSON.stringify(prunedApps));
          } catch (finalErr) { }
        }
      }
    }

    try {
      const apiPayload = { ...newApplication };
      delete apiPayload.resumeDataUrl;
      await axios.post('/api/jobs/apply', apiPayload, { timeout: 2000 });
    } catch (err) { }

    setIsSubmitting(false);
    setApplySuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] font-sans text-[#121417] flex flex-col font-sans">
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
        subtitle="Join AL-AQSHA MANPOWER CONSULTANCY and build a rewarding career across GCC countries."
        breadcrumbs={[
          { label: 'Home', onClick: onNavigateHome },
          { label: 'Careers' }
        ]}
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateServices={onNavigateServices}
        onNavigateIndustries={onNavigateIndustries}
        onNavigateCareers={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateContact={onNavigateContact}
      />

      {/* SECTION 1: Career Overview & Hero */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E8E3D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 animate-slide-left">
              <div>
                <span className="text-[#D4AF37] font-heading font-extrabold uppercase tracking-widest text-xs inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/30 mb-3 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  CAREERS AT AL-AQSHA
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-[#0B0C10] tracking-tight leading-tight">
                  Build Your Career <span className="text-gold-shimmer">With Us</span>
                </h2>
              </div>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-body">
                Join AL-AQSHA MANPOWER CONSULTANCY and be part of an esteemed workforce operating across United Arab Emirates, Saudi Arabia, Qatar, Oman, Kuwait, and Bahrain. We empower talent with legal visa clearance, comprehensive medical insurance, trade certification, and safe work environments.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-body">
                <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E3D5] hover:border-[#D4AF37] transition-all shadow-sm group">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center flex-shrink-0 font-bold group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-[#0B0C10] text-xs sm:text-sm">Career Advancement</h4>
                    <p className="text-stone-500 text-[11px]">Structured skill promotion</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E3D5] hover:border-[#D4AF37] transition-all shadow-sm group">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center flex-shrink-0 font-bold group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-[#0B0C10] text-xs sm:text-sm">Trade Skill Training</h4>
                    <p className="text-stone-500 text-[11px]">Certified trade test centers</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E3D5] hover:border-[#D4AF37] transition-all shadow-sm group">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center flex-shrink-0 font-bold group-hover:scale-110 transition-transform">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-[#0B0C10] text-xs sm:text-sm">Worker Welfare</h4>
                    <p className="text-stone-500 text-[11px]">Accommodation &amp; medical care</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E3D5] hover:border-[#D4AF37] transition-all shadow-sm group">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center flex-shrink-0 font-bold group-hover:scale-110 transition-transform">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-[#0B0C10] text-xs sm:text-sm">Fair &amp; Legal Contracts</h4>
                    <p className="text-stone-500 text-[11px]">MOHRE &amp; GCC compliant wages</p>
                  </div>
                </div>
              </div>

              {/* View Openings Action Button */}
              <div className="pt-3">
                <a
                  href="#openings"
                  className="inline-flex items-center gap-2 bg-gold-metallic hover:opacity-95 text-[#0B0C10] font-heading font-black text-xs uppercase px-8 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 hover:shadow-xl tracking-wider cursor-pointer active:translate-y-0"
                >
                  <Briefcase className="w-4 h-4" />
                  VIEW OPEN POSITIONS
                </a>
              </div>
            </div>

            {/* Team Photo Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-[#E6E2D8] relative group">
                <img
                  src="/images/career.png"
                  alt="AL-AQSHA Career Workers Team"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/career_team.jpg';
                  }}
                  className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#E6E2D8] shadow-lg flex items-center justify-between font-body">
                  <div>
                    <p className="font-heading font-extrabold text-[#171717] text-xs">GCC Manpower Deployment</p>
                    <p className="text-[11px] text-stone-500">Over 50,000+ Personnel Deployed</p>
                  </div>
                  <span className="px-2.5 py-1 bg-[#C9A227]/20 text-[#171717] text-[10px] font-heading font-bold rounded-md border border-[#C9A227]/40">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Why Choose Us (Deep Obsidian Theme bg-[#0B0C10]) */}
      <section className="py-16 sm:py-20 bg-[#0B0C10] text-white border-b border-[#12131A] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#D4AF37] font-heading font-extrabold uppercase tracking-widest text-xs block mb-2">
              WHY CHOOSE US
            </span>
            <h3 className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tight">
              Complete Support From Sourcing To Deployment
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed font-body">
              We ensure smooth recruitment, legal visa authorization, and long-term career stability for candidates joining GCC enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-body">
            <div className="bg-[#12131A] p-6 rounded-2xl border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center mb-5 font-extrabold group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-extrabold text-white text-base mb-2">100% Legal Visas</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Full embassy attestation, ministry work permits, and employment visa issuance without hassle.
              </p>
            </div>

            <div className="bg-[#12131A] p-6 rounded-2xl border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center mb-5 font-extrabold group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-extrabold text-white text-base mb-2">Medical &amp; Housing</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Comprehensive health insurance, safe housing quarters, and medical emergency assistance.
              </p>
            </div>

            <div className="bg-[#12131A] p-6 rounded-2xl border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center mb-5 font-extrabold group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-extrabold text-white text-base mb-2">Trade Skill Testing</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Practical assessment and trade certification in technical centers prior to site deployment.
              </p>
            </div>

            <div className="bg-[#12131A] p-6 rounded-2xl border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center mb-5 font-extrabold group-hover:scale-110 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-extrabold text-white text-base mb-2">Transparent Wages</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Guaranteed competitive salary structures with on-time WPS bank payments and overtime pay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Open Positions & Vacancy Filters */}
      <section id="openings" className="py-16 sm:py-20 bg-[#E6E2D8]/40 border-b border-[#E6E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#C9A227] font-heading font-extrabold uppercase tracking-widest text-xs block mb-1">
              CURRENT VACANCIES
            </span>
            <h3 className="text-3xl font-heading font-black text-[#171717] tracking-tight">Active Job Openings</h3>
            <p className="text-stone-600 text-xs sm:text-sm mt-2 font-body">
              Apply directly for GCC deployment opportunities. Free visa processing &amp; medical support.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="bg-white p-6 rounded-2xl border border-[#E6E2D8] shadow-md mb-10 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E6E2D8] pb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#C9A227]" />
                <h4 className="font-heading font-extrabold text-sm sm:text-base text-[#171717]">Filter Vacancies</h4>
              </div>

              {(industryFilter || serviceFilter || titleFilter || deadlineFilter !== 'ALL') && (
                <button
                  onClick={() => {
                    setIndustryFilter('');
                    setServiceFilter('');
                    setTitleFilter('');
                    setDeadlineFilter('ALL');
                  }}
                  className="text-xs font-heading font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                >
                  Clear All Filters ✕
                </button>
              )}
            </div>

            {/* Filter Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-body">
              <div>
                <label className="block text-[11px] font-heading font-bold text-stone-500 uppercase tracking-wider mb-1">
                  Filter by Industry
                </label>
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E6E2D8] bg-[#F7F4EC] text-[#171717] font-medium focus:outline-none focus:border-[#C9A227]"
                >
                  <option value="">All Industries</option>
                  {getIndustriesData().map((ind) => (
                    <option key={ind.id} value={ind.name || ind.title}>
                      {ind.name || ind.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-heading font-bold text-stone-500 uppercase tracking-wider mb-1">
                  Filter by Service
                </label>
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E6E2D8] bg-[#F7F4EC] text-[#171717] font-medium focus:outline-none focus:border-[#C9A227]"
                >
                  <option value="">All Services</option>
                  {getServicesData().map((srv) => (
                    <option key={srv.id} value={srv.title}>
                      {srv.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-heading font-bold text-stone-500 uppercase tracking-wider mb-1">
                  Job Opening Title / Keyword
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Electrician, Dubai..."
                    value={titleFilter}
                    onChange={(e) => setTitleFilter(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 pr-8 rounded-xl border border-[#E6E2D8] bg-[#F7F4EC] text-[#171717] font-medium focus:outline-none focus:border-[#C9A227]"
                  />
                  <Search className="w-4 h-4 text-stone-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-heading font-bold text-stone-500 uppercase tracking-wider mb-1">
                  Application Deadline
                </label>
                <select
                  value={deadlineFilter}
                  onChange={(e) => setDeadlineFilter(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E6E2D8] bg-[#F7F4EC] text-[#171717] font-medium focus:outline-none focus:border-[#C9A227]"
                >
                  <option value="ALL">All Deadlines</option>
                  <option value="ACTIVE">Active Openings Only</option>
                  <option value="NEXT30">Expiring in Next 30 Days</option>
                </select>
              </div>
            </div>

            {industryFilter && (
              <div className="bg-[#F7F4EC] border border-[#E6E2D8] p-3 rounded-xl flex items-center justify-between text-xs text-[#171717] font-semibold font-body">
                <span>Filtering openings matching Industry: <strong>"{industryFilter}"</strong></span>
                <span className="text-[11px] text-[#C9A227] font-heading font-extrabold">{filteredJobs.length} Vacancies Found</span>
              </div>
            )}
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl border border-[#E6E2D8] text-center max-w-xl mx-auto shadow-sm my-4 font-body">
              <Briefcase className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h4 className="font-heading font-extrabold text-[#171717] text-base mb-1">No Matching Job Openings Found</h4>
              <p className="text-xs text-stone-500 mb-5 leading-relaxed">
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
                  className="bg-[#E6E2D8] hover:bg-[#d5cfbe] text-[#171717] font-heading font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
                <button
                  onClick={onOpenEnquiry}
                  className="bg-[#171717] hover:bg-[#262626] text-[#C9A227] font-heading font-bold text-xs uppercase px-5 py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  Submit General Resume / Enquiry
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-body">
              {filteredJobs.map((job) => (
                <div key={job.id} className="bg-white p-6 rounded-2xl border border-[#E6E2D8] border-l-4 border-l-[#C9A227] shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h4 className="font-heading font-extrabold text-[#171717] text-base">{job.title}</h4>
                      <span className="px-2.5 py-1 rounded bg-[#C9A227]/10 text-[#C9A227] font-heading font-extrabold text-[10px] uppercase border border-[#C9A227]/30 flex-shrink-0">
                        {job.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-stone-600 font-semibold mb-4">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#C9A227]" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-emerald-600" /> {job.salary}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E6E2D8] flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-500">Deadline: {job.deadline}</span>
                    <button
                      onClick={() => {
                        setApplySuccess(false);
                        setSelectedJob(job);
                      }}
                      className="bg-[#C9A227] hover:bg-[#B38F1F] text-[#171717] font-heading font-bold text-xs uppercase px-4 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: Recruitment Process */}
      <section className="py-16 bg-[#F7F4EC] border-t border-[#E6E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#C9A227] font-heading font-extrabold uppercase tracking-widest text-xs block mb-2">
              HIRING PROCESS
            </span>
            <h2 className="text-3xl font-heading font-black text-[#171717] tracking-tight">
              How Deployment Works
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-body">
              Our 4-step streamlined process ensures fast, compliant workforce deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-body">
            <div className="bg-white p-6 rounded-2xl border border-[#E6E2D8] text-center shadow-sm">
              <span className="w-10 h-10 rounded-full bg-[#C9A227]/20 text-[#C9A227] font-heading font-black text-sm flex items-center justify-center mx-auto mb-4">
                01
              </span>
              <h4 className="font-heading font-extrabold text-[#171717] text-base mb-2">Application</h4>
              <p className="text-stone-600 text-xs leading-relaxed">
                Submit your CV online or register at our overseas recruitment centers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E6E2D8] text-center shadow-sm">
              <span className="w-10 h-10 rounded-full bg-[#C9A227]/20 text-[#C9A227] font-heading font-black text-sm flex items-center justify-center mx-auto mb-4">
                02
              </span>
              <h4 className="font-heading font-extrabold text-[#171717] text-base mb-2">Trade Testing</h4>
              <p className="text-stone-600 text-xs leading-relaxed">
                Practical assessment by certified engineers for technical roles.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E6E2D8] text-center shadow-sm">
              <span className="w-10 h-10 rounded-full bg-[#C9A227]/20 text-[#C9A227] font-heading font-black text-sm flex items-center justify-center mx-auto mb-4">
                03
              </span>
              <h4 className="font-heading font-extrabold text-[#171717] text-base mb-2">Medical &amp; Visa</h4>
              <p className="text-stone-600 text-xs leading-relaxed">
                GAMCA medical test, PCC police verification, and visa stamping.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E6E2D8] text-center shadow-sm">
              <span className="w-10 h-10 rounded-full bg-[#C9A227]/20 text-[#C9A227] font-heading font-black text-sm flex items-center justify-center mx-auto mb-4">
                04
              </span>
              <h4 className="font-heading font-extrabold text-[#171717] text-base mb-2">GCC Deployment</h4>
              <p className="text-stone-600 text-xs leading-relaxed">
                Flight ticket arrangement, airport reception, and housing placement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Call To Action Banner */}
      <section className="py-14 bg-[#171717] text-white border-t border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">
            Didn't Find a Matching Vacancy?
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-body">
            Send us your resume directly or contact our candidate helpdesk. We register applicants in our talent database for upcoming Gulf recruitment drives.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 font-heading">
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center gap-2 bg-[#C9A227] hover:bg-[#B38F1F] text-[#171717] font-black text-xs uppercase px-8 py-3.5 rounded-xl shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" />
              SUBMIT GENERAL RESUME
            </button>
            <button
              onClick={onNavigateContact}
              className="inline-flex items-center gap-2 bg-[#262626] hover:bg-[#383838] text-white font-extrabold text-xs uppercase px-8 py-3.5 rounded-xl border border-[#383838] transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#C9A227]" />
              CONTACT HELPDESK
            </button>
          </div>
        </div>
      </section>

      {/* Job Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in font-body">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#E6E2D8] overflow-hidden my-8">
            <div className="bg-[#171717] p-5 text-white flex items-center justify-between border-b border-[#262626]">
              <div>
                <span className="text-[10px] font-heading font-extrabold text-[#C9A227] uppercase tracking-wider block">Job Application</span>
                <h3 className="font-heading font-black text-base text-white leading-tight">{selectedJob.title}</h3>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {applySuccess ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto mb-3 animate-bounce" />
                  <h4 className="font-heading text-lg font-black text-[#171717] mb-1">Application Submitted Successfully!</h4>
                  <p className="text-xs text-stone-600 mb-6 leading-relaxed">
                    Our HR team will review your application and contact you for trade testing and interview details.
                  </p>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="bg-[#C9A227] hover:bg-[#B38F1F] text-[#171717] font-heading font-bold px-6 py-2.5 rounded-xl text-xs uppercase shadow-md transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-heading font-bold text-[#171717] uppercase mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mohammed Salem"
                      value={applicantData.fullName}
                      onChange={(e) => setApplicantData({ ...applicantData, fullName: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E6E2D8] focus:outline-none focus:border-[#C9A227] text-[#171717] font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-bold text-[#171717] uppercase mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="mohammed@email.com"
                        value={applicantData.email}
                        onChange={(e) => setApplicantData({ ...applicantData, email: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E6E2D8] focus:outline-none focus:border-[#C9A227] text-[#171717] font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-heading font-bold text-[#171717] uppercase mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 987 6543"
                        value={applicantData.phone}
                        onChange={(e) => setApplicantData({ ...applicantData, phone: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E6E2D8] focus:outline-none focus:border-[#C9A227] text-[#171717] font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold text-[#171717] uppercase mb-1">Years of Experience *</label>
                    <select
                      required
                      value={applicantData.experience}
                      onChange={(e) => setApplicantData({ ...applicantData, experience: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E6E2D8] bg-white focus:outline-none focus:border-[#C9A227] text-[#171717] font-medium"
                    >
                      <option value="">-- Select Experience Level (Required) --</option>
                      <option value="1-2 Years">1-2 Years</option>
                      <option value="3-5 Years">3-5 Years</option>
                      <option value="5-10 Years">5-10 Years</option>
                      <option value="10+ Years">10+ Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold text-[#171717] uppercase mb-1">
                      Upload Resume (PDF ONLY, Max 500 KB) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="file"
                      required
                      accept=".pdf,application/pdf"
                      onChange={handleResumeFileChange}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-[#E6E2D8] bg-white focus:outline-none focus:border-[#C9A227] file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-heading file:font-bold file:bg-[#C9A227] file:text-[#171717] hover:file:bg-[#B38F1F] cursor-pointer"
                    />
                    <p className="text-[10px] text-stone-500 mt-1">
                      Format: <span className="font-mono text-[#C9A227] font-bold">Firstname_Lastname_Resume.pdf</span> (Max Size: <span className="font-bold text-stone-700">500 KB</span>)
                    </p>
                    {pdfErr && (
                      <p className="text-[11px] text-rose-600 font-bold mt-1">{pdfErr}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold text-[#171717] uppercase mb-1">Cover Note / Remarks *</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Briefly state your key certifications, current location, or passport status *"
                      value={applicantData.message}
                      onChange={(e) => setApplicantData({ ...applicantData, message: e.target.value })}
                      className="w-full text-xs px-3.5 py-2 rounded-xl border border-[#E6E2D8] focus:outline-none focus:border-[#C9A227] text-[#171717] font-medium"
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
                      className="px-4 py-2 rounded-xl text-stone-600 font-heading font-bold text-xs uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#B38F1F] text-[#171717] font-heading font-extrabold text-xs uppercase px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer transform active:scale-95 disabled:opacity-50"
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

      {/* 5. Footer */}
      <Footer
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateServices={onNavigateServices}
        onNavigateIndustries={onNavigateIndustries}
        onNavigateCareers={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateContact={onNavigateContact}
      />
    </div>
  );
}
