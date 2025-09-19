// src/components/HeroCarousel.tsx
"use client";
import Image from "next/image";
import { urlFor } from "@/lib/image";

// ✅ Define strict types instead of `any`
type SanityImageRef =
  | { asset?: { _ref?: string | null } }
  | { asset?: { url?: string | null } };

export type HeroSlide = {
  image?: SanityImageRef;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
};

export default function HeroCarousel({ slides }: { slides?: HeroSlide[] }) {
  if (!slides?.length) return null;

  return (
    <div id="hero" className="carousel slide mb-4" data-bs-ride="carousel">
      <div className="carousel-inner rounded-4 shadow-sm">
        {slides.map((s, i) => (
          <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={i}>
            {s?.image && (
              <Image
                src={urlFor(s.image).width(1600).height(700).fit("crop").url()}
                alt={s?.title || "Slide"}
                width={1600}
                height={700}
                priority={i === 0}
                className="w-100 d-block"
              />
            )}
            {(s?.title || s?.subtitle) && (
              <div className="carousel-caption text-start">
                {s.title && <h2 className="fw-semibold">{s.title}</h2>}
                {s.subtitle && <p className="lead">{s.subtitle}</p>}
                {s.ctaHref && (
                  <a href={s.ctaHref} className="btn btn-primary btn-sm">
                    {s.ctaText || "Learn more"}
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#hero"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#hero"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
