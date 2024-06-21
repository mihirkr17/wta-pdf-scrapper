const matchstatsTemplate = [
   {
      language: "English",
      languageCode: "en",
      category: "WTA / ATP Tennis Predictions",
      categoryId: 4339,
      title: "Who Will Win #playerOneSurname vs #playerTwoSurname? Prediction For WTA #eventName #eventYear",
      playerTag: "#playerName PREDICTIONS",
      playerVsPlayerTag: "#playerOneSurname VS #playerTwoSurname H2H PREDICTIONS",
      eventTag: "WTA #eventName PREDICTIONS, PICKS & BEST BETS",
      contents: function (eventName,
         leads,
         eventAddress,
         playerOne,
         playerTwo,
         eventDate,
         eventHeading2,
         eventRound,
         eventDay,
         paraphrasedBlog,
         player1slug,
         player2slug,
         imgWrapper,
         playerOneSurname,
         playerTwoSurname,
         eventYear,
         plainEventName
      ) {

         return `<div style="padding-bottom: 5px;">
         <div style="display: flex; flex-direction: row; gap: 6px;">${imgWrapper?.join("")}</div>
         <br/>
         <h3>What Time Will ${playerOne} Play Against ${playerTwo}?</h3>
            ${`<p>
            ${playerOneSurname} and ${playerTwoSurname} are on the ${eventDay} Schedule at ${plainEventName} ${eventYear} on ${eventDate}. Lets breakdown the career, past stats and recent form of these players and predict who will get the victory.
            </p>`.replace(/\n/g, " ")}    
         <br/>

         <?php echo do_shortcode("[elementor-template id="1844"]");?>
         <br/>
         <h3>Who Will Win In This Head-To-Head?</h3>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         <br/> <br/>
         <h3>My Conclusion / Prediction:</h3>
         <p>
            <b>My pick is that ${playerOneSurname} will win.</b>
            Matchstat.com has an Artificial Intelligence (Ai) prediction model that is trained on all professional ATP and WTA past matches.
            <br/>
            To find out who our model thinks will win for ${playerOne} vs ${playerTwo}, have a look at the prediction here:
            <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
               <b>Matchstat.com ${playerOne} vs ${playerTwo} prediction.</b>
            </a> 
         </p>
         </div>`
      }
   }
];


module.exports = matchstatsTemplate;