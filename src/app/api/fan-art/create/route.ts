import supabase from '@/supabase/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const imageFile = data.get('imageFile') as File;
  const content = data.get('content') as string;
  const postId = data.get('postId') as string;
  const writerId = data.get('writerId') as string;

  const extension = imageFile.name.split('.').slice(-1)[0];
  const filename = `/${crypto.randomUUID()}.${extension}`;

  const { data: imageFileData, error: imageFileError } = await supabase.storage
    .from('fanArts')
    .upload(filename, imageFile);

  if (imageFileError) {
    throw new Error(imageFileError.message);
  }

  const fanArtURL = imageFileData?.fullPath;

  const { error: insertError } = await supabase.from('FanArts').insert({ content, fanArtURL, postId, writerId });

  if (insertError) {
    throw new Error(insertError.message);
  }

  return NextResponse.json('팬아트 리뷰 등록 완료!');
}
