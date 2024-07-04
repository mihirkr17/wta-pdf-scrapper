/**
 * init/index.js
 * Author: Mihir Roy
 * Senior Node Dev
 */

const { constant } = require("../config");

const {
   createPostOfWP,
   getPostTagIdsOfWP,
   getMediaIdOfWP,
   checkExistingPostOfWP,
   downloadPDF,
   paraphraseContents
} = require("../services");

// Template files
const matchstatsTemplate = require("../templates/matchstatsTemplate");
const stevegtennisTemplate = require("../templates/stevegtennisTemplate");

const { consoleLogger, extractMatchInfo,
   imgWrapper,
   delay,
   slugMaker,
   capitalizeFirstLetterOfEachWord,
   getSurnameOfPlayer,
   isValidPdfUrl
} = require("../utils");


// Translate Library
const translate = (...args) =>
   import('translate').then(({ default: fetch }) => fetch(...args));

translate.engine = 'libre';
translate.key = process.env.LIBRE_TRANSLATE_KEY;

const sites = [
   {
      id: 1,
      siteName: "Stevegtennis",
      siteCode: "sg",
      siteDomain: constant?.domainSg,
      authToken: constant?.authTokenSg,
      authorId: constant?.authorIdSg,
      templates: stevegtennisTemplate,
      chatgptCommand: "Rewrite this in #language, not adding extra facts that are not in this text, reply in paragraph form, in an interesting tennis journalistic manner with a long as possible reply: #texts"
   },
   {
      id: 2,
      siteName: "Matchstat",
      siteCode: "ms",
      siteDomain: constant?.domainMs,
      authToken: constant?.authTokenMs,
      authorId: constant?.authorIdMs,
      templates: matchstatsTemplate,
      chatgptCommand: 'With your reply in #language, including all facts in this text, rewrite "#texts"'
   }
];

