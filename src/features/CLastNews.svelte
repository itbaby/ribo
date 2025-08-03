<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let sliderContainer: HTMLElement;
  let currentActiveIndex = 0;
  let slides: Element[] = [];
  let shouldShowButtons = false;

  onMount(() => {
    if (sliderContainer) {
      slides = Array.from(sliderContainer.querySelectorAll(".slide"));
      shouldShowButtons = slides.length > 1;
      initializeSlides();
    }
  });

  function initializeSlides() {
    // 设置初始状态
    slides.forEach((slide: Element, index: number) => {
      gsap.set(slide, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      });

      let state;
      if (index === 0) {
        state = { x: 0, scale: 1, opacity: 1, zIndex: 10 };
      } else if (index === 1) {
        state = { x: "100%", scale: 0.8, opacity: 0.8, zIndex: 5 };
      } else {
        state = { x: "-100%", scale: 0.6, opacity: 0.6, zIndex: 1 };
      }

      gsap.set(slide, state);
    });
  }

  function goToPrev() {
    if (slides.length <= 1) return;

    currentActiveIndex =
      (currentActiveIndex - 1 + slides.length) % slides.length;
    animateSlides();
  }

  function goToNext() {
    if (slides.length <= 1) return;

    currentActiveIndex = (currentActiveIndex + 1) % slides.length;
    animateSlides();
  }

  function animateSlides() {
    slides.forEach((slide: Element, index: number) => {
      let diff = index - currentActiveIndex;

      // 处理循环
      if (diff > Math.floor(slides.length / 2)) {
        diff -= slides.length;
      } else if (diff < -Math.floor(slides.length / 2)) {
        diff += slides.length;
      }

      // 根据位置设置动画
      let animation;
      if (diff === 0) {
        // 当前激活的slide
        animation = { x: 0, scale: 1, opacity: 1, zIndex: 10 };
      } else if (diff === 1) {
        // 下一个slide
        animation = { x: "100%", scale: 0.8, opacity: 0.8, zIndex: 5 };
      } else if (diff === -1) {
        // 上一个slide
        animation = { x: "-100%", scale: 0.8, opacity: 0.8, zIndex: 5 };
      } else {
        // 其他slide
        animation = {
          x: diff > 0 ? "100%" : "-100%",
          scale: 0.6,
          opacity: 0.6,
          zIndex: 1,
        };
      }

      // 执行动画
      gsap.to(slide, {
        ...animation,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => updateShadow(slide, diff),
      });
    });
  }

  function updateShadow(slide: Element, diff: number) {
    // 移除之前的阴影类
    slide.classList.remove("shadow-xl", "shadow-lg", "shadow-md");

    // 根据位置添加阴影类
    if (diff === 0) {
      slide.classList.add("shadow-xl");
    } else if (Math.abs(diff) === 1) {
      slide.classList.add("shadow-lg");
    } else {
      slide.classList.add("shadow-md");
    }
  }
</script>

<div
  class="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
