const path = require('path');

const puppeteer = require('puppeteer');


class ScreenShot {
    async screenShot(url,saveDirectory){
        if(! this.browser){
            this.browser = await puppeteer.launch();
        }
        const page = await this.browser.newPage();
        await page.goto(url);
        const fileName = encodeURIComponent(url) + '.png';
        await page.screenshot({path: path.resolve(saveDirectory,fileName)});
    }
}

module.exports = ScreenShot;