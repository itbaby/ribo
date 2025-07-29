<script lang="ts">
    import {onMount, tick} from "svelte";

    let sliderContainer;
    let currentActiveIndex = 0;
    let slides = [];
    let shouldShowButtons = false; // 初始化按钮显示状态

    onMount(async () => {
        if (sliderContainer) {
            slides = Array.from(sliderContainer.querySelectorAll('.slide'));
            // 强制更新按钮显示状态
            shouldShowButtons = slides.length > 1;
            console.log('Slides count:', slides.length);
            console.log('Should show buttons:', shouldShowButtons);
            await tick(); // 等待DOM更新
            updateSlideStates();
        }
    });

    function updateSlideStates() {
        console.log('updateSlideStates called');
        const numSlides = slides.length;
        console.log('Number of slides:', numSlides);
        console.log('Current active index:', currentActiveIndex);
        if (numSlides === 0) return;

        for (let i = 0; i < numSlides; i++) {
            const slide = slides[i];
            let status = 'hidden';
            console.log(`Processing slide ${i}`);

            let diff = i - currentActiveIndex;
            console.log(`Difference for slide ${i}: ${diff}`);
            if (diff > numSlides / 2) {
                diff -= numSlides;
            } else if (diff < -numSlides / 2) {
                diff += numSlides;
            }
            console.log(`Adjusted difference for slide ${i}: ${diff}`);

            if (diff === 0) {
                status = 'active';
            } else if (numSlides > 1 && diff === 1) {
                status = 'next';
            } else if (numSlides > 2 && diff === -1) {
                status = 'prev';
            } else if (numSlides > 3 && diff === 2) {
                status = 'background-next';
            } else if (numSlides > 4 && diff === -2) {
                status = 'background-prev';
            }

            if (numSlides === 2 && diff === -1) {
                status = 'next';
            }
            if (numSlides === 4 && diff === -2) {
                status = 'background-next';
            }

            slide.dataset.status = status;

            // 移除之前的样式类
            slide.classList.remove('shadow-xl', 'shadow-lg', 'shadow-md');
            
            // 添加统一的过渡效果
            slide.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.5s ease, visibility 0.5s ease';
            
            // 移除之前的样式属性
            slide.style.opacity = '';
            slide.style.zIndex = '';
            slide.style.visibility = '';

            // 根据状态应用样式
            if (status === 'active') {
                slide.classList.add('shadow-xl');
                slide.style.transform = 'translateX(0) scale(1)';
                slide.style.opacity = '1';
                slide.style.zIndex = '10';
                slide.style.visibility = 'visible';
            } else if (status === 'next') {
                slide.classList.add('shadow-lg');
                slide.style.transform = 'translateX(100%) scale(0.8)';
                slide.style.opacity = '0.8';
                slide.style.zIndex = '5';
                slide.style.visibility = 'visible';
            } else if (status === 'prev') {
                slide.classList.add('shadow-lg');
                slide.style.transform = 'translateX(-100%) scale(0.8)';
                slide.style.opacity = '0.8';
                slide.style.zIndex = '5';
                slide.style.visibility = 'visible';
            } else if (status === 'background-next') {
                slide.classList.add('shadow-md');
                slide.style.transform = 'translateX(50%) scale(0.6)';
                slide.style.opacity = '0.6';
                slide.style.zIndex = '1';
                slide.style.visibility = 'visible';
            } else if (status === 'background-prev') {
                slide.classList.add('shadow-md');
                slide.style.transform = 'translateX(-50%) scale(0.6)';
                slide.style.opacity = '0.6';
                slide.style.zIndex = '1';
                slide.style.visibility = 'visible';
            } else {
                // hidden状态
                slide.style.opacity = '0';
                slide.style.zIndex = '0';
                slide.style.visibility = 'hidden';
            }
        }
    }

    function goToPrev() {
        console.log('goToPrev called');
        const numSlides = slides.length;
        console.log('Number of slides:', numSlides);
        if (numSlides <= 1) return;
        
        console.log('Current active index before:', currentActiveIndex);
        currentActiveIndex = (currentActiveIndex - 1 + numSlides) % numSlides;
        console.log('Current active index after:', currentActiveIndex);
        updateSlideStates();
    }

    function goToNext() {
        console.log('goToNext called');
        const numSlides = slides.length;
        console.log('Number of slides:', numSlides);
        if (numSlides <= 1) return;
        
        console.log('Current active index before:', currentActiveIndex);
        currentActiveIndex = (currentActiveIndex + 1) % numSlides;
        console.log('Current active index after:', currentActiveIndex);
        updateSlideStates();
    }
</script>

<div class="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
    <main bind:this={sliderContainer} class="relative w-full h-[400px] sm:h-[380px] md:h-[360px] [perspective:1200px]">

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
        class="absolute top-1/2 left-[-16px] sm:left-[-24px] md:left-[-30px] transform -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white focus:bg-white flex items-center justify-center text-stone-500 hover:text-stone-700 focus:text-stone-700 focus:outline-none transition-all duration-200"
        on:click={goToPrev}
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 sm:w-5 sm:h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
    </button>
    <button 
        title="Next testimonial" 
        class="absolute top-1/2 right-[-16px] sm:right-[-24px] md:right-[-30px] transform -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white focus:bg-white flex items-center justify-center text-stone-500 hover:text-stone-700 focus:text-stone-700 focus:outline-none transition-all duration-200"
        on:click={goToNext}
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 sm:w-5 sm:h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    </button>
</div>