'use client'

import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ScrollToTop() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }) }, [pathname])

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return <AnimatePresence>{visible && <motion.button initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .8 }} transition={{ duration: .18 }} onClick={scrollTop} aria-label="Scroll to top" className="fixed bottom-6 right-6 z-50 grid size-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_16px_40px_-16px_color-mix(in_oklch,var(--primary)_60%,transparent)] transition-transform hover:scale-110"><ArrowUp className="size-5" /></motion.button>}</AnimatePresence>
}
