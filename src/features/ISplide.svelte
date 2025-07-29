<script lang="ts">
    import "@splidejs/splide/css";
    import Splide from "@splidejs/splide";
    import secondary from "../assets/secondary.jpg";
    import earch from "../assets/earth.png";
    import topbg from "../assets/top.jpg";
    import output from "../assets/output.jpg";
    import service from "../assets/service.jpg";
    import { onMount } from "svelte";
    onMount(() => {
        new Splide(".splide", { paginationDirection: "ttb" }).mount();
    });
</script>

<section class="splide" aria-labelledby="carousel-heading">
   

    <div class="splide__track">
        <ul class="splide__list">
            <li class="splide__slide">
                <img src={secondary} alt="Slide 01" />
            </li>
            <li class="splide__slide">
                <img src={earch} alt="Slide 02" />
            </li>
            <li class="splide__slide">
                <img src={topbg} alt="Slide 03" />
            </li>
        </ul>
    </div>
</section>
