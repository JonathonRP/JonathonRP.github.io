// FIXME: https://github.com/withastro/roadmap/discussions/1046
// import ContactDetailsCss from '@/components/resume/ContactDetails.svelte?svelte&type=style&lang.css&inline';
// import TagsCatalogCss from '@/components/resume/TagsCatalog.svelte?svelte&type=style&lang.css&inline';
// import TimelineCss from '@/components/resume/Timeline.astro?astro&type=style&index=0&lang.css&inline';
import Resume from '@/components/resume/index.astro';
// import ResumeCss from '@/components/resume/index.astro?astro&type=style&index=0&lang.css&inline';
import BasicLayout from '@/layouts/basic.astro';
import { Content } from '@/lib/content/index.ts';
import styles from '@/styles/index.scss?inline';
import { getContainerRenderer as svelteContainerRenderer } from '@astrojs/svelte';
import type { APIRoute } from 'astro';
import { experimental_AstroContainer } from 'astro/container';
import { loadRenderers } from 'astro:container';
import { DOMParser } from 'https:deno.land/x/deno_dom/deno-dom-wasm.ts';
import { unescapeHtml } from 'https:deno.land/x/escape/mod.ts';
import pandoc from 'node-pandoc';
import fs from 'node:fs';
import { default as wkhtmltopdf } from 'wkhtmltopdf';
const data = await Content.getLatestResumeData();

export function getStaticPaths() {
	return [
		{ params: { file: 'pdf' } },
		{ params: { file: 'docx' } },
	];
}

export const GET: APIRoute = async ({ params: { file }, url }) => {
	const temp = `./temp.${file}`;
	const renderers = await loadRenderers([svelteContainerRenderer()]);
	const container = await experimental_AstroContainer.create({ renderers });
	const html = new DOMParser().parseFromString(
		unescapeHtml(
			await container.renderToString(BasicLayout, {
				slots: {
					default: await container.renderToString(Resume, { props: { data }, partial: false }),
				},
				partial: false,
			}),
		),
		'text/html',
	);
	const head = html.head;
	const style = html.createElement('style');
	// const css = styles + ContactDetailsCss + TimelineCss + TagsCatalogCss + ResumeCss;
	const css = styles;
	style.appendChild(html.createTextNode(css));
	head.appendChild(style);
	const input = html.documentElement?.innerHTML;

	switch (file) {
		case 'pdf': {
			const { resolve, promise } = Promise.withResolvers();
			const output = fs.createWriteStream(temp);

			wkhtmltopdf(input, {
				pageSize: 'A4',
				pageWidth: '297mm',
				pageHeight: '420mm',
				zoom: 1,
				dpi: 96,
				disableSmartShrinking: true,
				printMediaType: true,
				background: true,
				marginBottom: 0,
				marginTop: 0,
				marginLeft: 0,
				marginRight: 0,
			}, (err, stream) => {
				if (err) console.log(err);
			}).pipe(output);
			output.on('finish', resolve);

			await promise;
			return new Response(fs.readFileSync(temp, 'binary'), {
				status: 200,
				statusText: 'OK',
				headers: {
					'Content-Type': 'application/pdf',
				},
			});
		}
		case 'docx': {
			const src = input,
				args = [
					'-s',
					'-r',
					'html',
					'-o',
					temp,
					'--reference-doc',
					'/workspaces/JonathonRP.github.io/public/ResumeTemplate.docx',
				];

			await pandoc(src, args, (err, result) => {
				if (err) console.log('Oh Nos: ', err);
				return result;
			});

			return new Response(fs.readFileSync(temp), {
				status: 200,
				statusText: 'OK',
				headers: {
					'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				},
			});
		}
		default: {
			return new Response(undefined, { status: 404, statusText: 'Not Found' });
		}
	}
};
