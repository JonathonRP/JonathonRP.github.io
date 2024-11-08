<svelte:options runes />

<script lang="ts">
	const {
		basics,
		...restProps
	}: {
		basics: {
			location?: {
				address: string;
				city: string;
				countryCode: string;
				postalCode: string;
				region: string;
			};
			phone?: string;
			email?: string;
			profiles?: { network: string; username: string; url: string }[];
		};
	} = $props();

	const { location, phone, email, profiles = [] } = $derived(basics);
</script>

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
