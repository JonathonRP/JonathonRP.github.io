// FIXME: https://github.com/withastro/roadmap/discussions/1046
// import ContactDetailsCss from '@/components/resume/ContactDetails.svelte?svelte&type=style&lang.css&inline';
// import TagsCatalogCss from '@/components/resume/TagsCatalog.svelte?svelte&type=style&lang.css&inline';
// import TimelineCss from '@/components/resume/Timeline.astro?astro&type=style&index=0&lang.css&inline';
// import Resume from '../../../components/resume/index.astro';
// import ResumeCss from '@/components/resume/index.astro?astro&type=style&index=0&lang.css&inline';
// import styles from '@/styles/index.scss?inline';
// import { getContainerRenderer as svelteContainerRenderer } from '@astrojs/svelte';
import type { APIRoute } from 'astro';
// import { experimental_AstroContainer } from 'astro/container';
// import { loadRenderers } from 'astro:container';
// import { DOMParser } from 'https:deno.land/x/deno_dom/deno-dom-wasm.ts';
// import * as cheerio from 'cheerio';
// import { unescapeHtml } from 'https:deno.land/x/escape/mod.ts';
import fs from 'node:fs';
// import { render } from '../../../../jsonresume-theme-emerald/main.ts';
// import BasicLayout from '../../../layouts/basic.astro';
import { format, parse } from 'date-fns';
import DocxTemplater from 'docxtemplater';
import expressionParser from 'docxtemplater/expressions.js';
// import libre from 'libreoffice-convert';
import path from 'node:path';
import process from 'node:process';
import PizZip from 'pizzip';
import { Content } from '../../../lib/content/index.ts';
const data = await Content.getLatestResumeData();

export function getStaticPaths() {
	return [
		{ params: { file: `${data.basics.name} Resume.pdf` } },
		{ params: { file: `${data.basics.name} Resume.docx` } },
	];
}

expressionParser.filters.half = (values: string[]) => {
	if (values.length === 0) return undefined;
	if (values.length === 1) return values;
	return values.slice(0, Math.ceil(values.length / 2));
};
expressionParser.filters.rest = (values: string[]) => {
	if (values.length === 0) return undefined;
	if (values.length === 1) return undefined;
	return values.slice(Math.ceil(values.length / 2));
};

expressionParser.filters.formatDate = (date: string, dateformat: string) => {
	if (!date) return date;
	const parsedDate = parse(date, 'yyyy-MM', new Date());
	return format(parsedDate, dateformat);
};

export const GET: APIRoute = async ({ params: { file }, url }) => {
	// const temp = `./temp${path.extname(file)}`;
	const content = fs.readFileSync(
		path.join(process.cwd(), 'public', 'Jonathon Reese Perry Resume Template.docx'),
	);
	const zip = new PizZip(content);
	const doc = new DocxTemplater(zip, {
		paragraphLoop: true,
		linebreaks: true,
		parser: expressionParser,
	});
	doc.render(data);
	// const renderers = await loadRenderers([svelteContainerRenderer()]);
	// const container = await experimental_AstroContainer.create({ renderers });
	// const html = cheerio.load(
	// 	await container.renderToString(BasicLayout, {
	// 		slots: {
	// 			default: await container.renderToString(Resume, { props: { data }, partial: true }),
	// 		},
	// 		partial: false,
	// 	}),
	// );
	// const head = html('head');
	// // const css = styles + ContactDetailsCss + TimelineCss + TagsCatalogCss + ResumeCss;
	// const css = styles;
	// head.append(`<style type="text/css">${css}</style>`);
	// style.appendChild(html.createTextNode(css));
	// head.appendChild(style);
	// const input = html.root().html();
	// const input = await render(data);

	switch (file) {
		case `${data.basics.name} Resume.pdf`: {
			// const { resolve, reject, promise } = Promise.withResolvers<Buffer>();
			// const output = fs.createWriteStream(temp);

			// wkhtmltopdf(input, {
			// 	pageSize: 'A3',
			// 	pageWidth: '297mm',
			// 	pageHeight: '420mm',
			// 	zoom: 1,
			// 	dpi: 96,
			// 	disableSmartShrinking: true,
			// 	printMediaType: true,
			// 	background: true,
			// 	marginBottom: 0,
			// 	marginTop: 0,
			// 	marginLeft: 0,
			// 	marginRight: 0,
			// }, (err, stream) => {
			// 	if (err) console.log(err);
			// }).pipe(output);
			// output.on('finish', resolve);

			// libre.convert(doc.toBuffer(), '.pdf', undefined, (err, done) => {
			// 	if (err) {
			// 		console.error('Error converting document:', err);
			// 		reject(err);
			// 	}
			// 	resolve(done);
			// });
			return new Response(fs.readFileSync(path.join(process.cwd(), 'public', file)), {
				status: 200,
				statusText: 'OK',
				headers: {
					'Content-Type': 'application/pdf',
				},
			});
		}
		case `${data.basics.name} Resume.docx`: {
			// const src = input,
			// 	args = [
			// 		'-s',
			// 		'-r',
			// 		'html',
			// 		'-o',
			// 		temp,
			// 		'--reference-doc',
			// 		'/workspaces/JonathonRP.github.io/public/ResumeTemplate.docx',
			// 	];

			// await pandoc(src, args, (err, result) => {
			// 	if (err) console.log('Oh Nos: ', err);
			// 	return result;
			// });

			return new Response(doc.toBuffer(), {
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
