<script>
    import { Gallery } from "flowbite-svelte";
    import { images } from "./images";
</script>
<section
        data-section
        data-scroll-section
        class="flex justify-center "
>
<Gallery items={images} class="grid-cols-4 gap-2 md:grid-cols-4 pt-20 pb-20" />
</section>