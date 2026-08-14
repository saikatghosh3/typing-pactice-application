import { PageFrame, PageHero, SectionLabel } from '@/components/site-shell'

const sections = [
  { title: 'Acceptance of terms', body: 'By accessing or using Typely, you agree to be bound by these terms. If you do not agree with any part of them, please do not use the service.' },
  { title: 'The service', body: 'Typely is a typing practice studio that runs in your browser. You are responsible for your own device, internet connection, and for how you choose to use the practice materials provided.' },
  { title: 'No account required', body: 'The core experience works without creating an account. Where optional features are introduced in the future, they will be clearly explained before any personal data is requested.' },
  { title: 'Acceptable use', body: 'You agree not to misuse the service, attempt to disrupt its availability, scrape or redistribute practice content at scale, or use Typely for any unlawful purpose.' },
  { title: 'Intellectual property', body: 'The Typely name, design, practice scripts, and all other content are owned by Typely and protected by applicable law. You may use the service for personal practice, not for redistribution or commercial resale.' },
  { title: 'No warranties', body: 'The service is provided "as is" without warranties of any kind. While we work hard to keep it calm and reliable, we make no guarantee that it will be uninterrupted or error-free.' },
  { title: 'Limitation of liability', body: 'To the maximum extent permitted by law, Typely shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.' },
  { title: 'Changes to these terms', body: 'We may update these terms as the service evolves. Continued use after changes are posted means you accept the updated terms.' },
  { title: 'Contact', body: 'Questions about these terms? Write to hello@typely.co and we will get back to you.' },
]

export default function TermsPage() {
  return <PageFrame><PageHero eyebrow="Legal / Terms" title={<>Simple terms for a <span className="text-primary">calm practice.</span></>} description="The short version: use Typely to practice, keep it respectful, and your data stays yours. Here are the details." action="Open practice" />
    <section className="mx-auto max-w-3xl px-5 pb-24 md:px-8"><div className="grid gap-10">{sections.map((section, index) => <div key={section.title}><SectionLabel>0{index + 1} / {section.title}</SectionLabel><h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{section.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{section.body}</p></div>)}</div><p className="mt-14 border-t border-border pt-6 text-xs text-muted-foreground">Last updated: August 15, 2026 · Effective immediately.</p></section>
  </PageFrame>
}
