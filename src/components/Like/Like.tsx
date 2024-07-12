'use client';

import { useToast } from '@/contexts/toast.context';
import { useUserStore } from '@/stores/user';
import supabase from '@/supabase/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
const DEFAULT_HEART = '🤍';
const PUSHED_HEART = '❤️';
function PocketLayout() {
  const toast = useToast();
  const { id } = useParams<{ id: string }>();
  const { user } = useUserStore((state) => state);
  const queryClient = useQueryClient();

  const { data: getLikes } = useQuery({
    queryKey: ['pockets', id],
    queryFn: async () => {
      const { data } = await supabase.from('Likes').select('*').eq('postId', id);
      const userLike = !!data?.find((like) => like.userId === user?.id);
      return { data, userLike };
    }
  });

  const handleAddLike = async (): Promise<void> => {
    if (!user?.id) {
      toast.on({ label: '로그인이 필요한 서비스입니다' });
      return;
    }
    if (!getLikes?.userLike) {
      const { error } = await supabase.from('Likes').insert({ postId: id, userId: user.id });
      if (error) throw error;
    } else {
      const { error } = await supabase.from('Likes').delete().eq('userId', user.id).eq('postId', id);
      if (error) throw error;
    }
  };

  const addMutation = useMutation({
    mutationFn: handleAddLike,
    onMutate: async () => {
      if (!user?.id) {
        toast.on({ label: '로그인이 필요한 서비스입니다' });
        return;
      }
      await queryClient.cancelQueries({ queryKey: ['pockets', id] });
      const previousPockets: any = queryClient.getQueryData(['pockets', id]);
      queryClient.setQueryData(['pockets', id], () => {
        return !getLikes?.userLike
          ? { data: [...previousPockets.data, { postId: id, userId: user?.id }], userLike: true }
          : {
              data: previousPockets.data.filter((like: any) => !(like.userId === user?.id)),
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
