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

function Header() {
  const router = useRouter();
  const { user, logOutUser } = useUserStore((state) => state);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [nickName, setNickName] = useState<string>();
  const toast = useToast();

  useEffect(() => {
    async function getNickname() {
      if (!user) return;
      const { data, error } = await supabase.from('Users').select('nickname').eq('id', user.id).single();
      setNickName(data?.nickname);
    }
    setLoggedInUser(user);
    getNickname();
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

  const handleLogOutClick = async () => {
    logOutUser();
    const { error } = await supabase.auth.signOut();
    toast.on({ label: '로그아웃 되었습니다' });
    router.push('/');
  };

  return (
    <div className="bg-black px-10 py-5 w-full flex items-center">
      <Link href="/">
        <Image src="/logo.png" alt="로고" width={70} height={50} />
      </Link>
      <div className="ml-auto flex items-center space-x-4">
        {loggedInUser ? (
          <>
            <span className="text-white">{nickName}</span>
            <Button size={'lg'} type="button" onClick={handleMypageClick}>
              마이페이지
            </Button>
            <Button size={'lg'} type="button" onClick={handleLogOutClick}>
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Button size={'lg'} type="button" onClick={handleLogInClick}>
              로그인
            </Button>
            <Button size={'lg'} type="button" onClick={handleSignUpClick}>
              회원가입
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
