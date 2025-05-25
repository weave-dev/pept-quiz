<script lang="ts">
	import { icons } from '$lib/components/base/icons';

	import Button from '$lib/components/base/Button.svelte';
	import RadioButton from '$lib/components/base/RadioButton.svelte';
	import { BgColors } from '$lib/types';

	const subjects = [
		{
			id: 1,
			name: 'Math',
			icon: icons.abacus
		},
		{
			id: 2,
			name: 'English',
			icon: icons.inputLatinLetters
		}
	];
</script>

<div class="bg-picton-blue grid h-full place-items-center">
	<div class="flex flex-col items-center gap-10">
		<h1 class="text-center font-serif text-5xl font-bold">
			<span class="block">Choose a subject</span>
		</h1>

		<div class="flex items-center gap-8">
			{#each subjects as subject, index}
				<RadioButton variant={BgColors.NEUTRAL_LIGHT} onclick={() => { console.info(subject.id) }} class="flex size-40 flex-col items-center gap-3 bg-white p-6" name="subject" id={"subject-" + subject.id}>
					<subject.icon class="text-7xl" />
					<span class="font-bold">{subject.name}</span>
				</RadioButton>
			{/each}
		</div>
		
		<Button variant={BgColors.FERN_GREEN}>Next</Button>
	</div>
</div>
