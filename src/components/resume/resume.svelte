<svelte:options runes/>
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
			<tr>
				<!-- Relevant Experience History -->
				<td
					colspan="7"
					class="[ grid-column ]"
					aria-label="Relevant Experience History"
				>
					<section
						class="experience"
						aria-label="Relevant Professional Experience"
					>
						<Timeline events={work} type="work" />
					</section>

					<!-- Certificates -->
					<section class="experience" aria-labelledby="cert-title">
						<Timeline events={certificates} type="certificates" />
					</section>

					<!-- Education -->
					<section class="experience" aria-labelledby="ed-title">
						<Timeline events={education} type="education" />
					</section>
				</td>

				<td colspan="5" class="[ grid-column ]">
					<!-- Skills -->
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
				</td>
			</tr>
		</tbody>
	</table>
</section>

<style lang="scss">
	@import '@/styles/blocks/resume/_index.scss';
	@import '@/styles/blocks/resume/_personal-projects.scss';
	@import '@/styles/blocks/resume/_profile.scss';
</style>