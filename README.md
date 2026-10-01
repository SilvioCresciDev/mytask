# MyTask

MyTask è un'agenda personale che unisce un calendario e delle board in stile kanban. Ogni cosa da fare è una **card**, e la stessa card compare in tutte le viste. Se le dai una data la trovi nel calendario e nella vista Oggi. Se la sposti in "Fatto" risulta completata ovunque.

È una web app installabile (PWA). Si apre dal browser, si installa sulla schermata Home come un'app normale e funziona anche senza connessione. Non serve nessuno store, non costa nulla e non chiede permessi oltre alle notifiche.

## Cosa fa

* **Oggi**: le cose di oggi in ordine di orario, quelle in ritardo in cima e un'anteprima dei prossimi 7 giorni.
* **Calendario**: vista mensile con tutte le card datate, comprese le ripetizioni future.
* **Board**: colonne "Da fare" e "Fatto" (puoi aggiungerne altre) in cui spostare le card trascinandole. Dal telefono tieni premuta la card, poi spostala. Avvicinandoti al bordo, le colonne scorrono da sole.
* **Inbox**: per annotare qualcosa al volo e smistarlo dopo in una board o dargli una data.
* **Card**: titolo, data e ora, promemoria, etichette, checklist e note.
* **Ripetizioni**: ogni giorno, ogni 2, 3, 4, 5 o 6 giorni, ogni settimana, ogni mese, oppure date sparse scelte toccando i giorni su un calendario. Quando completi una card che si ripete, passa da sola alla data successiva.
* **Promemoria**: notifiche Android con i pulsanti "Fatto" e "Rimanda di 1 ora".

## Privacy

I dati (card, board, promemoria) sono salvati **solo sul dispositivo** in cui usi l'app. Questo repository contiene solo il codice, uguale per tutti: chi apre il link trova un'app vuota e non vede i dati di nessun altro.

L'app può caricare solo i propri file e i caratteri da Google Fonts. Una regola di sicurezza (Content Security Policy) blocca qualsiasi altra connessione.

## Installazione

### 1\. Pubblicare l'app (una volta sola, dal computer)

1. Crea un account su [github.com](https://github.com) e attiva la verifica in due passaggi (*Settings › Password and authentication*).
2. Crea un repository pubblico chiamato `mytask` con **New repository**.
3. Carica i file con **Add file › Upload files**, trascinando i file della cartella (non lo zip), poi **Commit changes**.
4. Vai su **Settings › Pages**. In *Source* scegli *Deploy from a branch*, branch `main`, cartella `/ (root)`, e premi **Save**.
5. Dopo un paio di minuti l'app è online su `https://silviocrescidev.github.io/mytask/`.

### 2\. Installarla sul telefono Android

1. Apri l'indirizzo con **Chrome**.
2. Tocca il menu **⋮** e scegli **Installa app** (oppure *Aggiungi a schermata Home › Installa*).
3. Apri MyTask dall'icona e, nella schermata Oggi, tocca **Attiva notifiche**.

## Aggiornare l'app

Non serve reinstallare nulla.

1. Carica su GitHub i file modificati, con un push o con *Upload files*. Sostituiscono quelli vecchi.
2. Aspetta che la pubblicazione finisca: nella scheda **Actions** il pallino diventa verde.
3. Chiudi del tutto MyTask e riaprila: si aggiorna da sola.

I dati restano dove sono. L'icona sulla Home può impiegare qualche giorno ad aggiornarsi.

**Attenzione:** disinstallando l'app o cancellando i dati di Chrome si perdono le card salvate.

## Limiti attuali

* **Promemoria**: li controlla l'app stessa. Arrivano puntuali se l'hai aperta di recente, ma se Android la chiude del tutto possono arrivare in ritardo o alla riapertura.
* **Nessuna sincronizzazione**: ogni dispositivo ha i suoi dati e non c'è un backup.
* **Nessuna sveglia vera**: un'app web non può far suonare una sveglia a telefono bloccato.

## Prossimi passi

* Sincronizzazione e backup su un servizio gratuito, con accesso tramite email.
* Notifiche push inviate da un server, puntuali anche ad app chiusa.
* In futuro, una versione Android nativa con vere sveglie.

## File del progetto

|File|A cosa serve|
|-|-|
|`index.html`|L'app: interfaccia, logica e stile|
|`sw.js`|Service worker: funzionamento offline e pulsanti delle notifiche|
|`manifest.webmanifest`|Nome, colori e icone per l'installazione|
|`icon-192.png`, `icon-512.png`, `icon-maskable-512.png`|Icone dell'app|
|`badge-96.png`|Piccola icona nella barra delle notifiche|



