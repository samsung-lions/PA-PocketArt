import Page from '@/components/Page';
import PokemonList from '@/components/PokemonList';
import { ToastProvider } from '@/contexts/toast.context';

export default function HomePage() {
  return (
    <ToastProvider>
      <Page title="포켓몬 도감">
        <PokemonList />
      </Page>
    </ToastProvider>
  );
}
