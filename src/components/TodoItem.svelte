<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { ListgroupItem, ButtonGroup, Button } from "flowbite-svelte";
  import { EditSolid, TrashBinSolid } from 'flowbite-svelte-icons';

  const dispatch = createEventDispatcher();
</script>

<ListgroupItem class="gap-2 flex items-center">
  <span class="text-base font-semibold grow"><slot /></span>
  <ButtonGroup>
    <Button outline color="dark"><EditSolid /></Button> 
    <Button outline color="red" on:click={() => dispatch("delete")}><TrashBinSolid /></Button>
  </ButtonGroup>
</ListgroupItem>
