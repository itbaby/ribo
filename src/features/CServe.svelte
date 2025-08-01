<script lang="ts">
  import { onMount} from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import LocomotiveScroll from "locomotive-scroll";
  gsap.registerPlugin(ScrollTrigger);
  onMount(() => {
    const scrollContainer = document.querySelector(
      "[data-scroll-container]",
    ) as HTMLElement;
    const sections = document.querySelectorAll("[data-section]");

    const locoScroll = new LocomotiveScroll({
      el: scrollContainer,
      smooth: true,
      lerp: 0.25,
      inertia: 0.8,
      getDirection: true,
      multiplier: 0.8,
      class: "is-reveal",
      smoothMobile: true,
    });
    document.addEventListener("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
          : locoScroll.scroll.y;
      },
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }),
    });

    // 刷新并设置动画
    ScrollTrigger.refresh();

    // 为每个部分添加动画
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
          markers: true,
        },
      });
    });

    return () => {
      locoScroll.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  });
</script>

<div data-scroll-container>
  <section
    data-section
    data-scroll-section
    class="flex items-center justify-center h-screen bg-rose-200"
  >
    111
  </section>
  <section
    data-section
    data-scroll-section
    class="flex items-center justify-center h-screen bg-blue-200"
  >
    bbb
  </section>
</div>

<style>
  section {
    opacity: 0; /* Initial state */
  }
</style>
