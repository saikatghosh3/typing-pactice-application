'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Gauge, Pause, Play, RotateCcw, Timer, X, Zap } from 'lucide-react'
import Link from 'next/link'
import sentences from '@/data/typing_sentences.json'

const LIMIT = 60
const SENTENCE_COUNT = 8

const shuffle = <T,>(list: T[], seed: number): T[] => {
  const copy = [...list]
  let s = seed || 1
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 16807) % 2147483647
    const j = Math.floor((s / 2147483647) * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function TypingTest() {
  const [attempt, setAttempt] = useState(0)
  const passage = useMemo(() => shuffle(sentences, attempt).slice(0, SENTENCE_COUNT).join(' '), [attempt])
  const [phase, setPhase] = useState<'idle' | 'active' | 'paused' | 'done'>('idle')
  const [dismissed, setDismissed] = useState(false)
  const [input, setInput] = useState('')
  const [timeLeft, setTimeLeft] = useState(LIMIT)
  const [elapsed, setElapsed] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const startedAt = useRef(0)
  const pausedAt = useRef(0)
  const finishedRef = useRef(false)

  const finished = phase === 'done'
  const totalTyped = correct + incorrect
  const accuracy = totalTyped ? Math.round((correct / totalTyped) * 100) : 100
  const liveElapsed = finished ? elapsed : LIMIT - timeLeft
  const liveWpm = liveElapsed > 0 ? Math.round(correct / 5 / (liveElapsed / 60)) : 0
  const finalWpm = Math.round(correct / 5 / Math.max(0.5, elapsed / 60))
  const typingProgress = Math.round((input.length / passage.length) * 100)
  const barWidth = Math.round((timeLeft / LIMIT) * 100)

  const finish = () => {
    if (finishedRef.current) return
    finishedRef.current = true
    setElapsed(Math.min(LIMIT, (Date.now() - startedAt.current) / 1000))
    setPhase('done')
    setDismissed(false)
  }

  const start = () => {
    if (phase === 'paused') startedAt.current += Date.now() - pausedAt.current
    else if (phase === 'idle') startedAt.current = Date.now()
    setPhase('active')
    inputRef.current?.focus()
  }

  const pause = () => {
    if (phase !== 'active') return
    pausedAt.current = Date.now()
    setPhase('paused')
  }

  const retry = () => {
    finishedRef.current = false
    setInput('')
    setCorrect(0)
    setIncorrect(0)
    setTimeLeft(LIMIT)
    setElapsed(0)
    setPhase('idle')
    setDismissed(false)
    setAttempt((n) => n + 1)
    inputRef.current?.focus()
  }

  useEffect(() => {
    if (phase !== 'active') return
    const id = window.setInterval(() => {
      const remaining = Math.max(0, LIMIT - Math.floor((Date.now() - startedAt.current) / 1000))
      setTimeLeft(remaining)
      if (remaining <= 0) finish()
    }, 250)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  useEffect(() => {
    if (phase === 'active') inputRef.current?.focus()
  }, [phase])

  const onChange = (value: string) => {
    if (phase !== 'active' || finished) return
    const idx = value.length - 1
    if (value.length > input.length && idx >= 0) {
      if (value[idx] === passage[idx]) setCorrect((n) => n + 1)
      else setIncorrect((n) => n + 1)
    }
    setInput(value)
    if (value.length >= passage.length) finish()
  }

  return <>
    <div className="relative overflow-hidden rounded-3xl border border-border bg-background p-5 shadow-xl md:p-8">
      <div aria-hidden className="card-glow" />
      <div className="relative mb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-2.5 sm:px-5 sm:py-3">
            <Timer className="size-5 text-primary" />
            <span className={`font-mono text-2xl font-semibold tabular-nums sm:text-3xl ${phase === 'paused' ? 'text-muted-foreground' : timeLeft <= 10 && phase === 'active' ? 'text-destructive' : ''}`}>{timeLeft}s</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-xs tabular-nums sm:px-4 sm:py-2 sm:text-sm"><Zap className="size-4 text-primary" />{liveWpm}<span className="hidden sm:inline">WPM</span></span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-xs tabular-nums sm:px-4 sm:py-2 sm:text-sm"><Gauge className="size-4 text-primary" />{accuracy}%</span>
          </div>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <motion.div className="h-full rounded-full bg-primary" animate={{ width: `${barWidth}%` }} transition={{ duration: 0.4, ease: 'linear' }} />
        </div>
      </div>

      <div onClick={() => inputRef.current?.focus()} className="relative cursor-text rounded-2xl border border-border bg-card p-4 md:p-8">
        <input ref={inputRef} value={input} onChange={(e) => onChange(e.target.value)} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} className="absolute inset-0 z-10 h-full w-full cursor-text opacity-0" aria-label="Type the sentence shown" />
        <div className="relative max-h-52 min-h-36 overflow-y-auto pr-2 font-mono text-lg leading-[2] tracking-tight sm:text-xl md:max-h-64 md:min-h-40 md:text-2xl">{!passage ? null : [...passage].map((char, index) => { const isTyped = index < input.length; const isCurrent = index === input.length && phase !== 'idle'; return <span key={`${char}-${index}`} className={`transition-colors ${isTyped ? input[index] === char ? 'text-primary' : 'text-destructive line-through decoration-2' : 'text-foreground/25'} ${isCurrent ? 'border-b-2 border-primary' : ''}`}>{char}</span> })}</div>
      </div>

      <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        {phase === 'idle' && <button onClick={start} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Start test <Zap className="size-4" /></button>}
        {phase === 'active' && <button onClick={pause} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"><Pause className="size-4" /> Pause</button>}
        {phase === 'paused' && <button onClick={start} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"><Play className="size-4" /> Resume</button>}
        {(phase === 'active' || phase === 'paused') && <button onClick={retry} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"><RotateCcw className="size-3.5" /> Restart</button>}
        <span className="ml-auto font-mono text-xs uppercase tracking-wider">{finished ? "Time's up" : phase === 'paused' ? 'Paused — the clock is stopped' : phase === 'active' ? `In progress · ${typingProgress}% typed` : 'Press start — the 60-second clock begins immediately'}</span>
      </div>
    </div>

    <AnimatePresence>{finished && !dismissed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] grid place-items-center bg-black/40 p-4 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: .92, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .95, y: 12 }} transition={{ duration: .25 }} className="relative w-full max-w-md rounded-3xl border border-primary/30 bg-card p-7 text-center shadow-2xl md:p-9">
        <button onClick={() => setDismissed(true)} aria-label="Close results" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"><X className="size-4" /></button>
        <div className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary"><Check className="size-7" /></div>
        <div className="font-mono text-xs uppercase tracking-[.2em] text-primary">60-second sprint · complete</div>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight">Congratulations!</h3>
        <div className="mt-5 text-sm text-muted-foreground">Your WPM is</div>
        <div className="mt-1 font-mono text-6xl font-bold tabular-nums text-primary">{finalWpm}</div>
        <div className="mt-1 text-sm text-muted-foreground">words per minute</div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs"><span className="chip px-3 py-1.5">{typingProgress}% typed</span><span className="chip px-3 py-1.5">{accuracy}% accuracy</span></div>
        <div className="mt-7 grid gap-3">
          <button onClick={retry} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Try again <RotateCcw className="size-4" /></button>
          <Link href="/practice" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary">Practice more <ArrowRight className="size-4" /></Link>
        </div>
      </motion.div>
    </motion.div>}</AnimatePresence>
  </>
}
