'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  return (
    <Image
      alt='Logo'
      // 처음에는 hidden이었다가, 사이즈가 커지면 보이게
      className='hidden md:block cursor-pointer'
      height='100'
      width='100'
      src='/images/logo.png'
    />
  );
};

export default Logo;
