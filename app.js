require("dotenv").config();

const {
   consoleLogger,
} = require("./utils");


const init = require("./init");
const { constant } = require("./config");

(async () => {
   try {

      const appAction = process.env.ACTION;

      if (appAction == "off") {
         process.exit(0);
      }

      const noteUrl = process.env.MEDIA_NOTE_URL;
      const noteDay = process.env.MEDIA_NOTE_DAY;
      const noteTournamentLocation = process.env.MEDIA_NOTE_TOURNAMENT_LOCATION;
      const noteTournament = process.env.MEDIA_NOTE_TOURNAMENT;
      const round = process.env.MEDIA_NOTE_TOURNAMENT_ROUND;

      if (!constant?.postStatus || !constant?.postStatusAll.includes(constant?.postStatus)) {
         throw new Error(`ERROR: Post status must be set as "POST_STATUS=publish or future or draft or pending or private" in .env`);
      }

      if (!constant?.authorIdSg || !(/[0-9]/g).test(constant?.authorIdSg) || !constant?.authorIdMs || !(/[0-9]/g).test(constant?.authorIdMs)) {
         throw new Error(`ERROR: Author id must be set as "AUTHOR_ID_SG=12345 | AUTHOR_ID_MS=12345" in .env`);
      }

      if (!noteUrl) {
         throw new Error(`ERROR: Required tournament pdf url link.`);
      }

      if (!noteDay) {
         throw new Error(`ERROR: Required tournament day.`);
      }

      if (!noteTournamentLocation) {
         throw new Error(`ERROR: Required tournament location.`);
      }

      if (!noteTournament) {
         throw new Error(`ERROR: Required tournament name.`);
      }

      const noteDetail = {
         tournamentName: noteTournament,
         tournamentLocation: noteTournamentLocation,
         tournamentLink: noteUrl,
         tournamentDay: noteDay
      }

      if (round && round !== "null") {
         Object.assign(noteDetail, { round: round })
      }

      consoleLogger(`Running ${noteTournament}, ${noteTournamentLocation}, ${noteDay}.`);

      const result = await init(noteDetail);
      consoleLogger(`${result?.message}`);

   } catch (error) {
      consoleLogger(error?.message);
      process.exit(1);
   } finally {
      process.exit(0);
   }
})();