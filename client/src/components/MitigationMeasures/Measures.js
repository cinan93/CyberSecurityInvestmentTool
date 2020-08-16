import React, { Component } from 'react';
import classes from './Measures.module.css'
import {Container,Col,Row} from 'reactstrap';
import api from '../../services/api'; 
import { Multiselect } from 'multiselect-react-dropdown';


class Measures extends Component {

    constructor(props){
        super(props); 

        this.state = {
            measureId: '', 
            MeasureIds: [], 
            budgetOneMeasure: '',
            budgetSeveralMeasures: '',
            ROSIoneMeasaure: '', 
            ROSIseveralMeasures: '',
            measureDescription: '', 
            }
        }

        handleChange = (event) => {
            this.setState({measureId: event.target.value});

            api.post('/company/measureDescription', {
                MeasureId: event.target.value,
                ThreatId: this.props.threatId
            })
            .then(res => this.setState({measureDescription: res.data, 
                                        ROSIoneMeasaure: ''}))
            .catch(error => console.log(error))

          }

        handleInputChange = (event) => {
            if(event.target.value >0){
            this.setState({
                budgetOneMeasure: event.target.value
            })
        }
        else if (event.target.value <=0) { alert('The Budget has to be a positve Number') }
    }

        handleInputChangeTotal = (event) => {
            if(event.target.value >0){
            this.setState({
            budgetSeveralMeasures: event.target.value
            })
        }
         else if (event.target.value <=0) { alert('The Budget has to be a positve Number') }
    }


        handleBudgetInput = (event) => {
            event.preventDefault();

            api.post('/company/calcRosi',{
                Budget: this.state.budgetOneMeasure, 
                MeasureId: this.state.measureId, 
                ThreatId: this.props.threatId })
            .then(res => this.setState({ROSIoneMeasaure: res.data}))
            .catch(error => console.log(error))
        }


        handleTotalBudget = (event) => {
            event.preventDefault(); 

            api.post('/company/calcTotRosi', {
                Budget: this.state.budgetSeveralMeasures, 
                MeasureIds: this.state.MeasureIds, 
                ThreatId: this.props.threatId })
            .then(res => this.setState({ROSIseveralMeasures: res.data}))
            .catch(error => console.log(error))
        }


        onSelect = (selectedList, selectedItem) => {
           var values = []
           selectedList.map(list => values.push(list.value))
           this.setState({MeasureIds: values, 
                          ROSIseveralMeasures: '' }); 
        }

        onRemove =  (selectedList, selectedItem) => {
           var values = []
           selectedList.map(list => values.push(list.value))
           this.setState({MeasureIds: values, 
                          ROSIseveralMeasures: ''}); 

        }

        render(){
            let attachedClass = null; 
            if(parseInt(this.state.ROSIoneMeasaure) > 0 ){
                attachedClass = classes.RoSIgreen;
            }
            else if (parseInt(this.state.ROSIoneMeasaure) < 0){
                attachedClass = classes.RoSIred; 
            }

            let attachedClassTotal = null; 
            if(parseInt(this.state.ROSIseveralMeasures) > 0 ){
                attachedClassTotal = classes.RoSIgreen;
            }
            else if (parseInt(this.state.ROSIseveralMeasures) < 0){
                attachedClassTotal = classes.RoSIred; 
            }


        
            return(
                <Container>
                    <Row className={classes.lineInMiddle}>
                        <Col>
                            <div style={{position:"relative"}}>
                        <form>
                            {<select  className={classes.InputElement} value={this.state.measureId} onChange={this.handleChange}>
                            <option value="" disabled hidden>Select one</option>
                            {this.props.Measures.map(result => ( <option key= {result.value} value={result.value}>{result.label}</option>))}
                            </select>}
                        </form>
                        <div className={classes.Description}>
                            <strong>Description:</strong> 
                            <p >{this.state.measureDescription}</p>
                        </div>
                        <form onSubmit={this.handleBudgetInput} >
                            <label className ={classes.Budget}>
                               <strong>Budget for Measure (USD):</strong>
                            <input className={classes.BudgetInput} name="budget" type="number" value={this.state.budgetOneMeasure} onChange={this.handleInputChange}/>
                            </label>
                            <button className ={classes.BudgetOk}>OK</button>
                        </form>
                        <div className={classes.Rosi}>
                            <strong>Return On Security Investment:</strong> <div className={attachedClass}>{this.state.ROSIoneMeasaure}</div>
                        </div>
                        </div>
                        </Col>
                        <Col>
                            <div style={{position:"relative"}}>
                            <Multiselect style={{multiselectContainer: {backgroundColor: "white",  width: "95%",borderRadius: "3mm", boxsizing: "border-box"}}} 
                            options = {this.props.Measures} displayValue = "label"  onSelect ={this.onSelect} 
                            onRemove={this.onRemove} placeholder = {'Select mutliple'} showCheckbox={true}/>
                            <form onSubmit={this.handleTotalBudget}>
                                <label className ={classes.Budget}>
                                    <strong>Total Budget for Measures (USD):</strong>
                                    <input className={classes.BudgetInputTotal} name="TotBudget" type="number" value ={this.state.budgetSeveralMeasures} onChange={this.handleInputChangeTotal} />
                                </label>
                                <button className={classes.BudgetOkTotal}>OK</button>
                            </form>
                            <div className={classes.Rosi}>
                            <strong>Return On Security Investment:</strong> <div className={attachedClassTotal}>{this.state.ROSIseveralMeasures}</div>
                            </div>
                            </div>
                        </Col>
                    </Row>

                </Container>

            )
        }



}

export default Measures; 