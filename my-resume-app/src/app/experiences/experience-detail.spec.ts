import { ExperienceDetailPipe } from './experience-detail.pipe';

describe('ExperienceDetailPipe', () => {
  const pipe = new ExperienceDetailPipe();
  
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should passthrough a string to an array of one element without a bullet point', () => {
    const expectedDetail = 'A single string to transform.';
    const transformed = pipe.transform(expectedDetail);
    expect(transformed).toEqual([expectedDetail]);
  });

  it('should format an array as a bulleted list', () => {
    const expectedDetail = [
      'Element one',
      'Element two',
      'one more time'
    ];
    const transformed = pipe.transform(expectedDetail);
    expect(transformed.length).toBe(expectedDetail.length);
    transformed.forEach(value => {
      expect(value.startsWith('•')).toBeTrue();
    });
  });

  it('should trim any whitespace from the beginning of list elements when input is an array of strings', () => {
    const expectedDetail = [
      'Element one',
      '   Element two',
      ' ele 3'
    ];
    const transformed = pipe.transform(expectedDetail);
    transformed.forEach(value => {
      expect(value.length).toBe(value.trimStart().length);
    });
  });

  it('should not append an extra bullet point if one already exists when input is an array of strings', () => {
    const expectedDetail = [
      '• howdy',
      ' • partner',
      '  one two three'
    ];
    const transformed = pipe.transform(expectedDetail);
    transformed.forEach(value => {
      expect(value.startsWith('•')).toBeTrue();
      expect(value.indexOf('•', 1)).toBe(-1);
    });    
  });

  it('should return an empty array if receiving an unexpected input type', () => {
    const expectedDetail: {data?: string} = {};
    // use as never to disable type-checking, at runtime a database could return
    // an unexpected data type like this nullable object
    const transformed = pipe.transform(expectedDetail as never);
    expect(transformed.length).toBe(0);
    expect(Array.isArray(transformed)).toBeTrue();
  });
});
