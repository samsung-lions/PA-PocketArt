'use client';

import { FanArt } from '@/types/FanArt.type';
import Image from 'next/image';
import Button from '../Button';

interface FanArtItemProps {
  fanArt: FanArt;
}

const FanArtItem = ({ fanArt }: FanArtItemProps) => {
  const handleClickUpdateButton = () => {};

  const handleClickDeleteButton = () => {};

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
          <Button intent={'submit'} type="submit" onClick={handleClickUpdateButton}>
            수정
          </Button>
          <Button intent={'cancel'} type="button" onClick={handleClickDeleteButton}>
            취소
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FanArtItem;
