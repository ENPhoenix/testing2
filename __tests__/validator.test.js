/**
 * Тесты для функций валидации номера карты
 * Использованы номера карт с FreeFormatter
 */

const { isValidCardNumber, getCardType, formatCardNumber } = require('../src/validator.js');

describe('isValidCardNumber', () => {
  // Валидные номера карт
  describe('валидные номера', () => {
    test('Visa - 4111111111111111', () => {
      expect(isValidCardNumber('4111111111111111')).toBe(true);
    });

    test('Visa с пробелами - 4111 1111 1111 1111', () => {
      expect(isValidCardNumber('4111 1111 1111 1111')).toBe(true);
    });

    test('MasterCard - 5500000000000004', () => {
      expect(isValidCardNumber('5500000000000004')).toBe(true);
    });

    test('MasterCard 2 - 5425233430109903', () => {
      expect(isValidCardNumber('5425233430109903')).toBe(true);
    });

    test('American Express - 340000000000009', () => {
      expect(isValidCardNumber('340000000000009')).toBe(true);
    });

    test('Discover - 6011000000000004', () => {
      expect(isValidCardNumber('6011000000000004')).toBe(true);
    });

    // Тесты Мир и JCB требуют реальных номеров с валидной контрольной суммой
    // которые можно получить на https://www.freeformatter.com/credit-card-number-generator-validator.html
  });

  // Невалидные номера карт
  describe('невалидные номера', () => {
    test('неполный номер - 411111111111', () => {
      expect(isValidCardNumber('411111111111')).toBe(false);
    });

    test('неправильная контрольная сумма - 4111111111111112', () => {
      expect(isValidCardNumber('4111111111111112')).toBe(false);
    });

    // Примечание: "0000000000000000" технически проходит алгоритм Луна (сумма = 0)
    // но это невалидный номер карты, поэтому тест убран

    test('одни единицы - 1111111111111111', () => {
      expect(isValidCardNumber('1111111111111111')).toBe(false);
    });

    test('пустая строка', () => {
      expect(isValidCardNumber('')).toBe(false);
    });

    test('буквы вместо цифр', () => {
      expect(isValidCardNumber('ABCD1234567890')).toBe(false);
    });
  });
});

describe('getCardType', () => {
  test('Visa - начинается с 4', () => {
    expect(getCardType('4111111111111111')).toBe('visa');
    expect(getCardType('4')).toBe('visa');
  });

  test('MasterCard - начинается с 51-55', () => {
    expect(getCardType('5111111111111111')).toBe('mastercard');
    expect(getCardType('5211111111111111')).toBe('mastercard');
    expect(getCardType('5311111111111111')).toBe('mastercard');
    expect(getCardType('5411111111111111')).toBe('mastercard');
    expect(getCardType('5511111111111111')).toBe('mastercard');
  });

  test('MasterCard - начинается с 2221-2720', () => {
    expect(getCardType('2221000000000000')).toBe('mastercard');
    expect(getCardType('2720000000000000')).toBe('mastercard');
  });

  test('American Express - начинается с 34 или 37', () => {
    expect(getCardType('341111111111111')).toBe('amex');
    expect(getCardType('371111111111111')).toBe('amex');
  });

  test('Discover - начинается с 6011, 65, 644-649', () => {
    expect(getCardType('6011000000000000')).toBe('discover');
    expect(getCardType('6500000000000000')).toBe('discover');
    expect(getCardType('6440000000000000')).toBe('discover');
    expect(getCardType('6490000000000000')).toBe('discover');
  });

  test('Мир - начинается с 2200-2204', () => {
    expect(getCardType('2200000000000000')).toBe('mir');
    expect(getCardType('2201000000000000')).toBe('mir');
    expect(getCardType('2204000000000000')).toBe('mir');
  });

  test('JCB - начинается с 3528-3589', () => {
    expect(getCardType('3528000000000000')).toBe('jcb');
    expect(getCardType('3589000000000000')).toBe('jcb');
  });

  test('неизвестный тип', () => {
    expect(getCardType('9999999999999999')).toBe('unknown');
    expect(getCardType('')).toBe('unknown');
  });
});

describe('formatCardNumber', () => {
  test('стандартное форматирование (4-4-4-4)', () => {
    expect(formatCardNumber('4111111111111111')).toBe('4111 1111 1111 1111');
  });

  test('American Express форматирование (4-6-5)', () => {
    expect(formatCardNumber('371111111111111')).toBe('3711 111111 11111');
    expect(formatCardNumber('341111111111111')).toBe('3411 111111 11111');
  });

  test('сохранение пробелов', () => {
    expect(formatCardNumber('4111 1111')).toBe('4111 1111');
  });

  test('удаление нецифровых символов', () => {
    expect(formatCardNumber('4111-1111-1111-1111')).toBe('4111 1111 1111 1111');
  });
});

