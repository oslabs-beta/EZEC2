const express = require('express');
const ec2Controller = require('../controllers/ec2Controller');

const router = express.Router();

router.post('/startInstance', ec2Controller.startInstance, (req, res) => {
  return res.status(200).json(res.locals);
});

router.post('/stopInstance', ec2Controller.stopInstance, (req, res) => {
  return res.status(200).json(res.locals.stopResponse);
});

router.get(
  '/getInstanceDetails',
  ec2Controller.getInstanceDetails,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

module.exports = router;
