import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

test('Se é exibido na tela a mensagem No favorite pokemon found.', () => {
  renderWithRouter(<FavoritePokemons />);

  const msg = screen.getByText('No favorite pokemon found');
  expect(msg).toBeInTheDocument();
});

test('Se são exibido todos os cards de pokémons favoritados', () => {
  const pokemons = [{
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
  },
  ];

  renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

  const favorites = screen.getAllByTestId('pokemon-name');
  expect(favorites).toHaveLength(2);
});
