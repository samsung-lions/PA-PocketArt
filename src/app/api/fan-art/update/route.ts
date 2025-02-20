import supabase from '@/supabase/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const imageFile = data.get('imageFile') as File;
  const content = data.get('content') as string;
  const id = Number(data.get('id') as string);
  const prevFanArtURL = data.get('fanArtURL') as string;

  const filename = prevFanArtURL.split('/').slice(-1)[0];

  const { error: imageDeleteError } = await supabase.storage.from('fanArts').remove([filename]);

  if (imageDeleteError) {
    throw new Error(imageDeleteError.message);
  }

  const extension = imageFile.name.split('.').slice(-1)[0];
  const newFilename = `/${crypto.randomUUID()}.${extension}`;

  const { data: imageUploadData, error: imageUploadError } = await supabase.storage
    .from('fanArts')
    .upload(newFilename, imageFile);

  if (imageUploadError) {
    throw new Error(imageUploadError.message);
  }

  const fanArtURL = imageUploadData?.fullPath;

  const { error: updateError } = await supabase.from('FanArts').update({ content, fanArtURL }).eq('id', id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return NextResponse.json('팬아트 수정 완료!');
}
