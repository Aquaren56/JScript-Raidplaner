import Section from '../../section';
import { getSortedDraggablePlayerIcons } from '../../../utils/loadIcons';
import { getWaymarkDragIcons } from '../../../utils/loadWaymarks';
import { getLcDragIcons } from '../../../utils/loadLimitCut';

export default function Objects() {
    return (
        <div>
            <Section title='Waymarks'>{getWaymarkDragIcons()}</Section>
            <Section title='Jobs'>{getSortedDraggablePlayerIcons()}</Section>
            <Section title='Limit Cuts'>{getLcDragIcons()}</Section>
        </div>
    )
}

