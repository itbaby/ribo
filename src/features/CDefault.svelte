<script lang="ts">
    import { Fullpage, FullpageSection } from "svelte-fullpage";
    import CFooter from "./CFooter.svelte";
</script>

<div class="flex items-center justify-center w-screen h-screen">
    <Fullpage>
        <FullpageSection
            class="bg-blue-500 h-screen flex items-center justify-center"
        >
            <h1 class="text-white text-5xl animate-pulse">Section 1</h1>
        </FullpageSection>
        <FullpageSection class="h-screen">
            
            <CFooter />
        </FullpageSection>
    </Fullpage>
</div>
