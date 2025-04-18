import './styles/main.css';

export const metadata = {
  title: 'Gator Engineered Tech | Advanced AI & Blockchain Websites for Modern Businesses',
  description: 'Gator Engineered Technologies builds powerful, custom websites for modern businesses worldwide. Unlock the future with AI, blockchain, crypto payments, email marketing, and more — no templates, just bold design and smart tech.',
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
