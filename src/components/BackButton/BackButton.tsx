'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const BackButton = () => {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="w-full flex justify-start px-4" onClick={() => router.back()}>
      <Image src="/icons/ic-back.png" alt="뒤로가기 버튼" width={30} height={30} className="cursor-pointer" />
    </div>
  );
};

export default BackButton;
