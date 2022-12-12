import type { RequestHandler } from './$types';
import config from '../../../website.config.mts'
import { resumeHtml } from '../../lib/utils/constants.ts';
import * as puppeteer from "npm:puppeteer";

export const GET = (async ({ request }) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(resumeHtml, {waitUntil: 'domcontentloaded'})
    await page.emulateMediaType('screen');

    const pdfBuffer = await page.pdf({format: 'letter'});

    await browser.close();

    return new Response(pdfBuffer, {
        status: 200,
        statusText: "OK",
        headers: {
            'content-type': 'application/pdf',
            'content-disposition': `attachment;filename="${config.siteTitle}.pdf"`,
            'content-length': pdfBuffer.length.toString()
        }
    });
}) satisfies RequestHandler