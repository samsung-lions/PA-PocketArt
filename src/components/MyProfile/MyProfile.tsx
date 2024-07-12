'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import supabase from '@/supabase/supabase';
import { User } from '@supabase/supabase-js';
import { useToast } from '@/contexts/toast.context';

interface ProfileFormProps {}

const ProfileForm: React.FC<ProfileFormProps> = () => {
  const [nickname, setNickname] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const defaultImg = 'https://wixafbbadrjlqppqupbt.supabase.co/storage/v1/object/public/avatars/default_profile.jpg';
  const toast = useToast();

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      setUser(user || null);
      if (user) {
        fetchProfile(user.id);
      }
    };
    fetchUser();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data: getUser } = await supabase.from('Users').select('profile_img, nickname').eq('id', userId).single();

    if (getUser) {
      if (getUser.profile_img) {
        setUrl(getUser.profile_img);
      }
      if (getUser.nickname) {
        setNickname(getUser.nickname);
      }
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
      await handleImageSave(newUrl);
    }
  };

  const handleImageSave = async (imageUrl: string = url) => {
    if (!user) {
      toast.on({ label: '사용자 정보를 불러오는 중 오류가 발생했습니다.' });
      return;
    }

    const { data, error } = await supabase.from('Users').update({ profile_img: imageUrl }).eq('id', user.id).select();

    if (error) {
      console.log(error);
      toast.on({ label: '저장실패!' });
    } else {
      console.log('data:', data);
      toast.on({ label: '저장완료!' });
      setUrl(imageUrl);
    }
  };

  const handleNickNameSave = async () => {};
  return (
    <div className=" flex flex-col items-center relative w-80 p-8 rounded-3xl text-center shadow-lg m-10">
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

      <p className=" text-xl font-semibold mb-4">{nickname || '닉네임'}</p>

      <button
        type="button"
        onClick={() => handleNickNameSave()}
        className="w-full bg-[#ffD400] text-white py-2 px-4 rounded-lg hover:text-black transition-colors"
      >
        닉네임변경
      </button>
    </div>
  );
};

export default ProfileForm;
