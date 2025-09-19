"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
  useEffect(() => {
    // Scale/fade in each service card as it enters
    gsap.utils.toArray<HTMLElement>("#services .card").forEach((card) => {
      gsap.from(card, {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Horizontal swipe for testimonials (pin section, scrub x)
    // We target the inner track so layout stays intact.
    const track = document.querySelector<HTMLElement>("#testimonials .testimonials-track");
    if (track) {
      gsap.to(track, {
        xPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: "#testimonials",
          start: "top top",
          end: () => "+=" + (track.scrollWidth - window.innerWidth), // dynamic width
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
    }
  }, []);

  return null;
}
