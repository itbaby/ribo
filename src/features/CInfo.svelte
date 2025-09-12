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
    { number: '500+', label: 'Global Clients', icon: '🌍' },
    { number: '15+', label: 'Years Experience', icon: '⏰' },
    { number: '1000+', label: 'Successful Projects', icon: '🚀' },
    { number: '50+', label: 'Expert Team', icon: '👥' }
  ];

  // Core values data
  const values = [
    {
      title: 'Innovation',
      description: 'Driving technological advancement through cutting-edge solutions and creative thinking.',
      icon: '💡',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Excellence',
      description: 'Delivering superior quality in every project with meticulous attention to detail.',
      icon: '⭐',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Collaboration',
      description: 'Building strong partnerships and fostering teamwork to achieve shared success.',
      icon: '🤝',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Integrity',
      description: 'Maintaining the highest ethical standards and transparency in all our interactions.',
      icon: '🛡️',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  // Timeline data
  const timeline = [
    {
      year: '2008',
      title: 'Company Founded',
      description: 'Started as a small consulting firm with a vision to transform businesses through technology.',
      position: 'left'
    },
    {
      year: '2012',
      title: 'International Expansion',
      description: 'Expanded operations globally, serving clients across Asia, Europe, and North America.',
      position: 'right'
    },
    {
      year: '2016',
      title: 'Technology Innovation',
      description: 'Launched our AI-powered talent matching platform, revolutionizing recruitment processes.',
      position: 'left'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Pivoted to fully digital services, enabling remote collaboration and virtual consultations.',
      position: 'right'
    },
    {
      year: '2024',
      title: 'Future Vision',
      description: 'Leading the industry with blockchain-based solutions and sustainable business practices.',
      position: 'left'
    }
  ];

  // Team members data
  const team = [
    {
      name: 'Sarah Chen',
      position: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      bio: 'Visionary leader with 20+ years in technology consulting and business transformation.'
    },
    {
      name: 'Michael Rodriguez',
      position: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      bio: 'Technology expert specializing in AI, cloud computing, and enterprise architecture.'
    },
    {
      name: 'Emily Wang',
      position: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'Operations strategist focused on process optimization and global team coordination.'
    },
    {
      name: 'David Kim',
      position: 'Lead Consultant',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'Senior consultant with expertise in digital transformation and change management.'
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
          Transforming Businesses Since 2008
        </span>
      </div>
      
      <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent leading-tight" data-aos="fade-up" data-aos-delay="200">
        About Ribo
        <span class="block text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Consulting Services
        </span>
      </h1>
      
      <p class="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="400">
        We are a leading technology consulting firm dedicated to empowering businesses through innovative solutions, strategic insights, and exceptional talent acquisition services.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="600">
        <button class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          Discover Our Story
        </button>
        <button class="px-8 py-4 border-2 border-white/20 hover:border-white/40 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-white/10">
          Meet Our Team
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
          Our Core Values
        </h2>
        <p class="text-xl text-slate-400 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          The principles that guide our mission and define our commitment to excellence in everything we do.
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
          Our Journey
        </h2>
        <p class="text-xl text-slate-400 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          A timeline of milestones that shaped our growth and evolution into a leading consulting firm.
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
          Meet Our Team
        </h2>
        <p class="text-xl text-slate-400 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          The brilliant minds behind our success, bringing together diverse expertise and shared passion for innovation.
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
          Ready to Transform Your Business?
        </h2>
        <p class="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Let's discuss how our expertise can help you achieve your goals and drive sustainable growth.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Get Started Today
          </button>
          <button class="px-8 py-4 border-2 border-white/20 hover:border-white/40 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-white/10">
            Schedule a Consultation
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

