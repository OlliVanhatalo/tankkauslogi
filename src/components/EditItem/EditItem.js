//Tankkaustapahtuman muokkaaminen. Vastaava kuin AddItem. 
//Lisäominaisuutena lomaketiedon tuonti jo tehdystä tapahtumasta, 
//sekä lomakkeen poistamisen mahdollistavan toiminnallisuuden tuonti
//-----------------------------------------------------------

import React from 'react';

import Content from '../Content/Content';
import ItemForm from '../ItemForm/ItemForm';


import './EditItem.css';

function EditItem(props) {

    const index = props.data.findIndex(item => item.id === props.match.params.id);

    let itemData = props.data[index];

    return (
      <Content>

        <div className="edititem">

        <h2>Tankkauksen muokkaaminen</h2>

        <ItemForm onFormSubmit={props.onFormSubmit} 
                  selectList={props.selectList} 
                  data={itemData} 
                  onDeleteItem={props.onDeleteItem} 
                  vehicle={props.vehicle}/>

        </div>
      </Content>
    )
  }

export default EditItem;