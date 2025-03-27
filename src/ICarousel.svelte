<script lang="ts">
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import i1 from "./assets/ideas_1.webp";
  import i2 from "./assets/idea-2.jpg";

  import "@splidejs/svelte-splide/css";
</script>

<div class="max-w-4xl space-y-4">
  <Splide
    options={{
      direction: "ttb",
      height: "75vh",
    }}
    aria-label="My Favorite Images"
  >
    <SplideSlide>
      <img src={i1} alt="Image 1" />
    </SplideSlide>
    <SplideSlide>
      <img src={i2} alt="Image 2" />
    </SplideSlide>
  </Splide>
</div>
