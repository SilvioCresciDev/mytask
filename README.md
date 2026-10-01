# MyTask

MyTask è un'agenda personale che unisce un calendario e delle board in stile kanban. Ogni cosa da fare è una **card**, e la stessa card compare in tutte le viste. Se le dai una data la trovi nel calendario e nella vista Oggi. Se la sposti in "Fatto" risulta completata ovunque.

È una web app installabile (PWA). Si apre dal browser, si installa sulla schermata Home come un'app normale e funziona anche senza connessione. Non serve nessuno store, non costa nulla e non chiede permessi oltre alle notifiche.

## Cosa fa

- **Oggi**: le cose di oggi in ordine di orario, quelle in ritardo in cima e un'anteprima dei prossimi 7 giorni.
- **Calendario**: vista mensile con tutte le card datate, comprese le ripetizioni future.
- **Board**: colonne "Da fare" e "Fatto" (puoi aggiungerne altre) in cui spostare le card trascinandole. Dal telefono tieni premuta la card, poi spostala. Avvicinandoti al bordo, le colonne scorrono da sole.
- **Inbox**: per annotare qualcosa al volo e smistarlo dopo in una board o dargli una data.
- **Card**: titolo, data e ora, promemoria, etichette, checklist e note.
- **Ripetizioni**: ogni giorno, ogni 2, 3, 4, 5 o 6 giorni, ogni settimana, ogni mese, oppure date sparse scelte toccando i giorni su un calendario. Quando completi una card che si ripete, passa da sola alla data successiva.
- **Promemoria**: notifiche Android con i pulsanti "Fatto" e "Rimanda di 1 ora".

## Privacy

I dati (card, board, promemoria) sono salvati **solo sul tuo dispositivo**. Ognuno parte da un'app vuota: né lo sviluppatore né altri utenti possono vedere quello che inserisci, e niente viene inviato a server esterni.

L'app può caricare solo i propri file e i caratteri da Google Fonts. Una regola di sicurezza (Content Security Policy) blocca qualsiasi altra connessione.

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

**Attenzione:** i dati sono salvati solo sul tuo dispositivo. Disinstallando l'app o cancellando i dati del browser si perdono.

## Limiti attuali

- **Promemoria**: li controlla l'app stessa. Arrivano puntuali se l'hai aperta di recente, ma se Android la chiude del tutto possono arrivare in ritardo o alla riapertura.
- **Nessuna sincronizzazione**: ogni dispositivo ha i suoi dati, quindi telefono e computer non si vedono tra loro, e non c'è un backup.
- **Nessuna sveglia vera**: un'app web non può far suonare una sveglia a telefono bloccato.

## Prossimi passi

- Sincronizzazione e backup su un servizio gratuito, con accesso tramite email.
- Notifiche push inviate da un server, puntuali anche ad app chiusa.
- In futuro, una versione Android nativa con vere sveglie.

## File del progetto

| File | A cosa serve |
|---|---|
| `index.html` | L'app: interfaccia, logica e stile |
| `sw.js` | Service worker: funzionamento offline e pulsanti delle notifiche |
| `manifest.webmanifest` | Nome, colori e icone per l'installazione |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | Icone dell'app |
| `badge-96.png` | Piccola icona nella barra delle notifiche |
