<svelte:options runes />
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
	const images = import.meta.glob('../../images/logos/*.{jpg,png}', {
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
						src={images[`../../images/logos/${exp.image}`].default}
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
	@import '@/styles/blocks/resume/_timeline.scss';
</style>
