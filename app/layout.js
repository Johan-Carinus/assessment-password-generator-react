import "@/styles/globals.scss";

export const metadata = {
  title: "Password Generator",
  description: "Use this app to generate a password",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
