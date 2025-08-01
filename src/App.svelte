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
</script>

<Router>
  <CMenu />
  <Route path="/" let:params>
    <CDefault />
  </Route>
  <Route path="/industry" let:params>
    <CIndustry />
  </Route>
  <Route path="/innovation" let:params>
    <CInnovation />
  </Route>
  <Route path="/serve" let:params>
    <CServe />
  </Route>
  <Route path="/aboutus" let:params>
    <CAboutUs />
  </Route>
  <Route path="/contact" let:params>
    <CContact />
  </Route>
  <CFooter />
</Router>
