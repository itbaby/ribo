
<script>
  import { Navbar, NavBrand, NavHamburger, NavUl, NavLi, MegaMenu } from 'flowbite-svelte';
  import { ChevronDownOutline, ArrowRightOutline } from 'flowbite-svelte-icons';
  import logo from './assets/flowbite-svelte-icon-logo.svg'
  let menu = [
    { name: 'About us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact us', href: '/contact' },
    { name: 'Library', href: '/library' },
    { name: 'Newsletter', href: '/news' },
    { name: 'Support Center', href: '/support' },
    { name: 'Resources', href: '/resource' },
    { name: 'Playground', href: '/play' },
    { name: 'Terms', href: '/tersm' },
    { name: 'Pro Version', href: '/pro' },
    { name: 'License', href: '/license' }
  ];
</script>

<Navbar let:hidden let:toggle>
  <NavBrand href="/">
    <img src={logo} class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span>
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/">Home</NavLi>
    <NavLi class="cursor-pointer">
      Company<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
    </NavLi>
    <MegaMenu full items={menu} let:item>
      <a href={item.href} class="hover:underline hover:text-primary-600 dark:hover:text-primary-500">
        {item.name}
      </a>
      <div slot="extra" class="">
        <h2 class="mt-4 mb-2 font-semibold text-gray-900 dark:text-white">Our brands</h2>
        <p class="mb-2 p-0 text-sm font-light text-gray-500 dark:text-gray-300">At Flowbite, we have a portfolio of brands that cater to a variety of preferences.</p>
        <a href="/" class="inline-flex items-center text-sm font-medium text-primary-600 hover:underline hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-700">
          Explore our brands
          <span class="sr-only">Explore our brands</span>
          <ArrowRightOutline class="w-6 h-6 ms-2 text-primary-600  hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-700" />
        </a>
      </div>
    </MegaMenu>
    <NavLi href="/services">Marketplace</NavLi>
    <NavLi href="/services">Resources</NavLi>
    <NavLi href="/services">Contact</NavLi>
  </NavUl>
</Navbar>
