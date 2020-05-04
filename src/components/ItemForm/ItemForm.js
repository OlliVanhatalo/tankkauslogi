//Tankkaustapahtumalomake. Sisältää kentät, joihin voidaan täyttää
//uuden tankkaustapahtuman tiedot. Komponenttia hyödynnetty sekä 
//AddItem että EditItem komponenteissa. Sisältää vaadittavat 
//toiminnallisuudet tietojen lisäämiseen, muokkaamiseen tai koko
//tapahtuman poistamiseen.
//-----------------------------------------------------------

import React from 'react';
import { withRouter } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

import Button from '../buttons';

import './ItemForm.css'

class ItemForm extends React.Component {

    constructor(props) {
        super(props);
        const data = props.data ? props.data : {
            tyyppi: "95E10",
            summa: 0,
            litraa: 0,
            tankkauspaiva: 10/10/2020,
            ajoneuvo: "Auto 1",
            litrahinta: "",
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

    //Tulostetaan lomakkeen syöttökentät
    //-------------------------------------------------------------------------
    render() {
        return(
            <form onSubmit={this.handleSubmit}>

            <div className="itemform">

                <div className="itemform__row">
                <div>
                    <label htmlFor="tyyppi">Polttoainetyyppi</label>
                    <select name="tyyppi" value={this.state.data.tyyppi} onChange={this.handleInputChange}>

                        {this.props.selectList.map(item => <option value={item} key={item}>{item}</option>)}

                    </select>
                </div>
                </div>

                <div className="itemform__row">
                <div>
                    <label htmlFor="summa">Summa</label>
                    <input type="number" name="summa" step="0.01" value={this.state.data.summa} onChange={this.handleInputChange}/>
                </div>

                <div>
                    <label htmlFor="litraa">Litraa</label>
                    <input type="number" name="litraa" value={this.state.data.litraa} onChange={this.handleInputChange}/>
                </div>
                </div>

                <div className="itemform__row">
                <div>
                    <label htmlFor="tankkauspaiva">Tankkauspäivä</label>
                    <input type="date" name="tankkauspaiva" size="10" value={this.state.data.tankkauspaiva} onChange={this.handleInputChange}/>
                </div>
                </div>

                <div className="itemform__row">
                <div>
                <label htmlFor="ajoneuvo">Ajoneuvo</label>
                    <select name="ajoneuvo" value={this.state.data.ajoneuvo} onChange={this.handleInputChange}>

                        {this.props.vehicle.map(item => <option value={item} key={item}>{item}</option>)}
                    </select>
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
                            <Button secondary onClick={this.handleDeleteItem}>POISTA</Button> 
                        </div>
                        <div></div>
                    </div> : "" }

            </div>

            </form>
        );
    }
}

export default withRouter(ItemForm);