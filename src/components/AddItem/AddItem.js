//Uuden tankkaustapahtuman lisääminen. Komponenttiin on tuotu 
//lomakekomponentti
//-----------------------------------------------------------

import React from 'react';

import Content from '../Content/Content';
import ItemForm from '../ItemForm/ItemForm';


import './AddItem.css';

function AddItem(props) {
    return (
      <Content>

        <div className="additem">

        <h2>Uuden tankkauksen lisääminen</h2>

        <ItemForm onFormSubmit={props.onFormSubmit} selectList={props.selectList} vehicle={props.vehicle} />

        </div>
      </Content>
    )
  }

export default AddItem;