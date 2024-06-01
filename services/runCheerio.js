const cheerio = require('cheerio');
const { httpsGetRequest, retryOperation } = require('../utils');

async function runCheerio(url) {
   return retryOperation(async () => {
      const data = await httpsGetRequest(url);

      if (!data) {
         throw new Error("No response from atp media notes.");
      }

      const $ = cheerio.load(data);

      console.log(data);

      const ul = $('div.static-article__body.article-body.wrapper > p a');

      const links = [];

      if (ul) {
         ul.each((_, pdf) => {
            const aLink = $(pdf)?.attr("href");
            const title = $(pdf)?.text();

            if (title.match(/Day \d/gi)) {
               links.push(aLink)
            }
         });
         return links;
      }
   })();
}


module.exports = runCheerio