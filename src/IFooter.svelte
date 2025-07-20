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
</script>

<Footer footerType="socialmedia">
  <div class="flex flex-col md:flex-row md:justify-between">
    <div class="mb-6 md:mb-0">
      <FooterBrand
        href="https://dlribo.com"
        src={logo}
        alt="睿柏咨询服务 Logo"
        name="睿柏咨询服务"
        class="flex-shrink-0"
      />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      <div>
        <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">业务咨询</h2>
        <p class="mb-2 text-sm">邮箱: davidquan@dlribo.com, bobbyliu@dlribo.com</p>
        <p class="text-sm">电话: 13889451516, 13478706961</p>
      </div>
      <div>
        <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">加入我们</h2>
        <p class="mb-2 text-sm">邮箱: cindyma@dlribo.com</p>
        <p class="text-sm">电话: 13898419493</p>
      </div>
      <div>
        <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">市场与媒体</h2>
        <p class="mb-2 text-sm">邮箱: davidquan@dlribo.com, bobbyliu@dlribo.com</p>
        <p class="text-sm">电话: 13889451516, 13478706961</p>
      </div>
      <div>
        <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">公司信息</h2>
        <p class="mb-2 text-sm">睿柏中国大连睿柏咨询服务有限公司</p>
        <p class="mb-2 text-sm">电话: 0411-84113306</p>
        <p class="text-sm">地址: 辽宁省大连市中山区人民路15号 国际金融大厦21C</p>
      </div>
      <div>
        <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">深圳分公司</h2>
        <p class="text-sm">地址: 深圳市南山区粤海街道高新区社区高新南九道45号西北工业大学三航科技大厦1325</p>
      </div>
    </div>
  </div>
  <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
  <div class="flex flex-col sm:flex-row items-center justify-between">
    <FooterCopyright href="/" by="睿柏咨询" />
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
