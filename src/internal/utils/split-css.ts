import {DelayEvent} from '../../core/events';

export function splitCss(value: string, css: (value: string) => DelayEvent, text: (value: string) => DelayEvent): DelayEvent[] {
    return value
        .split(/({{[_\-a-z0-9\s]+}}|{{}})/i)
        .map(str => {
            const m = str.match(/{{([_\-a-z0-9\s]+)|{{}}/i);
            return m ? css(m[1]) : text(str);
        });
}
