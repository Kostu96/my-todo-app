<script lang="ts">
  import type { User } from '@supabase/supabase-js'
  import { onMount } from 'svelte';
  import { supabase } from './supabaseClient'
  import { Modal, Button, DarkMode, Label, Listgroup, Navbar, Footer, FooterCopyright } from 'flowbite-svelte';
  import { UserSolid } from 'flowbite-svelte-icons';
  import Auth from './components/Auth.svelte';
  import TodoItem from './components/TodoItem.svelte';
  import TodoEdit from './components/TodoEdit.svelte';

  let user: User | null;
  let showTodoEdit: boolean = false;

  let todos = [
    { id: 1, text: "todo1" },
    { id: 2, text: "todo2" },
    { id: 3, text: "todo3" },
    { id: 4, text: "todo4" },
  ];

  const handleDelete = (id: number) => {
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
  <Navbar class="flex mb-4">
    <div class="grow">
      {#if user}
        <Label class="p-1 flex">
          <UserSolid />{user.email}
        </Label>
        <Button size="sm" 
          on:click={async () => {
            const { error } = await supabase.auth.signOut();
            if (error) console.log("Error logging out:", error.message);
          }}>Logout</Button>
        <Button size="sm" on:click={() => showTodoEdit = true}>New TODO</Button>
      {/if}
    </div>
    <DarkMode />
  </Navbar>
  {#if !user}
    <Auth />
  {:else}
    <div class="flex flex-wrap">
      <Listgroup class="grow m-2">
        <h3 class="py-1 px-20 text-center text-xl font-medium text-gray-900 dark:text-white">TODOs</h3>
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
    <Modal bind:open={showTodoEdit}>
      <TodoEdit />
    </Modal>
  {/if}
  <Footer>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <FooterCopyright href="https://github.com/Kostu96" target="_blank" by="Konstanty Misiak" />
  </Footer>
</main>
