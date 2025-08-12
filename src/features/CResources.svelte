<script>
  import { onMount } from 'svelte';
  import { initAOS } from '../config/aos-config';

  onMount(() => {
    // 初始化AOS动画
    initAOS();
  });

  // 分类数据
  const categories = [
    {
      id: 1,
      title: '技术人才派遣',
      description: '为企业提供各类技术人才，包括开发、测试、运维等',
      icon: '💻'
    },
    {
      id: 2,
      title: '项目外包服务',
      description: '承接各类IT项目开发，从需求分析到上线运维一站式服务',
      icon: '📦'
    },
    {
      id: 3,
      title: '人力资源咨询',
      description: '提供人力资源规划、招聘策略、薪酬体系设计等咨询服务',
      icon: '📊'
    },
    {
      id: 4,
      title: '企业培训服务',
      description: '为企业定制各类技术培训和管理培训课程',
      icon: '🧠'
    }
  ];

  // 列表数据
  const services = [
    {
      id: 1,
      title: '软件开发人才派遣',
      description: '提供前端、后端、全栈等各类开发人才，满足企业项目需求',
      image: '/src/assets/service.jpg'
    },
    {
      id: 2,
      title: '测试与质量保障',
      description: '提供专业的测试人才，确保软件产品质量和用户体验',
      image: '/src/assets/secondary.jpg'
    },
    {
      id: 3,
      title: 'IT运维支持',
      description: '提供服务器管理、网络维护、安全防护等运维服务',
      image: '/src/assets/third.jpg'
    },
    {
      id: 4,
      title: '数字化转型咨询',
      description: '帮助企业制定数字化转型战略，实现业务流程优化',
      image: '/src/assets/idea-2.jpg'
    }
  ];
</script>

<div class="min-h-screen bg-gray-900 text-gray-100">
  <!-- 英雄区 -->
  <section class="relative h-screen flex items-center justify-center overflow-hidden" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-out-back">
    <div class="absolute inset-0 z-0">
      <img
        src="/src/assets/top.jpg"
        alt="人才派遣服务"
        class="w-full h-full object-cover opacity-40"
      />
    </div>
    <div class="relative z-10 text-center px-4 max-w-5xl mx-auto">
      <h1 class="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
        人才派遣服务
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="400" data-aos-duration="800">
        我们提供专业的人才派遣解决方案，为您的企业快速匹配最适合的人才，助力业务发展
      </p>
      <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50" data-aos="fade-up" data-aos-delay="600" data-aos-duration="800" data-aos-offset="50">
        了解更多
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
        我们的服务分类
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each categories as category (category.id)}
          <div
            class="bg-gray-700 rounded-xl p-8 transition-all duration-300 hover:bg-gray-600 hover:shadow-lg hover:shadow-blue-900/20"
            data-aos="fade-up"
            data-aos-delay="{category.id * 100}"
          >
            <div class="text-4xl mb-4">{category.icon}</div>
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
        详细服务内容
      </h2>
      <div class="space-y-16">
        {#each services as service, index (service.id)}
          <div
            class="flex flex-col md:flex-row items-center gap-8"
            data-aos="fade-up"
            data-aos-delay="{index * 150}"
          >
            {#if index % 2 === 0}
              <div class="md:w-1/2 rounded-xl overflow-hidden shadow-xl">
                <img
                  src={service.image}
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
                  src={service.image}
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
</div>