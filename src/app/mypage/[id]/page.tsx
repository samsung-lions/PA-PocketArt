import { LikePokemon } from '@/components/LikePokemon/LikePokemon';
import MyContent from '@/components/Mycontent/MyContent';
import ProfileForm from '@/components/MyProfile/MyProfile';

import React from 'react';

const page = () => {
  return (
    <div className="m-8">
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-3">
          <ProfileForm />
        </div>
        <div className="col-span-7">
          <h2 className="text-[#ffD400] text-3xl font-bold mb-4 text-center">My Pick</h2>
          <LikePokemon />
        </div>
      </div>
      <MyContent />
    </div>
  );
};

export default page;
