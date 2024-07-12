import Page from '@/components/Page';
import PokemonList from '@/components/PokemonList';
import SearchBar from '@/components/SearchBar';
import supabase from '@/supabase/supabase';
import { useUserStore } from '@/stores/user';

export default function HomePage() {
  return (
    <Page title="포켓몬 도감">
      <SearchBar />
      <PokemonList />
    </Page>
  );
}
