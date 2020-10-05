//GENERELLA KRAV//
// 1. Din applikation ska vara objektorienterad. Du ska visa att du kan skapa lämpliga klasser. 
// Det kommer att vara högre fokus på det i denna uppgift än i gruppuppgiften, 
// eftersom ni kan börja att skriva era applikationer objektorienterat från början nu.
// 2. Quizet ska hålla reda på en spelare. Det ska hantera spelarens namn, spelarens poäng i den aktuella omgången.
// 3. Frågorna ska läsas in från https://quizapi.io/ som levererar ett resultat i JSON.

//KRAVEN FÖR GODKÄNT//
// 1. Spelet ska innehålla 10 frågor.
// 2. Man ska kunna välja flera svar. Ibland kan ett alternativ vara rätt, ibland flera.
// 3. När omgången är slut ska poängen visas och användaren ska få välja att starta ett nytt spel med nya frågor.
// 4. Skriv minst en klass som innehåller minst en metod och minst en egenskap.
// 5. Du får inte använda inline-css eller inline-event (t ex <p style="color:red" onlick="something();">)
// 6. Du ska använda minst en array-funktion.
// 7. Lämna in projektet som ett git-repo.

//KRAVEN FÖR VÄL GODKÄNT//
// 1. Allt som ingår för G-kraven.
// 2. Låt användaren bestämma hur många frågor som ska visas. (5-10)
// 3. Du ska visa att du kan skapa lämpliga klasser med lämpliga metoder och egenskaper. 
// 4. Du får inte använda globala variabler eller funktioner utanför klasser, förutom anonyma funktioner i event-lyssnare. (De behövs inte där heller, men du får.)
// 5. Du ska skriva en metod i en lämplig klass som heter correct (eller liknande) och som tar emot minst två parametrar:
// a) En HTML-collection som innehåller de svar användaren har kryssat i.
// b) En array, ett objekt eller liknande , som innehåller de korrekta svaren.
// 5 (forts). Metoden ska kontrollera om användaren har svarat rätt på frågan. 
// Om flera alternativ kan vara rätt måste användaren ha kryssat i alla korrekta alternativ för att den ska räknas som rätt.
// 6. Du ska visa en fråga i taget och låta användaren bläddra mellan dem. 
// Det kan t ex ske genom att byta ut elementen som innehåller frågan, eller elementens innehåll.
// 7. Visa vilken fråga användaren är på. (T ex 3 av 10.)
// 8. Du ska använda minst en lambda-funktion.
// 9. Du ska lämna in i tid, dvs om du får en restuppgift kommer du inte att kunna få VG, enbart IG/G.