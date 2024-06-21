const { constant } = require("../config");
const postTemplate = require("../resource/postTemplate");

const { getPdfLinks,
   createPostOfWP,
   getPostTagIdsOfWP,
   getMediaIdOfWP,
   checkExistingPostOfWP,
   downloadPDF,
   paraphraseContents
} = require("../services");
const matchstatsTemplate = require("../templates/matchstatsTemplate");
const stevegtennisTemplate = require("../templates/stevegtennisTemplate");

const { consoleLogger, extractMatchInfo,
   imgWrapper,
   delay,
   slugMaker,
   capitalizeFirstLetterOfEachWord,
   getSurnameOfPlayer
} = require("../utils");


const translate = (...args) =>
   import('translate').then(({ default: fetch }) => fetch(...args));

translate.engine = 'libre';
translate.key = process.env.LIBRE_TRANSLATE_KEY;

async function init(siteInfo = {}, { tournamentLink = "", tournamentName = "", tournamentLocation = "" }) {
   try {

      const resources = siteInfo?.nick === "sg" ? stevegtennisTemplate : matchstatsTemplate.slice(0, 1);

      if (!resources || !Array.isArray(resources)) {
         throw new Error(`Resource not found.`);
      }

      consoleLogger("Post template resource found.");

      // Basic wordpress authentication
      const token = siteInfo?.authToken;

      if (!token) {
         throw new Error(`Sorry! Auth token not found.`);
      }

      consoleLogger(`Auth token found.`);

      let postCounter = 0;


      consoleLogger(`Downloading pdf from ${tournamentLink}.`);

      const downloadedPdf = await downloadPDF(tournamentLink);

      if (!downloadedPdf) {
         return { message: "Pdf not found." };
      }

      consoleLogger(`PDF parsed. Extracting contents now...`);

      // Extracting match details from pdf contents | basically it returns [Array];
      const matchedContents = extractMatchInfo(downloadedPdf, tournamentName, tournamentLocation);

      if (!Array.isArray(matchedContents) || matchedContents?.length === 0) {
         return { message: "No matched contents." };
      }

      consoleLogger(`Pdf downloaded and extracted contents successfully.`);

      for (const matchContent of matchedContents.slice(0, 1)) {
         const playerOne = matchContent?.player1;
         const playerTwo = matchContent?.player2;
         const player1slug = matchContent?.player1slug;
         const player2slug = matchContent?.player2slug;
         const text = matchContent?.content;
         const eventName = matchContent?.eventName;
         const eventDate = matchContent?.eventDate;
         const eventDay = matchContent?.eventDay;
         const eventAddress = matchContent?.eventAddress;
         const eventRound = matchContent?.round || null;
         const eventHeadingTwo = matchContent?.eventHeadingTwo;
         const leads = matchContent?.leads;
         const playerOneSurname = getSurnameOfPlayer(playerOne);
         const playerTwoSurname = getSurnameOfPlayer(playerTwo);
         const eventYear = matchContent?.eventYear;
         const plainEventName = eventName?.replace(/\d/g, '')?.trim();

         if (!playerOne || !playerTwo || !eventName) {
            consoleLogger(`Some fields are missing.`);
            continue;
         }

         try {
            let playerOneMedia = {}, playerTwoMedia = {};

            playerOneMedia = await getMediaIdOfWP(constant.mediaUri(siteInfo?.domain, player1slug), token);
            playerTwoMedia = await getMediaIdOfWP(constant.mediaUri(siteInfo?.domain, player2slug), token);

            if (!playerOneMedia?.mediaId) {
               playerOneMedia = await getMediaIdOfWP(constant.mediaUri(siteInfo?.domain, `wta_generic${Math.floor(Math.random() * 6) + 1}`), token);
            }

            if (!playerTwoMedia?.mediaId) {
               playerTwoMedia = await getMediaIdOfWP(constant.mediaUri(siteInfo?.domain, `wta_generic${Math.floor(Math.random() * 6) + 1}`), token);
            }

            const imageWrapperHtml = imgWrapper([playerOneMedia, playerTwoMedia], playerOneSurname, playerTwoSurname);

            await Promise.all(resources.map(async (resource) => {
               try {
                  if (!resource?.categoryId || !resource?.category || !resource?.language || !resource?.eventTag) {
                     throw new Error("Something went wrong.");
                  }

                  const categoryId = resource?.categoryId;
                  const playerOneTag = resource?.playerTag?.replace("#playerName", playerOne);
                  const playerTwoTag = resource?.playerTag?.replace("#playerName", playerTwo);
                  const playerVsPlayerTag = resource?.playerVsPlayerTag ?
                     resource?.playerVsPlayerTag?.replace("#playerOneSurname", playerOneSurname)?.replace("#playerTwoSurname", playerTwoSurname) : "";

                  const eventTag = resource?.eventTag?.replace("#eventName", infos?.nick === "sg" ? eventName : plainEventName);


                  const [eventHeadingTwoTranslate, eventAddressTranslate, eventDayTranslate, eventDateTranslate] = await Promise.all([
                     translate(eventHeadingTwo, { from: 'en', to: resource?.languageCode }),
                     translate(eventAddress, { from: 'en', to: resource?.languageCode }),
                     translate(eventDay, { from: 'en', to: resource?.languageCode }),
                     translate(eventDate, { from: 'en', to: resource?.languageCode }),
                  ]);


                  let newTitle = "";

                  if (infos?.nick === "sg") {
                     newTitle = resource?.title?.replace("#eventName", eventName)
                        ?.replace("#playerOne", playerOne)
                        ?.replace("#playerTwo", playerTwo)
                        ?.replace("#eventDate", eventDateTranslate);
                  }

                  if (infos?.nick === "ms") {
                     newTitle = resource?.title?.replace("#eventName", plainEventName)
                        ?.replace("#playerOneSurname", playerOneSurname)
                        ?.replace("#playerTwoSurname", playerTwoSurname)
                        ?.replace("#eventYear", eventYear);
                  }

                  let title = capitalizeFirstLetterOfEachWord(newTitle);
                  title = title?.replace(/Wta/gi, "WTA");
                  const slug = slugMaker(title);

                  const isUniquePost = await checkExistingPostOfWP(constant?.postExistUri(siteInfo?.domain, slug), token);

                  if (isUniquePost) {
                     consoleLogger(`Post already exist for ${slug}.`);
                     return;
                  }

                  consoleLogger(`Starting post for ${resource?.language}. Slug: ${slug}. ${eventDay}`);
                  consoleLogger("Tags generating...");

                  const tagIds = await getPostTagIdsOfWP(constant?.tagUri(siteInfo?.domain), [playerOneTag, playerTwoTag, eventTag, playerVsPlayerTag], token);

                  if (!Array.isArray(tagIds) || tagIds.length === 0) {
                     throw new Error(`Tags are not created. Terminate the request.`);
                  }

                  consoleLogger(`Tags generated. Ids: ${tagIds}`);

                  await delay();
                  consoleLogger("Paraphrase starting...");
                  const chatgptCommand = siteInfo?.chatgptCommand?.replace("#language", resource?.language)?.replace("#texts", text);
                  const paraphrasedBlog = await paraphraseContents(chatgptCommand);
                  consoleLogger("Paraphrased done.");

                  const htmlContent = resource?.contents(
                     eventName,
                     leads,
                     eventAddressTranslate,
                     playerOne,
                     playerTwo,
                     eventDateTranslate,
                     eventHeadingTwoTranslate,
                     eventRound,
                     eventDayTranslate,
                     paraphrasedBlog,
                     player1slug,
                     player2slug,
                     imageWrapperHtml,
                     playerOneSurname,
                     playerTwoSurname,
                     eventYear,
                     plainEventName
                  );

                  consoleLogger(`Post creating...`);
                  await createPostOfWP(constant?.postUri(siteInfo?.domain), token, {
                     title,
                     slug,
                     content: htmlContent,
                     status: constant?.postStatus,
                     author: parseInt(infos?.authorId),
                     tags: tagIds,
                     featured_media: playerOneMedia?.mediaId || playerTwoMedia?.mediaId,
                     categories: [categoryId]
                  });
                  consoleLogger(`Post created successfully.`);

                  postCounter += 1;
               } catch (error) {
                  consoleLogger(`Error In Resource Model: ${error?.message}.`);
                  await delay(1000);
               }
            }));
         } catch (error) {
            consoleLogger(`Error In Contents Model: ${error?.message}. Post skipped.`);
            await delay(1000);
            continue;
         }
      }

      return { message: `${postCounter >= 1 ? `Total ${postCounter} posts created.` : "No posts have been created."} Operation done.` };
   } catch (error) {
      throw new Error(`Error In Init: ${error?.message}`);
   }
};

module.exports = init;