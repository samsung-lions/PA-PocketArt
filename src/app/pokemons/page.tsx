'use client';

import { fetchSearchPokemons } from '@/apis/pokemon';
import Page from '@/components/Page';
import PokemonCard from '@/components/PokemonCard';
import SkeletonLoader from '@/components/SkeletonLoader';
import Spinner from '@/components/Spinner/Spinner';
import { Pokemon } from '@/types/Pokemon.type';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

const PokemonListPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchInfo, setSearchInfo] = useState({ search: '', category: '' });
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchSearchPokemons(searchParams);
      setPokemons(data);
      setSearchInfo({
        search: searchParams.get('search') || '',
        category: searchParams.get('category') === 'name' ? '이름' : '도감번호'
      });
      setLoading(false);
    };

    fetchData();
  }, [searchParams]);

  const handleBackClick = () => {
    router.push('/');
  };

  const handleCardClick = (id: number) => {
    setLoadingDetail(true);
    router.push(`/pokemons/${id}`);
  };

  return (
    <Page title="포켓몬 도감" width="lg">
      <Suspense fallback={<SkeletonLoader />}>
        <div className="w-full flex justify-start px-4 mb-4" onClick={handleBackClick}>
          <Image src="/icons/ic-back.png" alt="뒤로가기 버튼" width={30} height={30} className="cursor-pointer" />
        </div>
        {searchInfo.search && (
          <div className="text-center text-lg font-semibold mb-4">
            <span className="text-[#ffd400]">&apos;{searchInfo.search}&apos;</span>에 대한 검색 결과 (
            {searchInfo.category})
          </div>
        )}
        {loading ? (
          <SkeletonLoader />
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-5">
            {pokemons.map((pokemon) => (
              <li
                key={pokemon.id}
                className="bg-white w-40 h-40 rounded-lg p-4 shadow-md hover:scale-125 transition-transform"
                onClick={() => handleCardClick(pokemon.id)}
              >
                <PokemonCard pokemon={pokemon} />
              </li>
            ))}
          </ul>
        )}
        {loadingDetail && <Spinner />}
      </Suspense>
    </Page>
  );
};

export default PokemonListPage;
