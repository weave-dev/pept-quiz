<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="h-screen overflow-hidden text-gray-900">
	{@render children()}
</div>
