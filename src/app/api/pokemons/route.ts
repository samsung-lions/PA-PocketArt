import axios, { AxiosResponse } from 'axios';
import { NextResponse } from 'next/server';

export const TOTAL_POKEMON = 250;
export const PAGE_SIZE = 20;

export const GET = async (request: Request): Promise<NextResponse> => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'name';
  const offset = (page - 1) * PAGE_SIZE;

  try {
    const allPokemonPromises = Array.from({ length: TOTAL_POKEMON }, (_, index) => {
      const id = index + 1;
      return Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      ]);
    });

    const allPokemonResponses = await Promise.all(allPokemonPromises);

    let allPokemonData = allPokemonResponses.map(([response, speciesResponse]) => {
      const koreanName = speciesResponse.data.names.find((name: any) => name.language.name === 'ko');
      return { ...response.data, korean_name: koreanName?.name || null };
    });

    if (search) {
      if (category === 'name') {
        allPokemonData = allPokemonData.filter(
          (pokemon) => pokemon.korean_name.includes(search) || pokemon.name.includes(search)
        );
      } else if (category === 'id') {
        allPokemonData = allPokemonData.filter((pokemon) => pokemon.id === parseInt(search));
      }
    } else {
      allPokemonData = allPokemonData.slice(offset, offset + PAGE_SIZE);
    }

    return NextResponse.json(allPokemonData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' });
  }
};
