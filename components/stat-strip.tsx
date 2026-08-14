'use client'

import { animate, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export function StatStrip({ items }: { items: Array<{ value: string; label: string }> }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return <div ref={ref} className="grid border-y border-border sm:grid-cols-3">{items.map((item, index) => <Counter key={item.label} value={item.value} label={item.label} index={index} start={inView} />)}</div>
}

function Counter({ value, label, index, start }: { value: string; label: string; index: number; start: boolean }) {
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : ''
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!start) return
    const controls = animate(0, target, { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.15, onUpdate: (value) => setDisplay(Math.round(value)) })
    return () => controls.stop()
  }, [start, target, index])

  return <motion.div initial={{ opacity: 0, y: 18 }} animate={start ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.12, duration: 0.5 }} className="group relative overflow-hidden border-b border-border px-5 py-8 last:border-0 sm:border-b-0 sm:border-r sm:last:border-0 md:px-8">
    <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <div className="relative font-mono text-4xl tracking-tight text-foreground md:text-5xl">{match ? <><span className="tabular-nums">{display}</span>{suffix}</> : value}</div>
    <div className="relative mt-2 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
  </motion.div>
}
