import Section from '../../section';
import { loadAttacks } from '../../../utils/loadAttacks';

export default function Attacks() {
    return (
        <div>
            <Section title='Attackshapes'>{loadAttacks()}</Section>
        </div>
    )
}

