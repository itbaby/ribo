<script>
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { initAOS } from '../config/aos-config';
  import { _ } from 'svelte-i18n';

  let activeTab = 1;
  /**
     * @type {number | undefined}
     */
  let interval;

  // IT外包服务数据
  const itServices = [
    {
      title: '金融科技',
      icon: '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>',
      color: 'bg-blue-500',
      delay: 100
    },
    {
      title: '物联网/5G',
      icon: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
      color: 'bg-gray-700',
      delay: 200
    },
    {
      title: '研发/开发',
      icon: '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>',
      color: 'bg-gray-700',
      delay: 300
    },
    {
      title: 'AI/大数据',
      icon: '<path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m16 6-4-4-4 4"/><path d="M16 18a4 4 0 0 0-8 0"/>',
      color: 'bg-blue-500',
      delay: 400
    },
    {
      title: '云服务',
      icon: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
      color: 'bg-gray-700',
      delay: 500
    },
    {
      title: '元宇宙/游戏',
      icon: '<path d="M2 8a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z"/><path d="M6 12h12"/><path d="M8 16v-8"/><path d="M16 16v-8"/><path d="M12 12v-4"/>',
      color: 'bg-blue-500',
      delay: 600
    },
    {
      title: '产品全球化',
      icon: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
      color: 'bg-gray-700',
      delay: 700
    },
    {
      title: '测试/运维',
      icon: '<path d="M2 12h20"/><path d="M12 2v20"/><path d="m4.93 4.93 14.14 14.14"/><path d="m19.07 4.93-14.14 14.14"/>',
      color: 'bg-blue-500',
      delay: 800
    }
  ];

  // @ts-ignore
  function switchTab(tabNumber) {
    if (tabNumber === activeTab) return;

    const oldTabContent = document.getElementById(`tabs-with-card-${activeTab}`);
    const newTabContent = document.getElementById(`tabs-with-card-${tabNumber}`);

    gsap.to(oldTabContent, { opacity: 0, duration: 0.3, onComplete: () => {
      // @ts-ignore
      oldTabContent.classList.add('hidden');
      // @ts-ignore
      newTabContent.classList.remove('hidden');
      gsap.fromTo(newTabContent, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      activeTab = tabNumber;
    }});
  }

  onMount(async () => {
    // 初始化AOS动画
    await initAOS();
    
    // Set initial state for tabs
    for (let i = 2; i <= 3; i++) {
      const tabContent = document.getElementById(`tabs-with-card-${i}`);
      if (tabContent) {
        tabContent.classList.add('hidden');
        gsap.set(tabContent, { opacity: 0 });
      }
    }
    const initialTabContent = document.getElementById(`tabs-with-card-1`);
    if(initialTabContent) {
      gsap.set(initialTabContent, { opacity: 1 });
    }

    interval = setInterval(() => {
      let nextTab = activeTab + 1;
      if (nextTab > 3) {
        nextTab = 1;
      }
      switchTab(nextTab);
    }, 5000);

    // 六边形悬停动画
    const hexagons = document.querySelectorAll('.hexagon');
    hexagons.forEach(hex => {
      hex.addEventListener('mouseenter', () => {
        gsap.to(hex, {
          y: -10,
          scale: 1.05,
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          duration: 0.3
        });
      });
      
      hex.addEventListener('mouseleave', () => {
        gsap.to(hex, {
          y: 0,
          scale: 1,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          duration: 0.3
        });
      });
    });
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<!-- Features -->
<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto bg-gray-900 text-neutral-200 rounded-xl">
  <div class="relative p-6 md:p-16">
    <!-- Grid -->
    <div class="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
      <div class="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
        <h2 class="text-2xl text-white font-bold sm:text-3xl">
          Fully customizable rules to match your unique needs
        </h2>

        <!-- Tab Navs -->
        <!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
        <nav class="grid gap-4 mt-5 md:mt-10" aria-label="Tabs" role="tablist">
          <button 
            type="button" 
            class="text-start p-4 md:p-5 rounded-xl transition-colors duration-300 {activeTab === 1 ? 'bg-neutral-800 shadow-md' : 'hover:bg-neutral-800'}" 
            on:click={() => switchTab(1)}>
            <span class="flex gap-x-6">
              <svg class="shrink-0 mt-2 size-6 md:size-7 {activeTab === 1 ? 'text-blue-500' : 'text-neutral-200'}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/></svg>
              <span class="grow">
                <span class="block text-lg font-semibold {activeTab === 1 ? 'text-blue-500' : 'text-neutral-200'}">Advanced tools</span>
                <span class="block mt-1 text-neutral-300">Use Preline thoroughly thought and automated libraries to manage your businesses.</span>
              </span>
            </span>
          </button>

          <button 
            type="button" 
            class="text-start p-4 md:p-5 rounded-xl transition-colors duration-300 {activeTab === 2 ? 'bg-neutral-800 shadow-md' : 'hover:bg-neutral-800'}" 
            on:click={() => switchTab(2)}>
            <span class="flex gap-x-6">
              <svg class="shrink-0 mt-2 size-6 md:size-7 {activeTab === 2 ? 'text-blue-500' : 'text-neutral-200'}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
              <span class="grow">
                <span class="block text-lg font-semibold {activeTab === 2 ? 'text-blue-500' : 'text-neutral-200'}">Smart dashboards</span>
                <span class="block mt-1 text-neutral-300">Quickly Preline sample components, copy-paste codes, and start right off.</span>
              </span>
            </span>
          </button>

          <button 
            type="button" 
            class="text-start p-4 md:p-5 rounded-xl transition-colors duration-300 {activeTab === 3 ? 'bg-neutral-800 shadow-md' : 'hover:bg-neutral-800'}" 
            on:click={() => switchTab(3)}>
            <span class="flex gap-x-6">
              <svg class="shrink-0 mt-2 size-6 md:size-7 {activeTab === 3 ? 'text-blue-500' : 'text-neutral-200'}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
              <span class="grow">
                <span class="block text-lg font-semibold {activeTab === 3 ? 'text-blue-500' : 'text-neutral-200'}">Powerful features</span>
                <span class="block mt-1 text-neutral-300">Reduce time and effort on building modern look design with Preline only.</span>
              </span>
            </span>
          </button>
        </nav>
        <!-- End Tab Navs -->
      </div>
      <!-- End Col -->
       <!-- svelte-ignore a11y_img_redundant_alt -->
      <div class="lg:col-span-6">
        <div class="relative">
          <!-- Tab Content -->
          <div>
            <div id="tabs-with-card-1" role="tabpanel">
              
              <img class="shadow-xl shadow-gray-900/30 dark:shadow-black/30 rounded-xl h-[600px] w-full object-cover" src="/src/assets/output.jpg" alt="Features Image">
            </div>

            <div id="tabs-with-card-2" role="tabpanel">
              <img class="shadow-xl shadow-gray-900/30 dark:shadow-black/30 rounded-xl h-[600px] w-full object-cover" src="/src/assets/service.jpg" alt="Features Image">
            </div>

            <div id="tabs-with-card-3" role="tabpanel">
              <img class="shadow-xl shadow-gray-900/30 dark:shadow-black/30 rounded-xl h-[600px] w-full object-cover" src="/src/assets/sponsors.jpg" alt="Features Image">
            </div>
          </div>
          <!-- End Tab Content -->

          <!-- SVG Element -->
          <div class="hidden absolute top-0 end-0 translate-x-20 md:block lg:translate-x-20">
            <svg class="w-16 h-auto text-gray-400" width="121" height="135" viewBox="0 0 121 135" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
              <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
              <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
            </svg>
          </div>
          <!-- End SVG Element -->
        </div>
      </div>
      <!-- End Col -->
    </div>
    <!-- End Grid -->

    <!-- Background Color -->
    <div class="absolute inset-0 grid grid-cols-12 size-full">
      <div class="col-span-full lg:col-span-7 lg:col-start-6 bg-gray-800 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full"></div>
    </div>
    <!-- End Background Color -->
  </div>
</div>
<!-- End Features -->

<!-- IT外包服务 Hexagon Grid -->
<div class="max-w-[85rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20 mx-auto bg-gray-900 text-white">
  <div class="text-center mb-16">
    <h2 class="text-3xl font-bold mb-4 text-white sm:text-4xl md:text-5xl">IT外包服务</h2>
    <p class="text-lg text-gray-300 max-w-3xl mx-auto">睿伯旗下技术团队睿诚科技提供专业ITO服务，以完善交付体系为客户提供技术支持</p>
  </div>
  <!-- Hexagon Grid -->
  <div class="flex flex-wrap justify-center gap-6 md:gap-8 max-w-6xl mx-auto" style="min-height: 300px;">
    {#each itServices as service, index}
      <div 
        class="hexagon relative {service.color} w-32 h-32 md:w-40 md:h-40 flex items-center justify-center text-white transition-all duration-300 shadow-lg overflow-visible"
      >
        <div class="flex flex-col items-center justify-center p-4 text-center">
          <svg class="w-10 h-10 mb-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            {@html service.icon}
          </svg>
          <span class="text-sm font-medium">{service.title}</span>
        </div>
      </div>
    {/each}
  </div>
</div>
<!-- End IT外包服务 Hexagon Grid -->

<style>
  /* 六边形样式 */
  .hexagon {
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 128px;
    min-width: 128px;
  }
  
  .hexagon:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  /* Ensure SVG icons are visible */
  .hexagon svg {
    position: relative;
    z-index: 2;
    display: block;
  }

  /* Ensure text is visible */
  .hexagon span {
    position: relative;
    z-index: 2;
    display: block;
  }
</style>
