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
  $: stats = [
    { number: $_('info.stats.items.0.number'), label: $_('info.stats.items.0.label'), icon: $_('info.stats.items.0.icon') },
    { number: $_('info.stats.items.1.number'), label: $_('info.stats.items.1.label'), icon: $_('info.stats.items.1.icon') },
    { number: $_('info.stats.items.2.number'), label: $_('info.stats.items.2.label'), icon: $_('info.stats.items.2.icon') },
    { number: $_('info.stats.items.3.number'), label: $_('info.stats.items.3.label'), icon: $_('info.stats.items.3.icon') }
  ];

  // Core values data
  $: values = [
    {
      title: $_('info.values.items.0.title'),
      description: $_('info.values.items.0.description'),
      icon: $_('info.values.items.0.icon'),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: $_('info.values.items.1.title'),
      description: $_('info.values.items.1.description'),
      icon: $_('info.values.items.1.icon'),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: $_('info.values.items.2.title'),
      description: $_('info.values.items.2.description'),
      icon: $_('info.values.items.2.icon'),
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: $_('info.values.items.3.title'),
      description: $_('info.values.items.3.description'),
      icon: $_('info.values.items.3.icon'),
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  // Timeline data
  $: timeline = [
    {
      year: $_('info.timeline.items.0.year'),
      title: $_('info.timeline.items.0.title'),
      description: $_('info.timeline.items.0.description'),
      position: 'right'
    },
    {
      year: $_('info.timeline.items.1.year'),
      title: $_('info.timeline.items.1.title'),
      description: $_('info.timeline.items.1.description'),
      position: 'right'
    },
    {
      year: $_('info.timeline.items.2.year'),
      title: $_('info.timeline.items.2.title'),
      description: $_('info.timeline.items.2.description'),
      position: 'left'
    },
    {
      year: $_('info.timeline.items.3.year'),
      title: $_('info.timeline.items.3.title'),
      description: $_('info.timeline.items.3.description'),
      position: 'right'
    },
    {
      year: $_('info.timeline.items.4.year'),
      title: $_('info.timeline.items.4.title'),
      description: $_('info.timeline.items.4.description'),
      position: 'left'
    }
  ];

  // Team members data
  $: team = [
    {
      name: $_('info.team.members.0.name'),
      position: $_('info.team.members.0.position'),
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=400&fit=crop&crop=face',
      bio: $_('info.team.members.0.bio')
    },
    {
      name: $_('info.team.members.1.name'),
      position: $_('info.team.members.1.position'),
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0c766d19?w=400&h=400&fit=crop&crop=face',
      bio: $_('info.team.members.1.bio')
    },
    {
      name: $_('info.team.members.2.name'),
      position: $_('info.team.members.2.position'),
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=face',
      bio: $_('info.team.members.2.bio')
    },
    {
      name: $_('info.team.members.3.name'),
      position: $_('info.team.members.3.position'),
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=400&fit=crop&crop=face',
      bio: $_('info.team.members.3.bio')
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
        textContent: (i: number, target: Element) => target.getAttribute('data-number'),
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
          {$_('info.hero.badge')}
        </span>
      </div>
      
      <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent leading-tight" data-aos="fade-up" data-aos-delay="200">
        {$_('info.hero.title')}
        <span class="block text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {$_('info.hero.subtitle')}
        </span>
      </h1>
      
      <p class="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="400">
        {$_('info.hero.description')}
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="600">
        <button class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          {$_('info.hero.buttons.story')}
        </button>
        <button class="px-8 py-4 border-2 border-white/20 hover:border-white/40 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-white/10">
          {$_('info.hero.buttons.team')}
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
          {$_('info.values.title')}
        </h2>
        <p class="text-xl text-slate-400 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
           {$_('info.values.description')}
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
          {$_('info.timeline.title')}
        </h2>
        <p class="text-xl text-slate-400 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          {$_('info.timeline.description')}
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
          {$_('info.team.title')}
        </h2>
        <p class="text-xl text-slate-400 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          {$_('info.team.description')}
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
          {$_('info.cta.title')}
        </h2>
        <p class="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          {$_('info.cta.description')}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            {$_('info.cta.buttons.start')}
          </button>
          <button class="px-8 py-4 border-2 border-white/20 hover:border-white/40 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-white/10">
            {$_('info.cta.buttons.consult')}
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

