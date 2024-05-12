export function CustomCheckbox({labelText, onCheckChange}) {
    return (
        <div className='custom-checkbox'>
            <input
                type='checkbox'
                onInput={(e) => onCheckChange(e.target.checked)}
            />
            <label>
                {labelText}
            </label>
        </div>
    );
}