import { getAllLcIcons, Lc, getLcPrefab, Dsr, getAllDsrIcons, getDsrPrefab } from "../../../utils/loadLimitCut"
import { Topping, Objects } from "../../../types";
import Section from "../../section";

interface Props {
    object: Objects;
    changingPlayer: Function;
}

export default function Toppings({ object, changingPlayer }: Props) {
    const configureTopping = (topping: Topping) => {
        topping = {
            ...topping,
            pos: {x: object.pos.x, y: object.pos.y - object.size.y},
            drawRotPoint: {x: object.drawRotPoint.x, y: object.drawRotPoint.y - object.size.y - topping.drawOffset.y},
            isChild: true,
        }
        object.topping = topping;
        changingPlayer();
    }
    
    const LcIcons = () => {
        const icons = getAllLcIcons();
        return Object.keys(icons).map((key) => {
            return (
                <img 
                key={key} 
                src={icons[key as Lc]} 
                alt={key}
                onClick={e => configureTopping(getLcPrefab(key as Lc))} 
                />
            )
        })
    }

    const DsrIcons = () => {
        const icons = getAllDsrIcons();
        return Object.keys(icons).map((key) => {
            return (
                <img 
                style={
                    {width: '30px', height: '30px'}
                }
                key={key} 
                src={icons[key as Dsr]} 
                alt={key}
                onClick={e => configureTopping(getDsrPrefab(key as Dsr))} 
                />
            )
        })
    }

    return (
        <>
            <Section title="Limit Cut">{LcIcons()}</Section>
            <Section title="Playstation">{DsrIcons()}</Section>
        </>
    )
}