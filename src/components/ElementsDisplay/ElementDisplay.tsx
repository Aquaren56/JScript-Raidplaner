import "../../styling/element-display.css";
import "../../styling/header.css";
import { AnObject, isCircle, isCone, isRectangle } from "../../types";
import { isAttacks } from "../../types";
import { StepContext } from "../../App";
import { useContext } from "react";

interface ElementDisplayProps {
  allElements: AnObject[];
  setAllElements: Function;
  selectedElement: AnObject | null;
  setSelectedElement: Function;
}

export default function ElementDisplay({
  allElements,
  setAllElements,
  selectedElement,
  setSelectedElement,
}: ElementDisplayProps) {
  const currentStep = useContext(StepContext);

  const orderChildren = () => {
    return allElements.sort((a: AnObject, b: AnObject) => {
      if (a.type < b.type) {
        return -1;
      } else if (a.type > b.type) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  const display = (element: AnObject) => {
    if (isAttacks(element)) {
      if (element[currentStep].parents.length > 0) {
        return (
          <>
            {element[currentStep].parents.map(
              (parent: AnObject, index: number) => {
                return (
                  <div className="element" key={index}>
                    {" from: "}
                    {parent.label}
                  </div>
                );
              }
            )}
          </>
        );
      }
    }
  };

  const displayTarget = (element: AnObject) => {
    if (isAttacks(element)) {
      if (element[currentStep].targets.length > 0) {
        return (
          <div className="element">
            {" to: "}
            {element[currentStep].targets.join(", ")}
          </div>
        );
      }
    }
  };

  function rgbToHex(rgb: string): string {
    const values = rgb.split(",").map((value) => parseInt(value.trim(), 10));
    const [r, g, b] = values;

    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
      return `#${hex}`;
    }

    return "";
  }

  const getRepresantive = (element: AnObject) => {
    if (isCircle(element)) {
      return (
        <div
          style={{
            borderRadius: "50%",
            backgroundColor: rgbToHex(element.color),
          }}
        ></div>
      );
    } else if (isCone(element)) {
      return (
        <div
          style={{
            width: "0",
            height: "0",
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            borderTop: "30px solid " + rgbToHex(element.color),
            borderRadius: "20px",
          }}
        ></div>
      );
    } else if (isRectangle(element)) {
      const widthRatio =
        (30 * element[currentStep].size.x) / element[currentStep].size.y;
      const margin = (30 - widthRatio) / 2 + 5;
      return (
        <div
          style={{
            marginTop: "5",
            marginBottom: "5",
            marginLeft: margin + "px",
            marginRight: margin + "px",
            backgroundColor: rgbToHex(element.color),
            height: "30px",
            width: widthRatio + "px",
          }}
        ></div>
      );
    } else {
      return <img src={element.img} alt={element.label} />;
    }
  };

  return (
    <div
      className="element-display"
      style={{ backgroundColor: "var(--darkest)" }}
    >
      {orderChildren().map((child: AnObject, index: number) => {
        const style =
          selectedElement === child
            ? { bgc: "yellow", c: "black" }
            : { bgc: "", c: "" };
        return (
          <div
            className="element"
            style={{ backgroundColor: style.bgc, color: style.c }}
            key={index}
            onClick={() => setSelectedElement(child)}
          >
            {getRepresantive(child)}
            <span style={{ marginRight: "4px" }}>{child.label}</span>{" "}
            {display(child)} {displayTarget(child)}
          </div>
        );
      })}
    </div>
  );
}
