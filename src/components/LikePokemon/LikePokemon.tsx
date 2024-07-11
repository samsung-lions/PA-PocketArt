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

const fetchPokemon = async (id: string): Promise<Pokemon> => {
  const response = await axios.get(`http://localhost:3000/api/pokemons/${id}`);
  return response.data;
};

const fetchLikedPokemons = async () => {
  const { data, error } = await supabase.from('Likes').select('*');
  if (error) {
    throw error;
  }

  const pokemonData = data.map((item) => fetchPokemon(item.postId.toString()));
  return await Promise.all(pokemonData);
};

export const LikePokemon = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
    <div className=" p-6 rounded-lg shadow-xl ">
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={6}
        navigation
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {pokemonList.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={`/pokemons/${item.id}`}>
              <div className="  p-4 rounded-lg shadow-md transition-transform hover:scale-105">
                <h3 className=" text-xl font-semibold mb-2 text-center">{item.korean_name}</h3>
                <div className="flex justify-center">
                  <Image
                    src={item.sprites.front_default}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-full  p-2"
                  />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
