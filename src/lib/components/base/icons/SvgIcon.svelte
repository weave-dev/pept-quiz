<script lang="ts">
	import { icons } from './svg'

	type Props = {
		icon: keyof typeof icons
		class?: string | string[]
	}

	const { icon, class: svgClass }: Props = $props()
	const href = $derived(`#${icons[icon]}`)
</script>

<svg
	class={svgClass}
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden="true"
>
	<use xlink:href={href} />
</svg>

<style scoped lang="postcss">
	svg {
		display: inline-block;
		vertical-align: middle;
	}
</style>
