<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import IMenu from "./features/IMenu.svelte";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import LocomotiveScroll from "locomotive-scroll";
  import "locomotive-scroll/dist/locomotive-scroll.css";
  import Industry from "./features/Industry.svelte";
  import IFooter from "./features/IFooter.svelte";
  
  gsap.registerPlugin(ScrollTrigger);
  onMount(() => {
    const sections = document.querySelectorAll("[data-section]");
    // Initialize locomotive scroll
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]") as HTMLElement,
      smooth: true,
      lerp: 0.25, // Increased for smoother transitions
      inertia: 0.8, // Added inertia effect
      getDirection: true,
      multiplier: 0.8, // Reduced for more controlled speed
      class: "is-reveal",
      smoothMobile: true, // Enable smooth scrolling on mobile
    });

    // Update ScrollTrigger when locomotive updates
    document.addEventListener("scroll", () => {
      ScrollTrigger.update();
    });

    // Sync ScrollTrigger with locomotive
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
          : locoScroll.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
    sections.forEach((sec) => {
      gsap.to(sec, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
          markers: true, // For debugging (can remove later)
        },
      });
    });
    // Clean up
    return () => {
      locoScroll.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  });
</script>

<div data-scroll-container>
  <IMenu />
  <section
    data-section
    data-scroll-section
    class="flex items-center justify-center h-screen bg-rose-200"
  >
    <Industry />
  </section>

  <section
    data-section
    data-scroll-section
    class="flex items-center justify-center h-screen bg-sky-200"
  >
    <h1 class="text-6xl font-bold">Screen 2</h1>
  </section>
  <section
          data-section
          data-scroll-section
          class="flex items-center justify-center h-screen bg-sky-200"
  >
    <h1 class="text-6xl font-bold">Screen 2</h1>
  </section>

  <section
    data-section
    data-scroll-section
    class="flex items-center justify-center "
  >
    <h1 class="text-6xl font-bold">
      <IFooter/>
    </h1>
  </section>
</div>

<style>
  section {
    opacity: 0; /* Initial state */
  }
</style>
