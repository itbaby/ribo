<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";

    let sliderContainer: HTMLElement;
    let currentActiveIndex = 0;
    let slides: Element[] = [];
    let shouldShowButtons = false;

    onMount(() => {
        if (sliderContainer) {
            slides = Array.from(sliderContainer.querySelectorAll('.slide'));
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
                height: "100%"
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
        
        currentActiveIndex = (currentActiveIndex - 1 + slides.length) % slides.length;
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
                animation = { x: diff > 0 ? "100%" : "-100%", scale: 0.6, opacity: 0.6, zIndex: 1 };
            }

            // 执行动画
            gsap.to(slide, {
                ...animation,
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => updateShadow(slide, diff)
            });
        });
    }

    function updateShadow(slide: Element, diff: number) {
        // 移除之前的阴影类
        slide.classList.remove('shadow-xl', 'shadow-lg', 'shadow-md');

        // 根据位置添加阴影类
        if (diff === 0) {
            slide.classList.add('shadow-xl');
        } else if (Math.abs(diff) === 1) {
            slide.classList.add('shadow-lg');
        } else {
            slide.classList.add('shadow-md');
        }
    }
</script>

<div class="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
    <main bind:this={sliderContainer} class="relative w-full h-[400px] sm:h-[380px] md:h-[360px]">

        <article class="slide absolute inset-0 flex flex-col justify-between p-6 md:p-8 bg-white rounded-2xl border border-stone-200">
            <div>
                <blockquote class="text-sm md:text-base text-stone-600 mb-4 md:mb-6 leading-relaxed">
                    "For years, we struggled with our old website. It was clunky, outdated, and
                    didn't showcase our beautiful custom homes the way they deserved. Our
                    portfolio was buried under layers of confusing menus, and the photos looked
                    pixelated on some devices – a major turnoff considering most people browse
                    the web on their phones these days."
                </blockquote>
            </div>
            <div class="flex items-center mt-6 pt-4 border-t border-stone-200">
                <img src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=D1D5DB&color=4B5563&size=40&font-size=0.4&bold=true" alt="Sarah Johnson" class="w-10 h-10 rounded-full mr-3 shrink-0">
                <div>
                    <p class="font-semibold text-stone-800 text-sm">Sarah Johnson</p>
                    <p class="text-xs text-stone-500">Marketing Manager</p>
                </div>
            </div>
        </article>

        <article class="slide absolute inset-0 flex flex-col justify-between p-6 md:p-8 bg-white rounded-2xl border border-stone-200">
            <div>
                <blockquote class="text-sm md:text-base text-stone-600 mb-4 md:mb-6 leading-relaxed">
                    "The platform's intuitive design and powerful features have revolutionized how we present our projects. Our conversion rates have skyrocketed, and client feedback has been overwhelmingly positive. Highly recommend!"
                </blockquote>
            </div>
            <div class="flex items-center mt-6 pt-4 border-t border-stone-200">
                <img src="https://ui-avatars.com/api/?name=Michael+Brown&background=D1D5DB&color=4B5563&size=40&font-size=0.4&bold=true" alt="Michael Brown" class="w-10 h-10 rounded-full mr-3 shrink-0">
                <div>
                    <p class="font-semibold text-stone-800 text-sm">Michael Brown</p>
                    <p class="text-xs text-stone-500">Lead Architect</p>
                </div>
            </div>
        </article>

        <article class="slide absolute inset-0 flex flex-col justify-between p-6 md:p-8 bg-white rounded-2xl border border-stone-200">
            <div>
                <blockquote class="text-sm md:text-base text-stone-600 mb-4 md:mb-6 leading-relaxed">
                    "As a small business, finding affordable yet professional tools is key. This app delivered on all fronts. Easy to use, fantastic support, and our new site looks incredible. A true asset for any builder."
                </blockquote>
            </div>
            <div class="flex items-center mt-6 pt-4 border-t border-stone-200">
                <img src="https://ui-avatars.com/api/?name=Linda+Davis&background=D1D5DB&color=4B5563&size=40&font-size=0.4&bold=true" alt="Linda Davis" class="w-10 h-10 rounded-full mr-3 shrink-0">
                <div>
                    <p class="font-semibold text-stone-800 text-sm">Linda Davis</p>
                    <p class="text-xs text-stone-500">Owner, Davis Homes</p>
                </div>
            </div>
        </article>

        <article class="slide absolute inset-0 flex flex-col justify-between p-6 md:p-8 bg-white rounded-2xl border border-stone-200">
            <div>
                <blockquote class="text-sm md:text-base text-stone-600 mb-4 md:mb-6 leading-relaxed">
                    "We needed a solution that could grow with us. The scalability and customization options are impressive. Our portfolio finally reflects the quality of our work, thanks to this fantastic tool."
                </blockquote>
            </div>
            <div class="flex items-center mt-6 pt-4 border-t border-stone-200">
                <img src="https://ui-avatars.com/api/?name=James+Wilson&background=D1D5DB&color=4B5563&size=40&font-size=0.4&bold=true" alt="James Wilson" class="w-10 h-10 rounded-full mr-3 shrink-0">
                <div>
                    <p class="font-semibold text-stone-800 text-sm">James Wilson</p>
                    <p class="text-xs text-stone-500">Operations Director</p>
                </div>
            </div>
        </article>
        <article class="slide absolute inset-0 flex flex-col justify-between p-6 md:p-8 bg-white rounded-2xl border border-stone-200">
            <div>
                <blockquote class="text-sm md:text-base text-stone-600 mb-4 md:mb-6 leading-relaxed">
                    "The mobile responsiveness is seamless, which is crucial in today's market. Our clients love how easy it is to browse our projects on any device. It's been a significant upgrade for our online presence."
                </blockquote>
            </div>
            <div class="flex items-center mt-6 pt-4 border-t border-stone-200">
                <img src="https://ui-avatars.com/api/?name=Emily+Clark&background=D1D5DB&color=4B5563&size=40&font-size=0.4&bold=true" alt="Emily Clark" class="w-10 h-10 rounded-full mr-3 shrink-0">
                <div>
                    <p class="font-semibold text-stone-800 text-sm">Emily Clark</p>
                    <p class="text-xs text-stone-500">Sales Executive</p>
                </div>
            </div>
        </article>

    </main>

    <button 
        title="Previous testimonial" 
        aria-label="Previous testimonial"
        class="absolute top-1/2 left-[-16px] sm:left-[-24px] md:left-[-30px] -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white focus:bg-white flex items-center justify-center text-stone-500 hover:text-stone-700 focus:text-stone-700 focus:outline-none"
        on:click={goToPrev}
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 sm:w-5 sm:h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
    </button>
    <button 
        title="Next testimonial" 
        aria-label="Next testimonial"
        class="absolute top-1/2 right-[-16px] sm:right-[-24px] md:right-[-30px] -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white focus:bg-white flex items-center justify-center text-stone-500 hover:text-stone-700 focus:text-stone-700 focus:outline-none"
        on:click={goToNext}
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 sm:w-5 sm:h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    </button>
</div>