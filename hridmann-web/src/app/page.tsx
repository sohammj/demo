// // src/app/page.tsx
// import Image from 'next/image'
// import { PortableText } from '@portabletext/react'
// import { sanityClient } from '@/lib/sanity'
// import { HOME_QUERY, SERVICES_QUERY, TESTIMONIALS_QUERY, SETTINGS_QUERY } from '@/lib/queries'
// import { urlFor } from '@/lib/image'




// type Slug = { current?: string }
// type Service = { _id?: string; slug?: Slug; icon?: string; title: string; description?: string }
// type Testimonial = { _id?: string; name: string; role?: string; message: string }



// export const revalidate = 60 // ISR

// export default async function HomePage() {
//   const [home, services, testimonials, settings] = await Promise.all([
//     sanityClient.fetch(HOME_QUERY),
//     sanityClient.fetch(SERVICES_QUERY),
//     sanityClient.fetch(TESTIMONIALS_QUERY),
//     sanityClient.fetch(SETTINGS_QUERY),
//   ])


//   return (
//     <main>
//       {/* NAV */}
//       <nav className="navbar navbar-expand-lg bg-white border-bottom py-3 sticky-top">
//         <div className="container">
//           <a className="navbar-brand fw-semibold" href="#">
//             {settings?.siteName || 'Hridmann'}
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#nav"
//             aria-controls="nav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon" />
//           </button>
//           <div className="collapse navbar-collapse" id="nav">
//             <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//               <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
//               <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
//               <li className="nav-item"><a className="nav-link" href="#testimonials">Testimonials</a></li>
//               <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
//             </ul>
//           </div>
//         </div>
//       </nav>




//       {/* HERO */}
//       {/* <header className="hero py-5">
//         <div className="container py-4">
//           <div className="row align-items-center g-4">
//             <div className="col-lg-7">
//               <span className="badge rounded-pill text-bg-light border mb-3">
//                 <i className="bi bi-heart-pulse me-2 text-danger" />
//                 Psychology • HR • Wellbeing
//               </span>
//               <h1 className="display-5 fw-semibold mb-3">
//                 {home?.heroTitle || 'Shaping Minds. Strengthening Workplaces.'}
//               </h1>
//               <p className="lead mb-4">
//                 {home?.heroSubtitle ||
//                   'Training, assessments, and counselling led by Harshana Uchil Kuveskar — bridging psychology with practical HR to build safe, resilient and high-performing teams.'}
//               </p>
//               <div className="d-flex gap-2">
//                 <a href="#services" className="btn btn-primary btn-lg">
//                   <i className="bi bi-grid-3x3-gap me-2" />
//                   Explore Services
//                 </a>
//                 <a href="#contact" className="btn btn-accent btn-lg">
//                   <i className="bi bi-chat-left-text me-2" />
//                   Get in Touch
//                 </a>
//               </div>
//             </div>
//             <div className="col-lg-5">
//               <div className="card card-soft p-3">
//                 {home?.portrait ? (
//                   <Image
//                     className="rounded-4 img-fluid"
//                     src={urlFor(home.portrait).width(1200).height(900).fit('crop').url()}
//                     alt="portrait"
//                     width={1200}
//                     height={900}
//                     priority
//                   />
//                 ) : (
//                   <Image
//                     className="rounded-4 img-fluid"
//                     src="/images/portrait.png"
//                     alt="portrait placeholder"
//                     width={800}
//                     height={600}
//                     priority
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header> */}
//       <header className="hero py-5">
//         <div className="container py-4">
//           <div className="row align-items-center g-4">
//             <div className="col-lg-7">
//               <span className="badge rounded-pill text-bg-light border mb-3">
//                 <i className="bi bi-heart-pulse me-2 text-danger" />
//                 Psychology • HR • Wellbeing
//               </span>
//               <h1 className="display-5 fw-semibold mb-3">
//                 {home?.heroTitle || 'Shaping Minds. Strengthening Workplaces.'}
//               </h1>
//               <p className="lead mb-4">
//                 {home?.heroSubtitle ||
//                   'Training, assessments, and counselling led by Harshana Uchil Kuveskar — bridging psychology with practical HR to build safe, resilient and high-performing teams.'}
//               </p>

