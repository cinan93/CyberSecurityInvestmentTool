import React, { Component } from 'react';
import {Card, CardContent} from "@material-ui/core";
import CardHeader from '../../views/CardHeader'; 
import Input from './InputCF'; 
import api from '../../services/api'; 
import classes from './Dashboard.module.css'; 
import Loader from '../../views/Loader'; 
import {Container,Col,Row} from 'reactstrap';
import styled from "styled-components";
import RiskAssessment from '../RiskAssessment/RiskAssessment'
import companyforms from '../../const/companyForms'
import InputSE from './InputSE'
import Measures from '../MitigationMeasures/Measures'
import Statistics from '../Statistics/Statistics';

 const EmptyListContainer = styled.div`
  text-align: center;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

class Company extends Component {

    constructor(){
        super(); 
        this.state = {
            CompanyForms: companyforms,
            ThreatId: null,
            ThreatName: undefined,
            SystemEvaluationForms: [], 
            directCost: {}, 
            businessRisks: [], 
            indirectCost: {}, 
            systemVulnerability: {}, 
            alpha: undefined, 
            measures: [],
            data: {},
            loading: false
            }
        }

   companyInputHandler = (event) => {
       event.preventDefault(); 
       this.setState({loading: true})
       const formData= {}; 
       let MeasureIndicators = []; 

       for (let formElementIdentifier in this.state.CompanyForms){
            formData[formElementIdentifier] = this.state.CompanyForms[formElementIdentifier].value; 
       }
       console.log(formData); 

       api.post('/company/chooseThreat', {
        businessSector: formData.BusinessSector,
        threatName: formData.Threat
       })
       .then(respond => { 
        respond.data.measures.map(result => MeasureIndicators.push(result.indicator))
        let Measuresflat = MeasureIndicators.reduce(function(accumulator,currentValue){
            return accumulator.concat(currentValue); 
        })
        this.setState({SystemEvaluationForms: Measuresflat ,
                        ThreatId: respond.data._id 
                        })
        
           setTimeout(() => {
            this.setState(
                {
                    ...this.state,
                    loading: false
                }
            );
        }, 900)
    } )
       .catch(error => console.log(error))
   }

   inputChangedHandlerCompany = (event, inputIdentifier) => {
       const updatedCompanyForms = {
           ...this.state.CompanyForms
       }
       const updatedFormElement = {
           ...updatedCompanyForms[inputIdentifier]
        };
        
        updatedFormElement.value = event.target.value; 
        updatedCompanyForms[inputIdentifier]= updatedFormElement; 
        this.setState({CompanyForms: updatedCompanyForms}); 
   }
   

   inputChangedHandlerSystemEvalutaion = (event, inputIdentifier) => {
        const updatedSystemEvaluationForms = [
            ...this.state.SystemEvaluationForms
        ]
        const updatedElement = {
            ...updatedSystemEvaluationForms[inputIdentifier]
        };
        
        updatedElement.value = event.target.value; 
        updatedSystemEvaluationForms[inputIdentifier]= updatedElement; 
        this.setState({SystemEvaluationForms: updatedSystemEvaluationForms}); 
     
}

    SystemEvaluationInputhandler = (event) => {
        event.preventDefault(); 
        const Weightvalues= []; 

        for (let formElementIdentifier in this.state.SystemEvaluationForms){
            Weightvalues[formElementIdentifier] = this.state.SystemEvaluationForms[formElementIdentifier].value; 
        }

        api.post('/company/addAlpha', {
            Weightvalues: Weightvalues,
            threatId: this.state.ThreatId
        })
        .then(response => {
            this.setState({alpha: response.data.val,
                           systemVulnerability: response.data.SystemVulnerability})})
        .catch(error => console.log(error));

        api.get(`/company/${this.state.ThreatId}`)
        .then(res => {
            console.log(res.data.threat);
            this.setState({directCost: res.data.threat.directCost, 
                            indirectCost: res.data.threat.indirectCost,
                            businessRisks: res.data.threat.businessRisks, 
                            measures: res.data.Measures,
                            data: res.data.threat.data,
                            ThreatName: res.data.threat.threatName
                             })
        }).catch(error=> console.log(error))
}

    render(){
        const formCompanyElementsArray = []; 
        for (let key in this.state.CompanyForms){
            formCompanyElementsArray.push({
                id:key, 
                config: this.state.CompanyForms[key]
            })
        }

        let formCompany = (
            <form onSubmit={this.companyInputHandler}>
                {formCompanyElementsArray.map(formElement => ( <Input label = {formElement.config.label}
                key={formElement.id}
                elementType = {formElement.config.elementType}
                elementConfig = {formElement.config.elementConfig}
                value = {formElement.config.value} 
                changed= {(event) => this.inputChangedHandlerCompany(event, formElement.id)}/> )) }
                <button className={classes.Button}> Submit </button>
            </form>
        )

        const formElementsArray = []; 
        for (let key in this.state.SystemEvaluationForms){
            formElementsArray.push({
                id:key, 
                config: this.state.SystemEvaluationForms[key]
            })
        }

        let formSystemEvaluation = (
            <form onSubmit={this.SystemEvaluationInputhandler}>
                {formElementsArray.map(formElement => ( <InputSE label = {formElement.config.name}
                key={formElement.id}
                elementType = {formElement.config.type}
                elementConfig = {formElement.config.subindicator}
                value = {formElement.config.value} 
                changed= {(event) => this.inputChangedHandlerSystemEvalutaion(event, formElement.id)}/> )) }
                <button className={classes.Button}> Submit </button>
            </form>
        )

        return (
        <Container fluid>
            <Row className={classes.row}>
              <Col xs="3" className={classes.col}>
                <Card style={{borderRadius: "10px 10px 10px 10px", marginBottom: 45}}>
                    <CardHeader title='Company' backgroundColor='linear-gradient(0deg, #26c6da, #00acc1)'/>
                    <CardContent>
                        {formCompany}
                    </CardContent>
                </Card>
                <Card style={{borderRadius: "10px 10px 10px 10px", marginBottom: 45}}>
                        <CardHeader title='System Evaluation' backgroundColor='linear-gradient(0deg, #ffa726, #fb8c00)'/>
                        {this.state.SystemEvaluationForms.length > 0 ? (
                        this.state.loading ? (
                            <Loader text = 'Loading...'/>
                        ): (
                            <CardContent>
                                {formSystemEvaluation}
                            </CardContent>
                        )
                        ): (
                    <EmptyListContainer>
                        <span> No forms avilable </span>
                    </EmptyListContainer>
                    )}
                    </Card>
              </Col>
              <Col xs="5" className={classes.col}>
                    <Card style={{borderRadius: "10px 10px 10px 10px", marginBottom: 30, backgroundColor: '#D0E8D9'}}>
                        <CardHeader title='Risk Assessment' backgroundColor='#88BF6B'/>
                        <CardContent>
                            <RiskAssessment weightValue={this.state.alpha} directCostDescription={this.state.directCost.description} directCostAmount={this.state.directCost.amount}
                                            businessRisks= {this.state.businessRisks} indirectCost = {this.state.indirectCost.risk} indirectCostDescription = {this.state.indirectCost.description} 
                                            risk={this.state.systemVulnerability.risk} riskDescription={this.state.systemVulnerability.description} />
                        </CardContent>
                    </Card>
                    <Card style={{borderRadius: "10px 10px 10px 10px", marginBottom: 30, backgroundColor: '#F2F3F8'}}>
                        <CardHeader title='Proactive Measures' backgroundColor='#27B4B4'/>
                        <CardContent>
                           <Measures Measures = {this.state.measures} threatId={this.state.ThreatId}/>
                        </CardContent>
                    </Card>
                </Col>
                <Col>
                <Card style={{marginTop: 200, borderRadius: "10px 10px 10px 10px", marginBottom: 45, backgroundColor: '#dcdcdc',height: "48vh"}}>
                <CardHeader title=' Targeted business sectors' backgroundColor='#cc796d'/>
                <CardContent>
                    <Statistics data = {this.state.data}/>
                </CardContent>
                </Card>
                </Col>
            </Row >
        </Container>
        )

    }
}

export default Company; 