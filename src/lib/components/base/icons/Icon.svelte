<script lang="ts">
	import { icons } from '.';

	type Props = {
		icon: keyof typeof icons;
	};

	const { icon, ...rest }: Props = $props();
	const IconComponent = $derived(icons[icon]);
</script>

<IconComponent {...rest} />
