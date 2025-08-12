<script>
  import { onMount } from 'svelte';
  import { initAOS } from '../config/aos-config';

  onMount(() => {
    // 初始化AOS动画
    initAOS();
  });

  // 分类数据
  const categories = [
    { id: 1, title: '技术人才派遣', description: '为企业提供各类技术人才，包括开发、测试、运维等', icon: '💻' },
    { id: 2, title: '项目外包服务', description: '承接各类IT项目开发，从需求分析到上线运维一站式服务', icon: '📦' },
    { id: 3, title: '人力资源咨询', description: '提供人力资源规划、招聘策略、薪酬体系设计等咨询服务', icon: '📊' },
    { id: 4, title: '企业培训服务', description: '为企业定制各类技术培训和管理培训课程', icon: '🧠' }
  ];

  // 列表数据
  const services = [
    { id: 1, title: '软件开发人才派遣', description: '提供前端、后端、全栈等各类开发人才，满足企业项目需求', image: '/src/assets/service.jpg' },
    { id: 2, title: '测试与质量保障', description: '提供专业的测试人才，确保软件产品质量和用户体验', image: '/src/assets/secondary.jpg' },
    { id: 3, title: 'IT运维支持', description: '提供服务器管理、网络维护、安全防护等运维服务', image: '/src/assets/third.jpg' },
    { id: 4, title: '数字化转型咨询', description: '帮助企业制定数字化转型战略，实现业务流程优化', image: '/src/assets/idea-2.jpg' }
  ];

  // 派遣流程数据
  const processSteps = [
    { id: 1, title: '需求诊断', description: '企业调研、岗位画像、定制招聘计划' },
    { id: 2, title: '智能筛选', description: '人才颗粒度模型、标签大数据模型、简历溯源' },
    { id: 3, title: '合规化管理', description: '签约系统完备、嵌入劳动法条、薪酬社保合规处理' },
    { id: 4, title: '入职管理', description: '入职职业培训、定制化入职包、客户企业文化手册' },
    { id: 5, title: '在岗管理', description: '季度人才反馈机制、危机处理响应通道' },
    { id: 6, title: '离场管理', description: '离职预警、合同到期/续约操作、客户数据清退' }
  ];

  // 培训体系数据
  const trainingLevels = [
    { id: 1, title: '基础层 - 岗前速训', items: ['行业合规必修课', '客户专属知识库', '跨文化沟通沙龙'] },
    { id: 2, title: '进阶层 - 在岗提升', items: ['数据安全、职场反歧视等必修课', '资深专家1对1指导', '年度技能升级补贴'] },
    { id: 3, title: '高阶层 - 专项突破', items: ['高潜派遣人员领导力加速计划', '高技能人才角色灵活转变留住方案'] }
  ];

  // 客户案例数据
  const caseStudy = {
    title: '某外资资产管理公司',
    description: '受某外资资产管理公司委托，我们在3个月周期内高效完成亚太区120名IT工程师的定向派遣任务，最终实现培训考核通过率99%的目标。项目启动初期，团队首先与客户深度对接，明确亚太区各分支机构在云计算、软件开发、系统维护等领域的具体岗位需求，同步制定涵盖技术能力、语言水平、跨文化协作的三维筛选标准，从全球人才库中精准锁定200+候选人进入储备池。在为期4周的岗前培训阶段，针对亚太区技术架构特点定制化设计课程体系，包含微服务架构实战、多语言开发环境适配、区域数据合规规范等核心模块，并引入实时在线考核系统，对人选进行分阶段能力校准。'
  };
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

  <!-- 派遣管理全流程 -->
  <section class="py-20 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold mb-16 text-center" data-aos="fade-up">
        派遣管理全流程
      </h2>
      <div class="relative">
        <!-- 连接线 -->
        <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-600 transform -translate-x-1/2"></div>

        <div class="space-y-12">
          {#each processSteps as step, index (step.id)}
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
        派遣人员培训体系
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {#each trainingLevels as level (level.id)}
          <div class="bg-gray-800 rounded-xl p-8 shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-900/30" data-aos="zoom-in" data-aos-delay={level.id * 150}>
            <h3 class="text-xl font-bold mb-5 text-blue-400 border-b border-blue-700 pb-3">{level.title}</h3>
            <ul class="space-y-3">
              {#each level.items as item, i}
                <li class="flex items-start" data-aos="fade-up" data-aos-delay={level.id * 150 + i * 50}>
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
        客户案例
      </h2>
      <div class="bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl" data-aos="fade-up" data-aos-delay="200">
        <h3 class="text-2xl font-bold mb-6 text-blue-400">{caseStudy.title}</h3>
        <p class="text-gray-300 leading-relaxed">{caseStudy.description}</p>
        <div class="mt-8 flex justify-center">
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50">
            查看更多案例
          </button>
        </div>
      </div>
    </div>
  </section>

</div>