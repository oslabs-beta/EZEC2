const express = require('express');
const schedulerController = require('../controllers/schedulerController');

const router = express.Router();

router.post('/scheduleJob', schedulerController.scheduleJob, (req, res) => {
  return res.json();
});


router.get(
  '/getScheduledJobs',
  schedulerController.getScheduledJobs,
  (req, res) => {
    return res.json();
  }
);

// router.post('/executeJob', schedulerController.executeJob, (req, res) => {
//   return res.json();
// });

module.exports = router;
