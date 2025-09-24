// src/app/page.tsx
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from 'sanity'
import Splash from "@/components/Splash"
import MobileMenuContent from "@/components/MobileMenuContent";




import { sanityClient } from '@/lib/sanity'
import {
  HOME_QUERY,
  SERVICES_QUERY,
  TESTIMONIALS_QUERY,
  SETTINGS_QUERY,
} from '@/lib/queries'
import { urlFor } from '@/lib/image'

import Link from 'next/link'
import ScrollAnimations from '@/components/ScrollAnimations'
import HeaderEffects from '@/components/HeaderEffects'
import Reveal from '@/components/Reveal'

type Slug = { current?: string }
type Service = {
  _id?: string
  slug?: Slug
  icon?: string
  title: string
  description?: string
}

type Testimonial = {
  _id?: string
  name: string
  role?: string
  message: string
}

type Home = {
  heroTitle?: string
  heroSubtitle?: string
  heroBadge?: string
  aboutTitle?: string
  aboutBody?: PortableTextBlock[]
  portrait?: { asset?: { _ref?: string } }
  aboutPortrait?: { asset?: { _ref?: string } }
  focusAreas?: string[]
  certifications?: string[]
  servicesTitle?: string
  servicesSubtitle?: string
  testimonialsTitle?: string
  testimonialsSubtitle?: string
  contactTitle?: string
  contactHelpText?: string
}

type Settings = {
  siteName?: string
  contactEmail?: string
  instagram?: string
  footerNote?: string
  logo?: { asset?: { url?: string; _ref?: string } }
  navAboutLabel?: string
  navServicesLabel?: string
  navTestimonialsLabel?: string
  navContactLabel?: string
  ctaExploreLabel?: string
  ctaContactLabel?: string
  formSendLabel?: string
}

// ISR
export const revalidate = 60

