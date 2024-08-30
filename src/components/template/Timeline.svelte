<svelte:options runes />
<script lang="ts">
	import { format, parseISO } from 'date-fns';

	const {
		experiences,
		work = false,
		certificates = false,
		education = false
	}: {
		experiences: {
			image: string;
			startDate?: string;
			endDate?: string;
			date?: string;
			eventDate?: string;
			name?: string;
			institution?: string;
			position?: string;
			issuer?: string;
			area?: string;
			summary?: string;
			useSummary?: boolean;
			highlights?: string[];
			studyType?: string;
		}[];
		work: boolean;
		certificates: boolean;
		education: boolean;
	} = $props();

	const Logo = (image: string) => {
		return Object.entries(import.meta.glob('../../images/*.{png,jpg}', { eager: true, as: 'url' })).reduce(
			(prev, [key, value]) => ({ ...prev, [key.substring(key.indexOf(image))]: value }),
			{} as Record<string, string>
		)[image];
	};

	let icon = $derived(work ? 'timeline__icon' : null);
</script>

{#if !work}
	<h2
		id="{certificates ? 'cert' : 'ed'}-title"
		class="heading__icon timeline__section-heading"
		data-icon={certificates ? 'certificates' : 'education'}>
		{certificates ? 'Certificates' : 'Education'}
	</h2>
{/if}
<div class="timeline" data-type={work ? 'professional' : ''}>
	{#each experiences as {startDate, endDate, date, eventDate = format(
			parseISO((work ? startDate : certificates ? date : endDate) ?? ''),
			'MMM yyyy'
		), ...experience} (eventDate)}
		<div class="timeline__item">
			<time class="timeline__duration" datetime={eventDate}>{eventDate}</time>
			{#if experience.image}
				{@const alt = experience.image.split('.').reverse().pop() + ' Logo.'}
				<div class="timeline__logo">
					{#await Logo(experience.image)}
						<img alt={'Loading - ' + alt} width="42" height="42" />
					{:then src}
						<img {src} {alt} width="42" height="42" />
					{/await}
				</div>
			{:else}
				<div class="timeline__point"></div>
			{/if}
			<div class="timeline__header">
				<span class={icon} data-icon={work ? 'work' : ''} />
				<div class="timeline__title">{education ? experience.institution : experience.name}</div>
			</div>
			<div class="timeline__body">
				{#if work}
					<p class="timeline__heading">{experience.position}</p>
					{#if experience.useSummary}
						<p>{experience.summary}</p>
					{:else if experience.highlights}
						<ul class="timeline__responsabilities-achievements flow">
							{#each experience.highlights as highlight}
								<li>
									{highlight}
								</li>
							{/each}
						</ul>
					{/if}
				{:else if certificates}
					<p class="timeline__issuer">
						{experience.issuer}
					</p>
				{:else if education}
					<p class="timeline__heading">{experience.area}</p>
					<p class="timeline__degree">
						{experience.studyType}
					</p>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	@use '@/styles/abstracts/mixins' as *;
	@use '@/styles/base/typography' as *;

	.timeline {
		--logo-size: 42px;
		--image-size: var(--xlarge-space);

		padding: revert;
		padding-top: 5px;
		position: relative;
		// width: 90%;

		&__section-heading {
			@extend .heading;
			position: relative;
			margin-inline: var(--xsmall-space);
			// background-color: var(--bg-color);
			margin-block-start: calc(-1 * var(--default-space));
			// margin-block-end: 1em;
			padding-block-start: var(--default-space);
			width: 96%;
			border-bottom: 2px solid var(--primary-color);
		}

		&::before {
			content: '';
			position: absolute;
			top: 0;
			height: 50%;
			width: 1px;
			border-left: 2px solid var(--primary-color);
		}

		&__item {
			position: relative;
			cursor: pointer;
			margin: var(--default-space) var(--xlarge-space);
			padding: var(--default-space) var(--medium-space);
			box-shadow: 0px 3px 6px -1px rgba(0, 0, 0, 0.2);
			transition: all 500ms;

			&:hover {
				box-shadow: 1px 6px 16px -1px rgba(0, 0, 0, 0.1);

				.timeline__logo {
					border: 2px solid var(--accent-color);
				}
			}

			// &::after,
			// &:first-child::after {
			// 	content: '';
			// 	width: 2px;
			// 	height: 80%;
			// 	background: var(--primary-color);
			// 	position: absolute;
			// 	top: -1.4rem;
			// 	// transform: translateY(-50%);
			// 	left: -2rem;
			// 	z-index: -1;
			// }
		}

		&__logo {
			box-sizing: content-box;
			position: absolute;
			top: 0;
			left: calc(-1 * var(--image-size));
			width: var(--logo-size);
			height: var(--logo-size);
			display: flex;
			align-items: center;
			background: #fff;
			border: 2px solid var(--primary-color);
			border-radius: 50%;
			transform: translateY(-50%, 80%);
			transition: all 500ms;
			overflow: hidden;

			// img {
			// 	display: block;
			// 	width: var(--image-size);
			// 	height: var(--image-size);
			// 	transform: translate(28%, 28%);
			// }

			// img[alt='70-486 Logo'] {
			// 	transform: scale(2) translate(0.3rem, 11%);
			// }

			// img[alt='MitraTech+Quovant'] {
			// 	transform: scale(1.6) translate(18%, 18%);
			// }

			// img[alt='MTSU'] {
			// 	width: calc(var(--logo-size) - 0.7px);
			// 	transform: scale(0.9) translate(4%, 32%);
			// }

			// :global(img[alt='MTSU Logo.']) {
			// 	// top: var(--xsmall-space);
			// 	// padding-top: 0.1rem;
			// }

			@include respond-to(sm) {
				transform: translate(-50%, 15%);
			}
		}

		&__point {
			--point-size: calc(var(--logo-size) / 3);
			--point-radius: calc(var(--point-size) / 2);

			box-sizing: content-box;
			position: absolute;
			top: 0;
			left: calc(-1 * var(--point-radius));
			width: var(--point-size);
			height: var(--point-size);
			background: var(--primary-color);
			border: 2px solid var(--primary-color);
			border-radius: 50%;
			transform: translate(-50%, 80%);
			transition: all 500ms;
			overflow: hidden;

			@include respond-to(sm) {
				transform: translate(-50%, 15%);
			}
		}

		&__header {
			display: flex;
			flex-flow: row;
			justify-content: flex-start;
		}	

		&__duration {
			font-weight: bold;

			@include respond-to(sm) {
				position: absolute;
				top: 20px;
				left: -100px;
				line-height: 1.2;
				height: 20px;
				width: 10%;
				transform: translateX(-25%);
				text-align: right;
			}
		}

		&__title {
			margin: 0;
			font-family: var(--secondary-ff);
			// font-family: "Pacifico", cursive;
			line-height: 1.5;
			font-size: 0.99rem;
			color: var(--accent-color);
			border-bottom: 1px solid var(--primary-color);
			width: 100%;
		}

		&__heading {
			margin: 0;
			line-height: 2;
			font-weight: bold;
		}

		&__responsabilities-achievements {
			display: grid;
			padding-inline-start: var(--tiny-space);

			> li {
				&::marker {
					content: '\203a   ';
					color: var(--accent-color);
					font-size: 20px;
				}
			}

			@include respond-to(sm) {
				padding-inline-start: var(--large-space);

				> li {
					&::marker {
						content: '\2192     ';
						font-size: unset;
					}
				}
			}
		}

		&__issuer {
			margin-block-end: 0;
		}

		&__degree {
			margin-block: 0;
		}

		&[data-type='professional'] {
			.timeline__item {
				&::after {
					content: '';
					width: 2px;
					height: 100%;
					margin: var(--huge-space) 0;
					background: var(--primary-color);
					position: absolute;
					top: 0;
					// transform: translateY(-50%);
					left: -2rem;
					z-index: -1;
				}

				&:last-child {
					&::after {
						content: none;
					}
				}
			}

			.timeline__body {
				margin: 0 var(--tiny-space);
			}

			.timeline__logo {
				transform: translate(-50%, 100%);

				@include respond-to(sm) {
					transform: translate(-50%, 55%);
				}
			}

			.timeline__duration {
				@include respond-to(sm) {
					top: var(--xlarge-space);
				}
			}
		}

		@include respond-to(sm) {
			// max-width: 750px;
			padding-inline-start: var(--gigentic-space);
		}
	}
</style>
