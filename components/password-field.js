import Image from 'next/image';
import {useState} from "react";

const copyLogo = '/images/icon-copy.svg';
const copyLogoAltText = 'Copy Password';
const passwordExample = 'P4$5W0rD!';

export function PasswordField({password}) {
    const [copiedPassword, setCopiedPassword] = useState();

    async function handleCopy(password) {
        try {
            await navigator.clipboard.writeText(password);
            setCopiedPassword(password);
        } catch (error) {
            console.error('Unable to copy to clipboard');
            console.error(error.message);
        }
    }

    let passwordClass;
    let currentPassword = password;
    if (!currentPassword || currentPassword.length === 0) {
        currentPassword = passwordExample;
        passwordClass = 'empty';
    } else {
        passwordClass = 'filled';
    }

    let copiedClass;
    let copiedText;
    if (copiedPassword === currentPassword) {
        copiedClass = 'copied';
        copiedText = 'COPIED';
    } else {
        copiedClass = 'not-copied';
        copiedText = '';
    }

    return (
        <div
            className='password-field background-standard'
            onClick={() => handleCopy(currentPassword)}
        >
            <h1 className={passwordClass}>
                {currentPassword}
            </h1>
            <div className={copiedClass}>
                {copiedText}
            </div>
            <Image
                src={copyLogo}
                alt={copyLogoAltText}
                width={21}
                height={24}
                priority={true}
            />
        </div>
    );
}