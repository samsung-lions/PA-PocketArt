'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useState } from 'react';

type Comment = Database['public']['Tables']['FanArts']['Row'];

const MyContent: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const fetchComments = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      console.log('user:', user);

      const { data, error } = await supabase.from('FanArts').select('*');

      if (error) {
        throw error;
      } else {
        setComments(data);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h2 className="text-[#ffD400] text-4xl font-bold mb-8 text-center">Fan Arts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <Link href={`/pokemons/${comment.postId}`}>
              <div className="h-48 relative">
                <Image
                  src={`https://wixafbbadrjlqppqupbt.supabase.co/storage/v1/object/public/${comment.fanArtURL}`}
                  alt="Pocket Art"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-4">
                <p className="text-black text-lg font-semibold mb-2">Fan Art #{comment.postId}</p>
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
