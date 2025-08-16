<script>
  import { _, locale } from "svelte-i18n";
  import screenshot from "../assets/2454678.png";
  import serviceAdvantagesImage from "../assets/services.jpg";
</script>

<div class="overflow-hidden bg-gray-900 py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div
      class="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
    >
      <div class="lg:pt-4 lg:pr-8">
        <div class="lg:max-w-lg">
          <h2 class="text-base/7 font-semibold text-indigo-400">
            {$_("chiring.hireSoFaster")}
          </h2>
          <p
            class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl"
          >
            {$_("chiring.headline")}
          </p>
          <p class="mt-6 text-lg/8 text-gray-300">
            {$_("chiring.description")}
          </p>
          <dl
            class="mt-10 max-w-xl space-y-8 text-base/7 text-gray-400 lg:max-w-none"
          >
            <div class="relative pl-9">
              <dt class="inline font-semibold text-white">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  data-slot="icon"
                  aria-hidden="true"
                  class="absolute top-1 left-1 size-5 text-indigo-400"
                >
                  <path
                    d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                  />
                </svg>
                {$_("chiring.seniorTeam")}
              </dt>
              <dd class="inline">
                {$_("chiring.seniorTeamDesc")}
              </dd>
            </div>
            <div class="relative pl-9">
              <dt class="inline font-semibold text-white">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  data-slot="icon"
                  aria-hidden="true"
                  class="absolute top-1 left-1 size-5 text-indigo-400"
                >
                  <path
                    d="M10 1a4.5 4.5 0 0 0-4.5 5.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                  />
                </svg>
                {$_("chiring.smartTalent")}
              </dt>
              <dd class="inline">
                {$_("chiring.smartTalentDesc")}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <img
        src={screenshot}
        alt="Product screenshot"
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-delay="500"
        class="w-full h-full rounded-3xl shadow-5xl sm:w-228 md:-ml-4 lg:-ml-0"
      />
    </div>
  </div>
</div>


<div class="bg-gray-900 py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">{$_('cadvantages.title')}</h2>
        </div>
        <div class="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-16 items-center">
            <!-- Left Column -->
            <div class="flex flex-col gap-y-12">
                {#each $_('cadvantages.left') as item, i}
                    <div class="text-right" data-aos="fade-right" data-aos-delay={i * 100}>
                        <div class="flex justify-end items-center gap-x-4">
                            <div>
                                <h3 class="text-lg font-semibold text-white">{item.title}</h3>
                                <p class="mt-1 text-gray-400">{item.description}</p>
                            </div>
                             <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v18h16.5V3H3.75zM9 9h6.75M9 12h6.75m-6.75 3h6.75" />
                                </svg>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>

            <!-- Center Image -->
            <div data-aos="zoom-in">
                <img src={serviceAdvantagesImage} alt="Service Advantages" class="w-96 h-96 rounded-full shadow-2xl mx-auto object-cover">
            </div>

            <!-- Right Column -->
            <div class="flex flex-col gap-y-12">
                {#each $_('cadvantages.right') as item, i}
                    <div class="text-left" data-aos="fade-left" data-aos-delay={i * 100}>
                        <div class="flex items-center gap-x-4">
                            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500">
                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-white">{item.title}</h3>
                                <p class="mt-1 text-gray-400">{item.description}</p>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>


<style lang="scss">
</style>
