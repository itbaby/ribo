<script lang="ts">
    import { onMount } from "svelte";
    import { _, locale } from "svelte-i18n";

    function changeLanguage(lang: string) {
        locale.set(lang);
        localStorage.setItem("preferred_language", lang);
    }

    let isDropdownOpen = false;
    let isMobileMenuOpen = false;

    function toggleDropdown() {
        isDropdownOpen = !isDropdownOpen;
    }

    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
    }

    // 点击外部关闭下拉菜单
    function handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (
            !target.closest("#mega-menu-full-dropdown") &&
            !target.closest("#mega-menu-full-dropdown-button")
        ) {
            isDropdownOpen = false;
        }
    }

    onMount(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    });
</script>

<nav class="bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900">
    <div
        class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4"
    >
        <a
            href="https://flowbite.com"
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
        <button
            on:click={toggleMobileMenu}
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mega-menu-full"
            aria-expanded={isMobileMenuOpen}
        >
            <span class="sr-only">Open main menu</span>
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
        </button>
        <div
            id="mega-menu-full"
            class="items-center justify-between w-full md:flex md:w-auto md:order-1 {isMobileMenuOpen
                ? 'block'
                : 'hidden'} md:block"
        >
            <ul
                class="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse"
            >
                <li>
                    <!-- svelte-ignore a11y_invalid_attribute -->
                    <a
                        href="#"
                        class="block py-2 px-3 text-lg text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                        aria-current="page">{$_("menu.industry")}</a
                    >
                </li>
                <li>
                    <button
                        on:click={toggleDropdown}
                        id="mega-menu-full-dropdown-button"
                        class="flex items-center justify-between w-full py-2 px-3 text-lg font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                        {$_("menu.serve")}
                        <svg
                            class="w-2.5 h-2.5 ms-3 transition-transform duration-200 {isDropdownOpen
                                ? 'rotate-180'
                                : ''}"
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
                </li>
                <li>
                    <!-- svelte-ignore a11y_invalid_attribute -->
                    <a
                        href="#"
                        class="block py-2 px-3 text-lg text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                        >{$_("menu.creative")}</a
                    >
                </li>
                <li>
                    <!-- svelte-ignore a11y_invalid_attribute -->
                    <a
                        href="#"
                        class="block py-2 px-3 text-lg text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                        >{$_("menu.aboutus")}</a
                    >
                </li>
                <li>
                    <!-- svelte-ignore a11y_invalid_attribute -->
                    <a
                        href="#"
                        class="block py-2 px-3 text-lg text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                        >{$_("menu.investorRelations")}</a
                    >
                </li>
                <li>
                    <div
                        class=" py-2 px-3 text-lg text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 flex flex-col sm:flex-row item-left"
                    >
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <span
                            class="font-bold text-black-700 cursor-pointer hover:text-blue-600 transition-colors"
                            on:click={() => changeLanguage("en")}>En</span
                        >
                        <span class="text-gray-500 mx-1 hidden sm:inline"
                            >|</span
                        >
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <span
                            class="font-bold text-black-700 cursor-pointer hover:text-blue-600 transition-colors"
                            on:click={() => changeLanguage("zh")}>中</span
                        >
                        <span class="text-gray-500 mx-1 hidden sm:inline"
                            >|</span
                        >
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <span
                            class="font-bold text-black-700 cursor-pointer hover:text-blue-600 transition-colors"
                            on:click={() => changeLanguage("jp")}>あ</span
                        >
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div
        id="mega-menu-full-dropdown"
        class="mt-1 bg-white border-gray-200 shadow-xs border-y dark:bg-gray-800 dark:border-gray-600 transition-all duration-200 {isDropdownOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'}"
    >
        <div
            class="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:grid-cols-3 md:px-6"
        >
            <ul aria-labelledby="mega-menu-full-dropdown-button">
                <li>
                    <!-- svelte-ignore a11y_invalid_attribute -->
                    <a
                        href="#"
                        class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <div class="font-semibold">Online Stores</div>
                        <span class="text-sm text-gray-500 dark:text-gray-400"
                            >Connect with third-party tools that you're already
                            using.</span
                        >
                    </a>
                </li>
                <li>
                    <!-- svelte-ignore a11y_invalid_attribute -->
                    <a
                        href="#"
                        class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <div class="font-semibold">Segmentation</div>
                        <span class="text-sm text-gray-500 dark:text-gray-400"
                            >Connect with third-party tools that you're already
                            using.</span
                        >
                    </a>
                </li>
                <li>
                    <!-- svelte-ignore a11y_invalid_attribute -->
                    <a
                        href="#"
                        class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <div class="font-semibold">Marketing CRM</div>
                        <span class="text-sm text-gray-500 dark:text-gray-400"
                            >Connect with third-party tools that you're already
                            using.</span
                        >
                    </a>
                </li>
            </ul>
            <ul>
                <li>
                    <!-- svelte-ignore a11y_invalid_attribute -->
                    <a
                        href="#"
                        class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <div class="font-semibold">Online Stores</div>
                        <span class="text-sm text-gray-500 dark:text-gray-400"
                            >Connect with third-party tools that you're already
                            using.</span
                        >
                    </a>
                </li>
                <li>
                    <!-- svelte-ignore a11y_invalid_attribute -->
                    <a
                        href="#"
                        class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <div class="font-semibold">Segmentation</div>
                        <span class="text-sm text-gray-500 dark:text-gray-400"
                            >Connect with third-party tools that you're already
                            using.</span
                        >
                    </a>
                </li>
                <li>
                    <!-- svelte-ignore a11y_invalid_attribute -->
                    <a
                        href="#"
                        class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <div class="font-semibold">Marketing CRM</div>
                        <span class="text-sm text-gray-500 dark:text-gray-400"
                            >Connect with third-party tools that you're already
                            using.</span
                        >
                    </a>
                </li>
            </ul>
            <ul class="hidden md:block">
                <li>
                    <!-- svelte-ignore a11y_invalid_attribute -->
                    <a
                        href="#"
                        class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <div class="font-semibold">Audience Management</div>
                        <span class="text-sm text-gray-500 dark:text-gray-400"
                            >Connect with third-party tools that you're already
                            using.</span
                        >
                    </a>
                </li>
                <li>
                    <!-- svelte-ignore a11y_invalid_attribute -->
                    <a
                        href="#"
                        class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <div class="font-semibold">Creative Tools</div>
                        <span class="text-sm text-gray-500 dark:text-gray-400"
                            >Connect with third-party tools that you're already
                            using.</span
                        >
                    </a>
                </li>
                <li>
                    <!-- svelte-ignore a11y_invalid_attribute -->
                    <a
                        href="#"
                        class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <div class="font-semibold">Marketing Automation</div>
                        <span class="text-sm text-gray-500 dark:text-gray-400"
                            >Connect with third-party tools that you're already
                            using.</span
                        >
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
