<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import AOS from "aos";
    import "aos/dist/aos.css";
    import { _ } from "svelte-i18n";

    let currentIndustryIndex = 0;
    let intervalId: number | undefined;

    $: industryCategories = [
        {
            name: $_("industry.automotive.name"),
            icon: "ri-car-fill",
            bg: "/src/assets/automotive-new.jpg",
            title: $_("industry.automotive.title"),
            description: $_("industry.automotive.description"),
        },
        {
            name: $_("industry.internet.name"),
            icon: "ri-global-fill",
            bg: "/src/assets/internet.jpg",
            title: $_("industry.internet.title"),
            description: $_("industry.internet.description"),
        },
        {
            name: $_("industry.finance.name"),
            icon: "ri-bank-fill",
            bg: "/src/assets/finance.jpg",
            title: $_("industry.finance.title"),
            description: $_("industry.finance.description"),
        },
        {
            name: $_("industry.communication.name"),
            icon: "ri-wireless-charging-fill",
            bg: "/src/assets/communication.jpg",
            title: $_("industry.communication.title"),
            description: $_("industry.communication.description"),
        },
        {
            name: $_("industry.ecommerce.name"),
            icon: "ri-shopping-cart-fill",
            bg: "/src/assets/ecommerce-new.jpg",
            title: $_("industry.ecommerce.title"),
            description: $_("industry.ecommerce.description"),
        },
        {
            name: $_("industry.newenergy.name"),
            icon: "ri-flashlight-fill",
            bg: "/src/assets/newenergy-pro.jpg",
            title: $_("industry.newenergy.title"),
            description: $_("industry.newenergy.description"),
        },
        {
            name: $_("industry.semiconductor.name"),
            icon: "ri-cpu-fill",
            bg: "/src/assets/semiconductor-pro.jpg",
            title: $_("industry.semiconductor.title"),
            description: $_("industry.semiconductor.description"),
        },
    ];

    function changeIndustry(index: number) {
        if (index === currentIndustryIndex) return;

        // 先淡出文本内容
        gsap.to([".main-title", ".main-description"], {
            opacity: 0,
            y: 20,
            duration: 0.3,
            onComplete: () => {
                currentIndustryIndex = index;

                // 淡入新背景图片
                gsap.fromTo(
                    ".bg-image",
                    { opacity: 0 },
                    { opacity: 1, duration: 0.8 },
                );

                // 淡入新文本内容
                gsap.fromTo(
                    [".main-title", ".main-description"],
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, duration: 0.5, delay: 0.2 },
                );
            },
        });
    }

    function selectIndustry(index: number) {
        changeIndustry(index);
        resetAutoPlay();
    }

    function startAutoPlay() {
        intervalId = setInterval(() => {
            const nextIndex =
                (currentIndustryIndex + 1) % industryCategories.length;
            changeIndustry(nextIndex);
        }, 5000);
    }

    function resetAutoPlay() {
        clearInterval(intervalId);
        startAutoPlay();
    }

    onMount(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });

        gsap.fromTo(
            ".main-title",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, delay: 0.5 },
        );
        gsap.fromTo(
            ".main-description",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, delay: 0.8 },
        );

        gsap.fromTo(
            ".industry-cards",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, delay: 1.4 },
        );

        startAutoPlay();

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    });
</script>

<div class="relative h-[90vh] overflow-hidden">
    <!-- Background Image -->
    <div
        class="bg-image absolute inset-0 bg-cover bg-center"
        style="background-image: url('{industryCategories[currentIndustryIndex]
            .bg}');"
    ></div>

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black opacity-50"></div>

    <!-- Main Content -->
    <div
        class="relative z-10 flex flex-col items-center justify-center h-[80vh] md:h-[90vh] text-white px-4 md:px-8 lg:px-16 pb-24 md:pb-0"
    >
        <div class="max-w-4xl text-center">
            <h1
                class="main-title text-3xl md:text-5xl font-bold mb-4"
                data-aos="fade-up"
            >
                {industryCategories[currentIndustryIndex].title}
            </h1>
            <p
                class="main-description text-base md:text-lg mb-8"
                data-aos="fade-up"
                data-aos-delay="200"
            >
                {industryCategories[currentIndustryIndex].description}
            </p>
        </div>
    </div>

    <!-- Bottom Industry Categories -->
    <div class="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-8">
        <div
            class="industry-cards grid grid-cols-2 md:grid-cols-7 gap-2 md:gap-4 mt-4 md:mt-8 w-full max-w-6xl mx-auto px-2 md:px-4"
        >
            {#each industryCategories as category, i}
                <div
                    class="flex flex-col items-center justify-center p-2 md:p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out h-20 md:h-32 shadow-lg hover:shadow-xl transform hover:-translate-y-1 backdrop-blur-md border text-white {currentIndustryIndex ===
                    i
                        ? 'bg-gray-900/50 border-gray-300'
                        : 'bg-black/20 border-white/10'}"
                    on:click={() => selectIndustry(i)}
                    on:keydown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                            selectIndustry(i);
                    }}
                    role="button"
                    tabindex="0"
                >
                    <i class="{category.icon} text-3xl md:text-5xl mb-1 md:mb-2"></i>
                    <span class="text-xs md:text-sm text-center font-semibold"
                        >{category.name}</span
                    >
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    /* Add any specific styles here if needed, though Tailwind should handle most. */
</style>
