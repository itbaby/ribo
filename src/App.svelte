<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import CMenu from "./features/CMenu.svelte";
  import CDefault from "./features/CDefault.svelte";
  import CIndustry from "./features/CIndustry.svelte";
</script>

<Router>
  <CMenu />
  <Route path="/" let:params>
    <CDefault />
  </Route>
  <Route path="/industry" let:params>
    <CIndustry />
  </Route>
</Router>
