"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Slug = { current?: string };
type Service = { _id?: string; slug?: Slug; title: string };

export default function MobileMenuContent({
  services,
  aboutLabel,
  servicesLabel,
  testimonialsLabel,
  contactLabel,
}: {
  services: Service[];
  aboutLabel: string;
  servicesLabel: string;
  testimonialsLabel: string;
  contactLabel: string;
}) {
  const [open, setOpen] = useState(false);
  // 🔧 li ref must be HTMLLIElement, not HTMLDivElement
  const wrapRef = useRef<HTMLLIElement | null>(null);
  const contentRef = useRef<HTMLUListElement | null>(null);

  // keep aria-expanded in sync for chevron rotation CSS
  useEffect(() => {
    const btn = wrapRef.current?.querySelector<HTMLButtonElement>(
      "[data-accordion='svc']"
    );
    if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
  }, [open]);

  const measuredMax = contentRef.current?.scrollHeight ?? 0;

  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" href="#about" data-bs-dismiss="offcanvas">
          {aboutLabel}
        </Link>
      </li>

      <li className="nav-item" ref={wrapRef}>
        <button
          type="button"
          className="nav-link w-100 d-flex align-items-center justify-content-between btn-toggle"
          data-accordion="svc"
          aria-expanded="false"
          onClick={() => setOpen((v) => !v)}
        >
          <span>{servicesLabel}</span>
          <i className="bi bi-chevron-down collapse-chevron" />
        </button>

        <div
          className="overflow-hidden ps-2"
          style={{
            maxHeight: open ? `${measuredMax}px` : "0px",
            transition: "max-height .28s ease",
          }}
        >
          <ul ref={contentRef} className="list-unstyled mb-2">
            {services.map((s, i) => (
              <li key={s._id ?? s.slug?.current ?? i} className="my-1">
                {s.slug?.current ? (
                  <Link
                    href={`/services/${s.slug.current}`}
                    className="text-decoration-none d-block py-2"
                    data-bs-dismiss="offcanvas"
                  >
                    {s.title}
                  </Link>
                ) : (
                  <span className="d-block py-2">{s.title}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </li>

      <li className="nav-item">
        <Link className="nav-link" href="#testimonials" data-bs-dismiss="offcanvas">
          {testimonialsLabel}
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" href="#contact" data-bs-dismiss="offcanvas">
          {contactLabel}
        </Link>
      </li>
    </ul>
  );
}


// "use client";

// import Link from "next/link";
// import { useEffect, useMemo, useRef, useState } from "react";

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
//   aboutLabel?: string | null;
//   servicesLabel?: string | null;
//   testimonialsLabel?: string | null;
//   contactLabel?: string | null;
// }) {
//   const [open, setOpen] = useState(false);
//   const wrapRef = useRef<HTMLDivElement | null>(null);
//   const contentRef = useRef<HTMLUListElement | null>(null);

//   const maxHeight = useMemo(() => {
//     if (!contentRef.current) return "0px";
//     return `${contentRef.current.scrollHeight}px`;
//   }, [services]);

//   useEffect(() => {
//     const btn = wrapRef.current?.querySelector<HTMLButtonElement>("[data-accordion='svc']");
//     if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
//   }, [open]);

//   const dismissProps = { "data-bs-dismiss": "offcanvas" } as any;

//   return (
//     <ul className="navbar-nav">
//       {aboutLabel && (
//         <li className="nav-item">
//           <Link className="nav-link" href="#about" {...dismissProps}>
//             {aboutLabel}
//           </Link>
//         </li>
//       )}

//       {servicesLabel && (
//         <li className="nav-item" ref={wrapRef}>
//           <button
//             type="button"
//             className="nav-link w-100 d-flex align-items-center justify-content-between btn-toggle"
//             data-accordion="svc"
//             aria-expanded="false"
//             onClick={() => setOpen(v => !v)}
//           >
//             <span>{servicesLabel}</span>
//             <i className="bi bi-chevron-down collapse-chevron" />
//           </button>

//           <div
//             className="overflow-hidden ps-2"
//             style={{ maxHeight: open ? maxHeight : "0px", transition: "max-height .28s ease" }}
//           >
//             <ul ref={contentRef} className="list-unstyled mb-2">
//               {services?.map((s, i) => (
//                 <li key={s._id ?? s.slug?.current ?? i} className="my-1">
//                   {s.slug?.current ? (
//                     <Link
//                       href={`/services/${s.slug.current}`}
//                       className="text-decoration-none d-block py-2"
//                       {...dismissProps}
//                     >
//                       {s.title}
//                     </Link>
//                   ) : (
//                     <span className="d-block py-2">{s.title}</span>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </li>
//       )}

//       {testimonialsLabel && (
//         <li className="nav-item">
//           <Link className="nav-link" href="#testimonials" {...dismissProps}>
//             {testimonialsLabel}
//           </Link>
//         </li>
//       )}

//       {contactLabel && (
//         <li className="nav-item">
//           <Link className="nav-link" href="#contact" {...dismissProps}>
//             {contactLabel}
//           </Link>
//         </li>
//       )}
//     </ul>
//   );
// }
