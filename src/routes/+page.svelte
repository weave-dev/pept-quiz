<script lang="ts">
	import { createAvatar } from '@dicebear/core';
	import { funEmoji } from '@dicebear/collection';
	import { nanoid } from 'nanoid';
	import Button from '$lib/components/base/Button.svelte';
	import { BgColors } from '$lib/types';
	import { goto } from '$app/navigation';

	let id = $state(nanoid(4));
	let name = $state('');

	const handleInput = (value: string) => {
		if (value.length == 21) {
			return;
		}

		name = value;
	};

	const avatar = $derived(
		createAvatar(funEmoji, {
			seed: `${name}#${id}`,
			eyes: [
				'closed',
				'closed2',
				'cute',
				'glasses',
				'love',
				'pissed',
				'shades',
				'sleepClose',
				'stars',
				'wink',
				'wink2',
				'plain'
			],
			mouth: [
				'cute',
				'faceMask',
				'kissHeart',
				'lilSmile',
				'smileLol',
				'smileTeeth',
				'tongueOut',
				'wideSmile'
			]
		}).toDataUri()
	);
</script>

<div class="grid h-full place-items-center">
	<div class="flex flex-col items-center gap-10">
		<h1 class="text-center font-serif text-5xl font-bold">
			<span class="block"> Hello </span>
			<span class="text-6xl">
				{name ? `${name}!` : "what's your name?"}
			</span>
		</h1>

		<div class="flex items-center gap-8">
			<div
				class="border-picton-blue-content h-48 w-48 overflow-hidden rounded-full border-10"
			>
				<img class="h-full w-full" src={avatar} alt="avatar-new" />
			</div>

			<div class="flex flex-col items-center gap-8">
				<input
					type="text"
					class="rounded-lg font-semibold"
					bind:value={() => name, handleInput}
					placeholder="Your name"
				/>

				<Button
					variant={BgColors.FERN_GREEN}
					onclick={() => goto('#/select-subject')}>Let's go!</Button
				>
			</div>
		</div>
	</div>
</div>
