// const ddELEMENTOR_TEMPLATE_SHORTCODE = '[elementor-template id="115250"]';
const ELEMENTOR_TEXT_BLOCK_CODE = '[elementor-template id="115614"]';
const ELEMENTOR_DESKTOP_PRICING_CODE = '[elementor-template id="55914"]';
const ELEMENTOR_MOBILE_PRICING_CODE = '[elementor-template id="55882"]';

const SCRIPTS = `<br/><br/><script type="text/javascript" src="https://js.commissionkings.ag/javascript.php?prefix=GRT_4kQsZJzYJMJFEJBL7mNd7ZgqdRLk&amp;media=2230&amp;campaign=1"></script> <script type="text/javascript" src="https://js.commissionkings.ag/javascript.php?prefix=GRT_4kQsZJzYJMJFEJBL7mNd7ZgqdRLk&amp;media=2230&amp;campaign=1"></script><br/><br/>`;



function splitTexts(fullText) {
   let lastFullStopIndex = fullText.lastIndexOf(" ", Math.ceil(fullText.length / 2));

   return fullText.substring(0, lastFullStopIndex + 1) + SCRIPTS + fullText.substring(lastFullStopIndex + 1);
}

const matchstatsTemplate = [
   {
      tpLanguage: "English",
      tpLanguageCode: "en",
      tpCategory: "WTA / ATP Tennis Predictions",
      tpCategoryId: 4339,
      tpTitle: "Who Will Win: #player1Surname vs #player2Surname? Prediction For WTA #eventName #eventYear",
      tpMetaTitle: "Prediction Of #player1Surname Vs #player2Surname H2H, Who Will Win At WTA #eventName #eventYear?",
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
         <div style="display: flex; flex-direction: row; gap: 6px; max-height: 450px; min-height: 400px;">
         ${imgWrapper?.join("")}
         </div>
         <br/>
         <h3>What Time Will ${player1} Play Against ${player2}?</h3>
            ${`<p>
            ${player1Surname} and ${player2Surname} are on the ${eventDay} Schedule at ${plainEventName} ${eventYear} on ${eventDate}. Lets breakdown the career, past stats and recent form of these players and predict who will get the victory.
            </p>`.replace(/\n/g, " ")}    
         ${ELEMENTOR_DESKTOP_PRICING_CODE}${ELEMENTOR_MOBILE_PRICING_CODE}
         <h3>Who Will Win In This Head-To-Head?</h3>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         <br/> <br/>
         <h3>My Conclusion / Prediction:</h3>
         <p style="margin-bottom: 0px;">
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
   },
   {
      tpLanguage: "Spanish",
      tpLanguageCode: "es",
      tpCategory: "Predicciones De Tenis WTA / ATP",
      tpCategoryId: 4375,
      tpTitle: "Quién Ganará #player1Surname vs #player2Surname? Pronósticos Para WTA #eventName #eventYear",
      tpPlayerTag: "#playerName Pronósticos",
      tpEventTag: "Pronósticos WTA #eventName",
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
         plainEventName) {
         return `<div style="padding-bottom: 5px;">
            <div style="display: flex; flex-direction: row; gap: 6px; max-height: 450px; min-height: 400px;">${imgWrapper?.join("")}</div>
            <br/>
            <h3>¿A qué hora jugará ${player1} contra ${player2}?</h3>
            ${`<p>
            ${player1Surname} y ${player2Surname} están en el programa de ${eventDay} en ${plainEventName} ${eventYear} el ${eventDate}. Analicemos la carrera, las estadísticas pasadas y la forma reciente de estos jugadores y pronostiquemos quién obtendrá la victoria.
            </p>`.replace(/\n/g, " ")}
            ${ELEMENTOR_DESKTOP_PRICING_CODE}${ELEMENTOR_MOBILE_PRICING_CODE}
            <h3>¿Quién ganará en este cara a cara?</h3>
            <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
            <br/> <br/>
            <h3>Mi Pronósticos / Conclusión:</h3>
            <p style="margin-bottom: 0px;">
               <b>Mi elección es que ganará ${player1Surname}.</b>
               Matchstat.com tiene un modelo de Pronósticos de Inteligencia Artificial (IA) que se entrena en todos los partidos profesionales anteriores de la ATP y la WTA. 
               <br/>
               Para saber quién cree nuestro modelo que ganará en ${player1} frente a ${player2}, echa un vistazo aquí:
               <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
                  <b>Pronóstico de Matchstat.com ${player1} vs ${player2}.</b>
               </a> 
            </p>
             
            </div>`
      }
   },
   {
      tpLanguage: "Portugease",
      tpLanguageCode: "pt",
      tpCategory: "Previsões De Tênis WTA / ATP",
      tpCategoryId: 4376,
      tpTitle: "Quem Ganhará #player1Surname vs #player2Surname? Palpites Para WTA #eventName #eventYear",
      tpPlayerTag: "#playerName Palpites",
      tpEventTag: "Palpites WTA #eventName",
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
         plainEventName) {
         return `<div style="padding-bottom: 5px;">
            <div style="display: flex; flex-direction: row; gap: 6px; max-height: 450px; min-height: 400px;">${imgWrapper?.join("")}</div>
            <br/>
            <h3>A que horas ${player1} jogará contra ${player2}?</h3>
            ${`<p>
            ${player1Surname} e ${player2Surname} estão na programação ${eventDay} em ${plainEventName} ${eventYear} em ${eventDate}. Vamos analisar a carreira, as estatísticas anteriores e a forma recente desses jogadores e prever quem conseguirá a vitória.
            </p>`.replace(/\n/g, " ")}
            ${ELEMENTOR_DESKTOP_PRICING_CODE}${ELEMENTOR_MOBILE_PRICING_CODE}
            <h3>Quem vencerá neste confronto direto?</h3>
            <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
            <br/> <br/>
            <h3>Minha Palpites / Conclusão:</h3>
            <p>
               <b>Minha escolha é que ${player1Surname} vencerá.</b>
               Matchstat.com possui um modelo de Palpites de Inteligência Artificial (IA) que é treinado em todas as partidas profissionais anteriores da ATP e WTA. 
               <br/>
               Para descobrir quem nosso modelo acha que ganhará ${player1} vs ${player2}, dê uma olhada aqui:
               <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
                  <b>Palpites de ${player1} vs ${player2} do Matchstat.com.</b>
               </a> 
            <p style="margin-bottom: 0px;">
             
            </div>`
      }
   },
   {
      tpLanguage: "French",
      tpLanguageCode: "fr",
      tpCategory: "Prédictions De Tennis WTA / ATP",
      tpCategoryId: 4377,
      tpTitle: "Qui Gagnera #player1Surname Contre #player2Surname ? Pronostics Pour l'WTA #eventName #eventYear",
      tpPlayerTag: "Pronostics #playerName",
      tpEventTag: "Pronostics WTA #eventName",
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
         plainEventName) {

         return `<div style="padding-bottom: 5px;">
            <div style="display: flex; flex-direction: row; gap: 6px; max-height: 450px; min-height: 400px;">${imgWrapper?.join("")}</div>
            <br/>
            <h3>À quelle heure ${player1} jouera-t-il contre ${player2} ?</h3>
            ${`<p>
            ${player1Surname} et ${player2Surname} sont inscrits au programme ${eventDay} à ${plainEventName} ${eventYear} le ${eventDate}. Décomposons la carrière, les statistiques passées et la forme récente de ces joueurs et prédisons qui remportera la victoire.
            </p>`.replace(/\n/g, " ")}
            ${ELEMENTOR_DESKTOP_PRICING_CODE}${ELEMENTOR_MOBILE_PRICING_CODE}
            <h3>Qui va gagner dans ce face-à-face ?</h3>
            <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
            <br/> <br/>
            <h3>Ma Pronostics / Conclusion :</h3>
            <p style="margin-bottom: 0px;">
               <b>Mon choix est que ${player1Surname} gagnera.</b>
               Matchstat.com dispose d'un modèle de pronostics d'intelligence artificielle (IA) qui est formé sur tous les matchs professionnels passés de l'ATP et de la WTA. 
               <br/>
               Pour savoir qui, selon notre modèle, gagnera pour ${player1} contre ${player2}, jetez un œil ici :
               <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
                  <b>Pronostics Matchstat.com ${player1} contre ${player2}.</b>
               </a> 
            </p>
             
            </div>`
      }
   },
   {
      tpLanguage: "German",
      tpLanguageCode: "de",
      tpCategory: "Tennis Tipps & Prognosen WTA / ATP ",
      tpCategoryId: 4378,
      tpTitle: "Wer Gewinnt #player1Surname vs. #player2Surname? Wett-Tipps & Prognosen Für WTA #eventName #eventYear",
      tpPlayerTag: "#playerName Wett-Tipps & Prognosen",
      tpEventTag: "WTA #eventName Wett-Tipps & Prognosen",
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
         plainEventName) {

         return `<div style="padding-bottom: 5px;">
            <div style="display: flex; flex-direction: row; gap: 6px; max-height: 450px; min-height: 400px;">${imgWrapper?.join("")}</div>
            <br/>
            <h3>Wann spielt ${player1} gegen ${player2}?</h3>
            ${`<p>
            ${player1Surname} und ${player2Surname} stehen am ${eventDate} um ${plainEventName} ${eventYear} im ${eventDay}-Zeitplan. Lassen Sie uns die Karriere, die vergangenen Statistiken und die aktuelle Form dieser Spieler aufschlüsseln und vorhersagen, wer den Sieg erringen wird.
            </p>`.replace(/\n/g, " ")}
            ${ELEMENTOR_DESKTOP_PRICING_CODE}${ELEMENTOR_MOBILE_PRICING_CODE}
            <h3>Wer wird in diesem direkten Duell gewinnen?</h3>
            <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
            <br/> <br/>
            <h3>Mein Wett-Tipps & Prognosen:</h3>
            <p style="margin-bottom: 0px;">
               <b>Mein Tipp ist, dass ${player1Surname} gewinnt.</b>
               Matchstat.com verfügt über ein Vorhersagemodell mit künstlicher Intelligenz (KI), das auf allen vergangenen professionellen ATP- und WTA-Spielen trainiert wird. 
               <br/>
               Um herauszufinden, wer laut unserem Modell für ${player1} vs. ${player2} gewinnen wird, schauen Sie hier:
               <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
                  <b>Matchstat.com ${player1} vs ${player2} Wett-Tipps & Prognosen.</b>
               </a> 
            </p>
            </div>
            `
      }
   },
   {
      tpLanguage: "Italian",
      tpLanguageCode: "it",
      tpCategory: "Pronostici Tennis WTA / ATP",
      tpCategoryId: 4379,
      tpTitle: "Chi Vincerà #player1Surname Contro #player2Surname? Pronostici Per WTA #eventName #eventYear",
      tpPlayerTag: "#playerName Pronostici",
      tpEventTag: "WTA #eventName Pronostici",
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
         plainEventName) {

         return `<div style="padding-bottom: 5px;">
            <div style="display: flex; flex-direction: row; gap: 6px; max-height: 450px; min-height: 400px;">${imgWrapper?.join("")}</div>
            <br/>
            <h3>A che ora giocherà ${player1} contro ${player2}?</h3>
            ${`<p>
            ${player1Surname} e ${player2Surname} sono nel programma dell'${eventDay} al ${plainEventName} ${eventYear} il ${eventDate}. Analizziamo la carriera, le statistiche passate e la forma recente di questi giocatori e pronostici chi otterrà la vittoria.
            </p>`.replace(/\n/g, " ")}
            ${ELEMENTOR_DESKTOP_PRICING_CODE}${ELEMENTOR_MOBILE_PRICING_CODE}
            <h3>Chi vincerà in questo testa a testa?</h3>
            <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
            <br/> <br/>
            <h3>La Mia Conclusione / Pronostici:</h3>
            <p style="margin-bottom: 0px;">
               <b>La mia scelta è che ${player1Surname} vincerà.</b>
               Matchstat.com dispone di un modello di previsione dell'intelligenza artificiale (Ai) addestrato su tutte le partite passate dell'ATP e WTA professionistiche. 
               <br/>
               Per scoprire chi secondo il nostro modello vincerà ${player1} contro ${player2}, dai un'occhiata qui:
               <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
                  <b>Pronostico di Matchstat.com ${player1} vs ${player2}.</b>
               </a> 
            </p>
             
            </div>`
      }
   },
   {
      tpLanguage: "Polish",
      tpLanguageCode: "pl",
      tpCategory: "Prognozy Tenisowe WTA / ATP",
      tpCategoryId: 4380,
      tpTitle: "Kto Wygra #player1Surname Kontra #player2Surname? Prognozy Dla WTA #eventName #eventYear",
      tpPlayerTag: "Prognozy #playerName",
      tpEventTag: "Prognozy WTA #eventName",
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
         plainEventName) {

         return `<div style="padding-bottom: 5px;">
          <div style="display: flex; flex-direction: row; gap: 6px; max-height: 450px; min-height: 400px;">${imgWrapper?.join("")}</div>
          <br/>
          <h3>O której godzinie ${player1} zagra z ${player2}?</h3>
          ${`<p>
          ${player1Surname} i ${player2Surname} pojawią się w harmonogramie ${eventDay} o godzinie ${plainEventName} ${eventYear} w dniu ${eventDate}. Przeanalizujmy karierę, przeszłe statystyki i obecną formę tych graczy i przewidźmy, kto odniesie zwycięstwo.
          </p>`.replace(/\n/g, " ")}
          ${ELEMENTOR_DESKTOP_PRICING_CODE}${ELEMENTOR_MOBILE_PRICING_CODE}
          <h3>Kto wygra w tym pojedynku?</h3>
          <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
          <br/> <br/>
          <h3>Mój Wniosek / Prognozy:</h3>
          <p>
             <b>Mój typ jest taki, że wygra ${player1Surname}.</b>
             Matchstat.com posiada model przewidywania sztucznej inteligencji (Ai), który jest trenowany na wszystkich przeszłych profesjonalnych meczach ATP i WTA. 
             <br/>
             Aby dowiedzieć się, kto według naszego modelu wygra walkę ${player1} vs ${player2}, spójrz tutaj:
             <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
                <b>Prognozy Matchstat.com ${player1} vs ${player2}.</b>
             </a> 
          </p>
           
          </div>`
      }
   },
   {
      tpLanguage: "Dutch",
      tpLanguageCode: "nl",
      tpCategory: "WTA / ATP-tennisvoorspellingen",
      tpCategoryId: 4381,
      tpTitle: "Wie Wint #player1Surname Versus #player2Surname? Voorspelling Wedtips Voor WTA #eventName #eventYear",
      tpPlayerTag: "#playerName Wedtips",
      tpEventTag: "WTA #eventName-voorspellingen Wedtips",
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
         plainEventName) {

         return `<div style="padding-bottom: 5px;">
         <div style="display: flex; flex-direction: row; gap: 6px; max-height: 450px; min-height: 400px;">${imgWrapper?.join("")}</div>
         <br/>
         <h3>Hoe laat speelt ${player1} tegen ${player2}?</h3>
         ${`<p>
         ${player1Surname} en ${player2Surname} staan ​​op het ${eventDay} schema om ${plainEventName} ${eventYear} op ${eventDate}. Laten we de carrière, statistieken uit het verleden en de recente vorm van deze spelers uitsplitsen en voorspellen wie de overwinning zal behalen.
         </p>`.replace(/\n/g, " ")}
         ${ELEMENTOR_DESKTOP_PRICING_CODE}${ELEMENTOR_MOBILE_PRICING_CODE}
         <h3>Wie zal winnen in deze onderlinge strijd?</h3>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         <br/> <br/>
         <h3>Mijn Conclusie / Wedtips:</h3>
         <p style="margin-bottom: 0px;">
            <b>Mijn keuze is dat ${player1Surname} zal winnen.</b>
            Matchstat.com heeft een voorspellingsmodel voor kunstmatige intelligentie (Ai) dat is getraind op alle professionele ATP- en WTA-wedstrijden uit het verleden. 
            <br/>
            Om erachter te komen wie volgens ons model zal winnen voor ${player1} versus ${player2}, kijk hier:
            <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
               <b>Matchstat.com ${player1} versus ${player2} Wedtips.</b>
            </a> 
         </p>
          
         </div>`
      }
   },
   {
      tpLanguage: "Turkish",
      tpLanguageCode: "tr",
      tpCategory: "WTA / ATP Tenis Tahminleri",
      tpCategoryId: 4382,
      tpTitle: "#player1Surname vs #player2Surname'i Kim Kazanacak? WTA Için Tahmin #eventName #eventYear",
      tpPlayerTag: "#playerName Tahminler",
      tpEventTag: "WTA #eventName Tahminleri",
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
         plainEventName) {

         return `<div style = "padding-bottom: 5px;">
         <div style="display: flex; flex-direction: row; gap: 6px; max-height: 450px; min-height: 400px;">${imgWrapper?.join("")}</div>
         <br/>
         <h3>${player1}, ${player2}'a Karşı Ne Zaman Oynayacak?</h3>
         ${`<p>
         ${player1Surname} ve ${player2Surname}, ${eventDate} tarihinde ${plainEventName} ${eventYear} ${eventDay} Programında yer alıyor. Bu oyuncuların kariyerlerini, geçmiş istatistiklerini ve son formlarını inceleyelim ve zaferi kimin kazanacağını tahmin edelim.
         </p>`.replace(/\n/g, " ")}
         ${ELEMENTOR_DESKTOP_PRICING_CODE}${ELEMENTOR_MOBILE_PRICING_CODE}
         <h3>Bu Karşılıklı Mücadelede Kim Kazanacak?</h3>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         <br/> <br/>
         <h3>Sonucum / Tahminleri:</h3>
         <p style="margin-bottom: 0px;">
            <b>Benim tahminim ${player1Surname}'ın kazanacağı yönünde.</b>
            Matchstat.com, tüm profesyonel ATP ve WTA geçmiş maçları üzerine eğitilmiş bir Yapay Zeka (Ai) tahmin modeline sahiptir. 
            <br/>
            Modelimizin ${player1} karşısında ${player2} karşısında kimin kazanacağını düşündüğünü öğrenmek için buraya bir göz atın:
            <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
               <b>Matchstat.com ${player1} - ${player2} tahmini.</b>
            </a> 
         </p>
          
         </div>`
      }
   },
   {
      tpLanguage: "Chinese Mandarin",
      tpLanguageCode: "zh",
      tpCategory: "WTA / ATP 网球预测",
      tpCategoryId: 4383,
      tpTitle: "谁会赢得 #player1Surname vs #player2Surname？ WTA 预测 #eventName #eventYear",
      tpPlayerTag: "#playerName 预测",
      tpEventTag: "WTA #eventName 预测",
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
         plainEventName) {

         return `<div style="padding-bottom: 5px;">
         <div style="display: flex; flex-direction: row; gap: 6px; max-height: 450px; min-height: 400px;">${imgWrapper?.join("")}</div>
         <br/>
         <h3>${player1} 何时对阵 ${player2}？</h3>
         ${`<p>
         ${player1Surname} 和 ${player2Surname} 的 ${eventDay} 日程表将于 ${eventDate} ${plainEventName} ${eventYear} 进行。让我们分析一下这些球员的职业生涯、过去的统计数据和最近的表现，并预测谁将获得胜利。
         </p>`.replace(/\n/g, " ")}
         ${ELEMENTOR_DESKTOP_PRICING_CODE}${ELEMENTOR_MOBILE_PRICING_CODE}
         <h3>谁会在这场正面交锋中获胜？</h3>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         <br/> <br/>
         <h3>我的结论 / 预测：</h3>
         <p style="margin-bottom: 0px;">
            <b>我的选择是 ${player1Surname} 将获胜。</b> 
            Matchstat.com 拥有一个人工智能 (Ai) 预测模型，该模型经过所有职业 ATP 和 WTA 过去比赛的训练。 
            <br/>
            要了解我们的模型认为谁会赢得 ${player1} 与 ${player2} 的比赛，请查看此处：
            <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
               <b>Matchstat.com ${player1} vs ${player2} 预测。</b>
            </a> 
         </p>
          
         </div>`
      }
   },
   {
      tpLanguage: "Arabic",
      tpLanguageCode: "ar",
      tpCategory: "توقعات اتحاد لاعبي التنس المحترفين للتنس",
      tpCategoryId: 4384,
      tpTitle: "من سيفوز بـ #player1Surname مقابل #player2Surname؟ التنبؤ لـ WTA #eventName #eventYear",
      tpPlayerTag: "#playerName توقعات اسم اللاعب",
      tpEventTag: "WTA #eventName の予測",
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
         plainEventName) {

         return `<div style="padding-bottom: 5px;">
         <div style="display: flex; flex-direction: row; gap: 6px; max-height: 450px; min-height: 400px;">${imgWrapper?.join("")}</div>
         <br/>
         <h3>في أي وقت سيلعب ${player1} ضد ${player2}؟</h3>
         ${`<p>
         ${player1Surname} و${player2Surname} موجودان في جدول ${eventDay} في ${plainEventName} ${eventYear} في ${eventDate}. دعونا نفصل المهنة والإحصائيات السابقة والشكل الأخير لهؤلاء اللاعبين ونتوقع من سيحقق النصر.
         </p>`.replace(/\n/g, " ")}
         ${ELEMENTOR_DESKTOP_PRICING_CODE}${ELEMENTOR_MOBILE_PRICING_CODE}
         <h3>من سيفوز في هذه المواجهة المباشرة؟</h3>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         <br/> <br/>
         <h3>استنتاجي / توقعي:</h3>
         <p style="margin-bottom: 0px;">
           <b> خياري هو أن ${player1Surname} هو الذي سيفوز. يحتوي موقع </b>
           Matchstat.com على نموذج للتنبؤ بالذكاء الاصطناعي (Ai) يتم تدريبه على جميع مباريات ATP وWTA الاحترافية السابقة. 
           <br/>
            لمعرفة من يعتقد نموذجنا أنه سيفوز في ${player1} مقابل ${player2}، ألقِ نظرة هنا:
            <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
               <b>توقع Matchstat.com ${player1} مقابل ${player2}.</b>
            </a> 
         </p>
          
         </div>`
      }
   },
   {
      tpLanguage: "Japanese",
      tpLanguageCode: "ja",
      tpCategory: "WTA / ATPテニスの予想",
      tpCategoryId: 4385,
      tpTitle: "#player1Surname と #player2Surname のどちらが勝ちますか? WTA の予測 #eventName #eventYear",
      tpPlayerTag: "#playerName の予測",
      tpEventTag: "WTA #eventName の予測",
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
         plainEventName) {

         return `<div style="padding-bottom: 5px;">
         <div style="display: flex; flex-direction: row; gap: 6px; max-height: 450px; min-height: 400px;">${imgWrapper?.join("")}</div>
         <br/>
         <h3>${player1} は ${player2} と何時に対戦しますか?</h3>
         ${`<p>
         ${player1Surname} と ${player2Surname} は、${eventDate} の ${plainEventName} ${eventYear} の ${eventDay} スケジュールに参加しています。これらの選手のキャリア、過去の統計、最近の調子を分析し、誰が勝利を得るのかを予想してみましょう。
         </p>`.replace(/\n/g, " ")}
         ${ELEMENTOR_DESKTOP_PRICING_CODE}${ELEMENTOR_MOBILE_PRICING_CODE}
         <h3>この直接対決で勝つのは誰ですか?</h3>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         <br/> <br/>
         <h3>私の結論 / 予測:</h3>
         <p style="margin-bottom: 0px;">
            <b>私の選択は、${player1Surname} が勝つということです。</b>
            Matchstat.com には、ATP と WTA の過去のすべてのプロの試合でトレーニングされた人工知能 (Ai) 予測モデルがあります。 
            <br/>
            私たちのモデルが ${player1} と ${player2} でどちらが勝つと考えているかを確認するには、ここをご覧ください:
            <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
               <b>Matchstat.com ${player1} 対 ${player2} の予測。</b>
            </a> 
         </p>
          
         </div>`
      }
   },
   {
      tpLanguage: "Russian",
      tpLanguageCode: "ru",
      tpCategory: "Прогнозы WTA / ATP на теннис",
      tpCategoryId: 4386,
      tpTitle: "Кто победит #player1Surname против #player2Surname? Прогноз для WTA #eventName #eventYear",
      tpPlayerTag: "#playerName Прогнозы",
      tpEventTag: "Прогнозы WTA #eventName",
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
         plainEventName) {

         return `<div style="padding-bottom: 5px;">
         <div style="display: flex; flex-direction: row; gap: 6px; max-height: 450px; min-height: 400px;">${imgWrapper?.join("")}</div>
         <br/>
         <h3>В какое время ${player1} сыграет против ${player2}?</h3>
         ${`<p>
         ${player1Surname} и ${player2Surname} включены в расписание ${eventDay} в ${plainEventName} ${eventYear} ${eventDate}. Давайте разберем карьеру, прошлую статистику и недавнюю форму этих игроков и предскажем, кто одержит победу.
         </p>`.replace(/\n/g, " ")}
         ${ELEMENTOR_DESKTOP_PRICING_CODE}${ELEMENTOR_MOBILE_PRICING_CODE}
         <h3>Кто победит в этом противостоянии?</h3>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         <br/> <br/>
         <h3>Мой вывод / прогноз:</h3>
         <p style="margin-bottom: 0px;">
            <b>Я считаю, что победит ${player1Surname}.</b>
            Matchstat.com имеет модель прогнозирования на основе искусственного интеллекта (Ai), которая обучена на всех прошлых матчах профессиональных турниров ATP и WTA. 
            <br/>
            Чтобы узнать, кто, по мнению нашей модели, победит в матче ${player1} против ${player2}, посмотрите здесь:
            <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
               <b>Прогноз Matchstat.com: ${player1} против ${player2}.</b>
            </a> 
         </p>
          
         </div>`
      }
   },
   {
      tpLanguage: "Hindi",
      tpLanguageCode: "hi",
      tpCategory: "एटीपी टेनिस भविष्यवाणियाँ",
      tpCategoryId: 4387,
      tpTitle: "#player1Surname बनाम #player2Surname कौन जीतेगा? एटीपी #eventName #eventYear के लिए भविष्यवाणी",
      tpPlayerTag: "#playerName भविष्यवाणी",
      tpEventTag: "एटीपी #eventName भविष्यवाणियां",
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
         plainEventName) {

         return `<div style='padding-bottom: 5px;'>
         <div style="display: flex; flex-direction: row; gap: 6px; max-height: 450px; min-height: 400px;">${imgWrapper?.join('')}</div>
         <br/>
         <h3>${player1} किस समय ${player2} के विरुद्ध खेलेगा?</h3>
         ${`<p>
         ${player1Surname} और ${player2Surname} ${eventDate} को ${plainEventName} ${eventYear} पर ${eventDay} शेड्यूल पर हैं। आइए इन खिलाड़ियों के करियर, पिछले आंकड़ों और हालिया फॉर्म का विश्लेषण करें और भविष्यवाणी करें कि जीत किसे मिलेगी।
         </p>`.replace(/\n/g, " ")}
         ${ELEMENTOR_DESKTOP_PRICING_CODE}${ELEMENTOR_MOBILE_PRICING_CODE}
         <h3>इस आमने-सामने की लड़ाई में कौन जीतेगा?</h3>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         <br/> <br/>
         <h3>मेरा निष्कर्ष / भविष्यवाणी:</h3>
         <p style="margin-bottom: 0px;">
            <b>मेरी पसंद यह है कि ${player1Surname} जीतेगा। </b>
            मैचस्टैट.कॉम के पास एक आर्टिफिशियल इंटेलिजेंस (एआई) भविष्यवाणी मॉडल है जो सभी पेशेवर एटीपी और डब्ल्यूटीए पिछले मैचों पर प्रशिक्षित है। 
            <br/>
            यह जानने के लिए कि हमारा मॉडल ${player1} बनाम ${player2} के लिए कौन जीतेगा, यहां देखें:
            <a href='https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/' target='_blank'>
               <b>Matchstat.com ${player1} बनाम ${player2} भविष्यवाणी।</b>
            </a> 
         </p>
          
         </div>`
      }
   }
];


module.exports = matchstatsTemplate;