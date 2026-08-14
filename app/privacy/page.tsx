import { PageFrame, PageHero, SectionLabel } from '@/components/site-shell'

const sections = [
  { title: 'Data we collect', body: 'Typely is designed to work without an account. Practice history, best scores, and character analytics are stored locally in your browser using localStorage. That data stays on your device and is never sent to our servers.' },
  { title: 'Usage analytics', body: 'When you use the hosted site, we rely on privacy-friendly aggregate analytics to understand overall traffic and performance. These analytics do not identify individual users and are not used to build a profile of you.' },
  { title: 'How we use your data', body: 'Because practice data lives on your device, we do not collect, sell, or share personal typing history. The only data we may receive is anonymous, aggregate usage information used to improve the product.' },
  { title: 'Your control', body: 'You can clear your local practice history at any time by clearing your browser site data for Typely. This removes all locally stored records, characters, and preferences from your device.' },
  { title: 'Cookies', body: 'Typely does not use advertising cookies. Any storage used is limited to what is required for the service to function and to anonymous aggregate analytics.' },
  { title: 'Changes to this policy', body: 'We may update this policy from time to time to reflect changes in the service or applicable law. The latest version will always be available on this page, and material changes will be clearly noted.' },
  { title: 'Contact', body: 'If you have any questions about this privacy policy or how your data is handled, reach out at privacy@typely.co and we will respond promptly.' },
]

export default function PrivacyPage() {
  return <PageFrame><PageHero eyebrow="Legal / Privacy" title={<>Your data stays <span className="text-primary">on your keyboard.</span></>} description="Typely is built to be private by default. This page explains, in plain language, what we collect, what we don't, and how you stay in control." action="Open practice" />
    <section className="mx-auto max-w-3xl px-5 pb-24 md:px-8"><div className="grid gap-10">{sections.map((section, index) => <div key={section.title}><SectionLabel>0{index + 1} / {section.title}</SectionLabel><h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{section.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{section.body}</p></div>)}</div><p className="mt-14 border-t border-border pt-6 text-xs text-muted-foreground">Last updated: August 15, 2026 · Effective immediately.</p></section>
  </PageFrame>
}
