export default 
{
    Threat : {
        elementType: 'select', 
        label: 'Cyber Threat:',
        elementConfig: {
                options:[{value: 'Ransomware', displayValue: 'Ransomware'},
                        {value: 'ddos', displayValue: 'DDoS'}],
    },
    value: ''
    },

    BusinessSector : {
        elementType: 'select', 
        label: 'Business Sector:',
        elementConfig: {
                options:[{value: 'Healthcare', displayValue: 'Healthcare'},
                         {value: 'finance', displayValue: 'Fincance'}],
    },
    value: ''
    },
}