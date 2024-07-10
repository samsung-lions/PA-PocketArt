import supabase from '@/supabase/supabase';
import { FanArt } from '@/types/FanArt.type';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  const { data, error } = await supabase.from('FanArts').select('*').eq('postId', postId);

  if (error) {
    throw new Error(error.message);
  }

  const fanArts: FanArt[] = data.map((fanArt) => ({
    id: fanArt.id,
    content: fanArt.content,
    fanArtURL: 'https://wixafbbadrjlqppqupbt.supabase.co/storage/v1/object/public/' + fanArt.fanArtURL,
    createdAt: fanArt.createdAt.slice(0, 10),
    user: {
      id: fanArt.writerId,
      nickname: '작성자 닉네임',
      profileURL: '/icons/ic-main.png'
    }
  }));

  return NextResponse.json(fanArts);
}
