<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  interface SlideData {
    id: number;
    city: string;
    country: string;
    founded: string;
    population: string;
    image: string;
    emblem: string;
  }

  const slides: SlideData[] = [
    {
      id: 1,
      city: 'Venice',
      country: 'Italy',
      founded: '697',
      population: '260,060',
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/544318/venice.jpg',
      emblem: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/544318/italian-emblem.svg'
    },
    {
      id: 2,
      city: 'Paris',
      country: 'France',
      founded: '~250BC',
      population: '2.2 Million',
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/544318/paris.jpg',
      emblem: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/544318/french-emblem.svg'
    },
    {
      id: 3,
      city: 'Salzburg',
      country: 'Austria',
      founded: '1622',
      population: '145,871',
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/544318/salzburg.jpg',
      emblem: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/544318/austrian-emblem.svg'
    },
    {
      id: 4,
      city: 'Prague',
      country: 'Czech Republic',
      founded: '870',
      population: '1.2 Million',
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/544318/prague.jpg',
      emblem: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/544318/czech-emblem.svg'
    }
  ];

  let activeSlide: number | null = null;
  let lastViewedSlide: number | null = null;

  function openSlide(index: number) {
    if (activeSlide === index || activeSlide !== null) return;
    
    lastViewedSlide = activeSlide;
    activeSlide = index;
    
    // Animate to active state
    const slideElements = document.querySelectorAll('.slide');
    const currentSlide = slideElements[index];
    const otherSlides = Array.from(slideElements).filter((_, i) => i !== index);
    
    gsap.to(currentSlide, {
      flex: 4,
      duration: 1,
      ease: 'power2.out'
    });
    
    gsap.to(otherSlides, {
      flex: 0.5,
      duration: 1,
      ease: 'power2.out'
    });

    // Animate content with null checks
    const content = currentSlide.querySelector('.content');
    const overlay = currentSlide.querySelector('.overlay');
    const title = content?.querySelector('.title');
    const cityInfo = content?.querySelector('.city-info');
    const emblem = content?.querySelector('.emblem');
    
    if (overlay) {
      // Start from 100% and animate to 25%
      gsap.set(overlay, { width: '100%' });
      gsap.to(overlay, {
        width: '25%',
        duration: 1.25,
        delay: 1.75,
        ease: 'power2.out'
      });
    }

    if (title) {
      gsap.fromTo(title, 
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1, delay: 1.25, ease: 'power2.out' }
      );
    }

    if (cityInfo) {
      gsap.fromTo(cityInfo,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, delay: 1.5, ease: 'power2.out' }
      );
    }

    if (emblem) {
      gsap.fromTo(emblem,
        { opacity: 0, y: 50 },
        { opacity: 0.8, y: 100, duration: 0.8, delay: 1.75, ease: 'power2.out' }
      );
    }
  }

  function closeSlide(index: number) {
    if (activeSlide !== index) return;
    
    lastViewedSlide = activeSlide;
    activeSlide = null;
    
    const slideElements = document.querySelectorAll('.slide');
    
    gsap.to(slideElements, {
      flex: 1,
      duration: 1,
      ease: 'power2.out'
    });

    // Reset content animations - restore all elements to initial state
    slideElements.forEach((slide, idx) => {
      const content = slide.querySelector('.content');
      const overlay = slide.querySelector('.overlay');
      const title = content?.querySelector('.title');
      const cityInfo = content?.querySelector('.city-info');
      const emblem = content?.querySelector('.emblem');
      
      if (idx === index) {
        // Restore the closing slide's overlay to 100% width for hover effect
        if (overlay) {
          gsap.to(overlay, { width: '100%', duration: 0.5, ease: 'power2.out' });
        }
      }
      
      // Reset all content elements to CSS initial state (not hidden)
      // Let CSS handle hover states, don't force opacity to 0
      if (title) gsap.set(title, { clearProps: 'all' });
      if (cityInfo) gsap.set(cityInfo, { clearProps: 'all' });
      if (emblem) gsap.set(emblem, { clearProps: 'all' });
    });
  }

  onMount(() => {
    // Initial setup
    const slides = document.querySelectorAll('.slide');
    gsap.set(slides, { flex: 1 });
  });
</script>

<div id="container" class="h-screen">
  {#each slides as slide, index}
    <div 
      class="slide flex items-center justify-center h-screen"
      class:active={activeSlide === index}
      class:last-viewed={lastViewedSlide === index}
      on:keydown={(e) => e.key === 'Enter' || e.key === ' ' ? openSlide(index) : null}
      role="button"
      tabindex="0"
      on:click={() => openSlide(index)}
    >
      <div class="image" style="background-image: url({slide.image})"></div>
      <div class="overlay"></div>
      <div class="content">
        <h1 class="title" data-title={slide.city}>{slide.city}</h1>
        <div class="emblem" style="background-image: url({slide.emblem})"></div>
        <ul class="city-info">
          <li class="country">Country: {slide.country}</li>
          <li class="founded">Founded: {slide.founded}</li>
          <li class="population">Population: {slide.population}</li>
        </ul>
      </div>
      <button type="button" class="btn-close" aria-label="Close slide" on:click|stopPropagation={() => closeSlide(index)} on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && closeSlide(index)}></button>
    </div>
  {/each}
</div>
<style lang="scss">
    #container {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
}

