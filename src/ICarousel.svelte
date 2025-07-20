<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import secondary from "./assets/secondary.jpg";
  import third from "./assets/third.jpg";
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
    const panels = gsap.utils.toArray(".panel");
    ScrollTrigger.create({
      snap: {
        snapTo: 1 / (panels.length - 1),
        duration: 0.3,
        ease: "power1.inOut",
      },
    });
    return () => {
      ScrollTrigger.killAll();
    };
  });
</script>

<div>
  <div class="panel flex h-screen items-center justify-center">
    <img
      src="https://placehold.co/2400x1200/555555/FFF"
      alt=""
      class="max-h-full max-w-full object-contain"
    />
  </div>
  <div
    class="panel flex h-screen items-center justify-center"
    style="background-image: url('{secondary}'); background-repeat: no-repeat; background-size: cover;"
  >
    <img
      src="https://placehold.co/2400x1200/555555/FFF"
      alt=""
      class="max-h-full max-w-full object-contain"
    />
  </div>

  <div
    class="panel flex h-screen items-center justify-center bg-gray-300"
    style="background-image: url('{service}'); background-repeat: no-repeat; background-size: cover;"
  >
    <div class="panel flex h-screen items-center justify-center flex-col">
      <!-- First Row with Caption -->
      <div class="w-full px-4 py-8 text-center">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
          最新动态
        </h2>
      </div>

      <!-- Second Row with 3 Columns -->
      <div class="w-full px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
          <!-- Column 1 -->
          <Card href="/cards" class="p-4 sm:p-6 md:p-8">
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              睿柏与日本MYK达成合作
            </h5>
            <p
              class="leading-tight font-normal text-gray-700 dark:text-gray-400"
            >
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </Card>

          <!-- Column 2 -->
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <img
              src="https://placehold.co/600x400"
              alt="Column 2"
              class="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">Title 2</h3>
            <p class="text-gray-600">Content description 2</p>
          </div>

          <!-- Column 3 -->
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <img
              src="https://placehold.co/600x400"
              alt="Column 3"
              class="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">Title 3</h3>
            <p class="text-gray-600">Content description 3</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="panel flex h-screen items-center justify-center"
    style="background-image: url('{secondary}'); background-repeat: no-repeat; background-size: cover;"
  >
    <div class="panel flex h-screen items-center justify-center flex-col">
      <!-- First Row with Caption -->
      <div class="w-full px-4 py-8 text-center">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
          服务全球客户
        </h2>
      </div>

      <!-- Second Row with 3 Columns -->
      <div class="w-full px-4">
        <Gallery items={images} class="grid-cols-6 gap-4 md:grid-cols-6" />
      </div>
    </div>
  </div>
</div>
