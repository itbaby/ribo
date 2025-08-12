<script>
  import { onMount } from 'svelte';
  import AOS from 'aos';
  import 'aos/dist/aos.css';

  onMount(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true
    });
  });

  // 轮播功能
  onMount(() => {
    const carousel = document.getElementById('category-carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (carousel && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -300, behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
      });

      // 自动轮播
      let autoScrollInterval;
      let isHovered = false;

      const startAutoScroll = () => {
        autoScrollInterval = setInterval(() => {
          if (!isHovered) {
            const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
            if (carousel.scrollLeft >= scrollWidth) {
              carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
              carousel.scrollBy({ left: 300, behavior: 'smooth' });
            }
          }
        }, 5000);
      };

      startAutoScroll();

      // 鼠标悬停时暂停自动轮播
      carousel.addEventListener('mouseenter', () => {
        isHovered = true;
      });

      carousel.addEventListener('mouseleave', () => {
        isHovered = false;
      });

      // 清理函数
      return () => {
        clearInterval(autoScrollInterval);
        prevBtn.removeEventListener('click', () => {});
        nextBtn.removeEventListener('click', () => {});
      };
    }
  });

  // 服务类别数据
  const categories = [
    {
      title: '金融科技',
      icon: '📊',
      description: '提供金融行业的技术解决方案，包括支付系统、风险管理和区块链应用。'
    },
    {
      title: 'AI/大数据',
      icon: '🤖',
      description: '利用人工智能和大数据分析技术，帮助企业实现智能化决策和业务优化。'
    },
    {
      title: '物联网/5G',
      icon: '🔗',
      description: '开发物联网设备和5G应用，实现智能连接和高效通信。'
    },
    {
      title: '研发/开发',
      icon: '💻',
      description: '提供专业的软件开发和研发服务，从需求分析到产品上线全程支持。'
    },
    {
      title: '云服务',
      icon: '☁️',
      description: '提供云计算解决方案，包括云迁移、云托管和云安全服务。'
    },
    {
      title: '元宇宙/游戏',
      icon: '🎮',
      description: '开发元宇宙应用和游戏产品，创造沉浸式数字体验。'
    },
    {
      title: '测试/运维',
      icon: '🔧',
      description: '提供软件测试和运维服务，确保系统稳定运行和持续优化。'
    },
    {
      title: '产品全球化',
      icon: '🌍',
      description: '帮助企业产品实现全球化，包括多语言支持和本地化服务。'
    }
  ];
</script>

<svelte:head>
  <title>IT外包服务 - 睿柏科技</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
  <div class="absolute inset-0 z-0">
    <div class="absolute inset-0 bg-black opacity-40"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.15)_0,_rgba(0,0,0,0)_70%)]"></div>
    <!-- 科技感背景元素 -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
      {#each Array(20) as _, i}
        <div class="absolute rounded-full bg-blue-500" style="width: {Math.random() * 10 + 2}px; height: {Math.random() * 10 + 2}px; top: {Math.random() * 100}%; left: {Math.random() * 100}%; animation: float {Math.random() * 10 + 10}s infinite linear"></div>
      {/each}
    </div>
  </div>

  <div class="container mx-auto px-6 z-10 text-center">
    <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight" data-aos="fade-up">
      IT外包服务
    </h1>
    <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10" data-aos="fade-up" data-aos-delay="200">
      睿柏旗下技术团队睿诚科技提供专业ITO服务，以完备交付体系为客户提供技术支持
    </p>
    <div data-aos="fade-up" data-aos-delay="400">
      <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        了解更多
      </button>
    </div>
  </div>

  <div class="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
    </svg>
  </div>

  <style>
    @keyframes float {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) translateX(100px);
        opacity: 0;
      }
    }
  </style>
</section>

<!-- Outsource Section -->
<section class="py-20 bg-gray-50">
  <div class="container mx-auto px-6">
    <div class="text-center mb-16" data-aos="fade-up">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">专业IT外包服务</h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        我们提供全方位的IT外包服务，帮助企业降低成本、提高效率、专注核心业务
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300" data-aos="fade-up" data-aos-delay="100">
        <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-3">数字化运营服务</h3>
        <p class="text-gray-600">
          提供全面的数字化运营解决方案，包括数据标注、内容审核和客服业务，帮助企业实现数字化转型。
        </p>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300" data-aos="fade-up" data-aos-delay="200">
        <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-3">专业技术团队</h3>
        <p class="text-gray-600">
          我们拥有一支经验丰富的专业技术团队，涵盖软件开发、测试、运维等多个领域，为客户提供高质量服务。
        </p>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300" data-aos="fade-up" data-aos-delay="300">
        <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-3">全球化服务能力</h3>
        <p class="text-gray-600">
          我们的服务覆盖全球多个地区，包括国内一线城市、日本、美国、香港、韩国、欧洲和新加坡等。
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Category Section -->
<section class="py-20 bg-white overflow-hidden">
  <div class="container mx-auto px-6">
    <div class="text-center mb-16" data-aos="fade-up">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">服务类别</h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        我们提供多样化的IT外包服务，满足不同行业和企业的需求
      </p>
    </div>

    <div class="relative" data-aos="fade-up">
      <!-- 轮播容器 -->
      <div class="overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory" id="category-carousel">
        <div class="flex space-x-6 min-w-max px-2">
          {#each categories as category, index}
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 snap-center w-72 flex-shrink-0" data-aos="fade-up" data-aos-delay="{index * 100}">
              <div class="text-4xl mb-4">{category.icon}</div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
              <p class="text-gray-600 text-sm">{category.description}</p>
            </div>
          {/each}
        </div>
      </div>

      <!-- 左右箭头 -->
      <button id="prev-btn" aria-label="上一个" class="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-blue-50 transition-colors hidden md:block">
        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button id="next-btn" aria-label="下一个" class="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-blue-50 transition-colors hidden md:block">
        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </div>
</section>

<style>
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
</style>
<!-- 行业专注和服务市场 -->
<section class="py-20 bg-gray-900 text-white">
  <div class="container mx-auto px-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div data-aos="fade-right">
        <h2 class="text-3xl font-bold mb-6">专注行业</h2>
        <ul class="space-y-3">
          {#each ['金融行业', '电子商务', '智能制造', '房地产产业', '游戏开发', '智能医疗', '智能产业园', '互联网'] as industry}
            <li class="flex items-center">
              <svg class="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              {industry}
            </li>
          {/each}
        </ul>
      </div>

      <div data-aos="fade-left">
        <h2 class="text-3xl font-bold mb-6">服务市场</h2>
        <ul class="space-y-3">
          {#each ['国内一线城市', '政府机关', '国内二三线城市', '高校', '日本', '美国', '香港', '韩国', '欧洲', '新加坡'] as market}
            <li class="flex items-center">
              <svg class="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              {market}
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</section>