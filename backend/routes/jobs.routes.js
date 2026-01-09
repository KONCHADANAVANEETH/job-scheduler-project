const express = require('express');
const router = express.Router();

const {
  createJob, getJobs, getJobById, runJob} = require('../controllers/jobs.controller');

router.post('/', createJob);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/run-job/:id', runJob);


module.exports = router;