//               <div className="d-flex flex-wrap gap-2">
//                 <a href="#services" className="btn btn-primary btn-lg">
//                   <i className="bi bi-grid-3x3-gap me-2" />
//                   Explore Services
//                 </a>
//                 <a href="#contact" className="btn btn-outline-ink btn-lg">
//                   <i className="bi bi-chat-left-text me-2" />
//                   Get in Touch
//                 </a>
//               </div>
//             </div>

//             <div className="col-lg-5">
//               <div className="hero-card p-3">
//                 {home?.portrait ? (
//                   <Image
//                     className="rounded-4 img-fluid"
//                     src={urlFor(home.portrait).width(1100).height(800).fit('crop').url()}
//                     alt="Hridmann"
//                     width={1100}
//                     height={800}
//                     priority
//                   />
//                 ) : (
//                   <Image
//                     className="rounded-4 img-fluid"
//                     src="/logo.png"
//                     alt="Hridmann"
//                     width={800}
//                     height={600}
//                     priority
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//       <div className="section-divider" />


//       {/* ABOUT */}
//       {/* <section id="about" className="section-pad bg-white">
//         <div className="container">
//           <div className="row g-4 align-items-start">
//             <div className="col-lg-6">
//               <h2 className="fw-semibold mb-3" id="about-title">
//                 {home?.aboutTitle || 'About the Founder'}
//               </h2>
//               <div id="about-body">
//                 {home?.aboutBody ? <PortableText value={home.aboutBody} /> : <p className="muted">—</p>}
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className="card card-soft p-4">
//                 <h5 className="mb-3">Areas of Focus</h5>
//                 <ul className="mb-0">
//                   <li>Psychological safety at the workplace</li>
//                   <li>Journey-oriented training &amp; workshops</li>
//                   <li>SMART goal setting, stress management, assertive communication</li>
//                   <li>Team building and culture building</li>
//                   <li>Employee counselling and leadership coaching</li>
//                 </ul>
//                 <div className="divider my-4" />
//                 <h6 className="mb-2">Certifications &amp; Learning</h6>
//                 <p className="mb-0">
//                   REBT, German language training, industrial relations, psychological safety &amp; HR practices;
//                   ongoing community outreach and academic accreditation contributions.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section> */}

//       <section id="about" className="section-pad bg-white">
//         <div className="container">
//           <div className="row g-4 align-items-start">
//             <div className="col-lg-6">
//               <h2 className="fw-semibold mb-3">About the Founder</h2>
//               <div className="mb-3">{home?.aboutBody && <PortableText value={home.aboutBody} />}</div>
//             </div>
//             <div className="col-lg-6">
//               <div className="card card-soft p-4">
//                 <h5 className="mb-3">Areas of Focus</h5>
//                 <ul className="mb-0">
//                   <li>Psychological safety at the workplace</li>
//                   <li>Journey-oriented training &amp; workshops</li>
//                   <li>SMART goal setting, stress management, assertive communication</li>
//                   <li>Team building and culture building</li>
//                   <li>Employee counselling and leadership coaching</li>
//                 </ul>
//                 <div className="divider my-4" />
//                 <h6 className="mb-2">Certifications &amp; Learning</h6>
//                 <p className="mb-0">REBT, German language training, industrial relations, psychological safety &amp; HR practices; ongoing community outreach and academic accreditation contributions.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>


