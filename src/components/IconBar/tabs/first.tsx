import Section from '../../section';
import { getSortedDraggablePlayerIcons } from '../../../utils/loadIcons';
import { getWaymarkDragIcons } from '../../../utils/loadWaymarks';

export default function Objects() {
    return (
        <div>
            <Section title='Waymarks'>{getWaymarkDragIcons()}</Section>
            <Section title='Jobs'>{getSortedDraggablePlayerIcons()}</Section>
        </div>
    )
}

