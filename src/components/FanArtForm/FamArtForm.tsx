'use client';

import { useToast } from '@/contexts/toast.context';
import { FanArtSectionProps } from '@/types/FanArt.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { ChangeEvent, MouseEvent, useState } from 'react';
import Button from '../Button';

const FanArtForm = ({ postId }: FanArtSectionProps) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [preview, setPreview] = useState<string>('/icons/ic-art.png');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>('');
  const [isOpenedForm, setIsOpenedForm] = useState<boolean>(false);

  const { mutateAsync: createFanArt } = useMutation({
    mutationFn: (newFanArt: FormData) =>
      axios.post('/api/fan-art/create', newFanArt, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['fanArt'], type: 'active' });
      toast.on({ label: '팬아트가 등록되었습니다!' });
      setIsOpenedForm(false);
      setImageFile(null);
      setPreview('/icons/ic-art.png');
      setContent('');
    },
    onError: (error) => {
      console.error('팬아트 등록 실패: ', error);
    }
  });

  const changeIsOpenedForm = () => {
    setIsOpenedForm(!isOpenedForm);
  };

  // 팬아트 프리뷰
  const showFanArtPreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  const handleChangeContentTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmitForm = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    if (!imageFile || !content) return alert('팬아트와 소개글을 모두 작성해주세요.');

    const formData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('content', content);
    formData.append('postId', postId);

    createFanArt(formData);
  };

  return (
    <div>
      {isOpenedForm ? (
        <form className="flex border rounded justify-center p-6 gap-x-6 bg-slate-100 mb-12">
          <div className="flex justify-center items-center shadow-md rounded hover:scale-110 transition">
            <div className="relative w-[300px] h-[300px] aspect-square">
              <Image src={preview} alt="Pocket Art" fill className="object-contain rounded bg-white" />
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <input
              className="border rounded bg-white text-[#212121] px-3 py-2 file:cursor-pointer file:bg-[#ffD400] file:border-none file:rounded file:font-semibold file:text-sm file:px-3 file:py-1.5 file:mr-3 file:hover:brightness-110 file:active:brightness-125 file:hover:scale-105 file:transition"
              type="file"
              onChange={showFanArtPreview}
            />
            <textarea
              className="w-full flex-grow bg-white text-[#212121] rounded px-4 py-2.5 focus:scale-105 transition"
              value={content}
              onChange={handleChangeContentTextArea}
              placeholder="팬아트에 대해 소개해주세요."
            />
            <div className="flex justify-end gap-x-2">
              <Button intent={'submit'} type="submit" onClick={handleSubmitForm}>
                작성 완료
              </Button>
              <Button intent={'cancel'} type="button" onClick={changeIsOpenedForm}>
                취소
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex justify-end px-3 mb-3">
          <Button onClick={changeIsOpenedForm}>팬아트 작성</Button>
        </div>
      )}
    </div>
  );
};

export default FanArtForm;
