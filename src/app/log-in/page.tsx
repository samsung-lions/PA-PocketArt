'use client';

import Button from '@/components/Button';
import { useToast } from '@/contexts/toast.context';
import { useUserStore } from '@/stores/user';
import supabase from '@/supabase/supabase';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

const LogInPage = () => {
  const { logInUser } = useUserStore((state) => state);
  const toast = useToast();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      toast.on({ label: '이메일,비밀번호를 입력해주세요!' });
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast.on({ label: '계정이 없습니다' });
      return;
    }
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) return;

    logInUser(user);
    toast.on({ label: '로그인 성공!' });
    router.back();
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
              <label htmlFor="email" className="block text-left font-medium mb-2">
                이메일
              </label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                placeholder="이메일을 입력해주세요"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:scale-105 transition"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-left font-medium mb-2">
                비밀번호
              </label>
              <input
                ref={passwordRef}
                type="password"
                placeholder="비밀번호를 입력해주세요"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:scale-105 transition"
              />
            </div>

            <div className="text-center mb-6">
              <div className="flex gap-x-2">
                <Button intent={'logIn'} type="submit" size={'half'}>
                  로그인
                </Button>
                <Button intent={'signUp'} size={'half'} type="button" onClick={() => router.push('/sign-up')}>
                  회원가입
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LogInPage;
