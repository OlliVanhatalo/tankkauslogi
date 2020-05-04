import React from 'react';
import App from './App';
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer';
import Stats from './components/Stats/Stats';
import Settings from './components/Settings/Settings';
import Items from './components/Items/Items';
import ItemForm from './components/ItemForm/ItemForm';
import AddItem from './components/AddItem/AddItem';
import EditItem from './components/EditItem/EditItem';
import Content from './components/Content/Content';
import Buttons from './components/buttons/index';
import Header from './components/Header/Header';
import Kulukortti from './components/Kulukortti/Kulukortti';
import Menu from './components/Menu/Menu';

test('Renderöi sivulle tekstin Tankkauslogi', () => {
    const { getByText } = render(
    <App />,  
    <Stats/>,
    <Settings/>
    );
    const headerElement = getByText(/Tankkauslogi/i);
    expect(headerElement).toBeInTheDocument();
  });

//TODO!!
// test('Painaa etusivun plus painiketta ja avaa AddItem komponentin', () => {
//     const { getByText } = render(<App />); 
//     const headerElement = getByText(/Tankkauslogi/i);
//     expect(headerElement).toBeInTheDocument();
//   });

  test('Kaikki komponentit renderöityy oikein, verrataan snapshottiin', () => {
    const component = renderer.create(
      <App />,
      <Stats />,
      <Settings />,
      <Items />,
      <ItemForm />,
      <AddItem />,
      <EditItem />,
      <Content />,
      <Buttons />,
      <Header />,
      <Kulukortti />,
      <Menu />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });