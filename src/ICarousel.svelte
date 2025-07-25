<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { SplitText } from "gsap/SplitText";
  import secondary from "./assets/secondary.jpg";
  import earch from "./assets/earth.png";
  import topbg from "./assets/top.jpg";
  import service from "./assets/service.jpg";
  import { Card, Gallery } from "flowbite-svelte";

  import alibaba from "./assets/icons/alibaba.png";
  import alo from "./assets/icons/alo.png";
  import boya from "./assets/icons/boya.png";
  import cisco from "./assets/icons/cisco.png";
  import colt from "./assets/icons/colt.png";
  import css from "./assets/icons/css.png";
  import ds from "./assets/icons/ds.png";
  import fcn from "./assets/icons/fcn.png";
  import fend from "./assets/icons/fend.png";
  import fil from "./assets/icons/fil.png";
  import gen from "./assets/icons/gen.png";
  import hitachi from "./assets/icons/hitachi.png";
  import infosys from "./assets/icons/infosys.png";
  import lenovo from "./assets/icons/lenovo.png";
  import nissan from "./assets/icons/nissan.png";
  import ns from "./assets/icons/ns.png";
  import ntt from "./assets/icons/ntt.png";
  import qs from "./assets/icons/qs.png";
  import redbook from "./assets/icons/redbook.png";
  import tcl from "./assets/icons/tcl.png";
  import trsassion from "./assets/icons/trsassion.png";
  import www from "./assets/icons/www.png";
  import yd from "./assets/icons/yd.png";
  import zj from "./assets/icons/zj.png";
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);
  let activeIndex = 0;
  $: cards = (
    $_("carousel.items") as unknown as Array<{
      title: string;
      description: string;
    }>
  ).map((item) => ({
    ...item,
    image: "https://placehold.co/600x400",
    href: "/cards",
  }));
  const images = [
    { alt: "Alibaba", src: alibaba },
    { alt: "Alo", src: alo },
    { alt: "Boya", src: boya },
    { alt: "Cisco", src: cisco },
    { alt: "Colt", src: colt },
    { alt: "CSS", src: css },
    { alt: "DS", src: ds },
    { alt: "FCN", src: fcn },
    { alt: "Fend", src: fend },
    { alt: "Fil", src: fil },
    { alt: "Gen", src: gen },
    { alt: "Hitachi", src: hitachi },
    { alt: "Infosys", src: infosys },
    { alt: "Lenovo", src: lenovo },
    { alt: "Nissan", src: nissan },
    { alt: "NS", src: ns },
    { alt: "NTT", src: ntt },
    { alt: "QS", src: qs },
    { alt: "Redbook", src: redbook },
    { alt: "TCL", src: tcl },
    { alt: "Trsassion", src: trsassion },
    { alt: "WWW", src: www },
    { alt: "YD", src: yd },
    { alt: "ZJ", src: zj },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      activeIndex = (activeIndex + 1) % 3;
    }, 4000);
    return () => clearInterval(interval);
  });
</script>

<div>
  <div
    class="panel flex h-screen items-center justify-center"
    style="background-image: url('{topbg}'); background-repeat: no-repeat; background-size: cover;"
  >
    <div class="marquee-container relative h-[60vh] w-full py-8">
      <!-- 第一个区块 -->
      {#if activeIndex === 0}
        <div
          class="marquee-item absolute inset-0 flex flex-col gap-4 items-center text-center p-6 w-full"
          in:fade={{ duration: 2000 }}
          out:fade={{ duration: 2000 }}
        >
          <h1
            class="split text-white text-4xl md:text-5xl font-medium text-uppercase tracking-wider"
          >
            {$_("carousel.techDrivenFuture")}
          </h1>
          <h2 class="split text-white text-xl md:text-2xl">
            {$_("carousel.techDescription")}
          </h2>
        </div>
      {/if}

      <!-- 第二个区块 -->
      {#if activeIndex === 1}
        <div
          class="marquee-item absolute inset-0 flex flex-col gap-4 items-center text-center p-6 w-full"
          in:fade={{ duration: 2000 }}
          out:fade={{ duration: 2000 }}
        >
          <h1
            class="split text-white text-4xl md:text-5xl font-medium text-uppercase tracking-wider"
          >
            {$_("carousel.talentPool")}
          </h1>
          <ul class="split text-white text-xl md:text-2xl space-y-2">
            <li>• {$_("carousel.verticalCoverage")}</li>
            <li>• {$_("carousel.preciseMatching")}</li>
            <li>• {$_("carousel.expertTeam")}</li>
          </ul>
        </div>
      {/if}

      <!-- 第三个区块 -->
      {#if activeIndex === 2}
        <div
          class="marquee-item absolute inset-0 flex flex-col gap-4 items-center text-center p-6 w-full"
          in:fade={{ duration: 2000 }}
          out:fade={{ duration: 2000 }}
        >
          <h1
            class="split text-white text-4xl md:text-5xl font-medium text-uppercase tracking-wider"
          >
            {$_("carousel.fullService")}
          </h1>
          <ul class="split text-white text-xl md:text-2xl space-y-2">
            <li>• {$_("carousel.executiveSearch")}</li>
            <li>• {$_("carousel.staffing")}</li>
            <li>• {$_("carousel.itoService")}</li>
          </ul>
        </div>
      {/if}
    </div>
  </div>
  <div
    id="headhunting"
    class="panel flex h-screen items-center justify-center"
    style="background-image: url('{earch}'); background-repeat: no-repeat; background-position:center; background-size: 100% auto;"
  ></div>
  <div
    class="panel flex h-screen items-center justify-center"
    style="background-image: url('{secondary}'); background-repeat: no-repeat; background-size: cover;"
  >
    <div class="panel flex h-screen items-center justify-center flex-col">
      <!-- First Row with Caption -->
      <div class="w-full px-4 py-8 text-center">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
          {$_("carousel.globalClients")}
        </h2>
      </div>

      <!-- Second Row with 3 Columns -->
      <div class="w-full px-4">
        <Gallery items={images} class="grid-cols-6 gap-4 md:grid-cols-6" />
      </div>
    </div>
  </div>
  <div
    class="panel flex h-screen items-center justify-center bg-gray-300"
    style="background-image: url('{service}'); background-repeat: no-repeat; background-size: cover;"
  >
    <div class="panel flex h-screen items-center justify-center flex-col">
      <!-- First Row with Caption -->
      <div class="w-full px-4 py-8 text-center">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
          {$_("carousel.latestNews")}
        </h2>
      </div>

      <!-- Second Row with 3 Columns -->
      <div class="w-full px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {#each cards as card}
            {#if card.href}
              <Card href={card.href} class="p-6 sm:p-8 md:p-10">
                <h5
                  class="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  {card.title}
                </h5>
                <p
                  class="text-xl leading-relaxed font-normal text-gray-700 dark:text-gray-400"
                >
                  {card.description}
                </p>
              </Card>
            {/if}
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .marquee-container {
    display: flex;
    width: 100%;
    overflow: hidden;
  }
  .marquee-item {
    min-width: 100%;
    flex-shrink: 0;
    transition: opacity 0.2s ease;
  }
</style>
