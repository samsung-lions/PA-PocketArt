import supabase from '@/supabase/supabase';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const imageFile = data.get('imageFile') as File;
  const content = data.get('content') as string;
  const postId = data.get('postId') as string;

  // 파일 확장자 추출 & 파일 이름 생성
  const extension = imageFile.name.split('.').slice(-1)[0];
  const filename = `/${nanoid()}.${extension}`;

  // Supabase에 파일 업로드
  const { data: imageFileData, error: imageFileError } = await supabase.storage
    .from('fanArts')
    .upload(filename, imageFile);

  if (imageFileError) {
    throw new Error(imageFileError.message);
  }

  const fanArtURL = 'https://wixafbbadrjlqppqupbt.supabase.co/storage/v1/object/public/' + imageFileData?.fullPath;

  const { error: tableError } = await supabase.from('FanArts').insert({ content, fanArtURL, postId });

  if (tableError) {
    throw new Error(tableError.message);
  }

  return NextResponse.json('팬아트 리뷰 등록 완료!');
}
