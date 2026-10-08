CREATE TABLE IF NOT EXISTS devices (
  device TEXT PRIMARY KEY,
  endpoint TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  reminders TEXT NOT NULL DEFAULT '[]',
  sent TEXT NOT NULL DEFAULT '[]',
  updated INTEGER,
  next_due INTEGER -- prossimo promemoria da inviare; il cron legge solo le righe scadute
);
CREATE INDEX IF NOT EXISTS devices_next_due ON devices(next_due);

-- backup cifrato dei dati dell'app: id = hash del codice di backup, data = JSON cifrato lato client
CREATE TABLE IF NOT EXISTS backups (
  id TEXT PRIMARY KEY,
  rev INTEGER NOT NULL,
  data TEXT NOT NULL,
  updated INTEGER,
  seen INTEGER -- ultima lettura (al massimo una volta al giorno): la pulizia toglie i backup abbandonati
);

-- migrazione per un database creato prima di next_due (una volta sola):
--   ALTER TABLE devices ADD COLUMN next_due INTEGER;
--   CREATE INDEX IF NOT EXISTS devices_next_due ON devices(next_due);
--   UPDATE devices SET next_due=0;  -- il cron ricalcola il valore giusto al primo giro

-- migrazione per un database creato prima di seen (una volta sola):
--   ALTER TABLE backups ADD COLUMN seen INTEGER;
