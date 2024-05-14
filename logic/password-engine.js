/**
 * Utility function for decoding a range of paired decimal character values.
 *
 * @param {number[][]} range A paired list of decimal character values.
 *
 * @returns {string[][]} A list generated from all the decimal values between (inclusive) the pairs in the range array.
 */
const decodeCharacterRange = (range) => {
    const characters = [];
    for (let i = 0; i < range.length; i+=2) {
        const pair = range[i];
        if (pair.length !== 2) {
            continue;
        }

        for (let j = pair[0]; j <= pair[1]; j++) {
            characters.push(String.fromCharCode(j));
        }
    }
    return characters;
}
const LOWERCASE_CHARACTERS = decodeCharacterRange([[97, 122]]);
const UPPERCASE_CHARACTERS = decodeCharacterRange([[65, 90]]);
const NUMBER_CHARACTERS = decodeCharacterRange([[48, 57]]);
const SPECIAL_CHARACTERS = decodeCharacterRange([[33, 47], [58, 64], [91, 96], [123, 126]]);

const PASSWORD_RATING_TABLE = [
    (10n ** 10n),    // Too Weak
    (10n ** 14n),   // Weak
    (10n ** 18n)    // Medium
    // Bigger = Strong
];

/**
 * Define a pool of characters that can be used to generate a password.
 *
 * @param {CharacterOptions} characterOptions Options indicating which characters should be used in the password.
 *
 * @returns {string[][]} All of the characters that can be used in the generation of a password, grouped in mandatory groups.
 */
function setUpCharacterPool(characterOptions) {
    const characterPool = [];

    if (characterOptions.shouldUseLowerCase) {
        characterPool.push(LOWERCASE_CHARACTERS);
    }
    if (characterOptions.shouldUseUpperCase) {
        characterPool.push(UPPERCASE_CHARACTERS);
    }
    if (characterOptions.shouldUseNumbers) {
        characterPool.push(NUMBER_CHARACTERS);
    }
    if (characterOptions.shouldUseSymbols) {
        characterPool.push(SPECIAL_CHARACTERS);
    }

    // Default fallback if no option selected
    if (characterPool.length === 0) {
        characterPool.push(LOWERCASE_CHARACTERS);
    }

    return characterPool;
}

/**
 * Generate a possible password candidate. This function is only responsible for randomly attempting to generate a valid
 * password. It has a non-zero possibility of not containing all the characters needed.
 *
 * @param length The required length of the password.
 * @param characterPool The characters that are used to generate the password, grouped by mandatory groups.
 *
 * @returns {{candidate: string, setCount: number[]}} The generated candidate password and a count of the number of characters that are present for each mandatory group.
 */
function generateCandidate(length, characterPool) {
    const setCount = Array.from({ length: characterPool.length }, () => 0);
    let candidate = '';
    for (let i = 0; i < length; i++) {
        const poolI = Math.floor(Math.random() * characterPool.length);
        setCount[poolI]++;
        const pool = characterPool[poolI];
        candidate += pool[Math.floor(Math.random() * pool.length)];
    }
    return {
        candidate: candidate,
        setCount: setCount,
    }
}

/**
 * Generate a valid password according to the specified criteria.
 *
 * @param length The required length of the password.
 * @param {CharacterOptions} characterOptions Options indicating which characters should be used in the password.
 *
 * @returns {Promise<string>} The generated password.
 */
export async function generatePassword(length, characterOptions) {
    if (length === 0) {
        return '';
    }

    let usableLength = characterOptions.numberSelected();
    if (length > usableLength) {
        usableLength = length
    }

    const characterPool = setUpCharacterPool(characterOptions);

    let isValidCandidate = false;
    let candidate;
    let retryCount = 0;
    while (!isValidCandidate && retryCount < 1000) {
        let isValid = true;
        retryCount++;
        candidate = generateCandidate(usableLength, characterPool);
        for (const countElement of candidate.setCount) {
            if (countElement <= 0) {
                isValid = false;
                break;
            }
        }
        isValidCandidate = isValid;
    }

    return candidate.candidate;
}

/**
 * Rate a potential password based on the criteria provided. This computation is based on the possible number of combinations
 * that can be made with the possible character set and password length.
 *
 * @param length The required length of the password.
 * @param {CharacterOptions} characterOptions Options indicating which characters should be used in the password.
 *
 * @returns {number} A zero-indexed rating indicating discrete levels of password ratings.
 */
export function ratePasswordCriteria(length, characterOptions) {
    if (characterOptions.numberSelected() === 0) {
        return 0;
    }

    const characterPool = setUpCharacterPool(characterOptions);

    let characterVariations = 0;
    for (const characterPoolElement of characterPool) {
        characterVariations += characterPoolElement.length;
    }
    const passwordVariations = BigInt(characterVariations) ** BigInt(length);

    let rating = 0;
    while (rating<PASSWORD_RATING_TABLE.length) {
        if (passwordVariations <= PASSWORD_RATING_TABLE[rating]) {
            return rating;
        } else {
            rating++;
        }
    }

    return rating;
}