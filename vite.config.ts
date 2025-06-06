import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import createSvgSpritePlugin from 'vite-plugin-svg-sprite'

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		Icons({ compiler: 'svelte' }),
		createSvgSpritePlugin({
			exportType: 'vanilla',
			include: ['**/svg-icons/*.svg', '**/icons/*.svg']
		})
	]
})
