'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import supabase from '@/supabase/supabase';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/user';

const LogInPage = () => {
  const { logInUser } = useUserStore((state) => state);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      alert('이메일,비밀번호를 입력해주세요!');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }
    const {
      data: { user }
    } = await supabase.auth.getUser();
    // console.log(user);
    if (!user) return;

    logInUser(user);
    alert('로그인 성공!');
    router.replace('/');
  };

  const googleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { queryParams: { access_type: 'offline', prompt: 'consent' } }
    });

    if (data) {
      alert('구글로 로그인 되었습니다');
      return;
    }

    if (error) {
      console.log(error.message);
      return;
    }
  };

  const kakaoLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: { queryParams: { access_type: 'offline', prompt: 'consent' } }
    });

    if (data) {
      alert('카카오 로그인 되었습니다');
      return;
    }
    if (error) {
      console.log(error.message);
      return;
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="min-h-screen flex flex-col items-center bg-gray-100">
        <div className="flex justify-center mt-12">
          <div className="text-center w-60 rounded-full text-3xl font-bold p-4 bg-white shadow-md">로그인</div>
        </div>
        <div className="flex justify-center mt-12">
          <div className="w-96 rounded-lg text-lg font-bold p-8 bg-white shadow-lg">
            <div className="mb-4">
              <label className="block text-left font-medium mb-2">이메일</label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                placeholder="이메일을 입력해주세요"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-left font-medium mb-2">비밀번호</label>
              <input
                ref={passwordRef}
                type="password"
                placeholder="비밀번호를 입력해주세요"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div className="text-center mb-4">
              <div>
                <button type="submit" className="px-4 py-2 w-full bg-yellow text-white rounded">
                  로그인
                </button>
              </div>
              <div className="pt-5">
                <Link href="/sign-up" className="text-gray-500 ">
                  회원가입
                </Link>
              </div>
            </div>

            <div className="text-center mb-4">
              <div className="text-gray-500 mb-2">또는 소셜 계정으로 로그인</div>
              <button onClick={googleLogin} className="px-4 py-2 w-full bg-red text-white rounded mb-2">
                구글 로그인
              </button>

              <button onClick={kakaoLogin} className="px-4 py-2 w-full bg-yellow text-white rounded">
                카카오 로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LogInPage;
