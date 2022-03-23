import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa se a página contém as informações sobre a Pokédex.', () => {
  beforeEach(() => renderWithRouter(<About />));

  test('Se a página contém um heading h2 com o texto About Pokédex.', () => {
    const heading = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });

  test('Se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const paragraph1 = screen.getByText(/simulates a Pokédex/i);
    expect(paragraph1).toBeInTheDocument();
    const paragraph2 = screen.getByText(/Pokémons by type/i);
    expect(paragraph2).toBeInTheDocument();
  });

  test('Se a página contém a imagem de uma Pokédex', () => {
    const img = screen.getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
