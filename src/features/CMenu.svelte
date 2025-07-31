<script lang="ts">
  import { _, locale } from "svelte-i18n";
  let isLanguageDropdownOpen = false;
  let isMobileMenuOpen = false;
  let selectedLanguage = "中文 (CN)";
  let selectedFlag = "fi-cn";
  let languages = {
    'fi-us': "en",
    'fi-jp': "jp",
    'fi-cn': "zh"
  };
  function toggleLanguageDropdown() {
    isLanguageDropdownOpen = !isLanguageDropdownOpen;
  }

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeLanguageDropdown() {
    isLanguageDropdownOpen = false;
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
  }

  function selectLanguage(language: string, flag: string) {
    selectedLanguage = language;
    selectedFlag = flag;
    locale.set(languages[flag as keyof typeof languages]);
    closeLanguageDropdown();
  }
</script>

<nav class="bg-white border-gray-200 dark:bg-gray-900">
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
          class="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          aria-expanded={isLanguageDropdownOpen}
          aria-haspopup="true"
        >
          <span class="fi {selectedFlag} fis me-3"></span>
          {selectedLanguage}
        </button>

        <!-- Language Dropdown Menu -->
        {#if isLanguageDropdownOpen}
          <div
            class="absolute right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700"
            id="language-dropdown-menu"
            role="menu"
          >
            <ul class="py-2 font-medium">
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                  on:click={() => selectLanguage('English', 'fi-us')}
                >
                  <div class="inline-flex items-center">
                    <span class="fi fi-us fis me-2"></span>
                    English
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                  on:click={() => selectLanguage('にほんご', 'fi-jp')}
                >
                  <div class="inline-flex items-center">
                    <span class="fi fi-jp fis me-2"></span>
                    にほんご
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                  on:click={() => selectLanguage('中文', 'fi-cn')}
                >
                  <div class="inline-flex items-center">
                    <span class="fi fi-cn fis me-2"></span>
                    中文
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
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
      class="items-center justify-between w-full md:flex md:w-auto md:order-1 {isMobileMenuOpen
        ? 'block'
        : 'hidden'}"
      id="navbar-language"
    >
      <ul
        class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
      >
        <li>
          <a
            href="#"
            class="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
            aria-current="page">{$_("menu.industry")}</a
          >
        </li>
        <li>
          <a
            href="#"
            class="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >{$_("menu.serve")}</a
          >
        </li>
        <li>
          <a
            href="#"
            class="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >{$_("menu.creative")}</a
          >
        </li>
        <li>
          <a
            href="#"
            class="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >{$_("menu.aboutus")}</a
          >
        </li>
        <li>
          <a
            href="#"
            class="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >{$_("menu.contact")}</a
          >
        </li>
      </ul>
    </div>
  </div>
</nav>

<style>
  /* Add any additional styles if needed */
</style>
