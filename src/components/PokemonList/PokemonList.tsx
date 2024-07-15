'use client';

import { fetchPokemons } from '@/apis/pokemon';
import { PAGE_SIZE } from '@/app/api/pokemons/route';
import { Pokemon } from '@/types/Pokemon.type';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import PokemonCard from '../PokemonCard';
import Spinner from '../Spinner';

const PokemonList = () => {
  const [loading, setLoading] = useState<boolean>(false);

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
      if (lastPage.data.length < PAGE_SIZE) return undefined;
      return lastPage.nextPage;
    },
    initialPageParam: 1
  });

  const { ref, inView } = useInView({
    triggerOnce: false,
    rootMargin: '200px'
  });

  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }
  const handleCardClick = (): void => {
    setLoading(true);
  };

  if (isLoading) {
    return <div className="text-xl font-semibold text-center py-10">몬스터 볼 던지는 중...🍃</div>;
  }
  return (
    <>
      {loading && <Spinner />}
      <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-5">
        {pokemons?.pages.flatMap((page) =>
          page?.data.map((pokemon: Pokemon) => (
            <li
              key={pokemon.id}
              className="bg-white w-40 h-40 rounded-lg p-4 shadow-md hover:scale-125 transition-transform"
            >
              <Link href={`/pokemons/${pokemon.id}`} onClick={handleCardClick}>
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
