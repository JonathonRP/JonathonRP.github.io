<script lang="ts">
	/// <reference path="$lib/utils/global.d.ts" />
	import '$lib/utils/groupby';
	import type JsonResume from '$lib/utils/global';
	import { writable } from 'svelte/store';
	import { slug } from '$lib/utils/slug';
	import config from '$lib/website.config';
	import SEO from '$lib/components/SEO/index.svelte';
	import PWA from '$lib/components/PWA.svelte';
	import ContactDetails from '$lib/components/ContactDetails.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import TagsCatalog from '$lib/components/TagsCatalog.svelte';
	import Resume from '../../../static/data/resume.json';
	
	let resume = writable(Resume);
	$: ({ basics, work, certificates, education, skills, projects } = $resume);

	$: ({ author, siteUrl } = config);

	let title = 'Resume',
	metadescription = 'Hard working and detail oriented professional, seeking a software development position where I can use my skills and contribute to the growth of a company.';

	const breadcrumbs = [
		{
			name: 'Home',
			slug: ''
		},
		{
			name: title,
			slug: 'resume'
		}
	];

	const entityMeta = {
		url: `${siteUrl}/`,
		faviconWidth: 512,
		faviconHeight: 512,
		caption: author
	};

	const seo = {
		article: false,
		title,
		slug: '',
		entityMeta,
		breadcrumbs,
		metadescription
	};

	
</script>

<svelte:head>
	<SEO {...seo} />
	<PWA />
</svelte:head>

<main class="wrapper">
	<!-- Profile -->
	<header class="profile [ flow ]">
		<!-- Introduction -->
		<div aria-label="Introduction">
			<h1 aria-label={basics.name}>{basics.name}</h1>
			<h2 aria-label={basics.label}>{basics.label}</h2>
		</div>

		<!-- Objective Statement -->
		<p class="text-accent">
			{basics.summary}
		</p>

		<!-- Contact Details -->
		<ContactDetails {basics} aria-label="Details" data-visibility="desktop" />
	</header>

	<!-- Relevant Experience History -->
	<section class="[ lg:grid-column ]" aria-label="Relevant Experience History">
		<section class="experience" aria-label="Relevant Professional Experience">
			<Timeline experiences={work} work />
		</section>

		<!-- Certificates -->
		<section class="experience" aria-labelledby="cert-title">
			<Timeline experiences={certificates} certificates />
		</section>

		<!-- Education -->
		<section class="experience" aria-labelledby="ed-title">
			<Timeline experiences={education} education />
		</section>
	</section>

	<div class="[ lg:grid-column ] [ flow ]">
		<!-- Skills -->
		<section class="skills [ tags-catalog extend ] [ lg:bg-none ]" aria-label="skills">
			{#each Object.entries(skills.groupBy((skill) => skill.category)) as [category, collectiveSkills]}
				{@const category_kabab = slug(category)}
				<section
					class="category"
					class:extend={collectiveSkills.length > 1}
					aria-labelledby="{category_kabab}-title">
					<h2
						id="{category_kabab}-title"
						class="heading__icon heading"
						data-icon={category_kabab}>
						{collectiveSkills.length === 1 ? collectiveSkills[0]?.name : collectiveSkills.length > 1 ? category : ""}
					</h2>
					{#if collectiveSkills.length === 1}
						<TagsCatalog labels={collectiveSkills[0]?.keywords ?? ''} />
					{:else if collectiveSkills.length > 1}
						{#each collectiveSkills as skill (skill.slug = slug(skill.name))}
							<div class="sub-category" aria-labelledby="{skill.slug}-title">
								<h3 id="{skill.slug}-title" class="subheading">{skill.name}:</h3>
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

		<!-- Personal Projects -->
		<section
			class="personal-projects [ flow ]"
			aria-labelledby="personal-projects-title"
		>
			<h2 id="personal-projects-title" class="heading__icon heading" data-icon="personal-projects">
				Personal Projects
			</h2>

			<ol class="project gallery">
				{#each projects as project}
					<li>
						<header>
							{#if project.url}
								<a href={project.url} rel="external nofollow noopener noreferrer" target="blank"
									>{project.name}</a
								>
							{:else}
								{project.name}
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
					</li>
				{/each}
			</ol>
		</section>

		<!-- Mobile Contact Details -->
		<ContactDetails {basics} aria-labelledby="details-title" data-visibility="mobile">
			<h2
				slot="heading"
				id="details-title"
				class="heading__icon heading"
				data-icon="contact-details"
			>
				Details
			</h2>
		</ContactDetails>
	</div>
</main>

<style lang="scss" global>
	@use 'static/styles/abstracts' as *;
	@use 'static/styles' as *;

	// theme
	:root {
		&[data-theme='dark'] {
			@each $color, $value in $light {
				--#{$color}-color: #{$value};
			}
		}

		@media (prefers-color-scheme: dark) {
			@each $color, $value in $light {
				--#{$color}-color: #{$value};
			}
		}
	}

	.download {
		position: relative;
		padding-inline: var(--default-space);
		cursor: pointer;

		&::before,
		&::after {
			margin-block: 0.425rem;
		}

		&::before {
			position: absolute;
			top: 0;
			transform: translate(50%, 50%);
			color: var(--text-color);
		}

		&::after {
			content: '';
			display: inline-block;
			height: var(--xlarge-space);
			width: var(--xlarge-space);
			border-radius: var(--small-space);
			box-shadow: 0 0 8px rgb(255 255 255 / 0.3);
			clear: both;
		}

		.word {
			&::after {
				background-color: #5174a8;
			}
		}
		.pdf {
			&::after {
				background-color: #c05757;
			}
		}
	}
</style>