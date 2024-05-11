import {useState} from 'react';
import Image from 'next/image';

export function PasswordField({password}) {
    const copyLogo = '/images/icon-copy.svg';
    const copyLogoAltText = 'Copy Password';
    const passwordExample = 'P4$5W0rD!';

    const [isCopied, setIsCopied] = useState(false);

    function handleClick() {
        setIsCopied(!isCopied);
    }

    return (
        <div className='password-field background-standard' onClick={handleClick}>
            {!password || password.length === 0 ?
                <h1 className='empty'>{passwordExample}</h1> :
                <h1 className='filled'>{password}</h1>
            }
            <div className={isCopied ? 'copied' : 'not-copied'}>{isCopied ? 'COPIED' : ''}</div>
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