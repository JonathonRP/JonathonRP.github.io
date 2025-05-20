import { push, head, pop, attr, spread_props, escape_html } from './_@astro-renderers.mjs';
import { website } from './website.config.mjs';
import hash from 'object-hash';

/**
 * @param {string} value
 */
function html(value) {
	var html = String(value ?? '');
	var open = '<!---->';
	return open + html + '<!---->';
}

const defaultTwitterImage = new Proxy({"src":"/_astro/profile.CLTYHkqz.png","width":460,"height":460,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/workspaces/JonathonRP.github.io/src/images/profile.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/workspaces/JonathonRP.github.io/src/images/profile.png");
							return target[name];
						}
					});

function OpenGraph($$payload, $$props) {
	push();

	const {
		article = false,
		datePublished,
		lastUpdated,
		facebookAuthorPage = "",
		facebookPage = "",
		image,
		squareImage,
		metadescription,
		ogLanguage,
		pageTitle,
		siteTitle,
		url
	} = $$props;

	head($$payload, ($$payload) => {
		$$payload.out += `<meta property="og:site_name"${attr("content", siteTitle)}> <meta property="og:locale"${attr("content", ogLanguage)}> <meta property="og:url"${attr("content", url)}> <meta property="og:type"${attr("content", article ? 'article' : 'website')}> <meta property="og:title"${attr("content", pageTitle)}> <meta property="og:description"${attr("content", metadescription)}> `;

		if (image) {
			$$payload.out += "<!--[-->";
			$$payload.out += `<meta property="og:image"${attr("content", image.url)}> <meta property="og:image:width" content="1200"> <meta property="og:image:height" content="627"> <meta property="og:image:alt"${attr("content", image.alt)}>`;
		} else {
			$$payload.out += "<!--[!-->";
		}

		$$payload.out += `<!--]--> `;

		if (squareImage) {
			$$payload.out += "<!--[-->";
			$$payload.out += `<meta property="og:image"${attr("content", squareImage.url)}> <meta property="og:image:width" content="400"> <meta property="og:image:height" content="400"> <meta property="og:image:alt"${attr("content", squareImage.alt)}>`;
		} else {
			$$payload.out += "<!--[!-->";
		}

		$$payload.out += `<!--]--> `;

		if (article) {
			$$payload.out += "<!--[-->";
			$$payload.out += `<meta property="article:publisher"${attr("content", facebookPage)}> <meta property="article:author"${attr("content", facebookAuthorPage)}> <meta property="article:published_time"${attr("content", datePublished)}> <meta property="article:modified_time"${attr("content", lastUpdated)}>`;
		} else {
			$$payload.out += "<!--[!-->";
		}

		$$payload.out += `<!--]-->`;
	});

	pop();
}

