<script lang="ts">
	import { Button, Input, Textarea } from 'flowbite-svelte';
</script>

<form class="flex flex-col space-y-6" action="#">
	<h3 class="text-xl font-medium text-gray-900 dark:text-white">New TODO</h3>
	<Input type="text" placeholder="title" required />
	<Textarea placeholder="description" />
	<Button type="submit" class="w-full1">Add new TODO</Button>
</form>
