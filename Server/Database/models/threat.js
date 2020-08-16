var mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const threatSchema = new Schema({

    name: {
        type: String,
    },

    measures: [{
        name: {type: String},
        description:{type: String},
        riskMitigationFactor: {type: Number}, 
        indicator:[{
            name: {type: String},
            type: {type: String},
            subindicator: [{
                name : {type: String},
                value: {type: Number}
                }],
            value: {type: Number}
            }]
    }],

    directCost: {
        amount:{type: Number},
        description: {type: String}
    },
    
    indirectCost: {
        risk: {type: String}, 
        description: {type: String},
    },   
    
    systemVulnerability: [{
        risk: {type: String},
        description: {type: String}
    }],

    businessRisks: [{
       description: {type: String}
        }],

    data: {
        labels: [{type: String}],
        datasets: [{
            data: [{type: Number}],
            backgroundColor:[{type: String}]
        }], 
    },

    companyId: {type: Schema.Types.ObjectId,
                ref: 'Company'}

}); 

module.exports = mongoose.model('Threat', threatSchema); 

