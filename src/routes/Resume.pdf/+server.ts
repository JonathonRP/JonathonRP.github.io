import type { RequestHandler } from './$types';
import * as puppeteer from "puppeteer";

export const prerender = true;

export const GET = (async ({ request, url }) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(await (await fetch(new URL('resume', url))).text(), {waitUntil: 'domcontentloaded'})
    await page.emulateMediaType('screen');

    const pdfBuffer = await page.pdf({format: 'letter'});

    await browser.close();

    return new Response(pdfBuffer, {
        status: 200,
        statusText: "OK",
        headers: {
            'content-type': 'application/pdf',
            'content-length': pdfBuffer.length.toString()
        }
    });
}) satisfies RequestHandler