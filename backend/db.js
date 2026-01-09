const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const dbPath = path.join(__dirname, 'jobs.db');


const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

const createJobsTableQuery = `
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    taskName TEXT NOT NULL,
    payload TEXT,
    priority TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    completedAt DATETIME
  )
`;

db.run(createJobsTableQuery, (err) => {
  if (err) {
    console.error('Error creating jobs table', err.message);
  } else {
    console.log('Jobs table ready');
  }
});


module.exports = db;
