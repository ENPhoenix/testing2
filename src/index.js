/**
 * Credit Card Validator - Main Application
 * Обработка взаимодействия с DOM
 */

import './style.css';
const { isValidCardNumber, getCardType, formatCardNumber } = require('./validator.js');

class CreditCardValidator {
  constructor() {
    this.cardInput = document.getElementById('cardNumber');
    this.validateBtn = document.getElementById('validateBtn');
    this.validationResult = document.getElementById('validationResult');
    
    // Иконки карт
    this.cardLogos = {
      'visa': document.getElementById('cardVisa'),
      'mastercard': document.getElementById('cardMastercard'),
      'amex': document.getElementById('cardAmex'),
      'discover': document.getElementById('cardDiscover'),
      'mir': document.getElementById('cardMir'),
      'jcb': document.getElementById('cardJcb')
    };
    
    this.init();
  }
  
  init() {
    // Слушатель ввода - форматирование номера карты
    this.cardInput.addEventListener('input', this.handleInput.bind(this));
    
    // Слушатель кнопки
    this.validateBtn.addEventListener('click', this.handleValidate.bind(this));
    
    // Enter key to validate
    this.cardInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleValidate();
      }
    });
  }
  
  handleInput(event) {
    let value = event.target.value;
    
    // Форматируем номер карты
    const formatted = formatCardNumber(value);
    event.target.value = formatted;
    
    // Получаем только цифры для определения типа
    const digits = value.replace(/\D/g, '');
    
    // Определяем тип карты и подсвечиваем
    if (digits.length >= 1) {
      const cardType = getCardType(digits);
      this.highlightCardType(cardType);
    } else {
      this.clearHighlight();
    }
    
    // Очищаем результат при вводе
    this.clearValidation();
  }
  
  handleValidate() {
    const value = this.cardInput.value;
    const digits = value.replace(/\D/g, '');
    
    if (digits.length < 13) {
      this.showResult('Введите номер карты (минимум 13 цифр)', false);
      return;
    }
    
    const isValid = isValidCardNumber(digits);
    const cardType = getCardType(digits);
    
    // Подсвечиваем тип карты
    this.highlightCardType(cardType);
    
    // Показываем результат
    const typeNames = {
      'visa': 'Visa',
      'mastercard': 'MasterCard',
      'amex': 'American Express',
      'discover': 'Discover',
      'mir': 'Мир',
      'jcb': 'JCB',
      'unknown': 'Неизвестная карта'
    };
    
    const typeName = typeNames[cardType] || 'Неизвестная карта';
    
    if (isValid) {
      this.showResult(`Номер карты валиден (${typeName})`, true);
    } else {
      this.showResult(`Номер карты невалиден (${typeName})`, false);
    }
  }
  
  highlightCardType(cardType) {
    // Очищаем все подсветки
    this.clearHighlight();
    
    // Подсвечиваем нужную карту
    if (this.cardLogos[cardType]) {
      this.cardLogos[cardType].classList.add('active');
    }
  }
  
  clearHighlight() {
    Object.values(this.cardLogos).forEach(logo => {
      logo.classList.remove('active');
    });
  }
  
  showResult(message, isValid) {
    this.validationResult.textContent = message;
    this.validationResult.className = `validation-result ${isValid ? 'valid' : 'invalid'}`;
    
    // Обновляем класс инпута
    this.cardInput.classList.remove('valid', 'invalid');
    this.cardInput.classList.add(isValid ? 'valid' : 'invalid');
  }
  
  clearValidation() {
    this.validationResult.textContent = '';
    this.validationResult.className = 'validation-result';
    this.cardInput.classList.remove('valid', 'invalid');
  }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  new CreditCardValidator();
});

export default CreditCardValidator;