>
  <main
    bind:this={sliderContainer}
    class="relative w-full h-[55vh] sm:h-[65vh] md:h-[45vh]"
  >
    <article
      class="slide absolute inset-0 flex flex-col justify-between p-6 md:p-8 bg-gray-900 rounded-2xl border"
    >
      <div>
        <blockquote
          class="text-sm md:text-base text-white mb-4 md:mb-6 leading-relaxed"
        >
          "睿柏与日本百年材料企业 MYK
          株式会社正式签署战略协议，双方将在淮北共建零碳联合实验室，利用 MYK
          世界领先的低能耗聚合技术，把睿柏高纯电子级溶剂产品碳排放削减 40 %
          以上，并面向全球新能源汽车及半导体客户推出可循环包装树脂，首批订单已进入日产与特斯拉供应链，标志着中国绿色高端化工材料首次大规模反向输出日本核心市场。"
        </blockquote>
      </div>
      <div class="flex items-center mt-6 p-2 bg-gray-700 rounded-2xl">
        <img
          src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=D1D5DB&color=4B5563&size=40&font-size=0.4&bold=true"
          alt="Sarah Johnson"
          class="w-10 h-10 rounded-full mr-3 shrink-0"
        />
        <div>
          <p class="font-semibold text-white text-sm">睿柏与日本MYK达成合作</p>
          <p class="text-xs text-white">发布于: 2025-08-02 9:32</p>
        </div>
      </div>
    </article>

    <article
      class="slide absolute inset-0 flex flex-col justify-between p-6 md:p-8 bg-gray-900 rounded-2xl border bg-gray-400"
    >
      <div>
        <blockquote
          class="text-sm md:text-base text-white mb-4 md:mb-6 leading-relaxed"
        >
          "睿柏咨询与FIL人力外包服务达成战略合作：睿柏将依托13年人力资源及软件外包经验，为FIL提供涵盖招聘、派遣、薪酬、合规风控的一站式人力解决方案，助力FIL快速搭建弹性技术团队，降低用工成本30%以上，并同步导入数字化考勤与绩效系统，实现项目人力动态可视化管理，共同加速FIL全球业务扩张。"
        </blockquote>
      </div>
      <div class="flex items-center mt-6 p-2 bg-gray-700 rounded-2xl">
        <img
          src="https://ui-avatars.com/api/?name=Michael+Brown&background=D1D5DB&color=4B5563&size=40&font-size=0.4&bold=true"
          alt="Michael Brown"
          class="w-10 h-10 rounded-full mr-3 shrink-0"
        />
        <div>
          <p class="font-semibold text-white text-sm">睿柏与FIL人力外包服务</p>
          <p class="text-xs text-white">发布于: 2025-06-12 9:32</p>
        </div>
      </div>
    </article>

    <article
      class="slide absolute inset-0 flex flex-col justify-between p-6 md:p-8 bg-gray-900 rounded-2xl border bg-gray-400"
    >
      <div>
        <blockquote
          class="text-sm md:text-base text-white mb-4 md:mb-6 leading-relaxed"
        >
          "睿柏数据携手阿里云，于近日举办“云原生实时数仓”技术分享会。双方围绕PolarDB-X分布式架构、内存计算加速及AI增强分析展开深度交流，并现场演示秒级扩缩容、TB级即席查询等场景。睿柏RapidsDB与PolarDB完成生态对接，为企业提供一站式实时数据智能方案，共推云上创新。"
        </blockquote>
      </div>
      <div class="flex items-center mt-6 p-2 bg-gray-700 rounded-2xl">
        <img
          src="https://ui-avatars.com/api/?name=Linda+Davis&background=D1D5DB&color=4B5563&size=40&font-size=0.4&bold=true"
          alt="Linda Davis"
          class="w-10 h-10 rounded-full mr-3 shrink-0"
        />
        <div>
          <p class="font-semibold text-white text-sm">
            睿柏与Alibaba技术分享会
          </p>
          <p class="text-xs text-white">发布于: 2025-06-12 9:32</p>
        </div>
      </div>
    </article>

    <article
      class="slide absolute inset-0 flex flex-col justify-between p-6 md:p-8 bg-gray-900 rounded-2xl border bg-gray-400"
    >
      <div>
        <blockquote
          class="text-sm md:text-base text-white mb-4 md:mb-6 leading-relaxed"
        >
          "We needed a solution that could grow with us. The scalability and
          customization options are impressive. Our portfolio finally reflects
          the quality of our work, thanks to this fantastic tool."
        </blockquote>
      </div>
      <div class="flex items-center mt-6 p-2 bg-gray-700 rounded-2xl">
        <img
          src="https://ui-avatars.com/api/?name=James+Wilson&background=D1D5DB&color=4B5563&size=40&font-size=0.4&bold=true"
          alt="James Wilson"
          class="w-10 h-10 rounded-full mr-3 shrink-0"
        />
        <div>
          <p class="font-semibold text-white text-sm">James Wilson</p>
          <p class="text-xs text-white">Operations Director</p>
        </div>
      </div>
    </article>
    <article
      class="slide absolute inset-0 flex flex-col justify-between p-6 md:p-8 bg-gray-900 rounded-2xl border bg-gray-400"
    >
      <div>
        <blockquote
          class="text-sm md:text-base text-white mb-4 md:mb-6 leading-relaxed"
        >
          "The mobile responsiveness is seamless, which is crucial in today's
          market. Our clients love how easy it is to browse our projects on any
          device. It's been a significant upgrade for our online presence."
        </blockquote>
      </div>
      <div class="flex items-center mt-6 p-2 bg-gray-700 rounded-2xl">
        <img
          src="https://ui-avatars.com/api/?name=Emily+Clark&background=D1D5DB&color=4B5563&size=40&font-size=0.4&bold=true"
          alt="Emily Clark"
          class="w-10 h-10 rounded-full mr-3 shrink-0"
        />
        <div>
          <p class="font-semibold text-white text-sm">Emily Clark</p>
          <p class="text-xs text-white">Sales Executive</p>
        </div>
      </div>
    </article>
  </main>

  <button
    title="Previous testimonial"
    aria-label="Previous testimonial"
    class="absolute top-1/2 left-[-16px] sm:left-[-24px] md:left-[-30px] -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-900 backdrop-blur-sm shadow-md hover:bg-gray-700 focus:bg-gray-700 flex items-center justify-center text-white/80 hover:text-white/80 focus:text-white/80 focus:outline-none"
    on:click={goToPrev}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2.5"
      stroke="currentColor"
      class="w-4 h-4 sm:w-5 sm:h-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  </button>
  <button
    title="Next testimonial"
    aria-label="Next testimonial"
    class="absolute top-1/2 right-[-16px] sm:right-[-24px] md:right-[-30px] -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-900 backdrop-blur-sm shadow-md hover:bg-gray-700 focus:bg-gray-700 flex items-center justify-center text-white/80 hover:text-white/80 focus:text-white/80 focus:outline-none"
    on:click={goToNext}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2.5"
      stroke="currentColor"
      class="w-4 h-4 sm:w-5 sm:h-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  </button>
</div>
