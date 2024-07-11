import Chip from '@/components/Chip';
import FanArtSection from '@/components/FanArtSection';
import Like from '@/components/Like';
import Page from '@/components/Page';
import { Pokemon } from '@/types/Pokemon.type';
import axios from 'axios';
import { Metadata } from 'next';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton'; // react-loading-skeleton import
import 'react-loading-skeleton/dist/skeleton.css'; // 스켈레톤 스타일 import

interface PokemonDetailPageProps {
  params: { id: string };
}

// 현재 페이지의 포켓몬 상세 데이터를 가져오는 함수
export const fetchPokemon = async (id: string): Promise<Pokemon> => {
  const response = await axios.get(`http://localhost:3000/api/pokemons/${id}`);

  return response.data;
};

// metadata title 적용
export const generateMetadata = async ({ params }: PokemonDetailPageProps): Promise<Metadata> => {
  const pokemon = await fetchPokemon(params.id);
  return {
    title: `No. ${pokemon.id} - ${pokemon.korean_name || pokemon.name}`
  };
};

const PokemonDetailPage = async ({ params }: PokemonDetailPageProps) => {
  const pokemon = await fetchPokemon(params.id);

  return (
    <Page title={pokemon.korean_name || pokemon.name} width="md" hasBackButton>
      {!pokemon ? (
        <div className="flex flex-col items-center gap-y-3">
          <Skeleton height={30} width={100} />
          <Skeleton height={200} width={200} />
          <Skeleton height={20} width={200} />
          <Skeleton height={20} width={150} />
          <Skeleton height={20} width={100} />
          <Skeleton height={20} width={80} />
        </div>
      ) : (
        <>
          <p className="text-slate-600 font-medium">No. {pokemon.id}</p>
          <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={200} height={200} className="m-2" />

          <div className="flex flex-col justify-center gap-y-3">
            <h3 className="text-xl font-semibold text-center">이름: {pokemon.korean_name || pokemon.name}</h3>
            <p className="text-center">
              키: {pokemon.height}m / 무게: {pokemon.weight}kg
            </p>
            <div className="flex justify-center gap-x-3">
              <div className="flex items-center gap-x-1">
                <span>타입: </span>
                {pokemon.types.map((type) => (
                  <Chip key={type.type.name} label={type.type.korean_name} intent="yellow" />
                ))}
              </div>
              /
              <div className="flex items-center gap-x-1">
                <span>특성: </span>
                {pokemon.abilities.map((ability) => (
                  <Chip key={ability.ability.name} label={ability.ability.korean_name} intent="green" />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-y-3 rounded-lg p-4 bg-slate-100 mt-2">
              <h2 className="text-2xl font-semibold px-2">기술🗡️</h2>
              <div className="flex gap-1 flex-wrap justify-center">
                {pokemon.moves.map((move) => (
                  <Chip key={move.move.name} label={move.move.korean_name} />
                ))}
              </div>
            </div>
          </div>
          <Like />
          <FanArtSection postId={params.id} />
        </>
      )}
    </Page>
  );
};

export default PokemonDetailPage;
