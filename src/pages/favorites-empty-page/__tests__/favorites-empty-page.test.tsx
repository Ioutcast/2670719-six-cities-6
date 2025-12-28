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
    const { container } = render(<FavoritesEmptyPage />);
    const logo = container.querySelector('.header__logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('alt', '6 cities logo');
  });

  it('should render footer with logo', () => {
    render(<FavoritesEmptyPage />);
    const footerLogos = screen.getAllByAltText('6 cities logo');
    expect(footerLogos.length).toBeGreaterThan(0);
  });
});