function SchemaOrg($$payload, $$props) {
	push();

	const {
		article = false,
		author,
		breadcrumbs,
		datePublished = "",
		entity,
		lastUpdated = "",
		featuredImage,
		metadescription,
		siteLanguage,
		siteTitle,
		siteTitleAlt,
		siteUrl,
		title,
		url,
		githubPage,
		linkedinProfile,
		entityMeta = null
	} = $$props;

	const entityHash = hash({ author }, { algorithm: "md5" });
	const schemaOrgEntity = entityMeta !== null
		? {
			"@type": ["Person", "Organization"],
			"@id": `${siteUrl}/#/schema/person/${entityHash}`,
			name: author,
			image: {
				"@type": "ImageObject",
				"@id": `${siteUrl}/#personlogo`,
				inLanguage: siteLanguage,
				url: entityMeta.url,
				width: entityMeta.faviconWidth,
				height: entityMeta.faviconHeight,
				caption: author
			},
			logo: { "@id": `${siteUrl}/#personlogo` },
			sameAs: [
				`https://github.com/${githubPage}`,
				`https://linkedin.com/in/${linkedinProfile}`
			]
		}
		: null;

	const schemaOrgWebsite = {
		"@type": "WebSite",
		"@id": `${siteUrl}/#website`,
		url: siteUrl,
		name: siteTitle,
		description: siteTitleAlt,
		publisher: {
			"@id": `${siteUrl}/#/schema/person/${entityHash}`
		},
		potentialAction: [
			{
				"@type": "SearchAction",
				target: `${siteUrl}/?s={search_term_string}`,
				"query-input": "required name=search_term_string"
			}
		],
		inLanguage: siteLanguage
	};

	const schemaOrgImageObject = {
		"@type": "ImageObject",
		"@id": `${url}#primaryimage`,
		inLanguage: siteLanguage,
		url: featuredImage.url,
		contentUrl: featuredImage.url,
		width: featuredImage.width,
		height: featuredImage.height,
		caption: featuredImage.caption
	};

	const schemaOrgBreadcrumbList = {
		"@type": "BreadcrumbList",
		"@id": `${url}#breadcrumb`,
		itemListElement: breadcrumbs.map((element, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: {
				"@type": "WebPage",
				"@id": `${siteUrl}/${element.slug}`,
				url: `${siteUrl}/${element.slug}`,
				name: element.name
			}
		}))
	};

	const schemaOrgWebPage = {
		"@type": "WebPage",
		"@id": `${url}#webpage`,
		url,
		name: title,
		isPartOf: { "@id": `${siteUrl}/#website` },
		primaryImageOfPage: { "@id": `${url}#primaryimage` },
		datePublished,
		dateModified: lastUpdated,
		author: {
			"@id": `${siteUrl}/#/schema/person/${entityHash}`
		},
		description: metadescription,
		breadcrumb: { "@id": `${url}#breadcrumb` },
		inLanguage: siteLanguage,
		potentialAction: [
			{ "@type": "ReadAction", target: [url] }
		]
	};

	let schemaOrgArticle = null;

	if (article) {
		schemaOrgArticle = {
			"@type": "Article",
			"@id": `${url}#article`,
			isPartOf: { "@id": `${url}#webpage` },
			author: {
				"@id": `${siteUrl}/#/schema/person/${entityHash}`
			},
			headline: title,
			datePublished,
			dateModified: lastUpdated,
			mainEntityOfPage: { "@id": `${url}#webpage` },
			publisher: {
				"@id": `${siteUrl}/#/schema/person/${entityHash}`
			},
			image: { "@id": `${url}#primaryimage` },
			articleSection: ["blog"],
			inLanguage: siteLanguage
		};
	}

	const schemaOrgPublisher = {
		"@type": ["Person", "Organization"],
		"@id": `${siteUrl}/#/schema/person/${entityHash}`,
		name: entity,
		image: {
			"@type": "ImageObject",
			"@id": `${siteUrl}/#personlogo`,
			inLanguage: siteLanguage,
			url: `${siteUrl}/assets/rodneylab-logo.png`,
			contentUrl: `${siteUrl}/assets/rodneylab-logo.png`,
			width: 512,
			height: 512,
			caption: entity
		},
		logo: { "@id": `${siteUrl}/#personlogo` },
		sameAs: [
			`https://github.com/${githubPage}`,
			`https://linkedin.com/in/${linkedinProfile}`
		]
	};

	const schemaOrgArray = [
		schemaOrgEntity,
		schemaOrgWebsite,
		schemaOrgImageObject,
		schemaOrgWebPage,
		schemaOrgBreadcrumbList,
		...article ? [schemaOrgArticle] : [],
		schemaOrgPublisher
	];

	const schemaOrgObject = {
		"@context": "https://schema.org",
		"@graph": schemaOrgArray
	};

	let jsonLdString = JSON.stringify(schemaOrgObject);

	let jsonLdScript = `
          <script type="application/ld+json">
              ${jsonLdString}
          ${"<"}/script>
      `;

	head($$payload, ($$payload) => {
		$$payload.out += `${html(jsonLdScript)}`;
	});

	pop();
}

