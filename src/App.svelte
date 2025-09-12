<script lang="ts">
  import { onMount } from "svelte";
  import CMenu from "./features/CMenu.svelte";
  import CDefault from "./features/CDefault.svelte";
  import CIndustry from "./features/CIndustry.svelte";
  import CFooter from "./features/CFooter.svelte";
  import CServe from "./features/CServe.svelte";
  import CAboutUs from "./features/CAboutUs.svelte";
  import CContact from "./features/CContact.svelte";
  import CInnovation from "./features/CInnovation.svelte";
  import CHiring from "./features/CHiring.svelte";
  import CIntro from "./features/CIntro.svelte";
  import CResources from "./features/CResources.svelte";
  import COutSourcing from "./features/COutSourcing.svelte";
  import CTechCategory from "./features/CTechCategory.svelte";
  import CCulture from "./features/CCulture.svelte";
  import CHonors from "./features/CHonors.svelte";
  import CInfo from "./features/CInfo.svelte";

  let currentRoute = $state("/");

  const routes = {
    "/": { component: CDefault, bgClass: "" },
    "/hiring": { component: CHiring, bgClass: "", footer: { bgClass: "bg-gray-800" } },
    "/industry": { component: CIndustry, bgClass: "", footer: { bgClass: "bg-gray-800"} },
    "/innovation": { component: CInnovation, bgClass: "", footer: {bgClass: "bg-gray-800"} },
    "/serve": { component: CServe, bgClass: "", footer: {bgClass: "bg-gray-800"} },
    "/aboutus": { component: CAboutUs, bgClass: "", footer: {bgClass: "bg-gray-800"} },
    "/contact": { component: CContact, bgClass: "", footer: {bgClass: "bg-gray-800"} },
    "/intro": { component: CIntro, bgClass: "", footer: {bgClass: "bg-gray-800"} },
    "/resources": { component: CResources, bgClass: "", footer: {bgClass: "bg-gray-800"} },
    "/honors": { component: CHonors, bgClass: "", footer: {bgClass: "bg-gray-800"} },
    "/outsourcing": { component: COutSourcing, bgClass: "bg-gray-900", footer: { bgClass: "bg-gray-800" } },
    "/tech-category": { component: CTechCategory, bgClass: "bg-gray-800", footer: {} },
    "/culture": { component: CCulture, bgClass: "bg-gray-900", footer: {} },
    "/info": { component: CInfo, bgClass: "bg-gray-50", footer: {} }
  };

  function handleHashChange() {
    const hash = window.location.hash.slice(1) || "/";
    currentRoute = hash;
  }

  onMount(() => {
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  });

  const route = $derived(routes[currentRoute as keyof typeof routes] || routes["/"]);
</script>

<CMenu />
<div class="pt-16 {route.bgClass}">
  <route.component />
</div>
{#if currentRoute !== "/"}
  <CFooter bgClass={(route as any).footer?.bgClass || ""} />
{/if}
