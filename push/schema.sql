CREATE TABLE IF NOT EXISTS devices (
  device TEXT PRIMARY KEY,
  endpoint TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  reminders TEXT NOT NULL DEFAULT '[]',
  sent TEXT NOT NULL DEFAULT '[]',
  updated INTEGER
);

-- backup cifrato dei dati dell'app: id = hash del codice di backup, data = JSON cifrato lato client
CREATE TABLE IF NOT EXISTS backups (
  id TEXT PRIMARY KEY,
  rev INTEGER NOT NULL,
  data TEXT NOT NULL,
  updated INTEGER
);
