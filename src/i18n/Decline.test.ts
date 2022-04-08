import { DeclinePhrases, getWithDecline } from 'src/i18n/Decline';

const config: DeclinePhrases = [
  'нет записей',
  'запись',
  'записи',
  'записей',
] as never;

describe('Check decliner', () => {
  test('counter is zero', () => {
    expect(getWithDecline(0, config)).toBe('нет записей');
  });

  test('returned `запись`', () => {
    expect(getWithDecline(1, config)).toBe('запись');
    expect(getWithDecline(21, config)).toBe('запись');
    expect(getWithDecline(491, config)).toBe('запись');
  });

  test('returned `записи`', () => {
    expect(getWithDecline(2, config)).toBe('записи');
    expect(getWithDecline(4, config)).toBe('записи');
    expect(getWithDecline(22, config)).toBe('записи');
    expect(getWithDecline(573, config)).toBe('записи');
  });

  test('returned `записей`', () => {
    expect(getWithDecline(5, config)).toBe('записей');
    expect(getWithDecline(11, config)).toBe('записей');
    expect(getWithDecline(200, config)).toBe('записей');
  });
});
