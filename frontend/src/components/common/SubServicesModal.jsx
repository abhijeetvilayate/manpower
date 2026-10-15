import React, { useState } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Building2,
  Flame,
  Factory,
  Wrench,
  Cog,
  Hotel,
  Stethoscope,
  Truck,
  ShoppingBag,
  ShieldCheck,
  Sprout,
  Anchor,
  Briefcase,
  Laptop,
  Zap,
  ArrowRight
} from 'lucide-react';

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

export default function SubServicesModal({
  isOpen,
  onClose,
  service,
  onSelectSubService
}) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen || !service) return null;

  const IconComponent = ICON_MAP[service.iconName] || Building2;
  const subServices = service.subServices || [];

  const filteredSubServices = subServices.filter((sub) =>
    sub.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubServiceClick = (subServiceTitle) => {
    if (onSelectSubService) {
      onSelectSubService(service, subServiceTitle);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-slate-200 flex flex-col relative animate-scaleUp">
        
        {/* Header */}
        <div className="bg-[#171717] text-white px-6 sm:px-8 py-6 relative border-b border-[#262626]">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#C9A227]/20 border border-[#C9A227]/40 text-[#C9A227] flex items-center justify-center flex-shrink-0 shadow-inner">
              <IconComponent className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[#C9A227] font-extrabold uppercase tracking-widest text-[11px] block font-heading">
                SPECIALIZED MANPOWER CATEGORY
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-heading">
                {service.title}
              </h2>
            </div>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm mt-3 max-w-2xl leading-relaxed font-body">
            {service.description}
          </p>

          {/* Search bar inside header */}
          <div className="mt-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search sub-services in ${service.title}...`}
              className="w-full pl-10 pr-4 py-2.5 bg-[#262626] border border-[#383838] rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-all font-body"
            />
          </div>
        </div>

        {/* Sub-Services List Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-[#F7F4EC] font-body">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
              Select a Trade / Sub-Service
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">
              Click to pre-fill inquiry form
            </span>
          </div>

          {filteredSubServices.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No sub-services found</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for a different keyword or select the general category request below.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredSubServices.map((subTitle, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSubServiceClick(subTitle)}
                  className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-amber-500 hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-amber-700 transition-colors truncate">
                      {subTitle}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            Don't see your exact role? We supply custom trades across all GCC sectors.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors w-full sm:w-auto cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSubServiceClick('General Requirement')}
              className="px-6 py-2.5 rounded-xl bg-[#C9A227] hover:bg-[#B38F1F] active:bg-[#997A1A] text-[#171717] text-xs font-heading font-black uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
            >
              Request Entire Category <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
