const PRIMARY_CLASS = 'custom-checkbox';

/**
 * Custom checkbox that has a specific styling and is used to simplify parent components containing a lot of checkboxes.
 *
 * @param labelText Text to display for the checkbox.
 * @param isSelected State indicating whether the checkbox is currently selected.
 * @param isStateLocked True if the checkbox shouldn't allow user input.
 * @param onCheckChange Event to send new checked value to if the checkbox is checked/unchecked by the user.
 *
 * @returns {JSX.Element}
 */
export default function CustomCheckbox({labelText, isSelected, isStateLocked, onCheckChange}) {
    return (
        <div className={PRIMARY_CLASS}>
            <input
                type='checkbox'
                checked={isSelected}
                disabled={isStateLocked}
                onChange={(event) => onCheckChange(event.target.checked)}
            />
            <label>
                {labelText}
            </label>
        </div>
    );
}