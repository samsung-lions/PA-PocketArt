import { LikePokemon } from '@/components/LikePokemon/LikePokemon';
import MyContent from '@/components/Mycontent/MyContent';
import MyProfile from '@/components/MyProfile/MyProfile';

import React from 'react';

const page = () => {
  return (
    <div>
      <MyProfile />
      <h2 className="text-yellow-400 text-3xl font-bold text-black mb-4 text-center">My Pick</h2>
      <LikePokemon />
      <MyContent />
    </div>
  );
};

export default page;
