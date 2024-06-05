const fs = require("fs");
const https = require("https");
const splitString = require("split-string");
const fetch = (...args) =>
   import('node-fetch').then(({ default: fetch }) => fetch(...args));

const delay = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));

const consoleLogger = (msg = "") => (console.log(`[${new Date(Date.now()).toLocaleTimeString('en-US', { timeZone: "UTC" })}] ${msg}`));

function getSurnameOfPlayer(fullName) {
   const nameParts = fullName?.split(' ');
   return nameParts[nameParts.length - 1];
}

function imgWrapper(arr, playerOneSurname, playerTwoSurname) {
   return arr.map((item, index) => {
      return (`<img src="${item?.sourceUrl}" title="${index === 0 ? playerOneSurname + " vs " + playerTwoSurname : playerTwoSurname + " vs " + playerOneSurname}" alt="${item?.slug}" style="flex: 1; width: 50%;" />`);
   });
}

function retryOperation(func, retries = 5) {
   return async function (...args) {
      const isInfinite = typeof retries === "string" && retries === "infinity";
      let attemptsLeft = isInfinite ? Infinity : retries;

      while (attemptsLeft > 0) {
         try {
            return await func(...args);
         } catch (error) {
            consoleLogger(`An unexpected error occurred: ${error?.message}. Retrying after 2s`);

            if (!isInfinite) {
               attemptsLeft--;

               if (attemptsLeft === 0) {
                  throw new Error(`Retry limit reached, Last Error: ${error.message}`);
               }
            }

            await delay(4000);
         }
      }

      throw new Error('Retry attempts exhausted');
   }
}

function slugMaker(str) {
   // Convert the string to lowercase
   let slug = str.toLowerCase();

   // Replace spaces with hyphens
   slug = slug.replace(/\s+/g, '-');

   // Remove special characters but preserve specific scripts
   slug = slug.replace(/[^a-z0-9\-\u0900-\u097F\u0400-\u04FF\u0370-\u03FF\u0600-\u06FF\u3040-\u30FF\u4E00-\u9FFF\u3400-\u4DBF]+/g, '');

   // Trim any leading or trailing hyphens
   slug = slug.replace(/^-+|-+$/g, '');

   // Handle consecutive hyphens
   slug = slug.replace(/-{2,}/g, '-');

   return slug;
}

// Creating file asynchronously.
async function createFileAsynchronously(fileName, data) {
   return retryOperation(async () => {
      return new Promise((resolve, reject) => {

         let writer = fs.createWriteStream(fileName);

         writer.on("error", (err) => {
            reject(err);
         });

         writer.on("finish", () => {
            resolve("File saved.");
         });

         writer.write(data);
         writer.end();
      });

   })();
}

// Reading file asynchronously
async function readFileAsynchronously(fileName, type = "text") {
   return retryOperation(async () => {
      return new Promise((resolve, reject) => {

         let stream = fs.createReadStream(fileName);

         let data = type === "buffer" ? [] : "";

         stream.on("error", (err) => {
            reject(err);
         });

         stream.on("data", (chunk) => {
            if (type === "buffer") {
               data.push(chunk);
            } else {
               data += chunk;
               resolve(chunk);
            }
         });
         stream.on("end", () => resolve(type === "buffer" ? Buffer.concat(data) : data));
      });
   })()
}

