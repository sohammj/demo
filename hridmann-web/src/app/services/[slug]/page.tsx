// // src/app/services/[slug]/page.tsx
// import type { Metadata } from 'next'
// import Image from 'next/image'
// import Link from 'next/link'
// import { PortableText } from '@portabletext/react'
// import { sanityClient } from '@/lib/sanity'
// import {
//   SERVICE_BY_SLUG_QUERY,
//   SERVICE_SLUGS_QUERY,
//   SETTINGS_QUERY,
// } from '@/lib/queries'

// import type { PortableTextBlock } from 'sanity'

// type Params = { slug: string }

// type SanityImage = {
//   _key?: string
//   _type?: string
//   asset?: { url?: string }
// }

// type ServiceDoc = {
//   _id: string
//   title: string
//   description?: string
//   icon?: string
//   slug?: string
//   heroImage?: SanityImage
//   body?: PortableTextBlock[]
//   gallery?: SanityImage[]
// }

// type Settings = {
//   siteName?: string
//   contactEmail?: string
//   instagram?: string
//   footerNote?: string
// }

// export async function generateStaticParams() {
//   const slugs = await sanityClient.fetch<{ slug: string }[]>(SERVICE_SLUGS_QUERY)
//   return slugs?.map(s => ({ slug: s.slug })) ?? []
// }

// export async function generateMetadata(
//   { params }: { params: Promise<Params> }
// ): Promise<Metadata> {
//   const { slug } = await params
//   const svc = await sanityClient.fetch<ServiceDoc>(SERVICE_BY_SLUG_QUERY, { slug })
//   return {
//     title: svc?.title ? `${svc.title} – Services` : 'Service',
//     description: svc?.description,
//   }
// }

// export default async function ServicePage(
//   { params }: { params: Promise<Params> }
// ) {
//   const { slug } = await params
//   const [service, settings] = await Promise.all([
//     sanityClient.fetch<ServiceDoc>(SERVICE_BY_SLUG_QUERY, { slug }),
//     sanityClient.fetch<Settings>(SETTINGS_QUERY),
//   ])

//   if (!service) {
//     return (
//       <div className="container py-5">
//         <h1>Service not found</h1>
//         <p className="muted">
//           Please check the URL or go back to <Link href="/#services">Services</Link>.
//         </p>
//       </div>
//     )
//   }

//   return (
//     <main>
//       {/* NAV (same as Home) */}
//       <nav className="navbar navbar-expand-lg bg-white border-bottom py-3 sticky-top">
//         <div className="container">
//           <Link className="navbar-brand fw-semibold" href="/">
//             {settings?.siteName || 'Hridmann'}
//           </Link>
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
//               <li className="nav-item"><Link className="nav-link" href="/#about">About</Link></li>
//               <li className="nav-item"><Link className="nav-link" href="/#services">Services</Link></li>
//               <li className="nav-item"><Link className="nav-link" href="/#testimonials">Testimonials</Link></li>
//               <li className="nav-item"><Link className="nav-link" href="/#contact">Contact</Link></li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* HEADER */}
//       <section className="py-5 bg-white border-bottom">
//         <div className="container">
//           <Link href="/#services" className="btn btn-link p-0 mb-3">
//             <i className="bi bi-arrow-left me-1" />
//             Back to Services
//           </Link>
//           <h1 className="fw-semibold mb-2">{service.title}</h1>
//           {service.description && <p className="muted mb-0">{service.description}</p>}
//         </div>
//       </section>

//       {/* HERO IMAGE */}
//       {service.heroImage?.asset?.url && (
//         <div className="container py-4">
//           <div className="rounded-4 overflow-hidden">
//             {/* Next/Image for perf; falls back if remote loader isn’t configured */}
//             {/* eslint-disable-next-line @next/next/no-img-element */}
//             <img
//               src={service.heroImage.asset.url}
//               alt={service.title}
//               className="w-100 d-block"
//             />
//           </div>
//         </div>
//       )}

//       <div className="section-divider" />

