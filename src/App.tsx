import "./styling/header.css";

import { useState, createContext, useEffect } from "react";

import Header from "./components/Header";
import IconBar from "./components/IconBar/IconBar";
import PropertyDisplay from "./components/PropertyDisplays/PropertyDisplay";
import PlanningCanvas from "./components/Canvases/PlanningCanvas";
import MapCanvas from "./components/Canvases/MapCanvas";
import MapModel from "./models/MapModel";
import ElementDisplay from "./components/ElementsDisplay/ElementDisplay";
import ThemeToggle from "./components/ThemeToggle";

import { initSetupPlayer } from "./utils/loadIcons";
import { initSetupBoss } from "./utils/loadBoss";

import { CounterProvider } from "./IdProvider";
import StepList from "./components/StepBar/StepList";
import { AnObject } from "./types";

export const StepContext = createContext<number>(0);

function App() {
  const [selectedStep, setSelectedStep] = useState(0);

  const [allItems, setAllItems] = useState(new Array<AnObject>());
  const [selectedElement, setSelectedElement] = useState<AnObject | null>(null);

  const [area, setArea] = useState(
    new MapModel({
      square: true,
      radials: 0,
      grids: [{ rows: 4, columns: 4, coloring: [] }],
    })
  );

  useEffect(() => {
    const playerSetup2 = initSetupPlayer(0);
    const bossSetup2 = initSetupBoss(0);
    const init2 = [...playerSetup2, ...bossSetup2];
    setAllItems([...init2]);
  }, []);

  const updateSelectedStep = (newStep: number, added: boolean) => {
    if (added) {
      allItems.forEach((item) => {
        if (item[selectedStep]) {
          item[newStep] = { ...item[selectedStep] };
        }
      });
    }
    setSelectedStep(newStep);
  };

  const updateAllItems = (newItems: AnObject[]) => {
    setAllItems(newItems);
  };

  const update = () => {
    setAllItems([...allItems]);
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
