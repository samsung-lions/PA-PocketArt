import Page from '@/components/Page';
import PokemonList from '@/components/PokemonList';
import SearchBar from '@/components/SearchBar';
import { ConfirmProvider } from '@/contexts/confirm.context';
import { ToastProvider } from '@/contexts/toast.context';

export default function HomePage() {
  return (
    <ToastProvider>
      <ConfirmProvider>
        <Page title="포켓몬 도감">
          <SearchBar />
          <PokemonList />
        </Page>
      </ConfirmProvider>
    </ToastProvider>
  );
}
