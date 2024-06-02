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

async function init() {
   try {
      const resources = postTemplate;

      if (!resources || !Array.isArray(resources)) {
         throw new Error(`Resource not found.`);
      }

      consoleLogger("Resource found.");

      consoleLogger(`Script started for ${constant?.clientDomainName}.`);

      // Getting pdf first link
      const mediaNotes = await getPdfLinks(constant?.wtaNoteUri);

      let mediaNoteLinks = mediaNotes?.links.slice(0, 1) || ["https://wtafiles.wtatennis.com/pdf/matchnotes/2024/903_8.pdf"];

      const lengthOfNoteUrls = mediaNoteLinks?.length || 0;

      if (lengthOfNoteUrls <= 0 || !Array.isArray(mediaNoteLinks)) {
         return { message: `Sorry no media note urls available right now!` };
      }

      consoleLogger(`Found ${lengthOfNoteUrls} media note urls.`);

      // Extracting event details from media notes
      const eventDetails = mediaNotes?.eventDetails || "Roland Garros  |  Paris, France  |  Grand Slam  |  May 26 - June 9";

      if (!eventDetails || eventDetails.length < 0) {
         return { message: `Sorry no events available right now!` };
      }

      // Basic wordpress authentication
      const token = constant?.restAuthToken;

      if (!token) {
         throw new Error(`Sorry! Auth token not found.`);
      }

      consoleLogger(`Found auth token successfully.`);

      let indexOfPdf = 1;
      let postCounter = 0;

      for (const mediaNoteLink of mediaNoteLinks) {

         try {

            // Download pdf by link and extracted contents by Pdf parser.
            const pdfNoteUrl = mediaNoteLink;

            consoleLogger(`Link-${indexOfPdf}. ${pdfNoteUrl}.`);

            const pdfTextContents = await downloadPDF(pdfNoteUrl);

            if (!pdfTextContents) {
               continue;
            }

            consoleLogger(`Successfully got PDF texts.`);

            // Extracting match details from pdf contents | basically it returns [Array];
            const contents = extractMatchInfo(pdfTextContents, eventDetails);

            if (!Array.isArray(contents) || contents.length === 0) {
               continue;
            }

            consoleLogger(`Pdf downloaded and extracted contents successfully.`);

            for (const content of contents) {
               const playerOne = content?.player1;
               const playerTwo = content?.player2;
               const player1slug = content?.player1slug;
               const player2slug = content?.player2slug;
               const text = content?.content;
               const eventName = content?.eventName;
               const eventDate = content?.eventDate;
               const eventDay = content?.eventDay;
               const eventAddress = content?.eventAddress;
               const eventRound = content?.round || null;
               const eventHeadingTwo = content?.eventHeadingTwo;
               const leads = content?.leads;
               const playerOneSurname = getSurnameOfPlayer(playerOne);
               const playerTwoSurname = getSurnameOfPlayer(playerTwo);

               if (!playerOne || !playerTwo || !eventName) {
                  consoleLogger(`Some fields are missing.`);
                  continue;
               }

               try {
                  let playerOneMedia = {}, playerTwoMedia = {};

                  playerOneMedia = await getMediaIdOfWP(constant.mediaUri(player1slug), token);
                  playerTwoMedia = await getMediaIdOfWP(constant.mediaUri(player2slug), token);

                  if (!playerOneMedia?.mediaId) {
                     playerOneMedia = await getMediaIdOfWP(constant.mediaUri(`wta_generic${Math.floor(Math.random() * 6) + 1}`), token);
                  }

                  if (!playerTwoMedia?.mediaId) {
                     playerTwoMedia = await getMediaIdOfWP(constant.mediaUri(`wta_generic${Math.floor(Math.random() * 6) + 1}`), token);
                  }

                  const imageWrapperHtml = imgWrapper([playerOneMedia, playerTwoMedia], playerOneSurname, playerTwoSurname);

                  await Promise.all(resources.map(async (resource) => {
                     if (!resource?.categoryId || !resource?.category || !resource?.language) {
                        return;
                     }

                     const categoryId = resource?.categoryId;
                     const playerOneTag = resource?.tags?.replace("name", playerOne);
                     const playerTwoTag = resource?.tags?.replace("name", playerTwo);
                     const eventTag = eventName + " " + resource?.category;

                     try {
                        const [eventHeadingTwoTranslate, eventAddressTranslate, eventDayTranslate, eventDateTranslate] = await Promise.all([
                           translate(eventHeadingTwo, { from: 'en', to: resource?.languageCode }),
                           translate(eventAddress, { from: 'en', to: resource?.languageCode }),
                           translate(eventDay, { from: 'en', to: resource?.languageCode }),
                           translate(eventDate, { from: 'en', to: resource?.languageCode }),
                        ]);

                        const newTitle = resource?.title?.replace("eventName", eventName)
                           ?.replace("playerOne", playerOne)
                           ?.replace("playerTwo", playerTwo)
                           ?.replace("eventDate", eventDateTranslate);

                        const title = capitalizeFirstLetterOfEachWord(newTitle);
                        const slug = slugMaker(title);

                        const isUniquePost = await checkExistingPostOfWP(constant?.postExistUri(slug), token);

                        if (isUniquePost) {
                           consoleLogger(`Post already exist for ${slug}.`);
                           return;
                        }

                        consoleLogger(`Starting post for ${resource?.language}. Slug: ${slug}. ${eventDay}`);
                        consoleLogger("Tags generating...");

                        const tagIds = await getPostTagIdsOfWP(constant?.tagUri, [playerOneTag, playerTwoTag, eventTag], token);
                        consoleLogger(`Tags generated. Ids: ${tagIds}`);

                        await delay();
                        consoleLogger("Paraphrase starting...");
                        const paraphrasedBlog = await paraphraseContents(constant?.paraphrasedCommand(resource?.language, text));
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
                           imageWrapperHtml);

                        consoleLogger(`Post creating...`);
                        await createPostOfWP(constant?.postUri, token, {
                           title,
                           slug,
                           content: htmlContent,
                           status: constant?.postStatus,
                           author: parseInt(constant?.authorId),
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
                  consoleLogger(`Error In Contents Model: ${error?.message}.`);
                  await delay(1000);
                  continue;
               }
            }
            indexOfPdf++;
         } catch (error) {
            consoleLogger(`Error In mediaNoteUrl Model: ${error.message}.`);
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