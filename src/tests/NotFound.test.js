import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

beforeEach(() => renderWithRouter(<NotFound />));

test('Se página contém um heading h2 com o texto Page requested not found 😭', () => {
  const heading = screen.getByRole('heading', { name: /Page requested not found/i });
  expect(heading).toBeInTheDocument();
});

test('Se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const img = screen.getByAltText(/page requested was not found/i);
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
