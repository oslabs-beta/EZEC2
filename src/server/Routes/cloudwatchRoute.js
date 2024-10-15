const express = require('express');
const cloudwatchController = require('../controllers/cloudwatchController');

const router = express.Router();

router.get(
  '/getUsageData/:instanceId',
  cloudwatchController.getUsageData,
  (req, res) => {
    return res.json(res.locals);
  }
);

module.exports = router;
