'use client';
import React, { useEffect, useState } from 'react';
import supabase from '@/supabase/supabase';
import { Pokemon } from '@/types/Pokemon.type';
import axios from 'axios';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Spinner from '../Spinner';
import { useRouter } from 'next/navigation';

const fetchPokemon = async (id: string): Promise<Pokemon> => {
  const response = await axios.get(`http://localhost:3000/api/pokemons/${id}`);
  return response.data;
};

export const LikePokemon = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchLikedPokemons = async () => {
      // const {
      //   data: { user },
      //   error: userError
      // } = await supabase.auth.getUser();

      // if (userError || !user) {
      //   alert('로그인하세요');
      //   router.push(`/log-in`);
      //   return;
      // }

      const { data, error } = await supabase.from('Likes').select('*');
      // .eq('userId', user.id);
      if (error) {
        throw error;
      }

      const pokemonData = data.map((item) => fetchPokemon(item.postId.toString()));
      return await Promise.all(pokemonData);
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

  return (
    <div className="p-6 rounded-lg shadow-xl h-[245px] relative">
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={6}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active'
        }}
        className="mySwiper h-[200px]"
      >
        {pokemonList.map((item) => (
          <SwiperSlide key={item.id} className="flex items-center justify-center">
            <Link href={`/pokemons/${item.id}`} className="w-full h-full">
              <div className="p-4 rounded-lg shadow-md transition-transform hover:scale-105 h-full flex flex-col justify-between">
                <h3 className="text-xl font-semibold mb-2 text-center">{item.korean_name}</h3>
                <div className="flex-grow flex items-center justify-center">
                  <Image
                    src={item.sprites.front_default}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="rounded-full p-2"
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