export default async function HomePage() {
  const [home, services, testimonials, settings] = await Promise.all([
    sanityClient.fetch<Home>(HOME_QUERY),
    sanityClient.fetch<Service[]>(SERVICES_QUERY),
    sanityClient.fetch<Testimonial[]>(TESTIMONIALS_QUERY),
    sanityClient.fetch<Settings>(SETTINGS_QUERY),
  ])

  return (
    <main>
      <Splash logoUrl={settings?.logo?.asset?.url} />
      <ScrollAnimations />
      <HeaderEffects />
      <Reveal />
















      {/* NAV (desktop small dropdown + mobile offcanvas) */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-3 sticky-top header">
        <div className="container">
          {/* Brand (you can hard-code or keep from settings) */}
          <Link href="/" className="navbar-brand fw-semibold">
            {settings?.siteName ?? "Hridmann"}
          </Link>

          {/* Desktop menu (HARD-CODED labels) */}
          <ul className="navbar-nav ms-auto d-none d-lg-flex flex-row align-items-center gap-3">
            <li className="nav-item">
              <Link className="nav-link text-dark" href="#about">About</Link>
            </li>

            {/* Services dropdown — items from Sanity */}
            <li className="nav-item dropdown">
              <button
                className="nav-link btn btn-link text-dark dropdown-toggle px-0"
                id="svcDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                type="button"
              >
                Services
              </button>
              <ul
                className="dropdown-menu shadow border-0 rounded-3 p-2 menu-elev"
                aria-labelledby="svcDropdown"
                style={{ minWidth: "20rem" }}
              >
                {services.map((s, i) => (
                  <li key={s._id ?? s.slug?.current ?? i}>
                    {s.slug?.current ? (
                      <Link className="dropdown-item rounded-2 py-2" href={`/services/${s.slug.current}`}>
                        {s.title}
                      </Link>
                    ) : (
                      <span className="dropdown-item rounded-2 py-2 disabled">{s.title}</span>
                    )}
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark" href="#testimonials">Testimonials</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" href="#contact">Contact</Link>
            </li>
          </ul>

          {/* Mobile toggler */}
          <button
            className="navbar-toggler d-lg-none border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileNav"
            aria-controls="mobileNav"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      {/* Mobile offcanvas (full-screen; accordion shows Sanity services) */}
      <div className="offcanvas offcanvas-end mobile-menu" tabIndex={-1} id="mobileNav" aria-labelledby="mobileNavLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title mb-0" id="mobileNavLabel">{settings?.siteName ?? "Hridmann"}</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>

        <div className="offcanvas-body">
          <MobileMenuContent
            services={services}
            aboutLabel="About"
            servicesLabel="Services"
            testimonialsLabel="Testimonials"
            contactLabel="Contact"
          />
        </div>
      </div>





















      {/* HERO */}
      <header className="hero py-5">
        <div className="container py-4">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="badge rounded-pill text-bg-light border mb-3">
                <i className="bi bi-heart-pulse me-2 text-danger" />
                {home?.heroBadge || 'Psychology • HR • Wellbeing'}
              </span>

              <h1 className="display-5 fw-semibold mb-3">
                {home?.heroTitle || 'Shaping Minds. Strengthening Workplaces.'}
              </h1>

              <p className="lead mb-4">
                {home?.heroSubtitle ||
                  'Training, assessments, and counselling led by Harshana Uchil Kuveskar — bridging psychology with practical HR to build safe, resilient and high-performing teams.'}
              </p>

              <div className="d-flex flex-wrap gap-2">
                <Link  href="#services" className="btn btn-primary btn-lg">
                  <i className="bi bi-grid-3x3-gap me-2" />
                  {settings?.ctaExploreLabel || 'Explore Services'}
                </Link>
                <Link  href="#contact" className="btn btn-outline-ink btn-lg">
                  <i className="bi bi-chat-left-text me-2" />
                  {settings?.ctaContactLabel || 'Get in Touch'}
                </Link>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="hero-card p-3">
                {home?.portrait ? (
                  <Image
                    className="rounded-4 img-fluid"
                    src={urlFor(home.portrait).width(1100).height(800).fit('crop').url()}
                    alt="Hridmann"
                    width={1100}
                    height={800}
                    priority
                  />
                ) : (
                  <Image
                    className="rounded-4 img-fluid"
                    src="/logo.png"
                    alt="Hridmann"
                    width={800}
                    height={600}
                    priority
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="section-divider" />

      {/* ABOUT */}
      <section id="about" className="section-pad bg-white">
        <div className="container">
          <div className="row g-4 align-items-start">
            {/* Left column: text */}
            <div className="col-lg-6">
              <h2 className="fw-semibold mb-3">
                {home?.aboutTitle || 'About the Founder'}
              </h2>
              <div className="mb-3">
                {home?.aboutBody && <PortableText value={home.aboutBody} />}
              </div>
            </div>

            {/* Right column: photo + focus + certs */}
            <div className="col-lg-6">
              {/* Founder photo */}
              {home?.aboutPortrait && (
                <div className="mb-4">
                  <div className="ratio ratio-4x3 rounded-4 overflow-hidden shadow-sm">
                    <Image
                      src={urlFor(home.aboutPortrait).width(1200).height(900).fit('crop').url()}
                      alt="About founder portrait"
                      fill
                      sizes="(max-width: 992px) 100vw, 600px"
                      className="object-fit-cover"
                    />
                  </div>
                </div>
              )}

              {/* Core Strengths*/}
              <div className="card card-soft p-4">
                {home?.focusAreas?.length ? (
                  <>
                    <h5 className="mb-3">Core Strengths</h5>
                    <ul className="mb-0">
                      {home.focusAreas.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-pad" style={{ background: 'var(--soft)' }}>
        <div className="container">
          <div className="row justify-content-center text-center mb-4">
            <div className="col-lg-8">
              <h2 className="fw-semibold">{home?.servicesTitle || 'Services'}</h2>
              <p className="muted">
                {home?.servicesSubtitle || 'Psychology-led programs tailored to people, culture, and performance.'}
              </p>
            </div>
          </div>

          <div className="row g-4">
            {services?.map((s: Service, i: number) => (
              <div
                key={s._id ?? s.slug?.current ?? `svc-${i}`}
                className="col-md-6 col-lg-4"
              >
                <div className="card card-soft h-100">
                  <div className="card-body p-4">
                    <div className="icon-badge mb-3">
                      <i className={`bi ${s.icon || 'bi-grid-3x3-gap'}`} />
                    </div>
                    <h5 className="card-title">{s.title}</h5>
                    <p className="card-text muted">{s.description}</p>

                    {s.slug?.current && (
                      <Link href={`/services/${s.slug.current}`} className="btn btn-link p-0">
                        Learn more <i className="bi bi-arrow-right ms-1" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="section-pad bg-white">
        <div className="container">
          <div className="row justify-content-center text-center mb-4">
            <div className="col-lg-8">
              <h2 className="fw-semibold">{home?.testimonialsTitle || 'Testimonials'}</h2>
              <p className="muted">{home?.testimonialsSubtitle || 'What leaders and learners say.'}</p>
            </div>
          </div>

          {/* Mobile horizontal scroll */}
          <div className="d-flex d-md-none gap-3 overflow-auto pb-3" style={{ scrollSnapType: 'x mandatory' }}>
            {testimonials?.map((t, i) => (
              <div key={t._id ?? `t-${i}`} className="flex-shrink-0" style={{ width: '85%', scrollSnapAlign: 'start' }}>
                <div className="card card-soft h-100">
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="mb-3">
                      <i className="bi bi-quote display-6 text-secondary" />
                    </div>
                    <p className="flex-grow-1">{t.message}</p>
                    <div className="mt-3 small muted">
                      <strong>{t.name}</strong>
                      <br />
                      {t.role || ''}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop grid */}
          <div className="row g-4 d-none d-md-flex">
            {testimonials?.map((t, i) => (
              <div key={t._id ?? `t-${i}`} className="col-md-6 col-lg-4">
                <div className="card card-soft h-100">
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="mb-3">
                      <i className="bi bi-quote display-6 text-secondary" />
                    </div>
                    <p className="flex-grow-1">{t.message}</p>
                    <div className="mt-3 small muted">
                      <strong>{t.name}</strong>
                      <br />
                      {t.role || ''}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-pad" style={{ background: 'var(--soft)' }}>
        <div className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-5">
              <div className="card card-soft p-4 h-100">
                <h3 className="fw-semibold mb-3">
                  {home?.contactTitle || 'Get in Touch'}
                </h3>
                <p className="mb-1">
                  <i className="bi bi-envelope me-2" />
                  <Link href={`mailto:${settings?.contactEmail || 'harshana.hridmann@gmail.com'}`}>
                    {settings?.contactEmail || 'harshana.hridmann@gmail.com'}
                  </Link>
                </p>
                {settings?.instagram && (
                  <p className="mb-4">
                    <i className="bi bi-instagram me-2" />
                    <Link target="_blank" rel="noopener" href={settings.instagram}>
                      @hridmann
                    </Link>
                  </p>
                )}
                <p className="muted small mb-0">
                  {home?.contactHelpText || 'Prefer a quick call? Drop a message with your number and we’ll reach out.'}
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="card card-soft p-4 h-100">
                <h5 className="mb-3">{settings?.formSendLabel || 'Send a Message'}</h5>
                <form action="https://formspree.io/f/yourid" method="POST" className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input required name="name" type="text" className="form-control" placeholder="Your full name" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input required name="email" type="email" className="form-control" placeholder="you@example.com" />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Message</label>
                    <textarea
                      required
                      name="message"
                      className="form-control"
                      rows={5}
                      placeholder="How can we help?"
                    />
                  </div>
                  <div className="col-12 d-flex align-items-center gap-3">
                    <button className="btn btn-primary" type="submit">
                      <i className="bi bi-send me-2" />
                      {settings?.formSendLabel || 'Send'}
                    </button>
                    <small className="muted">
                      By submitting, you consent to be contacted about your enquiry.
                    </small>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY CTA & FOOTER */}
      <Link href="#contact" className="btn btn-accent sticky-cta shadow">
        <i className="bi bi-telephone me-2" />
        Contact
      </Link>

      <footer className="py-4 border-top bg-white">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
          <div>© {new Date().getFullYear()} {settings?.siteName || 'Hridmann'}</div>
          <div className="footer-note small">{settings?.footerNote || 'Design & build by Soham Joshi'}</div>
        </div>
      </footer>
    </main>
  )
}
