const fs = require("fs");
const https = require("https");
const splitString = require("split-string");
const para = require("./para");
const fetch = (...args) =>
   import('node-fetch').then(({ default: fetch }) => fetch(...args));

const delay = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));

const consoleLogger = (msg = "") => (console.log(`[${new Date(Date.now()).toLocaleTimeString('en-US', { timeZone: "UTC" })}] ${msg}`));

function getSurnameOfPlayer(fullName) {
   const nameParts = fullName?.split(' ');
   return nameParts[nameParts.length - 1];
}

function imgWrapper(arr, player1Surname, player2Surname) {
   return arr.map((item, index) => {
      if (item?.sourceUrl) {
         return (`<img height="400" width="500" src="${item?.sourceUrl}" title="${index === 0 ? player1Surname + " vs " + player2Surname : player2Surname + " vs " + player1Surname}" alt="${item?.slug}" style="flex: 1; width: 50%;" />`);
      } else {
         return null;
      }

   }).filter(e => e);
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

   if (typeof inputString !== "string" || inputString === "" || inputString.length === 0) {
      return {};
   }

   const matchRound = inputString.match(/\[?\d+R\]?/g);

   let players = inputString?.split(/\s+vs[. -]?\s+/i);

   const [player1 = "", player2WithLeads = ""] = Array.isArray(players) && players.map((p) => {
      return p?.replace(/\[[^\]]*\]|\([^)]*\)|\{[^}]*\}/gi, "")
         ?.replace(/[^:]*:|\[.*?\]|:/g, "")
         ?.replace(/\[\S\w|\w\S]/gi, "") // removed [text]
         ?.replace(/\{\S\w|\w\S}/gi, "") // removed {text}
         ?.replace(/\(\S\w|\w\S\)/g, "")?.trim(); // removed any special characters ?.replace(/\s+ [\s\S]*/, "")
   });

   // First is player 2 name and second is leads
   const [player2 = "", leads = ""] = player2WithLeads?.split(/ \s+/g);

   return { player1df: player1, player2df: player2, leads, round: matchRound?.[0]?.replace(/\[|\]/g, "") ?? "" }
}


// replace all space [-] with "_" so eg. output: john_doe
function underscoreSlugger(str) {
   if (typeof str !== "string" || str.length === 0) {
      return "";
   }

   return str.toLowerCase().replace(/\s{2,}/gi, " ").replace(/(–|-|–)/g, " ").replace(/\s+/g, "_");
}

