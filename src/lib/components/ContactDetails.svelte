<script lang="ts">
    export let basics: { [x: string]: any, location?: {address: string, city: string, countryCode: string, postalCode: string, region: string}, phone?: string, email?: string, profiles?: {network: string, username: string, url: string}[]};
    let {location, phone, email, profiles} = {...basics};
</script>

<section class="contact-details" {...$$restProps}>
    {#if $$slots.heading}
        <slot name="heading"/>
    {/if}
    {#if location}
        <span class="contact-details__text" aria-label="{location.city}, {location.region}"><p>{location.city}, {location.region}</p></span>        <span class="contact-details__icon location"/>
    {/if}
    {#if phone}
        <span class="contact-details__text"><p>{phone}</p></span>                                                                                   <span class="contact-details__icon phone"/>
    {/if}
    {#if email}
        <span class="contact-details__link"><a href="mailto:{email}" rel="external nofollow noopener noreferrer" target="blank">{email}</a></span>                                              <span class="contact-details__icon email" />
    {/if}

    {#if profiles}
        {#each profiles as profile}
            <span class="contact-details__link"><a href="{profile.url}" rel="external nofollow noopener noreferrer" target="blank">{profile.network} Profile</a></span>                         <span class="contact-details__icon {profile.network.toLowerCase()}" />
        {/each}
    {/if}
</section>

<style lang="scss">
    @use '../styles/abstracts/mixins' as *;

	.contact-details {
		display: grid;
		grid-template-columns: 165px 35px;
		column-gap: 0.5em;
		padding: var(--default-space) var(--xsmall-space);
		align-items: center;

        &[data-visibility='mobile'] {
            grid-template-rows: 50px repeat(5, 25px);

            &::before {
                content: '';
                border-right: 2px solid var(--primary-color);
                position: absolute;
                top: 66px;
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
        }

        &[data-visibility='desktop'] {
            grid-template-rows: repeat(5, 25px);
        }


		&__text,
		&__link {
			grid-column: 1;
			font-size: 1rem;
			text-align: end;
		}

		&__icon {
			font-size: 20px;
			text-align: center;
			color: var(--accent-color);
		}
	}
</style>
