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
    const [selection, setSelection] = useState<IconModel | undefined>(undefined);

    useEffect(() => {
      console.log(selection)
    }, [items, selection]);

    return (
      <div className="App">
        <Header />
        <Steps />
        <IconBar />
        <PlanningCanvas children={items} setChildren={setItems} selection={selection} setSelection={setSelection}/>
        <PropertyDisplay />
      </div>
    );
}

export default App;
