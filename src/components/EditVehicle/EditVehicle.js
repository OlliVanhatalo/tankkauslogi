//Ajoneuvon muokkaaminen. Vastaava kuin AddVehicle.
//Lisäominaisuutena lomaketiedon tuonti jo tehdystä ajoneuvosta, 
//sekä ajoneuvon poistamisen mahdollistavan toiminnallisuuden tuonti
//KOMPONENTTI EI KÄYTÖSSÄ! VAATII KEHITTÄMISTÄ!
//-----------------------------------------------------------

import React from 'react';

import Content from '../Content/Content';
import VehicleForm from '../VehicleForm/VehicleForm';


import './EditVehicle.css';

function EditVehicle(props) {

    const index = props.data.findIndex(item => item.id === props.match.params.id);

    let itemData = props.data[index];

    return (
      <Content>

        <div className="editvehicle">

        <h2>Tankkauksen muokkaaminen</h2>

        <VehicleForm onFormSubmit={props.onFormSubmit}  
                  data={itemData} 
                  onDeleteItem={props.onDeleteItem} 
                  vehicle={props.vehicle}/>

        </div>
      </Content>
    )
  }

export default EditVehicle;