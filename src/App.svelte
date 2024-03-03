<script lang="ts">
  import type { User } from '@supabase/supabase-js'
  import { onMount } from 'svelte';
  import { supabase } from './supabaseClient'
  import { Button, DarkMode, Label, Listgroup, ListgroupItem, Navbar } from 'flowbite-svelte';
  import { UserSolid } from 'flowbite-svelte-icons';
  import Auth from './components/Auth.svelte';
  import TodoItem from './components/TodoItem.svelte';

  let user: User | null;
  let showTodoEdit: boolean = false;

  let todos = [
    { id: 1, text: "todo1" },
    { id: 2, text: "todo2" },
    { id: 3, text: "todo3" },
    { id: 4, text: "todo4" },
  ];

  const handleDelete = (id) => {
    todos = todos.filter((todo) => todo.id != id);
  };

  onMount(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      user = session?.user ?? null;
    });

    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        const currentUser = session?.user;
        user = currentUser ?? null;
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  })
</script>

<main>
  <Navbar class="flex">
    <div class="grow">
      {#if user}
        <Label class="flex">
          <UserSolid />{user.email}
        </Label>
        <Button size="sm" 
          on:click={async () => {
            const { error } = await supabase.auth.signOut();
            if (error) console.log("Error logging out:", error.message);
          }}>Logout</Button>
        <Button size="sm" on:click={() => showTodoEdit = !showTodoEdit}>New TODO</Button>
      {/if}
    </div>
    <DarkMode />
  </Navbar>
  {#if !user}
    <Auth />
  {:else}
    <div class="flex flex-wrap">
      <Listgroup class="grow m-2">
        <h3 class="p-1 text-center text-xl font-medium text-gray-900 dark:text-white">TODOs</h3>
        {#each todos as todo (todo.id)}
          <TodoItem on:delete={() => handleDelete(todo.id)}>{todo.text}</TodoItem>
        {:else}
          <p>No todos</p>
        {/each}
      </Listgroup>
      <Listgroup class="grow m-2">
        <h3 class="p-1 text-center text-xl font-medium text-gray-900 dark:text-white">Deadlines</h3>
        {#each todos as todo (todo.id)}
          <TodoItem on:delete={() => handleDelete(todo.id)}>{todo.text}</TodoItem>
        {:else}
          <p>No deadlines</p>
        {/each}
      </Listgroup>
    </div>
  {/if}
</main>
