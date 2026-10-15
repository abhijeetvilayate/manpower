import React from 'react';

export default function PageHeader({ title, subtitle, breadcrumbs = [] }) {
  return (
    <section className="bg-[#121417] text-white py-14 border-b border-[#C5A059]/20 relative overflow-hidden" style={{ backgroundColor: '#121417' }}>
      {/* Subtle gold glare background element */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A059]/5 blur-3xl rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black font-serif-luxury text-white tracking-tight uppercase" style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-[#D1D5DB] text-sm sm:text-base mt-2 font-sans max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D1D5DB] bg-[#141518] px-4 py-2 rounded-full border border-[#C5A059]/30 shadow-md">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-[#C5A059]">/</span>}
                {crumb.onClick ? (
                  <button
                    onClick={crumb.onClick}
                    className="hover:text-[#E6C575] text-[#D1D5DB] transition-colors cursor-pointer"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className="text-[#C5A059] font-extrabold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

