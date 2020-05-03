import React from 'react';
import moment from 'moment';

import ArrowRight from '@material-ui/icons/ArrowRight';
import { Link } from 'react-router-dom';

import './Kulukortti.css'

//
function Kulukortti(props){

    let tankkauspaiva = moment(props.data.tankkauspaiva);
    
    //let litrahinta = "";
    // if (props.data.kaudenalku && props.data.kaudenloppu) {
    //   let kaudenalku = moment(props.data.kaudenalku);
    //   let kaudenloppu = moment(props.data.kaudenloppu);
    //   kausi = kaudenalku.format("D.M.Y") + " - " + kaudenloppu.format("D.M.Y");
    //   let paivat = kaudenloppu.diff(kaudenalku, 'days');
    //   keskiarvo = props.data.summa / paivat * 30; 
    // }

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
          
          {/* <div className="kulukortti__litrahinta">{props.data.litrahinta}x€/l</div>
          litrahinta ? litrahinta.toFixed(2) + " € / kk" : ""
          yllä oleva tallessa kulukortti__litrahinnan tagien välistä, 
          TODO funktio jolla lasketaan litrahinta 2 desimaalin tarkkuudella */}
          
        </div>
        </div>
        <div className="kulukortti__linkki">
          <Link to={"/edit/" + props.data.id}><ArrowRight /></Link>
        </div>
      </div>
    );
  }  

export default Kulukortti;