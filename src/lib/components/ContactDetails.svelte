<script lang="ts">
	export let basics: {
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
	let { location, phone, email, profiles } = { ...basics };
	$: rows = 0;
</script>

<section class="contact-details" {...$$restProps}>
	{#if $$slots.heading}
		<slot name="heading" />
	{/if}
	{#if location && rows + 1}
		<span class="contact-details__text" aria-label="{location.city}, {location.region}"
			><p>{location.city}, {location.region}</p></span
		> <span class="contact-details__icon location" />
	{/if}
	{#if phone && rows + 1}
		<span class="contact-details__text"><p>{phone}</p></span>
		<span class="contact-details__icon phone" />
	{/if}
	{#if email && rows + 1}
		<span class="contact-details__link"
			><a href="mailto:{email}" rel="external nofollow noopener noreferrer" target="blank"
				>{email}</a
			></span
		> <span class="contact-details__icon email" />
	{/if}

	{#if profiles && rows + profiles.length}
		{#each profiles as profile}
			<span class="contact-details__link"
				><a href={profile.url} rel="external nofollow noopener noreferrer" target="blank"
					>{profile.network} Profile</a
				></span
			> <span class="contact-details__icon {profile.network.toLowerCase()}" />
		{/each}
	{/if}
</section>

<style lang="scss">
	@use 'static/assets/styles/abstracts/mixins' as *;

	a {
		&::before {
            content: none;
		}

        &::after {
            content: none;
        }
	}

	.contact-details {
		display: none;
		grid-template-columns: 165px 35px;
		column-gap: 0.5em;
		padding-block: var(--small-space);
		align-items: center;
		position: relative;

		--grid-rows: #{rows};

		&[data-visibility='mobile'] {
			display: grid;
			grid-template-rows: 50px repeat(var(--grid-rows), 25px);
			// padding-inline: 0;

			&::before {
				content: '';
				border-right: 2px solid var(--primary-color);
				position: absolute;
				top: 62px;
				height: 60%;
				width: 13.5em;
			}

			@include headings() {
				grid-column: span 2;
				grid-row: 1;
			}

			.heading {
				width: 100%;
			}

			@include respond-to(sm) {
				display: none;
			}
		}

		&[data-visibility='desktop'] {
			grid-template-rows: repeat(var(--grid-rows), 25px);

			@include respond-to(sm) {
				display: inline-block;
			}
		}

		&__text,
		&__link {
			grid-column: 1;
			font-size: 1rem;
			// text-align: center;
		}

		&__icon {
			// font-size: 20px;
            padding-inline-end: var(--small-space);
			text-align: center;
			color: var(--accent-color);
		}
	}
</style>
