const { constant } = require("../config");
const postTemplate = require("../resource/postTemplate");
const { getPdfLinks,
   createPostOfWP,
   getPostTagIdsOfWP,
   getMediaIdOfWP,
   checkExistingPostOfWP,
   downloadPDF,
   paraphraseContents
} = require("../services");

const { consoleLogger, extractMatchInfo,
   imgWrapper,
   delay,
   slugMaker,
   capitalizeFirstLetterOfEachWord,
   getSurnameOfPlayer
} = require("../utils");


const translate = (...args) =>
   import('translate').then(({ default: fetch }) => fetch(...args));

translate.engine = 'libre';
translate.key = process.env.LIBRE_TRANSLATE_KEY;


const pdfTextContents2 = `WTA Website: www.wtatennis.com | @WTA | facebook.com/wta
Tournament Website: internationaux-strasbourg.fr/en | @WTA_Strasbourg
Communications: Raquel Martin (rmartin@wtatennis.com); Alex Prior (aprior@wtatennis.com)
MATCH NOTES – DAY 4 – WEDNESDAY MAY 22, 2024
Emma Navarro (USA #24) vs [2] Beatriz Haddad Maia (BRA #14) Tied 1-1
Navarro is making her second appearance at Strasbourg, where she previously reached the QF in
2023…Navarro has beaten Cornet so far this week to reach 2r…Navarro has a clay court match record of 9-4
so far in 2024…Navarro’s best career results on clay are her quarterfinalist runs at Strasbourg 2023 and
Palermo 2023…Navarro and Haddad Maia have only ever faced on clay court, having most recently played in
3r of Madrid with Haddad Maia winning in straight sets, 64 64…Haddad Maia is making her debut appearance
at Strasbourg…Haddad Maia’s best results on clay court are her semifinalist runs at Roland Garros 2023 and
Bogota 2019…
[1] Marketa Vondrousova (CZE #6) vs. [Q] Magdelena Frech (POL #54) Vondrousova leads 2-0
Vondrousova is making her tournament debut in Strasbourg…Vondrousova’s best result on clay court is
runner-up which she has reached twice: Roland Garros and Istanbul in 2019… Vondrousova is the No.1 seed
this week for the first time in her career…Vondrousova has a clay court match record of 5-3 so far in 2024
including semifinal run at Stuttgart (l. Kostyuk) and a win over World No.2 Sabalenka in the Stuttgart
QF…Frech is also making her first appearance at Strasbourg…Frech is looking for her first win over
Vondrousova…the two have previously faced twice only on hard court…Frech is also seeking her first win
over a Top 10 player in her career…
Clara Burel (FRA #43) vs. [7] Elina Svitolina (UKR #17) Svitolina leads 2-0
Burel is making her fourth appearance at Strasbourg, where her career-best result was a semifinal showing
last year in 2023…Burel defeated Pliskova in this week’s opening round to reach 2r…Burel faces World No.17
Elina Svitolina in 2r in a rematch of last year’s semifinal, which Svitolina won from a set down…Burel is
looking for her second Top 20 win in her career…Defending Strasbourg champion Svitolina is making her
fourth main draw appearance at the tournament…Svitolina has a 9-1 win-loss record at Strasbourg, having
also won the title in 2020…Svitolina defeated Parry so far this week to reach 2r in her ninth straight match at
the tournament…
[3] Danielle Collins (USA #12) vs. Katerina Siniakova (CZE #34) Collins leads 2-1
Collins is making her second appearance at Strasbourg, where her previous result was reaching the 2r in
2018…Two of her four career WTA singles titles have come on clay: 2021 Palermo and 2024
Charleston…Collins has won 19 of her last 21 matches…Collins has a clay court match record of 12-2 so far
in 2024…Collins leads the head-to-head over Siniakova 2-1, although this is their first matchup on clay
court…Siniakova is making her second appearance at Strasbourg, where her previous result was reaching the
QF in 2020…Siniakova defeated Putintseva so far this week to reach 2r for her 7th win in her last 8 matches at
the WTA 125-level and above…
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
24
Emma
Navarro
UNITED STATES OF
AMERICA
Beatriz
Haddad Maia
BRAZIL
14
2001-05-18 Date of Birth 1996-05-30
Charleston, SC, USA Residence Sao Paulo, Brazil
Right-Handed Plays Left-handed
5' 7'' (1.70m) Height 6' 0" (1.85m)
20 Career-High Ranking 10
$1,492,248 Career Prize Money $6,142,823
$719,553 Season Prize Money $799,746
1 / 1 Singles Titles YTD / Career 0 / 3
3-5 (Round of 32: 2024 AUSTRALIAN
OPEN)
Grand Slam W-L (best) 18-15 (Semi-Finalist: 2023 ROLAND
GARROS)
1-0 / 3-1 (Quarter-Finalist: 2023) YTD / Career STRASBOURG W-L
(best)
0-0 / 0-0
23-10 / 42-32 YTD / Career W-L 13-12 / 110-89
3-3 / 12-12 YTD / Career Clay W-L 5-3 / 25-20
12-5 / 18-11 YTD / Career 3-Set W-L 4-6 / 43-37
1-2 / 6-6 YTD / Career TB W-L 3-3 / 35-30
2-1 / 3-3 YTD / Career L Hand W-L 1-0 / 11-8
3-6 / 5-7 YTD / Career TOP 20 W-L 2-5 / 19-28
Champion: HOBART YTD Best Result Semi-Finalist: ABU DHABI
1
win
1
win
ma
2
tches
played
5/21/24, 5:38 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS015/apps/post-match-insights/match-notes/sna… 1/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Emma
Navarro
Beatriz
Haddad Maia
Head To Head Record
YEAR TOURNAMENT SURFACE ROUND WINNER SCORE/ RESULT TIME
2024 MADRID CLAY 3r Beatriz Haddad Maia 6-4 6-4 1h 52m
2021 CHARLESTON 125 CLAY 1r Emma Navarro 7-6(5) 6-0 2h 4m
Ranking History
TOP RANK YEAR-END YEAR TOP RANK YEAR-END
20 - 2024 11 -
38 38 2023 10 11
127 143 2022 15 15
233 233 2021 80 82
462 463 2020 119 358
412 486 2019 95 120
761 763 2018 58 184
- - 2017 58 65
- - 2016 200 211
- - 2015 148 198
5/21/24, 5:38 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS015/apps/post-match-insights/match-notes/sna… 2/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Emma
Navarro
Beatriz
Haddad Maia
Tournament History
CURRENT TOURNAMENT
1r: d. A. CORNET (#107) 6-4 6-1 (1h 17m)
Total time on court: 1h 17m
PLAYER NOTES
Making her 2nd appearance at Strasbourg,
where her previous result was reaching QF in
2023 (l. Blinkova)
Has beaten Alizé Cornet so far this week to
reach her first 2r since 3r at Charleston 2024
Faces No.14 Beatriz Haddad Maia in 2r today;
owns 5 wins in career over Top 20 players, most
recently No.14 Jasmine Paolini at Miami 2024
Owns 8-14 career record against seeds, with a
record in 2024 standing at 5-6
Best career result on clay is Quarter-Finalist
which she has reached twice: Palermo,
Strasbourg in 2023
One of 3 players from United States of America
to reach 2r
Best result by an American player at Strasbourg
were the Champion runs by Jennifer Capriati in
1999, Lindsay Davenport in 1996, Lindsay
Davenport in 1995, Mary Fernandez in 1994
Is currently ranked No.24; this time last year
was ranked No.82
During last year's European clay swing reached
2r at Lausanne, QF at Palermo, 2r at Roland
Garros, QF at Strasbourg
Longest winning streak of her career was 8
matches in 2024
Has won 23 matches so far in 2024; she is
ranked No.6 on tour for match wins, behind
Danielle Collins, Aryna Sabalenka, Coco Gauff
Has been involved in 17 three-set matches in
2024
CURRENT TOURNAMENT
Total time on court: 0m
PLAYER NOTES
Making her debut appearance at Strasbourg
Faces No.24 Emma Navarro in 2r today; owns 47
wins in career over Top 50 players, most
recently No.42 Xinyu Wang at Rome 2024
The two have only ever faced each other on clay
court, having most recently played in 3r at
Madrid with Haddad Maia winning 64 64
Owns 12-8 career record against players from
United States of America, with record in 2024
standing at 2-1
Best career result on clay is Semi-Finalist which
she has reached 2 times: Roland Garros in 2023;
Bogota in 2019
Only player from Brazil to reach 2r
Best result by a Brazilian player at Strasbourg
was the Round of 16 run by Andrea Vieira in 1995
Last time a player from Brazil reached 2r at
Strasbourg was 1995
Is currently ranked No.14; this time last year was
ranked No.14
During last year's European clay swing reached
SF at Roland Garros, QF at Rome, 2r at Madrid,
QF at Stuttgart
Longest winning streak of her career was 13
matches in 2022
Has won 12 matches so far in 2024; she is
ranked No.25 on tour for match wins, behind
Anhelina Kalinina, Sorana Cirstea, Magda Linette
Has been involved in 10 three-set matches in
2024
5/21/24, 5:38 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS015/apps/post-match-insights/match-notes/sna… 3/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Emma
Navarro
Beatriz
Haddad Maia
Recent Tournament History
2023 Result Rank: 82 Seed: -
QF L A. BLINKOVA (#66) 6-4 6-4
2r W J. TEICHMANN (#75) 2-6 6-3 6-2
1r W T. MARTINCOVA (#91) 6-2 6-3
Making her tournament debut in Main Draw
Singles
5/21/24, 5:38 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS015/apps/post-match-insights/match-notes/sna… 4/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Emma
Navarro
Beatriz
Haddad Maia
Season 2024 History
Contested R16 at Charleston (l. Cristian)
Reached R16 at Miami (l. Pegula)
Earned her highest career win in R16 at Indian
Wells defeating No.2 Sabalenka. By reaching the
QF (l. Sakkari), she achieved a career high WTA
ranking of No.20
Reached SF at San Diego (l. Boulter)
Played 2r at Dubai (l. Sakkari)
Contested R16 at Doha (l. eventual R-Up
Rybakina)
Achieved her best Grand Slam result to date
with 3r at Australian Open (l. Yastremska)
Won her first career title at Hobart defeating
Mertens in the final
Reached SF in her 2024 season opener at
Auckland (l. eventual champion Gauff)
Contested R16 at Charleston (l. Kudermetova)
After 1r byes, made 3r at WTA 1000 events Miami
(l. Boulter) and Indian Wells (l. Pavlyuchenkova)
Contested R16 at San Diego (l. Boulter)
Fell in opening round at Doha (l. Wang Xinyu)
and Dubai (l. eventual champion, Paolini)
Contested SF at Abu Dhabi (l. Kasatkina)
Made 3r at Australian Open (l. Timofeeva)
Fell in opening round at Adelaide (l.
Pavlyuchenkova)
Opened season at United Cup as part of Team
Brazil, going 1-1 in singles play (l. Swiatek, d.
Sorribes Tormo)
VALUE WTA RANK MATCH STATS VALUE WTA RANK
37 57 Aces 49 44
65.8% 33 First serve % 69.0% 11
63.0% 50 First Serve points won % 63.5% 43
48.6% 13 Second serve points won % 47.2% 25
58.1% 29 Overall service points won % 58.4% 25
69.2% 29 Service games won % 70.5% 18
55.6% 45 Break points saved % 58.3% 29
39.6% 17 First serve return points won % 36.4% 48
56.5% 31 Second serve return points won % 51.9% 78
45.5% 40 Break points converted % 48.0% 19
40.8% 17 Return games won % 30.3% 69
45.9% 18 Return points won % 41.8% 70
Best win by ranking: No.2 vs Sabalenka in INDIAN WELLS 4r
Longest match: 2h 54m vs Sakkari in INDIAN WELLS QF
Shortest match: 1h 2m vs Mertens in DOHA 2r
1h 2m vs Gauff in AUCKLAND SF
Match points saved:
Most aces in a match: 4 vs Yuan in HOBART SF
Best win by ranking: No.6 vs Sakkari in MADRID 4r
No.6 vs Jabeur in ABU DHABI QF
Longest match: 3h 42m vs Linette in ABU DHABI 2r
Shortest match: 1h 9m vs Wang in DOHA 1r
Match points saved:
Most aces in a match: 6 vs Errani in MADRID 2r
5/21/24, 5:38 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS015/apps/post-match-insights/match-notes/sna… 5/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Emma
Navarro
Beatriz
Haddad Maia
Titles & Grand Slams
SINGLES FINALS
Champion (1)
2024 - HOBART
SINGLES FINALS
Champion (3)
2023 - ZHUHAI
2022 - BIRMINGHAM, NOTTINGHAM
Runner-Up (2)
2022 - TORONTO
2017 - SEOUL
DOUBLES FINALS
Champion (7)
2024 - ADELAIDE (w/Townsend)
2023 - ZHUHAI (w/Kudermetova), MADRID
(w/Azarenka)
2022 - NOTTINGHAM (w/Zhang), SYDNEY
(w/Danilina)
2017 - BOGOTA (w/Podoroska)
2015 - BOGOTA (w/Goncalves)
Runner-Up (3)
2023 - INDIAN WELLS (w/Siegemund)
2022 - GUADALAJARA (w/Danilina), AUSTRALIAN
OPEN (w/Danilina)
AUSTRALIAN
OPEN
ROLAND
GARROS WIMBLEDON US OPEN
AUSTRALIAN
OPEN
ROLAND
GARROS WIMBLEDON US OPEN
3r 2024 3r
2r 1r 1r 2023 1r SF 4r 2r
2022 2r 2r 1r 2r
1r 2021
2020
2019 2r 2r
2018 2r
2017 1r 2r 1r
5/21/24, 5:38 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS015/apps/post-match-insights/match-notes/sna… 6/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Emma
Navarro
Beatriz
Haddad Maia
Career Milestones
2023 was a stand-out year, achieving a career
best with semifinal at WTA 500 San Diego (l.
Kenin) and ending season with a ranking of No.
32. Also reached two quarterfinals on clay;
Strasbourg (l. Blinkova) and Palermo (l. eventual
champion Zheng) and one semifinal on grass;
Bad Homburg (l. Siniakova).
In 2022, posted 31-18 win-loss record. At Tourlevel, made 2r at Charleston (as WC, l. Jabeur),
fell 1r at Monterrey (as WC, l. Zacarias) and
Indian Wells (as WC, l. Anisimova), and
contested qualifying at San Diego
Elsewhere in 2022, reached three ITF Circuit
finals, including lifting second career title at this
level at W60 tournament in Liepaja, Latvia,
while made SF at WTA 125K Series event in
Vancouver
Broke into Top 200 for the first time on March 7,
2022
Lifted maiden ITF Circuit title at W25 event in
Orlando in November 2021
Won the NCAA division 1 women's singles title in
May 2021 to earn a WC into US Open, where she
fell 1r (l. McHale)
In 2021, reached 2r at both Charleston [500] and
Charleston [250]
Fell 1r at 2020 Monterrey (l. Stephens)
Only other events in 2020 came on ITF Circuit,
ending year ranked No.463
Owns three ITF Circuit titles in singles and one
in doubles
Fell 2r on professional debut at $10k Charleston,
SC-USA (l. Di Lorenzo) in 2015
Began her collegiate career by winning her first
14 NCAA singles matches and moving up to a
No.6 ITA ranking
Ended 2019 at No.3 in ITF Junior rankings,
following a season that included a R-Up finish at
Roland Garros (l. Fernandez), a SF run at
Wimbledon and victory at the Adidas Easter
Bowl
Also R-Up in girls' doubles at 2019 Australian
Open w/Beck
Broke into Top 10 in June 2023 after a strong
clay season with SF at Roland Garros and QF at
Rome and Stuttgart; ended year at No.11
Also in 2023, won third career title at WTA Elite
Trophy Zhuhai (d. Q.Zheng) and reached SF at
Abu Dhabi and QF at Adelaide 2, Doha and San
Diego
In doubles, won titles at Madrid w/Victoria
Azarenka (d. Gauff/Pegula) and WTA Elite Trophy
Zhuhai w/Veronika Kudermetova (d.
Kato/Sutjiadi)
2022 season highlighted by a stellar sequence of
results on grass, when she became the first
woman ever to win Nottingham and Birmingham
back-to-back, her first career WTA titles
Broke into the Top 20 following her run to the
first WTA 1000 final at 2022 Toronto (l. Halep);
also in 2022 advanced to SF at Monterrey and
Eastbourne and three further QFs
Also in 2022, won two titles at WTA 125K events
in Saint Malo and Paris
Won third doubles title at 2022 Nottingham
w/Shuai Zhang (d. Dolehide/Niculescu), also
reached final at Australian Open w/Anhelina
Danilina (Krejcikova/Siniakova) and Guadalajara
1000 w/Danilina (l. Hunter/Stefani); earned spot
at WTA Finals Fort Worth in doubles with
Danilina going 1-2 in group play
In 2021, peaked at No.80 in rankings; highlights
where R16 at Indian Wells and falling 1r at
Chicago 500; also played qualifying at
Wimbledon and US Open and won five ITF
Circuit titles in 2021
Posted best win-by-ranking of career in 2021,
defeating No.3 Karolina Pliskova during run to
R16 as LL at Indian Wells. Played only on ITF
Circuit in 2020 winning four titles and reaching
one other final
Highlights of 2019 were SF at Bogota and QF at
Acapulco (both as qualifier); earned first Top 10
win of career over No.4 Sloane Stephens at
Acapulco
Ended 2018 at No.184, with season highlight
reaching 3r at Miami (l. Ostapenko). Also made
2r at Hobart, Australian Open and Acapulco.
Posted first Top 100 season in 2017, finishing at
No.65
Broke into Top 100 following first Grand Slam
main draw appearance at 2017 Roland Garros,
earning spot as a qualifier Reached first WTA
singles final at 2017 Seoul while ranked No.71 (l.
No.10 Ostapenko)
5/21/24, 5:38 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS015/apps/post-match-insights/match-notes/sna… 7/8
Other 2017 highlights include QF at Prague (as
qualifier) and first Grand Slam main draw win at
Wimbledon; defeated No.19 Sam Stosur en route
to Prague QF, the first Top 20 win of career
In doubles, won second title at Bogota w/Nadia
Podoroska (d. Cepede Royg/Linette)
Played three WTA main draws in 2016 at Rio de
Janeiro, Miami and Florianopolis falling in 1r in
each appearance; also played qualifying at
Roland Garros and US Open
In 2015, reached first QF of career at Rio de
Janeiro while ranked No.234 losing to No.16 Sara
Errani, the first Top 20 match of career; result
propelled her into Top 200 for first time in
career
Also in 2015, reached 2r at Bogota and played
qualifying at Charleston, Roland Garros,
Nottingham and Wimbledon
Won first WTA doubles title at 2015 Bogota
w/Paula Cristina Goncalves (d. Falconi/Rogers)
In July 2015, suffered a shoulder injury at the
Pan American Games in Toronto, was forced to
have surgery and miss remainder of season
Played two WTA events in 2014 at Rio de Janeiro
and Florianopolis; falling in 1r at both events as
a WC
Won first WTA match at 2013 Florianopolis as
WC (d. Hsu, l. Czink)
Made WTA qualifying debut at 2012 Québec City
(l. El Tabakh)
Owns 17 ITF Circuit singles titles; made
professional debut on ITF circuit in 2010
Other Information
Currently coached by Peter Ayers
Born in New York City and raised in Charleston,
SC.
Attended the University of Virginia where she is
studied Arts & Science and played collegiate
tennis
2021 NCAA Singles Champion (freshman year)
2019 Australian Open Junior Doubles Finalist
2019 Roland-Garros Junior Doubles Champion
and Singles Finalist
2019 Wimbledon Junior Singles Semi-Finalist
Is the daughter of businessman Ben Navarro and
the grand-daughter of former American football
player and coach Frank Navarro
Coached by Rafael Paciaroni
Born in Sao Paulo, to Ayrton Elias Maia Filho and
Lais Scaff Haddad
Both her mother and grandmother Arlette Scaff
Haddad were successful tennis players in Brazil
Started playing tennis at the age of five
5/21/24, 5:38 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS015/apps/post-match-insights/match-notes/sna… 8/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
6 Marketa
Vondrousova
CZECH REPUBLIC
Magdalena
Frech
POLAND
54
1999-06-28 Date of Birth 1997-12-15
Sokolov, CZE Residence Lodz, Poland
Left-handed, two-handed backhand Plays Right-handed
5' 6" (1.72m) Height 5' 7'' (1.71m)
6 Career-High Ranking 42
$9,925,533 Career Prize Money $2,246,555
$665,462 Season Prize Money $427,342
0 / 2 Singles Titles YTD / Career 0 / 0
37-22 (Champion: 2023 WIMBLEDON) Grand Slam W-L (best) 8-11 (Round of 16: 2024 AUSTRALIAN
OPEN)
0-0 / 0-0 YTD / Career STRASBOURG W-L
(best)
1-0 / 1-0 (Round of 16: 2024)
10-7 / 144-90 YTD / Career W-L 8-11 / 40-77
5-3 / 39-24 YTD / Career Clay W-L 2-3 / 13-21
5-2 / 35-44 YTD / Career 3-Set W-L 4-4 / 15-26
1-3 / 28-27 YTD / Career TB W-L 3-2 / 13-15
2-0 / 9-1 YTD / Career L Hand W-L 0-0 / 2-7
1-0 / 13-23 YTD / Career TOP 10 W-L 0-3 / 0-13
Semi-Finalist: STUTTGART YTD Best Result Round of 16: DUBAI, AUSTRALIAN
OPEN, HOBART, STRASBOURG
2
win
0
win
ma
2
tches
played
5/21/24, 4:47 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS008/apps/post-match-insights/match-notes/sna… 1/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Marketa
Vondrousova
Magdalena
Frech
Head To Head Record
YEAR TOURNAMENT SURFACE ROUND WINNER SCORE/ RESULT TIME
2022 INDIAN WELLS HARD 2r Marketa Vondrousova 6-1 6-3 1h 8m
2016 SUNRISE CLAY Q Marketa Vondrousova 6-1 6-3 0m
Ranking History
TOP RANK YEAR-END YEAR TOP RANK YEAR-END
6 - 2024 42 -
6 7 2023 63 63
32 99 2022 82 116
20 35 2021 99 102
16 21 2020 155 156
14 16 2019 149 198
50 67 2018 115 151
61 67 2017 165 166
286 376 2016 320 321
429 429 2015 374 459
5/21/24, 4:47 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS008/apps/post-match-insights/match-notes/sna… 2/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Marketa
Vondrousova
Magdalena
Frech
Tournament History
CURRENT TOURNAMENT
Total time on court: 0m
PLAYER NOTES
Making her debut appearance at Strasbourg
Faces No.54 Magdalena Frech in 2r today; leads
the head-to-head 2-0
Owns 1-4 career record against players from
Poland, with record in 2024 standing at 0-0
Owns 21-7 career record against qualifiers, with
a record in 2024 standing at 2-1
Best career result on clay is Runner-Up which
she has reached twice: Roland Garros, Istanbul
in 2019
Is the No. 1 seed this week for the first time in
her career
One of 2 players from Czech Republic to reach
2r
Best result by Czech players at Strasbourg were
the title runs by Barbora Krejcikova in 2021,
Nicole Vaidisova in 2006, and Jana Novotna in
1989
Last time 2 players from Czech Republic
reached 2r at Strasbourg was 1993
One of 4 wildcards to reach 2r
Best result by a wildcard at Strasbourg were the
title runs by Elina Svitolina in 2023, Angelique
Kerber in 2022, Samantha Stosur in 2017,
Samantha Stosur in 2015, Maria Sharapova in
2010, Steffi Graf in 1997
Is currently ranked No.6; this time last year was
ranked No.57
During last year's European clay swing reached
2r at Roland Garros, 4r at Rome, 2r at Madrid
Longest winning streak of her career was 10
matches in 2023
Has won 9 matches so far in 2024; she is ranked
No.40 on tour for match wins, behind Sara
Sorribes Tormo, Katie Boulter, Arantxa Rus
Has been involved in 5 three-set matches in
2024
CURRENT TOURNAMENT
1r: d. S. STEPHENS (#35) 6-3 6-3 (1h 25m)
Total time on court: 1h 25m
PLAYER NOTES
Making her 1st appearance at Strasbourg
Has beaten Sloane Stephens so far this week to
reach her first 2r since 3r at Dubai 2024
Faces No.6 Marketa Vondrousova in 2r today; is
seeking her first win in career over a Top 10
player
Owns 2-5 career record against players from
Czech Republic, with record in 2024 standing at
0-1
Owns 0-1 career record against wildcards, with
a record in 2024 standing at 0-0
Best career result on clay is Quarter-Finalist
which she has reached 1 time: Prague in 2020
One of 2 players from Poland to reach 2r
Best result by a Polish player at Strasbourg was
the finalist run by Marta Domachowska in 2005
One of 4 qualifiers to reach 2r
Best result by a qualifier at Strasbourg were the
Runner-Up runs by Mirjana Lucic-baroni in 2016,
Sílvia Soler-espinosa in 2014, Karolina Sprem in
2003
Is currently ranked No.54; this time last year
was ranked No.87
During last year's European clay swing reached
2r at Roland Garros, 2r at Rome, 2r at Madrid
Has won 8 matches so far in 2024; she is ranked
No.49 on tour for match wins, behind Leylah
Fernandez, Lin Zhu, Donna Vekic
Has been involved in 8 three-set matches in
2024
5/21/24, 4:47 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS008/apps/post-match-insights/match-notes/sna… 3/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Marketa
Vondrousova
Magdalena
Frech
Recent Tournament History
Making her tournament debut in Main Draw
Singles
Making her tournament debut in Main Draw
Singles
5/21/24, 4:47 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS008/apps/post-match-insights/match-notes/sna… 4/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Marketa
Vondrousova
Magdalena
Frech
Season 2024 History
Defeated seed No.2 A. Sabalenka, then fell in SF
at Stuttgart (l. Kostyuk)
After reaching 3r at Indian Wells retired for
personal reasons prior to match against Kostyuk
Reached QF at Dubai (l. Cirstea)
Contested R16 at Doha (l. Pavlyuchenkova)
Fell in opening round at Australian Open (l.
Yastremska)
Started the season representing Czech Republic
at the 2024 United Cup, going 1-1 in singles play
(d. Danilovic) (l. Zheng)
Fell in opening round at WTA1000 Madrid (l.
Cristian)
Played 1r at Charleston (l. Stephens)
Contested 1r at Miami (l. Giorgi)
Fell in opening round at Indian Wells (l.
Bronzetti)
Played 1r at San Diego (l. Preston)
Made R16 at Dubai (l. Rybakina)
Fell in opening round at Doha (l. Azarenka)
Contested R16 at Australian Open (l. Gauff)
Made R16 at Hobart (l. eventual champion
Navarro)
Opened the 2024 season making 1r at Auckland
(l. Bouzkova)
VALUE WTA RANK MATCH STATS VALUE WTA RANK
55 38 Aces 37 58
62.9% 49 First serve % 66.5% 26
61.9% 58 First Serve points won % 59.4% 72
44.3% 56 Second serve points won % 45.0% 42
55.4% 61 Overall service points won % 54.6% 65
63.2% 62 Service games won % 60.7% 68
54.7% 52 Break points saved % 53.1% 66
41.0% 8 First serve return points won % 31.8% 88
55.6% 42 Second serve return points won % 57.9% 14
52.8% 7 Break points converted % 36.0% 87
42.0% 12 Return games won % 30.2% 71
46.7% 8 Return points won % 41.9% 68
Best win by ranking: No.2 vs Sabalenka in STUTTGART QF
Longest match: 2h 41m vs Cirstea in DUBAI QF
Shortest match: 1h 4m vs Pera in INDIAN WELLS 2r
Match points saved:
Most aces in a match: 9 vs Stearns in DUBAI 2r
Best win by ranking: No.17 vs Alexandrova in DUBAI 1r
Longest match: 3h 13m vs Saville in AUSTRALIAN OPEN 1r
Shortest match: 1h 3m vs Gauff in AUSTRALIAN OPEN 4r
Match points saved:
Most aces in a match: 3 vs Preston in SAN DIEGO 1r
3 vs Rybakina in DUBAI 3r
3 vs Martic in DUBAI 2r
5/21/24, 4:47 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS008/apps/post-match-insights/match-notes/sna… 5/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Marketa
Vondrousova
Magdalena
Frech
Titles & Grand Slams
SINGLES FINALS
Champion (2)
2023 - WIMBLEDON
2017 - BIEL
Runner-Up (4)
2021 - OLYMPICS
2019 - ROLAND GARROS, ISTANBUL, BUDAPEST
DOUBLES FINALS
Runner-Up (3)
2023 - BERLIN (w/Siniakova)
2022 - ADELAIDE 250 (w/Martincova)
2021 - ROME (w/Mladenovic)
AUSTRALIAN
OPEN
ROLAND
GARROS WIMBLEDON US OPEN
AUSTRALIAN
OPEN
ROLAND
GARROS WIMBLEDON US OPEN
1r 2024 4r
3r 2r WON QF 2023 2r 1r 2r
3r 2022 1r 1r 3r 1r
4r 4r 2r 2r 2021
1r 1r 2r 2020
2r RUP 1r 2019 1r
2r 1r 1r 4r 2018 1r 2r
2r 1r 1r 2017
5/21/24, 4:47 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS008/apps/post-match-insights/match-notes/sna… 6/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Marketa
Vondrousova
Magdalena
Frech
Career Milestones
Following injury issues in second half of 2022,
bounced back in 2023 for best-ever season,
winning debut Slam title at Wimbledon (d.
Jabeur in F - becoming the first unseeded
player in the open era to claim the Wimbledon
title), making Top 10 debut and qualifying for
first WTA Finals.
Best result of 2022 season was SF run at Dubai
(withdrew prior to match vs. w/right adductor
injury). Missed most of second half of the
season due to left wrist injury, returning in
October to play a few ITF Circuit events and
Billie Jean King Cup Finals
Finished 2021 with SF runs at Luxembourg,
Chicago [500] and Moscow
Won silver medal in singles at Olympics in Tokyo
(l. Bencic)
Opened 2021 campaign with SF at Yarra Valley
Classic before R16 showing at Australian Open
Highlights of 2020 include defeating No.6
Svitolina to reach SFs at Rome (l. Ka.Pliskova) as
well as a QF run to kick off the season at
Adelaide (l. No.1 Barty)
Enjoyed break-out season in 2019, reaching
three finals across the year and posting careerhigh ranking of No.14 on July 1, 2019
Finished R-Up at Budapest (l. Van Uytvanck) and
Istanbul (l. Martic) before reaching
championship match at Roland Garros (l. Barty);
did not drop a set en route to final in Paris
Ranked No.38, was joint-third lowest-ranked
woman to reach Roland Garros final, and aged
19, was first teenager to reach title match there
since Ivanovic in 2007
Posted first win of career over a Top 2 player in
2019, defeating No.2 Halep at Indian Wells and
then Rome
Forced to end 2019 season down early due to
left wrist injury - did not play again following 1r
exit at Wimbledon
In doubles, has reached SF at 2019 Australian
Open (w/Strycova) and QF at 2017 Wimbledon
(w/Bellis)
At 2018 US Open, became the first teenager to
reach the last 16 at Flushing Meadows since
2016 (Konjuh, QF - 18) and the youngest Czech
player to advance to this stage in New York
since 2005 (Vaidisova, R16 - 16)
Was the biggest ranking mover on tour in 2017,
moving from No.376 to No.67 (309 places)
Made WTA breakthrough by winning
International-level title at 2017 Biel/Bienne (d.
Kontaveit in F), in just her second WTA main
In 2023 reached back-to-back QF on grass at
Nottingham (l. Burrage) and Birmingham (l.
eventual champion Ostapenko); advanced to 3r
at Miami (l. Gracheva) and posted 2r efforts at
Indian Wells, Madrid, Rome, Guadalajara and
Hong Kong; at the Slams, best results were 2r at
Roland Garros (l. Rakhimova) and US Open (l.
Muchova); ended season on career-high ranking
of No.63 after winning a 100k ITF event in Spain
(d. Errani in F)
Highlight of 2022 season was 3r run at
Wimbledon - best career result at a major. Also
made 2r on nine occasions
Broke into Top 100 on October 18, 2021,
following run through qualifying to 2r at Indian
Wells
Advanced to 2r three more times last season
and won titles at WTA 125K Series event in
Concord and W60 Prague ITF Circuit event
Campaign in 2020 was highlighted by maiden
WTA QF, at Prague (as LL, l. eventual champion
Halep) - first back-to-back main draw wins at a
WTA event
Only other WTA main draw appearance in 2020
was 1r exit at Lyon (as qualifier, l. Tomova); also
won her fourth career singles title on ITF Circuit,
at $25K Bendigo-AUS and contested qualifying
at Australian Open, Dubai and Doha
Appeared in six WTA main draws in 2019, falling
1r at Dubai (l. Kasatkina), Charleston
(l.Buzarnescu), Lugano (l. Peterson), Nottingham
(l. Mladenovic), US Open (l. Siegemund) and
Guangzhou (l. Stojanovic)
In 2018, made 2r at Roland Garros (as qualifier,
l.Stephens), Rabat (l. Fett), Nottingham
(l.Jakupovic) and San Jose (l.Tomljanovic). Also
fell 1r at six other tour-level events, including
qualifying for Grand Slam debut at Australian
Open
Achieved career high singles ranking of No.115
after 2018 Roland Garros run (July 2, 2018)
Won two of her four ITF singles titles in 2017, at
$25k ITF/Leipzig-GER and $25k
ITF/Braunschweig-GER - both on clay
Played first WTA qualifying event at home
tournament in Katowice in 2013, falling to
Raluca. Made WTA main draw debut at Katowice
the following year (as wildcard, l. Meusburger in
1r)
5/21/24, 4:47 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS008/apps/post-match-insights/match-notes/sna… 7/8
draw. At No.233, was the lowest-ranked title
winner in 2017 and aged 17 years, 293 days was
the youngest since Konjuh (17 years, 169 days) at
2015 Nottingham
Advanced to 2r on tour-level debut at 2016
Prague - as wildcard
Made professional debut at 2014 $100k
ITF/Prague-CZE (d. Suk, l. Brengle in 2r); on ITF
Circuit, winner of seven singles and four doubles
titles
In juniors won doubles at Australian Open and
Roland Garros in 2015 (both w/Kolodziejova). In
singles, was semifinalist at both Roland Garros
and Wimbledon and rose to No.1 on ITF junior
rankings in 2015
Other Information
Coached by Jan Hernych
Lives and trains in Prague; moved to the city on
her own to train at 15 years old
Began playing tennis at 4 years old with her
father, David Voundrous, and by 10-years-old
she was practicing in Prague. Mother, Jindriska
Anderlova played volleyball in the top Czech
league
Married partner Stepan Simek in the summer of
2022
Favorite surface is clay because she grew up on
it, but believes her game is more suited for hard
courts
Chose tennis over soccer because she prefers
the individual nature of the sport
Tennis idol is Roger Federer
Has a Sphynx cat named Frankie
Describes herself as "quiet" and "calm"
Coached by Andrzej Kobierski
Started playing tennis aged six
5/21/24, 4:47 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS008/apps/post-match-insights/match-notes/sna… 8/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
43 Clara
Burel
FRANCE
Elina
(7) Svitolina
UKRAINE
17
2001-03-24 Date of Birth 1994-09-12
Paris, France Residence Monte Carlo, Monaco
Right-handed Plays Right-handed (two-handed backhand)
5' 9'' (1.76m) Height 5' 9" (1.74m)
43 Career-High Ranking 3
$2,073,819 Career Prize Money $23,366,478
$342,731 Season Prize Money $490,036
0 / 0 Singles Titles YTD / Career 0 / 17
10-14 (Round of 32: 2024 AUSTRALIAN
OPEN; 2023 US OPEN; 2022 US OPEN;
2020 ROLAND GARROS)
Grand Slam W-L (best) 89-40 (Semi-Finalist: 2023
WIMBLEDON; 2019 US OPEN,
WIMBLEDON)
1-0 / 6-3 (Semi-Finalist: 2023) YTD / Career STRASBOURG W-L
(best)
1-0 / 9-1 (Champion: 2023, 2020)
9-10 / 44-47 YTD / Career W-L 14-8 / 356-195
2-3 / 22-18 YTD / Career Clay W-L 4-3 / 81-41
4-5 / 14-17 YTD / Career 3-Set W-L 3-3 / 112-69
0-4 / 11-11 YTD / Career TB W-L 3-3 / 74-60
1-1 / 1-6 YTD / Career TOP 20 W-L 0-3 / 71-80
Quarter-Finalist: LINZ YTD Best Result Runner-Up: AUCKLAND
0
win
2
win
ma
2
tches
played
5/21/24, 5:57 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS011/apps/post-match-insights/match-notes/sna… 1/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Clara
Burel
Elina
Svitolina
Head To Head Record
YEAR TOURNAMENT SURFACE ROUND WINNER SCORE/ RESULT TIME
2023 STRASBOURG CLAY SF Elina Svitolina 4-6 7-5 6-3 2h 20m
2021 CHICAGO 250 HARD 1r Elina Svitolina 5-7 6-1 2-0 1h 26m
Ranking History
TOP RANK YEAR-END YEAR TOP RANK YEAR-END
44 - 2024 17 -
61 61 2023 24 25
74 135 2022 15 236
75 77 2021 4 15
232 235 2020 4 5
477 871 2019 3 6
605 612 2018 3 4
1062 - 2017 3 6
- - 2016 14 14
- - 2015 15 19
5/21/24, 5:57 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS011/apps/post-match-insights/match-notes/sna… 2/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Clara
Burel
Elina
Svitolina
Tournament History
CURRENT TOURNAMENT
1r: d. K. PLISKOVA (#51) 7-5 0-6 6-1 (1h 52m)
Total time on court: 1h 52m
PLAYER NOTES
Making her 4th appearance at Strasbourg, where
her career-best result was a semifinal showing
last year
Defeated former World No.1 Karolina Pliskova in
this week's opening round
Faces No.17 Elina Svitolina in 2r today in a
rematch of last year's semifinal, which Svitolina
won from a set down
Has posted one Top 20 win in her career,
upsetting No.5 Jessica Pegula at this year's
Australian Open
Owns 3-3 career record against players from
Ukraine (2-0 in 2024)
Both of her two WTA singles finals have come on
clay, at Lausanne in 2021 and 2023
French players went 2-2 in this week's opening
round (Burel and Ferro advanced, Cornet and
Parry lost)
The most recent French champion at Strasbourg
is Caroline Garcia in 2016
Is currently ranked a career-high No.43; this
time last year was ranked No.122
Her best results at last year's European clay
events were the Lausanne final, Strasbourg SF
and Palermo QF
So far this year, ranks inside the Top 10 on tour
in percentage of break points converted (51.7%)
and percentage of return games won (42.5%)
CURRENT TOURNAMENT
1r: d. D. PARRY (#61) 6-3 6-4 (1h 25m)
Total time on court: 1h 25m
PLAYER NOTES
Making 4th main-draw appearance at
Strasbourg, where she is the defending
champion and has an 9-1 win-loss record
Also won the Strasbourg title in 2020; her lone
Strasbourg loss was an opening-round defeat to
Flavia Pennetta in 2013
Defeated Diane Parry in this week's first round
to win her ninth straight match at the
tournament
Faces No.43 Clara Burel in 2r today in a rematch
of last year's semifinal, which Svitolina won
from a set down
Owns 18-9 career record against players from
France (1-0 in 2024 by beating Parry in the
previous round)
Six of her 17 career singles titles have come on
clay: 2015 Marrakech, 2017 Istanbul, 2017 Rome,
2018 Rome, 2020 Strasbourg and 2023
Strasbourg
One of 2 players from Ukraine in this week's
main draw (Kalinina also reached 2r)
Ukrainian women have won the Strasbourg title
in 3 of the last 5 years (also Yastremska in 2019)
Is currently ranked No.17; this time last year was
ranked No.508 after recently coming back from
maternity leave
During last year's European clay swing, fell 1r at
Madrid and Rome, but then won Strasbourg title
and made Roland Garros QF
5/21/24, 5:57 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS011/apps/post-match-insights/match-notes/sna… 3/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Clara
Burel
Elina
Svitolina
Recent Tournament History
2023 Result Rank: 122 Seed: -
SF L E. SVITOLINA (#508) 4-6 7-5 6-3
QF W B. PERA (#38) 6-2 3-6 6-4
2r W K. KANEPI (#76) 7-5 7-6(0)
1r W S. CIRSTEA (#31) 7-6(5) 7-5
2021 Result Rank: 146 Seed: -
2r L E. ALEXANDROVA (#33) 6-3 6-4
1r W V. GRACHEVA (#88) 6-3 6-1
2020 Result Rank: 415 Seed: -
2r L S. ZHANG (#40) 6-3 7-6(3)
1r W K. VOLODKO (#287) 3-6 6-1 6-4
2023 Result Rank: 508 Seed: -
F W A. BLINKOVA (#66) 6-2 6-3
SF W C. BUREL (#122) 4-6 7-5 6-3
QF W V. GRACHEVA (#44) 6-3 6-4
1r W L. CHIRICO (#242) 6-4 7-6(1)
2020 Result Rank: 5 Seed: 2
F W E. RYBAKINA (#18) 6-4 1-6 6-2
SF W A. SABALENKA (#12) 6-2 4-6 6-4
QF W J. TEICHMANN (#54) 6-4 6-3
2r W M. LINETTE (#36) 7-6(0) 7-5
2013 Result Rank: 89 Seed: -
1r L F. PENNETTA (#158) 6-4 6-2
5/21/24, 5:57 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS011/apps/post-match-insights/match-notes/sna… 4/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Clara
Burel
Elina
Svitolina
Season 2024 History
Fell in opening round at WTA 1000 Madrid (l.
Danilovic) and WTA 1000 Rome (l. Osaka)
Made WTA 125 QF at Saint Malo (l. Naef)
Played R16 at Rouen (l. Ruse)
Contested 1r at Miami (l. Wozniacki)
Reached 2r at WTA 1000 Indian Wells (l. Gauff)
As a qualifier, fell in opening round at Dubai (l.
Stephens)
Contested QF at Linz (l. Vekic)
Made 3r at Australian Open (l. Dodin)
Played 1r at Hobart (l. eventual champion,
Navarro)
Opened 2024 season making R16 at Brisbane (l.
Azarenka)
Reached R16 at WTA 1000 Rome (d. Errani and
Kalinskaya, l. Sabalenka after holding 3 match
points)
After a 1r bye, fell in 2r at WTA1000 Madrid (l.
Sorribes Tormo)
Contested R16 at Charleston (l. Mertens)
After 1r bye, fell in 2r at WTA 1000 Miami Open (l.
Osaka)
Made 3r at Indian Wells (l. Navarro)
Contested R16 at Dubai (l. Swiatek)
Made R16 at Australian Open, retiring during the
match with low back injury (l. Noskova)
Achieved R-Up in her opening tournament of
2024 at Auckland (l. Gauff in F), in her first
appearance since US Open 2023
VALUE WTA RANK MATCH STATS VALUE WTA RANK
49 45 Aces 62 29
55.4% 83 First serve % 61.6% 57
60.8% 65 First Serve points won % 64.9% 30
42.6% 74 Second serve points won % 46.4% 27
52.7% 84 Overall service points won % 57.8% 35
59.2% 73 Service games won % 69.1% 30
50.6% 79 Break points saved % 55.0% 49
40.4% 12 First serve return points won % 41.2% 7
57.3% 22 Second serve return points won % 54.6% 55
51.7% 8 Break points converted % 47.0% 28
42.5% 9 Return games won % 40.3% 19
46.5% 11 Return points won % 46.0% 16
Best win by ranking: No.5 vs Pegula in AUSTRALIAN OPEN 2r
Longest match: 2h 37m vs Danilovic in MADRID 1r
Shortest match: 1h 5m vs Krunic in AUSTRALIAN OPEN 1r
Match points saved:
Most aces in a match: 5 vs Wang in INDIAN WELLS 1r
5 vs Siniakova in LINZ 2r
Best win by ranking: No.26 vs Kalinskaya in ROME 3r
Longest match: 2h 49m vs Raducanu in AUCKLAND 2r
Shortest match: 59m vs Preston in AUSTRALIAN OPEN 1r
Match points saved:
Most aces in a match: 11 vs Raducanu in AUCKLAND 2r
5/21/24, 5:57 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS011/apps/post-match-insights/match-notes/sna… 5/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Clara
Burel
Elina
Svitolina
Titles & Grand Slams
SINGLES FINALS
Runner-Up (2)
2023 - LAUSANNE
2021 - LAUSANNE
SINGLES FINALS
Champion (17)
2023 - STRASBOURG
2021 - CHICAGO 250
2020 - STRASBOURG, MONTERREY
2018 - WTA FINALS, ROME, DUBAI, BRISBANE
2017 - TORONTO, ROME, ISTANBUL, DUBAI, TAIPEI
CITY
2016 - KUALA LUMPUR
2015 - MARRAKECH
2014 - BAKU
2013 - BAKU
Runner-Up (5)
2024 - AUCKLAND
2019 - WTA FINALS
2016 - ZHUHAI, NEW HAVEN
2015 - ZHUHAI
DOUBLES FINALS
Champion (2)
2015 - ISTANBUL (w/Saville)
2014 - ISTANBUL (w/Doi)
AUSTRALIAN
OPEN
ROLAND
GARROS WIMBLEDON US OPEN
AUSTRALIAN
OPEN
ROLAND
GARROS WIMBLEDON US OPEN
3r 2024 4r
2r 1r 3r 2023 QF SF 3r
1r 1r 1r 3r 2022 3r
1r 1r 2r 1r 2021 4r 3r 2r QF
3r 2020 3r QF
1r 2019 QF 3r SF SF
2018 QF 3r 1r 4r
2017 3r QF 4r 4r
2016 2r 4r 2r 3r
2015 3r QF 2r 3r
2014 3r 2r 1r 1r
2013 1r 2r 1r 2r
2012 1r
5/21/24, 5:57 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS011/apps/post-match-insights/match-notes/sna… 6/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Clara
Burel
Elina
Svitolina
Career Milestones
In 2023, finished R-Up at Lausanne for second
time in career (l. Cocciaretto); advanced to SF at
Strasbourg (l. Svitolina) and Monastir (l.
Mertens) and QF at Palermo (l. Sorribes Tormo);
reached 3r at US Open for second year in a row
(l. Sabalenka); ended season by capturing first
WTA 125 title at Angers (d. Paquet in F),
afterwards setting new ranking high of No.51
Highlight of 2022 season was run through
qualifying to 3r at US Open (l. Sabalenka)
Reached maiden WTA final at 2021 Lausanne (l.
Zidansek)
Also in 2021, advanced to QF at Lyon and made
2r three times (including at Wimbledon). Won
second and third ITF Circuit title of her career,
on home soil in France at $60k ITF/SaintGaudens and $25k ITF/Cherbourg-en-Cotentin
Made 3r at 2020 Roland Garros (as WC, d. Rus
and Juvan, l. Zhang); at 19 years and six months
old, was the youngest Frenchwoman to reach
the third round on home soil since an 18-yearold Cornet did so in 2008
Won first tour-level match during 2r showing at
2020 Strasbourg (as WC, d. Bondarenko, l.
Zhang)
Made Grand Slam main draw debut during 2019
season, falling 1r at Australian Open (as WC, l.
No.23 Suarez Navarro). Also in 2019 finished RUp at $15k ITF/Monastir-TUN
In May 2019 she underwent wrist surgery that
ended her season
In terms of ranking, best career win came over
No.67 Rus at 2020 Roland Garros
Highlight of 2018 season was R-Up finish at $25k
ITF/Clermont-Ferrand-FRA. Also contested
qualifying at Roland Garros
Owns one ITF Circuit singles title
Selected as an alternate in the French Fed Cup
team for the 2018 first round tie against Belgium
Made debut on tour with qualifying exit at $25k
ITF/Saint-Malo-FRA
Enjoyed a stellar junior career reaching two
Slam finals (Australian and US Opens in 2018),
winning a silver medal at the 2018 Youth
Olympics in Buenos Aires and rising to World
No.1 on October 29, 2018
Returned to the Tour in April 2023, following
birth of daughter Skaï. Won Strasbourg (d.
Blinkova) for a second time (also in 2020) before
achieving Grand Slam results of QF at Roland
Garros (l. Sabalenka) and SF at Wimbledon (l.
eventual champion Vondrousova)
2022 season reached 3r at Australian Open (l.
Azarenka) and QF at Monterrey (l. Osorio),
before going on maternity leave in spring
Highlight of 2021 was lifting 16th career title at
Chicago [250]. Also made SF at Miami, Stuttgart
and the Olympics (won bronze medal)
Won her 14th and 15th titles in 2020, firstly at
Monterrey (d. Bouzkova in F) and then
Strasbourg (d. Rybakina in F)
Contested her 30th consecutive major at 2020
Australian Open (streak broke by skipping 2020
US Open). Is a two-time semifinalist at Grand
Slam level, at 2019 Wimbledon (l. eventual
champion Halep) and 2019 US Open (l.
S.Williams). Became the first woman from
Ukraine to reach a major SF; on the men's,
Medvedev made that stage at Roland Garros in
1993 (SF) and 1999 (R-Up)
Highlight of 2019 was reaching the title match
as defending champion at the Shiseido WTA
Finals (l. Barty)
In 2018, won 13th - and most prestigious -
career title at 2018 WTA Finals (d. Stephens in
F), after going 3-0 during round robin stage.
Ended year ranked No.4. Also won titles at Rome
(as defending champion, d. No.1 Halep in F),
Dubai (as defending champion, d. Kasatkina in F)
and Brisbane (d. Sasnovich in F)
Enjoyed standout 2017, finishing year at No.6,
winning a tour-leading five titles and posting
second-most wins (53, behind Wozniacki with
60). Season culminated by qualifying for WTA
Finals in Singapore, becoming first Ukrainian
woman to qualify for the season-ending
tournament in singles (fell at round robin stage
with 1-2 record)
In 2017, became first player to win three Premier
5 titles in a single season (Dubai, Rome,
Toronto), since such tournaments were
introduced in 2009
One of five players to make Top 10 debut in 2017,
after winning Dubai in February (also Ostapenko,
Garcia, Mladenovic and Vandeweghe). Peaked in
rankings at No.3 on September 11, 2017
On four occasions could have reached World
No.1 - at 2017 US Open, then needed to win 2017
Beijing (fell QF), then needed to triumph at 2017
5/21/24, 5:57 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS011/apps/post-match-insights/match-notes/sna… 7/8
WTA Finals (fell in group stage), or reach final at
2018 Australian Open (fell in QF)
End to 2016 season also saw her reach first SF
at Premier Mandatory level at Beijing (l.
A.Radwanska) Qualified for 2016 WTA Elite
Trophy Zhuhai for the second time (l. Kvitova in
F)
Reached three finals in 2016, winning Kuala
Lumpur (d. Bouchard in F) and R-Up at New
Haven (l. A.Radwanska) and Zhuhai (l. Kvitova)
Other 2016 season highlight was QF at Rio
Olympics
Owns two career doubles titles: 2014 Istanbul
(w/Doi) and 2015 Istanbul (w/Gavrilova)
Made WTA main draw debut at 2012 Baku (lost
in 1r but went on to win title there in both 2013
and 2014)
Ukrainian Fed Cup Team, 2012-15, 2017, 2020
Played first ITF Circuit events of career in 2008
Junior highlights include winning 2010 Roland
Garros girls' title at age 15 (d. Jabeur in F)
Other Information
Currently coached by Victor Prezelin; Started
working with previous coach Alexia Dechaume in
summer of 2019; also works with Thierry
Champion
Mother is Stephanie, father is Vincent and
sisters are Lola and Jade
Started playing tennis aged six; favorite surface
is hard and favorite shot is forehand
Away from the court likes listening to all types
music, spending time with family and friends
Coached by Raemon Sluiter
Parents are Mykhaylo and Olena; brother is
Yulian. Introduced to tennis at age 5 by family
Married to ATP tennis player Gaël Monfils on
July 16, 2021. Daughter Skaï Monfils was born on
October 15, 2022
Tennis idol growing up was Andre Agassi
Speaks English, Russian and French
Hobbies are learning about business and
economics, studies nutrition
Extremely passionate about her foundation,
created in 2019, and spends a lot of time
continuing to expand the programming of the
Elina Svitolina Foundation
Enjoys cooking, reading and hiking. Favorite food
is Mom's and Grandma's Ukrainian dishes
People most admire are Kobe Bryant and Nik
Vujicic; Favorite artists are Eminem, AC/DC and
Okean Elzy
5/21/24, 5:57 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS011/apps/post-match-insights/match-notes/sna… 8/8
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
12 Danielle
Collins (3)
UNITED STATES OF
AMERICA
Katerina
Siniakova
CZECH REPUBLIC
34
1993-12-13 Date of Birth 1996-05-10
St. Petersburg, FL, USA Residence Hradec Kralove, Czech Republic
Right-handed Plays Right-handed (two-handed backhand)
5' 10" (1.78m) Height 5' 9" (1.74m)
7 Career-High Ranking 31
$8,515,121 Career Prize Money $11,073,312
$1,813,248 Season Prize Money $658,342
2 / 4 Singles Titles YTD / Career 0 / 5
35-25 (Runner-Up: 2022 AUSTRALIAN
OPEN)
Grand Slam W-L (best) 26-37 (Round of 16: 2019 ROLAND
GARROS)
0-0 / 1-1 (Round of 16: 2018) YTD / Career STRASBOURG W-L
(best)
1-0 / 3-1 (Quarter-Finalist: 2020)
28-9 / 150-98 YTD / Career W-L 10-11 / 178-196
12-2 / 38-21 YTD / Career Clay W-L 2-2 / 56-45
7-4 / 43-40 YTD / Career 3-Set W-L 1-7 / 67-75
4-1 / 33-22 YTD / Career TB W-L 1-1 / 46-37
6-5 / 32-44 YTD / Career TOP 20 W-L 1-2 / 21-58
Champion: CHARLESTON, MIAMI YTD Best Result Round of 16: SAN DIEGO, DOHA, LINZ,
ADELAIDE, STRASBOURG
2
win
1
win
ma
3
tches
played
5/21/24, 6:00 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS010/apps/post-match-insights/match-notes/sna… 1/9
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Danielle
Collins
Katerina
Siniakova
Head To Head Record
YEAR TOURNAMENT SURFACE ROUND WINNER SCORE/ RESULT TIME
2024 DOHA HARD 3r Danielle Collins 6-4 6-3 1h 42m
2023 BILLIE JEAN KING CUP HARD Danielle Collins 6-3 6-2 0m
2019 TORONTO HARD 1r Katerina Siniakova 4-6 7-6(3) 6-2 2h 38m
Ranking History
TOP RANK YEAR-END YEAR TOP RANK YEAR-END
15 - 2024 36 -
11 55 2023 32 45
7 14 2022 44 47
25 29 2021 49 49
25 45 2020 53 64
23 31 2019 31 58
35 36 2018 31 31
153 167 2017 36 49
299 299 2016 49 49
903 - 2015 65 108
5/21/24, 6:00 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS010/apps/post-match-insights/match-notes/sna… 2/9
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Danielle
Collins
Katerina
Siniakova
Tournament History
CURRENT TOURNAMENT
Total time on court: 0m
PLAYER NOTES
Making 2nd appearance at Strasbourg, where
her previous result was reaching 2r in 2018
After 1r bye this week, faces No.34 Katerina
Siniakova in 2r today; owns 62 wins in career
over Top 50 players
Owns 6-9 career record against players from
Czech Republic (2-0 in 2024, including a win
over Siniakova at Doha)
Two of her four career WTA singles titles have
come on clay: 2021 Palermo and 2024
Charleston
One of four Americans in this week's main draw
(No.4 seed Keys and Navarro also in 2r;
Stephens lost 1r)
Is currently ranked No.12; this time last year was
ranked No.45
Posted a 15-match winning streak earlier this
season, including titles at WTA 1000 Miami and
WTA 500 Charleston
Has won 19 of her last 21 matches; only two
losses in that stretch are both to Sabalenka in
Madrid R16 and Rome SF
Has won 28 matches so far in 2024, trailing only
Iga Swiatek (36) and Elena Rybakina (30) in most
match-wins this year
So far this year, ranks No.2 on tour in
percentage of second-serve return points won
(60.8%)
CURRENT TOURNAMENT
1r: d. Y. PUTINTSEVA (#37) 6-0 7-5 (1h 29m)
Total time on court: 1h 29m
PLAYER NOTES
Making 2nd appearance at Strasbourg, where
her previous result was reaching QF in 2020
Defeated Yulia Putintseva so far this week for
her seventh win in her last eight matches at
WTA 125-level and above
Faces No.12 Danielle Collins in 2r today; owns 20
wins in career over Top 20 players, most
recently No.3 Coco Gauff at 2024 Doha
Owns 21-22 career record against players from
the United States (1-4 in 2024)
One of her five WTA singles titles has come on
clay (2017 Bastad)
One of 2 players from Czech Republic to reach
this week's 2r (No.1 seed Vondrousova had 1r
bye; Pliskova and Krejcikova lost 1r)
The last Czech woman to win the Strasbourg
title was Barbora Krejcikova in 2021
Is currently ranked No.34; this time last year
was ranked No.47
So far this year, ranks No.6 on tour in
percentage of second-serve return points won
(59.8%)
5/21/24, 6:00 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS010/apps/post-match-insights/match-notes/sna… 3/9
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Danielle
Collins
Katerina
Siniakova
Recent Tournament History
2018 Result Rank: 44 Seed: 7
2r L Q. WANG (#91) 4-6 7-5 6-2
1r W A. HESSE (#199) 6-1 4-6 6-3
2020 Result Rank: 62 Seed: -
QF L A. SABALENKA (#12) 2-6 6-3 6-3
2r W E. ALEXANDROVA (#31) 6-2 6-4
1r W B. PERA (#61) 4-6 7-6(3) 6-1
5/21/24, 6:00 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS010/apps/post-match-insights/match-notes/sna… 4/9
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Danielle
Collins
Katerina
Siniakova
Season 2024 History
Reached Rome SF before losing to Sabalenka at
second straight event
Got her career-best winning streak up to 15
straight before falling to Sabalenka in Madrid
R16
Won back-to-back titles at Miami (d. Rybakina
in F) and Charleston (d. Kasatkina in F) for her
third and fourth career singles titles
Contested 2r at WTA 1000 Indian Wells (l.
eventual champion, Swiatek)
Retired during QF against Wang Xiyu at Austin
with low back injury
As a qualifier, made QF at Doha (l.
Pavlyuchenkova)
As a qualifier, reached R16 at Abu Dhabi (l.
Rybakina)
Played 2r at Australian Open (l. Swiatek)
Played 1r at Hobart (l. eventual R-Up Mertens)
Opened the 2024 season making 2r at Brisbane
(l. Zhu)
Lost in Rome 2r (l. Mertens)
Won first WTA 125 title at Lleida (d. Sherif in
final)
Fell in opening round at WTA1000 Madrid (l.
Podoroska)
Retired during 2r match at Miami against Zheng
(injury)
Played 2r at Indian Wells (l. Svitolina)
Contested R16 at San Diego (l. Navarro)
Fell in opening round at Dubai (l. Navarro)
Made 3r at Doha (l. Collins)
Contested 2r at Linz (l. Burel)
Reached 2r at Australian Open (l. Golubic)
As a qualifier, made 2r at Adelaide (l.
Pavlyuchenkova)
Opened 2024 season playing 1r at Brisbane (l.
Stephens)
VALUE WTA RANK MATCH STATS VALUE WTA RANK
143 6 Aces 35 59
56.9% 79 First serve % 62.0% 54
70.4% 10 First Serve points won % 60.7% 64
47.1% 25 Second serve points won % 43.7% 65
60.4% 8 Overall service points won % 54.2% 66
74.4% 8 Service games won % 58.8% 67
62.2% 11 Break points saved % 47.8% 86
36.9% 39 First serve return points won % 38.7% 21
60.8% 2 Second serve return points won % 59.8% 6
50.7% 12 Break points converted % 49.5% 15
40.8% 11 Return games won % 39.9% 18
45.6% 23 Return points won % 46.6% 9
Best win by ranking: No.4 vs Rybakina in MIAMI F
Longest match: 3h 14m vs Swiatek in AUSTRALIAN OPEN 2r
Shortest match: 36m vs Wang in AUSTIN QF
Match points saved:
Most aces in a match: 12 vs Pera in MIAMI 1r
Best win by ranking: No.3 vs Gauff in DOHA 2r
Longest match: 2h 40m vs Navarro in DUBAI 1r
Shortest match: 1h 12m vs Pliskova in ADELAIDE 1r
Match points saved:
Most aces in a match: 6 vs Minnen in INDIAN WELLS 1r
5/21/24, 6:00 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS010/apps/post-match-insights/match-notes/sna… 5/9
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Danielle
Collins
Katerina
Siniakova
Titles
SINGLES FINALS
Champion (4)
2024 - CHARLESTON, MIAMI
2021 - SAN JOSE, PALERMO
Runner-Up (1)
2022 - AUSTRALIAN OPEN
DOUBLES FINALS
Champion (1)
2023 - CHARLESTON (w/Krawczyk)
Runner-Up (1)
2023 - SAN DIEGO (w/Vandeweghe)
SINGLES FINALS
Champion (5)
2023 - NANCHANG, BAD HOMBURG
2022 - PORTOROZ
2017 - BASTAD, SHENZHEN
Runner-Up (5)
2023 - HONG KONG
2021 - BAD HOMBURG
2018 - SHENZHEN
2016 - TOKYO INTERNATIONAL, BASTAD
DOUBLES FINALS
Champion (24)
2024 - DUBAI (w/Hunter)
2023 - SAN DIEGO (w/Krejcikova), INDIAN WELLS
(w/Krejcikova), AUSTRALIAN OPEN (w/Krejcikova)
2022 - MONASTIR (w/Mladenovic), US OPEN
(w/Krejcikova), WIMBLEDON (w/Krejcikova),
BERLIN (w/Hunter), AUSTRALIAN OPEN
(w/Krejcikova), MELBOURNE 250 #2 (w/Pera)
2021 - WTA FINALS (w/Krejcikova), MOSCOW
(w/Ostapenko), OLYMPICS (w/Krejcikova),
ROLAND-GARROS (w/Krejcikova), MADRID
(w/Krejcikova), MELBOURNE 500 GIPPSLAND
TROPHY (w/Krejcikova)
2020 - SHENZHEN (w/Krejcikova)
2019 - LINZ (w/Krejcikova), TORONTO
(w/Krejcikova), SYDNEY (w/Krunic)
2018 - WIMBLEDON (w/Krejcikova), ROLAND
GARROS (w/Krejcikova)
2015 - PRAGUE (w/Bencic)
2014 - TASHKENT (w/Krunic)
Runner-Up (17)
2024 - INDIAN WELLS (w/Hunter)
2023 - BERLIN (w/Vondrousova), ADELAIDE #1
(w/Hunter)
2022 - WTA FINALS (w/Krejcikova)
2021 - AUSTRALIAN OPEN (w/Krejcikova)
2020 - LINZ (w/Hradecka)
2019 - INDIAN WELLS (w/Krejcikova)
2018 - WTA FINALS (w/Krejcikova), MIAMI
(w/Krejcikova), SHENZHEN (w/Krejcikova)
2017 - US OPEN (w/Hradecka), PRAGUE
(w/Hradecka), CHARLESTON (w/Hradecka), INDIAN
WELLS (w/Hradecka), TAIPEI CITY (w/Hradecka)
2015 - TASHKENT (w/Dushevina)
2014 - STANFORD (w/Kania-chodun)
5/21/24, 6:00 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS010/apps/post-match-insights/match-notes/sna… 6/9
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Danielle
Collins
Katerina
Siniakova
Grand Slams
AUSTRALIAN
OPEN
ROLAND
GARROS WIMBLEDON US OPEN
AUSTRALIAN
OPEN
ROLAND
GARROS WIMBLEDON US OPEN
2r 2024 2r
3r 1r 2r 2r 2023 1r 1r 2r 1r
RUP 2r 1r 4r 2022 1r 2r 1r 2r
2r 3r 2r 3r 2021 1r 3r 3r 2r
2r QF 1r 2020 1r 3r 1r
SF 2r 3r 2r 2019 1r 4r 2r 1r
1r 1r 1r 2018 2r 3r 3r 3r
2017 1r 1r 1r 1r
1r 2016 1r 1r 3r 2r
2015 2r 1r 1r 1r
1r 2014 1r
5/21/24, 6:00 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS010/apps/post-match-insights/match-notes/sna… 7/9
MATCH NOTES
INTERNATIONAUX DE STRASBOURG -
STRASBOURG, FRA
2024-05-19 - 2024-05-25 | $ 802,237
Danielle
Collins
Katerina
Siniakova
Career Milestones
2023 season highlighted by SF runs at both
Austin (l. eventual champion Kostyuk) and San
Diego (l. eventual champion Krejcikova); also
qualified at reached QF at Montreal (l. Swiatek).
Made Top-10 debut on January 31, 2022,
following run to final at Australian Open (l.
Barty)
Other highlights last season were SF at San
Diego (l. Vekic) and QF at Miami (l. Osaka)
Closed out 2021 campaign with QF at Chicago
[500] (l. Vondrousova), 3r at Indian Wells (l.
Jabeur) and SF at Linz (l. eventual champion
Riske). Posted first Top-30 year-end finish at
No.29
Extended winning streak to 12 matches with
title run at San Jose (d. Kastkina in F) and then
3r showing at Montreal
Produced impressive second half of 2022, which
started with QF showing at Hamburg (l. eventual
champion Ruse), SF at Budapest (l. Kalinina via
ret. w/right elbow injury) and then maiden WTA
title at Palermo (d. Ruse in F)
Made QF at 2020 Roland Garros for first time
upsetting No.15 Muguruza and No.35 Jabeur en
route (l. eventual R-Up Kenin)
Began 2020 with SF at Adelaide (l. eventual
champion Barty) and QF at Brisbane (l. Keys) -
scored third and fourth career Top 10 wins over
No.5 Svitolina (Brisbane) and No.7 Bencic
(Adelaide)
Produced Grand Slam breakthrough at 2019
Australian Open, advancing to SF (l. Kvitova);
had never won a major match in five previous
Grand Slam appearances
Scored first Top 5 win of her career against No.2
Kerber in R16 at 2019 Australian Open
Rose to career-high No.23 following Melbourne
run (January 28, 2019)
Posted five Top 20 wins in 2019, over No.13
Goerges, No.19 Garcia and No.2 Kerber (all at
Australian Open), No.12 Wozniacki (Rome) and
No.12 Sevastova (Wimbledon)
Season highlight in 2018 was at Miami where
she became first qualifier to reach SF (l.
Ostapenko), scoring first Top 10 win over No.8
V.Williams en route. Earned USD$327,965 by
reaching the last four in Miami, more than
doubling her career earnings at the time
Posted first tour-level wins during R16 run at
2018 Indian Wells (l. Suárez Navarro), including
first Top 50 win over No.15 Keys in 2r
Won first title at WTA125K event in Newport
Beach in 2018 (d. Zhuk in F)
In 2023, won fourth and fifth WTA career singles
titles at Bad Homburg (d. Bronzetti in F) and
Nanchang (d. Bouzkova in F). Also reached final
at Hong Kong (l. Fernandez) and advanced to SF
at Merida (l. eventual champion Giorgi).
In doubles in 2023 won titles at Australian
Open, Indian Wells and San Diego (all
w/Krejcikova). Also achieved R-Up at Adelaide 1
(w/Hunter) and Berlin (w/Vondrousova).
At 2022 Portoroz, lifted first WTA singles title in
over five years (d. Rybakina in F). Also made QF
at Hamburg (l. eventual champion Pera)
Finished her second consecutive season as WTA
Doubles World No.1 after winning six titles in
2022 (Melbourne Summer Set #2, Australian
Open, Berlin, Wimbledon, US Open, Monastir);
with her title at the US Open with partner
Krejcikova, completed the career Golden Slam
(winning all four Grand Slams and the Olympics)
in Doubles
Singles highlight in 2021 was R-Up finish at Bad
Homburg (l. Kerber) - her first singles final since
the start of 2018. Also made SF at Parma and
reached three further QFs
Finished 2021 as WTA Doubles World No.1 after
winning a Tour-leading five titles, including
Roland Garros and Olympics (both w/Krejcikova)
Reached two doubles finals in 2020, winning her
first event of the season (Shenzhen
w/Krejcikova) and finishing R-Up in the last
(Linz w/Hradecka); also reached SF at Australian
Open and Roland Garros (both w/Krejcikova)
Best singles results of 2020 were QF at
Strasbourg (l Sabalenka) and 3r run at Roland
Garros (l. Bertens)
Produced career-best Slam singles result with
R16 run at 2019 Roland Garros (d. No.1 Osaka in
3r, l. Keys)
Finished 2018 ranked No.1 in doubles after
winning first two Grand Slam trophies at Roland
Garros (d. Hozumi/ Ninomiya in F) and
Wimbledon (d. Melichar/Peschke in F) both
w/Krejcikova, the first pairing to complete the
Roland Garros-Wimbledon double since Kim
Clijsters and Ai Sugiyama in 2003; also became
the first team ever to win the girls' (2013) and
ladies' doubles title at SW19
Also R-Up w/Krejcikova at 2018 WTA Finals
Singapore (l. Babos/ Mladenovic)
Has three Top 5 career wins in singles - against
No.4 Halep at 2017 Shenzhen, No.4 Garcia at
Wuhan, and No.1 Osaka at 2019 Roland Garros
5/21/24, 6:00 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS010/apps/post-match-insights/match-notes/sna… 8/9
Fell 1r at WTA main draw debut at 2014 US Open
(l. Halep)
Owns four singles titles on ITF Circuit
Part of US Billie Jean King Cup team in 2019
Played collegiate tennis at the University of
Virginia (transferred from the University of
Florida after her freshman year) winning the
NCAA singles title twice in 2014 and 2016
Won both singles rubbers during Czech
Republic's 3-0 victory over USA in final of 2018
Billie Jean King Cup
Won two career singles titles in 2017, first at
Shenzhen (d. No.4 Halep in 2r, No.10 Konta in SF
- the first Top 10 wins of her career - and Riske
in F) and then Bastad (d. No.17 Sevastova in QF,
No.20 Garcia in SF and No.6 Wozniacki in F)
Reached doubles final at 2017 US Open
(w/Hradecka, l. Chan/Hingis)
Made Top 50 debut on October 24, 2016
In 2016, advanced to first two WTA finals of
career, at Bastad (as qualifier, l. Siegemund) and
Tokyo [Japan Open] (l. McHale)
Won back-to-back Grand Slam matches for the
first time during 3r showing at 2016 Wimbledon
(l. A.Radwanska)
Notched the first Top 20 win of her career by
upsetting No.14 Petkovic during QF run at 2015
Birmingham
Broke into Top 100 for the first time on October
20, 2014 following breakthrough SF run at
Moscow (as qualifier, l. eventual champion
Pavlyuchenkova)
Fell 1r on Grand Slam main draw debut at 2014
Australian Open (as qualifier, l. Diyas)
Made WTA main draw debut at 2013 Miami (l.
Muguruza)
Played first events of career on ITF Circuit in
2012
Ranked world No.2 in ITF junior rankings in
December 2012; won the girls' doubles titles at
Roland Garros, Wimbledon and US Open in 2013
Other Information
Working part time with Ben Maxwell
Played collegiate tennis at the University of
Virginia (transferred from the University of
Florida after her freshman year) winning the
NCAA singles title twice in 2014 and 2016
Parents are Walter and Cathy; older brother is
Joel
Started playing tennis at age 3; introduced to
the sport by her dad (who played recreationally
and used to coach her). Favorite surface is hard
Enjoys going to the beach, fishing and running.
Coached by Peter Huber. Also works with father,
Dmitri Siniakov (also a businessman), Formerly
coached by Evgeniia Maniukova
Mother's name is Hana Siniakova (accountant);
younger brother is Daniel
Mentored by WTA legend Helena Sukova, who is
now a sports psychologist
Started playing tennis at age 5. Favorite surface
is hardcourt; favorite tournament is Australian
Open
Favorite city is Paris
Tennis idol growing up was Maria Sharapova
Enjoys listening to music and reading, especially
detective books and sci-fi. Would like to meet
the singer Taylor Swift
5/21/24, 6:00 PM SAP Tennis Analytics 1.4.9
https://matchnotes.media.wta.zone/mediaportal/index.html#season/2024/events/0406/matches/LS010/apps/post-match-insights/match-notes/sna… 9/9`


