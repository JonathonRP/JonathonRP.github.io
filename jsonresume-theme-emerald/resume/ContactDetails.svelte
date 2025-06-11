<svelte:options runes />

<script lang="ts">
	import type { CollectionEntry } from 'astro:content';
	import type { SvelteHTMLElements } from 'svelte/elements';
	const {
		basics,
		...restProps
	}: {
		basics: CollectionEntry<'resume'>['data']['basics'];
	} & SvelteHTMLElements['section'] = $props();
</script>

{#if basics}
	{@const { location, phone, email, profiles } = basics}
	<section class="contact-details" {...restProps}>
		<table border={0} width={175.47}>
			<tbody>
				{#if location}
					<tr>
						<td
							colspan="2"
							style="width: 170px"
							class="contact-details__text"
							aria-label={`${location.city}, ${location.region}`}
						>
							<p>{location.city}, {location.region}</p>
						</td>
						<td
							style="width: 18px"
							class="contact-details__icon location"
						>
						</td>
					</tr>
				{/if}

				{#if phone}
					<tr>
						<td
							colspan="2"
							style="width: 170px"
							class="contact-details__text"
						>
							<p>{phone}</p>
						</td>
						<td style="width: 18px" class="contact-details__icon phone"></td>
					</tr>
				{/if}
				{#if email}
					<tr>
						<td
							colspan="2"
							style="width: 170px"
							class="contact-details__link"
						>
							<a
								class="contact-email"
								href="mailto:{email}"
								rel="external nofollow noopener noreferrer"
								target="blank"
							>{email}</a>
						</td>
						<td style="width: 18px" class="contact-details__icon email"></td>
					</tr>
				{/if}

				{#if profiles}
					{#each profiles as profile (profile.network)}
						<tr>
							<td
								colspan="2"
								style="width: 170px"
								class="contact-details__link"
							>
								<a
									class="contact-profile"
									href={profile.url}
									rel="external nofollow noopener noreferrer"
									target="blank"
								>{profile.username}</a>
							</td>
							<td
								style="width: 18px"
								class="contact-details__icon {profile.network.toLowerCase()}"
							>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</section>
{/if}

<style lang="scss">
	.contact-details {
		display: block;
		// grid-template-columns: 160px 25px;
		// column-gap: 0.5em;
		// align-items: center;
		// justify-items: end;
		text-align: end;
		position: relative;
		font-size: 0.85rem;

		// &[data-visibility='desktop'] {
		// grid-template-rows: repeat(var(--grid-rows), 25px);

		// 	@include respond-to(sm) {
		// 		display: block;
		// 	}
		// }

		table {
			border-collapse: collapse;
		}

		&__text,
		&__link {
			// grid-column: 1;
			// text-align: center;
			padding-block: 0;
			// margin-inline-end: .5em;
			padding-inline-end: 0.25em;
			font-weight: 500;
		}

		&__icon {
			// font-size: 15px;
			// padding-inline-end: var(--small-space);
			text-align: center;
			color: var(--accent-color);
		}
	}
</style>
