import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsapInit";

/**
 * Fade-up reveal animation triggered on scroll.
 */
export function useScrollReveal<T extends HTMLElement>(
  options?: { delay?: number; y?: number; duration?: number }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y: options?.y ?? 40 });

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: options?.duration ?? 0.9,
        delay: options?.delay ?? 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [options?.delay, options?.y, options?.duration]);

  return ref;
}

/**
 * Stagger-reveal children of a container on scroll.
 */
export function useStaggerReveal<T extends HTMLElement>(
  childSelector: string,
  options?: { stagger?: number; y?: number }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const children = container.querySelectorAll(childSelector);
      if (children.length === 0) return;

      gsap.set(children, { opacity: 0, y: options?.y ?? 30 });

      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: options?.stagger ?? 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, container);

    return () => ctx.revert();
  }, [childSelector, options?.stagger, options?.y]);

  return ref;
}

/**
 * Horizontal scroll: scroll vertically to move a track horizontally (cinema-style).
 */
export function useHorizontalScroll<T extends HTMLElement>() {
  const sectionRef = useRef<T>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let ctx: gsap.Context;

    // Wait for layout to settle
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const scrollWidth = track.scrollWidth - section.offsetWidth;
        if (scrollWidth <= 0) return;

        gsap.to(track, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 20%",
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }, section);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (ctx) ctx.revert();
    };
  }, []);

  return { sectionRef, trackRef };
}

/**
 * Parallax depth effect on scroll.
 */
export function useParallax<T extends HTMLElement>(speed: number = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

/**
 * Animated number counter that counts up when scrolled into view.
 */
export function useCountUp(
  endValue: number,
  options?: { duration?: number; suffix?: string }
) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };

      gsap.to(obj, {
        val: endValue,
        duration: options?.duration ?? 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (el) {
            el.textContent =
              Math.round(obj.val).toLocaleString() + (options?.suffix ?? "");
          }
        },
      });
    }, el);

    return () => ctx.revert();
  }, [endValue, options?.duration, options?.suffix]);

  return ref;
}

/**
 * Page entrance animation.
 */
export function usePageEntrance<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
