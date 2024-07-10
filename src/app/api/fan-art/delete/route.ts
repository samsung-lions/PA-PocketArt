import supabase from '@/supabase/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const { error } = await supabase.from('FanArts').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return NextResponse.json('팬아트가 삭제되었습니다');
}
