// FIXME: https://github.com/withastro/roadmap/discussions/1046
// import ContactDetailsCss from '@/components/resume/ContactDetails.svelte?svelte&type=style&lang.css&inline';
// import TagsCatalogCss from '@/components/resume/TagsCatalog.svelte?svelte&type=style&lang.css&inline';
// import TimelineCss from '@/components/resume/Timeline.astro?astro&type=style&index=0&lang.css&inline';
// import ResumeCss from '@/components/resume/index.astro?astro&type=style&index=0&lang.css&inline';
// import Template from "../src/pages/resume/template/index.astro";
// import resume_styles from "../src/styles/index.scss?inline";
import { render as svelteRender } from 'svelte/server';

export const pdfOptions = {};

export async function render(resume: unknown) {
	const { default: Resume } = await import('../src/components/resume/index.ts');
	const source = svelteRender(Resume, { props: { data: resume } });

	//   const html = new DOMParser().parseFromString(
	//     "",
	//     "text/html",
	//   );

	// const style = html.createElement("style");
	// const css = styles + ContactDetailsCss + TimelineCss + TagsCatalogCss + ResumeCss;
	// const css = resume_styles;
	// style.appendChild(html.createTextNode(css));
	// head.appendChild(style);
	//   return html.documentElement?.innerHTML;

	return `<!DOCTYPE html>
	<html lang="en">
		<head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <meta name="viewport" content="width=device-width, initial-scale=1">
			${source.head}
		</head>
		<body>
			${source.body}
		</body>
	</html>`;
}
