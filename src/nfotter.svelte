<script>
  import {
    Footer,
    FooterCopyright,
    FooterBrand,
    FooterIcon,
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

<footer class="bg-white dark:bg-gray-900">
    <div class="mx-auto max-w-screen-2xl w-full p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0">
              <a href="https://flowbite.com/" class="flex items-center">
                  <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 me-3" alt="FlowBite Logo" />
                  <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
              </a>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">{$_('footer.sections.business')}</h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                          <p class="mb-2 text-sm">{$_('footer.labels.email')}: {$_('footer.contacts.businessEmail')}</p>
                      </li>
                      <li>
                          <p class="text-sm">{$_('footer.labels.phone')}: {$_('footer.contacts.businessPhone')}</p>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">{$_('footer.sections.join')}</h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                          <p class="mb-2 text-sm">{$_('footer.labels.email')}: {$_('footer.contacts.joinEmail')}</p>
                      </li>
                      <li>
                          <p class="text-sm">{$_('footer.labels.phone')}: {$_('footer.contacts.joinPhone')}</p>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">{$_('footer.sections.media')}</h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                          <p class="mb-2 text-sm">{$_('footer.labels.email')}: {$_('footer.contacts.businessEmail')}</p>
                      </li>
                      <li>
                          <p class="text-sm">{$_('footer.labels.phone')}: {$_('footer.contacts.businessPhone')}</p>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
          </span>
          <div class="flex mt-4 sm:justify-center sm:mt-0">
              <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <FacebookSolid
                    class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
                  />
                  <span class="sr-only">Facebook page</span>
              </a>
              <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <DiscordSolid
                    class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
                  />
                  <span class="sr-only">Discord community</span>
              </a>
              <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <TwitterSolid
                    class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
                  />
                  <span class="sr-only">Twitter page</span>
              </a>
              <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <GithubSolid
                    class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
                  />
                  <span class="sr-only">GitHub account</span>
              </a>
          </div>
      </div>
    </div>
</footer>
