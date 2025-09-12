<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import CMenu from "./features/CMenu.svelte";
  import CDefault from "./features/CDefault.svelte";
  import CIndustry from "./features/CIndustry.svelte";
  import CFooter from "./features/CFooter.svelte";
  import CServe from "./features/CServe.svelte";
  import CAboutUs from "./features/CAboutUs.svelte";
  import CContact from "./features/CContact.svelte";
  import CInnovation from "./features/CInnovation.svelte";
  import CHiring from "./features/CHiring.svelte";
  import CIntro from "./features/CIntro.svelte";
  import CResources from "./features/CResources.svelte";
  import COutSourcing from "./features/COutSourcing.svelte";
  import CTechCategory from "./features/CTechCategory.svelte";
  import CCulture from "./features/CCulture.svelte";
    import CHonors from "./features/CHonors.svelte";
    import CInfo from "./features/CInfo.svelte";
</script>

<Router>
  <CMenu />
  <Route path="/" let:params>
    <div class="pt-16">
      <CDefault />
    </div>
  </Route>
  <Route path="/hiring" let:params>
    <div class="pt-16">
      <CHiring />
    </div>
    <CFooter bgClass="bg-gray-800" />
  </Route>
  <Route path="/industry" let:params>
    <div class="pt-16">
      <CIndustry />
    </div>
    <CFooter />
  </Route>
  <Route path="/innovation" let:params>
    <div class="pt-16">
      <CInnovation />
    </div>
    <CFooter />
  </Route>
  <Route path="/serve" let:params>
    <div class="pt-16">
      <CServe />
    </div>
    <CFooter />
  </Route>
  <Route path="/aboutus" let:params>
    <div class="pt-16">
      <CAboutUs />
    </div>
    <CFooter />
  </Route>
  <Route path="/contact" let:params>
    <div class="pt-16">
      <CContact />
    </div>
    <CFooter />
  </Route>
  <Route path="/intro" let:params>
    <div class="pt-16">
      <CIntro />
    </div>
    <CFooter />
  </Route>
  <Route path="/resources" let:params>
    <div class="pt-16">
      <CResources />
    </div>
    <CFooter />
  </Route>
  <Route path="/honors" let:params>
    <div class="pt-16">
      <CHonors />
    </div>
    <CFooter />
  </Route>
  <Route path="/outsourcing" let:params>
    <div class="pt-16 bg-gray-900">
      <COutSourcing />
    </div>
    <CFooter bgClass="bg-gray-800" />
  </Route>
  <Route path="/tech-category" let:params>
    <div class="pt-16 bg-gray-800">
      <CTechCategory />
    </div>
    <CFooter />
  </Route>
  <Route path="/culture" let:params>
    <div class="pt-16 bg-gray-900">
      <CCulture />
    </div>
    <CFooter />
  </Route>
   <Route path="/info" let:params>
    <div class="pt-16 bg-gray-50">
      <CInfo />
    </div>
    <CFooter />
  </Route>
</Router>
