<script>
// @ts-nocheck

  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { initAOS } from '../config/aos-config';
  import { _ } from 'svelte-i18n';

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  let activeTab = 1;
  /**
     * @type {number | undefined}
     */
  let interval;

  // IT外包服务数据 - 从国际化文件获取
  $: itServices = $_("itOutsourcingServices.services") || [];

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

    // 六边形滚动动画 - 当可见时执行zoom-in动画
    const hexagons = document.querySelectorAll('.hexagon');
    hexagons.forEach((hex, index) => {
      // 设置初始状态
      gsap.set(hex, {
        scale: 0.5,
        opacity: 0,
        y: 50
      });
      
      // 创建ScrollTrigger动画
      gsap.to(hex, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: hex,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        },
        delay: index * 0.1 // 添加交错延迟效果
      });
      
      // 保留悬停效果
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
    // 清理ScrollTrigger实例
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
    <h2 class="text-3xl font-bold mb-4 text-white sm:text-4xl md:text-5xl">{$_("itOutsourcingServices.title") || 'IT外包服务'}</h2>
    <p class="text-lg text-gray-300 max-w-3xl mx-auto">{$_("itOutsourcingServices.subtitle") || '睿伯旗下技术团队睿诚科技提供专业ITO服务，以完善交付体系为客户提供技术支持'}</p>
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
<div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 bg-gray-900">
  <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
    <div>
      <p class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
        Brand new
      </p>
    </div>
    <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto">
      <span class="relative inline-block">
        <svg viewBox="0 0 52 24" fill="currentColor" class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
          <defs>
            <pattern id="18302e52-9e2a-4c8e-9550-0cbb21b38e55" x="0" y="0" width=".135" height=".30">
              <circle cx="1" cy="1" r=".7"></circle>
            </pattern>
          </defs>
          <rect fill="url(#18302e52-9e2a-4c8e-9550-0cbb21b38e55)" width="52" height="24"></rect>
        </svg>
        <span class="relative">CN</span>
      </span>
      服务-IT外包业务

    </h2>
    <p class="text-base text-white md:text-lg">
      专业的IT外包服务，让您的企业在数字化转型中保持领先优势。我们提供全方位的技术解决方案，从软件开发到系统维护，助力您的业务高效运营，降低成本，提升竞争力。
    </p>
  </div>
  <!-- First row with 3 cards -->
  <div class="grid gap-6 mb-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    <!-- 专业能力 -->
    <div class="flex flex-col justify-between p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800 hover:bg-gray-750 transition-all duration-300">
      <div>
         <div class="flex flex-col items-center mb-4">
           <div class="flex items-center justify-center mb-3">
              <i class="ri-award-fill text-6xl text-blue-400"></i>
            </div>
           <h6 class="text-xl font-bold leading-6 text-white text-center">专业能力</h6>
         </div>
         <div class="grid grid-cols-2 gap-x-4 text-base text-gray-300 space-y-1">
           <div class="space-y-1">
             <p class="flex items-center"><i class="ri-user-add-line text-blue-400 mr-2"></i>招聘交付</p>
             <p class="flex items-center"><i class="ri-code-s-slash-line text-blue-400 mr-2"></i>技术研发</p>
             <p class="flex items-center"><i class="ri-lightbulb-line text-blue-400 mr-2"></i>解决方案</p>
             <p class="flex items-center"><i class="ri-speed-up-line text-blue-400 mr-2"></i>运营效率</p>
           </div>
           <div class="space-y-1">
             <p class="flex items-center"><i class="ri-graduation-cap-line text-blue-400 mr-2"></i>培训提升</p>
             <p class="flex items-center"><i class="ri-rocket-line text-blue-400 mr-2"></i>战略创新</p>
             <p class="flex items-center"><i class="ri-heart-line text-blue-400 mr-2"></i>员工关怀</p>
             <p class="flex items-center"><i class="ri-book-line text-blue-400 mr-2"></i>知识储备</p>
           </div>
         </div>
      </div>
    </div>

    <!-- 资源支持 -->
    <div class="flex flex-col justify-between p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800 hover:bg-gray-750 transition-all duration-300">
      <div>
         <div class="flex flex-col items-center mb-4">
           <div class="flex items-center justify-center mb-3">
             <i class="ri-team-fill text-6xl text-green-400"></i>
           </div>
           <h6 class="text-xl font-bold leading-6 text-white text-center">资源支持</h6>
         </div>
         <div class="grid grid-cols-2 gap-x-4 text-base text-gray-300 space-y-1">
           <div class="space-y-1">
             <p class="flex items-center"><i class="ri-team-line text-green-400 mr-2"></i>研发团队</p>
             <p class="flex items-center"><i class="ri-bug-line text-green-400 mr-2"></i>质量测试团队</p>
             <p class="flex items-center"><i class="ri-palette-line text-green-400 mr-2"></i>用户体验设计</p>
             <p class="flex items-center"><i class="ri-shield-check-line text-green-400 mr-2"></i>风险控制团队</p>
           </div>
           <div class="space-y-1">
             <p class="flex items-center"><i class="ri-user-search-line text-green-400 mr-2"></i>招聘团队</p>
             <p class="flex items-center"><i class="ri-compass-3-line text-green-400 mr-2"></i>敏捷教练</p>
             <p class="flex items-center"><i class="ri-settings-3-line text-green-400 mr-2"></i>运营维护团队</p>
             <p class="flex items-center"><i class="ri-megaphone-line text-green-400 mr-2"></i>市场营销团队</p>
           </div>
         </div>
      </div>
    </div>

    <!-- 技术能力 -->
    <div class="flex flex-col justify-between p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800 hover:bg-gray-750 transition-all duration-300">
      <div>
         <div class="flex flex-col items-center mb-4">
           <div class="flex items-center justify-center mb-3">
             <i class="ri-code-s-slash-fill text-6xl text-purple-400"></i>
           </div>
           <h6 class="text-xl font-bold leading-6 text-white text-center">技术能力</h6>
         </div>
         <div class="grid grid-cols-2 gap-x-4 text-base text-gray-300 space-y-1">
           <div class="space-y-1">
             <p class="flex items-center"><i class="ri-global-line text-purple-400 mr-2"></i>网页开发</p>
             <p class="flex items-center"><i class="ri-stack-line text-purple-400 mr-2"></i>全栈开发</p>
             <p class="flex items-center"><i class="ri-code-line text-purple-400 mr-2"></i>前/后端开发</p>
             <p class="flex items-center"><i class="ri-building-line text-purple-400 mr-2"></i>架构</p>
           </div>
           <div class="space-y-1">
             <p class="flex items-center"><i class="ri-cloud-line text-purple-400 mr-2"></i>云开发</p>
             <p class="flex items-center"><i class="ri-smartphone-line text-purple-400 mr-2"></i>手机端开发</p>
             <p class="flex items-center"><i class="ri-database-2-line text-purple-400 mr-2"></i>数据开发</p>
           </div>
         </div>
      </div>
    </div>
  </div>

  <!-- Second row with 2 cards centered -->
  <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
    <!-- 专注行业 -->
    <div class="flex flex-col justify-between p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800 hover:bg-gray-750 transition-all duration-300">
      <div>
         <div class="flex flex-col items-center mb-4">
           <div class="flex items-center justify-center mb-3">
             <i class="ri-building-4-fill text-6xl text-orange-400"></i>
           </div>
           <h6 class="text-xl font-bold leading-6 text-white text-center">专注行业</h6>
         </div>
         <div class="grid grid-cols-2 gap-x-4 text-base text-gray-300 space-y-1">
           <div class="space-y-1">
             <p class="flex items-center"><i class="ri-bank-line text-orange-400 mr-2"></i>金融行业</p>
             <p class="flex items-center"><i class="ri-factory-line text-orange-400 mr-2"></i>智能制造</p>
             <p class="flex items-center"><i class="ri-gamepad-line text-orange-400 mr-2"></i>游戏开发</p>
             <p class="flex items-center"><i class="ri-building-4-line text-orange-400 mr-2"></i>智能产业园</p>
           </div>
           <div class="space-y-1">
             <p class="flex items-center"><i class="ri-shopping-cart-line text-orange-400 mr-2"></i>电子商务</p>
             <p class="flex items-center"><i class="ri-building-2-line text-orange-400 mr-2"></i>房地产/物业</p>
             <p class="flex items-center"><i class="ri-health-book-line text-orange-400 mr-2"></i>智能医疗</p>
             <p class="flex items-center"><i class="ri-global-line text-orange-400 mr-2"></i>互联网</p>
           </div>
         </div>
      </div>
    </div>

    <!-- 服务市场 -->
    <div class="flex flex-col justify-between p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800 hover:bg-gray-750 transition-all duration-300">
      <div>
         <div class="flex flex-col items-center mb-4">
           <div class="flex items-center justify-center mb-3">
             <i class="ri-global-fill text-6xl text-teal-400"></i>
           </div>
           <h6 class="text-xl font-bold leading-6 text-white text-center">服务市场</h6>
         </div>
         <div class="grid grid-cols-2 gap-x-4 text-base text-gray-300 space-y-1">
           <div class="space-y-1">
             <p class="flex items-center"><i class="ri-map-pin-line text-teal-400 mr-2"></i>国内一线城市</p>
             <p class="flex items-center"><i class="ri-map-pin-line text-teal-400 mr-2"></i>国内二三线城市</p>
             <p class="flex items-center"><i class="ri-global-line text-teal-400 mr-2"></i>日本　美国　香港</p>
           </div>
           <div class="space-y-1">
             <p class="flex items-center"><i class="ri-global-line text-teal-400 mr-2"></i>韩国　欧洲　新加坡</p>
             <p class="flex items-center"><i class="ri-government-line text-teal-400 mr-2"></i>政府机关</p>
             <p class="flex items-center"><i class="ri-school-line text-teal-400 mr-2"></i>高校</p>
           </div>
         </div>
      </div>
    </div>
  </div>
</div>
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
