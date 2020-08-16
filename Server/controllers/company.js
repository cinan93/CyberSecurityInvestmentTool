const threat = require('../Database/models/threat');
const company = require('../Database/models/company');


module.exports = {

 async postfindThreat(req, res) {
    try {
         const {businessSector, threatName } = req.body; 
         const Company =  await company.find({businessSector: businessSector}); 
         const Threat =  await threat.findOne({companyId: Company, name: threatName}); 
        return res.json(Threat); 
            
       } 
         catch (error) {
            throw Error(`Error while searching for Threat :  ${err}`)
        }
}, 

async postAddAlpha(req, res) {
    try {
        //parameters sent from the Front-End
        var alphas = req.body.Weightvalues; 
        const threatid = req.body.threatId; 

        //Database query
        const Threat = await threat.findById(threatid); 
        
        var sumWeightValue = 0; 

        //Adding up all the weight values
        for(var i = 0; i < alphas.length; i++){
            sumWeightValue += parseFloat(alphas[i]); 
        } 

        //calculating the average weight value = alpha
        var alpha = (sumWeightValue/alphas.length).toFixed(2)

        var systemVulnerability = null; 

        /* checking if vulnerability of the system is LOW,MEDIUM or HIGH
        dependant on the calculated alpha */
        if (alpha > 0.15 && alpha < 0.41){
            Threat.systemVulnerability.map(result => {
                if (result.risk === 'LOW:') {
                    systemVulnerability = result; 
                }
            })
        }
        else if (alpha > 0.41 && alpha < 0.71){
            Threat.systemVulnerability.map(result => {
                if (result.risk === 'MEDIUM:') {
                    systemVulnerability = result; 
                }
            })
        }
        else {
            Threat.systemVulnerability.map(result => {
                if (result.risk === 'HIGH:') {
                    systemVulnerability = result; 
                }
            })
        }
        //sending the alpha and system vulnerability to the front-end
        return res.json({val: alpha, SystemVulnerability: systemVulnerability})

    } catch (error) {
        throw Error(`Error while sending alpha:  ${err}`)
    }
},

async getThreat(req, res){
    try {
        const threatid = req.params.ThreatId; 
        const Threat = await threat.findById(threatid); 
        var measures = []
        Threat.measures.map(result => measures.push({label: result.name, value: result._id})); 



        return res.json({threat: Threat, Measures: measures}); 

    } catch (error) {
      throw Error(`Error while sending WeightValues :  ${err}`)

    }
}, 

async postMeasureDescription(req, res){

     try {
         const threatId = req.body.ThreatId
         const measureId = req.body.MeasureId


         var Threat = await threat.findById(threatId); 

         const measure =  Threat.measures.find(element => element._id == measureId); 

         return res.json(measure.description)
         

     } catch (error) {
        throw Error(`Error while sending WeightValues :  ${err}`)

     }

},

async postCalcRosi(req, res){

    try {
        //Parameters sent from the front-end
        const threatId = req.body.ThreatId
        const measureId = req.body.MeasureId
        const budget = req.body.Budget 

        //Databse query
        var Threat = await threat.findById(threatId); 

        //Searching for the measure, user has chosen
        const measure =  Threat.measures.find(element => element._id == measureId); 

        const directCost = Threat.directCost.amount; 

        //Calculating the Return on Security Investment
        const ROSI =  (((directCost * (measure.riskMitigationFactor) - budget)/ budget) *100).toFixed(2) + '%'

        //Sending calculated Return on Security Investment to the Front-End
        return res.json(ROSI)
        
    } catch (error) {
        throw Error(`Error while sending ROSI :  ${err}`)
    }


}, 

async postCalcTotRosi(req, res){

    try {
        const threatId = req.body.ThreatId
        const budget = req.body.Budget
        const measureIds = req.body.MeasureIds

        var Threat = await threat.findById(threatId);
        const directCost = Threat.directCost.amount; 

        var Measures = [];
        var RiskMitigation = 0; 

        for (let i of measureIds){
         Measures.push(Threat.measures.find(element => element._id == i)); 
        }

        for(let i of Measures){
            RiskMitigation =  RiskMitigation + i.riskMitigationFactor
        }

        const ROSI =  (((directCost * RiskMitigation.toFixed(2) - budget)/ budget) *100).toFixed(2) + '%'
            
        return res.json(ROSI)
        
    } catch (error) {
        throw Error(`Error while sending ROSI :  ${err}`)
    }
}

}
