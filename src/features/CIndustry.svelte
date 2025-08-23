<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import AOS from 'aos';
  import 'aos/dist/aos.css';

  let currentIndustryIndex = 0;
  let intervalId;

  const industryCategories = [
    {
      name: '金融',
      icon: 'ri-bank-fill',
      bg: '/src/assets/service.jpg',
      title: '法本信息助力某新能源车企提升智能网联化能力',
      description: '法本信息为某互联网造车新势力车企提供汽车控制系统CAN总线模块、通信模块等项目的开发，从而帮助客户实现人脸识别和情绪识别功能，使得对应不同用户和不同状态，系统可自动调整座椅、音乐、氛围灯、空调等，极大的提升了用户的驾驶体验。通过双方深度软件合作，大幅提升该客户全车交互智能化研发效率，节约了项目研发成本，加快了新车型上市时间。'
    },
    {
      name: '汽车',
      icon: 'ri-car-fill',
      bg: '/src/assets/riccardo-annandale-7e2pe9wjL9M-unsplash.jpg',
      title: '汽车行业解决方案',
      description: '提供智能驾驶、车联网、车载信息娱乐系统等解决方案，助力汽车制造商实现创新技术研发和产品升级。'
    },
    {
      name: '互联网',
      icon: 'ri-global-fill',
      bg: '/src/assets/milad-fakurian-seA-FPPXL-M-unsplash.jpg',
      title: '互联网平台服务',
      description: '为互联网企业提供大数据、云计算、人工智能等技术支持，优化用户体验，提升平台运营效率。'
    },
    {
      name: '运营商',
      icon: 'ri-phone-fill',
      bg: '/src/assets/milad-fakurian-wNsHBf_bTBo-unsplash.jpg',
      title: '电信运营商服务',
      description: '提供5G网络建设、边缘计算、物联网等技术服务，助力运营商构建高效、智能的通信网络。'
    },
    {
      name: '通信',
      icon: 'ri-wireless-charging-fill',
      bg: '/src/assets/scott-graham-OQMZwNd3ThU-unsplash.jpg',
      title: '通信技术研发',
      description: '专注于下一代通信技术研发，包括光通信、卫星通信、量子通信等，推动通信行业发展。'
    },
    {
      name: '高科技',
      icon: 'ri-flask-fill',
      bg: '/src/assets/jeffrey-blum-7-gaPkhIgqs-unsplash.jpg',
      title: '高科技产业创新',
      description: '在高科技领域提供前沿技术研发和解决方案，涵盖人工智能、区块链、生物科技等。'
    },
    {
      name: '能源',
      icon: 'ri-lightbulb-fill',
      bg: '/src/assets/richard-horvath-cPccYbPrF-A-unsplash.jpg',
      title: '新能源解决方案',
      description: '致力于新能源技术开发与应用，提供智能电网、储能系统、清洁能源管理等一体化解决方案。'
    },
  ];

  function selectIndustry(index) {
    currentIndustryIndex = index;
    resetAutoPlay();
  }

  function startAutoPlay() {
    intervalId = setInterval(() => {
      currentIndustryIndex = (currentIndustryIndex + 1) % industryCategories.length;
    }, 5000); // 每5秒切换一次
  }

  function resetAutoPlay() {
    clearInterval(intervalId);
    startAutoPlay();
  }

  onMount(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    gsap.fromTo(".main-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });
    gsap.fromTo(".main-description", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.8 });
    gsap.fromTo(".action-button", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 1.1 });
    gsap.fromTo(".industry-cards", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 1.4 });

    startAutoPlay();

    return () => clearInterval(intervalId);
  });
</script>

<div class="relative h-[90vh] overflow-hidden">
  <!-- Background Image -->
  <div class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000" style="background-image: url('{industryCategories[currentIndustryIndex].bg}');"></div>

  <!-- Overlay -->
  <div class="absolute inset-0 bg-black opacity-50"></div>

  <!-- Main Content -->
  <div class="relative z-10 flex flex-col items-center justify-center h-[90vh] text-white px-4 md:px-8 lg:px-16">
    <div class="max-w-4xl text-center">
      <h1 class="main-title text-3xl md:text-5xl font-bold mb-4" data-aos="fade-up">
        {industryCategories[currentIndustryIndex].title}
      </h1>
      <p class="main-description text-base md:text-lg mb-8" data-aos="fade-up" data-aos-delay="200">
        {industryCategories[currentIndustryIndex].description}
      </p>
      <button class="action-button bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300" data-aos="fade-up" data-aos-delay="400">
        了解详情 >
      </button>
    </div>
  </div>

  <!-- Bottom Industry Categories -->
  <div class="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-8">
    <div class="industry-cards grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-8 w-full max-w-6xl mx-auto px-4 md:px-0">
            {#each industryCategories as category, i}
                <div
                    class="flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out h-32 shadow-lg hover:shadow-xl transform hover:-translate-y-1 backdrop-blur-md border text-white {currentIndustryIndex === i ? 'bg-blue-700/50 border-sky-300' : 'bg-black/20 border-white/10'}"
                    on:click={() => selectIndustry(i)}
                    on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectIndustry(i); }}
                    role="button"
                    tabindex="0"
                >
                    <i class="{category.icon} text-5xl mb-2"></i>
                    <span class="text-sm text-center font-semibold">{category.name}</span>
                </div>
            {/each}
        </div>
  </div>
</div>

<style>
  /* Add any specific styles here if needed, though Tailwind should handle most. */
</style>