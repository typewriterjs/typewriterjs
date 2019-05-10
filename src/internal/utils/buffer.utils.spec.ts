import {BufferEvent} from '../../core/events';
import {isEmptyFile, isEndOfFile, isEndOfLine, isFirstRow, isLastRow, isOutOfRange, isStartOfFile, isStartOfLine} from './buffer-utils';

/**
 * Builds a buffer object that can be used for testing.
 */
function buffer(value?: string | string[]): BufferEvent {
    const b: BufferEvent = {type: 'buffer', row: 0, column: 0, css: '', text: []};
    if (value) {
        (value instanceof Array ? value : [value]).forEach(str => b.text.push(str.split('').map(char => ({char, css: ''}))));
    }
    return b;
}

it('should be the first row', () => {
    expect(isFirstRow(buffer())).toBe(true);
    expect(isFirstRow({...buffer(), row: 1})).toBe(false);
});

it('should be the last row', () => {
    expect(isLastRow(buffer())).toBe(true);
    expect(isLastRow({...buffer(['abc', 'efj']), row: 1})).toBe(true);
    expect(isLastRow({...buffer(['abc', 'efj']), row: 0})).toBe(false);
});

it('should be the end of the line', () => {
    expect(isEndOfLine(buffer())).toBe(true);
    expect(isEndOfLine({...buffer('abcdefg'), column: 7})).toBe(true);
    expect(isEndOfLine({...buffer('abcdefg'), column: 0})).toBe(false);
});

it('should be the start of a line', () => {
    expect(isStartOfLine(buffer())).toBe(true);
    expect(isStartOfLine(buffer('abcdefg'))).toBe(true);
    expect(isStartOfLine({...buffer('abcdefg'), column: 1})).toBe(false);
});

it('should be out of range', () => {
    expect(isOutOfRange(buffer())).toBe(false);
    expect(isOutOfRange({...buffer('abcdefg'), row: -1})).toBe(true);
    expect(isOutOfRange({...buffer('abcdefg'), row: 1})).toBe(true);
    expect(isOutOfRange({...buffer('abcdefg'), column: -1})).toBe(true);
    expect(isOutOfRange({...buffer('abcdefg'), column: 8})).toBe(true);
    expect(isOutOfRange(buffer('abcdefg'))).toBe(false);
});

it('should be start of file', () => {
    expect(isStartOfFile(buffer())).toBe(true);
    expect(isStartOfFile(buffer(['abcdefg', 'hijklmn']))).toBe(true);
    expect(isStartOfFile({...buffer(['abcdefg', 'hijklmn']), row: 1, column: 1})).toBe(false);
});

it('should be end of file', () => {
    expect(isEndOfFile(buffer())).toBe(true);
    expect(isEndOfFile(buffer(['abcdefg', 'hijklmn']))).toBe(false);
    expect(isEndOfFile({...buffer(['abcdefg', 'hijklmn']), row: 1, column: 7})).toBe(true);
});

it('should be an empty file', () => {
    expect(isEmptyFile(buffer())).toBe(true);
    expect(isEmptyFile(buffer('abc'))).toBe(false);
});
