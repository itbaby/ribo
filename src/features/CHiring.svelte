<script>
// @ts-nocheck

  import { _, locale } from "svelte-i18n";
  import screenshot from "../assets/2454678.png";
  import serviceAdvantagesImage from "../assets/services.jpg";
</script>

<div class="overflow-hidden bg-gray-900 py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div
      class="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
    >
      <div class="lg:pt-4 lg:pr-8" data-aos="fade-right" data-aos-duration="1000">
        <div class="lg:max-w-lg">
          <h2 class="text-base/7 font-semibold text-indigo-400" data-aos="zoom-in" data-aos-delay="100">
            {$_("chiring.hireSoFaster")}
          </h2>
          <p
            class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl"
            data-aos="zoom-in" data-aos-delay="200"
          >
            {$_("chiring.headline")}
          </p>
          <p class="mt-6 text-lg/8 text-gray-300" data-aos="zoom-in" data-aos-delay="300">
            {$_("chiring.description")}
          </p>
          <dl
            class="mt-10 max-w-xl space-y-8 text-base/7 text-gray-400 lg:max-w-none"
          >
            <div class="relative pl-9" data-aos="zoom-in" data-aos-delay="400">
              <dt class="inline font-semibold text-white">
                <i class="ri-upload-cloud-2-line text-indigo-400 text-2xl"></i>
                {$_("chiring.seniorTeam")}
              </dt>
              <dd class="inline">
                {$_("chiring.seniorTeamDesc")}
              </dd>
            </div>
            <div class="relative pl-9" data-aos="zoom-in" data-aos-delay="500">
              <dt class="inline font-semibold text-white">
                <i class="ri-lock-password-line text-indigo-400 text-2xl"></i>
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
                             <div class="flex h-12 w-18 items-center justify-center rounded-lg bg-indigo-500">
                                <i class="ri-file-search-line text-white text-2xl"></i>
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
                            <div class="flex h-12 w-18 items-center justify-center rounded-lg bg-indigo-500">
                               <i class="ri-user-search-line text-white text-2xl"></i>
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
