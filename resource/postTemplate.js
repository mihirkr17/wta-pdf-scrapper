const postTemplate = [
   {
      language: "English",
      languageCode: "en",
      category: "ATP / WTA Tennis Predictions",
      categoryId: 8996,
      title: "#eventName Predictions: #player1 vs #player2 - #eventDate",
      playerTag: "#playerName STATS & PREDICTIONS",
      eventTag: "#eventName WTA TENNIS PREDICTIONS & PICKS",
      contents: function (eventName,
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
         imgWrapper) {
         return `<div style="padding-bottom: 5px;">
         <h2 style="margin-top: unset;">WTA ${eventName}</h2>
         <p>${eventHeading2}</p>
         </div>
         
         <div style="display: flex; flex-direction: row;">${imgWrapper?.join("")}</div>
         
         <div style="margin: 15px 0">
         <ul>
         <li>The match up: ${player1} vs ${player2}</li>
         <li>Event Name: ${eventName}</li>
         <li>Match Date: ${eventDate}</li>
         ${eventRound ? `<li>Match Round: ${eventRound}</li>` : ""}
         <li>Day Of Event: ${eventDay}</li>
         <li>Event Address: ${eventAddress}</li>
         </ul>
         </div>
         
         ${`<p>
         Let's have a look at all the career, performance and head-to-head stats for the match and find out if ${player1} or ${player2} is expected to win.
         </p>`.replace(/\n/g, " ")}
         
         <br/> <br/>
         
         <h3>Match Details:</h3>
         <p>${player1} vs ${player2}${eventRound ? " - " + eventRound + " - " : " - "}${eventDate} - ${eventName} - ${eventAddress}</p>
         
         <br/>
         <p>
            <a href="https://www.stevegtennis.com/h2h-predictions/plans-match-winner-pro-monthly/" title="Tennis Premium Subscription" style="text-align: center; display: block;"> <picture>
               <source media="(max-width: 899px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans-sm_v2.webp">
               <source media="(min-width: 900px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp">
               <img decoding="async" src="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp" style="max-width: 640px; width:100%;" alt="Subscription Plans">
               </picture>
            </a>
         </p>
         <br/>
         
         <h3>${player1} vs ${player2} Head-to-Head, Preview, Stats & Pick:</h3>
         <article>
         <h5>Head To Head ${leads}.</h5>
         <br/>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         </article>
         
         <br/> <br/>
         
         <h3>${player1} vs ${player2} Prediction:</h3>
         
         <p>
         I believe ${player1} will win in straight sets. 
         The Stevegtennis.com prediction algorithm has a much better success rate in picking 
         match winners than me!\n
         So check out who it picks for this match here: <a href="https://www.stevegtennis.com/head-to-head/men/${player1slug}/${player2slug}/" target="_blank">
         Stevegtennis.com ${player1} vs ${player2} prediction.
         </a> 
         </p>`
      }
   },
   {
      language: "Spanish",
      languageCode: "es",
      category: "Pronósticos De Tenis ATP / WTA",
      categoryId: 9262,
      title: "Pronósticos de #eventName: #player1 vs #player2 - #eventDate",
      playerTag: "Pronósticos de #playerName",
      eventTag: "#eventName Pronósticos De Tenis WTA",
      contents: function (eventName,
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
         imgWrapper) {

         return `<div style="padding-bottom: 5px;">
            <h2 style="margin-top: unset;">${eventName}</h2>
            <p>${eventHeading2}</p>
        </div>
        
        <div style="display: flex; flex-direction: row;">
            ${imgWrapper?.join("")}
        </div>
        
        <div style="margin: 15px 0;">
            <ul>
                <li>El enfrentamiento: ${player1} contra ${player2}</li>
                <li>Nombre del evento: ${eventName}</li>
                <li>Fecha del partido: ${eventDate}</li>
                ${eventRound ? `<li>Ronda de partido: ${eventRound}</li>` : ""}
                <li>Día del evento: ${eventDay}</li>
                <li>Dirección del evento: ${eventAddress}</li>
            </ul>
        </div>
        
        ${`<p> 
            Echemos un vistazo a todas las estadísticas de carrera, rendimiento y enfrentamientos directos del partido y descubramos si se espera que ${player1} o ${player2} ganen.
        </p>`.replace(/\n/g, " ")}
        
        <br/> <br/>
        
        <h3>Detalles del partido:</h3>
        <p>${player1} frente a ${player2}${eventRound ? " - " + eventRound + " - " : " - "}${eventDate} - ${eventName} - ${eventAddress}</p>
        
        <br/>
         <p>
            <a href="https://www.stevegtennis.com/h2h-predictions/plans-match-winner-pro-monthly/" title="Tennis Premium Subscription" style="text-align: center; display: block;"> <picture>
               <source media="(max-width: 899px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans-sm_v2.webp">
               <source media="(min-width: 900px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp">
               <img decoding="async" src="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp" style="max-width: 640px; width:100%;" alt="Subscription Plans">
               </picture>
            </a>
         </p>
         <br/>
        
        <h3>${player1} vs ${player2} cara a cara, vista previa, estadísticas y selección:</h3>
        <article>
            <h5>Enfrentamiento ${leads}.</h5>
            <br/>
            <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
        </article>
        
        <br/> <br/>
        
        <h3>Pronóstico ${player1} vs ${player2}:</h3>
        
        <p>
            Creo que ${player1} ganará en sets corridos. 
            El algoritmo de Pronóstico de Stevegtennis.com tiene una tasa de éxito mucho mayor al elegir 
            Ganadores del partido que yo!\n
            Así que mira a quién elige para este partido aquí: <a href="https://www.stevegtennis.com/head-to-head/men/${player1slug}/${player2slug}/" target="_blank" >
            Stevegtennis.com ${player1} vs ${player2} Pronóstico.
            </a> 
        </p>`

      }
   },
   {
      language: "Portuguese",
      languageCode: "pt",
      category: "Palpites Tênis ATP / WTA",
      categoryId: 9263,
      title: "Palpites de #eventName: #player1 vs #player2 - #eventDate",
      playerTag: "Palpites de #playerName",
      eventTag: "#eventName Palpites Tênis WTA",
      contents: function (eventName,
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
         imgWrapper) {
         return `<div style="padding-bottom: 5px;">
         <h2 style="margin-top: unset;">${eventName}</h2>
         <p>${eventHeading2}</p>
     </div>
     
     <div style="display: flex; flex-direction: row;">
         ${imgWrapper?.join("")}
     </div>
     
     <div style="margin: 15px 0;">
         <ul>
             <li>O confronto: ${player1} vs ${player2}</li>
             <li>Nome do evento: ${eventName}</li>
             <li>Data da partida: ${eventDate}</li>
             ${eventRound ? `<li>Rodada da partida: ${eventRound}</li>` : ""}
             <li>Dia do evento: ${eventDay}</li>
             <li>Endereço do evento: ${eventAddress}</li>
         </ul>
     </div>
     
     ${`<p>
         Vamos dar uma olhada em todas as estatísticas de carreira, desempenho e confrontos diretos da partida e descobrir se ${player1} ou ${player2} devem vencer.
     </p>`.replace(/\n/g, " ")}
     
     <br/> <br/>
     
     <h3>Detalhes da partida:</h3>
     <p>${player1} vs ${player2}${eventRound ? " - " + eventRound + " - " : " - "}${eventDate} - ${eventName} - ${eventAddress}</p>
     
     <br/>
         <p>
            <a href="https://www.stevegtennis.com/h2h-predictions/plans-match-winner-pro-monthly/" title="Tennis Premium Subscription" style="text-align: center; display: block;"> <picture>
               <source media="(max-width: 899px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans-sm_v2.webp">
               <source media="(min-width: 900px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp">
               <img decoding="async" src="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp" style="max-width: 640px; width:100%;" alt="Subscription Plans">
               </picture>
            </a>
         </p>
         <br/>
     
     <h3>${player1} vs ${player2} confronto direto, visualização, estatísticas e escolha:</h3>
     <article>
         <h5>Confronto direto ${leads}.</h5>
         <br/>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
     </article>
     
     <br/> <br/>
     
     <h3>${player1} vs ${player2} Previsão:</h3>
     
     <p>
         Acredito que ${player1} vencerá em dois sets. 
         O algoritmo de previsão Stevegtennis.com tem uma taxa de sucesso muito melhor na escolha 
         vencedores das partidas do que eu!\n
         Então confira quem será escolhido para esta partida aqui: <a href="https://www.stevegtennis.com/head-to-head/men/${player1slug}/${player2slug}/" target="_blank" >
         Stevegtennis.com Previsão de ${player1} vs ${player2}.
         </a> 
     </p>`

      },

   },
   {
      language: "French",
      languageCode: "fr",
      category: "Pronostics Tennis ATP / WTA",
      categoryId: 9264,
      title: "Pronostics #eventName: #player1 contre #player2 - #eventDate",
      playerTag: "Pronostics #playerName",
      eventTag: "#eventName Pronostics Tennis WTA",
      contents: function (eventName,
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
         imgWrapper) {
         return `<div style="padding-bottom: 5px;">
         <h2 style="margin-top: unset;">${eventName}</h2>
         <p>${eventHeading2}</p>
     </div>
     
     <div style="display: flex; flex-direction: row;">
         ${imgWrapper?.join("")}
     </div>
     
     <div style="margin: 15px 0;">
         <ul>
             <li>Le match : ${player1} contre ${player2}</li>
             <li>Nom de l'événement : ${eventName}</li>
             <li>Date du match : ${eventDate}</li>
             ${eventRound ? `<li>Tour de match : ${eventRound}</li>` : ""}
             <li>Jour de l'événement : ${eventDay}</li>
             <li>Adresse de l'événement : ${eventAddress}</li>
         </ul>
     </div>
     
     ${`<p>
         Jetons un coup d'œil à toutes les statistiques de carrière, de performance et d'affrontement du match et découvrons si ${player1} ou ${player2} devrait gagner.
     </p>`.replace(/\n/g, " ")}
     
     <br/> <br/>
     
     <h3>Détails du match :</h3>
     <p>${player1} contre ${player2}${eventRound ? " - " + eventRound + " - " : " - "}${eventDate} - ${eventName} - ${eventAddress}</p>
     
     <br/>
         <p>
            <a href="https://www.stevegtennis.com/h2h-predictions/plans-match-winner-pro-monthly/" title="Tennis Premium Subscription" style="text-align: center; display: block;"> <picture>
               <source media="(max-width: 899px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans-sm_v2.webp">
               <source media="(min-width: 900px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp">
               <img decoding="async" src="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp" style="max-width: 640px; width:100%;" alt="Subscription Plans">
               </picture>
            </a>
         </p>
         <br/>
     
     <h3>${player1} contre ${player2} Face-à-face, aperçu, statistiques et choix :</h3>
     <article>
         <h5>Tête à face ${leads}.</h5>
         <br/>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
     </article>
     
     <br/> <br/>
     
     <h3>Pronostic ${player1} contre ${player2} :</h3>
     
     <p>
         Je pense que ${player1} gagnera en deux sets. 
         L'algorithme de Pronostic de Stevegtennis.com a un bien meilleur taux de réussite en matière de sélection 
         des gagnants de match que moi !\n
         Alors découvrez qui il choisit pour ce match ici : <a href="https://www.stevegtennis.com/head-to-head/men/${player1slug}/${player2slug}/" target="_blank" >
         Pronostic Stevegtennis.com ${player1} contre ${player2}.
         </a> 
     </p>`

      }
   },
   {
      language: "German",
      languageCode: "de",
      category: "Tennis Tipps & Prognosen ATP / WTA",
      categoryId: 9265,
      title: "#eventName Tipps & Prognosen: #player1 vs #player2 - #eventDate",
      playerTag: "#playerName Vorhersagen",
      eventTag: "#eventName Tennis Tipps & Prognosen WTA",
      contents: function (eventName,
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
         imgWrapper) {
         return `<div style="padding-bottom: 5px;">
         <h2 style="margin-top: unset;">${eventName}</h2>
         <p>${eventHeading2}</p>
     </div>
     
     <div style="display: flex; flex-direction: row;">
         ${imgWrapper?.join("")}
     </div>
     
     <div style="margin: 15px 0;">
         <ul>
             <li>Das Match: ${player1} gegen ${player2}</li>
             <li>Ereignisname: ${eventName}</li>
             <li>Spiel Datum: ${eventDate}</li>
             ${eventRound ? `<li>Match Round: ${eventRound}</li>` : ""}
             <li>Tag des Ereignisses: ${eventDay}</li>
             <li>Ereignisadresse: ${eventAddress}</li>
         </ul>
     </div>
     
     ${`<p>
         Werfen wir einen Blick auf alle Karriere-, Leistungs- und Head-to-Head-Statistiken für das Spiel und finden wir heraus, ob ${player1} oder ${player2} voraussichtlich gewinnen wird.
     </p>`.replace(/\n/g, " ")}
     
     <br/> <br/>
     
     <h3>Spieldetails:</h3>
     <p>${player1} vs ${player2}${eventRound ? " - " + eventRound + " - " : " - "}${eventDate} - ${eventName} - ${eventAddress}</p>
     
     <br/>
         <p>
            <a href="https://www.stevegtennis.com/h2h-predictions/plans-match-winner-pro-monthly/" title="Tennis Premium Subscription" style="text-align: center; display: block;"> <picture>
               <source media="(max-width: 899px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans-sm_v2.webp">
               <source media="(min-width: 900px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp">
               <img decoding="async" src="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp" style="max-width: 640px; width:100%;" alt="Subscription Plans">
               </picture>
            </a>
         </p>
         <br/>
     
     <h3>${player1} vs. ${player2} Head-to-Head, Vorschau, Statistiken & Auswahl:</h3>
     <article>
         <h5>Kopf an Kopf ${leads}.</h5>
         <br/>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
     </article>
     
     <br/> <br/>
     
     <h3>${player1} vs ${player2} Doppel Tipps:</h3>
     
     <p>
         Ich glaube, dass ${player1} in geraden Sätzen gewinnen wird. 
         Der Doppel Tippsalgorithmus von Stevegtennis.com hat eine viel bessere Erfolgsquote bei der Auswahl 
         Matchwinner als ich!\n
         Schauen Sie sich also hier an, wer für dieses Spiel ausgewählt wird: <a href="https://www.stevegtennis.com/head-to-head/men/${player1slug}/${player2slug}/" target="_blank" >
         Stevegtennis.com ${player1} vs. ${player2} Doppel Tipps.
         </a> 
     </p>`
      },
   },
   {
      language: "Italian",
      languageCode: "it",
      category: "Pronostici Tennis ATP / WTA",
      categoryId: 9266,
      title: "Pronostici su #eventName: #player1 vs #player2 - #eventDate",
      playerTag: "#playerName Pronostici",
      eventTag: "#eventName Pronostici Tennis WTA",
      contents: function (eventName,
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
         imgWrapper) {
         return `
         <div style="padding-bottom: 5px;">
           <h2 style="margin-top: unset;">${eventName}</h2>
           <p>${eventHeading2}</p>
         </div>
         
         <div style="display: flex; flex-direction: row;">
           ${imgWrapper?.join("")}
         </div>
         
         <div style="margin: 15px 0;">
           <ul>
             <li>La partita è: ${player1} contro ${player2}</li>
             <li>Nome evento: ${eventName}</li>
             <li>Data della partita: ${eventDate}</li>
             ${eventRound ? `<li>Turno della partita: ${eventRound}</li>` : ""}
             <li>Giorno dell'evento: ${eventDay}</li>
             <li>Indirizzo dell'evento: ${eventAddress}</li>
           </ul>
         </div>
         
         ${`<p>
         Diamo un'occhiata a tutte le statistiche relative a carriera, prestazioni e testa a testa della partita e scopriamo se ci si aspetta che ${player1} o ${player2} vincano.
         </p>`.replace(/\n/g, " ")}
         
         <br/><br/>
         
         <h3>Dettagli partita:</h3>
         <p>${player1} contro ${player2}${eventRound ? " - " + eventRound + " - " : " - "}${eventDate} - ${eventName} - ${eventAddress}</p>
         
         <br/>
         <p>
            <a href="https://www.stevegtennis.com/h2h-predictions/plans-match-winner-pro-monthly/" title="Tennis Premium Subscription" style="text-align: center; display: block;"> <picture>
               <source media="(max-width: 899px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans-sm_v2.webp">
               <source media="(min-width: 900px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp">
               <img decoding="async" src="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp" style="max-width: 640px; width:100%;" alt="Subscription Plans">
               </picture>
            </a>
         </p>
         <br/>
         
         <h3>Confronto testa a testa tra ${player1} e ${player2}, anteprima, statistiche e scelta:</h3>
         <article>
           <h5>Testa a testa ${leads}.</h5>
           <br/>
           <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         </article>
         
         <br/><br/>
         
         <h3>Pronostico ${player1} vs ${player2}:</h3>
         
         <p>
         Credo che ${player1} vincerà in due set. 
         L'algoritmo di previsione di Stevegtennis.com ha un tasso di successo molto migliore nel prelievo 
         vincitori della partita rispetto a me!\n
         Quindi controlla chi sceglie per questa partita qui: <a href="https://www.stevegtennis.com/head-to-head/men/${player1slug}/${player2slug}/" target="_blank">
         Pronostico di Stevegtennis.com ${player1} vs ${player2}.
         </a> 
         </p>`
      }
   },
   {
      language: "Polish",
      languageCode: "pl",
      category: "Prognozy Tenis ATP / WTA",
      categoryId: 9267,
      title: "Prognozy #eventName: #player1 vs #player2 - #eventDate",
      playerTag: "Prognozy #playerName",
      eventTag: "#eventName Prognozy Tenis WTA",
      contents: function (eventName,
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
         imgWrapper) {
         return `<div style="padding-bottom: 5px;">
         <h2 style="margin-top: unset;">${eventName}</h2>
         <p>${eventHeading2}</p>
      </div>
      
      <div style="display: flex; flex-direction: row;">
         ${imgWrapper?.join("")}
      </div>
      
      <div style="margin: 15px 0;">
         <ul>
            <li>Pojedynek: ${player1} kontra ${player2}</li>
            <li>Nazwa wydarzenia: ${eventName}</li>
            <li>Data meczu: ${eventDate}</li>
            ${eventRound ? `<li>Runda meczowa: ${eventRound}</li>` : ""}
            <li>Dzień wydarzenia: ${eventDay}</li>
            <li>Adres wydarzenia: ${eventAddress}</li>
         </ul>
      </div>
      
      ${`<p>
      Rzućmy okiem na wszystkie statystyki dotyczące kariery, występów i bezpośrednich pojedynków w tym meczu i dowiedzmy się, czy wygra ${player1} czy ${player2}.
      </p>`.replace(/\n/g, " ")}
      
      <br/> <br/>
      
      <h3>Szczegóły meczu:</h3>
      <p>${player1} kontra ${player2}${eventRound ? " - " + eventRound + " - " : " - "}${eventDate} - ${eventName} - ${eventAddress}</p>
      
      <br/>
         <p>
            <a href="https://www.stevegtennis.com/h2h-predictions/plans-match-winner-pro-monthly/" title="Tennis Premium Subscription" style="text-align: center; display: block;"> <picture>
               <source media="(max-width: 899px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans-sm_v2.webp">
               <source media="(min-width: 900px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp">
               <img decoding="async" src="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp" style="max-width: 640px; width:100%;" alt="Subscription Plans">
               </picture>
            </a>
         </p>
         <br/>
      
      <h3>${player1} kontra ${player2} bezpośrednie starcie, podgląd, statystyki i wybór:</h3>
      <article>
         <h5>Bezpośrednie ${leads}.</h5>
         <br/>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
      </article>
      
      <br/> <br/>
      
      <h3>${player1} vs ${player2} Prognoza:</h3>
      
      <p>
      Wierzę, że ${player1} wygra w prostych setach. 
      Algorytm przewidywania Stevegtennis.com ma znacznie lepszy wskaźnik skuteczności kompletacji 
      zwycięzcy meczu ode mnie!\n
      Sprawdź więc, kogo wybiera na ten mecz tutaj: <a href="https://www.stevegtennis.com/head-to-head/men/${player1slug}/${player2slug}/" target="_blank">
      Prognoza Stevegtennis.com ${player1} vs ${player2}.
      </a> 
      </p>
      `
      },
   },
   {
      language: "Dutch",
      languageCode: "nl",
      category: "Tennis Wedtips En Voorspellingen ATP / WTA",
      categoryId: 9268,
      title: "#eventName Voorspellingen Wedtips: #player1 versus #player2 - #eventDate",
      playerTag: "#playerName Voorspellingen Wedtips",
      eventTag: "#eventName Tennis Wedtips En Voorspellingen WTA",
      contents: function (eventName,
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
         imgWrapper) {
         return `
         <div style="padding-bottom: 5px;">
            <h2 style="margin-top: unset;">${eventName}</h2>
            <p>${eventHeading2}</p>
         </div>
         
         <div style="display: flex; flex-direction: row;">
            ${imgWrapper?.join("")}
         </div>
         
         <div style="margin: 15px 0;">
            <ul>
               <li>De wedstrijd: ${player1} versus ${player2}</li>
               <li>Gebeurtenisnaam: ${eventName}</li>
               <li>Wedstrijddatum: ${eventDate}</li>
               ${eventRound ? `<li>Wedstrijdronde: ${eventRound}</li>` : ""}
               <li>Dag van het evenement: ${eventDay}</li>
               <li>Evenementadres: ${eventAddress}</li>
            </ul>
         </div>
         
         ${`<p>
         Laten we eens kijken naar alle carrière-, prestatie- en onderlinge statistieken voor de wedstrijd en kijken of ${player1} of ${player2} naar verwachting zal winnen.
         </p>`.replace(/\n/g, " ")}
         
         <br/> <br/>
         
         <h3>Wedstrijddetails:</h3>
         <p>${player1} versus ${player2}${eventRound ? " - " + eventRound + " - " : " - "}${eventDate} - ${eventName} - ${eventAddress}</p>
         
         <br/>
         <p>
            <a href="https://www.stevegtennis.com/h2h-predictions/plans-match-winner-pro-monthly/" title="Tennis Premium Subscription" style="text-align: center; display: block;"> <picture>
               <source media="(max-width: 899px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans-sm_v2.webp">
               <source media="(min-width: 900px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp">
               <img decoding="async" src="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp" style="max-width: 640px; width:100%;" alt="Subscription Plans">
               </picture>
            </a>
         </p>
         <br/>
         
         <h3>${player1} versus ${player2} Head-to-Head, preview, statistieken en keuze:</h3>
         <article>
            <h5>Head to Head ${leads}.</h5>
            <br/>
            <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         </article>
         
         <br/> <br/>
         
         <h3>${player1} versus ${player2} Voorspelling:</h3>
         
         <p>
         Ik geloof dat ${player1} in twee sets zal winnen. 
         Het voorspellingsalgoritme van Stevegtennis.com heeft een veel beter succespercentage bij het kiezen 
         wedstrijdwinnaars dan ik!\n
         Bekijk hier dus wie er voor deze wedstrijd wordt uitgekozen: <a href="https://www.stevegtennis.com/head-to-head/men/${player1slug}/${player2slug}/" target="_blank">
         Stevegtennis.com ${player1} versus ${player2} voorspelling Wedtips.
         </a> 
         </p>
         `
      }
   },
   {
      language: "Turkish",
      languageCode: "tr",
      category: "Tenis Tahminleri ATP / WTA",
      categoryId: 9269,
      title: "#eventName Tahminler: #player1 vs #player2 - #eventDate",
      playerTag: "#playerName Tahminleri",
      eventTag: "#eventName Tenis Tahminleri WTA",
      contents: function (eventName,
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
         imgWrapper) {
         return `
         <div style="padding-bottom: 5px;">
            <h2 style="margin-top: unset;">${eventName}</h2>
            <p>${eventHeading2}</p>
         </div>
         
         <div style="display: flex; flex-direction: row;">
            ${imgWrapper?.join("")}
         </div>
         
         <div style="margin: 15px 0;">
            <ul>
               <li>Eşleşme: ${player1} ile ${player2}</li>
               <li>Etkinlik Adı: ${eventName}</li>
               <li>Maç Tarihi: ${eventDate}</li>
               ${eventRound ? `<li>Maç Turu: ${eventRound}</li>` : ""}
               <li>Etkinlik Günü: ${eventDay}</li>
               <li>Etkinlik Adresi: ${eventAddress}</li>
            </ul>
         </div>
         
         ${`<p>
         Maçın tüm kariyer, performans ve kafa kafaya istatistiklerine bir göz atalım ve ${player1}'ın mı yoksa ${player2}'un mu kazanmasının beklendiğini öğrenelim.
         </p>`.replace(/\n/g, " ")}
         
         <br/><br/>
         
         <h3>Eşleşme Ayrıntıları:</h3>
         <p>${player1} vs ${player2}${eventRound ? " - " + eventRound + " - " : " - "}${eventDate} - ${eventName} - ${eventAddress}</p>
         
         <br/>
         <p>
            <a href="https://www.stevegtennis.com/h2h-predictions/plans-match-winner-pro-monthly/" title="Tennis Premium Subscription" style="text-align: center; display: block;"> <picture>
               <source media="(max-width: 899px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans-sm_v2.webp">
               <source media="(min-width: 900px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp">
               <img decoding="async" src="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp" style="max-width: 640px; width:100%;" alt="Subscription Plans">
               </picture>
            </a>
         </p>
         <br/>
         
         <h3>${player1} ile ${player2} Karşı karşıya, Önizleme, İstatistikler ve Seçim:</h3>
         <article>
            <h5>Birebir ${leads}.</h5>
            <br/>
            <p>${paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         </article>
         
         <br/><br/>
         
         <h3>${player1} vs ${player2} Tahmini:</h3>
         
         <p>
         ${player1}'ın düz setlerde kazanacağına inanıyorum. 
         Stevegtennis.com tahmin algoritması toplamada çok daha iyi bir başarı oranına sahip 
         maçı benden kazananlar!\n
         Bu maç için kimi seçtiğine buradan göz atabilirsiniz: <a href="https://www.stevegtennis.com/head-to-head/men/${player1slug}/${player2slug}/" target="_blank">
         Stevegtennis.com ${player1} vs ${player2} tahmini.
         </a> 
         </p>
         `
      }
   },
   {
      language: "Chinese Mandarin",
      languageCode: "zh",
      category: "ATP / WTA 网球预测",
      categoryId: 9270,
      title: "#eventName 预测： #player1 vs #player2 - #eventDate",
      playerTag: "#playerName 预测",
      eventTag: "#eventName WTA 网球预测",
      contents: function (eventName,
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
         imgWrapper) {
         return `
         <div style="padding-bottom: 5px;">
            <h2 style="margin-top: unset;">${eventName}</h2>
            <p>${eventHeading2}</p>
         </div>
         
         <div style="display: flex; flex-direction: row;">
            ${imgWrapper?.join("")}
         </div>
         
         <div style="margin: 15px 0">
            <ul>
               <li>比赛：${player1} vs ${player2}</li>
               <li>活动名称：${eventName}</li>
               <li>比赛日期：${eventDate}</li>
               ${eventRound ? `<li>匹配回合：${eventRound}</li>` : ""}
               <li>活动日期：${eventDay}</li>
               <li>活动地址：${eventAddress}</li>
            </ul>
         </div>
         
         ${`<p>
         让我们看一下比赛的所有职业生涯、表现和交锋统计数据，看看 ${player1} 或 ${player2} 是否有望获胜。
         </p>`.replace(/\n/g, " ")}
         
         <br/><br/>
         
         <h3>比赛详情：</h3>
         <p>${player1} 对阵 ${player2}${eventRound ? " - " + eventRound + " - " : " - "}${eventDate} - ${eventName} - ${eventAddress}</p>
         
         <br/>
         <p>
            <a href="https://www.stevegtennis.com/h2h-predictions/plans-match-winner-pro-monthly/" title="Tennis Premium Subscription" style="text-align: center; display: block;"> <picture>
               <source media="(max-width: 899px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans-sm_v2.webp">
               <source media="(min-width: 900px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp">
               <img decoding="async" src="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp" style="max-width: 640px; width:100%;" alt="Subscription Plans">
               </picture>
            </a>
         </p>
         <br/>
         
         <h3>${player1} 与 ${player2} 的对决、预览、统计数据和选择：</h3>
         <article>
            <h5>头对头${leads}。</h5>
            <br/>
            <p>${paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         </article>
         
         <br/><br/>
         
         <h3>${player1} vs ${player2} 预测：</h3>
         
         <p>
         我相信${player1}会直落两盘获胜。 
         Stevegtennis.com 的预测算法在挑选方面有更好的成功率 
         比我还赢的比赛！
         因此，请在此处查看本场比赛的选择：<a href="https://www.stevegtennis.com/head-to-head/men/${player1slug}/${player2slug}/" target="_blank">
         Stevegtennis.com ${player1} vs ${player2} 预测。
         </a> 
         </p>
         `
      }
   },
   {
      language: "Arabic",
      languageCode: "ar",
      category: "توقعات اتحاد لاعبي التنس المحترفين للتنس",
      categoryId: 9271,
      title: "`توقعات #eventName: #player1 vs #player2 - #eventDate",
      playerTag: "توقعات  #playerName",
      eventTag: "#eventName توقعات اتحاد لاعبي التنس المحترفين للتنس",
      contents: function (eventName,
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
         imgWrapper) {
         return `
         <div style="padding-bottom: 5px;">
            <h2 style="margin-top: unset;">${eventName}</h2>
            <p>${eventHeading2}</p>
         </div>
         
         <div style="display: flex; flex-direction: row;">
            ${imgWrapper?.join("")}
         </div>
         
         <div style="margin: 15px 0">
            <ul>
               <li>المباراة: ${player1} ضد ${player2}</li>
               <li>اسم الحدث: ${eventName}</li>
               <li>تاريخ المباراة: ${eventDate}</li>
               ${eventRound ? `<li>جولة المباراة: ${eventRound}</li>` : ""}
               <li>يوم الحدث: ${eventDay}</li>
               <li>عنوان الحدث: ${eventAddress}</li>
            </ul>
         </div>
         
         ${`<p>
         دعونا نلقي نظرة على جميع الإحصائيات المهنية والأداء والمواجهات المباشرة للمباراة ونكتشف ما إذا كان ${player1} أو ${player2} من المتوقع أن يفوز.
         </p>`.replace(/\n/g, " ")}
         
         <br/><br/>
         
         <h3>تفاصيل المباراة:</h3>
         <p>${player1} ضد ${player2}${eventRound ? " - " + eventRound + " - " : " - "}${eventDate} - ${eventName} - ${eventAddress}</p>
         
         <br/>
         <p>
            <a href="https://www.stevegtennis.com/h2h-predictions/plans-match-winner-pro-monthly/" title="Tennis Premium Subscription" style="text-align: center; display: block;"> <picture>
               <source media="(max-width: 899px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans-sm_v2.webp">
               <source media="(min-width: 900px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp">
               <img decoding="async" src="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp" style="max-width: 640px; width:100%;" alt="Subscription Plans">
               </picture>
            </a>
         </p>
         <br/>
         
         <h3>${player1} vs ${player2} المواجهات المباشرة والمعاينة والإحصائيات والاختيار:</h3>
         <article>
            <h5>وجها لوجه ${leads}.</h5>
            <br/>
            <p>${paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         </article>
         
         <br/><br/>
         
         <h3>توقع ${player1} مقابل ${player2}:</h3>
         
         <p>
         أعتقد أن ${player1} سيفوز بمجموعتين متتاليتين. 
         تتمتع خوارزمية التنبؤ Stevegtennis.com بمعدل نجاح أفضل بكثير في اختيار 
         الفائزين بالمباراة أكثر مني!
         لذا تحقق من من يختاره لهذه المباراة هنا: 
         <a href="https://www.stevegtennis.com/head-to-head/men/${player1slug}/${player2slug}/" target="_blank">
         توقع موقع Stevegtennis.com ${player1} مقابل ${player2}.
         </a> 
         </p>
         `
      }
   },
   {
      language: "Japanese",
      languageCode: "ja",
      category: "ATP / WTAテニスの予想",
      categoryId: 9272,
      title: "#eventName の予測: #player1 対 #player2 - #eventDate",
      playerTag: "#playerName の予測",
      eventTag: "#eventName WTAテニスの予想",
      contents: function (eventName,
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
         imgWrapper) {
         return `
         <div style="padding-bottom: 5px;">
            <h2 style="margin-top: unset;">${eventName}</h2>
            <p>${eventHeading2}</p>
         </div>
         
         <div style="display: flex; flex-direction: row;">
            ${imgWrapper?.join("")}
         </div>
         
         <div style="margin: 15px 0">
            <ul>
               <li>対戦: ${player1} 対 ${player2}</li>
               <li>イベント名: ${eventName}</li>
               <li>試合日: ${eventDate}</li>
               ${eventRound ? `<li>マッチラウンド: ${eventRound}</li>` : ""}
               <li>イベントの日: ${eventDay}</li>
               <li>イベントアドレス: ${eventAddress}</li>
            </ul>
         </div>
         
         ${`<p> 
         試合のすべてのキャリア、パフォーマンス、対戦成績を見て、${player1} と ${player2} のどちらが勝つと予想されるかを調べてみましょう。
         </p>`.replace(/\n/g, " ")}
         
         <br /><br />
         
         <h3>試合の詳細:</h3>
         <p>${player1} 対 ${player2}${eventRound ? " - " + eventRound + " - " : " - "}${eventDate} - ${eventName} - ${eventAddress}</p>
         
         <br/>
         <p>
            <a href="https://www.stevegtennis.com/h2h-predictions/plans-match-winner-pro-monthly/" title="Tennis Premium Subscription" style="text-align: center; display: block;"> <picture>
               <source media="(max-width: 899px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans-sm_v2.webp">
               <source media="(min-width: 900px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp">
               <img decoding="async" src="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp" style="max-width: 640px; width:100%;" alt="Subscription Plans">
               </picture>
            </a>
         </p>
         <br/>
         
         <h3>${player1} 対 ${player2} の直接対決、プレビュー、統計、選択:</h3>
         <article>
            <h5>直接対決 ${leads}。</h5>
            <br />
            <p>${paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         </article>
         
         <br /><br />
         
         <h3>${player1} 対 ${player2} 予測:</h3>
         
         <p>
            私は ${player1} がストレート セットで勝つと信じています。 
            Stevegtennis.com の予測アルゴリズムは、ピッキングの成功率がはるかに優れています。 
            私より勝者と対戦してください!
            この試合に誰が選ばれるかをここでチェックしてください: 
            <a href="https://www.stevegtennis.com/head-to-head/men/${player1slug}/${player2slug}/" target="_blank">
               Stevegtennis.com の ${player1} 対 ${player2} の予測。
            </a> 
         </p>
         `
      }
   },
   {
      language: "Russian",
      languageCode: "ru",
      category: "Прогнозы ATP / WTA на теннис",
      categoryId: 9273,
      title: "Прогнозы на #eventName: #player1 против #player2 - #eventDate",
      playerTag: "Прогнозы #playerName",
      eventTag: "#eventName Прогнозы WTA на теннис",
      contents: function (eventName,
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
         imgWrapper) {
         return `
         <div style="padding-bottom: 5px;">
            <h2 style="margin-top: unset;">${eventName}</h2>
            <p>${eventHeading2}</p>
         </div>
         
         <div style="display: flex; flex-direction: row;">
            ${imgWrapper?.join("")}
         </div>
         
         <div style="margin: 15px 0">
            <ul>
               <li>Матч: ${player1} против ${player2}</li>
               <li>Название события: ${eventName}</li>
               <li>Дата матча: ${eventDate}</li>
               ${eventRound ? `<li>Раунд матча: ${eventRound}</li>` : ""}
               <li>День мероприятия: ${eventDay}</li>
               <li>Адрес мероприятия: ${eventAddress}</li>
            </ul>
         </div>
         
         ${`<p>
         Давайте посмотрим на всю статистику карьеры, выступлений и личных встреч в матче и выясним, кто, как ожидается, выиграет: ${player1} или ${player2}.
         </p>`.replace(/\n/g, " ")}
         
         <br/><br/>
         
         <h3>Подробности матча:</h3>
         <p>${player1} против ${player2}${eventRound ? " - " + eventRound + " - " : " - "}${eventDate} - ${eventName} - ${eventAddress}</p>
         
         <br/>
         <p>
            <a href="https://www.stevegtennis.com/h2h-predictions/plans-match-winner-pro-monthly/" title="Tennis Premium Subscription" style="text-align: center; display: block;"> <picture>
               <source media="(max-width: 899px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans-sm_v2.webp">
               <source media="(min-width: 900px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp">
               <img decoding="async" src="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp" style="max-width: 640px; width:100%;" alt="Subscription Plans">
               </picture>
            </a>
         </p>
         <br/>
         
         <h3>Личный бой ${player1} против ${player2}, обзор, статистика и выбор:</h3>
         <article>
            <h5>Сопоставление ${leads}.</h5>
            <br/>
            <p>${paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
         </article>
         
         <br/><br/>
         
         <h3>Прогноз ${player1} против ${player2}:</h3>
         
         <p>
            Я считаю, что ${player1} выиграет в двух сетах. 
            Алгоритм прогнозирования Stevegtennis.com имеет гораздо лучший показатель успеха при выборе 
            победителей матча, чем я!
            Так что проверьте, кого он выберет для этого матча здесь: 
            <a href="https://www.stevegtennis.com/head-to-head/men/${player1slug}/${player2slug}/" target="_blank">
            Прогноз Stevegtennis.com: ${player1} против ${player2}.
            </a> 
         </p>
         `
      }
   },
   {
      language: "Hindi",
      languageCode: "hi",
      category: "एटीपी टेनिस भविष्यवाणियाँ",
      categoryId: 9274,
      title: "#eventName पूर्वानुमान: #player1 बनाम #player2 - #eventDate",
      playerTag: "#playerName भविष्यवाणियाँ`",
      eventTag: "#eventName एटीपी टेनिस भविष्यवाणियाँ",
      contents: function (eventName,
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
         imgWrapper) {
         return `<div style='padding-bottom: 5px;'>
         <h2 style='margin-top: unset;'>${eventName}</h2>
         <p>${eventHeading2}</p>
      </div>
      
      <div style="display: flex; flex-direction: row;">${imgWrapper?.join("")}</div>
      
      <div style="margin: 15px 0">
         <ul>
            <li>मैच जारी: ${player1} बनाम ${player2}</li>
            <li>इवेंट का नाम: ${eventName}</li>
            <li>मैच तिथि: ${eventDate}</li>
            ${eventRound ? `<li>मैच राउंड: ${eventRound}</li>` : ""}
            <li>घटना का दिन: ${eventDay}</li>
            <li>इवेंट का पता: ${eventAddress}</li>
         </ul>
      </div>
      
      ${`<p>
         आइए मैच के सभी करियर, प्रदर्शन और आमने-सामने के आँकड़ों पर एक नज़र डालें और पता करें कि क्या ${player1} या ${player2} के जीतने की उम्मीद है।
      </p>`.replace(/\n/g, " ")}
      
      <br/> <br/>
      
      <h3>मैच विवरण:</h3>
      <p>${player1} बनाम ${player2}${eventRound ? " - " + eventRound + " - " : " - "}${eventDate} - ${eventName} - ${eventAddress}</p>
      
      <br/>
         <p>
            <a href="https://www.stevegtennis.com/h2h-predictions/plans-match-winner-pro-monthly/" title="Tennis Premium Subscription" style="text-align: center; display: block;"> <picture>
               <source media="(max-width: 899px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans-sm_v2.webp">
               <source media="(min-width: 900px)" srcset="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp">
               <img decoding="async" src="https://www.stevegtennis.com/assets/images/tennis-subscription-plans_v2.webp" style="max-width: 640px; width:100%;" alt="Subscription Plans">
               </picture>
            </a>
         </p>
         <br/>
      
      <h3>${player1} बनाम ${player2} आमने-सामने, पूर्वावलोकन, आँकड़े और चयन:</h3>
      <article>
         <h5>हेड टू हेड ${leads}.</h5>
         <br/>
         <p>${paraphrasedBlog && paraphrasedBlog?.replace(/^"|"$/g, '')}</p>
      </article>
      
      <br/> <br/>
      
      <h3>${player1} बनाम ${player2} भविष्यवाणी:</h3>
      
      <p>
         मेरा मानना ​​है कि ${player1} सीधे सेटों में जीतेगा। 
         स्टीवगटेनिस.कॉम भविष्यवाणी एल्गोरिदम की चयन में सफलता दर काफी बेहतर है 
         मुझसे ज़्यादा मैच विजेता!\n
         तो यहां देखें कि वह इस मैच के लिए किसे चुनता है: <a href='https://www.stevegtennis.com/head-to-head/men/${player1slug}/${player2slug}/' target='_blank' >
         स्टीवगटेनिस.कॉम ${player1} बनाम ${player1} भविष्यवाणी।
         </a> 
      </p>`
      }
   }
]


module.exports = postTemplate;