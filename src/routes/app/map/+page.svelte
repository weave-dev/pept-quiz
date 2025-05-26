<script lang="ts">
	import Button from '$lib/components/base/Button.svelte'
	import Panel from '$lib/components/base/Panel.svelte'
	import { BgColors, Variants } from '$lib/types'
	import { icons } from '$lib/components/base/icons'

	// @TODO: dynamic levels when changing from Math/English
	// currently working on Math module levels

	const activities = [
		{
			title: 'Counting Numbers',
		},
		{
			title: 'Basic Addition'
		},
		{
			title: 'Number Comparison'
		},
        {
			title: 'Understanding Zero'
		},
        {
			title: 'Number Order'
		}
	]
</script>

<div class="flex h-full overflow-auto flex-col items-center gap-10 py-10">
	{#each activities as activity, i (i)}
		<div
			class="bg-fern-green text-fern-green-content
	rounded-lg p-4 font-serif text-2xl font-bold"
		>
			{activity.title}
		</div>

		<Panel variant={Variants.NEUTRAL_LIGHT} class="grid grid-cols-5 gap-4">
			{#each { length: 5 }}
				<Button
					variant={BgColors.FERN_GREEN}
					rounded
					class="p-4 font-serif text-4xl text-white"
				>
					<icons.star12Filled />
				</Button>
			{/each}
		</Panel>
	{/each}
</div>
