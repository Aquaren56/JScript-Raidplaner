import './styling/header.css';

import { useEffect, useState } from 'react';

import IconModel from './models/IconModel';

import Header from './components/Header';
import IconBar from './components/IconBar/IconBar';
import Steps from './components/Steps';
import PropertyDisplay from './components/PropertyDisplay';
import PlanningCanvas from './components/PlanningCanvas';

function App() {
    const [items, setItems] = useState(new Array<IconModel>());

    useEffect(() => {
      //console.log(items); for test purposes
    }, [items]);

    return (
      <div className="App">
        <Header />
        <Steps />
        <IconBar />
        <PlanningCanvas children={items} setChildren={setItems}/>
        <PropertyDisplay />
      </div>
    );
}

export default App;
