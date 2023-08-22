import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./vendor/gsap/SplitText";

import { ANIMATION_START } from "./constants";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function about() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".about"));

  elements.forEach((element) => {
    const heading = element.querySelector<HTMLElement>(".about__small-heading");
    const largeText = element.querySelector<HTMLElement>(".about__large-text");
    const bottomRow = element.querySelector<HTMLElement>(".about__bottom-row");
    const parallaxWrapper = element.querySelector<HTMLElement>(
      ".about__parallax-wrapper"
    );

    const childLines = new SplitText(largeText, {
      type: "lines",
      linesClass: "lineChild",
    }).lines;
    const parentLines = new SplitText(largeText, {
      type: "lines",
      linesClass: "lineParent",
    }).lines;

    gsap.set(parentLines, {
      overflow: "hidden",
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: ANIMATION_START,
      },
    });

    tl.fromTo(
      heading,
      {
        autoAlpha: 0,
        y: 30,
      },
      {
        autoAlpha: 1,
        duration: 0.4,
        y: 0,
        ease: "power1.out",
      }
    );

    tl.fromTo(
      childLines,
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
        duration: 1,
        stagger: 0.1,
      },
      "<"
    );

    tl.fromTo(
      bottomRow,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out",
      }
    );

    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    parallaxTimeline.to(parallaxWrapper, {
      yPercent: 20,
      duration: 1,
      ease: "linear",
    });
  });
}
