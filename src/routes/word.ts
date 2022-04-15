import puppeteer from "puppeteer";
import htmldocx from "html-to-docx";
import config from "../website.config";

export async function get() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(config.siteUrl);
    await page.emulateMediaType('print');
    await page.setViewport({width: 816, height: 1054 });

    // page.evaluate((select:string) => {
    //     var element = document.querySelector(select);
    //     element?.parentNode?.removeChild(element);
    // }, '.action.bar');

    const html = await page.content();
    const docxBuffer = await htmldocx(html);

    await browser.close();

    return {
        status: 200,
        headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'Content-Disposition': `attachment;filename="${config.siteTitle}.docx"`,
            'Content-Length': docxBuffer.length
        },
        body: docxBuffer
    }
}