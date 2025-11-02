<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { _, t } from "svelte-i18n";
  
  // 直接导入图片以确保Vite能正确打包
  import award01 from "../assets/award_01.png";
  import award02 from "../assets/award_02.png";
  import award03 from "../assets/award_03.png";
  import award04 from "../assets/award_04.png";

  let awards = $derived([
    {
      date: $_('chonors.awards.0.date'),
      title: $_('chonors.awards.0.title'),
      description: $_('chonors.awards.0.description'),
      icon: award01,
    },
    {
      date: $_('chonors.awards.1.date'),
      title: $_('chonors.awards.1.title'),
      description: $_('chonors.awards.1.description'),
      icon: award02,
    },
    {
      date: $_('chonors.awards.2.date'),
      title: $_('chonors.awards.2.title'),
      description: $_('chonors.awards.2.description'),
      icon: award03,
    },
    {
      date: $_('chonors.awards.3.date'),
      title: $_('chonors.awards.3.title'),
      description: $_('chonors.awards.3.description'),
      icon: award04,
    },
    {
      date: $_('chonors.awards.4.date'),
      title: $_('chonors.awards.4.title'),
      description: $_('chonors.awards.4.description'),
      icon: award01,
    },
  ]);

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".header", {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power3.out",
    });
  });
</script>

<div class="bg-gray-900 text-white min-h-screen p-8">
  <div class="max-w-4xl mx-auto">
    <header class="text-center mb-16 header">
      <h1 class="text-5xl font-bold mb-4">{$t('chonors.title')}</h1>
      <p class="text-lg text-gray-400">
        {$t('chonors.subtitle')}
      </p>
    </header>

    <div class="timeline relative">
      {#each awards as award, i}
        <div
          class="timeline-item mb-16 flex items-center"
          class:flex-row-reverse={i % 2 === 0}
          data-aos={i % 2 === 0 ? 'fade-left' : 'fade-right'}
        >
          <div class="w-1/2 px-8">
            <div
              class="bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform duration-500 hover:scale-105"
            >
              <h2 class="text-2xl font-bold mb-2">{award.title}</h2>
              <p class="text-gray-400 mb-4">{award.description}</p>
              <span class="text-sm text-indigo-400">{award.date}</span>
            </div>
          </div>
          <div class="w-1/2 flex justify-center">
            <div
              class="bg-gray-800 rounded-lg w-32 h-32 flex items-center justify-center shadow-lg"
            >
            <img src={award.icon} alt={award.title} class="w-48 h-48 object-contain mb-4 transition-transform duration-300 hover:scale-200">
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .timeline::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
    background-color: #4a5568;
  }
</style>