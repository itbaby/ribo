<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import LocomotiveScroll from "locomotive-scroll";
  import CScroller from "./CScroller.svelte";
  import { _, locale } from "svelte-i18n";
  import CText from "./CText.svelte";
  import CSponsor from "./CSponsor.svelte";
  import CFooter from "./CFooter.svelte";
  import CLastNews from "./CLastNews.svelte";
  import aboutusImg from '../assets/aboutus.jpg';
  import earthImg from '../assets/earth.png';

  let languages = {
    "fi-us": "en",
    "fi-jp": "jp",
    "fi-cn": "zh",
  };
  locale.set(
    languages[localStorage.getItem("selectedFlag") as keyof typeof languages] ||
      "zh"
  );

  gsap.registerPlugin(ScrollTrigger);
  onMount(() => {
    const scrollContainer = document.querySelector(
      "[data-scroll-container]"
    ) as HTMLElement;
    const sections = document.querySelectorAll("[data-section]");

    // Initialize transform properties for all sections to prevent LocomotiveScroll errors
    sections.forEach((section) => {
      if (!section.style.transform) {
        section.style.transform = 'translate3d(0, 0, 0)';
      }
    });

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
          ? locoScroll.scrollTo(value, {
              duration: 0,
              disableLerp: true,
            })
          : locoScroll.scroll.y;
      },
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }),
    });

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
            scroller: "[data-scroll-container]",
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
            markers: false,
          },
        }
      );
    });

    // 在设置完所有动画后刷新ScrollTrigger
    ScrollTrigger.refresh();

    return () => {
      locoScroll.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  });
</script>

<div class="bg-gray-700 w-[100vw]">
  <div data-scroll-container class="bg-gray-900 flex flex-col">
    <section
      data-section
      data-scroll-section
      class="flex items-center justify-center min-h-screen bg-cover bg-center w-full"
      style="background-image: url({aboutusImg})"
    >
      <CText />
    </section>

    <section
      data-section
      data-scroll-section
      class="w-full mx-auto bg-cover bg-center flex flex-col items-center justify-center min-h-[80vh] py-10 md:py-40"
      style="background-image: url({earthImg})"
    >
      <div
        class="text-white w-10/12 mx-auto text-2xl animate-pulse md:text-4xl text-center"
      >
        {$_("cserve.headline")}
      </div>
      <h2
        class="text-white w-10/12 mx-auto lg:text-2xl animate-pulse md:text-3xl mt-20 text-center mb-40"
      >
        {$_("cserve.subhead")}
      </h2>
       <CScroller />
    </section>

   

    <section
      data-section
      data-scroll-section
      class="flex flex-col text-white bg-gray-700 items-center justify-center h-auto pb-20 pt-20"
    >
      <h1 class="mb-[4vh] text-2xl md:text-4xl">
        {$_("menu.serviceGlobalClients")}
      </h1>
      <CSponsor />
    </section>
    <section
      data-section
      data-scroll-section
      class="flex flex-col items-center justify-center min-h-[50vh] py-10 md:py-20"
    >
      <h1 class="mb-[4vh] text-2xl md:text-4xl text-white">
        {$_("carousel.latestNews")}
      </h1>
      <CLastNews />
    </section>
    
    <footer data-scroll-section>
      <CFooter bgClass="bg-gray-800" />
    </footer>
  </div>
</div>

<style>
</style>
