<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import AOS from "aos";
  import { _, locale } from "svelte-i18n";

  gsap.registerPlugin(ScrollTrigger);

  let heroSection: HTMLElement;
  let contactSection: HTMLElement;
  let mapSection: HTMLElement;
  let formSection: HTMLElement;

  // Form state
  let formData = {
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
    privacy: false,
  };

  let isSubmitting = false;
  let submitStatus: "idle" | "success" | "error" = "idle";

  // Dark mode toggle function
  function toggleDarkMode() {
    const htmlElement = document.documentElement;
    const isDark = htmlElement.getAttribute("data-theme") === "dark";

    if (isDark) {
      htmlElement.removeAttribute("data-theme");
      localStorage.setItem("darkMode", "false");
    } else {
      htmlElement.setAttribute("data-theme", "dark");
      localStorage.setItem("darkMode", "true");
    }
  }

  // Contact information from zh.json
  $: contactInfo = {
    business: {
      emails: $_("footer.contacts.businessEmail").split(", "),
      phones: $_("footer.contacts.businessPhone").split(", "),
    },
    join: {
      email: $_("footer.contacts.joinEmail"),
      phone: $_("footer.contacts.joinPhone"),
    },
    company: {
      phone: $_("footer.contacts.companyPhone"),
    },
    addresses: {
      dalian: $_("footer.addresses.dalian"),
      shenzhen: $_("footer.addresses.shenzhen"),
    },
  };

  // Service options (reactive to language changes)
  $: serviceOptions = [
    { value: "headhunting", label: $_("menu.headhunting") },
    { value: "staffing", label: $_("menu.staffing") },
    { value: "itOutsourcing", label: $_("menu.itOutsourcing") },
    { value: "consulting", label: $_("menu.consulting") },
    { value: "other", label: $_("menu.other") },
  ];
  
  // Form placeholders (reactive to language changes)
  $: formPlaceholders = {
    email: $_("contact.form.emailPlaceholder"),
    company: $_("contact.form.companyPlaceholder"),
    phone: $_("contact.form.phonePlaceholder"),
    requirements: $_("contact.form.requirementsPlaceholder"),
    selectServiceType: $_("contact.form.selectServiceType"),
  };

  onMount(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });

    // Hero section animations
    gsap.fromTo(
      heroSection.querySelector(".hero-content"),
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
    );

    // Floating animation for contact cards
    gsap.set(".contact-card", { y: 0 });
    gsap.to(".contact-card", {
      y: -8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.5,
      delay: 1,
    });

    // Form field animations
    const formFields = document.querySelectorAll(".form-field");
    formFields.forEach((field, index) => {
      gsap.fromTo(
        field,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: field,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // Map section parallax effect
    ScrollTrigger.create({
      trigger: mapSection,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const mapBg = mapSection?.querySelector(".map-bg");
        if (mapBg) {
          gsap.set(mapBg, {
            y: progress * 100,
          });
        }
      },
    });
  });

  async function handleSubmit(event: Event) {
    event.preventDefault();

    // 验证隐私政策是否同意
    if (!formData.privacy) {
      alert("请同意隐私政策和服务条款");
      return;
    }

    isSubmitting = true;

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      submitStatus = "success";

      // Reset form
      formData = {
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        message: "",
        privacy: false,
      };

      // Show success animation
      gsap.fromTo(
        ".success-message",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      );
    } catch (error) {
      submitStatus = "error";
    } finally {
      isSubmitting = false;
      setTimeout(() => {
        submitStatus = "idle";
      }, 3000);
    }
  }
</script>

<!-- Dark Mode Toggle Button -->
<div class="fixed top-24 right-4 z-50">
  <button
    on:click={toggleDarkMode}
    class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    aria-label="Toggle dark mode"
  >
    <!-- Sun icon for light mode -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 hidden dark:block"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    <!-- Moon icon for dark mode -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 block dark:hidden"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</div>

<!-- Hero Section -->
<section
  bind:this={heroSection}
  class="relative min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 dark:from-gray-900 dark:via-indigo-950 dark:to-gray-950 flex items-center justify-center overflow-hidden"
