'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const letters = ['T', 'Y', 'P', 'E', 'L', 'Y']

export function Loader() {
  const [typed, setTyped] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    if (typed >= letters.length) {
      const t = setTimeout(() => setDone(true), 550)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setTyped((n) => n + 1), 190)
    return () => clearTimeout(t)
  }, [typed])

  useEffect(() => {
    if (done) document.body.style.overflow = ''
  }, [done])

  return <AnimatePresence>{!done && <motion.div exit={{ opacity: 0 }} transition={{ duration: .5, ease: 'easeInOut' }} className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-background">
    <motion.div exit={{ y: -14, opacity: 0 }} transition={{ duration: .45 }} className="flex w-full max-w-sm flex-col items-center px-4 text-center sm:px-6">
      <div className="flex w-full items-end justify-center gap-1 sm:gap-1.5 md:gap-2">{letters.map((letter, index) => { const active = index < typed; return <motion.span key={index} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: active ? 4 : 0 }} transition={{ duration: .22, delay: active ? 0 : index * 0.05 }} className={`grid size-9 place-items-center rounded-xl border font-mono text-base font-bold transition-colors duration-200 sm:size-11 sm:text-lg md:size-12 ${active ? 'border-primary bg-primary text-primary-foreground shadow-[0_14px_30px_-12px_color-mix(in_oklch,var(--primary)_60%,transparent)]' : 'border-border bg-card text-muted-foreground'}`}>{letter}</motion.span> })}</div>
      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: typed === letters.length ? 1 : 0, y: typed === letters.length ? 0 : 8 }} transition={{ duration: .4 }} className="mt-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl md:text-4xl">typely</motion.p>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: typed === letters.length ? 1 : 0 }} transition={{ duration: .5, delay: .15 }} className="mt-3 font-mono text-[10px] uppercase tracking-[.3em] text-muted-foreground sm:text-[11px]">Type with intention.</motion.p>
    </motion.div>
    <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.9, ease: 'easeInOut' }} className="absolute bottom-0 left-0 h-1 w-full origin-left bg-primary" />
  </motion.div>}</AnimatePresence>
}
