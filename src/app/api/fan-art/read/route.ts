import supabase from '@/supabase/supabase';
import { FanArt } from '@/types/FanArt.type';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { data, error } = await supabase.from('FanArts').select('*').eq('postId', '25');

  if (error) {
    throw new Error(error.message);
  }

  const fanArts: FanArt[] = data.map((fanArt, index) => ({
    id: index,
    content: fanArt.content,
    fanArtURL: fanArt.fanArtURL,
    createdAt: fanArt.createdAt.slice(0, 10),
    user: {
      nickname: '작성자 닉네임',
      profileURL: '/icons/ic-main.png'
    }
  }));

  return NextResponse.json(fanArts);
}
