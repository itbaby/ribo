<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { Elastic } from 'gsap';
  gsap.registerPlugin(Elastic);
  import aboutus from '../assets/tech_company.jpg';
  import meetingRoom from '../assets/annie-spratt-QckxruozjRg-unsplash.jpg';
  import presentation from '../assets/jeffrey-blum-7-gaPkhIgqs-unsplash.jpg';
  import teamWorking from '../assets/riccardo-annandale-7e2pe9wjL9M-unsplash.jpg';
  import womenWorking from '../assets/conny-schneider-pREq0ns_p_E-unsplash.jpg';
  import groupLooking from '../assets/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg';
  import tech from "../assets/tech_future.jpg";
  import talent from "../assets/tech_talent.jpg";
  import eco from "../assets/tech_eco.jpg";
  import { _, t } from "svelte-i18n";

  let selectedIndex = $state(0);
  let intervalId: number | undefined;

  const services = $derived([
    {
      title: $_('cintro.services.0.title'),
      description: $_('cintro.services.0.description'),
      image: aboutus,
      image2: meetingRoom,
    },
    {
      title: $_('cintro.services.1.title'),
      description: $_('cintro.services.1.description'),
      image: tech,
      image2: presentation,
    },
    {
      title: $_('cintro.services.2.title'),
      description: $_('cintro.services.2.description'),
      image: talent,
      image2: teamWorking,
    },
    {
      title: $_('cintro.services.3.title'),
      description: $_('cintro.services.3.description'),
      image: eco,
      image2: womenWorking,
    },
  ]);

  let currentImage1 = $derived(services[0].image);
  let currentImage2 = $derived(services[0].image2);

  function animateContent(index: number): void {
    gsap.fromTo(".fade-in", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 });
  }

  function changeImage(newImage1: string, newImage2: string, index: number): void {
    if (currentImage1 !== newImage1 || currentImage2 !== newImage2) {
      gsap.to(".animated-img", { 
        opacity: 0, 
        duration: 0.5, 
        onComplete: () => {
          currentImage1 = newImage1;
          currentImage2 = newImage2;
          selectedIndex = index;
          gsap.fromTo(".animated-img", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 });
          animateContent(index);
        }
      });
    }
  }

  function nextService(): void {
    const nextIndex = (selectedIndex + 1) % services.length;
    changeImage(services[nextIndex].image, services[nextIndex].image2, nextIndex);
  }

  function handleClick(image1: string, image2: string, index: number): void {
    changeImage(image1, image2, index);
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(nextService, 5000);
  }

  onMount(() => {
    intervalId = setInterval(nextService, 5000);
    animateContent(0);
  });

  onMount(() => {
    const cards = document.querySelectorAll('.image-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.1,
          duration: 0.5,
          ease: "power2.out"
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    });
  });

  onMount(() => {
    const textCards = document.querySelectorAll('.text-card');
    textCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const originalBg = getComputedStyle(card).backgroundColor;
        const textElements = card.querySelectorAll('p, h3');
        const originalColors = Array.from(textElements).map(el => getComputedStyle(el).color);
        const mainTextColor = originalColors[0] || '#000000'; // Fallback to black if no text elements
        gsap.to(card, { backgroundColor: mainTextColor, duration: 0.3 });
        textElements.forEach((el) => {
          gsap.to(el, { color: originalBg, duration: 0.3 });
        });
        const leaveListener = () => {
          gsap.to(card, { backgroundColor: originalBg, duration: 0.3 });
          textElements.forEach((el, i) => {
            gsap.to(el, { color: originalColors[i], duration: 0.3 });
          });
          card.removeEventListener('mouseleave', leaveListener);
        };
        card.addEventListener('mouseleave', leaveListener);
      });
    });
  });

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
  });
</script>

