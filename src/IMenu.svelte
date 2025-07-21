<script lang="ts">
  import {
    Navbar,
    NavBrand,
    NavHamburger,
    NavUl,
    NavLi,
    MegaMenu,
  } from "flowbite-svelte";
  import { ChevronDownOutline, ArrowRightOutline } from "flowbite-svelte-icons";
  import { blur, slide, scale } from "svelte/transition";
  import logo from "./assets/cherry-svgrepo-com.svg";
  import { _, locale } from "svelte-i18n";
  import { gsap } from "gsap";
  import { ScrollToPlugin } from "gsap/ScrollToPlugin";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

  let showDropdown = false;
  let toggle = false;
  let hidden = true;
  let isMenuOpen = writable(false);
  function handleUrlChange() {
    if (window.location.pathname === "/headhunting") {
      const section = document.getElementById("headhunting");

      if (section) {
        gsap.to(window, {
          scrollTo: {
            y: section,
            autoKill: false,
          },
          duration: 1,
          ease: "power2.inOut",
        });
      }
    }
  }

  onMount(() => {
    window.addEventListener("popstate", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  });
  function toggleDropdown() {
    showDropdown = !showDropdown;
  }
  function changeLanguage(lang: string, event: MouseEvent) {
    event.stopPropagation();
    locale.set(lang);
    showDropdown = false;
  }
  function scrollToSection(event: MouseEvent, sectionId: string) {
    event.preventDefault();
    // Update hash without reloading
    history.pushState({}, '', `#${sectionId}`);
    const section = document.getElementById(sectionId);
    if (section) {
      gsap.to(window, {
        scrollTo: {
          y: section,
          autoKill: false,
        },
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          // Close MegaMenu by updating store
          isMenuOpen.set(false);
        }
      });
    }
  }
  $: menu = [
    { name: $_("menu.headhunting"), href: "/headhunting" },
    { name: $_("menu.staffing"), href: "/staffing" },
    { name: $_("menu.itOutsourcing"), href: "/it-outsourcing" },
    { name: $_("menu.marketAnalysis"), href: "/market-analysis" },
    { name: $_("menu.companyCulture"), href: "/company-culture" },
    { name: $_("menu.history"), href: "/history" },
    { name: $_("menu.honors"), href: "/honors" },
    { name: $_("menu.contact"), href: "/contact" },
  ];
  // switchLanguage('en');
</script>

<Navbar class="bg-gray-900/70 dark:bg-gray-900/70">
  <NavBrand href="/" class="text-white hover:text-gray-200 ">
    <img src={logo} class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
    <span
      class="self-center whitespace-nowrap text-2xl font-semibold text-white dark:text-white"
      >RIBO</span
    >
  </NavBrand>

  <NavUl class="bg-transparent dark:bg-transparent">
    <NavLi href="/" class="text-lg bg-transparent text-white">{$_("menu.industry")}</NavLi
    >
    <NavLi class="text-lg  cursor-pointer text-white">
      {$_("menu.serve")}<ChevronDownOutline
        class="w-6 h-6 ms-2 text-white dark:text-white inline "
      />
    </NavLi>

    <MegaMenu full items={menu} bind:open={$isMenuOpen}>
      {#snippet children({ item })}
        <a
          href={item.href}
          class="hover:text-primary-600 dark:hover:text-primary-500 hover:underline"
          on:click|preventDefault={(e) =>
            item.href === "/headhunting"
              ? scrollToSection(e, "headhunting")
              : null}
        >
          {item.name}
        </a>
      {/snippet}
      {#snippet extra()}
        <h2 class="mt-4 mb-2 font-semibold text-gray-900 dark:text-white">
          Our brands
        </h2>
        <p class="mb-2 p-0 text-sm font-light text-gray-500 dark:text-gray-300">
          At Flowbite, we have a portfolio of brands that cater to a variety of
          preferences.
        </p>
        <a
          href="/"
          class="text-primary-600 hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-700 inline-flex items-center text-sm font-medium hover:underline"
        >
          Explore our brands
          <span class="sr-only">Explore our brands</span>
          <ArrowRightOutline
            class="text-primary-600 hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-700  ms-2 h-6 w-6"
          />
        </a>
      {/snippet}
    </MegaMenu>

    <NavLi href="/services" class="text-lg text-white ">{$_("menu.creative")}</NavLi>
    <NavLi href="/services" class="text-lg text-white">{$_("menu.aboutus")}</NavLi>
    <NavLi href="/services" class="text-lg text-white">{$_("menu.news")}</NavLi>
    <NavLi
      class="text-lg text-white cursor-pointer relative"
      on:click={toggleDropdown}
    >
      {$locale}
      <ChevronDownOutline class="w-6 h-6 ms-2  inline" />
      {#if showDropdown}
        <div
          class="absolute right-0 bg-white dark:bg-gray-800 shadow-lg rounded-md mt-1 z-50"
        >
          <a
            href="#"
            on:click|preventDefault={(e) => changeLanguage("zh", e)}
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >中文</a
          >
          <a
            href="#"
            on:click|preventDefault={(e) => changeLanguage("en", e)}
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >English</a
          >
          <a
            href="#"
            on:click|preventDefault={(e) => changeLanguage("jp", e)}
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >日本語</a
          >
        </div>
      {/if}
    </NavLi>
  </NavUl>
</Navbar>
