import type { RequestHandler } from './$types';
import { Buffer } from "html-docx";

export const prerender = true;

export const GET = (async ({ request, url }) => {

    const docxBuffer = await (await fetch(new URL('resume', url))).blob() as Buffer;

    return new Response(docxBuffer, {
        status: 200,
        statusText: "OK",
        headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'Content-Length': docxBuffer.length.toString()
        }
    })
}) satisfies RequestHandler