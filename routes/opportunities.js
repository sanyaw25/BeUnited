const express = require('express');
const router = express.Router();
const Opportunity = require('../models/oppmodel');

router.post('/', async (req, res) => {
  const opp = new Opportunity(req.body);
  await opp.save();
  res.json({ message: 'Opportunity posted!', opp });
});

router.get('/', async (req, res) => {
  const opps = await Opportunity.find();
  res.json(opps);
});

module.exports = router;
