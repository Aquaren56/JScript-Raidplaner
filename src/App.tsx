import "./styling/header.css";

import { useRef, useState, createContext, useEffect } from "react";

import Header from "./components/Header";
import IconBar from "./components/IconBar/IconBar";
import PropertyDisplay from "./components/PropertyDisplays/PropertyDisplay";
import PlanningCanvas from "./components/Canvases/PlanningCanvas";
import MapCanvas from "./components/Canvases/MapCanvas";
import MapModel from "./models/MapModel";
import ElementDisplay from "./components/ElementsDisplay/ElementDisplay";
import ThemeToggle from "./components/ThemeToggle";

import { initPlayerSetup, initSetupPlayer } from "./utils/loadIcons";
import { initBossSetup, initSetupBoss } from "./utils/loadBoss";

import { CounterProvider } from "./IdProvider";
import StepList from "./components/StepBar/StepList";
import { SceneObject, AnObject } from "./types";

export const StepContext = createContext<number>(0);

function App() {
  const [selectedStep, setSelectedStep] = useState(0);
  const [items, setItems] = useState(new Array<SceneObject>());
  const [selection, setSelection] = useState<SceneObject | null>(null);

  const [allItems, setAllItems] = useState(new Array<AnObject>());
  const [selectedElement, setSelectedElement] = useState<AnObject | null>(null);

  const [area, setArea] = useState(
    new MapModel({
      square: true,
      radials: 0,
      grids: [{ rows: 4, columns: 4, coloring: [] }],
    })
  );
  const stepListRef = useRef(new Map());

  useEffect(() => {
    const playerSetup = initPlayerSetup();
    const bossSetup = initBossSetup();
    const init = [...playerSetup, ...bossSetup];
    setItems([...init]);
    stepListRef.current.set(0, init);

    const playerSetup2 = initSetupPlayer(0);
    const bossSetup2 = initSetupBoss(0);
    const init2 = [...playerSetup2, ...bossSetup2];
    setAllItems([...init2]);
  }, []);

  const updateSelectedStep = (newStep: number) => {
    if (stepListRef.current.get(newStep) === undefined) {
      stepListRef.current.set(newStep, [...items]);
      setItems(stepListRef.current.get(newStep));
      allItems.forEach((item) => {
        if (item[selectedStep]) {
          item[newStep] = { ...item[selectedStep] };
        }
      });
    } else {
      setItems(stepListRef.current.get(newStep));
    }
    setSelection(null);
    setSelectedStep(newStep);
  };

  const updateItems = (newItems: SceneObject[]) => {
    stepListRef.current.set(selectedStep, newItems);
    setItems(newItems);
  };

  const updateAllItems = (newItems: AnObject[]) => {
    setAllItems(newItems);
  };

  const update = () => {
    const newItems = [...items];
    stepListRef.current.set(selectedStep, newItems);
    setAllItems([...allItems]);
    setItems(newItems);
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
      }}
    >
      <CounterProvider>
        <StepContext.Provider value={selectedStep}>
          <Header>
            <ThemeToggle />
          </Header>
          <StepList selectStep={updateSelectedStep} />
          <IconBar />
          <div
            className="canvas-area"
            style={{ backgroundColor: "var(--dark)" }}
          >
            <div className="center-canvas">
              <PlanningCanvas
                children={items}
                setChildren={updateItems}
                selection={selection}
                setSelection={setSelection}
                key={items}
                allElements={allItems}
                setAllElements={setAllItems}
                selectedElement={selectedElement}
                setSelectedElement={setSelectedElement}
              />
              <MapCanvas map={area} setMap={setArea} />
            </div>
          </div>
          <ElementDisplay
            allElements={allItems}
            setAllElements={setAllItems}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
          />
          <PropertyDisplay
            updateSelected={update}
            changeMap={setArea}
            allElements={allItems}
            selectedElement={selectedElement === null ? area : selectedElement}
            updateAllElements={updateAllItems}
          />
        </StepContext.Provider>
      </CounterProvider>
    </div>
  );
}

export default App;
