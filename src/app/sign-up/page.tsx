'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { supabase } from '../../../utils/supabase/client';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
  };
  //유효성 검사

  return (
    <form onSubmit={onSubmit}>
      <div>
        <div className="bg-black h-14 p-1">
          <Image src="/logo.png" alt="로고" width={70} height={50} />
        </div>
        <div className="flex justify-center mt-12">
          <div className="text-center border border-black w-60 rounded-full text-lg font-bold p-4 ">회원가입</div>
        </div>
        <div>
          <div className="flex justify-center mt-12">
            <div className="w-100 rounded-lg text-lg font-bold p-4 border border-black">
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
