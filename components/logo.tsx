'use client'

export function Logo({ className = 'size-9' }: { className?: string }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
        <rect x="2" y="2" width="44" height="44" rx="13" fill="var(--primary)" />
        <rect x="2" y="2" width="44" height="44" rx="13" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
        <g fill="#fff">
          <rect x="11" y="11" width="8" height="8" rx="2.4" />
          <rect x="20" y="11" width="8" height="8" rx="2.4" />
          <rect x="29" y="11" width="8" height="8" rx="2.4" />
          <rect x="20" y="20" width="8" height="8" rx="2.4" />
          <rect x="20" y="29" width="8" height="8" rx="2.4" />
        </g>
      </svg>
      <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-[17px] font-bold leading-none tracking-tight text-transparent">typely</span>
    </span>
  )
}
