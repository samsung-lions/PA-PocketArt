'use client';
import Button from '@/components/Button';
import { useToast } from '@/contexts/toast.context';
import { useUserStore } from '@/stores/user';
import supabase from '@/supabase/supabase';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DefaultImage from '../../../../public/default-profile.jpg';

function Header() {
  const router = useRouter();
  const { user, logOutUser, setUserInfo, userInfo } = useUserStore((state) => state);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const toast = useToast();

  useEffect(() => {
    async function getNickname(): Promise<void> {
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

  const handleLogInClick = (): void => {
    router.push('/log-in');
  };

  const handleSignUpClick = (): void => {
    router.push('/sign-up');
  };

  const handleMypageClick = (): void => {
    router.push(`/mypage/${user?.id}`);
  };

  const handleLogOutClick = async (): Promise<void> => {
    await supabase.auth.signOut();
    logOutUser();
    toast.on({ label: '로그아웃 되었습니다' });
    router.replace('/');
  };

  return (
    <div className="bg-black px-32 py-6 w-full flex items-center">
      <Link href="/">
        <Image src="/logo.png" alt="로고" width={70} height={50} />
      </Link>
      <div className="ml-auto">
        {loggedInUser ? (
          <div className="flex items-center gap-x-8">
            <div onClick={handleMypageClick} className="flex gap-x-4 justify-center items-center cursor-pointer">
              <div className="relative w-[40px] h-[40px] aspect-square">
                <Image
                  src={userInfo.profile_img ? userInfo.profile_img : DefaultImage}
                  alt="프로필 이미지"
                  fill
                  className="rounded-full object-contain border border-white"
                />
              </div>
              <span className="text-white font-semibold">{userInfo.nickname}</span>
            </div>

            <Button size={'lg'} type="button" onClick={handleLogOutClick}>
              로그아웃
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-x-3">
            <Button size={'lg'} type="button" onClick={handleLogInClick}>
              로그인
            </Button>
            <Button intent={'signUp'} size={'lg'} type="button" onClick={handleSignUpClick}>
              회원가입
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
