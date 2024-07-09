import supabase from '@/supabase/supabase';

import React from 'react';

export const LikePokemon = async () => {
  const { data } = await supabase.from('Likes').select('*');
  console.log(data);
  return <div></div>;
};
