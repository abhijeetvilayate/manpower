import React from 'react';
import { UserCheck, Clock, CircleDollarSign, ShieldCheck } from 'lucide-react';

export default function FeatureHighlights() {
  return (
    <div className="max-w-6xl mx-auto px-4 -mt-14 relative z-20 w-full mb-16">
      <div className="bg-white rounded-xl shadow-xl p-4 sm:p-8 border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
        <div className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-slate-50 transition-all duration-300 hover:scale-105 group cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-3 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
            <UserCheck className="w-6 h-6 stroke-[1.75]" />
          </div>
          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Quality Workforce</h4>
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-slate-50 transition-all duration-300 hover:scale-105 group cursor-pointer sm:border-l sm:border-slate-100">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-3 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
            <Clock className="w-6 h-6 stroke-[1.75]" />
          </div>
          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Timely Delivery</h4>
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-slate-50 transition-all duration-300 hover:scale-105 group cursor-pointer sm:border-l sm:border-slate-100">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-3 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
            <CircleDollarSign className="w-6 h-6 stroke-[1.75]" />
          </div>
          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Cost Effective</h4>
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-slate-50 transition-all duration-300 hover:scale-105 group cursor-pointer sm:border-l sm:border-slate-100">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-3 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
            <ShieldCheck className="w-6 h-6 stroke-[1.75]" />
          </div>
          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">100% Client Satisfaction</h4>
        </div>
      </div>
    </div>
  );
}