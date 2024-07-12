import { useConfirm } from '@/contexts/confirm.context';
import { useFormModal } from '@/contexts/formModal.context';
import { useToast } from '@/contexts/toast.context';
import { FanArtItemProps } from '@/types/FanArt.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../Button';
import ConfirmModal from '../ConfirmModal';

const FanArtModal = ({ postId, fanArt }: FanArtItemProps) => {
  const queryClient = useQueryClient();

  const toast = useToast();
  const confirmToast = useConfirm();
  const form = useFormModal();

  const [preview, setPreview] = useState<string>(fanArt.fanArtURL);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>(fanArt.content);
  const [isCancel, setIsCancel] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate: updateFanArt } = useMutation({
    mutationFn: (newFanArt: FormData) =>
      axios.post('/api/fan-art/update', newFanArt, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }),
    onSuccess: () => {
      toast.on({ label: '팬아트가 수정되었습니다.' });
      confirmToast.off();
      setIsLoading(false);

      queryClient.refetchQueries({ queryKey: ['fanArt'], type: 'active' });

      form.close();
    },
    onError: (error) => {
      console.error('팬아트 수정 실패: ', error);
      setIsLoading(false); // 로딩 상태 해제
    }
  });

  useEffect(() => {
    const urlToFile = async (url: string): Promise<File> => {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.split('/').slice(-1)[0];
      const extension = filename.split('.').slice(-1)[0];
      const metadata = { type: `image/${extension}` };
      return new File([blob], filename, metadata);
    };

    const initializeImageFile = async (): Promise<void> => {
      const file = await urlToFile(fanArt.fanArtURL);
      setImageFile(file);
    };

    initializeImageFile();
  }, []);

  const showFanArtPreview = (e: ChangeEvent<HTMLInputElement>): (() => void) | undefined => {
    const file = e.target.files?.[0];
    setImageFile(file || null);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  const handleChangeContentTextArea = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
  };

  const handleSubmitForm = (): void => {
    if (!imageFile || !content) return toast.on({ label: '팬아트와 소개글을 모두 작성해주세요.' });

    setIsLoading(true);

    const formData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('content', content);
    formData.append('id', fanArt.id.toString());
    formData.append('fanArtURL', fanArt.fanArtURL);

    updateFanArt(formData);
  };

  const handleClickCloseButton = (): void => {
    form.close();
    toast.on({ label: '수정이 취소되었습니다.' });
    confirmToast.off();
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-20 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex rounded-lg justify-center p-6 gap-x-6 bg-white mb-12 scale-125"
      >
        <div className="flex justify-center items-center shadow-md rounded hover:scale-110 transition">
          <div className="relative w-[300px] h-[300px] aspect-square">
            <Image src={preview} alt="Pocket Art" fill className="object-contain rounded bg-white" />
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <input
            className="w-[400px] border rounded bg-white text-[#212121] px-3 py-2 file:cursor-pointer file:bg-[#ffD400] file:border-none file:rounded file:font-semibold file:text-sm file:px-3 file:py-1.5 file:mr-3 file:hover:brightness-110 file:active:brightness-125 file:hover:scale-105 file:transition"
            type="file"
            onChange={showFanArtPreview}
          />
          <textarea
            className="w-full resize-none flex-grow bg-slate-100 text-[#212121] rounded px-4 py-2.5 focus:scale-105 transition"
            value={content}
            onChange={handleChangeContentTextArea}
            placeholder="팬아트에 대해 소개해주세요."
          />
          <div className="flex justify-end gap-x-2">
            <div>
              {!isCancel && confirmToast.modalOptions && (
                <ConfirmModal
                  modalOptions={confirmToast.modalOptions}
                  handleClick={handleSubmitForm}
                  isLoading={isLoading}
                />
              )}
              <Button
                intent={'submit'}
                type="button"
                onClick={() => confirmToast.on({ label: '수정 완료 하시겠습니까?' })}
                isDisabled={isLoading}
              >
                수정 완료
              </Button>
            </div>
            <div>
              {isCancel && confirmToast.modalOptions && (
                <ConfirmModal
                  modalOptions={confirmToast.modalOptions}
                  handleClick={handleClickCloseButton}
                  isLoading={false}
                />
              )}
              <Button
                intent={'cancel'}
                type="button"
                onClick={() => {
                  setIsCancel(true);
                  confirmToast.on({ label: '수정을 취소하시겠습니까?' });
                }}
              >
                취소
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FanArtModal;