async function init(note) {
   try {

      const { tournamentLink = "", tournamentName = "", tournamentLocation = "" } = note;

      let postCounter = 0;

      if (typeof tournamentLink !== "string" || !isValidPdfUrl(tournamentLink)) {
         return { message: "Invalid tournament link." };
      }

      if (typeof tournamentName !== "string" || tournamentName.length === 0) {
         return { message: "Invalid tournament name." };
      }

      if (typeof tournamentLocation !== "string" || tournamentLocation.length === 0) {
         return { message: "Invalid tournament location." };
      }

      consoleLogger(`Downloading pdf from ${tournamentLink}.`);

      const downloadedPdf = await downloadPDF(tournamentLink);

      if (!downloadedPdf) {
         return { message: "Pdf not found." };
      }

      consoleLogger(`PDF parsed. Extracting...`);

      // Extracting match details from pdf contents | basically it returns [Array];
      const matchedContents = extractMatchInfo(downloadedPdf, note);

      if (!Array.isArray(matchedContents) || matchedContents?.length === 0) {
         return { message: "No matched contents." };
      }

      consoleLogger(`Pdf downloaded and extracted contents successfully.`);

      // Rest codes
      for (const site of sites) {
         const { siteDomain, siteName, chatgptCommand, templates, siteCode, authToken, authorId } = site;

         consoleLogger(`Running ${siteDomain}.`);

         if (!authToken) {
            consoleLogger(`Sorry! Auth token not found from ${siteName}.`);
            continue;
         }

         consoleLogger(`Auth token found from ${siteName}.`);

         if (!templates || !Array.isArray(templates)) {
            consoleLogger(`Post template not found from ${siteName}.`);
            continue
         }

         consoleLogger(`Post template found from ${siteName}.`);

         consoleLogger(`Total ${matchedContents.length * templates.length} post will create for ${siteName}.`);

         let postIndex = 1;

         for (const matchContent of matchedContents) {

            const {
               player1, player2, player1slug, player2slug, player1Surname, player2Surname,
               content, eventName, eventAddress, eventDay, eventRound, eventHeadingTwo,
               leads, eventYear, eventDate
            } = matchContent;

            const text = content;
            const plainEventName = eventName?.replace(/\d/g, '')?.trim();

            if (!player1 || !player2 || !eventName || !eventAddress || !eventDate || !content) {
               consoleLogger(`${postIndex}. Some fields are missing. Content skipped.`);
               continue;
            }

            try {
               let playerOneMedia = {}, playerTwoMedia = {};

               playerOneMedia = await getMediaIdOfWP(constant.mediaUri(siteDomain, `wta_${player1slug}`), authToken);
               playerTwoMedia = await getMediaIdOfWP(constant.mediaUri(siteDomain, `wta_${player2slug}`), authToken);

               if (!playerOneMedia?.mediaId) {
                  playerOneMedia = await getMediaIdOfWP(constant.mediaUri(siteDomain, `wta_generic${Math.floor(Math.random() * 6) + 4}`), authToken);
               }

               if (!playerTwoMedia?.mediaId) {
                  playerTwoMedia = await getMediaIdOfWP(constant.mediaUri(siteDomain, `wta_generic${Math.floor(Math.random() * 6) + 4}`), authToken);
               }

               // Generate image wrapper
               const imageWrapperHtml = imgWrapper([playerOneMedia, playerTwoMedia], player1Surname, player2Surname);

               await Promise.all(templates.map(async (template, templateIndex) => {

                  const { tpCategoryId, tpCategory, tpLanguage, tpLanguageCode, tpEventTag, tpPlayerTag, tpPlayerVsPlayerTag, tpTitle, tpContent } = template;

                  let newTitle = "";
                  try {
                     if (!tpCategoryId || !tpCategory || !tpLanguage || !tpEventTag) {
                        throw new Error(`Temp ${templateIndex}. Post skipped. Required [ categoryId, category, language, eventTag ]`);
                     }

                     const playerOneTag = tpPlayerTag?.replace("#playerName", player1);
                     const playerTwoTag = tpPlayerTag?.replace("#playerName", player2);
                     const playerVsPlayerTag = tpPlayerVsPlayerTag ?
                        tpPlayerVsPlayerTag?.replace("#player1Surname", player1Surname)?.replace("#player2Surname", player2Surname) : "";

                     const eventTag = tpEventTag?.replace("#eventName", siteCode === "sg" ? eventName : plainEventName);

                     const [eventHeadingTwoTranslate, eventAddressTranslate, eventDayTranslate, eventDateTranslate] = await Promise.all([
                        translate(eventHeadingTwo, { from: 'en', to: tpLanguageCode }),
                        translate(eventAddress, { from: 'en', to: tpLanguageCode }),
                        translate(eventDay, { from: 'en', to: tpLanguageCode }),
                        translate(eventDate, { from: 'en', to: tpLanguageCode }),
                     ]);


                     // For Stevegtennis site
                     if (siteCode === "sg") {
                        newTitle = tpTitle?.replace("#eventName", eventName)
                           ?.replace("#player1", player1)
                           ?.replace("#player2", player2)
                           ?.replace("#eventDate", eventDateTranslate);
                     }

                     // For Matchstats site
                     if (siteCode === "ms") {
                        newTitle = tpTitle?.replace("#eventName", plainEventName)
                           ?.replace("#player1Surname", player1Surname)
                           ?.replace("#player2Surname", player2Surname)
                           ?.replace("#eventYear", eventYear);
                     }

                     let title = capitalizeFirstLetterOfEachWord(newTitle);
                     title = title?.replace(/Wta/gi, "WTA");

                     // Generating post slug
                     const slug = slugMaker(title);


                     // Finding duplicate post by slug
                     const isUniquePost = await checkExistingPostOfWP(constant?.postExistUri(siteDomain, slug), authToken);

                     if (isUniquePost) {
                        consoleLogger(`Temp ${templateIndex}. Post already exists [ SLUG: ${slug} ].`);
                        return;
                     }

                     consoleLogger(`${postIndex}. Post Slug: ${slug}.`);

                     consoleLogger(`${postIndex}. Tags: ${[playerOneTag, playerTwoTag, eventTag, playerVsPlayerTag].toString()}`);

                     const tagIds = await getPostTagIdsOfWP(constant?.tagUri(siteDomain), [playerOneTag, playerTwoTag, eventTag, playerVsPlayerTag], authToken);

                     if (!Array.isArray(tagIds) || tagIds.length === 0) {
                        throw new Error(`Tags are not created. Terminate the request.`);
                     }

                     consoleLogger(`${postIndex}. Created Tags ID's are : ${tagIds.toString()}`);

                     consoleLogger(`${postIndex}. Paraphrase starting...`);
                     const newChatgptCommand = chatgptCommand?.replace("#language", tpLanguage)?.replace("#texts", text);
                     const paraphrasedBlog = await paraphraseContents(newChatgptCommand);

                     if (!paraphrasedBlog || paraphrasedBlog.length === 0) {
                        consoleLogger(`${postIndex}. Sorry! Content not paraphrased.`);
                        return;
                     }

                     consoleLogger(`${postIndex}. Paraphrased done.`);

                     const htmlContent = tpContent(
                        eventName,
                        leads,
                        eventAddressTranslate,
                        player1,
                        player2,
                        eventDateTranslate,
                        eventHeadingTwoTranslate,
                        eventRound,
                        eventDayTranslate,
                        paraphrasedBlog,
                        player1slug,
                        player2slug,
                        imageWrapperHtml,
                        player1Surname,
                        player2Surname,
                        eventYear,
                        plainEventName
                     );

                     consoleLogger(`${postIndex}. Post creating...`);
                     await createPostOfWP(constant?.postUri(siteDomain), authToken, {
                        title,
                        slug,
                        content: htmlContent,
                        status: constant?.postStatus,
                        author: parseInt(authorId),
                        tags: tagIds,
                        featured_media: playerOneMedia?.mediaId || playerTwoMedia?.mediaId,
                        categories: [tpCategoryId]
                     });
                     consoleLogger(`${postIndex}. Post created successfully.`);

                     postCounter += 1;
                     postIndex++;
                  } catch (error) {
                     consoleLogger(`ERROR: ${error?.message}.`);
                     await delay(1000);
                  }
               }));
            } catch (error) {
               consoleLogger(`Error In Contents: ${error?.message}. Post skipped.`);
               await delay(1000);
               continue;
            }
         }
      }


      // Rest codes

      return { message: `${postCounter >= 1 ? `Total ${postCounter} posts created.` : "No posts have been created."} Operation done.` };
   } catch (error) {
      throw new Error(`Error In Init: ${error?.message}`);
   }
};

module.exports = init;