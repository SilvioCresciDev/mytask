# MyTask

MyTask è un'agenda personale che unisce un calendario e delle board in stile kanban. Ogni cosa da fare è una **card**, e la stessa card compare in tutte le viste. Se le dai una data la trovi nel calendario e nella vista Oggi. Se la sposti in "Fatto" risulta completata ovunque.

È una web app installabile (PWA). Si apre dal browser, si installa sulla schermata Home come un'app normale e funziona anche senza connessione. Non serve nessuno store, non costa nulla e non chiede permessi oltre alle notifiche.

## Cosa fa

- **Oggi**: le cose di oggi in ordine di orario, quelle in ritardo in cima e un'anteprima dei prossimi 7 giorni.
- **Calendario**: vista mensile con tutte le card datate, comprese le ripetizioni future.
- **Board**: colonne "Da fare" e "Fatto" (puoi aggiungerne altre; con l'ingranaggio rinomini board e colonne, cambi colore e ordine, elimini colonne o l'intera board, e le card finiscono nell'Inbox) in cui spostare le card trascinandole. Dal telefono tieni premuta la card, poi spostala. Avvicinandoti al bordo, le colonne scorrono da sole. Dopo 30 giorni le card in "Fatto" escono dalla board; con "Svuota" in cima alla colonna lo fai subito. Quelle con una data restano nel calendario come storico, le altre vengono eliminate.
- **Inbox**: per annotare qualcosa al volo e smistarlo dopo in una board o dargli una data.
- **Card**: titolo, data e ora, promemoria, etichette, checklist e note.
- **Ripetizioni**: ogni giorno, ogni 2, 3, 4, 5 o 6 giorni, ogni settimana, ogni mese, oppure date sparse scelte toccando i giorni su un calendario. Quando completi una card che si ripete, passa da sola alla data successiva; se era rimasta indietro di qualche giorno, salta direttamente a oggi. "Ogni mese" dal 31 cade l'ultimo giorno nei mesi più corti e torna al 31 appena può.
- **Backup e più dispositivi**: dalle Impostazioni attivi un backup cifrato con un codice di 20 caratteri; con lo stesso codice (o il link) colleghi altri dispositivi. Le modifiche si uniscono campo per campo: se cambi il titolo sul telefono e la checklist sul computer restano entrambe.
- **Board condivise**: dall'ingranaggio di una board scegli "Condividi questa board" e mandi il link o fai inquadrare il QR. Chi entra vede e modifica la board come te, e le sue card con data compaiono nel calendario, in Oggi e nei promemoria di tutti, insieme alle cose private. Le altre board restano private. Chi ha il link può fare tutto e non si può togliere l'accesso a una sola persona; uscendo, la board sparisce solo per te. Per entrare: apri il link, inquadra il QR, oppure "Entra con un codice" nella vista Board.
- **Esporta / importa**: dalle Impostazioni scarichi un file con tutte le card, board ed etichette, da conservare dove vuoi. Importandolo si unisce ai task presenti senza cancellare niente. Il file non è cifrato.
- **Promemoria**: notifiche Android con i pulsanti "Fatto" e "Rimanda di 1 ora". Per le card "tutto il giorno" il promemoria fa riferimento alle 9:00.

## Privacy

Card, board e note sono salvate sul tuo dispositivo. Ognuno parte da un'app vuota e altri utenti non possono vedere quello che inserisci.

Se attivi il **backup**, i dati vengono cifrati sul dispositivo (AES-GCM, con una chiave ricavata dal tuo codice) prima di partire: il server conserva solo testo illeggibile e senza il codice nessuno può leggerlo, nemmeno lo sviluppatore. Un backup che nessun dispositivo legge o scrive per oltre 400 giorni viene cancellato.

Per far arrivare i promemoria anche ad app chiusa, quando attivi le notifiche l'app invia a un piccolo server (un Worker Cloudflare dello sviluppatore) solo i promemoria futuri, al massimo i 300 più vicini: titolo della card, data e ora. Il server li usa solo per mandarti la notifica all'ora giusta. Le notifiche viaggiano cifrate fino al telefono.

L'app può collegarsi solo ai propri file e al server dei promemoria: anche i caratteri sono inclusi nell'app, quindi nessuna richiesta parte verso Google o altri siti. Una regola di sicurezza (Content Security Policy) blocca qualsiasi altra connessione e qualsiasi script non incluso nell'app.

## Installazione

L'app è già pubblicata, non devi scaricare né configurare niente.

**👉 Apri MyTask: https://silviocrescidev.github.io/mytask/**

### Android (consigliato)

1. Apri il link con **Chrome**.
2. Tocca il menu **⋮** e scegli **Installa app** (oppure *Aggiungi a schermata Home › Installa*).
3. Apri MyTask dall'icona sulla Home.
4. Nella schermata Oggi tocca **Attiva notifiche** e conferma.

### iPhone

1. Apri il link con **Safari**.
2. Tocca **Condividi** (il quadrato con la freccia) e poi **Aggiungi alla schermata Home**.
3. Apri MyTask dall'icona e attiva le notifiche (serve iOS 16.4 o successivo).

Su iPhone l'app funziona, ma i promemoria sono meno affidabili che su Android.

### Computer

Apri il link con Chrome o Edge e clicca l'icona di installazione nella barra degli indirizzi. Puoi anche usarla direttamente come sito.

## Aggiornamenti

Gli aggiornamenti arrivano da soli: quando esce una nuova versione, basta chiudere e riaprire MyTask con la connessione attiva. Card e promemoria restano dove sono.

**Attenzione:** senza backup i dati sono salvati solo sul tuo dispositivo, e disinstallando l'app o cancellando i dati del browser si perdono. Se la memoria del browser si riempie, l'app lo dice subito invece di perdere le modifiche in silenzio.

## Limiti attuali

- **Promemoria**: arrivano dal server anche ad app chiusa, con un ritardo massimo di circa un minuto. Il server conosce al massimo i 300 promemoria più vicini (fino a un anno avanti): se non bastano, l'ultimo è un avviso che chiede di aprire l'app, e all'apertura la lista si rinnova.
- **iPhone**: i promemoria sono meno affidabili che su Android, per come iOS gestisce le notifiche delle web app.
- **Nessuna sveglia vera**: un'app web non può far suonare una sveglia a telefono bloccato.
- **Sincronizzazione**: due modifiche allo stesso campo della stessa card fatte su due dispositivi prima di sincronizzare non si fondono: resta la più recente. L'ordine delle card nelle colonne non viene sincronizzato da solo, ma insieme alla prossima modifica.

## Prossimi passi

- In futuro, una versione Android nativa con vere sveglie.

## File del progetto

| File | A cosa serve |
|---|---|
| `index.html` | La pagina dell'app |
| `app.js` | Interfaccia, notifiche, backup |
| `logic.js` | Logica senza interfaccia (date, ripetizioni, unione tra dispositivi, migrazioni dei dati), provata dai test |
| `app.css` | Stile e temi |
| `theme.js` | Applica il tema scelto prima che la pagina compaia |
| `vendor/qrcode.js` | Libreria per il codice QR (qrcode-generator di Kazuhiko Arase, licenza MIT) |
| `fonts/` | Caratteri inclusi nell'app (licenza SIL OFL) |
| `sw.js` | Service worker: funzionamento offline e pulsanti delle notifiche |
| `manifest.webmanifest` | Nome, colori e icone per l'installazione |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | Icone dell'app |
| `badge-96.png` | Piccola icona nella barra delle notifiche |
| `push/` | Server dei promemoria (Cloudflare Worker + database D1) che invia le notifiche push |
| `tests/` | Test automatici (`npm test`, partono anche su GitHub a ogni push) |

## Sviluppo

Serve solo Node.js (versione 22 o successiva), senza dipendenze da installare.

- `npm test` esegue i test della logica, del server dei promemoria e dell'elenco dei file offline.
- `npm run check` controlla la sintassi di tutti gli script.
- Per provare l'app in locale basta un server statico sulla porta 8000 (è l'unica porta locale che il server dei promemoria accetta).

Il server dei promemoria (`push/`) si pubblica con `npx wrangler deploy` dalla cartella `push`. Limita le richieste per indirizzo IP, accetta solo gli indirizzi dei servizi push dei browser, rifiuta righe nuove oltre 5000 dispositivi o 5000 backup e ogni notte cancella quelli abbandonati da oltre 400 giorni.
