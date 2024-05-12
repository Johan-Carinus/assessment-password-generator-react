'use client'

import {PasswordField} from '@/components/password-field';
import {Options} from '@/components/options';
import {useState} from "react";

export default function Home() {
    const [generatedPassword, setGeneratedPassword] = useState('');

    return (
        <div>
            <PasswordField
                password={generatedPassword}
            />
            <div className='medium-spacer'/>
            <Options onGeneratePassword={setGeneratedPassword}/>
        </div>
    );
}
