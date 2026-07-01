import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger);

// Set global defaults for a premium feel
gsap.defaults({
  ease: "power3.out",
  duration: 0.8,
});

export { gsap, ScrollTrigger };
