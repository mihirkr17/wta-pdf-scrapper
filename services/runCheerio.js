const cheerio = require('cheerio');
const { httpsGetRequest, retryOperation } = require('../utils');

async function runCheerio(url) {
   return retryOperation(async () => {
      const data = await httpsGetRequest(url);

      if (!data) {
         throw new Error("No response from atp media notes.");
      }

      console.log(data);

      const $ = cheerio.load(data);

      // Select the second <p> element within the specified container
      let mediaUrlContainer = $("div.static-article__body.article-body.wrapper > p").eq(1);

      // Select all <a> elements within the chosen <p> element
      const mediaPdf = mediaUrlContainer.find("a");

      // Extracting event details from the first <strong> element within the specified container
      let eventDetails = $("div.static-article__body.article-body.wrapper > p > strong").first().text();


      const links = [];

      if (mediaPdf) {
         mediaPdf.each((_, pdf) => {
            const aLink = $(pdf)?.attr("href");
            const title = $(pdf)?.text();

            if ((/Day \d/i).test(title)) {
               links.push(aLink)
            }
         });
         return { links: links.reverse(), eventDetails };
      }
   })();
}


module.exports = runCheerio