'use client';

import supabase from '@/supabase/supabase';
import { Database } from '@/types/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Spinner from '../Spinner';

type Comment = Database['public']['Tables']['FanArts']['Row'];

const MyContent: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const {
          data: { user },
          error: authError
        } = await supabase.auth.getUser();

        if (authError) {
          console.error('Error fetching user:', authError);
          setError('Error fetching user');
          setLoading(false);
          return;
        }

        if (!user) {
          setError('User is not logged in');
          setLoading(false);
          return;
        }

        const { data, error: dataError } = await supabase.from('FanArts').select('*').eq('writerId', user.id);

        if (dataError) {
          console.error('Error fetching comments:', dataError);
          setError('Error fetching comments');
        } else {
          setComments(data);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        setError('Unexpected error');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;
  if (comments.length === 0) {
    return (
      <div>
        <div className="text-center text-xl text-gray-600 m-36">아직 팬아트 를 올리지 않았습니다...🍃</div>;
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-110"
          >
            <Link href={`/pokemons/${comment.postId}`}>
              <div className="p-6">
                <div className="relative aspect-square">
                  <Image
                    src={`https://wixafbbadrjlqppqupbt.supabase.co/storage/v1/object/public/${comment.fanArtURL}`}
                    alt="Pocket Art"
                    fill
                    className="object-contain border-b border-b-[#212121]"
                  />
                </div>
              </div>

              <div className="px-8 pb-6">
                <p className="text-black text-lg font-semibold mb-1">No. {comment.postId} Pocket Fan Art</p>
                <p className="text-slate-500 text-md">{comment.content}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyContent;
