<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import LocomotiveScroll from "locomotive-scroll";
  import CScroller from "./CScroller.svelte";
  import { _, locale } from "svelte-i18n";
  import earth from "../assets/earth.png";

  let languages = {
    "fi-us": "en",
    "fi-jp": "jp",
    "fi-cn": "zh",
  };
  locale.set(
    languages[localStorage.getItem("selectedFlag") as keyof typeof languages] ||
      "zh",
  );

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
      // 使用GSAP实现类似AOS zoom-in的效果
      gsap.fromTo(
        sec,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
            markers: true,
          },
        },
      );
    });

    return () => {
      locoScroll.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  });
</script>

<div
  data-scroll-container
  class="bg-gray-900 bg-cover bg-center flex flex-col justify-center justify-around"
  style="background-image: url('{earth}')"
>
  <section
    data-section
    data-scroll-section
    class=" w-10/12 mx-auto flex flex-col items-center justify-center mt-[10vh] h-[30vh]"
  >
    <div
      class="text-white lg:text-4xl lg:font-bold animate-pulse md:text-lg text-center"
    >
      {$_("cserve.headline")}
    </div>
    <h2
      class="text-white lg:text-2xl animate-pulse md:text-sm mt-20 text-center"
    >
      {$_("cserve.subhead")}
    </h2>
  </section>
  <section
    data-section
    data-scroll-section
    class="flex flex-col items-center justify-center h-[35vh]"
  >
    <CScroller />
  </section>
</div>

<style>
</style>
