<script>
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';

  let activeTab = 1;
  let interval;

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

  onMount(() => {
    // Set initial state
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
    }, 3000);
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
