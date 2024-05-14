import {useState} from 'react';

import PasswordField from '@/components/password-field';
import PasswordOptions from '@/components/password-options';
import Spacer, {SPACER_TYPE} from '@/components/spacer';

const PRIMARY_CLASS = 'password-generator';

/**
 * This component contains the entire password generator including both components to display and copy the password and
 * various options related to the password generation process.
 *
 * @returns {JSX.Element}
 */
export default function PasswordGenerator() {
    const [generatedPassword, setGeneratedPassword] = useState('');

    return (
        <div className={PRIMARY_CLASS}>
            <header>
                <h2 className='text-grey'>
                    Password Generator
                </h2>
            </header>
            <PasswordField password={generatedPassword}/>
            <Spacer primarySpacerType={SPACER_TYPE.MEDIUM} mobileSpacerType={SPACER_TYPE.SMALL}/>
            <PasswordOptions onGeneratePassword={setGeneratedPassword}/>
        </div>
    );
}