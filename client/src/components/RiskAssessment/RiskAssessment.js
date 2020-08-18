import React from 'react'; 
import classes from './RiskAssessment.module.css'
import {Container,Col,Row} from 'reactstrap';


const RiskAssessment = (props) => {
    let attachedClass = null
        if(props.risk === 'HIGH:'){
            attachedClass = classes.riskRed; 
        }
        else if (props.risk ==='MEDIUM:'){
            attachedClass = classes.riskBlue; 
        }
        else attachedClass = classes.riskGreen; 

    let indirectCostClass = null
        if(props.indirectCost === 'HIGH:'){
            indirectCostClass = classes.riskRed; 
        }
        else if (props.indirectCost ==='MEDIUM:'){
            indirectCostClass = classes.riskBlue; 
        }
        else indirectCostClass = classes.riskGreen; 
        

        return <Container>

            <Row>
                <Col>
                   <div className = {classes.Col}>
                   <h4>
                     System Vulnerability
                    </h4>
                    <hr className ={classes.hr}/>
                    <p className= {attachedClass}>
                    {props.risk}
                    </p>
                    <p className= {classes.riskDescription}> 
                    {props.riskDescription}
                    </p>
                    <p className={classes.alpha}> 
                    Alpha = {props.weightValue}
                    </p>
                   </div>
                </Col>
                <Col >
                <div className={classes.Col}>
                   <h4>
                    Direct Cost
                    </h4>
                    <hr className ={classes.hr}/>
                    <div className={classes.directCostDescription}>
                        Description: 
                    </div>
                    <p className={classes.description}>{props.directCostDescription}</p>
                    <hr className={classes.hrDescription}/>
                    <div className={classes.amount}>
                        Amount ($): 
                    </div>
                    <p className={classes.amountNumber}>{props.directCostAmount}</p>
                   </div>
                </Col>
            </Row>
            <Row>
                <Col >
                <div className = {classes.Col}>
                   <h4>
                     Business Risks
                    </h4>
                    <hr className ={classes.hr}/>
                    <ul className={classes.businessRisks}>
                      {props.businessRisks.map(element => <li> {element.description} </li> )}
                    </ul>
                </div>
                </Col >
                <Col>
                <div className = {classes.Col}>
                   <h4>
                     Indirect Cost
                    </h4>
                    <hr className ={classes.hr}/>
                    <p className = {classes.riskRed}>
                        {props.indirectCost} 
                    </p>
                    <p className = {classes.riskDescriptionIndirectCost}>
                        {props.indirectCostDescription}
                    </p>

                </div>
                </Col>
            </Row>
        </Container>
}


export default RiskAssessment; 