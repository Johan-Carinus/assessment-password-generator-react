import {useState} from 'react';

import ValueSlider from '@/components/value-slider';
import StrengthState from '@/components/strength-state';
import IconButton from '@/components/icon-button';
import CustomCheckbox from '@/components/custom-checkbox';
import {generatePassword} from '@/logic/password-engine';
import Spacer, {SPACER_TYPE} from '@/components/spacer';
import CharacterOptions from "@/logic/character-options";

const PRIMARY_CLASS = 'password-options';

/**
 * Component that is used for displaying options related to generating a password and generating the password as well.
 *
 * @param onGeneratePassword Event handler for when a new password is generated.
 *
 * @returns {JSX.Element}
 */
export default function PasswordOptions({onGeneratePassword}) {
    const [passwordLength, setPasswordLength] = useState(10);
    const [characterOptions, setCharacterOptions] = useState(
        new CharacterOptions(
            true,
            false,
            false,
            false)
    );

    /**
     * Generate a new password based on the currently set options and pass it to the parent handler.
     */
    function genPwdEvent() {
        generatePassword(
            passwordLength,
            characterOptions
        ).then((password) => onGeneratePassword(password));
    }

    /**
     * Check whether a checkbox option is the only selected option.
     *
     * @returns {boolean} True if the checkbox should not be allowed to be deselected by the user.
     */
    function shouldNotDeselect(currentState) {
        let checkboxesSelected = characterOptions.numberSelected();
        return currentState === true && checkboxesSelected === 1
    }

    let allowedPasswordLength = passwordLength < characterOptions.numberSelected() ?
        characterOptions.numberSelected() : passwordLength;

    return (
        <div className={`${PRIMARY_CLASS} background-standard`}>
            <ValueSlider
                title='Character Length'
                minValue={1}
                maxValue={20}
                currentValue={allowedPasswordLength}
                onSlide={setPasswordLength}
            />
            <Spacer primarySpacerType={SPACER_TYPE.LARGE}/>
            <CustomCheckbox
                labelText='Include Uppercase Letters'
                isSelected={characterOptions.shouldUseUpperCase}
                isStateLocked={shouldNotDeselect(characterOptions.shouldUseUpperCase)}
                onCheckChange={(newValue) => setCharacterOptions(characterOptions.adjustUpperCase(newValue))}
            />
            <Spacer primarySpacerType={SPACER_TYPE.MEDIUM} mobileSpacerType={SPACER_TYPE.SMALL}/>
            <CustomCheckbox
                labelText='Include Lowercase Letters'
                isSelected={characterOptions.shouldUseLowerCase}
                isStateLocked={shouldNotDeselect(characterOptions.shouldUseLowerCase)}
                onCheckChange={(newValue) => setCharacterOptions(characterOptions.adjustLowerCase(newValue))}
            />
            <Spacer primarySpacerType={SPACER_TYPE.MEDIUM} mobileSpacerType={SPACER_TYPE.SMALL}/>
            <CustomCheckbox
                labelText='Include Numbers'
                isSelected={characterOptions.shouldUseNumbers}
                isStateLocked={shouldNotDeselect(characterOptions.shouldUseNumbers)}
                onCheckChange={(newValue) => setCharacterOptions(characterOptions.adjustNumbers(newValue))}
            />
            <Spacer primarySpacerType={SPACER_TYPE.MEDIUM} mobileSpacerType={SPACER_TYPE.SMALL}/>
            <CustomCheckbox
                labelText='Include Symbols'
                isSelected={characterOptions.shouldUseSymbols}
                isStateLocked={shouldNotDeselect(characterOptions.shouldUseSymbols)}
                onCheckChange={(newValue) => setCharacterOptions(characterOptions.adjustSymbols(newValue))}
            />
            <Spacer primarySpacerType={SPACER_TYPE.LARGE}/>
            <StrengthState
                length={allowedPasswordLength}
                characterOptions={characterOptions}
            />
            <Spacer primarySpacerType={SPACER_TYPE.LARGE} mobileSpacerType={SPACER_TYPE.SMALL}/>
            <IconButton
                buttonText='Generate'
                icon='/images/icon-arrow-right.svg'
                onClick={genPwdEvent}
            />
        </div>
    );
}