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
        <span className={`font-bold uppercase tracking-widest text-xs block mb-2 ${dark ? 'text-amber-400' : 'text-amber-500'}`}>
          {badge}
        </span>
      )}
      {title && (
        <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={`text-xs sm:text-sm mt-3 leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
