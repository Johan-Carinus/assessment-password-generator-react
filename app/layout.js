import '@/styles/main.scss';

export const metadata = {
    title: 'Password Generator',
    description: 'App for generating a password.',
};

export default function RootLayout({children}) {
    return (
        <html lang='en'>
            <body className='background-dark'>
                {children}
            </body>
        </html>
    );
}
