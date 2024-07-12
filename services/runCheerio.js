const cheerio = require('cheerio');
const { httpsGetRequest, retryOperation, xhrGetRequest } = require('../utils');

async function runCheerio(url) {
   return retryOperation(async () => {
      const data = await xhrGetRequest(url); // httpsGetRequest(url);


      if (!data) {
         throw new Error("No response from atp media notes.");
      }

      const $ = cheerio.load(data);


      let arr = 3;

      const wta = []; // { eventDetails1, pdfLink1, pdfText1 };
      for (let i = 0; i < arr; i++) {
         let eventDetails = $("div.static-article__body.article-body.wrapper > p > strong").eq(i).text() || "";
         let pdfContainerIndex = (i * 2) + 1;

         let pdfLink = $("div.static-article__body.article-body.wrapper > p").eq(pdfContainerIndex).find("a").last().attr("href") || "";
         let pdfText = $("div.static-article__body.article-body.wrapper > p").eq(pdfContainerIndex).find("a").last().text() || "";
         eventDetails = eventDetails.length > 0 && eventDetails?.split("|");
         const eventDay = pdfText && pdfText.match(/day \d+|qf|sf|Singles Final/gi)?.[0];

         wta.push({
            tournamentName: eventDetails?.[0].trim(),
            tournamentLocation: eventDetails?.[1]?.trim(),
            tournamentLink: pdfLink, pdfText,
            tournamentDay: eventDay
         });
      }

      if (Array.isArray(wta)) {
         return wta.filter(e => (/(Day \d+|QF|SF|Singles Final)/gi).test(e.pdfText));
      }
   })();
}


module.exports = runCheerio