import { User } from '@supabase/supabase-js';

export type FanArt = {
  id: number;
  content: string;
  fanArtURL: string;
  createdAt: string;
  user: {
    id: string;
    nickname: string;
    profileURL: string | null;
  };
};
export type FanArts = {
  FanArts: FanArt[];
  count: number;
};

export interface FanArtItemProps {
  fanArt: FanArt;
  user?: User | null;
}
