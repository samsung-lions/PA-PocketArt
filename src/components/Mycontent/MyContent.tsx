'use cent';
import supabase from '@/supabase/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { useEffect } from 'react';

const MyContent = async () => {
  const { data: comments, error } = await supabase.from('FanArts').select('*');
  if (error) {
    notFound();
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-yellow-400 text-4xl font-bold mb-8 text-center">Fan Arts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className=" rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <Link href={`/pokemons/${comment.id}`}>
              <div className="h-48 relative">
                <Image src={comment.fanArtURL} alt="" layout="fill" objectFit="contain" className="w-full h-full" />
              </div>
              <div className="p-4">
                <p className="text-black text-lg font-semibold mb-2">Fan Art #{comment.id}</p>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyContent;
