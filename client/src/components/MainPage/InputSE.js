import React from 'react'; 
import classes from './InputSE.module.css'; 

const input = (props) => {
    let inputElement = null; 

    switch(props.elementType){
        case('select'):
            inputElement = <select className= {classes.InputElement}
            value={props.value} onChange={props.changed}> 
            {props.elementConfig.map(subindicator => (
                <option key={subindicator.value} value={subindicator.value}>
                    {subindicator.name}
                </option>
            ))}
            </select>
            break;
    }
return (
    <div>
        <label className = {classes.Label}>{props.label}</label>
        {inputElement}
    </div>
)
}; 

export default input; 