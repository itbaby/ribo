<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  <div class="panel flex h-screen items-center justify-center bg-gray-100">
    <img
      src="https://placehold.co/2400x1200/000000/FFF"
      class="max-h-full max-w-full object-contain"
    />
  </div>
  <div class="panel flex h-screen items-center justify-center bg-gray-200">
    <img
      src="https://placehold.co/2400x1200/cccccc/FFF"
      class="max-h-full max-w-full object-contain"
    />
  </div>
  <div class="panel flex h-screen items-center justify-center bg-gray-300">
    <img
      src="https://placehold.co/2400x1200/555555/FFF"
      class="max-h-full max-w-full object-contain"
    />
  </div>
</div>
