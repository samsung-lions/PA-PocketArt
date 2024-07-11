export type FanArt = {
  id: number;
  content: string;
  fanArtURL: string;
  createdAt: string;
  user: {
    id: string;
    nickname: string;
    profileURL: string;
  };
};

export interface FanArtSectionProps {
  postId: string;
}

export interface FanArtItemProps {
  postId: string;
  fanArt: FanArt;
}
