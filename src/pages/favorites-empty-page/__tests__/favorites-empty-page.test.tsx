import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FavoritesEmptyPage from '../favorites-empty-page';

describe('FavoritesEmptyPage', () => {
  it('should render correctly', () => {
    render(<FavoritesEmptyPage />);
    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips/i)).toBeInTheDocument();
  });

  it('should render header with logo', () => {
    render(<FavoritesEmptyPage />);
    const logo = screen.getByAltText('6 cities logo');
    expect(logo).toBeInTheDocument();
  });

  it('should render footer with logo', () => {
    render(<FavoritesEmptyPage />);
    const footerLogos = screen.getAllByAltText('6 cities logo');
    expect(footerLogos.length).toBeGreaterThan(0);
  });
});