function Twitter($$payload, $$props) {
	push();

	const {
		article = false,
		author,
		twitterUsername = void 0,
		image,
		timeToRead = 0
	} = $$props;

	head($$payload, ($$payload) => {
		$$payload.out += `<meta name="twitter:card" content="summary_large_image"> `;

		if (image) {
			$$payload.out += "<!--[-->";
			$$payload.out += `<meta name="twitter:image"${attr("content", image.url)}>`;
		} else {
			$$payload.out += "<!--[!-->";
		}

		$$payload.out += `<!--]--> `;

		if (twitterUsername) {
			$$payload.out += "<!--[-->";
			$$payload.out += `<meta name="twitter:creator"${attr("content", `@${twitterUsername}`)}> <meta name="twitter:site"${attr("content", `@${twitterUsername}`)}>`;
		} else {
			$$payload.out += "<!--[!-->";
		}

		$$payload.out += `<!--]--> <meta name="twitter:label1" content="Written by"> <meta name="twitter:data1"${attr("content", author)}> `;

		if (article && timeToRead > 0) {
			$$payload.out += "<!--[-->";
			$$payload.out += `<meta name="twitter:label2" content="Est. reading time"> <meta name="twitter:data2"${attr("content", timeToRead !== 1 ? `${timeToRead} minutes` : '1 minute')}>`;
		} else {
			$$payload.out += "<!--[!-->";
		}

		$$payload.out += `<!--]-->`;
	});

	pop();
}

function SEO($$payload, $$props) {
	push();

	const defaultAlt = "Profile image with avatar of Jonathon Reese Perry saying Namaste";
	const siteUrl = new URL(import.meta.url).origin;
	const { author } = website;

	const {
		article = false,
		breadcrumbs = [],
		entityMeta = null,
		lastUpdated = "",
		datePublished = "",
		metadescription,
		slug,
		title,
		timeToRead = 0,
		featuredImage = {
			url: defaultTwitterImage.src,
			alt: defaultAlt,
			width: 672,
			height: 448,
			caption: "Profile image"
		},
		ogImage = { url: defaultTwitterImage.src, alt: defaultAlt },
		ogSquareImage = {
			url: defaultTwitterImage.src,
			alt: defaultAlt
		},
		twitterImage = { url: defaultTwitterImage.src, alt: defaultAlt }
	} = $$props;

	const {
		ogLanguage,
		siteLanguage,
		siteTitleAlt,
		siteTitle,
		githubPage,
		linkedinProfile
	} = website;

	const pageTitle = `${siteTitle} | ${title}`;
	const url = `${siteUrl}/${slug}`;

	const openGraphProps = {
		article,
		datePublished,
		lastUpdated,
		image: ogImage,
		squareImage: ogSquareImage,
		metadescription,
		ogLanguage,
		pageTitle,
		siteTitle,
		url,
		...article ? { datePublished, lastUpdated } : {}
	};

	const schemaOrgProps = {
		article,
		author,
		breadcrumbs,
		datePublished,
		entity: { author },
		lastUpdated,
		entityMeta,
		featuredImage,
		metadescription,
		siteLanguage,
		siteTitle,
		siteTitleAlt,
		siteUrl,
		title: pageTitle,
		url,
		githubPage,
		linkedinProfile
	};

	const twitterProps = {
		article,
		author,
		image: twitterImage,
		timeToRead
	};

	head($$payload, ($$payload) => {
		$$payload.title = `<title>${escape_html(pageTitle)}</title>`;
		$$payload.out += `<meta name="description"${attr("content", metadescription)}> <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"> <link rel="canonical"${attr("href", url)}>`;
	});

	SchemaOrg($$payload, spread_props([schemaOrgProps]));
	$$payload.out += `<!----> `;
	OpenGraph($$payload, spread_props([openGraphProps]));
	$$payload.out += `<!----> `;
	Twitter($$payload, spread_props([twitterProps]));
	$$payload.out += `<!---->`;
	pop();
}

export { SEO };
