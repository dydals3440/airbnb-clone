import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/Clientonly';
import Modal from './components/modals/Modal';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';

const inter = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
};

const font = Nunito({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          {/* 따로 Provider만들어주는 이유, 에러가 발생하기 때문이다. 여기는 서버컴포넌트 */}
          <ToasterProvider />
          {/* <Modal actionLabel='Submit' title='Hello world' isOpen /> */}
          <RegisterModal />
          <Navbar />
        </ClientOnly>

        {children}
      </body>
    </html>
  );
}
