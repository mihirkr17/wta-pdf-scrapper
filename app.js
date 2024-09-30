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
const { getPdfLinks } = require("./services");


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

      let mediaNotes = //await getPdfLinks("https://www.wtatennis.com/match-notes");

         [
            {
               tournamentName: "China Open",
               tournamentLocation: "Beijing, China",
               tournamentLink: "https://wtafiles.wtatennis.com/pdf/matchnotes/2024/1020_6_.pdf?x",
               tournamentDay: "Day 6"
            }
         ];

      const lengthOfMediaNoteLinks = mediaNotes.length || 0;

      if (lengthOfMediaNoteLinks <= 0) {
         consoleLogger(`Sorry no media note urls available right now!`);
         return;
      }
      // console.log(mediaNotes);
      // Operation will run here
      for (const note of mediaNotes.slice(0, 1)) {
         const link = note?.tournamentLink;

         console.log(note);

         if (link && link.length >= 1) {
            const result = await init(note);
            consoleLogger(`${result?.message}`);
         }
      }
   } catch (error) {
      consoleLogger(error?.message);
      process.exit(1);

   } finally {
      process.exit(0);
   }
})();