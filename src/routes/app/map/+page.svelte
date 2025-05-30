<script lang="ts">
	import Button from '$lib/components/base/Button.svelte'
	import Panel from '$lib/components/base/Panel.svelte'
	import { BgColors, Variants } from '$lib/types'
	import { icons } from '$lib/components/base/icons'
	import { goto } from '$app/navigation'

	// @TODO: dynamic levels when changing from Math/English
	// currently working on Math module levels

	const variant = [
		Variants.BITTERSWEET_RED,
		Variants.TEXAS_YELLOW,
		Variants.PICTON_BLUE,
		Variants.FERN_GREEN,
		Variants.AMETHYST_PURPLE
	]

	const activities = [
		{
			title: 'Counting Numbers',
			enabled: [1]
		},
		{
			title: 'Basic Addition',
			enabled: [1]
		},
		{
			title: 'Number Comparison',
			enabled: [1]
		},
		{
			title: 'Understanding Zero',
			enabled: [1]
		},
		{
			title: 'Number Order',
			enabled: [1]
		}
	]

	const isEnabled = (enabledList: number[], item: number) =>
		enabledList?.includes(item)
</script>

<div class="flex flex-col items-center gap-10 py-10">
	{#each activities as activity, activityIndex (activityIndex)}
		<div
			class={[
				'bg-' + variant[activityIndex],
				'rounded-lg p-4 text-2xl font-bold text-white'
			]}
		>
			{activity.title}
		</div>

		<div class="mb-8 grid grid-cols-5 gap-4">
			{#each { length: 5 }, btnIndex (btnIndex)}
				{@const level = btnIndex + 1}
				<Button
					variant={variant[activityIndex]}
					rounded
					disabled={!isEnabled(activity.enabled, level)}
					class="p-4 font-serif text-4xl text-white"
					onclick={() => goto(`#/app/activity/multiple-choice`)}
				>
					{#if isEnabled(activity.enabled, level)}
						<icons.star12Filled />
					{:else}
						<icons.lockClosed16Filled />
					{/if}
				</Button>
			{/each}
		</div>
	{/each}
</div>
