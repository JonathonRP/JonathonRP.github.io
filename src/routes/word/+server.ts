import * as puppeteer from "puppeteer";
import { asBlob } from "html-docx-js-typescript";
import config from "$lib/website.config";

export async function GET() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(config.siteUrl);
    await page.emulateMediaType('screen');
    await page.setViewport({width: 816, height: 1054 });

    // page.evaluate((select:string) => {
    //     var element = document.querySelector(select);
    //     element?.parentNode?.removeChild(element);
    // }, '.action.bar');

    const html = await page.content();
    const docxBuffer = await asBlob(html) as Buffer;

    await browser.close();

    return new Response(docxBuffer, {
        headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'Content-Disposition': `attachment;filename="${config.siteTitle}.docx"`,
            'Content-Length': docxBuffer.length.toString()
        }
    })
}