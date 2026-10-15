import React, { useState, useEffect } from 'react';
import { 
  X, Download, Plus, Trash2, Edit3, Shield, Users, Briefcase, 
  Phone, Mail, MapPin, CheckCircle2, AlertCircle, FileText, Calendar 
} from 'lucide-react';

export default function AdminDashboard({ isOpen, onClose, onUpdateContactInfo }) {
  const [activeTab, setActiveTab] = useState('enquiries');
  
  // Data States
  const [enquiries, setEnquiries] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [services, setServices] = useState([]);
  const [contactData, setContactData] = useState({
    phonePrimary: '+91 91722 09292',
    phoneSecondary: '+91 98226 23071',
    emailPrimary: 'alaqsha.m.s.0786@gmail.com',
    emailSecondary: 'info@alaqsha.com',
    address: 'Survey No. 54, Kondhwa Khurd, Pune, Maharashtra 411048',
    workingHoursWeekdays: 'Mon - Sat: 9:00 AM - 7:00 PM',
    workingHoursWeekend: 'Sunday: Closed'
  });

  // Forms
  const [newJob, setNewJob] = useState({ title: '', location: '', type: 'Full-time', salary: '', deadline: '', requirements: '' });
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadDashboardData();
    }
  }, [isOpen]);

  const loadDashboardData = async () => {
    const storedEnquiries = JSON.parse(localStorage.getItem('userEnquiries') || '[]');
    const defaultEnquiries = [
      { id: 101, fullName: 'Rahim Khan', email: 'rahim@apexconstructions.com', phone: '+971 50 112 2334', serviceRequired: 'Skilled Manpower Supply', message: 'Need 15 certified electricians for Dubai Marina tower project.', createdAt: '2026-08-28 14:30' },
      { id: 102, fullName: 'Sarah Al-Mansoor', email: 'sarah@gulflogistics.ae', phone: '+971 55 998 8776', serviceRequired: 'Visa & Travel Assistance', message: 'Inquiry regarding block visas for 50 heavy drivers.', createdAt: '2026-08-29 11:15' },
      { id: 103, fullName: 'Vikram Sharma', email: 'vikram@pune-infra.in', phone: '+91 98765 43210', serviceRequired: 'Others', message: 'Specialized solar plant technicians required urgently.', createdAt: '2026-08-30 09:45' }
    ];
    setEnquiries([...storedEnquiries, ...defaultEnquiries]);

    const storedJobs = JSON.parse(localStorage.getItem('adminJobs') || '[]');
    const defaultJobs = [
      { id: 1, title: 'Certified Electrician & MEP Tech', location: 'Dubai, UAE', type: 'Full-time', salary: 'AED 3,200', deadline: '2026-12-31' },
      { id: 2, title: 'Heavy Equipment Operator', location: 'Riyadh, KSA', type: 'Contract', salary: 'SAR 4,000', deadline: '2026-12-31' }
    ];
    setJobs([...storedJobs, ...defaultJobs]);

    const storedApps = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    const defaultApps = [
      { id: 1, jobTitle: 'Certified Electrician & MEP Tech', fullName: 'Mohammed Salem', email: 'salem@email.com', phone: '+971 50 987 6543', experience: '3-5 Years', resumeFileName: 'Mohammed_Salem_CV.pdf', createdAt: '2026-08-29 16:20' }
    ];
    setApplications([...storedApps, ...defaultApps]);

    const savedContact = localStorage.getItem('siteContactInfo');
    if (savedContact) {
      setContactData(JSON.parse(savedContact));
    }
  };

  const handleExportExcel = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Full Name,Email,Phone,Service Required,Message,Date\n";

    enquiries.forEach(eq => {
      const row = [
        eq.id,
        `"${eq.fullName || ''}"`,
        `"${eq.email || ''}"`,
        `"${eq.phone || ''}"`,
        `"${eq.serviceRequired || ''}"`,
        `"${(eq.message || '').replace(/\n/g, ' ')}"`,
        `"${eq.createdAt || ''}"`
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AlAqsha_Enquiries_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    const newJobObj = { ...newJob, id: Date.now() };
    const updatedJobs = [newJobObj, ...jobs];
    setJobs(updatedJobs);
    localStorage.setItem('adminJobs', JSON.stringify(updatedJobs));
    setNewJob({ title: '', location: '', type: 'Full-time', salary: '', deadline: '', requirements: '' });
    setSaveStatus('Job opening created successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleDeleteJob = (id) => {
    const updatedJobs = jobs.filter(j => j.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem('adminJobs', JSON.stringify(updatedJobs));
  };

  const handleSaveContactInfo = (e) => {
    e.preventDefault();
    localStorage.setItem('siteContactInfo', JSON.stringify(contactData));
    if (onUpdateContactInfo) onUpdateContactInfo(contactData);
    setSaveStatus('Contact information updated dynamically across site!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 font-body">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-[#E6E2D8] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#171717] text-white px-6 py-4 flex items-center justify-between border-b border-[#262626]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C9A227] text-[#171717] flex items-center justify-center font-black">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base tracking-wide text-[#C9A227] uppercase">Owner Admin Dashboard</h3>
              <p className="text-xs text-stone-300">AL-AQSHA Manpower Control Center</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#F7F4EC] border-b border-[#E6E2D8] px-6 flex flex-wrap gap-2 pt-3 font-heading">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2.5 rounded-t-xl font-bold text-xs uppercase transition-all flex items-center gap-2 ${
              activeTab === 'enquiries'
                ? 'bg-white text-[#171717] border-t-2 border-[#C9A227] shadow-sm'
                : 'text-stone-600 hover:text-[#171717] hover:bg-[#E6E2D8]/50'
            }`}
          >
            <FileText className="w-4 h-4 text-[#C9A227]" />
            Enquiries &amp; Messages ({enquiries.length})
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2.5 rounded-t-xl font-bold text-xs uppercase transition-all flex items-center gap-2 ${
              activeTab === 'jobs'
                ? 'bg-white text-[#171717] border-t-2 border-[#C9A227] shadow-sm'
                : 'text-stone-600 hover:text-[#171717] hover:bg-[#E6E2D8]/50'
            }`}
          >
            <Briefcase className="w-4 h-4 text-[#C9A227]" />
            Job Openings &amp; Applications
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2.5 rounded-t-xl font-bold text-xs uppercase transition-all flex items-center gap-2 ${
              activeTab === 'contact'
                ? 'bg-white text-[#171717] border-t-2 border-[#C9A227] shadow-sm'
                : 'text-stone-600 hover:text-[#171717] hover:bg-[#E6E2D8]/50'
            }`}
          >
            <Phone className="w-4 h-4 text-[#C9A227]" />
            Contact Info Settings
          </button>
        </div>

        {/* Status Toast */}
        {saveStatus && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {saveStatus}
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#F7F4EC]/50 font-body">

          {/* TAB 1: ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="text-lg font-heading font-black text-[#171717]">Consumer Enquiries &amp; Requests</h4>
                  <p className="text-xs text-stone-500">All submitted quotes, project details, and "Get In Touch" requests.</p>
                </div>
                <button
                  onClick={handleExportExcel}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white font-heading font-bold text-xs uppercase px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Enquiries in Excel (.CSV)
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-[#E6E2D8] overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-[#171717] text-[#C9A227] font-heading font-extrabold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Customer Name</th>
                      <th className="py-3 px-4">Contact Info</th>
                      <th className="py-3 px-4">Target Service</th>
                      <th className="py-3 px-4">Message / Requirements</th>
                      <th className="py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6E2D8]">
                    {enquiries.map((eq) => (
                      <tr key={eq.id} className="hover:bg-[#F7F4EC]">
                        <td className="py-3 px-4 font-bold text-[#171717]">{eq.fullName}</td>
                        <td className="py-3 px-4">
                          <div>{eq.email}</div>
                          <div className="text-stone-400 font-mono text-[11px]">{eq.phone}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded font-heading font-bold text-[10px] uppercase ${
                            eq.serviceRequired === 'Others' ? 'bg-purple-100 text-purple-700' : 'bg-[#C9A227]/20 text-[#171717]'
                          }`}>
                            {eq.serviceRequired || 'General'}
                          </span>
                        </td>
                        <td className="py-3 px-4 max-w-xs truncate text-stone-600">{eq.message}</td>
                        <td className="py-3 px-4 text-stone-400 text-[10px]">{eq.createdAt || 'Recent'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: JOBS & APPLICATIONS */}
          {activeTab === 'jobs' && (
            <div className="space-y-8">
              {/* Add New Job */}
              <div className="bg-white p-5 rounded-2xl border border-[#E6E2D8] shadow-sm">
                <h4 className="font-heading font-extrabold text-sm text-[#171717] mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#C9A227]" />
                  Post New Job Opening with Deadline
                </h4>
                <form onSubmit={handleAddJob} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Job Title (e.g. HSE Officer)"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    className="text-xs px-3 py-2 rounded-xl border border-[#E6E2D8] focus:outline-none focus:border-[#C9A227] text-[#171717]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Location (e.g. Dubai, UAE)"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    className="text-xs px-3 py-2 rounded-xl border border-[#E6E2D8] focus:outline-none focus:border-[#C9A227] text-[#171717]"
                  />
                  <input
                    type="text"
                    placeholder="Salary Package"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    className="text-xs px-3 py-2 rounded-xl border border-[#E6E2D8] focus:outline-none focus:border-[#C9A227] text-[#171717]"
                  />
                  <div>
                    <label className="block text-[10px] font-heading font-bold uppercase text-stone-500 mb-0.5">Application Deadline *</label>
                    <input
                      type="date"
                      required
                      value={newJob.deadline}
                      onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
                      className="w-full text-xs px-3 py-1.5 rounded-xl border border-[#E6E2D8] focus:outline-none focus:border-[#C9A227] text-[#171717]"
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-[#C9A227] hover:bg-[#B38F1F] text-[#171717] font-heading font-black text-xs uppercase py-2 rounded-xl shadow-sm cursor-pointer"
                    >
                      Publish Job Opening
                    </button>
                  </div>
                </form>
              </div>

              {/* Active Positions */}
              <div>
                <h4 className="font-heading font-extrabold text-sm text-[#171717] mb-3">Active Job Positions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {jobs.map((j) => (
                    <div key={j.id} className="bg-white p-4 rounded-2xl border border-[#E6E2D8] flex items-center justify-between shadow-sm">
                      <div>
                        <h5 className="font-heading font-bold text-xs text-[#171717]">{j.title}</h5>
                        <p className="text-[11px] text-stone-500">{j.location} • {j.salary}</p>
                        <p className="text-[10px] text-rose-600 font-bold mt-1">Deadline: {j.deadline || 'No expiry'}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteJob(j.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Job Opening"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submitted Applications with Resumes */}
              <div>
                <h4 className="font-heading font-extrabold text-sm text-[#171717] mb-3">Submitted Job Applications &amp; Resumes</h4>
                <div className="bg-white rounded-2xl border border-[#E6E2D8] overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs text-stone-700">
                    <thead className="bg-[#171717] text-[#C9A227] font-heading font-extrabold uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-4">Applicant</th>
                        <th className="py-2.5 px-4">Applied Job</th>
                        <th className="py-2.5 px-4">Experience</th>
                        <th className="py-2.5 px-4">Resume File</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6E2D8]">
                      {applications.map((app) => (
                        <tr key={app.id}>
                          <td className="py-2.5 px-4 font-bold text-[#171717]">{app.fullName}<br/><span className="text-[10px] text-stone-400 font-normal">{app.phone}</span></td>
                          <td className="py-2.5 px-4 text-[#C9A227] font-heading font-semibold">{app.jobTitle}</td>
                          <td className="py-2.5 px-4">{app.experience}</td>
                          <td className="py-2.5 px-4">
                            <a
                              href={`/uploads/resumes/${app.resumeFileName}`}
                              download
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#C9A227]/20 text-[#171717] border border-[#C9A227]/40 rounded-lg font-heading font-bold text-[10px] hover:bg-[#C9A227]/30"
                            >
                              <Download className="w-3 h-3" />
                              {app.resumeFileName || 'Resume.pdf'}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT INFO SETTINGS */}
          {activeTab === 'contact' && (
            <form onSubmit={handleSaveContactInfo} className="bg-white p-6 rounded-2xl border border-[#E6E2D8] shadow-sm space-y-4 max-w-2xl">
              <h4 className="font-heading font-extrabold text-sm text-[#171717] mb-2">Edit Dynamic Contact Information</h4>
              <p className="text-xs text-stone-500 mb-4">Updates will immediately apply to the Navbar, Contact Page, and Footer.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-heading font-bold text-[#171717] uppercase mb-1">Primary Phone</label>
                  <input
                    type="text"
                    value={contactData.phonePrimary}
                    onChange={(e) => setContactData({ ...contactData, phonePrimary: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E6E2D8] focus:outline-none focus:border-[#C9A227] text-[#171717]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-heading font-bold text-[#171717] uppercase mb-1">Secondary Phone</label>
                  <input
                    type="text"
                    value={contactData.phoneSecondary}
                    onChange={(e) => setContactData({ ...contactData, phoneSecondary: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E6E2D8] focus:outline-none focus:border-[#C9A227] text-[#171717]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-heading font-bold text-[#171717] uppercase mb-1">Primary Email</label>
                  <input
                    type="email"
                    value={contactData.emailPrimary}
                    onChange={(e) => setContactData({ ...contactData, emailPrimary: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E6E2D8] focus:outline-none focus:border-[#C9A227] text-[#171717]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-heading font-bold text-[#171717] uppercase mb-1">Secondary Email</label>
                  <input
                    type="email"
                    value={contactData.emailSecondary}
                    onChange={(e) => setContactData({ ...contactData, emailSecondary: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E6E2D8] focus:outline-none focus:border-[#C9A227] text-[#171717]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-heading font-bold text-[#171717] uppercase mb-1">Office Address</label>
                <textarea
                  rows={2}
                  value={contactData.address}
                  onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-[#E6E2D8] focus:outline-none focus:border-[#C9A227] text-[#171717]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#C9A227] hover:bg-[#B38F1F] text-[#171717] font-heading font-black text-xs uppercase px-6 py-2.5 rounded-xl shadow-sm cursor-pointer"
              >
                Save &amp; Update Contact Info
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
