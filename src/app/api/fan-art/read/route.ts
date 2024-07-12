import { itemCountPerPage } from '@/components/FanArtSection/FanArtSection';
import supabase from '@/supabase/supabase';
import { FanArt } from '@/types/FanArt.type';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, page: number) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId') as string;

  if (!postId) {
    return NextResponse.json({ error: 'postId is required' }, { status: 400 });
  }
  const start = (page - 1) * itemCountPerPage;
  const end = itemCountPerPage * page - 1;

  const { count } = await supabase.from('FanArts').select('id', { count: 'exact', head: true }).eq('postId', postId);
  const { data, error } = await supabase
    .from('FanArts')
    .select('*')
    .eq('postId', postId)
    .order('id', { ascending: false })
    .range(start, end);

  if (error) {
    throw new Error(error.message);
  }

  const fanArts: FanArt[] = await Promise.all(
    data.map(async (fanArt): Promise<FanArt> => {
      const { data: user, error: userError } = await supabase.from('Users').select('*').eq('id', fanArt.writerId);

      if (userError) {
        throw new Error(userError.message);
      }

      return {
        id: fanArt.id,
        content: fanArt.content,
        fanArtURL: 'https://wixafbbadrjlqppqupbt.supabase.co/storage/v1/object/public/' + fanArt.fanArtURL,
        createdAt: fanArt.createdAt.slice(0, 10),
        user: {
          id: user[0].id || '',
          nickname: user[0].nickname || 'writer',
          profileURL: user[0].profile_img
        }
      };
    })
  );

  return NextResponse.json({ fanArts, count });
}
