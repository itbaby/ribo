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
</Router>
