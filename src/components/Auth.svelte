<script lang="ts">
  import { supabase } from '../supabaseClient'
  import { EnvelopeSolid, LockSolid } from 'flowbite-svelte-icons';
  import { Button, Helper, Input } from 'flowbite-svelte';

  let email: string = ''
  let password: string = ''
  let helperText: string | null = null;

  const handleLogin = async (type: string) => {
    const {
      data: { user },
      error,
    } = type === "LOGIN"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) {
      helperText = error.message;
    } else if (!user && !error) {
      helperText = "An email has been sent to you for verification!";
    }
  }
</script>
  
<div class="m-8">
  <Input class="mb-6" type="email" placeholder="email" bind:value="{email}">
    <EnvelopeSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
  </Input>
  {#if !!helperText}
  <Helper class="text-sm mt-2">{helperText}</Helper>
  {/if}
  <Input class="mb-6" type="password" placeholder="password" bind:value="{password}">
    <LockSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
  </Input>
  <Button on:click={() => handleLogin("REGISTER")}>Register</Button>
  <Button on:click={() => handleLogin("LOGIN")}>Log in</Button>
</div>
