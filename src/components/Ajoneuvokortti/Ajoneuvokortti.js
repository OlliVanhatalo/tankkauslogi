//Komponentin on tarkoitus sisältää lisättyjen ajoneuvojen tiedot
//KOMPONENTTI EI KÄYTÖSSÄ
//---------------------------------------------------------------

import React from 'react';

import ArrowRight from '@material-ui/icons/ArrowRight';
import { Link } from 'react-router-dom';

import './Ajoneuvokortti.css'

function Ajoneuvokortti(props){
    //Ajoneuvokortin rakenne ja sisältö riveittäin
    return(
      <div className="ajoneuvokortti">
        <div className="ajoneuvokortti__ryhma">
            <div className="ajoneuvokortti__rivi">
                <div className="ajoneuvokortti__nimi">{props.data.vehiclename}</div>
            </div>
        </div>
        <div className="kulukortti__linkki">
          <Link to={"/editvehicle/" + props.data.vehicleid}><ArrowRight /></Link>
        </div>
      </div>
    );
  }  

export default Ajoneuvokortti;