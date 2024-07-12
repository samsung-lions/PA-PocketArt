'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/user';
import { User } from '@supabase/supabase-js';
import supabase from '@/supabase/supabase';
import { useToast } from '@/contexts/toast.context';
import DefaultImage from '../../../../public/default-profile.jpg';

function Header() {
  const router = useRouter();
  const { user, logOutUser, setUserInfo, userInfo } = useUserStore((state) => state);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const toast = useToast();

  useEffect(() => {
    async function getNickname() {
      if (!user) return;
      const { data, error } = await supabase.from('Users').select('nickname,profile_img').eq('id', user.id).single();
      if (error) {
        console.error('Error fetching user data:', error);
        return;
      }
      setUserInfo({ profile_img: data?.profile_img || null, nickname: data?.nickname || null });
    }
    setLoggedInUser(user);
    getNickname();
  }, [user, setUserInfo]);

  const handleLogInClick = () => {
    router.push('/log-in');
  };
  const handleSignUpClick = () => {
    router.push('/sign-up');
  };
  const handleMypageClick = () => {
    router.push(`/mypage/${user?.id}`);
  };

  const handleLogOutClick = async () => {
    await supabase.auth.signOut();
    logOutUser();
    toast.on({ label: '로그아웃 되었습니다' });
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
            <Image
              onClick={handleMypageClick}
              src={userInfo.profile_img ? userInfo.profile_img : DefaultImage}
              alt="프로필 이미지"
              width={50}
              height={30}
              className="rounded-full hover:cursor-pointer"
            />
            <span className="text-white ">{userInfo.nickname}</span>

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
