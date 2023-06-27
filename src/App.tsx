import './styling/header.css';

import { useRef, useState, createContext } from 'react';

import IconModel from './models/IconModel';

import Header from './components/Header';
import IconBar from './components/IconBar/IconBar';
import Steps from './components/StepBar/Steps';
import PropertyDisplay from './components/PropertyDisplays/PropertyDisplay';
import PlanningCanvas from './components/Canvases/PlanningCanvas';
import MapCanvas from './components/Canvases/MapCanvas';
import MapModel from './models/MapModel';

import StepList from './components/StepBar/StepList';

export const StepContext = createContext<number>(0);


function App() {

    const [selectedStep, setSelectedStep] = useState(0);
    const [items, setItems] = useState(new Array<IconModel>());
    const [selection, setSelection] = useState<number>(-1);
    const [area, setArea] = useState(new MapModel({  square: true, radials: 0, grids: [{rows: 4, columns: 4, coloring: []}]}));
    const stepListRef = useRef(new Map());

  const changeItemAt = (item: IconModel, index: number) => {
    items[index] = item;
    const newItems = [...items];
    stepListRef.current.set(selectedStep, newItems);
    setItems(newItems);
  };

  const updateSelectedStep = (newStep: number) => {
    if (stepListRef.current.get(newStep) === undefined) {
      stepListRef.current.set(newStep, [...items]);
      setItems(stepListRef.current.get(newStep));
    } else {
      setItems(stepListRef.current.get(newStep));
    }
    setSelection(-1);
    setSelectedStep(newStep);
  };

  const updateItems = (newItems: IconModel[]) => {
    stepListRef.current.set(selectedStep, newItems);
    setItems(newItems);
  };

    return (
      <div className="App">
        <StepContext.Provider value={selectedStep}>
          <Header />
          <StepList selectStep={updateSelectedStep} />
          <IconBar />
          <div className='canvas-area'>
            <PlanningCanvas children={items} setChildren={updateItems} selection={selection} setSelection={setSelection} key={items}/>
            <MapCanvas map={area} setMap={setArea}/>
          </div>
          <PropertyDisplay selection={selection===-1 ?  area : {player: items[selection], index: selection}} changeSelection={changeItemAt} changeMap={setArea} />
        </StepContext.Provider>
      </div>
    );
}

export default App;
