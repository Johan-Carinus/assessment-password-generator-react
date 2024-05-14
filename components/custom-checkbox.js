import {useRef, useState} from 'react';

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
    const [isTouched, setIsTouched] = useState(false);
    const checkRef = useRef(null);

    let isTouchedClass = '';
    if (isTouched) {
        isTouchedClass = 'touched';
    }

    return (
        <div className={PRIMARY_CLASS}>
            <input
                className={isTouchedClass}
                ref={checkRef}
                type='checkbox'
                checked={isSelected}
                disabled={isStateLocked}
                onChange={(event) => onCheckChange(event.target.checked)}
                onClick={() => checkRef.current.blur()}
                onMouseDown={() => setIsTouched(true)}
                onMouseUp={() => setIsTouched(false)}
                onMouseLeave={() => setIsTouched(false)}

            />
            <label>
                {labelText}
            </label>
        </div>
    );
}