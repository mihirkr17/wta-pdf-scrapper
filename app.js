// const express = require("express");
// const cookieParser = require("cookie-parser");
// const schedule = require("node-schedule");
require("dotenv").config();


const {
   consoleLogger,
} = require("./utils");

// const path = require("path");
const init = require("./init");
const { constant } = require("./config");


// const app = express();
// const PORT = process.env.PORT || 8000;

// Middlewares
// app.use(cookieParser());
// app.use(express.json());
// app.set({
//    origin: "*",
//    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
//    allowedHeaders: ["Content-Type", "Authorization", "role"],
//    credentials: true,
// });
// // Serve static files from the "models" directory
// app.use(express.static(path.join(__dirname, 'models')));
// app.use(require("./routes/route"));


(async () => {
   try {
      if (!constant?.postStatus || !constant?.postStatusAll.includes(constant?.postStatus)) {
         throw new Error(`ERROR: Post status must be set as "POST_STATUS=publish or future or draft or pending or private" in .env`);
      }

      if (!constant?.authorIdSg || !(/[0-9]/g).test(constant?.authorIdSg) || !constant?.authorIdMs || !(/[0-9]/g).test(constant?.authorIdMs)) {
         throw new Error(`ERROR: Author id must be set as "AUTHOR_ID_SG=12345 | AUTHOR_ID_MS=12345" in .env`);
      }


      const sites = [
         {
            id: 1,
            siteName: "stevegtennis",
            nick: "sg",
            domain: constant?.domainSg,
            authToken: constant?.authTokenSg,
            authorId: constant?.authorIdSg,
            chatgptCommand: "Rewrite this in #language, not adding extra facts that are not in this text, reply in paragraph form, in an interesting tennis journalistic manner with a long as possible reply: #texts"
         },
         // {
         //    id: 2,
         //    siteName: "matchstat",
         //    nick: "ms",
         //    domain: constant?.domainMs,
         //    authToken: constant?.authTokenMs,
         //    authorId: constant?.authorIdMs,
         //    chatgptCommand: 'With your reply in #language, including all facts in this text, rewrite "#texts"'
         // }
      ];

      let mediaNotes = [
         {
            tournamentName: "Ecotrans Ladies Open",
            tournamentLocation: "Berlin, Germany",
            pdfLinks: ["https://wtafiles.wtatennis.com/pdf/matchnotes/2024/2012_QF.pdf"]
         }
      ];


      const lengthOfMediaNoteLinks = mediaNotes.length || 0;

      if (lengthOfMediaNoteLinks <= 0) {
         consoleLogger(`Sorry no media note urls available right now!`);
         return;
      }

      // Operation will run here
      for (const site of sites) {
         consoleLogger(`Running ${site?.siteName} site.`);
         consoleLogger(`Script started for ${site?.domain}.`);

         for (const note of mediaNotes) {
            const links = note?.pdfLinks;

            if (Array.isArray(links) && links.length >= 1) {
               const firstLink = links?.[0];
               const result = await init(site, {
                  tournamentLink: firstLink,
                  tournamentLocation: note?.tournamentLocation,
                  tournamentName: note?.tournamentName
               });
               consoleLogger(`${result?.message} for ${site?.siteName}`);
            }
         }
      }

   } catch (error) {
      consoleLogger(error?.message);
   }
})();

// app.listen(PORT, async () => {
//    try {
//       consoleLogger(`PDF scrapper server running successfully on PORT: ${PORT}`);
//    } catch (error) {
//       consoleLogger(error?.message);
//    }
// });