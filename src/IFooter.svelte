<script>
  import {
    Footer,
    FooterCopyright,
    FooterIcon,
  } from "flowbite-svelte";
  import {
    BalloonPackageFlying,
    BalloonPackageFlyingDark,
  } from "flowbite-svelte-illustrations";
  import {
    FacebookSolid,
    GithubSolid,
    DiscordSolid,
    TwitterSolid,
  } from "flowbite-svelte-icons";
  import { _ } from "svelte-i18n";
</script>

<Footer footerType="socialmedia">
  <div class="mx-auto w-10/12  p-8 py-12 lg:py-16">
    <div class="flex flex-col md:flex-row md:justify-between gap-4">
      <div class="basis-1/4 flex justify-end pr-16">
        <div class="dark:hidden">
          <BalloonPackageFlying style="height:200px !important" />
        </div>
        <div class="hidden dark:block">
          <BalloonPackageFlyingDark style="height:200px !important" />
        </div>
      </div>
      <div
        class="basis-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
      >
        <div>
          <h2 class="mb-4 text-sm font-semibold uppercase">
            {$_("footer.sections.business")}
          </h2>
          <p class="mb-2 text-sm">
            {$_("footer.labels.email")}: {$_("footer.contacts.businessEmail")}
          </p>
          <p class="text-sm">
            {$_("footer.labels.phone")}: {$_("footer.contacts.businessPhone")}
          </p>
        </div>
        <div>
          <h2 class="mb-4 text-sm font-semibold uppercase">
            {$_("footer.sections.join")}
          </h2>
          <p class="mb-2 text-sm">
            {$_("footer.labels.email")}: {$_("footer.contacts.joinEmail")}
          </p>
          <p class="text-sm">
            {$_("footer.labels.phone")}: {$_("footer.contacts.joinPhone")}
          </p>
        </div>
        <div>
          <h2 class="mb-4 text-sm font-semibold uppercase">
            {$_("footer.sections.media")}
          </h2>
          <p class="mb-2 text-sm">
            {$_("footer.labels.email")}: {$_("footer.contacts.businessEmail")}
          </p>
          <p class="text-sm">
            {$_("footer.labels.phone")}: {$_("footer.contacts.businessPhone")}
          </p>
        </div>
        <div>
          <h2 class="mb-4 text-sm font-semibold uppercase">
            {$_("footer.sections.company")}
          </h2>
          <p class="mb-2 text-sm">{$_("company.name")}</p>
          <p class="mb-2 text-sm">
            {$_("footer.labels.phone")}: {$_("footer.contacts.companyPhone")}
          </p>
          <p class="text-sm">
            {$_("footer.labels.address")}: {$_("footer.addresses.dalian")}
          </p>
        </div>
        <div>
          <h2 class="mb-4 text-sm font-semibold uppercase">
            {$_("footer.sections.shenzhen")}
          </h2>
          <p class="text-sm">
            {$_("footer.labels.address")}: {$_("footer.addresses.shenzhen")}
          </p>
        </div>
      </div>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
    <div class="flex flex-col sm:flex-row items-center justify-between">
      <FooterCopyright href="/" by={$_("footer.copyright")} />
      <div class="mt-4 flex space-x-4 sm:mt-0 sm:justify-center">
        <FooterIcon href="#">
          <FacebookSolid class="h-5 w-5" />
        </FooterIcon>
        <FooterIcon href="#">
          <DiscordSolid class="h-5 w-5" />
        </FooterIcon>
        <FooterIcon href="#">
          <TwitterSolid class="h-5 w-5" />
        </FooterIcon>
        <FooterIcon href="#">
          <GithubSolid class="h-5 w-5" />
        </FooterIcon>
      </div>
    </div>
  </div>
</Footer>
