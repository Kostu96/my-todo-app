<script lang="ts">
  import TodoItem from './TodoItem.svelte';

  export let todos;

  const handleDelete = (id) => {
    todos = todos.filter((todo) => todo.id != id);
  };
</script>

<div class="col">
  <h1><slot /></h1>
  <ul class="list-group">
    {#each todos as todo (todo.id)}
      <li class="list-group-item">
        <TodoItem on:delete={() => handleDelete(todo.id)}>{todo.text}</TodoItem>
      </li>
    {:else}
      <p>No todos</p>
    {/each}
  </ul>
</div>