//       {/* BODY + GALLERY */}
//       <section className="section-pad">
//         <div className="container">
//           <div className="row g-5">
//             <div className="col-lg-8">
//               {Array.isArray(service.body) && service.body.length > 0 ? (
//                 <div className="content-body">
//                   <PortableText value={service.body} />
//                 </div>
//               ) : (
//                 <p className="muted">Details coming soon.</p>
//               )}
//             </div>

//             <div className="col-lg-4">
//               <div className="card card-soft p-4">
//                 <h5 className="mb-3">Interested in {service.title}?</h5>
//                 <p className="muted mb-4">Let’s discuss your team’s needs.</p>
//                 <Link href="/#contact" className="btn btn-accent w-100">
//                   <i className="bi bi-telephone me-2" />
//                   Get in Touch
//                 </Link>

//                 {/* Optional quick links */}
//                 <div className="divider my-4" />
//                 <ul className="list-unstyled small mb-0">
//                   <li className="mb-2">
//                     <Link className="text-decoration-none" href="/#testimonials">
//                       <i className="bi bi-chat-quote me-2" />
//                       Read testimonials
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="text-decoration-none" href="/#services">
//                       <i className="bi bi-grid-3x3-gap me-2" />
//                       Explore all services
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {!!(service.gallery?.length) && (
//             <>
//               <div className="divider my-5" />
//               <div className="row g-3">
//                 {service.gallery
//                   .filter(img => !!img?.asset?.url)
//                   .map((img, i) => (
//                     <div className="col-sm-6 col-lg-4" key={img._key ?? i}>
//                       {/* eslint-disable-next-line @next/next/no-img-element */}
//                       <img
//                         src={img.asset!.url!}
//                         alt={`${service.title} image ${i + 1}`}
//                         className="w-100 rounded-4"
//                       />
//                     </div>
//                   ))}
//               </div>
//             </>
//           )}
//         </div>
//       </section>

//       {/* STICKY CTA (same component used on Home) */}
//       <Link href="/#contact" className="btn btn-accent sticky-cta shadow">
//         <i className="bi bi-telephone me-2" />
//         Contact
//       </Link>

//       {/* FOOTER (same as Home) */}
//       <footer className="py-4 border-top bg-white">
//         <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
//           <div>© {new Date().getFullYear()} {settings?.siteName || 'Hridmann'}</div>
//           <div className="footer-note small">{settings?.footerNote || 'Design & build by Soham Joshi'}</div>
//         </div>
//       </footer>
//     </main>
//   )
// }























































// import type { Metadata } from 'next'
// import Link from 'next/link'
// import { PortableText } from '@portabletext/react'
// import { sanityClient } from '@/lib/sanity'
// import {
//   SERVICE_BY_SLUG_QUERY,
//   SERVICE_SLUGS_QUERY,
//   SETTINGS_QUERY,
// } from '@/lib/queries'
// import type { PortableTextBlock } from 'sanity'

// type Params = { slug: string }

// type SanityImage = {
//   _key?: string
//   _type?: string
//   asset?: { url?: string }
// }

// type QuickFact = { _key?: string; label: string; value: string }
// type AgendaItem = { _key?: string; title: string; duration?: string }
// type RelatedRef = { _key?: string; title?: string; slug?: { current?: string } }

// type ServiceDoc = {
//   _id: string
//   title: string
//   description?: string
//   icon?: string
//   slug?: { current?: string }
//   badge?: string
//   heroImage?: SanityImage
//   body?: PortableTextBlock[]
//   gallery?: SanityImage[]
//   outcomes?: string[]
//   agenda?: AgendaItem[]
//   quickFacts?: QuickFact[]
//   related?: RelatedRef[]
// }

// type Settings = {
//   siteName?: string
//   contactEmail?: string
//   instagram?: string
//   footerNote?: string
// }

// export async function generateStaticParams() {
//   const slugs = await sanityClient.fetch<{ slug: string }[]>(SERVICE_SLUGS_QUERY)
//   return slugs?.map((s) => ({ slug: s.slug })) ?? []
// }

// export async function generateMetadata(
//   { params }: { params: Params }           // ✅ not a Promise
// ): Promise<Metadata> {
//   const svc = await sanityClient.fetch<ServiceDoc>(SERVICE_BY_SLUG_QUERY, {
//     slug: params.slug,
//   })
//   return {
//     title: svc?.title ? `${svc.title} – Services` : 'Service',
//     description: svc?.description,
//   }
// }

// export default async function ServicePage({ params }: { params: Params }) {
//   const { slug } = params
//   const [service, settings] = await Promise.all([
//     sanityClient.fetch<ServiceDoc>(SERVICE_BY_SLUG_QUERY, { slug }),
//     sanityClient.fetch<Settings>(SETTINGS_QUERY),
//   ])

//   if (!service) {
//     return (
//       <div className="container py-5">
//         <h1>Service not found</h1>
//         <p className="text-muted">
//           Please check the URL or go back to <Link href="/#services">Services</Link>.
//         </p>
//       </div>
//     )
//   }

//   const related = (service.related || []).filter(r => r?.slug?.current)

//   return (
//     <main>
//       {/* NAV */}
//       <nav className="navbar navbar-expand-lg bg-white border-bottom py-3 sticky-top">
//         <div className="container">
//           <Link className="navbar-brand fw-semibold" href="/">
//             {settings?.siteName || 'Hridmann'}
//           </Link>
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
//               <li className="nav-item"><Link className="nav-link" href="/#about">About</Link></li>
//               <li className="nav-item"><Link className="nav-link" href="/#services">Services</Link></li>
//               <li className="nav-item"><Link className="nav-link" href="/#testimonials">Testimonials</Link></li>
//               <li className="nav-item"><Link className="nav-link" href="/#contact">Contact</Link></li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* HERO */}
//       <section className="bg-light py-5 border-bottom">
//         <div className="container">
//           <div className="d-flex align-items-center gap-2 mb-3">
//             <Link href="/#services" className="btn btn-outline-secondary btn-sm">
//               ← Back to Services
//             </Link>
//             <nav aria-label="breadcrumb">
//               <ol className="breadcrumb mb-0">
//                 <li className="breadcrumb-item"><Link href="/">Home</Link></li>
//                 <li className="breadcrumb-item"><Link href="/#services">Services</Link></li>
//                 <li className="breadcrumb-item active" aria-current="page">{service.title}</li>
//               </ol>
//             </nav>
//           </div>

//           <div className="row align-items-center g-4">
//             <div className="col-lg-6">
//               {service.badge && (
//                 <span className="badge text-bg-dark rounded-pill">{service.badge}</span>
//               )}
//               <h1 className="display-5 mt-3 mb-2">{service.title}</h1>
//               {service.description && (
//                 <p className="lead text-secondary">{service.description}</p>
//               )}
//               <div className="d-flex gap-2 mt-3">
//                 <Link href="/#contact" className="btn btn-primary">Book a discovery call</Link>
//                 <Link href="/#testimonials" className="btn btn-outline-primary">Read testimonials</Link>
//               </div>
//             </div>

//             <div className="col-lg-6">
//               {service.heroImage?.asset?.url && (
//                 <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow-sm">
//                   {/* eslint-disable-next-line @next/next/no-img-element */}
//                   <img
//                     src={service.heroImage.asset.url}
//                     alt={service.title}
//                     className="w-100 h-100 object-fit-cover"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* BODY */}
//       <section className="py-5">
//         <div className="container">
//           <div className="row g-5">
//             {/* Main content */}
//             <div className="col-lg-8">
//               {!!service.outcomes?.length && (
//                 <div className="mb-5">
//                   <h2 className="h3 mb-3">What you’ll get</h2>
//                   <ul className="list-unstyled">
//                     {service.outcomes.map((item, idx) => (
//                       <li key={`outcome-${idx}`} className="d-flex align-items-start gap-2 mb-2">
//                         <i className="bi bi-check2-circle fs-5 mt-1" />
//                         <span>{item}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {!!service.agenda?.length && (
//                 <div className="mb-5">
//                   <h2 className="h3 mb-3">Agenda</h2>
//                   <ol className="ps-3">
//                     {service.agenda.map((step) => (
//                       <li key={step._key || `${step.title}-${step.duration || 'x'}`} className="mb-2">
//                         <strong>{step.title}</strong>
//                         {step.duration ? <> <span className="text-muted">({step.duration})</span></> : null}
//                       </li>
//                     ))}
//                   </ol>
//                 </div>
//               )}

//               {Array.isArray(service.body) && service.body.length > 0 ? (
//                 <div className="mb-5">
//                   <h2 className="h3 mb-3">Overview</h2>
//                   <PortableText value={service.body} />
//                 </div>
//               ) : null}

//               <div className="alert alert-primary-subtle border rounded-4 py-3 px-4 mb-5 d-flex flex-column flex-md-row align-items-md-center justify-content-between">
//                 <span className="mb-2 mb-md-0">Ready for a focused session and a 30-day action plan?</span>
//                 <Link href="/#contact" className="btn btn-primary">Talk to us</Link>
//               </div>

//               {!!service.gallery?.length && (
//                 <div className="mb-2">
//                   <div className="row g-3">
//                     {service.gallery
//                       .filter((img) => !!img?.asset?.url)
//                       .map((img, i) => {
//                         const key = img._key || `${img.asset?.url}-${i}`
//                         return (
//                           <div className="col-sm-6 col-lg-4" key={key}>
//                             {/* eslint-disable-next-line @next/next/no-img-element */}
//                             <img
//                               src={img.asset!.url!}
//                               alt={`${service.title} image ${i + 1}`}
//                               className="w-100 rounded-4"
//                             />
//                           </div>
//                         )
//                       })}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Sidebar */}
//             <aside className="col-lg-4">
//               <div className="position-sticky" style={{ top: '96px' }}>
//                 <div className="card shadow-sm rounded-4">
//                   <div className="card-body">
//                     <h3 className="h5 mb-3">Quick facts</h3>
//                     {!!service.quickFacts?.length ? (
//                       <ul className="list-unstyled small mb-4">
//                         {service.quickFacts.map((f) => (
//                           <li
//                             key={f._key || `${f.label}-${f.value}`}
//                             className="d-flex justify-content-between border-bottom py-2"
//                           >
//                             <span>{f.label}</span>
//                             <strong>{f.value}</strong>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p className="text-muted small">Let’s tailor this to your team.</p>
//                     )}
//                     <Link href="/#contact" className="btn btn-primary w-100">Get a custom quote</Link>
//                     <Link href="/#testimonials" className="btn btn-link w-100 mt-2">Read testimonials →</Link>
//                   </div>
//                 </div>
//               </div>
//             </aside>
//           </div>
//         </div>
//       </section>

//       {/* Related */}
//       {!!related.length && (
//         <section className="py-5 bg-body-tertiary border-top" aria-labelledby="related">
//           <div className="container">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h2 id="related" className="h4 mb-0">Related services</h2>
//               <Link href="/#services" className="btn btn-sm btn-outline-secondary">Explore all</Link>
//             </div>
//             <div className="row g-4">
//               {related.map((r) => {
//                 const href = `/services/${r.slug!.current!}`
//                 const key = r._key || r.slug!.current!
//                 return (
//                   <div className="col-md-4" key={key}>
//                     <Link className="card h-100 text-decoration-none rounded-4" href={href}>
//                       <div className="card-body p-4">
//                         <h3 className="h5 mb-1">{r.title || 'Service'}</h3>
//                         <p className="text-secondary small mb-0">Learn more →</p>
//                       </div>
//                     </Link>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Footer */}
//       <footer className="py-4 border-top bg-white">
//         <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
//           <div>© {new Date().getFullYear()} {settings?.siteName || 'Hridmann'}</div>
//           <div className="footer-note small">{settings?.footerNote || 'Design & build by Soham Joshi'}</div>
//         </div>
//       </footer>
//     </main>
//   )
// }






// src/app/services/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { sanityClient } from '@/lib/sanity'
import {
  SERVICE_BY_SLUG_QUERY,
  SERVICE_SLUGS_QUERY,
  SETTINGS_QUERY,
} from '@/lib/queries'
import type { PortableTextBlock } from 'sanity'

type Params = { slug: string }

type SanityImage = { _key?: string; _type?: string; asset?: { url?: string } }
type QuickFact = { _key?: string; label: string; value: string }
type AgendaItem = { _key?: string; title: string; duration?: string }
type RelatedRef = { _key?: string; title?: string; slug?: { current?: string } }

type ServiceDoc = {
  _id: string
  title: string
  description?: string
  icon?: string
  slug?: { current?: string }
  badge?: string
  heroImage?: SanityImage
  body?: PortableTextBlock[]
  gallery?: SanityImage[]
  outcomes?: string[]
  agenda?: AgendaItem[]
  quickFacts?: QuickFact[]
  related?: RelatedRef[]
}

type Settings = {
  siteName?: string
  contactEmail?: string
  instagram?: string
  footerNote?: string
}

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<{ slug: string }[]>(SERVICE_SLUGS_QUERY)
  return slugs?.map((s) => ({ slug: s.slug })) ?? []
}

export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {
  const svc = await sanityClient.fetch<ServiceDoc>(SERVICE_BY_SLUG_QUERY, {
    slug: params.slug,
  })
  return {
    title: svc?.title ? `${svc.title} – Services` : 'Service',
    description: svc?.description,
  }
}

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = params
  const [service, settings] = await Promise.all([
    sanityClient.fetch<ServiceDoc>(SERVICE_BY_SLUG_QUERY, { slug }),
    sanityClient.fetch<Settings>(SETTINGS_QUERY),
  ])

  if (!service) {
    return (
      <div className="container py-5">
        <h1>Service not found</h1>
        <p className="text-muted">
          Please check the URL or go back to <Link href="/#services">Services</Link>.
        </p>
      </div>
    )
  }

  const related = (service.related || []).filter(r => r?.slug?.current)

  return (
    <main>
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

      {/* HERO (no breadcrumb/back) */}
      <section className="bg-light py-5 border-bottom">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              {service.badge && (
                <span className="badge text-bg-dark rounded-pill">{service.badge}</span>
              )}
              <h1 className="display-5 mt-3 mb-2">{service.title}</h1>
              {service.description && (
                <p className="lead text-secondary">{service.description}</p>
              )}
              <div className="d-flex gap-2 mt-3">
                <a href="#contact" className="btn btn-primary">
                  Book a discovery call
                </a>
                <a href="/#testimonials" className="btn btn-outline-primary">
                  Read testimonials
                </a>
              </div>

            </div>

            <div className="col-lg-6">
              {service.heroImage?.asset?.url && (
                <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.heroImage.asset.url}
                    alt={service.title}
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* Main content */}
            <div className="col-lg-8">

              {Array.isArray(service.body) && service.body.length > 0 ? (
                  <div className="mb-5">
                    <h2 className="h3 mb-3">Overview</h2>
                    <PortableText value={service.body} />
                  </div>
              ) : null}


              {!!service.agenda?.length && (
                <div className="mb-5">
                  <h2 className="h3 mb-3">Agenda</h2>
                  <ol className="ps-3">
                    {service.agenda.map((step) => (
                      <li key={step._key || `${step.title}-${step.duration || 'x'}`} className="mb-2">
                        <strong>{step.title}</strong>
                        {step.duration ? <> <span className="text-muted">({step.duration})</span></> : null}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {!!service.outcomes?.length && (
                <div className="mb-5">
                  <h2 className="h3 mb-3">What you’ll get</h2>
                  <ul className="list-unstyled">
                    {service.outcomes.map((item, idx) => (
                      <li key={`outcome-${idx}`} className="d-flex align-items-start gap-2 mb-2">
                        <i className="bi bi-check2-circle fs-5 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}



              {/* Gallery */}
              {!!service.gallery?.length && (
                <div className="mb-2">
                  <div className="row g-3">
                    {service.gallery
                      .filter((img) => !!img?.asset?.url)
                      .map((img, i) => {
                        const key = img._key || `${img.asset?.url}-${i}`
                        return (
                          <div className="col-sm-6 col-lg-4" key={key}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={img.asset!.url!}
                              alt={`${service.title} image ${i + 1}`}
                              className="w-100 rounded-4"
                            />
                          </div>
                        )
                      })}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="col-lg-4">
              <div className="position-sticky" style={{ top: '96px' }}>
                <div className="card shadow-sm rounded-4">
                  <div className="card-body">
                    <h3 className="h5 mb-3">Quick facts</h3>
                    {!!service.quickFacts?.length ? (
                      <ul className="list-unstyled small mb-4">
                        {service.quickFacts.map((f) => (
                          <li
                            key={f._key || `${f.label}-${f.value}`}
                            className="d-flex justify-content-between border-bottom py-2"
                          >
                            <span>{f.label}</span>
                            <strong>{f.value}</strong>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted small">Let’s tailor this to your team.</p>
                    )}
                    {/* <a href="#contact" className="btn btn-primary w-100">Get a custom quote</a>
                    <a href="/#testimonials" className="btn btn-outline-primary">
                      Read testimonials
                    </a> */}
                    <a href="#contact" className="btn btn-primary w-100 mb-2">
                      Get a custom quote
                    </a>
                    <a href="/#testimonials" className="btn btn-outline-primary w-100">
                      Read testimonials
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related */}
      {!!related.length && (
        <section className="py-5 bg-body-tertiary border-top" aria-labelledby="related">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 id="related" className="h4 mb-0">Related services</h2>
              <a href="#contact" className="btn btn-sm btn-outline-secondary">Contact us</a>
            </div>
            <div className="row g-4">
              {related.map((r) => {
                const href = `/services/${r.slug!.current!}`
                const key = r._key || r.slug!.current!
                return (
                  <div className="col-md-4" key={key}>
                    <Link className="card h-100 text-decoration-none rounded-4" href={href}>
                      <div className="card-body p-4">
                        <h3 className="h5 mb-1">{r.title || 'Service'}</h3>
                        <p className="text-secondary small mb-0">Learn more →</p>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT WIDGET (on this page) */}
      <section id="contact" className="py-5 bg-light border-top">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card rounded-4 shadow-sm h-100">
                <div className="card-body">
                  <h2 className="h3 mb-3">Get in Touch</h2>
                  <p className="mb-3">
                    Prefer a quick call? Drop a message with your number and we’ll reach out.
                  </p>
                  <p className="mb-2">
                    <i className="bi bi-envelope me-2" />
                    <a href={`mailto:${settings?.contactEmail || 'harshana.hridmann@gmail.com'}`}>
                      {settings?.contactEmail || 'harshana.hridmann@gmail.com'}
                    </a>
                  </p>
                  {settings?.instagram && (
                    <p className="mb-0">
                      <i className="bi bi-instagram me-2" />
                      <a href={settings.instagram} target="_blank">@hridmann</a>
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card rounded-4 shadow-sm h-100">
                <div className="card-body">
                  <h2 className="h5 mb-3">Send a Message</h2>
                  <form action="https://formspree.io/f/your-endpoint" method="POST">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input id="name" name="name" className="form-control" placeholder="Your full name" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input id="email" name="email" type="email" className="form-control" placeholder="you@example.com" required />
                      </div>
                      <div className="col-12">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea id="message" name="message" className="form-control" rows={5} placeholder="How can we help?" required />
                      </div>
                      <div className="col-12 d-flex align-items-center gap-3">
                        <button type="submit" className="btn btn-primary">Send</button>
                        <small className="text-muted">
                          By submitting, you consent to be contacted about your enquiry.
                        </small>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 border-top bg-white">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
          <div>© {new Date().getFullYear()} {settings?.siteName || 'Hridmann'}</div>
          <div className="footer-note small">{settings?.footerNote || 'Design & build by Soham Joshi'}</div>
        </div>
      </footer>
    </main>
  )
}
