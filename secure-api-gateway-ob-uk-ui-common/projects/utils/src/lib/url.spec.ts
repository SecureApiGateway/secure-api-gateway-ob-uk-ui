import { encodeQueryData, removeLeadingSlash, replaceURLOrigin } from './url';

describe('encodeQueryData', () => {
  it('should return empty string for empty object', () => {
    expect(encodeQueryData({})).toBe('');
  });

  it('should return empty string when called with no args', () => {
    expect(encodeQueryData()).toBe('');
  });

  it('should encode single key/value pair', () => {
    expect(encodeQueryData({ foo: 'bar' })).toBe('?foo=bar');
  });

  it('should encode multiple key/value pairs', () => {
    const result = encodeQueryData({ a: '1', b: '2' });
    expect(result).toBe('?a=1&b=2');
  });

  it('should percent-encode special characters', () => {
    const result = encodeQueryData({ redirect: 'http://example.com/path?x=1' });
    expect(result).toContain('redirect=');
    expect(result).toContain('%3A');
  });
});

describe('removeLeadingSlash', () => {
  it('should remove a single leading slash', () => {
    expect(removeLeadingSlash('/foo')).toBe('foo');
  });

  it('should remove multiple leading slashes', () => {
    expect(removeLeadingSlash('///foo/bar')).toBe('foo/bar');
  });

  it('should return the string unchanged when no leading slash', () => {
    expect(removeLeadingSlash('foo/bar')).toBe('foo/bar');
  });

  it('should return empty string for empty input', () => {
    expect(removeLeadingSlash('')).toBe('');
  });

  it('should return empty string when called with no args', () => {
    expect(removeLeadingSlash()).toBe('');
  });
});

describe('replaceURLOrigin', () => {
  it('should replace the origin with a new origin', () => {
    expect(replaceURLOrigin('https://old.com/path/to/page', 'https://new.com')).toBe('https://new.com/path/to/page');
  });

  it('should strip the origin when newOrigin is empty string', () => {
    expect(replaceURLOrigin('https://old.com/path', '')).toBe('/path');
  });

  it('should preserve the path, query and fragment', () => {
    expect(replaceURLOrigin('https://old.com/path?q=1#hash', 'https://new.com')).toBe(
      'https://new.com/path?q=1#hash'
    );
  });
});
