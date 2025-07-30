<script lang="ts">
  import { images } from './images';
</script>

<div class="gallery w-10/12 mx-auto">
  {#each images.slice(0, 24) as image}
    <img src={image.src} alt={image.alt} />
  {/each}
</div>

<style>
  .gallery {
    --s: calc((56vw - 5*var(--g)) / 6); /* calculate size based on full viewport width */
    --g: 16px;  /* increased gap for full screen layout */
    --f: 1.2;  /* control the scale factor */
    
    display: grid;
    gap: var(--g);
    width: 56vw;
    aspect-ratio: 3/2;
    grid-template-columns: repeat(6, auto);
    padding: 0 calc(var(--g) / 2); /* add small padding to prevent edge overflow */
    box-sizing: border-box;
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
