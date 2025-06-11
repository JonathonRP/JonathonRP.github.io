<script lang="ts">
import { hash, linq } from '@/lib';
import type { CollectionEntry } from 'astro:content';

import ContactDetails from './ContactDetails.svelte';
import TagsCatalog from './TagsCatalog.svelte';
import Timeline from './Timeline.svelte';

interface Props {
	data: CollectionEntry<'resume'>['data'];
}

const {
	data,
}: Props = $props();

const {
		basics,
		work,
		certificates,
		education,
		skills,
		projects,
	} = $derived(data);
</script>

<section id="resume" class="resume">
	<table border={0} cellspacing={0} cellpadding={0}>
		<colgroup>
			<col span="8" style="width: 80%">
			<col span="4" style="width: 40%">
		</colgroup>
		<tbody>
			<!-- Profile -->
			{#if basics}
			<tr class="profile">
				<th colspan="8" class="[ flow ]">
					<!-- Introduction -->
					<div aria-label="Introduction">
						<h1 aria-label={basics.name}>{basics.name}</h1>
						<h2 aria-label={basics.label}>{basics.label}</h2>
					</div>

					<!-- Objective Statement -->
					<p class="text-accent">
						{basics.summary}
					</p>
				</th>

				<th colspan="4" style="width: 175.47px" align="right">
					<!-- Contact Details -->
					<ContactDetails {basics} aria-label="Details" />
				</th>
			</tr>
			{/if}
			<tr>
				<!-- Relevant Experience History -->
				<td
					colspan="7"
					class="[ grid-column ]"
					aria-label="Relevant Experience History"
				>
					{#if work && work.length > 0}
					<section
						class="experience"
						aria-label="Relevant Professional Experience"
					>
						<Timeline events={work} type="work" />
					</section>
					{/if}

					<!-- Certificates -->
					{#if certificates && certificates.length > 0}
					<section class="experience" aria-labelledby="cert-title">
						<Timeline events={certificates} type="certificates" />
					</section>
					{/if}

					<!-- Education -->
					{#if education && education.length > 0}
					<section class="experience" aria-labelledby="ed-title">
						<Timeline events={education} type="education" />
					</section>
					{/if}
				</td>

				<td colspan="5" class="[ grid-column ]">
					<!-- Skills -->
					<!-- FIX: extend is an unused css selector? -->
					{#if skills && skills.length > 0}
					<section
						class="skills [ tags-catalog extend ] [ bg-none ]"
						aria-label="skills"
					>
						{#each linq(skills)
								.groupBy(({ category, categoryTag }) => [category, categoryTag], {
									equals: ([a, b], [c, d]) => a === c && b === d,
									getHashCode: hash,
								})
								.select((g) =>
									[
										g.key,
										g.select((s) => ({ tag: s.tag, name: s.name, keywords: s.keywords }))
											.toArray(),
									] as const
								)
								as [[category, categoryTag], collectiveSkills] (categoryTag)}
								<section
									class={['category', { 'extend': collectiveSkills.length > 1 }]}
									aria-labelledby={categoryTag}>
									<h2
										id={categoryTag}
										class="heading__icon heading"
										data-icon={categoryTag}>
										{
											collectiveSkills.length === 1
											? collectiveSkills[0]?.name
											: collectiveSkills.length > 1
											? category
											: ''
										}
									</h2>
									{#if 
										collectiveSkills.length === 1}
											<TagsCatalog labels={collectiveSkills[0]?.keywords ?? ''} />
										{:else if collectiveSkills.length > 1}
											{#each collectiveSkills as skill}
											<div class="sub-category" aria-labelledby={skill.tag}>
												<h3 id={skill.tag} class="subheading">{skill.name}:</h3>
												<TagsCatalog labels={skill.keywords.sort()} />
											</div>
										{/each}
										{/if}
								</section>
						{/each}
					</section>
					{/if}

					<!-- Interests -->
					<!-- {#if interests}
							<section
							class="interests [ tags-catalog ]"
							class:extend={interests.length > 1}
							aria-labelledby="interests-title"
							>
							<h2 id="interests-title" class="heading__icon heading" data-icon="interests">Interests</h2>
							{#if interests.length === 1}
							<TagsCatalog labels={interests[0]?.keywords ?? ''} />
							{:else if interests.length > 1}
							{#each interests as interest ((interest.tag = slug(interest.name)))}
							<div class="sub-category" aria-labelledby="{interest.tag}-title">
								<h4 id="{interest.tag}-title" class="subheading">{interest.name}:</h4>
											<TagsCatalog labels={interest.keywords} />
										</div>
									{/each}
								{/if}
							</section>
						{/if} -->

					<!-- Projects -->
					{#if projects && projects.length > 0}
					<section
						class="personal-projects"
						aria-labelledby="personal-projects-title"
					>
						<h2
							id="personal-projects-title"
							class="heading__icon heading"
							data-icon="personal-projects"
						>
							Projects
						</h2>

						<div class="project gallery">
							{#each projects as project}
									<header>
										{#if project.url}
												<a
													href={project.url}
													rel="external nofollow noopener noreferrer"
													target="blank"
												>
													{project.name}
												</a>
											{:else}
												<span>
													{project.name}
												</span>
											{/if}
									</header>
									<div>
										<img alt="{project.name} screen-shot" />
									</div>
									<div>
										<p>
											{project.description}
										</p>
										<!-- project_used-technologies -->
									</div>
							{/each}
						</div>
					</section>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
</section>

<style lang="scss">
	@use '../../styles/abstracts/mixins' as *;

	section#resume.resume {
		@include headings() {
			font-family: var(--secondary-ff);
			font-optical-sizing: auto;
			font-style: normal;
			// padding-block: var(--mini-space);
		}

		& > table {
			// display: grid;
			// grid-template-columns: 2fr 1fr;
			width: 100%;
			text-align: left;
			border: 0;
			border-collapse: collapse;
			border-spacing: 0;
			table-layout: fixed;

			& th {
				--flow-space: var(--small-space);
				vertical-align: top;
				height: 100%;
				// font-weight: 400;
			}
			& td {
				vertical-align: top;
			}

			// & td {
			// 	padding: 0;
			// }

			// & td:has(.profile) {
			// 	grid-column: 1 / span 2;
			// }
		}

		// .profile {
		// 	display: grid;
		// }

		:global(.project.gallery) {
			margin-block-start: var(--mini-space);
			margin-inline: var(--tiny-space);
		}
	}

	.profile {
		// --flow-space: var(--medium-space);

		> * {
			margin-inline: var(--xsmall-space);
		}

		div {
			// grid-row: 1;

			@include respond-to(sm) {
				grid-column: 1;
			}
		}

		:global(p) {
			// grid-row: 2;

			// @include respond-to(sm) {
			// 	grid-column: span 2;
			// }
		}

		:global(section) {
			display: grid;

			// grid-column: 2;
			// grid-row: 1/2;
			justify-self: end;
		}
	}

	.tags-catalog {
		
	}

	.interests {
		// --flow-space: var(--micro-size);
		// margin-block-end: var(--flow-space);

		// @include respond-to(lg) {
		// 	border-bottom: 2px solid var(--primary-color);
		// }
	}

	.personal-projects {
		img {
			display: none;
			// position: relative;
			// left: -9999%;
		}
	}
</style>