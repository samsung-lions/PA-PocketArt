import { useFormModal } from '@/contexts/formModal.context';
import { useToast } from '@/contexts/toast.context';
import { FanArtItemProps } from '@/types/FanArt.type';
import Image from 'next/image';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import Button from '../Button';

const FanArtModal = ({ postId, fanArt }: FanArtItemProps) => {
  const toast = useToast();
  const form = useFormModal();

  const [preview, setPreview] = useState<string>(fanArt.fanArtURL);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>(fanArt.content);

  useEffect(() => {
    // URL을 Blob으로 변환하고 Blob을 File로 변환하는 함수
    const urlToFile = async (url: string) => {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.split('/').slice(-1)[0];
      const extension = filename.split('.').slice(-1)[0];
      const metadata = { type: `image/${extension}` };
      return new File([blob], filename, metadata);
    };

    const initializeImageFile = async () => {
      const file = await urlToFile(fanArt.fanArtURL);
      setImageFile(file);
    };

    initializeImageFile();
  }, []);

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

  const handleSubmitForm = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    if (!imageFile || !content) return toast.on({ label: '팬아트와 소개글을 모두 작성해주세요.' });

    const formData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('content', content);
    formData.append('postId', postId);

    // createFanArt(formData);
  };

  const handleClickCloseButton = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    const check = confirm('수정을 취소하시겠습니까?');

    if (check) {
      form.close();
      toast.on({ label: '수정이 취소되었습니다.' });
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-20 bg-black bg-opacity-50 flex justify-center items-center">
      <form className="flex rounded-lg justify-center p-6 gap-x-6 bg-white mb-12 scale-125">
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
            className="w-full flex-grow bg-slate-100 text-[#212121] rounded px-4 py-2.5 focus:scale-105 transition"
            value={content}
            onChange={handleChangeContentTextArea}
            placeholder="팬아트에 대해 소개해주세요."
          />
          <div className="flex justify-end gap-x-2">
            <Button intent={'submit'} type="submit" onClick={handleSubmitForm}>
              수정 완료
            </Button>
            <Button intent={'cancel'} type="button" onClick={handleClickCloseButton}>
              취소
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FanArtModal;
