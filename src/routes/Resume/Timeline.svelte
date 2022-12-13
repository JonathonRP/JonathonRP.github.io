<script lang="ts">
	export let experiences: { image: string, startDate?: string, endDate?: string, date?: string, name?: string, institution?: string, position?: string, issuer?: string, area?: string, summary?: string, highlights?: string[], studyType?: string }[];
    export let work:boolean = false, certificates:boolean = false, education:boolean = false;

	const Logo = (image: string) => {
		return new URL(image,"$images").href;
	}

    $: icon = work ? "timeline__icon" : null;
</script>
{#if !work}
	<h2 id="{certificates ? "cert" : "ed"}-title" class="heading__icon timeline__section-heading" data-icon="{ certificates ? "certificates" : "education"}">
		{certificates ? "Certificates" : "Education"}
	</h2>
{/if}
<ol class="timeline" data-type={work ? "professional" : ""}>
	{#each experiences as experience (experience.date = Intl.DateTimeFormat(navigator.language, {month: 'short', year: 'numeric'}).format(new Date(`${work ? experience.startDate : certificates ? experience.date : experience.endDate}`)))}
		<li class="timeline__item">
			<div class="timeline__logo">
				<img src={Logo(experience.image)} alt={experience.image.split('/').pop()?.split('.').slice(0, -1)[0]} />
			</div>
			<div class="{icon} timeline__header" data-icon={work ? "work" : ""}>
				<time class="timeline__duration" datetime={experience.date}> {experience.date} </time>
				<div class="timeline__title">{education ? experience.institution : experience.name}</div>
			</div>
			<div class="timeline__body">
				{#if work}
					<p class="timeline__heading">{experience.position}</p>
					{#if experience.summary}
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
		</li>
	{/each}
</ol>

<style lang="scss">
	@use '$styles/abstracts/mixins' as *;
	@use '$styles/base/typography' as *;

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
			height: 100%;
			width: 1px;
			border-left: 2px solid var(--primary-color);

			@include respond-to(md) {
				height: 50%;
			}
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
		}

		&__logo {
			box-sizing: content-box;
			position: absolute;
			top: 0;
			left: calc(-1 * var(--image-size));
			width: var(--logo-size);
			height: var(--logo-size);
			background: #fff;
			border: 2px solid var(--primary-color);
			border-radius: 50%;
			transform: translate(-50%, 80%);
			transition: all 500ms;
			overflow: hidden;

			:global(.wrapper) {
				padding: 0;
			}

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

			:global(img[alt="MTSU"]) {
				// top: var(--xsmall-space);
				padding-top: var(--xsmall-space);
			}

			@include respond-to(sm) {
				transform: translate(-50%, 15%);
			}
		}

		&__header {
			display: flex;
			flex-flow: row wrap;
			justify-content: flex-start;
		}

		%badge {
			transform: translateY(6px);
			padding-inline-end: var(--tiny-space);

			@include respond-to(sm) {
				transform: translateY(-10px);
			}
		}

		&__icon {

			@at-root &[data-icon='work']::before {
				--icon: '\f0b1';
			}

		}

		@include icon('timeline__icon') {
			@extend %badge;

			content: var(--icon);
			// @at-root #{selector-unify(&, "[data-icon='work']")}{
			// 	content: '\f0b1';
			// }
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
			font-family: 'Poppins', sans-serif;
			// font-family: "Pacifico", cursive;
			font-size: .99rem;
			line-height: 1;
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
			&::before {
				@include respond-to(sm) {
					height: 82%;
				}
			}

			.timeline__item {
				padding-block-start: calc(var(--default-space) + .4rem);
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
