const path = require('path');

const express = require('express');

const companyController = require('../controllers/company');


const router = express.Router();


// /company/chooseThreat and Business Sector => POST 
router.post('/chooseThreat', companyController.postfindThreat); 

router.post('/addAlpha', companyController.postAddAlpha); 

router.post('/measureDescription', companyController.postMeasureDescription); 

router.post('/calcRosi', companyController.postCalcRosi)

router.post('/calcTotRosi', companyController.postCalcTotRosi)

router.get('/:ThreatId', companyController.getThreat)



module.exports = router; 