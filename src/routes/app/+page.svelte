<script>
	import Button from '$lib/components/base/Button.svelte';
	import Panel from '$lib/components/base/Panel.svelte';
	import { BgColors } from '$lib/types';
</script>

<div class="m-4">
	<Panel>
		<Button variant={BgColors.TEXAS_YELLOW}>Click Me</Button>
		<Button variant={BgColors.FERN_GREEN}>Click Me</Button>
		<Button variant={BgColors.BITTERSWEET_RED}>Click Me</Button>
		<Button variant={BgColors.TEXAS_YELLOW}>Click Me</Button>
		<Button variant={BgColors.PICTON_BLUE}>Click Me</Button>
		<Button variant={BgColors.AMETHYST_PURPLE}>Click Me</Button>
	</Panel>
</div>
