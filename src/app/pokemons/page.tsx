'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Page from '@/components/Page';
import { Pokemon } from '@/types/Pokemon.type';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PokemonCard from '@/components/PokemonCard';
import Link from 'next/link';

const fetchPokemons = async (searchParams: URLSearchParams) => {
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'name';
  const page = searchParams.get('page') || '1';

  const response = await axios.get(`/api/pokemons?search=${search}&category=${category}&page=${page}`);
  return response.data;
};

const PokemonListPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchInfo, setSearchInfo] = useState({ search: '', category: '' });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemons(searchParams);
      setPokemons(data);
      setSearchInfo({
        search: searchParams.get('search') || '',
        category: searchParams.get('category') === 'name' ? '이름' : '도감번호'
      });
    };

    fetchData();
  }, [searchParams]);

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <Page title="포켓몬 도감" width="lg">
      <div className="w-full flex justify-start px-4 mb-4" onClick={handleBackClick}>
        <img src="/icons/ic-back.png" alt="뒤로가기 버튼" width={30} height={30} className="cursor-pointer" />
      </div>
      {searchInfo.search && (
        <div className="text-center text-lg font-semibold mb-4">
          '{searchInfo.search}'에 대한 검색 결과 ({searchInfo.category})
        </div>
      )}
      <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-5">
        {pokemons.map((pokemon) => (
          <li
            key={pokemon.id}
            className="bg-white w-40 h-40 rounded-lg p-4 shadow-md hover:scale-125 transition-transform"
          >
            <Link href={`/pokemons/${pokemon.id}`} passHref>
              <PokemonCard pokemon={pokemon} />
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
};

export default PokemonListPage;
