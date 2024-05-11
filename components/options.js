import {useState} from "react";
import {ValueSlider} from "@/components/value-slider";
import {StrengthIndicator} from "@/components/strength-indicator";
import {GenerateButton} from "@/components/generate-button";
import {CustomCheckbox} from "@/components/custom-checkbox";

export function Options() {
    const [passwordLen, setPasswordLen] = useState(10);

    function handleSliderChange(i) {
        setPasswordLen(i);
    }

    return (
        <div className='options background-standard'>
            <ValueSlider
                title='Character Length'
                minValue='1'
                maxValue='20'
                currentValue={passwordLen}
                handleOnChange={handleSliderChange}
            />
            <div className='large-spacer'/>
            <CustomCheckbox labelText='Include Uppercase Letters'/>
            <div className='medium-spacer' />
            <CustomCheckbox labelText='Include Lowercase Letters'/>
            <div className='medium-spacer' />
            <CustomCheckbox labelText='Include Numbers'/>
            <div className='medium-spacer' />
            <CustomCheckbox labelText='Include Symbols'/>
            <div className='large-spacer'/>
            <StrengthIndicator />
            <GenerateButton />
        </div>
    );
}