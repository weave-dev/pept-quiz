<script lang="ts">
	import { icons } from '$lib/components/base/icons'

	import Button from '$lib/components/base/Button.svelte'
	import RadioButton from '$lib/components/base/RadioButton.svelte'
	import { BgColors, Variants } from '$lib/types'
	import { goto } from '$app/navigation'

	let selectedSubject = $state('')

	const subjects = [
		{
			id: 1,
			name: 'Math',
			value: 'math',
			icon: icons.abacus
		},
		{
			id: 2,
			name: 'English',
			value: 'english',
			icon: icons.inputLatinLetters
		}
	]

	const redirectToMap = () => goto('#/app/map')
</script>

<div class="grid h-full place-items-center">
	<div class="flex flex-col items-center gap-10">
		<h1 class="text-center font-serif text-5xl font-bold">
			<span class="block">Choose a subject</span>
		</h1>

		<div class="flex items-center gap-8">
			{#each subjects as subject}
				<RadioButton
					variant={BgColors.NEUTRAL_LIGHT}
					bind:group={selectedSubject}
					value={subject.value}
					class="flex size-40 flex-col items-center gap-3 bg-white p-6"
				>
					<subject.icon class="text-7xl" />
					<span class="font-bold">{subject.name}</span>
				</RadioButton>
			{/each}
		</div>

		<Button variant={Variants.FERN_GREEN} onclick={redirectToMap}>Next</Button>
	</div>
</div>
