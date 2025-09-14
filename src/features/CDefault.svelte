<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import CScroller from "./CScroller.svelte";
  import { _, locale } from "svelte-i18n";
  import CText from "./CText.svelte";
  import CSponsor from "./CSponsor.svelte";
  import CFooter from "./CFooter.svelte";
  import CLastNews from "./CLastNews.svelte";
  import aboutusImg from "../assets/aboutus.jpg";
  import earthImg from "../assets/earth.png";

  let languages = {
    "fi-us": "en",
    "fi-jp": "jp",
    "fi-cn": "zh",
  };
  locale.set(
    languages[localStorage.getItem("selectedFlag") as keyof typeof languages] ||
      "zh"
  );

  onMount(() => {
    // Simple fade-in animations for each section with delays
    const sections = document.querySelectorAll("section[data-section]");
    
    sections.forEach((section, index) => {
      // Set initial state
      gsap.set(section, { opacity: 0 });
      
      // Fade in with delay based on section index
      gsap.to(section, {
        opacity: 1,
        duration: 1,
        delay: index * 0.3,
        ease: "power2.out"
      });
    });
  });
</script>

<div class="bg-gray-700 w-full overflow-hidden">
  <div data-scroll-container class="bg-gray-900">
    <section
      data-section
      class="flex items-center justify-center h-screen bg-cover bg-center"
      style="background-image: url('{aboutusImg}');"
    >
      <CText />
    </section>

    <section
      data-section
      class="w-full mx-auto bg-cover bg-center flex flex-col items-center justify-center h-[80vh] py-40"
      style="background-image: url('{earthImg}');"
    >
      <div
        class="text-white w-10/12 mx-auto text-2xl animate-pulse md:text-4xl text-center"
      >
        {$_("cserve.headline")}
      </div>
      <h2
        class="text-white w-10/12 mx-auto lg:text-2xl animate-pulsemd:text-3xl mt-20 text-center mb-40"
      >
        {$_("cserve.subhead")}
      </h2>
       <CScroller />
    </section>

   

    <section
      data-section
      class="flex flex-col text-white bg-gray-700 items-center justify-center h-auto pb-20 pt-20"
    >
      <h1 class="mb-[4vh] text-2xl md:text-4xl">
        {$_("menu.serviceGlobalClients")}
      </h1>
      <CSponsor />
    </section>
    <section
      data-section
      class="flex flex-col items-center justify-center h-[75vh]"
    >
      <h1 class="mb-[4vh] text-2xl md:text-4xl text-white">
        {$_("carousel.latestNews")}
      </h1>
      <CLastNews />
    </section>
  </div>

  <CFooter bgClass="bg-gray-800" />
</div>

<style>
  /* Sections should be visible by default */
  section[data-section] {
    opacity: 1;
    transition: opacity 1s ease;
  }
  
  /* Add smooth transitions */
  * {
    transition-timing-function: ease;
  }
</style>
