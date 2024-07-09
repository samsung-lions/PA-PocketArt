import Page from '@/components/Page';
import PokemonList from '@/components/PokemonList';
import { ToastProvider } from '@/contexts/toast.context';
import SearchBar from '@/components/SearchBar';

export default function HomePage() {
  return (
    <ToastProvider>
      <Page title="포켓몬 도감">
        <SearchBar />
        <PokemonList />
      </Page>
    </ToastProvider>
  );
}
