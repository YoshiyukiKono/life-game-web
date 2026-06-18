import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anonymous Life Game',
  description: 'A minimal private prototype for choice history and worldline notes.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
