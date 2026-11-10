// Inline SVG icons used across the page. All are decorative (aria-hidden).

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, 'aria-hidden': true };
const HEART = 'M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.2 0 3.7 1.2 5.2 3 1.5-1.8 3-3 5.2-3C21 4.5 23.1 8.4 21.6 11.8 19.5 16.4 12 21 12 21z';

export const ArrowIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" />
  </svg>
);

export const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
);

export const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}><path d="M4 10.5L12 4l8 6.5V19a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z" /></svg>
);

export const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}><rect x="6" y="2.5" width="12" height="19" rx="3" /><path d="M10.5 18.5h3" /></svg>
);

export const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
    <circle cx="7" cy="7" r="2.5" /><circle cx="17" cy="7" r="2.5" /><circle cx="7" cy="17" r="2.5" /><circle cx="17" cy="17" r="2.5" />
  </svg>
);

export const PeopleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
    <circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5" /><circle cx="17" cy="9" r="2.5" /><path d="M17 14.5c2.4 0 4 1.5 4.5 4" />
  </svg>
);

export const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}><path d="M12 5v14M5 12h14" /></svg>
);

export const HeartIcon = ({ color = 'currentColor' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d={HEART} fill={color} /></svg>
);

export const RepostIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}><rect x="3" y="7" width="12" height="12" rx="3" /><path d="M9 3h9a3 3 0 0 1 3 3v9" /></svg>
);

export const PlusCircleIcon = ({ className }) => (
  <svg className={className} width="22" height="22" viewBox="0 0 24 24" {...stroke} strokeWidth="2">
    <circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" />
  </svg>
);

export const CheckCircleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...stroke} strokeWidth="2">
    <circle cx="12" cy="12" r="9" /><path d="M8.5 12.2l2.4 2.4 4.6-4.8" />
  </svg>
);

export const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <path d="M2 7.2l3 3 7-7" stroke="#B9E8CC" strokeWidth="1.8" fill="none" />
  </svg>
);
