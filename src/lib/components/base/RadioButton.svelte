<script lang="ts">  
    import { BgColors } from "$lib/types";
    import type { BgColorsValues } from "$lib/types";
	import type { Snippet } from "svelte";
    import { twMerge } from "tailwind-merge";

    type Props = {
        variant: BgColorsValues;
        class?: string;
        value: string;
        group?: string;
        children: Snippet;
    }

    let {
        variant = BgColors.NEUTRAL,
        class: customClass,
        value,
        group = $bindable(),
        children,
        ...rest
    }: Props = $props();

    const bgColor = $derived(
        !variant.includes('dark')
            ? variant.includes('gray')
                ? 'bg-gray-700'
                : `${variant}-darker`
            : `${variant}-darker`
    );
    
    // Darker part of the button (shadow)
    const btnClass = $derived(
		twMerge([
			'rounded-lg active:[&>span]:translate-y-0',
			'cursor-pointer select-none inline-flex',
			bgColor,
		])
	);
    
    const frontBorder = $derived(['border-2', bgColor.replace('bg', 'border')]);
    const txtColor = $derived(
		bgColor.replace('bg', 'text').replace('-darker', '').replace('-dark', '')
	);

    const textColor = $derived([
		txtColor.includes('gray') ? txtColor : txtColor + '-content'
	]);

    // The highlighted part of the button on top of the shadow
    const frontClass = $derived(
		twMerge([
			`transition-all duration-75 -translate-y-2 rounded-lg px-8 py-2 peer-checked:translate-y-0`,
			`font-bold grow`,
			frontBorder,
			textColor,
			variant,
			customClass
		])
	);
</script>

<label class="group {btnClass}">
    <input type="radio" class="peer sr-only" bind:group={group} {value}>
    <div class="{frontClass} group-hover:-translate-y-1.5">
        {@render children()}
    </div>
</label>

