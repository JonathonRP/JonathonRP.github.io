<script lang="ts">
	import { Certificates, Education, type TimelineType, Work } from '@/lib';
	import type { CollectionEntry } from 'astro:content';
	import { format, parseISO } from 'date-fns';

	type Props = {
		[K in keyof TimelineType]: {
			events: CollectionEntry<'resume'>['data'][K];
			type: K;
		};
	}[keyof TimelineType];

	const {
		events,
		type,
	}: Props = $props();

	const { heading, experienceKind, icon } = $derived(
		type === 'work'
			? new Work()
			: type === 'education'
			? new Education()
			: type === 'certificates'
			? new Certificates()
			: { heading: undefined, experienceKind: undefined, icon: undefined },
	);

	// collect images here await import, globbing?
	const images = import.meta.glob('../../src/images/logos/*.{jpg,png}', {
		eager: true,
		query: {
			enhanced: true,
			w: 42,
		},
	});
</script>

{#if heading}
	<h2
		id="{heading.id}-title"
		class="timeline__section-heading"
	>
		{heading.title}
	</h2>
{:else}
	<h2 class="timeline__section-heading" data-sr-only>
		Experience
	</h2>
{/if}
<div class="timeline" data-type={experienceKind}>
	{#each events as exp, indx (indx)}
		{@const eventDate = format(
			parseISO(
				type === 'work'
					? exp.startDate
					: type === 'certificates'
					? exp.date
					: type === 'education'
					? exp.endDate
					: '',
			),
			'MMM yyyy',
		)}
		{@const alt = exp.image.split('.').reverse().pop() + ' Logo.'}
		<div class="timeline__item">
			<time class="timeline__duration" datetime={eventDate}>{eventDate}</time>
			{#if exp.image}
				<div class="timeline__logo">
					<enhanced:img
						src={images[`../../src/images/logos/${exp.image}`].default}
						{alt}
						width="42"
						height="42"
						loading="eager"
						decoding="auto"
					/>
				</div>
			{:else}
				<div class="timeline__point"></div>
			{/if}
			<div class="timeline__content">
				<div style="width: 100%">
					<h3 class="timeline__header">
						{type === 'education' ? exp.institution : exp.name}
					</h3>
					<div class="timeline__body">
						{#if type === 'work'}
							<h4 class="timeline__sub">{exp.position}</h4>
							{#if exp.summary}
								<p>{exp.summary}</p>
							{/if}
							{#if exp.highlights}
								<ul class="timeline__responsabilities-achievements [ flow ]">
									{#each exp.highlights as highlight}
										<li>
											{highlight}
										</li>
									{/each}
								</ul>
							{/if}
						{:else if type === 'certificates'}
							<p class="timeline__issuer">
								{exp.issuer}
							</p>
						{:else if type === 'education'}
							<h4 class="timeline__sub">{exp.area}</h4>
							<p class="timeline__degree">
								{exp.studyType}
							</p>
						{/if}
					</div>
				</div>
				<span class="timeline__icon" data-icon={icon}></span>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	@use 'sass:selector' as *;
	@use '../../src/styles/global/typography' as *;

	.timeline {
		--logo-size: 42px;
		--image-size: var(--xlarge-space);
		--flow-space: var(--small-space);
		// --flow-space: var(--xsmall-space);

		padding-top: var(--tiny-space);
		position: relative;
		padding-inline-start: var(--gigentic-space);
		// width: 90%;

		&__section-heading:not([data-sr-only]) {
			@extend .heading;
			font-family: var(--secondary-ff);
			// line-height: 1.5;
			position: relative;
			// margin-inline: var(--xsmall-space);
			// background-color: var(--bg-color);
			margin-block-start: calc(-1 * var(--default-space));
			// margin-block-end: 1em;
			padding-block-start: var(--default-space);
			margin-inline-end: var(--large-space);
			border-bottom: 2px solid var(--primary-color);
		}

		&::before {
			content: '';
			position: absolute;
			top: 0;
			height: 50%;
			width: 2px;
			border-left: 1px solid var(--primary-color);
		}

		&__item {
			position: relative;
			cursor: pointer;
			margin: var(--default-space) var(--xlarge-space);
			padding: var(--default-space) var(--medium-space);
			box-shadow: 0px 3px 6px -1px rgba(0, 0, 0, 0.2);
			border-radius: var(--xsmall-space);
			transition: all 500ms;

			&:hover {
				box-shadow: 1px 6px 16px -1px rgba(0, 0, 0, 0.1);

				.timeline__logo {
					border: 2px solid var(--accent-color);
				}
			}

			&:where(:not(:last-child)) {
				&::after {
					content: '';
					width: 1px;
					height: 100%;
					margin: var(--huge-space) 0;
					background: var(--primary-color);
					position: absolute;
					top: 0;
					// transform: translateY(-5%);
					left: -2rem;
					z-index: -1;
				}
			}

			// &::after,
			// &:first-child::after {
			// 	content: '';
			// 	width: 1px;
			// 	height: 100%;
			// 	margin: var(--huge-space) 0;
			// 	background: var(--primary-color);
			// 	position: absolute;
			// 	top: 0;
			// 	// transform: translateY(-50%);
			// 	left: -2rem;
			// 	z-index: -1;
			// }
		}

		&__duration {
			font-weight: 500;
			position: absolute;
			top: 0;
			left: -85px;
			line-height: 1.2;
			height: 20px;
			width: 10%;
			transform: translateX(-25%);
			text-align: center;

			// @include respond-to(sm) {
			// 	position: absolute;
			// 	top: 0;
			// 	left: -85px;
			// 	height: 20px;
			// 	width: 10%;
			// 	transform: translateX(-25%);
			// 	text-align: right;
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
			transform: translate(-50%, 40%);
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

			// @include respond-to(sm) {
			// 	transform: translate(-50%, 15%);
			// }
		}

		&__point {
			--point-size: calc(var(--image-size) * 0.875);

			box-sizing: content-box;
			position: absolute;
			top: 2%;
			left: calc(-1 * var(--image-size));
			width: var(--point-size);
			height: var(--point-size);
			background: var(--primary-color);
			border: 2px solid var(--primary-color);
			border-radius: 50%;
			transform: translate(-50%, 40%);
			transition: all 500ms;
			overflow: hidden;
		}

		&__content {
			display: flex;
			flex-flow: row;
			flex-direction: row-reverse;
			justify-content: flex-start;
			margin-inline: var(--small-space);
			// [data-type='professional'] & {
			// }
		}

		&__header {
			// margin: 0;
			// padding: 0;
			font-family: var(--secondary-ff);
			// font-family: "Pacifico", cursive;
			font-optical-sizing: auto;
			font-style: normal;
			line-height: 1.5;
			font-size: 0.99rem;
			font-weight: 600;
			color: var(--accent-color);
			border-bottom: 1px solid var(--primary-color);
			width: 100%;
		}

		&__sub {
			// margin: 0;
			// padding: 0;
			// line-height: 2;
			line-height: 1.5;
			font-weight: 500;
			// font-size: 0.75rem;
		}

		&__icon {
			position: absolute;
		}

		&__body {
			margin: 0 var(--tiny-space);
		}

		#{unify('.timeline__responsabilities-achievements', 'ul')} {
			display: grid;
			padding-inline-start: var(--flow-space);
			padding-block-start: var(--flow-space);

			> li {
				max-width: 77ch;
				padding-inline-start: var(--flow-space);

				&::marker {
					content: '\2192';
					color: var(--accent-color);
					// font-size: unset;
				}
			}

			// > li {
			// 	&::marker {
			// 		// content: '\203a  ';
			// 		// color: var(--accent-color);
			// 		// font-size: 20px;
			// 	}
			// }
		}

		&__issuer {
			margin-block-end: 0;
		}

		&__degree {
			margin-block: 0;
		}

		// @include respond-to(sm) {
		// 	--flow-space: var(--small-space);
		// }
	}
</style>
