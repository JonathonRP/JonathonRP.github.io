<svelte:options runes />
<script lang="ts">
	import { writable } from 'svelte/store';

	type Basics = {
		[x: string]: any;
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
	let { location, phone, email, profiles, ...restProps }: Basics = $props();

	const {subscribe, update} = writable(0);
	const rows = {
		subscribe,
		add: (inc: number = 0) => update((row) => row += inc || 1),
	}
</script>

<section class="contact-details" {...restProps} style:--grid-rows={$rows}>
	<table border={0} width={175.47}>
		{#if location}
			<tr>
				<td colspan="2" width={170}>
					<span class="contact-details__text" aria-label="{location.city}, {location.region}">
						<p>{location.city}, {location.region}</p>
					</span>
				</td>
				<td width={15}>
					<span class="contact-details__icon location" />
				</td>
			</tr>
			{rows.add()}
		{/if}

		{#if phone}
			<tr>
				<td colspan="2" width={170}>
					<span class="contact-details__text"><p>{phone}</p></span>
				</td>
				<td width={15}>
					<span class="contact-details__icon phone" />
				</td>
			</tr>
			{rows.add()}
		{/if}
		{#if email}
			<tr>
				<td colspan="2" width={170}>
					<span class="contact-details__link">
						<a href="mailto:{email}" rel="external nofollow noopener noreferrer" target="blank">{email}</a>
					</span>
				</td>
				<td width={15}>
					<span class="contact-details__icon email" />
				</td>
			</tr>
			{rows.add()}
		{/if}

		{#if profiles}
			{#each profiles as profile}
				<tr>
					<td colspan="2" width={170}>
						<span class="contact-details__link">
							<a href={profile.url} rel="external nofollow noopener noreferrer" target="blank">{profile.username}</a>
						</span>
					</td>
					<td width={15}>
						<span class="contact-details__icon {profile.network.toLowerCase()}" />
					</td>
				</tr>
				{rows.add()}
			{/each}
		{/if}
	</table>
</section>

<style lang="scss">
	@use '@/styles/abstracts/mixins' as *;

	a {
		&::after {
			content: none;
		}
	}

	.contact-details {
		display: block;
		// grid-template-columns: 160px 25px;
		column-gap: 0.5em;
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
			margin-inline-end: .5em;
		}

		&__icon {
			// font-size: 20px;
			// padding-inline-end: var(--small-space);
			// text-align: center;
			color: var(--accent-color);
		}
	}
</style>
