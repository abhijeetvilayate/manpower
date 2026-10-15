/**
 * Application-wide constants for AL-AQSHA MANPOWER CONSULTANCY
 */

export const COMPANY_INFO = {
  name: 'AL-AQSHA',
  tagline: 'Manpower Supply & Staffing',
  fullName: 'AL-AQSHA MANPOWER CONSULTANCY',
  email: 'info@alaqsha.com',
  phone: '+971 4 000 0000',
  address: 'Business Bay, Dubai, United Arab Emirates',
  workingHours: 'Mon – Sat: 8:00 AM – 6:00 PM',
  regionsServed: 'Serving UAE, Saudi Arabia, Qatar, Oman & Bahrain',
};

export const HIGHLIGHTS_METRICS = [
  { value: '15,000+', label: 'Deployed Personnel' },
  { value: '98.6%', label: 'Retention Rate' },
  { value: '100%', label: 'HSE & Labor Compliant' },
  { value: '< 48 Hrs', label: 'Emergency Replacement' },
];

export const FALLBACK_SERVICES = [
  {
    id: 1,
    title: 'Civil & Construction Workforce',
    slug: 'civil-construction-workforce',
    description:
      'Masons, steel fixers, carpenters, scaffolders, and certified heavy equipment operators.',
    imageUrl:
      'https://images.unsplash.com/photo-1541888946425-d0fbb18f1345?q=80&w=800&auto=format&fit=crop',
    displayOrder: 1,
  },
  {
    id: 2,
    title: 'Mechanical & MEP Specialists',
    slug: 'mechanical-mep-specialists',
    description:
      'Certified 6G welders, pipe fitters, duct men, HVAC technicians, and plumbers.',
    imageUrl:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
    displayOrder: 2,
  },
  {
    id: 3,
    title: 'Electrical & Instrumentation',
    slug: 'electrical-instrumentation',
    description:
      'Industrial electricians, cable jointers, panel wiremen, and instrumentation techs.',
    imageUrl:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
    displayOrder: 3,
  },
  {
    id: 4,
    title: 'Oil & Gas Field Crew',
    slug: 'oil-gas-field-crew',
    description:
      'Riggers, offshore technicians, QA/QC inspectors, and safety/HSE officers.',
    imageUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    displayOrder: 4,
  },
  {
    id: 5,
    title: 'Logistics, Warehousing & Drivers',
    slug: 'logistics-warehousing-drivers',
    description:
      'Heavy trailer drivers, forklift operators, storekeepers, and supply chain coordinators.',
    imageUrl:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
    displayOrder: 5,
  },
  {
    id: 6,
    title: 'Hospitality & Facility Maintenance',
    slug: 'hospitality-facility-maintenance',
    description:
      'Janitorial staff, catering crews, security guards, and ongoing facility management teams.',
    imageUrl:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop',
    displayOrder: 6,
  },
];

export const FALLBACK_INDUSTRIES = [
  { id: 1, name: 'Oil & Gas', iconClass: 'bi-droplet-half' },
  { id: 2, name: 'Infrastructure & Real Estate', iconClass: 'bi-building' },
  { id: 3, name: 'Power & Energy Plants', iconClass: 'bi-lightning-charge' },
  { id: 4, name: 'Manufacturing & Plants', iconClass: 'bi-gear-wide-connected' },
  { id: 5, name: 'Logistics & Ports', iconClass: 'bi-truck' },
  { id: 6, name: 'Hospitality & Healthcare', iconClass: 'bi-hospital' },
];

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Why Al-Aqsha', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
];
