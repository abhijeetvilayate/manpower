import React from 'react';
import { Search, Briefcase, FileText, UserCheck } from 'lucide-react';

export default function FeatureHighlights({ onOpenEnquiry }) {
  const highlightCards = [
    {
      id: 'executive-search',
      title: 'Executive Search',
      description: 'C-suite & senior leadership acquisition across global industrial markets.',
      icon: Search
    },
    {
      id: 'project-manpower',
      title: 'Project Manpower',
      description: 'Scalable turn-key workforce mobilization for infrastructure & energy megaprojects.',
      icon: Briefcase
    },
    {
      id: 'contract-staffing',
      title: 'Contract Staffing',
      description: 'Flexible short-term and long-term certified technical labor contracting.',
      icon: FileText
    },
    {
      id: 'technical-staffing',
      title: 'Quality Verification',
      description: '100% skill-tested, safety-trained, and compliance-vetted workforce.',
      icon: UserCheck
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-30 w-full mb-16 font-sans-modern">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlightCards.map((card, idx) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onOpenEnquiry && onOpenEnquiry()}
              className="p-6 cursor-pointer flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2.5 animate-scale-in"
              style={{
                background: 'linear-gradient(145deg, #FFFFFF 0%, #FAF8F3 60%, #F3ECDC 100%)',
                border: '1.5px solid #C5A059',
                borderRadius: '14px',
                boxShadow: '0 14px 35px -5px rgba(18, 20, 23, 0.22), 0 6px 16px rgba(197, 160, 89, 0.18)',
                position: 'relative',
                zIndex: 30,
                animationDelay: `${idx * 100}ms`
              }}
            >
              {/* Top Accent Gold Bar on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E6C575] via-[#C5A059] to-[#9E7D3B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />

              {/* Card Header: Circular gold badge holding vector line-art icon left-aligned next to card title */}
              <div className="flex items-center gap-3.5 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-[#C5A059] group-hover:bg-gradient-to-r group-hover:from-[#E6C575] group-hover:to-[#C5A059] group-hover:text-[#121417] group-hover:rotate-12 transition-all duration-300 shadow-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(230, 197, 117, 0.4) 0%, rgba(197, 160, 89, 0.2) 100%)',
                    border: '1px solid rgba(197, 160, 89, 0.5)'
                  }}
                >
                  <IconComponent className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3
                  className="font-bold text-[#121417] text-base lg:text-lg tracking-tight group-hover:text-[#C5A059] transition-colors leading-snug"
                  style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
                >
                  {card.title}
                </h3>
              </div>

              {/* Body Text */}
              <p
                className="text-[#121417] text-xs sm:text-sm leading-relaxed font-medium opacity-90"
                style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
              >
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

