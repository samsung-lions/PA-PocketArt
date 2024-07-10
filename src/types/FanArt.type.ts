import { UUID } from 'crypto';

export type FanArt = {
  id: UUID;
  content: string;
  fanArtURL: string;
  createdAt: string;
  user: {
    id: UUID;
    nickname: string;
    profileURL: string;
  };
};

export interface FanArtSectionProps {
  postId: string;
}
