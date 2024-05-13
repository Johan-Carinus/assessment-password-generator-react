const PRIMARY_CLASS = 'icon-button';

/**
 * Button component that displays text and an icon.
 *
 * @param buttonText The text to display on the button.
 * @param icon Data for an icon with a transparency layer that is to be displayed on the button.
 * @param icon.path The path to a svg icon.
 * @param icon.width The icon width.
 * @param icon.height The icon height.
 * @param onClick Event to call when the button is clicked.
 *
 * @returns {JSX.Element}
 */
export default function IconButton({buttonText, icon, onClick}) {
    const iconCssVariable = {
        '--icon-path': `url('${icon.path}')`
    };
    const iconBoxStyle = {
        width: icon.width,
        height: icon.height
    };

    return (
        <div style={iconCssVariable} className={PRIMARY_CLASS}>
            <button className="btn" onClick={onClick}>
                {buttonText.toUpperCase()}
                <div style={iconBoxStyle} className='icon-box'/>
            </button>
        </div>
    );
}