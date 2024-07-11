import supabase from '@/supabase/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get('id'));

  const { data, error: selectError } = await supabase.from('FanArts').select().eq('id', id);
  const imageURL: string = data?.[0].fanArtURL.split('/').slice(-1)[0] || '';

  if (selectError) {
    throw new Error(selectError.message);
  }

  const { error: storageError } = await supabase.storage.from('fanArts').remove([imageURL]);

  if (storageError) {
    throw new Error(storageError.message);
  }

  const { error: deleteError } = await supabase.from('FanArts').delete().eq('id', id);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  return NextResponse.json('팬아트가 삭제되었습니다');
}
