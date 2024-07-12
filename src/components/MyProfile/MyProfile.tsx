'use client';
import supabase from '@/supabase/supabase';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const ProfileForm = () => {
  const [url, setUrl] = useState('');
  const defaultImg = 'https://wixafbbadrjlqppqupbt.supabase.co/storage/v1/object/public/avatars/default_profile.jpg';

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase.from('avatars').select('avatar_url').eq('id', user.id).single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else if (data) {
        setUrl(data.avatar_url);
      }
    }
  }

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;

    const { data, error } = await supabase.storage.from('avatars').upload(fileName, file);

    if (error) {
      console.error('Error uploading file:', error);
    } else {
      const {
        data: { publicUrl }
      } = supabase.storage.from('avatars').getPublicUrl(fileName);

      setUrl(publicUrl);
    }
  };

  const handleSave = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase.storage.from('avatars').update({ id: user.id, avatar_url: url });

      if (error) {
        console.error('error:', error);
      } else {
        alert('저장완료');
      }
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

      <p className="text-white text-xl font-semibold mb-4">닉네임</p>

      <button
        onClick={handleSave}
        type="button"
        className="w-full bg-black text-white py-2 px-4 rounded-lg hover:text-[#ffD400] transition-colors"
      >
        저장
      </button>
    </div>
  );
};

export default ProfileForm;
