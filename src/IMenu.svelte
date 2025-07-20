<script>
  import {
    Navbar,
    NavBrand,
    NavHamburger,
    NavUl,
    NavLi,
    MegaMenu,
  } from "flowbite-svelte";
  import { ChevronDownOutline, ArrowRightOutline } from "flowbite-svelte-icons";
  import logo from "./assets/cherry-svgrepo-com.svg";
  import { _, locale } from "svelte-i18n";
  let showDropdown = false;
  function toggleDropdown() {
    showDropdown = !showDropdown;
  }
  function changeLanguage(lang, event) {
    event.stopPropagation();
    locale.set(lang);
    showDropdown = false;
  }
  let menu = [
    { name: $_("menu.headhunting"), href: "/headhunting" },
    { name: $_("menu.staffing"), href: "/staffing" },
    { name: $_("menu.itOutsourcing"), href: "/it-outsourcing" },
    { name: $_("menu.marketAnalysis"), href: "/market-analysis" },
    { name: $_("menu.companyCulture"), href: "/company-culture" },
    { name: $_("menu.history"), href: "/history" },
    { name: $_("menu.honors"), href: "/honors" },
    { name: $_("menu.contact"), href: "/contact" }
  ];
  // switchLanguage('en');
</script>

<Navbar let:hidden let:toggle class="!bg-transparent dark:!bg-transparent">
  <NavBrand
    href="/"
    class="text-gray-300 hover:text-gray-200 !bg-transparent dark:!bg-transparent"
  >
    <img src={logo} class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
    <span
      class="self-center whitespace-nowrap text-xl font-semibold dark:text-gray-300"
      >RIBO</span
    >
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/" class="text-gray-300 hover:text-gray-200"
      >{$_("menu.industry")}</NavLi
    >
    <NavLi class="text-gray-300 cursor-pointer ">
      {$_("menu.serve")}<ChevronDownOutline
        class="w-6 h-6 ms-2 text-primary-800 dark:text-gray-300 inline "
      />
    </NavLi>

    <MegaMenu full items={menu} let:item>
      <a
        href={item.href}
        class="hover:underline hover:text-primary-600 dark:hover:text-primary-500"
      >
        {item.name}
      </a>
      <div slot="extra" class="">
        <h2 class="mt-4 mb-2 font-semibold text-gray-900 dark:text-gray-300">
          Our brands
        </h2>
        <p class="mb-2 p-0 text-sm font-light text-gray-500 dark:text-gray-300">
          At Flowbite, we have a portfolio of brands that cater to a variety of
          preferences.
        </p>
        <a
          href="/"
          class="inline-flex items-center text-sm font-medium text-primary-600 hover:underline hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-700"
        >
          Explore our brands
          <span class="sr-only">Explore our brands</span>
          <ArrowRightOutline
            class="w-6 h-6 ms-2 text-primary-600  hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-700"
          />
        </a>
      </div>
    </MegaMenu>
    <NavLi href="/services" class="text-gray-300 hover:text-gray-200"
      >{$_("menu.creative")}</NavLi
    >
    <NavLi href="/services" class="text-gray-300 hover:text-gray-200"
      >{$_("menu.aboutus")}</NavLi
    >
    <NavLi href="/services" class="text-gray-300 hover:text-gray-200"
      >{$_("menu.news")}</NavLi
    >
    <NavLi class="text-gray-300 cursor-pointer relative" on:click={toggleDropdown}>
      {$locale}
      <ChevronDownOutline
        class="w-6 h-6 ms-2 text-primary-800 dark:text-gray-300 inline"
      />
      {#if showDropdown}
        <div class="absolute right-0 bg-white dark:bg-gray-800 shadow-lg rounded-md mt-1 z-50">
          <a href="#" on:click|preventDefault={(e) => changeLanguage('zh', e)} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">中文</a>
          <a href="#" on:click|preventDefault={(e) => changeLanguage('en', e)} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">English</a>
          <a href="#" on:click|preventDefault={(e) => changeLanguage('jp', e)} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">日本語</a>
        </div>
      {/if}
    </NavLi>
  </NavUl>
</Navbar>
