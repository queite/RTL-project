import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const charmanderPath = '/pokemons/4';

test('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  const { history } = renderWithRouter(<App />);
  history.push(charmanderPath);
  // screen.logTestingPlaygroundURL();
  const heading = screen.getByRole('heading', { name: 'Charmander Details' });
  expect(heading).toBeInTheDocument();
  const details = screen.queryByRole('link', { name: 'More details' });
  expect(details).not.toBeInTheDocument();
  const headingSummary = screen.getByRole('heading', { name: 'Summary' });
  expect(headingSummary).toBeInTheDocument();
  const paragraph = screen.getByText(/the flame on its tail shows the strength of its/i);
  expect(paragraph).toBeInTheDocument();
});

test('Se existe uma seção com os mapas contendo as localizações do pokémon', () => {
  const charmanderId = 4;
  const locations = pokemons.filter((pokemon) => pokemon.id === charmanderId)[0].foundAt;

  const { history } = renderWithRouter(<App />);
  history.push(charmanderPath);

  const heading = screen.getByRole('heading', { name: 'Game Locations of Charmander' });
  expect(heading).toBeInTheDocument();
  const pokemonLocations = screen.getAllByAltText('Charmander location');
  expect(pokemonLocations).toHaveLength(locations.length);

  locations.forEach((location, index) => {
    const img = screen.getAllByAltText('Charmander location');
    expect(img[index].src).toBe(location.map);
    const locationName = screen.getByText(location.location);
    expect(locationName).toBeInTheDocument();
  });
});

test('Se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
  const { history } = renderWithRouter(<App />);
  history.push(charmanderPath);

  const check = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
  userEvent.click(check);

  const starImg = screen.getByAltText(/is marked as favorite/i);
  expect(starImg.src).toContain('/star-icon.svg');
});
