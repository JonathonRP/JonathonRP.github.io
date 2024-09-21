<svelte:options runes />
<script lang="ts">
	import { format, parseISO } from 'date-fns';
	import { Work, Education, Certificates } from  '@/lib';

	type TimelineItemType = Work | Education | Certificates;

	const {
		experiences,
		type
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
		type: TimelineItemType
	} = $props();

	const Logo = (image: string) => {
		return Object.entries(import.meta.glob('@/images/*.{png,jpg}', { eager: true, query: '?url', import: 'default' })).reduce(
			(prev, [key, value]) => ({ ...prev, [key.substring(key.indexOf(image))]: value as string }),
			{} as Record<string, string>
		)[image];
	};
</script>

{#if type.heading}
	<h2
		id="{type.heading.id}-title"
		class="heading__icon timeline__section-heading"
		data-icon={type.heading.icon}>
		{type.heading.title}
	</h2>
{/if}
<div class="timeline" data-type={type.experience}>
	{#each experiences as {startDate, endDate, date, eventDate = format(
			parseISO((type.work ? startDate : type.certificates ? date : endDate) ?? ''),
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
			<div class="timeline__content">
				{#if type.icon}
					<span class="timeline__icon" data-icon={type.icon} />
				{/if}
				<div>
					<h1 class="timeline__header">{type.education ? experience.institution : experience.name}</h1>
					<div class="timeline__body">
						{#if type.work}
							<h2 class="timeline__sub">{experience.position}</h2>
							{#if experience.useSummary}
								<p>{experience.summary}</p>
							{:else if experience.highlights}
								<ul class="timeline__responsabilities-achievements [ flow ]">
									{#each experience.highlights as highlight}
										<li>
											{highlight}
										</li>
									{/each}
								</ul>
							{/if}
						{:else if type.certificates}
							<p class="timeline__issuer">
								{experience.issuer}
							</p>
						{:else if type.education}
							<h2 class="timeline__sub">{experience.area}</h2>
							<p class="timeline__degree">
								{experience.studyType}
							</p>
						{/if}
					</div>
				</div>
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
		--flow-space: var(--small-space);
		// --flow-space: var(--micro-space);

		padding: revert;
		padding-top: 5px;
		position: relative;
		padding-inline-start: var(--gigentic-space);
		// width: 90%;

		&__section-heading {
			@extend .heading;
			position: relative;
			// margin-inline: var(--xsmall-space);
			// background-color: var(--bg-color);
			margin-block-start: calc(-1 * var(--default-space));
			// margin-block-end: 1em;
			padding-block-start: var(--default-space);
			margin-inline-end: var(--huge-space);
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

		&__duration {
			font-weight: bold;
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
			// 	line-height: 1.2;
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
			transform: translate(-50%, 40%);
			transition: all 500ms;
			overflow: hidden;
		}

		&__content {
			display: flex;
			flex-flow: row;
			justify-content: flex-start;
			[data-type='professional'] & {
				flex-direction: row-reverse;
				margin-inline: var(--small-space);
			}
		}

		&__header {
			margin: 0;
			padding: 0;
			font-family: var(--secondary-ff);
			// font-family: "Pacifico", cursive;
			line-height: 1.5;
			font-size: 0.99rem;
			color: var(--accent-color);
			border-bottom: 1px solid var(--primary-color);
			width: 100%;
		}

		&__sub {
			margin: 0;
			padding: 0;
			line-height: 2;
			font-weight: bold;
			font-size: 0.75rem;
		}

		&__icon {
			position:absolute;
		}

		&__body {
			[data-type='professional'] & {
				margin: 0 var(--tiny-space);
			}
		}

		&__responsabilities-achievements {
			display: grid;
			// padding-inline-start: var(--tiny-space);
			padding-inline-start: var(--large-space);
			padding-block-start: var(--flow-space);

			> li {
				&::marker {
					content: '\2192     ';
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
