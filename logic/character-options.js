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

    /**
     * Create a new CharacterOptions object with an updated lowercase value.
     *
     * @param shouldUse The new lowercase value to use.
     *
     * @returns {CharacterOptions} The newly generated CharacterOptions object.
     */
    adjustLowerCase(shouldUse) {
        return new CharacterOptions(shouldUse, this.useUpperCase, this.useNumbers, this.useSymbols);
    }

    /**
     * Create a new CharacterOptions object with an updated uppercase value.
     *
     * @param shouldUse The new uppercase value to use.
     *
     * @returns {CharacterOptions} The newly generated CharacterOptions object.
     */
    adjustUpperCase(shouldUse) {
        return new CharacterOptions(this.useLowerCase, shouldUse, this.useNumbers, this.useSymbols);
    }

    /**
     * Create a new CharacterOptions object with an updated numbers value.
     *
     * @param shouldUse The new numbers value to use.
     *
     * @returns {CharacterOptions} The newly generated CharacterOptions object.
     */
    adjustNumbers(shouldUse) {
        return new CharacterOptions(this.useLowerCase, this.useUpperCase, shouldUse, this.useSymbols);
    }

    /**
     * Create a new CharacterOptions object with an updated symbols value.
     *
     * @param shouldUse The new symbols value to use.
     *
     * @returns {CharacterOptions} The newly generated CharacterOptions object.
     */
    adjustSymbols(shouldUse) {
        return new CharacterOptions(this.useLowerCase, this.useUpperCase, this.useNumbers, shouldUse);
    }

    /**
     * Calculates how many of the options are selected for the current CharacterOptions object.
     *
     * @returns {number}
     */
    numberSelected() {
        let count = 0;
        if (this.useLowerCase) count++;
        if (this.useUpperCase) count++;
        if (this.useNumbers) count++;
        if (this.useSymbols) count++;

        return count;
    }
}