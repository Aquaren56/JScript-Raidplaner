import { Objects, Attacks } from '../../../types';
import { getAllAttacks, getIcon, AttackShape, getAttack } from '../../../utils/loadAttacks';
import Section from '../../section';

interface Props {
    object: Objects;
    changingPlayer: Function;
}


export default function AttackAttachments({ object, changingPlayer }: Props) {
    const configureAttack = (attack: Attacks) => {
        attack = {
            ...attack,
            pos: {x: object.pos.x, y: object.pos.y},
            drawRotPoint: {x: object.drawRotPoint.x, y: object.drawRotPoint.y},
            isChild: true,
        }
        object.children.push(attack);
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