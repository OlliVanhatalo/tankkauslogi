//Settings sivulle oli tarkoitus toteuttaa etusivun kulukortteja vastaava
//ajoneuvokorttirakenne, johon olisi voinut lisätä käyttäjän omia ajoneuvoja
//sekä myös poistaa niitä. Sovelluksessa on vielä olemassa tiedostot joilla
//rakennetta on yritetty toteuttaa, mutta niitä ei ole otettu käyttöön.
//-------------------------------------------------------------------------

import React from 'react';
import Content from '../Content/Content';
import Button from '../buttons';

import './Settings.css';

function Settings(props) {

  //handleSubmit sisältää funktion, jolla estetään alkuperäisen listan kirjoittaminen
  //ja sen sijaan kirjoitetaan uusi lista johon on lisätty uusi ajoneuvo.
    const handleSubmit = function(event) {
      event.preventDefault();
      let vehicle = event.target.elements.vehicle.value;
      props.onFormSubmit(vehicle);
      event.target.elements.vehicle.value = "";

    }

      return (
        <Content>

        {/* Käyttäjän profiilitiedot ja uloskirjautumispainike */}
          <div className="settings">
            <h2>Profiili</h2>
            <div className="settings__profile">
              <div className="settings__userdata">
                <div><img src={props.user.photoURL} alt=""/></div>
                <div>{props.user.displayName}<br/>{props.user.email}</div>
              </div>
              <div>
                <Button onClick={props.onLogout}>Logout</Button>
              </div>
            </div>

          {/* Käyttäjän ajoneuvolista. Toistaiseksi on mahdollista vain lisätä
          ajoneuvoja. Poistotoiminnallisuutta ei ole mielekästä toteuttaa,
          ennen kuin on toteutettu uusien ajoneuvojen tallennus firebase tietokantaan*/}
            <h2>Asetukset</h2>
            <h3>Omat ajoneuvot</h3>
            <div className="settings__items">
              { props.data.map(item => <div key={item}>{item}</div>)}
              <form onSubmit={handleSubmit}>
                <div className="settingsForm">
                  <input type="text" name="vehicle" />
                  <Button type="submit" primary>LISÄÄ</Button>
                </div>
              </form>

            </div>
          </div>
        </Content>
      )
    }
  // }

export default Settings;
