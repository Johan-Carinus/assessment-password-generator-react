/**
 * A class that contains all the selectable character options that is used to keep track of which options to use when
 * generating a password.
 */
export default class CharacterOptions {
    constructor(useLowerCase, useUpperCase, useNumbers, useSymbols) {
        this.useLowerCase = useLowerCase;
        this.useUpperCase = useUpperCase;
        this.useNumbers = useNumbers;
        this.useSymbols = useSymbols;
    }

    get shouldUseLowerCase() {
        return this.useLowerCase;
    }

    get shouldUseUpperCase() {
        return this.useUpperCase;
    }

    get shouldUseNumbers() {
        return this.useNumbers;
    }

    get shouldUseSymbols() {
        return this.useSymbols;
    }

    adjustLowerCase(shouldUse) {
        return new CharacterOptions(shouldUse, this.useUpperCase, this.useNumbers, this.useSymbols);
    }

    adjustUpperCase(shouldUse) {
        return new CharacterOptions(this.useLowerCase, shouldUse, this.useNumbers, this.useSymbols);
    }

    adjustNumbers(shouldUse) {
        return new CharacterOptions(this.useLowerCase, this.useUpperCase, shouldUse, this.useSymbols);
    }

    adjustSymbols(shouldUse) {
        return new CharacterOptions(this.useLowerCase, this.useUpperCase, this.useNumbers, shouldUse);
    }

    numberSelected() {
        let count = 0;
        if (this.useLowerCase) count++;
        if (this.useUpperCase) count++;
        if (this.useNumbers) count++;
        if (this.useSymbols) count++;

        return count;
    }
}