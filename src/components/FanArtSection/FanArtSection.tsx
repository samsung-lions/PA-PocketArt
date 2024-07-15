'use client';

import { fetchNextPage } from '@/apis/fanArt';
import supabase from '@/supabase/supabase';
import { FanArt } from '@/types/FanArt.type';
import { User } from '@supabase/supabase-js';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import FanArtForm from '../FanArtForm';
import FanArtItem from '../FanArtItem';
import Pagination from '../Pagination';

export const itemCountPerPage: number = 5;
export const pageCountPerPage: number = 5;

interface FanArtSectionProps {
  postId: string;
  pokemonName: string;
}

const FanArtSection = ({ postId, pokemonName }: FanArtSectionProps) => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { data: fanArts = [], isLoading } = useQuery({
    queryKey: ['fanArt', { page: page + 1 }],
    queryFn: () => fetchNextPage(postId, page),
    placeholderData: keepPreviousData
  });

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      setUser(user || null);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['fanArt', { page: page + 1 }],
      queryFn: () => fetchNextPage(postId, page)
    });
  }, [page, postId, queryClient]);

  const clickListener = (page: number): void => {
    setPage(page - 1);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) return <div className="text-xl font-semibold text-center py-4">Loading...</div>;

  return (
    <section ref={sectionRef} className="w-full mt-1">
      <FanArtForm postId={postId} pokemonName={pokemonName} user={user} />
      <div>
        <ul className="border rounded">
          {fanArts.fanArts.length > 0 ? (
            fanArts.fanArts.map((fanArt: FanArt) => (
              <li key={fanArt.id} className="rounded p-4">
                <FanArtItem fanArt={fanArt} user={user} />
              </li>
            ))
          ) : (
            <div className="text-xl text=[#212121] font-semibold text-center py-8">아직 팬아트가 없어요🎨</div>
          )}
        </ul>
      </div>

      <div className="text-center">
        {fanArts.fanArts.length > 0 && (
          <Pagination
            maxPage={Math.ceil(fanArts.count / itemCountPerPage)}
            itemCountPerPage={itemCountPerPage}
            pageCountPerPage={pageCountPerPage}
            clickListener={(page) => clickListener(page)}
          />
        )}
      </div>
    </section>
  );
};

export default FanArtSection;
