'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Keyboard } from 'lucide-react'
import { PageFrame, SectionLabel } from '@/components/site-shell'

const keys = ['4', '0', '4']
const floaters = [{ x: '12%', y: '18%', delay: 0, size: 'text-4xl' }, { x: '82%', y: '24%', delay: .4, size: 'text-5xl' }, { x: '18%', y: '72%', delay: .8, size: 'text-3xl' }, { x: '78%', y: '66%', delay: 1.2, size: 'text-4xl' }]

export default function NotFound() {
  return <PageFrame>
    <section className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-20 text-center md:px-8">
      {floaters.map((item, index) => <motion.span key={index} aria-hidden initial={{ opacity: 0, y: 20, rotate: -8 }} animate={{ opacity: .25, y: 0, rotate: 0 }} transition={{ duration: .8, delay: item.delay }} style={{ left: item.x, top: item.y }} className={`absolute hidden font-mono text-foreground/60 md:block ${item.size}`}>{index % 2 ? '}' : '{'}</motion.span>)}
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
        <SectionLabel>404 / Lost keystroke</SectionLabel>
        <div className="flex items-center justify-center gap-2 md:gap-3">{keys.map((key, index) => <motion.span key={index} initial={{ opacity: 0, y: 20, rotate: index === 1 ? -6 : 6 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: .5, delay: .1 + index * .12 }} className={`grid size-20 place-items-center rounded-2xl font-mono text-4xl font-bold tracking-tight md:size-28 md:text-6xl ${index === 1 ? 'bg-primary text-primary-foreground shadow-[0_24px_60px_-24px_color-mix(in_oklch,var(--primary)_55%,transparent)]' : 'border border-border bg-card'}`}>{key}</motion.span>)}</div>
        <h1 className="mt-8 text-3xl font-semibold tracking-tight md:text-5xl">This key doesn't land here.</h1>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-7 text-muted-foreground">The page you're looking for may have moved or never existed. Take a breath, and head back to something that works.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-foreground"><ArrowLeft className="size-4" />Back home</Link><Link href="/practice" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Open practice <ArrowUpRight className="size-4" /></Link></div>
        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground"><Keyboard className="size-4 text-primary" />Everything you typed still counts.</div>
      </motion.div>
    </section>
  </PageFrame>
}
