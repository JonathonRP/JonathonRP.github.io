<script lang="ts">
	import { browser } from "$app/env";

	if (browser) {
		let darkmode = window.matchMedia('(prefers-color-scheme: dark)').matches;

		let toggle:HTMLInputElement = document.querySelector('.theme-switch');

		let themeAttr = 'data-theme',
			scheme = 'color-scheme',
			theme = 'dark';

		toggle.checked = darkmode;

		toggle.addEventListener('change', toggle_theme);

		function toggle_theme(event: any) {
			if (event.target.checked) {

				document.documentElement.setAttribute(themeAttr, theme);
				document.documentElement.style.setProperty(scheme, theme);
			} else {
				document.documentElement.removeAttribute(themeAttr);
				document.documentElement.style.removeProperty(scheme);
			}
		}
	}
</script>

<input class="theme-switch" id="theme-switcher" type="checkbox" hidden />
<label
	for="theme-switcher"
	class="theme-switch__label"
	aria-label="switch theme between 'light' or 'dark'"
/>

<style lang="scss">
	@use 'static/styles/abstracts/mixins' as *;

	@include icon('theme-switch__label') {
		content: '\f186';
	}

	@include icon('theme-switch:checked + .theme-switch__label') {
		content: '\f185';
	}

	.theme-switch {
		&__label {
			visibility: hidden;
			position: relative;
			padding-inline: var(--default-space);
			cursor: pointer;
		}

		&__label::before,
		&__label::after,
		&:checked + &__label::before,
		&:checked + &__label::after {
			visibility: visible;
			margin-block: 0.425rem;
		}

		&__label::before,
		&:checked + &__label::before {
			position: absolute;
			top: 0;
			transform: translate(50%, 50%);
			color: var(--text-color);
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
			background-color: #a17ece;
		}

		&:checked + &__label::after {
			background-color: #eca74c;
		}
	}
</style>
