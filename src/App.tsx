import './styling/header.css';

import { useEffect, useState } from 'react';

import IconModel from './models/IconModel';

import Header from './components/Header';
import IconBar from './components/IconBar/IconBar';
import Steps from './components/Steps';
import PropertyDisplay from './components/PropertyDisplay';
import PlanningCanvas from './components/Canvases/PlanningCanvas';
import MapCanvas from './components/Canvases/MapCanvas';
import MapModel from './models/MapModel';

function App() {
    const [items, setItems] = useState(new Array<IconModel>());
    const [selection, setSelection] = useState<IconModel | undefined>(undefined);
    const [area, setArea] = useState(new MapModel({ rows: 1, coloumns: 1, square: false, radials: 4}));

    useEffect(() => {
      //console.log(selection)
    }, [items, selection]);

    return (
      <div className="App">
        <Header />
        <Steps />
        <IconBar />
        <div className='canvas-area'>
          <PlanningCanvas children={items} setChildren={setItems} selection={selection} setSelection={setSelection}/>
          <MapCanvas map={area} setMap={setArea}/>
        </div>
        <PropertyDisplay />
      </div>
    );
}

export default App;