function extractMatchInfo(text, note) {

   const { tournamentDay = "", tournamentName = "", tournamentLocation = "" } = note;

   const splittedTexts = text?.split("\n")?.filter(line => line?.trim().length !== 0);

   // new variables
   let tournamentHistory = "";
   // let playerNameString;
   // let seasonHistory = "";
   let paragraph = "";

   // const matchup = [];
   let tournamentHistoryTracker = false;
   let tournamentHistoryHeadTracker = false;

   // let seasonHistoryTracker = false;
   // let seasonHistoryHeadTracker = false;

   let paragraphTracker = false;
   let paragraphHeadTracker = false;

   let eventDate = "";

   // regex patterns 1
   const targetDateDayYearRegex = /MATCH NOTES\s+[–|-|–]\s+(DAY \d+|QUARTERFINALS)\s+[–|-|–]/i;


   // regex patterns 2
   const paragraphRegex = / vs[. -]? .+ (leads|First meeting|Tied)/gi;
   const matchNoteRegex = /MATCH NOTES/gi;

   for (let i = 0; i < splittedTexts.length; i++) {

      const line = splittedTexts[i]?.trim();

      // 1. Extracting Event day, date, year;
      if (targetDateDayYearRegex.test(line)) {
         const newLine = line && line.replace(/\s{2,}/gi, " ");
         const dateLine = newLine.match(/\b\w+day.*$/i);
         eventDate = Array.isArray(dateLine) ? dateLine[0] : "";
      }


      // 2.
      if (paragraphRegex.test(line)) {
         paragraphTracker = true;
         paragraphHeadTracker = true;
      } else {
         paragraphHeadTracker = false;
      }

      if (matchNoteRegex.test(line)) {
         paragraphTracker = false;
      }

      // track match paragraph
      if (paragraphTracker) {
         if (paragraphHeadTracker) {
            paragraph += "paragraphBreakHere \n";
         }
         paragraph += (line && line.length > 0) ? line + "\n" : "";
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
   }

   // Splitting 3 sections 
   const paragraphs = paragraph && paragraph?.split("paragraphBreakHere")?.filter(e => e.length !== 0);

   if (!Array.isArray(paragraphs) && paragraphs.length === 0) {
      return [];
   }

   const tournamentHistories = tournamentHistory?.split("tournamentHistoryBreakHere")?.filter(e => e.length !== 0);


   

   if (!Array.isArray(tournamentHistories) && tournamentHistories.length === 0) {
      return [];
   }


   const eventDay = capitalizeFirstLetterOfEachWord(tournamentDay);

   let year = typeof eventDate === "string" && eventDate?.match(/\d{4}/i);
   const eventYear = Array.isArray(year) ? year[0] : new Date().getFullYear();

   // checking date format
   if (!(/\b\w+day/i).test(eventDate)) {
      throw new Error("Sorry! The event date format isn't valid.");
   }

   eventDate = capitalizeFirstLetterOfEachWord(eventDate.replace(/\s+\,/g, ","));

   // Result will assign here
   const results = [];

   // Looping paragraphs
   for (const para of paragraphs) {


      const vsLine = para?.trim()?.split("\n")?.find(line => (/ vs[. -]?.+/gi).test(line));

      if (!vsLine) continue;

      const { player1df = "", player2df = "", leads = "", round } = findPlayerNames(vsLine || "");

      if (!player1df || player1df.length === 0 || !player2df || player2df.length === 0) {
         continue;
      }

      const player1 = capitalizeFirstLetterOfEachWord(player1df);
      const player2 = capitalizeFirstLetterOfEachWord(player2df);

      const playerRegex = new RegExp(`${player1?.replace(/ /g, "|")}|${player2?.replace(/ /g, "|")}`, "gi");

      // Getting tournament by player names...
      const tournamentNew = tournamentHistories && tournamentHistories?.map((str) => {
         let matchIndex = str.lastIndexOf("MATCH NOTES");
         const subStr = str.substring(matchIndex);

         if (playerRegex.test(subStr)) {
            let splitStr = str && str?.split(/PLAYER NOTES\n/gi);
            let player1Tour = splitStr[1]?.replace(/CURRENT TOURNAMENT[\s\S]*/gi, "");
            let player2Tour = splitStr[2]?.replace(/MATCH NOTES[\s\S]*/gi, "");

            let playerOneTournamentLines = player1Tour?.split('\n')?.filter(e => e?.trim()?.length > 0);
            playerOneTournamentLines && playerOneTournamentLines?.unshift(player1 + " Tournament History:\n");
            const pt1 = playerOneTournamentLines?.join(" ");

            let playerTwoTournamentLines = player2Tour?.split('\n')?.filter(e => e?.trim()?.length > 0);
            playerTwoTournamentLines && playerTwoTournamentLines?.unshift(player2 + " Tournament History:\n");
            const pt2 = playerTwoTournamentLines?.join(" ");

            return (pt1 || "") + "\n\n" + (pt2 || "");
         } else {
            return "";
         }
      })?.filter(e => e?.trim()?.length > 0);

      if (para && tournamentNew[0] && eventDay && eventDate && tournamentName && tournamentLocation && leads && player1 && player2) {
         const parts = leads ? leads?.split(/\s(?=\d)/) : [];

         const leadKey = parts[0] ? parts[0] : "";
         const leadValue = parts[1] ? parts[1] : "";

         const regex = new RegExp(leads, 'g');

         const regexWith = `${leadKey}${leadValue ? " head to head " + leadValue + "." : "."}`;

         const newParagraph = para?.replace(regex, regexWith)?.replace(/\n/g, " ")?.trim() || "";

         const eventAddress = capitalizeFirstLetterOfEachWord(tournamentLocation);

         const player1Surname = getSurnameOfPlayer(player1);
         const player2Surname = getSurnameOfPlayer(player2);

         const eventHeadingTwo = `${eventDay} - ${eventDate}, ${tournamentLocation}.`.trim();
         results.push({
            content: (newParagraph + "\n\n" + (tournamentNew[0] || "")),
            player1,
            player2,
            player1Surname,
            player2Surname,
            player1slug: underscoreSlugger(player1),
            player2slug: underscoreSlugger(player2),
            leads,
            eventRound: round,
            eventDate,
            eventDay,
            eventName: capitalizeFirstLetterOfEachWord(tournamentName),
            eventHeadingTwo,
            eventAddress,
            eventYear
         });
      }
   }
   return results.filter(e => e?.player1.trim().length > 0);
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


function isValidPdfUrl(url = "") {
   return new URL(url).pathname.endsWith('.pdf');
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
   getSurnameOfPlayer,
   isValidPdfUrl
}