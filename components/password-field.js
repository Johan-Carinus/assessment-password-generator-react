import Image from 'next/image';
import {useState} from 'react';

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

    return (
        <div
            className={`${PRIMARY_CLASS} background-standard`}
            onClick={() => handleCopyPasswordEvent(currentPassword)}
        >
            <h1 className={passwordDisplayClass}>
                {currentPassword}
            </h1>
            <div className={copiedClass}>
                {copiedText}
            </div>
            <Image
                src={COPY_LOGO_PATH}
                alt={COPY_LOGO_ALT_TEXT}
                width={COPY_LOGO_SIZE.width}
                height={COPY_LOGO_SIZE.height}
                priority={true}
            />
        </div>
    );
}