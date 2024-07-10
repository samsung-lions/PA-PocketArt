'use client';
import supabase from '@/supabase/supabase';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const MyProfile = () => {
  const fileInputRef = useRef(null);
  const [profileUrl, setProfileUrl] = useState('');
  function checkProfile() {
    const { data } = supabase.storage.from('avatars').getPublicUrl('default-profile.jpg');

    setProfileUrl(data.publicUrl);
  }

  async function handleFileInputChange(files) {
    const [file] = files;

    if (!file) {
      return;
    }

    const { data } = await supabase.storage.from('avatars').upload(`avatar_${Date.now()}.png`, file);

    setProfileUrl(`https://<project>.supabase.co/storage/v1/object/public/avatars/${data?.path}`);
  }
  useEffect(() => {
    checkProfile();
  }, []);

  return (
    <div className="w-300 h-300">
      <input
        onChange={(e) => handleFileInputChange(e.target.files)}
        type="file"
        ref={fileInputRef}
        className="hidden"
      />
      <Image
        className="rounded-full cursor-pointer w-100 h-100 bg-black"
        width={200}
        height={200}
        src={profileUrl}
        alt="profile"
        onClick={() => fileInputRef.current?.click()}
      />
    </div>
  );
};

export default MyProfile;
