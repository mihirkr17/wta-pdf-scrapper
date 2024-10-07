const axios = require("axios");
const { retryOperation } = require("./utils");
require("dotenv").config();

const findingSurnames = (fullName = "") => {
   let fullNameSplit = fullName.trim().split(/\s+/);

   if (fullNameSplit && fullNameSplit.length >= 2) {
      return fullNameSplit[fullNameSplit.length - 1];
   } else {
      return fullName;
   }
}

const slugMaker = (str = "") => {
   str = str.toLowerCase();
   str = str.replace(/\./g, '');
   str = str.replace(/[\s,_+%]+/g, '-');
   str = str.replace(/\s+/g, '-');
   str = str.replace(/[,_+%]/g, ' ');
   str = str.replace(/-+/g, '-');
   str = str.replace(/-$/, '');
   return str;
}


//https://tennispredictionstoday.org/wp-json/wp-automatic-campaign/v1/get-keywords?camp_id=58845&keywords=ami|twfug

async function getUpcomingResults(url) {
   return retryOperation(async () => {
      const response = await axios({
         method: "get",
         url: url,
         headers: {
            "x-api-key": 'weLoveYouJames@1234',
         },
      });
      return response.data;
   }, 10)();
}


async function getTournamentDetails(url) {
   return retryOperation(async () => {
      const response = await axios({
         method: "get",
         url: url,
         headers: {
            "x-api-key": 'weLoveYouJames@1234',
         },
      });
      return response.data ?? {};
   }, 10)();
}

const site =    {
   siteName: "Tennis Predictions",
   apiType: "TENNIS",
   siteDomain: "https://matchstat.com/",
   apiUrl: "https://matchstat.com/tennis/api2",
   predictionUrl: "https://www.stevegtennis.com/api/tn/today_pred/limit=1000?level=2,3&group=wta",
}

async function tennisApi() {
   const { predictionUrl, apiUrl, siteDomain, siteName } = site;
   console.log(`Running ${siteName}.`);
   const upcomingResults = await getUpcomingResults(`${predictionUrl}&${Math.floor(Math.random() * 999999)}`);

   const upcomingData = Array.isArray(upcomingResults.data) ? upcomingResults.data : [];

   console.log(`Total ${upcomingData.length} upcoming matches found.`);

   const textsMs = [];
   const textsSg = [];

   // Grouped Items By Tournament Names.
   const groupedItem = {};

   //https://matchstat.com/tennis/h2h-odds-bets/
   // https://www.stevegtennis.com/head-to-head/women/Yulia_Putintseva/Shuai_Zhang/
   upcomingData.forEach(match => {

      const p1LinkMs = `${findingSurnames(match?.name_1)}|https://matchstat.com/tennis/h2h-odds-bets/${match?.name_1}/${match?.name_2}`;
      const p2LinkMs = `${findingSurnames(match?.name_2)}|https://matchstat.com/tennis/h2h-odds-bets/${match?.name_1}/${match?.name_2}`;

      let whatGroup = match?.group === "atp" ? "men" : "women";
      const p1LinkSg = `${findingSurnames(match?.name_1)}|https://www.stevegtennis.com/head-to-head/${whatGroup}/${match?.name_1.replace(/\s+/g, "_")}/${match?.name_2.replace(/\s+/g, "_")}`;
      const p2LinkSg = `${findingSurnames(match?.name_2)}|https://www.stevegtennis.com/head-to-head/${whatGroup}/${match?.name_1.replace(/\s+/g, "_")}/${match?.name_2.replace(/\s+/g, "_")}`;

      textsMs.push(p1LinkMs, p2LinkMs);
      textsSg.push(p1LinkSg, p2LinkSg);

      const tournamentName = match?.tournament;
      const identifier = `${tournamentName}$$${match?.group}`;

      if (!groupedItem[identifier]) {
         groupedItem[identifier] = [];
      }
      groupedItem[identifier].push(match);
   });

    (Object.keys(groupedItem).forEach((key) => {
      const [tourName, groupType] = key && key.split("$$");

      const tnType = groupType === "atp" ? "m" : "w";

      // const result = await getTournamentDetails(`${apiUrl}/tournament/${tnType}/${tourName}/2024`);

      // const countryName = result?.country?.name ? result?.country?.name.toLowerCase() : "";

      // Gstaad|https://matchstat.com/tennis/tournaments/m/EFG%20Swiss%20Open%20-%20Gstaad/2024

      const tourMs = `${tourName}|https://matchstat.com/tennis/tournaments/${tnType}/${tourName}/2024/`;
      textsMs.push(tourMs);


      //https://www.stevegtennis.com/draw-results/atp/Shanghai%20Rolex%20Masters%20-%20Shanghai/2024
      const tourSg = `${tourName}|https://www.stevegtennis.com/draw-results/${groupType}/${tourName}/2024/`;
      textsSg.push(tourSg);
   }));

   // const leagueLinks = await Promise.all(tournamentPromises);

   // textsMs.push(...leagueLinks);

   const filteredMsLinks = Array.from(new Set(textsMs));

   const filteredSgLinks = Array.from(new Set(textsSg));

   return {filteredSgLinks, filteredMsLinks};
}


module.exports = tennisApi;