import React, { Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import firebase, { auth, provider } from './firebase';

import Header from './components/Header/Header';
import Items from './components/Items/Items';
//import Vehicles from './components/Vehicles/Vehicles';
import Stats from './components/Stats/Stats';
import Settings from './components/Settings/Settings';
import Menu from './components/Menu/Menu';
import AddItem from './components/AddItem/AddItem';
//import AddVehicle from './components/AddVehicle/AddVehicle';
import EditItem from './components/EditItem/EditItem';
//import EditVehicle from './components/EditVehicle/EditVehicle';
import Content from './components/Content/Content';
import Button from './components/buttons';
import vehicledata from './vehicledata';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectList: ["95E10","98E5", "DI", "E85" ],
      vehicle: ['Auto 1','Auto 2'],
      user: null,
      error: null
    }
    this.dbRef = firebase.firestore();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSelectListForm = this.handleSelectListForm.bind(this);
    this.handleVehicleForm = this.handleVehicleForm.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ 
          user: user 
        });

        //Luodaan tallennettavalle datalle osoitteet tietokantaan
        this.refData = this.dbRef.collection("users").doc(user.uid).collection('data');
        
        //Luodaan tankkausten ja ajoneuvojen datalle tietokokoelmat tietokannassa,
        //käydään läpi siellä olevat tiedot ja tuodaan ne App.js:än this.stateen.
        this.unsubscribe = this.refData.orderBy("tankkauspaiva","desc").onSnapshot((docs) => {
          let data = [];
          docs.forEach((doc) => {
            let docdata =  doc.data();
            data.push(docdata);
            
          });
          this.setState({
            data: data
          });
        });

        //Tämä osuus liityy uusien ajoneuvojen tallentamiseen tietokantaan,
        //mutta en lopultakaan saanut sitä toimimaan
        //------------------------------------------------------------------
        // this.refVehicleData = this.dbRef.collection("users").doc(user.uid).collection('vehicledata');

        // this.unsubscribe = this.refData.onSnapshot((docs) => {
        //   let vehicle = [];
        //   docs.forEach((doc) => {
        //     let docdata =  doc.data();
        //     vehicle.push(vehicle);
        //   });
        //   this.setState({
        //     vehicle: vehicle
        //   });
        // });
        //------------------------------------------------------------------
      } 
    }); 
  }

  handleFormSubmit(newdata) {
    this.refData.doc(newdata.id).set(newdata);

    //Tämä pätkä liittyy myös ajoneuvojen tallentamiseen, joka ei toiminut
    //--------------------------------------------------------------------
    // this.refVehicleData.doc(newdata.id).set(newdata);
    //--------------------------------------------------------------------
  }

  handleSelectListForm(newitem) {
    let selectList = this.state.selectList.slice();
    selectList.push(newitem);
    selectList.sort();
    this.setState({
      selectList: selectList
    }); 
  }

  handleVehicleForm(newitem) {
    let vehicle = this.state.vehicle.slice();
    vehicle.push(newitem);
    vehicle.sort();
    this.setState({
      vehicle: vehicle
    }); 
  }

  handleDeleteItem(id) {
    this.refData.doc(id).delete().then().catch(error => {console.error("Virhe tietoa poistettaessa: ", error)})
    //this.vehicleData.doc(id).delete().then().catch(error => {console.error("Virhe tietoa poistettaessa: ", error)})
  }

  login() {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({
        user: user,
        error: null
      });
    }).catch((error) => {
      const errorMessage = error.message;
      this.setState({
        error: errorMessage
      });
    });
  }

  logout() {
    this.unsubscribe();
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
      this.refData = null
    });  
  }

  render() {

    if (!this.state.user) {
      return (
        <Router>
          <div className="App">
            <Header/>
            <Content>
            <div className="App__welcome">
                <div>Et ole vielä kirjautunut sisälle.</div>
                <div><Button primary onClick={this.login}>Kirjaudu sisälle</Button></div>
                <div>{this.state.error ? <p>{this.state.error}</p> : null}</div>
              </div>
            </Content>
            <Menu />
          </div>
        </Router>
      );
    }

    return (
      <Router>
        <div className="App">
          <Header/>
          <Route path="/" exact render={() => <Items data={this.state.data} />} />
          <Route path="/stats" render={() => <Stats data={this.state.data} />} />
          <Route path="/settings" render={() => <Settings data={this.state.vehicle}  
                                                          onFormSubmit={this.handleVehicleForm}
                                                          onLogout={this.logout}
                                                          user={this.state.user}
                                                          />} />
          <Route path="/add" render={() => <AddItem onFormSubmit={this.handleFormSubmit} 
                                                    selectList={this.state.selectList} 
                                                    vehicle={this.state.vehicle} />} />
          <Route path="/edit/:id" render={(props) => <EditItem data={this.state.data} 
                                                               selectList={this.state.selectList}
                                                               vehicle={this.state.vehicle}
                                                               onFormSubmit={this.handleFormSubmit} 
                                                               onDeleteItem={this.handleDeleteItem}
                                                               {...props} />} />


          {/*Nämä reititykset liittyvät lisättävien ajoneuvojen korttirakenteeseen. Korttirakenteessa 
          on jotain oleellista vialla, enkä ole vielä keksinyt mikä. Koodit on jätetty olemaan
          myöhempää ongelman ratkaisua varten.
          ------------------------------------------------------------------------------------------- 
          <Route path="/vehicles" render={() => <Vehicles data={this.state.vehicle} />} />          
          <Route path="/addvehicle" render={() => <AddVehicle onFormSubmit={this.handleFormSubmit} 
                                                              selectList={this.state.selectList} 
                                                              vehicle={this.state.vehicle} />} />
          <Route path="/editvehicle/:id" render={(props) => <EditVehicle data={this.state.data}
                                                               vehicle={this.state.vehicle}
                                                               onFormSubmit={this.handleFormSubmit} 
                                                               onDeleteItem={this.handleDeleteItem}
                                                               {...props} />} /> 
          ------------------------------------------------------------------------------------------- */}
          <Menu />
        </div>
      </Router>
    );
  }
}

export default App;

