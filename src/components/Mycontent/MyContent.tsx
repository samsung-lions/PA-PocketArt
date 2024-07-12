'use client';

import supabase from '@/supabase/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Database } from '@/types/supabase';
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
          console.log('User is not logged in');
          setError('User is not logged in');
          setLoading(false);
          return;
        }

        console.log('user:', user);

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

  return (
    <div className="min-h-screen p-8">
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
