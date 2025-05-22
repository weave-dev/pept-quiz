<script lang="ts">
	import { icons } from '$lib/components/base/icons';

	import Button from '$lib/components/base/Button.svelte';
	import { BgColors } from '$lib/types';

	const subjects = [
		{
			name: 'Math',
			icon: icons.abacus
		},
		{
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
			{#each subjects as subject}
				<Button
					variant={BgColors.NEUTRAL_LIGHT}
					class="flex size-40 flex-col items-center gap-3 bg-white p-6"
				>
					<subject.icon class="text-7xl" />
					<span class="font-bold">{subject.name}</span>
				</Button>
			{/each}
		</div>

		<Button variant={BgColors.FERN_GREEN}>Next</Button>
	</div>
</div>
