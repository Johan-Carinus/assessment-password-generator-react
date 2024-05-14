import {useState} from 'react';

const PRIMARY_CLASS = 'icon-button';

/**
 * Button component that displays text and an icon.
 *
 * @param buttonText The text to display on the button.
 * @param icon The path to a svg icon with a transparency layer that is to be displayed on the button.
 * @param onClick Event to call when the button is clicked.
 *
 * @returns {JSX.Element}
 */
export default function IconButton({buttonText, icon, onClick}) {
    const [isTouched, setIsTouched] = useState(false);

    const iconCssVariable = {
        '--icon-path': `url('${icon}')`
    };

    let isTouchedClass = '';
    if (isTouched) {
        isTouchedClass = 'touched';
    }

    return (
        <div style={iconCssVariable} className={PRIMARY_CLASS}>
            <button
                className={isTouchedClass}
                onClick={onClick}
                onTouchStart={() => {setIsTouched(true)}}
                onTouchEnd={() => {setIsTouched(false)}}
            >
                <div>
                    {buttonText.toUpperCase()}
                </div>
                <div className='icon-box'/>
            </button>
        </div>
    );
}