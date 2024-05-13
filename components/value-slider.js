const PRIMARY_CLASS = 'value-slider';

/**
 * A component used for displaying a slider that can select a whole integer within a specified range.
 *
 * @param title The text to display for the slider.
 * @param minValue The lowest possible value.
 * @param maxValue The highest possible value.
 * @param currentValue Prop indicating the currently selected value in the slider.
 * @param onSlide Event that is called when the slider's value changes.
 *
 * @returns {JSX.Element}
 */
export default function ValueSlider({title, minValue, maxValue, currentValue, onSlide}) {

    /**
     * Calculate the exact percentage of the slider that is currently filled by the selected value.
     *
     * @returns {string} Percentage of the slider that is filled. Ex: '42%'
     */
    function calculateSliderPercentage() {
        const top = maxValue - minValue;
        const adjustedCurrent = currentValue - minValue;
        const percent = (adjustedCurrent/top)*100;
        return `${percent}%`;
    }

    const sliderPositionCssVariable = {
        '--slide-position': calculateSliderPercentage()
    };

    return (
        <div style={sliderPositionCssVariable} className={PRIMARY_CLASS}>
            <div className='text-row'>
                <div className='text-title'>
                    {title}
                </div>
                <h1 className='text-counter'>
                    {currentValue}
                </h1>
            </div>
            <div className='slide'>
                <input
                    type="range"
                    min={minValue}
                    max={maxValue}
                    value={currentValue}
                    onInput={(e) => onSlide(e.target.value)}
                />
            </div>
        </div>
    );
}