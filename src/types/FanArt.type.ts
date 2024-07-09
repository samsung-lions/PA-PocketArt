export type FanArt = {
  id: number;
  content: string;
  fanArtURL: string;
  createdAt: string;
  user: {
    nickname: string;
    profileURL: string;
  };
};
