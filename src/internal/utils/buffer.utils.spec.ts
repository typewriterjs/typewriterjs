import {BufferEvent} from '../../core/events';
import {isFirstRow} from './buffer-utils';

it('should be the first row', () => {
    expect(isFirstRow({row: 0} as BufferEvent)).toBeTruthy();
    expect(isFirstRow({row: 1} as BufferEvent)).toBeFalsy();
});
