<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { Elastic } from 'gsap';
  gsap.registerPlugin(Elastic);
  import aboutus from '../assets/tech_company.jpg';
  import service from '../assets/service.jpg';
  import scott from '../assets/scott-graham-OQMZwNd3ThU-unsplash.jpg';
  import meetingRoom from '../assets/annie-spratt-QckxruozjRg-unsplash.jpg';
  import presentation from '../assets/jeffrey-blum-7-gaPkhIgqs-unsplash.jpg';
  import teamWorking from '../assets/riccardo-annandale-7e2pe9wjL9M-unsplash.jpg';
  import womenWorking from '../assets/conny-schneider-pREq0ns_p_E-unsplash.jpg';
  import groupLooking from '../assets/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg';
  import tech from "../assets/tech_future.jpg";
  import talent from "../assets/tech_talent.jpg";
  import eco from "../assets/tech_eco.jpg";
  import { _, t } from "svelte-i18n";

  let selectedIndex = $state(0);
  let intervalId: number | undefined;

  const services = [
    {
      title: "公司介绍",
      description:
        "睿柏咨询成立于2011年,作为综合性人才生态服务商,我们以\"连接全球智慧,赋能人才价值\"为使命,构建了覆盖人力资源服务、数字化转型解决方案及业务流程外包的三大战略板块。旗下睿柏咨询(大连,深圳,上海以及日本东京)与睿程科技双核驱动,已为全球10+国家地区的60余enterprise提供专业服务,累计输送高端人才超10,000人次。",
      image: aboutus,
    },
    {
      title: "技术驱动未来",
      description:
        "旗下睿程科技的研发团队,深耕云计算、AloT、区块链等前沿领域。持有CMMI 3级认证与ISO27001信息安全体系认证,成功交付日本金融行业智能风控系统、省公路巡查系统等标杆项目。",
      image: tech,
    },
    {
      title: "精英人才智库",
      description:
        "·垂直领域覆盖:聚焦金融科技,互联网技术,智能制造等10+战略新兴产业,建立行业动态人才图谱<br>·精准匹配体系:独创”人才颗粒度评估模型”,依托AI智能推荐系统实现人岗匹配度提升40%<br>·资深顾问团队:平均从业年限5年+,85%成员具备8年以上高端岗位猎寻经验,年度职位关闭率达到93%",
      image: talent,
    },
    {
      title: "全链条服务生态",
      description:
        "从高端猎头到灵活用工,再到BPO全流程外包,我们打造了人才服务的全生命周期解决方案。特别在外资企业服务领域,凭借服务团队专业性以及外资行业的文化,风险等深度理解,已成为多家优秀外资企业在华首选合作伙伴。<br>以大连为战略支点,构建全国服务网格,织就全球人才网络。未来,睿柏将持续深化\"科技+人才\"双轮战略,致力于成为企业数字化转型进程中值得信赖的全球人才伙伴。",
      image: eco,
    },
  ];

  let currentImage = $state(services[0].image);

  function animateContent(index: number): void {
    gsap.fromTo(".fade-in", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 });
  }

  function changeImage(newImage: string, index: number): void {
    if (currentImage !== newImage) {
      gsap.to(".animated-img", { 
        opacity: 0, 
        duration: 0.5, 
        onComplete: () => {
          currentImage = newImage;
          selectedIndex = index;
          gsap.fromTo(".animated-img", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 });
          animateContent(index);
        }
      });
    }
  }

  function nextService(): void {
    const nextIndex = (selectedIndex + 1) % services.length;
    changeImage(services[nextIndex].image, nextIndex);
  }

  function handleClick(image: string, index: number): void {
    changeImage(image, index);
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(nextService, 5000);
  }

  onMount(() => {
    intervalId = setInterval(nextService, 5000);
    animateContent(0);
  });

  onMount(() => {
    const cards = document.querySelectorAll('.image-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.1,
          duration: 0.5,
          ease: "power2.out"
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    });
  });

  onMount(() => {
    const textCards = document.querySelectorAll('.text-card');
    textCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const originalBg = getComputedStyle(card).backgroundColor;
        const textElements = card.querySelectorAll('p, h3');
        const originalColors = Array.from(textElements).map(el => getComputedStyle(el).color);
        const mainTextColor = originalColors[0] || '#000000'; // Fallback to black if no text elements
        gsap.to(card, { backgroundColor: mainTextColor, duration: 0.3 });
        textElements.forEach((el) => {
          gsap.to(el, { color: originalBg, duration: 0.3 });
        });
        const leaveListener = () => {
          gsap.to(card, { backgroundColor: originalBg, duration: 0.3 });
          textElements.forEach((el, i) => {
            gsap.to(el, { color: originalColors[i], duration: 0.3 });
          });
          card.removeEventListener('mouseleave', leaveListener);
        };
        card.addEventListener('mouseleave', leaveListener);
      });
    });
  });

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
  });
