<script>
  // @ts-ignore
  import prue_dark from '../assets/prue_dark.jpg';
  import aboutus from '../assets/aboutus.jpg';
  import service from '../assets/service.jpg';
  import scott from '../assets/scott-graham-OQMZwNd3ThU-unsplash.jpg';
  import meetingRoom from '../assets/aboutus.jpg';
  import presentation from '../assets/milad-fakurian-wNsHBf_bTBo-unsplash.jpg';
  import teamWorking from '../assets/scott-graham-OQMZwNd3ThU-unsplash.jpg';
  import womenWorking from '../assets/conny-schneider-2-kXLvGOU5A-unsplash.jpg';
  import groupLooking from '../assets/jeffrey-blum-7-gaPkhIgqs-unsplash.jpg';
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';

  let currentImage = aboutus;
  let selectedIndex = 0;
  // @ts-ignore
  let intervalId;

  const services = [
    {
      title: 'Ad Campaign Strategies',
      description: "Our ad campaign strategies are designed to maximize your brand's reach and impact, ensuring effective engagement and measurable results.",
      image: aboutus
    },
    {
      title: 'Content Strategy',
      description: 'Our content strategy focuses on creating engaging, relevant material that drives audience interaction and supports your business goals.',
      image: service
    },
    {
      title: 'Business Scaling',
      description: 'Our expert strategies in business scaling help you expand your operations efficiently, ensuring sustainable growth and increased market presence. Partner with us to elevate your business to new heights.',
      image: scott
    }
  ];

  // @ts-ignore
  function animateContent(index) {
    gsap.fromTo(".fade-in", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 });
  }

  // @ts-ignore
  function changeImage(newImage, index) {
    if (currentImage !== newImage) {
      gsap.to(".animated-img", { opacity: 0, duration: 0.5, onComplete: () => {
        currentImage = newImage;
        selectedIndex = index;
        gsap.fromTo(".animated-img", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 });
        animateContent(index);
      }});
    }
  }

  function nextService() {
    const nextIndex = (selectedIndex + 1) % services.length;
    changeImage(services[nextIndex].image, nextIndex);
  }

  // @ts-ignore
  function handleClick(image, index) {
    changeImage(image, index);
    // @ts-ignore
    clearInterval(intervalId);
    intervalId = setInterval(nextService, 5000);
  }

  onMount(() => {
    intervalId = setInterval(nextService, 5000);
    animateContent(0);
  });

  onDestroy(() => {
    // @ts-ignore
    clearInterval(intervalId);
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
        class="bg-green-200 p-6 rounded-3xl flex flex-col justify-center items-center text-center aspect-[4/3] lg:aspect-auto"
        data-aos="fade-up"
      >
        <p class="text-lg font-medium text-gray-800">Satisfied Customer</p>
        <p class="mt-2 text-5xl font-bold text-gray-900">50.2K+</p>
      </div>
  
      <div
        class="rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto"
        data-aos="fade-down"
      >
        <img
          src={meetingRoom}
          alt="Meeting Room"
          class="w-full h-full object-cover"
        />
      </div>
  
      <div
        class="rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto"
        data-aos="fade-right"
      >
        <img
          src={presentation}
          alt="Presentation"
          class="w-full h-full object-cover"
        />
      </div>
  
      <div
        class="rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto"
        data-aos="fade-left"
      >
        <img
          src={teamWorking}
          alt="Team Working"
          class="w-full h-full object-cover"
        />
      </div>
  
      <div
        class="rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto"
        data-aos="fade-up-right"
      >
        <img
          src={womenWorking}
          alt="Women Working"
          class="w-full h-full object-cover"
        />
      </div>
  
      <div
        class="bg-pink-100 p-6 rounded-3xl col-span-1 sm:col-span-2 lg:col-span-2 aspect-[2/1] lg:aspect-auto"
        data-aos="fade-up-left"
      >
        <h3 class="text-2xl font-bold text-gray-900">The Journey of Our Digital Evolution and Growth</h3>
        <p class="mt-4 text-gray-700">
          Our story is one of continuous innovation and transformation, evolving from a small agency into a leader in digital solutions. Through dedication and creativity, we've grown to meet the changing needs of our clients, delivering impactful results.
        </p>
      </div>
  
      <div
        class="rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto"
        data-aos="zoom-in"
      >
        <img
          src={groupLooking}
          alt="Group Looking at Laptop" class="w-full h-full object-cover">
      </div>
      
    

    </div>
  </div>

    <!-- 标题和统计数据部分 -->
    <div class="mt-20">
      <div class="text-left mb-12">
        <p class="text-base font-semibold text-white mb-4">About Our Company</p>
        <h2 class="text-4xl font-bold tracking-tight text-yellow-400 mb-8">

          Innovative Influencer Marketing<br>
          to Boost Your Business
        </h2>
        
        <!-- 统计数据 -->
        <div class="flex flex-wrap gap-8 mb-12">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600 mb-2">10k+</div>
            <div class="text-sm text-white">Deal with Clients</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600 mb-2">1.5k+</div>
            <div class="text-sm text-white">Team Members</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600 mb-2">24.1k+</div>
            <div class="text-sm text-white">Completed Project</div>
          </div>
        </div>
      </div>
      
      <!-- 主要内容区域 -->
       <div class="flex flex-col lg:flex-row gap-8 lg:items-stretch">
         <!-- 左侧图片 -->
         <div class="lg:w-1/2 flex">
           <img class="w-full h-auto lg:h-full rounded-lg object-cover animated-img" src="{currentImage}" alt="公司业务领域" style="min-height: 400px;" />
         </div>
         
         <!-- 右侧服务卡片 -->
          <div class="lg:w-1/2 flex flex-col gap-6">
           <!-- Ad Campaign Strategies -->
           {#each services as service, index}
           <div class="{selectedIndex === index ? 'bg-blue-100' : 'bg-gray-100'} p-6 rounded-lg flex-1 flex flex-col cursor-pointer fade-in" on:click="{() => handleClick(service.image, index)}">
             <h3 class="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
             <p class="text-base text-gray-700 mb-4 flex-1">{service.description}</p>
             <a href="#" class="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 mt-auto">
               Read More
               <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
               </svg>
             </a>
           </div>
           {/each}
        </div>
      </div>
    </div>
    
    <!-- 新增美食section -->
    <div class="mt-32">
      <div class="flex flex-col lg:flex-row gap-12 lg:items-center">
        <!-- 左侧内容 -->
        <div class="lg:w-1/2">
          <p class="text-base font-semibold text-purple-600 mb-4">WHO WE ARE</p>
          <h2 class="text-4xl font-bold tracking-tight text-purple-600 mb-6">

            Bringing You Flavors That<br>
            Delight
          </h2>
          <p class="text-lg leading-8 text-white mb-8">
            Experience a culinary journey like no other with our menu, where every dish is crafted to delight your senses. We're dedicated to bringing you flavors that excite, with fresh ingredients and authentic recipes that leave a lasting impression.
          </p>
          
          <!-- 统计数据网格 -->
          <div class="grid grid-cols-2 gap-6 mb-8">
            <div class="text-left">
              <div class="text-3xl font-bold text-purple-600 mb-1">90%</div>
              <div class="text-sm text-white">Repeat Customer</div>
            </div>
            <div class="text-left">
              <div class="text-3xl font-bold text-purple-600 mb-1">94%</div>
              <div class="text-sm text-white">Freshness & Quality</div>
            </div>
            <div class="text-left">
              <div class="text-3xl font-bold text-purple-600 mb-1">20 min</div>
              <div class="text-sm text-white">Min. Delivery Time</div>
            </div>
            <div class="text-left">
              <div class="text-3xl font-bold text-purple-600 mb-1">500+</div>
              <div class="text-sm text-white">Positive Review</div>
            </div>
          </div>
          
          <!-- Learn More 按钮 -->
          <div>
            <a href="#" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Learn More
              <svg class="ml-3 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- 右侧图片组合 -->
        <div class="lg:w-1/2 relative h-[500px] group">
            <img class="absolute top-10 left-0 w-3/5 h-auto rounded-lg shadow-2xl transition-transform duration-500 ease-in-out group-hover:rotate-[-3deg] group-hover:scale-105" src="{scott}" alt="美食制作过程" />
            <img class="absolute top-0 right-0 w-1/2 h-auto rounded-lg shadow-2xl transition-transform duration-500 ease-in-out group-hover:rotate-[3deg] group-hover:scale-105" src="{service}" alt="精美三明治" />
            <img class="absolute bottom-10 left-1/4 w-3/5 h-auto rounded-lg shadow-2xl transition-transform duration-500 ease-in-out group-hover:scale-110" src="{aboutus}" alt="美味甜点" />
        </div>
      </div>
    </div>
    
  </div>
</div>

<style>
  .animated-img {
    transition: all 0.5s ease;
  }

  /* Fancy Cards Container */
  .fancy-cards-container {
    position: relative;
    overflow: hidden;
  }

  /* Floating Background Orbs */
  .floating-orb {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
    filter: blur(40px);
    animation: float 6s ease-in-out infinite;
    z-index: 0;
  }

  .floating-orb-1 {
    width: 120px;
    height: 120px;
    top: 10%;
    left: 20%;
    animation-delay: 0s;
  }

  .floating-orb-2 {
    width: 80px;
    height: 80px;
    top: 60%;
    right: 15%;
    animation-delay: 2s;
  }

  .floating-orb-3 {
    width: 100px;
    height: 100px;
    bottom: 20%;
    left: 60%;
    animation-delay: 4s;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    33% {
      transform: translateY(-20px) rotate(120deg);
    }
    66% {
      transform: translateY(10px) rotate(240deg);
    }
  }

  /* Fancy Card Base Styles */
  .fancy-card {
    position: relative;
    z-index: 10;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fancy-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    z-index: -1;
  }

  /* Individual Card Styles */
  .fancy-card-main {
    animation: slideInLeft 0.8s ease-out;
  }

  .fancy-card-secondary {
    animation: slideInRight 0.8s ease-out 0.2s both;
  }

  .fancy-card-accent {
    animation: slideInUp 0.8s ease-out 0.4s both;
  }

  .fancy-card-highlight {
    animation: slideInUp 0.8s ease-out 0.6s both;
  }

  /* Hover Effects */
  .fancy-card:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  .fancy-card-main:hover {
    box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.4);
  }

  .fancy-card-highlight:hover {
    box-shadow: 0 25px 50px -12px rgba(251, 191, 36, 0.4);
  }

  /* Animation Keyframes */
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px) rotate(-5deg);
    }
    to {
      opacity: 1;
      transform: translateX(0) rotate(0deg);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px) rotate(5deg);
    }
    to {
      opacity: 1;
      transform: translateX(0) rotate(0deg);
    }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(50px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .fancy-cards-container {
      height: auto !important;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .fancy-card {
      position: relative !important;
      top: auto !important;
      left: auto !important;
      right: auto !important;
      bottom: auto !important;
      width: 100% !important;
      height: auto !important;
      min-height: 180px;
    }

    .floating-orb {
      display: none;
    }
  }

  @media (max-width: 640px) {
    .fancy-cards-container {
      grid-template-columns: 1fr;
    }
  }
</style>
