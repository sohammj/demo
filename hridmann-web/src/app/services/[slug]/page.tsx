// //









// // src/app/services/[slug]/page.tsx
// import type { Metadata } from 'next'
// import Link from 'next/link'
// import { PortableText } from '@portabletext/react'
// import { sanityClient } from '@/lib/sanity'
// import { SERVICE_BY_SLUG_QUERY, SERVICE_SLUGS_QUERY } from '@/lib/queries'

// type Params = { slug: string }

// type SanityImage = {
//   _key?: string
//   _type?: string
//   asset?: { _ref?: string; url?: string }
// }

// type ServiceDoc = {
//   _id: string
//   title: string
//   description?: string
//   icon?: string
//   slug?: string
//   heroImage?: SanityImage
//   body?: any
//   gallery?: SanityImage[]
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
//   const service = await sanityClient.fetch<ServiceDoc>(SERVICE_BY_SLUG_QUERY, { slug })

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
//     <div className="container py-5">
//       <h1 className="mb-3">{service.title}</h1>
//       {service.description && <p className="text-muted mb-4">{service.description}</p>}

//       {/* Hero image */}
//       {service.heroImage?.asset?.url && (
//         <div className="mb-4">
//           {/* eslint-disable-next-line @next/next/no-img-element */}
//           <img
//             src={service.heroImage.asset.url}
//             alt={service.title}
//             className="w-100 rounded-4"
//           />
//         </div>
//       )}

//       {/* Rich body */}
//       {Array.isArray(service.body) && service.body.length > 0 && (
//         <div className="mb-5">
//           <PortableText value={service.body} />
//         </div>
//       )}

//       {/* Gallery */}
//       {!!(service.gallery?.length) && (
//         <div className="row g-3">
//           {service.gallery
//             .filter(img => !!img?.asset?.url)
//             .map((img, i) => (
//               <div className="col-md-6" key={img._key ?? i}>
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   src={img.asset!.url!}
//                   alt={`${service.title} image ${i + 1}`}
//                   className="w-100 rounded-4"
//                 />
//               </div>
//             ))}
//         </div>
//       )}
//     </div>
//   )
// } // <-- make sure this brace exists






// src/app/services/[slug]/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
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

type SanityImage = {
  _key?: string
  _type?: string
  asset?: { url?: string }
}

type ServiceDoc = {
  _id: string
  title: string
  description?: string
  icon?: string
  slug?: string
  heroImage?: SanityImage
  body?: PortableTextBlock[]
  gallery?: SanityImage[]
}

type Settings = {
  siteName?: string
  contactEmail?: string
  instagram?: string
  footerNote?: string
}

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<{ slug: string }[]>(SERVICE_SLUGS_QUERY)
  return slugs?.map(s => ({ slug: s.slug })) ?? []
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params
  const svc = await sanityClient.fetch<ServiceDoc>(SERVICE_BY_SLUG_QUERY, { slug })
  return {
    title: svc?.title ? `${svc.title} – Services` : 'Service',
    description: svc?.description,
  }
}

export default async function ServicePage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params
  const [service, settings] = await Promise.all([
    sanityClient.fetch<ServiceDoc>(SERVICE_BY_SLUG_QUERY, { slug }),
    sanityClient.fetch<Settings>(SETTINGS_QUERY),
  ])

  if (!service) {
    return (
      <div className="container py-5">
        <h1>Service not found</h1>
        <p className="muted">
          Please check the URL or go back to <Link href="/#services">Services</Link>.
        </p>
      </div>
    )
  }

  return (
    <main>
      {/* NAV (same as Home) */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom py-3 sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-semibold" href="/">
            {settings?.siteName || 'Hridmann'}
          </Link>
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
              <li className="nav-item"><Link className="nav-link" href="/#about">About</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/#services">Services</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/#testimonials">Testimonials</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/#contact">Contact</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <section className="py-5 bg-white border-bottom">
        <div className="container">
          <Link href="/#services" className="btn btn-link p-0 mb-3">
            <i className="bi bi-arrow-left me-1" />
            Back to Services
          </Link>
          <h1 className="fw-semibold mb-2">{service.title}</h1>
          {service.description && <p className="muted mb-0">{service.description}</p>}
        </div>
      </section>

      {/* HERO IMAGE */}
      {service.heroImage?.asset?.url && (
        <div className="container py-4">
          <div className="rounded-4 overflow-hidden">
            {/* Next/Image for perf; falls back if remote loader isn’t configured */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.heroImage.asset.url}
              alt={service.title}
              className="w-100 d-block"
            />
          </div>
        </div>
      )}

      <div className="section-divider" />

      {/* BODY + GALLERY */}
      <section className="section-pad">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              {Array.isArray(service.body) && service.body.length > 0 ? (
                <div className="content-body">
                  <PortableText value={service.body} />
                </div>
              ) : (
                <p className="muted">Details coming soon.</p>
              )}
            </div>

            <div className="col-lg-4">
              <div className="card card-soft p-4">
                <h5 className="mb-3">Interested in {service.title}?</h5>
                <p className="muted mb-4">Let’s discuss your team’s needs.</p>
                <Link href="/#contact" className="btn btn-accent w-100">
                  <i className="bi bi-telephone me-2" />
                  Get in Touch
                </Link>

                {/* Optional quick links */}
                <div className="divider my-4" />
                <ul className="list-unstyled small mb-0">
                  <li className="mb-2">
                    <Link className="text-decoration-none" href="/#testimonials">
                      <i className="bi bi-chat-quote me-2" />
                      Read testimonials
                    </Link>
                  </li>
                  <li>
                    <Link className="text-decoration-none" href="/#services">
                      <i className="bi bi-grid-3x3-gap me-2" />
                      Explore all services
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {!!(service.gallery?.length) && (
            <>
              <div className="divider my-5" />
              <div className="row g-3">
                {service.gallery
                  .filter(img => !!img?.asset?.url)
                  .map((img, i) => (
                    <div className="col-sm-6 col-lg-4" key={img._key ?? i}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.asset!.url!}
                        alt={`${service.title} image ${i + 1}`}
                        className="w-100 rounded-4"
                      />
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* STICKY CTA (same component used on Home) */}
      <Link href="/#contact" className="btn btn-accent sticky-cta shadow">
        <i className="bi bi-telephone me-2" />
        Contact
      </Link>

      {/* FOOTER (same as Home) */}
      <footer className="py-4 border-top bg-white">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
          <div>© {new Date().getFullYear()} {settings?.siteName || 'Hridmann'}</div>
          <div className="footer-note small">{settings?.footerNote || 'Design & build by Soham Joshi'}</div>
        </div>
      </footer>
    </main>
  )
}
