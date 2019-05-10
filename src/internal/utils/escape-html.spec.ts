import {escapeHtml} from './escape-html';

it('should escape HTML', () => {
    expect(escapeHtml('&')).toBe('&amp;');
    expect(escapeHtml('<')).toBe('&lt;');
    expect(escapeHtml('>')).toBe('&gt;');
    expect(escapeHtml('"')).toBe('&quot;');
    expect(escapeHtml('\'')).toBe('&#039;');
    expect(escapeHtml('<span>test</span>')).toBe('&lt;span&gt;test&lt;/span&gt;');
});
