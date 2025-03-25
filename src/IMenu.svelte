<script lang="ts">
  import {
    Navbar,
    NavBrand,
    NavHamburger,
    NavUl,
    NavLi,
    MegaMenu,
  } from "flowbite-svelte";
  import logo from './assets/flowbite-svelte-icon-logo.svg';
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  let menu2 = [
    {
      name: "Online Stores",
      help: "Connect with third-party tools that you're already using.",
    },
    {
      name: "Segmentation",
      help: "Connect with third-party tools that you're already using.",
    },
    {
      name: "Marketing CRM",
      help: "Connect with third-party tools that you're already using.",
    },

    {
      name: "Online Stores",
      help: "Connect with third-party tools that you're already using.",
    },
    {
      name: "Segmentation",
      help: "Connect with third-party tools that you're already using.",
    },
    {
      name: "Marketing CRM",
      help: "Connect with third-party tools that you're already using.",
    },

    {
      name: "Audience Management",
      help: "Connect with third-party tools that you're already using.",
    },
    {
      name: "Creative Tools",
      help: "Connect with third-party tools that you're already using.",
    },
    {
      name: "Marketing Automation",
      help: "Connect with third-party tools that you're already using.",
    },
  ];
</script>

<Navbar let:hidden let:toggle>
  <NavBrand href="/">
    <img
      src={logo}
      class="me-3 h-6 sm:h-9"
      alt="Flowbite Logo"
    />
    <span
      class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >Flowbite</span
    >
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/">Home</NavLi>
    <NavLi class="cursor-pointer">
      Mega menu<ChevronDownOutline
        class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline"
      />
    </NavLi>
    <MegaMenu full items={menu2} let:item>
      <a
        href="/"
        class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 h-full"
      >
        <div class="font-semibold dark:text-white">{item.name}</div>
        <span class="text-sm font-light text-gray-500 dark:text-gray-400"
          >{item.help}</span
        >
      </a>
    </MegaMenu>
    <NavLi href="/services">Services</NavLi>
    <NavLi href="/services">Products</NavLi>
    <NavLi href="/services">Contact</NavLi>
  </NavUl>
</Navbar>