//       {/* SERVICES */}
//       <section id="services" className="section-pad" style={{ background: 'var(--soft)' }}>
//         <div className="container">
//           <div className="row justify-content-center text-center mb-4">
//             <div className="col-lg-8">
//               <h2 className="fw-semibold">Services</h2>
//               <p className="muted">Psychology-led programs tailored to people, culture, and performance.</p>
//             </div>
//           </div>
//           <div className="row g-4">
//             {services?.map((s: Service, i: number) => (
//             <div key={s._id ?? s.slug?.current ?? `svc-${i}`} className="col-md-6 col-lg-4">
//                 <div className="card card-soft h-100">
//                   <div className="card-body p-4">
//                     <div className="icon-badge mb-3">
//                       <i className={`bi ${s.icon}`} />
//                     </div>
//                     <h5 className="card-title">{s.title}</h5>
//                     <p className="card-text muted">{s.description}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* TESTIMONIALS */}
//       <section id="testimonials" className="section-pad bg-white">
//         <div className="container">
//           <div className="row justify-content-center text-center mb-4">
//             <div className="col-lg-8">
//               <h2 className="fw-semibold">Testimonials</h2>
//               <p className="muted">What leaders and learners say.</p>
//             </div>
//           </div>
//           <div className="row g-4">
//             {testimonials?.map((t: Testimonial, i: number) => (
//             <div key={t._id ?? `t-${i}`} className="col-md-6 col-lg-4">
//                 <div className="card card-soft h-100">
//                   <div className="card-body p-4 d-flex flex-column">
//                     <div className="mb-3">
//                       <i className="bi bi-quote display-6 text-secondary" />
//                     </div>
//                     <p className="flex-grow-1">{t.message}</p>
//                     <div className="mt-3 small muted">
//                       <strong>{t.name}</strong>
//                       <br />
//                       {t.role || ''}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CONTACT */}
//       <section id="contact" className="section-pad" style={{ background: 'var(--soft)' }}>
//         <div className="container">
//           <div className="row g-4 align-items-stretch">
//             <div className="col-lg-5">
//               <div className="card card-soft p-4 h-100">
//                 <h3 className="fw-semibold mb-3">Get in Touch</h3>
//                 <p className="mb-1">
//                   <i className="bi bi-envelope me-2" />
//                   <a href={`mailto:${settings?.contactEmail || 'harshana.hridmann@gmail.com'}`}>
//                     {settings?.contactEmail || 'harshana.hridmann@gmail.com'}
//                   </a>
//                 </p>
//                 {settings?.instagram && (
//                   <p className="mb-4">
//                     <i className="bi bi-instagram me-2" />
//                     <a target="_blank" rel="noopener" href={settings.instagram}>
//                       @hridmann
//                     </a>
//                   </p>
//                 )}
//                 <p className="muted small mb-0">
//                   Prefer a quick call? Drop a message with your number and we’ll reach out.
//                 </p>
//               </div>
//             </div>
//             <div className="col-lg-7">
//               <div className="card card-soft p-4 h-100">
//                 <h5 className="mb-3">Send a Message</h5>
//                 <form action="https://formspree.io/f/yourid" method="POST" className="row g-3">
//                   <div className="col-md-6">
//                     <label className="form-label">Name</label>
//                     <input required name="name" type="text" className="form-control" placeholder="Your full name" />
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label">Email</label>
//                     <input required name="email" type="email" className="form-control" placeholder="you@example.com" />
//                   </div>
//                   <div className="col-12">
//                     <label className="form-label">Message</label>
//                     <textarea
//                       required
//                       name="message"
//                       className="form-control"
//                       rows={5}
//                       placeholder="How can we help?"
//                     />
//                   </div>
//                   <div className="col-12 d-flex align-items-center gap-3">
//                     <button className="btn btn-primary" type="submit">
//                       <i className="bi bi-send me-2" />
//                       Send
//                     </button>
//                     <small className="muted">By submitting, you consent to be contacted about your enquiry.</small>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* STICKY CTA & FOOTER */}
//       <a href="#contact" className="btn btn-accent sticky-cta shadow">
//         <i className="bi bi-telephone me-2" />
//         Contact
//       </a>
// {/*
//       <footer className="py-4 border-top bg-white">
//         <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
//           <div>© {new Date().getFullYear()} {settings?.siteName || 'Hridmann'}</div>
//           <div className="muted small">{settings?.footerNote || 'Design & build by Soham Joshi'}</div>
//         </div>
//       </footer> */}

//       <footer className="py-4 border-top bg-white">
//         <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
//           <div>© {new Date().getFullYear()} {settings?.siteName || 'Hridmann'}</div>
//           <div className="footer-note small">{settings?.footerNote || 'Design & build by Soham Joshi'}</div>
//         </div>
//       </footer>