<div class="bg-gray-900 py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold leading-7 text-white">{$t('cintro.knowUs')}</p>
      <h2 class="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">{$t('cintro.transforming')}</h2>
    </div>
    <div class="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        class="bg-green-200 p-6 rounded-3xl flex flex-col justify-center items-center text-center aspect-[4/3] lg:aspect-auto text-card"
        data-aos="fade-up"
      >
        <p class="text-lg font-medium text-gray-800">{$t('satisfiedCustomer')}</p>
        <p class="mt-2 text-5xl font-bold text-gray-900">94+</p>
      </div>
  
      <div
        class="image-card rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto"
        data-aos="fade-down"
      >
        <img
          src={meetingRoom}
          alt="Meeting Room"
          class="w-full h-full object-cover"
        />
      </div>
  
      <div
        class="image-card rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto"
        data-aos="fade-right"
      >
        <img
          src={presentation}
          alt="Presentation"
          class="w-full h-full object-cover"
        />
      </div>
  
      <div
        class="image-card rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto"
        data-aos="fade-left"
      >
        <img
          src={teamWorking}
          alt="Team Working"
          class="w-full h-full object-cover"
        />
      </div>
  
      <div
        class="image-card rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto"
        data-aos="fade-up-right"
      >
        <img
          src={womenWorking}
          alt="Women Working"
          class="w-full h-full object-cover"
        />
      </div>
  
      <div
        class="bg-pink-100 p-6 rounded-3xl col-span-1 sm:col-span-2 lg:col-span-2 aspect-[2/1] lg:aspect-auto text-card"
        data-aos="fade-up-left"
      >
        <h3 class="text-2xl font-bold text-gray-900">{$t('journey.title')}</h3>
        <p class="mt-4 text-gray-700">
          {$t('journey.description')}
        </p>
      </div>
  
      <div
        class="image-card rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto"
        data-aos="zoom-in"
      >
        <img
          src={groupLooking}
          alt="Group Looking at Laptop" class="w-full h-full object-cover">
      </div>
      


    </div>
  </div>

  <!-- Main Content Section -->
  <div class="mt-20">
    <div class="text-left mb-12">
      <div class="text-center">
        <p class="text-base font-semibold leading-7 text-white">{$t('cintro.aboutUs')}</p>
        <div class="text-center">
          <h2 class="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">{$t('cintro.title')}</h2>
        </div>
        <!-- 主要内容区域 - 改进布局 -->
        <div class="flex flex-col mt-16 lg:flex-row gap-10 lg:items-start h-[100%]">
          <!-- 左侧图片区域 - 优化布局 -->
          <div class="lg:w-1/2 grid grid-cols-3 grid-rows-4 gap-4 ">
            <div class="group col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105 animated-img">
                <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={currentImage1} alt="公司业务领域 1" />
            </div>
            <div class="group col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105">
                <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={presentation} alt="Presentation" />
            </div>
            <div class="group col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105">
                <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={teamWorking} alt="Team Working" />
            </div>
            <div class="group col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105 animated-img">
                <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={currentImage2} alt="公司业务领域 2" />
            </div>
            <div class="group col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105">
                <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={womenWorking} alt="Women Working" />
            </div>
            <div class="group col-span-2 row-span-1 rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105">
                <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={groupLooking} alt="Group Looking" />
            </div>
          </div>
      
          <!-- 右侧服务卡片 - 优化布局 -->
          <div class="lg:w-1/2 flex flex-col gap-6">
            {#each services as service, index}
              <div
                class="{selectedIndex === index
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 shadow-lg'
                  : 'bg-white border-l-4 border-transparent'} p-6 rounded-xl flex-1 flex flex-col cursor-pointer fade-in text-card transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                onclick={() => handleClick(service.image, service.image2, index)}
                onkeydown={(e) => e.key === 'Enter' && handleClick(service.image, service.image2, index)}
                role="button"
                tabindex="0"
              >
                <h3 class="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p class="text-base text-gray-700 mb-4 flex-1 leading-relaxed">
                  {@html service.description}
                </p>
                <div class="flex items-center text-sm text-blue-600 font-medium">
                  <span class="mr-2">→</span>
                  <span>{selectedIndex === index ? '当前选中' : '了解更多'}</span>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<style>
  .animated-img {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .image-card {
    cursor: pointer;
  }
  
  @keyframes floatUp {
    0% {
      transform: translateY(0) rotate(-1deg);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
    }
    100% {
      transform: translateY(-8px) rotate(1deg);
      box-shadow: 0 30px 50px -12px rgba(59, 130, 246, 0.25);
    }
  }
  
  @keyframes floatDown {
    0% {
      transform: translateY(0) rotate(1deg);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
    }
    100% {
      transform: translateY(8px) rotate(-1deg);
      box-shadow: 0 30px 50px -12px rgba(16, 185, 129, 0.25);
    }
  }
  
  
</style>
