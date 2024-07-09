import { Pokemon } from '@/types/Pokemon.type';
import Image from 'next/image';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <div className="cursor-pointer">
      <span className="text-sm">No. {pokemon.id}</span>
      <h3 className="text-xl font-semibold">{pokemon.korean_name || pokemon.name}</h3>
      <div className="flex justify-end">
        <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={80} height={80} />
      </div>
    </div>
  );
};

export default PokemonCard;
