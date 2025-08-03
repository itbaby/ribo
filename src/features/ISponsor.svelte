<script lang="ts">
  import { images } from './images';
</script>

<div class="gallery w-full mx-auto">
  {#each images.slice(0, 24) as image}
    <img class="shadow-xl/30" src={image.src} alt={image.alt} />
  {/each}
</div>

<style>
  .gallery {
    --s: calc((100vw - 3*var(--g)) / 4); /* 4 columns on mobile */
    --g: 12px;  /* gap */
    --f: 1.2;  /* scale factor */
    
    display: grid;
    gap: var(--g);
    width: 100vw;
    max-height: 90vh;
    aspect-ratio: 1/1; /* Even further increased height on mobile */
    grid-template-columns: repeat(4, auto);
    padding: 0 calc(var(--g) / 2);
    box-sizing: border-box;
  }

  @media (min-width: 768px) {
    .gallery {
      --s: calc((60vw - 7*var(--g)) / 8); /* 8 columns on desktop */
      --g: 16px;  /* increased gap for full screen layout */
      width: 60vw;
      aspect-ratio: 3/2; /* Original aspect ratio on desktop */
      grid-template-columns: repeat(8, auto);
    }
  }

  .gallery > img {
    width: 0;
    height: 0;
    min-height: 100%;
    min-width: 100%;
    object-fit: cover;
    cursor: pointer;
    filter: grayscale(80%);
    transition: 0.35s linear;
    border-radius: 0.5rem;
  }

  .gallery img:hover {
    filter: grayscale(0);
    width: calc(var(--s) * var(--f));
    height: calc(var(--s) * var(--f));
  }
</style>
