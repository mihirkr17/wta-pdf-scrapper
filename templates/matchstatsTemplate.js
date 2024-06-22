const matchstatsTemplate = [
   {
      tpLanguage: "English",
      tpLanguageCode: "en",
      tpCategory: "WTA / ATP Tennis Predictions",
      tpCategoryId: 4339,
      tpTitle: "Who Will Win #player1Surname vs #player2Surname? Prediction For WTA #eventName #eventYear",
      tpPlayerTag: "#playerName PREDICTIONS",
      tpPlayerVsPlayerTag: "#player1Surname VS #player2Surname H2H PREDICTIONS",
      tpEventTag: "WTA #eventName PREDICTIONS, PICKS & BEST BETS",
      tpContent: function (eventName,
         leads,
         eventAddress,
         player1,
         player2,
         eventDate,
         eventHeading2,
         eventRound,
         eventDay,
         paraphrasedBlog,
         player1slug,
         player2slug,
         imgWrapper,
         player1Surname,
         player2Surname,
         eventYear,
         plainEventName
      ) {

         return `<div style="padding-bottom: 5px;">
         <div style="display: flex; flex-direction: row; gap: 6px;">${imgWrapper?.join("")}</div>
         <br/>
         <h3>What Time Will ${player1} Play Against ${player2}?</h3>
            ${`<p>
            ${player1Surname} and ${player2Surname} are on the ${eventDay} Schedule at ${plainEventName} ${eventYear} on ${eventDate}. Lets breakdown the career, past stats and recent form of these players and predict who will get the victory.
            </p>`.replace(/\n/g, " ")}    
         <br/>
         <br/>
         <h3>Who Will Win In This Head-To-Head?</h3>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         <br/> <br/>
         <h3>My Conclusion / Prediction:</h3>
         <p>
            <b>My pick is that ${player1Surname} will win.</b>
            Matchstat.com has an Artificial Intelligence (Ai) prediction model that is trained on all professional ATP and WTA past matches.
            <br/>
            To find out who our model thinks will win for ${player1} vs ${player2}, have a look at the prediction here:
            <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
               <b>Matchstat.com ${player1} vs ${player2} prediction.</b>
            </a> 
         </p>
         </div>`
      }
   }
];


module.exports = matchstatsTemplate;