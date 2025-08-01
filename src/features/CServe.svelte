<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import LocomotiveScroll from "locomotive-scroll";
  import ISponsor from "./ISponsor.svelte";
  import ISplide from "./ISplide.svelte";
  import ICustomers from "./ICustomers.svelte";
  import ICarousel from "./ICarousel.svelte";
  import IAboutUs from "./IAboutUs.svelte";
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

<div data-scroll-container class="bg-gray-900 bg-cover bg-center " style="background-image: url('/src/assets/earth.png')">
  <section
    data-section
    data-scroll-section
    class="flex flex-col items-center justify-center h-[60vh] "
    
  >
    <h1 class="text-white text-5xl animate-pulse">
      以大连为立足点，以上海、深圳为支撑，以成就客户为中心，提供一站式人才服务
    </h1>
    <h2 class="text-white text-3xl mt-20">
      以客户为中心，提供一站式人才服务
    </h2>
    
  </section>
  <section
    data-section
    data-scroll-section
    class="flex flex-col  items-center h-[40vh] "
  >
    <IAboutUs />
  </section>
</div>

<style>
</style>
