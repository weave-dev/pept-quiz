<script>
	const { children } = $props();
</script>

<div class="overflow-auto h-full w-full relative text-neutral-600">
	{@render children()}
</div>
