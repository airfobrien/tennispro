import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    const result = cn('base-class', 'additional-class');
    expect(result).toBe('base-class additional-class');
  });

  it('handles conditional classes', () => {
    const result = cn('base', true && 'included', false && 'excluded');
    expect(result).toBe('base included');
  });

  it('handles undefined and null values', () => {
    const result = cn('base', undefined, null, 'end');
    expect(result).toBe('base end');
  });

  it('merges tailwind classes correctly', () => {
    const result = cn('px-4 py-2', 'px-6'); // px-6 should override px-4
    expect(result).toBe('py-2 px-6');
  });

  it('handles empty input', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('handles object syntax', () => {
    const result = cn({
      'active-class': true,
      'inactive-class': false,
    });
    expect(result).toBe('active-class');
  });

  it('handles array syntax', () => {
    const result = cn(['class-a', 'class-b']);
    expect(result).toBe('class-a class-b');
  });
});
