<script lang="ts">
   import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    const sections = document.querySelectorAll('[data-section]');
    
    
    
    sections.forEach(sec => {
      gsap.to(sec, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
          markers: false // For debugging (can remove later)
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  });
</script>

<div>
  <section
    data-section
    data-scroll-section
    class="flex items-center justify-center h-screen bg-rose-200"
  >
    <h1 class="text-6xl font-bold">Screen 1</h1>
  </section>

  <section
    data-section
    data-scroll-section
    class="flex items-center justify-center h-screen bg-sky-200"
  >
    <h1 class="text-6xl font-bold">Screen 2</h1>
  </section>

  <section
    data-section
    data-scroll-section
    class="flex items-center justify-center h-screen bg-emerald-200"
  >
    <h1 class="text-6xl font-bold">Screen 3</h1>
  </section>
</div>
<style>
  section {
    opacity: 0; /* Initial state */
  }
</style>