import type { APIRoute } from 'astro';
import pandoc from 'node-pandoc';
import fs from 'fs';

export const GET: APIRoute = async ({ params: { Resume }, url }) => {
	if (Resume === 'Resume.docx' || Resume === 'Resume.pdf') {
		const src = new URL('template', url.origin).href,
			args = ['-s', '-r', 'html', '-o', `./${Resume}`],
			callback = (err, result) => {
				if (err) console.log('Oh Nos: ', err);
				return result;
			};

		await pandoc(src, args, callback);

		return new Response(fs.readFileSync(`./${Resume}`, Resume === 'Resume.pdf' ? 'binary' : undefined), {
			status: 200,
			statusText: 'OK',
			headers: {
				'Content-Type':
					Resume === 'Resume.docx'
						? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
						: 'application/pdf',
			},
		});
	} else {
		return new Response(undefined, { status: 404, statusText: 'Not Found' });
	}
};
