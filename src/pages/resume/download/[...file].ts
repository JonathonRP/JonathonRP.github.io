import type { APIRoute } from 'astro';
import pandoc from 'node-pandoc';
import { default as wkhtmltopdf } from 'wkhtmltopdf';
import fs from 'node:fs';
import { experimental_AstroContainer } from 'astro/container';
import { default as svelteRenderer } from '@astrojs/svelte/server-v5.js';
import template from '../template/index.astro';

export function getStaticPaths() {
	return [
		{ params: { file: 'pdf' } },
		{ params: { file: 'docx' } },
	];
}

export const GET: APIRoute = async ({ params: { file }, url }) => {
	const temp = `./temp.${file}`;
	switch (file) {
		case 'pdf': {
			const container = await experimental_AstroContainer.create();
			container.addServerRenderer({ name: '@astrojs/svelte', renderer: svelteRenderer });
			container.addClientRenderer({ name: '@astrojs/svelte', entrypoint: '@astrojs/svelte/client.js' });
			await wkhtmltopdf(await container.renderToString(template), {
				pageSize: 'A3',
				pageWidth: '297mm',
				zoom: 1,
				dpi: 96,
				disableSmartShrinking: true,
				noPrintMediaType: true,
				background: true,
				marginBottom: 0,
				marginTop: 0,
				marginLeft: 0,
				marginRight: 0,
				output: temp,
			});
			return new Response(fs.readFileSync(temp, 'binary'), {
				status: 200,
				statusText: 'OK',
				headers: {
					'Content-Type': 'application/pdf',
				},
			});
		}
		case 'docx': {
			const container = await experimental_AstroContainer.create();
			container.addServerRenderer(svelteRenderer);
			container.addClientRenderer({ name: '@astrojs/svelte', entrypoint: '@astrojs/svelte/client.js' });

			const src = await container.renderToString(template),
				args = ['-s', '-r', 'html', '-o', temp, '--reference-doc', '../../ResumeTemplate.docx'],
				callback = (err, result) => {
					if (err) console.log('Oh Nos: ', err);
					return result;
				};

			await pandoc(src, args, callback);

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
