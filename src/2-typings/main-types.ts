/*
enum NUMBERS_DECLINES {
  TEN = 10,
  ONE_HUNDRED = 100,
  ONE_THOUSAND = 1000,
  ONE_MILLION = 1000000,
  ONE_BILLION = 1000000000, //         1.000.000.000 (9)
  ONE_TRILLION = 1000000000000, //     1.000.000.000.000 (12)
  ONE_QUADRILLION = 1000000000000000, // 1.000.000.000.000.000 (15)
  MAX = 9007199254740992, // 9.007.199.254.740.992 (15)
}

const LESS_THAN_TWENTY: string[] = [
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
const TENTHS_LESS_THAN_HUNDRED: string[] = [
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
const ENDS_WITH_DOUBLE_ZERO_PATTERN: RegExp =
  /(hundred|thousand|(m|b|tr|quadr)illion)$/;
const ENDS_WITH_TEEN_PATTERN: RegExp = /teen$/;
const ENDS_WITH_Y_PATTERN: RegExp = /y$/;
const ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN: RegExp =
  /(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)$/;
const ordinalLessThanThirteen: { [key: string]: string } = {
  zero: 'zeroth',
  one: 'first',
  two: 'second',
  three: 'third',
  four: 'fourth',
  five: 'fifth',
  six: 'sixth',
  seven: 'seventh',
  eight: 'eighth',
  nine: 'ninth',
  ten: 'tenth',
  eleven: 'eleventh',
  twelve: 'twelfth',
};

function isFinite(num: number): boolean {
  return Number.isFinite(num);
}

function isSafeNumber(num: number): boolean {
  return Number.isSafeInteger(num);
}

function makeOrdinal(words: string) {
  // Ends with *00 (100, 1000, etc.) or *teen (13, 14, 15, 16, 17, 18, 19)
  if (
    ENDS_WITH_DOUBLE_ZERO_PATTERN.test(words) ||
    ENDS_WITH_TEEN_PATTERN.test(words)
  ) {
    return words + 'th';
  }
  // Ends with *y (20, 30, 40, 50, 60, 70, 80, 90)
  else if (ENDS_WITH_Y_PATTERN.test(words)) {
    return words.replace(ENDS_WITH_Y_PATTERN, 'ieth');
  }
  // Ends with one through twelve
  else if (
    ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN.test(words)
  ) {
    return words.replace(
      ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN,
      replaceWithOrdinalVariant,
    );
  }
  return words;
}

function replaceWithOrdinalVariant(numberWord: string) {
  return ordinalLessThanThirteen[numberWord];
}
*/
/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'twelve'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] - Deprecated, use toWordsOrdinal() instead!
 * @returns {string}
 */
/*
function toWords(
  number: string | number,
  asOrdinal: boolean,
): string {
  let words: string = '';
  const num = parseInt(number as string, 10);

  if (!isFinite(num)) {
    throw new TypeError(
      'Not a finite number: ' +
        number +
        ' (' +
        typeof number +
        ')',
    );
  }
  if (!isSafeNumber(num)) {
    throw new RangeError(
      'Input is not a safe number, it’s either too large or too small.',
    );
  }
  words = generateWords(num);
  return asOrdinal ? makeOrdinal(words) : words;
}

function generateWords(
  number: number,
  wordArr?: string[],
): string {
  let remainder: number = 0,
    word: string = '',
    words: string[] = wordArr ? arguments[1] : [];

  // We’re done
  if (number === 0) {
    return !words
      ? 'zero'
      : words.join(' ').replace(/,$/, '');
  }
  // First run
  if (!words) {
    words = [];
  }
  // If negative, prepend “minus”
  if (number < 0) {
    words.push('minus');
    number = Math.abs(number);
  }

  if (number < 20) {
    remainder = 0;
    word = LESS_THAN_TWENTY[number];
  } else if (number < NUMBERS_DECLINES.ONE_HUNDRED) {
    remainder = number % NUMBERS_DECLINES.TEN;
    word =
      TENTHS_LESS_THAN_HUNDRED[
        Math.floor(number / NUMBERS_DECLINES.TEN)
      ];
    // In case of remainder, we need to handle it here to be able to add the “-”
    if (remainder) {
      word += '-' + LESS_THAN_TWENTY[remainder];
      remainder = 0;
    }
  } else if (number < NUMBERS_DECLINES.ONE_THOUSAND) {
    remainder = number % NUMBERS_DECLINES.ONE_HUNDRED;
    word =
      generateWords(
        Math.floor(number / NUMBERS_DECLINES.ONE_HUNDRED),
      ) + ' hundred';
  } else if (number < NUMBERS_DECLINES.ONE_MILLION) {
    remainder = number % NUMBERS_DECLINES.ONE_THOUSAND;
    word =
      generateWords(
        Math.floor(number / NUMBERS_DECLINES.ONE_THOUSAND),
      ) + ' thousand,';
  } else if (number < NUMBERS_DECLINES.ONE_BILLION) {
    remainder = number % NUMBERS_DECLINES.ONE_MILLION;
    word =
      generateWords(
        Math.floor(number / NUMBERS_DECLINES.ONE_MILLION),
      ) + ' million,';
  } else if (number < NUMBERS_DECLINES.ONE_TRILLION) {
    remainder = number % NUMBERS_DECLINES.ONE_BILLION;
    word =
      generateWords(
        Math.floor(number / NUMBERS_DECLINES.ONE_BILLION),
      ) + ' billion,';
  } else if (number < NUMBERS_DECLINES.ONE_QUADRILLION) {
    remainder = number % NUMBERS_DECLINES.ONE_TRILLION;
    word =
      generateWords(
        Math.floor(number / NUMBERS_DECLINES.ONE_TRILLION),
      ) + ' trillion,';
  } else if (number <= NUMBERS_DECLINES.MAX) {
    remainder = number % NUMBERS_DECLINES.ONE_QUADRILLION;
    word =
      generateWords(
        Math.floor(
          number / NUMBERS_DECLINES.ONE_QUADRILLION,
        ),
      ) + ' quadrillion,';
  }

  words.push(word);
  return generateWords(remainder, words);
}

export default toWords;
*/