export function ValueSlider({title, minValue, maxValue, currentValue, handleOnChange}) {
    function onInputChange(event) {
        const value = event.target.value;
        handleOnChange(value);

    }

    function calculateSliderPercentage() {
        const top = maxValue - minValue;
        const adjustedCurrent = currentValue - minValue;
        const percent = (adjustedCurrent/top)*100;
        return `${percent}%`;
    }

    return (
        <div style={{'--slide-position': calculateSliderPercentage()}} className='value-slider'>
            <div className='text-row'>
                <div className='text-title'>{title}</div>
                <h1 className='text-counter'>{currentValue}</h1>
            </div>
            <div className='slide'>
                <input
                    type="range"
                    min={minValue}
                    max={maxValue}
                    defaultValue={currentValue} // TODO: Check that this doesn't cause performance issues
                    onInput={onInputChange}
                />
            </div>
        </div>
    );
}