<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import AOS from 'aos';
  import { _, locale } from "svelte-i18n";

  gsap.registerPlugin(ScrollTrigger);

  let heroSection: HTMLElement;
  let statsSection: HTMLElement;
  let valuesSection: HTMLElement;
  let timelineSection: HTMLElement;
  let teamSection: HTMLElement;

  // Company stats data
  const stats = [
    { number: '60+', label: '全球客户', icon: '🌍' },
    { number: '13+', label: '行业经验', icon: '⏰' },
    { number: '10000+', label: '人才输送', icon: '🚀' },
    { number: '15+', label: '资深顾问', icon: '👥' }
  ];

  // Core values data
  const values = [
    {
      title: '技术驱动未来',
      description: '旗下睿程科技的研发团队，深耕云计算、AIoT、区块链等前沿领域。持有CMMI 3级认证与ISO27001信息安全体系认证。',
      icon: '💡',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: '精英人才智库',
      description: '垂直领域覆盖：聚焦金融科技，互联网技术，智能制造等10+战略新兴产业，建立行业动态人才图谱。',
      icon: '⭐',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: '全链条服务生态',
      description: '从高端猎头到灵活用工，再到BPO全流程外包，我们打造了人才服务的全生命周期解决方案。',
      icon: '🤝',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: '全球服务网络',
      description: '以大连为战略支点，构建全国服务网格，织就全球人才网络，已为全球10+国家地区提供专业服务。',
      icon: '🌍',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  // Timeline data
  const timeline = [
    {
      year: '2011',
      title: '公司成立',
      description: '睿柏咨询成立，专注于为企业提供综合性人才生态服务，以"连接全球智慧，赋能人才价值"为使命。',
      position: 'right'
    },
    {
      year: '2012',
      title: '国际化扩张',
      description: '业务拓展至全球市场，在大连、深圳、上海以及日本东京设立分支机构，为亚洲、欧洲及北美客户提供专业服务。',
      position: 'right'
    },
    {
      year: '2016',
      title: '技术创新突破',
      description: '推出AI智能人才匹配平台，独创"人才颗粒度评估模型"，实现人岗匹配度提升40%，革新招聘流程。',
      position: 'left'
    },
    {
      year: '2020',
      title: '数字化转型',
      description: '全面转向数字化服务模式，构建远程协作和虚拟咨询平台，获得字节跳动年度优秀合作伙伴荣誉。',
      position: 'right'
    },
    {
      year: '2024',
      title: '未来愿景',
      description: '以"科技+人才"双轮驱动战略引领行业发展，致力于成为企业数字化转型进程中值得信赖的全球人才伙伴。',
      position: 'left'
    }
  ];

  // Team members data
  const team = [
    {
      name: '垂直领域覆盖',
      position: '聚焦10+战略新兴产业',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=400&fit=crop&crop=face',
      bio: '建立行业动态人才图谱，覆盖金融科技、互联网技术、智能制造等多个垂直领域。'
    },
    {
      name: '精准匹配体系',
      position: 'AI智能推荐',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0c766d19?w=400&h=400&fit=crop&crop=face',
      bio: '独创"人才颗粒度评估模型"，依托AI智能推荐系统实现人岗匹配度提升40%。'
    },
    {
      name: '资深顾问团队',
      position: '平均从业年限5年+',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=face',
      bio: '85%成员具备8年以上高端岗位猎寻经验，年度职位关闭率达93%。'
    },
    {
      name: '全链条服务生态',
      position: '人才服务全生命周期解决方案',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=400&fit=crop&crop=face',
      bio: '从高端猎头到灵活用工，再到BPO全流程外包，我们打造了人才服务的全生命周期解决方案。'
    }
  ];

  onMount(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    });

    // Hero section animation
    gsap.fromTo(heroSection, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }
    );

    // Stats counter animation
    gsap.fromTo('.stat-number', 
      { textContent: 0 },
      {
        textContent: (i, target) => target.getAttribute('data-number'),
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: statsSection,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Values cards stagger animation
    gsap.fromTo('.value-card', 
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: valuesSection,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Timeline animation
    gsap.fromTo('.timeline-item', 
      { opacity: 0, x: (i) => i % 2 === 0 ? -100 : 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineSection,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Team cards animation
    gsap.fromTo('.team-card', 
      { opacity: 0, y: 30, rotationY: 15 },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: teamSection,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Parallax effect for background elements
    gsap.to('.parallax-bg', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-bg',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
  <!-- Background Pattern -->
  <div class="absolute inset-0 opacity-10">
    <div class="absolute inset-0 bg-repeat" style="background-image: url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"></div>
  </div>

  <!-- Hero Section -->
  <section bind:this={heroSection} class="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="parallax-bg absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 blur-3xl"></div>
    
    <div class="relative z-10 text-center max-w-5xl mx-auto">
      <div class="mb-8" data-aos="fade-up">
        <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm">
          <span class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
          赋能企业转型 始于2011
        </span>
      </div>
      
      <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent leading-tight" data-aos="fade-up" data-aos-delay="200">
        关于睿柏
        <span class="block text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          咨询服务
        </span>
      </h1>
      
      <p class="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="400">
        我们是领先的综合性人才生态服务商，以"连接全球智慧，赋能人才价值"为使命，致力于通过创新解决方案、战略洞察和卓越的人才获取服务为企业赋能。
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="600">
        <button class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          了解我们的故事
        </button>
        <button class="px-8 py-4 border-2 border-white/20 hover:border-white/40 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-white/10">
          认识我们的团队
        </button>
      </div>
    </div>
  </section>

  <!-- Stats Section -->
  <section bind:this={statsSection} class="py-20 px-4 sm:px-6 lg:px-8 relative">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {#each stats as stat, index}
          <div class="text-center" data-aos="zoom-in" data-aos-delay={index * 100}>
            <div class="text-4xl mb-4">{stat.icon}</div>
            <div class="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              <span class="stat-number" data-number={stat.number.replace('+', '')}>0</span>{stat.number.includes('+') ? '+' : ''}
            </div>
            <div class="text-slate-400 font-medium">{stat.label}</div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Core Values Section -->
  <section bind:this={valuesSection} class="py-20 px-4 sm:px-6 lg:px-8 relative">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent" data-aos="fade-up">
          我们的核心价值观
        </h2>
        <p class="text-xl text-slate-400 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          睿柏咨询成立于2011年,作为综合性人才生态服务商,我们以"连接全球智慧,赋能人才价值"为使命,构建了覆盖人力资源服务、数字化转型解决方案及业务流程外包的三大战略板块。旗下睿柏咨询(大连,深圳,上海以及日本东京)与睿程科技双核驱动,已为全球10+国家地区的60余enterprise提供专业服务,累计输送高端人才超10,000人次。
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each values as value, index}
          <div class="value-card group relative">
            <div class="absolute inset-0 bg-gradient-to-r {value.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
            <div class="relative p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105">
              <div class="text-4xl mb-4">{value.icon}</div>
              <h3 class="text-2xl font-bold mb-4 text-white">{value.title}</h3>
              <p class="text-slate-400 leading-relaxed">{value.description}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Timeline Section -->
  <section bind:this={timelineSection} class="py-20 px-4 sm:px-6 lg:px-8 relative">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent" data-aos="fade-up">
          我们的发展历程
        </h2>
        <p class="text-xl text-slate-400 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          从初创到行业领先，见证睿柏咨询在人才生态服务领域的成长足迹与重要里程碑。
        </p>
      </div>
      
      <div class="relative">
        <!-- Timeline Line -->
        <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
        
        {#each timeline as item, index}
          <div class="timeline-item relative flex items-center mb-16 {item.position === 'left' ? 'flex-row-reverse' : ''}">
            <!-- Timeline Dot -->
            <div class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-slate-900 z-10"></div>
            
            <!-- Content -->
            <div class="w-5/12 {item.position === 'left' ? 'text-right pr-8' : 'pl-8'}">
              <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                <div class="text-2xl font-bold text-blue-400 mb-2">{item.year}</div>
                <h3 class="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p class="text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Team Section -->
  <section bind:this={teamSection} class="py-20 px-4 sm:px-6 lg:px-8 relative">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent" data-aos="fade-up">
          我们的精英团队
        </h2>
        <p class="text-xl text-slate-400 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          汇聚行业精英，构建全方位人才生态服务体系，为企业提供从战略咨询到人才落地的一站式解决方案。
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each team as member, index}
          <div class="team-card group">
            <div class="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105">
              <div class="relative mb-6">
                <img src={member.image} alt={member.name} class="w-24 h-24 rounded-full mx-auto object-cover border-4 border-slate-700 group-hover:border-blue-500 transition-colors duration-300">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 class="text-xl font-bold text-white mb-2 text-center">{member.name}</h3>
              <p class="text-blue-400 font-medium mb-4 text-center">{member.position}</p>
              <p class="text-slate-400 text-sm leading-relaxed text-center">{member.bio}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 px-4 sm:px-6 lg:px-8 relative">
    <div class="max-w-4xl mx-auto text-center">
      <div class="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-12 border border-blue-500/30" data-aos="fade-up">
        <h2 class="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          准备好开启人才赋能之旅？
        </h2>
        <p class="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          加入众多已经通过我们专业人才生态服务实现业务转型的企业行列，让我们共同连接全球智慧，赋能人才价值。
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            立即开始合作
          </button>
          <button class="px-8 py-4 border-2 border-white/20 hover:border-white/40 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-white/10">
            预约咨询服务
          </button>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  :global(.aos-init) {
    pointer-events: none;
  }
  
  :global(.aos-animate) {
    pointer-events: auto;
  }
  
  .parallax-bg {
    will-change: transform;
  }
  
  .stat-number {
    display: inline-block;
  }
  
  .value-card {
    perspective: 1000px;
  }
  
  .team-card {
    transform-style: preserve-3d;
  }
  
  .timeline-item:nth-child(even) {
    flex-direction: row;
  }
  
  .timeline-item:nth-child(odd) {
    flex-direction: row-reverse;
  }
  
  @media (max-width: 768px) {
    .timeline-item {
      flex-direction: column !important;
      text-align: center !important;
    }
    
    .timeline-item > div:last-child {
      width: 100% !important;
      padding: 0 !important;
      margin-top: 2rem;
    }
  }
</style>