>
  <!-- Animated background elements with more corporate feel -->
  <div class="absolute inset-0">
    <!-- Abstract geometric shapes for corporate identity -->
    <div class="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-30">
      <svg
        class="w-full h-full"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="grid-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stop-color="#4F46E5" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#0EA5E9" stop-opacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d="M0,0 L1000,0 L1000,1000 L0,1000 L0,0 Z M200,200 L800,200 L800,800 L200,800 L200,200 Z M400,400 L600,400 L600,600 L400,600 L400,400 Z"
          fill="url(#grid-gradient)"
        />
        <path
          d="M0,0 L1000,1000 M1000,0 L0,1000"
          stroke="currentColor"
          stroke-width="2"
          stroke-opacity="0.2"
        />
      </svg>
    </div>

    <!-- Modern blurred gradients -->
    <div
      class="absolute top-20 left-20 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-3xl animate-pulse"
    ></div>
    <div
      class="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse"
      style="animation-delay: 1s;"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-600/10 dark:bg-cyan-600/20 rounded-full blur-3xl animate-pulse"
      style="animation-delay: 2s;"
    ></div>

    <!-- Digital circuit pattern overlay -->
    <div class="absolute inset-0 opacity-10 dark:opacity-20">
      <svg
        class="w-full h-full"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern
          id="circuit-pattern"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0,10 L20,10 M10,0 L10,20"
            stroke="currentColor"
            stroke-width="0.5"
          />
          <circle cx="10" cy="10" r="2" fill="currentColor" />
        </pattern>
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          fill="url(#circuit-pattern)"
        />
      </svg>
    </div>
  </div>

  <div
    class="hero-content relative z-10 text-center text-white px-4 max-w-5xl mx-auto"
  >
    <!-- Company badge -->
    <div class="mb-8" data-aos="fade-down">
      <span
        class="inline-block px-5 py-2 bg-indigo-600/20 dark:bg-indigo-600/30 backdrop-blur-sm rounded-full text-sm font-medium border border-indigo-400/30 dark:border-indigo-400/50"
      >
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          {$_("menu.contact")}
        </span>
      </span>
    </div>

    <!-- Main heading with enhanced typography -->
    <h1
      class="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-indigo-100 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <span class="block">{$_('contact.title')}</span>
    </h1>

    <!-- Corporate tagline -->
    <p
      class="text-xl md:text-2xl text-gray-300 dark:text-gray-200 mb-10 leading-relaxed max-w-3xl mx-auto"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <span class="font-semibold text-white">{$_('contact.subtitle')}</span
      ><br />
      {$_('contact.description')}
    </p>

    <!-- Corporate stats -->
    <div
      class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto"
      data-aos="fade-up"
      data-aos-delay="300"
    >
      <div
        class="bg-white/5 dark:bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
      >
        <div class="text-3xl font-bold text-white mb-1">15+</div>
        <div class="text-sm text-gray-300">{$_('contact.stats.experience')}</div>
      </div>
      <div
        class="bg-white/5 dark:bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
      >
        <div class="text-3xl font-bold text-white mb-1">500+</div>
        <div class="text-sm text-gray-300">{$_('contact.stats.partners')}</div>
      </div>
      <div
        class="bg-white/5 dark:bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
      >
        <div class="text-3xl font-bold text-white mb-1">50+</div>
        <div class="text-sm text-gray-300">{$_('contact.stats.advisors')}</div>
      </div>
      <div
        class="bg-white/5 dark:bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
      >
        <div class="text-3xl font-bold text-white mb-1">24/7</div>
        <div class="text-sm text-gray-300">{$_('contact.stats.service')}</div>
      </div>
    </div>

    <!-- CTA buttons with enhanced design -->
    <div
      class="flex flex-col sm:flex-row gap-5 justify-center"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      <button
        class="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 dark:from-indigo-700 dark:to-blue-700 dark:hover:from-indigo-800 dark:hover:to-blue-800 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        {$_('contact.cta.consultNow')}
      </button>
      <button
        class="px-8 py-4 border-2 border-white/30 hover:border-white/50 dark:border-white/40 dark:hover:border-white/60 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {$_('contact.cta.scheduleMeeting')}
      </button>
    </div>
  </div>

  <!-- Enhanced scroll indicator -->
  <div
    class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
  >
    <div
      class="w-8 h-12 border-2 border-white/30 dark:border-white/40 rounded-full flex justify-center items-start"
    >
      <div
        class="w-1.5 h-3 bg-white/50 dark:bg-white/60 rounded-full mt-2 animate-pulse"
      ></div>
    </div>
    <div class="text-xs text-white/50 mt-2 text-center">{$_('contact.scrollDown')}</div>
  </div>
</section>

<!-- Contact Information Section -->
<section
  bind:this={contactSection}
  class="py-20 bg-gray-800 dark:bg-gray-900 relative overflow-hidden"
