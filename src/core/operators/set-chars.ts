import {eventsAppend} from '../../internal/events/events-append';
import {escapeHtml} from '../../internal/utils/escape-html';
import {splitCss} from '../../internal/utils/split-css';
import {EventsOperator} from '../event-queue';
import {SetEvent} from '../events';
import {CssClassEvent} from '../events/css-class.event';

/**
 * Inserts a string immediately into the buffer without a delay.
 */
export function setChars(value: string): EventsOperator {
    return eventsAppend(() => {
        return splitCss(escapeHtml(value),
            (css) => ({type: 'css', value: css, delay: 0} as CssClassEvent),
            (text) => ({type: 'set', value: text, delay: 0} as SetEvent)
        );
    });
}
