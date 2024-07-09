'use client';

import { FanArt } from '@/types/FanArt.type';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import FanArtForm from '../FanArtForm';
import FanArtItem from '../FanArtItem';

// 팬아트 댓글을 조회하는 함수
const fetchFanArts = async () => {
  const { data } = await axios.get('/api/fan-art/read');

  return { data };
};

const FanArtSection = () => {
  const { data: fanArts, isLoading } = useQuery({
    queryKey: ['fanArt', { list: true }],
    queryFn: fetchFanArts
  });

  return (
    <section className="w-full mt-1">
      <FanArtForm />
      {isLoading ? (
        <div className="text-xl font-semibold text-center py-4">Loading...</div>
      ) : (
        <ul className="border rounded">
          {fanArts?.data.length !== 0 ? (
            fanArts?.data.map((fanArt: FanArt) => (
              <li key={fanArt.id} className="rounded p-4">
                <FanArtItem fanArt={fanArt} />
              </li>
            ))
          ) : (
            <div className="text-xl font-semibold text-center py-4">아직 팬아트가 없어요🎨</div>
          )}
        </ul>
      )}
    </section>
  );
};

export default FanArtSection;