// Post request wrapper
async function xhrPostRequest(url, token = "", body = {}, type = "text") {
   try {
      const response = await fetch(url, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${token}`
         },
         body: JSON.stringify(body)
      });
      return type === "json" ? await response.json() : await response.text();
   } catch (error) {
      throw error;
   }
}

// Get request wrapper
async function xhrGetRequest(url, token = "", type = "text") {
   try {
      const response = await fetch(url, {
         method: "GET",
         headers: {
            Authorization: `Basic ${token}`
         },
      });
      return type === "json" ? await response.json() : await response.text();
   } catch (error) {
      throw error;
   }
}

// Fetch data by build in https module
function httpsGetRequest(url, type = "text") {
   return new Promise((resolve, reject) => {

      if (type !== "text" && type !== "buffer") {
         reject(new Error("Invalid response type. Use 'text' or 'buffer'."));
         return;
      }

      https.get(url, (response) => {
         const isBuffer = (type === "buffer") ? true : false;

         let data = isBuffer ? [] : "";

         response.on('data', (chunk) => {

            if (isBuffer) {
               data.push(chunk);
            } else {
               data += chunk;
            }
         });
         response.on('end', () => {
            resolve(isBuffer ? Buffer.concat(data) : data);
         });

      }).on('error', (error) => {
         reject(error);
      });
   });
}


function findPlayerNames(inputString) {

   // console.log(inputString);
   const removeRegex = /\[?\d+R\]?/g;
   const matchRound = inputString.match(removeRegex);

   let match = inputString?.split(/\s+vs\.\s+/);

   // const removeAnyBraces = /(\[[^\]]*\]|\([^)]*\))\s*/g;
   const removeAnyBraces = /\[[^\]]*\]|\([^)]*\)/g;
   const removeColons = /[^:]*:|\[.*?\]|:/g;

   const secondPart = match[1] ? match[1].replace(removeAnyBraces, "") : "";

   const player2Section = secondPart?.split("  ")?.filter(e => e);

   return {
      player1: match[0] ? match[0].replace(removeAnyBraces, "").replace(removeColons, "")?.trim() : "",
      player2: player2Section ? player2Section[0]?.trim() : "",
      leads: player2Section ? player2Section[1]?.trim() : "",
      round: matchRound ? matchRound[0].replace(/\[|\]/g, "") : null
   }
}


function extractMatchInfo(text, eventDetails) {

   const splittedTexts = text?.split("\n")?.filter(line => line?.trim().length !== 0);

   let dayDateString;

   // new variables
   let tournamentHistory = "";
   // let playerNameString;
   let seasonHistory = "";
   let paragraph = "";

   // const matchup = [];
   let tournamentHistoryTracker = false;
   let tournamentHistoryHeadTracker = false;

   let seasonHistoryTracker = false;
   let seasonHistoryHeadTracker = false;

   let paragraphTracker = false;
   let paragraphHeadTracker = false;

   let eventNameAndAddress = eventDetails?.split("|");


   for (let i = 0; i < splittedTexts.length; i++) {

      const line = splittedTexts[i]?.trim();

      if ((/ vs\. .+ (leads|First meeting|Tied)/gi).test(line)) {
         paragraphTracker = true;
         paragraphHeadTracker = true;
      } else {
         paragraphHeadTracker = false;
      }

      if ((/MATCH NOTES/gi).test(line)) {
         paragraphTracker = false;
      }

      // track match paragraph
      if (paragraphTracker) {
         if (paragraphHeadTracker) {
            paragraph += "paragraphBreakHere \n";
         }
         paragraph += line + "\n";
      }

      if ((/TOURNAMENT HISTORY/gi).test(line)) {
         tournamentHistoryTracker = true;
         tournamentHistoryHeadTracker = true;
      } else {
         tournamentHistoryHeadTracker = false;
      }

      if ((/Recent Tournament History/gi).test(line)) {
         tournamentHistoryTracker = false;
      }

      if (tournamentHistoryTracker) {
         if (tournamentHistoryHeadTracker) {
            tournamentHistory += "tournamentHistoryBreakHere\n";
         }
         tournamentHistory += (line + "\n");
      }

      if ((/Season+\s\d+\sHistory/gi).test(line)) {
         seasonHistoryTracker = true;
         seasonHistoryHeadTracker = true;
      } else {
         seasonHistoryHeadTracker = false;
      }

      if ((/Titles/gi).test(line)) {
         seasonHistoryTracker = false;
      }

      if (seasonHistoryTracker) {
         if (seasonHistoryHeadTracker) {
            seasonHistory += "seasonHistoryBreakHere\n";
         }
         seasonHistory += (line + "\n");
      }

      if ((/MATCH NOTES [–|-|–] DAY \d+ [–|-|–]/i).test(line)) {
         dayDateString = line;
      }
   }

   // Splitting 3 sections 
   const paragraphs = paragraph?.split("paragraphBreakHere")?.filter(e => e?.trim());

   const tournamentHistories = tournamentHistory?.split("tournamentHistoryBreakHere")?.filter(e => e?.trim());

   // const seasonHistories = seasonHistory?.split("seasonHistoryBreakHere")?.filter(e => e?.trim());

   // Result will assign here
   const results = [];

   dayDateString = dayDateString?.split(/[–|-]/g);

   const eventDay = dayDateString[1]?.trim();

   const eventDate = dayDateString[2]?.trim()?.replace(/\s+/g, " ");

   const eventName = eventNameAndAddress[0]?.trim() || "";

   const eventAddress = eventNameAndAddress[1]?.trim() || "";

   // Looping paragraphs
   for (const para of paragraphs) {
      const player = findPlayerNames(para?.trim()?.split("\n")[0] || "");

      const matchLeads = player?.leads ? player?.leads : "";

      const parts = matchLeads && matchLeads?.split(/\s(?=\d)/);

      const leadKey = parts[0] ? parts[0] : "";
      const leadValue = parts[1] ? parts[1] : "";

      const regex = new RegExp(matchLeads, 'g');

      const regexWith = `${leadKey}${leadValue ? " head to head " + leadValue + "." : "."}`;
      const slugRegex = /[-\s]/g;

      const p1r = player?.player1?.replace(/ /g, "|");
      const p2r = player?.player2?.replace(/ /g, "|");

      const regex2 = new RegExp(`${p1r}|${p2r}`, "gi");

      // Getting tournament by player names...
      const tournamentNew = tournamentHistories && tournamentHistories?.map((str) => {
         let matchIndex = str.lastIndexOf("MATCH NOTES");
         const subStr = str.substring(matchIndex);

         if (regex2.test(subStr)) {
            let splitStr = str?.split(/PLAYER NOTES\n/gi);
            let player1Tour = splitStr[1]?.replace(/CURRENT TOURNAMENT[\s\S]*/gi, "");
            let player2Tour = splitStr[2]?.replace(/MATCH NOTES[\s\S]*/gi, "");

            let playerOneTournamentLines = player1Tour?.split('\n');
            playerOneTournamentLines?.unshift(player?.player1 + " Tournament History:\n");
            const pt1 = playerOneTournamentLines?.join(" ");

            let playerTwoTournamentLines = player2Tour?.split('\n');
            playerTwoTournamentLines?.unshift(player?.player2 + " Tournament History:\n");
            const pt2 = playerTwoTournamentLines?.join(" ");

            return (pt1 || "") + "\n\n" + (pt2 || "");
         } else {
            return "";
         }
      })?.filter(e => e);




      //  Getting season history by player names...
      // const seasonHistoryNew = seasonHistories && seasonHistories?.map(str => {
      //    let matchIndex = str?.lastIndexOf("MATCH NOTES");
      //    const subStr = str?.substring(matchIndex)
      //    if (regex2.test(subStr)) {
      //       let splitStr = str?.replace(/VALUE\s?WTA\s?RANK\s?MATCH\s?STATS\s?VALUE\s?WTA\s?RANK\n[\s\S]*/gi, "")?.split("\n")?.filter(e => e?.trim());
      //       let seasonHistoryHeader = splitStr[0];
      //       splitStr?.shift();
      //       seasonHistoryHeader = `${seasonHistoryHeader} of ${player?.player1} and ${player?.player2}:\n`;
      //       splitStr?.unshift(seasonHistoryHeader);

      //       return splitStr?.join(" ");
      //    } else {
      //       return "";
      //    }
      // })?.filter(e => e);

      const newParagraph = para?.replace(regex, regexWith)?.replace(/\n/g, " ")?.trim() || "";

      const eventHeadingTwo = `${eventDay} - ${eventDate}, ${eventAddress}.`;

      if (tournamentNew && eventDay && eventDate && eventName && eventAddress) {

         results.push({
            content: (newParagraph + "\n\n" + (tournamentNew[0] || "")),
            player1: player?.player1,
            player2: player?.player2,
            player1slug: player?.player1?.toLowerCase()?.replace(slugRegex, "_"),
            player2slug: player?.player2?.toLowerCase()?.replace(slugRegex, "_"),
            leads: matchLeads,
            round: player?.round,
            eventDate: eventDate?.trim(),
            eventDay,
            eventName: eventName,
            eventHeadingTwo: eventHeadingTwo?.trim(),
            eventAddress: eventAddress
         });
      }
   }
   return results;
}

function compareAndSeparatePdf(newMediaPdf, fixedMediaPdf) {
   const fixedSet = new Set(fixedMediaPdf.map(item => (item)));

   const newValues = [];
   for (const item of newMediaPdf) {
      if (!fixedSet.has(item)) {
         newValues.push(item);
      }
   }

   return newValues;
}


function capitalizeFirstLetterOfEachWord(string) {
   if (!string) return string;
   return string.toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

module.exports = {
   xhrGetRequest,
   xhrPostRequest,
   delay,
   consoleLogger,
   imgWrapper,
   slugMaker,
   readFileAsynchronously,
   createFileAsynchronously,
   extractMatchInfo,
   compareAndSeparatePdf,
   retryOperation,
   httpsGetRequest,
   capitalizeFirstLetterOfEachWord,
   getSurnameOfPlayer
}