.slide {
  position: relative;
  flex: 1;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  transition: all 1.0s;

  &.last-viewed {
    .btn-close {
      &:after {
        transition-delay: 0s;
      }

      &:before {
        transition-delay: 0.1s;
      }
    }

    .content {
      .city-info {
        transition-delay: 0s;

        li {
          @for $i from 1 through 3 {
            &:nth-of-type(#{$i}) {
              transition-delay: $i * 0.2s;
            }
          }
        }
      }

      .emblem {
        transition: all 0.5s;
        transition-delay: 0s;
      }
    }
  }

  &.active {
    .image {
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
  }

  &.active {
    cursor: default;

    .overlay {
      width: 25%;
      background-size: 100% 100%;
      transition: all 1.25s;
      transition-delay: 1.75s;
    }

    .content {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;

      .title {
        width: 25%;
        opacity: 1;
        transform: translateY(30px);
        transition: all 1s;
        transition-delay: 1.25s;

        &:after {
          height: 100%;
          color: white;
          overflow: initial;
        }

        &:before {
          transform: scaleX(1);
          transition-delay: 2s;
        }
      }

      .city-info {
        opacity: 1;

        li {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .emblem {
        opacity: 0.8;
        transform: translateY(100px);
      }
    }

    .btn-close {
      cursor: pointer;
      pointer-events: auto;

      &:before, &:after {
        opacity: 1;
      }

      &:after {
        transform: rotate(45deg) translateX(0px);
      }

      &:before {
        transform: rotate(-45deg) translateX(0px);
      }
    }
  }

  &.anim-in {
    transition-delay: 0.5s;

    .image {
      top: -20%;
      left: -140%;
      height: 140%;
      width: 140%;
      animation: img-anim-in 1.2s forwards;
    }
  }

  &.anim-out {
    flex: 0;
    cursor: default;
    transition-delay: 0.5s;

    .image {
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      animation: img-anim-out 1.2s forwards;
    }
  }

  @for $i from 1 through 4 {
    &:nth-of-type(#{$i}) {
      &.anim-in {
        .image {
          animation-delay: $i * 0.2s;
        }
      }

      &.anim-out {
        .image {
          animation-delay: $i * 0.2s;
        }
      }
    }
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center center;
    pointer-events: none;
    transition: all 1s;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(rgba(20, 20, 20, 0.7), rgba(20, 20, 20, 0));
    background-position: 0 0;
    background-size: 100% 200%;
    opacity: 1;
    pointer-events: none;
    transition: all 0.5s;
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;

    .title {
      position: absolute;
      top: -10px;
      height: 65px;
      width: 100%;
      box-sizing: border-box;
      font-size: 3em;
      text-align: center;
      text-shadow: 0 2px 2px #2f2f2f;
      color: #3f3f3f;
      opacity: 0;
      pointer-events: none;
      transition: all 0.5s;

      &:after {
        position: absolute;
        top: 0;
        height: 0;
        width: 100%;
        display: block;
        content: attr(data-title);
        overflow: hidden;
        color: #fff59d;
        transition: all 0.85s;
      }

      &:before {
        position: absolute;
        bottom: 15px;
        display: block;
        content: "";
        height: 2px;
        width: 85%;
        background: white;
        box-shadow: 0 2px 6px #2f2f2f;
        transform-origin: left center;
        transform: scaleX(0);
        transition: transform 1.25s;
      }
    }

    .emblem {
      position: absolute;
      height: 200px;
      width: 25%;
      opacity: 0;
      transform: translateY(120px);
      transition: all 1s;
      transition-delay: 1.75s;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: auto 100%;
    }

    .city-info {
      position: absolute;
      bottom: 30px;
      right: 30px;
      padding: 30px 30px 30px 120px;
      font-size: 1.25em;
      color: white;
      text-shadow: 0 1px 4px #0f0f0f;
      background-image: linear-gradient(90deg, rgba(20, 20, 20, 0), rgba(20, 20, 20, 0.7));
      opacity: 0;
      transition: all 1s;
      transition-delay: 2s;

      li {
        position: relative;
        margin-bottom: 5px;
        text-align: justify;
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.75s;

        @for $i from 1 through 3 {
          &:nth-of-type(#{$i}) {
            transition-delay: $i * 0.2s + 2.5s;
          }
        }
      }
    }
  }

  .btn-close {
    position: absolute;
    z-index: 100;
    top: 20px;
    right: 20px;
    height: 24px;
    width: 24px;
    pointer-events: none;

    &:before, &:after {
      position: absolute;
      top: 12px;
      display: block;
      content: "";
      width: 100%;
      height: 4px;
      background-color: white;
      opacity: 0;
      cursor: pointer;
      transition: all 0.5s;
    }

    &:after {
      transform: rotate(45deg) translateX(-12px);
      transition-delay: 3s;
    }

    &:before {
      transform: rotate(-45deg) translateX(12px);
      transition-delay: 3.2s;
    }
  }

  &:hover:not(.active):not(.anim-out) {
    .image {
      transform: scale(1.1);
    }

    .overlay {
      opacity: 0.6;
    }

    .content .title {
      opacity: 1;
      transform: translateY(30px);

      &:after {
        height: 100%;
      }
    }
  }
}

#codepen-link {
  position: absolute;
  right: 15px;
  bottom: 15px;
  height: 40px;
  width: 40px;
  z-index: 10;
  border-radius: 50%;
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/544318/logo.jpg");
  background-position: center center;
  background-size: cover;
  opacity: 0.7;
  transition: all 0.25s;

  &:hover {
    opacity: 1;
    box-shadow: 0 2px 6px #0f0f0f;
  }
}

@keyframes img-anim-in {
  to {
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}

@keyframes img-anim-out {
  to {
    left: -100%;
  }
}

</style>