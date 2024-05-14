'use client'

import PasswordGenerator from '@/components/password-generator';
import localFont from 'next/font/local';

const jetBrainsMonoFont = localFont({ src: '../public/fonts/static/JetBrainsMono-Bold.ttf' });

export default function Home() {
    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${jetBrainsMonoFont.style.fontFamily};
                }
            `}</style>
            <PasswordGenerator/>
        </>
    );
}
