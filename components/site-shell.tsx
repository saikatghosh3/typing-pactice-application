'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Logo } from '@/components/logo'

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
      <Link href="/" className="flex items-center gap-3"><Logo className="size-9" /></Link>
      <nav className="hidden items-center gap-6 text-sm lg:flex">{links.map((link) => <Link key={link.href} href={link.href} className="nav-link">{link.label}</Link>)}<Link href="/practice" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground transition-transform hover:scale-105">Practice <ArrowUpRight data-icon="inline-end" /></Link></nav>
      <button aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-full border border-border lg:hidden">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="flex flex-col gap-1 border-t border-border px-5 py-4 lg:hidden">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm hover:bg-muted">{link.label}</Link>)}<Link href="/practice" onClick={() => setOpen(false)} className="mt-2 rounded-lg bg-primary px-3 py-3 text-center text-sm font-medium text-primary-foreground">Open practice</Link></motion.nav>}
  </header>
}

export function SiteFooter() {
  return <footer className="border-t border-border bg-muted/30"><div className="mx-auto max-w-7xl px-5 py-14 md:px-8"><div className="grid gap-10 md:grid-cols-[1.2fr_.8fr_.8fr_1fr]"><div><Link href="/" className="flex w-fit items-center gap-3"><Logo className="size-9" /></Link><p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">A calmer way to build the keyboard muscle memory behind your best work.</p><Link href="/practice" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105">Open practice <ArrowUpRight className="size-4" /></Link></div><div><p className="mb-4 font-mono text-xs uppercase tracking-[.18em] text-muted-foreground">Explore</p><nav className="flex flex-col items-start gap-3 text-sm">{links.map((link) => <Link key={link.href} href={link.href} className="nav-link">{link.label}</Link>)}</nav></div><div><p className="mb-4 font-mono text-xs uppercase tracking-[.18em] text-muted-foreground">Legal</p><nav className="flex flex-col items-start gap-3 text-sm"><Link href="/privacy" className="nav-link">Privacy Policy</Link><Link href="/terms" className="nav-link">Terms & Conditions</Link></nav></div><div className="rounded-3xl border border-border bg-background p-6"><p className="mb-3 font-mono text-xs uppercase tracking-[.18em] text-muted-foreground">Get started</p><h3 className="text-lg font-medium tracking-tight">Give your next ten minutes a job.</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Pick a lesson, type with focus, and watch the momentum build.</p><Link href="/exam" className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-foreground">Take the exam <ArrowUpRight className="size-4" /></Link></div></div><div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span className="font-mono tracking-widest">© 2026 TYPELY</span><span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-primary" />Practice with intention.</span></div></div></footer>
}

export function PageFrame({ children }: { children: React.ReactNode }) { return <><SiteHeader /><main>{children}</main><SiteFooter /></> }

export function PageHero({ eyebrow, title, description, action = 'Start practicing' }: { eyebrow: string; title: React.ReactNode; description: string; action?: string }) {
  return <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24"><div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end"><div><motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 font-mono text-xs uppercase tracking-[.2em] text-primary">{eyebrow}</motion.p><motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .05 }} className="max-w-4xl text-balance text-5xl font-semibold leading-[.95] tracking-[-.06em] md:text-8xl">{title}</motion.h1></div><div><p className="max-w-md text-pretty leading-7 text-muted-foreground">{description}</p><Link href="/practice" className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">{action} <ArrowUpRight className="ml-2" data-icon="inline-end" /></Link></div></div></section>
}

export function SectionLabel({ children }: { children: React.ReactNode }) { return <p className="mb-3 font-mono text-xs uppercase tracking-[.18em] text-muted-foreground">{children}</p> }

export function FeatureCard({ number, title, text }: { number: string; title: string; text: string }) { return <article className="card p-6"><div aria-hidden className="card-glow" /><div className="relative mb-12 flex items-center justify-between"><span className="chip px-3 py-1 font-mono text-xs">{number}</span><span className="size-2 rounded-full bg-primary transition-transform duration-500 group-hover:scale-150" /></div><h3 className="relative mb-3 text-xl font-medium tracking-tight">{title}</h3><p className="relative text-sm leading-6 text-muted-foreground">{text}</p></article> }
