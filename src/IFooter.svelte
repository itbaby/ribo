<script>
  import {
    Footer,
    FooterCopyright,
    FooterLinkGroup,
    FooterLink,
    FooterBrand,
    FooterIcon,
    Img,
  } from "flowbite-svelte";
  import {
    FacebookSolid,
    GithubSolid,
    DiscordSolid,
    TwitterSolid,
  } from "flowbite-svelte-icons";
  import logo from "./assets/logo.jpg";
  import { _ } from "svelte-i18n";
</script>

<Footer footerType="socialmedia">
  <div class="flex flex-col md:flex-row md:justify-between">
    <div class="mb-6 md:mb-0">
      <FooterBrand
        href="https://dlribo.com"
        src={logo}
        alt="{$_('footer.brand.name')} Logo"
        name={$_('footer.brand.name')}
        class="flex-shrink-0"
      />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      <div>
        <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">{$_('footer.sections.business')}</h2>
        <p class="mb-2 text-sm">{$_('footer.labels.email')}: {$_('footer.contacts.businessEmail')}</p>
        <p class="text-sm">{$_('footer.labels.phone')}: {$_('footer.contacts.businessPhone')}</p>
      </div>
      <div>
        <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">{$_('footer.sections.join')}</h2>
        <p class="mb-2 text-sm">{$_('footer.labels.email')}: {$_('footer.contacts.joinEmail')}</p>
        <p class="text-sm">{$_('footer.labels.phone')}: {$_('footer.contacts.joinPhone')}</p>
      </div>
      <div>
        <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">{$_('footer.sections.media')}</h2>
        <p class="mb-2 text-sm">{$_('footer.labels.email')}: {$_('footer.contacts.businessEmail')}</p>
        <p class="text-sm">{$_('footer.labels.phone')}: {$_('footer.contacts.businessPhone')}</p>
      </div>
      <div>
        <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">{$_('footer.sections.company')}</h2>
        <p class="mb-2 text-sm">{$_('company.name')}</p>
        <p class="mb-2 text-sm">{$_('footer.labels.phone')}: {$_('footer.contacts.companyPhone')}</p>
        <p class="text-sm">{$_('footer.labels.address')}: {$_('footer.addresses.dalian')}</p>
      </div>
      <div>
        <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">{$_('footer.sections.shenzhen')}</h2>
        <p class="text-sm">{$_('footer.labels.address')}: {$_('footer.addresses.shenzhen')}</p>
      </div>
    </div>
  </div>
  <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
  <div class="flex flex-col sm:flex-row items-center justify-between">
    <FooterCopyright href="/" by={$_('footer.copyright')} />
    <div
      class="mt-4 flex space-x-4 sm:mt-0 sm:justify-center rtl:space-x-reverse"
    >
      <FooterIcon href="#">
        <FacebookSolid
          class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
        />
      </FooterIcon>
      <FooterIcon href="#">
        <DiscordSolid
          class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
        />
      </FooterIcon>
      <FooterIcon href="#">
        <TwitterSolid
          class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
        />
      </FooterIcon>
      <FooterIcon href="#">
        <GithubSolid
          class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
        />
      </FooterIcon>
      <!-- 
      <FooterIcon href="/">
        <Img src="./assets/logo.jpg" />
      </FooterIcon> -->
    </div>
  </div>
</Footer>
