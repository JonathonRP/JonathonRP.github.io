import type { RequestHandler } from './$types';
import config from "../../../../website.config.ts";
import { resumeHtml } from "$lib/utils/constants.ts";
import { asBlob, Buffer } from "html-docx";

export const GET = (async ({ request }) => {

    const docxBuffer = await asBlob(resumeHtml) as Buffer;

    return new Response(docxBuffer, {
        status: 200,
        statusText: "OK",
        headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'Content-Disposition': `attachment;filename="${config.siteTitle}.docx"`,
            'Content-Length': docxBuffer.length.toString()
        }
    })
}) satisfies RequestHandler