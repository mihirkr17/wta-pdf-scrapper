const matchstatsTemplate = [
   {
      tpLanguage: "English",
      tpLanguageCode: "en",
      tpCategory: "WTA / ATP Tennis Predictions",
      tpCategoryId: 4339,
      tpTitle: "Who Will Win: #player1Surname vs #player2Surname? Prediction For WTA #eventName #eventYear",
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
   },
   {
      tpLanguage: "Spanish",
      tpLanguageCode: "es",
      tpCategory: "Predicciones De Tenis WTA / ATP",
      tpCategoryId: 4375,
      tpTitle: "Quién Ganará #playerOneSurname vs #playerTwoSurname? Pronósticos Para WTA #eventName #eventYear",
      tpPlayerTag: "#playerName Pronósticos",
      tpEventTag: "Pronósticos WTA #eventName",
      tpContent: function (eventName,
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
         plainEventName) {
         return `<div style="padding-bottom: 5px;">
            <div style="display: flex; flex-direction: row; gap: 6px;">${imgWrapper?.join("")}</div>
            <br/>
            <h3>¿A qué hora jugará ${playerOne} contra ${playerTwo}?</h3>
            ${`<p>
            ${playerOneSurname} y ${playerTwoSurname} están en el programa de ${eventDay} en ${plainEventName} ${eventYear} el ${eventDate}. Analicemos la carrera, las estadísticas pasadas y la forma reciente de estos jugadores y pronostiquemos quién obtendrá la victoria.
            </p>`.replace(/\n/g, " ")}
            <br/><br/>
            <h3>¿Quién ganará en este cara a cara?</h3>
            <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
            <br/> <br/>
            <h3>Mi Pronósticos / Conclusión:</h3>
            <p>
               <b>Mi elección es que ganará ${playerOneSurname}.</b>
               Matchstat.com tiene un modelo de Pronósticos de Inteligencia Artificial (IA) que se entrena en todos los partidos profesionales anteriores de la ATP y la WTA. 
               <br/>
               Para saber quién cree nuestro modelo que ganará en ${playerOne} frente a ${playerTwo}, echa un vistazo aquí:
               <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
                  <b>Pronóstico de Matchstat.com ${playerOne} vs ${playerTwo}.</b>
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
      tpTitle: "Quem Ganhará #playerOneSurname vs #playerTwoSurname? Palpites Para WTA #eventName #eventYear",
      tpPlayerTag: "#playerName Palpites",
      tpEventTag: "Palpites WTA #eventName",
      tpContent: function (eventName,
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
         plainEventName) {
         return `<div style="padding-bottom: 5px;">
            <div style="display: flex; flex-direction: row; gap: 6px;">${imgWrapper?.join("")}</div>
            <br/>
            <h3>A que horas ${playerOne} jogará contra ${playerTwo}?</h3>
            ${`<p>
            ${playerOneSurname} e ${playerTwoSurname} estão na programação ${eventDay} em ${plainEventName} ${eventYear} em ${eventDate}. Vamos analisar a carreira, as estatísticas anteriores e a forma recente desses jogadores e prever quem conseguirá a vitória.
            </p>`.replace(/\n/g, " ")}
            <br/><br/>
            <h3>Quem vencerá neste confronto direto?</h3>
            <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
            <br/> <br/>
            <h3>Minha Palpites / Conclusão:</h3>
            <p>
               <b>Minha escolha é que ${playerOneSurname} vencerá.</b>
               Matchstat.com possui um modelo de Palpites de Inteligência Artificial (IA) que é treinado em todas as partidas profissionais anteriores da ATP e WTA. 
               <br/>
               Para descobrir quem nosso modelo acha que ganhará ${playerOne} vs ${playerTwo}, dê uma olhada aqui:
               <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
                  <b>Palpites de ${playerOne} vs ${playerTwo} do Matchstat.com.</b>
               </a> 
            </p>
            </div>`
      }
   },
   {
      tpLanguage: "French",
      tpLanguageCode: "fr",
      tpCategory: "Prédictions De Tennis WTA / ATP",
      tpCategoryId: 4377,
      tpTitle: "Qui Gagnera #playerOneSurname Contre #playerTwoSurname ? Pronostics Pour l'WTA #eventName #eventYear",
      tpPlayerTag: "Pronostics #playerName",
      tpEventTag: "Pronostics WTA #eventName",
      tpContent: function (eventName,
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
         plainEventName) {

         return `<div style="padding-bottom: 5px;">
            <div style="display: flex; flex-direction: row; gap: 6px;">${imgWrapper?.join("")}</div>
            <br/>
            <h3>À quelle heure ${playerOne} jouera-t-il contre ${playerTwo} ?</h3>
            ${`<p>
            ${playerOneSurname} et ${playerTwoSurname} sont inscrits au programme ${eventDay} à ${plainEventName} ${eventYear} le ${eventDate}. Décomposons la carrière, les statistiques passées et la forme récente de ces joueurs et prédisons qui remportera la victoire.
            </p>`.replace(/\n/g, " ")}
            <br/><br/>
            <h3>Qui va gagner dans ce face-à-face ?</h3>
            <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
            <br/> <br/>
            <h3>Ma Pronostics / Conclusion :</h3>
            <p>
               <b>Mon choix est que ${playerOneSurname} gagnera.</b>
               Matchstat.com dispose d'un modèle de pronostics d'intelligence artificielle (IA) qui est formé sur tous les matchs professionnels passés de l'ATP et de la WTA. 
               <br/>
               Pour savoir qui, selon notre modèle, gagnera pour ${playerOne} contre ${playerTwo}, jetez un œil ici :
               <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
                  <b>Pronostics Matchstat.com ${playerOne} contre ${playerTwo}.</b>
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
      tpTitle: "Wer Gewinnt #playerOneSurname vs. #playerTwoSurname? Wett-Tipps & Prognosen Für WTA #eventName #eventYear",
      tpPlayerTag: "#playerName Wett-Tipps & Prognosen",
      tpEventTag: "WTA #eventName Wett-Tipps & Prognosen",
      tpContent: function (eventName,
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
         plainEventName) {

         return `<div style="padding-bottom: 5px;">
            <div style="display: flex; flex-direction: row; gap: 6px;">${imgWrapper?.join("")}</div>
            <br/>
            <h3>Wann spielt ${playerOne} gegen ${playerTwo}?</h3>
            ${`<p>
            ${playerOneSurname} und ${playerTwoSurname} stehen am ${eventDate} um ${plainEventName} ${eventYear} im ${eventDay}-Zeitplan. Lassen Sie uns die Karriere, die vergangenen Statistiken und die aktuelle Form dieser Spieler aufschlüsseln und vorhersagen, wer den Sieg erringen wird.
            </p>`.replace(/\n/g, " ")}
            <br/> <br/>
            <h3>Wer wird in diesem direkten Duell gewinnen?</h3>
            <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
            <br/> <br/>
            <h3>Mein Wett-Tipps & Prognosen:</h3>
            <p>
               <b>Mein Tipp ist, dass ${playerOneSurname} gewinnt.</b>
               Matchstat.com verfügt über ein Vorhersagemodell mit künstlicher Intelligenz (KI), das auf allen vergangenen professionellen ATP- und WTA-Spielen trainiert wird. 
               <br/>
               Um herauszufinden, wer laut unserem Modell für ${playerOne} vs. ${playerTwo} gewinnen wird, schauen Sie hier:
               <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
                  <b>Matchstat.com ${playerOne} vs ${playerTwo} Wett-Tipps & Prognosen.</b>
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
      tpTitle: "Chi Vincerà #playerOneSurname Contro #playerTwoSurname? Pronostici Per WTA #eventName #eventYear",
      tpPlayerTag: "#playerName Pronostici",
      tpEventTag: "WTA #eventName Pronostici",
      tpContent: function (eventName,
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
         plainEventName) {

         return `<div style="padding-bottom: 5px;">
            <div style="display: flex; flex-direction: row; gap: 6px;">${imgWrapper?.join("")}</div>
            <br/>
            <h3>A che ora giocherà ${playerOne} contro ${playerTwo}?</h3>
            ${`<p>
            ${playerOneSurname} e ${playerTwoSurname} sono nel programma dell'${eventDay} al ${plainEventName} ${eventYear} il ${eventDate}. Analizziamo la carriera, le statistiche passate e la forma recente di questi giocatori e pronostici chi otterrà la vittoria.
            </p>`.replace(/\n/g, " ")}
            <br/> <br/>
            <h3>Chi vincerà in questo testa a testa?</h3>
            <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
            <br/> <br/>
            <h3>La Mia Conclusione / Pronostici:</h3>
            <p>
               <b>La mia scelta è che ${playerOneSurname} vincerà.</b>
               Matchstat.com dispone di un modello di previsione dell'intelligenza artificiale (Ai) addestrato su tutte le partite passate dell'ATP e WTA professionistiche. 
               <br/>
               Per scoprire chi secondo il nostro modello vincerà ${playerOne} contro ${playerTwo}, dai un'occhiata qui:
               <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
                  <b>Pronostico di Matchstat.com ${playerOne} vs ${playerTwo}.</b>
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
      tpTitle: "Kto Wygra #playerOneSurname Kontra #playerTwoSurname? Prognozy Dla WTA #eventName #eventYear",
      tpPlayerTag: "Prognozy #playerName",
      tpEventTag: "Prognozy WTA #eventName",
      tpContent: function (eventName,
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
         plainEventName) {

         return `<div style="padding-bottom: 5px;">
          <div style="display: flex; flex-direction: row; gap: 6px;">${imgWrapper?.join("")}</div>
          <br/>
          <h3>O której godzinie ${playerOne} zagra z ${playerTwo}?</h3>
          ${`<p>
          ${playerOneSurname} i ${playerTwoSurname} pojawią się w harmonogramie ${eventDay} o godzinie ${plainEventName} ${eventYear} w dniu ${eventDate}. Przeanalizujmy karierę, przeszłe statystyki i obecną formę tych graczy i przewidźmy, kto odniesie zwycięstwo.
          </p>`.replace(/\n/g, " ")}
          <br/><br/>
          <h3>Kto wygra w tym pojedynku?</h3>
          <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
          <br/> <br/>
          <h3>Mój Wniosek / Prognozy:</h3>
          <p>
             <b>Mój typ jest taki, że wygra ${playerOneSurname}.</b>
             Matchstat.com posiada model przewidywania sztucznej inteligencji (Ai), który jest trenowany na wszystkich przeszłych profesjonalnych meczach ATP i WTA. 
             <br/>
             Aby dowiedzieć się, kto według naszego modelu wygra walkę ${playerOne} vs ${playerTwo}, spójrz tutaj:
             <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
                <b>Prognozy Matchstat.com ${playerOne} vs ${playerTwo}.</b>
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
      tpTitle: "Wie Wint #playerOneSurname Versus #playerTwoSurname? Voorspelling Wedtips Voor WTA #eventName #eventYear",
      tpPlayerTag: "#playerName Wedtips",
      tpEventTag: "WTA #eventName-voorspellingen Wedtips",
      tpContent: function (eventName,
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
         plainEventName) {

         return `<div style="padding-bottom: 5px;">
         <div style="display: flex; flex-direction: row; gap: 6px;">${imgWrapper?.join("")}</div>
         <br/>
         <h3>Hoe laat speelt ${playerOne} tegen ${playerTwo}?</h3>
         ${`<p>
         ${playerOneSurname} en ${playerTwoSurname} staan ​​op het ${eventDay} schema om ${plainEventName} ${eventYear} op ${eventDate}. Laten we de carrière, statistieken uit het verleden en de recente vorm van deze spelers uitsplitsen en voorspellen wie de overwinning zal behalen.
         </p>`.replace(/\n/g, " ")}
         <br/><br/>
         <h3>Wie zal winnen in deze onderlinge strijd?</h3>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         <br/> <br/>
         <h3>Mijn Conclusie / Wedtips:</h3>
         <p>
            <b>Mijn keuze is dat ${playerOneSurname} zal winnen.</b>
            Matchstat.com heeft een voorspellingsmodel voor kunstmatige intelligentie (Ai) dat is getraind op alle professionele ATP- en WTA-wedstrijden uit het verleden. 
            <br/>
            Om erachter te komen wie volgens ons model zal winnen voor ${playerOne} versus ${playerTwo}, kijk hier:
            <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
               <b>Matchstat.com ${playerOne} versus ${playerTwo} Wedtips.</b>
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
      tpTitle: "#playerOneSurname vs #playerTwoSurname'i Kim Kazanacak? WTA Için Tahmin #eventName #eventYear",
      tpPlayerTag: "#playerName Tahminler",
      tpEventTag: "WTA #eventName Tahminleri",
      tpContent: function (eventName,
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
         plainEventName) {

         return `<div style = "padding-bottom: 5px;">
         <div style="display: flex; flex-direction: row; gap: 6px;">${imgWrapper?.join("")}</div>
         <br/>
         <h3>${playerOne}, ${playerTwo}'a Karşı Ne Zaman Oynayacak?</h3>
         ${`<p>
         ${playerOneSurname} ve ${playerTwoSurname}, ${eventDate} tarihinde ${plainEventName} ${eventYear} ${eventDay} Programında yer alıyor. Bu oyuncuların kariyerlerini, geçmiş istatistiklerini ve son formlarını inceleyelim ve zaferi kimin kazanacağını tahmin edelim.
         </p>`.replace(/\n/g, " ")}
         <br/><br/>
         <h3>Bu Karşılıklı Mücadelede Kim Kazanacak?</h3>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         <br/> <br/>
         <h3>Sonucum / Tahminleri:</h3>
         <p>
            <b>Benim tahminim ${playerOneSurname}'ın kazanacağı yönünde.</b>
            Matchstat.com, tüm profesyonel ATP ve WTA geçmiş maçları üzerine eğitilmiş bir Yapay Zeka (Ai) tahmin modeline sahiptir. 
            <br/>
            Modelimizin ${playerOne} karşısında ${playerTwo} karşısında kimin kazanacağını düşündüğünü öğrenmek için buraya bir göz atın:
            <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
               <b>Matchstat.com ${playerOne} - ${playerTwo} tahmini.</b>
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
      tpTitle: "谁会赢得 #playerOneSurname vs #playerTwoSurname？ WTA 预测 #eventName #eventYear",
      tpPlayerTag: "#playerName 预测",
      tpEventTag: "WTA #eventName 预测",
      tpContent: function (eventName,
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
         plainEventName) {

         return `<div style="padding-bottom: 5px;">
         <div style="display: flex; flex-direction: row; gap: 6px;">${imgWrapper?.join("")}</div>
         <br/>
         <h3>${playerOne} 何时对阵 ${playerTwo}？</h3>
         ${`<p>
         ${playerOneSurname} 和 ${playerTwoSurname} 的 ${eventDay} 日程表将于 ${eventDate} ${plainEventName} ${eventYear} 进行。让我们分析一下这些球员的职业生涯、过去的统计数据和最近的表现，并预测谁将获得胜利。
         </p>`.replace(/\n/g, " ")}
         <br/><br/>
         <h3>谁会在这场正面交锋中获胜？</h3>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         <br/> <br/>
         <h3>我的结论 / 预测：</h3>
         <p>
            <b>我的选择是 ${playerOneSurname} 将获胜。</b> 
            Matchstat.com 拥有一个人工智能 (Ai) 预测模型，该模型经过所有职业 ATP 和 WTA 过去比赛的训练。 
            <br/>
            要了解我们的模型认为谁会赢得 ${playerOne} 与 ${playerTwo} 的比赛，请查看此处：
            <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
               <b>Matchstat.com ${playerOne} vs ${playerTwo} 预测。</b>
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
      tpTitle: "من سيفوز بـ #playerOneSurname مقابل #playerTwoSurname؟ التنبؤ لـ WTA #eventName #eventYear",
      tpPlayerTag: "#playerName توقعات اسم اللاعب",
      tpEventTag: "WTA #eventName の予測",
      tpContent: function (eventName,
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
         plainEventName) {

         return `<div style="padding-bottom: 5px;">
         <div style="display: flex; flex-direction: row; gap: 6px;">${imgWrapper?.join("")}</div>
         <br/>
         <h3>في أي وقت سيلعب ${playerOne} ضد ${playerTwo}؟</h3>
         ${`<p>
         ${playerOneSurname} و${playerTwoSurname} موجودان في جدول ${eventDay} في ${plainEventName} ${eventYear} في ${eventDate}. دعونا نفصل المهنة والإحصائيات السابقة والشكل الأخير لهؤلاء اللاعبين ونتوقع من سيحقق النصر.
         </p>`.replace(/\n/g, " ")}
         <br/><br/>
         <h3>من سيفوز في هذه المواجهة المباشرة؟</h3>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         <br/> <br/>
         <h3>استنتاجي / توقعي:</h3>
         <p>
           <b> خياري هو أن ${playerOneSurname} هو الذي سيفوز. يحتوي موقع </b>
           Matchstat.com على نموذج للتنبؤ بالذكاء الاصطناعي (Ai) يتم تدريبه على جميع مباريات ATP وWTA الاحترافية السابقة. 
           <br/>
            لمعرفة من يعتقد نموذجنا أنه سيفوز في ${playerOne} مقابل ${playerTwo}، ألقِ نظرة هنا:
            <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
               <b>توقع Matchstat.com ${playerOne} مقابل ${playerTwo}.</b>
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
      tpTitle: "#playerOneSurname と #playerTwoSurname のどちらが勝ちますか? WTA の予測 #eventName #eventYear",
      tpPlayerTag: "#playerName の予測",
      tpEventTag: "WTA #eventName の予測",
      tpContent: function (eventName,
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
         plainEventName) {

         return `<div style="padding-bottom: 5px;">
         <div style="display: flex; flex-direction: row; gap: 6px;">${imgWrapper?.join("")}</div>
         <br/>
         <h3>${playerOne} は ${playerTwo} と何時に対戦しますか?</h3>
         ${`<p>
         ${playerOneSurname} と ${playerTwoSurname} は、${eventDate} の ${plainEventName} ${eventYear} の ${eventDay} スケジュールに参加しています。これらの選手のキャリア、過去の統計、最近の調子を分析し、誰が勝利を得るのかを予想してみましょう。
         </p>`.replace(/\n/g, " ")}
         <br/><br/>
         <h3>この直接対決で勝つのは誰ですか?</h3>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         <br/> <br/>
         <h3>私の結論 / 予測:</h3>
         <p>
            <b>私の選択は、${playerOneSurname} が勝つということです。</b>
            Matchstat.com には、ATP と WTA の過去のすべてのプロの試合でトレーニングされた人工知能 (Ai) 予測モデルがあります。 
            <br/>
            私たちのモデルが ${playerOne} と ${playerTwo} でどちらが勝つと考えているかを確認するには、ここをご覧ください:
            <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
               <b>Matchstat.com ${playerOne} 対 ${playerTwo} の予測。</b>
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
      tpTitle: "Кто победит #playerOneSurname против #playerTwoSurname? Прогноз для WTA #eventName #eventYear",
      tpPlayerTag: "#playerName Прогнозы",
      tpEventTag: "Прогнозы WTA #eventName",
      tpContent: function (eventName,
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
         plainEventName) {

         return `<div style="padding-bottom: 5px;">
         <div style="display: flex; flex-direction: row; gap: 6px;">${imgWrapper?.join("")}</div>
         <br/>
         <h3>В какое время ${playerOne} сыграет против ${playerTwo}?</h3>
         ${`<p>
         ${playerOneSurname} и ${playerTwoSurname} включены в расписание ${eventDay} в ${plainEventName} ${eventYear} ${eventDate}. Давайте разберем карьеру, прошлую статистику и недавнюю форму этих игроков и предскажем, кто одержит победу.
         </p>`.replace(/\n/g, " ")}
         <br/><br/>
         <h3>Кто победит в этом противостоянии?</h3>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         <br/> <br/>
         <h3>Мой вывод / прогноз:</h3>
         <p>
            <b>Я считаю, что победит ${playerOneSurname}.</b>
            Matchstat.com имеет модель прогнозирования на основе искусственного интеллекта (Ai), которая обучена на всех прошлых матчах профессиональных турниров ATP и WTA. 
            <br/>
            Чтобы узнать, кто, по мнению нашей модели, победит в матче ${playerOne} против ${playerTwo}, посмотрите здесь:
            <a href="https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/" target="_blank">
               <b>Прогноз Matchstat.com: ${playerOne} против ${playerTwo}.</b>
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
      tpTitle: "#playerOneSurname बनाम #playerTwoSurname कौन जीतेगा? एटीपी #eventName #eventYear के लिए भविष्यवाणी",
      tpPlayerTag: "#playerName भविष्यवाणी",
      tpEventTag: "एटीपी #eventName भविष्यवाणियां",
      tpContent: function (eventName,
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
         plainEventName) {

         return `<div style='padding-bottom: 5px;'>
         <div style="display: flex; flex-direction: row; gap: 6px;">${imgWrapper?.join('')}</div>
         <br/>
         <h3>${playerOne} किस समय ${playerTwo} के विरुद्ध खेलेगा?</h3>
         ${`<p>
         ${playerOneSurname} और ${playerTwoSurname} ${eventDate} को ${plainEventName} ${eventYear} पर ${eventDay} शेड्यूल पर हैं। आइए इन खिलाड़ियों के करियर, पिछले आंकड़ों और हालिया फॉर्म का विश्लेषण करें और भविष्यवाणी करें कि जीत किसे मिलेगी।
         </p>`.replace(/\n/g, " ")}
         <br/><br/>
         <h3>इस आमने-सामने की लड़ाई में कौन जीतेगा?</h3>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         <br/> <br/>
         <h3>मेरा निष्कर्ष / भविष्यवाणी:</h3>
         <p>
            <b>मेरी पसंद यह है कि ${playerOneSurname} जीतेगा। </b>
            मैचस्टैट.कॉम के पास एक आर्टिफिशियल इंटेलिजेंस (एआई) भविष्यवाणी मॉडल है जो सभी पेशेवर एटीपी और डब्ल्यूटीए पिछले मैचों पर प्रशिक्षित है। 
            <br/>
            यह जानने के लिए कि हमारा मॉडल ${playerOne} बनाम ${playerTwo} के लिए कौन जीतेगा, यहां देखें:
            <a href='https://matchstat.com/tennis/h2h-odds-bets/${player1slug}/${player2slug}/' target='_blank'>
               <b>Matchstat.com ${playerOne} बनाम ${playerTwo} भविष्यवाणी।</b>
            </a> 
         </p>
         </div>`
      }
   }
];


module.exports = matchstatsTemplate;