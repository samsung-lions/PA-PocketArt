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
      setUser(user || null);
      if (user) {
        fetchProfileImage(user.id);
      }
    };
    fetchUser();
  }, []);

  const fetchProfileImage = async (userId: string) => {
    const { data, error } = await supabase.from('Users').select('profile_img').eq('id', userId).single();

    if (data && data.profile_img) {
      setUrl(data.profile_img);
    }
  };

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) {
      return;
    }
    const { data, error } = await supabase.storage.from('avatars').upload(`avatar_${Date.now()}.png`, file);

    if (error) {
      console.error('Error uploading file:', error);
      return;
    }

    if (data) {
      const newUrl = `https://wixafbbadrjlqppqupbt.supabase.co/storage/v1/object/public/avatars/${data.path}`;
      setUrl(newUrl);
      await handleSave(newUrl);
    }
  };

  const handleSave = async (imageUrl: string = url) => {
    if (!user) {
      alert('사용자 정보를 불러오는 중 오류가 발생했습니다.');
      return;
    }

    const { data, error } = await supabase.from('Users').update({ profile_img: imageUrl }).eq('id', user.id).select();

    if (error) {
      console.log(error);
      alert('저장 실패');
    } else {
      console.log('data:', data);
      alert('성공');
      setUrl(imageUrl);
    }
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
          <input type="file" className="hidden" onChange={handleFileInputChange} />
        </label>
      </div>

      <p className="text-white text-xl font-semibold mb-4">{user?.email || '닉네임'}</p>

      {/* <button
        type="button"
        onClick={() => handleSave()}
        className="w-full bg-black text-white py-2 px-4 rounded-lg hover:text-[#ffD400] transition-colors"
      >
        저장
      </button> */}
    </div>
  );
};

export default ProfileForm;
