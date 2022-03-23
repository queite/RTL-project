import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const moreDetails = { name: 'More details' };
const pikachuPath = '/pokemons/25';

describe('Testa o componente <Pokemon.js />', () => {
  test('Se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/electric/i);
    const img = screen.getByAltText('Pikachu sprite');
    expect(img.src).toContain('https://');
  });

  test('Se contém um link de navegação para exibir detalhes do Pokémon.', (() => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', moreDetails);
    expect(details.href).toContain(pikachuPath);

    userEvent.click(details);

    const heading = screen.getByRole('heading', { name: /pikachu details/i });
    expect(heading).toBeInTheDocument();
  }));

  test('Se o link de navegação, há redirecionamento para a página detalhes.', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', moreDetails);

    userEvent.click(details);

    const headingDetails = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(headingDetails).toBeInTheDocument();
  });

  test('Se a URL exibida no navegador muda para /pokemon/<id>.', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', moreDetails);

    userEvent.click(details);

    expect(history.location.pathname).toBe(pikachuPath);
  });

  test('se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuPath);

    const check = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(check);

    history.push('/');
    const starImg = screen.getByAltText(/is marked as favorite/i);
    expect(starImg.src).toContain('/star-icon.svg');
  });
});
