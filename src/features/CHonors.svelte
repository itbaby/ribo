<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  let awards = [
    {
      date: "2023",
      title: "大连市稳岗企业",
      description:
        "表彰公司在稳定就业和促进经济发展方面的贡献。",
      icon: "/src/assets/award_01.png",
    },
    {
      date: "2022",
      title: "联想新锐合作伙伴",
      description:
        "被联想集团评为年度新锐合作伙伴，表彰在技术创新和业务合作方面的突出表现。",
      icon: "/src/assets/award_02.png",
    },
    {
      date: "2022",
      title: "联想优秀合作团队",
      description:
        "被联想集团评为优秀合作团队，表彰在项目协作和团队协同方面的卓越表现。",
      icon: "/src/assets/award_03.png",
    },
    {
      date: "2021",
      title: "字节跳动优秀合作伙伴",
      description:
        "被字节跳动评为年度优秀合作伙伴，表彰在技术服务和业务支持方面的杰出贡献。",
      icon: "/src/assets/award_04.png",
    },
    {
      date: "2020",
      title: "字节跳动优秀合作伙伴",
      description:
        "被字节跳动评为年度优秀合作伙伴，表彰在技术创新和服务质量方面的持续表现。",
      icon: "/src/assets/award_01.png",
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
              class="bg-gray-800 rounded-lg w-32 h-32 flex items-center justify-center shadow-lg"
            >
            <img src={award.icon} alt={award.title} class="w-48 h-48 object-contain mb-4 transition-transform duration-300 hover:scale-200">
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