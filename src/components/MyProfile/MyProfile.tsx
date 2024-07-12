'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import supabase from '@/supabase/supabase';
import { User } from '@supabase/supabase-js';
import { useToast } from '@/contexts/toast.context';
import { useUserStore } from '@/stores/user';

interface ProfileFormProps {}
const defaultImg = 'https://wixafbbadrjlqppqupbt.supabase.co/storage/v1/object/public/avatars/default_profile.jpg';

const ProfileForm: React.FC<ProfileFormProps> = () => {
  const { setUserInfo } = useUserStore((state) => state);
  const [nickname, setNickname] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [isEditingNickname, setIsEditingNickname] = useState<boolean>(false);
  const [newNickname, setNewNickname] = useState<string>('');
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

  const fetchProfile = async (userId: string): Promise<void> => {
    const { data: getUser, error } = await supabase
      .from('Users')
      .select('profile_img, nickname')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return;
    }

    if (getUser) {
      setUrl(getUser.profile_img || '');
      setNickname(getUser.nickname || '');
    }
  };

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
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
      setUserInfo({ profile_img: newUrl, nickname: nickname });
      await handleImageSave(newUrl);
    }
  };

  const handleImageSave = async (imageUrl: string = url): Promise<void> => {
    if (!user) {
      toast.on({ label: '사용자 정보를 불러오는 중 오류가 발생했습니다.' });
      return;
    }

    const { data, error } = await supabase.from('Users').update({ profile_img: imageUrl }).eq('id', user.id).select();

    if (error) {
      toast.on({ label: '저장실패!' });
    } else {
      toast.on({ label: '저장완료!' });
      setUrl(imageUrl);
    }
  };

  const handleNickNameSave = async (): Promise<void> => {
    if (!user || !newNickname.trim()) {
      toast.on({ label: '닉네임을 입력해주세요.' });
      return;
    }

    const { data, error } = await supabase
      .from('Users')
      .update({ nickname: newNickname.trim() })
      .eq('id', user.id)
      .select();

    if (error) {
      toast.on({ label: '닉네임 변경 실패!' });
    } else {
      toast.on({ label: '닉네임이 변경되었습니다!' });
      setNickname(newNickname.trim());
      setIsEditingNickname(false);
      setNewNickname('');
      setUserInfo({ profile_img: url, nickname: newNickname });
    }
  };

  return (
    <div className="flex flex-col items-center relative w-80 p-8 rounded-3xl text-center shadow-lg m-10">
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

      {isEditingNickname ? (
        <div className="mb-4 w-full">
          <input
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="새 닉네임 입력"
          />
          <div className="flex justify-between mt-2">
            <button
              onClick={handleNickNameSave}
              className="bg-[#ffD400] text-white py-1 px-3 rounded hover:bg-[#e6bf00] transition-colors"
            >
              저장
            </button>
            <button
              onClick={() => {
                setIsEditingNickname(false);
                setNewNickname('');
              }}
              className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-xl font-semibold mb-4">{nickname || '닉네임'}</p>
          <button
            type="button"
            onClick={() => setIsEditingNickname(true)}
            className="w-full bg-black text-white  py-2 px-4 rounded-lg hover:bg-[#ffD400] transition-colors"
          >
            닉네임변경 ⚙
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileForm;