>
  <!-- 背景装饰元素 -->
  <div class="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20">
    <div class="absolute top-0 left-0 w-full h-full">
      <svg
        class="w-full h-full"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="currentColor"
              stroke-width="0.5"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill="url(#grid-pattern)" />
      </svg>
    </div>
  </div>

  <!-- 品牌价值装饰元素 -->
  <div
    class="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-3xl"
  ></div>
  <div
    class="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-3xl"
  ></div>

  <div class="max-w-7xl mx-auto px-4 relative z-10">
    <div class="text-center mb-16" data-aos="fade-up">
      <span
        class="inline-block px-5 py-2 bg-indigo-600/20 dark:bg-indigo-600/30 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-indigo-400/30 dark:border-indigo-400/50 mb-4"
        >{$_('contact.serviceSection.badge')}</span
      >
      <h2 class="text-4xl font-bold text-white mb-4">
        {$_('contact.serviceSection.title')}
      </h2>
      <p class="text-xl text-gray-300 max-w-3xl mx-auto">
        {$_('contact.serviceSection.description')}
      </p>
    </div>

    <!-- 企业价值主张 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <div
        class="bg-white/5 dark:bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex items-center"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div
          class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0"
        >
          <svg
            class="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <div>
          <h3 class="text-xl font-bold text-white mb-1">{$_('contact.values.safety.title')}</h3>
          <p class="text-gray-300">{$_('contact.values.safety.description')}</p>
        </div>
      </div>
      <div
        class="bg-white/5 dark:bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex items-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div
          class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0"
        >
          <svg
            class="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <div>
          <h3 class="text-xl font-bold text-white mb-1">{$_('contact.values.efficiency.title')}</h3>
          <p class="text-gray-300">{$_('contact.values.efficiency.description')}</p>
        </div>
      </div>
      <div
        class="bg-white/5 dark:bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex items-center"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div
          class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0"
        >
          <svg
            class="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        </div>
        <div>
          <h3 class="text-xl font-bold text-white mb-1">{$_('contact.values.global.title')}</h3>
          <p class="text-gray-300">{$_('contact.values.global.description')}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Business Consulting -->
      <div
        class="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-white/10 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-500"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <!-- 背景装饰 -->
        <div
          class="absolute -right-12 -top-12 w-40 h-40 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-2xl group-hover:bg-blue-600/30 dark:group-hover:bg-blue-600/40 transition-all duration-500"
        ></div>
        <div
          class="absolute -left-16 -bottom-16 w-40 h-40 bg-cyan-600/10 dark:bg-cyan-600/20 rounded-full blur-2xl group-hover:bg-cyan-600/30 dark:group-hover:bg-cyan-600/40 transition-all duration-500 delay-100"
        ></div>

        <!-- 内容 -->
        <div class="relative z-10">
          <div
            class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-500/20 dark:shadow-blue-500/30"
          >
            <svg
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
              ></path>
            </svg>
          </div>

          <h3 class="text-xl font-bold text-white mb-4">
            {$_("footer.contactInfo.businessConsulting")}
          </h3>
          <p class="text-gray-300 mb-6 text-sm">
            {$_('contact.businessConsulting.description')}
          </p>

          <div class="space-y-4">
            {#each contactInfo.business.emails as email}
              <div
                class="flex items-center text-gray-300 group-hover:text-blue-300 transition-colors"
              >
                <div
                  class="w-10 h-10 rounded-lg bg-white/5 dark:bg-white/10 flex items-center justify-center mr-3"
                >
                  <svg
                    class="w-5 h-5 text-blue-400 dark:text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                    ></path>
                  </svg>
                </div>
                <a
                  href="mailto:{email}"
                  class="hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >{email}</a
                >
              </div>
            {/each}
            {#each contactInfo.business.phones as phone}
              <div
                class="flex items-center text-gray-300 group-hover:text-blue-300 transition-colors"
              >
                <div
                  class="w-10 h-10 rounded-lg bg-white/5 dark:bg-white/10 flex items-center justify-center mr-3"
                >
                  <svg
                    class="w-5 h-5 text-blue-400 dark:text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                </div>
                <a
                  href="tel:{phone}"
                  class="hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >{phone}</a
                >
              </div>
            {/each}
          </div>

          <!-- 悬停时显示的按钮 -->
          <div
            class="mt-8 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
          >
            <button
              class="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg text-white font-medium flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              {$_('contact.cta.consultNow')}
            </button>
          </div>
        </div>
      </div>

      <!-- Join Us -->
      <div
        class="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-white/10 dark:border-white/5 hover:border-purple-500/30 dark:hover:border-purple-500/30 transition-all duration-500"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <!-- 背景装饰 -->
        <div
          class="absolute -right-12 -top-12 w-40 h-40 bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-2xl group-hover:bg-purple-600/30 dark:group-hover:bg-purple-600/40 transition-all duration-500"
        ></div>
        <div
          class="absolute -left-16 -bottom-16 w-40 h-40 bg-pink-600/10 dark:bg-pink-600/20 rounded-full blur-2xl group-hover:bg-pink-600/30 dark:group-hover:bg-pink-600/40 transition-all duration-500 delay-100"
        ></div>

        <!-- 内容 -->
        <div class="relative z-10">
          <div
            class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-purple-500/20 dark:shadow-purple-500/30"
          >
            <svg
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>

          <h3 class="text-xl font-bold text-white mb-4">
            {$_("footer.contactInfo.joinUs")}
          </h3>
          <p class="text-gray-300 mb-6 text-sm">
            {$_('contact.joinUs.description')}
          </p>

          <div class="space-y-4">
            <div
              class="flex items-center text-gray-300 group-hover:text-purple-300 transition-colors"
            >
              <div
                class="w-10 h-10 rounded-lg bg-white/5 dark:bg-white/10 flex items-center justify-center mr-3"
              >
                <svg
                  class="w-5 h-5 text-purple-400 dark:text-purple-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <a
                href="mailto:{contactInfo.join.email}"
                class="hover:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >{contactInfo.join.email}</a
              >
            </div>
            <div
              class="flex items-center text-gray-300 group-hover:text-purple-300 transition-colors"
            >
              <div
                class="w-10 h-10 rounded-lg bg-white/5 dark:bg-white/10 flex items-center justify-center mr-3"
              >
                <svg
                  class="w-5 h-5 text-purple-400 dark:text-purple-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
              </div>
              <a
                href="tel:{contactInfo.join.phone}"
                class="hover:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >{contactInfo.join.phone}</a
              >
            </div>
          </div>

          <!-- 悬停时显示的按钮 -->
          <div
            class="mt-8 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
          >
            <button
              class="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-medium flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                />
              </svg>
              {$_('contact.joinUs.cta')}
            </button>
          </div>
        </div>
      </div>

      <!-- Company Phone -->
      <div
        class="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-white/10 dark:border-white/5 hover:border-green-500/30 dark:hover:border-green-500/30 transition-all duration-500"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <!-- 背景装饰 -->
        <div
          class="absolute -right-12 -top-12 w-40 h-40 bg-green-600/10 dark:bg-green-600/20 rounded-full blur-2xl group-hover:bg-green-600/30 dark:group-hover:bg-green-600/40 transition-all duration-500"
        ></div>
        <div
          class="absolute -left-16 -bottom-16 w-40 h-40 bg-emerald-600/10 dark:bg-emerald-600/20 rounded-full blur-2xl group-hover:bg-emerald-600/30 dark:group-hover:bg-emerald-600/40 transition-all duration-500 delay-100"
        ></div>

        <!-- 内容 -->
        <div class="relative z-10">
          <div
            class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-green-500/20 dark:shadow-green-500/30"
          >
            <svg
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              ></path>
            </svg>
          </div>

          <h3 class="text-xl font-bold text-white mb-4">{$_('contact.companyPhone.title')}</h3>
          <p class="text-gray-300 mb-6 text-sm">
            {$_('contact.companyPhone.description')}
          </p>

          <div
            class="flex items-center justify-center text-gray-300 group-hover:text-green-300 transition-colors mt-8"
          >
            <div
              class="w-12 h-12 rounded-full bg-white/5 dark:bg-white/10 flex items-center justify-center mr-4 animate-pulse"
            >
              <svg
                class="w-6 h-6 text-green-400 dark:text-green-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
            </div>
            <a
              href="tel:{contactInfo.company.phone}"
              class="text-2xl font-bold hover:text-green-400 dark:hover:text-green-300 transition-colors"
              >{contactInfo.company.phone}</a
            >
          </div>

          <!-- 悬停时显示的按钮 -->
          <div
            class="mt-8 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
          >
            <button
              class="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg text-white font-medium flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {$_('contact.companyPhone.cta')}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Office Locations Section -->
<section
  bind:this={mapSection}
  class="py-20 bg-gray-900 dark:bg-gray-900 relative overflow-hidden"
>
  <!-- 背景装饰 -->
  <div
    class="map-bg absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 dark:from-blue-900/30 dark:to-purple-900/30"
  ></div>
  <div
    class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
  >
    <svg
      class="w-full h-full"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="worldGrid"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="white"
            stroke-width="0.5"
          />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#worldGrid)" />
    </svg>
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-4">
    <div class="text-center mb-16" data-aos="fade-up">
      <div
        class="inline-block mb-3 px-4 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full"
      >
        <span class="text-blue-300 text-sm font-semibold tracking-wider"
          >{$_('contact.locations.badge')}</span
        >
      </div>
      <h2 class="text-4xl font-bold text-white mb-4">{$_('contact.locations.title')}</h2>
      <p class="text-xl text-gray-300 dark:text-gray-200 max-w-2xl mx-auto">
        {$_('contact.locations.description')}
      </p>
    </div>

    <!-- 交互式地图预览 -->
    <div class="mb-16 relative" data-aos="zoom-in">
      <div
        class="w-full h-64 md:h-96 bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      >
        <!-- 地图背景 -->
        <div class="absolute inset-0 w-full h-full opacity-60">
          <svg
            class="w-full h-full"
            viewBox="0 0 800 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- 中国地图轮廓 - 简化版 -->
            <path
              d="M200,100 C250,80 300,90 350,70 C400,50 450,60 500,80 C550,100 600,90 650,120 C700,150 720,200 700,250 C680,300 650,320 600,330 C550,340 500,330 450,340 C400,350 350,330 300,310 C250,290 220,250 200,200 C180,150 180,120 200,100 Z"
              fill="none"
              stroke="rgba(59, 130, 246, 0.5)"
              stroke-width="2"
            />
            <!-- 大连点 -->
            <circle
              cx="600"
              cy="200"
              r="8"
              fill="#3B82F6"
              class="animate-ping"
              style="animation-duration: 3s;"
            />
            <circle cx="600" cy="200" r="4" fill="#FFFFFF" />
            <!-- 深圳点 -->
            <circle
              cx="500"
              cy="300"
              r="8"
              fill="#8B5CF6"
              class="animate-ping"
              style="animation-duration: 3s;"
            />
            <circle cx="500" cy="300" r="4" fill="#FFFFFF" />
            <!-- 连接线 -->
            <path
              d="M600,200 C550,230 520,260 500,300"
              stroke="rgba(255,255,255,0.3)"
              stroke-width="1"
              stroke-dasharray="5,5"
            />
          </svg>
        </div>

        <!-- 地图装饰元素 -->
        <div class="absolute inset-0 w-full h-full">
          <div
            class="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full filter blur-[40px]"
          ></div>
          <div
            class="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full filter blur-[40px]"
          ></div>
        </div>

        <!-- 地图标记 -->
        <div
          class="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2"
        >
          <div class="relative">
            <div
              class="absolute -top-1 -left-1 w-6 h-6 bg-blue-500 rounded-full opacity-30 animate-ping"
            ></div>
            <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
          </div>
          <div
            class="absolute mt-2 ml-6 bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs text-white whitespace-nowrap"
          >
            {$_('contact.locations.dalian.name')}
          </div>
        </div>

        <div
          class="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2"
        >
          <div class="relative">
            <div
              class="absolute -top-1 -left-1 w-6 h-6 bg-purple-500 rounded-full opacity-30 animate-ping"
            ></div>
            <div class="w-4 h-4 bg-purple-500 rounded-full"></div>
          </div>
          <div
            class="absolute mt-2 ml-6 bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs text-white whitespace-nowrap"
          >
            {$_('contact.locations.shenzhen.name')}
          </div>
        </div>
      </div>

      <!-- 地图控制按钮 -->
      <div class="absolute bottom-4 right-4 flex space-x-2">
        <button
          aria-label={$_('contact.locations.mapZoomIn')}
          class="w-8 h-8 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-700/80 transition-colors"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </button>
        <button
          aria-label={$_('contact.locations.mapZoomOut')}
          class="w-8 h-8 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-700/80 transition-colors"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 12H4"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Dalian Office -->
      <div
        class="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/20 overflow-hidden"
        data-aos="fade-right"
      >
        <!-- 背景装饰 -->
        <div
          class="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full filter blur-[30px] transform transition-all duration-500 group-hover:bg-blue-500/20 group-hover:w-48 group-hover:h-48"
        ></div>
        <div
          class="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full filter blur-[30px] transform transition-all duration-500 group-hover:bg-cyan-500/20"
        ></div>

        <!-- 3D装饰元素 -->
        <div
          class="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none transform rotate-45 translate-x-16 -translate-y-16 group-hover:translate-x-14 group-hover:-translate-y-14 transition-transform duration-500"
        >
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-full"
          >
            <path
              d="M0,0 L100,0 L100,100 L0,100 Z"
              fill="none"
              stroke="rgba(59, 130, 246, 0.5)"
              stroke-width="1"
            />
            <path
              d="M20,20 L80,20 L80,80 L20,80 Z"
              fill="none"
              stroke="rgba(59, 130, 246, 0.5)"
              stroke-width="1"
            />
            <path
              d="M40,40 L60,40 L60,60 L40,60 Z"
              fill="none"
              stroke="rgba(59, 130, 246, 0.5)"
              stroke-width="1"
            />
          </svg>
        </div>

        <div class="relative z-10">
          <div class="flex items-center mb-6">
            <div
              class="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-blue-500/20 transform transition-transform duration-300 group-hover:scale-110"
            >
              <svg
                class="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white">{$_('contact.locations.dalian.name')}</h3>
              <p class="text-blue-300 text-sm">{$_('contact.locations.dalian.type')}</p>
            </div>
          </div>

          <div class="mb-6 pl-4 border-l-2 border-blue-500/30">
            <p class="text-gray-300 dark:text-gray-200 text-lg leading-relaxed">
              {contactInfo.addresses.dalian}
            </p>
          </div>

          <div
            class="flex justify-between items-center mt-6 pt-6 border-t border-white/10"
          >
            <span
              class="inline-block px-4 py-2 bg-blue-500/20 text-blue-200 rounded-lg text-sm font-medium"
              >{$_('contact.locations.dalian.tag')}</span
            >
            <button
              class="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-lg text-sm font-medium flex items-center gap-2 transform transition-all duration-300 hover:translate-x-1"
            >
              <span>{$_('contact.locations.viewDetails')}</span>
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Shenzhen Office -->
      <div
        class="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/20 overflow-hidden"
        data-aos="fade-left"
      >
        <!-- 背景装饰 -->
        <div
          class="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full filter blur-[30px] transform transition-all duration-500 group-hover:bg-purple-500/20 group-hover:w-48 group-hover:h-48"
        ></div>
        <div
          class="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/10 rounded-full filter blur-[30px] transform transition-all duration-500 group-hover:bg-pink-500/20"
        ></div>

        <!-- 3D装饰元素 -->
        <div
          class="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none transform rotate-45 translate-x-16 -translate-y-16 group-hover:translate-x-14 group-hover:-translate-y-14 transition-transform duration-500"
        >
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-full"
          >
            <path
              d="M0,0 L100,0 L100,100 L0,100 Z"
              fill="none"
              stroke="rgba(139, 92, 246, 0.5)"
              stroke-width="1"
            />
            <path
              d="M20,20 L80,20 L80,80 L20,80 Z"
              fill="none"
              stroke="rgba(139, 92, 246, 0.5)"
              stroke-width="1"
            />
            <path
              d="M40,40 L60,40 L60,60 L40,60 Z"
              fill="none"
              stroke="rgba(139, 92, 246, 0.5)"
              stroke-width="1"
            />
          </svg>
        </div>

        <div class="relative z-10">
          <div class="flex items-center mb-6">
            <div
              class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-purple-500/20 transform transition-transform duration-300 group-hover:scale-110"
            >
              <svg
                class="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white">{$_('contact.locations.shenzhen.name')}</h3>
              <p class="text-purple-300 text-sm">{$_('contact.locations.shenzhen.type')}</p>
            </div>
          </div>

          <div class="mb-6 pl-4 border-l-2 border-purple-500/30">
            <p class="text-gray-300 dark:text-gray-200 text-lg leading-relaxed">
              {contactInfo.addresses.shenzhen}
            </p>
          </div>

          <div
            class="flex justify-between items-center mt-6 pt-6 border-t border-white/10"
          >
            <span
              class="inline-block px-4 py-2 bg-purple-500/20 text-purple-200 rounded-lg text-sm font-medium"
              >{$_('contact.locations.shenzhen.tag')}</span
            >
            <button
              class="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 rounded-lg text-sm font-medium flex items-center gap-2 transform transition-all duration-300 hover:translate-x-1"
            >
              <span>{$_('contact.locations.viewDetails')}</span>
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Contact Form Section -->
<section
  bind:this={formSection}
  class="py-20 bg-gray-900 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
>
  <!-- 背景装饰元素 -->
  <div
    class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
  >
    <!-- 网格背景 - 更精细的企业风格网格 -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute inset-0"
        style="background-image: linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px); background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;"
      ></div>
    </div>

    <!-- 左侧装饰 - 更现代的渐变效果 -->
    <div
      class="absolute -left-20 top-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full filter blur-[100px] animate-pulse"
    ></div>

    <!-- 右侧装饰 - 更现代的渐变效果 -->
    <div
      class="absolute -right-20 bottom-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full filter blur-[100px] animate-pulse"
      style="animation-delay: 2s;"
    ></div>

    <!-- 数字电路图案 - 更复杂的企业科技风格 -->
    <div class="absolute top-10 right-10 w-80 h-80 opacity-10">
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        class="w-full h-full"
      >
        <path
          d="M10,10 L50,10 L50,50 L90,50 L90,90 L130,90 L130,130 L170,130 L170,170"
          stroke="rgba(59, 130, 246, 0.8)"
          stroke-width="2"
          fill="none"
        />
        <path
          d="M30,30 L70,30 L70,70 L110,70 L110,110 L150,110 L150,150 L190,150"
          stroke="rgba(139, 92, 246, 0.8)"
          stroke-width="2"
          fill="none"
        />
        <path
          d="M10,50 L30,50 L30,90 L50,90 L50,130 L70,130 L70,170"
          stroke="rgba(14, 165, 233, 0.8)"
          stroke-width="2"
          fill="none"
        />
        <path
          d="M130,10 L130,30 L170,30 L170,70 L190,70"
          stroke="rgba(236, 72, 153, 0.8)"
          stroke-width="2"
          fill="none"
        />
        <circle cx="50" cy="10" r="3" fill="rgba(59, 130, 246, 0.8)" />
        <circle cx="90" cy="50" r="3" fill="rgba(59, 130, 246, 0.8)" />
        <circle cx="130" cy="90" r="3" fill="rgba(59, 130, 246, 0.8)" />
        <circle cx="170" cy="130" r="3" fill="rgba(59, 130, 246, 0.8)" />
        <circle cx="70" cy="30" r="3" fill="rgba(139, 92, 246, 0.8)" />
        <circle cx="110" cy="70" r="3" fill="rgba(139, 92, 246, 0.8)" />
        <circle cx="150" cy="110" r="3" fill="rgba(139, 92, 246, 0.8)" />
        <circle cx="190" cy="150" r="3" fill="rgba(139, 92, 246, 0.8)" />
        <circle cx="30" cy="50" r="3" fill="rgba(14, 165, 233, 0.8)" />
        <circle cx="50" cy="90" r="3" fill="rgba(14, 165, 233, 0.8)" />
        <circle cx="70" cy="130" r="3" fill="rgba(14, 165, 233, 0.8)" />
        <circle cx="130" cy="30" r="3" fill="rgba(236, 72, 153, 0.8)" />
        <circle cx="170" cy="70" r="3" fill="rgba(236, 72, 153, 0.8)" />
      </svg>
    </div>

    <!-- 左下角装饰 - 企业科技风格元素 -->
    <div class="absolute bottom-10 left-10 w-60 h-60 opacity-10">
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        class="w-full h-full"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="rgba(59, 130, 246, 0.6)"
          stroke-width="1"
          fill="none"
          stroke-dasharray="6 3"
        />
        <circle
          cx="50"
          cy="50"
          r="30"
          stroke="rgba(139, 92, 246, 0.6)"
          stroke-width="1"
          fill="none"
          stroke-dasharray="6 3"
        />
        <circle
          cx="50"
          cy="50"
          r="20"
          stroke="rgba(14, 165, 233, 0.6)"
          stroke-width="1"
          fill="none"
          stroke-dasharray="6 3"
        />
        <line
          x1="10"
          y1="50"
          x2="90"
          y2="50"
          stroke="rgba(59, 130, 246, 0.6)"
          stroke-width="1"
          stroke-dasharray="2 2"
        />
        <line
          x1="50"
          y1="10"
          x2="50"
          y2="90"
          stroke="rgba(59, 130, 246, 0.6)"
          stroke-width="1"
          stroke-dasharray="2 2"
        />
      </svg>
    </div>
  </div>

  <div class="max-w-5xl mx-auto px-4 relative z-10">
    <div class="text-center mb-16" data-aos="fade-up">
      <div
        class="inline-block mb-3 px-4 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full text-blue-300 text-sm font-medium border border-blue-500/20 shadow-lg shadow-blue-500/5"
      >
        {$_('contact.form.badge')}
      </div>
      <h2
        class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 mb-4"
      >
        {$_('contact.form.title')}
      </h2>
      <p class="text-xl text-blue-200/80 max-w-2xl mx-auto">
        {$_('contact.form.description')}
      </p>
    </div>

    <div
      class="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm text-white rounded-3xl shadow-2xl p-8 md:p-12 border border-white/5 transform transition-all duration-500 hover:shadow-blue-500/10"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <!-- 表单标题装饰 - 重新设计的左侧部分 -->
      <div
        class="flex flex-col md:flex-row md:items-stretch justify-between mb-8 pb-6 border-b border-white/10 gap-6"
      >
        <!-- 左侧企业服务图形展示 -->
        <div
          class="md:w-2/5 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-2xl p-6 relative overflow-hidden transform transition-all duration-500 hover:shadow-blue-500/20 hover:scale-[1.02] group"
        >
          <!-- 背景装饰元素 -->
          <div class="absolute top-0 left-0 w-full h-full opacity-20">
            <svg
              class="w-full h-full"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="rgba(59, 130, 246, 0.4)"
                d="M45.7,-77.8C59.3,-71.1,70.3,-59.3,78.9,-45.7C87.5,-32.1,93.7,-16.1,93.2,-0.3C92.7,15.5,85.6,31,76.1,44.1C66.6,57.2,54.8,67.9,41.2,74.8C27.7,81.7,12.3,84.8,-2.2,88C-16.7,91.2,-33.4,94.4,-45.3,87.5C-57.2,80.6,-64.3,63.6,-70.6,47.9C-76.9,32.2,-82.4,16.1,-83.2,-0.5C-84,-17,-80.1,-34,-71.5,-47.8C-62.9,-61.6,-49.6,-72.2,-35.6,-78.6C-21.5,-85,-10.8,-87.3,2.2,-90.8C15.1,-94.3,30.3,-99,45.7,-77.8Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          <!-- 标题和描述 -->
          <div class="relative z-10 mb-6">
            <div class="flex items-center mb-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-blue-500/20 transform transition-transform duration-300 group-hover:scale-110"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-white">{$_('contact.form.subtitle')}</h3>
            </div>
            <p class="text-blue-200/90 text-lg ml-16">{$_('contact.form.prompt')}</p>
          </div>

          <!-- 企业服务承诺 - 垂直排列 -->
          <div class="relative z-10 space-y-4 ml-4">
            <div
              class="flex items-center transform transition-transform duration-300 hover:translate-x-2"
            >
              <div
                class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4"
              >
                <svg
                  class="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 class="text-white font-semibold">{$_('contact.form.security.title')}</h4>
                <p class="text-blue-300/80 text-sm">{$_('contact.form.security.description')}</p>
              </div>
            </div>

            <div
              class="flex items-center transform transition-transform duration-300 hover:translate-x-2"
            >
              <div
                class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4"
              >
                <svg
                  class="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 class="text-white font-semibold">{$_('contact.form.response.title')}</h4>
                <p class="text-blue-300/80 text-sm">{$_('contact.form.response.description')}</p>
              </div>
            </div>

            <div
              class="flex items-center transform transition-transform duration-300 hover:translate-x-2"
            >
              <div
                class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4"
              >
                <svg
                  class="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 class="text-white font-semibold">{$_('contact.form.service.title')}</h4>
                <p class="text-blue-300/80 text-sm">
                  {$_('contact.form.service.description')}
                </p>
              </div>
            </div>
          </div>

          <!-- 装饰性图形元素 -->
          <div class="absolute bottom-4 right-4 opacity-30 animate-float">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="40"
                cy="40"
                r="30"
                stroke="rgba(59, 130, 246, 0.6)"
                stroke-width="2"
                stroke-dasharray="4 2"
              />
              <circle
                cx="40"
                cy="40"
                r="20"
                stroke="rgba(14, 165, 233, 0.6)"
                stroke-width="2"
                stroke-dasharray="4 2"
              />
              <circle cx="40" cy="40" r="10" fill="rgba(59, 130, 246, 0.2)" />
            </svg>
          </div>
        </div>

        <!-- 右侧表单部分 -->
        <div class="md:w-3/5 flex flex-col">
          <form on:submit={handleSubmit} class="space-y-8">
            <!-- 表单分组 - 个人信息 -->
            <div class="mb-8">
              <div class="flex items-center mb-6">
                <div
                  class="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3"
                >
                  <span class="text-blue-400 font-semibold">1</span>
                </div>
                <h4 class="text-lg font-semibold text-white">{$_('contact.form.personalInfo')}</h4>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Name -->
                <div class="form-field relative group">
                  <label
                    for="name"
                    class="block text-sm font-semibold text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors duration-300"
                    >{$_('contact.form.name')} <span class="text-blue-400">*</span></label
                  >
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                    >
                      <svg
                        class="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="name"
                      bind:value={formData.name}
                      required
                      class="w-full pl-12 pr-4 py-3 border-2 border-gray-700 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-800/50 dark:bg-gray-700/50 text-white placeholder-gray-400 dark:placeholder-gray-400 backdrop-blur-sm"
                      placeholder={$_('contact.form.namePlaceholder')}
                    />
                  </div>
                </div>

                <!-- Email -->
                <div class="form-field relative group">
                  <label
                    for="email"
                    class="block text-sm font-semibold text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors duration-300"
                    >{$_('contact.form.email')} <span class="text-blue-400">*</span></label
                  >
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                    >
                      <svg
                        class="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      bind:value={formData.email}
                      required
                      class="w-full pl-12 pr-4 py-3 border-2 border-gray-700 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-800/50 dark:bg-gray-700/50 text-white placeholder-gray-400 dark:placeholder-gray-400 backdrop-blur-sm"
                      placeholder={formPlaceholders.email}
                    />
                  </div>
                </div>

                <!-- Company -->
                <div class="form-field relative group">
                  <label
                    for="company"
                    class="block text-sm font-semibold text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors duration-300"
                    >{$_('contact.form.company')}</label
                  >
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                    >
                      <svg
                        class="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="company"
                      bind:value={formData.company}
                      class="w-full pl-12 pr-4 py-3 border-2 border-gray-700 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-800/50 dark:bg-gray-700/50 text-white placeholder-gray-400 dark:placeholder-gray-400 backdrop-blur-sm"
                      placeholder={formPlaceholders.company}
                    />
                  </div>
                </div>

                <!-- Phone -->
                <div class="form-field relative group">
                  <label
                    for="phone"
                    class="block text-sm font-semibold text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors duration-300"
                    >{$_('contact.form.phone')}</label
                  >
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                    >
                      <svg
                        class="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      bind:value={formData.phone}
                      class="w-full pl-12 pr-4 py-3 border-2 border-gray-700 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-800/50 dark:bg-gray-700/50 text-white placeholder-gray-400 dark:placeholder-gray-400 backdrop-blur-sm"
                      placeholder={formPlaceholders.phone}
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- 表单分组 - 服务需求 -->
            <div class="mb-8">
              <div class="flex items-center mb-6">
                <div
                  class="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3"
                >
                  <span class="text-blue-400 font-semibold">2</span>
                </div>
                <h4 class="text-lg font-semibold text-white">{$_('contact.form.serviceRequirements')}</h4>
              </div>

              <!-- Service -->
              <div class="form-field relative group mb-6">
                <label
                  for="service"
                  class="block text-sm font-semibold text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors duration-300"
                    >{$_('contact.form.interestedService')}</label
                >
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                  >
                    <svg
                      class="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <select
                    id="service"
                    bind:value={formData.service}
                    class="w-full pl-12 pr-4 py-3 border-2 border-gray-700 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-800/50 dark:bg-gray-700/50 text-white placeholder-gray-400 dark:placeholder-gray-400 appearance-none backdrop-blur-sm"
                  >
                    <option
                      value=""
                      class="text-gray-900 dark:text-white bg-gray-800 dark:bg-gray-700"
                      >{formPlaceholders.selectServiceType}</option
                    >
                    {#each serviceOptions as option}
                      <option
                        value={option.value}
                        class="text-gray-900 dark:text-white bg-gray-800 dark:bg-gray-700"
                        >{option.label}</option
                      >
                    {/each}
                  </select>
                  <div
                    class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none"
                  >
                    <svg
                      class="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Message -->
              <div class="form-field relative group">
                <label
                  for="message"
                  class="block text-sm font-semibold text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors duration-300"
                    >{$_('contact.form.detailedRequirements')} <span class="text-blue-400">*</span></label
                >
                <div class="relative">
                  <div
                    class="absolute top-3 left-0 pl-4 flex items-start pointer-events-none"
                  >
                    <svg
                      class="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                  </div>
                  <textarea
                    id="message"
                    bind:value={formData.message}
                    required
                    rows="6"
                    class="w-full pl-12 pr-4 py-3 border-2 border-gray-700 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 resize-none bg-gray-800/50 dark:bg-gray-700/50 text-white placeholder-gray-400 dark:placeholder-gray-400 backdrop-blur-sm"
                    placeholder={formPlaceholders.requirements}
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- 隐私政策 -->
            <div class="mb-8">
              <div class="flex items-start space-x-3">
                <div class="flex items-center h-5 mt-0.5">
                  <input
                    id="privacy"
                    type="checkbox"
                    bind:checked={formData.privacy}
                    required
                    class="w-4 h-4 bg-gray-800 border-2 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 accent-blue-500 cursor-pointer"
                  />
                </div>
                <label for="privacy" class="text-sm text-gray-300">
                  {$_('contact.form.privacyAgreement')}<span
                    class="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors duration-300"
                    >{$_('contact.form.privacyPolicy')}</span
                  >{$_('contact.form.and')}<span
                    class="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors duration-300"
                    >{$_('contact.form.termsOfService')}</span
                  >
                </label>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="text-center pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                class="group relative px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:transform-none disabled:shadow-none dark:disabled:from-gray-600 dark:disabled:to-gray-700 overflow-hidden"
              >
                <span
                  class="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"
                ></span>
                <span
                  class="absolute -inset-px bg-gradient-to-r from-blue-400/50 to-cyan-400/50 rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"
                ></span>

                <div
                  class="relative flex items-center justify-center space-x-2"
                >
                  {#if isSubmitting}
                    <svg
                      class="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>{$_('contact.form.processing')}</span>
                  {:else}
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                    <span>{$_('contact.form.submitConsultation')}</span>
                  {/if}
                </div>
              </button>
            </div>

            <!-- Success/Error Messages -->
            {#if submitStatus === "success"}
              <div
                class="success-message text-center p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl dark:bg-green-900/30 dark:border-green-700 dark:text-green-300"
              >
                <svg
                  class="w-6 h-6 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                {$_('contact.form.successMessage')}
              </div>
            {/if}

            {#if submitStatus === "error"}
              <div
                class="text-center p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl dark:bg-red-900/30 dark:border-red-700 dark:text-red-300"
              >
                <svg
                  class="w-6 h-6 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                {$_('contact.form.errorMessage')}
              </div>
            {/if}
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  :global(.contact-card) {
    transform-style: preserve-3d;
    transition: transform 0.3s ease;
  }

  :global(.contact-card:hover) {
    transform: translateY(-8px) rotateX(2deg) scale(1.02);
  }

  .form-field input:focus,
  .form-field select:focus,
  .form-field textarea:focus {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    .form-field input:focus,
    .form-field select:focus,
    .form-field textarea:focus {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
</style>
