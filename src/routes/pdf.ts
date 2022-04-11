import puppeteer from "puppeteer";
import config from "../website.config";

export async function get() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(config.siteUrl);
    await page.emulateMediaType('screen');

    const pdfBuffer = await page.pdf({format: 'letter'});

    await browser.close();

    return {
        status: 200,
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment;filename="${config.siteTitle}.pdf"`,
            'Content-Length': pdfBuffer.length
        },
        body: pdfBuffer
    }
}