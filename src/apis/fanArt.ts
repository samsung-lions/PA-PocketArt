import { GET } from '@/app/api/fan-art/read/route';
import { NextRequest } from 'next/server';

export const fetchNextPage = async (postId: string, page: number) => {
  const response = await GET(new Request(`/api/fan-art/read?postId=${postId}`) as unknown as NextRequest, page + 1);
  return response.json();
};
