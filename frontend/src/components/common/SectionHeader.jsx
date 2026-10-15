import React from 'react';

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  dark = false
}) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`mb-12 ${alignClass} ${align === 'center' ? 'max-w-3xl mx-auto' : ''}`}>
      {badge && (
        <span className="font-heading font-extrabold uppercase tracking-widest text-xs block mb-2 text-[#C9A227]">
          {badge}
        </span>
      )}
      {title && (
        <h2 className={`text-2xl sm:text-4xl font-heading font-extrabold tracking-tight ${dark ? 'text-white' : 'text-[#171717]'}`}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={`text-xs sm:text-sm mt-3 leading-relaxed font-body ${dark ? 'text-stone-300' : 'text-stone-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
