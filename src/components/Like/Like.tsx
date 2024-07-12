'use client';

import supabase from '@/supabase/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
const DEFAULT_HEART = '🤍';
const PUSHED_HEART = '❤️';
function PocketLayout() {
  const { id } = useParams<{ id: string }>();

  const userId = '98732590-e014-4666-bb87-09a9a4562fe8';
  const queryClient = useQueryClient();

  const { data: getLikes } = useQuery({
    queryKey: ['pockets', id],
    queryFn: async () => {
      const { data } = await supabase.from('Likes').select('*').eq('postId', id);
      const userLike = !!data?.find((like) => like.userId === userId);
      return { data, userLike };
    }
  });

  const handleAddLike = async (): Promise<void> => {
    if (!getLikes?.userLike) {
      const { error } = await supabase.from('Likes').insert({ postId: id, userId: userId });
      if (error) throw error;
    } else {
      const { error } = await supabase.from('Likes').delete().eq('userId', userId).eq('postId', id);
      if (error) throw error;
    }
  };

  const addMutation = useMutation({
    mutationFn: handleAddLike,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['pockets', id] });
      const previousPockets: any = queryClient.getQueryData(['pockets', id]);
      queryClient.setQueryData(['pockets', id], () => {
        return !getLikes?.userLike
          ? { data: [...previousPockets.data, { postId: id, userId }], userLike: true }
          : {
              data: previousPockets.data.filter((like: any) => !(like.userId === userId)),
              userLike: false
            };
      });

      return { previousPockets };
    },
    onError: (err, addLike, context) => {
      queryClient.setQueryData(['pockets', id], context?.previousPockets);
    }
  });

  return (
    <div className="w-full m-3 flex flex-row gap-x-3">
      <button onClick={() => addMutation.mutate()}>
        <span className="text-2xl">{getLikes?.userLike ? PUSHED_HEART : DEFAULT_HEART}</span>
        <span>{getLikes?.data?.length || '0'}</span>
      </button>
    </div>
  );
}

export default PocketLayout;
