require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');


const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.send('Job Scheduler Backend Running');
});

const jobRoutes = require('./routes/jobs.routes');
app.use('/jobs', jobRoutes);

// starting server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
