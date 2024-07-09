import supabase from '@/supabase/supabase';
import { Pokemon } from '@/types/Pokemon.type';
import axios from 'axios';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// 현재 페이지의 포켓몬 상세 데이터를 가져오는 함수
const fetchPokemon = async (id: string): Promise<Pokemon> => {
  const response = await axios.get(`http://localhost:3000/api/pokemons/${id}`);
  return response.data;
};

export const LikePokemon = async () => {
  const { data, error } = await supabase.from('Likes').select('*');
  if (error) {
    notFound();
  }

  const pokemonData = data.map((item) => fetchPokemon(item.postId.toString()));
  const PokemonThatChoseLike = await Promise.all(pokemonData);

  return (
    <div>
      {PokemonThatChoseLike.map((item) => (
        <div key={item.id}>
          <h3>이름: {item.korean_name}</h3>
          <Image src={item.sprites.front_default} alt={item.name} width={60} height={60} className="m-2" />
        </div>
      ))}
    </div>
  );
};
