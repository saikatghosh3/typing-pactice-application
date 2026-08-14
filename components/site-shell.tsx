'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  { href: '/product', label: 'Product' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/integrations', label: 'Integrations' },
  { href: '/exam', label: 'Exam' },
  { href: '/careers', label: 'Careers' },
  { href: '/customers', label: 'Customers' },
  { href: '/resources', label: 'Resources' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
      <Link href="/" className="flex items-center gap-3 font-mono text-sm font-bold tracking-[0.2em]"><span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">T</span> typely</Link>
      <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">{links.map((link) => <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">{link.label}</Link>)}<Link href="/practice" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground">Practice <ArrowUpRight data-icon="inline-end" /></Link></nav>
      <button aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-full border border-border lg:hidden">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="flex flex-col gap-1 border-t border-border px-5 py-4 lg:hidden">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm hover:bg-muted">{link.label}</Link>)}<Link href="/practice" onClick={() => setOpen(false)} className="mt-2 rounded-lg bg-primary px-3 py-3 text-center text-sm font-medium text-primary-foreground">Open practice</Link></motion.nav>}
  </header>
}

export function SiteFooter() {
  return <footer className="border-t border-border"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8"><div><span className="font-mono font-bold tracking-[0.18em] text-foreground">TYPELY</span><p className="mt-2 max-w-xs text-xs leading-5">A calmer way to build the keyboard muscle memory behind your best work.</p></div><div className="flex flex-wrap gap-x-5 gap-y-2">{links.map((link) => <Link key={link.href} href={link.href} className="hover:text-foreground">{link.label}</Link>)}</div><span className="text-xs">© 2026 Typely</span></div></footer>
}

export function PageFrame({ children }: { children: React.ReactNode }) { return <><SiteHeader /><main>{children}</main><SiteFooter /></> }

export function PageHero({ eyebrow, title, description, action = 'Start practicing' }: { eyebrow: string; title: React.ReactNode; description: string; action?: string }) {
  return <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24"><div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end"><div><motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 font-mono text-xs uppercase tracking-[.2em] text-primary">{eyebrow}</motion.p><motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .05 }} className="max-w-4xl text-balance text-5xl font-semibold leading-[.95] tracking-[-.06em] md:text-8xl">{title}</motion.h1></div><div><p className="max-w-md text-pretty leading-7 text-muted-foreground">{description}</p><Link href="/practice" className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">{action} <ArrowUpRight className="ml-2" data-icon="inline-end" /></Link></div></div></section>
}

export function SectionLabel({ children }: { children: React.ReactNode }) { return <p className="mb-3 font-mono text-xs uppercase tracking-[.18em] text-muted-foreground">{children}</p> }

export function FeatureCard({ number, title, text }: { number: string; title: string; text: string }) { return <article className="rounded-2xl border border-border bg-card p-6"><div className="mb-12 flex items-center justify-between"><span className="font-mono text-xs text-primary">{number}</span><span className="size-2 rounded-full bg-primary" /></div><h3 className="mb-3 text-xl font-medium tracking-tight">{title}</h3><p className="text-sm leading-6 text-muted-foreground">{text}</p></article> }

export function StatStrip({ items }: { items: Array<{ value: string; label: string }> }) { return <div className="grid border-y border-border sm:grid-cols-3">{items.map((item) => <div key={item.label} className="border-b border-border px-5 py-6 last:border-0 sm:border-b-0 sm:border-r sm:last:border-0 md:px-8"><div className="font-mono text-3xl tracking-tight">{item.value}</div><div className="mt-1 text-xs text-muted-foreground">{item.label}</div></div>)}</div> }
