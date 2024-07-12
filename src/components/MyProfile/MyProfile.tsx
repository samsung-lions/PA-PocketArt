'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import supabase from '@/supabase/supabase';
import { User } from '@supabase/supabase-js';

interface ProfileFormProps {}

const ProfileForm: React.FC<ProfileFormProps> = () => {
  const [url, setUrl] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const defaultImg = 'https://wixafbbadrjlqppqupbt.supabase.co/storage/v1/object/public/avatars/default_profile.jpg';

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      setUser(user);
      console.log(user);
    };
    fetchUser();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 파일 처리 로직을 여기에 추가할 수 있습니다.
  };

  const handleSave = () => {
    // 저장 로직을 여기에 추가할 수 있습니다.
  };

  return (
    <div className="bg-[#ffD400] flex flex-col items-center relative w-80 p-8 rounded-3xl text-center shadow-lg">
      <div className="relative mb-6">
        <Image
          src={url || defaultImg}
          alt="프로필"
          width={120}
          height={120}
          className="rounded-full object-cover border-4 border-black shadow-xl"
        />
        <label className="material-symbols-outlined absolute bottom-1 right-1 bg-black text-white p-2 rounded-full cursor-pointer hover:bg-[#ffD400] transition-colors">
          edit
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      <p className="text-white text-xl font-semibold mb-4">{user?.email || '닉네임'}</p>

      <button
        type="button"
        onClick={handleSave}
        className="w-full bg-black text-white py-2 px-4 rounded-lg hover:text-[#ffD400] transition-colors"
      >
        저장
      </button>
    </div>
  );
};

export default ProfileForm;
