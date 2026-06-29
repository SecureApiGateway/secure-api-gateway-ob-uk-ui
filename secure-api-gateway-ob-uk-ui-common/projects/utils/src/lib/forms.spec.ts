import { FormControl } from '@angular/forms';
import { validateUrl, validateMultipleUrls } from './forms';

describe('validateUrl', () => {
  it('should return null for a valid https URL', () => {
    const control = new FormControl('https://example.com');
    expect(validateUrl(control)).toBeNull();
  });

  it('should return null for a valid http URL', () => {
    const control = new FormControl('http://example.com/path');
    expect(validateUrl(control)).toBeNull();
  });

  it('should return null when value is empty', () => {
    const control = new FormControl('');
    expect(validateUrl(control)).toBeNull();
  });

  it('should return null when value is null', () => {
    const control = new FormControl(null);
    expect(validateUrl(control)).toBeNull();
  });

  it('should return error for an invalid URL', () => {
    const control = new FormControl('not-a-url');
    expect(validateUrl(control)).toEqual({ validateUrl: { valid: false } });
  });

  it('should return error for a URL without TLD', () => {
    const control = new FormControl('http://localhost');
    expect(validateUrl(control)).toEqual({ validateUrl: { valid: false } });
  });
});

describe('validateMultipleUrls', () => {
  it('should return null for a single valid URL', () => {
    const control = new FormControl('https://example.com');
    expect(validateMultipleUrls(control)).toBeNull();
  });

  it('should return null for multiple valid URLs separated by commas', () => {
    const control = new FormControl('https://example.com, https://other.com/path');
    expect(validateMultipleUrls(control)).toBeNull();
  });

  it('should return null when value is empty', () => {
    const control = new FormControl('');
    expect(validateMultipleUrls(control)).toBeNull();
  });

  it('should return error when at least one URL is invalid', () => {
    const control = new FormControl('https://example.com, not-a-url');
    expect(validateMultipleUrls(control)).toEqual({ validateMultipleUrls: { valid: false } });
  });

  it('should return error when all URLs are invalid', () => {
    const control = new FormControl('bad1, bad2');
    expect(validateMultipleUrls(control)).toEqual({ validateMultipleUrls: { valid: false } });
  });
});