</script>

<div class="bg-gray-900 py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold leading-7 text-white">Get to Know Us</p>
      <h2 class="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">Transforming Ideas into Digital Reality</h2>
    </div>
    <div class="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        class="bg-green-200 p-6 rounded-3xl flex flex-col justify-center items-center text-center aspect-[4/3] lg:aspect-auto text-card"
        data-aos="fade-up"
      >
        <p class="text-lg font-medium text-gray-800">{$t('satisfiedCustomer')}</p>
        <p class="mt-2 text-5xl font-bold text-gray-900">94+</p>
      </div>
  
      <div
        class="image-card rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto"
        data-aos="fade-down"
      >
        <img
          src={meetingRoom}
          alt="Meeting Room"
          class="w-full h-full object-cover"
        />
      </div>
  
      <div
        class="image-card rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto"
        data-aos="fade-right"
      >
        <img
          src={presentation}
          alt="Presentation"
          class="w-full h-full object-cover"
        />
      </div>
  
      <div
        class="image-card rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto"
        data-aos="fade-left"
      >
        <img
          src={teamWorking}
          alt="Team Working"
          class="w-full h-full object-cover"
        />
      </div>
  
      <div
        class="image-card rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto"
        data-aos="fade-up-right"
      >
        <img
          src={womenWorking}
          alt="Women Working"
          class="w-full h-full object-cover"
        />
      </div>
  
      <div
        class="bg-pink-100 p-6 rounded-3xl col-span-1 sm:col-span-2 lg:col-span-2 aspect-[2/1] lg:aspect-auto text-card"
        data-aos="fade-up-left"
      >
        <h3 class="text-2xl font-bold text-gray-900">{$t('journey.title')}</h3>
        <p class="mt-4 text-gray-700">
          {$t('journey.description')}
        </p>
      </div>
  
      <div
        class="image-card rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto"
        data-aos="zoom-in"
      >
        <img
          src={groupLooking}
          alt="Group Looking at Laptop" class="w-full h-full object-cover">
      </div>
      


    </div>
  </div>

  <!-- Main Content Section -->
  <div class="mt-20">
    <div class="text-left mb-12">
      <div class="text-center">
        <p class="text-base font-semibold leading-7 text-white">About Us</p>
        <div class="text-center">
          <h2 class="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">公司介绍</h2>
        </div>
        <!-- 主要内容区域 -->
        <div class="flex flex-col mt-20 lg:flex-row gap-8 lg:items-stretch">
          <!-- 左侧图片 -->
          <div class="lg:w-1/2 flex">
            <img
              class="w-full h-auto lg:h-full rounded-lg object-cover animated-img"
              src="{currentImage}"
              alt="公司业务领域"
              style="min-height: 400px;"
            />
          </div>
      
          <!-- 右侧服务卡片 -->
          <div class="lg:w-1/2 flex flex-col gap-6">
            <!-- Ad Campaign Strategies -->
            {#each services as service, index}
              <div
                class="{selectedIndex === index
                  ? 'bg-blue-100'
                  : 'bg-gray-100'} p-6 rounded-lg flex-1 flex flex-col cursor-pointer fade-in text-card"
                onclick={() => handleClick(service.image, index)}
                onkeydown={(e) => e.key === 'Enter' && handleClick(service.image, index)}
                role="button"
                tabindex="0"
              >
                <h3 class="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p class="text-base text-gray-700 mb-4 flex-1">
                  {@html service.description}
                </p>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<style>
  .animated-img {
    transition: all 0.5s ease;
  }
  .image-card {
    cursor: pointer;
  }
</style>
