import { DateFormatPipe } from './forgerock-date-format.pipe';

describe('DateFormatPipe', () => {
  let pipe: DateFormatPipe;

  beforeEach(() => {
    pipe = new DateFormatPipe();
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should throw when date is null', () => {
    expect(() => pipe.transform(null)).toThrow('dateFormat needs a date');
  });

  it('should throw when date is undefined', () => {
    expect(() => pipe.transform(undefined)).toThrow('dateFormat needs a date');
  });

  it('should return a non-empty string for a Date object', () => {
    const date = new Date(2024, 0, 15);
    const result = pipe.transform(date, 'yyyy-MM-dd');
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });

  it('should return a non-empty string for a date string', () => {
    const result = pipe.transform('2024-06-01', 'yyyy-MM-dd');
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });

  it('should handle a timestamp (number) without throwing', () => {
    const timestamp = new Date(2024, 5, 1).getTime();
    const result = pipe.transform(timestamp, 'yyyy-MM-dd');
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });

  it('should return the original value as string on invalid date string', () => {
    const result = pipe.transform('not-a-date', 'yyyy-MM-dd');
    expect(result).toBe('not-a-date');
  });
});
