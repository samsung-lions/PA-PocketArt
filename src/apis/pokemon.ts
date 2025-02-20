import { Pokemon } from '@/types/Pokemon.type';
import axios from 'axios';

export const TOTAL_POKEMON = 250;
export const PAGE_SIZE = 20;

export const BASE_URL = 'https://pa-pocket-art-gojp-git-main-yuyeongs-projects.vercel.app';

export const fetchPokemons = async ({ pageParam = 1 }: { pageParam: number }) => {
  const { data } = await axios.get(`/api/pokemons?page=${pageParam}`);
  return { data, nextPage: pageParam + 1 };
};

export const fetchPokemon = async (id: string): Promise<Pokemon> => {
  const response = await axios.get(`${BASE_URL}/api/pokemons/${id}`);
  return response.data;
};

export const fetchSearchPokemons = async (searchParams: URLSearchParams) => {
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'name';
  const page = searchParams.get('page') || '1';

  const response = await axios.get(`/api/pokemons?search=${search}&category=${category}&page=${page}`);
  return response.data;
};
