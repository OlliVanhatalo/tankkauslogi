//Tankkauskortin tiedot tulostava komponentti. Data on jaoteltu
//riveihin div-elementeillä muotoilun helpottamiseksi.
//-----------------------------------------------------------

import React from 'react';
import moment from 'moment';

import ArrowRight from '@material-ui/icons/ArrowRight';
import { Link } from 'react-router-dom';

import './Kulukortti.css'

//Funktio tulostaa kulukortin sisällön. Lisäksi määritellään 
//tankkauspäivän muotoilu moment.js funktion avulla, sekä määritellään 
//muuttuja "litrahinta", jolle määritetään arvo if-lauseella
//hyödyntäen tankkauskortista löytyvää summaa ja litraa.
function Kulukortti(props){

    let tankkauspaiva = moment(props.data.tankkauspaiva);
    let litrahinta = "";

    if (props.data.summa && props.data.litraa) {
      litrahinta = props.data.summa / props.data.litraa; 
    } else { litrahinta = 0; }

    //Kulukortin rakenne ja sisältö riveittäin
    return(
      <div className="kulukortti">
        <div className="kulukortti__ryhma">
        <div className="kulukortti__rivi">
          <div className="kulukortti__tyyppi">{props.data.tyyppi}</div>
          <div className="kulukortti__summa">{props.data.summa.toFixed(2)} €</div>
        </div>
        <div className="kulukortti__rivi">
          <div className="kulukortti__tankkauspaiva">{tankkauspaiva.format("D.M.Y")}</div>
          <div className="kulukortti__litraa">{props.data.litraa} l</div>
        </div>
        <div className="kulukortti__rivi">
          <div className="kulukortti__ajoneuvo">{props.data.ajoneuvo}</div> 
          <div className="kulukortti__litrahinta">{litrahinta.toFixed(3)}€ / l</div>  
        </div>
        </div>
        <div className="kulukortti__linkki">
          <Link to={"/edit/" + props.data.id}><ArrowRight /></Link>
        </div>
      </div>
    );
  }  

export default Kulukortti;