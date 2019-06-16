const path = require('path');

const puppeteer = require('puppeteer');


class ScreenShot {
    async init(){
        if(! this.browser){
            this.browser = await puppeteer.launch({headless:true,ignoreHTTPSErrors: true});
        }
        this.timeout = 30 * 1000
    }

    async screenShot(url,saveDirectory){
        try {
            const page = await this.browser.newPage();
            await page.goto(url,{timeout:this.timeout});
            const fileName = encodeURIComponent(url.replace('://','_')) + '.png';
            await page.screenshot({path: path.resolve(saveDirectory, fileName)});
            console.log(`get ${url} screenshot succeed`);
            await page.close()
        } catch (e) {
            console.log(`get ${url} screenshot failed, ${e.message}`);
        }
    }
}

module.exports = ScreenShot;