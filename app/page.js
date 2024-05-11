'use client'

import {PasswordField} from '@/components/password-field';
import {Options} from '@/components/options';

export default function Home() {
    return (
        <div>
            <PasswordField password=''/>
            <div className='medium-spacer'/>
            <Options/>
        </div>
    );
}
