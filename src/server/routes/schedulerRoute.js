const express = require('express');
const schedulerController = require('../controllers/schedulerController');

const router = express.Router();

router.delete(
  '/scheduleJob',
  schedulerController.deleteSchedule,
  (req, res) => {
    return res.json({ result: 'Schedule successfully deleted ' });
  }
);

router.post('/scheduleJob', schedulerController.scheduleJob, (req, res) => {
  return res.json({ result: 'Schedule successfully created ' });
});

router.get('/scheduleJob', schedulerController.getScheduledJobs, (req, res) => {
  return res.json(res.locals);
});

module.exports = router;
