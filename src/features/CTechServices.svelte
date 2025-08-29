<script>
  import { onMount } from 'svelte';
  import AOS from 'aos';
  import 'aos/dist/aos.css';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  onMount(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true
    });

    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animate elements on scroll
    gsap.utils.toArray('.animate-on-scroll').forEach(element => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          gsap.to(element, { opacity: 1, y: 0, duration: 0.8 });
        },
        onLeaveBack: () => {
          gsap.to(element, { opacity: 0, y: 50, duration: 0.5 });
        }
      });
    });

    // Tech pattern animation
    const patternElements = document.querySelectorAll('.tech-pattern');
    patternElements.forEach((el, index) => {
      gsap.to(el, {
        rotation: 360,
        duration: 20 + index * 5,
        repeat: -1,
        ease: 'linear'
      });
    });
  });

  // Service data
  const services = [
    {
      title: '人才派遣',
      description: '提供灵活的人才派遣服务，满足企业短期和长期的人力资源需求。',
      icon: '👥'
    },
    {
      title: '数字化技术服务',
      description: '领先的数字化转型解决方案，帮助企业实现业务流程优化。',
      icon: '💻'
    },
    {
      title: '系统应用开发',
      description: '定制化的系统开发服务，满足企业特定业务需求。',
      icon: '🛠️'
    },
    {
      title: '测试运维',
      description: '专业的测试和运维服务，确保系统稳定运行。',
      icon: '🔧'
    }
  ];

  // Core advantages
  const advantages = [
    {
      title: '专业团队',
      description: '行业深耕14年，人力资源专家+行业顾问，提供从招聘到离职的闭环服务。',
      color: 'from-blue-600 to-indigo-700'
    },
    {
      title: '合规保障',
      description: '全流程法律风控体系，覆盖用工合同、薪酬福利、劳动风险。',
      color: 'from-purple-600 to-pink-700'
    },
    {
      title: '科技赋能',
      description: 'AI驱动的人才匹配与预测系统以及区块链技术实现简历溯源与背调。',
      color: 'from-green-600 to-teal-700'
    },
    {
      title: '定制服务',
      description: '灵活适配短期项目制、长期派驻、跨境外包等多元场景。',
      color: 'from-orange-600 to-amber-700'
    },
    {
      title: '风险管控',
      description: '专业法律以及人事团队支持，保障派遣合规性，截至2024年底纠纷率仍为零。',
      color: 'from-red-600 to-rose-700'
    }
  ];

  // Process steps
  const processSteps = [
    {
      title: '需求诊断',
      items: ['企业调研', '岗位画像', '定制招聘计划']
    },
    {
      title: '智能筛选',
      items: ['人才颗粒度模型', '标签大数据模型', '简历溯源']
    },
    {
      title: '合规化管理',
      items: ['签约系统完备', '嵌入劳动法条款', '薪酬社保合规处理']
    },
    {
      title: '入职管理',
      items: ['入职职业培训', '定制化入职包:客户企业文化手册']
    },
    {
      title: '在岗管理',
      items: ['季度人才反馈机制', '危机处理响应通道']
    },
    {
      title: '离场管理',
      items: ['离职预警', '合同到期/续约操作', '客户数据清退']
    }
  ];
</script>

