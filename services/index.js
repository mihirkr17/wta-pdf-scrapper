const {
   xhrPostRequest,
   retryOperation,
   xhrGetRequest,
   httpsGetRequest,
   delay,
   consoleLogger
} = require("../utils");
const { paraphraseBlogText } = require("./openAI");
const runCheerio = require("./runCheerio");
const runPuppeteer = require("./runPuppeteer");
const PDFParser = require('pdf-parse');

async function getPdfLinks(url) {
   try {
      return await runCheerio(url);
      return await runPuppeteer(url);
   } catch (error) {
      return await runCheerio(url);
   }
}

async function checkExistingPostOfWP(url, token) {
   return retryOperation(async () => {
      const data = await xhrGetRequest(url, token, "json");
      return data.length >= 1;
   })();
};

async function getPostTagIdsOfWP(url, tags, token) {
   return retryOperation(async () => {
      const tagIds = [];

      for (const tag of tags) {
         try {
            const response = await xhrPostRequest(url, token, { name: tag });

            const result = response ? JSON.parse(response) : {};

            if (result?.code === "term_exists") {
               tagIds.push(result?.data?.term_id);
            } else {
               tagIds.push(result?.id);
            }
         } catch (error) {
            throw new Error(`Error In getPostTagIdsOfWP: ${error?.message}`);
         }
      }
      return tagIds.filter(e => e);
   })();
}


async function downloadPDF(url) {
   return retryOperation(async () => {
      const buffers = await httpsGetRequest(url, "buffer");
      consoleLogger(`Got pdf buffered values. Parsing pdf now...`);
      const pdfContents = await PDFParser(buffers);
      return pdfContents.text;
   }, 10)();
}


async function getMediaIdOfWP(url, token) {
   return retryOperation(async () => {
      const data = await xhrGetRequest(url, token, "json");

      if (data) {
         const media = data[0] ? data[0] : {};
         return { mediaId: media?.id, slug: media?.slug, sourceUrl: media?.source_url };
      }
   })();
}


async function createPostOfWP(url, token, body) {
   return retryOperation(async () => {
      return await xhrPostRequest(url, token, body)
   })();
}

// Paraphrasing blog contents
async function paraphraseContents(content) {
   return retryOperation(async () => {
      return await paraphraseBlogText(content);
   }, 30)();
}

// Creating wordpress post category
async function createCategoryOfWP(url, token, body) {
   return retryOperation(async () => {
      return await xhrPostRequest(url, token, body);
   })();
}

// Generating jwt token
async function generateJwtToken(url) {
   return retryOperation(async () => {
      const data = await xhrPostRequest(url, "", {}, "json");
      return data?.token;
   })();
}

module.exports = {
   getPdfLinks,
   checkExistingPostOfWP,
   getPostTagIdsOfWP,
   downloadPDF,
   getMediaIdOfWP,
   createPostOfWP,
   createCategoryOfWP,
   paraphraseContents,
   generateJwtToken
};