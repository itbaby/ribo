<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
   import { _, locale } from "svelte-i18n";
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
  class="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto "
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
          {$_("lastNews.news1.content")}
        </blockquote>
      </div>
      <div class="flex items-center mt-6 p-2 bg-gray-700 rounded-2xl">
        <img
          src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=D1D5DB&color=4B5563&size=40&font-size=0.4&bold=true"
          alt="Sarah Johnson"
          class="w-10 h-10 rounded-full mr-3 shrink-0"
        />
        <div>
          <p class="font-semibold text-white text-sm">{$_("lastNews.news1.title")}</p>
          <p class="text-xs text-white">{$_("lastNews.news1.position")}</p>
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
          {$_("lastNews.news2.content")}
        </blockquote>
      </div>
      <div class="flex items-center mt-6 p-2 bg-gray-700 rounded-2xl">
        <img
          src="https://ui-avatars.com/api/?name=Michael+Brown&background=D1D5DB&color=4B5563&size=40&font-size=0.4&bold=true"
          alt="Michael Brown"
          class="w-10 h-10 rounded-full mr-3 shrink-0"
        />
        <div>
          <p class="font-semibold text-white text-sm">{$_("lastNews.news2.title")}</p>
          <p class="text-xs text-white">{$_("lastNews.news2.position")}</p>
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
          {$_("lastNews.news3.content")}
        </blockquote>
      </div>
      <div class="flex items-center mt-6 p-2 bg-gray-700 rounded-2xl">
        <img
          src="https://ui-avatars.com/api/?name=Linda+Davis&background=D1D5DB&color=4B5563&size=40&font-size=0.4&bold=true"
          alt="Linda Davis"
          class="w-10 h-10 rounded-full mr-3 shrink-0"
        />
        <div>
          <p class="font-semibold text-white text-sm">{$_("lastNews.news3.title")}</p>
          <p class="text-xs text-white">{$_("lastNews.news3.position")}</p>
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
          {$_("lastNews.news4.content")}
        </blockquote>
      </div>
      <div class="flex items-center mt-6 p-2 bg-gray-700 rounded-2xl">
        <img
          src="https://ui-avatars.com/api/?name=James+Wilson&background=D1D5DB&color=4B5563&size=40&font-size=0.4&bold=true"
          alt="James Wilson"
          class="w-10 h-10 rounded-full mr-3 shrink-0"
        />
        <div>
          <p class="font-semibold text-white text-sm">{$_("lastNews.news4.title")}</p>
          <p class="text-xs text-white">{$_("lastNews.news4.position")}</p>
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
          {$_("lastNews.news5.content")}
        </blockquote>
      </div>
      <div class="flex items-center mt-6 p-2 bg-gray-700 rounded-2xl">
        <img
          src="https://ui-avatars.com/api/?name=Emily+Clark&background=D1D5DB&color=4B5563&size=40&font-size=0.4&bold=true"
          alt="Emily Clark"
          class="w-10 h-10 rounded-full mr-3 shrink-0"
        />
        <div>
          <p class="font-semibold text-white text-sm">{$_("lastNews.news5.title")}</p>
          <p class="text-xs text-white">{$_("lastNews.news5.position")}</p>
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
