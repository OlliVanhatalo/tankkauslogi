//Sisältökomponentti. Luotu muotoilun helpottamiseksi. Sisään
//kirjoitettuihin komponentteihin tuodaan kaikki niiden
//ominaisuudet propsilla
//-----------------------------------------------------------

import React from 'react';

import './Content.css';

function Content(props) {
    return (
      <div className="content">
        { props.children }
  
      </div>
    )
  }

export default Content;