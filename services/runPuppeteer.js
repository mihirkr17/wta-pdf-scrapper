let puppeteer = require("puppeteer-extra");
const Stealth = require("puppeteer-extra-plugin-stealth");
const { consoleLogger } = require("../utils");


async function runPuppeteer(url) {
   let browser;

   if (!url) {
      throw new Error("Required atp media url!");
   }

   puppeteer = puppeteer.use(Stealth());

   browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

   let page = await browser.newPage();

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