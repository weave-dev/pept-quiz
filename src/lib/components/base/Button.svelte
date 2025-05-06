<script>
	const props = $props();

	const btnClass = `rounded-xl px-5 py-2 bg-gray-700 text-white shadow`
</script>

<button class={btnClass} {...props}>
	{@render props.children()}
</button>
