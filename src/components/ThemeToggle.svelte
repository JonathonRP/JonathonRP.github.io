<svelte:options runes />
<script lang="ts">
	const darkmodeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	const state = $state({ isDark: darkmodeMediaQuery.matches });
	const themeAttr = "data-theme";
	const scheme = "color-scheme";
	
	$effect(() => {
		const handler = (e: MediaQueryListEvent) => {
			state.isDark = e.matches;
		};

		// @ts-expect-error
		'addEventListener' in darkmodeMediaQuery ? darkmodeMediaQuery.addEventListener("change", handler) : darkmodeMediaQuery.addListener(handler);

		// @ts-expect-error
		return () => 'removeEventListener' in darkmodeMediaQuery ? darkmodeMediaQuery.removeEventListener("change", handler) : darkmodeMediaQuery.removeListener(handler);
	});
	
	$effect(() => {
		const theme = state.isDark ? "dark" : "light";
		document.documentElement.setAttribute(themeAttr, theme);
		document.documentElement.style.setProperty(scheme, theme);
	});

	function toggle_theme(event: any) {
		state.isDark = !state.isDark;
	}
</script>

<input class="theme-switch" id="theme-switcher" type="checkbox" hidden checked={state.isDark} onclick={toggle_theme} />
<label
	for="theme-switcher"
	class="theme-switch__label"
	aria-label="switch theme between 'light' or 'dark'"
	title="theme toggle">
</label>

<style lang="scss">
	@use '@/styles/abstracts/mixins' as *;

	.theme-switch {
		&__label {
			--flow-space: var(--default-space);
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: var(--flow-space);
			cursor: pointer;
			font-size: large;
			line-height: 1.5rem;
		}

		&__label::before,
		&__label::after,
		&:checked + &__label::before,
		&:checked + &__label::after {
			margin-block: 0.425rem;
		}

		&__label::before,
		&:checked + &__label::before {
			position: absolute;
			// top: 0;
			// transform: translate(40%, 40%);
			color: var(--text-color);
			font-size: 1.25rem;
		}

		&__label::after,
		&:checked + &__label::after {
			content: '';
			display: inline-block;
			height: var(--xlarge-space);
			width: var(--xlarge-space);
			border-radius: var(--small-space);
			box-shadow: 0 0 8px rgb(255 255 255 / 0.3);
			clear: both;
		}

		&__label::after {
			background-color: var(--theme-toggle-color);
		}
	}
</style>
