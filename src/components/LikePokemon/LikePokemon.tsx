'use client';
import supabase from '@/supabase/supabase';
import { Pokemon } from '@/types/Pokemon.type';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Spinner from '../Spinner';

const fetchPokemon = async (id: string): Promise<Pokemon> => {
  const response = await axios.get(`http://localhost:3000/api/pokemons/${id}`);
  return response.data;
};

export const LikePokemon = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLikedPokemons = async (): Promise<Pokemon[] | undefined> => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase.from('Likes').select('*').eq('userId', user.id);

        if (error) {
          throw error;
        }

        const pokemonData = data.map((item) => fetchPokemon(item.postId.toString()));
        return await Promise.all(pokemonData);
      }
    };
    fetchLikedPokemons()
      .then((data) => {
        setPokemonList(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError('포켓몬 데이터를 불러오는 데 실패했습니다.');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Spinner />;
  if (error) return <div>{error}</div>;

  if (!pokemonList) {
    return (
      <div className="p-6 rounded-lg shadow-xl h-[280px] flex items-center justify-center">
        <p
          className="text-xl text-gray-600 m-36
        "
        >
          아직 좋아요를 누르지 않았어요...🍃
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-3xl shadow-lg w-[600px] h-[320px]">
      <h2 className="text-[#ffD400] text-2xl font-bold mt-4 mb-6 text-center">My Pick</h2>
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active'
        }}
        className="mySwiper h-[225px]"
      >
        {pokemonList.map((item) => (
          <SwiperSlide key={item.id} className="flex items-center justify-center">
            <Link href={`/pokemons/${item.id}`}>
              <div className="w-[180px] h-[180px] p-4 rounded-lg shadow-md transition-transform hover:scale-110 flex flex-col justify-between">
                <h3 className="text-xl font-semibold mb-4 text-center">{item.korean_name}</h3>
                <div className="flex items-center justify-center">
                  <Image
                    src={item.sprites.front_default}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
        <div className=" swiper-button-next after:text-[#FFD400] after:text-2xl"></div>
        <div className=" swiper-button-prev after:text-[#FFD400] after:text-2xl"></div>
      </Swiper>
    </div>
  );
};
