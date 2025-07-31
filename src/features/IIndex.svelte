<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import IMenu from "./IMenu.svelte";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import LocomotiveScroll from "locomotive-scroll";
  import "locomotive-scroll/dist/locomotive-scroll.css";
  import Industry from "./Industry.svelte";
  import IFooter from "./IFooter.svelte";
  import IAboutUs from "./IAboutUs.svelte";
  import ICustomers from "./ICustomers.svelte";
  import ISponsor from "./ISponsor.svelte";
  import IIntro from "./IIntro.svelte";

  gsap.registerPlugin(ScrollTrigger);
  onMount(() => {
    const scrollContainer = document.querySelector("[data-scroll-container]") as HTMLElement;
    const sections = document.querySelectorAll("[data-section]");
    
    if (!scrollContainer) {
      console.warn('Scroll container not found');
      return;
    }
    
    // 初始化滚动和动画
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

    // 同步 ScrollTrigger 和 LocomotiveScroll
    if (sections.length > 0) {
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
      sections.forEach(sec => {
        if (sec) {
          gsap.to(sec, {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
              markers: false,
            },
          });
        }
      });
    }
    
    // 清理函数
    return () => {
      locoScroll.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
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
    class="flex items-center justify-center h-screen p-20 bg-cover bg-center"
    style="background-image: url('./src/assets/istockphoto-898069582-2048x2048.jpg')"
  >
    <IIntro />
  </section>

  <section
    data-section
    data-scroll-section
    class="flex items-center justify-center p-20 bg-cover bg-center"
    style="background-image: url('./src/assets/istockphoto-898069582-2048x2048.jpg')"
  >
    <ICustomers />
  </section>
  <section
    data-section
    data-scroll-section
    class="flex items-center justify-center p-20 bg-cover bg-center"
    style="background-image: url('./src/assets/pexels-ryutaro-5220028.jpg')"
  >
    <ISponsor />
  </section>

  <section
    data-section
    data-scroll-section
    class="flex items-center justify-center p-40 bg-cover bg-center"
    style="background-image: url('./src/assets/istockphoto-913936644-1024x1024.jpg')"
  >
    <IAboutUs />
  </section>

  <section
    data-section
    data-scroll-section
    class="flex items-center justify-center"
  >
    <IFooter />
  </section>
</div>

<style>
  section {
    opacity: 0; /* Initial state */
  }
  
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>