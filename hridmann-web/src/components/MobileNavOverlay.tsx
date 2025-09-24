"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type Slug = { current?: string };
type Service = { _id?: string; slug?: Slug; title: string };

const HEADER_OFFSET = 96; // adjust if your sticky header is taller

export default function MobileNavOverlay({
  services,
  brand = "Hridmann",
}: {
  services: Service[];
  brand?: string;
}) {
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const svcListRef = useRef<HTMLUListElement | null>(null);

  // lock background scroll when menu is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // close overlay whenever the route changes
  useEffect(() => { setOpen(false); }, [pathname]);

  // smooth scroll helper for in-page anchors
  const goToHash = (hash: string) => {
    const el = document.querySelector(hash) as HTMLElement | null;
    if (!el) return;
    // Close first to feel snappy
    setOpen(false);
    // scroll after animation starts
    setTimeout(() => {
      const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 120);
  };

  // // click handlers
  // const handleAnchor = (e: React.MouseEvent, hash: string) => {
  //   e.preventDefault();
  //   // if we’re already on the homepage, do a smooth in-page scroll
  //   if (pathname === "/") {
  //     goToHash(hash);
  //   } else {
  //     // navigate home with hash, then scroll after route paint
  //     router.push("/" + hash);
  //     // Next will land at the hash; this timeout just ensures header-offset
  //     setTimeout(() => goToHash(hash), 200);
  //   }
  // };



  // replace handleAnchor with:
  const handleAnchor = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    const el = document.querySelector(hash) as HTMLElement | null;

    if (el) {
      // element exists on current page -> smooth local scroll
      goToHash(hash);
    } else {
      // not on this page -> go home then adjust for header
      setOpen(false);
      router.push("/" + hash);
      setTimeout(() => goToHash(hash), 200);
    }
  };

  const handleServiceClick = (slug?: string) => {
    if (!slug) return;
    setOpen(false);
    router.push(`/services/${slug}`);
  };

  const svcMaxHeight = svcListRef.current?.scrollHeight ?? 0;

  return (
    <>
      {/* the hamburger button (mobile only) */}
      <button
        className="navbar-toggler d-lg-none border-0"
        type="button"
        aria-controls="mobileOverlay"
        aria-expanded={open}
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* overlay */}
      <div
        id="mobileOverlay"
        aria-hidden={!open}
        className={`mobile-overlay${open ? " open" : ""}`}
      >
        <div className="mobile-overlay__header">
          <div className="mobile-overlay__brand">{brand}</div>
          <button
            className="btn-close"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />
        </div>

        <div className="mobile-overlay__body">
          <ul className="list-unstyled m-0">
            <li className="mo-item">
              <a
                href="#about"
                className="mo-link"
                onClick={(e) => handleAnchor(e, "#about")}
              >
                About
              </a>
            </li>

            <li className="mo-item">
              <button
                type="button"
                className="mo-link mo-toggle d-flex align-items-center justify-content-between w-100"
                aria-expanded={svcOpen}
                onClick={() => setSvcOpen((v) => !v)}
              >
                <span>Services</span>
                <i className="bi bi-chevron-down mo-chevron" />
              </button>

              <div
                className="overflow-hidden ps-2"
                style={{
                  maxHeight: svcOpen ? `${svcMaxHeight}px` : "0px",
                  transition: "max-height .25s ease",
                }}
              >
                <ul ref={svcListRef} className="list-unstyled mb-2">
                  {services?.map((s, i) => (
                    <li key={s._id ?? s.slug?.current ?? i} className="my-1">
                      <button
                        type="button"
                        className="mo-sublink"
                        onClick={() => handleServiceClick(s.slug?.current)}
                      >
                        {s.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li className="mo-item">
              <a
                href="#testimonials"
                className="mo-link"
                onClick={(e) => handleAnchor(e, "#testimonials")}
              >
                Testimonials
              </a>
            </li>

            <li className="mo-item">
              <a
                href="#contact"
                className="mo-link"
                onClick={(e) => handleAnchor(e, "#contact")}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}


// working offcanavs
//"use client";

// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";

// type Slug = { current?: string };
// type Service = { _id?: string; slug?: Slug; title: string };

// export default function MobileMenuContent({
//   services,
//   aboutLabel,
//   servicesLabel,
//   testimonialsLabel,
//   contactLabel,
// }: {
//   services: Service[];
//   aboutLabel: string;
//   servicesLabel: string;
//   testimonialsLabel: string;
//   contactLabel: string;
// }) {
//   const [open, setOpen] = useState(false);
//   // 🔧 li ref must be HTMLLIElement, not HTMLDivElement
//   const wrapRef = useRef<HTMLLIElement | null>(null);
//   const contentRef = useRef<HTMLUListElement | null>(null);

//   // keep aria-expanded in sync for chevron rotation CSS
//   useEffect(() => {
//     const btn = wrapRef.current?.querySelector<HTMLButtonElement>(
//       "[data-accordion='svc']"
//     );
//     if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
//   }, [open]);

//   const measuredMax = contentRef.current?.scrollHeight ?? 0;

//   return (
//     <ul className="navbar-nav">
//       <li className="nav-item">
//         <Link className="nav-link" href="#about" data-bs-dismiss="offcanvas">
//           {aboutLabel}
//         </Link>
//       </li>

//       <li className="nav-item" ref={wrapRef}>
//         <button
//           type="button"
//           className="nav-link w-100 d-flex align-items-center justify-content-between btn-toggle"
//           data-accordion="svc"
//           aria-expanded="false"
//           onClick={() => setOpen((v) => !v)}
//         >
//           <span>{servicesLabel}</span>
//           <i className="bi bi-chevron-down collapse-chevron" />
//         </button>

//         <div
//           className="overflow-hidden ps-2"
//           style={{
//             maxHeight: open ? `${measuredMax}px` : "0px",
//             transition: "max-height .28s ease",
//           }}
//         >
//           <ul ref={contentRef} className="list-unstyled mb-2">
//             {services.map((s, i) => (
//               <li key={s._id ?? s.slug?.current ?? i} className="my-1">
//                 {s.slug?.current ? (
//                   <Link
//                     href={`/services/${s.slug.current}`}
//                     className="text-decoration-none d-block py-2"
//                     data-bs-dismiss="offcanvas"
//                   >
//                     {s.title}
//                   </Link>
//                 ) : (
//                   <span className="d-block py-2">{s.title}</span>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </li>

//       <li className="nav-item">
//         <Link className="nav-link" href="#testimonials" data-bs-dismiss="offcanvas">
//           {testimonialsLabel}
//         </Link>
//       </li>

//       <li className="nav-item">
//         <Link className="nav-link" href="#contact" data-bs-dismiss="offcanvas">
//           {contactLabel}
//         </Link>
//       </li>
//     </ul>
//   );
// }
