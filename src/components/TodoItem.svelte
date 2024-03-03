<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { ListgroupItem, ButtonGroup, Button } from "flowbite-svelte";
  import { EditSolid, TrashBinSolid } from 'flowbite-svelte-icons';

  const dispatch = createEventDispatcher();
</script>

<ListgroupItem class="text-base font-semibold gap-2 flex">
  <span class="grow"><slot /></span>
  <ButtonGroup>
    <Button><EditSolid /></Button> 
    <Button color="red" on:click={() => dispatch("delete")}><TrashBinSolid /></Button>
  </ButtonGroup>
</ListgroupItem>