//     </main>
//   )
// }




// src/app/page.tsx
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from 'sanity'

import { sanityClient } from '@/lib/sanity'
import {
  HOME_QUERY,
  SERVICES_QUERY,
  TESTIMONIALS_QUERY,
  SETTINGS_QUERY,
} from '@/lib/queries'
import { urlFor } from '@/lib/image'

import Link from 'next/link'

// ---- Types (replace `any`) ----
// type Slug = { current?: string }

// type Service = {
//   _id?: string
//   slug?: Slug
//   icon?: string
//   title: string
//   description?: string
// }


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
  aboutTitle?: string
  aboutBody?: PortableTextBlock[]
  portrait?: { asset?: { _ref?: string } }
  aboutPortrait?: { asset?: { _ref?: string } }
  focusAreas?: string[]
  certifications?: string[]
}

type Settings = {
  siteName?: string
  contactEmail?: string
  instagram?: string
  footerNote?: string
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
      {/* NAV
      <nav className="navbar navbar-expand-lg bg-white border-bottom py-3 sticky-top">
        <div className="container">
          <a className="navbar-brand fw-semibold" href="#">
            {settings?.siteName || 'Hridmann'}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav"
            aria-controls="nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
              <li className="nav-item"><a className="nav-link" href="#testimonials">Testimonials</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav> */}
        {/* NAV */}
      <nav className="navbar bg-white border-bottom py-3 sticky-top">
          <div className="container">
            {/* Brand (left) */}
            <Link href="/" className="navbar-brand fw-semibold">
              {settings?.siteName || 'Hridmann'}
            </Link>

            {/* Desktop menu (right, always visible on lg+) */}
            {/* <ul className="navbar-nav d-none d-lg-flex ms-auto align-items-center gap-4">
              <li className="nav-item"><a className="nav-link text-dark" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link text-dark" href="#services">Services</a></li>
              <li className="nav-item"><a className="nav-link text-dark" href="#testimonials">Testimonials</a></li>
              <li className="nav-item"><a className="nav-link text-dark" href="#contact">Contact</a></li>
            </ul> */}

            <div className="ms-auto d-none d-lg-flex align-items-center gap-4">
              <a className="nav-link text-dark" href="#about">About</a>
              <a className="nav-link text-dark" href="#services">Services</a>
              <a className="nav-link text-dark" href="#testimonials">Testimonials</a>
              <a className="nav-link text-dark" href="#contact">Contact</a>
            </div>


            {/* Mobile button (only shows < lg)
            <button
              className="btn btn-outline-ink d-lg-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileNav"
              aria-controls="mobileNav"
            >
              Menu
            </button> */}
            {/* Mobile button (only shows < lg) */}
            <button
              className="btn d-lg-none border-0"
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

        {/* Mobile offcanvas menu */}
        <div className="offcanvas offcanvas-end" tabIndex={-1} id="mobileNav" aria-labelledby="mobileNavLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="mobileNavLabel">{settings?.siteName || 'Hridmann'}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" data-bs-dismiss="offcanvas" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" data-bs-dismiss="offcanvas" href="#services">Services</a></li>
              <li className="nav-item"><a className="nav-link" data-bs-dismiss="offcanvas" href="#testimonials">Testimonials</a></li>
              <li className="nav-item"><a className="nav-link" data-bs-dismiss="offcanvas" href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>



      {/* HERO */}
      <header className="hero py-5">
        <div className="container py-4">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="badge rounded-pill text-bg-light border mb-3">
                <i className="bi bi-heart-pulse me-2 text-danger" />
                Psychology • HR • Wellbeing
              </span>
              <h1 className="display-5 fw-semibold mb-3">
                {home?.heroTitle || 'Shaping Minds. Strengthening Workplaces.'}
              </h1>
              <p className="lead mb-4">
                {home?.heroSubtitle ||
                  'Training, assessments, and counselling led by Harshana Uchil Kuveskar — bridging psychology with practical HR to build safe, resilient and high-performing teams.'}
              </p>

              <div className="d-flex flex-wrap gap-2">
                <a href="#services" className="btn btn-primary btn-lg">
                  <i className="bi bi-grid-3x3-gap me-2" />
                  Explore Services
                </a>
                <a href="#contact" className="btn btn-outline-ink btn-lg">
                  <i className="bi bi-chat-left-text me-2" />
                  Get in Touch
                </a>
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

      {/* ABOUT
      <section id="about" className="section-pad bg-white">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-lg-6">
              <h2 className="fw-semibold mb-3">
                {home?.aboutTitle || 'About the Founder'}
              </h2>
              <div className="mb-3">
                {home?.aboutBody ? <PortableText value={home.aboutBody} /> : null}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card card-soft p-4">
                <h5 className="mb-3">Areas of Focus</h5>
                <ul className="mb-0">
                  <li>Psychological safety at the workplace</li>
                  <li>Journey-oriented training &amp; workshops</li>
                  <li>SMART goal setting, stress management, assertive communication</li>
                  <li>Team building and culture building</li>
                  <li>Employee counselling and leadership coaching</li>
                </ul>
                <div className="divider my-4" />
                <h6 className="mb-2">Certifications &amp; Learning</h6>
                <p className="mb-0">
                  REBT, German language training, industrial relations, psychological safety &amp; HR practices; ongoing
                  community outreach and academic accreditation contributions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}









      {/* ABOUT */}
      <section id="about" className="section-pad bg-white">
        <div className="container">
          <div className="row g-4 align-items-start">

            {/* Left column: text */}
            <div className="col-lg-6">
              <h2 className="fw-semibold mb-3">
                {home?.aboutTitle}
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


              {/* Areas of Focus & Certifications card */}
              <div className="card card-soft p-4">
                {home?.focusAreas?.length ? (
                  <>
                    <h5 className="mb-3">Areas of Focus</h5>
                    <ul className="mb-0">
                      {home.focusAreas.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </>
                ) : null}

                {home?.certifications?.length ? (
                  <>
                    <div className="divider my-4" />
                    <h6 className="mb-2">Certifications &amp; Learning</h6>
                    <ul className="mb-0">
                      {home.certifications.map((cert, i) => (
                        <li key={i}>{cert}</li>
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
              <h2 className="fw-semibold">Services</h2>
              <p className="muted">Psychology-led programs tailored to people, culture, and performance.</p>
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
              <h2 className="fw-semibold">Testimonials</h2>
              <p className="muted">What leaders and learners say.</p>
            </div>
          </div>
          <div className="row g-4">
            {testimonials?.map((t: Testimonial, i: number) => (
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
                <h3 className="fw-semibold mb-3">Get in Touch</h3>
                <p className="mb-1">
                  <i className="bi bi-envelope me-2" />
                  <a href={`mailto:${settings?.contactEmail || 'harshana.hridmann@gmail.com'}`}>
                    {settings?.contactEmail || 'harshana.hridmann@gmail.com'}
                  </a>
                </p>
                {settings?.instagram && (
                  <p className="mb-4">
                    <i className="bi bi-instagram me-2" />
                    <a target="_blank" rel="noopener" href={settings.instagram}>
                      @hridmann
                    </a>
                  </p>
                )}
                <p className="muted small mb-0">
                  Prefer a quick call? Drop a message with your number and we’ll reach out.
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="card card-soft p-4 h-100">
                <h5 className="mb-3">Send a Message</h5>
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
                      Send
                    </button>
                    <small className="muted">By submitting, you consent to be contacted about your enquiry.</small>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY CTA & FOOTER */}
      <a href="#contact" className="btn btn-accent sticky-cta shadow">
        <i className="bi bi-telephone me-2" />
        Contact
      </a>

      <footer className="py-4 border-top bg-white">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
          <div>© {new Date().getFullYear()} {settings?.siteName || 'Hridmann'}</div>
          <div className="footer-note small">{settings?.footerNote || 'Design & build by Soham Joshi'}</div>
        </div>
      </footer>
    </main>
  )
}
