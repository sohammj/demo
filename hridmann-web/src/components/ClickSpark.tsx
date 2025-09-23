"use client";

import { useEffect, useRef } from "react";

type Props = {
  sparkColor?: string;
  sparkSize?: number;    // px
  sparkRadius?: number;  // px
  sparkCount?: number;
  duration?: number;     // ms
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  extraScale?: number;
};

export default function ClickSpark({
  sparkColor = "#30cbd4",
  sparkSize = 10,
  sparkRadius = 20,
  sparkCount = 12,
  duration = 500,
  easing = "ease-out",
  extraScale = 1.0,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const sparksRef = useRef<Array<{ x: number; y: number; angle: number; start: number }>>([]);
  const rafRef = useRef<number | null>(null);

  const ease = (t: number) => {
    switch (easing) {
      case "linear": return t;
      case "ease-in": return t * t;
      case "ease-in-out": return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default: return t * (2 - t); // ease-out
    }
  };

  const resize = () => {
    const c = canvasRef.current!;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const w = window.innerWidth;
    const h = window.innerHeight;
    c.style.width = `${w}px`;
    c.style.height = `${h}px`;
    c.width = Math.floor(w * dpr);
    c.height = Math.floor(h * dpr);
    ctxRef.current?.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS px
  };

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);
    window.addEventListener("resize", resize);

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      const ctx = ctxRef.current!;
      const c = canvasRef.current!;
      ctx.clearRect(0, 0, c.width, c.height);

      const now = performance.now();
      sparksRef.current = sparksRef.current.filter((s) => {
        const elapsed = now - s.start;
        if (elapsed >= duration) return false;

        const p = ease(elapsed / duration);
        const dist = p * sparkRadius * extraScale;
        const len = sparkSize * (1 - p);

        const x1 = s.x + dist * Math.cos(s.angle);
        const y1 = s.y + dist * Math.sin(s.angle);
        const x2 = s.x + (dist + len) * Math.cos(s.angle);
        const y2 = s.y + (dist + len) * Math.sin(s.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return true;
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    const onPointer = (e: PointerEvent) => {
      if (reduced) return;
      const x = e.clientX;
      const y = e.clientY;
      const start = performance.now();
      for (let i = 0; i < sparkCount; i++) {
        sparksRef.current.push({
          x,
          y,
          angle: (2 * Math.PI * i) / sparkCount + Math.random() * 0.25,
          start,
        });
      }
    };

    document.addEventListener("pointerdown", onPointer, { capture: true, passive: true });

    return () => {
      document.removeEventListener("pointerdown", onPointer, true);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
    // deps intentionally omitted; we only read values captured above
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easing, extraScale]);

  // Fixed, pointerless canvas that does NOT affect layout (out of flow)
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ contain: "layout paint size style", display: "block" }}
    />
  );
}


// import { useRef, useEffect, useCallback } from 'react';

// const ClickSpark = ({
//   sparkColor = '#fff',
//   sparkSize = 10,
//   sparkRadius = 15,
//   sparkCount = 8,
//   duration = 400,
//   easing = 'ease-out',
//   extraScale = 1.0,
//   children
// }) => {
//   const canvasRef = useRef(null);
//   const sparksRef = useRef([]);
//   const startTimeRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const parent = canvas.parentElement;
//     if (!parent) return;

//     let resizeTimeout;

//     const resizeCanvas = () => {
//       const { width, height } = parent.getBoundingClientRect();
//       if (canvas.width !== width || canvas.height !== height) {
//         canvas.width = width;
//         canvas.height = height;
//       }
//     };

//     const handleResize = () => {
//       clearTimeout(resizeTimeout);
//       resizeTimeout = setTimeout(resizeCanvas, 100);
//     };

//     const ro = new ResizeObserver(handleResize);
//     ro.observe(parent);

//     resizeCanvas();

//     return () => {
//       ro.disconnect();
//       clearTimeout(resizeTimeout);
//     };
//   }, []);

//   const easeFunc = useCallback(
//     t => {
//       switch (easing) {
//         case 'linear':
//           return t;
//         case 'ease-in':
//           return t * t;
//         case 'ease-in-out':
//           return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
//         default:
//           return t * (2 - t);
//       }
//     },
//     [easing]
//   );

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');

//     let animationId;

//     const draw = timestamp => {
//       if (!startTimeRef.current) {
//         startTimeRef.current = timestamp;
//       }
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       sparksRef.current = sparksRef.current.filter(spark => {
//         const elapsed = timestamp - spark.startTime;
//         if (elapsed >= duration) {
//           return false;
//         }

//         const progress = elapsed / duration;
//         const eased = easeFunc(progress);

//         const distance = eased * sparkRadius * extraScale;
//         const lineLength = sparkSize * (1 - eased);

//         const x1 = spark.x + distance * Math.cos(spark.angle);
//         const y1 = spark.y + distance * Math.sin(spark.angle);
//         const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
//         const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

//         ctx.strokeStyle = sparkColor;
//         ctx.lineWidth = 2;
//         ctx.beginPath();
//         ctx.moveTo(x1, y1);
//         ctx.lineTo(x2, y2);
//         ctx.stroke();

//         return true;
//       });

//       animationId = requestAnimationFrame(draw);
//     };

//     animationId = requestAnimationFrame(draw);

//     return () => {
//       cancelAnimationFrame(animationId);
//     };
//   }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);

//   const handleClick = e => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const now = performance.now();
//     const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
//       x,
//       y,
//       angle: (2 * Math.PI * i) / sparkCount,
//       startTime: now
//     }));

//     sparksRef.current.push(...newSparks);
//   };

//   return (
//     <div className="relative w-full h-full" onClick={handleClick}>
//       <canvas ref={canvasRef} className="w-full h-full block absolute top-0 left-0 select-none pointer-events-none" />
//       {children}
//     </div>
//   );
// };

// export default ClickSpark;
