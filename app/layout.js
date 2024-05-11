import "@/styles/main.scss";

export const metadata = {
    title: "Password Generator",
    description: "Use this app to generate a password",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body className='background-dark'>
                <header>
                  <h2 className='text-grey'>Password Generator</h2>
                </header>
                {children}
            </body>
        </html>
    );
}
