import "./styling/header.css";

import { useState, createContext, useEffect } from "react";
import React from "react";

import Header from "./Header";
import IconBar from "./IconBar/IconBar";
import PropertyDisplay from "./PropertyDisplays/PropertyDisplay";
import PlanningCanvas from "./Canvases/PlanningCanvas";
import MapCanvas from "./Canvases/MapCanvas";
import MapModel from "../models/MapModel";
import ElementDisplay from "./ElementsDisplay/ElementDisplay";
import ThemeToggle from "./ThemeToggle";

import { initSetupPlayer } from "../utils/loadIcons";
import { initSetupBoss } from "../utils/loadBoss";

import { CounterProvider } from "../IdProvider";
import StepList from "./StepBar/StepList";
import { AnObject, isAttacks, isToppings } from "../types";

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

  const searchAndDestroyAtCurrentStep = (element: AnObject) => {
    allItems.forEach((item) => {
      if (isAttacks(item) || isToppings(item)) {
        if (item[selectedStep]) {
          if (item[selectedStep].parents.length > 0) {
            item[selectedStep].parents.forEach((parent, index) => {
              if (parent.id === element.id) {
                item[selectedStep].parents.splice(index, 1);
              }
            });
          }
        }
      }
      if (isAttacks(item)) {
        if (item[selectedStep]) {
          if (item[selectedStep].targets.length > 0) {
            item[selectedStep].targets.forEach((child, index) => {
              if (!(typeof child === "number" || typeof child === "string")) {
                if (child.id === element.id) {
                  item[selectedStep].targets.splice(index, 1);
                }
              }
            });
          }
        }
      }
    });
  };

  const searchAndDestroy = (element: AnObject) => {
    allItems.forEach((item) => {
      if (isAttacks(item) || isToppings(item)) {
        Object.keys(item).forEach((key) => {
          const keyNum = parseInt(key);
          if (!isNaN(keyNum)) {
            console.log(key);
            if (item[keyNum].parents.length > 0) {
              item[keyNum].parents.forEach((parent: any, index: any) => {
                if (parent.id === element.id) {
                  item[keyNum].parents.splice(index, 1);
                }
              });
            }
          }
        });
      }
      if (isAttacks(item)) {
        Object.keys(item).forEach((key) => {
          const keyNum = parseInt(key);
          if (!isNaN(keyNum)) {
            if (item[keyNum].targets.length > 0) {
              item[keyNum].targets.forEach((child: any, index: any) => {
                if (!(typeof child === "number" || typeof child === "string")) {
                  if (child.id === element.id) {
                    item[keyNum].targets.splice(index, 1);
                  }
                }
              });
            }
          }
        });
      }
    });
  };

  const deleteElementEntirely = (element: AnObject) => {
    const index = allItems.indexOf(element);
    if (index > -1) {
      allItems.splice(index, 1);
    }
    searchAndDestroy(element);
    setSelectedElement(null);
    updateAllItems([...allItems]);
  };

  const deleteElementFromStep = (element: AnObject) => {
    delete element[selectedStep];
    searchAndDestroyAtCurrentStep(element);
    setSelectedElement(null);
    updateAllItems([...allItems]);
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
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            deleteElementEntirely={deleteElementEntirely}
            deleteFromStep={deleteElementFromStep}
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
