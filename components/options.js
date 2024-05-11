import {useState} from "react";
import {ValueSlider} from "@/components/value-slider";
import {CheckboxOptions} from "@/components/checkbox-options";
import {StrengthIndicator} from "@/components/strength-indicator";
import {GenerateButton} from "@/components/generate-button";

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
            <CheckboxOptions />
            <StrengthIndicator />
            <GenerateButton />
        </div>
    );
}