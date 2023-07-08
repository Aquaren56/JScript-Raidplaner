import { Objects, Attacks, SceneObject } from '../../../types';
import { getAllAttacks, getIcon, AttackShape, getAttack } from '../../../utils/loadAttacks';
import Section from '../../section';
import { useCounter } from '../../../IdProvider';

interface Props {
    object: Objects;
    changingPlayer: Function;
    addElements: Function;
    allElements: SceneObject[];
}


export default function AttackAttachments({ object, changingPlayer, addElements, allElements }: Props) {
    const { counter, incrementCounter } = useCounter();

    const configureAttack = (attack: Attacks) => {

        attack = {
            ...attack,
            id: counter,
            parents: [],
            pos: {x: object.pos.x, y: object.pos.y},
            drawRotPoint: {x: object.drawRotPoint.x, y: object.drawRotPoint.y},
            isChild: true,
        }
        incrementCounter();
        attack.parents.push(object);
        const newElements = allElements.push(attack);
        addElements(newElements);
        changingPlayer();
    }


    const attackIcons = () => {
        const icons = getAllAttacks();

        return Object.keys(icons).map((key) => {
            return (
                <img 
                key={key} 
                src={getIcon(key as AttackShape)}
                alt={key}
                onClick={e => configureAttack(getAttack(key as AttackShape))} 
                />
            )
        })
    }

    return (
        <>
            <Section title="Attacks">{attackIcons()}</Section>
        </>
    );
}