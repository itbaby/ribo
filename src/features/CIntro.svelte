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
  
  // 通用动画配置
  const animConfig = {
    duration: 1,
    ease: 'power2.out'
  };

  // 获取幻灯片元素及其内容元素
  function getSlideElements(index?: number) {
    const slideElements = document.querySelectorAll('.slide');
    if (index === undefined) return { slideElements };
    
    const currentSlide = slideElements[index];
    const content = currentSlide.querySelector('.content');
    
    return {
      slideElements,
      currentSlide,
      otherSlides: Array.from(slideElements).filter((_, i) => i !== index),
      overlay: currentSlide.querySelector('.overlay'),
      title: content?.querySelector('.title'),
      cityInfo: content?.querySelector('.city-info'),
      emblem: content?.querySelector('.emblem')
    };
  }

  function openSlide(index: number) {
    if (activeSlide === index || activeSlide !== null) return;
    
    lastViewedSlide = activeSlide;
    activeSlide = index;
    
    const elements = getSlideElements(index);
    const isMobile = window.innerWidth <= 768;
    
    // 幻灯片大小动画
    if (elements.currentSlide) {
      if (isMobile) {
        gsap.to(elements.currentSlide, { height: '70vh', ...animConfig });
      } else {
        gsap.to(elements.currentSlide, { flex: 4, ...animConfig });
      }
    }
    
    if (elements.otherSlides) {
      if (isMobile) {
        gsap.to(elements.otherSlides, { height: '10vh', ...animConfig });
      } else {
        gsap.to(elements.otherSlides, { flex: 0.5, ...animConfig });
      }
    }

    // 内容元素动画
    if (elements.overlay) {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        gsap.set(elements.overlay, { width: '100%', height: '100%' });
        gsap.to(elements.overlay, {
          height: '25%',
          duration: 1.25,
          delay: 1.75,
          ease: animConfig.ease
        });
      } else {
        gsap.set(elements.overlay, { width: '100%' });
        gsap.to(elements.overlay, {
          width: '25%',
          duration: 1.25,
          delay: 1.75,
          ease: animConfig.ease
        });
      }
    }

    // 使用数组和循环简化元素动画
    const animations = [
      { el: elements.title, props: {
        from: { opacity: 0, x: -30 },
        to: {
          opacity: 1,
          x: 0,
          delay: 1.25
        }
      } },
      { el: elements.cityInfo, props: { from: { opacity: 0, x: -20 }, to: { opacity: 1, x: 0, duration: 0.8, delay: 1.5 } } },
      { el: elements.emblem, props: {
        from: { opacity: 0, y: 50 },
        to: {
          opacity: 0.8,
          y: window.innerWidth <= 768 ? 0 : 100,
          duration: 0.8,
          delay: 1.75
        }
      } }
    ];
    
    animations.forEach(({ el, props }) => {
      if (el) {
        gsap.fromTo(el, 
          props.from, 
          { ...props.to, ease: animConfig.ease, duration: props.to.duration || animConfig.duration }
        );
      }
    });
  }

  function closeSlide(index: number) {
    if (activeSlide !== index) return;
    
    lastViewedSlide = activeSlide;
    activeSlide = null;
    
    const { slideElements } = getSlideElements();
    const isMobile = window.innerWidth <= 768;
    
    // 重置所有幻灯片大小
    if (isMobile) {
      gsap.to(slideElements, { height: '25vh', minHeight: '200px', ...animConfig });
    } else {
      gsap.to(slideElements, { flex: 1, ...animConfig });
    }

    // 重置内容元素状态
    slideElements.forEach((slide, idx) => {
      const content = slide.querySelector('.content');
      const elements = {
        overlay: slide.querySelector('.overlay'),
        title: content?.querySelector('.title'),
        cityInfo: content?.querySelector('.city-info'),
        emblem: content?.querySelector('.emblem')
      };
      
      // 仅为关闭的幻灯片恢复覆盖层宽度
      if (idx === index && elements.overlay) {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
          gsap.to(elements.overlay, {
            width: '100%',
            height: '100%',
            duration: 0.5,
            ease: animConfig.ease
          });
        } else {
          gsap.to(elements.overlay, {
            width: '100%',
            duration: 0.5,
            ease: animConfig.ease
          });
        }
      }
      
      // 重置所有内容元素的CSS属性
      if (elements.title) gsap.set(elements.title, { clearProps: 'all' });
      if (elements.cityInfo) gsap.set(elements.cityInfo, { clearProps: 'all' });
      if (elements.emblem) gsap.set(elements.emblem, { clearProps: 'all' });
    });
  }

  onMount(() => {
    // 初始化幻灯片
    const { slideElements } = getSlideElements();
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      gsap.set(slideElements, { height: '25vh', minHeight: '200px' });
    } else {
      gsap.set(slideElements, { flex: 1 });
    }
    
    // 监听窗口大小变化
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 768;
      
      if (activeSlide === null) {
        if (newIsMobile) {
          gsap.set(slideElements, { height: '25vh', minHeight: '200px', clearProps: 'flex' });
        } else {
          gsap.set(slideElements, { flex: 1, clearProps: 'height,minHeight' });
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<div id="container" class="h-screen flex-col bg-gray-900 lg:p-40 md:flex-row ">
  {#each slides as slide, index}
    <div
      class="slide flex items-center justify-center h-screen md:h-screen"
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

@media (max-width: 768px) {
  #container {
    flex-direction: column;
  }
}

.slide {
  position: relative;
  flex: 1;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  transition: all 1.0s;
  
  @media (max-width: 768px) {
    height: 25vh;
    min-height: 200px;
    width: 100%;
  }

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
    cursor: default;

    .image {
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }

    .overlay {
      width: 25%;
      background-size: 100% 100%;
      transition: all 1.25s;
      transition-delay: 1.75s;
      
      @media (max-width: 768px) {
        width: 100%;
        height: 25%;
      }
    }

    .content {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      
      @media (max-width: 768px) {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding: 0 20px;
      }

      .title {
        width: 25%;
        opacity: 1;
        transform: translateY(30px);
        transition: all 1s;
        transition-delay: 1.25s;
        
        @media (max-width: 768px) {
          width: 100%;
          text-align: left;
          padding-left: 20px;
          transform: translate(-30px, 0px);
        }
        
        &:before {
          display: none;
        }

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
      font-size: 3.5em;
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
      
      @media (max-width: 768px) {
        position: relative;
        width: 100px;
        height: 100px;
        margin: 0;
        align-self: center;
        flex-shrink: 0;
        transform: translateY(0);
      }
    }

    .city-info {
      position: absolute;
      bottom: 30px;
      right: 30px;
      padding: 30px 30px 30px 120px;
      font-size: 1.5em;
      color: white;
      text-shadow: 0 1px 4px #0f0f0f;
      background-image: linear-gradient(90deg, rgba(20, 20, 20, 0), rgba(20, 20, 20, 0.7));
      opacity: 0;
      transition: all 1s;
      transition-delay: 2s;
      
      @media (max-width: 768px) {
        position: relative;
        bottom: auto;
        right: auto;
        width: calc(100% - 120px);
        padding: 15px;
        margin: 0 0 0 20px;
        background-image: linear-gradient(90deg, rgba(20, 20, 20, 0), rgba(20, 20, 20, 0.7));
        text-align: left;
        align-self: center;
      }

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

  &:hover:not(.active) {
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