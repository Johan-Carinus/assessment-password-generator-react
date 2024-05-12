const passwordRatingTable = [
    (10n ** 8n),    // Too Weak
    (10n ** 12n),   // Weak
    (10n ** 16n)    // Medium
    // Bigger = Strong
];

const lowercaseRange = [97, 122];
const uppercaseRange = [65, 90];
const numberRange = [48, 57];
const specialCharacterRange = [33, 47, 58, 64, 91, 96, 123, 126];

function unfoldCharacterRange(range) {
    const characters = [];
    for (let i = 0; i < range.length; i+=2) {
        if (i+1 === range.length) {
            continue;
        }

        for (let j = range[i]; j <= range[i+1]; j++) {
            characters.push(String.fromCharCode(j));
        }
    }
    return characters;
}

const lowercaseCharacters = unfoldCharacterRange(lowercaseRange);
const uppercaseCharacters = unfoldCharacterRange(uppercaseRange);
const numberCharacters = unfoldCharacterRange(numberRange);
const specialCharacters = unfoldCharacterRange(specialCharacterRange);

function setUpCharacterPool(useLowerCase, useUpperCase, useNumbers, useSymbols) {
    const characterPool = [];

    if (useLowerCase) {
        characterPool.push(lowercaseCharacters);
    }
    if (useUpperCase) {
        characterPool.push(uppercaseCharacters);
    }
    if (useNumbers) {
        characterPool.push(numberCharacters);
    }
    if (useSymbols) {
        characterPool.push(specialCharacters);
    }

    // Default fallback if no option selected
    if (characterPool.length === 0) {
        characterPool.push(lowercaseCharacters);
    }

    return characterPool;
}

function generateCandidate(length, characterPool) {
    const setCount = Array.from({ length: characterPool.length }, () => 0);
    let candidate = '';
    // TODO: Review this code
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

export async function generatePassword(length, useLowerCase, useUpperCase, useNumbers, useSymbols) {
    const characterPool = setUpCharacterPool(useLowerCase, useUpperCase, useNumbers, useSymbols);

    let isValidCandidate = false;
    let candidate;
    while (!isValidCandidate) {
        let isValid = true;
        candidate = generateCandidate(length, characterPool);
        console.log(characterPool);
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

export function ratePasswordCriteria(length, useLowerCase, useUpperCase, useNumbers, useSymbols) {
    const characterPool = setUpCharacterPool(useLowerCase, useUpperCase, useNumbers, useSymbols);

    let characterVariations = 0;
    for (const characterPoolElement of characterPool) {
        characterVariations += characterPoolElement.length;
    }
    const passwordVariations = BigInt(characterVariations) ** BigInt(length);

    let rating = 0;
    while (rating<passwordRatingTable.length) {
        if (passwordVariations <= passwordRatingTable[rating]) {
            return rating;
        } else {
            rating++;
        }
    }

    return rating;
}