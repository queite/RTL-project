import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

beforeEach(() => renderWithRouter(<App />));

describe('Testa o componente Pokedex', () => {
  test('Se página contém um heading h2 com o texto Encountered pokémons', () => {
    const heading = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });

  describe('Se é exibido o próximo Pokémon da lista ao clicar no botão Próximo', () => {
    test('Se o botão contem o texto Próximo pokémon', () => {
      const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
      expect(nextButton).toBeInTheDocument();
    });

    test('Teste se é mostrado apenas um Pokémon por vez.', () => {
      const pokemon = screen.getAllByTestId('pokemon-name');
      expect(pokemon).toHaveLength(1);
    });

    test('Teste se a Pokédex tem os botões de filtro', () => {
      const pokemonTypes = [...new Set(pokemons.map((pokemom) => pokemom.type))]; // new Set cria objeto sem repetições e spread operator espalha no array
      const filterButtons = screen.getAllByTestId('pokemon-type-button');
      expect(filterButtons).toHaveLength(pokemonTypes.length);

      // Testa se cada botão tem o nome correspondente ao tipo sem repetições :point_down:
      // toHaveTextContent encontrado em: https://testing-library.com/docs/react-testing-library/example-intro/
      filterButtons.forEach((button, index) => {
        expect(button).toHaveTextContent(pokemonTypes[index]);
      });
    });

    test('Se a Pokédex contém um botão para resetar o filtro', () => {
      const resetButton = screen.getByRole('button', { name: 'All' });
      const pokemon = screen.getByTestId('pokemon-name');
      const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });

      userEvent.click(resetButton);

      expect(pokemon).toHaveTextContent('Pikachu');

      userEvent.click(nextButton);

      expect(pokemon).toHaveTextContent('Charmander');
    });
  });
});
