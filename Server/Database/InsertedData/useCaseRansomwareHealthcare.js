const Company = require('../models/company'); 
const Threat = require('../models/threat'); 

//Data for use case Ransomware in Healthcare which gets inserted to the database


const company1 = new Company({businessSector: 'Healthcare'}),


ransomware = new Threat({
    name: 'Ransomware', 

    measures: [{name: 'Regular data Back Up',
                description: 'Regular Back Ups are crucial and it is recommended to invest in a Back-Up system which backs up the system daily and include some offsite back ups',
                riskMitigationFactor: 0.17,
                indicator: [{ name: 'Last time data was backed up:', 
                              type: 'select',
                              subindicator: [{name: 'daily', value: 0},
                                            {name: 'weekly', value: 0.1},
                                            {name: 'monthly', value: 0.25},
                                            {name: '6 to 2 months ago', value: 0.5},
                                            {name: 'never', value: 1}
                                            ],
                                value: 1},
                            {name: 'Off-site back up available',
                            type:'select',
                            subindicator: [{name: 'Yes', value: 0.125},
                                           {name: 'No', value: 1}
                                          ],
                            value: 1 }
                            ]
                 },
                {name: 'Operation System Security',
                description: 'It is important that the Operation system always gets updated and that an Operation System is in Use which is secure. Recommended is for example Linux.',
                riskMitigationFactor: 0.14,
                indicator: [{ name: 'Type of Operation System:', 
                              type: 'select',
                              subindicator: [{name:'Windows or Android', value:1 },
                                            {name: 'Mac or iOS',value:0.75},
                                            {name: 'Linux',value: 0.5 },
                                            {name: 'others', value:0.25 }],
                              value: 1
                                        },
                            {name: 'Operation System is up-to-date:',
                            type: 'select',
                            subindicator: [{name: 'Yes', value:0.25 },
                                            {name: 'No', value:1 },
                                            ],
                            value: 1
                                        }]},
            {name: 'Access Control',
                description: 'It is recommended to give users instead of administrator privileges, restricted privileges such as read only, because if a user has administrater privilege he can give the ransomware by accident the privilage and the ransomware can be easy spread',
                riskMitigationFactor: 0.07,
                indicator: [{ name: 'Permission and privileges given to a user or app:', 
                              type: 'select',
                              subindicator: [{name: 'admin (all is given)', value: 1},
                                            {name: 'read and write', value: 0.75},
                                            {name: 'read only', value: 0.25}], 
                            value: 1}],
                                        },
            {name: 'Data Protection',
                description: ' To make it more difficult for ransomware to find important files, storing files in encrypted or encoded format is a way to hide the data. ',
                riskMitigationFactor: 0.16,
                indicator: [{name: 'Stored Data is encrypted:', 
                             type: 'select',
                             subindicator: [{name: 'Yes', value: 0.125},
                                             {name: 'No', value: 1}
                                            ],
                             value: 1},
                            {name: 'Extensions of files are encoded:',
                            type: 'select',
                            subindicator: [{name: 'Yes', value: 0.125},
                                           {name: 'No', value: 1},
                                            ], 
                            value: 1}]},
            {name: 'Disaster Recovery Plan',
                description: 'A disaster recovery plan is the last line of defense and includes updated back up of data, educated employees about the threat as well as systems ability to reboot and recover from the attack and the possibility to cut down the infected part of the system to get access back',
                riskMitigationFactor: 0.14,
                indicator: [{ name: 'Are employees/users aware of the issue:', 
                              type: 'select', 
                              subindicator: [{name: 'Yes', value: 0.25},
                                            {name: 'No', value: 1},
                                            ], 
                            value: 1},
                            {name: 'Ability to regain the system in case of an attack by rebooting the system and its nodes: ',
                            type: 'select',
                            subindicator: [{name: 'Yes', value: 0.25},
                                            {name: 'No', value: 1},
                                            ], 
                            value: 1}]},

            {name: 'Monitoring the network',
                description: 'Monitoring the network includes checking network traffic, controlling the content of the packets which are received and sent from and to a device additionally with monitoring API sequence calls for encrypt, delete or change of the original file or its extension',
                riskMitigationFactor: 0.14,
                indicator: [{ name: 'Encryption functions are accessed through admin privileges and monitored:', 
                              type: 'select',
                              subindicator: [{name: 'Yes', value: 0.25},
                                             {name: 'No', value: 1},
                                            ],
                            value: 1},
                            {name: 'API sequence calls for encrypting, deleting and or overwriting of files are being monitored: ',
                            type: 'select',
                            subindicator: [{name: 'Yes', value: 0.25},
                                           {name: 'No', value: 1},
                                            ], 
                            value: 1}]},
            {name: 'Cyber Insurance',
            description: 'Cyber Insurance covers a big part of the financial loss (assumed coverage rate here 90%), but does not mitigate the risk of an attack happening and the indirect costs of an attack can not be mitigated. It can be useful but it is still recommended to have a secure system first, in order to keep the premiums low!',
            riskMitigationFactor: 0.9}
            ],

    directCost: {amount: 120000, 
                 description: 'This are the estimated direct Cost, they include downtime Cost, recovery Cost and cost of data loss'},
        
    indirectCost: {
                description: 'The Indirect Cost of a Ransomware attack in Healthcare is HIGH, because of the confidential data, the life of patients which are at stake and the loss of reputation and confidence which is crucial for a Hospital', 
                risk : 'HIGH:'}, 

    systemVulnerability: [{risk: 'HIGH:',
                            description:'Your system is at HIGH risk of threat exposure, it is recommended to Invest in Cybersecurity measures and improve the System'},
                            {risk: 'MEDIUM:',
                             description: 'Your system is at MEDIUM risk of threat exposure, it is still recommendeded to invest in additional measures to bring the System to the next level'},
                            {risk: 'LOW:',
                             description: 'Your system is at LOW risk of threat exposure and well prepared, see below if there are still some measures to improve your System!'} ],

    businessRisks: [{description: 'Medical Malpractice'},
                    {description: 'Data Privacy and possible loss of data'},
                    {description: 'Cost and expense issues'},
                    {description: 'Loss of Reputation and Confidence'}],

     data :{
        labels: [
        'Transportation',
        'Public Sector',
        'Financial Services',
        'Food & Staples',
        'Materials',
        'Real estate',
        'Consumer Services',
        'Health Care',
        'Professional Services',
        'Software Services'
    ],
    datasets: [{
        data: [2.5, 3.4,3.4,4.5,6.8,10.2,12.5,13.6,18.2,20.5],
        backgroundColor:[
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#8f6347',
        '#3c3c47',
        '#ee82ee',
        '#3c9247',
        '#3c35e1',
        '#c76002',
        '#eaa161'
        ]
    }]
    },
    companyId: company1._id
}
)

module.exports = {company1, ransomware}; 
