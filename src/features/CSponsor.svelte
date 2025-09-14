<script lang="ts">
  import { sponsors, spriteSheet } from './images';
</script>

<div class="gallery w-full mx-auto">
  {#each sponsors as sponsor}
    <div
      class="sponsor-logo shadow-xl/30"
      style="background-image: url({spriteSheet}); background-position: {sponsor.x}px {sponsor.y}px;"
      role="img"
      aria-label={sponsor.alt}
    ></div>
  {/each}
</div>

<style>
  .gallery {
    --g: 16px;
    display: grid;
    gap: var(--g);
    grid-template-columns: repeat(auto-fill, 242px);
    justify-content: center;
    width: 80vw;
    max-width: 1400px;
    margin: 0 auto;
  }

  .sponsor-logo {
    width: 242px;
    height: 198px;
    background-repeat: no-repeat;
    cursor: pointer;
    filter: grayscale(80%);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 0.5rem;
    transform: scale(0.9);
  }

  .sponsor-logo:hover {
    filter: grayscale(0);
    transform: scale(1.25);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    z-index: 10;
    position: relative;
  }

  /* Varied hover effects for different positions */
  .sponsor-logo:nth-child(odd):hover {
    transform: scale(1.3);
  }

  .sponsor-logo:nth-child(even):hover {
    transform: scale(1.2);
  }

  .sponsor-logo:nth-child(3n):hover {
    transform: scale(1.35) translateY(-5px);
  }

  .sponsor-logo:nth-child(4n):hover {
    transform: scale(1.28) translateY(3px);
  }
</style>
