import * as puppeteer from "puppeteer";
import config from '$lib/website.config'

export async function GET() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(config.siteUrl);
    await page.emulateMediaType('screen');

    const pdfBuffer = await page.pdf({format: 'letter'});

    await browser.close();

    return new Response(pdfBuffer, { 
        headers: {
            'content-type': 'application/pdf',
            'content-disposition': `attachment;filename="${config.siteTitle}.pdf"`,
            'content-length': pdfBuffer.length.toString()
        }
    });
}