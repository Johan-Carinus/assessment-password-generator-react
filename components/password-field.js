import Image from 'next/image';
import {useRef, useState} from 'react';

const PRIMARY_CLASS = 'password-field';
const COPY_LOGO_PATH = '/images/icon-copy.svg';
const COPY_LOGO_ALT_TEXT = 'Copy Password';
const COPY_LOGO_SIZE = {
    width: 21,
    height: 24,
};
const PASSWORD_EXAMPLE = 'P4$5W0rD!';

/**
 * Component that is used for displaying a generated password and copying it to the clipboard.
 *
 * @param password  Prop containing the password to display or copy.
 *
 * @returns {JSX.Element}
 */
export default function PasswordField({password}) {
    const [copiedPassword, setCopiedPassword] = useState();
    const [isTouched, setIsTouched] = useState(false);
    const [isButtonTouched, setIsButtonTouched] = useState(false);
    const buttonRef = useRef(null);

    /**
     * Copy the currently displayed password to the clipboard.
     *
     * @param password The currently displayed password.
     */
    function handleCopyPasswordEvent(password) {
        navigator.clipboard.writeText(password)
            .then(() => {
                setCopiedPassword(password);
            })
            .catch((error) => {
                console.error('Unable to copy to clipboard');
                console.error(error.message);
            });
    }

    let passwordDisplayClass;
    let copiedClass;
    let copiedText;
    let currentPassword = password;
    let isTouchedClass = '';
    let isButtonTouchedClass = '';

    if (!currentPassword || currentPassword.length === 0) {
        currentPassword = PASSWORD_EXAMPLE;
        passwordDisplayClass = 'empty';
    } else {
        passwordDisplayClass = 'filled';
    }

    if (copiedPassword === currentPassword) {
        copiedClass = 'copied';
        copiedText = 'COPIED';
    } else {
        copiedClass = 'not-copied';
        copiedText = '';
    }

    if (isTouched) {
        isTouchedClass = 'touched';
    }
    if (isButtonTouched) {
        isButtonTouchedClass = 'button-touched';
    }

    return (
        <div
            className={`${PRIMARY_CLASS} ${isTouchedClass} background-standard`}
            onClick={() => handleCopyPasswordEvent(currentPassword)}
            onTouchStart={() => {setIsTouched(true)}}
            onTouchEnd={() => {setIsTouched(false)}}
        >
            <h1 className={passwordDisplayClass}>
                {currentPassword}
            </h1>
            <div className={copiedClass}>
                {copiedText}
            </div>
            <button
                ref={buttonRef}
                className={`${isButtonTouchedClass} focus-button`}
                onClick={() => {
                    buttonRef.current.blur();
                    handleCopyPasswordEvent(currentPassword);
                }}
                onMouseDown={() => setIsButtonTouched(true)}
                onMouseUp={() => setIsButtonTouched(false)}
                onMouseLeave={() => setIsButtonTouched(false)}
            >
                <Image
                    src={COPY_LOGO_PATH}
                    alt={COPY_LOGO_ALT_TEXT}
                    width={COPY_LOGO_SIZE.width}
                    height={COPY_LOGO_SIZE.height}
                    priority={true}
                />
            </button>
        </div>
    );
}