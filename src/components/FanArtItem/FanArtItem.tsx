'use client';

import { useFormModal } from '@/contexts/formModal.context';
import { useToast } from '@/contexts/toast.context';
import { FanArtItemProps } from '@/types/FanArt.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import Button from '../Button';
import ConfirmModal from '../ConfirmModal';

const FanArtItem = ({ postId, fanArt }: FanArtItemProps) => {
  const queryClient = useQueryClient();

  const toast = useToast();
  const form = useFormModal();

  const [isClickDeleteButton, setIsClickDeleteButton] = useState<boolean>(false);

  const { mutate: deleteFanArt } = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/fan-art/delete?id=${id}`),
    onSuccess: () => {
      toast.on({ label: '팬아트가 삭제되었습니다' });
      setIsClickDeleteButton(false);

      queryClient.refetchQueries({ queryKey: ['fanArt'], type: 'active' });
    },
    onError: (error) => console.error('팬아트 삭제 실패: ', error)
  });

  const handleClickUpdateButton = (): void => {
    form.open({ postId, fanArt });
  };

  const handleClickDeleteButton = async (): Promise<void> => {
    deleteFanArt(fanArt.id.toString());
  };
  const confirmDelete = (): void => {
    setIsClickDeleteButton(true);
  };

  const cancelDelete = (): void => {
    setIsClickDeleteButton(false);
  };

  return (
    <div className="flex justify-center border rounded p-6 gap-x-6">
      <div className="flex justify-center items-center shadow-md rounded hover:scale-110 transition">
        <div className="relative w-[300px] h-[300px] aspect-square">
          <Image src={fanArt.fanArtURL} alt="Pocket Art" fill className="object-contain rounded" />
        </div>
      </div>

      <div className="flex flex-col flex-grow gap-y-3">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-x-1">
            <Image src={fanArt.user.profileURL} alt="사용자이미지" width={40} height={40} className="rounded-full" />
            <span className="font-semibold px-1.5 text-[#212121]">{fanArt.user.nickname}</span>
          </div>
          <span className="text-sm text-slate-500">{fanArt.createdAt}</span>
        </div>

        <div className="w-full flex-grow text-lg bg-slate-100 text-[#212121] rounded px-6 py-4">{fanArt.content}</div>

        <div className="flex justify-end gap-x-2">
          {isClickDeleteButton && (
            <ConfirmModal
              modalOptions={{
                label: '팬아트를 삭제하시겠습니까?'
              }}
              handleClick={handleClickDeleteButton}
              handleClickCancel={cancelDelete}
            />
          )}
          <Button intent={'submit'} type="submit" onClick={handleClickUpdateButton}>
            수정
          </Button>
          <Button intent={'cancel'} type="button" onClick={confirmDelete}>
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FanArtItem;
