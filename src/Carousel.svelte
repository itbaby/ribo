<script lang="ts">
  import { onMount } from "svelte";
  import Autoplay from "embla-carousel-autoplay";
  import EmblaCarousel, { type EmblaCarouselType, type EmblaOptionsType } from "embla-carousel";

  import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
  let embla: EmblaCarouselType | null = null;
  onMount(() => {
    const emblaNode = document.querySelector(".embla");
    if (emblaNode instanceof HTMLElement) {
      embla = EmblaCarousel(
        emblaNode,
        { loop: true },
        [
          WheelGesturesPlugin(),
          Autoplay({ delay: 4000 }),
          
        ]
      );
    }
  });
</script>

<div class="embla">
  <div class="flex">
    <div class="embla__slide">
      <img src="https://picsum.photos/1000/1000" alt="Slide 1" />
    </div>
    <div class="embla__slide">
      <img src="https://picsum.photos/1000/1000" alt="Slide 2" />
    </div>
    <div class="embla__slide">
      <img src="https://picsum.photos/1000/1000" alt="Slide 3" />
    </div>
  </div>
</div>

<style>
  .embla {
    overflow: hidden;
  }

  .embla__slide {
    flex: 0 0 100%;
  }
</style>
