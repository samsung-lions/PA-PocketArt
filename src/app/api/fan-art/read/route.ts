import { itemCountPerPage } from '@/components/FanArtSection/FanArtSection';
import supabase from '@/supabase/supabase';
import { FanArt } from '@/types/FanArt.type';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, page: number) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ error: 'postId is required' }, { status: 400 });
  }
  const start = (page - 1) * itemCountPerPage;
  const end = itemCountPerPage * page;

  const { count } = await supabase.from('FanArts').select('id', { count: 'exact', head: true }).eq('postId', postId);
  const { data, error } = await supabase.from('FanArts').select('*').eq('postId', postId).range(start, end);
  if (error) {
    throw new Error(error.message);
  }

  const fanArts: FanArt[] = data.reverse().map((fanArt) => ({
    id: fanArt.id,
    content: fanArt.content,
    fanArtURL: fanArt.fanArtURL,
    createdAt: fanArt.createdAt.slice(0, 10),
    user: {
      id: fanArt.writerId,
      nickname: '작성자 닉네임',
      profileURL: '/icons/ic-main.png'
    }
  }));

  return NextResponse.json({ fanArts, count });
}
