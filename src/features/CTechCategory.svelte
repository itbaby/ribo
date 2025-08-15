<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	let activeTab = $state(1);
	let imageContainers: HTMLDivElement[] = [];

	const tabs = [
		{
			id: 1,
			title: 'Advanced tools',
			description: 'Use Preline thoroughly thought and automated libraries to manage your businesses.',
			image:
				'https://images.unsplash.com/photo-1605629921711-2f6b00c6bbf4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&h=720&q=80',
			svg: '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>'
		},
		{
			id: 2,
			title: 'Smart dashboards',
			description: 'Quickly Preline sample components, copy-paste codes, and start right off.',
			image:
				'https://images.unsplash.com/photo-1665686306574-1ace09918530?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&h=720&q=80',
			svg: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>'
		},
		{
			id: 3,
			title: 'Powerful features',
			description: 'Reduce time and effort on building modern look design with Preline only.',
			image:
				'https://images.unsplash.com/photo-1598929213452-52d72f63e307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&h=720&q=80',
			svg: '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>'
		}
	];

	function switchTab(tabIndex: number) {
		if (activeTab === tabIndex) return;

		const currentImage = imageContainers[activeTab - 1];
		const nextImage = imageContainers[tabIndex - 1];

		const tl = gsap.timeline();
		tl.to(currentImage, { opacity: 0, duration: 0.2, ease: 'power2.inOut' });
		tl.set(currentImage, { display: 'none' });
		tl.set(nextImage, { display: 'block', opacity: 0 });
		tl.to(nextImage, { opacity: 1, duration: 0.2, ease: 'power2.inOut' });

		activeTab = tabIndex;
	}

	onMount(() => {
		imageContainers.forEach((container, index) => {
			if (index + 1 !== activeTab) {
				gsap.set(container, { display: 'none', opacity: 0 });
			} else {
				gsap.set(container, { display: 'block', opacity: 1 });
			}
		});
	});
</script>

<!-- Features -->
 <!-- svelte-ignore a11y_img_redundant_alt -->
<div class="bg-gray-900 py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:text-center">
      <h2 class="text-base/7 font-semibold text-indigo-400">Deploy faster</h2>
      <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance">Everything you need to deploy your app</p>
      <p class="mt-6 text-lg/8 text-gray-300">Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.</p>
    </div>
    <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
      <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
        <div class="relative pl-16">
          <dt class="font-semibold text-white">
            <div class="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-white">
                <path d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            Push to deploy
          </dt>
          <dd class="mt-2 text-base/7 text-gray-400">Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.</dd>
        </div>
        <div class="relative pl-16">
          <dt class="font-semibold text-white">
            <div class="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-white">
                <path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            SSL certificates
          </dt>
          <dd class="mt-2 text-base/7 text-gray-400">Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.</dd>
        </div>
        <div class="relative pl-16">
          <dt class="font-semibold text-white">
            <div class="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-white">
                <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            Simple queues
          </dt>
          <dd class="mt-2 text-base/7 text-gray-400">Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.</dd>
        </div>
        <div class="relative pl-16">
          <dt class="font-semibold text-white">
            <div class="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-white">
                <path d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            Advanced security
          </dt>
          <dd class="mt-2 text-base/7 text-gray-400">Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.</dd>
        </div>
      </dl>
    </div>
  </div>
