<script lang="ts">
    import { onMount } from 'svelte';
    let currentImageIndex = 0;
    const images = [
        '/src/assets/ideas_1.webp',
        '/src/assets/idea-2.jpg', 
        '/src/assets/idea-3.jfif'
    ];
    
    let scrollInstance: any;

    onMount(async () => {
        const LocomotiveScroll = (await import("locomotive-scroll")).default as any;
        scrollInstance = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            lerp: 0.1
        });

        scrollInstance.on('scroll', (args: any) => {
            if(args.scroll.y > args.scroll.lastY) {
                currentImageIndex = (currentImageIndex + 1) % images.length;
            } else if(args.scroll.y < args.scroll.lastY) {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            }
        });
    });
</script>

<div data-scroll-container>
    <div data-scroll-section>
        <img 
            src={images[currentImageIndex]} 
            alt="Creative design concepts" 
            style="width: 100%; height: 100vh; object-fit: cover;"
        />
    </div>
</div>

<style>
    [data-scroll-container] {
        height: 100vh;
        overflow: hidden;
    }
</style>