<div class="min-h-screen bg-gray-900 text-gray-100 font-sans">
  <!-- Navigation Bar -->
  <nav class="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
          <span class="text-xl font-bold">F</span>
        </div>
        <span class="text-xl font-bold tracking-tight">Farben法本信息</span>
      </div>
      <div class="hidden md:flex space-x-8">
        <a href="#services" class="text-gray-300 hover:text-white transition-colors">服务范围</a>
        <a href="#advantages" class="text-gray-300 hover:text-white transition-colors">核心优势</a>
        <a href="#process" class="text-gray-300 hover:text-white transition-colors">服务流程</a>
        <a href="#contact" class="text-gray-300 hover:text-white transition-colors">联系我们</a>
      </div>
      <button class="md:hidden text-gray-300 hover:text-white" aria-label="切换导航菜单">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
  </nav>

  <!-- Hero Section with Tech Pattern -->
  <header class="relative overflow-hidden py-20 md:py-32">
    <!-- Background Tech Pattern -->
    <div class="absolute inset-0 opacity-10 overflow-hidden">
      <div class="tech-pattern absolute top-10 left-10 w-40 h-40 border-2 border-blue-500 rounded-full"></div>
      <div class="tech-pattern absolute bottom-10 right-10 w-60 h-60 border-2 border-purple-500 rounded-full"></div>
      <div class="tech-pattern absolute top-1/2 left-1/3 w-20 h-20 border-2 border-green-500 rounded-full"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          数字化技术服务与人才派遣
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 mb-8">
          领先的人力资源解决方案与技术服务提供商，助力企业数字化转型
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button class="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all transform hover:-translate-y-1">
            了解服务
          </button>
          <button class="px-8 py-3 bg-gray-800 border border-gray-700 rounded-lg font-medium hover:bg-gray-700 transition-all transform hover:-translate-y-1">
            联系我们
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Services Section -->
  <section id="services" class="py-20 bg-gray-900 relative">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">服务范围</h2>
        <div class="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
        <p class="text-gray-400 max-w-2xl mx-auto">
          覆盖多个战略新兴行业，提供全方位的技术服务与人力资源解决方案
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each services as service, index}
          <div class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all group animate-on-scroll">
            <div class="w-14 h-14 bg-gray-700 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
              <span class="text-2xl">{service.icon}</span>
            </div>
            <h3 class="text-xl font-semibold mb-3">{service.title}</h3>
            <p class="text-gray-400">{service.description}</p>
          </div>
        {/each}
      </div>

      <!-- Coverage Areas -->
      <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-gray-800/50 border border-gray-700 rounded-xl p-6 animate-on-scroll">
          <h3 class="text-xl font-semibold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            覆盖领域
          </h3>
          <ul class="space-y-2 text-gray-300">
            {#each ['科技', '金融', '制造', '医疗', '新能源'] as industry}
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {industry}
              </li>
            {/each}
          </ul>
        </div>

        <div class="bg-gray-800/50 border border-gray-700 rounded-xl p-6 animate-on-scroll">
          <h3 class="text-xl font-semibold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            区域网络
          </h3>
          <p class="text-gray-300">全球10+国家地区，本地化服务团队支持</p>
        </div>

        <div class="bg-gray-800/50 border border-gray-700 rounded-xl p-6 animate-on-scroll">
          <h3 class="text-xl font-semibold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            人才储备
          </h3>
          <p class="text-gray-300">60,000名中高端人才数据库，精准快速匹配</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Core Advantages Section -->
  <section id="advantages" class="py-20 bg-gray-800 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 right-0 w-1/3 h-full bg-blue-900/10 -skew-x-12 transform origin-top-right"></div>
    <div class="absolute bottom-0 left-0 w-1/4 h-1/2 bg-purple-900/10 rounded-tr-full"></div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">核心优势</h2>
        <div class="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
        <p class="text-gray-400 max-w-2xl mx-auto">
          我们的独特优势帮助企业解决人力资源挑战，提升业务效率
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each advantages as advantage, index}
          <div class={`rounded-xl p-6 overflow-hidden group animate-on-scroll ${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
            <div class="absolute inset-0 bg-gradient-to-br {advantage.color} opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div class="relative z-10">
              <h3 class="text-xl font-semibold mb-3">{advantage.title}</h3>
              <p class="text-gray-300">{advantage.description}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Process Section -->
  <section id="process" class="py-20 bg-gray-900">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16 animate-on-scroll opacity-0 translate-y-20">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">派遣管理全流程</h2>
        <div class="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
        <p class="text-gray-400 max-w-2xl mx-auto">
          标准化的服务流程，确保人才派遣的高效与合规
        </p>
      </div>

      <div class="relative">
        <!-- Timeline Line -->
        <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-700 transform -translate-x-1/2"></div>

        {#each processSteps as step, index}
          <div class="flex flex-col md:flex-row items-center mb-12 animate-on-scroll {index % 2 === 0 ? 'md:flex-row-reverse' : ''}">
            <!-- Timeline Dot -->
            <div class="hidden md:flex absolute left-1/2 w-6 h-6 rounded-full bg-blue-500 transform -translate-x-1/2 z-10"></div>

            <!-- Content -->
            <div class={`w-full md:w-5/12 p-6 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
              <h3 class="text-2xl font-semibold mb-4 text-blue-400">{step.title}</h3>
              <ul class={`space-y-2 ${index % 2 === 0 ? 'md:ml-auto md:text-right' : 'md:text-left'}`}>
                {#each step.items as item}
                  <li class="flex items-center text-gray-300 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2 ${index % 2 === 0 ? 'md:ml-2 md:mr-0' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                {/each}
              </ul>
            </div>

            <!-- Spacer for timeline -->
            <div class="hidden md:block w-2/12"></div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section id="contact" class="py-20 bg-gray-800 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_rgba(59,130,246,1)_1px,_transparent_1px)] bg-[length:30px_30px]"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-4xl mx-auto bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-blue-500/20 animate-on-scroll">
        <div class="text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">准备好开始了吗？</h2>
          <p class="text-gray-300 text-lg">
            联系我们，了解如何通过我们的服务提升您的业务效率
          </p>
        </div>

        <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label for="company" class="block text-sm font-medium text-gray-300 mb-1">公司名称</label>
            <input type="text" id="company" class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100" placeholder="您的公司名称">
          </div>
          <div>
            <label for="name" class="block text-sm font-medium text-gray-300 mb-1">联系人</label>
            <input type="text" id="name" class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100" placeholder="您的姓名">
          </div>
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-300 mb-1">电话</label>
            <input type="tel" id="phone" class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100" placeholder="您的联系电话">
          </div>
          <div class="md:col-span-2">
            <label for="message" class="block text-sm font-medium text-gray-300 mb-1">需求描述</label>
            <textarea id="message" rows="4" class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100" placeholder="请描述您的需求..."></textarea>
          </div>
          <div class="md:col-span-2 text-center">
            <button type="submit" class="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all transform hover:-translate-y-1 w-full md:w-auto">
              提交需求
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-900 border-t border-gray-800 py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="md:col-span-1">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
              <span class="text-xl font-bold">F</span>
            </div>
            <span class="text-xl font-bold tracking-tight">Farben法本信息</span>
          </div>
          <p class="text-gray-400 mb-4">
            专业的数字化技术服务与人才派遣提供商
          </p>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">服务</h4>
          <ul class="space-y-2 text-gray-400">
            <li><button class="hover:text-white transition-colors text-left">人才派遣</button></li>
            <li><button class="hover:text-white transition-colors text-left">数字化技术</button></li>
            <li><button class="hover:text-white transition-colors text-left">系统开发</button></li>
            <li><button class="hover:text-white transition-colors text-left">测试运维</button></li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">关于我们</h4>
          <ul class="space-y-2 text-gray-400">
            <li><button class="hover:text-white transition-colors text-left">公司简介</button></li>
            <li><button class="hover:text-white transition-colors text-left">核心团队</button></li>
            <li><button class="hover:text-white transition-colors text-left">发展历程</button></li>
            <li><button class="hover:text-white transition-colors text-left">企业文化</button></li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">联系我们</h4>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>上海市浦东新区张江高科技园区</span>
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>400-123-4567</span>
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>contact@farben.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
        <p>© 2024 Farben法本信息. 保留所有权利.</p>
      </div>
    </div>
  </footer>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  :global(body) {
    font-family: 'Inter', sans-serif;
  }

  
</style>