'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/supabase/supabase';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');

  const [error, setError] = useState({
    password: '',
    passwordConfirm: '',
    nickname: ''
  });

  const router = useRouter();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setError({
        ...error,
        password: '비밀번호는 최소 6자 이상입니다.'
      });
    } else {
      setError({
        ...error,
        password: ''
      });
    }
  };

  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
    // if (e.target.value.length < 6) {
    //   setError({
    //     ...error,
    //     passwordConfirm: '비밀번호 확인은 최소 6자 입니다.'
    //   });
    // } else {
    //   setError({
    //     ...error,
    //     passwordConfirm: ''
    //   });
    // }
    if (password !== e.target.value) {
      setError({
        ...error,
        passwordConfirm: '비밀번호가 같지 않습니다.'
      });
    } else {
      setError({
        ...error,
        passwordConfirm: ''
      });
    }
  };
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (e.target.value.length < 2) {
      setError({
        ...error,
        nickname: '닉네임은 최소 2글자 입니다.'
      });
    } else {
      setError({
        ...error,
        nickname: ''
      });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === '' || password === '' || nickname === '') {
      alert('빈칸을 채워주세요!');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 틀립니다!');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    const { data: user } = await supabase.from('Users').insert({ id: data.user?.id, email, nickname });
    console.log(data);
    //insert
    if (error) {
      alert(error.message);
    }
    alert('회원가입이 완료되었습니다!');

    router.replace('/');
  };
  //유효성 검사

  return (
    <form onSubmit={onSubmit}>
      <div className=" bg-gray-100 min-h-screen ">
        <div className="bg-black  p-5">
          <Image src="/logo.png" alt="로고" width={70} height={50} />
        </div>
        <div className="flex justify-center mt-12">
          <div className="text-center w-60 rounded-full text-3xl font-bold p-4 bg-white shadow-md">회원가입</div>
        </div>
        <div>
          <div className="flex justify-center  mt-12">
            <div className="w-96 rounded-lg text-lg font-bold p-8 bg-white shadow-lg">
              <div className="mb-4">
                <label className="block text-left font-medium mb-2">이메일</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder="이메일을 입력해주세요"
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                  onChange={onChangeEmail}
                />
              </div>
              <div className="mb-4">
                <label className="block text-left font-medium mb-2">비밀번호</label>
                <input
                  type="password"
                  value={password}
                  placeholder="비밀번호를 입력해주세요"
                  id="password"
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                  onChange={onChangePassword}
                />
              </div>
              {error.password && <p className="text-red-500">{error.password}</p>}
              <div className="mb-4">
                <label className="block text-left font-medium mb-2">비밀번호 확인</label>
                <input
                  type="password"
                  value={passwordConfirm}
                  placeholder="비밀번호 다시 입력해주세요"
                  id="passwordConfirm"
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                  onChange={onChangePasswordConfirm}
                />
              </div>
              {error.passwordConfirm && <p className="text-red-500">{error.passwordConfirm}</p>}
              <div className="mb-4">
                <label className="block text-left font-medium mb-2">닉네임</label>
                <input
                  type="text"
                  id="nickname"
                  value={nickname}
                  placeholder="닉네임을 입력해주세요"
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                  onChange={onChangeNickname}
                />
              </div>
              {error.nickname && <p className="text-red-500">{error.nickname}</p>}
              <div className="text-center">
                <button type="submit" className="px-4 py-2 w-80 bg-yellow-500 text-white rounded">
                  회원가입
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpPage;
