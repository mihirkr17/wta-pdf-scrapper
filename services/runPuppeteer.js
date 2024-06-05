const puppeteer = require("puppeteer-extra");
const Stealth = require("puppeteer-extra-plugin-stealth");
const { consoleLogger } = require("../utils");
puppeteer.use(Stealth());

async function runPuppeteer(url) {
   let browser;

   if (!url) {
      throw new Error("Required atp media url!");
   }

   browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });

   let page = await browser.newPage();
   
   // Set a user agent to mimic a real browser
   await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

   await page.goto(url, { timeout: 80000, waitUntil: "domcontentloaded" });

   consoleLogger(`Hitting ${url}`);

   const data = await page.evaluate(() => {
      let mediaUrlContainer = document.querySelectorAll("div.static-article__body.article-body.wrapper > p");
      mediaUrlContainer = mediaUrlContainer[1];
      const mediaPdf = mediaUrlContainer.querySelectorAll("a");//document.querySelectorAll("div.static-article__body.article-body.wrapper p a");
      let eventDetails = document.querySelectorAll("div.static-article__body.article-body.wrapper > p > strong");
      eventDetails = eventDetails[0]?.textContent;


      const links = [];

      if (mediaPdf) {
         mediaPdf.forEach(pdf => {
            const aLink = pdf?.getAttribute("href");
            const title = pdf?.textContent;

            if ((/Day \d/i).test(title)) {
               links.push(aLink)
            }
         })
      }

      return { links: links.reverse(), eventDetails };
   });

   await browser.close()

   return data;
}

module.exports = runPuppeteer;