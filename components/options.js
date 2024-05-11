import {Slider} from "@/components/slider";
import {CheckboxOptions} from "@/components/checkbox-options";
import {StrengthIndicator} from "@/components/strength-indicator";
import {GenerateButton} from "@/components/generate-button";

export function Options() {
    return (
        <div className='background margin-top standard-padding'>
            <Slider />
            <CheckboxOptions />
            <StrengthIndicator />
            <GenerateButton />
        </div>
    );
}