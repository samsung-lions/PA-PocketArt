'use client';

import { PAGE_SIZE } from '@/app/api/pokemons/route';
import { Pokemon } from '@/types/Pokemon.type';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import PokemonCard from '../PokemonCard';

// 포켓몬 데이터를 가져오는 함수
const fetchPokemons = async ({ pageParam = 1 }: { pageParam: number }) => {
  const { data } = await axios.get(`/api/pokemons?page=${pageParam}`);

  return { data, nextPage: pageParam + 1 };
};

const PokemonList = () => {
  const {
    data: pokemons,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteQuery({
    queryKey: ['pokemon', { list: true }],
    queryFn: fetchPokemons,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length < PAGE_SIZE) return undefined; // 마지막 페이지
      return lastPage.nextPage;
    },
    initialPageParam: 1
  });

  const { ref, inView } = useInView({
    triggerOnce: false,
    rootMargin: '200px' // 뷰포트 끝에서 200px 지점에 도달하면 콜백 실행
  });

  // inView 값이 true로 변경될 때 fetchNextPage 호출
  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  if (isLoading) {
    return <div className="text-xl font-semibold text-center py-10">몬스터 볼 던지는 중...🍃</div>;
  }

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-5">
        {pokemons?.pages.flatMap((page) =>
          page?.data.map((pokemon: Pokemon) => (
            <li
              key={pokemon.id}
              className="bg-white w-40 h-40 rounded-lg p-4 shadow-md hover:scale-125 transition-transform"
            >
              <Link href={`/pokemons/${pokemon.id}`}>
                <PokemonCard pokemon={pokemon} />
              </Link>
            </li>
          ))
        )}
      </ul>
      {isFetchingNextPage && <div className="text-xl font-semibold text-center py-10">몬스터 볼 던지는 중...🍃</div>}
      <div ref={ref} className="h-1"></div>
    </>
  );
};

export default PokemonList;
