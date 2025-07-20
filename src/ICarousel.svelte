<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import secondary from "./assets/secondary.jpg";
  import third from "./assets/third.jpg";
  gsap.registerPlugin(ScrollTrigger);

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
    style="background-image: url('{third}'); background-repeat: no-repeat; background-size: cover;"
  >
    <img
      src="https://placehold.co/2400x1200/555555/FFF"
      alt=""
      class="max-h-full max-w-full object-contain"
    />
  </div>
</div>
