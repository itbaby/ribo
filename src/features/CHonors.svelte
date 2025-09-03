<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  let awards = [
    {
      date: "2023",
      title: "Excellence in Innovation Award",
      description:
        "Awarded for pioneering new technologies in the software industry.",
      icon: "https://picsum.photos/seed/award1/200",
    },
    {
      date: "2022",
      title: "Best UI/UX Design",
      description:
        "Recognized for creating an outstanding user experience in our flagship application.",
      icon: "https://picsum.photos/seed/award2/200",
    },
    {
      date: "2021",
      title: "Top Workplace for Diversity",
      description:
        "Honored for fostering an inclusive and diverse work environment.",
      icon: "https://picsum.photos/seed/award3/200",
    },
    {
      date: "2020",
      title: "Community Choice Award",
      description:
        "Voted by the community as the most impactful software solution of the year.",
      icon: "https://picsum.photos/seed/award4/200",
    },
  ];

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".header", {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power3.out",
    });
  });
</script>

<div class="bg-gray-900 text-white min-h-screen p-8">
  <div class="max-w-4xl mx-auto">
    <header class="text-center mb-16 header">
      <h1 class="text-5xl font-bold mb-4">Our Accolades</h1>
      <p class="text-lg text-gray-400">
        A testament to our commitment to excellence and innovation.
      </p>
    </header>

    <div class="timeline relative">
      {#each awards as award, i}
        <div
          class="timeline-item mb-16 flex items-center"
          class:flex-row-reverse={i % 2 === 0}
          data-aos={i % 2 === 0 ? 'fade-left' : 'fade-right'}
        >
          <div class="w-1/2 px-8">
            <div
              class="bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform duration-500 hover:scale-105"
            >
              <h2 class="text-2xl font-bold mb-2">{award.title}</h2>
              <p class="text-gray-400 mb-4">{award.description}</p>
              <span class="text-sm text-indigo-400">{award.date}</span>
            </div>
          </div>
          <div class="w-1/2 flex justify-center">
            <div
              class="bg-gray-800 rounded-full w-32 h-32 flex items-center justify-center shadow-lg"
            >
              <img
                src={award.icon}
                alt={award.title}
                class="w-20 h-20 object-contain"
              />
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .timeline::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
    background-color: #4a5568;
  }
</style>