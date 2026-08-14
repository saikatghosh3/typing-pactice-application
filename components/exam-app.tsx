'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Award, Check, ChevronLeft, CircleHelp, RotateCcw, Timer, Trophy, X } from 'lucide-react'
import exams from '@/data/exam.json'

type Exam = (typeof exams)[number]
type Question = Exam['questions'][number]
type View = { name: 'pick' } | { name: 'exam'; examId: string; index: number } | { name: 'result'; examId: string }

const LETTERS = ['A', 'B', 'C', 'D']
const STORAGE_KEY = 'typely-exam-records'

export function ExamApp() {
  const [view, setView] = useState<View>({ name: 'pick' })
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [records, setRecords] = useState<Record<string, { bestScore: number; attempts: number }>>({})

  useEffect(() => { const saved = localStorage.getItem(STORAGE_KEY); if (saved) setRecords(JSON.parse(saved)) }, [])

  const exam = view.name === 'pick' ? null : exams.find((item) => item.id === view.examId) ?? null
  const startExam = (examId: string) => { setAnswers({}); setView({ name: 'exam', examId, index: 0 }) }
  const finishExam = () => {
    if (!exam) return
    const correct = exam.questions.filter((q, i) => answers[`${exam.id}-${i}`] === q.answer).length
    const old = records[exam.id] ?? { bestScore: 0, attempts: 0 }
    const next = { ...records, [exam.id]: { bestScore: Math.max(old.bestScore, correct), attempts: old.attempts + 1 } }
    setRecords(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setView({ name: 'result', examId: exam.id })
  }

  return <main className="min-h-screen bg-background text-foreground">
    <section className="mx-auto max-w-7xl px-5 pb-14 pt-14 md:px-8 md:pt-24"><div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end"><div><motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-5 font-mono text-xs uppercase tracking-[.2em] text-primary">Test your knowledge</motion.p><motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl text-balance text-5xl font-semibold leading-none tracking-[-.06em] md:text-8xl">Pass the <span className="text-primary">typing exam.</span></motion.h1></div><p className="max-w-sm text-pretty leading-7 text-muted-foreground lg:justify-self-end">Pick a lesson, answer the multiple-choice questions, and see your score with per-lesson records that stick around.</p></div></section>
    <section className="border-t border-border bg-muted/30"><div className="mx-auto max-w-7xl px-5 py-12 md:px-8"><AnimatePresence mode="wait">{view.name === 'pick' ? <PickView key="pick" onStart={startExam} records={records} /> : view.name === 'exam' ? <ExamView key={view.examId} exam={exam!} index={view.index} answers={answers} onAnswer={(answer) => setAnswers((all) => ({ ...all, [`${view.examId}-${view.index}`]: answer }))} onNext={() => setView({ ...view, index: view.index + 1 })} onFinish={finishExam} onQuit={() => setView({ name: 'pick' })} /> : <ResultView key={view.examId} exam={exam!} answers={answers} records={records[view.examId]} onRetry={() => startExam(view.examId)} onPick={() => setView({ name: 'pick' })} />}</AnimatePresence></div></section>
  </main>
}

function PickView({ onStart, records }: { onStart: (id: string) => void; records: Record<string, { bestScore: number; attempts: number }> }) {
  const total = exams.reduce((sum, exam) => sum + exam.questions.length, 0)
  const done = exams.filter((exam) => records[exam.id]?.attempts > 0).length
  return <><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 font-mono text-xs uppercase tracking-[.18em] text-muted-foreground">01 / Choose your exam</p><h2 className="text-2xl font-semibold tracking-tight">Four exams. One calm scoreboard.</h2></div><span className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground">{done}/{exams.length} exams taken · {total} questions</span></div><div className="grid gap-4 md:grid-cols-2">{exams.map((exam, index) => { const record = records[exam.id]; return <motion.button key={exam.id} onClick={() => onStart(exam.id)} whileHover={{ y: -4 }} className="card p-7 text-left"><div aria-hidden className="card-glow" /><div className="relative mb-10 flex items-center justify-between"><span className="font-mono text-xs text-primary">0{index + 1} / exam</span><span className="chip size-10"><CircleHelp className="size-4" /></span></div><div className="relative"><h3 className="text-xl font-medium tracking-tight">{exam.title}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{exam.description}</p></div><div className="relative mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-5 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1.5"><Timer className="size-3.5 text-primary" />{exam.duration}</span><span>{exam.questions.length} questions</span>{record && <span className="ml-auto chip px-3 py-1 font-mono text-xs">{record.bestScore}/{exam.questions.length} best</span>}</div></motion.button> }) }</div></>
}

function ExamView({ exam, index, answers, onAnswer, onNext, onFinish, onQuit }: { exam: Exam; index: number; answers: Record<string, number>; onAnswer: (answer: number) => void; onNext: () => void; onFinish: () => void; onQuit: () => void }) {
  const question: Question = exam.questions[index]
  const selected = answers[`${exam.id}-${index}`]
  const answeredCount = exam.questions.filter((_, i) => answers[`${exam.id}-${i}`] !== undefined).length
  const isLast = index === exam.questions.length - 1
  const progress = ((index + (selected !== undefined ? 1 : 0)) / exam.questions.length) * 100

  return <div className="mx-auto max-w-3xl"><div className="mb-8 flex flex-wrap items-center justify-between gap-4"><button onClick={onQuit} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"><ChevronLeft className="size-4" />Exit exam</button><span className="font-mono text-xs text-muted-foreground">{answeredCount}/{exam.questions.length} answered</span><span className="rounded-full border border-border px-4 py-2 font-mono text-xs text-muted-foreground">{exam.title}</span></div><div className="mb-10 h-2 overflow-hidden rounded-full bg-muted"><motion.div className="h-full rounded-full bg-primary" animate={{ width: `${progress}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} /></div><AnimatePresence mode="wait"><motion.div key={index} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: .22 }} className="relative overflow-hidden rounded-3xl border border-border bg-card p-7 md:p-10"><div aria-hidden className="card-glow" /><div className="relative mb-3 font-mono text-xs uppercase tracking-[.18em] text-muted-foreground">Question {index + 1} of {exam.questions.length}</div><h2 className="relative text-2xl font-medium leading-snug tracking-tight md:text-3xl">{question.question}</h2><div className="relative mt-8 grid gap-3">{question.options.map((option, optionIndex) => { const isSelected = selected === optionIndex; return <button key={optionIndex} onClick={() => onAnswer(optionIndex)} className={`group flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ${isSelected ? 'border-primary bg-primary/10 shadow-[0_12px_30px_-12px_color-mix(in_oklch,var(--primary)_40%,transparent)]' : 'border-border bg-background hover:border-primary/60 hover:shadow-[0_12px_30px_-14px_rgba(0,0,0,0.12)]'}`}><span className={`grid size-7 shrink-0 place-items-center rounded-full font-mono text-xs transition-colors ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{LETTERS[optionIndex]}</span><span className="text-sm leading-6">{option}</span></button> }) }</div></motion.div></AnimatePresence><div className="mt-8 flex items-center justify-between"><span className="text-xs text-muted-foreground">{selected !== undefined ? 'Answer saved' : 'Pick an answer to continue'}</span><button onClick={isLast ? onFinish : onNext} disabled={selected === undefined} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity disabled:opacity-40">{isLast ? 'Finish exam' : 'Next question'}<ArrowRight className="size-4" /></button></div></div>
}

function ResultView({ exam, answers, records, onRetry, onPick }: { exam: Exam; answers: Record<string, number>; records?: { bestScore: number; attempts: number }; onRetry: () => void; onPick: () => void }) {
  const summary = useMemo(() => {
    const correct = exam.questions.map((q, i) => ({ question: q, chosen: answers[`${exam.id}-${i}`], correct: answers[`${exam.id}-${i}`] === q.answer }))
    const score = correct.filter((item) => item.correct).length
    const pct = Math.round((score / exam.questions.length) * 100)
    const verdict = pct === 100 ? 'Flawless.' : pct >= 80 ? 'Strong result.' : pct >= 60 ? 'Solid — review the misses.' : 'Good start — review and retry.'
    return { correct, score, pct, verdict }
  }, [exam, answers])

  return <div className="mx-auto max-w-3xl"><div className="card p-7 text-center md:p-12"><div aria-hidden className="card-glow" /><div className="chip relative mx-auto mb-6 size-16"><Award className="size-8" /></div><div className="relative font-mono text-xs uppercase tracking-[.2em] text-primary">{exam.title}</div><h2 className="relative mt-3 text-3xl font-semibold tracking-tight md:text-5xl">{summary.score}<span className="text-xl text-muted-foreground md:text-3xl">/{exam.questions.length}</span> correct</h2><p className="relative mt-3 text-muted-foreground">{summary.pct}% · {summary.verdict}</p><div className="relative mt-6 flex flex-wrap items-center justify-center gap-3 text-xs"><span className="chip px-3 py-1.5 text-muted-foreground"><Trophy className="size-4 text-primary" />Best {records?.bestScore ?? summary.score}/{exam.questions.length}</span><span className="rounded-full border border-border px-4 py-2 text-muted-foreground">{records?.attempts ?? 1} attempt{(records?.attempts ?? 1) > 1 ? 's' : ''}</span></div></div><div className="mt-6 grid gap-3 sm:grid-cols-2">{summary.correct.map((item) => <div key={item.question.question} className={`relative rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 ${item.correct ? 'border-border bg-card hover:border-primary/50 hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.15)]' : 'border-destructive/40 bg-destructive/5 hover:border-destructive/60'}`}><div className="mb-3 flex items-center gap-2 text-xs font-medium">{item.correct ? <Check className="size-4 text-primary" /> : <X className="size-4 text-destructive" />}<span className="font-mono uppercase tracking-wider text-muted-foreground">Q{exam.questions.indexOf(item.question) + 1}</span></div><p className="text-sm leading-6">{item.question.question}</p>{!item.correct && <p className="mt-2 text-xs text-muted-foreground">Answer: {LETTERS[item.question.answer]}. {item.question.options[item.question.answer]}</p>}<p className="mt-3 border-t border-border pt-3 text-xs leading-5 text-muted-foreground">{item.question.explanation}</p></div>)}</div><div className="mt-8 flex flex-wrap justify-center gap-3"><button onClick={onRetry} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"><RotateCcw className="size-4" />Try again</button><button onClick={onPick} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft className="size-4" />All exams</button></div></div>
}
