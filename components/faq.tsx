'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  { question: 'Do I need to create an account?', answer: 'No. Typely works entirely in your browser. Your practice history is stored locally on your device, so there is no sign-up, password, or account to manage.' },
  { question: 'Where is my practice data stored?', answer: 'All practice records, best scores, and character analytics are saved in your browser using localStorage. They never leave your device unless you choose to share them.' },
  { question: 'What do WPM and accuracy mean?', answer: 'WPM is your words per minute — the amount of clean text you type in sixty seconds. Accuracy is the share of keystrokes you hit correctly during a session. Together they describe your pace and your control.' },
  { question: 'How often should I practice?', answer: 'Short and consistent beats long and rare. Ten focused minutes a day build more durable speed and accuracy than one marathon session each week.' },
  { question: 'Can I use Typely on my phone?', answer: 'Typely is built to work on any screen. The practice studio and exam room are fully responsive, though a physical keyboard gives the best experience.' },
  { question: 'Is Typely free?', answer: 'The complete core experience — all practice paths, lessons, the exam room, and your local progress — is free. Nothing is gated behind a paywall.' },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24"><div className="mb-10 grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><p className="mb-3 font-mono text-xs uppercase tracking-[.18em] text-muted-foreground">Questions / Answered</p><h2 className="text-4xl font-semibold tracking-[-.04em] md:text-6xl">Everything you might be <span className="text-primary">wondering.</span></h2></div><p className="max-w-md leading-7 text-muted-foreground lg:justify-self-end">Quick, honest answers about how Typely works, where your data lives, and how to get the most from every session.</p></div><div className="grid gap-3">{faqs.map((faq, index) => { const isOpen = open === index; return <div key={faq.question} className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-colors duration-300 hover:border-primary/50"><div aria-hidden className="card-glow" /><button onClick={() => setOpen(isOpen ? null : index)} aria-expanded={isOpen} className="relative flex w-full items-center justify-between gap-4 p-6 text-left md:p-7"><span className="flex items-center gap-4"><span className="chip hidden size-9 shrink-0 font-mono text-xs sm:grid">0{index + 1}</span><span className="font-medium md:text-lg">{faq.question}</span></span><motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: .25 }} className={`grid size-9 shrink-0 place-items-center rounded-full border transition-colors ${isOpen ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground'}`}><Plus className="size-4" /></motion.span></button><AnimatePresence initial={false}>{isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3 }} className="relative overflow-hidden"><p className="px-6 pb-6 text-sm leading-7 text-muted-foreground sm:pl-24 md:px-7 md:pb-7 md:pl-24">{faq.answer}</p></motion.div>}</AnimatePresence></div> })}</div><p className="mt-8 text-center text-sm text-muted-foreground">Still curious? Write to <a href="mailto:hello@typely.co" className="nav-link font-medium">hello@typely.co</a></p></section>
}
