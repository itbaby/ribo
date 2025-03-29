<script lang="ts">
  import "./app.css";
  import { switchLanguage } from "./i18n";
  import { isLoading, _ } from "svelte-i18n";
  import IMenu from './IMenu.svelte';
  import IFooter from "./IFooter.svelte";
  import ICarousel from "./ICarousel.svelte";
</script>

{#if $isLoading}{:else}
  <div class="flex flex-col">
    <IMenu/>
    <IFooter/>
  </div>
{/if}

<style>
</style>
