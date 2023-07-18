"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NUMBERS_DECLINES;
(function (NUMBERS_DECLINES) {
    NUMBERS_DECLINES[NUMBERS_DECLINES["TEN"] = 10] = "TEN";
    NUMBERS_DECLINES[NUMBERS_DECLINES["ONE_HUNDRED"] = 100] = "ONE_HUNDRED";
    NUMBERS_DECLINES[NUMBERS_DECLINES["ONE_THOUSAND"] = 1000] = "ONE_THOUSAND";
    NUMBERS_DECLINES[NUMBERS_DECLINES["ONE_MILLION"] = 1000000] = "ONE_MILLION";
    NUMBERS_DECLINES[NUMBERS_DECLINES["ONE_BILLION"] = 1000000000] = "ONE_BILLION";
    NUMBERS_DECLINES[NUMBERS_DECLINES["ONE_TRILLION"] = 1000000000000] = "ONE_TRILLION";
    NUMBERS_DECLINES[NUMBERS_DECLINES["ONE_QUADRILLION"] = 1000000000000000] = "ONE_QUADRILLION";
    NUMBERS_DECLINES[NUMBERS_DECLINES["MAX"] = 9007199254740992] = "MAX";
})(NUMBERS_DECLINES || (NUMBERS_DECLINES = {}));
const LESS_THAN_TWENTY = [
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
const TENTHS_LESS_THAN_HUNDRED = [
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
const ENDS_WITH_DOUBLE_ZERO_PATTERN = /(hundred|thousand|(m|b|tr|quadr)illion)$/;
const ENDS_WITH_TEEN_PATTERN = /teen$/;
const ENDS_WITH_Y_PATTERN = /y$/;
const ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN = /(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)$/;
const ordinalLessThanThirteen = {
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
function isFinite(num) {
    return Number.isFinite(num);
}
function isSafeNumber(num) {
    return Number.isSafeInteger(num);
}
function makeOrdinal(words) {
    // Ends with *00 (100, 1000, etc.) or *teen (13, 14, 15, 16, 17, 18, 19)
    if (ENDS_WITH_DOUBLE_ZERO_PATTERN.test(words) ||
        ENDS_WITH_TEEN_PATTERN.test(words)) {
        return words + 'th';
    }
    // Ends with *y (20, 30, 40, 50, 60, 70, 80, 90)
    else if (ENDS_WITH_Y_PATTERN.test(words)) {
        return words.replace(ENDS_WITH_Y_PATTERN, 'ieth');
    }
    // Ends with one through twelve
    else if (ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN.test(words)) {
        return words.replace(ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN, replaceWithOrdinalVariant);
    }
    return words;
}
function replaceWithOrdinalVariant(numberWord) {
    return ordinalLessThanThirteen[numberWord];
}
/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'twelve'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] - Deprecated, use toWordsOrdinal() instead!
 * @returns {string}
 */
function toWords(number, asOrdinal) {
    let words = '';
    const num = parseInt(number, 10);
    if (!isFinite(num)) {
        throw new TypeError('Not a finite number: ' +
            number +
            ' (' +
            typeof number +
            ')');
    }
    if (!isSafeNumber(num)) {
        throw new RangeError('Input is not a safe number, it’s either too large or too small.');
    }
    words = generateWords(num);
    return asOrdinal ? makeOrdinal(words) : words;
}
function generateWords(number, wordArr) {
    let remainder = 0, word = '', words = wordArr ? arguments[1] : [];
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
    }
    else if (number < NUMBERS_DECLINES.ONE_HUNDRED) {
        remainder = number % NUMBERS_DECLINES.TEN;
        word =
            TENTHS_LESS_THAN_HUNDRED[Math.floor(number / NUMBERS_DECLINES.TEN)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }
    }
    else if (number < NUMBERS_DECLINES.ONE_THOUSAND) {
        remainder = number % NUMBERS_DECLINES.ONE_HUNDRED;
        word =
            generateWords(Math.floor(number / NUMBERS_DECLINES.ONE_HUNDRED)) + ' hundred';
    }
    else if (number < NUMBERS_DECLINES.ONE_MILLION) {
        remainder = number % NUMBERS_DECLINES.ONE_THOUSAND;
        word =
            generateWords(Math.floor(number / NUMBERS_DECLINES.ONE_THOUSAND)) + ' thousand,';
    }
    else if (number < NUMBERS_DECLINES.ONE_BILLION) {
        remainder = number % NUMBERS_DECLINES.ONE_MILLION;
        word =
            generateWords(Math.floor(number / NUMBERS_DECLINES.ONE_MILLION)) + ' million,';
    }
    else if (number < NUMBERS_DECLINES.ONE_TRILLION) {
        remainder = number % NUMBERS_DECLINES.ONE_BILLION;
        word =
            generateWords(Math.floor(number / NUMBERS_DECLINES.ONE_BILLION)) + ' billion,';
    }
    else if (number < NUMBERS_DECLINES.ONE_QUADRILLION) {
        remainder = number % NUMBERS_DECLINES.ONE_TRILLION;
        word =
            generateWords(Math.floor(number / NUMBERS_DECLINES.ONE_TRILLION)) + ' trillion,';
    }
    else if (number <= NUMBERS_DECLINES.MAX) {
        remainder = number % NUMBERS_DECLINES.ONE_QUADRILLION;
        word =
            generateWords(Math.floor(number / NUMBERS_DECLINES.ONE_QUADRILLION)) + ' quadrillion,';
    }
    words.push(word);
    return generateWords(remainder, words);
}
exports.default = toWords;
