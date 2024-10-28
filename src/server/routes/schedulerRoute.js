const express = require('express');
const schedulerController = require('../controllers/schedulerController');

const router = express.Router();

router.post('/scheduleJob', schedulerController.scheduleJob, (req, res) => {
  return res.json({ result: 'Job successfully scheduled ' });
});

router.get(
  '/getScheduledJobs',
  schedulerController.getScheduledJobs,
  (req, res) => {
    return res.json();
  }
);

module.exports = router;
