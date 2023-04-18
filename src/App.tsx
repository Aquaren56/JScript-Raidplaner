import './styling/header.css';

import { useEffect, useState } from 'react';

import IconModel from './models/IconModel';

import Header from './components/Header';
import IconBar from './components/IconBar/IconBar';
import Steps from './components/StepBar/Steps';
import PropertyDisplay from './components/PropertyDisplays/PropertyDisplay';
import PlanningCanvas from './components/Canvases/PlanningCanvas';
import MapCanvas from './components/Canvases/MapCanvas';
import MapModel from './models/MapModel';

function App() {
    const [items, setItems] = useState(new Array<IconModel>());
    const [selection, setSelection] = useState<IconModel | undefined>(undefined);
    const [area, setArea] = useState(new MapModel({  square: true, grids: [{rows: 4, columns: 4, radials: 0}]}));
    const [currentStep, setCurrentStep] = useState(Date.now());

    const [stepList, setStepList] = useState(new Map());

    const newStep = () => {
      stepList.set(currentStep, items);
      const newKey = Date.now();
      setStepList(new Map(stepList));
      setCurrentStep(newKey);
      setItems([...items]);
      setSelection(undefined);
    }

    const changeStep = (stepKey: number) => {
      stepList.set(currentStep, items);
      setStepList(new Map(stepList))
      setCurrentStep(stepKey);
      setItems(stepList.get(stepKey));
      setSelection(undefined);
    }

    useEffect(() => {
      stepList.set(currentStep, items);
    }, [items, stepList, currentStep, selection]);

    return (
      <div className="App">
        <Header />
        <Steps new={newStep} current={currentStep} all={stepList} changeStep={changeStep} key={currentStep}/>
        <IconBar />
        <div className='canvas-area'>
          <PlanningCanvas children={items} setChildren={setItems} selection={selection} setSelection={setSelection} key={items}/>
          <MapCanvas map={area} setMap={setArea}/>
        </div>
        <PropertyDisplay selection={selection || area} changeSelection={setSelection} changeMap={setArea} />
      </div>
    );
}

export default App;
