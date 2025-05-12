<script>
	import Button from '$lib/components/base/Button.svelte';
</script>

<h1 class="text-9xl text-bittersweet-red">Hello! 👋</h1>
<a href="/">Go back home</a>

{#each { length: 100 }}
	<Button>Click Me!</Button>
{/each}
