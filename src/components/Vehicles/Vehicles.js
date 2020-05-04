//Komponentti sisältää ajoneuvokorttien datan sekä painikkeen ja reitityksen
//uusien korttien lisäämiseen.
//KOMPONENTTI EI KÄYTÖSSÄ! VAATII KEHITTÄMISTÄ!
//--------------------------------------------------------------------------

import React from 'react';

import { Link } from 'react-router-dom';

import Ajoneuvokortti from '../Ajoneuvokortti/Ajoneuvokortti';
import Content from '../Content/Content';

import { FloatingButton } from '../buttons'

function Vehicles(props) {
  
  let rows = props.data.map(invoice => {
      return (
        <Ajoneuvokortti data={invoice} key={invoice.vehicleid} />
      );
    }
  );
  
  return (
      <Content>
        {rows}
        <Link to="/addvehicle"><FloatingButton secondary>+</FloatingButton></Link>
      </Content> 
    );
  }

export default Vehicles;