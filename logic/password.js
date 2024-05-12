const lowercaseRange = [97, 122];
const uppercaseRange = [65, 90];
const numberRange = [48, 57];
const specialCharacterRange = [33, 47, 58, 64, 91, 96, 123, 126];
const charactersToEscape = [34, 39, 92];

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
    const characterPool = [];

    if (useLowerCase) {
        characterPool.push(unfoldCharacterRange(lowercaseRange));
    }
    if (useUpperCase) {
        characterPool.push(unfoldCharacterRange(uppercaseRange));
    }
    if (useNumbers) {
        characterPool.push(unfoldCharacterRange(numberRange));
    }
    if (useSymbols) {
        characterPool.push(unfoldCharacterRange(specialCharacterRange));
    }
    //TODO: Add default if nothing is selected

    let isValidCandidate = false;
    let candidate;
    while (!isValidCandidate) {
        let isValid = true;
        candidate = generateCandidate(length, characterPool);
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
    // TODO: Revisit this
    const ratingTable = {
        1: {
            15: 0,
            20: 1,
        },
        2: {
            10: 0,
            15: 1,
            20: 2,
        },
        3: {
            5: 0,
            10: 1,
            15: 2,
            20: 3,
        },
        4: {
            0: 0,
            5: 1,
            10: 2,
            15: 3,
        },
    };

    let combo = 0;
    if (useLowerCase) {
        combo++;
    }
    if (useUpperCase) {
        combo++;
    }
    if (useNumbers) {
        combo++;
    }
    if (useSymbols) {
        combo++;
    }

    // TODO: Polish this
    const strengthRatingRange = ratingTable['' + combo];
    for (const strengthRatingRangeKey in strengthRatingRange) {
        console.log(strengthRatingRange['' + strengthRatingRangeKey])
        if(length > parseInt(strengthRatingRangeKey)) {
            continue;
        } else {
            return strengthRatingRange['' + strengthRatingRangeKey];
        }
    }

    return 3;
}