async function init() {
   try {
      const resources = postTemplate;

      if (!resources || !Array.isArray(resources)) {
         throw new Error(`Resource not found.`);
      }

      consoleLogger("Resource found.");

      consoleLogger(`Script started for ${constant?.clientDomainName}.`);

      // const currentYear = new Date().getFullYear();

      // Getting pdf first link
      // const mediaNotes = await getPdfLinks(constant?.wtaNoteUri(currentYear)); // ["https://wtafiles.wtatennis.com/pdf/matchnotes/2024/709_3.pdf"] 

      let mediaNoteUrls = ["https://wtafiles.wtatennis.com/pdf/matchnotes/2024/903_7.pdf"]; // || mediaNotes?.links;
      const eventDetails = "Roland Garros  |  Paris, France  |  Grand Slam  |  May 26 - June 9";

      if (mediaNoteUrls.length <= 0) {
         return { message: `Sorry no media note urls available right now!` };
      }

      consoleLogger(`Found ${mediaNoteUrls.length} media note urls.`);

      // Basic wordpress authentication
      const token = constant?.restAuthToken;

      if (!token) {
         throw new Error(`Sorry! Auth token not found.`);
      }

      consoleLogger(`Found auth token successfully.`);

      let indexOfPdf = 1;
      let postCounter = 0;

      for (const mediaNoteUrl of mediaNoteUrls) {

         try {

            // Download pdf by link and extracted contents by Pdf parser.
            const pdfNoteUrl = mediaNoteUrl;

            consoleLogger(`Link-${indexOfPdf}. ${pdfNoteUrl}.`);

            const pdfTextContents = await downloadPDF(pdfNoteUrl);

            if (!pdfTextContents) {
               continue;
            }

            consoleLogger(`Successfully got PDF texts.`);

            // Extracting match details from pdf contents | basically it returns [Array];
            const contents = extractMatchInfo(pdfTextContents, eventDetails);

            if (!Array.isArray(contents) || contents.length === 0) {
               continue;
            }

            consoleLogger(`Pdf downloaded and extracted contents successfully.`);

            for (const content of contents) {
               const playerOne = content?.player1;
               const playerTwo = content?.player2;
               const player1slug = content?.player1slug;
               const player2slug = content?.player2slug;
               const text = content?.content;
               const eventName = content?.eventName;
               const eventDate = content?.eventDate;
               const eventDay = content?.eventDay;
               const eventAddress = content?.eventAddress;
               const eventRound = content?.round || null;
               const eventHeadingTwo = content?.eventHeadingTwo;
               const leads = content?.leads;
               const playerOneSurname = getSurnameOfPlayer(playerOne);
               const playerTwoSurname = getSurnameOfPlayer(playerTwo);

               if (!playerOne || !playerTwo || !eventName) {
                  consoleLogger(`Some fields are missing.`);
                  continue;
               }

               try {
                  let playerOneMedia = {}, playerTwoMedia = {};

                  // playerOneMedia = await getMediaIdOfWP(constant.mediaUri(player1slug), token);
                  // playerTwoMedia = await getMediaIdOfWP(constant.mediaUri(player2slug), token);

                  if (!playerOneMedia?.mediaId) {
                     playerOneMedia = await getMediaIdOfWP(constant.mediaUri(`wta_generic${Math.floor(Math.random() * 6) + 1}`), token);
                  }

                  if (!playerTwoMedia?.mediaId) {
                     playerTwoMedia = await getMediaIdOfWP(constant.mediaUri(`wta_generic${Math.floor(Math.random() * 6) + 1}`), token);
                  }

                  const imageWrapperHtml = imgWrapper([playerOneMedia, playerTwoMedia], playerOneSurname, playerTwoSurname);

                  await Promise.all(resources.map(async (resource) => {
                     if (!resource?.categoryId || !resource?.category || !resource?.language) {
                        return;
                     }

                     const categoryId = resource?.categoryId;
                     const playerOneTag = resource?.tags?.replace("name", playerOne);
                     const playerTwoTag = resource?.tags?.replace("name", playerTwo);
                     const eventTag = eventName + " " + resource?.category;

                     try {
                        const [eventHeadingTwoTranslate, eventAddressTranslate, eventDayTranslate, eventDateTranslate] = await Promise.all([
                           translate(eventHeadingTwo, { from: 'en', to: resource?.languageCode }),
                           translate(eventAddress, { from: 'en', to: resource?.languageCode }),
                           translate(eventDay, { from: 'en', to: resource?.languageCode }),
                           translate(eventDate, { from: 'en', to: resource?.languageCode }),
                        ]);

                        const newTitle = resource?.title?.replace("eventName", eventName)
                           ?.replace("playerOne", playerOne)
                           ?.replace("playerTwo", playerTwo)
                           ?.replace("eventDate", eventDateTranslate);

                        const title = capitalizeFirstLetterOfEachWord(newTitle);
                        const slug = slugMaker(title);

                        const isUniquePost = await checkExistingPostOfWP(constant?.postExistUri(slug), token);

                        if (isUniquePost) {
                           consoleLogger(`Post already exist for ${slug}.`);
                           return;
                        }

                        consoleLogger(`Starting post for ${resource?.language}. Slug: ${slug}. ${eventDay}`);
                        consoleLogger("Tags generating...");

                        const tagIds = await getPostTagIdsOfWP(constant?.tagUri, [playerOneTag, playerTwoTag, eventTag], token);
                        consoleLogger(`Tags generated. Ids: ${tagIds}`);

                        await delay();
                        consoleLogger("Paraphrase starting...");
                        const paraphrasedBlog = await paraphraseContents(constant?.paraphrasedCommand(resource?.language, text));
                        consoleLogger("Paraphrased done.");

                        const htmlContent = resource?.contents(
                           eventName,
                           leads,
                           eventAddressTranslate,
                           playerOne,
                           playerTwo,
                           eventDateTranslate,
                           eventHeadingTwoTranslate,
                           eventRound,
                           eventDayTranslate,
                           paraphrasedBlog,
                           player1slug,
                           player2slug,
                           imageWrapperHtml);

                        consoleLogger(`Post creating...`);
                        await createPostOfWP(constant?.postUri, token, {
                           title,
                           slug,
                           content: htmlContent,
                           status: constant?.postStatus,
                           author: parseInt(constant?.authorId),
                           tags: tagIds,
                           featured_media: playerOneMedia?.mediaId || playerTwoMedia?.mediaId,
                           categories: [categoryId]
                        });
                        consoleLogger(`Post created successfully.`);

                        postCounter += 1;
                     } catch (error) {
                        consoleLogger(`Error In Resource Model: ${error?.message}.`);
                        await delay(1000);
                     }
                  }));
               } catch (error) {
                  consoleLogger(`Error In Contents Model: ${error?.message}.`);
                  await delay(1000);
                  continue;
               }
            }
            indexOfPdf++;
         } catch (error) {
            consoleLogger(`Error In mediaNoteUrl Model: ${error.message}.`);
            await delay(1000);
            continue;
         }
      }

      return { message: `${postCounter >= 1 ? `Total ${postCounter} posts created.` : "No posts have been created."} Operation done.` };
   } catch (error) {
      throw new Error(`Error In Init: ${error?.message}`);
   }
};

module.exports = init;