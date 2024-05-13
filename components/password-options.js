import {useState} from "react";

import ValueSlider from "@/components/value-slider";
import StrengthState from "@/components/strength-state";
import IconButton from "@/components/icon-button";
import CustomCheckbox from "@/components/custom-checkbox";
import {generatePassword} from "@/logic/password-engine";
import Spacer, {SPACER_TYPE} from "@/components/spacer";

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
    const [shouldIncludeUpperCase, setShouldIncludeUpperCase] = useState(true);
    const [shouldIncludeLowerCase, setShouldIncludeLowerCase] = useState(false);
    const [shouldIncludeNumbers, setShouldIncludeNumbers] = useState(false);
    const [shouldIncludeSymbols, setShouldIncludeSymbols] = useState(false);

    /**
     * Generate a new password based on the currently set options and pass it to the parent handler.
     */
    function genPwdEvent() {
        generatePassword(
            passwordLength,
            shouldIncludeLowerCase,
            shouldIncludeUpperCase,
            shouldIncludeNumbers,
            shouldIncludeSymbols
        ).then((password) => onGeneratePassword(password));
    }

    /**
     * Check whether a checkbox option in the 'shouldInclude' group is the only selected option.
     *
     * @param currentState The current checked state of the checkbox.
     *
     * @returns {boolean} True if the checkbox should not be allowed to be deselected by the user.
     */
    function shouldNotDeselect(currentState) {
        let checkboxesSelected = 0;
        if (shouldIncludeUpperCase) checkboxesSelected++;
        if (shouldIncludeLowerCase) checkboxesSelected++;
        if (shouldIncludeNumbers) checkboxesSelected++;
        if (shouldIncludeSymbols) checkboxesSelected++;

        return currentState === true && checkboxesSelected === 1
    }

    return (
        <div className={`${PRIMARY_CLASS} background-standard`}>
            <ValueSlider
                title='Character Length'
                minValue={1}
                maxValue={20}
                currentValue={passwordLength}
                onSlide={setPasswordLength}
            />
            <Spacer spacerType={SPACER_TYPE.LARGE}/>
            <CustomCheckbox
                labelText='Include Uppercase Letters'
                isSelected={shouldIncludeUpperCase}
                isStateLocked={shouldNotDeselect(shouldIncludeUpperCase)}
                onCheckChange={setShouldIncludeUpperCase}
            />
            <Spacer spacerType={SPACER_TYPE.MEDIUM}/>
            <CustomCheckbox
                labelText='Include Lowercase Letters'
                isSelected={shouldIncludeLowerCase}
                isStateLocked={shouldNotDeselect(shouldIncludeLowerCase)}
                onCheckChange={setShouldIncludeLowerCase}
            />
            <Spacer spacerType={SPACER_TYPE.MEDIUM}/>
            <CustomCheckbox
                labelText='Include Numbers'
                isSelected={shouldIncludeNumbers}
                isStateLocked={shouldNotDeselect(shouldIncludeNumbers)}
                onCheckChange={setShouldIncludeNumbers}
            />
            <Spacer spacerType={SPACER_TYPE.MEDIUM}/>
            <CustomCheckbox
                labelText='Include Symbols'
                isSelected={shouldIncludeSymbols}
                isStateLocked={shouldNotDeselect(shouldIncludeSymbols)}
                onCheckChange={setShouldIncludeSymbols}
            />
            <Spacer spacerType={SPACER_TYPE.LARGE}/>
            <StrengthState
                length={passwordLength}
                lowercase={shouldIncludeLowerCase}
                uppercase={shouldIncludeUpperCase}
                symbols={shouldIncludeSymbols}
                numbers={shouldIncludeNumbers}
            />
            <Spacer spacerType={SPACER_TYPE.LARGE}/>
            <IconButton
                buttonText='Generate'
                icon={{
                    path: '/images/icon-arrow-right.svg',
                    width: 12,
                    height: 12,
                }}
                onClick={genPwdEvent}
            />
        </div>
    );
}