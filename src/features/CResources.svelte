<script>
// @ts-nocheck

  import { onMount } from 'svelte';
  import { initAOS } from '../config/aos-config';
  import { _ } from 'svelte-i18n';

  onMount(() => {
    // 初始化AOS动画
    initAOS();
  });

  // 从 i18n 获取数据（使用响应式赋值确保随语言切换更新）
  let categories = [];
  let services = [];
  let processSteps = [];
  let trainingLevels = [];
  let caseStudy = {};

  // @ts-ignore
  $: categories = $_('resources.categories.items') || [];
  // @ts-ignore
  $: services = $_('resources.services.items') || [];
  // @ts-ignore
  $: processSteps = $_('resources.process.steps') || [];
  // @ts-ignore
  $: trainingLevels = $_('resources.training.levels') || [];
  // @ts-ignore
  $: caseStudy = $_('resources.caseStudy.case') || {};

  // 本地图片（非文本，不做 i18n）与服务项按顺序对应
  const serviceImages = [
    '/src/assets/service.jpg',
    '/src/assets/secondary.jpg',
    '/src/assets/third.jpg',
    '/src/assets/idea-2.jpg'
  ];
</script>

<div class="min-h-screen bg-gray-900 text-gray-100">
  <!-- 英雄区 -->
  <section class="relative h-screen flex items-center justify-center overflow-hidden" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-out-back">
    <div class="absolute inset-0 z-0">
      <img
        src="/src/assets/top.jpg"
        alt={$_('resources.hero.title')}
        class="w-full h-full object-cover opacity-40"
      />
    </div>
    <div class="relative z-10 text-center px-4 max-w-5xl mx-auto">
      <h1 class="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
        {$_('resources.hero.title')}
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="400" data-aos-duration="800">
        {$_('resources.hero.subtitle')}
      </p>
      <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50" data-aos="fade-up" data-aos-delay="600" data-aos-duration="800" data-aos-offset="50">
        {$_('resources.hero.button')}
      </button>
    </div>
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>

  <!-- 分类区 -->
  <section class="py-20 px-4 bg-gray-800">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold mb-16 text-center" data-aos="fade-up">
        {$_('resources.categories.title')}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each categories as category, i (i)}
          <div
            class="bg-gray-700 rounded-xl p-8 transition-all duration-300 hover:bg-gray-600 hover:shadow-lg hover:shadow-blue-900/20"
            data-aos="fade-up"
            data-aos-delay={(i + 1) * 100}
          >
            <div class="text-5xl mb-4 transition-transform duration-300 hover:scale-110">{category.icon}</div>
            <h3 class="text-xl font-bold mb-3 text-blue-400">{category.title}</h3>
            <p class="text-gray-300">{category.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- 列表区 -->
  <section class="py-20 px-4 bg-gray-900">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold mb-16 text-center" data-aos="fade-up">
        {$_('resources.services.title')}
      </h2>
      <div class="space-y-16">
        {#each services as service, index (index)}
          <div
            class="flex flex-col md:flex-row items-center gap-8"
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            {#if index % 2 === 0}
              <div class="md:w-1/2 rounded-xl overflow-hidden shadow-xl">
                <img
                  src={serviceImages[index]}
                  alt={service.title}
                  class="w-full h-80 object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div class="md:w-1/2 text-left">
                <h3 class="text-2xl font-bold mb-4 text-blue-400">{service.title}</h3>
                <p class="text-gray-300 text-lg">{service.description}</p>
              </div>
            {:else}
              <div class="md:w-1/2 text-right order-2 md:order-1">
                <h3 class="text-2xl font-bold mb-4 text-blue-400">{service.title}</h3>
                <p class="text-gray-300 text-lg">{service.description}</p>
              </div>
              <div class="md:w-1/2 rounded-xl overflow-hidden shadow-xl order-1 md:order-2">
                <img
                  src={serviceImages[index]}
                  alt={service.title}
                  class="w-full h-80 object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- 派遣管理全流程 -->
  <section class="py-20 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold mb-16 text-center" data-aos="fade-up">
        {$_('resources.process.title')}
      </h2>
      <div class="relative">
        <!-- 连接线 -->
        <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-600 transform -translate-x-1/2"></div>

        <div class="space-y-12">
          {#each processSteps as step, index (index)}
            <div class={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`} data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'} data-aos-delay={index * 100}>
              <!-- 时间点 -->
              <div class="hidden md:flex absolute left-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-gray-800 transform -translate-x-1/2 z-10"></div>
              <div class="md:w-1/2 px-8 md:px-16">
                <div class="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-blue-900/30 transition-all duration-300">
                  <h3 class="text-2xl font-bold mb-3 text-blue-400">{step.title}</h3>
                  <p class="text-gray-300">{step.description}</p>
                </div>
              </div>
              <div class="md:w-1/2"></div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- 培训体系与客户案例 -->
  <section class="py-20 px-4 bg-gray-900">
    <div class="max-w-7xl mx-auto">
      <!-- 培训体系 -->
      <h2 class="text-3xl md:text-4xl font-bold mb-16 text-center" data-aos="fade-up">
        {$_('resources.training.title')}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {#each trainingLevels as level, i (i)}
          <div class="bg-gray-800 rounded-xl p-8 shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-900/30" data-aos="zoom-in" data-aos-delay={(i + 1) * 150}>
            <h3 class="text-xl font-bold mb-5 text-blue-400 border-b border-blue-700 pb-3">{level.title}</h3>
            <ul class="space-y-3">
              {#each level.items as item, j}
                <li class="flex items-start" data-aos="fade-up" data-aos-delay={(i + 1) * 150 + j * 50}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-300">{item}</span>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>

      <!-- 客户案例 -->
      <h2 class="text-3xl md:text-4xl font-bold mb-10 text-center" data-aos="fade-up">
        {$_('resources.caseStudy.title')}
      </h2>
      <div class="bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl" data-aos="fade-up" data-aos-delay="200">
        <h3 class="text-2xl font-bold mb-6 text-blue-400">{caseStudy.title}</h3>
        <p class="text-gray-300 leading-relaxed">{caseStudy.description}</p>
        <div class="mt-8 flex justify-center">
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50">
            {$_('resources.caseStudy.button')}
          </button>
        </div>
      </div>
    </div>
  </section>

</div>