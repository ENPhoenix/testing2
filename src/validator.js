/**
 * Credit Card Validator
 * Реализация алгоритма Луна и определения платёжной системы
 */

/**
 * Проверка номера карты по алгоритму Луна
 * @param {string} cardNumber - Номер карты (может содержать пробелы и дефисы)
 * @returns {boolean} - true если номер валиден
 */
function isValidCardNumber(cardNumber) {
  // Удаляем все символы кроме цифр
  const digits = cardNumber.replace(/\D/g, '');
  
  // Номер карты должен быть от 13 до 19 цифр
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }
  
  // Алгоритм Луна
  let sum = 0;
  let isEven = false;
  
  // Проходим с конца числа
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

/**
 * Определение платёжной системы по номеру карты
 * @param {string} cardNumber - Номер карты
 * @returns {string} - Название платёжной системы или 'unknown'
 */
function getCardType(cardNumber) {
  // Удаляем все символы кроме цифр
  const digits = cardNumber.replace(/\D/g, '');
  
  // Определение платёжных систем по BIN/IIN
  
  // Мир: начинается с 2200-2204 (проверяем ДО MasterCard!)
  if (/^220[0-4]/.test(digits)) {
    return 'mir';
  }
  
  // Visa: начинается с 4
  if (/^4/.test(digits)) {
    return 'visa';
  }
  
  // MasterCard: начинается с 51-55 или 2221-2720
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) {
    return 'mastercard';
  }
  
  // American Express: начинается с 34 или 37
  if (/^3[47]/.test(digits)) {
    return 'amex';
  }
  
  // Discover: начинается с 6011, 622126-622925, 644-649, 65
  if (/^6011/.test(digits) || /^65/.test(digits) || /^64[4-9]/.test(digits) || /^62212[6-9]/.test(digits) || /^6229[2-5]/.test(digits)) {
    return 'discover';
  }
  
  // JCB: начинается с 3528-3589
  if (/^35[2-8]/.test(digits) || /^35[89]/.test(digits)) {
    return 'jcb';
  }
  
  return 'unknown';
}

/**
 * Форматирование номера карты (добавление пробелов)
 * @param {string} cardNumber - Номер карты
 * @returns {string} - Отформатированный номер
 */
function formatCardNumber(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');
  const cardType = getCardType(digits);
  
  // Форматирование в зависимости от типа карты
  switch (cardType) {
    case 'amex':
      // 4-6-5 (American Express)
      return digits.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3').trim();
    case 'visa':
    case 'mastercard':
    case 'mir':
    case 'discover':
    case 'jcb':
    default:
      // 4-4-4-4 (стандарт)
      return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  }
}

// CommonJS экспорт
module.exports = {
  isValidCardNumber,
  getCardType,
  formatCardNumber
};

// ES Module экспорт (для совместимости с webpack)
module.exports.default = {
  isValidCardNumber,
  getCardType,
  formatCardNumber
};

