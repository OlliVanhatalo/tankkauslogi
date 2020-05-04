//Muotoilukomponentti. Sisältää sivun headerin sisällön
//-----------------------------------------------------------

import React from 'react';

import './Header.css'

function Header(props) {
    return(
      <div className="header">
        <h1>Tankkauslogi</h1>
      </div>
    )
}

export default Header;