import supabase from '@/supabase/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { imageFile } = await request.json();
  console.log(imageFile);

  const extension = imageFile.name.split('.').slice(-1)[0];
  const filename = crypto.randomUUID() + '.' + extension;

  await supabase.storage.from('fanArts').upload(filename, imageFile);

  return NextResponse.json('팬아트 이미지 등록 완료!');
}
