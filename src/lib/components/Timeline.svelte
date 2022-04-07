<script lang="ts">
	import path from 'path';
	import Image from 'svelte-image';

	export let experiences: { image: string, startDate?: string, endDate?: string, date?: string, name?: string, institution?: string, position?: string, issuer?: string, area?: string, highlights?: string[], studyType?: string }[];
    export let work:boolean = false, certifications:boolean = false, education:boolean = false;

    $: icon = work ? "timeline__icon" : null;
</script>

<ol class="timeline" data-type:professional={work}>
	{#each experiences as experience (experience.date = new Date(`${work ? experience.startDate : certifications ? experience.date : experience.endDate}`).toLocaleDateString(navigator.language, {month: 'short', year: 'numeric'}))}
		<li class="timeline__item">
			<div class="timeline__logo">
				<Image src={experience.image} alt={path.parse(experience.image).name} />
			</div>
			<div class="{icon} timeline__header" data-icon:work>
				<time class="timeline__duration" datetime="{experience.date}"> {experience.date} </time>
				<div class="timeline__title">{education ? experience.institution : experience.name}</div>
			</div>
			<div class="timeline__body">
				{#if work}
					<p class="timeline__heading">{experience.position}</p>
					{#if experience.highlights}
						<ul class="timeline__responsabilities-achievements">
							{#each experience.highlights as highlight}
								<li>
									{highlight}
								</li>
							{/each}
						</ul>
					{/if}
				{:else if certifications}
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
	@use '../styles/abstracts/mixins' as *;
	@use '../styles/base/typography' as *;

	.timeline {
		--logo-size: 50px;
		--image-size: var(--xlarge-space);

		list-style: none;
		margin: 0 auto;
		padding-top: 5px;
		position: relative;
		// width: 90%;

		&__section-heading {
			@extend .heading;
			position: relative;
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
			padding: var(--default-space) var(--large-space);
			line-height: 2;
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

			> img {
				display: block;
				width: var(--image-size);
				height: var(--image-size);
				transform: translate(28%, 28%);
			}

			> img[alt='70-486 Logo'] {
				transform: scale(2) translate(0.3rem, 11%);
			}

			> img[alt='Quovant Logo'] {
				transform: scale(1.6) translate(18%, 18%);
			}

			> img[alt='MT Logo'] {
				width: calc(var(--logo-size) - 0.7px);
				transform: scale(0.9) translate(4%, 32%);
			}

			@include respond-to(xl) {
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

			@include respond-to(xl) {
				transform: translateY(-10px);
			}
		}

        @include icon('timeline__icon') {
			@extend %badge;

            &[data-icon="work"]{
			    content: '\f0b1';
            }
        }

		&__duration {
			font-weight: bold;

			@include respond-to(xl) {
				position: absolute;
				top: 20px;
				left: -100px;
				line-height: 1.2;
				height: 20px;
				width: 15%;
				transform: translateX(-65%);
				text-align: right;
			}
		}

		&__title {
			margin: 0;
			font-family: 'Poppins', sans-serif;
			// font-family: "Pacifico", cursive;
			font-size: 20px;
			line-height: 1;
			color: var(--accent-color);
			border-bottom: 1px solid var(--primary-color);
			width: 100%;
		}

		&__body {
			font-size: 0.93rem;
		}

		&__head-line {
			margin: 0;
			font-size: 0.95rem;
			font-weight: bold;
		}

		&__responsabilities-achievements {
			display: grid;
			padding-inline-start: var(--tiny-space);
			margin-block-start: var(--small-space);
			line-height: 1.6;
			max-width: 60ch;

			> li {
				margin-block-start: var(--xsmall-space);

				&::marker {
					content: '\203a   ';
					color: var(--accent-color);
					font-size: 20px;
				}
			}

			@include respond-to(lg) {
				padding-inline-start: var(--xlarge-space);

				> li {
					&::marker {
						content: '\2192     ';
						font-size: unset;
					}
				}
			}
		}

		&__degree {
			margin-block-end: 0;
		}

		&[data-type='professional'] {
			&::before {
				@include respond-to(md) {
					height: 78%;
				}
				@include respond-to(xl) {
					height: 76%;
				}
			}

			.timeline__item {
				padding: var(--large-space);

				@include respond-to(xl) {
					margin-block-start: var(--huge-space);
				}
			}

			.timeline__logo {
				transform: translate(-50%, 90%);

				@include respond-to(xl) {
					transform: translate(-50%, 70%);
				}
			}

			.timeline__duration {
				@include respond-to(xl) {
					top: 50px;
				}
			}
		}

		@include respond-to(sm) {
			max-width: 750px;
			padding-inline-start: var(--gigentic-space);
		}
	}
</style>
