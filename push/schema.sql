CREATE TABLE IF NOT EXISTS devices (
  device TEXT PRIMARY KEY,
  endpoint TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  reminders TEXT NOT NULL DEFAULT '[]',
  sent TEXT NOT NULL DEFAULT '[]',
  updated INTEGER
);
