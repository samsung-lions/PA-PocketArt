'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/user';
import { User } from '@supabase/supabase-js';

function Header() {
  const router = useRouter();
  const { user, logOutUser } = useUserStore((state) => state);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    setLoggedInUser(user);
  }, [user]);

  const handleLogInClick = () => {
    router.push('/log-in');
  };

  const handleSignUpClick = () => {
    router.push('/sign-up');
  };
  const handleMypageClick = () => {
    router.push(`/mypage/${user?.id}`);
  };

  const handleLogOutClick = () => {
    logOutUser();
    alert('로그아웃 되었습니다');
    router.push('/');
  };

  return (
    <div className="bg-black p-5 w-full flex items-center">
      <Link href="/">
        <Image src="/logo.png" alt="로고" width={70} height={50} />
      </Link>
      <div className="ml-auto flex items-center space-x-4">
        {loggedInUser ? (
          <>
            <span className="text-white">{loggedInUser.email}</span>
            <button type="button" onClick={handleMypageClick} className="bg-yellow px-4 py-2 rounded">
              마이페이지
            </button>
            <button type="button" onClick={handleLogOutClick} className="bg-yellow px-4 py-2 rounded">
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={handleLogInClick} className="bg-yellow px-4 py-2 rounded">
              로그인
            </button>
            <button type="button" onClick={handleSignUpClick} className="bg-yellow px-4 py-2 rounded">
              회원가입
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
