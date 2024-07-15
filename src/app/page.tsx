import Page from '@/components/Page';
import PokemonList from '@/components/PokemonList';
import SearchBar from '@/components/SearchBar';

export default function HomePage() {
  return (
    <Page title="Pocket Art">
      <SearchBar />
      <PokemonList />
    </Page>
  );
}
