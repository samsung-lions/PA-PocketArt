import { LikePokemon } from '@/components/LikePokemon/LikePokemon';
import MyContent from '@/components/Mycontent/MyContent';

import React from 'react';

const page = () => {
  return (
    <div>
      <h2 className="text-[#ffD400] text-3xl font-bold  mb-4 text-center">My Pick</h2>
      <LikePokemon />
      <MyContent />
    </div>
  );
};

export default page;
