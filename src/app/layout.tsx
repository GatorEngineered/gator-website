import './styles/main.css';

export const metadata = {
  title: 'Gator Engineered Technologies',
  description: 'A new wave in web design and blockchain',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
