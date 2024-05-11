export function CheckboxOptions() {
    return (
        <div>
            <label className="container">
                <input type="checkbox" checked="checked"/>
                <span className="checkmark"></span>
                Include Uppercase Letters
            </label>
            <label className="container">
                <input type="checkbox" checked="checked"/>
                <span className="checkmark"></span>
                Include Lowercase Letters
            </label>
            <label className="container">
                <input type="checkbox" checked="checked"/>
                <span className="checkmark"></span>
                Include Numbers
            </label>
            <label className="container">
                <input type="checkbox"/>
                <span className="checkmark"></span>
                Include Symbols
            </label>
        </div>
    );
}