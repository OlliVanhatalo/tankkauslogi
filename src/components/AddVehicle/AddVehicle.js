import React from 'react';

import Content from '../Content/Content';
import VehicleForm from '../VehicleForm/VehicleForm';


import './AddVehicle.css';

function AddVehicle(props) {
    return (
      <Content>

        <div className="addvehicle">

        <h2>Uuden tankkauksen lisääminen</h2>

        <VehicleForm onFormSubmit={props.onFormSubmit} vehicle={props.vehicle} />

        </div>
      </Content>
    )
  }

export default AddVehicle;