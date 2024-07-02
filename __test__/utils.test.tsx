import format, { mod } from '@/utils';

describe('utils', () => {
  it('format', () => {
    expect(format(2.999)).toBe(3);
  });

  it('mod', () => {
    expect(mod(987654321)).toBe('987.65m');
    expect(mod(100)).toBe(100);
  });
});
