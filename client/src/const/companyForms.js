export default 
{
    Threat : {
        elementType: 'select', 
        label: 'Cyber Threat:',
        elementConfig: {
                options:[{value: 'Ransomware', displayValue: 'Ransomware'},
                        {value: 'ddos', displayValue: 'DDoS'},
                        {value: 'pfishing', displayValue: 'Pfishing'}],
    },
    value: ''
    },

    BusinessSector : {
        elementType: 'select', 
        label: 'Business Sector:',
        elementConfig: {
                options:[{value: 'Healthcare', displayValue: 'Healthcare'},
                         {value: 'finance', displayValue: 'Finance'},
                         {value: 'software services', displayValue: 'Software Services'},
                         {value: 'real estate', displayValue: 'Real estate'}],
    },
    value: ''
    },
}