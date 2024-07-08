'use client';

import Image from 'next/image';
import { ChangeEvent, MouseEvent, useState } from 'react';
import Button from '../Button';

const ReviewForm = () => {
  const [fanArt, setFanArt] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [isOpenedForm, setIsOpenedForm] = useState<boolean>(false);

  const changeIsOpenedForm = () => {
    setIsOpenedForm(!isOpenedForm);
  };

  const handleChangeFanArtInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFanArt(previewUrl);

      // Clean up the URL object when component unmounts or fanArt changes
      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  const handleChangeContentTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmitForm = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
  };

  return (
    <div>
      {isOpenedForm ? (
        <form className="flex border rounded justify-center p-6 gap-x-6">
          <div className="flex justify-center items-center shadow-md rounded aspect-square hover:scale-110 transition">
            <Image
              src={fanArt || '/icons/ic-art.png'}
              alt="Pocket Art"
              width={300}
              height={300}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <input
              className="border rounded text-[#212121] px-3 py-2 file:cursor-pointer file:bg-[#ffD400] file:border-none file:rounded file:font-semibold file:text-sm file:px-3 file:py-1.5 file:mr-3 file:hover:brightness-90 file:active:brightness-75 file:hover:scale-105 file:transition"
              type="file"
              onChange={handleChangeFanArtInput}
            />
            <textarea
              className="w-full flex-grow bg-slate-100 text-[#212121] rounded px-4 py-2.5 focus:scale-105 transition"
              value={content}
              onChange={handleChangeContentTextArea}
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
        <div className="flex justify-end px-3">
          <Button onClick={changeIsOpenedForm}>팬아트 작성</Button>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
