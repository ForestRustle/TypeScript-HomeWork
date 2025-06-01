const makeOrdinal: any = require('./makeOrdinal');
const isFinite: any = require('./isFinite');
const isSafeNumber: any = require('./isSafeNumber');

enum NUMBERS {
  TEN = 10,
  ONE_HUNDRED = 100,
  ONE_THOUSAND = 1_000,
  ONE_MILLION = 1_000_000,
  ONE_BILLION = 1_000_000_000,
  ONE_TRILLION = 1_000_000_000_000,
  ONE_QUADRILLION = 1_000_000_000_000_000,
}

const MAX: bigint = 9007199254740992n;

const LESS_THAN_TWENTY: Array<string> = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
];

const TENTHS_LESS_THAN_HUNDRED: Array<string> = [
  'zero',
  'ten',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
];

function toWords(number: string, asOrdinal: boolean) {
  let words: string;
  const num: number = parseInt(number, 10);
  if (!isFinite(num)) {
    throw new TypeError(
      'Not a finite number: ' + number + ' (' + typeof number + ')'
    );
  }
  if (!isSafeNumber(num)) {
    throw new RangeError(
      'Input is not a safe number, it’s either too large or too small.'
    );
  }
  words = generateWords(num);
  return asOrdinal ? makeOrdinal(words) : words;
}

function generateWords(number: number, words: string[] = []): string {
  //Присвоить начальные значения для избежания ошибки "используется перед назначением"
  let remainder: number = 0;
  let word: string = '';
  if (number === 0) {
    return !words ? 'zero' : words.join(' ').replace(/,$/, '');
  }
  if (!words) {
    words = [];
  }
  if (number < 0) {
    words.push('minus');
    number = Math.abs(number);
  }
  if (number < 20) {
    remainder = 0;
    word = LESS_THAN_TWENTY[number];
  } else if (number < NUMBERS.ONE_HUNDRED) {
    remainder = number % NUMBERS.TEN;
    word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / NUMBERS.TEN)];
    if (remainder) {
      word += '-' + LESS_THAN_TWENTY[remainder];
      remainder = 0;
    }
  } else if (number < NUMBERS.ONE_THOUSAND) {
    remainder = number % NUMBERS.ONE_HUNDRED;
    word = generateWords(Math.floor(number / NUMBERS.ONE_HUNDRED)) + ' hundred';
  } else if (number < NUMBERS.ONE_MILLION) {
    remainder = number % NUMBERS.ONE_THOUSAND;
    word =
      generateWords(Math.floor(number / NUMBERS.ONE_THOUSAND)) + ' thousand,';
  } else if (number < NUMBERS.ONE_BILLION) {
    remainder = number % NUMBERS.ONE_MILLION;
    word =
      generateWords(Math.floor(number / NUMBERS.ONE_MILLION)) + ' million,';
  } else if (number < NUMBERS.ONE_TRILLION) {
    remainder = number % NUMBERS.ONE_BILLION;
    word =
      generateWords(Math.floor(number / NUMBERS.ONE_BILLION)) + ' billion,';
  } else if (number < NUMBERS.ONE_QUADRILLION) {
    remainder = number % NUMBERS.ONE_TRILLION;
    word =
      generateWords(Math.floor(number / NUMBERS.ONE_TRILLION)) + ' trillion,';
  } else if (number <= MAX) {
    remainder = number % NUMBERS.ONE_QUADRILLION;
    word =
      generateWords(Math.floor(number / NUMBERS.ONE_QUADRILLION)) +
      ' quadrillion,';
  }
  words.push(word);
  return generateWords(remainder, words);
}
