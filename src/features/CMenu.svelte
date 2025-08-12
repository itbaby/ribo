<script lang="ts">
  import { onMount } from "svelte";
  import { _, locale } from "svelte-i18n";
  let isLanguageDropdownOpen = false;
  let isMobileMenuOpen = false;
  let isServeDropdownOpen = false;
  let isCreativeDropdownOpen = false;
  let isAboutusDropdownOpen = false;
  let selectedLanguage = "中文 (CN)";
  let selectedFlag = "fi-cn";
  let languages = {
    "fi-us": "en",
    "fi-jp": "jp",
    "fi-cn": "zh",
  };
  function toggleLanguageDropdown() {
    isLanguageDropdownOpen = !isLanguageDropdownOpen;
  }

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function toggleServeDropdown() {
    isServeDropdownOpen = !isServeDropdownOpen;
    if (isServeDropdownOpen) {
      isCreativeDropdownOpen = false;
      isAboutusDropdownOpen = false;
    }
  }

  function toggleCreativeDropdown() {
    isCreativeDropdownOpen = !isCreativeDropdownOpen;
    if (isCreativeDropdownOpen) {
      isServeDropdownOpen = false;
      isAboutusDropdownOpen = false;
    }
  }

  function toggleAboutusDropdown() {
    isAboutusDropdownOpen = !isAboutusDropdownOpen;
    if (isAboutusDropdownOpen) {
      isServeDropdownOpen = false;
      isCreativeDropdownOpen = false;
    }
  }

  function closeAllDropdowns() {
    isServeDropdownOpen = false;
    isCreativeDropdownOpen = false;
    isAboutusDropdownOpen = false;
  }

  function closeLanguageDropdown() {
    isLanguageDropdownOpen = false;
  }

  function loadSavedLanguage() {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    const savedFlag = localStorage.getItem("selectedFlag");

    if (savedLanguage && savedFlag) {
      selectedLanguage = savedLanguage;
      selectedFlag = savedFlag;
      locale.set(languages[savedFlag as keyof typeof languages]);
    }
  }

  function selectLanguage(language: string, flag: string) {
    selectedLanguage = language;
    selectedFlag = flag;
    locale.set(languages[flag as keyof typeof languages]);
    localStorage.setItem("selectedLanguage", language);
    localStorage.setItem("selectedFlag", flag);
    closeLanguageDropdown();
  }

  onMount(() => {
    loadSavedLanguage();
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<nav
  class="bg-gray-900 w-[100vw] text-white border-none dark:bg-gray-900 fixed top-0 left-0 right-0 z-999"
  on:click|self={closeAllDropdowns}
>
  <div
    class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
  >
    <a
      href="https://flowbite.com/"
      class="flex items-center space-x-3 rtl:space-x-reverse"
    >
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        class="h-8"
        alt="Flowbite Logo"
      />
      <span
        class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
        >Flowbite</span
      >
    </a>

    <div
      class="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse"
    >
      <!-- Language Dropdown Button -->
      <div class="relative">
        <button
          type="button"
          on:click={toggleLanguageDropdown}
          class="inline-flex items-center font-medium justify-center px-4 py-2 text-sm bg-gray-900 text-white cursor-pointer"
          aria-expanded={isLanguageDropdownOpen}
          aria-haspopup="true"
        >
          <span class="fi {selectedFlag} fis me-3"></span>
          {selectedLanguage}
        </button>

        <!-- Language Dropdown Menu -->
        {#if isLanguageDropdownOpen}
          <div
            class="absolute right-0 z-50 my-4 text-base text-white list-none bg-gray-900 divide-y divide-gray-100 shadow-sm min-w-[120px]"
            id="language-dropdown-menu"
            role="menu"
          >
            <ul class="py-2 font-medium">
              <li>
                <!-- svelte-ignore a11y_invalid_attribute -->
                <a
                  href="#"
                  class="block px-4 py-2 text-sm bg-gray-900 text-white hover:bg-gray-800 whitespace-nowrap"
                  role="menuitem"
                  on:click={() => selectLanguage("English", "fi-us")}
                >
                  <div class="inline-flex items-center">
                    <span class="fi fi-us fis me-2"></span>
                    English
                  </div>
                </a>
              </li>

              <li>
                <!-- svelte-ignore a11y_invalid_attribute -->
                <a
                  href="#"
                  class="block px-4 py-2 text-sm bg-gray-900 text-white hover:bg-gray-800 whitespace-nowrap"
                  role="menuitem"
                  on:click={() => selectLanguage("にほんご", "fi-jp")}
                >
                  <div class="inline-flex items-center">
                    <span class="fi fi-jp fis me-2"></span>
                    にほんご
                  </div>
                </a>
              </li>
              <li>
                <!-- svelte-ignore a11y_invalid_attribute -->
                <a
                  href="#"
                  class="block px-4 py-2 text-sm bg-gray-900 text-white hover:bg-gray-800 whitespace-nowrap"
                  role="menuitem"
                  on:click={() => selectLanguage("中文 (CN)", "fi-cn")}
                >
                  <div class="inline-flex items-center">
                    <span class="fi fi-cn fis me-2"></span>
                    中文 (CN)
                  </div>
                </a>
              </li>
            </ul>
          </div>
        {/if}
      </div>

      <!-- Mobile Menu Button -->
      <button
        type="button"
        on:click={toggleMobileMenu}
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-language"
        aria-expanded={isMobileMenuOpen}
      >
        <span class="sr-only">Open main menu</span>
        {#if isMobileMenuOpen}
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        {:else}
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        {/if}
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      class="items-center justify-between w-full md:flex md:w-auto md:order-1 mobile-menu-container {isMobileMenuOpen
        ? 'block open'
        : 'hidden'}"
      id="navbar-language"
    >
      <ul
        class="flex flex-col font-medium p-4 md:p-0 mt-4 border-0 bg-gray-900 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0"
      >
        <li>
          <a
            href="/industry"
            class="block py-2 px-5 text-white bg-gray-900"
            aria-current="page">{$_("menu.industry")}</a
          >
        </li>
        <li class="relative">
          <button
            on:click={toggleServeDropdown}
            class="flex items-center justify-between w-full py-2 px-5 text-white bg-gray-900 hover:bg-gray-800"
            aria-expanded={isServeDropdownOpen}
          >
            {$_("menu.serve")}
            <svg
              class="w-2.5 h-2.5 ms-3 transition-transform duration-200 {isServeDropdownOpen ? 'rotate-180' : ''}"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="serve-dropdown"
            class="md:absolute md:z-10 w-full bg-gray-800 md:w-auto {isServeDropdownOpen
              ? 'block'
              : 'hidden'}"
          >
            <ul class="py-2 text-sm md:py-2 whitespace-nowrap">
              <li>
                <a href="/hiring" class="block px-8 py-2 hover:bg-gray-800 md:px-4"
                  >{$_("menu.headhunting")}</a
                >
              </li>
              <li>
                <a href="/resources" class="block px-8 py-2 hover:bg-gray-800 md:px-4"
                  >{$_("menu.staffing")}</a
                >
              </li>
              <li>
                <a href="/outsourcing" class="block px-8 py-2 hover:bg-gray-800 md:px-4"
                  >{$_("menu.itOutsourcing")}</a
                >
              </li>
            </ul>
          </div>
        </li>
        <li class="relative">
          <button
            on:click={toggleCreativeDropdown}
            class="flex items-center justify-between w-full py-2 px-5 text-white bg-gray-900 hover:bg-gray-800"
            aria-expanded={isCreativeDropdownOpen}
          >
            {$_("menu.creative")}
            <svg
              class="w-2.5 h-2.5 ms-3 transition-transform duration-200 {isCreativeDropdownOpen ? 'rotate-180' : ''}"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            class="md:absolute md:z-10 w-full bg-gray-800 md:w-auto {isCreativeDropdownOpen
              ? 'block'
              : 'hidden'}"
          >
            <ul class="py-2 text-sm md:py-2 whitespace-nowrap">
              <li>
                <a href="#" class="block px-8 py-2 hover:bg-gray-800 md:px-4"
                  >{$_("menu.marketAnalysis")}</a
                >
              </li>
              <li>
                <a href="#" class="block px-8 py-2 hover:bg-gray-800 md:px-4"
                  >{$_("menu.industryNews")}</a
                >
              </li>
            </ul>
          </div>
        </li>
        <li class="relative">
          <button
            id="aboutus-dropdown-button"
            on:click={toggleAboutusDropdown}
            class="flex items-center justify-between w-full py-2 px-5 text-white bg-gray-900 hover:bg-gray-800"
            aria-expanded={isAboutusDropdownOpen}
          >
            {$_("menu.aboutus")}
            <svg
              class="w-2.5 h-2.5 ms-3 transition-transform duration-200 {isAboutusDropdownOpen ? 'rotate-180' : ''}"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            class="md:absolute md:z-10 w-full bg-gray-800 md:w-auto {isAboutusDropdownOpen
              ? 'block'
              : 'hidden'}"
          >
            <ul class="py-2 text-sm md:py-2 whitespace-nowrap">
              <li>
                <a href="/intro" class="block px-8 py-2 hover:bg-gray-800 md:px-4"
                  >{$_("menu.companyIntroduction")}</a
                >
              </li>
              <li>
                <a href="#" class="block px-8 py-2 hover:bg-gray-800 md:px-4"
                  >{$_("menu.companyCulture")}</a
                >
              </li>
              <li>
                <a href="#" class="block px-8 py-2 hover:bg-gray-800 md:px-4"
                  >{$_("menu.history")}</a
                >
              </li>
              <li>
                <a href="#" class="block px-8 py-2 hover:bg-gray-800 md:px-4"
                  >{$_("menu.honors")}</a
                >
              </li>
              <li>
                <a href="#" class="block px-8 py-2 hover:bg-gray-800 md:px-4"
                  >{$_("menu.contact")}</a
                >
              </li>
            </ul>
          </div>
        </li>
        <li>
          <a href="/contact" class="block py-2 px-5 text-white bg-gray-900"
            >{$_("menu.contact")}</a
          >
        </li>
      </ul>
    </div>
  </div>
</nav>

<style>
  .mobile-menu-container {
    transition: margin-top 0.3s ease;
  }
  @media (max-width: 768px) {
    .mobile-menu-container {
      margin-top: 0;
    }
    .mobile-menu-container.open {
      margin-top: 1rem;
    }
  }
</style>
