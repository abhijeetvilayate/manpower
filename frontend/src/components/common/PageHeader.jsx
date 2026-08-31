import React from 'react';

export default function PageHeader({ title, subtitle, breadcrumbs = [] }) {
  return (
    <section className="bg-[#0B1B3D] text-white py-12 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              {subtitle}
            </p>
          )}
        </div>
        
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>/</span>}
                {crumb.onClick ? (
                  <button
                    onClick={crumb.onClick}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className="text-amber-400">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
