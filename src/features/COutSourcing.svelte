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

    // 动画卡片滚动动画 - 创意入场和悬停效果
    const animatedCards = document.querySelectorAll('.animated-card');
    animatedCards.forEach((card, index) => {
      // 设置初始状态
      gsap.set(card, {
        y: 100,
        opacity: 0,
        rotationY: 15,
        scale: 0.9
      });
      
      // 设置卡片内容初始状态
      const cardTitle = card.querySelector('.card-title');
      const cardItems = card.querySelectorAll('.card-item');
      const mainIcon = card.querySelector('.main-icon');
      const cardGlow = card.querySelector('.card-glow');
      
      gsap.set([cardTitle, ...cardItems], {
        y: 30,
        opacity: 0
      });
      
      gsap.set(mainIcon, {
        scale: 0,
        rotation: -180
      });
      
      // 创建入场动画时间线
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
      
      // 卡片入场动画
      tl.to(card, {
        y: 0,
        opacity: 1,
        rotationY: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
        delay: index * 0.2
      })
      // 主图标动画
      .to(mainIcon, {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: "back.out(2)"
      }, "-=0.4")
      // 标题动画
      .to(cardTitle, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3")
      // 列表项动画（交错效果）
      .to(cardItems, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.1
      }, "-=0.2");
      
      // 悬停效果
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -8,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(cardGlow, {
          opacity: 1,
          duration: 0.3
        });
        
        gsap.to(mainIcon, {
          scale: 1.1,
          rotation: 5,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // 图标闪烁效果
        const itemIcons = card.querySelectorAll('.item-icon');
        gsap.to(itemIcons, {
          scale: 1.1,
          duration: 0.2,
          ease: "power2.out",
          stagger: 0.05,
          yoyo: true,
          repeat: 1
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(cardGlow, {
          opacity: 0,
          duration: 0.3
        });
        
        gsap.to(mainIcon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // 专业能力卡片 - 弹跳入场动画
    const professionalCard = document.querySelector('.professional-capabilities-card');
    if (professionalCard) {
      const cardGlow = professionalCard.querySelector('.card-glow');
      const mainIcon = professionalCard.querySelector('.main-icon');
      const cardTitle = professionalCard.querySelector('.card-title');
      const cardItems = professionalCard.querySelectorAll('.card-item');
      
      // 设置初始状态 - 从上方弹入
      gsap.set(professionalCard, {
        y: -100,
        opacity: 0,
        rotationX: -45,
        scale: 0.8
      });
      
      gsap.set([cardTitle, ...cardItems], {
        x: -50,
        opacity: 0
      });
      
      gsap.set(mainIcon, {
        scale: 0,
        rotation: 360
      });
      
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: professionalCard,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
      
      tl1.to(professionalCard, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        scale: 1,
        duration: 1,
        ease: "bounce.out"
      })
      .to(mainIcon, {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.6")
      .to(cardTitle, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .to(cardItems, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1
      }, "-=0.3");
      
      // 专业能力悬停 - 脉冲效果
      professionalCard.addEventListener('mouseenter', () => {
        gsap.to(professionalCard, {
          y: -12,
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out"
        });
        
        gsap.to(cardGlow, {
          opacity: 1,
          duration: 0.3
        });
        
        gsap.to(mainIcon, {
          scale: 1.2,
          rotation: 15,
          duration: 0.4,
          ease: "back.out(2)"
        });
        
        // 脉冲效果
        const itemIcons = professionalCard.querySelectorAll('.item-icon');
        gsap.to(itemIcons, {
          scale: 1.3,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.05,
          yoyo: true,
          repeat: 1
        });
      });
      
      professionalCard.addEventListener('mouseleave', () => {
        gsap.to(professionalCard, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(cardGlow, {
          opacity: 0,
          duration: 0.3
        });
        
        gsap.to(mainIcon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }

    // 资源支持卡片 - 优雅滑入动画
    const resourceCard = document.querySelector('.resource-support-card');
    if (resourceCard) {
      const cardGlow = resourceCard.querySelector('.card-glow');
      const mainIcon = resourceCard.querySelector('.main-icon');
      const cardTitle = resourceCard.querySelector('.card-title');
      const cardItems = resourceCard.querySelectorAll('.card-item');
      
      // 设置初始状态 - 从左侧滑入
      gsap.set(resourceCard, {
        x: -120,
        opacity: 0,
        scale: 0.95,
        skewX: 5
      });
      
      gsap.set([cardTitle, ...cardItems], {
        x: -30,
        opacity: 0
      });
      
      gsap.set(mainIcon, {
        scale: 0.3,
        opacity: 0,
        rotation: -45
      });
      
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: resourceCard,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
      
      tl2.to(resourceCard, {
        x: 0,
        opacity: 1,
        scale: 1,
        skewX: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15
      })
      .to(mainIcon, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.7,
        ease: "back.out(1.7)"
      }, "-=0.6")
      .to(cardTitle, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.4")
      .to(cardItems, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.06
      }, "-=0.3");
      
      // 资源支持悬停 - 浮动效果
      resourceCard.addEventListener('mouseenter', () => {
        gsap.to(resourceCard, {
          y: -8,
          x: 3,
          scale: 1.02,
          duration: 0.4,
          ease: "power2.out"
        });
        
        gsap.to(cardGlow, {
          opacity: 1,
          duration: 0.3
        });
        
        gsap.to(mainIcon, {
          scale: 1.12,
          rotation: 8,
          duration: 0.4,
          ease: "back.out(1.7)"
        });
        
        // 渐进式图标动画
        const itemIcons = resourceCard.querySelectorAll('.item-icon');
        gsap.to(itemIcons, {
          scale: 1.15,
          rotation: 5,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.08,
          yoyo: true,
          repeat: 1
        });
      });
      
      resourceCard.addEventListener('mouseleave', () => {
        gsap.to(resourceCard, {
          y: 0,
          x: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(cardGlow, {
          opacity: 0,
          duration: 0.3
        });
        
        gsap.to(mainIcon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }

    // 技术能力卡片 - 缩放入场动画
    const technicalCard = document.querySelector('.technical-capabilities-card');
    if (technicalCard) {
      const cardGlow = technicalCard.querySelector('.card-glow');
      const mainIcon = technicalCard.querySelector('.main-icon');
      const cardTitle = technicalCard.querySelector('.card-title');
      const cardItems = technicalCard.querySelectorAll('.card-item');
      
      // 设置初始状态 - 从中心缩放
      gsap.set(technicalCard, {
        scale: 0,
        opacity: 0,
        rotationZ: 45
      });
      
      gsap.set([cardTitle, ...cardItems], {
        scale: 0,
        opacity: 0
      });
      
      gsap.set(mainIcon, {
        scale: 0,
        rotation: 720
      });
      
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: technicalCard,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
      
      tl3.to(technicalCard, {
        scale: 1,
        opacity: 1,
        rotationZ: 0,
        duration: 1,
        ease: "back.out(2)",
        delay: 0.3
      })
      .to(mainIcon, {
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)"
      }, "-=0.7")
      .to(cardTitle, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.5")
      .to(cardItems, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.06
      }, "-=0.3");
      
      // 技术能力悬停 - 3D翻转效果
      technicalCard.addEventListener('mouseenter', () => {
        gsap.to(technicalCard, {
          y: -15,
          rotationY: 5,
          scale: 1.04,
          duration: 0.5,
          ease: "power2.out"
        });
        
        gsap.to(cardGlow, {
          opacity: 1,
          duration: 0.3
        });
        
        gsap.to(mainIcon, {
          scale: 1.25,
          rotation: 360,
          duration: 0.6,
          ease: "power2.out"
        });
        
        // 螺旋效果
        const itemIcons = technicalCard.querySelectorAll('.item-icon');
        gsap.to(itemIcons, {
          rotation: 180,
          scale: 1.4,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.03,
          yoyo: true,
          repeat: 1
        });
      });
      
      technicalCard.addEventListener('mouseleave', () => {
        gsap.to(technicalCard, {
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
        
        gsap.to(cardGlow, {
          opacity: 0,
          duration: 0.3
        });
        
        gsap.to(mainIcon, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      });
    }

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
        {$_('itOutsourcingDetails.brandNew')}
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
      {$_('itOutsourcingDetails.title').replace('CN', '')}

    </h2>
    <p class="text-base text-white md:text-lg">
      {$_('itOutsourcingDetails.description')}
    </p>
  </div>
  <!-- First row with 3 cards -->
  <div class="grid gap-6 mb-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animated-cards-container">
    <!-- 专业能力 -->
    <div class="animated-card professional-capabilities-card flex flex-col justify-between p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800 hover:bg-gray-750 transition-all duration-300 overflow-hidden relative">
      <div class="card-glow absolute inset-0 bg-gradient-to-r from-blue-400/10 to-transparent opacity-0 rounded-lg"></div>
      <div class="relative z-10">
         <div class="flex flex-col items-center mb-4">
           <div class="flex items-center justify-center mb-3 icon-container">
              <i class="ri-award-fill text-6xl text-blue-400 main-icon"></i>
            </div>
           <h6 class="text-xl font-bold leading-6 text-white text-center card-title">{$_('itOutsourcingDetails.professionalCapabilities.title')}</h6>
         </div>
         <div class="grid grid-cols-2 gap-x-4 text-base text-gray-300 space-y-1 card-content">
           <div class="space-y-1">
             <p class="flex items-center card-item"><i class="ri-user-add-line text-blue-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.professionalCapabilities.items.0')}</p>
             <p class="flex items-center card-item"><i class="ri-code-s-slash-line text-blue-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.professionalCapabilities.items.1')}</p>
             <p class="flex items-center card-item"><i class="ri-lightbulb-line text-blue-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.professionalCapabilities.items.2')}</p>
             <p class="flex items-center card-item"><i class="ri-speed-up-line text-blue-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.professionalCapabilities.items.3')}</p>
           </div>
           <div class="space-y-1">
             <p class="flex items-center card-item"><i class="ri-graduation-cap-line text-blue-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.professionalCapabilities.items.4')}</p>
             <p class="flex items-center card-item"><i class="ri-rocket-line text-blue-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.professionalCapabilities.items.5')}</p>
             <p class="flex items-center card-item"><i class="ri-heart-line text-blue-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.professionalCapabilities.items.6')}</p>
             <p class="flex items-center card-item"><i class="ri-book-line text-blue-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.professionalCapabilities.items.7')}</p>
           </div>
         </div>
      </div>
    </div>

    <!-- 资源支持 -->
    <div class="animated-card resource-support-card flex flex-col justify-between p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800 hover:bg-gray-750 transition-all duration-300 overflow-hidden relative">
      <div class="card-glow absolute inset-0 bg-gradient-to-r from-green-400/10 to-transparent opacity-0 rounded-lg"></div>
      <div class="relative z-10">
         <div class="flex flex-col items-center mb-4">
           <div class="flex items-center justify-center mb-3 icon-container">
             <i class="ri-team-fill text-6xl text-green-400 main-icon"></i>
           </div>
           <h6 class="text-xl font-bold leading-6 text-white text-center card-title">{$_('itOutsourcingDetails.resourceSupport.title')}</h6>
         </div>
         <div class="grid grid-cols-2 gap-x-4 text-base text-gray-300 space-y-1 card-content">
           <div class="space-y-1">
             <p class="flex items-center card-item"><i class="ri-team-line text-green-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.resourceSupport.items.0')}</p>
             <p class="flex items-center card-item"><i class="ri-bug-line text-green-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.resourceSupport.items.1')}</p>
             <p class="flex items-center card-item"><i class="ri-palette-line text-green-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.resourceSupport.items.2')}</p>
             <p class="flex items-center card-item"><i class="ri-shield-check-line text-green-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.resourceSupport.items.3')}</p>
           </div>
           <div class="space-y-1">
             <p class="flex items-center card-item"><i class="ri-user-search-line text-green-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.resourceSupport.items.4')}</p>
             <p class="flex items-center card-item"><i class="ri-compass-3-line text-green-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.resourceSupport.items.5')}</p>
             <p class="flex items-center card-item"><i class="ri-settings-3-line text-green-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.resourceSupport.items.6')}</p>
             <p class="flex items-center card-item"><i class="ri-megaphone-line text-green-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.resourceSupport.items.7')}</p>
           </div>
         </div>
      </div>
    </div>

    <!-- 技术能力 -->
    <div class="animated-card technical-capabilities-card flex flex-col justify-between p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800 hover:bg-gray-750 transition-all duration-300 overflow-hidden relative">
      <div class="card-glow absolute inset-0 bg-gradient-to-r from-purple-400/10 to-transparent opacity-0 rounded-lg"></div>
      <div class="relative z-10">
         <div class="flex flex-col items-center mb-4">
           <div class="flex items-center justify-center mb-3 icon-container">
             <i class="ri-code-s-slash-fill text-6xl text-purple-400 main-icon"></i>
           </div>
           <h6 class="text-xl font-bold leading-6 text-white text-center card-title">{$_('itOutsourcingDetails.technicalCapabilities.title')}</h6>
         </div>
         <div class="grid grid-cols-2 gap-x-4 text-base text-gray-300 space-y-1 card-content">
           <div class="space-y-1">
             <p class="flex items-center card-item"><i class="ri-global-line text-purple-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.technicalCapabilities.items.0')}</p>
             <p class="flex items-center card-item"><i class="ri-stack-line text-purple-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.technicalCapabilities.items.1')}</p>
             <p class="flex items-center card-item"><i class="ri-code-line text-purple-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.technicalCapabilities.items.2')}</p>
             <p class="flex items-center card-item"><i class="ri-building-line text-purple-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.technicalCapabilities.items.3')}</p>
           </div>
           <div class="space-y-1">
             <p class="flex items-center card-item"><i class="ri-cloud-line text-purple-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.technicalCapabilities.items.4')}</p>
             <p class="flex items-center card-item"><i class="ri-smartphone-line text-purple-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.technicalCapabilities.items.5')}</p>
             <p class="flex items-center card-item"><i class="ri-database-2-line text-purple-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.technicalCapabilities.items.6')}</p>
           </div>
         </div>
      </div>
    </div>
  </div>

  <!-- Second row with 2 cards centered -->
  <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto animated-cards-container">
    <!-- 专注行业 -->
    <div class="animated-card focus-industries-card flex flex-col justify-between p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800 hover:bg-gray-750 transition-all duration-300 overflow-hidden relative">
      <div class="card-glow absolute inset-0 bg-gradient-to-r from-orange-400/10 to-transparent opacity-0 rounded-lg"></div>
      <div class="relative z-10">
         <div class="flex flex-col items-center mb-4">
           <div class="flex items-center justify-center mb-3 icon-container">
             <i class="ri-building-4-fill text-6xl text-orange-400 main-icon"></i>
           </div>
           <h6 class="text-xl font-bold leading-6 text-white text-center card-title">{$_('itOutsourcingDetails.focusIndustries.title')}</h6>
         </div>
         <div class="grid grid-cols-2 gap-x-4 text-base text-gray-300 space-y-1 card-content">
           <div class="space-y-1">
             <p class="flex items-center card-item"><i class="ri-bank-line text-orange-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.focusIndustries.items.0')}</p>
             <p class="flex items-center card-item"><i class="ri-building-3-line text-orange-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.focusIndustries.items.1')}</p>
             <p class="flex items-center card-item"><i class="ri-gamepad-line text-orange-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.focusIndustries.items.2')}</p>
             <p class="flex items-center card-item"><i class="ri-building-4-line text-orange-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.focusIndustries.items.3')}</p>
           </div>
           <div class="space-y-1">
             <p class="flex items-center card-item"><i class="ri-shopping-cart-line text-orange-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.focusIndustries.items.4')}</p>
             <p class="flex items-center card-item"><i class="ri-building-2-line text-orange-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.focusIndustries.items.5')}</p>
             <p class="flex items-center card-item"><i class="ri-health-book-line text-orange-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.focusIndustries.items.6')}</p>
             <p class="flex items-center card-item"><i class="ri-global-line text-orange-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.focusIndustries.items.7')}</p>
           </div>
         </div>
      </div>
    </div>

    <!-- 服务市场 -->
    <div class="animated-card service-markets-card flex flex-col justify-between p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800 hover:bg-gray-750 transition-all duration-300 overflow-hidden relative">
      <div class="card-glow absolute inset-0 bg-gradient-to-r from-teal-400/10 to-transparent opacity-0 rounded-lg"></div>
      <div class="relative z-10">
         <div class="flex flex-col items-center mb-4">
           <div class="flex items-center justify-center mb-3 icon-container">
             <i class="ri-global-fill text-6xl text-teal-400 main-icon"></i>
           </div>
           <h6 class="text-xl font-bold leading-6 text-white text-center card-title">{$_('itOutsourcingDetails.serviceMarkets.title')}</h6>
         </div>
         <div class="grid grid-cols-2 gap-x-4 text-base text-gray-300 space-y-1 card-content">
           <div class="space-y-1">
             <p class="flex items-center card-item"><i class="ri-map-pin-line text-teal-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.serviceMarkets.items.0')}</p>
             <p class="flex items-center card-item"><i class="ri-map-pin-line text-teal-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.serviceMarkets.items.1')}</p>
             <p class="flex items-center card-item"><i class="ri-global-line text-teal-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.serviceMarkets.items.2')}</p>
           </div>
           <div class="space-y-1">
             <p class="flex items-center card-item"><i class="ri-global-line text-teal-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.serviceMarkets.items.3')}</p>
             <p class="flex items-center card-item"><i class="ri-government-line text-teal-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.serviceMarkets.items.4')}</p>
             <p class="flex items-center card-item"><i class="ri-school-line text-teal-400 mr-2 item-icon"></i>{$_('itOutsourcingDetails.serviceMarkets.items.5')}</p>
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

  /* 动画卡片增强样式 */
  .animated-cards-container {
    perspective: 1000px;
  }

  .animated-card {
    transform-style: preserve-3d;
    backface-visibility: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .animated-card:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .focus-industries-card:hover {
    box-shadow: 0 20px 40px rgba(251, 146, 60, 0.2);
  }

  .service-markets-card:hover {
    box-shadow: 0 20px 40px rgba(45, 212, 191, 0.2);
  }

  .professional-capabilities-card:hover {
    box-shadow: 0 20px 40px rgba(96, 165, 250, 0.2);
  }

  .resource-support-card:hover {
    box-shadow: 0 20px 40px rgba(74, 222, 128, 0.2);
  }

  .technical-capabilities-card:hover {
    box-shadow: 0 20px 40px rgba(196, 181, 253, 0.2);
  }

  .card-glow {
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .main-icon {
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    transition: all 0.3s ease;
  }

  .item-icon {
    transition: all 0.2s ease;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }

  .card-item {
    transition: all 0.2s ease;
  }

  .card-item:hover {
    transform: translateX(4px);
    color: rgba(255, 255, 255, 0.9);
  }

  .card-title {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  /* 响应式增强 */
  @media (max-width: 640px) {
    .animated-card {
      transform: none !important;
    }
  }

  /* 性能优化 */
  .animated-card * {
    will-change: transform, opacity;
  }
</style>
