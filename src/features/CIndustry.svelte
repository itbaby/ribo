<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import AOS from 'aos';
  import 'aos/dist/aos.css';

  let currentIndustryIndex = 0;
  let intervalId: number | undefined;

  const industryCategories = [
    {
      name: '汽车',
      icon: 'ri-car-fill',
      bg: '/src/assets/automotive.jpg',
      title: '为某新能源汽车企业构建人才梯队',
      description: '睿柏聚焦新能源汽车行业发展需求，为某头部新能源汽车企业定向招聘电池研发、智能驾驶、整车设计等核心领域专业人才。依托多年行业招聘经验与优质人才储备，我们通过精准岗位画像匹配、多维度人才评估及全流程招聘服务，高效构建企业研发人才梯队。助力企业快速补充创新型技术力量，加速新能源汽车核心技术研发进程，抢占行业技术升级与市场拓展先机，以专业人才供给赋能企业战略目标高效落地。'
    },
    {
      name: '互联网',
      icon: 'ri-global-fill',
      bg: '/src/assets/internet.jpg',
      title: '为某互联网头部企业输送核心技术人员',
      description: '作为专注科技领域的人力资源解决方案提供商，睿柏深度洞察互联网行业技术迭代与业务拓展需求，为某领先互联网企业定制化招募软件开发、数据算法、产品运营、网络安全等核心岗位人才。凭借对互联网岗位能力模型的精准解构、海量技术人才库储备及敏捷招聘响应机制，我们通过技术能力图谱匹配、场景化面试评估与全周期人才服务，高效搭建企业数字化人才矩阵。'
    },
    {
      name: '金融',
      icon: 'ri-bank-fill',
      bg: '/src/assets/finance.jpg',
      title: '助力某银行快速响应金融科技融合等行业变革',
      description: '睿柏精准把握金融行业监管升级与业务创新需求，为某知名金融机构定向猎聘风险管理、投资银行、合规审计、金融科技（FinTech）等核心岗位精英。此次合作聚焦于助力客户快速响应资管新规、金融科技融合等行业变革，通过复合型人才引入优化组织能力结构，加速财富管理、跨境资本运作等创新业务落地，以专业化人才配置助力企业筑牢风险防控屏障、提升资产配置效率，在监管趋严与市场竞争中夯实核心竞争力。'
    },
    {
      name: '通信',
      icon: 'ri-wireless-charging-fill',
      bg: '/src/assets/communication.jpg',
      title: '与某头部国企通信公司达成战略人才合作',
      description: '我司深度对接国家 “新基建” 战略与通信行业数字化转型需求，与某头部国企通信公司达成战略人才合作，定向招募 5G/6G 技术研发等核心领域骨干人才。此次合作致力于助力客户加速 5G/6G 网络部署进程、强化信息基础设施安全屏障、推动智慧城市与行业数字化解决方案落地，以专业化人才供给支撑国企在 “数字中国” 建设中的主力军作用，助力客户在新基建浪潮中巩固技术领先地位，实现战略布局与人才储备的双向赋能。'
    }
  ];

  function changeIndustry(index: number) {
      if (index === currentIndustryIndex) return;
      
      // 先淡出文本内容
      gsap.to([".main-title", ".main-description"], {
          opacity: 0,
          y: 20,
          duration: 0.3,
          onComplete: () => {
              currentIndustryIndex = index;
              
              // 淡入新背景图片
              gsap.fromTo(".bg-image", 
                  { opacity: 0 },
                  { opacity: 1, duration: 0.8 }
              );
              
              // 淡入新文本内容
              gsap.fromTo([".main-title", ".main-description"], 
                  { opacity: 0, y: -20 },
                  { opacity: 1, y: 0, duration: 0.5, delay: 0.2 }
              );
          }
      });
  }

  function selectIndustry(index: number) {
    changeIndustry(index);
    resetAutoPlay();
  }

  function startAutoPlay() {
    intervalId = setInterval(() => {
      const nextIndex = (currentIndustryIndex + 1) % industryCategories.length;
      changeIndustry(nextIndex);
    }, 5000);
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

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  });
</script>

<div class="relative h-[90vh] overflow-hidden">
  <!-- Background Image -->
  <div class="bg-image absolute inset-0 bg-cover bg-center" style="background-image: url('{industryCategories[currentIndustryIndex].bg}');"></div>

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
      <button class="action-button bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full transition duration-300" data-aos="fade-up" data-aos-delay="400">
        了解详情 >
      </button>
    </div>
  </div>

  <!-- Bottom Industry Categories -->
  <div class="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-8">
    <div class="industry-cards grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full max-w-6xl mx-auto px-4 md:px-0">
            {#each industryCategories as category, i}
                <div
                    class="flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out h-32 shadow-lg hover:shadow-xl transform hover:-translate-y-1 backdrop-blur-md border text-white {currentIndustryIndex === i ? 'bg-gray-900/50 border-gray-300' : 'bg-black/20 border-white/10'}"
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