//Komponentti sisältää input-kentät uuden ajoneuvon lisäämistä varten.
//Sisällytetty Ajoneuvokortti-, AddVehicle- ja EditVehicle-komponentteihin.
//KOMPONENTTI EI KÄYTÖSSÄ! VAATII KEHITTÄMISTÄ!
//--------------------------------------------------------------------------

import React from 'react';
import { withRouter } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

import Button from '../buttons';

import './VehicleForm.css'

class VehicleForm extends React.Component {

    constructor(props) {
        super(props);
        const data = props.data ? props.data : {
            vehicleid: "",
            vehiclename: "Oma auto"
         }
        this.state = {
            data: data
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.name === 'isGoing' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          data: {
              ...this.state.data,
              [name]: value
          }
        });
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.goBack();
    }

    handleSubmit(event) {
        event.preventDefault();
        let data = Object.assign({}, this.state.data);
        data.summa = parseFloat(data.summa);
        data.id = data.id ? data.id : uuidv4();
        this.props.onFormSubmit(data);
        this.props.history.push("/");
    }

    handleDeleteItem(event) {
        event.preventDefault();
        this.props.onDeleteItem(this.state.data.id);
        this.props.history.push("/");
    }


    render() {
        return(
            <form onSubmit={this.handleSubmit}>

            <div className="vehicleform">

                <div className="vehicleform__row">
                <div>
                    <label htmlFor="vehicle">Ajoneuvon nimi</label>
                    <input type="text" name="vehicle" value={this.state.data.nimi} onChange={this.handleInputChange}/>
                </div>
                <div>
                    {/* <label htmlFor="id">Rekisterinumero</label>
                    <input type="text" name="id" value={this.state.data.id} onChange={this.handleInputChange}/> */}
                </div>
                </div>

                <div className="itemform__row">
                <div>
                    <Button onClick={this.handleCancel}>PERUUTA</Button>
                </div>
                <div>
                    <Button type="submit" primary>{this.state.data.id ? "TALLENNA" : "LISÄÄ"}</Button>
                </div>
                </div>

                { this.props.onDeleteItem ? 
                    <div className="itemform__row">
                        <div>
                            <Button onClick={this.handleDeleteItem}>POISTA</Button> 
                        </div>
                        <div></div>
                    </div> : "" }

            </div>

            </form>
        );
    }
}

export default withRouter(VehicleForm);