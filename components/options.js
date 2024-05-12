import {ValueSlider} from "@/components/value-slider";
import {StrengthState} from "@/components/strength-state";
import {IconButton} from "@/components/icon-button";
import {CustomCheckbox} from "@/components/custom-checkbox";
import {generatePassword} from "@/logic/password";
import {useState} from "react";

export function Options({onGeneratePassword}) {
    const [passwordLength, setPasswordLength] = useState(10);
    const [shouldIncludeUpperCase, setShouldIncludeUpperCase] = useState(false);
    const [shouldIncludeLowerCase, setShouldIncludeLowerCase] = useState(false);
    const [shouldIncludeNumbers, setShouldIncludeNumbers] = useState(false);
    const [shouldIncludeSymbols, setShouldIncludeSymbols] = useState(false);

    function genPwd() {
        generatePassword(
            passwordLength,
            shouldIncludeLowerCase,
            shouldIncludeUpperCase,
            shouldIncludeNumbers,
            shouldIncludeSymbols
        ).then((password) => onGeneratePassword(password));
    }

    return (
        <div className='options background-standard'>
            <ValueSlider
                title='Character Length'
                minValue='1'
                maxValue='20'
                currentValue={passwordLength}
                onSlide={setPasswordLength}
            />
            <div className='large-spacer'/>
            <CustomCheckbox
                labelText='Include Uppercase Letters'
                onCheckChange={setShouldIncludeUpperCase}
            />
            <div className='medium-spacer' />
            <CustomCheckbox
                labelText='Include Lowercase Letters'
                onCheckChange={setShouldIncludeLowerCase}
            />
            <div className='medium-spacer' />
            <CustomCheckbox
                labelText='Include Numbers'
                onCheckChange={setShouldIncludeNumbers}
            />
            <div className='medium-spacer' />
            <CustomCheckbox
                labelText='Include Symbols'
                onCheckChange={setShouldIncludeSymbols}
            />
            <div className='large-spacer'/>
            <StrengthState
                length={passwordLength}
                lowercase={shouldIncludeLowerCase}
                uppercase={shouldIncludeUpperCase}
                symbols={shouldIncludeSymbols}
                numbers={shouldIncludeNumbers}
            />
            <div className='large-spacer'/>
            <IconButton
                buttonText='Generate'
                icon={{
                    path: '/images/icon-arrow-right.svg',
                    width: 12,
                    height: 12,
                }}
                onClick={genPwd}
            />
        </div>
    );
}