</div>
<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
	<div class="relative p-6 md:p-16">
		<!-- Grid -->
		<div class="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
			<div class="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
				<h2 class="text-2xl text-white font-bold sm:text-3xl dark:text-neutral-200">
					Fully customizable rules to match your unique needs
				</h2>

				<!-- Tab Navs -->
				<nav class="grid gap-4 mt-5 md:mt-10" aria-label="Tabs">
					{#each tabs as tab}
						<button
							type="button"
							class="text-start p-4 md:p-5 rounded-xl transition-all duration-300 ease-in-out"
							class:bg-white={activeTab === tab.id}
							class:shadow-md={activeTab === tab.id}
							class:dark:bg-neutral-700={activeTab === tab.id}
							class:hover:bg-gray-900={activeTab !== tab.id}
							class:dark:hover:bg-neutral-700={activeTab !== tab.id}
							on:click={() => switchTab(tab.id)}
						>
							<span class="flex gap-x-6">
								<svg
									class="shrink-0 mt-2 size-6 md:size-7 transition-colors duration-300"
									class:text-blue-600={activeTab === tab.id}
									class:dark:text-blue-500={activeTab === tab.id}
									class:text-white={activeTab !== tab.id}
									class:dark:text-neutral-200={activeTab !== tab.id}
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									{@html tab.svg}
								</svg>
								<span class="grow">
									<span
										class="block text-lg font-semibold transition-colors duration-300"
										class:text-blue-600={activeTab === tab.id}
										class:dark:text-blue-500={activeTab === tab.id}
										class:text-white={activeTab !== tab.id}
										class:dark:text-neutral-200={activeTab !== tab.id}
									>
										{tab.title}
									</span>
									<span
										class="block mt-1 transition-colors duration-300"
										class:text-gray-800={activeTab === tab.id}
										class:dark:text-gray-200={activeTab === tab.id}
										class:text-white={activeTab !== tab.id}
										class:dark:text-neutral-200={activeTab !== tab.id}
									>
										{tab.description}
									</span>
								</span>
							</span>
						</button>
					{/each}
				</nav>
				<!-- End Tab Navs -->
			</div>
			<!-- End Col -->

			<div class="lg:col-span-6">
				<div class="relative">
					<!-- Tab Content -->
					<div>
						{#each tabs as tab, i}
							<div bind:this={imageContainers[i]}>
								
								<img
									class="shadow-xl hover:bg-gray-900 rounded-xl dark:shadow-gray-900/20"
									src={tab.image}
									alt="Features Image"
								/>
							</div>
						{/each}
					</div>
					<!-- End Tab Content -->

					<!-- SVG Element -->
					<div class="hidden absolute top-0 end-0 translate-x-20 md:block lg:translate-x-20">
						<svg
							class="w-16 h-auto text-gray-500"
							width="121"
							height="135"
							viewBox="0 0 121 135"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
								stroke="currentColor"
								stroke-width="10"
								stroke-linecap="round"
							/>
							<path
								d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
								stroke="currentColor"
								stroke-width="10"
								stroke-linecap="round"
							/>
							<path
								d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
								stroke="currentColor"
								stroke-width="10"
								stroke-linecap="round"
							/>
						</svg>
					</div>
					<!-- End SVG Element -->
				</div>
			</div>
			<!-- End Col -->
		</div>
		<!-- End Grid -->

		<!-- Background Color -->
		<div class="absolute inset-0 grid grid-cols-12 size-full">
			<div
				class="col-span-full lg:col-span-7 border-2 border-gray-700 lg:col-start-6 bg-gray-800 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full dark:bg-neutral-800"
			></div>
		</div>
		<!-- End Background Color -->
	</div>
</div>



<!-- Testimonials with Stats -->
<div class="max-w-[82rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <!-- Grid -->
  <div class="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center lg:justify-between">
    <div class="lg:col-span-5 lg:col-start-1">
      <!-- Title -->
      <div class="mb-8">
        <h2 class="mb-2 text-3xl text-white font-bold lg:text-4xl dark:text-neutral-200">
          It's all about speed
        </h2>
        <p class="text-white dark:text-neutral-400">
          We provide you with a test account that can be set up in seconds. Our main focus is getting responses to you as soon as we can.
        </p>
      </div>
      <!-- End Title -->

      <!-- Blockquote -->
      <blockquote class="relative">
        <svg class="absolute top-0 start-0 transform -translate-x-6 -translate-y-8 size-16 text-gray-200 dark:text-neutral-800" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z" fill="currentColor"/>
        </svg>

        <div class="relative z-10">
          <p class="text-xl italic text-white dark:text-white">
            Amazing people to work with. Very fast and professional partner.
          </p>
        </div>

        <footer class="mt-6">
          <div class="flex items-center gap-x-4">
            <div class="shrink-0">
              <img class="size-8 rounded-full" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar">
            </div>
            <div class="grow">
              <div class="font-semibold text-white dark:text-neutral-200">Josh Grazioso</div>
              <div class="text-xs text-white dark:text-neutral-500">Director Payments & Risk | Airbnb</div>
            </div>
          </div>
        </footer>
      </blockquote>
      <!-- End Blockquote -->
    </div>
    <!-- End Col -->

    <div class="mt-10 lg:mt-0 lg:col-span-6 lg:col-end-13">
      <div class="space-y-6 sm:space-y-8">
        <!-- List -->
        <ul class="grid grid-cols-2 divide-y divide-y-2 divide-x divide-x-2 divide-gray-200 overflow-hidden dark:divide-neutral-700">
          <li class="flex items-center -m-0.5 p-4 sm:p-8">
            <div class="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold text-white dark:text-neutral-200">
              45k+
            </div>
            <p class="text-sm sm:text-base text-white dark:text-neutral-400 ml-4">
              users - from new startups to public companies
            </p>
          </li>

          <li class="flex items-center -m-0.5 p-4 sm:p-8">
            <div class="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold text-white dark:text-neutral-200">
              <svg class="shrink-0 size-5 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
              23%
            </div>
            <p class="text-sm sm:text-base text-white dark:text-neutral-400 ml-4">
              increase in traffic on webpages with Looms
            </p>
          </li>

          <li class="flex items-center -m-0.5 p-4 sm:p-8">
            <div class="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold text-white dark:text-neutral-200">
              <svg class="shrink-0 size-5 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
              9.3%
            </div>
            <p class="text-sm sm:text-base text-white dark:text-neutral-400 ml-4">
              boost in reply rates across sales outreach
            </p>
          </li>

          <li class="flex items-center -m-0.5 p-4 sm:p-8">
            <div class="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold text-white dark:text-neutral-200">
              2x
            </div>
            <p class="text-sm sm:text-base text-white dark:text-neutral-400 ml-4">
              faster than previous Preline versions
            </p>
          </li>
        </ul>
        <!-- End List -->
      </div>
    </div>
    <!-- End Col -->
  </div>
  <!-- End Grid -->
</div>
<!-- End Testimonials with Stats -->
<!-- End Card Blog -->