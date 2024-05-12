export function ValueSlider({title, minValue, maxValue, currentValue, onSlide}) {
    function calculateSliderPercentage() {
        const top = maxValue - minValue;
        const adjustedCurrent = currentValue - minValue;
        const percent = (adjustedCurrent/top)*100;
        return `${percent}%`;
    }

    const sliderStyle = {
        '--slide-position': calculateSliderPercentage()
    }

    return (
        <div
            style={sliderStyle}
            className='value-slider'
        >
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
                    defaultValue={currentValue} // TODO: Check that this doesn't cause performance issues
                    onInput={(e) => onSlide(e.target.value)}
                />
            </div>
        </div>
    );
}