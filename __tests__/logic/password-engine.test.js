import {describe, expect, test} from '@jest/globals';
import {generatePassword, ratePasswordCriteria} from '@/logic/password-engine';
import CharacterOptions from '@/logic/character-options';

function checkPassword(password) {
    let checks = {
        hasLowerCase: false,
        hasUpperCase: false,
        hasNumber: false,
        hasOther: false,
    };

    for (const characterString of password) {
        if (characterString.toUpperCase() !== characterString.toLowerCase()) {  // Character is a letter.
            if(characterString === characterString.toLowerCase()) {
                checks.hasLowerCase = true;
            } else if (characterString === characterString.toUpperCase()) {
                checks.hasUpperCase = true;
            }
        } else if (!isNaN(parseInt(characterString))) { // Character is a number.
            checks.hasNumber = true;
        } else {
            checks.hasOther = true; //Character is a special character.
        }
    }
    return checks;
}

describe('Internal functions', () => {
    test('checkPassword', () => {
        let lowerResult = checkPassword('lower');
        let upperResult = checkPassword('UPPER');
        let numberResult = checkPassword('123');
        let specialResult = checkPassword('!@#$%^&*()_+');
        let combinedResult = checkPassword('lU1@');

        expect(lowerResult).toStrictEqual({
            hasLowerCase: true,
            hasUpperCase: false,
            hasNumber: false,
            hasOther: false,
        });
        expect(upperResult).toStrictEqual({
            hasLowerCase: false,
            hasUpperCase: true,
            hasNumber: false,
            hasOther: false,
        });
        expect(numberResult).toStrictEqual({
            hasLowerCase: false,
            hasUpperCase: false,
            hasNumber: true,
            hasOther: false,
        });
        expect(specialResult).toStrictEqual({
            hasLowerCase: false,
            hasUpperCase: false,
            hasNumber: false,
            hasOther: true,
        });
        expect(combinedResult).toStrictEqual({
            hasLowerCase: true,
            hasUpperCase: true,
            hasNumber: true,
            hasOther: true,
        });
    });
});

describe('Generate password', () => {
    test('Correct settings => Valid password', async () => {
        const characterOptions = new CharacterOptions(true, true, true, true);
        const password = await generatePassword(10, characterOptions);
        const validationResult = checkPassword(password);

        expect(validationResult).toStrictEqual({
            hasLowerCase: true,
            hasUpperCase: true,
            hasNumber: true,
            hasOther: true,
        });
    });

    test('Zero length => Empty password', async () => {
        const characterOptions = new CharacterOptions(true, true, true, true);
        const password = await generatePassword(0, characterOptions);

        expect(password.length).toBe(0);
    });

    test('No options => Lowercase password', async () => {
        const characterOptions = new CharacterOptions(false, false, false, false);
        const password = await generatePassword(10, characterOptions);
        const validationResult = checkPassword(password);

        expect(validationResult).toStrictEqual({
            hasLowerCase: true,
            hasUpperCase: false,
            hasNumber: false,
            hasOther: false,
        });
    });

    test('Options more than password length => Password of length equal to number of options', async () => {
        let characterOptions = new CharacterOptions(true, true, false, false);
        let password = await generatePassword(1, characterOptions);
        let validationResult = checkPassword(password);

        expect(validationResult).toStrictEqual({
            hasLowerCase: true,
            hasUpperCase: true,
            hasNumber: false,
            hasOther: false,
        });

        characterOptions = new CharacterOptions(true, false, false, false);
        password = await generatePassword(1, characterOptions);
        validationResult = checkPassword(password);

        expect(validationResult).toStrictEqual({
            hasLowerCase: true,
            hasUpperCase: false,
            hasNumber: false,
            hasOther: false,
        });
    });
});

describe('Rate password criteria', () => {
    test('Sample password => Normal rating', () => {
        /*
         * Lowercase + Uppercase = 32 possible characters
         * Set of 32 possible characters arranged (possibly repeating) into ordered string of length 10
         * possible combinations = 32^10 = 1.126 x 10^15
         */
        const characterOptions = new CharacterOptions(true, true, false, false);
        const zeroIndexRating = ratePasswordCriteria(10, characterOptions);

        // Medium rating
        expect(zeroIndexRating).toBe(2);
    });

    test('Zero length => Zero strength', () => {
        const characterOptions = new CharacterOptions(true, true, true, true);
        const zeroIndexRating = ratePasswordCriteria(0, characterOptions);

        expect(zeroIndexRating).toBe(0);
    });

    test('Zero options => Zero strength', () => {
        const characterOptions = new CharacterOptions(false, false, false, false);
        const zeroIndexRating = ratePasswordCriteria(10, characterOptions);

        expect(zeroIndexRating).toBe(0);
    });

    test('Edge cases => Follow rating table', () => {
        /*
         * The rating table is written in powers of 10. The number character set provides 10 possible characters, which
         * makes it perfect for testing edge cases in the table. We only need to modify the password length to test the
         * different powers.
         */
        let zeroIndexRating;
        let characterOptions = new CharacterOptions(false, false, true, false);

        // Too Weak = 0: 10^10 and below
        zeroIndexRating = ratePasswordCriteria(10, characterOptions);
        expect(zeroIndexRating).toBe(0);

        // Weak = 1: (10^10)+1 to 10^14
        zeroIndexRating = ratePasswordCriteria(11, characterOptions);
        expect(zeroIndexRating).toBe(1);
        zeroIndexRating = ratePasswordCriteria(14, characterOptions);
        expect(zeroIndexRating).toBe(1);

        // Medium = 2: (10^14)+1 to 10^18
        zeroIndexRating = ratePasswordCriteria(15, characterOptions);
        expect(zeroIndexRating).toBe(2);
        zeroIndexRating = ratePasswordCriteria(18, characterOptions);
        expect(zeroIndexRating).toBe(2);

        // Strong = 3: (10^18)+1 onwards
        zeroIndexRating = ratePasswordCriteria(19, characterOptions);
        expect(zeroIndexRating).toBe(3);
        zeroIndexRating = ratePasswordCriteria(20, characterOptions);
        expect(zeroIndexRating).toBe(3);
    });
});